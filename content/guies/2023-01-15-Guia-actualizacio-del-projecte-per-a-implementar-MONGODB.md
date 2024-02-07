+++
date = "2023-01-15"
title = "Guia: Actualització del projecte per a implantar MONGODB"
description = "En aquest HowTo s'explica pas a pas com utilitzar MongoDB en un Projecte seguint les millors pràctiques definides pel CS Canigó"
section = "guies"
categories = ["canigo"]
key = "GENER2023"
+++

# Actualització del projecte per a implantar MongoDb

## Introducció

Aquesta guia té com a objectiu guiar-te a través del procés d'integració de MongoDB en el teu projecte basat en Spring Boot. MongoDB és una base de dades NoSQL ampliament utilitzada per emmagatzemar dades flexibles i escalables. L'ús de MongoDB en combinació amb Spring Boot permet construir aplicacions web i d'empresa robustes i eficients.

## Pas 1: Afegir Dependències

Assegura't que el teu fitxer `pom.xml` contingui les dependències necessàries per a MongoDB i les versions de Spring Boot, Spring i Spring Security que necessites. A continuació, es mostra un exemple de com afegir aquestes dependències:

```xml
    <dependencies>
        <!-- MongoDB -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
        <dependency>
            <groupId>cat.gencat.ctti</groupId>
            <artifactId>canigo.persistence.mongodb</artifactId>
            <version>3.1.0</version>
        </dependency>
    </dependencies>
```

## Pas 2: Configurar la Connexió a MongoDB

Crea un arxiu de configuració application.properties o application.yml al directori src/main/resources del teu projecte. Configura la connexió a MongoDB amb els següents paràmetres:

application.yml:
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

Assegura't de reemplaçar "la_teva_base_de_dades" amb el nom de la teva base de dades a MongoDB.

## Pas 3: Crear un Model
Crea una classe de model que representi les dades que vols emmagatzemar a MongoDB. Anota la classe amb @Document per indicar que s'emmagatzemarà a MongoDB.
```java
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;
    
    @Document(collection  = "*name_collection*")
    public class ElTeuModel {
        @Id
        private String id;
        private String nom;
    }
```

## Pas 4: Crear un Repositori

Crea un repositori per interactuar amb la base de dades de MongoDB. Ha d' extendre la interfície MongoRepository i especificar el tipus de model i el tipus d'ID (en aquest cas, String).

```java
    import org.springframework.data.mongodb.repository.MongoRepository;
    @Repository
    public interface ElTeuRepositori extends MongoRepository<El_nom_del_teu_Model, long> {
        // Pots afegir mètodes de consulta personalitzats aquí si cal.
    }
```

## Pas 5: Utilitzar MongoDB en la teva Aplicació

Ara pots utilitzar MongoDB en la teva aplicació Spring Boot. Pots injectar el repositori als teus controladors o serveis i utilitzar-lo per a realitzar operacions de lectura i escriptura a la base de dades.

Per exemple, en un controlador:

```java
    import org.springframework.web.bind.annotation.*;
    
    @RestController
    @RequestMapping("/api")
    public class ElTeuControlador {
        private final ElTeuRepositori repositori;
    
        public ElTeuControlador(ElTeuRepositori repositori) {
            this.repositori = repositori;
        }
    
        @PostMapping("/crear")
        public ElTeuModel crear(@RequestBody ElTeuModel model) {
            return repositori.save(model);
        }
    
        @GetMapping("/obtenir/{id}")
        public Optional<ElTeuModel> obtenir(@PathVariable String id) {
            return repositori.findById(id);
        }
        
        // Afegeix més endpoints segons les teves necessitats
    }
```


## Exemple de com fer el Junit

```java
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
    import static org.assertj.core.api.Assertions.assertThat;
    
    @DataMongoTest
    public class TuServicioTest {
    
        @Autowired
        private TuServicio tuServicio;
    
        @Test
        public void pruebaOperacionDeServicio() {
            // Realiza alguna operación en tuServicio
            TuModelo resultado = tuServicio.realizarOperacion();
    
            // Realiza afirmaciones para verificar el resultado
            assertThat(resultado).isNotNull();
            // Añade más afirmaciones según tus necesidades
        }
    }

```


Aquests són els passos bàsics per utilitzar MongoDB en un projecte Spring Boot amb les versions especificades. 
Assegura't de personalitzar i ampliar aquests passos segons les teves necessitats específiques.
