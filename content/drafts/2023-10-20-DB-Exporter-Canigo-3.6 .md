+++
date         = "2023-10-11"
title        = "Configuració de l'Exporter per a Mostrar Informació d'Estat de Components Interns en Canigó 3.6"
description  = "Guia corporativa sobre com configurar l'Exporter per mostrar informació sobre l'estat de components interns com MySQL o MongoDB en una aplicació Canigó 3.6, incloent la personalització de comprovacions d'estat."
weight      = "1"
sections    = ["drafts"]
key          = "NOVEMBRE2023"
+++

## Introducció

En aquest how-to, explorarem com configurar l'Exporter per mostrar informació sobre l'estat de components interns en una aplicació Canigó 3.6 Això inclourà components com bases de dades MySQL o MongoDB. També abordarem la personalització de les comprovacions d'estat per garantir que l'aplicació sigui robusta i fiable.

Aquest how-to és una continuació del how-to anterior relacionat amb la integració a Canigó 3.6 .

## Pas 1: Configuració de l'Exporter

Primer, assegureu-vos que heu configurat l'Exporter a la vostra aplicació Canigó 3.6 Podeu fer servir la informació proporcionada al how-to anterior relacionat amb la integració a Canigó 3.6

## Pas 2: Mostrar Informació de Components Interns

### Configuració de Mòduls de Dades

Per mostrar informació sobre l'estat de components interns com MySQL o MongoDB, heu de configurar els mòduls de dades corresponents. Aquesta configuració dependrà de les tecnologies que utilitzeu. A continuació, un exemple de com configurar un mòdul MySQL:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: your-username
    password: your-password
    driver-class-name: com.mysql.cj.jdbc.Driver
  actuator:
    export:
      enabled: true
      auto:
        basic: false
      triggers:
        data-source:
          enabled: true
```
Aquesta configuració habilitarà l'Exporter per controlar l'estat de la vostra base de dades MySQL. Ajusteu les dades de connexió segons les vostres necessitats.

### Configuració de Mòduls de MongoDB
Si utilitzeu MongoDB, podeu configurar el mòdul de la següent manera:
```yaml
spring:
  data:
    mongodb:
      host: localhost
      port: 27017
  actuator:
    export:
      enabled: true
      auto:
        basic: false
      triggers:
        mongo:
          enabled: true

```
Aquesta configuració habilitarà l'Exporter per monitorar l'estat de la vostra instància de MongoDB. Assegureu-vos d'ajustar la configuració segons les vostres necessitats específiques.

## Pas 3: Personalització de Comprovacions d'Estat
Per garantir la robustesa i fiabilitat de la vostra aplicació Canigó 3.6, podeu personalitzar les comprovacions d'estat. Això us permetrà verificar que els components interns funcionen correctament.

Comprovacions d'Estat Personalitzades
Utilitzeu les comprovacions d'estat personalitzades per garantir que els vostres components interns estiguin en un estat òptim. Per exemple, podeu crear una comprovació d'estat que verifiqui la disponibilitat d'una funcionalitat específica de la base de dades o de MongoDB. Personalitzeu aquestes comprovacions segons les necessitats del vostre projecte.

```java
@Component
public class CustomHealthIndicator extends AbstractHealthIndicator {

    @Override
    protected void doHealthCheck(Health.Builder builder) {
        // Realitzeu les vostres comprovacions d'estat personalitzades aquí
        // Per exemple, comprovació d'estat de la base de dades
        // builder.down().withDetail("Error", "La base de dades no respon");
        // builder.up().withDetail("Status", "La base de dades funciona correctament");
    }
}
```
Personalitzeu la classe CustomHealthIndicator amb les vostres pròpies comprovacions d'estat.

## Conclusió
Amb aquesta guia, heu après com configurar l'Exporter per mostrar informació sobre l'estat de components interns com MySQL o MongoDB en una aplicació Canigó 3.6 . 
També heu après com personalitzar les comprovacions d'estat per garantir la fiabilitat de l'aplicació. Aquestes pràctiques són fonamentals per assegurar que la vostra aplicació sigui robusta i funcioni correctament.

Assegureu-vos d'adaptar les configuracions i comprovacions segons les necessitats específiques del vostre projecte Canigó 3.6