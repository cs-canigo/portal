+++
date        = "2021-10-21"
title       = "Pujada d'arxius"
description = "Pujada d'arxius al servidor."
sections    = "Canigó. Documentació Versió 3.6"
weight      = 5
+++

## Propòsit

Aquest mòdul permet al servidor obtenir fitxers adjunts als formularis HTML de client. A més aquest mòdul permet llegir el fitxer de forma directa, deser-lo al sistema de fitxers, emmagatzemar-lo en una base de dades o enllaçar-ho amb altres mòduls com pot ser el servei d'antivirus.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul d'upload de fitxers es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```xml
<dependency>
  <groupId>cat.gencat.ctti</groupId>
  <artifactId>canigo.support.fileupload</artifactId>
  <version>${canigo.support.fileupload.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats 3.6] (/canigo-download-related/matrius-compatibilitats/canigo-36/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/fileupload.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.fileUpload.defaultEncoding | No | Direcció IP del servidor Engine Scan del CTTI, responsable dels escaneigs.
*.fileUpload.maxUploadSize   | No | Màxim tamany permés abans que es rebutgin els fitxers. Valor per defecte: -1(no hi ha límit).
*.fileUpload.maxInMemorySize | No | Màxim tamany permés en bytes abans de guardar en disc. Valor per defecte: 10240 (bytes).
*.fileUpload.launchExceptionIfVirusDetected | No | Opció només disponible per a la integració del fileupload i antivirus. Indica si es llençarà una excepció al servei en el cas de que es trobi un virus en l'arxiu pujat. Valor per defecte: true.

