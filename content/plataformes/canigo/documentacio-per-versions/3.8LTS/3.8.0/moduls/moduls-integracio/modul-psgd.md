+++
date        = "2024-12-11"
title       = "ARESTA (PSGD)"
description = "Plataforma de Serveis de Gestió Documental"
sections    = "Canigó. Documentació Versió 3.8"
weight      = 8
+++

`Nota important:` **Aquesta guia és una còpia de la documentació del propi connector en la seva versió 3.6 de Canigó. S'està treballant per actualitzar aquest document perquè estigui alineat amb les novetats del connector migrat a Canigó 3.8. Aquest missatge s'eliminarà quan s'hagi acabat d'actualitzar aquesta documentació.**

## Introducció

L'objectiu d'aquest connector és proporcionar un punt d'accés cap a la Plataforma de Serveis de Gestió Documental (PSGD) també coneguda com a ARESTA.

## Propòsit

El propòsit del connector és proporcionar una interfície funcional que faciliti a les aplicacions l'ús de la PSGD.

## Context i Escenaris d'ús

El connector PSGD es troba dins els connectors de serveis funcionals de la Generalitat.

## A qui va dirigit

Aquest document va dirigit als següents perfils:

* Programador. Per conèixer l'ús del connector.
* Arquitecte. Per conèixer quins són els components i la configuració del connector.

## Documents i Fonts de Referència

| Nom Document
| ----------
| [PSGD Manual Integració](/related/canigo/documentacio/modul-psgd/PSGD_Manual_Integració_v6.0.pdf).

## Descripció Detallada

Aquest connector permet realitzar les següents accions:

**Funcionalitats de Documents**

* **Alta Document:** Alta d’un nou document en el sistema.
* **Baixa Document:** Baixa lògica d’un document del sistema.
* **Check-Out Document:** Marcatge d’un document com a no modificable per estar en possessió d’un determinat usuari i obtenció del document i les seves signatures.
* **Check-In Document:** Substitució d’un document existent en el sistema per un de nou i marcatge com a document modificable, amb les seves signatures associades, si s’escau
* **Editar Metadades Document:** Modificació de les metadades d’un document del sistema.
* **Obtenir Document:** Obtenció d’un document existent en el sistema i els identificadors únics de les seves versions prèvies.
* **Cercar Documents:** Cerca de documents en funció de les seves metadades i contingut.


**Funcionalitats d'Expedients**

* **Alta Expedient:** Alta d’un nou expedient en el sistema.
* **Baixa Expedient:** Baixa d’un expedient del sistema.
* **Assignar Document:** Assignar un document existent en el sistema a un expedient existent en el sistema.
* **Eliminar Assignació Document:** Eliminar l’assignació d’un document a un expedient.
* **Tancar Expedient:** Tancar un expedient existent en el sistema i generar el foliat.
* **Generar Foliat Parcial:** Generar un document foliat parcial d’un expedient.


**Funcionalitats de llistats**

* **Llista de Tipus Documentals:** Llistar els diferents tipus documentals suportats pel sistema.
* **Llista de Productors:** Llistar els productors de documents.


**Funcionalitats de sèries documentals**

* **Alta/Modificació Sèries Documentals:** Alta d’una nova sèrie documental o modificació d’una existent.


## Arquitectura i Components

### Interfícies i Components Genèrics

Es pot trobar el codi font i binaris referent a aquest component a la següent url:

http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.integration.psgd/

## Configuració

Per configurar el mòdul d'integració PSGD és necessari configurar els següents arxius:

1.- Importar el mòdul psgd incorporant manualment les seves dependències en el pom.xml de l'aplicació.

En el pom.xml;

```xml
<!-- Dependencia del mòdul PSGD -->
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.integration.psgd</artifactId>
    <version>${canigo.integration.psgd.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

2.- Crear l'arxiu /config/props/psgd.properties amb el següent contingut:

```
*.psgd.usuari=[usuariPSGD]
*.psgd.password=[passwordPSGD]
*.psgd.url=[urlPSGD]
*.psgd.keystore=[path keystore]
*.psgd.keystore.password=[password keystore]
*.psgd.truststore=[path truststore]
*.psgd.truststore.password=[password truststore]
```

L’usuari i password per donar d’alta l’aplicació al PSGD s’ha de demanar al gestor del projecte per part de CTTI.

La url d'accés dependrà si es vol treballar amb l'entorn de Preproducció (https://preproduccio.gestordocumental.intranet.gencat.cat) o Producció (https://gestordocumental.intranet.gencat.cat).

Els certificats necessaris per accedir a la url de PSGD s'han de demanar al gestor del projecte per part de CTTI.

Hi ha tres opcions per indicar a l'aplicació on es troba els certificats necessaris:

* Omplir els valors  referents al keystore/truststore on s'ha incorporat el certificat. S'ha d'indicar si el path pertany al classpath o al sistema de fitxer. Per exemple:

```
*.psgd.keystore=classpath*:data/psgdKeystore

o

