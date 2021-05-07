+++
date        = "2021-05-07"
title       = "Error namespace connector sarcat-pica 1.0.1"
description = "Error al recuperar resposta de PICA a les crides s@rcat en la versió 1.0.1 del connector"
sections    = ["drafts"]
weight      = 1
+++

## Introducció al problema

El maig del 2021 es va reportar un problema en la recuperació de les respostes de PICA que es fan a través del connector de sarcat en la seva versió 1.0.1. L'error es produeix perquè pica retorna el missatge sense namespace i el connector intenta cercar el node de resposta amb un namespace prefixat

## Detall del problema

El mòdul d'integració amb sarcat-pica, en la seva versió 1.0.1 fa servir un mètode per parsejar les respostes a les crides al servei. Aquest mètode intenta recupera la resposta amb un prefix. Actualment, la resposta de PICA no inclou aquest prefix i per tant es produeix un problema de parseig.

```
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), "alta:SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;
```

## Solució al problema

Per a resoldre el problema, donat que la versió 1.0.1 del mòdul ja no té suport, cal reimplementar els mètodes necessaris del mòdul.
Cal crear una implementació custom per reimplementar els mètodes que fan crida a SarcatXMLUtils.findNode per especificar que no hi ha prefix en la crida.

```
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), ":SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;
```

La nova implementació exten de la antiga i reimplementa els mètodes necessaris. Haurà de tenir un qualified name diferent per poder decidir quina implementació es farà servir.

```
    @Service
    @Qualifier("sarcatConnectorCustom")
    public class SarcatConnectorCustomImpl extends SarcatConnectorImpl implements SarcatConnector {
        ...
        ...

	@Override
	public SarcatAlAltaResponseDocument insertarAssentamentSafata(SarcatAlAltaRequestDocument document)
			throws SarcatException {
		this.log("[insertarAssentamentSafata] - Inici", 1);
		long t1 = System.currentTimeMillis();
		document.getSarcatAlAltaRequest().setDadesSessio(this.getDadesSessio("OP_INSERTAR_ASSENTAMENTS_SAFATA"));
		SarcatAlAltaResponseDocument resposta = this.sarcatAlAlta(document);
		this.log("[insertarAssentamentSafata] - Fi (" + (System.currentTimeMillis() - t1) + "ms)", 1);
		return resposta;
	}

	private SarcatAlAltaResponseDocument sarcatAlAlta(SarcatAlAltaRequestDocument document) throws SarcatException {
		IPICAServiceSincron servei = this.picaService.getPicaWebServiceSincronInstance("SARCAT_AL_ALTA");
		servei.setDadesEspecifiques(this.crearDadesEspecifiques("SOL_01", document));
		CridaSincronaResponseDocument resposta = this.realitzarPeticio(servei);
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), ":SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;

		try {
			respostaAlta = net.gencat.scsp.esquemes.peticion.alta.SarcatAlAltaResponseDocument.Factory
					.parse(nodeResposta);
			return respostaAlta;
		} catch (XmlException var7) {
			throw new SarcatException(this.getClass().toString(), "sarcatAlAlta",
					"Error al parsejar l'objecte de resposta", var7);
		}
	}
```
Al següent link teniu el contingut sencer de la implementació custom.

Al vostre projecte, haureu de fer servir la nova implementació
```
	private final SarcatConnector sarcatConnector;

	@Autowired
	public SarcatAppManager(@Qualifier("sarcatConnectorCustom") SarcatConnector sarcatConnector) {
		this.sarcatConnector = sarcatConnector;
	}
	
	
	public void newAssentament (SarcatAlAltaRequestDocument document) throws SarcatException {
		sarcatConnector.insertarAssentamentEntrada(SarcatAlAltaRequestDocument.Factory.newInstance());
	}
```

## Conclusió

To define


Si necessiteu més informació, podeu obrir tiquet via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) o, en cas de no disposar de permisos d’accés, enviar un correu a la bústia del CS Canigó (oficina-tecnica.canigo.ctti@gencat.cat).