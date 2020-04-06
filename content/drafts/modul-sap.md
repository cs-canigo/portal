+++
date        = "2020-03-27"
title       = "SAP"
description = "Interfície d'accés als Backends SAP de la Generalitat."
sections    = "Canigó. Documentació versió 3.x"
weight      = 12
+++

<div class="message warning">

A partir de la publicació de Canigó 3.4.3 el 26/03/2020 aquest mòdul quedarà deprecat, per lo que no es preveu seguir evolucionant aquest mòdul.

</div>

## Propòsit

L'objectiu d’aquest article és **descriure la metodologia a seguir en la utilització del connector al sistema *SAP* de la Generalitat des de qualsevol aplicació Java del Framework J2EE**
i el propòsit del connector és proporcionar una interfície simplificada per accedir-hi.

## Instal·lació

Per a poder utilitzar el connector haurem de configurar el projecte per a que inclogui unes **llibreries DLL i diferents llibreries Java**:

* Les llibreries DLL són: *sapjcorfc.dll* i *librfc32.dll*, s'hauran de copiar al directori `system32`.

* Per a fer les operacions sobre el sistema SAP és necessària la utilització de la llibreria *sapjco-2.1.6.jar*, que és el connector propi del SAP per a fer les crides a les seves funcions BAPI (RFC).

* Les classes que utilitzarem per a construir els objectes d'operacions estan disponibles a la llibreria del connector Gecat09 *canigo-connectors-gecat09-2.3.2.jar*.

Les classes que utilitzarem per a fer les operacions han estat generades amb una eina Open Source anomenada JAXB (Java API for Xml Binding) que s’encarrega de
generar les classes Java a partir d'un esquema de Xml (*XMLSchema*). Aquesta eina ens permet no solament generar automàticament classes sinó també fer validacions
per a comprovar que les dades que contenen els objectes siguin vàlides. Serà necessari, per tant, incloure també:

* jaxb-api-1.0.1.jar
* jaxb-libs-1.0.6.jar
* jaxb-impl-1.0.5.jar
* jax-qname-1.1.jar
* namespace-1.0.1.jar
* relaxngDatatype-20020414.jar
* xsdlib-2013.6.1.jar

Per tal d'instal·lar el Mòdul de SAP es pot optar per incloure’l automàticament a través de l'eina de suport al desenvolupament o bé afegir
manualment la següent dependència en el fitxer `pom.xml` de l’aplicació:

```
<canigo.integration.sap.version>[1.2.0,1.3.0)</canigo.integration.sap.version>
-
<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.integration.sap</artifactId>
          <version>${canigo.integration.sap.version}</version>
</dependency>
```

## Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament.
El fitxer de configuració es troba a: `<PROJECT_ROOT>/src/main/resources/config/props/sap.properties`.

| Propietat                | Requerit     | Descripció
| ------------------------ | ------------ | --------------
| *.sap.client             | Sí           | Client
| *.sap.username           | Sí           | Usuari de connexió
| *.sap.password           | Sí           | Password de connexió
| *.sap.language           | Sí           | Idioma
| *.sap.hostname           | Sí           | Nom del servidor
| *.sap.systemNumber       | Sí           | SAP system number
| *.sap.connectionPool     | No           | Connexió amb pool. Per defecte: true
| *.sap.connectionPoolName | No           | Nom del pool. Per defecte: poolCanigoSAP
| *.sap.maxNumConnections  | No           | Número de connexions màximes. Per defecte: 5
| *.sap.repositoryName     | No           | Nom del repository. Per defecte: ARAsoft

## Funcionament
La utilització del connector es fonamenta en la seva **configuració prèvia i en la invocació des dels clients mitjançant les interfícies definides**.

### REST

Per a utilitzar aquest mòdul, cal crear un *Service* i un *Controller*.

<br/>
#### Service (SapService.java)

Aquesta classe és en la que s'implementarà la lògica de l’operació a realitzar i es connectarà amb el mòdul de SAP.

```java
import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import cat.gencat.ctti.canigo.arch.integration.sap.SapConnector;
import cat.gencat.plantilla32.model.MaterialBean;

@Service("sapService")
@Lazy
public class SapService {

   private static final Logger log = LoggerFactory.getLogger(SapService.class);

   @Autowired
    private SapConnector connector;

    /**
     * Execució de la funció SAP BAPI_MATERIAL_GETLIST
     *
     */
   public String testSap(){
      String message;
       try{
            this.connector.connect();
            Collection<Object> col = this.connector.executeFunction("BAPI_MATERIAL_GETLIST",
                    "MATNRSELECTION", null, MaterialBean.class);
            message = "Test correcte : " + col.size();
        }
        catch(Exception e){
            message = "Test erroni: " + e.getMessage();
            log.error(e.getMessage(), e);
        }
        finally{
            this.connector.disconnect();
        }
        return message;
    }
}
```

En aquest bean es pot veure:

    1. Injecció del connector de SAP via *annotacions* (*@Autowired*) de Spring
    2. Invocació de la funció *BAPI_MATERIAL_GETLIST* (taula MATNRSELECTION)
    3. En la classe *MaterialBean* s'introduirà el resultat de la invocació de la funció SAP de manera transparent

<br/>
#### SapServiceController.java

Controlador que publica les operacions disponibles per a que es puguin consumir.

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.plantilla32.service.SapService;

@RestController
@RequestMapping("/sap")
public class SapServiceController {

   @Autowired
   SapService sapService;

   @PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
   public String testSap() throws Exception {
      return sapService.testSap();
   }
}
```