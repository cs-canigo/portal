+++
date        = "2024-01-15"

title       = "Mòdul JPA"
description = "Mòdul de persistència de Base de Dades."
sections    = "Canigó. Documentació Versió 3.8"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona accés amb transaccionalitat amb la base de dades, permetent la execució d'operacions dintre de transaccions.

Aquest mòdul utilitza Spring Data JPA i QueryDSL. Es pot trobar informació sobre aquests frameworks a la documentació de referència:

* [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/3.1.4/reference/html/#reference)
* [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/)

## Instal·lació i Configuració

### Instal·lació

El mòdul de persistència i el corresponent test unitari s'inclou per defecte dins del core de Canigó 3.8.
Durant el procés de creació de l'aplicació amb l'arquetipus, s'inclourà la referència dins del `pom.xml`.
La manera d'afegir manualment les dependències seria la següent:

```xml
<properties>
  ...
  <canigo.persistence.jpa.version>[3.1.0,3.2.0)</canigo.persistence.jpa.version>
</properties>
<dependencies>
  ...
  <dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.persistence.jpa</artifactId>
    <version>${canigo.persistence.jpa.version}</version>
  </dependency>
<dependencies>
```

Si es requereix configurar un origen de dades JDBC, es requeriran les següents dependències addicionals:

```xml
<properties>
  ...
  <commons-dbcp2.version>2.9.0</commons-dbcp2.version>
  <commons-pool2.version>2.11.1</commons-pool2.version>
</properties>
<dependencies>
  ...
  <dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-dbcp2</artifactId>
    <version>${commons-dbcp2.version}</version>
  </dependency>
  <dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>${commons-pool2.version}</version>
  </dependency>
<dependencies>
```

A la [Matriu de Compatibilitats](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul) es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

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
        <execution>
          <goals>
            <goal>process</goal>
          </goals>
          <configuration>
            <outputDirectory>target/generated-sources/java</outputDirectory>
            <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

### Configuració


La configuració ha passat a realitzar-se amb fitxer yml en lloc d'amb el fitxer `<PROJECT_ROOT>/src/main/resources/config/props/jpa.properties`.

Un exemple del contingut del fitxer application.yml podria ser el següent:

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

**persistence.xml**

Ubicació: `<PROJECT_ROOT>/src/main/resources/config/persistence/persistence.xml`

```xml
<persistence xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"
  version="1.0">
  <persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL"/>
</persistence>
```

**app-custom-persistence-jpa.xml**

Ubicació: `<PROJECT_ROOT>/src/main/resources/spring/app-custom-persistence-jpa.xml`

Exemple del fitxer de configuració:

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
  xmlns:p="http://www.springframework.org/schema/p" xmlns:tx="http://www.springframework.org/schema/tx"
  xmlns:jdbc="http://www.springframework.org/schema/jdbc" xmlns:jpa="http://www.springframework.org/schema/data/jpa"
  xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/jdbc 
    http://www.springframework.org/schema/jdbc/spring-jdbc.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/data/jpa
    http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">

  <aop:aspectj-autoproxy />
  <jpa:repositories 
    base-package="XXXXXXXX.repository" 
    base-class="cat.gencat.ctti.canigo.arch.persistence.jpa.repository.impl.JPAGenericRepositoryImpl"/>

  <bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
    <description>Fem servir Hibernate com a motor de persistència per sota de JPA.</description>
    <property name="showSql" value="${persistence.showSQL:true}" />
    <property name="generateDdl" value="${persistence.generateDdl:false}" />
    <property name="database" value="${persistence.database}" />
    <property name="databasePlatform" value="${persistence.dialect}" />
  </bean>

  <tx:advice id="txAdvice">
    <tx:attributes>
      <tx:method name="get*" propagation="REQUIRED" read-only="true" />
      <tx:method name="filter*" propagation="REQUIRED" read-only="true" />
      <tx:method name="find*" propagation="REQUIRED" read-only="true" />
      <tx:method name="load*" propagation="SUPPORTS" read-only="true" />
      <tx:method name="save*" propagation="REQUIRED" />
      <tx:method name="update*" propagation="REQUIRED" />
      <tx:method name="delete*" propagation="REQUIRED" />
      <tx:method name="insert*" propagation="REQUIRED" />
    </tx:attributes>
  </tx:advice>
</beans>
```

Al tag **jpa:repositories** al paràmetre **base-package** s'ha d'indicar el package on es troben els repositoris de l'aplicació.
<br>

Si s'utilitza la base de dades embeguda *H2* es poden afegir els següents scripts per a crear schemas i dades
com es mostra a continuació:

```xml
  <jdbc:embedded-database id="dataSource" type="H2">
    <jdbc:script location="classpath:scripts/h2/h2-db-app-h2db-schema.sql"/>
    <jdbc:script location="classpath:scripts/h2/h2-db-app-h2db-data.sql"/>
  </jdbc:embedded-database> 
```

```sql
// scripts/h2/h2-db-app-h2db-schema.sql
CREATE TABLE IF NOT EXISTS equipaments (
  ID bigint GENERATED BY DEFAULT AS IDENTITY (START WITH 1), 
  NOM varchar(200) NOT NULL, MUNICIPI varchar(200), 
  PRIMARY KEY (ID)
);
```

```sql
// scripts/h2/h2-db-app-h2db-data.sql
MERGE INTO equipaments KEY(id) VALUES (1, 'estació autobusos', 'Ripoll');
MERGE INTO equipaments KEY(id) VALUES (2, 'centre obert Alba', 'Cambrils');
MERGE INTO equipaments KEY(id) VALUES (3, 'Llar d''infants Món Petit', 'l''Escala');
MERGE INTO equipaments KEY(id) VALUES (4, 'Jutjat de Pau', 'Sant Esteve de Palautordera');
MERGE INTO equipaments KEY(id) VALUES (5, 'LLI privada Quitxalla', 'Mollet del Vallés');
```

Si s'utilitza una base de dades *Oracle*, *Mysql*, *DB2*, *SQL Server*, o *Postgres*, es pot configurar un origen de dades JDBC
com es mostra a continuació:

```xml
  <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
  </bean>
```

Si s'utilitza una base de dades *Oracle*, *Mysql*, *DB2*, *SQL Server*, o *Postgres*, es pot configurar un origen de
dades JNDI com es mostra a continuació:

```xml
  <bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="${jndi.name}"/>
    <property name="lookupOnStartup" value="${jndi.lookupOnStartup:true}"/>
    <property name="cache" value="${jndi.cache:true}"/>
    <property name="proxyInterface" value="jakarta.sql.DataSource"/>
  </bean>
```

**jdbc.properties**

La configuració ha passat a realitzar-se amb fitxer yml en lloc d’amb el fitxer jdbc.properties.

Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/*databaseName*
    username: *username*
    password: *password*
```

**jndi.properties**

Configuració si l'aplicació va per jndi. La configuració ha passat a realitzar-se amb fitxer yml en lloc d’amb el fitxer jndi.properties.

Un exemple del contingut del fitxer application.yml podria ser el següent:

```yml
spring:
  datasource:
    jndi-name: java:jboss/datasources/nomjndi
    jndi-lookupOnStartup: false
    jndi-cache: java: false
```

### Ús dels repositoris

Per a utilitzar els repositoris s'ha de generar un objecte Repository per a l'entitat desitjada(T), que ha d'estendre de **cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository<T, ID extends Serializable>**

```java
public interface EquipamentRepository extends GenericRepository<Equipament, Long>{ }
```

#### Construcció de queries automàtiques

A un repositori es poden definir mètodes per cada query que es vulgui definir. La construcció utilitza els prefixos find...By, read...By, query...By, count...By i get...By. El mètode pot incoporar la paraula Distinct, concatenar propietats amb And i Or o descriptors com OrderBy o IgnoreCase.

Exemples:

```java
List<Equipament> findDistinctByNomOrMunicipi(String nom, String municipi);
List<Equipament> findByNomIgnoreCase(String nom);
List<Equipament> findByMunicipiOrderByNomDesc(String municipi);
```

Més informació a la documentació oficial de [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/3.1.4/reference/html/#reference).

#### Utilització de QueryDSL

Una de les funcionalitats proposades és la d'utilitzar QueryDSL per a realitzar cerques segons filtres dinàmics, amb paginació i/o ordenació.

El GenericRepository proporciona el següent mètode:

```java
Page<T> findAll(Predicate predicate, Pageable pageable);
```

Aquest mètode espera un objecte org.springframework.data.domain.Pageable que conté el número de pàgina (la primera pàgina és la 0), el nombre d'elements per pàgina, la direcció d'ordenació, el camp d'ordenació. I un objecte Predicate amb la query a realitzar que es construeix de la següent manera:

Primer de tot el filtre ha de ser un String amb el següent patró:

**field1Operador1Valor1,field2Operador2Valor2,fieldNOperadorNValorN**

* on Field és el nom d'una propietat de l'entitat (per exemple id) <br>
* on Operador és un dels tipus d'operador suportats:

Operador | Descripció
-------- | --------
`>`  | major que
`>:` | major o igual que
`<`  | menor que
`<:` | menor o igual que
`<>` | diferent de
`:`  | igual que

* on valor és el valor amb el qual es vol comparar.

Per exemple, per a cercar l'entitat que tingui id major que 15 i amb nom igual a 'Prova' el filtre hauria de ser el següent: <br>
id>15,nom:Prova

#### Projecció de resultats

Amb QueryDSL també es poden realitzar cerques que en comptes de retornar l'objecte sencer, retorni només determinats
camps de l'objecte desitjat, els camps no seleccionats els retorna amb valor null <br>

Per a utilitzar les projeccions el GenericRepository proporciona el següent mètode:

```java
Page<T> findAll(FactoryExpression<T> factoryExpression, Predicate predicate, Pageable pageable);
```

El codi següent retorna una llista dels objectes Equipaments amb nom INDOORKARTING, però aquests objectes només tindran el camp nom.

```java
String search = "nom:INDOORKARTING";

Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "nom");
GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<Equipament>(Equipament.class, "equipament");
builder.populateSearchCriteria(search);

QEquipament qequipament = QEquipament.equipament;
Page<Equipament> page = repository.findAll(Projections.bean(Equipament.class, qequipament.nom ), builder.build(), pageable);
```

Més informació a la documentació oficial de [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/).

#### Batch Inserts/Update

La classe GenericRepository també proporciona un mètode per a realitzar inserts/updates de forma massiva amb un rendiment òptim:

```java
public <S extends T> List<S> bulkSave(Iterable<S> entities);
```

### Exemple

Per exemple a l'aplicació inicial que genera l’arquetipus de Canigó es generen els següents fitxers:

**Equipament.java**

Ubicació: `<PROJECT_ROOT>/src/main/java/cat/gencat/test/model/Equipament.java`

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "Equipament")
@Table(name = "equipaments")
public class Equipament {
  private Long id;
  private String nom;
  private String municipi;

  public Equipament() { }

  public Equipament(Long id) {
    this.id =id;
  }

  @Id
  @Column(name = "id", nullable = false, unique = true)
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Column(name = "nom", nullable = false, unique = true)
  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  @Column(name = "municipi")
  public String getMunicipi() {
    return municipi;
  }

  public void setMunicipi(String municipi) {
    this.municipi = municipi;
  }

  @Override
  public String toString() {
    return "Equipament [nom=" + nom + "]";
  }
}
```

**EquipamentRepository**

Ubicació: `<PROJECT_ROOT>/src/main/java/cat/gencat/test/repository/EquipamentRepository.java`

```java
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EquipamentRepository extends GenericRepository<Equipament, Long>, EquipamentRepositoryCustom { }
```

**EquipamentRepository**

Ubicació: `<PROJECT_ROOT>/src/main/java/cat/gencat/test/repository/EquipamentRepositoryCustom.java`

```java
public interface EquipamentRepositoryCustom { }
```

**EquipamentService**

Ubicació: `<PROJECT_ROOT>/src/main/java/cat/gencat/test/service/EquipamentService.java`

```java
import java.util.List;
import org.springframework.data.domain.Page;

public interface EquipamentService {
  List<Equipament> findAll();
  Page<Equipament> findPaginated(Integer page, Integer rpp, String sort, String filter);
  Page<Equipament> findPaginatedProjeccio(Integer page, Integer rpp, String sort, String filter, String fields);
  Equipament getEquipament(Long equipamentId);
  Long saveEquipament(Equipament equipament);
  void updateEquipament(Equipament equipament);
  void deleteEquipament(Long equipamentId);
}
```

**EquipamentServiceImpl**

Ubicació: `<PROJECT_ROOT>/src/main/java/cat/gencat/test/service/impl/EquipamentServiceImpl.java`

```java
import cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("equipamentService")
@Lazy
public class EquipamentServiceImpl implements EquipamentService {
  @Inject
  private EquipamentRepository repository;

  @Override
  public List<EquipamentDTO> findAll() {
    return repository.findAll().stream().map(EquipamentMapper.MAPPER::fromEquipament).collect(Collectors.toList());
  }

  @Override
  public Page<EquipamentDTO> findPaginated(Integer page, Integer rpp, String sort, String filter) {
    GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<>(Equipament.class, "equipament");
    builder.populateSearchCriteria(filter);
    Predicate predicate = builder.build();

    Pageable pageable = PageRequest.of(page - 1, rpp, getOrdenacio(sort));
    return predicate != null ? repository.findAll(predicate, pageable).map(EquipamentMapper.MAPPER::fromEquipament) :
      repository.findAll(pageable).map(EquipamentMapper.MAPPER::fromEquipament);
  }

  @Override
  public Page<EquipamentDTO> findPaginatedProjeccio(Integer page, Integer rpp, String sort,
                                                    String filter, String fields) {
    GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<>(Equipament.class, "equipament");
    builder.populateSearchCriteria(filter);
    Predicate predicate = builder.build();
    Pageable pageable = PageRequest.of(page - 1, rpp, getOrdenacio(sort));
    QEquipament qequipament = QEquipament.equipament;

    List<Expression<?>> listFields = new ArrayList<>();
    if (fields != null && !fields.isBlank()) {
      for (String selectedField : fields.split(",")) {
        switch (selectedField) {
          case Equipament.ID_FIELD:
            listFields.add(qequipament.id);
            break;
          case Equipament.NOM_FIELD:
            listFields.add(qequipament.nom);
            break;
          case Equipament.MUNICIPI_FIELD:
            listFields.add(qequipament.municipi);
            break;
          default:
            break;
        }
      }
    }

    Expression<?>[] arrayExpression = listFields.toArray(new Expression[0]);
    return predicate != null
      ? repository.findAll(Projections.bean(Equipament.class, arrayExpression), predicate, pageable).map(EquipamentMapper.MAPPER::fromEquipament)
      : repository.findAll(Projections.bean(Equipament.class, arrayExpression), pageable).map(EquipamentMapper.MAPPER::fromEquipament);
  }

  private Sort getOrdenacio(String sort) {
    List<Order> orders = new ArrayList<>();

    if (sort != null && !sort.isBlank()) {
      for (String field : sort.split(",")) {
        char direction = field.charAt(0);
        if (Character.toString(direction).equals("-")) {
          // Order descendente
          String value = field.substring(1);
          orders.add(new Order(Direction.DESC, value));
        } else {
          // Orden ascendente
          orders.add(new Order(Direction.ASC, field));
        }
      }
    }
    return Sort.by(orders);
  }

  @Override
  public EquipamentDTO getEquipament(Long equipamentId) {
    return repository.findById(equipamentId).map(EquipamentMapper.MAPPER::fromEquipament).orElse(null);
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public Long saveEquipament(EquipamentDTO equipamentDTO) {
    return repository.save(EquipamentMapper.MAPPER.toEquipament(equipamentDTO)).getId();
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public void updateEquipament(EquipamentDTO equipamentDTO) {
    repository.save(EquipamentMapper.MAPPER.toEquipament(equipamentDTO));
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public void deleteEquipament(Long equipamentId) {
    repository.delete(new Equipament(equipamentId));
  }
}
```

## Suport pel tipus de dada JSON

Des de la versió 1.3.1 del mòdul de persistència el tipus de dada JSON està suportat per MySQL i per PostgreSQL, fent la transformació entre JSON i l'objecte mapejat de manera automàtica.

Per fer ús només cal seguir els següents passos:

1. Anotar l'entitat (o una superclasse) amb `@org.hibernate.annotations.TypeDef` per definir el/els àlies de mapeig.
2. Anotar el camp de l'entitat amb `@org.hibernate.annotations.Type(type = "json")` com al següent exemple:

Un exemple senzill seria el següent:

```java
import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonBinaryType;
import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonNodeBinaryType;
import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonStringType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@TypeDefs({ @TypeDef(name = "json", typeClass = JsonStringType.class),
  @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
  @TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class)})
@Entity(name = "MyCustomer")
@Table(name = "customer")
public class Customer {
  @Type(type = "json")
  @Column
  private ComplexCustomerData complexCustomerData;

  public ComplexCustomerData getComplexCustomerData() {
    return complexCustomerData;
  }

  public void setComplexCustomerData(ComplexCustomerData complexCustomerData) {
    this.complexCustomerData =complexCustomerData;
  }
}
```

NOTA: La definició SQL d'un camp de tipus JSON no és estandard i s'ha de consultar la documentació de la BBDD.
