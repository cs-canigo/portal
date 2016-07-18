+++
date        = "2015-03-20T13:04:49+01:00"
title       = "Avisos i  alertes"
description = "Serveisd'enviament de SMS i CORREU del CTTI a través del servei AVISALERT de la PICA."
section     = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Introducció

L'objectiu d'aquest connector és el de proporcionar accés als serveis d'enviament de SMS i CORREU del CTTI a través del servei AVISALERT de la PICA.

### Propòsit

El propòsit del connector és proporcionar una interfície funcional reduïda al connector de la Pica que simplifica l'utilització dels diferents serveis d'enviament de SMS i MAIL oferts per la generalitat.

### Context i Escenaris d'ús

El connector PICA-AVISALERT es troba dins els connectors de serveis funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

Aquest connector permet utilitzar les diferents modalitats del servei AVISALERT en les seves modalitats asíncrones i síncrones, a través de les modalitats de sevei següents:

Serveis Síncrons

* AVISALERT_SMS
* AVISALERT_CORREU-E

Serveis Asíncrons

* AVISALERT_SMS

### Arquitectura i Components

#### Interfícies i Components Genèrics

Es pot trobar el codi font referent a aquest component a la següent url:

Codi Font:  http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.avisosalertes.pica/1.1.2/

#### Requeriments

El connector AVISALERT és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

Per tal de que el connector AVISALERT funcioni correctament sobre l'aplicació que l'utilitzi, s'ha de tenir configurat el servei connector genèric de la PICA 1.1.0.

### Configuració

Per configurar el mòdul d'integració PICA-AVISALERT és necessari configurar els següents arxius:

1.- Importar el mòdul PICA-AVISALERT amb el plugin de Canigó 3 de l'eclipse o bé incorporar manualment les seves dependències en el pom.xml de l'aplicació.

En el pom.xml:

```
<canigo.integration.avisosalertes.pica.version>[1.1.0,1.2.0)</canigo.integration.avisosalertes.pica.version>
...

<!-- Dependencia del mòdul PICA-AVISALERT -->
<dependency>
    <groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.integration.avisosalertes.pica</artifactId>
	<version><version>${canigo.integration.avisosalertes.pica.version}</version></version>
</dependency>

```

2.- Crear l'arxiu /config/props/avisalert.properties amb el següent contingut:

```
*.avisosalertes.pica.finalitat=[finalitat]
*.avisosalertes.pica.urlPica=http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.avisosalertes.pica.nifEmisor=[nifEmisor]
*.avisosalertes.pica.nomEmisor=[nomEmisor]
*.avisosalertes.nomFuncionari=[nomFuncionari]
*.avisosalertes.nifFuncionari=[nifFuncionari]
*.avisosalertes.emailFuncionari=[emailFuncionari]
```

Els valors de finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

NOTA: El valor per defecte de urlPica es la de l'entorn de Pre-producció.

3.- Configurar l'arxiu /config/props/pica.properties amb el següent contingut:

```
*.pica.modes.passwordType=PasswordText
*.pica.requirer.signatureFile=classpath:config/cert/signature.properties
*.pica.requirer.petitionerId=[petitionerId]
*.pica.requirer.transmitionId=[transmitionId]
*.pica.requirer.petitionerName=[petitionerName]
*.pica.requirer.password=[password]
*.pica.requirer.user=[password]
*.pica.axisdefinition.location=classpath:axis2client/
*.pica.trustStore.location=classpath:config/cert/certificats.jks
*.pica.trustStore.type=JKS
*.pica.trustStore.password=[trustStore.password]
```

Els valors entre [] s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

4.- Configurar l'arxiu /spring/app-integration-avisalert.xml amb el següent contingut:

