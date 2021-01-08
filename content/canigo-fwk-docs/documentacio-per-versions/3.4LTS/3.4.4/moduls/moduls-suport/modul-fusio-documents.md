+++
date        = "2015-04-02T11:06:02+02:00"
title       = "Fusió de documents"
description = "Mòdul de fusió de documents."
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest servei permet aplicar un conjunt de canvis definits per un diccionari sobre un document en format WordML.

Es parteix d'un document que conté un o més marcadors que han de ser substituits i d'un conjunt de diccionaris de substitució.

Per cada un dels diccionaris de substitució, el servei de merging realitza la substitució de cada marcador pel valor indicat en el diccionari i el resultat és un nou document, també en format WordML.

Els marcadors consisteixen en una marca d'inici, un texte-clau i una marca de final.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar el mòdul de fusió es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.support.merging.version>[1.2.0,1.3.0)</canigo.support.merging.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.support.merging</artifactId>
    <version>${canigo.support.merging.version}</version>
</dependency>
```

### Configuració

La configuració es realitza automàticament a partir de la eina de suport al desenvolupament.

L'eina de desenvolupament genera automàticament el fitxer de propietats necessari per a la configuració del servei.

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/merging.properties

Propietat              | Requerit | Descripció
---------------------- | -------- | ---------------------------------------------------------------------
*.merging.initBookmark | No       | Marca d'inici del texte a substituir (2 caràcters). Per defecte: @@.
*.merging.endBookmark  | No       | Marca de final del texte a substituir (2 caràcters). Per defecte: ##h2. Utilització del Mòdul.

### Utilització del Mòdul

### REST

Per a utilitzar aquest mòdul, cal crear un Controller i un Service:

**MergingService.java**

Classe Java on es realitzarà la lògica de la operació a realitzar i es connecta amb el mòdul de Fusió de documents.

```java
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.support.merging.MergeTemplateEngine;

@Service("mergingService")
@Lazy
public class MergingService {

	private static final Logger log = LoggerFactory.getLogger(MergingService.class);

	@Autowired
    private MergeTemplateEngine engine;
    


	public String testMerging(){
		
		String message;

		HashMap<String,String> itemsMap = new HashMap<String,String>();
		itemsMap.put("cosa", "Mancha");
		itemsMap.put("marca", "Funciona");

        List<Map<String,String>> dades = new ArrayList<Map<String,String>>();
        dades.add(itemsMap);

        try{
            InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("TestDoc.xml");
            ByteArrayOutputStream[] os = engine.mergeTemplate(is, dades);

            FileOutputStream ouputStream = new FileOutputStream(new File("c://tmp//file.xml"));
            ouputStream.flush();
            ouputStream.write(os[0].toByteArray(), 0, os[0].size());
            ouputStream.flush();
            ouputStream.close();
            

        }catch(Exception e){
        	message = "Test mergint erroni :" + e.getMessage();
        	log.error(e.getMessage(),e);
        }
        
        message = "Test merging correcte";
        
        return message;

    }
}
```  

**MergingServiceController.java**

Controller que publica les operacions disponibles per a qui hagi de consumir-les

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.MergingService;

@RestController
@RequestMapping("/merging")
public class MergingServiceController {

	@Autowired
	MergingService mergingService;


	@PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public String testMerging() throws Exception {
		return mergingService.testMerging();
	}
}
```
