+++
date = "2018-08-10"
title = "Configuració de MongoDB a Canigó 3.2.6"
description = "En aquest HowTo s'explica pas a pas com configurar el suport de MongoDB a Canigó 3.2.6 seguint les millors pràctiques definides pel CS Canigó"
section = "howtos"
categories = ["canigo"]
key = "OCTUBRE2018"
+++

## Audiència

Aquest how-to va dirigit principalment al personal tècnic (desenvolupadors, analistes, arquitectes) que desenvolupi una aplicació Canigó 3.2.6 i que necessiti configurar el suport per a MongoDB.

## MongoDB

Abans de fer cap modificació al projecte, cal generar, compilar i executar l'aplicació per verificar que tot funciona bé, per després triar el mètode de configurar el suport per a MongoDB.

### Entorn de Desenvolupament de Canigó

El plugin d'Eclipse de Canigó que ve integrat amb [l'entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)) és la manera recomanada i més ràpida d'afegir el suport per a MongoDB. Per fer-ho s'ha de seguir les següents passes:

1. Un cop es té el projecte Canigó actiu a l'entorn de desenvolupament de Canigó s'ha de fer clic al botó dret del ratolí al nom del projecte.
2. Un cop s'ha desplegat el menú d'opcions (entre d'altres hi ha "New", "Go into", "Import") s'han de triar les següents opcions:
> Canigó > Add New Modules
3. Ara s'ha obert una finestra amb el títol "Add new module" on es pot triar quins mòduls instal·lar. S'ha d'activar l'opció `MongoDB Module` dins l'opció `Persistence` i clicar al botó `Next>`. Per defecte la BBDD "MongoDB" vindrà pre-seleccionada, i només caldrà fer clic al botó `Finish`.

Un cop s'han executat les passes prèvies es disposarà del suport per a MongoDB instal·lat automàticament al projecte, i un petit joc de proves d'exemple dins el package `...mongodb.model` entre altres fitxers tècnics.
Ara només roman configurar l'aprovisionament (entorns, passwords, etc.) al fitxer `src/main/resources/config/props/mongodb.properties`.

### Configuració manual

En el cas que es vulgui fer configurar de manera manual el suport per a MongoDB, primer de tot s'haurà de disposar una aplicació creada amb el "archetype" de Canigó. Per fer-ho s'han de seguir les següents passes:

1. Generar projecte amb archetype: `mvn -B archetype:generate -DgroupId=cat.gencat.mongodbapp -DartifactId=mongodbapp -Dversion=1.0-SNAPSHOT -DarchetypeGroupId=cat.gencat.ctti -DarchetypeArtifactId=plugin-canigo-archetype-rest -DarchetypeVersion=1.6.0`
2. Compilar amb `mvn -B -f mongodbapp/pom.xml clean package`
3. Executar l'aplicació generada mitjançant `java -Dapplication.defaultLanguage=ca -jar mongodbapp/target/mongodbapp.war`
4. Provar d'accedir amb un navegador web a http://localhost:8080/index.html

Un cop s'han executat els passos previs per disposar d'una aplicació Canigó 3.2.6 funcionant, s'ha d'afegir el suport específic pe *MongoDB*, de la següent manera:

1. Modificar pom.xml per afegir la següent dependència al final:

```
	<dependency>
		<artifactId>canigo.persistence.mongodb</artifactId>
		<groupId>cat.gencat.ctti</groupId>
		<version>[1.0.0,1.1.0)</version>
	</dependency>
```
2. Continuar modificant pom.xml per afegir l'exclusió `spring-boot-starter-logging:org.springframework.boot`:

```
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-mongodb</artifactId>
		<exclusions>
			<exclusion>
				<artifactId>spring-boot-starter-logging</artifactId>
				<groupId>org.springframework.boot</groupId>
			</exclusion>
		</exclusions>
	</dependency>
```

2. Continuar modificant pom.xml per afegir uns processadors d'anotacions:

```
	<plugin>
		<groupId>com.mysema.maven</groupId>
		<artifactId>apt-maven-plugin</artifactId>
		<version>1.1.3</version>
		<executions>
			<execution>
				<id>org.springframework.data.mongodb.repository.support.MongoAnnotationProcessor</id>
				<goals>
					<goal>process</goal>
				</goals>
				<configuration>
					<outputDirectory>target/generated-sources/java</outputDirectory>
					<processor>org.springframework.data.mongodb.repository.support.MongoAnnotationProcessor</processor>
				</configuration>
			</execution>
		</executions>
	</plugin>
```

3. Configurar el fitxer `src/main/resources/config/props/mongodb.properties` seguint el següent exemple:

```
*.mongodb.uri=mongodb://user:secret@127.0.0.1:27017/dataBase
```

4. Crear una classe tècnica per poder configurar el `MongoCoreConfig` al paquet `...mongodb.config`:

```
package cat.gencat.mongodbapp.mongodb.config;

import org.springframework.context.annotation.Bean;

import cat.gencat.mongodbapp.mongodb.model.repository.MongoEquipamentListener;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig;

public class MainMongoConfig extends MongoCoreConfig {

//	protected static MongoClientOptions mongoClientOptions;
//
//	public EquipamentMongoConfig() {
//		super(mongoOptions());
//	}

//	@Bean
//	public MongoEquipamentListener mongoEquipamentListener() {
//		return new MongoEquipamentListener();
//	}

//	@Bean
//	public static MongoClientOptions mongoOptions() {
//		if (mongoClientOptions == null) {
//			mongoClientOptions = MongoClientOptions.builder().socketTimeout(2000).build();
//		}
//		return mongoClientOptions;
//	}

}
```

5. Modificar `AppConfig.java` anotant la definició de la classe de la següent manera:
```
@Import(MainMongoConfig.class)
```

#### Entitats i repositoris MongoDB

Un cop s'ha configurat l'aplicació descrita a l'apartat anterior només resta afegir les entitats i els repositoris. Com a exemple d'entitat i repositori associat serien els següents codis:

```
package cat.gencat.mongodbapp.mongodb.model;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Equipament")
public class MongoEquipament {
	
	public static final String ID = "id";
	public static final String NOM = "nom";
	public static final String MUNICIPI = "municipi";

	@Id
	private Long id;

	@Indexed(unique = true)
	@NotNull(message = "MongoEquipament's nom must not be null")
	private String nom;

	private String municipi;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMunicipi() {
		return municipi;
	}

	public void setMunicipi(String municipi) {
		this.municipi = municipi;
	}

}
```

```
package cat.gencat.mongodbapp.mongodb.model.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;

import cat.gencat.mongodbapp.mongodb.model.MongoEquipament;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository;

public interface EquipamentMongoRepository extends MongoGenericRepository<MongoEquipament, Long>{

	@Query("{ nom: ?0 }")
	List<MongoEquipament> findByNomQuery(String nom);

	List<MongoEquipament> findByNomLike(String nom, Sort sort);


}
```

Més info:
1. https://docs.spring.io/spring-data/mongodb/docs/current/reference/html
2. https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/package-summary.html

