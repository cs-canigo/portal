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
amb Canigó 3.8 i el punt de partida d'aquesta guia és una aplicació creada amb el plugin de Canigó per l'Eclipse.

### Configuració prèvia

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul) podeu consultar les versions
dels mòduls i components de Canigó de les versions 3.6.x i 3.8.x. Per tant, caldrà **actualitzar els intervals de
versions dels mòduls utilitzats per l'aplicació** per a migrar a Canigó 3.8.

Per a actualitzar de la versió 3.6 a la 3.8, es necessari realitzar l'actualització de les dependències del nostre projecte. 

Les dependències específiques que han d'actualitzar-se la seva les següents: 

Spring Boot 3.1.4 

```
   <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>3.1.4</version>
   </parent>
```

Spring Framework 6.1.1 
```
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.1.1</version>
   </dependency>

```


OpenJDK 17
```
   <maven.compiler.source>17</maven.compiler.source>
   <maven.compiler.target>17</maven.compiler.target>
```



Spring Security 6.1.3 

```
   <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-core</artifactId>
      <version>6.1.3</version>
   </dependency>
```
Junit 4 a Junit 5 (Jupiter) 5.10.1.

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

