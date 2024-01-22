+++
date        = "2022-05-23"
title       = "Servei de Signatura Centralitzada - SSC"
description = "Serveis d'accés al Sistema de Signatura Centralitzada de Catcert."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 12
+++

## Introducció

L'objectiu d'aquest connector és proporcionar accés al Sistema de Signatura Centralitzada de Catcert (SSC). Aquest component, el qual es troba dins els connectors de serveis funcionals de la Generalitat, proporciona una interfície que utilitza l'API SmartWrapper per poder donar accés als diferents tipus de signatura que ofereix l'SSC.

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

Aquest connector permet utilitzar els diferents serveis de signatura del SSC a través d'una API que el mateix component ofereix. El nucli principal del SSC és el sistema TrustedX que ofereix l'API SmartWrapper per poder treballar amb ell. És amb aquesta API amb la qual està constituït aquest connector.

Els principals serveis que ofereix el connector són els següents:

* Accés a la plataforma amb certificat: Totes les aplicacions que desitgin utilitzar l'SSC hauran de disposar d'un certificat amb el qual s'autenticaran per utilitzar la plataforma. Aquest certificat s'haurà de demanar a CatCert.
* Ús de magatzem de certificats: Una de les principals funcionalitats del SSC és la signatura desatesa. Això s'aconsegueix configurant en el connector un magatzem de certificats que l'SSC utilitzarà per als diferents processos de signatura.

* Tipus de signatura: L'SSC ofereix els següents tipus de signatura.
    * CMS: Attached / Detached / Detached Hash
    * CAdES-BES: Attached / Detached / Detached Hash
    * CAdES-T: Attached / Detached / Detached Hash
    * CMS-PDF: Attached / Detached
    * CAdES-BES-PDF: Attached / Detached
    * CAdES-T-PDF: Attached / Detached
    * XMLDSig: Enveloping / Enveloped / Detached / Detached Hash
    * XAdES-BES: Enveloping / Enveloped / Detached / Detached Hash
    * XAdES-T: Enveloping / Enveloped / Detached / Detached Hash

* Suport per a fitxers grans amb els tipus de signatura:
    * CAdES-BES: Attached / Detached
    * CAdES-BES-PDF: Attached / Detached
    * XAdES-BES: Enveloping / Enveloped / Detached

Actualment el connector de Canigó de la versió 3.8 utilitza el client de SSC versió 1.3.3 

### Alta Servei

Per poder utilitzar l'SSC en PRO s'ha d'estar donat d'alta en el servei. Per poder fer-ho s'han de seguir els següents passos:

1. Enviar un correu electrònic a implantacio@aoc.cat sol·licitant l'alta al servei. Aquí s'espera que l'usuari informi del tipus de signatures que vol generar i se l'informarà del tipus de certificats que ha de sol- licitar.

2. Els certificats a sol·licitar s'hauran de fer a través d'EACAT.

3. Finalment, el client haurà d'omplir un document d'alta al SSC, on haurà d'especificar el certificat amb el qual s'autenticarà, així com els certificats de signatura allotjats en TrustedX que utilitzarà per signar.

4. Una vegada validat el document d'alta, se li donarà accés al SSC en PRO.

De cara a utilitzar el servei en PRE, els certificats i documentació necessària es poden demanar obrint una petició a suport@aoc.cat.

### Arquitectura i Components

#### Interfícies i Components Genèrics

Si disposa de permís d'accès al repositori del servidor Nexus del SIC, podrà trobar el codi font referent a aquests component a la següent URL: [Codi Font Connector SSC](https://hudson.intranet.gencat.cat/nexus/#browse/search/maven=attributes.maven2.artifactId%3Dcanigo.integration.ssc).

#### Requeriments

Per a versions 1.8 o superior de Java a l'entorn de Preproducció és necessari afegir la següent propietat per habilitar TLSv1.0: 
```
PropertyAllowTls10AsClient=true
```

Tal i com indica la a Guia d'integració al SSC, aquest connector utilitza llibreries externes que es recomana revisar, ja que poden arribar a donar conflicte amb les llibreries d'una aplicació ja desenvolupada.

### Instal·lació i Configuració

#### Instal·lació

