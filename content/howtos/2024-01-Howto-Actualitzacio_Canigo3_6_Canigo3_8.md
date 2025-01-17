+++
date = "2024-01-15"
title = "Actualització Canigó 3.6 a Canigó 3.8"
description = "Com actualitzar una aplicació Canigó 3.6 a Canigó 3.8"
section = "guies"
categories = ["canigo"]
key = "GENER2023"
+++

### A qui va dirigit

Aquesta guia va dirigida a tots aquells usuaris que vulguin **actualitzar a Canigó 3.8 la seva aplicació Canigó 3.6**.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.8 del Framework Canigó.

### Introducció

Al mes de **gener del 2024 s'ha publicat la versió 3.8 del Framework Canigó**. Aquesta versió és una
[versió LTS](/plataformes/canigo/roadmap/) i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de
tenir un suport continuat, així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquesta guia  és mostrar els procediments necessaris per a actualitzar una aplicació realitzada
amb Canigó 3.8 i el punt de partida d'aquesta guia és una aplicació creada amb l’arquetipus maven de Canigó.

### Configuració prèvia

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul) podeu consultar les versions
dels mòduls i components de Canigó de les versions 3.6.x i 3.8.x. 

Per tant, caldrà fer:

**1.** **Actualitzar els intervals de versions dels mòduls utilitzats per l'aplicació** per a migrar a Canigó 3.8.0

**2.** Per a actualitzar de la versió 3.6 a la 3.8, es necessari realitzar l'actualització de les dependències del nostre projecte. 

Les dependències específiques que han d'actualitzar-se la seva les següents: 

**2.1** Spring Boot 3.1.4 

```
   <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>3.1.4</version>
   </parent>
```

**2.2** Spring Framework 6.1.1 
```
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.1.1</version>
   </dependency>

```


**2.3** OpenJDK 17
```
   <maven.compiler.source>17</maven.compiler.source>
   <maven.compiler.target>17</maven.compiler.target>
```



**2.4** Spring Security 6.1.3 

```
   <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-core</artifactId>
      <version>6.1.3</version>
   </dependency>
```
**2.5** Junit 4 a Junit 5 (Jupiter) 5.10.1.

```
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-params</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>

```

_NOTA: Si tens dependències de Javax, és necessari actualitzar-les a la versió més recent de Jakarta, ja que OpenJDK 17 no és compatible amb Javax._ 

### Passes a realitzar

Un cop actualitzades les versions dels mòduls, segons s' indica a la secció anterior, serà necessari realitzar
els següents passos:

---
**1.** Reemplaça les dependències de Javax per Jakarta en l'arxiu pom.xml.

Pom.xml

```
<dependency>
   <groupId>javax.annotation</groupId>
   <artifactId>javax.annotation-api</artifactId>
   <version>1.3.2</version>
</dependency>

```
per

```
<dependency>
   <groupId>jakarta.annotation</groupId>
   <artifactId>jakarta.annotation-api</artifactId>
   <version>1.3.5</version>
</dependency>

```
---

**2.** Reemplaçar l' imports de javax per jakarta en totes les classes Java que utilitzin el import de javax.

```java
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
```
per 

```java
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
```

---
**3.** És necessari modificar els JUnit per a utilitzar JUnit 5 (Jupiter).

Per a realitzar les modificacions correctament, hem de tenir en compte els següents punts:

- ***1.***: Comptar amb les dependències de JUnit 4 canviades a JUnit 5 (Jupiter).


```
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>
   <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-params</artifactId>
      <version>5.10.1</version>
      <scope>test</scope>
   </dependency>

```

- ***2.***: Actualitzar les següents anotacions en el nostre codi perquè siguin compatibles amb JUnit 5.

   - **@org.junit.Test** per **@org.junit.jupiter.api.Test** (_import org.junit.jupiter.api.Test;_).
   - **@Before** ara és **@BeforeEach** (_import org.junit.jupiter.api.BeforeEach;_).
   - **@After** ara és **@AfterEach** (_import org.junit.jupiter.api.AfterEach;_).
   - **@BeforeClass** ara és **@BeforeAll** (_import org.junit.jupiter.api.BeforeAll;_).
   - **@AfterClass** ara és  **@AfterAll** (_import org.junit.jupiter.api.AfterAll;_).
   - **@Ignore** ara és **@Disabled** (_import org.junit.jupiter.api.Disabled;_).
   - **@RunWith** ara és **@ExtendWith** (_import org.junit.jupiter.api.extension.ExtendWith;_)
   - **@Category** ara és **@Tag** (_import org.junit.jupiter.api.Tag;_)
   - **@Test (expected = Exception.class)** ara és **Assertions.assertThrows**
      - Exemple

      ``` java 
      @Test(expected = IndexOutOfBoundsException.class)
      public void testIndexOutOfBoundsException() {
         ArrayList emptyList = new ArrayList();
         Object o = emptyList.get(0);
      }
      ```
      per 

      ``` java 
      @Test
      public void testIndexOutOfBoundsException() {
         ArrayList emptyList = new ArrayList();
         Assertions.assertThrows(IndexOutOfBoundsException.class, () -> {
            Object o = emptyList.get(0);
         });
      }
      ```