*.psgd.keystore=file:/aqd/psgd/psgdKeystore
```

* Deixar sense valor les variables keystore i truststore. L'aplicació utilitzarà el cacerts que tingui configurat JVM. (Per a que funcioni s'ha d'afegir els certificats al cacerts)

* Deixar sense valor les variables keystore i truststore i indicar el path del keystore a la JVM quan s'inicia l'aplicació amb el següent paràmetre:

```
javax.net.ssl.trustStore=/aqd/psgd/psgdKeystore
```

## Utilització del Connector

### Exemple d'utilització Alta de Document

Recuperar el bean del servei de PSGD des de la classe on es vol utilitzar:

```java
@Autowired
private PsgdConnector psgdConnector;
```

Fer la crida a la modalitat del servei desitjat, p.e.:

```java

 Document document = new Document();

 DocumentMetaData documentMetaData = new DocumentMetaData();

 documentMetaData.setDocumentName("prova.txt");
 documentMetaData.setDocumentTypeCode("TD01-010");
 documentMetaData.setTitle("Prova");
 documentMetaData.setCreatorID("canigo");
 documentMetaData.setDocumentDescriptor("descriptor");
 documentMetaData.setOrigin("0");

 InputStream documentData = new FileInputStream("pathfitxer")

 document.setDocumentMetaData(documentMetaData);

 CreateDocumentResponse result = psgdConnector.altaDocument(document, documentData);

```
 El objecte de resposta CreateDocumentResponse retorna el ID del document creat.

```java
 String documentID = result.getResult().getResultData().getDocumentCreated().getDocumentID();
```

* En cas de que retorni error es pot consultar el code i la descripció de la següent manera:

```java
 String code = result.getResult().getCode();
 String descripcio = result.getResult().getDescription();
 String descExtended = result.getResult().getExtendedDescription();
```

### Exemple d'utilització Obtenir Documents

Recuperar el bean del servei de PSGD des de la classe on es vol utilitzar:

```java
@Autowired
private PsgdConnectorImpl psgdConnector;
```

Fer la crida a la modalitat del servei desitjat, p.e.:

```java
DocumentGetContentData document = new DocumentGetContentData();

document.setDocumentID("478fbefa-4de5-49c7-881c-1b2e1d1a8535");
document.setReaderID("canigo");

DocumentResponse result = psgdConnector.descarregarDocument(document);

```

 El objecte de resposta DocumentResponse retorna el ID, nom, tipus i mida del document demanat. Així com el document en un ByteArrayOutputStream.

 En cas de voler desar el document demanat a disc es podria fer de la següent manera.

```java
OutputStream outputStream = new FileOutputStream ("givefilename");
result.getResult().getResultData().getData().writeTo(outputStream);
```

* En cas de que retorni error es pot consultar el code i la descripció de la següent manera:

```java
 String code = result.getResult().getCode();
 String descripcio = result.getResult().getDescription();
 String descExtended = result.getResult().getExtendedDescription();
```

Per consultar la totalitat de possibles codis de retorn consultar el document [PSGD Manual Integració](/related/canigo/documentacio/modul-psgd/PSGD_Manual_Integració_v5.3.pdf).

## Logs

Si es vol conéixer la petició JSON que s'està enviant i el JSON que s'està rebent es pot fer a través dels logs.

Al fitxer Log4j.xml s'ha de posar a debug la classe: cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor

```xml
<category name="cat.gencat.ctti.canigo.arch.integration.psgd.utils">
	<level value="debug"/>
</category>
```

Un exemple de sortida dels logs:

```
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - ===========================request begin================================================
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - URI : https://preproduccio.gestordocumental.intranet.gencat.cat/service/extendedServices/search/documents
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - Method : POST
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - Request Body : {"Token":"TICKET_fadafc82507d6158937cd2d5a63e667a5d471f0e","Request":"SearchDocuments","RequestData":{"DocumentSearchCriteria":{"DocumentID":"476bf6a5-b9ba-4a2f-86c1-665277b31ea0","DocumentDescriptor":"a","FolderSetName":"C0001","FolderNumber":"1","FolderYear":"2016","Title":"prova","InputRegistryID":"1","OutputRegistryID":"1","DocumentDateBefore":"24/02/2016","DocumentDateAfter":"15/02/2016","DocumentTypeName":"TD10-010","Text":"Mitja"}}}
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - ==========================request end================================================
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - ============================response begin==========================================
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - status code: 200
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - status text: OK
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - Response Body : {"Result":{"Code":"OK","Description":"Successful","ResultData":{"SearchDocumentsResults":{"Found":"1","Documents":[{"Document":{"DocumentMetaData":{"DocumentID":"476bf6a5-b9ba-4a2f-86c1-665277b31ea0","DocumentName":"prova.docx","DocumentTypeName":"TD10-010","DocumentDepartmentUnitID":"CTT","Title":"Prova","OrganName":"Organ","CreatorID":"canigo","CreationDate":"17/02/2016 14:57:09","Signed":false,"OwnerID":"canigo","ReaderID":"canigo","ReadDate":"19/02/2016 13:36:14","BinderID":"canigo","BindingDate":"23/02/2016 09:58:59","UnbinderID":"canigo","UnbindingDate":"23/02/2016 09:48:19","BindingFolderID":"22e77806-349f-4440-a534-cfd6c9ffeeb8","Folders:":[{"FolderID":"22e77806-349f-4440-a534-cfd6c9ffeeb8","FolderSetName":"C0001","FolderNumber":"1","FolderYear":2016,"OrganName":"CTT","OrganCode":"CTT"}]}}}]}}}}
canigo Message: DEBUG [main] cat.gencat.ctti.canigo.arch.integration.psgd.utils.LoggingRequestInterceptor - =======================response end=================================================
```

Es recomana no possar el log a nivell de Debug per a Producció.
