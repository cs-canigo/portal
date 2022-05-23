+++
date        = "2022-05-23"
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

A la [Matriu de Compatibilitats] (/canigo-download-related/matrius-compatibilitats/canigo-36/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/fileupload.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.fileUpload.defaultEncoding | No | Direcció IP del servidor Engine Scan del CTTI, responsable dels escaneigs.
*.fileUpload.maxUploadSize   | No | Màxim tamany permés abans que es rebutgin els fitxers. Valor per defecte: -1(no hi ha límit).
*.fileUpload.maxInMemorySize | No | Màxim tamany permés en bytes abans de guardar en disc. Valor per defecte: 10240 (bytes).
*.fileUpload.launchExceptionIfVirusDetected | No | Opció només disponible per a la integració del fileupload i antivirus. Indica si es llençarà una excepció al servei en el cas de que es trobi un virus en l'arxiu pujat. Valor per defecte: true.

## Utilització del mòdul

### Exemple d'ús

El mòdul de pujada d'arxius ja incorpora la dependència transitiva del mòdul d'antivirus, per tant, no és necessari
modificar el fitxer `pom.xml` a tal efecte. No obstant això, i només en cas de fer servir l'escaneig de fitxers amb el servei
d'antivirus, com és el cas del següent exemple d'ús, caldrà incorporar i configurar el
[Mòdul d'antivirus](/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/moduls/moduls-integracio/modul-antivirus/)
al projecte.

```java
    import cat.gencat.ctti.canigo.arch.integration.antivirus.ResultatEscaneig;
    import cat.gencat.ctti.canigo.arch.integration.antivirus.exceptions.AntivirusException;
    import cat.gencat.ctti.canigo.arch.support.fileupload.UploadedFiles;
    import cat.gencat.ctti.canigo.arch.support.fileupload.impl.FileUploadServiceAntivImpl;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.http.MediaType;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.multipart.MultipartFile;
    import org.springframework.web.multipart.MultipartHttpServletRequest;
    import javax.inject.Inject;
    import java.io.IOException;

    @RestController
    @RequestMapping("/fileupload")
    public class FileUploadController {
      private static final Logger log = LoggerFactory.getLogger(SarcatService.class);

      @Inject
      private FileUploadServiceAntivImpl fileUploadService;

      @PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
      public ResultatEscaneig fileUpload(MultipartHttpServletRequest request, @RequestParam MultipartFile file) throws IOException, AntivirusException {
        log.info("file: ", file.getName());
        UploadedFiles uploadedFiles = fileUploadService.getUploadedFiles(request, file.getName());
        log.info("uploadedFiles.hasFiles: ", uploadedFiles.hasFiles());

        return fileUploadService.getAntivirus().scan(file.getBytes());
      }
    }
```

On **FileUploadController.java** és l'Endpoint de l'aplicació que fa servir el mètode `getUploadedFiles()` escanejant, en
aquest cas, amb el servei d'antivirus els fitxers que es volen pujar.