+++
date        = "2024-12-11"
title       = "Enotum"
description = "Connector de la Pica que simplifica l'utilització del servei de Notificacions Telemàtiques de la Generalitat."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 4
+++

`Nota important:` **Aquesta guia és una còpia de la documentació del propi connector en la seva versió 3.6 de Canigó. S'està treballant per actualitzar aquest document perquè estigui alineat amb les novetats del connector migrat a Canigó 3.8. Aquest missatge s'eliminarà quan s'hagi acabat d'actualitzar aquesta documentació.**

## Propòsit

El propòsit del connector és proporcionar una interfície funcional reduida al connector de la Pica que simplifica l'utilització del servei de Notificacions Telemàtiques de la Generalitat.

## Descripció Detallada

Aquest connector permet realitzar les següents funcionalitats referents a les notificacions telemàtiques:

Funcionalitats per a l'empleat públic:

* Enviar tramesa: Creació d'una nova tramesa de notificacions telemàtiques al sistema E-Notum per part del sistema requeridor de notificacions telemàtiques.
* Consultar estat tramesa: Consulta de l'estat d'una tramesa de notificacions telemàtiques per part del sistema requeridor de notificacions telemàtiques.
* Consultar notificacions destinatari: Consulta de les notificacions telemàtiques adreçades al destinatari.
* Consultar detall notificació: Visualització d'una notificació telemàtica per part d'un empleat públic.
* Consultar evidències notificació: Consulta de les evidències d'una notificació telemàtica gestionades per eNotum.

Funcionalitats per al ciutadà:

* Consultar detall notificació: Visualització d'una notificació telemàtica per part del destinatari.
* Consultar notificacions destinatari: Consulta de les notificacions telemàtiques adreçades al destinatari.
* Modificar estat notificació: Permet canviar l'estat d'una notificació telemàtica, per qüestions de seguretat un usuari només pugui canviar d'estat les seves pròpies notificacions.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal·lar el mòdul de notificacions electròniques es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.notificacions.electroniques</artifactId>
          <version>${canigo.integration.notificacions.electroniques.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.6LTS/3.6.5/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Son necessaris els següents arxius de configuració:

* pica.properties
* pica.signature.properties
* client.axis2.xml
* modules.list
* rampart-1.3.mar
* certificats.jks
* notificacions-electroniques.properties
* app-enotum-config.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/client.axis2.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/rampart-1.3.mar

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/modules.list

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/certificats.jks

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/pica.signature.properties

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-enotum-config.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/notificacions-electroniques.properties

Propietat                                         | Requerit | Descripció
------------------------------------------------- | -------- | ----------
*.notificacions.electroniques.picaServiceBeanName | No       | Nom del bean de Spring per a PICA. Per defecte: picaService
*.notificacions.electroniques.urlPica             | Sí       | URL del servei de la PICA
*.notificacions.electroniques.nomEmissor		  | Sí		 | Nom de l'emissor
*.notificacions.electroniques.nifEmissor		  | Sí	     | Nif de l'emissor

Els valors de urlPica, nifEmisor i nomEmisor s'han de consultar a la [OT PICA](http://transversals.ctti.intranet.gencat.cat/sol-pica/integracio/)

Aquest mòdul és dependent del [mòdul de la PICA](/plataformes/canigo/documentacio-per-versions/3.6LTS/3.6.5/moduls/moduls-integracio/modul-pica/) per el que també s'ha de configurar aquest.

## Utilització del Mòdul

### PicaService

El mòdul ENOTUM requereix de la creació del Bean del servei de la pica, per defecte Enotum cerca un bean anomenat picaService. Si es dessitja canviar aquest nom es pot fer afegint al fitxer notificacions-electroniques.propierties la següent propietat:

	notificacions.electroniques.picaServiceBeanName=[nom del bean]
	
Un exemple del bean que s'ha de crear:

	<!-- BEAN DE LA PICA -->
	<bean id="picaService" parent="abstractPicaService">
        <property name="modalitats">
            <map>
            </map>
        </property>
    </bean>

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**EnotumService.java**

Classe Java on es realitzarà la lògica de la operació a realitzar i es connecta amb el mòdul de Notificacions electròniques.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.NotificacionsElectroniquesConnector;
import cat.gencat.pica.api.peticio.beans.Funcionari;
import net.gencat.scsp.esquemes.productes.nt.PeticioNtConsultarDetallNotificacioEPDocument;
import net.gencat.scsp.esquemes.productes.nt.PeticioNtConsultarDetallNotificacioEPDocument.PeticioNtConsultarDetallNotificacioEP;
import net.gencat.scsp.esquemes.productes.nt.RespostaNtConsultarDetallNotificacioEPDocument;

@Service("enotumService")
@Lazy
public class EnotumService {

	private static final Logger log = LoggerFactory.getLogger(EnotumService.class);

	@Autowired
    private NotificacionsElectroniquesConnector enotum;
    


	public String testEnotum(){
		
		String message;

        try{

        	String idTramesaNT = "101230";
        	
        	PeticioNtConsultarDetallNotificacioEPDocument dades = PeticioNtConsultarDetallNotificacioEPDocument.Factory.newInstance();
    		PeticioNtConsultarDetallNotificacioEP peticioNotificacio = PeticioNtConsultarDetallNotificacioEP.Factory.newInstance();

    		// Petició
    		peticioNotificacio.setIdNotificacioNT(idTramesaNT);

    		dades.setPeticioNtConsultarDetallNotificacioEP(peticioNotificacio);

    		RespostaNtConsultarDetallNotificacioEPDocument resposta = enotum
    				.getServeisEmpleatPublic(getFuncionari())
    				.consultarDetallNotificacio(dades);
        	
            if(resposta.getRespostaNtConsultarDetallNotificacioEP().getErrors() != null){
            	message = resposta.getRespostaNtConsultarDetallNotificacioEP().getErrors().getPICAErrorArray(0).getDescripcio();
            }else{
            	message = resposta.getRespostaNtConsultarDetallNotificacioEP().getDetallNotificacio().getNotificacio().getEstat();
            }

        }catch(Exception e){
        	message = "Error al test: " + e.getMessage();
        	log.error(e.getMessage(), e);
        }
        
        return message;

    }
	
	 /**
     * Get funcionari
     * @return
     */
    private Funcionari getFuncionari() {
        Funcionari funcionari = new Funcionari();
        funcionari.setNombreFuncionario("Nom Funcionari");
        funcionari.setNifFuncionario("55555555A");
        funcionari.setEmailFuncionario("prova@gencat.com");
        return funcionari;
    }
}
```

**EnotumServiceController.java**  

Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.EnotumService;

@RestController
@RequestMapping("/enotum")
public class EnotumServiceController {

	@Autowired
	EnotumService enotumService;


	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testEnotum() throws Exception {
		return enotumService.testEnotum();
	}
}
```