La instal·lació del connector requereix la utilització de la llibreria 'canigo.integration.ssc', per afegir aquesta dependència s'ha de modificar el pom.xml de l'aplicació per incloure la llibreria del Connector:

```
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.ssc</artifactId>
    <version>${canigo.integration.ssc.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

#### Configuració

1.- Per poder configurar el connector SSC és necessari crear un arxiu anomenat app-integration-ssc.xml situat en src/main/resources/spring/ amb el següent contingut:

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">


	<bean id="sscService" class="cat.gencat.ctti.canigo.arch.integration.ssc.impl.SscConnectorImpl">

		<description>
			SSC Service for Canigó 3.8
		</description>

		<property name="host" value="${ssc.host}" />
		<property name="distinguishedname" value="${ssc.distinguishedname}" />
		<property name="dipositari" value="${ssc.dipositari}" />
		<property name="rol" value="${ssc.rol}" />
	</bean>
	
</beans>
```

on les variables ssc.host, ssc.distinguishedname, ssc.dipositari i ssc.rol són recuperades de l'arxiu ssc.properties que s'ha de crear en src/main/resources/config/props/ssc.properties


2.- Configuració dels arxius de _properties_, existeixen dos arxius de propietats per poder configurar l’SSC:

a) El ssc.properties, que conté els següents paràmetres:

* ssc.host: Url del servidor on es troba l'SSC.
    * PRE: https://ssc.preproduccio.catcert.cat:8443/trustedx-gw/SoapGateway
    * PRO: https://ssc.catcert.cat:8443/trustedx-gw/SoapGatewayU1T

* ssc.distinguishedname: Nom del certificat amb el qual l'aplicació s'autentica per consumir els serveis del SSC.

* ssc.dipositari: Ens a afegir a la capçalera de la petició a SSCC.

* ssc.rol: Rol d'usuari a afegir a la capçalera de la petició a SSCC.

b) El smartwrapper.properties conté la configuració de l'API SmartWrapper de TrustedX i està documentat a la Guia d’integració al SSC.
La ubicació d'aquest arxiu es recomana que sigui en el directori src/main/resources de l'aplicació que utilitzi el connector.

NOTA: Les dades de proves del connector relacionades amb certificats de proves s'han de demanar a CatCert.

### Utilització del Connector

1.- En el _bean_ on es vulgui disposar dels serveis del connector declarar el servei.

```java
@Autowired
private SscConnector sscConnector;
```

2.- Escollir una modalitat de signatura i passar-li els paràmetres que necessiti. En el cas d'aquest exemple es farà una signatura CAdES-BES en mode ATTACHED.

```java
final String filename = FILENAME_HELLOWORLD_TXT;

log.info("[INI][signCadesBesAttached]");

String inFilename = getInFilename(DOCS_TO_SIGN_PATH_IN, filename);
log.info("[INFO][Arxiu a signar: " + inFilename);
String data = Util.readBinaryFileB64(inFilename);

String resposta = sscConnector.signCadesBes(data, Constants.ATTACHED);

String destFilename = getDestFilename(CADES_SIGNATURES_PATH_OUT + SEPARADOR_PATH, filename,
		"_Signature_CAdES_BES_Attached.txt");
Util.writeBinaryFileB64(destFilename, resposta);
		
log.info("[INFO][Arxiu signat: " + destFilename);

log.info("[FIN][signCadesBesAttached]");
```

On:

- FILENAME_HELLOWORLD_TXT: És el nom del fitxer a enviar.

- DOCS_TO_SIGN_PATH_IN: És el _path_ del fitxer a enviar.

- CADES_SIGNATURES_PATH_OUT: És el _path_ on guardar la resposta.

- SEPARADOR_PATH: És el separador de _path_ segons el sistema operatiu.

- getInFilename: mètode que retorna el _path_ i nom del fitxer a enviar.

- getDestFilename: mètode que retorna el _path_ i nom del fitxer on guardar la resposta.


Per més informació sobre els diferents mètodes que ofereix el connector SSC es pot consultar l'API, disponible consultant el codi font del connector SCC el qual es pot trobar al Nexus.

## Documentació de referència

Per més informació, es pot consultar la [Guia d'integració al SSC](/related/canigo/documentacio/modul-ssc/guiaintegraciossc-v1-3-3.pdf "Guia Integració SSC").
