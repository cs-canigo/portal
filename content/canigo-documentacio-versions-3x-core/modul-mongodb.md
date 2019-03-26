+++
date        = "2019-03-21T12:04:16+01:00"
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

```
    <canigo.persistence.mongodb.version>[2.0.0,2.1.0)</canigo.persistence.mongodb.version>

    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.persistence.mongodb</artifactId>
      <version>${canigo.persistence.mongodb.version}</version>
    </dependency>
```

Al pom.xml també s'ha d'afegir el plugin que genera les classes per als filtres de [QueryDSL](http://www.querydsl.com/) i
el que executa el test unitari del mòdul de persistència:
```
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
Si l'aplicació està configurada amb Spring Boot es necessari afegir la dependencia:
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

Si es vol utilitzar Embeded Mongo per executar els tests es necessari afegir la dependencia:
```
    <dependency>
        <groupId>de.flapdoodle.embed</groupId>
        <artifactId>de.flapdoodle.embed.mongo</artifactId>
    </dependency>
    <dependency>
        <groupId>cz.jirutka.spring</groupId>
        <artifactId>embedmongo-spring</artifactId>
        <version>RELEASE</version>
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
```
public MongoCoreConfig(MongoClientOptions options). 
```
Per més informació sobre les configuracions es pot consultar: http://api.mongodb.com/java/current/com/mongodb/MongoClientOptions.html

En aquest fitxer també s'hi pot afegir els diferents listeners de les diferents entitats de MongoDB

Un exemple de fitxer de configuració seria:
```
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

import org.springframework.context.annotation.Configuration;

import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig;

@Configuration
public class ReactiveMongoConfig extends ReactiveMongoCoreConfig {


}
```

## Entitats
Per definir les entits de MongoDB es necessari utilitzar les annotations de JSR 380, Spring Data i Spring Data MongoDB. Per més informació:
https://docs.oracle.com/javaee/7/api/javax/validation/package-summary.html
https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/package-summary.html
https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/

Un exemple de entitat de MongoDB seria:
```
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

## Ús dels repositoris

Per a utilitzar els repositoris s'ha de generar un objecte MongoRepository per a l'entitat desitjada(T), que ha d'extendre de **cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository<T, ID extends Serializable>**

Un exemple de repository seria:
```
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

```
	Page<T> findAll(Predicate predicate, Pageable pageable, Path<?>... paths);

	Page<T> findAll(Predicate predicate, Pageable pageable, List<Path<?>> paths);
	
	Page<T> findAll(Predicate predicate, Pageable pageable, FactoryExpression<T> factoryExpression);
```

Aquests mètodes espera un objecte org.springframework.data.domain.Pageable que conté el número de pàgina (la primera pàgina és la 0), el nombre d'elements per pàgina, la direcció d'ordenació, el camp d'ordenació. Un objecte Predicate amb la query que es vol realitzar i un objecte Path o FactoryExpression on s'indica la informació que es vol retornar

Un exemple d'utilització seria:
```
List<MongoEquipament> mongoEquipamentList = repository.findAll(QMongoEquipament.mongoEquipament.nom.isNotNull().and(QMongoEquipament.mongoEquipament.nom.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotNull())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.nom.equalsIgnoreCase("findPaginatedPath")),
				new PageRequest(0, 10), paths).getContent();
```

Es pot utitlizar les utilitzats de **cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder** per generar el Predicate, per exemple:
```
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

**MongoListeners**

Si es necessari, es pot crear un listener a una entitat de Mongo

Un exemple de listener seria:
```
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

**Embeded Mongo**

Per a poder provar el codi generat per MongoDB en un test es pot utilitzar la utilitat Embeded Mongo. Es necessari extendre del fitxer de configuració de Mongo de l'aplciació i sobreesciure el mètode 
```
public Mongo mongo() throws Exception {
```

Un exemple de configuració per a Embeded MongoDB seria:
```
import com.mongodb.Mongo;

import cz.jirutka.spring.embedmongo.EmbeddedMongoFactoryBean;

public class EquipamentEmbeddedMongoConfig extends EquipamentMongoConfig {

	@Override
	public Mongo mongo() throws Exception {
		if (mongo == null) {
			EmbeddedMongoFactoryBean embeddedMongoFactoryBean = new EmbeddedMongoFactoryBean();
			// embeddedMongoFactoryBean.setBindIp(host);
			// embeddedMongoFactoryBean.setPort(port);
			// embeddedMongoFactoryBean.setVersion("3.6");
			mongo = embeddedMongoFactoryBean.getObject();
		}
		return mongo;
	}
}
```

**Test per MongoDB**
Per poder provar el codi per MongoDB només es necessari importar el fitxer de configuració de MongoDB en el nostre test

Així, si tenim el test següent:
```
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;

import cat.gencat.ctti.mongodb.model.MongoEquipament;
import cat.gencat.ctti.mongodb.model.QMongoEquipament;
import cat.gencat.ctti.mongodb.model.repository.EquipamentMongoRepository;
import cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 */
public abstract class EquipamentMongoRepositoryCoreTest {
	
	@Autowired
	EquipamentMongoRepository repository;

	@Before
	public void setUp() {
		Assert.assertNotNull(repository);
		repository.deleteAll();
	}

	@Test
	public void test1CRUDOperations() {

		// Test if table is empty
		Assert.assertTrue(repository.findAll().isEmpty());

		// Test save
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom("CAP La Pau");
		mongoEquipament.setMunicipi("Barcelona");
		repository.save(mongoEquipament);

		// Test insert and recover
		MongoEquipament mongoEquipament2 = new MongoEquipament();
		mongoEquipament2.setNom("CAP Santa Coloma");
		repository.save(mongoEquipament2);
		MongoEquipament equipament3 = repository.findOne(mongoEquipament2.getId());
		Assert.assertEquals(equipament3.getId(), mongoEquipament2.getId());
		Assert.assertEquals(equipament3.getNom(), "CAP Santa Coloma");

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());

	}

	@Test
	public void test2MultipleCRUD() {

		List<MongoEquipament> list = new ArrayList<MongoEquipament>();

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
		repository.save(list);
		Assert.assertEquals(list.size(), repository.findAll().size());

		// Test update
		mongoEquipament1.setNom("equipament1 updated!");
		mongoEquipament2.setNom("equipament2 updated!");
		mongoEquipament3.setNom("equipament3 updated!");
		repository.save(list);
		Assert.assertEquals(list.size(), repository.findAll().size());

		List<MongoEquipament> elsMeusEquipaments = repository.findAll();
		Assert.assertEquals(mongoEquipament1.getId(), elsMeusEquipaments.get(0).getId());
		Assert.assertEquals(mongoEquipament1.getNom(), elsMeusEquipaments.get(0).getNom());
		Assert.assertEquals(mongoEquipament2.getId(), elsMeusEquipaments.get(1).getId());
		Assert.assertEquals(mongoEquipament2.getNom(), elsMeusEquipaments.get(1).getNom());
		Assert.assertEquals(mongoEquipament3.getId(), elsMeusEquipaments.get(2).getId());
		Assert.assertEquals(mongoEquipament3.getNom(), elsMeusEquipaments.get(2).getNom());

		// Test no exception launched
		repository.save(new ArrayList<MongoEquipament>());
	}

	@Test
	public void test3NomNotNull() {
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom(null);
		try {
			repository.save(mongoEquipament);
		} catch (ConstraintViolationException e) {
			Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
			Assert.assertEquals(1, violations.size());
			@SuppressWarnings("rawtypes")
			ConstraintViolation violation = (ConstraintViolation) violations.iterator().next();
			Assert.assertEquals("MongoEquipament's nom must not be null", violation.getMessageTemplate());
		}
	}

	@Test
	public void test4FindByNomQuery() {
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom("findByNomQuery");
		mongoEquipament.setMunicipi("findByNomQuery");
		repository.save(mongoEquipament);

		List<MongoEquipament> mongoEquipamentList = repository.findByNomQuery("findByNomQuery");

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	@Test
	public void test5FindByNomLike() {
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom("findByNomLike");
		mongoEquipament.setMunicipi("findByNomLike");
		repository.save(mongoEquipament);

		List<MongoEquipament> mongoEquipamentList = repository.findByNomLike("Like", null);

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	@Test
	public void test6FindAllPaginatedPath() {
		MongoEquipament mongoEquipament = new MongoEquipament();
		mongoEquipament.setNom("findPaginatedPath");
		mongoEquipament.setMunicipi("findPaginatedPath");
		repository.save(mongoEquipament);

		Path<?>[] paths = { QMongoEquipament.mongoEquipament.id, QMongoEquipament.mongoEquipament.nom,
				QMongoEquipament.mongoEquipament.municipi };

		List<MongoEquipament> mongoEquipamentList = repository.findAll(QMongoEquipament.mongoEquipament.nom.isNotNull().and(QMongoEquipament.mongoEquipament.nom.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotNull())
						.and(QMongoEquipament.mongoEquipament.municipi.isNotEmpty())
						.and(QMongoEquipament.mongoEquipament.nom.equalsIgnoreCase("findPaginatedPath")),
				new PageRequest(0, 10), paths).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	@Test
	public void test7FindPaginatedPaths() {
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom("findPaginatedPaths" + i);
			mongoEquipament.setMunicipi("findPaginatedPaths" + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = "-municipi";
		String filter = null;
		String fields = "id,municipi";

		List<MongoEquipament> mongoEquipamentList = findPaginatedPaths(page, rpp, sort, filter, fields).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));
	}

	@Test
	public void test8FindPaginatedPathId() {
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom("findPaginatedPathId" + i);
			mongoEquipament.setMunicipi("findPaginatedPathId" + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = "-municipi";
		String filter = null;

		List<MongoEquipament> mongoEquipamentList = findPaginatedPathId(page, rpp, sort, filter).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));
	}

	@Test
	public void test9FindPaginatedFactoryExpression() {
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom("findPaginatedProjeccio" + i);
			mongoEquipament.setMunicipi("findPaginatedProjeccio" + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = "-municipi";
		String filter = null;
		String fields = "id,municipi";

		List<MongoEquipament> mongoEquipamentList = findPaginatedFactoryExpression(page, rpp, sort, filter, fields)
				.getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(rpp));
	}

	@Test
	public void test10FindPaginatedPathsFiltered() {
		for (int i = 0; i < 20; i++) {
			MongoEquipament mongoEquipament = new MongoEquipament();
			mongoEquipament.setNom("findPaginatedPaths" + i);
			mongoEquipament.setMunicipi("findPaginatedPaths" + i);
			repository.save(mongoEquipament);
		}

		Integer page = 1;
		Integer rpp = 10;
		String sort = "-municipi";
		String filter = "municipi:findPaginatedPaths0";
		String fields = "id,municipi";

		List<MongoEquipament> mongoEquipamentList = findPaginatedPaths(page, rpp, sort, filter, fields).getContent();

		assertThat(mongoEquipamentList, notNullValue());
		assertThat(mongoEquipamentList, hasSize(1));
	}

	protected Page<MongoEquipament> findPaginatedPaths(final Integer page, final Integer rpp, final String sort,
			final String filter, final String fields) {

		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		List<Path<?>> listFields = getListFields(fields);

		return repository.findAll(predicate, pageable, listFields);
	}

	private List<Path<?>> getListFields(String fields) {
		QMongoEquipament qmongoequipament = QMongoEquipament.mongoEquipament;

		List<Path<?>> listFields = new ArrayList<Path<?>>();

		if (fields != null && fields != "") {
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

	private Predicate getPredicate(String filter) {
		GenericPredicateBuilder<MongoEquipament> builder = new GenericPredicateBuilder<MongoEquipament>(
				MongoEquipament.class, "equipament");
		builder.populateSearchCriteria(filter);
		return builder.build();
	}

	protected Page<MongoEquipament> findPaginatedPathId(final Integer page, final Integer rpp, final String sort,
			final String filter) {

		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		return repository.findAll(predicate, pageable, QMongoEquipament.mongoEquipament.id);
	}

	protected Page<MongoEquipament> findPaginatedFactoryExpression(final Integer page, final Integer rpp,
			final String sort, final String filter, final String fields) {

		Predicate predicate = getPredicate(filter);

		Pageable pageable = new PageRequest(page - 1, rpp, getOrdenacio(sort));

		List<Path<?>> listFields = getListFields(fields);

		Expression[] arrayExpression = listFields.toArray(new Expression[0]);

		return repository.findAll(predicate, pageable, Projections.bean(MongoEquipament.class, arrayExpression));
	}

	private Sort getOrdenacio(String sort) {
		Sort resultat = null;

		List<Order> orders = new ArrayList<Order>();

		if (sort != null && sort != "") {
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

		resultat = new Sort(orders);

		return resultat;
	}

}
```
Per utilitzar la configuració definida al fitxer mongodb.properties podriem utilitzar directament la configuració de MongoDB de l'aplicació:
```
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
Per utilitzar la configuració amb Embeded MongoBD, si no hem importat el EquipamentMongoConfig en el AppConfig:
```
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.config.AppConfig;
import cat.gencat.ctti.mongodb.config.EquipamentEmbeddedMongoConfig;
import cat.gencat.ctti.mongodb.model.repository.EquipamentMongoRepository;

/**
 * Test cases for the {@link EquipamentMongoRepository}.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedMongoConfig.class })
public class EquipamentEmbeddedMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest{
	
}
```

O crear un nou AppConfig important el EquipamentEmbeddedMongoConfig i carregar-lo al test:
```
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

```
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

### Logs
Si es necessari el pintat de les consultes realitzades pel mòdul a la Base de Dades MongoDB, es pot afegir un "logger" per la categoria "org.springframework.data.mongodb.core.MongoTemplate" al fitxer "log4j" de l'aplicació
Així per exemple si volem pintar les querys en el fitxer de logs, podriem tenir al nostre fitxer "log4j":
```
		<Logger name="org.springframework.data.mongodb.core.MongoTemplate" level="debug" additivity="false">
			<AppenderRef ref="DAILY_LOG" />
		</Logger>
```
