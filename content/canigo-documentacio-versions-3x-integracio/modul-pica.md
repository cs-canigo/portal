+++
date        = "2015-03-13T13:40:42+01:00"
title       = "PICA"
description = "Interficie d'accés a la PICA (Plataforma d'Integració i Col.laboració Administrativa)."
sections    = "Canigó. Documentació versió 3.x"
weight      = 10
+++

## Propòsit

El propòsit del connector és proporcionar una interfície java per accedir a la PICA (Plataforma d'Integració i Col.laboració Administrativa).

El connector amb la PICA disposa de dos tipus de comunicació, un d'ells a través de web service síncron, i l'altre, mitjançant web service asíncron.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de PICA es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.pica.version>[1.2.0,1.3.0)</canigo.integration.pica.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.pica</artifactId>
          <version>${canigo.integration.pica.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Son necessaris els següents arxius de configuració:

* pica.properties
* pica.signature.properties
* client.axis2.xml
* modules.list
* rampart-1.3.mar
* certificats.jks

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/pica.properties

Propietat                      | Requerit | Descripció
-----------------------------  | -------- | ---------
*.pica.modes.passwordType      | No       | Tipus de password per a la PICA. Per defecte: PasswordText
*.pica.requirer.signatureFile  | Sí       | Arxiu de configuració de la seguretat
*.pica.requirer.petitionerId   | Sí       | Identificador del solicitant
*.pica.requirer.transmitionId  | Sí       | Identificador de la transmissió
*.pica.requirer.petitionerName | Sí       | Nom del peticionari
*.pica.requirer.user           | Sí       | Usuari que vol consumir un producte/modalitat de la PICA
*.pica.requirer.password       | Sí       | Password de l'usuari que vol consumir un producte/modalitat de la PICA
*.pica.axisdefinition.location | Sí       | Localització de l'arxiu d'axisdefinition
*.pica.trustStore.location     | No       | Localització de l'arxiu de certificats per a la configuració SSL
*.pica.trustStore.type         | No       | Tipus de keystore
*.pica.trustStore.password     | No       | Password de la keystore

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/client.axis2.xml

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/rampart-1.3.mar

Ubicació: <PROJECT_ROOT>/src/main/resources/axis2client/conf/modules.list

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/certificats.jks

Ubicació: <PROJECT_ROOT>/src/main/resources/config/cert/pica.signature.properties

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-integration-custom.xml


    Important

    Si l'aplicació ha de ser desplegada en format empaquetat (.war, .ear) caldrà indicar la ubicació de la carpeta de configuració d'axis2 com a Path absolut dins el servidor on desplegarà. Aquest Path s'indicarà sobreescrivint el valor de la propietat pica.axisdefinition.location del fitxer pica.properties amb el Path absolut on s'ha deixat la carpeta d'axis2client als servidors. S'haurà de pactar la ubicació amb els responsables del CPD on desplegarà.

    Exemple:
    pica.properties:

        int.pica.axisdefinition.location=file:/export/AppJavaDades/int/.../axis2client/
        pre.pica.axisdefinition.location=file:/export/AppJavaDades/pre/.../axis2client/
        pro.pica.axisdefinition.location=file:/export/AppJavaDades/pro/.../axis2client/



## Utilització del Mòdul

### REST

**app-integration-custom.xml**

Aquest arxiu XML conté la configuració de Spring per al servei de PICA. En l'exemple configurem el servei de PICA per invocar el producte/modalitat "PADRO_MUNICIPI_RESIDENCIA".

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">


	<bean id="picaCanigoService" parent="abstractPicaService">
		<property name="modalitats">
			<map>
				<entry key="PADRO_MUNICIPI_RESIDENCIA">
					<bean parent="producteModalitatBase">
						<property name="signat" value="false"/>
						<property name="urlPICA" value="${pica.url}" />
						<property name="codCertificado" value="${pica.codCertificado}"/>
						<property name="codProducto" value="${pica.codProducto}"/>
						<property name="finalidad" value="${pica.finalidad}"/>
						<property name="nifEmisor" value="${pica.nifEmissor}"/>
						<property name="nombreEmisor" value="${pica.nombreEmisor}"/>
					</bean>
				</entry>
			</map>
		</property>
	</bean>
</beans>
```

<div class="message warning">
<b>Propietats específiques</b>
<br><br>
Les propietats pica.url, pica.codCertificado, pica.codProducto, etc, definides en XML de configuració anterior, son propietats específiques de la modalitat o producte invocat, per lo que s'hauran d'introduir manualment a l'arxiu pica.properties per tal de que el PlaceHolderResolver de Spring pugui resoldre el valor de la propietat durant l'arranc de l'aplicació.
</div>

**PicaAplicacioService.java**

Classe Java amb la lògica de les peticions que es realitzin, i la connectivitat amb el mòdul de la PICA.

En aquesta classe es pot visualiztar:

* Injecció del servei de PICA via annotacions (@Autowired/@Qualifier) de Spring.
* Invocació del producte/modalitat "PADRO_MUNICIPI_RESIDENCIA" definit en el map de modalitats que es troba al fitxer de configuració xml de Spring.

```java
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.generalitat.mp.ws.CridaSincronaResponseDocument;

import cat.gencat.ctti.canigo.arch.integration.pica.IPicaServiceWrapper;
import cat.gencat.pica.api.peticio.beans.DadesEspecifiques;
import cat.gencat.pica.api.peticio.beans.Funcionari;
import cat.gencat.pica.api.peticio.beans.Titular;
import cat.gencat.pica.api.peticio.core.IPICAServiceSincron;

@Service("picaAplicacioService")
@Lazy
public class PicaAplicacioService {

	private static final Logger log = LoggerFactory.getLogger(PicaAplicacioService.class);

	@Qualifier("picaService")
	@Autowired
    private IPicaServiceWrapper serviceWrapper;
    
	private static final int TIPO_DOC_TITULAR_NIF = 2;

	public String testPica(){
		
		String message;

		 try{
	            IPICAServiceSincron service = serviceWrapper.getPicaWebServiceSincronInstance("PADRO_MUNICIPI_RESIDENCIA");

	            Funcionari func = getFuncionari();
	            Titular tit = creaTitular();

	            List<DadesEspecifiques> datosEspecificosXML = createDadesEspecifiques();

	            service.setFuncionari(func);
	            service.setTitular(tit);
	            service.setDadesEspecifiques(datosEspecificosXML);

	                        //Identificador únic de petició
	            service.crearPeticio("PROVA_OTCANIGO_" + System.currentTimeMillis());

	            //fer peticio
	            CridaSincronaResponseDocument resp = serviceWrapper.ferPeticioAlServei(service);
	            //extreure resultat
	            List<DadesEspecifiques> resposta= serviceWrapper.extreuDadesEspecifiques(service,resp);

	            Iterator<DadesEspecifiques> it = resposta.iterator();
	            while (it.hasNext()) {
	                DadesEspecifiques object = it.next();
	                String dadesXML = object.getDadesXML();

	                // Parsejar resposta
	                parseXML(dadesXML);
	            }

	            message = "Test correcte";

	        }catch(Exception e){
	        	message = "Test amb errors: " + e.getMessage();
	            log.error(e.getMessage(), e);
	        }
        
        return message;

    }
	
    /**
     * Crea un objecte funcionari
     *
     * return funcionari
     **/
    private Funcionari getFuncionari() {
        Funcionari funcionari = new Funcionari();
        funcionari.setNombreFuncionario("Nom Funcionari");
        funcionari.setNifFuncionario("55555555A");
        funcionari.setEmailFuncionario("prova@gencat.com");
        return funcionari;
    }

    /**
     * Crea un objecte titular
     *
     * return titular
     **/
	private Titular creaTitular() {
	    Titular tit = new Titular(  );
	    tit.setTitularTipoDocumentacion(TIPO_DOC_TITULAR_NIF);
	    tit.setTitularDocumentacion("NIF_TITULAR"); // Es posa el NIF real
	    tit.setTitularNombreCompleto("NOM_COMPLET_TITULAR"); // Es posa el nom real
	    return tit;
	}
	
	
	    /**
	     * Crea un objecte dades específiques
	     *
	     * return DadesEspecifiques
	     **/
	private List<DadesEspecifiques> createDadesEspecifiques() {
	    List<DadesEspecifiques> dadesEspecifiquesXML= new ArrayList<DadesEspecifiques>(  );
	    StringBuffer sb = new StringBuffer( "<ns1:request xmlns:ns1=\"http://www.gencat.net/tfn\">" );
	    sb.append( "<ns1:simpleparam name=\"NUMTIT\">83746573</ns1:simpleparam>" );
	    sb.append( "<ns1:simpleparam name=\"NUMNIF\">111111111H</ns1:simpleparam>" );
	    sb.append( "</ns1:request>" );
	
	    DadesEspecifiques dades = new DadesEspecifiques(  );
	    dades.setIdSolicitud( "1" );
	    dades.setDadesXML( sb.toString(  ) );
	    dadesEspecifiquesXML.add( dades );
	
	    return dadesEspecifiquesXML;
	}
	
	    /**
	     * Parsejar la resposta deixant constància en format de traces si la crida ha finalitzat o no correctament
	     *
	     **/
	private void parseXML(String dadesXML) throws ParserConfigurationException, SAXException, IOException {
	    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder builder = factory.newDocumentBuilder();
	    InputSource inStream = new InputSource();
	    boolean error = false;
	
	    inStream.setCharacterStream(new StringReader(dadesXML));
	    Document doc = builder.parse(inStream);
	    NodeList nodes = doc.getElementsByTagName("error");
	    if(nodes.getLength() == 0) {
	        nodes = doc.getElementsByTagName("sol:SolicitudError");
	        error = true;
	    }
	
	    for(int i=0; i<nodes.getLength(); i++) {
	        Node node = nodes.item(i);
	        if(node.getNodeType() == Node.ELEMENT_NODE) {
	            Element element = (Element)node;
	            if(!error) {
	                log.info(dadesXML);
	            } else {
	                log.info(element.getTextContent());
	            }
	        }
	    }
	}
}
```

Cal destacar que l'identificador de la petició ha de ser únic, per aquest motiu es concatena un prefix de text qualsevol amb el timestamp del sistema.

Per a més informació respecte l'especificació tècnica i funcional podeu contactar amb l'OT PICA.

En aquest exemple, els mètodes privats crearFuncionari() i crearTitular() (creats simplement per aquest test) s'encarreguen de setejar les propietats del funcionari que fa la petició i titular sobre el que es fa la petició respectivament. El mètode també privat createDadesEspecifiques() conté una llista de les sol.licituds, en format XML, que s'enviaran dins la petició.

Dins una petició (llista de dades específiques) es poden incloure diverses sol- licituds, els identificadors de les quals han de ser únics dins una mateixa petició. Si volguéssim afegir una altra sol- licitud en l'exemple, només caldria instanciar un nou objecte DadesEspecifiques, amb IdSolicitud="2", un nou StringBuffer amb les dades i afegir-lo a la llista dadesEspecifiquesXML dins del mètode createDadesEspecifiques() de l'exemple.

**PicaServiceController.java**  

Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.PicaAplicacioService;

@RestController
@RequestMapping("/pica")
public class PicaServiceController {

	@Autowired
	PicaAplicacioService picaAplicacioService;


	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testPica() throws Exception {
		return picaAplicacioService.testPica();
	}
}
```