**4.** És recomanable utilitzar l’última versió de l’schema del XSD de Spring Security. Per exemple de:  http://www.springframework.org/schema/security/spring-security-5.4.xsd a:  http://www.springframework.org/schema/security/spring-security.xsd

**5.** S'ha modificat la URL d'accés a swagger passant de: http://localhost:8080/swagger-ui/index.html a: http://localhost:8080/api/swagger-ui/index.html

### Informació sobre mòduls migrats

S'indica el llistat de mòduls que han estat migrats de la versió 3.6 a la 3.8. Per cada mòdul cal modificar els intervals de les versions. A més, per a alguns mòduls cal realitzar altres modificacions per a poder usar-los de manera correcta.

- ***canigo.root***
- ***canigo.core***
- ***canigo.persistence.core***
- ***canigo.persistence.jpa***
- ***canigo.persistence.mongodb***
- ***canigo.security***
- ***canigo.web.core***
- ***canigo.web.rs***
- ***canigo.support.mailing***
- ***canigo.operation.logging***
- ***canigo.test***
- ***canigo.support.sftp***
- ***canigo.integration.antivirus*** (Actualització de la documentació en curs)
- ***canigo.integration.notificacions.electroniques*** (Actualització de la documentació en curs)
- ***canigo.integration.notificacions.electroniques.ws*** (Actualització de la documentació en curs)
- ***canigo.integration.pica*** (Actualització de la documentació en curs)
- ***canigo.integration.psgd*** (Actualització de la documentació en curs)
- ***canigo.integration.sarcat.pica*** (Actualització de la documentació en curs)

### canigo.root

No aplica realitzar accions relacionades amb la migració de 3.6 a 3.8.

### canigo.core

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                   | Interval de versions
----------------------- | --------------------
canigo.core             | [5.1.0, 5.2.0)

### canigo.persistence.core

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                   | Interval de versions
----------------------- | --------------------
canigo.persistence.core | [3.1.0, 3.2.0)

