+++
date = "2025-03-11"
title = "Generació de clients amb Open Api Generator"
description = "Com generar un client d'API automàticament mitjançant el plugin d'Open Api Generator"
section = "guies"
categories = ["canigo"]
key = "MARÇ2025"
+++

## Introducció

Es vol fomentar l'ús directe de les API que existeixen per als diferents serveis en lloc d'utilitzar els connectors del framework de Canigó corresponents per a això. A causa d'això, aquesta guia servirà per generar clients automàticament mitjançant l'ús d'Open Api Generator a partir de l'especificació de l'API que s'ha d'utilitzar.

## Configuració Prèvia

Per utilitzar el plugin, és necessari tenir instal·lat Node.js al sistema. Per això, podem descarregar-lo des del lloc web oficial: [Node.js](https://nodejs.org/en/download)

Un cop instal·lat, hem d'obrir una línia de comandes i instal·lar el plugin d'Open Api Generator amb la següent comanda:

```bash
npm install @openapitools/openapi-generator-cli -g
```

# Ús del Plugin

## Generació del Client

Per generar el client utilitzant el plugin, pots utilitzar les següents opcions en Java, per exemple:

```bash
openapi-generator-cli generate -i openapisgde.json -g java --library restclient -o clientsgde --additional-properties=useSpringBoot=true
```

El fitxer d'especificació openapisgde és un exemple. Aquest arxiu pot estar en format JSON o YAML.

El paràmetre --library fa referència a les llibreries HTTP que utilitzarà el client, en aquest cas, serà un client REST.

El paràmetre -o fa referència a la ruta d'eixida on generarà el client. En aquest exemple, també s'ha indicat que faci ús de Spring Boot.

Per generar clients amb altres opcions, pots consultar la documentació oficial del plugin als següents enllaços:

- [Documentació d'instal·lació](https://openapi-generator.tech/docs/installation)
- [Documentació de generadors](https://openapi-generator.tech/docs/generators)

## Importar el Client

Un cop generat el client, pots importar-lo de dues maneres:

1. Afegint el directori generat al teu projecte.
2. Compilant el projecte amb Maven mitjançant `mvn clean install` i importan la llibreria.

Exemple de dependència al `pom.xml`:

```
<dependency>
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-java-client</artifactId>
    <version>1.0</version>
</dependency>
```

# Ús del Client

Un cop importat el client, només ens quedaria utilitzar la llibreria al nostre projecte. Exemple:

```java
import org.openapitools.client.api.InfoModulesControllerApi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.openapitools.client.*;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.List;
import java.util.Map;

@SpringBootApplication
public class DemoclientsgdeApplication {

    private static final Logger logger = LoggerFactory.getLogger(DemoclientsgdeApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(DemoclientsgdeApplication.class, args);

        ApiClient defaultClient = new ApiClient();

        InfoModulesControllerApi apiInstance = new InfoModulesControllerApi(defaultClient);
        try {
            Map<String, List<String>> result = apiInstance.getInfoModulesLoadedUsingGET();
            logger.info("Result: {}", result);
        } catch (HttpStatusCodeException e) {
            logger.error("Exception when calling InfoModulesControllerApi#getInfoModulesLoadedUsingGET");
            logger.error("Status code: {}", e.getStatusCode().value());
            logger.error("Reason: {}", e.getResponseBodyAsString());
            logger.error("Response headers: {}", e.getResponseHeaders());
        }
    }

}
```
