+++
date        = "2018-11-07T13:26:16+01:00"
title       = "Mòdul JPA"
description = "Mòdul de persistència de Base de Dades."
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona accés amb transaccionalitat amb la base de dades, permetent la execució d'operacions dintre de transaccions.

Aquest mòdul utilitza Spring Data JPA i QueryDSL. Es pot trobar informació sobre aquests frameworks a la documentació de referència:

* [Spring Data JPA] (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/). 
* [QueryDSL] (http://www.querydsl.com/static/querydsl/latest/reference/html/)

## Instal·lació i Configuració

### Instal·lació

El mòdul de persistència i el corresponent test unitari s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. 
En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```
<canigo.persistence.jpa.version>[1.2.0,1.4.0)</canigo.persistence.jpa.version>
<canigo.test.version>[1.2.0,1.3.0)</canigo.test.version>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.persistence.jpa</artifactId>
	<version>${canigo.persistence.jpa.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.test</artifactId>
	<version>${canigo.test.version}</version>
	<scope>test</scope>
</dependency>

<dependency>
   <groupId>cat.gencat.ctti</groupId>
   <artifactId>canigo.persistence.jpa</artifactId>
   <type>test-jar</type>
   <version>${canigo.persistence.jpa.version}</version>
   <scope>test</scope>
   <classifier>tests</classifier>
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
				<execution>
					<goals>
						<goal>process</goal>
						<goal>test-process</goal>
					</goals>
					<configuration>
						<outputDirectory>target/generated-sources/java</outputDirectory>
						<processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
					</configuration>
				</execution>
			</executions>
		</plugin>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-surefire-plugin</artifactId>
			<executions>
				<execution>
		            <id>base-test</id>
		            <phase>test</phase>
		            <goals>
		                <goal>test</goal>
		            </goals>
		            <configuration>
		            	<dependenciesToScan>
		            		<dependency>cat.gencat.ctti:canigo.persistence.jpa</dependency>
		            		...
				</dependenciesToScan>
				<excludes>
					<exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
				</excludes>
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

### Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament (plugin de Canigó per a Eclipse)

En cas que no es generi automàticament el codi, s'ha de realitzar manualment la següent configuració:

**jpa.properties**

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/jpa.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.persistence.database | Si | Sistema de base de dades al que es conectarà.
*.persistence.dialect | Si | El nom de classe que permet a JPA generar SQL per a una base de dades relacional en particular. Aquests són els dialectes certificats: org.hibernate.dialect.Oracle12cDialect<br> org.hibernate.dialect.Oracle10gDialect<br> org.hibernate.dialect.Oracle9iDialect<br> org.hibernate.dialect.Oracle8iDialect<br> org.hibernate.dialect.MySQL5Dialect<br> org.hibernate.dialect.MySQLDialect <-- Versions < 5<br> org.hibernate.dialect.HSQLDialect<br> org.hibernate.dialect.PostgreSQLDialect
*.persistence.showSQL | No | Escriu totes les sentències SQL al log aplicatiu.<br> Per defecte: true
*.persistence.generateDdl |No | Exporta el DDL (Data Definition Language) a la BD després que l'EntityManagerFactory s'inicialitzi, creant/actualitzant les taules.<br> Valor per defecte: false
*.persistence.hibernate.connection.release_mode | No | Serveix per especificar quan Hibernate ha d'alliberar les connexions JDBC. Una connexió JDBC es manté fins que la sessió és tancada explícitament o desconnectat per defecte. Per a un datasource JTA s'hauria de seleccionar after_statement, i per non-JTA after_transaction. En mode auto, se seleccionarà after_statement per a JTA i CMT, i afte_transaction per JDBC.<br> Per defecte: auto
*.persistence.hibernate.connection.autocommit | No | Habilita l'autocommit per a connexions pooled JDBC
*.persistence.hibernate.generate_statistics | No | Hibernate recopila informació útil per a tunning.<br> Per defecte: false
*.persistence.hibernate.jdbc.use_scrollable_resultset | No | Habilita l'ús de JDBC2 scrollable resultsets a Hibernate.<br> Per defecte: true

**persistence.xml**

Ubicació: <PROJECT_ROOT>/src/main/resources/config/persistence/persistence.xml

```
<persistence xmlns="http://java.sun.com/xml/ns/persistence"	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"
	version="1.0">

	<persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL"/>

</persistence>
```

**app-custom-persistence-jpa.xml**

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/app-custom-persistence-jpa.xml

Exemple del fitxer de configuració per a un base de dades H2:
```
<?xml version="1.0" encoding="ISO-8859-1"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:p="http://www.springframework.org/schema/p" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xmlns:jpa="http://www.springframework.org/schema/data/jpa"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
           http://www.springframework.org/schema/tx 
           http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
           http://www.springframework.org/schema/jdbc 
           http://www.springframework.org/schema/jdbc/spring-jdbc-4.3.xsd
           http://www.springframework.org/schema/aop 
           http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
           http://www.springframework.org/schema/data/jpa
    	   http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">

	<aop:aspectj-autoproxy />
	
	<jpa:repositories base-package="cat.gencat.test.repository" base-class="cat.gencat.ctti.canigo.arch.persistence.jpa.repository.impl.JPAGenericRepositoryImpl"/>
	
	<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
		<description>
			Fem servir Hibernate com a motor de persistència per sota de JPA.
		</description>
		<property name="showSql" value="true" />
		<property name="generateDdl" value="false" />
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
	
	<jdbc:embedded-database id="dataSource" type="H2">
		<jdbc:script location="classpath:scripts/db-auth-hsqldb-schema.sql"/>
		<jdbc:script location="classpath:scripts/db-auth-hsqldb-data.sql"/>
		<jdbc:script location="classpath:scripts/db-app-hsqldb-schema.sql"/>
		<jdbc:script location="classpath:scripts/db-app-hsqldb-data.sql"/>
	</jdbc:embedded-database>

</beans>
```

Al tag **jpa:repositories** al paràmetre **base-package** s'ha d'indicar el package on es troben els repositoris de l'aplicació.

### Ús dels repositoris

Per a utilitzar els repositoris s'ha de generar un objecte Repository per a l'entitat desitjada(T), que ha d'extendre de **cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository<T, ID extends Serializable>**

	public interface EquipamentRepository extends GenericRepository<Equipament, Long>{

	}

#### Construcció de queries automàtiques

A un repositori es poden definir mètodes per cada query que es vulgui definir. La construcció utilitza els prefixos find...By, read...By, query...By, count...By i get...By. El mètode pot incoporar la paraula Distinct, concatenar propietats amb And i Or o descriptors com OrderBy o IgnoreCase.

Exemples:

    List<Equipament> findDistinctByNomOrMunicipi(String nom, String municipi);
	List<Equipament> findByNomIgnoreCase(String nom);
	List<Equipament> findByMunicipiOrderByNomDesc(String municipi);


Més informació a la documentació oficial de [Spring Data JPA](http://docs.spring.io/spring-data/jpa/docs/current/reference/html/).

#### Utilització de QueryDSL

Una de les funcionalitats proposades és la d'utilitzar QueryDSL per a realitzar cerques segons filtres dinàmics, amb paginació i/o ordenació.

El GenericRepository proporciona el següent mètode:

```
Page<T> findAll(Predicate predicate, Pageable pageable);
```

Aquest mètode espera un objecte org.springframework.data.domain.Pageable que conté el número de pàgina (la primera pàgina és la 0), el nombre d'elements per pàgina, la direcció d'ordenació, el camp d'ordenació. I un objecte Predicate amb la query a realitzar que es construeix de la següent manera:

Primer de tot el filtre ha de ser un String amb el següent patró:

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

#### Projecció de resultats

Amb QueryDSL també es poden realitzar cerques que en comptes de retornar l'objecte sencer, retorni només determinats camps de l'objecte desitjat, els camps no seleccionats els retorna amb valor null<br>

Per a utilitzar les projeccions el GenericRepository proporciona el següent mètode:
```
Page<T> findAll(FactoryExpression<T> factoryExpression, Predicate predicate, Pageable pageable);
```

El codi següent retorna una llista dels objectes Equipaments amb nom INDOORKARTING, però aquests objectes només tindran el camp nom.

```
String search = "nom:INDOORKARTING";
		
Pageable pageable = new PageRequest(0, 5, Sort.Direction.DESC, "nom");
GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<Equipament>(Equipament.class, "equipament");
builder.populateSearchCriteria(search);
		
QEquipament qequipament = QEquipament.equipament;
	
Page<Equipament> page = repository.findAll(Projections.bean(Equipament.class, qequipament.nom ), builder.build(), pageable);
```

Més informació a la documentació oficial de [QueryDSL](http://www.querydsl.com/static/querydsl/latest/reference/html/).

#### Batch Inserts/Update

La classe GenericRepository també proporciona un mètode per a realitzar inserts/updates de forma massiva amb un rendiment òptim:

	public <S extends T> List<S> bulkSave(Iterable<S> entities);
	
Es pot veure un exemple de com utilitzar aquesta classe al següent [howto] (/drafts/2017-03-Howto-SaveBatch-Canigo32)
### Exemple 
	
Per exemple a l'aplicació inicial que genera el plugin de Canigó es generen els següents fitxers:

**Equipament.java**

Ubicació: <PROJECT_ROOT>/src/main/java/cat/gencat/test/model/Equipament.java
```
package cat.gencat.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "equipaments")
public class Equipament {

