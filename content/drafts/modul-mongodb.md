+++
date        = "2020-04-28"
title       = "Mòdul MongoDB"
description = "Mòdul de persistència de Base de Dades per MongoDB."
sections    = "Canigó. Documentació versió 3.x"
weight      = 3
+++

## Propòsit

Aquest mòdul proporciona accés i l'execució d'operacions a una base de dades Mongodb.

Aquest mòdul utilitza Spring Data MongoDB i QueryDSL. Es pot trobar informació sobre aquests frameworks a la documentació de referència:

* [Spring Data Mongo](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/). 
* [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/)

A partir de la versió 3.4 de Canigó, s'ha proporcionat les funcionalitats de reactiu per Mongodb

## Instal·lació

Es pot afegir el mòdul MongoDB a una aplicació ja generada a partir de l'eina de suport al desenvolupador. L'eina de suport al desenvolupador inclourà la referència i les dependències dins del pom.xml.
En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```xml
    <canigo.persistence.mongodb.version>[2.0.0,2.4.0)</canigo.persistence.mongodb.version>

    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.persistence.mongodb</artifactId>
      <version>${canigo.persistence.mongodb.version}</version>
    </dependency>
```

Al pom.xml també s'ha d'afegir el plugin que genera les classes per als filtres de [QueryDSL](http://www.querydsl.com/) i
el que executa el test unitari del mòdul de persistència:

```xml
<build>
	...
	<plugins>
		...
		<plugin>
			<groupId>com.mysema.maven</groupId>
			<artifactId>apt-maven-plugin</artifactId>
			<version>1.1.3</version>
			<executions>
			...
    			<execution>
                    <id>org.springframework.data.mongodb.repository.support.MongoAnnotationProcessor</id>
                    <goals>
                      <goal>process</goal>
                      <goal>test-process</goal>
                    </goals>
                    <configuration>
                      <outputDirectory>target/generated-sources/java</outputDirectory>
                      <processor>org.springframework.data.mongodb.repository.support.MongoAnnotationProcessor</processor>
                    </configuration>
                </execution>
			...
			</executions>
		</plugin>
		...
	</plugins>
	...
</build>	
```

Si l'aplicació està configurada amb Spring Boot és necessari afegir la dependencia:

```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
        <exclusions>
            <exclusion>
              <artifactId>mongo-java-driver</artifactId>
              <groupId>org.mongodb</groupId>
            </exclusion>
            <exclusion>
              <artifactId>spring-boot-starter-logging</artifactId>
              <groupId>org.springframework.boot</groupId>
            </exclusion>
        </exclusions>
    </dependency>
```

Si es vol utilitzar Embeded Mongo per executar els tests és necessari afegir la dependencia:

```xml
    <dependency>
      <groupId>de.flapdoodle.embed</groupId>
      <artifactId>de.flapdoodle.embed.mongo</artifactId>
      <exclusions>
        <exclusion>
          <artifactId>mongo-java-driver</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>cz.jirutka.spring</groupId>
      <artifactId>embedmongo-spring</artifactId>
      <version>1.3.1</version>
      <exclusions>
        <exclusion>
          <artifactId>mongo-java-driver</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
```

Per utilitzar les funcionalitats de Mongodb 4.2 és necessari utilitzar la versió 3.12.3 o superior de *mongodb-driver-core*

https://docs.mongodb.com/drivers/driver-compatibility-reference#java-driver-compatibility

Així necessitem importar la següent dependència:

```xml
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-core</artifactId>
      <version>3.12.3</version>
    </dependency>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>bson</artifactId>
      <version>3.12.3</version>
    </dependency>
```

I si volem utilitzar les funcionalitats reactives:

```xml
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-async</artifactId>
      <version>3.12.3</version>
    </dependency>
```

## Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament (plugin de Canigó per a Eclipse)

En cas que no es generi automàticament el codi, s'ha de realitzar manualment la següent configuració:

### Configuració no reactiu

**mongodb.properties**

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per més informació http://api.mongodb.com/java/current/com/mongodb/MongoClientURI.html
*.mongodb.host | No | Requerit si no està definida la propietat mongodb.uri. Host de la connexió amb la BD MongoDB
*.mongodb.port | No | Requerit si no està definida la propietat mongodb.uri. Port de la connexió amb la BD MongoDB
*.mongodb.database | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD de la connexió amb la BD MongoDB
*.mongodb.authenticationDatabase | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD MongoDB si esta autenticada
*.mongodb.username | No | Requerit si no està definida la propietat mongodb.uri. Usuari de la connexió amb la BD MongoDB
*.mongodb.password | No | Requerit si no està definida la propietat mongodb.uri. Secret de la connexió amb la BD MongoDB


**MongoConfig.java**

Ubicació recomenada: <PROJECT_ROOT>/src/main/java/ *package de l'aplicacio* /mongodb/config

Es necessari crear l'arxiu de configuració de l'aplicació per a MongoDB. Es necessari extendre de la configuració de **cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig**

En aquest fitxer de configuració s'hi pot sobreesciure la configuració de la connexió per defecte utilitzant el constructor

```java
public MongoCoreConfig(MongoClientOptions options)
```

Per més informació sobre les configuracions es pot consultar: http://api.mongodb.com/java/current/com/mongodb/MongoClientOptions.html

En aquest fitxer també s'hi pot afegir els diferents listeners de les diferents entitats de MongoDB

Un exemple de fitxer de configuració seria:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.MongoClientOptions;

import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoEquipamentListener;

@Configuration
public class EquipamentMongoConfig extends MongoCoreConfig {

	protected static MongoClientOptions mongoClientOptions;

	public EquipamentMongoConfig() {
		super(mongoOptions());
	}

	@Bean
	public MongoEquipamentListener mongoEquipamentListener() {
		return new MongoEquipamentListener();
	}

	@Bean
	public static MongoClientOptions mongoOptions() {
		if (mongoClientOptions == null) {
			mongoClientOptions = MongoClientOptions.builder().socketTimeout(2000).build();
		}
		return mongoClientOptions;
	}

}
```

On s'està redefinit el socket time out de la connexió a 2000 ms i s'està registrant el listener cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener

### Configuració reactiu

**mongodb.properties**

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per més informació https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options

**ReactiveMongoConfig.java**

Ubicació recomenada: <PROJECT_ROOT>/src/main/java/ *package de l'aplicacio* /mongodb/config

Es necessari crear l'arxiu de configuració de l'aplicació per a reactive MongoDB. Es necessari extendre de la configuració de **cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig**

En aquest fitxer també s'hi pot afegir els diferents listeners de les diferents entitats de MongoDB

Un exemple de fitxer de configuració seria:
```java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.MongoClientOptions;

import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoEquipamentListener;

/**
 * Class EquipamentReactiveMongoConfig.
 *
 * @author cscanigo
 */
@Configuration
public class EquipamentReactiveMongoConfig extends ReactiveMongoCoreConfig {

    /** mongo client options. */
    protected static MongoClientOptions mongoClientOptions;

    /**
     * Mongo equipament listener.
     *
     * @return mongo equipament listener
     */
    @Bean
    public MongoEquipamentListener mongoEquipamentListener() {
        return new MongoEquipamentListener();
    }

    /**
     * Mongo options.
     *<
     * @return mongo client options
     */
    @Bean
    public static MongoClientOptions mongoOptions() {
        if (mongoClientOptions == null) {
            mongoClientOptions = MongoClientOptions.builder().socketTimeout(2000).build();
        }
        return mongoClientOptions;
    }

}
```

On s'està redefinit el socket time out de la connexió a 2000 ms i s'està registrant el listener cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener

## Entitats

Per definir les entits de MongoDB és necessari utilitzar les annotations de JSR 380, Spring Data i Spring Data MongoDB. Per més informació:
https://docs.oracle.com/javaee/7/api/javax/validation/package-summary.html
https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/package-summary.html
https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/

Un exemple d'entitat de MongoDB seria:

```java
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

## Listeners

Si és necessari, es pot crear un listener a una entitat de Mongo

Un exemple de listener seria:

```java
import java.util.Random;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

import cat.gencat.ctti.mongodb.model.MongoEquipament;

/**
 * Equivalent of a domain method annotated by <code>PrePersist</code>.
 */
public class MongoEquipamentListener extends AbstractMongoEventListener<MongoEquipament> {

	@Override
	public void onBeforeConvert(BeforeConvertEvent<MongoEquipament> event) {
		MongoEquipament mongoEquipament = event.getSource();
		if (mongoEquipament.getId() == null) {
			// TODO use a better UUID generator in production
			mongoEquipament.setId(new Random().nextLong());
		}
	}

}
```

Per generar id únics a l'entitat MongoEquipament abans de guardar-la

## Repositoris

### Configuració no reactiu

Per a utilitzar els repositoris s'ha de generar un objecte MongoRepository per a l'entitat desitjada(T), que ha d'extendre de **cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository<T, ID extends Serializable>**

Un exemple de repository seria:

```java
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;

import cat.gencat.ctti.mongodb.model.MongoEquipament;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository;

public interface EquipamentMongoRepository extends MongoGenericRepository<MongoEquipament, Long>{

	@Query("{ nom: ?0 }")
	List<MongoEquipament> findByNomQuery(String nom);

	List<MongoEquipament> findByNomLike(String nom, Sort sort);


}
```

A un repositori es poden definir mètodes per cada query que es vulgui definir. La construcció utilitza els prefixos find...By, read...By, query...By, count...By i get...By. El mètode pot incoporar la paraula Distinct, concatenar propietats amb And i Or o descriptors com OrderBy o IgnoreCase.

Més informació a la documentació oficial de [Spring Data MongoDB] (https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/)

#### Utilització de QueryDSL

Una de les funcionalitats proposades és la d'utilitzar QueryDSL per a realitzar cerques segons filtres dinàmics, amb paginació i/o ordenació.

El MongoGenericRepository proporciona els següents mètodes:


```java
	Page<T> findAll(Predicate predicate, Pageable pageable, Path<?>... paths);

	Page<T> findAll(Predicate predicate, Pageable pageable, List<Path<?>> paths);
	
	Page<T> findAll(Predicate predicate, Pageable pageable, FactoryExpression<T> factoryExpression);
```

Aquests mètodes espera un objecte org.springframework.data.domain.Pageable que conté el número de pàgina (la primera pàgina és la 0), el nombre d'elements per pàgina, la direcció d'ordenació, el camp d'ordenació. Un objecte Predicate amb la query que es vol realitzar i un objecte Path o FactoryExpression on s'indica la informació que es vol retornar

Un exemple d'utilització seria:

```java
List<MongoEquipament> mongoEquipamentList = repository.findAll(QMongoEquipament.mongoEquipament.nom.isNotNull().and(QMongoEquipament.mongoEquipament.nom.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotNull())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.nom.equalsIgnoreCase("findPaginatedPath")),
				new PageRequest(0, 10), paths).getContent();
```

Es pot utitlizar les utilitzats de **cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder** per generar el Predicate, per exemple:

```java
    GenericPredicateBuilder<MongoEquipament> builder = new GenericPredicateBuilder<MongoEquipament>(
				MongoEquipament.class, "equipament");
	builder.populateSearchCriteria(filter);
	Predicate predicate = builder.build();
```

On el String filter ha de seguir el patró:

**field1Operador1Valor1,field2Operador2Valor2,fieldNOperadorNValorN**

- on Field és el nom d'una propietat de l'entitat (per exemple id)<br>
- on Operador és un dels tipus d'operador suportats:

Operador | Descripció
--------- | --------
> | major que
>: | major o igual que
< | menor que
<: | menor o igual que
<> | diferent de
: | igual que

- on valor és el valor amb el qual es vol comparar.

Per exemple, per cercar l'entitat que tingui id major que 15 i amb nom igual a 'Prova' el filtre hauria de ser el següent:<br>
id>15,nom:Prova

Més informació a la documentació oficial de [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/)

Querydsl està enfocat a bd relacionals, a partir de la versió 3.4 de Canigó s'ha deprecat els mètodes de "cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository", es recomana no utilitzar-los

### Configuració reactiu

Per a utilitzar els repositoris s'ha de generar un objecte ReactiveMongoRepository per a l'entitat desitjada(T), que ha d'extendre de org.springframework.data.mongodb.repository.ReactiveMongoRepository<T, ID>

Un exemple de repository seria:

```java
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import cat.gencat.provamongo.mongodb.model.MongoEquipament;

/**
 * Interface EquipamentReactiveMongoRepository.
 *
 * @author cscanigo
 */
@Repository
public interface EquipamentReactiveMongoRepository extends ReactiveMongoRepository<MongoEquipament, Long> {

    @Query("{ nom: ?0 }")
    List<MongoEquipament> findByNomQuery(String nom);

    List<MongoEquipament> findByNomLike(String nom, Sort sort);

}
```

A un repositori es poden definir mètodes per cada query que es vulgui definir. La construcció utilitza els prefixos find...By, read...By, query...By, count...By i get...By. El mètode pot incoporar la paraula Distinct, concatenar propietats amb And i Or o descriptors com OrderBy o IgnoreCase.

Més informació a la documentació oficial de [Spring Data MongoDB] (https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/)

## Test

### Configuració no reactiu

Definirem els següents tests:

```java
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.querydsl.QSort;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;

import cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.model.MongoEquipament;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.model.QMongoEquipament;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.EquipamentMongoRepository;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 *
 * @author cscanigo
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public abstract class EquipamentMongoRepositoryCoreTest {

	protected static final String MUNICIPI_DESC_SORT = Direction.DESC + MongoEquipament.MUNICIPI;

	/** repository. */
	@Inject
	private EquipamentMongoRepository repository;

	/**
	 * Estableix up.
	 */
	@Before
	public void setUp() {
		assertNotNull(repository);
		repository.deleteAll();
	}

	/**
	 * Test 01 CRUD operations.
	 */
	@Test
	public void test01CRUDOperations() {

		// Test if table is empty
		assertTrue(repository.findAll().isEmpty());

		// Test save
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom("CAP La Pau");
		mongoEquipament.setMunicipi("Barcelona");
		repository.save(mongoEquipament);

		// Test insert and recover
		MongoEquipament mongoEquipament2 = new MongoEquipament();
		mongoEquipament2.setNom("CAP Santa Coloma");
		repository.save(mongoEquipament2);

		Optional<MongoEquipament> equipament3Optional = repository.findById(mongoEquipament2.getId());
		assertTrue(equipament3Optional.isPresent());

		MongoEquipament equipament3 = equipament3Optional.get();
		assertEquals(mongoEquipament2.getId(), equipament3.getId());
		assertEquals("CAP Santa Coloma", equipament3.getNom());

		BooleanExpression predicate = QMongoEquipament.mongoEquipament.municipi.eq(mongoEquipament.getMunicipi());

		Optional<MongoEquipament> equipament4Optional = repository.findOne(predicate);
		assertTrue(equipament4Optional.isPresent());

		Iterable<MongoEquipament> equipament5Iterable = repository.findAll(predicate);
		assertTrue(equipament5Iterable.iterator().hasNext());

		OrderSpecifier<String> orderSpecifier = new OrderSpecifier<>(com.querydsl.core.types.Order.ASC,
				QMongoEquipament.mongoEquipament.nom);

		Iterable<MongoEquipament> equipament6Iterable = repository.findAll(predicate, orderSpecifier);
		assertTrue(equipament6Iterable.iterator().hasNext());

		// Test delete all
		repository.deleteAll();
		assertTrue(repository.findAll().isEmpty());

	}

	/**
	 * Test 02 multiple CRUD.
	 */
	@Test
	public void test02MultipleCRUD() {
		List<MongoEquipament> list = new ArrayList<>();

		MongoEquipament mongoEquipament1 = new MongoEquipament();
		MongoEquipament mongoEquipament2 = new MongoEquipament();
		MongoEquipament mongoEquipament3 = new MongoEquipament();

		list.add(mongoEquipament1);
		list.add(mongoEquipament2);
		list.add(mongoEquipament3);

		// Test save
		mongoEquipament1.setNom("equipament1");
		mongoEquipament2.setNom("equipament2");
		mongoEquipament3.setNom("equipament3");
		repository.saveAll(list);
		assertEquals(list.size(), repository.findAll().size());

		// Test update
		mongoEquipament1.setNom("equipament1 updated!");
		mongoEquipament2.setNom("equipament2 updated!");
		mongoEquipament3.setNom("equipament3 updated!");
		repository.saveAll(list);
		assertEquals(list.size(), repository.findAll().size());

		List<MongoEquipament> elsMeusEquipaments = repository.findAll();
		assertEquals(mongoEquipament1.getId(), elsMeusEquipaments.get(0).getId());
		assertEquals(mongoEquipament1.getNom(), elsMeusEquipaments.get(0).getNom());
		assertEquals(mongoEquipament2.getId(), elsMeusEquipaments.get(1).getId());
		assertEquals(mongoEquipament2.getNom(), elsMeusEquipaments.get(1).getNom());
		assertEquals(mongoEquipament3.getId(), elsMeusEquipaments.get(2).getId());
		assertEquals(mongoEquipament3.getNom(), elsMeusEquipaments.get(2).getNom());

		// Test no exception launched
		repository.saveAll(new ArrayList<MongoEquipament>());
	}

	/**
	 * Test 03 nom not null.
	 */
	@Test
	public void test03NomNotNull() {
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom(null);
		try {
			repository.save(mongoEquipament);
		} catch (ConstraintViolationException e) {
			Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
			assertEquals(1, violations.size());
			@SuppressWarnings("rawtypes")
			ConstraintViolation violation = violations.iterator().next();
			assertEquals("MongoEquipament's nom must not be null", violation.getMessageTemplate());
		}
	}

	/**
	 * Test 04 find by nom query.
	 */
	@Test
	public void test04FindByNomQuery() {
		String text = "findByNomQuery";
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom(text);
		mongoEquipament.setMunicipi(text);
		repository.save(mongoEquipament);

		List<MongoEquipament> mongoEquipamentList = repository.findByNomQuery(text);

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	/**
	 * Test 05 find by nom like.
	 */
	@Test
	public void test05FindByNomLike() {
		String like = "Like";
		String text = "findByNom" + like;
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom(text);
		mongoEquipament.setMunicipi(text);
		repository.save(mongoEquipament);

		List<MongoEquipament> mongoEquipamentList = repository.findByNomLike(like, null);

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	/**
	 * Test 06 find all paginated path.
	 */
	@Test
	public void test06FindAllPaginatedPath() {
		String text = "findPaginatedPath";
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom(text);
		mongoEquipament.setMunicipi(text);
		repository.save(mongoEquipament);

		Path<?>[] paths = { QMongoEquipament.mongoEquipament.id, QMongoEquipament.mongoEquipament.nom,
				QMongoEquipament.mongoEquipament.municipi };

		@SuppressWarnings("deprecation")
		List<MongoEquipament> mongoEquipamentList = repository.findAll(
				QMongoEquipament.mongoEquipament.nom.isNotNull().and(QMongoEquipament.mongoEquipament.nom.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotNull())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.nom.equalsIgnoreCase(text)),
				new PageRequest(0, 10), paths).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	/**
	 * Test 07 find paginated paths.
	 */
	@Test
	public void test07FindPaginatedPaths() {
		String text = "findPaginatedPaths";
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom(text + i);
			mongoEquipament.setMunicipi(text + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = MUNICIPI_DESC_SORT;
		String filter = null;
		String fields = MongoEquipament.ID + "," + MongoEquipament.NOM + "," + MongoEquipament.MUNICIPI;

		List<MongoEquipament> mongoEquipamentList = findPaginatedPaths(page, rpp, sort, filter, fields).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));
	}

	/**
	 * Test 08 find paginated path id.
	 */
	@Test
	public void test08FindPaginatedPathId() {
		String text = "findPaginatedPathId";
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom(text + i);
			mongoEquipament.setMunicipi(text + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = MUNICIPI_DESC_SORT;
		String filter = "*";

		List<MongoEquipament> mongoEquipamentList = findPaginatedPathId(page, rpp, sort, filter).getContent();
		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));

		@SuppressWarnings("deprecation")
		Page<MongoEquipament> mongoEquipamentPage = repository
				.findAll(new PageRequest(page - 1, rpp, getOrdenacio(sort)));
		assertThat(mongoEquipamentPage, notNullValue());

		List<MongoEquipament> mongoEquipamentSortList = repository.findAll(getOrdenacio(sort));
		assertThat(mongoEquipamentSortList, notNullValue());

		List<MongoEquipament> mongoEquipamentQSortList = repository.findAll(QSort
				.by(new OrderSpecifier<>(com.querydsl.core.types.Order.ASC, QMongoEquipament.mongoEquipament.nom)));
		assertThat(mongoEquipamentQSortList, notNullValue());

		QSort nullSort = null;
		List<MongoEquipament> mongoEquipamentNullSortList = repository.findAll(nullSort);
		assertThat(mongoEquipamentNullSortList, notNullValue());

	}

	/**
	 * Test 08 find null paginated.
	 */
	@Test(expected = IllegalArgumentException.class)
	public void test08FindNullPaginated() {
		PageRequest nullPage = null;
		repository.findAll(nullPage);
	}

	/**
	 * Test 09 find paginated factory expression.
	 */
	@Test
	public void test09FindPaginatedFactoryExpression() {
		String text = "findPaginatedProjeccio";
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom(text + i);
			mongoEquipament.setMunicipi(text + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = MUNICIPI_DESC_SORT;
		String filter = null;
		String fields = MongoEquipament.ID + "," + MongoEquipament.MUNICIPI;

		List<MongoEquipament> mongoEquipamentList = findPaginatedFactoryExpression(page, rpp, sort, filter, fields)
				.getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));
	}

	/**
	 * Test 10 find paginated paths filtered.
	 */
	@Test
	public void test10FindPaginatedPathsFiltered() {
		String text = "findPaginatedPaths";
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom(text + i);
			mongoEquipament.setMunicipi(text + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = MUNICIPI_DESC_SORT;
		String filter = MongoEquipament.MUNICIPI + ":" + text + "0";
		String fields = MongoEquipament.ID + "," + MongoEquipament.MUNICIPI;

		List<MongoEquipament> mongoEquipamentList = findPaginatedPaths(page, rpp, sort, filter, fields).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	/**
	 * Find paginated paths.
	 *
	 * @param page
	 *            page
	 * @param rpp
	 *            rpp
	 * @param sort
	 *            sort
	 * @param filter
	 *            filter
	 * @param fields
	 *            fields
	 * @return page
	 */
	@SuppressWarnings("deprecation")
	protected Page<MongoEquipament> findPaginatedPaths(final Integer page, final Integer rpp, final String sort,
			final String filter, final String fields) {

		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		List<Path<?>> listFields = getListFields(fields);

		return repository.findAll(predicate, pageable, listFields);
	}

	/**
	 * Obté list fields.
	 *
	 * @param fields
	 *            fields
	 * @return list fields
	 */
	private List<Path<?>> getListFields(String fields) {
		QMongoEquipament qmongoequipament = QMongoEquipament.mongoEquipament;

		List<Path<?>> listFields = new ArrayList<>();

		if (fields != null && !fields.equals("")) {
			String[] selectedFields = fields.split(",");
			for (int i = 0; i < selectedFields.length; i++) {
				switch (selectedFields[i]) {
				case MongoEquipament.ID:
					listFields.add(qmongoequipament.id);
					break;
				case MongoEquipament.NOM:
					listFields.add(qmongoequipament.nom);
					break;
				case MongoEquipament.MUNICIPI:
					listFields.add(qmongoequipament.municipi);
					break;

				default:
					break;
				}
			}
		}

		return listFields;
	}

	/**
	 * Obté predicate.
	 *
	 * @param filter
	 *            filter
	 * @return predicate
	 */
	private Predicate getPredicate(String filter) {
		GenericPredicateBuilder<MongoEquipament> builder = new GenericPredicateBuilder<>(MongoEquipament.class,
				"equipament");
		builder.populateSearchCriteria(filter);
		return builder.build();
	}

	/**
	 * Find paginated path id.
	 *
	 * @param page
	 *            page
	 * @param rpp
	 *            rpp
	 * @param sort
	 *            sort
	 * @param filter
	 *            filter
	 * @return page
	 */
	@SuppressWarnings("deprecation")
	protected Page<MongoEquipament> findPaginatedPathId(final Integer page, final Integer rpp, final String sort,
			final String filter) {
		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		return repository.findAll(predicate, pageable, QMongoEquipament.mongoEquipament.id);
	}

	/**
	 * Find paginated factory expression.
	 *
	 * @param page
	 *            page
	 * @param rpp
	 *            rpp
	 * @param sort
	 *            sort
	 * @param filter
	 *            filter
	 * @param fields
	 *            fields
	 * @return page
	 */
	@SuppressWarnings("deprecation")
	protected Page<MongoEquipament> findPaginatedFactoryExpression(final Integer page, final Integer rpp,
			final String sort, final String filter, final String fields) {
		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		List<Path<?>> listFields = getListFields(fields);

		Expression<Object>[] arrayExpression = listFields.toArray(new Expression[0]);

		return repository.findAll(predicate, pageable, Projections.bean(MongoEquipament.class, arrayExpression));
	}

	/**
	 * Obté ordenacio.
	 *
	 * @param sort
	 *            sort
	 * @return ordenacio
	 */
	@SuppressWarnings("deprecation")
	private Sort getOrdenacio(String sort) {
		List<Order> orders = new ArrayList<>();

		if (sort != null && !sort.equals("")) {
			String[] fields = sort.split(",");

			for (int i = 0; i < fields.length; i++) {
				char direction = fields[i].charAt(0);
				if (Character.toString(direction).equals("-")) {
					// Order descendente
					String value = fields[i].substring(1);
					orders.add(new Order(Direction.DESC, value));
				} else {
					// Orden ascendente
					orders.add(new Order(Direction.ASC, fields[i]));
				}
			}
		}
		return new Sort(orders);
	}
}
```

#### Test a Mongodb de l'aplicació

Per poder provar el codi a la bd MongoDB de l'aplicació només és necessari importar el fitxer de configuració de MongoDB en el nostre test:

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.config.AppConfig;
import cat.gencat.ctti.mongodb.config.EquipamentMongoConfig;
import cat.gencat.ctti.mongodb.model.repository.EquipamentMongoRepository;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentMongoConfig.class })
public class EquipamentMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest{
	
}
```

#### Test a Embeded Mongodb

Per a poder provar el codi en els tests es pot utilitzar la utilitat Embeded Mongo. Es necessari extendre del fitxer de configuració de Mongo de l'aplicació i sobreesciure el mètode: 

```java
public MongoClient mongoClient()
```

Un exemple de configuració per a Embeded MongoDB seria:

```java
import java.io.IOException;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import cz.jirutka.spring.embedmongo.EmbeddedMongoFactoryBean;