### canigo.persistence.jpa

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                   | Interval de versions
----------------------- | --------------------
canigo.persistence.jpa  | [3.1.0, 3.2.0)

  - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**. Per tant, haurem d'afegir la dependència `jakarta.annotation-api` versió **`1.3.5`** que substitueix la dependència de `javax.annotation-api` versió **1.3.2**.

  - S'ha d'afegir la dependència`mockito-core` a la versió **5.7.0**.
  
  - Finalment s'ha d'actualitzar`jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.

  - La configuració ja no s'ha de realitzar en el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/jpa.properties`, ja que les diferents propietats que es vulguin usar, s'han de definir en el fitxer application.yml. Un exemple de configuració d'aquest fitxer seria el següent:

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/*databaseName*
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: *username*
    password: *password*
  jpa:
    show-sql: true
    generate-ddl: true
    hibernate:
      ddl-auto: update
      generate_statistics: false
      use_scrollable_resultset: true
    connection:
      release_mode: auto
      autocommit: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
```

  - Configuració si l'aplicació va per jdbc. La configuració ha passat a realitzar-se amb fitxer yml en lloc d’amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/jdbc.properties`. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/*databaseName*
    username: *username*
    password: *password*
```

  - Configuració si l'aplicació va per jndi. La configuració ha passat a realitzar-se amb fitxer yml en lloc d’amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/jndi.properties`. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
spring:
  datasource:
    jndi-name: java:jboss/datasources/nomjndi
    jndi-lookupOnStartup: false
    jndi-cache: java: false
```

### canigo.persistence.mongodb

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.persistence.mongodb  | [3.1.0, 3.2.0)

 -  A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**. Per tant, haurem d'afegir la dependència `jakarta.annotation-api` versió **1.3.5** que substitueix la dependència de `javax.annotation-api` versió **1.3.2**. També s'ha de canviar la dependència `javax.annotation-api` versió **1.3.2** per la dependència `jakarta.annotation-api` versiò **1.3.5**.

  - No reactiu. La configuració ja no s'ha de realitzar en el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties`, ja que les diferents propietats que es vulguin usar, s'han de definir en el fitxer application.yml. Un exemple de configuració d'aquest fitxer seria el següent:

```yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/*database*
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
```

Indiquem taula amb explicació de les propietats:

Propietat | Requerit | Descripció
--------- | -------- | ----------
uri | Si | URL de connexió amb la BD MongoDB. Per més informació https://mongodb.github.io/mongo-java-driver/3.12/javadoc/com/mongodb/MongoClientURI.html
host | No | Requerit si no està definida la propietat mongodb.uri. Host de la connexió amb la BD MongoDB
port | No | Requerit si no està definida la propietat mongodb.uri. Port de la connexió amb la BD MongoDB
database | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD de la connexió amb la BD MongoDB
authenticationDatabase | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD MongoDB si esta autenticada
username | No | Requerit si no està definida la propietat mongodb.uri. Usuari de la connexió amb la BD MongoDB
password | No | Requerit si no està definida la propietat mongodb.uri. Secret de la connexió amb la BD MongoDB

  - Reactiu. La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer mongodb.properties. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/*database*
```

Indiquem taula amb explicació de les propietats:

Propietat | Requerit | Descripció
--------- | -------- | ----------
uri | Si | URL de connexió amb la BD MongoDB. Per més informació https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options

### canigo.security

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.security  | [3.1.0, 3.2.0)

  - La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/security.properties`. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
jwt:
  header:
    startToken: Bearer
  secret: canigo
  expiration: 3600
```

Indiquem taula amb explicació de les propietats:

Propietat                     | Requerit | Descripció                                 | Valor per Defecte
----------------------------- | -------- | -------------------------------------------|------------------
header                  | No       | Nom del header del _token_ JWT           | Authentication
header - startToken     | No       | Inici del _token_ JWT                    | Bearer
secret                  | No       | Password per generar el _token_ JWT      | canigo
expiration              | No       | Temps de vida del _token_ JWT            | 3600

  - Configuració per base de dades. La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/security.properties`.

Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
security:
  database:
    jndiName: nomJNDI
    url: urlJNDI
    username: USERNAME
    password: PASSWORD
```

Indiquem taula amb explicació de les propietats:

Propietat                    | Requerit | Descripció
---------------------------- | -------- | ----------------------------------------------------------
jndiName | Si       | Nom JNDI d'accés a la BD. Obligatori per a connexions JNDI
url      | Si       | URL de connexió a la base de dades
username | Si       | Usuari de connexió a la base de dades
password | Si       | Password de connexió a la base de dades

  - Configuració per LDAP. La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/security.properties`. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
security:
  ldap:
    url: urlLDAP
    manager:
      dn: managerDN
      password: PASSWORD
```

Indiquem taula amb explicació de les propietats:

Propietat                           | Requerit | Descripció
----------------------------------- | -------- | -----------------------------------------------------------------------
url                 | Si       | Direcció del servidor ldap separat amb dos punts ":" del port
manager - dn          | Sí       | Identificador de l'usuari administrador del LDAP
manager - password    | Si       | Password de l'usuari administrador del LDAP

  - Configuració de la font d’autenticació per GICAR. La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/security.properties`.

Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
security:
  gicar:
    httpGicarHeaderUsernameKey: NIF
```

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

  - Configuració de la font d’autenticació i autorització per GICAR. La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/security.properties`. Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
security:
  gicar:
    httpGicarHeaderUsernameKey: NIF
```

Indiquem taula amb explicació de les propietats:

Propietat                                   | Requerit | Descripció
------------------------------------------- | -------- | -----------------------------------
httpGicarHeaderUsernameKey | No       | Aquesta propietat indica quin és el camp de la capçalera HTTP_GICAR que conté el nom de l'usuari autenticat a GICAR. Per defecte: NIF

### canigo.web.core

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.web.core  | [3.1.0, 3.2.0)

  - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **Jakarta**. Per tant, haurem d'afegir la dependència `jakarta servelet api` versió **`6.0.0`** que substitueix la dependència de `javax.servelet api`.

### canigo.web.rs

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.web.rs  | [3.1.0, 3.2.0)

  - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**. Per tant, haurem d'afegir la dependència `jakarta.servlet-api` versió **`5.0.0`** que substitueix la dependència de `javax.servlet-api` versió **4.0.1**.

### canigo.support.mailing

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.support.mailing  | [3.1.0, 3.2.0)

  - Així mateix , a causa de la incompatibilitat i obsolescència amb el JDK 17 , s'esborren les dependències associades a la llibreria **JAVAX** ,sent reemplaçades per les dependències de **JAKARTA**. Les dependències reemplaçades són:`jakarta.activation` versió **`2.1.2`** que substitueix la dependència de `javax.activation` versió **1.1.1** i la dependència `jakarta.mail` versió**`2.0.1`** que substitueixla dependència de`javax.mail` versió **1.6.2** 
  - S'actualitza`commons.io` de la 2.11.0 a la versió **2.15.0**.

La configuració ja no s'ha de realitzar en el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/mail.properties`, ja que les diferents propietats que es vulguin usar, s'han de definir en el fitxer application.yml. Un exemple de configuració d'aquest fitxer seria el següent:

```yml
spring:
  mail:
    host: smtp.host.com
    port: 25
    protocol: smtp
    username: <username>
    password: <password>
    default-encoding: UTF-8
    debug: false
    timeout: 8500
```

Indiquem taula amb explicació de les propietats:

Propietat                | Requerit | Valor Defecte | Descripció
------------------------ | -------- | ------------- | -----------
host              | Sí       |               | Nom del servidor de correu sortint (smtp).
port              | No       |      25       | Port del servidor de correu sortint (smtp). 
protocol          | No       |     smtp      | Protocol del servidor de correu sortint (smtp).
username          | No       |               | Usuari de connexió al servidor de correu sorting (smtp).
password          | No       |               | Password de l'usuari de connexió.
default-encoding  | No       |     UTF-8     | Encoding per defecte del correu.  
debug             | No       |     false     | Activar les traces de debug.
timeout           | No       |     8500      | Timeout pel servidor de correu(ms).
smtp - timeout    | No       |10000          |Timeout (smtp) mili segons.
smtp - auth       | No       |false          |Intent d'autenticar l'usuari utilitzant l'ordre AUTH.

### canigo.operation.logging

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.operation.logging    | [3.1.0, 3.2.0)

  - S'ha d'afegir la dependència [Canigó-web-core](/plataformes/canigo/documentacio-llibreries/canigo.web.core/3.1.0/) de la versió 3.1.0.
  - És necessari, canviar la versió 3.0.4 del propi mòdul canigó per la versió del mòdul canigó a 3.1.0. És a dir , canigó operation logging 3.0.4 a versió 3.1.0.
  - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**. Per tant, haurem d'afegir la dependència `jakarta.websocket-api` versió **`2.1.1`** que substitueix la dependència de `javax.websocket-api` versió 1.1 ,`jakarta.servlet-api` versió **`6.0.0`** que substitueix la dependència de `javax.servlet-api` versió 3.0.0.
  - S'ha d'actualitzar`tomcat-embed-websocket` de la 10.0.18 a la versió **10.1.16**,`jackson-core` versió **2.13.2** a la versió **2.15.3** i `mockito-core` de la 4.3.1 a la versió **5.7.0**
  - Actualització de tots els mòduls de Canigó per a actualitzar `org.springframework` de 5.3.18 a 6.1.1, `spring-core` de 5.3.18 a 6.1.1,`spring-websocket` de 5.3.18 a 6.1.1, `spring-context-support` de 5.3.18 a 6.1.1, `spring-webmvc`de 5.3.18 a 6.1.1 i `spring-messaging` de 5.3.18 a 6.1.1.
  - Finalment s'ha d'actualitzar`jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.

### canigo.test

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.test                 | [3.1.0, 3.2.0)

 - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17, s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**. Per tant, haurem d'afegir la dependència `jakarta.servlet-api` versió **`6.0.0`** que substitueix la dependència de `javax.servlet-api` versió 3.0.0.
 
 - Una altra de les actualitzacions de dependències que s'ha de realitzar és afegir la dependència de `mockito-core` a la versió **5.7.0**, `spring-test` **6.1.1** i `testng` a la versió **7.8.0** . Així mateix modificar la dependència de `junit` de la version 4.13.2 a `junit-jupiter` 5.10.1 i finalment `jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.

### canigo.support.sftp

  - Actualitzar en el fitxer pom.xml els intervals de les dependències del mòdul:

Mòdul                       | Interval de versions
--------------------------- | --------------------
canigo.support.sftp         | [3.1.0, 3.2.0)

La configuració ja no s'ha de realitzar en el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/sftp.properties`, ja que les diferents propietats que es vulguin usar, s'han de definir en el fitxer application.yml. Un exemple de configuració d'aquest fitxer seria el següent:

```yml
sftp:
  url: URL_DEL_SERVIDOR_FTP
  port: 22
  username: USUARI_FTP
  password: PASSWORD_FTP
```

Indiquem taula amb explicació de les propietats:

Propietat |	Requerit | Descripció
--------- | -------- | ----------
url   |Sí | Host del servidor sftp.
port | No | Port del servidor sftp. Valor per defecte: 22.
username | No | Usuari de connexió al servidor de secure ftp (sftp).
password | No | Password de l'usuari de connexió.
