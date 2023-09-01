+++
date        = "2021-05-07"
title       = "Com corregir l’error de parseig del connector Sarcat PICA"
description = "Com corregir l’error en recuperar la resposta de PICA a les crides Sarcat del connector de Canigó en versions anteriors Canigó 3.4.6"
section     = "howtos"
categories  = ["canigo"]
key         = "JUNY2021"
+++

## Introducció

El maig del 2021 es va reportar un **problema en la recuperació de les respostes de PICA** que es fan a través del connector
de Sarcat de Canigó des de la seva versió 1.0.0. L'error es produeix perquè la PICA ha fet modificacions en els prefixos
dels namespace de les respostes i el connector intentava cercar els nodes de resposta amb un namespace prefixat.
El problema ha estat resolt a la [**versió 3.4.6**](/noticies/2021-05-11-Resolucio_problema_connector_SARCAT_PICA/) **del Framework Canigó**.

L’objectiu d’aquest article és mostrar com resoldre en problema en versions anteriors del connector.


## Detall del problema

El mòdul d'integració amb Sarcat fa servir un mètode per a parsejar les respostes a les crides al servei.
Aquest mètode intenta recuperar la resposta amb un prefix i, actualment, la PICA respon amb un prefix diferent.

Per exemple:
```
Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), "alta:SarcatAlAltaResponse");
SarcatAlAltaResponseDocument respostaAlta = null;
```

Quan la PICA retorna una resposta com la següent:

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

On es pot comprovar que la resposta no disposa del prefix "alta" esperat.


## Solució al problema en versions anteriors

Per a resoldre el problema en versions anteriors a la versió 2.0.0 del connector, cal reimplementar els mètodes del mòdul que fan
la crida a *SarcatXMLUtils.findNode* per a especificar que no hi ha prefix en la crida:

```
Node nodeResposta = SarcatXMLUtils.findNode(resposta.getDomNode(), ":SarcatAlAltaResponse");
SarcatAlAltaResponseDocument respostaAlta = null;
```

A mode d'exemple, reimplementarem el mètode *insertarAssentamentSafata* de
`cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorImpl` que acaba utilitzant *findNode*
de `cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils`:

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

Serà necessari reimplementar també el mètode *findNode* de la classe
`cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils` per a cercar el node independentment del prefix:

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

Amb la instanciació del bean, per exemple amb xml a `app-custom-beans.xml` ubicat a `/src/main/resources/spring/`:

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

O bé instanciant-lo amb Java.

Finalment, al vostre projecte, caldrà aplicar la nova implementació:

```
   @Autowired
   @Qualifier("sarcatServiceCustom")
       private SarcatConnector sarcatConnector;

```

## Conclusió

En cas de fer ús del connector de Sarcat de PICA del Framework Canigó 3.4.x (des de versió 2.0.0 fins a la versió 2.3.1 del connector)
recomanem **actualitzar-se a la versió 2.3.2**.
En cas de fer ús del connector de Sarcat de PICA del Framework Canigó  inferior a 3.4.x (des de versió 1.0.0 fins a la versió 1.2.3 del connector)
serà necessari **reimplementar el connector tal com s’ha mostrat en aquest article**.

## Informació

Per a més informació, podeu consultar:

- [Connector de Canigó a Sarcat](/plataformes/canigo/documentacio-per-versions/3.4LTS/3.4.9/moduls/moduls-integracio/modul-sarcat/)

- [Roadmap Framework Canigó](/plataformes/canigo/roadmap/)

- [Matrius de Compatibilitats de Canigó 3.4.x](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- Reimplementació del mètode *insertarAssentamentSafata* a [cat.gencat.ctti.canigo.arch.integration.sarcat.pica.impl.SarcatConnectorCustomImpl](/related/canigo/howto/SARCAT/SarcatConnectorCustomImpl.java)

- Reimplementació de [cat.gencat.ctti.canigo.arch.integration.sarcat.pica.utils.SarcatXMLUtils](/related/canigo/howto/SARCAT/SarcatXMLUtils.java)
