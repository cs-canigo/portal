+++
date        = "2021-06-05"
title       = "Canigó. Com exposar informació dels commits de Git mitjançant l'Actuator de Spring"
description = "Com exposar la informació dels commits de Git mitjançant l'Actuator de Spring ."
section     = "howtos"
categories  = ["canigo"]
key        = "JULIOL2021"
+++


## Introducció

L'objectiu d'aquest article és **mostrar l'ús del servei info de l'Actuator de Spring per a exposar l'informació dels commits fets al Git**.


## Justificació

Un dels principals reptes d'una aplicació és **tenir visibilitat de què succeeix quan es puja el codi a producció**.

La llibreria `spring-boot-starter-actuator` ofereix una sèrie de http endpoints que donan informació sobre l'estat de l'aplicació.
Informació sobre beans, mètriques, helth, conditions, logger, etc.

L'endpoint **info** dóna informació que ens servirà per identificar el servei.
Això és molt ùtil, per exemple, quan estem desenvolupant el codi de l'aplicació i pujant (commit+push dels canvis al Git) i desplegant continuament, per identificar el codi que tenim desplegat,
podem fer servir aquest endpoint per possar informació que identifiqui qué està desplegat.

Fent servir (conjuntament) el plugin **git commit id** fem que l'endpoint mostri informació sobre l'ùltim commit fet al Git, que ens servirà
per a identificar ràpidament el codi desplegat.

## Configuració

Per a activar les mètriques amb `actuator` i per generar la informació dels commits, és necessari afegir algunes dependències, plugins i configuracions que es detallen a continuació.

### Dependència i plugin a afegir al fitxer `pom.xml`

```xml
  ...

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
    <exclusions>
      <exclusion>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-logging</artifactId>
      </exclusion>
    </exclusions>
  </dependency>

  <plugin>
    <groupId>pl.project13.maven</groupId>
    <artifactId>git-commit-id-plugin</artifactId>
  </plugin>

  ...
```

### Configuració dels `endpoints` de `actuator` al fitxer `application.properties`

```properties
management.endpoints.web.exposure.include=*
endpoints.health.show-details=always
endpoints.health.sensitive=*
management.security.enabled=false
```

## Funcionament

Per a provar el funcionament compilem i iniciem l'aplicació:

```sh
  mvn clean package
  mvn spring-boot:run
```

Una vegada compilada l'aplicació, es genera el fitxer ** ./target/classes/git.properties ** amb informació detallada del commit efectuat.

Amb la url http://localhost:8080/actuator podem veure tots els endpoint i informació que ens proporciona Actuator de Spring, per exemple:

  * /info

  * /health

  * /conditions

  * /beans

  * /loggers

Accedint al servei de **info** ens mostarà:

```yaml
git:
    branch: "master"
    commit:
        id: "0b8bbc4"
        time: "2022-06-21T18:38:01Z"
```

## Conclusió

És possible configurar un projecte Canigó per a poder identificar ràpidament el codi que està desplegat a un entorn.

## Referències

Per a més informació podeu consultar:

 * [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints)
 * [Configuració Actuator i plugin commit id](https://www.youtube.com/watch?v=6XIakve0GjI&t=385s)
