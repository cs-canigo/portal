+++
date        = "2015-03-19T16:19:20+01:00"
title       = "Enotum_WS"
description = "Notificacions electròniques Web Service."
sections    = "Canigó. Documentació versió 3.x"
weight      = 6

+++

## Propòsit

El propòsit d'aquesta documentació és donar a conèixer el mòdul de WebServices de Canigó3 per Enotum, la seva configuració i el seu ús per part de les aplicacions.

## Descripció Detallada

El Servei de Enotum existeixen dues modalitats de consum especials:

* NT_ENTREGAR_CANVI_ESTAT_NOTIFICACIO: Permet al sistema que va sol?licitar la creació de la notificació telemàtica ser informat de les transicions automàtiques d'estat. E-Notum gestiona el cicle de vida dels estats associats a les notificacions telemàtiques. És responsable de realitzar certs canvis d'estat sobre la base de timeouts. Quan es produeixen aquests canvis d'estat, és necessari notificar-los al sistema que va sol?licitar la creació de la notificació.
* NT_ERROR_ENVIAMENT_NOTIFICACIO: Aquesta modalitat de consum permet el lliurament des de eNotum als BO dels errors que s'ha produït en el tractament de les trameses de notificacions enviades pels backoffice durant el processament de les notificacions.

Així doncs, PICA reb les notificacions de l'emissor amb els diferents errors que s'han produït i els envia al BO corresponent.

Ambdues necessiten la publicació d'un WebService per part del consumidor del Servei (BO).

## Instal.lació i Configuració

### Instal.lació

Per instal.lar el WebService de notificacions electròniques s'han d'afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.integration.notificacions.electroniques.version.ws>[2.1.0,2.2.0)</canigo.integration.notificacions.electroniques.version.ws>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.notificacions.electroniques.ws</artifactId>
          <version>${canigo.integration.notificacions.electroniques.version.ws}</version>
</dependency>
```

i en l'apartat de repositoris

```
<repository>
      <id>org.springframework.security.taglibs.facelets</id>
      <url>http://spring-security-facelets-taglib.googlecode.com/svn/repo/</url>
</repository>
```

### Configuració

La configuració del WS es porta a terme a través de l'arxiu "app-custom-enotumWS.xml". Es recomana que es posi en src/main/resources/spring/app-custom-enotumWS.xml.

El contingut d'aquest arxiu és el següent:

```
<bean id="notificacionsElectroniquesAppService" class="[Classe on es troba la implementació dels mètodes exposats al WS]"/>

    <bean id="notificacionsElectroniquesServiceEndpoint" class="cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.endpoint.NotificacionsElectroniquesEndpoint">
        <property name="NotificacionsElectroniquesService" ref="notificacionsElectroniquesAppService"/>
    </bean>


    <bean id="eNOTUMService" class="org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition"
          p:portTypeName="eNOTUMService" //<--Nom del Servei Web (configurable)
          p:locationUri="/ws/services/ENotumService/" //<--Path del Servei Web (configurable)
          p:targetNamespace="http://gencat.net/scsp/esquemes/productes/nt/services">
          <property name="SchemaCollection" ref="schemaCollection"/>
          <property name="createSoap11Binding" value="false"/>
          <property name="createSoap12Binding" value="true"/>
    </bean>

     <bean id="schemaCollection" class="org.springframework.xml.xsd.commons.CommonsXsdSchemaCollection">
        <property name="xsds">
            <list>
                <value>classpath:cat/gencat/ctti/canigo/arch/support/notificacions/electroniques/config/xsd/NTServices.xsd</value>
               </list>
        </property>
        <property name="inline" value="true"/>
    </bean>

    <bean id="messageFactory" class="org.springframework.ws.soap.saaj.SaajSoapMessageFactory">
          <property name="soapVersion" value="SOAP_12" />
      </bean>

     <bean id="marshaller" class="org.springframework.oxm.jaxb.Jaxb2Marshaller"
          p:contextPath="net.gencat.scsp.esquemes.productes.nt:net.gencat.scsp.esquemes.productes.nt.notificacions:net.gencat.scsp.esquemes.productes.nt.services"/>

    <bean id="marshallingPayloadMethodProcessor" class="org.springframework.ws.server.endpoint.adapter.method.MarshallingPayloadMethodProcessor">
        <constructor-arg ref="marshaller"/>
    </bean>

    <bean id="defaultMethodEndpointAdapter" class="org.springframework.ws.server.endpoint.adapter.DefaultMethodEndpointAdapter">
        <property name="methodArgumentResolvers">
            <list>
                <ref bean="marshallingPayloadMethodProcessor"/>
            </list>
        </property>
        <property name="methodReturnValueHandlers">
            <list>
                <ref bean="marshallingPayloadMethodProcessor"/>
            </list>
        </property>
    </bean>
