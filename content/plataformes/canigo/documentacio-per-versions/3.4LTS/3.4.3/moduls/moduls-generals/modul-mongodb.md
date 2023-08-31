+++
date        = "2020-03-26"
title       = "Mòdul MongoDB"
description = "Mòdul de persistència de Base de Dades per MongoDB."
sections    = "Canigó. Documentació Versió 3.4"
weight      = 3
+++

## Propòsit

El mòdul de MongoDB té com a propòsit general gestionar l’accés i l’execució d'operacions a una base de dades MongoDB.
Aquest mòdul utilitza [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/)
i [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/).

A partir de la versió 3.4 de Canigó, es proporcionen les funcionalitats de reactiu per MongoDB.

## Instal·lació

Per tal d'instal·lar el mòdul de MongoDB es pot optar per incloure’l automàticament a través de l'eina de suport al desenvolupament o bé afegir
manualment la següent dependència en el fitxer `pom.xml` de l’aplicació:

```xml
    <canigo.persistence.mongodb.version>[2.0.0,2.4.0)</canigo.persistence.mongodb.version>
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.persistence.mongodb</artifactId>
      <version>${canigo.persistence.mongodb.version}</version>
      <exclusions>
        <exclusion>
          <artifactId>bson</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
        <exclusion>
          <artifactId>mongodb-driver-core</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
        <exclusion>
          <artifactId>mongodb-driver-async</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
```

