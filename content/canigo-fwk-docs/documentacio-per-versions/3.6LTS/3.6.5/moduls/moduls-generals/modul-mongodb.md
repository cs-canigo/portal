+++
date        = "2022-05-23"
title       = "Mòdul MongoDB"
description = "Mòdul de persistència de Base de Dades per MongoDB."
sections    = "Canigó. Documentació Versió 3.6"
weight      = 3
+++

## Propòsit

El mòdul de MongoDB té com a propòsit general gestionar l’accés i l’execució d'operacions a una base de dades MongoDB.
Aquest mòdul utilitza [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/3.3.4/reference/html/#reference)
i [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/).

A la versió 3.6 de Canigó, es proporcionen les funcionalitats de reactiu per MongoDB.

## Instal·lació

Per tal d'instal·lar el mòdul de MongoDB es pot optar per incloure’l automàticament a través de l'eina de suport al desenvolupament o bé afegir
manualment la següent dependència en el fitxer `pom.xml` de l’aplicació:

```xml
  <properties>
    ...
    <canigo.persistence.mongodb.version>[3.0.0,3.1.0)</canigo.persistence.mongodb.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.persistence.mongodb</artifactId>
      <version>${canigo.persistence.mongodb.version}</version>
    </dependency>
  </dependencies>
```

A la [Matriu de Compatibilitats] (/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/moduls/compatibilitat-per-modul/) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

<br/>
Caldrà també afegir el _plugin_ que genera les classes per als filtres de [QueryDSL](http://www.querydsl.com/) i
el que executa el test unitari del mòdul de persistència:

```xml
  <properties>
    ...
    <apt.maven.plugin.version>1.1.3</apt.maven.plugin.version>
  </properties>
  <build>
    ...
    <plugins>
      ...
      <plugin>
        <groupId>com.mysema.maven</groupId>
        <artifactId>apt-maven-plugin</artifactId>
        <version>${apt.maven.plugin.version}</version>
        <executions>
          <execution>
            <id>com.querydsl.apt.jpa.JPAAnnotationProcessor</id>
            <goals>
              <goal>process</goal>
            </goals>
            <configuration>
              <outputDirectory>target/generated-sources/java</outputDirectory>
              <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
            </configuration>
          </execution>
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
    </plugins>
  </build>
```

<br/>
Si l'aplicació està configurada amb **Spring Boot**, caldrà afegir les següents dependències:

```xml
  <dependencies>
    ...
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
  </dependencies>
```

<br/>
Si es vol utilitzar _Embeded Mongo_ per a executar els tests, caldrà afegir les següents dependències:

```xml
  <properties>
    ...
    <de.flapdoodle.embed.mongo.version>3.4.5</de.flapdoodle.embed.mongo.version>
    <embedmongo.spring.version>1.3.1</embedmongo.spring.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>de.flapdoodle.embed</groupId>
      <artifactId>de.flapdoodle.embed.mongo</artifactId>
      <version>${de.flapdoodle.embed.mongo.version}</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>cz.jirutka.spring</groupId>
      <artifactId>embedmongo-spring</artifactId>
      <version>${embedmongo.spring.version}</version>
      <scope>test</scope>
      <exclusions>
        <exclusion>
          <groupId>org.mongodb</groupId>
          <artifactId>mongo-java-driver</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
  </dependencies>
```

<br/>
Per a utilitzar les funcionalitats de Mongodb 4.4.x i 5.0.x, serà necessari utilitzar la versió 4.6.0 o superior de *mongodb-driver*
(https://www.mongodb.com/docs/drivers/java-drivers/) i caldrà afegir les següents dependències:

```xml
  <properties>
    ...
    <bson.version>4.6.0</bson.version>
    <mongodb.driver.core.version>4.6.0</mongodb.driver.core.version>
    <mongodb.driver.sync.version>4.6.0</mongodb.driver.sync.version>
    <mongodb.driver.legacy.version>4.6.0</mongodb.driver.legacy.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>bson</artifactId>
      <version>${bson.version}</version>
    </dependency>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-core</artifactId>
      <version>${mongodb.driver.core.version}</version>
    </dependency>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-sync</artifactId>
      <version>${mongodb.driver.sync.version}</version>
    </dependency>
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-legacy</artifactId>
      <version>${mongodb.driver.legacy.version}</version>
    </dependency>
  </dependencies>
```

<br/>
Finalment, si es vol utilitzar les funcionalitats reactives, caldrà afegir les següents dependències:

```xml
  <properties>
    ...
    <mongodb.driver.reactivestreams.version>4.6.0</mongodb.driver.reactivestreams.version>
    <reactor.core.version>3.4.17</reactor.core.version>
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongodb-driver-reactivestreams</artifactId>
      <version>${mongodb.driver.reactivestreams.version}</version>
    </dependency>
    <dependency>
      <groupId>io.projectreactor</groupId>
      <artifactId>reactor-core</artifactId>
      <version>${reactor.core.version}</version>
    </dependency>
  </dependencies>
```

## Configuració

La configuració es realitza automàticament a l'aplicació a partir de l'eina de suport al desenvolupament.
Només en cas de no utilitzar-la, caldrà realitzar manualment la configuració que es descriu a continuació.

### No reactiu

Fitxer: **mongodb.properties**
<br/>
Ubicació proposada: `<PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties`.

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per a més informació: https://mongodb.github.io/mongo-java-driver/3.12/javadoc/com/mongodb/MongoClientURI.html
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
import com.mongodb.MongoClientSettings;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig;

@Configuration
public class EquipamentMongoConfig extends MongoCoreConfig {

  public EquipamentMongoConfig() {
    super(MongoClientSettings.builder().build());
  }

  @Bean
  public MongoEquipamentListener mongoEquipamentListener() {
    return new MongoEquipamentListener();
  }
}
```

On s'està registrant el listener _cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener_.

Per a més informació sobre les configuracions podeu consultar: https://javadoc.io/doc/org.mongodb/mongodb-driver-core/latest/com/mongodb/MongoClientSettings.html.

### Reactiu

Fitxer: **mongodb.properties**
<br/>
Ubicació proposada: `<PROJECT_ROOT>/src/main/resources/config/props/mongodb.properties`.

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.mongodb.uri | Si | URL de connexió amb la BD MongoDB. Per a més informació: https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options

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
import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig;

@Configuration
public class EquipamentReactiveMongoConfig extends ReactiveMongoCoreConfig {
  @Bean
  public MongoEquipamentListener mongoEquipamentListener() {
    return new MongoEquipamentListener();
  }
}
```

On s'està redefinint el socket timeout de la connexió a 2000 ms i s'està registrant el listener _cat.gencat.demo.mongodb.model.repository.MongoEquipamentListener_.

## Entitats

Per tal de definir les entitats de MongoDB serà necessari utilitzar les _annotations_ de _JSR 380_, _Spring Data_ i _Spring Data MongoDB_. Per a més informació, podeu consultar:

* Package javax.validation: https://javadoc.io/doc/javax.validation/validation-api/latest/javax/validation/constraints/NotNull.html
* Package org.springframework.data.annotation: https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/package-summary.html
* Spring Data MongoDB: https://docs.spring.io/spring-data/mongodb/docs/3.3.4/reference/html/#reference

Un exemple d'entitat seria la següent:

```java
import javax.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Equipament")
public class MongoEquipament {
  @Id private Long id;
  @Indexed(unique = true) @NotNull(message = "Equipament's nom must not be null") private String nom;
  private String municipi;

  /* Getters and Setters */
}
```

## Listeners

Si es considera necessari, es pot crear un _listener_ a una entitat de Mongo. Un exemple de _listener_ seria el següent:

```java
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

public class MongoEquipamentListener extends AbstractMongoEventListener<MongoEquipament> {
  @Override
  public void onBeforeConvert(BeforeConvertEvent<MongoEquipament> event) {
    MongoEquipament mongoEquipament = event.getSource();
    if (mongoEquipament.getId() == null) {
      try {
        mongoEquipament.setId((long) SecureRandom.getInstanceStrong().nextInt());
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }
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
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository;

public interface EquipamentMongoRepository extends MongoGenericRepository<MongoEquipament, Long> {
  @Query("{ nom: ?0 }")
  List<MongoEquipament> queryFindByNom(String nom);
  List<MongoEquipament> findByNomLike(String nom, Sort sort);
}
```

A un repositori es poden crear mètodes per a cada query que es vulgui definir. La construcció utilitza els prefixos
_find...By, read...By, query...By, count...By_ i _get...By_ i els mètodes poden incorporar la paraula _Distinct_, concatenar propietats
amb _And_ i _Or_ o descriptors com _OrderBy_ o _IgnoreCase_.

Per a més informació, podeu consultar la documentació oficial de [Spring Data MongoDB] (https://docs.spring.io/spring-data/mongodb/docs/3.3.4/reference/html/#reference).

<br/>

### Reactiu

Per a utilitzar els repositoris s'ha de generar un objecte _ReactiveMongoRepository_ per a l'entitat desitjada(T), que ha d'estendre de
**org.springframework.data.mongodb.repository.ReactiveMongoRepository<T, ID>**.

Un exemple de repositori seria el següent:

```java
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface EquipamentReactiveMongoRepository extends ReactiveMongoRepository<MongoEquipament, Long> {
  @Query("{ nom: ?0 }")
  Flux<MongoEquipament> findByNomQuery(String nom);
  Flux<MongoEquipament> findByNomLike(String nom, Sort sort);
}

```

A un repositori es poden crear mètodes per a cada query que es vulgui definir. La construcció utilitza els prefixos
_find...By, read...By, query...By, count...By_ i _get...By_ i els mètodes poden incorporar la paraula _Distinct_, concatenar propietats
amb _And_ i _Or_ o descriptors com _OrderBy_ o _IgnoreCase_.

Per a més informació, podeu consultar la documentació oficial de [Spring Data MongoDB] (https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/).

## Test

### No reactiu

Definirem els següents tests:

```java
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public abstract class EquipamentMongoRepositoryCoreTest {
  @Inject
  private EquipamentMongoRepository repository;

  @Before
  public void setUp() {
    assertNotNull(repository);
    repository.deleteAll();
  }

  @Test
  public void test01CRUDOperations() {
    assertTrue(repository.findAll().isEmpty());

    MongoEquipament mongoEquipament = new MongoEquipament();
    mongoEquipament.setNom("CAP La Pau");
    mongoEquipament.setMunicipi("Barcelona");
    repository.save(mongoEquipament);

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

    repository.deleteAll();
    assertTrue(repository.findAll().isEmpty());
  }
}
```

<br/>
#### Test a Mongodb de l'aplicació

Per a poder verificar el codi a la base de dades MongoDB de l'aplicació només serà necessari importar el fitxer de
configuració de MongoDB en el nostre test:

```java
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedMongoConfig.class })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EquipamentEmbeddedMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest {
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
import java.io.IOException;
import java.util.Objects;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import org.springframework.lang.NonNull;

public class EquipamentEmbeddedMongoConfig extends EquipamentMongoConfig {
  @Override
  @NonNull
  public MongoClient mongoClient() {
    EmbeddedMongoFactoryBean embeddedMongoFactoryBean = new EmbeddedMongoFactoryBean();
    if (mongo == null) {
      try {
        mongo = embeddedMongoFactoryBean.getObject();
      } catch (IOException e) {
        throw Objects.requireNonNull(MongoException.fromThrowable(e));
      }
    }
    assert mongo != null;
    return mongo;
  }
}
```

```java
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class EmbeddedMongoFactoryBean extends EmbeddedBaseMongoFactoryBean<MongoClient> {
  private static final Logger LOG = LoggerFactory.getLogger(EmbeddedMongoFactoryBean.class);

  @Override
  public synchronized MongoClient getObject() throws IOException {
    if (mongodExecutable == null) {
      LOG.info("Starting embedded MongoDB instance");
      initMongoServer();
    }
    return MongoClients.create(EMBEDDED_TEST_URI);
  }

  @Override
  public Class<?> getObjectType() {
    return MongoClient.class;
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
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.IFeatureAwareVersion;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;

public abstract class EmbeddedBaseMongoFactoryBean<E> implements FactoryBean<E>, DisposableBean {
  private static final Logger LOG = LoggerFactory.getLogger(EmbeddedBaseMongoFactoryBean.class);
  private static final IFeatureAwareVersion version = Version.Main.V5_0;
  protected static final String EMBEDDED_HOST = InetAddress.getLoopbackAddress().getHostAddress();
  protected static final int EMBEDDED_PORT = getPort();
  protected static final String EMBEDDED_TEST_URI = "mongodb://" + EMBEDDED_HOST + ":" + EMBEDDED_PORT + "/canigo";
  protected static MongodExecutable mongodExecutable;
  protected static MongodProcess mongoProcess;

  @Override
  public void destroy() {
    if (mongodExecutable != null) {
      LOG.info("Stopping embedded MongoDB instance");
      mongodExecutable.stop();
      mongoProcess.stop();
    }
  }

  protected synchronized void initMongoServer() throws IOException {
    MongodConfig mongodConfig = MongodConfig.builder().version(version)
        .net(new Net(EMBEDDED_HOST, EMBEDDED_PORT, Network.localhostIsIPv6())).build();
    mongodExecutable = MongodStarter.getDefaultInstance().prepare(mongodConfig);
    mongoProcess = mongodExecutable.start();
  }

  protected static int getPort() {
    try {
      return Network.freeServerPort(InetAddress.getLoopbackAddress(), 62560);
    } catch (IOException ex) {
      LOG.error("Needed free port");
      return 27017;
    }
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

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { EmbeddedMongoAppConfig.class})
public class EquipamentEmbeddedMongoRepositoryTest extends EquipamentMongoRepositoryCoreTest{
}
```

Per a més informació, podeu consultar la documentació oficial de [Embeded MongoDB] (https://flapdoodle-oss.github.io/de.flapdoodle.embed.mongo/)

### Reactiu

Definirem els següents tests:

```java
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
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
  public void test1CRUDOperations() {
    Flux<MongoEquipament> mongoEquipamentInitialContent = repository.deleteAll().thenMany(repository.findAll());
    List<MongoEquipament> mongoEquipamentList = new ArrayList<>();
    mongoEquipamentInitialContent.subscribe(mongoEquipamentList::add);
    assertTrue(mongoEquipamentList.isEmpty());

    StepVerifier.create(mongoEquipamentInitialContent).expectNextCount(0).expectComplete().verify();

    MongoEquipament mongoEquipament = new MongoEquipament();
    mongoEquipament.setNom("CAP La Pau");
    mongoEquipament.setMunicipi("Barcelona");
    Mono<MongoEquipament> mongoEquipamentMono = repository.save(mongoEquipament);
    mongoEquipament = mongoEquipamentMono.block(Duration.ofMinutes(1L));
    assert mongoEquipament != null;
    assertNotNull(mongoEquipament.getId());

    MongoEquipament mongoEquipament2 = new MongoEquipament();
    mongoEquipament2.setNom("CAP Santa Coloma");
    Mono<MongoEquipament> mongoEquipament2Mono = repository.save(mongoEquipament2);
    mongoEquipament2 = mongoEquipament2Mono.block(Duration.ofMinutes(1L));
    assert mongoEquipament2 != null;
    assertNotNull(mongoEquipament2.getId());

    Flux<MongoEquipament> mongoEquipamentFinalContent = repository.findAll();
    StepVerifier.create(mongoEquipamentFinalContent).expectNextCount(2).expectComplete().verify();

    Mono<MongoEquipament> mongoEquipament3Mono = repository.findById(mongoEquipament2.getId());
    MongoEquipament mongoEquipament3 = mongoEquipament3Mono.block(Duration.ofMinutes(1L));
    assert mongoEquipament3 != null;
    assertEquals(mongoEquipament2.getMunicipi(), mongoEquipament3.getMunicipi());

    repository.deleteAll();
    Mono<Boolean> existsById = repository.existsById(mongoEquipament2.getId());
    StepVerifier.create(existsById).expectNext(true).expectComplete().verify();
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

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedReactiveMongoConfig.class })
public class EquipamentEmbeddedReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {
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
import com.mongodb.MongoException;
import com.mongodb.reactivestreams.client.MongoClient;
import org.springframework.lang.NonNull;
import java.io.IOException;
import java.util.Objects;

public class EquipamentEmbeddedReactiveMongoConfig extends EquipamentReactiveMongoConfig {
  @Override
  @NonNull
  public MongoClient reactiveMongoClient() {
    EmbeddedReactiveMongoFactoryBean embeddedReactiveMongoFactoryBean = new EmbeddedReactiveMongoFactoryBean();
    if (mongo == null) {
      try {
        mongo = embeddedReactiveMongoFactoryBean.getObject();
      } catch (IOException e) {
        throw Objects.requireNonNull(MongoException.fromThrowable(e));
      }
    }
    assert mongo != null;
    return mongo;
  }
}
```

```java
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

public class EmbeddedReactiveMongoFactoryBean extends EmbeddedBaseMongoFactoryBean<MongoClient> {
  private static final Logger LOG = LoggerFactory.getLogger(EmbeddedReactiveMongoFactoryBean.class);

  @Override
  public synchronized MongoClient getObject() throws IOException {
    if (mongodExecutable == null) {
      LOG.info("Starting embedded MongoDB instance");
      initMongoServer();
    }
    return MongoClients.create(EMBEDDED_TEST_URI);
  }

  @Override
  public Class<?> getObjectType() {
    return MongoClient.class;
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
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.IFeatureAwareVersion;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;

public abstract class EmbeddedBaseMongoFactoryBean<E> implements FactoryBean<E>, DisposableBean {
  private static final Logger LOG = LoggerFactory.getLogger(EmbeddedBaseMongoFactoryBean.class);
  private static final IFeatureAwareVersion version = Version.Main.V5_0;
  protected static final String EMBEDDED_HOST = InetAddress.getLoopbackAddress().getHostAddress();
  protected static final int EMBEDDED_PORT = getPort();
  protected static final String EMBEDDED_TEST_URI = "mongodb://" + EMBEDDED_HOST + ":" + EMBEDDED_PORT + "/canigo";
  protected static MongodExecutable mongodExecutable;
  protected static MongodProcess mongoProcess;

  @Override
  public void destroy() {
    if (mongodExecutable != null) {
      LOG.info("Stopping embedded MongoDB instance");
      mongodExecutable.stop();
      mongoProcess.stop();
    }
  }

  protected synchronized void initMongoServer() throws IOException {
    MongodConfig mongodConfig = MongodConfig.builder().version(version)
        .net(new Net(EMBEDDED_HOST, EMBEDDED_PORT, Network.localhostIsIPv6())).build();

    mongodExecutable = MongodStarter.getDefaultInstance().prepare(mongodConfig);
    mongoProcess = mongodExecutable.start();
  }

  protected static int getPort() {
    try {
      return Network.freeServerPort(InetAddress.getLoopbackAddress(), 62560);
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

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedReactiveMongoConfig.class })
public class EquipamentEmbeddedReactiveMongoRepositoryTest extends EquipamentReactiveMongoRepositoryCoreTest {
}
```

O optar per crear un nou _AppConfig_ important el _EquipamentEmbeddedReactiveMongoConfig_ i carregar-lo al test:

```java
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EquipamentEmbeddedReactiveMongoConfig.class })
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
