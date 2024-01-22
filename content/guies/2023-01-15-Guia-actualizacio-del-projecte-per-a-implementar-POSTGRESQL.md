+++
date = "2023-01-15"
title = "Guia: Actualització del projecte per a implantar PostgreSQL"
description = "S'explica pas a pas com utilitzar PostgreSQL en un Projecte seguint les millors pràctiques definides pel CS Canigó"
section = "guies"
categories = ["canigo"]
key = "GENER2023"
+++


# Actualització del projecte per a implantar PostgreSQL


## Introducció

Aquesata guia té com a objectiu guiar-te a través del procés d'integració de PostgreSQL en el teu projecte basat en Spring Boot. PostgreSQL és un sistema de gestió de bases de dades relacional àmpliament utilitzat. La seva integració amb Spring Boot permet construir aplicacions web i empresarials robustes i eficients.

## Pas 1: Afegir Dependències

Assegura't que el teu fitxer `pom.xml` contingui les dependències necessàries per a PostgreSQL i les versions de Spring Boot, Spring i Spring Security que necessites. Aquí tens un exemple de com afegir aquestes dependències:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
</dependencies>
```
## Pas 2: Configurar la Connexió a PostgreSQL

Crea un arxiu de configuració application.properties o application.yml al directori src/main/resources del teu projecte. Configura la connexió a PostgreSQL amb els següents paràmetres:

application.yml:

```yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/NOMBRE_DE_TU_BD
    username: TU_USUARIO
    password: TU_CONTRASEÑA
  jpa:
    hibernate:
      ddl-auto: update # Puedes cambiar esto según tus necesidades
    show-sql: true
```

Assegura't de substituir *databaseName*, *username* i *password* amb els detalls de la teva configuració de PostgreSQL.

## Pas 3: Crear una Entitat

Crea una classe d'entitat que representi les dades que vols emmagatzemar a PostgreSQL. Anota la classe amb @Entity per indicar que s'emmagatzemarà a PostgreSQL.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LaTevaEntitat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    // Afegeix més atributs segons sigui necessari
}

```

## Pas 4: Crear un Repositori
Crea un repositori per interactuar amb la base de dades de PostgreSQL. Ha d'extensar la interfície JpaRepository i especificar el tipus d'entitat i el tipus d'ID (en aquest cas, Long).

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElTeuRepositori extends JpaRepository<LaTevaEntitat, Long> {
    // Pots afegir mètodes de consulta personalitzats aquí si és necessari.
}
```

## Pas 5: Utilitzar PostgreSQL en la teva Aplicació
Ara pots utilitzar PostgreSQL en la teva aplicació Spring Boot. Pots injectar el repositori als teus controladors o serveis i utilitzar-lo per realitzar operacions de lectura i escriptura a la base de dades.

Per exemple, en un controlador:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ElTeuControlador {
    private final ElTeuRepositori repositori;

    @Autowired
    public ElTeuControlador(ElTeuRepositori repositori) {
        this.repositori = repositori;
    }

    @PostMapping("/crear")
    public LaTevaEntitat crear(@RequestBody LaTevaEntitat entitat) {
        return repositori.save(entitat);
    }

    @GetMapping("/obtenir/{id}")
    public Optional<LaTevaEntitat> obtenir(@PathVariable Long id) {
        return repositori.findById(id);
    }
    // Afegeix més endpoints segons les teves necessitats
}
```

Aquests són els passos bàsics per utilitzar PostgreSQL en un projecte Spring Boot amb les versions especificades.