/**
 * Class EquipamentEmbeddedMongoConfig.
 *
 * @author cscanigo
 */
public class EquipamentEmbeddedMongoConfig extends EquipamentMongoConfig {

	@Override
	public MongoClient mongoClient() {
		if (mongo == null) {
			EmbeddedMongoFactoryBean embeddedMongoFactoryBean = new EmbeddedMongoFactoryBean();
			try {
				mongo = embeddedMongoFactoryBean.getObject();
			} catch (IOException e) {
				throw MongoException.fromThrowable(e);
			}
		}
		return mongo;
	}
}
```

Per utilitzar la configuració amb Embeded MongoBD en un test, si no hem importat el EquipamentMongoConfig en el AppConfig:

```java
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import cat.gencat.provamongo.config.AppConfig;
import cat.gencat.provamongo.mongodb.config.EquipamentEmbeddedMongoConfig;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 *
 * @author cscanigo
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedMongoConfig.class })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EquipamentEmbeddedMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest {

}
```

O crear un nou AppConfig important el EquipamentEmbeddedMongoConfig i carregar-lo al test:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import cat.gencat.ctti.mongodb.config.EquipamentEmbeddedMongoConfig;

@Configuration
@PropertySource("classpath:/config/props/boot.properties")
@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
@EnableTransactionManagement
@Import(EquipamentEmbeddedMongoConfig.class)
public class EmbeddedMongoAppConfig {

}
```

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.config.EmbeddedMongoAppConfig;
import cat.gencat.ctti.mongodb.model.repository.EquipamentMongoRepository;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { EmbeddedMongoAppConfig.class})
public class EquipamentEmbeddedMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest{
	
}
```

Per més informació sobre [Embeded MongoDB] (https://flapdoodle-oss.github.io/de.flapdoodle.embed.mongo/)


### Configuració reactiu

Definirem els següents tests:

```java
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import cat.gencat.provamongo.mongodb.model.MongoEquipament;
import cat.gencat.provamongo.mongodb.model.repository.EquipamentReactiveMongoRepository;