```

## Utilització del Web Service

Per poder utilitzar el WebService de Enotum en una aplicació Canigó3 s'han de seguir els següents passos;

1.- Modificar el web.xml de l'aplicació per afegir el servlet següent:

```
<!-- Web Service Enotum -->
    <servlet>
        <servlet-name>NT_WS</servlet-name>
        <servlet-class>org.springframework.ws.transport.http.MessageDispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/app-custom-enotumWS.xml</param-value>
        </init-param>
        <init-param>
            <param-name>transformWsdlLocations</param-name>
            <param-value>true</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>NT_WS</servlet-name>
        <url-pattern>/ws/*</url-pattern>
    </servlet-mapping>
```

Posar immediatament a sobre de:

```
<!--
Session timeout: 30 minutes
-->
 <session-config>
  <session-timeout>30</session-timeout>
 </session-config>
```

2.- Configurar els beans **notificacionsElectroniquesAppService** i **eNOTUMService** de l'arxiu src/main/resources/spring/app-custom-enotumWS.xml de la següent forma:

* notificacionsElectroniquesAppService: Nom de la classe que implementaran les accions a portar a terme a partir de la resposta rebuda pel servei. Un exemple:

```java
import net.gencat.scsp.esquemes.productes.nt.notificacions.NotificacioCanviEstat;
import net.gencat.scsp.esquemes.productes.nt.notificacions.NotificacioCanviEstat.Notificacio;
import net.gencat.scsp.esquemes.productes.nt.notificacions.NotificacioError;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.NotificacionsElectroniquesService;
import cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.exepcions.NotificacionsElectroniquesModuleExcepcion;


public class NotificacionsElectroniquesServiceBasicImpl implements NotificacionsElectroniquesService {

    private static final Log LOGGER = LogFactory.getLog(NotificacionsElectroniquesServiceBasicImpl.class);
    public void entregarCanviEstatNotificacio(NotificacioCanviEstat notificacioCanviEstat) throws NotificacionsElectroniquesModuleExcepcion {
        if (LOGGER.isDebugEnabled()){
            LOGGER.debug("Recepció per part del sistema requeridor de notificacions telemàtiques dels canvis d'estat automàtics de la NT.");
        }

        if (notificacioCanviEstat != null && notificacioCanviEstat.getNotificacio() != null) {
            if (LOGGER.isDebugEnabled()){
                for (Notificacio notificacio : notificacioCanviEstat.getNotificacio()) {
                    LOGGER.debug("Notificació: " + notificacio.getIdNotificacio() + ". Estat :" + notificacio.getDescEstat() + "(" + notificacio.getCodiEstat()+ ")");
                }
            }
        } else {
            LOGGER.error("Sense notificacions");
            throw new NotificacionsElectroniquesModuleExcepcion("Sense notificacions");
        }
    }

    public void errorEnviamentNotificacio(NotificacioError notificacioError) throws NotificacionsElectroniquesModuleExcepcion {
        if (LOGGER.isDebugEnabled()){
            LOGGER.debug("Recepció per part del sistema requeridor de notificacions telemàtiques dels errors durant la creació de la NT.");
        }

        if (notificacioError != null) {
            if (LOGGER.isDebugEnabled()){
                LOGGER.debug("Error en la recepció de la notificació: " + notificacioError.getIdNotificacio() + ". Codi error: " + notificacioError.getCodiError());
            }
        } else {
            LOGGER.error("Sense error a la notificació");
            throw new NotificacionsElectroniquesModuleExcepcion("Sense error a la notificació");
        }
    }
}
```
* eNOTUMService: Nom del Bean on es configura el nom del WebService i la ruta d'accés a ell. Un exemple:

```
<bean id="eNOTUMService" class="org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition"
         p:portTypeName="eNOTUMService" //<--Nom del Servei Web (configurable)
         p:locationUri="/ws/services/ENotumService/" //<--Path del Servei Web (configurable)
         p:targetNamespace="http://gencat.net/scsp/esquemes/productes/nt/services">
         <property name="SchemaCollection" ref="schemaCollection"/>
         <property name="createSoap11Binding" value="false"/>
         <property name="createSoap12Binding" value="true"/>
</bean>
```

En el cas de l'exemple, el WS es podrà accedir en http://(Host)/(NomApp)/ws/services/ENotumService/eNOTUMService.wsdl

**IMPORTANT:** Tindre en compte que la url del Servei Web ha de ser coneguda prèviament per Enotum. Normalment s'informa en el document d'alta que la PICA subministra per consumir els serveis d'ENOTUM.