	private Long id;
	private String nom;
	private String municipi;

	public Equipament() {
		
	}
	
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

Ubicació: <PROJECT_ROOT>/src/main/java/cat/gencat/test/repository/EquipamentRepository.java
```
package cat.gencat.test.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.FactoryExpression;
import com.querydsl.core.types.Predicate;

import cat.gencat.test.model.Equipament;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EquipamentRepository extends GenericRepository<Equipament, Long> {

	Page<Equipament> findAll(Predicate predicate, Pageable pageable);
	
	Page<Equipament> findAll(FactoryExpression<Equipament> factoryExpression, Predicate predicate, Pageable pageable);
	
    List<Equipament> findDistinctByNomOrMunicipi(String nom, String municipi);
	List<Equipament> findByNomIgnoreCase(String nom);
	List<Equipament> findByMunicipiOrderByNomDesc(String municipi);
}
```

**EquipamentService**

Ubicació: <PROJECT_ROOT>/src/main/java/cat/gencat/test/service/EquipamentService.java
```
package cat.gencat.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Projections;

import cat.gencat.ctti.canigo.arch.persistence.jpa.querydsl.GenericPredicateBuilder;
import cat.gencat.test.model.Equipament;
import cat.gencat.test.model.QEquipament;
import cat.gencat.test.repository.EquipamentRepository;

@Service("equipamentService")
@Lazy
public class EquipamentService {

	@Autowired
	private EquipamentRepository repository;
	
	public List<Equipament> findAll() {
		return repository.findAll();
	}

	public Page<Equipament> findPaginated(Pageable pageable, String filter) {
		
		GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<Equipament>(Equipament.class, "equipament");
		builder.populateSearchCriteria(filter);
		
		return repository.findAll(builder.build(), pageable);
	}
	
	public Page<Equipament> findPaginatedProjeccio(Pageable pageable, String filter) {
		
		GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<Equipament>(Equipament.class, "equipament");
		builder.populateSearchCriteria(filter);
		
	    QEquipament qequipament = QEquipament.equipament;
	    
	    return repository.findAll(Projections.bean(Equipament.class, qequipament.nom ), builder.build(), pageable);
	}

	public Equipament getEquipament(Long equipamentId) {
		return repository.findOne(equipamentId);
	}

	public Long saveEquipament(Equipament equipament) {
		repository.save(equipament);

		return equipament.getId();
	}

	public void updateEquipament(Equipament equipament) {
		repository.save(equipament);
	}

	public void deleteEquipament(Long equipamentId) {
		Equipament equipament = new Equipament(equipamentId);
		repository.delete(equipament);
	}

}
```

### Test

Per executar els tests del mòdul jpa al executar els test de l'aplicació és necessari incorporar la dependencia test-jar del mòdul en el pom:
```
...
		<dependency>
		   <groupId>cat.gencat.ctti</groupId>
		   <artifactId>canigo.persistence.jpa</artifactId>
		   <type>test-jar</type>
		   <version>${canigo.persistence.jpa.version}</version>
		   <scope>test</scope>
		   <classifier>tests</classifier>
		</dependency>
...
```

**persistence.xml**

Ubicació: <PROJECT_ROOT>/src/test/resources/config/persistence/persistence.xml
És necessari afegir les entitats del mòdul jpa i les entitats de l'aplicació al fitxer persistence.xml:

```
<persistence xmlns="http://java.sun.com/xml/ns/persistence"	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"
	version="1.0">

	<persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL">
		<class>cat.gencat.test.model.Equipament</class>  
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.repository.Person</class> 
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.dao.Account</class>
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson</class>
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonb</class>
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonbNode</class>
		<class>cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson</class>
	</persistence-unit>

</persistence>
```

On:
- cat.gencat.test.model.Equipament és l'entitat de l'aplicació
- cat.gencat.ctti.canigo.arch.persistence.jpa.* son les entitats del mòdul jpa

Amb aquests canvis s'executaran els test del mòdul al executar els tests de l'aplicació

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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@TypeDefs({ @TypeDef(name = "json", typeClass = JsonStringType.class),
		@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
		@TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class), })
@Entity(name = "MyCustomer")
@Table(name = "customer")
public class MyCustomer {

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