/**
 * Class EquipamentReactiveMongoRepositoryCoreTest.
 *
 * @author cscanigo
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public abstract class EquipamentReactiveMongoRepositoryCoreTest {

    @Inject
    EquipamentReactiveMongoRepository repository;

    @Before
    public void setUp() {
        assertNotNull(repository);
        repository.deleteAll();
    }

    @Test
    public void test01CRUDOperations() {

        // Test if table is empty
        Flux<MongoEquipament> mongoEquipamentInitialContent = repository.findAll();
        List<MongoEquipament> mongoEquipamentList = new ArrayList<MongoEquipament>();
        mongoEquipamentInitialContent.subscribe(mongoEquipamentList::add);
        assertTrue(mongoEquipamentList.isEmpty());

        StepVerifier
        .create(mongoEquipamentInitialContent)
        .expectNextCount(0)
        .expectComplete()
        .verify();
        
        // Test save
        MongoEquipament mongoEquipament = new MongoEquipament();
        mongoEquipament.setNom("CAP La Pau");
        mongoEquipament.setMunicipi("Barcelona");
        Mono<MongoEquipament> mongoEquipamentMono = repository.save(mongoEquipament);
        mongoEquipament = mongoEquipamentMono.block(Duration.ofMinutes(1L));
        assertNotNull(mongoEquipament.getId());

        // Test insert and recover
        MongoEquipament mongoEquipament2 = new MongoEquipament();
        mongoEquipament2.setNom("CAP Santa Coloma");
        Mono<MongoEquipament> mongoEquipament2Mono = repository.save(mongoEquipament2);
        mongoEquipament2 = mongoEquipament2Mono.block(Duration.ofMinutes(1L));
        assertNotNull(mongoEquipament2.getId());
        
        Flux<MongoEquipament> mongoEquipamentFinalContent = repository.findAll();

        StepVerifier
        .create(mongoEquipamentFinalContent)
        .expectNextCount(2)
        .expectComplete()
        .verify();
        
        Mono<MongoEquipament> mongoEquipament3Mono = repository.findById(mongoEquipament2.getId());
        assertThat(mongoEquipament3Mono.block().getMunicipi(), 
                equalTo(mongoEquipament2.getMunicipi()));

        // Test delete all
        repository.deleteAll();
        
        Mono<Boolean> existsById = repository.existsById(mongoEquipament2.getId());
        
        StepVerifier
        .create(existsById)
        .expectNext(true)
        .expectComplete()
        .verify();
    }
}
```

#### Test a Mongodb de l'aplicació

Per poder provar el codi a la bd MongoDB de l'aplicació només és necessari importar el fitxer de configuració de MongoDB en el nostre test:

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.AppConfig;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.EquipamentReactiveMongoConfig;

/**
 * Class EquipamentReactiveMongoRepositoryTest.
 *
 * @author cscanigo
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentReactiveMongoConfig.class })
public class EquipamentReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {

}
```

#### Test a Embeded Mongodb

Per a poder provar el codi en els tests es pot utilitzar la utilitat Embeded Mongo.. Es necessari extendre del fitxer de configuració de Mongo de l'aplicació i sobreesciure el mètode 

```java
public MongoClient reactiveMongoClient()
```

Un exemple de configuració per a Embeded MongoDB seria:

```java

```

Per utilitzar la configuració amb Embeded MongoBD en un test, si no hem importat el EquipamentReactiveMongoConfig en el AppConfig:

```java

```

O crear un nou AppConfig important el EquipamentEmbeddedReactiveMongoConfig i carregar-lo al test:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import cat.gencat.ctti.mongodb.config.EquipamentEmbeddedReactiveMongoConfig;

@Configuration
@PropertySource("classpath:/config/props/boot.properties")
@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
@EnableTransactionManagement
@Import(EquipamentEmbeddedReactiveMongoConfig.class)
public class EmbeddedReactiveMongoAppConfig {

}
```

```java
import java.io.IOException;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import de.flapdoodle.embed.mongo.Command;
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.IMongodConfig;
import de.flapdoodle.embed.mongo.config.MongodConfigBuilder;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.config.RuntimeConfigBuilder;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.config.IRuntimeConfig;
import de.flapdoodle.embed.process.runtime.Network;
import cat.gencat.ctti.mongodb.model.repository.EquipamentMongoRepository;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { EmbeddedReactiveMongoAppConfig.class})
public class EquipamentEmbeddedReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {

}
```


## Logs
Si és necessari el pintat de les consultes realitzades pel mòdul a la Base de Dades MongoDB, es pot afegir un "logger" per la categoria "org.springframework.data.mongodb.core.MongoTemplate" al fitxer "log4j" de l'aplicació
Així per exemple si volem pintar les querys en el fitxer de logs, podriem tenir al nostre fitxer "log4j":

```xml
		<Logger name="org.springframework.data.mongodb.core.MongoTemplate" level="debug" additivity="false">
			<AppenderRef ref="DAILY_LOG" />
		</Logger>
```
