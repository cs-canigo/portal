+++
date        = "2021-05-07"
title       = "Error prefix namespace connector SARCAT"
description = "Error al recuperar resposta de PICA a les crides SARCAT del connector Sarcat de Canigó"
sections    = ["drafts"]
weight      = 1
+++

## Introducció al problema

El maig del 2021 es va reportar un problema en la recuperació de les respostes de PICA que es fan a través del connector de SARCAT de Canigó en la seva versió 1.0.1. L'error es produeix perquè PICA ha modificat els prefixes dels namespace de les respostes i el connector intenta cercar els nodes de resposta amb un namespace prefixat

## Detall del problema

El mòdul d'integració amb Sarcat, a partir de la versió 1.0.0 fa servir un mètode per parsejar les respostes a les crides al servei. Aquest mètode intenta recupera la resposta amb un prefix. Actualment, la PICA respon amb un prefix diferent i per tant es produeix un problema de parseig.

```
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), "alta:SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;
```

Quan la PICA respon per exemple:

```
<ns2:SarcatAlAltaResponse xmlns:ns2="http://gencat.net/scsp/esquemes/peticion/alta">

<ns2:error>

<ns3:codi xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common">0</ns3:codi>

<ns3:descripcio xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

<ns3:descripcioExtesa xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

</ns2:error>

<ns2:assentamentRetorn anyPK="2021" codiURPK="0278" dataAlta="28/04/2021 10:35:22" numPK="183">

<ns2:errorAssentament>

<ns3:codi xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common">0</ns3:codi>

<ns3:descripcio xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

<ns3:descripcioExtesa xmlns:ns3="http://gencat.net/scsp/esquemes/peticion/common"/>

</ns2:errorAssentament>

</ns2:assentamentRetorn>

</ns2:SarcatAlAltaResponse>
```

## Solució al problema

S'ha publicat la versió 2.3.2 del connector SARCAT de la PICA de Canigó que resol aquest problema, buscant els nodes de resposta de la PICA independentment dels prefixes del namespace.

Per a resoldre el problema per a versions anteriors a la versió 2.0.0, cal reimplementar els mètodes necessaris del mòdul.
Cal crear una implementació custom per reimplementar els mètodes que fan crida a *SarcatXMLUtils.findNode* per especificar que no hi ha prefix en la crida.

```
		Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), ":SarcatAlAltaResponse");
		SarcatAlAltaResponseDocument respostaAlta = null;
```

Per exemple, reimplementarem el mètode *insertarAssentamentSafata* de *cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorImpl* que acaba utilitzant *findNode* de *cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils* 

```
    public class SarcatConnectorCustomImpl extends SarcatConnectorImpl implements SarcatConnector {
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
	
        ...
    }	
```

També serà necessari reimplementar el mètode *findNode* de la classe *cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils* per a buscar el node que contingui el node a buscar, per perfetre ser independent del prefix:

```
package cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils;

import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.exceptions.SarcatException;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.XMLConstants;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringWriter;

/**
 * The type Pica xml utils.
 *
 * @author cscanigo
 */
public class SarcatXMLUtils {
...
  /**
   * Mètode que busca el node dessitjat dintre d'un node pare.
   *
   * @param nodeInicial Node --> Node pare, que conté el node que volem buscar.
   * @param nodeBuscar  String --> Nom del node a buscar.
   * @return Node --> Node a buscar.
   */
  public static Node findNode(Node nodeInicial, String nodeBuscar) {
    if (nodeInicial != null && nodeInicial.getNodeName() != null && nodeInicial.getNodeName().contains(nodeBuscar)) {
      return nodeInicial;
    } else if (nodeInicial != null && nodeInicial.getChildNodes() != null) {
      NodeList llistaNodes = nodeInicial.getChildNodes();
      for (int i = 0; i < llistaNodes.getLength(); i++) {
        Node node = findNode(llistaNodes.item(i), nodeBuscar);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }
...
}

```

Amb la instanciació del bean, per exemple amb xml a *app-custom-beans.xml* ubicat a */src/main/resources/spring/*:

```
	<bean id="sarcatServiceCustom" class="cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorCustomImpl" scope="prototype">
		<description>
			S@RCAT service for Canigo 3.0
		</description>
		<property name="passwordType" value="${pica.modes.passwordType}"/>
		<property name="picaService" ref="${sarcat.picaServiceBeanName:picaService}"/>
		<property name="finalitat" value="${sarcat.finalitat}"/>
		<property name="nifEmisor" value="${sarcat.nifEmisor}" />
		<property name="nomEmisor" value="${sarcat.nomEmisor}" />
		<property name="urlPica" value="${sarcat.urlPica}"/>
		<property name="usuari" value="${sarcat.usuari}"/>
		<property name="password" value="${sarcat.password}"/>
		<property name="funcionari" ref="funcionari" />
	</bean>
```

O instanciant-ho amb java.

Al vostre projecte, haureu de fer servir la nova implementació

```
	@Autowired
	@Qualifier("sarcatServiceCustom")
    	private SarcatConnector sarcatConnector;

```

## Conclusió

Si s'utilitza a l'aplicació el connector de SARCAT de PICA de Canigó 3.4.x, versió 2.0.0 fins a la versió 3.2.1, recomenem actualitzar-se a la versió 2.3.2

Si s'utilitza a l'aplicació el connector de SARCAT de PICA de Canigó inferior a 3.4.x, serà necessari reimplementar el connector tal i com hem mostrat

# Informació

- Reimplementació de [cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorCustomImpl]()

- Reimplementació de [cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils]()

- Podeu consultar la informació del connector de Canigó a [SARCAT](/canigo-documentacio-versions-3x-integracio/modul-sarcat/)

- Podeu consultar el [Roadmap Framework Canigó](/canigo/roadmap/)

- Podeu consultar la [Matrius de Compatibilitats de Canigó 3.4.x](/canigo-download-related/matrius-compatibilitats/#canig%C3%B3-3-4-x)



Si necessiteu més informació, podeu obrir tiquet via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) o, en cas de no disposar de permisos d’accés, enviar un correu a la bústia del CS Canigó (oficina-tecnica.canigo.ctti@gencat.cat).
