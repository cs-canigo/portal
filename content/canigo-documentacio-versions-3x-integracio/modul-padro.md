+++
date        = "2015-03-20T10:28:07+01:00"
title       = "Padró"
description = "Serveis d'empadronament publicats de la plataforma PICA."
section     = "Documentació versió 3.x"
weight      = 9
+++

## Introducció

L'objectiu d'aquest connector, és el de proporcionar un punt d'accés utilitzant la plataforma PICA cap serveis d'empadronament publicats en aquesta plataforma.

### Propòsit

El propòsit del connector és proporcionar una interfície funcional reduïda al connector de la Pica que simplifica l'utilització dels diferents serveis d'empadronament oferts per la generalitat.

### Context i Escenaris d'ús

El connector PICA-PADRO es troba dins els connectors de serveis funcionals de la Generalitat.

### A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

Aquest connector permet utilitzar els diferents serveis del PADRO a través de l'accés a través d'una API de les següents modalitats de consum:

Serveis Síncrons

* PADRO_COMPROVACIO_CONVIVENTS
* PADRO_DADES_CONVIVENTS_PDF
* PADRO_DADES_CONVIVENTS
* PADRO_DADES_TITULAR
* PADRO_DADES_TITULAR_INE
* PADRO_DADES_TITULAR_PDF
* PADRO_MUNICIPI_RESIDENCIA
* PADRO_NUMERO_CONVIVENTS
* PADRO_RESIDENT
* PADRO_RESIDENT_MUNICIPI
* PADRO_VALIDACIO_CONVIVENTS

Serveis Asíncrons

* PADRO_TITULAR_CERCA

## Arquitectura i Components

### Interfícies i Components Genèrics

Es pot trobar el codi font referent aquests components a la següent url:

Codi Font:  http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.padro.pica/1.1.1/

### Requeriments

El connector PADRO és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

Per tal de que el connector PADRO funcioni correctament sobre l'aplicació que l'utilitzi, s'ha de tenir configurat el servei connector genèric de la PICA 1.0.

## Configuració

Per configurar el mòdul d'integració PICA-PADRO és necessari configurar els següents arxius:

1.- Importar el mòdul PICA-PADRO amb el plugin de Canigó 3 de l'eclipse o bé incorporar manualment les seves dependències en el pom.xml de l'aplicació.

En el pom.xml:

```
<canigo.integration.padro.pica.version>[1.1.0,1.2.0)</canigo.integration.padro.pica.version>
...

<!-- Dependencia del mòdul PICA-PADRO -->
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.padro.pica</artifactId>
    <version>${canigo.integration.padro.pica.version}</version>
</dependency>

```

2.- Crear l'arxiu /config/props/padro.properties amb el següent contingut:

```
*.padro.pica.finalitat=[finalitat]
*.padro.pica.urlPica=http://preproduccio.pica.intranet.gencat.cat/pica_cataleg/AppJava/services/
*.padro.pica.nifEmisor=[nifEmisor]
*.padro.pica.nomEmisor=[nomEmisor]
*.padro.pica.nomFuncionari=[nomFuncionari]
*.padro.pica.nifFuncionari=[nifFuncionari]
*.padro.pica.emailFuncionari=[emailFuncionari]
```

Els valors d finalitat, urlPica, nifEmisor i nomEmisor s'han de consultar a la OT PICA en requeridors.otpica.ctti@gencat.cat

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

4.- Configurar l'arxiu /spring/app-integration-padro.xml amb el següent contingut:

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

## Utilització del Connector
 
### Exemple d'utilització d'un Servei Síncron

1.- En el bean on es vulgui disposar dels serveis del connector declarar el servei.

```java
@Autowired
private PadroConnectorImpl padroService;
```

2.- Escollir una modalitat de servei síncrona i cridar-la amb els paràmetres que necessiti. En aquest cas es mostra un exemple amb la modalitat padroComprovacioConvivents:

```java
String numExpedient = "CAT-1234567890ABCDEF";
int tipusDocumentacio = Constants.NIE;
String documentacio = "X02649265X";
String codMun = "999";
int numConv = 99;
String codProv = "1";
int idesCat = 0;

RespuestaComprobacionConvivientes resposta = padroService.padroComprovacioConvivents(
    numExpedient,
    tipusDocumentacio,
    documentacio,
    codMun,
    codProv,
    numConv,
    idesCat
);
```

L'estat de finalització dependrà del codi retornat:

```java
resposta.getCodigoResultado();
```

Per consultar la totalitat de possibles codis de retorn i el detall exacte dels objectes retornats consultar el document de la PICA Guia d'us del servei de **PADRO v1.5x.pdf** disponible via petició a requeridors.otpica.ctti@gencat.cat

### Exemple d'utilització d'un Servei Asíncron

1.- L'únic servei asíncron que ofereix el servei de PADRO és el PADRO_TITULAR_CERCA. Per poder utilitzar aquesta modalitat de consum el connector de Canigó 3 preveu tres mètodes diferents:

```java
public RespostaCercaTitular  padroTitularCerca(String numExpedient, int tipusDocumentacio, String documentacio) throws PadroException;
public EstatAsincron getEstatPadroTitularCerca(CridaAsincronaResponseDocument response) throws PadroException;
public RespostaCercaTitular getDadesPadroTitularCerca(IPICAServiceAsincron servei) throws PadroException;
```

2.- El primer serveix per carregar les dades de la consulta al servei i fer la primera petició. Donat que és un servei asíncron retorna un objecte amb l'estat actual de la petició i el temps estimat de finalització d'aquesta.

Igual que en les peticions asíncrones s'inicialitza el bean del servei del connector;

```java
@Autowired
private PadroConnectorImpl padroService;
```

Es crida al servei amb les dades pertinents:

```java
String numExpedient = "123456";
int tipusDocumentacio = Constants.NIF;
String documentacio = "46583836G";

RespostaCercaTitular resposta = padroConnector.padroTitularCerca(numExpedient, tipusDocumentacio, documentacio);
```

3.- El segon serveix per anar comprovant l'estat de la consulta de forma periòdica. Igual que el primer mètode retorna un objecte amb l'estat actual de la petició i el temps estimat per la seva resolució.

```java
EstatAsincron estat = padroConnector.getEstatPadroTitularCerca(resposta.getResponse());
```

4.- Finalment el tercer mètode recupera el resultat de la peticó una vegada confirmat que la petició ha finalitzat.

```java
RespostaCercaTitular dades = padroConnector.getDadesPadroTitularCerca(resposta.getServei());
```

Per consultar la totalitat de possibles codis de retorn i el detall exacte dels objectes retornats consultar el document de la PICA **Guia d'us del servei de PADRO v1.5x.pdf** disponible via petició a requeridors.otpica.ctti@gencat.cat
