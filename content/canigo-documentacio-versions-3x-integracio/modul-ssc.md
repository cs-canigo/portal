+++
date        = "2015-03-20T11:17:51+01:00"
title       = "SSC"
description = "Serveis d'accés al Sistema de Signatura Centralitzada de Catcert."
section     = "Documentació versió 3.x"
weight      = 15
+++

## Introducció

L'objectiu d'aquest connector és el de proporcionar accés al Sistema de Signatura Centralitzada de Catcert (SSC).

### Propòsit

El propòsit del connector és proporcionar una interfície que utilitzi l'API SmartWrapper per poder donar accés als diferents tipus de signatura que ofereix l'SSC.

### Context i Escenaris d'ús

El connector SSC es troba dins els connectors de serveis funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

### Documents i Fonts de Referència

| Nom Document
| ------------
| [GuiaIntegracioSSC.v1.1.pdf] (/related/canigo/documentacio/modul-ssc/GuiaIntegracioSSC.v1.1.pdf "Guia Integració SSC")

## Descripció Detallada

Aquest connector permet utilitzar els diferents serveis de signatura del SSC a través d'una API que el mateix connector ofereix. El nucli principal del SSC és el sistema TrustedX que ofereix l'API SmartWrapper per poder trevallar amb ell. És amb aquesta API amb la cual esta constituit aquest connector.

Els principals serveis que ofereix el connector són els següents:

* Accés a la plataforma amb certificat: Totes les aplicacions que desitgin utilitzar l'SSC hauran de disposar d'un certificat amb el qual s'autenticaran per utilitzar la plataforma. Aquest certificat s'haurà de demanar a CatCert.
* Us de magatzem de certificats: Una de les principals funcionalitats del SSC és la signatura desatesa. Això s'aconsegueix configurant en el connector un magatzem de certificats que l'SSC utilitzarà pels diferents processos de signatura.
* Tipus de signatura: L'SSC ofereix els següents tipus de signatura.
    * CMS: Attached / Detached
    * CAdES-BES: Attached / Detached
    * CAdES-T: Attached / Detached
    * XMLDSig: enveloping/enveloped/detached
    * XAdES-BES: enveloping/enveloped/detached
    * XAdES-T: enveloping/enveloped/detached

### Alta Servei

Per poder utilitzar l'SSC en PRO s'ha d'estar donat d'alta en el servei. Per poder fer-ho s'han de seguir els següents passos:

1. Enviar un mail a implantacio@aoc.cat sol- licitant l'alta al servei. Aquí s'espera que l'usuari informi del tipus de signatures que vol generar i se l'informarà del tipus de certificats que ha de sol- licitar.
2. Els certificats a sol- litar s'hauran de fer a través de EACAT.
3. Finalment, el client haurà d'omplir un document d'alta al SSC, on haurà d'especificar el certificat amb el que s'autenticarà, així com els certificats de signatura allotjats en TrustedX que utilitzarà per signar.
4. Una vegada validat el document d'alta, se li donarà accés al SSC en PRO.

De cara a utilitzar el servei en PRE, els certificats i documentació necessaria es poden demanar obrint una petició a suport@aoc.cat.

### Arquitectura i Components

#### Interfícies i Components Genèrics

Es pot trobar el codi font referent a aquests component a la següent url:

Codi Font:  http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.ssc/1.1.0/

#### Requeriments

El connector SSC és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

Donat que l'SSC s'ha desenvolupat per substituir altres sistemes de signatura anteriors s'ha desenvolupat per que sigui compatible amb components de Canigo 2.3.5 en endevant. Tot i això, s'ha de tindre en compte que conté una sèrie de dependències que podrien arribar a donar conflicte en una aplicació ja desenvolupada. Per aquest motiu es recomana consultar les seves dependències.

### Instal.lació i Configuració

#### Instal.lació

La instal.lació del connector requereix de la utilització de la llibreria 'canigo.integration.ssc' i les dependències indicades a l'apartat 'Introducció-Versions i Dependències'.

Per afegir aquesta dependència s'ha de modificar el pom.xml de l'aplicació per incloure la llibreria del Connector.

```
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.ssc</artifactId>
    <version>1.1.0</version>
</dependency>
```

El resultat dels processos de signatura moltes vegades són arrays de bytes que es troben codificats en Base64 amb classes d'Axis. Això fa que per la recuperació d'arxius s'hagi d'incorporar una llibreria més en el proyecte:

```
<dependency>
	<groupId>axis</groupId>
	<artifactId>axis</artifactId>
	<version>1.2.1</version>
</dependency>
```

#### Configuració


1.- Per poder configurar el connector SSC és necessari crear un arxiu anomenat app-integration-ssc.xml situat en src/main/resources/spring/ amb el següent contingut:

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
           http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">

	<!-- BEAN SSC -->
	<bean id="sscService" class="cat.gencat.ctti.canigo.arch.integration.ssc.impl.SscConnectorImpl" scope="prototype">
		<description>
			SSC Service for Canigo 3.1
		</description>
		<property name="host" value="${ssc.host}"/>
		<property name="distinguishedname" value="${ssc.distinguishedname}" /> 
	</bean>
	
</beans>
```

on les variables ssc.host i ssc.distinguishedname són recuperades de l'arxiu ssc.properties que s'ha de crear en src/main/resources/config/props/ssc.properties

2.- Configuiració dels arxius de properties.

Existeixen dos arxius de properties per poder confiurar l'SSC. El ssc.properties i el smartwrapper.properties.

El primer conté només dos paràmetres,

* ssc.host: Url del servidor on es troba l'SSC.
    * PRE: https://ssc.preproduccio.catcert.cat:8443/trustedx-gw/SoapGateway
    * PRO: https://ssc.catcert.cat:8443/trustedx-gw/SoapGatewayU1T

* ssc.distinguishedname: Nom del certificat amb el que l'aplicació s'autentica per consumir els serveis del SSC.

El segón, anomenat smartwrapper.properties conté la configuració de l'API SmartWrapper de TrustedX i esta documentat en el document [GuiaIntegracioSSC.v1.1.pdf](/related/canigo/documentacio/modul-ssc/GuiaIntegracioSSC.v1.1.pdf "Guia Integració SSC").

La ubicació d'aquest últim arxiu es recomana que sigui en el directori src/main/resoruces de l'aplicació que utilitzi el connector.

NOTA: Les dades de proves del connector relacionades amb certificats de proves s'han de demanar a CatCert

### Utilització del Connector


1.- En el bean on es vulgui disposar dels serveis del connector declarar el servei.

```java
@Autowired
private SscConnectorImpl sscService;
```

2.- Escollir una modalitat de signatura i passar-li els paràmetres que necessiti. En el cas d'aquest exemple es farà una signatura CAdES-BES en mode ATTACHED.

```java
final String path_in = "path_arxiu_entrada";
final String path_out = "path_arxiu_sortida";
final String filename = "HelloWorld.txt";
		
log.info("[INFO][Arxiu a signar: " + path_in + filename);
String data = Util.readBinaryFileB64(path_in + filename);
		
String resposta = sscService.signCadesBes(data, Constants.ATTACHED);
		
String destFilename = path_out + filename.substring(0, filename.lastIndexOf(".")) + "_Signature_CAdES_BES_Attached.p7b";
Util.writeBinaryFileB64(destFilename, resposta);
```

Per més informació sobre els diferents mètodes que ofereix el connector SSC es pot consultar l'API.