```
<!-- BEAN DE LA PICA -->
<bean id="picaService" class="cat.gencat.ctti.canigo.arch.integration.pica.PicaServiceWrapperImpl" scope="prototype">
    <property name="axisDefinition" value="${pica.axisdefinition.location}"/>
    <property name="trustStoreSSLKeystore" value="${pica.trustStore.location}" />
    <property name="trustStoreSSLKeystoreType" value="${pica.trustStore.type}" />
    <property name="trustStoreSSLKeystorePassword" value="${pica.trustStore.password}" />
    <property name="requeridor" ref="requeridor"/>
    <property name="modalitats">
        <map>

        </map>
    </property>
</bean>
```

Les propietats trustStoreSSLKeystore, trustStoreSSLKesytoreType i trustStoreSSLKeystorePassword només són necessàries en cas d'accedir a la url de la PICA mitjançant HTTPS.

### Utilització del Connector

#### Exemple d'utilització d'un Servei Síncron

1.- En el bean on es vulgui disposar dels serveis del connector declarar el servei.

```java
@Autowired
private AvisosAlertesConnectorImpl avisalertService;
```

2.- Escollir una modalitat de servei síncrona i cridar-la amb els paràmetres que necessiti. En aquest cas es mostra un exemple amb la modalitat d'enviament de correu electrònic:

```java
String from = "from@cscanigo.com";
String to = "to@cscanigo.com";
String title = "cscanigo";
String message = "Això és una prova";
String arxiu = null;
String resposta = avisalertService.avisAlertCorreuESincron(from, to, title, message, arxiu);
```

L'estat de finalització dependrà del codi retornat:

Per consultar la totalitat de possibles codis de retorn i el detall exacte dels objectes retornats consultar el document de la PICA **Guia d'us del servei Avisos i Alertes v2.2.pdf** disponible via petició a requeridors.otpica.ctti@gencat.cat

#### Exemple d'utilització d'un Servei Asíncron

1.- La modalitat d'enviament de SMS, AVISALERT_SMS, suporta l'enviament síncron i asíncron, l'exemple que segueix utilitzarà la seva variant asíncrona. Per poder utilitzar aquesta modalitat de consum el connector de Canigó 3 preveu tres mètodes diferents:

```java
public DataResponse avisAlertSMSsimpleASincron(String serviceNumber, String mobile, String message) throws AvisosAlertesException;
public EstatAsincron getEstatAvisAlertSMSASincron(CridaAsincronaResponseDocument response) throws AvisosAlertesException;
public String getDadesAvisAlertSMSASincron(IPICAServiceAsincron servei) throws AvisosAlertesException;
```

2.- El primer serveix per carregar les dades de la consulta al servei i fer la primera petició. Donat que és un servei asíncron retorna un objecte amb l'estat actual de la petició i el temps estimat de finalització d'aquesta.

Igual que en les peticions síncrones, s'inicialitza el bean del servei del connector:

```java
@Autowired
private AvisosAlertesConnectorImpl avisosAlertesConnector;
```

Es crida al servei amb les dades pertinents;

```java
String mobile = MOV_NUMBER;
String serviceNumber = "6666";
String message = "Test";
			
DataResponse resposta = avisosAlertesConnector.avisAlertSMSsimpleASincron(serviceNumber, mobile, message);
```

3.- El segon serveix per anar comprovant l'estat de la consulta de forma periòdica. Igual que el primer mètode retorna un objecte amb l'estat actual de la petició i el temps estimat per la seva resolució.

```java
EstatAsincron estat = avisosAlertesConnector.getEstatAvisAlertSMSASincron(resposta.getResponse());
```

4.- Finalment el tercer mètode recupera el resultat de la petició una vegada confirmat que la petició ha finalitzat.

```java
String dades = avisosAlertesConnector.getDadesAvisAlertSMSASincron(resposta.getServei());
```

Per consultar la totalitat de possibles codis de retorn i el detall exacte dels objectes retornats consultar el document de la PICA **Guia d'us del servei Avisos i Alertes v2.2.pdf** disponible via petició a requeridors.otpica.ctti@gencat.cat
