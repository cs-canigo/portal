+++
date        = "2024-12-11"
title       = "PICA"
description = "Interficie d'accés a la PICA (Plataforma d'Integració i Col·laboració Administrativa)."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 7
+++

## Propòsit

El propòsit del connector és proporcionar una interfície java per accedir a la PICA (Plataforma d'Integració i Col·laboració Administrativa).

El connector amb la PICA disposa de dos tipus de comunicació, un d'ells a través de web service síncron, i l'altre, mitjançant web service asíncron.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de PICA es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el `pom.xml` de l'aplicació la següent dependència:

```xml
  <properties>
    ...
    <canigo.integration.pica.version>[3.1.0,3.2.0)</canigo.integration.pica.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.integration.pica</artifactId>
      <version>${canigo.integration.pica.version}</version>
    </dependency>
  </dependencies>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Dependències

El mòdul de PICA utilitza el connector de la PICA, podeu trobar les dependències d'aquest connector a:

http://transversals.ctti.intranet.gencat.cat/related/pica/integracio/lib.zip

És necessari revisar les dependències a on es vagi a utilitzar el mòdul de PICA perquè no tinguin conflictes amb les dependències del connector, i si és el cas, excloure les que siguin necessàries

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

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">
  <bean id="picaCanigoService" parent="abstractPicaService"
        class="cat.gencat.ctti.canigo.arch.integration.pica.PicaServiceWrapperImpl"
        scope="prototype">
    <property name="requeridor" ref="requeridor"/>
    <property name="modalitats">
      <map>
        <entry key="PADRO_MUNICIPI_RESIDENCIA">
          <bean parent="producteModalitatBase">
            <property name="signat" value="false"/>
            <property name="urlPICA"
                      value="http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/PADRO_MUNICIPI_RESIDENCIA"/>
            <property name="codCertificado"
                      value="PADRO_MUNICIPI_RESIDENCIA"/>
            <property name="codProducto" value="PADRO"/>
            <property name="finalidad" value="PROVES"/>
            <property name="nifEmisor" value="Q0801175A"/>
            <property name="nombreEmisor" value="CONSORCI AOC"/>
          </bean>
        </entry>
      </map>
    </property>
  </bean>
  <bean id="picaCanigoServiceError" parent="picaCanigoService">
    <property name="requeridor" ref="requeridorErrorPassword"/>
  </bean>
  <bean id="requeridorErrorPassword" parent="requeridor">
    <property name="password" value="PICAERROR"/>
    <property name="user" value="USER_ERROR"/>
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

* Injecció del servei de PICA via annotacions (@Inject/@Named) de Java.
* Invocació del producte/modalitat "PADRO_MUNICIPI_RESIDENCIA" definit en el map de modalitats que es troba al fitxer de configuració xml de Spring.

```java
import cat.gencat.ctti.canigo.arch.integration.pica.IPicaServiceWrapper;
import cat.gencat.pica.api.peticio.beans.DadesEspecifiques;
import cat.gencat.pica.api.peticio.beans.Funcionari;
import cat.gencat.pica.api.peticio.beans.Titular;
import cat.gencat.pica.api.peticio.core.IPICAServiceSincron;
import com.generalitat.mp.ws.CridaSincronaResponseDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import javax.inject.Named;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

@Service("picaAplicacioService")
@Lazy
public class PicaAplicacioService {
  private static final Logger log = LoggerFactory.getLogger(PicaAplicacioService.class);
  private static final int TIPO_DOC_TITULAR_NIF = 2;

  @Inject
  @Named("picaCanigoService")
  private IPicaServiceWrapper serviceWrapper;

  public String ferPeticioAlServei() {
    try {
      IPICAServiceSincron service = serviceWrapper.getPicaWebServiceSincronInstance("PADRO_MUNICIPI_RESIDENCIA");
      service.setFuncionari(getFuncionari());
      service.setTitular(creaTitular());
      service.setDadesEspecifiques(createDadesEspecifiques());

      //Identificador únic de petició
      service.crearPeticio("PROVA_OTCANIGO_" + System.currentTimeMillis());

      //fer peticio
      CridaSincronaResponseDocument resp = serviceWrapper.ferPeticioAlServei(service);
      //extreure resultat
      serviceWrapper.extreuDadesEspecifiques(service, resp).forEach(dadesEspecifiques -> parseXML(dadesEspecifiques.getDadesXML()));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return "Test amb errors: " + e.getMessage();
    }
    return "Test correcte";
  }

  private Funcionari getFuncionari() {
    Funcionari funcionari = new Funcionari();
    funcionari.setNombreFuncionario("Nom Funcionari");
    funcionari.setNifFuncionario("55555555A");
    funcionari.setEmailFuncionario("prova@gencat.com");
    return funcionari;
  }

  private Titular creaTitular() {
    Titular tit = new Titular();
    tit.setTitularTipoDocumentacion(TIPO_DOC_TITULAR_NIF);
    tit.setTitularDocumentacion("NIF_TITULAR"); // Es posa el NIF real
    tit.setTitularNombreCompleto("NOM_COMPLET_TITULAR"); // Es posa el nom real
    return tit;
  }

  private List<DadesEspecifiques> createDadesEspecifiques() {
    List<DadesEspecifiques> dadesEspecifiquesXML = new ArrayList<>();
    StringBuilder sb = new StringBuilder("<ns1:request xmlns:ns1=\"http://www.gencat.net/tfn\">");
    sb.append("<ns1:simpleparam name=\"NUMTIT\">83746573</ns1:simpleparam>");
    sb.append("<ns1:simpleparam name=\"NUMNIF\">111111111H</ns1:simpleparam>");
    sb.append("</ns1:request>");

    DadesEspecifiques dades = new DadesEspecifiques();
    dades.setIdSolicitud("1");
    dades.setDadesXML(sb.toString());
    dadesEspecifiquesXML.add(dades);
    return dadesEspecifiquesXML;
  }

  private void parseXML(String dadesXML) {
    boolean error = false;
    InputSource inStream = new InputSource();
    inStream.setCharacterStream(new StringReader(dadesXML));
    try {
      Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inStream);
      NodeList nodes = doc.getElementsByTagName("solicitud-error");
      if (nodes.getLength() == 0) {
        nodes = doc.getElementsByTagName("sol:SolicitudError");
        error = true;
      }

      for (int i = 0; i < nodes.getLength(); i++) {
        Node node = nodes.item(i);
        if (node.getNodeType() == Node.ELEMENT_NODE) {
          log.info(!error ? dadesXML : node.getTextContent());
        }
      }
    } catch (SAXException | IOException | ParserConfigurationException e) {
      log.error(e.getMessage(), e);
    }
  }
}
```

Cal destacar que l'identificador de la petició ha de ser únic, per aquest motiu es concatena un prefix de text qualsevol amb el timestamp del sistema.

Per a més informació respecte l'especificació tècnica i funcional podeu contactar amb l'OT PICA.

En aquest exemple, els mètodes privats crearFuncionari() i crearTitular() (creats simplement per aquest test) s'encarreguen de setejar les propietats del funcionari que fa la petició i titular sobre el que es fa la petició respectivament. El mètode també privat createDadesEspecifiques() conté una llista de les sol.licituds, en format XML, que s'enviaran dins la petició.

Dins una petició (llista de dades específiques) es poden incloure diverses sol·licituds, els identificadors de les quals han de ser únics dins una mateixa petició. Si volguéssim afegir una altra sol- licitud en l'exemple, només caldria instanciar un nou objecte DadesEspecifiques, amb IdSolicitud="2", un nou StringBuffer amb les dades i afegir-lo a la llista dadesEspecifiquesXML dins del mètode createDadesEspecifiques() de l'exemple.

**PicaServiceController.java**  

Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import io.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"canigo-pica-test"})
@RestController
@RequestMapping("/pica")
public class PicaAplicacioController {
  private final PicaAplicacioService picaAplicacioService;

  public PicaAplicacioController(PicaAplicacioService picaAplicacioService) {
    this.picaAplicacioService = picaAplicacioService;
  }

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public String testPica() {
    return picaAplicacioService.ferPeticioAlServei();
  }
}
```

### Més informació

Per a més informació sobre el connector de la PICA teniu:

[Integració amb PICA](http://transversals.ctti.intranet.gencat.cat/sol-pica/integracio/)
