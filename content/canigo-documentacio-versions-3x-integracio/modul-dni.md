+++
date        = "2015-03-19T17:42:01+01:00"
title       = "DNI"
description = "Servei de verificació i consulta de DNI de la DGP."
sections    = "Canigó. Documentació versió 3.x"
weight      = 3
+++

## Introducció

L'objectiu d'aquest connector, és el de proporcionar un punt d'accés utilitzant la plataforma PICA cap servei de verificació i consulta de DNI de la DGP.

## Propòsit

El propòsit del connector és proporcionar una interfície funcional reduida al connector de la Pica que simplifica l'utilització del servei de consulta i verificació de DNI's ofert per la generalitat.

## Context i Escenaris d'ús

El connector PICA-DNI es troba dins els connectors de serveis funcionals de la Generalitat.

## A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Descripció Detallada

Aquest connector permet realitzar les següents funcionalitats referents a les següent operacions amb un DNI:

**Funcionalitats de Consulta**

* Consulta Bàsica: Funcionalitat que permet la consulta de les dades d'un DNI subministrant un conjunt mínim de dades.
* Consulta Estesa: Funcionalitat que permet la consulta de les dades d'un DNI donant la possibilitat d'escollir d'entre un conjunt més ampli de dades d'entrada.

**Funcionalitats de Verificació**

* **Verificació Bàsica:** Funcionalitat que permet la verificació de les dades d'un DNI subministrant un conjunt mínim de dades.
* **Verificació Estesa:** Funcionalitat que permet la verificació de les dades d'un DNI donant la possibilitat d'escollir d'entre un conjunt més ampli de dades d'entrada.

## Arquitectura i Components

### Interfícies i Components Genèrics

Es pot trobar el codi font referent aquests components a les següents url's:

Codi Font : https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/cat/gencat/ctti/canigo.integration.dni.pica/

### Requeriments

El connector DNI és compatible amb les versions 1.5 o superior de Java. Per versions inferiors no es garantit el seu correcte funcionament.

Per tal de que el connector DNI funcioni correctament sobre l'aplicació que l'utilitzi, s'ha de tenir configurat el servei [connector genèric de la PICA](/canigo-documentacio-versions-3x-integracio/modul-pica/) 1.2.0.

## Configuració

Per configurar el mòdul d'integració PICA-DNI és necessari configurar els següents arxius:

1.- Importar el mòdul PICA-DNI amb el plugin de Canigó 3 de l'eclipse o bé incorporar manualment les seves dependències en el pom.xml de l'aplicació.

En el pom.xml;

```
<canigo.integration.dni.pica.version>[1.3.0,1.4.0)</canigo.integration.dni.pica.version>
...

<!-- Dependencia del mòdul PICA-DNI -->
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.dni.pica</artifactId>
    <version>${canigo.integration.dni.pica.version}</version>
</dependency>
```

2.- Crear l'arxiu /config/props/dni.properties amb el següent contingut:

```
*.dni.finalitat=[finalitat]
*.dni.urlPica=[urlPica]
*.dni.nifEmisor=[nifEmisor]
*.dni.nomEmisor=[nomEmisor]
*.dni.nomFuncionari=[nomFuncionari]
*.dni.nifFuncionari=[nifFuncionari]
*.dni.emailFuncionari=[emailFuncionari]
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

4.- Configurar l'arxiu /spring/app-integration-dni.xml amb el següent contingut:

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

### Exemple d'utilització Consulta de DNI

Recuperar el bean del servei de DNI des de la classe on es vol utilitzar:

```java
@Autowired
private DniConnectorImpl dniConnector;
```

Fer la crida a la modalitat del servei desitjat, p.e.:

```java
DadesConsultaDni resposta = dniConnector.dniConsultaBasica(numero_document, tipus_document, cognom1, anyNaixement);
```

on, **numero_document** correspon al valor del número del document utilitzat i **tipus_document** correspon al tipus de document que es vol subministrar (Constants.DNI, Constants.NIE, Constants.NIF).
És obligatori informar el **cognom1**(primer Cognom) o bé l'**anyNaixement**

En cas que es vulgui sobreescriure les dades del funcionari especificats en el fitxer dni.properties, és possible fer-ho abans de fer la crida al servei:

```java
Funcionari funcionari = new Funcionari();
funcionari.setNombreFuncionario("Nom Cognoms Funcionari");
funcionari.setNifFuncionario("NIF");
funcionari.setEmailFuncionario("mail");

dniConnector.setFuncionari(funcionari);

Per consultar l'estat de la resposta;

EstatResultat estat = resposta.getEstat();
```

* En cas de que les dades no corresponguin amb un DNI, típicament es retornaran aquestes dades:

```java
Assert.assertEquals("TITULAR NO IDENTIFICADO", estat.getDescripcio());
Assert.assertEquals("0233", estat.getCodiEstat());
```

* En cas de que les dades si corresponguin a un DNI, típicament es retornaran les següents dades:

```java
Assert.assertEquals("TRAMITADA", estat.getDescripcio());
Assert.assertEquals("0003", estat.getCodiEstat());
```

Les dades associades a la consulta d'un DNI es poden recuperar amb:

```java
resposta.getTitular();
```

Per consultar la totalitat de possibles codis de retorn consultar el document de la PICA Guia d'us del servei de DNI v.1.9.pdf disponible via petició a requeridors.otpica.ctti@gencat.cat

### Exemple d'utilització Verificació DNI

Recuperar el bean del servei de DNI des de la classe on es vol utilitzar:

```java
@Autowired
private DniConnectorImpl dniConnector;
```

Fer la crida a la modalitat del servei desitjat, p.e.:

```java
EstatResultat resposta = dniConnector.dniVerificacioBasica(numero_document, tipus_document, nom, cognom1, cognom2, sexe);
```

on, **numero_document** correspon al valor del número del document utilitzat;<br>
**tipus_document** correspon al tipus de document que es vol subministrar (Constants.DNI, Constants.NIE, Constants.NIF);<br>
**nom** nom del titular del DNI;<br>
**cognom1** primer cognom del titular del DNI;<br>
**cognom2** segon cognom del titular del DNI;<br>
**sexe** sexe del titular del DNI (Constants.MASCULI o Constants.FEMENI)

* En cas de que les dades no corresponguin amb un DNI, típicament es retornaran aquestes dades:

```java
Assert.assertEquals("TITULAR NO IDENTIFICADO", resposta.getDescripcio());
Assert.assertEquals("0233", resposta.getCodiEstat());
```

* En cas de que les dades si corresponguin a un DNI, típicament es retornaran les següents dades:

```java
Assert.assertEquals("TRAMITADA", estat.getDescripcio());
Assert.assertEquals("0003", estat.getCodiEstat());
```

Per consultar la totalitat de possibles codis de retorn consultar el document de la PICA **Guia d'us del servei de DNI v.1.9.pdf** disponible via petició a requeridors.otpica.ctti@gencat.cat
