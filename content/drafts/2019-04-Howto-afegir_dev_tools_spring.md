+++
date        = "2019-04-15"
title       = "Afegir dev tools Spring"
description = "How to per afegir les dev tools de Spring a Canigó 3.4.0"
section     = "howtos"
categories  = ["canigo"]
key         = "MAIG2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat d'utilitzar les funcionalitats de les dev tools de Spring proporcionats a la versió 3.4.0 de Canigó.

En aquest how-to es mostrarà com utilitzar la consola web per accedir a la bd h2 d'una aplicació amb Canigó 3.4.0

### Introducció dev tools Spring

Amb Spring Boot s'inclou un conjunt addicional d'eines per poder fer que l'experiència del desenvolupament d'aplicacions amb Spring sigui més senzilla. Un dels mòduls que faciliten les funcionalitats de desenvolupament és el mòdul "spring-boot-devtools"

Les funcionalitats més importats que aporta les dev tools de Spring són:

- Restart automàtic
- Consola web de consulta d'una bd h2

### Afegir dev tools Spring

Per poder utilitzar les dev tools de Spring amb una aplicació amb Canigó 3.4.0 és necessari afegir la següent dependència maven al fitxer pom.xml

```xml
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-devtools</artifactId>
		<optional>true</optional>
	</dependency>
```

És una bona pràctica afegir la dependència com a "optional" ja que així s'evita que les dev tools s'apliquin transitivament a altres mòduls que utilitzin el projecte

Les dev tools són automàticament deshabilitades quan s'executa el projecte executant "java -jar" o es desplega en classloaders especials considerats com a productius. Per assegurar-se que no s'executen en entorns productius, per cada entorn productiu, és necessari afegir les següents propietats:

```
spring.devtools.restart.enabled=false
spring.h2.console.enabled=false
```

Per a més informació sobre les dev tools podeu consultar 
- [Using boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)
- [Using H2’s Web Console](https://docs.spring.io/spring-boot/docs/2.1.x/reference/htmlsingle/#boot-features-sql-h2-console)

### Accedir consola web bd h2

Si la nostra aplicació utilitza una bd h2 en entorn de desenvolupament, una vegada afegida la dependència maven, podem accedir a la consola web de les dev tools per a realitzar consultes a la bd h2, accedint a http://localhost:8080/h2-console i omplint el formulari amb la següent informació:

```
JDBC URL: jdbc:h2:mem:dataSource
User Name: sa
Pasword: <deixar buit>
```

On obtindrem una consola web de consulta de la bd h2 de l'aplicació com per exemple:

![H2 console](https://github.com/cs-canigo/portal/blob/master/content/drafts/dev_tools_spring_h2_console.png)


Per a més informació sobre la consola web de les dev tools es pot consultar:
- [Using H2’s Web Console](https://docs.spring.io/spring-boot/docs/2.1.x/reference/htmlsingle/#boot-features-sql-h2-console)
- [How to connect to h2 database during development/testing using spring boot](https://medium.com/@harittweets/how-to-connect-to-h2-database-during-development-testing-using-spring-boot-44bbb287570)
