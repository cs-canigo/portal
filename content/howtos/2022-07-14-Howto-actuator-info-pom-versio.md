+++
date        = "2022-07-14"
title       = "Canigó. Exposar informació del POM de l'aplicació"
description = "Com exposar informació del fitxer POM de l'aplicació mitjançant l'actuator de Spring"
section     = "howtos"
categories  = ["canigo"]
key         = "AGOST2022"
+++


## Introducció

[Spring Boot](https://spring.io/projects/spring-boot) inclou una sèrie de funcions addicionals per a ajudar a supervisar i
gestionar les aplicacions.

L'objectiu d'aquest article és **mostrar l'ús del servei info de l'*actuator* de Spring per a exposar
la informació dinàmica de construcció de l'aplicació**.

## Justificació

Un dels principals reptes d'una aplicació és **exposar de forma fàcil i ràpida informació de compilació de l'aplicació**.
En aquest sentit:

- El **plugin spring-boot-maven-plugin** s'encarrega de generar el fitxer `build-info.properties` amb informació
detallada de construcció de l'aplicació extreta del fitxer POM (Project Object Model) de l'aplicació,

- La **llibreria spring-boot-starter-actuator** ofereix (entre molts altres com: beans, mètriques, health, conditions, logger, etcètera)
l'http endpoint *info* que proporciona informació que ens servirà per a identificar el servei.

A continuació s'explica com configurar i fer ús d'aquests dos components per a exposar aquesta informació i així permetre
a l'usuari, per exemple, identificar la versió desplegada en cada moment.

## Plugin spring-boot-maven-plugin

### Configuració

Per a fer servir el [_spring-boot-maven-plugin_](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/htmlsingle/#?.?)
serà necessari afegir-lo al fitxer `pom.xml` de l'aplicació i configurar el goal _build-info_.
En cas de generar l'aplicació mitjançant el [Plugin de Canigó per Eclipse](/canigo-fwk-docs/entorn-de-desenvolupament/plugin-eclipse/),
el projecte ja disposarà d'aquest plugin configurat per defecte. No obstant això, caldrà afegir el corresponent goal
tal com es mostra a continuació:

```xml
    <plugins>
      ...
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <executions>
            <execution>
                <goals>
                    <goal>build-info</goal>
                </goals>
            </execution>
        </executions>
      </plugin>
    </plugins>
```

### Funcionament

En executar la comanda de construcció _Maven_, el _plugin_ generarà el fitxer `./target/classes/META-INF/build-info.properties`
amb informació detallada de construcció de l'aplicació. Per exemple:

```properties
  build.artifact=TestCanigo
  build.group=cat.gencat.testcanigo
  build.name=Nom del projecte
  build.time=2022-07-04T10\:25\:01.770Z
  build.version=1.0.0
```

## Actuator de Spring Boot

### Configuració

Per a fer ús de l'[_actuator de Spring Boot_](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints)
serà necessari afegir la corresponent llibreria com a dependència al fitxer `pom.xml` de l'aplicació, tal com es mostra a continuació:

```xml
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
```

L'_actuator_ ofereix diferents _endpoints_ amb informació diversa. En aquest cas, caldrà configurar l'**endpoint info**
al fitxer `application.yml`:

```yml
management:
  endpoints:
    web:
      exposure:
        include: info
  info:
    git:
      mode: full
      enabled: true
```

### Funcionament

Un cop construïda i iniciada l'aplicació, es podrà accedir via navegador web a l'endpoint info i ens mostrarà
la informació detallada de construcció de l'aplicació. Es pot veure al següent exemple:

![Actuator info amb Build Info](/images/howtos/2021-07-04-Howto-actuator-info-pom-versio.jpg)

## Conclusió

És possible configurar un projecte Canigó per a permetre consultar de forma fàcil i ràpida la informació de
construcció de l'aplicació.

## Referències

Per a més informació podeu consultar:

 * [Exposing a Helpful Info Endpoint](https://reflectoring.io/spring-boot-info-endpoint/)
 * [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints)