+++
date        = "2021-07-04"
title       = "Canigó. Com exposar informació del pom.xml mitjançant l'Actuator de Spring"
description = "Com exposar l'informació del pom.xml mitjançant l'Actuator de Spring ."
section     = "howtos"
categories  = ["canigo"]
key        = "JULIOL2021"
+++


## Introducció

L'objectiu d'aquest article és **mostrar l'ús del servei info de l'Actuator de Spring per a exposar l'informació dinàmica de la construcció de l'aplicació**.


## Justificació

Un dels principals reptes d'una aplicació és **identificar de forma fàcil i ràpida quin és el codi que hi ha desplegat**.

Es pot fer servir el plugin **spring-boot-maven-plugin** per a generar un fitxer build-info.properties amb informació detallada (a partir del fitxer pom.xml) de la construcció de l'aplicació.

La llibreria `spring-boot-starter-actuator` ofereix (entre molts altres com beans, mètriques, helth, conditions, logger, etc) el http endpoint **info** que dóna informació que ens servirà per identificar el servei.

Farem servir conjuntament tots dos, plugin i actuator, per a mostrar informació i identificar ràpidament el codi desplegat amb, per exemple, la versió de l'aplicació.

## spring-boot-maven-plugin

Per a fer servir el `spring-boot-maven-plugin` és necessari afegir-ho al fitxer pom.xml. El plugin de Canigó ja afegeix aquest plugin al fitxer pom.xml
al crear l'aplicació. Però i ha que afegeir l'execució del goal `build-info`.

La configuració sería la següent:

### Plugin al fitxer `pom.xml`

```xml

      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <jvmArguments>-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005</jvmArguments>
          <arguments>
            <argument>--spring.profiles.active=loc</argument>
          </arguments>
        </configuration>
        <executions>
          <execution>
            <goals>
              <goal>build-info</goal>
            </goals>
          </execution>
		</executions>
      </plugin>

```

### Funcionament

Executant la comanda `mvn clean package` el plugin generarà el fitxer ** ./target/classes/META-INF/build-info.properties ** amb informació de la construcció de l'aplicació.

Exemple de fitxer `build-info.properties`

```properties

    build.artifact=Canigo36WebRest
    build.group=cat.gencat.canigo36webrest
    build.name=Nom del projecte de tipus Canig\u00F3 REST
    build.time=2022-07-04T10\:25\:01.770Z
    build.version=1.0.0

```

## Actuator de spring-boot

Per a fer servir la llibreria `spring-boot-starter-actuator` és necessari afegir la dependència al fitxer pom.xml com es mostra a continuació:

### Dependència al fitxer `pom.xml`

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

### Configuració al fitxer `application.yml`

La llibreria ofereix diferents endpoints amb molta informació. Al nostre cas només configurarem l'endpoint `info`:

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


## Funcionament

Una vegada construïda i iniciada l'aplicació, podem accedir via navegador web a l'endpoint info i ens mostrarà l'informació detallada de la construcció de l'aplicació:

![Actuator info amb Build Info Ejemplo 1](/images/howtos/2021-07-04-Howto-actuator-info-pom-versio.jpg)

## Conclusió

És possible configurar un projecte Canigó per a poder identificar ràpidament el codi que està desplegat a un entorn.

## Referències

Per a més informació podeu consultar:

 * [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints)
 * [Exposing a Helpful Info Endpoint with Spring Boot Actuator](https://reflectoring.io/spring-boot-info-endpoint/)
