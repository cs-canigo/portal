+++
date        = "2015-03-27T09:26:16+01:00"
title       = "JPA"
description = "Mòdul de persistència de Base de Dades."
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Propòsit

Aquest mòdul proporciona accés amb transaccionalitat amb la base de dades, permetent la execució d'operacions dintre de transaccions.

## Instal·lació i Configuració

### Instal·lació

Per tal d'instal·lar el mòdul d'hibernate fitxers es pot incloure automàticament a través de l'eina de suport al desenvolupament o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.persistence.jpa.version>[1.2.0,1.3.0)</canigo.persistence.jpa.version>

<dependency>
 <groupId>cat.gencat.ctti</groupId>
 <artifactId>canigo.persistence.jpa</artifactId>
 <version>${canigo.persistence.jpa.version}</version>
</dependency>
```

Al pom.xml també s'ha d'afegir el plugin que genera les classes per als filtres de QueryDSL:
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
		...
	</plugins>
	...
</build>	
```
### Configuració

La configuració es realitza automàticament a partir de l'eina de suport al desenvolupament(plugin de Canigó per a Eclipse)

En cas que no es generi automàticament el codi, s'ha de realitzar manualment la següent configuració:

**jpa.properties**

Ubicació proposada: <PROJECT_ROOT>/src/main/resources/config/props/jpa.properties

Propietat | Requerit | Descripció
--------- | -------- | ----------
*.persistence.database | Si | Sistema de base de dades al que es conectarà.
*.persistence.dialect | Si | El nom de classe que permet a JPA generar SQL per a una base de dades relacional en particular: <br> - org.hibernate.dialect.Oracle9Dialect <-- Versió 9<br> - org.hibernate.dialect.Oracle10gDialect <-- Versió 10g<br> - org.hibernate.dialect.Oracle8iDialect <-- Versió 8i<br> - org.hibernate.dialect.MySQL5Dialect <-- Versió 5<br> - org.hibernate.dialect.MySQLDialect <-- Versions < 5<br> - org.hibernate.dialect.HSQLDialect<br> - org.hibernate.dialect.PostgreSQLDialect
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

#### Construcció de queries automàtiques

A un repositori es poden definir mètodes per cada query desitjada.

La construcció utilitza els prefixos find...By, read...By, query...By, count...By i get...By. El mètode pot incoporar la paraula Distinct, concatenar propietats amb And i Or o descriptors com OrderBy o IgnoreCase.

Exemples
```
    List<Equipament> findDistinctByNomOrMunicipi(String nom, String municipi);
	List<Equipament> findByNomIgnoreCase(String nom);
	List<Equipament> findByMunicipiOrderByNomDesc(String municipi);
```

Més informació a la documentació oficial de [Spring Data JPA](http://docs.spring.io/spring-data/jpa/docs/current/reference/html/).

#### Utilització de QueryDSL

Una de les funcionalitats proposades és la d'utilitzar QueryDSL per a realitzar cerques segons un filtre, amb paginació i ordenació.

Per a utilitzar-la s'ha d'afegir el mètode següent al repository creat.

```
Page<T> findAll(Predicate predicate, Pageable pageable);
```

Aquest mètode espera un objecte org.springframework.data.domain.Pageable que conté el núm. de pàgina (la primera pàgina és la 0), el nombre d'elements per pàgina, la direcció d'ordenació, el camp d'ordenació.
I un objecte Predicate amb la query a realitzar que es construeix de la següent manera:

Primer de tot el filtre ha de ser un String amb el següent patró:

**field1Operador1Valor1,field2Operador2Valor2,fieldNOperadorNValorN**

On field és el nom d'una propietat de l'entitat (per exemple id)<br>
On Operador és un dels tipus d'operador suportats:

Operador | Descripció
--------- | --------
> | major que
>: | major o igual que
< | menor que
<: | menor o igual que
<> | diferent de
: | igual que

On valor és el valor amb el qual es vol comparar.

Per a cercar l'entitat que tingui id major que 15 i amb nom igual a 'Prova' el filtre hauria de ser:<br>
id>15,nom:Prova

#### Projecció de resultats

Amb QueryDSL també es pot realitzar cerques que en comptes de retornar l'objecte senser, retorni només una part de l'objecte desitjat.<br>

Per a utilitzar les projeccions al vostre repository heu d'afegir el mètode:
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
