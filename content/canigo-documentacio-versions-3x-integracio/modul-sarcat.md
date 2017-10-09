+++
date        = "2015-03-19T17:03:30+01:00"
title       = "SARCAT"
description = "Serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu."
sections    = "Canigó. Documentació versió 3.x"
weight      = 13
+++

## Propòsit

Aquest mòdul permet consumir els diferents serveis que ofereix la plataforma de Sarcat mitjançant la PICA i el seu connector nadiu. El mòdul permet consumir els serveis oferts pels WebService amb peticions síncrones.

## Funcionalitats del connector

El connector proporciona accés a les següents operacions de Sarcat:

Operació Sarcat                   | Descripció Funcional | Modalitat PICA | Operació PICA
--------------------------------- | -------------------- | -------------- | -------------
consultaAssentaments              | Permet obtenir una relació d'assentaments, amb les dades bàsiques, que compleixin uns criteris de filtratge específics. | SARCAT_AL_CONSULTA    | OP_CONSULTA_ASSENTAMENTS
cercaAssentaments                 | Permet obtenir totes les dades d'un assentament concret.                                                               | SARCAT_AL_CONSULTA    |  OP_CERCA_ASSENTAMENTS
recollirAssentamentsSafataEntrada | Permet recollir assentaments de la safata d'entrada per incorporar-los a d'altres sistemes.                            | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_ENTRADA
recollirAssentamentsSafataSortida | Permet recollir assentaments de la safata de sortida per incorporar-los a d'altres sistemes.                            | SARCAT_AL_CONSULTA    |  OP_RECOLLIR_SORTIDA
esPresortida                      | Conèixer si un assentament concret és una pre-sortida o una sortida.                                                    | SARCAT_AL_CONSULTA    |  OP_ES_PRESORTIDA
insertarAssentamentEntrada        | Es registra l'assentament d'entrada i retorna el número d'assentament assignat i la data de registre.                   | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_ENTRADA
insertarAssentamentSortida        | Es registra l'assentament de sortida i retorna el número d'assentament assignat i la data de registre.                  | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SORTIDA
insertarAssentamentSafata         | Donada la informació d'assentaments d'entrada, els grava i retorna el número de registre de cadascun. Addicionalment comprova la validesa de la destinació externa respecte l'unitat de registre associada a l'assentament.                                                                                            | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_SAFATA
insertarAssentamentPresortida     | Donada la informació X d'assentaments de presortida, els grava i retorna el número de registre de cadascun.             | SARCAT_AL_ALTA        |  OP_INSERTAR_ASSENTAMENTS_PRESORTIDA
numExp 							  | Permet modificar el número d'expedient prèviament assignat a un assentament d'entrada o sortida realitzat.              | SARCAT_AL_MODIFICACIO |  OP_CANVI_NUM_EXPEDIENT
getNumsRegistre                   | Permet obtenir un conjunt de números d'assentaments que són reservats per s@rcat de manera exclusiva pel Backoffice que fa la sol- licitud.                                                                                                                                                                             | SARCAT_AL_RESERVA     |  OP_GET_NUM_REGISTRE
cercaAssentamentsHist             | Permet obtenir totes les dades d'un assentament que ha passat pel repositori d'històrics d'assentaments de S@rcat.      | SARCAT_AP_HISTORIC    |  OP_CERCA_ASSENTAMENT_HISTORIC
baixaAssentament                  | Permet donar de baixa assentaments d'entrada, sortida o presortida prèviament realitzats.                               | SARCAT_AL_BAIXA       |  OP_BAIXA_ASSENTAMENTS
llistarTaulesMestres              | A partir d'una data concreta, s'obtenen totes les actualitzacions realitzades en les taules mestres de S@rcat a partir d'aquesta data.                                                                                                                                                                                   | SARCAT_AL_LLISTA_REG  |  OP_LLISTA_REG
llistarTaulaMestra                | Recuperació de codis o valors possibles per a un determinat concepte o taula mestra.                                    | SARCAT_AP_LLISTA      |  OP_LLISTA_TAULA_MESTRA

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de Sarcat es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.sarcat.pica.version>[1.2.0,1.3.0)</canigo.integration.sarcat.pica.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.sarcat.pica</artifactId>
    <version>${canigo.integration.sarcat.pica.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/sarcat.properties

Propietat           | Requerit | Descripció
------------------- | -------- | ----------
*.sarcat.urlPica	 | Sí       | Url del WebService de Sarcat. Valor per defecte: http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.sarcat.user       | Sí       | Usuari de Sarcat
*.sarcat.password   | Sí       | Password de l'usuari de Sarcat
*.sarcat.finalitat  | Sí       | Finalitat de l'ús del servei (TEST, PRODUCTIU...)
*.sarcat.nifEmisor | Sí       | Nif de l'emissor
*.sarcat.nomEmisor       | Sí       | Nom de l'emissor
*.sarcat.nomFuncionari   | Sí       | Nom del funcionari
*.sarcat.nifFuncionari  | Sí       | Nif del funcionari
*.sarcat.emailFuncionari  | Sí       | Email del funcionari

Els valors de finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

Aquest mòdul és dependent del [mòdul de la PICA] (/canigo-documentacio-versions-3x-integracio/modul-pica/) amb lo qual també s'ha de configurar aquest.

## Utilització del Mòdul

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**SarcatService.java**

Controller que publica les operacions disponibles per a qui hagi de consumir-les.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.SarcatConnector;
import cat.gencat.ctti.canigo.arch.integration.sarcat.pica.exceptions.SarcatException;
import net.gencat.scsp.esquemes.peticion.common.OrdreCerca;
import net.gencat.scsp.esquemes.peticion.common.TipusAssentament;
import net.gencat.scsp.esquemes.peticion.consulta.AssentamentCerca;
import net.gencat.scsp.esquemes.peticion.consulta.AssentamentCerca.ParametresCerca;
import net.gencat.scsp.esquemes.peticion.consulta.SarcatAlConsultaRequestDocument;
import net.gencat.scsp.esquemes.peticion.consulta.SarcatAlConsultaRequestDocument.SarcatAlConsultaRequest;
import net.gencat.scsp.esquemes.peticion.consulta.SarcatAlConsultaResponseDocument.SarcatAlConsultaResponse;

@Service("sarcatService")
@Lazy
public class SarcatService {

	private static final Logger log = LoggerFactory.getLogger(SarcatService.class);

	@Autowired
    private SarcatConnector sarcatConnector;
    


	public String testSarcat(){
		
		String message;

		try {

            SarcatAlConsultaRequestDocument document = SarcatAlConsultaRequestDocument.Factory.newInstance();
            SarcatAlConsultaRequest request = document.addNewSarcatAlConsultaRequest();

            AssentamentCerca cerca = request.addNewAssentamentCerca();
            ParametresCerca params =  cerca.addNewParametresCerca();
            params.setDataInici("09/03/2011");
            params.setDataFinal("10/03/2011");
            cerca.setParametresCerca(params);
            cerca.setUrUsuari("0001");
            cerca.setOrdreCerca(OrdreCerca.DATA_ALTA);
            cerca.setTipus(TipusAssentament.ENTRADA);
               cerca.setDescendent(true);

            SarcatAlConsultaResponse resposta = sarcatConnector.cercaAssentaments(document).getSarcatAlConsultaResponse();

	        if (resposta.getError().getCodi() != 0) {
	        	message = "Test amb errors: " + resposta.getError().getCodi()    + " " + resposta.getError().getDescripcio();
	        	log.error(resposta.getError().getCodi()    + " " + resposta.getError().getDescripcio());
	        } else {
	            message = "Test correcte: " + resposta.getAssentamentArray().length;
	        }
	
	    } catch (SarcatException e) {
	    	message = "Test erròni: " + e.getMessage();
	        log.error(e.getMessage(), e);
	    }
        
        return message;
    }
	
}
```

**SarcatServiceController.java**

Controller que publica les operacions disponibles per a qui hagi de consumir-les.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.SarcatService;

@RestController
@RequestMapping("/sarcat")
public class SarcatServiceController {

	@Autowired
	SarcatService sarcatService;


	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testSarcat() throws Exception {
		return sarcatService.testSarcat();
	}
}
```