<br/>
Caldrà també afegir el _plugin_ que genera les classes per als filtres de [QueryDSL](http://www.querydsl.com/) i
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

<br/>
Si l'aplicació està configurada amb **Spring Boot**, caldrà afegir la següent dependència:

```xml
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-mongodb</artifactId>
      <exclusions>
        <exclusion>
          <artifactId>org.springframework.boot</artifactId>
          <groupId>spring-boot-starter-logging</groupId>
        </exclusion>
        <exclusion>
          <artifactId>mongodb-driver</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
        <exclusion>
          <artifactId>mongo-java-driver</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
```

<br/>
Si es vol utilitzar _Embeded Mongo_ per a executar els tests, caldrà afegir la següent dependència:

```xml
    <mongodb.flapdoodle.embed.mongo.version>2.2.0</mongodb.flapdoodle.embed.mongo.version>
    <mongodb.jirutka.spring.version>1.3.1</mongodb.jirutka.spring.version>
    <dependency>
      <groupId>de.flapdoodle.embed</groupId>
      <artifactId>de.flapdoodle.embed.mongo</artifactId>
      <version>${mongodb.flapdoodle.embed.mongo.version}</version>
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
      <version>${mongodb.jirutka.spring.version}</version>
      <exclusions>
        <exclusion>
          <artifactId>mongo-java-driver</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
```

<br/>
Per a utilitzar les funcionalitats de Mongodb 4.2, serà necessari utilitzar la versió 3.12.3 o superior de *mongodb-driver-core*
(https://docs.mongodb.com/drivers/driver-compatibility-reference#java-driver-compatibility) i caldrà afegir la següent dependència:

```xml
    <mongodb.driver.core.version>3.12.3</mongodb.driver.core.version>
    <mongodb.bson.version>3.12.3</mongodb.bson.version>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-core</artifactId>
      <version>${mongodb.driver.core.version}</version>
      <exclusions>
        <exclusion>
          <artifactId>bson</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>bson</artifactId>
      <version>${mongodb.bson.version}</version>
    </dependency>
```

<br/>
Finalment, si es vol utilitzar les funcionalitats reactives, caldrà afegir la següent dependència:

```xml
    <mongodb.driver.async.version>3.12.3</mongodb.driver.async.version>
    <mongodb.reactor.core.version>3.3.4.RELEASE</mongodb.reactor.core.version>
    <mongodb.reactor.test.version>3.3.3.RELEASE</mongodb.reactor.test.version>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-async</artifactId>
      <version>${mongodb.driver.async.version}</version>
      <exclusions>
        <exclusion>
          <artifactId>bson</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
        <exclusion>
          <artifactId>mongodb-driver-core</artifactId>
          <groupId>org.mongodb</groupId>
        </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>io.projectreactor</groupId>
      <artifactId>reactor-core</artifactId>
      <version>${mongodb.reactor.core.version}</version>
    </dependency>
    <dependency>
      <groupId>io.projectreactor</groupId>
      <artifactId>reactor-test</artifactId>
      <version>${mongodb.reactor.test.version}</version>
    </dependency>
```

## Configuració

La configuració es realitza automàticament a l'aplicació a partir de l'eina de suport al desenvolupament.
Només en cas de no utilitzar-la, caldrà realitzar manualment configuració que es descriu a continuació.

### No reactiu

Fitxer: **mongodb.properties**
<br/>
Ubicació proposada: `<PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties`.

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per més informació https://mongodb.github.io/mongo-java-driver/3.12/javadoc/com/mongodb/MongoClientURI.html
*.mongodb.host | No | Requerit si no està definida la propietat mongodb.uri. Host de la connexió amb la BD MongoDB
*.mongodb.port | No | Requerit si no està definida la propietat mongodb.uri. Port de la connexió amb la BD MongoDB
*.mongodb.database | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD de la connexió amb la BD MongoDB
*.mongodb.authenticationDatabase | No | Requerit si no està definida la propietat mongodb.uri. Nom de la BD MongoDB si esta autenticada
*.mongodb.username | No | Requerit si no està definida la propietat mongodb.uri. Usuari de la connexió amb la BD MongoDB
*.mongodb.password | No | Requerit si no està definida la propietat mongodb.uri. Secret de la connexió amb la BD MongoDB

<br/>
Fitxer: **MongoConfig.java**
<br/>
Ubicació recomanada: `<PROJECT_ROOT>/src/main/java/ *package de l’aplicació* /mongodb/config`.

Cal estendre de la configuració de **cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig** i
es pot sobreescriure la configuració de la connexió per defecte mitjançant el constructor. En aquest fitxer,
podeu afegir també els _listeners_ de les diferents entitats de MongoDB.

Un exemple de configuració seria el següent:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.mongodb.MongoClientOptions;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoEquipamentListener;

/**
 * Class EquipamentMongoConfig.
 *
 * @author cscanigo
 */
@Configuration
public class EquipamentMongoConfig extends MongoCoreConfig {
   /** mongo client options. */
   protected static MongoClientOptions mongoClientOptions;
   /**
    * Inicialitza equipament mongo config.
    */
   public EquipamentMongoConfig() {
      super(mongoOptions());
   }
   /**
    * Mongo equipament listener.
    * @return mongo equipament listener
    */
   @Bean
   public MongoEquipamentListener mongoEquipamentListener() {
      return new MongoEquipamentListener();
   }
   /**
    * Mongo options.
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

On s'està redefinint el socket timeout de la connexió a 2000 ms i s'està registrant el listener _cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener_.

Per a més informació sobre les configuracions podeu consultar: http://api.mongodb.com/java/current/com/mongodb/MongoClientOptions.html.

### Reactiu

Fitxer: **mongodb.properties**
<br/>
Ubicació proposada: `<PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties`.

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per més informació https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options

<br/>
Fitxer: **ReactiveMongoConfig.java**
<br/>
Ubicació recomanada: `<PROJECT_ROOT>/src/main/java/ *package de l’aplicació* /mongodb/config`.

Cal estendre de la configuració de **cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig** i
es pot sobreescriure la configuració de la connexió per defecte mitjançant el constructor. En aquest fitxer,
podeu afegir també els _listeners_ de les diferents entitats de MongoDB.

Un exemple de configuració seria el següent:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.mongodb.MongoClientOptions;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoEquipamentListener;

/**
 * Class EquipamentReactiveMongoConfig.
 * @author cscanigo
 */
@Configuration
public class EquipamentReactiveMongoConfig extends ReactiveMongoCoreConfig {
    /** mongo client options. */
    protected static MongoClientOptions mongoClientOptions;
    /**
     * Mongo equipament listener.
     * @return mongo equipament listener
     */
    @Bean
    public MongoEquipamentListener mongoEquipamentListener() {
        return new MongoEquipamentListener();
    }
    /**
     * Mongo options.
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

On s'està redefinint el socket timeout de la connexió a 2000 ms i s'està registrant el listener _cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener_.

## Entitats

Per tal de definir les entitats de MongoDB serà necessari utilitzar les _annotations_ de _JSR 380_, _Spring Data_ i _Spring Data MongoDB_. Per a més informació, podeu consultar:

* Package javax.validation: https://docs.oracle.com/javaee/7/api/javax/validation/package-summary.html
* Package org.springframework.data.annotation: https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/package-summary.html
* Spring Data MongoDB: https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/

Un exemple d'entitat seria la següent:

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

Si es considera necessari, es pot crear un _listener_ a una entitat de Mongo. Un exemple de _listener_ seria el següent:

```java
import java.util.Random;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.model.MongoEquipament;

/**
 * Equivalent of a domain method annotated by <code>PrePersist</code>.
 * @see MongoEquipamentEvent
 */
public class MongoEquipamentListener extends AbstractMongoEventListener<MongoEquipament> {
   /**
    * On before convert.
    * @param event
    */
   @Override
   public void onBeforeConvert(BeforeConvertEvent<MongoEquipament> event) {
      MongoEquipament mongoEquipament = event.getSource();
      if (mongoEquipament.getId() == null) {
         mongoEquipament.setId(new Random().nextLong());
      }
   }
}
```

On s'està aplicant una assignació d'identificadors únics a l’entitat _MongoEquipament_.

## Repositoris

### No reactiu

Per a utilitzar els repositoris s'ha de generar un objecte _MongoRepository_ per a l'entitat desitjada(T), que ha d'estendre de
**cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository<T, ID extends Serializable>**.

Un exemple de repositori seria el següent:

```java
/**
 * Interface EquipamentMongoRepository.
 * @author cscanigo
 */
public interface EquipamentMongoRepository extends MongoGenericRepository<MongoEquipament, Long> {
    /**
     * Find by nom query.
     * @param nom nom
     * @return list
     */
    @Query("{ nom: ?0 }")
    List<MongoEquipament> findByNomQuery(String nom);
    /**
     * Find by nom like.
     * @param nom  nom
     * @param sort sort
     * @return list
     */
    List<MongoEquipament> findByNomLike(String nom, Sort sort);
}
```

A un repositori es poden crear mètodes per a cada query que es vulgui definir. La construcció utilitza els prefixos
_find...By, read...By, query...By, count...By_ i _get...By_ i els mètodes poden incorporar la paraula _Distinct_, concatenar propietats
amb _And_ i _Or_ o descriptors com _OrderBy_ o _IgnoreCase_.

Per a més informació, podeu consultar la documentació oficial de [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/).

<br/>
#### Utilització de QueryDSL

Una de les funcionalitats proposades és la d'utilitzar _QueryDSL_ per a realitzar cerques segons filtres dinàmics, amb paginació i/o ordenació.

<div class="message information">
QueryDSL està enfocat a bases de dades relacionals. A partir de la versió 3.4 de Canigó s'han deprecat els mètodes de
"cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository" i es recomana no utilitzar-los.
</div>

_MongoGenericRepository_ proporciona els següents mètodes:

```java
   Page<T> findAll(Predicate predicate, Pageable pageable, Path<?>... paths);
   Page<T> findAll(Predicate predicate, Pageable pageable, List<Path<?>> paths);
   Page<T> findAll(Predicate predicate, Pageable pageable, FactoryExpression<T> factoryExpression);
```

Aquests mètodes esperen un objecte _Predicate_ amb la _query_ que es vol realitzar, un objecte _org.springframework.data.domain.Pageable_ que conté
el número de pàgina (la primera és la 0), el nombre d'elements per pàgina, la direcció d'ordenació i el camp d'ordenació;
i un objecte _Path_ o _FactoryExpression_ on s'indica la informació de retorn.

Un exemple d'ús seria el següent:

```java
List<MongoEquipament> mongoEquipamentList = repository.findAll(QMongoEquipament.mongoEquipament.nom.isNotNull().and(QMongoEquipament.mongoEquipament.nom.isNotEmpty())
                  .and(QMongoEquipament.mongoEquipament.municipi.isNotNull())
                  .and(QMongoEquipament.mongoEquipament.municipi.isNotEmpty())
                  .and(QMongoEquipament.mongoEquipament.nom.equalsIgnoreCase("findPaginatedPath")),
            new PageRequest(0, 10), paths).getContent();
```

Es poden utilitzar les utilitzats de **cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder** per a generar el _Predicate_ com per exemple:

```java
    GenericPredicateBuilder<MongoEquipament> builder = new GenericPredicateBuilder<MongoEquipament>(
            MongoEquipament.class, "equipament");
   builder.populateSearchCriteria(filter);
   Predicate = builder.build();
```

_String filter_ ha de seguir el patró: **field1Operador1Valor1,field2Operador2Valor2,fieldNOperadorNValorN** on:

- _Field_ és el nom d'una propietat de l'entitat (per exemple “id”)
- _Operador_ és un dels tipus d'operador suportats

Operador | Descripció
--------- | --------
> | major que
>: | major o igual que
< | menor que
<: | menor o igual que
<> | diferent de
: | igual que

- _Valor_ és el valor amb el qual es vol comparar

Per exemple, per a cercar l'entitat que tingui _id_ major que 15 i amb nom igual a “Prova”, el filtre hauria de ser **id>15,nom:Prova**.

Per a més informació podeu consultar la documentació oficial de [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/).

### Reactiu

Per a utilitzar els repositoris s'ha de generar un objecte _ReactiveMongoRepository_ per a l'entitat desitjada(T), que ha d'estendre de
**org.springframework.data.mongodb.repository.ReactiveMongoRepository<T, ID>**.

Un exemple de repositori seria el següent:

```java
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.model.MongoEquipament;

/**
 * Interface EquipamentReactiveMongoRepository.
 * @author cscanigo
 */
@Repository
public interface EquipamentReactiveMongoRepository extends ReactiveMongoRepository<MongoEquipament, Long> {
    /**
     * Find by nom query.
     * @param nom nom
     * @return list
     */
    @Query("{ nom: ?0 }")
    List<MongoEquipament> findByNomQuery(String nom);
    /**
     * Find by nom like.
     * @param nom  nom
     * @param sort sort
     * @return list
     */
    List<MongoEquipament> findByNomLike(String nom, Sort sort);
}
```

A un repositori es poden crear mètodes per a cada query que es vulgui definir. La construcció utilitza els prefixos
_find...By, read...By, query...By, count...By_ i _get...By_ i els mètodes poden incorporar la paraula _Distinct_, concatenar propietats
amb _And_ i _Or_ o descriptors com _OrderBy_ o _IgnoreCase_.

Per a més informació, podeu consultar la documentació oficial de [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/).

## Test

### No reactiu

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

<br/>
#### Test a Mongodb de l'aplicació

Per a poder verificar el codi a la base de dades MongoDB de l'aplicació només serà necessari importar el fitxer de
configuració de MongoDB en el nostre test:

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

Per a poder verificar el codi en els tests es pot utilitzar la utilitat _Embeded Mongo_. Serà necessari estendre
del fitxer de configuració de Mongo de l'aplicació i sobreescriure el mètode:

```java
public MongoClient mongoClient()
```

Un exemple de configuració per a _Embeded MongoDB_ seria el següent:

```java
/**
 * Class EquipamentEmbeddedMongoConfig.
 * @author cscanigo
 */
public class EquipamentEmbeddedMongoConfig extends EquipamentMongoConfig {
   /**
    * Mongo client.
    * @return mongo client
    */
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

Per a utilitzar la configuració amb _Embeded MongoBD_ en un test si no hem importat el _EquipamentMongoConfig_ en el _AppConfig_:

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

O bé es pot optar per crear un nou _AppConfig_ important el _EquipamentEmbeddedMongoConfig_ i carregar-lo al test:

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

Per a més informació, podeu consultar la documentació oficial de [Embeded MongoDB](https://flapdoodle-oss.github.io/de.flapdoodle.embed.mongo/)

### Reactiu

Definirem els següents tests:

```java
/**
 * Class EquipamentReactiveMongoRepositoryCoreTest.
 * @author cscanigo
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public abstract class EquipamentReactiveMongoRepositoryCoreTest {
    /** repository. */
    @Inject
    EquipamentReactiveMongoRepository repository;
    /**
     * Estableix up.
     */
    @Before
    public void setUp() {
        assertNotNull(repository);
        repository.deleteAll();
    }
    /**
     * Test 1 CRUD operations.
     */
    @Test
    public void test1CRUDOperations() {

        // Test if table is empty
        Flux<MongoEquipament> mongoEquipamentInitialContent = repository.findAll();
        List<MongoEquipament> mongoEquipamentList = new ArrayList<>();
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

<br/>
#### Test a Mongodb de l'aplicació

Per a poder verificar el codi a la base de dades MongoDB de l'aplicació només serà necessari importar el fitxer de
configuració de MongoDB en el nostre test:

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.AppConfig;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.EquipamentReactiveMongoConfig;

/**
 * Class EquipamentReactiveMongoRepositoryTest.
 * @author cscanigo
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentReactiveMongoConfig.class })
public class EquipamentReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {
}
```

#### Test a Embeded Mongodb

Per a poder verificar el codi en els tests es pot utilitzar la utilitat _Embeded Mongo_. Serà necessari estendre del
fitxer de configuració de Mongo de l'aplicació i sobreescriure el mètode:

```java
public MongoClient reactiveMongoClient()
```

Un exemple de configuració per a _Embeded MongoDB_ seria el següent:

```java
import java.io.IOException;
import com.mongodb.MongoException;
import com.mongodb.reactivestreams.client.MongoClient;

/**
 * Class EquipamentEmbeddedReactiveMongoConfig.
 * @author cscanigo
 */
public class EquipamentEmbeddedReactiveMongoConfig extends EquipamentReactiveMongoConfig {
    /**
     * Reactive mongo client.
     * @return mongo client
     */
    @Override
    public MongoClient reactiveMongoClient() {
        EmbeddedReactiveMongoFactoryBean embeddedReactiveMongoFactoryBean = new EmbeddedReactiveMongoFactoryBean();
        if (mongo == null) {
            try {
                mongo = embeddedReactiveMongoFactoryBean.getObject();
            } catch (IOException e) {
                throw MongoException.fromThrowable(e);
            }
        }
        return mongo;
    }
}
```

```java
import java.io.IOException;
import java.net.InetAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.FactoryBean;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
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

/**
 * Class EmbeddedReactiveMongoFactoryBean.
 *
 * @author cscanigo
 */
public class EmbeddedReactiveMongoFactoryBean implements FactoryBean<MongoClient>, DisposableBean {

    /** Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(EmbeddedReactiveMongoFactoryBean.class);

    /** Constant EMBEDDED_HOST. */
    private static final String EMBEDDED_HOST = InetAddress.getLoopbackAddress().getHostAddress();

    /** Constant EMBEDDED_PORT. */
    private static final int EMBEDDED_PORT = getPort();

    /** Constant EMBEDDED_TEST_URI. */
    private static final String EMBEDDED_TEST_URI = "mongodb://" + EMBEDDED_HOST + ":" + EMBEDDED_PORT + "/canigo";

    /** mongod executable. */
    private static MongodExecutable mongodExecutable;

    /** mongo process. */
    private static MongodProcess mongoProcess;

    /**
     * Obté object.
     * @return object
     * @throws IOException senyala que una excepció I/O s'ha produït.
     */
    @Override
    public synchronized MongoClient getObject() throws IOException {
        if (mongodExecutable == null) {
            LOG.info("Starting embedded MongoDB instance");
            initMongoServer();
        }
        return MongoClients.create(EMBEDDED_TEST_URI);
    }

    /**
     * Destroy.
     *
     * @throws Exception exception
     */
    @Override
    public void destroy() throws Exception {
        if (mongodExecutable != null) {
            LOG.info("Stopping embedded MongoDB instance");
            mongodExecutable.stop();
            mongoProcess.stop();
        }
    }

    /**
     * Obté object type.
     * @return object type
     */
    @Override
    public Class<?> getObjectType() {
        return MongoClient.class;
    }

    /**
     * Inicialitza mongo server.
     * @throws IOException senyala que una excepció I/O s'ha produït.
     */
    private synchronized void initMongoServer() throws IOException {
        final IMongodConfig mongodConfig = new MongodConfigBuilder().version(Version.Main.V4_0)
                .net(new Net(EMBEDDED_HOST, EMBEDDED_PORT, Network.localhostIsIPv6())).configServer(false).build();
        final IRuntimeConfig runtimeConfig = new RuntimeConfigBuilder().defaults(Command.MongoD).build();
        final MongodStarter runtime = MongodStarter.getInstance(runtimeConfig);
        mongodExecutable = runtime.prepare(mongodConfig);
        mongoProcess = mongodExecutable.start();
    }

    /**
     * Obté port.
     * @return port
     */
    private static int getPort() {
        try {
            return Network.getFreeServerPort();
        } catch (IOException ex) {
            LOG.error("Needed free port");
            return 27017;
        }
    }
}
```

Per a utilitzar la configuració amb _Embeded MongoBD_ en un test si no hem importat el _EquipamentReactiveMongoConfig_ en el _AppConfig_:

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.AppConfig;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.EquipamentEmbeddedReactiveMongoConfig;

/**
 * Class EquipamentEmbeddedReactiveMongoRepositoryTest.
 *
 * @author cscanigo
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedReactiveMongoConfig.class })
public class EquipamentEmbeddedReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {
}
```

O optar per crear un nou _AppConfig_ important el _EquipamentEmbeddedReactiveMongoConfig_ i carregar-lo al test:

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
Si es requereix el pintat de les consultes realitzades pel mòdul a la base de dades MongoDB, es pot afegir
un "logger" per a la categoria **org.springframework.data.mongodb.core.MongoTemplate** al fitxer "log4j" de l'aplicació.

Per exemple:

```xml
      <Logger name="org.springframework.data.mongodb.core.MongoTemplate" level="debug" additivity="false">
         <AppenderRef ref="DAILY_LOG" />
      </Logger>
```
