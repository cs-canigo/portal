+++
date        = "2018-10-16T12:04:16+01:00"
title       = "HowTo Suport a tipus de dades JSON al mòdul de persistència de Canigó"
description = "Aquest howTo descriu com utilitzar el tipus de dada JSON existent a PostgreSQL i MySql amb JPA"
sections    = "Canigó. Documentació versió 3.x"
weight      = 8
+++

## A qui va dirigit

Aquest Howto va dirigit a perfils tècnics que vulguin utilitzar el tipus de columna JSON a bases de dades PostgreSQL i MySQL mitjançant JPA i Hibernate com a proveïdor

## Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.6 del Framework Canigó

## Introducció

Al Setembre del 2018 s’ha publicat la versió 3.2.6 del Framework Canigó. En aquesta 3.2.6 s'incorpora el suport a bases de dades PostgreSQL. A partir dels seus dialectes, Hibernate dona suport a tipus de columnes JSON a PostgreSQL i MySQL, però al no ser un estàndard per a totes les bases de dades relacionals, per aquest tipus de columna, Hibernate no proporciona una implementació pel mapeig entre els objectes Java i la base de dades.

L’objectiu d’aquest Howto és mostrar els procediments necessaris per a poder utilitzar els tipus de columna JSON amb PostgreSQL i MySQL utilitzant Hibernate i JPA.

## Dialectes hibernate

### PostgreSQL

Si s'utilitza una base de dades de tipus PostgreSQL, el mòdul "canigo.persistence.jpa" a partir d'Hibernate proporciona els següents dialectes:

- org.hibernate.dialect.PostgreSQL82Dialect mateix que org.hibernate.dialect.PostgreSQLDialect
- org.hibernate.dialect.PostgreSQL9Dialect: BD Postgres 9 amb suport a "if exists" quan s'eliminen constraints
- org.hibernate.dialect.PostgreSQL92Dialect: BD Postgres 9.2 amb suport a JSON data type
- org.hibernate.dialect.PostgreSQL94Dialect: BD Postgres 9.4 amb suport a funcions de dates i temps

Les versions més noves incorporen les funcionalitats de les versions anteriors.

Així, si es vol utilitzar un tipus de columna JSON, la versió de PostgreSQL ha de ser a igual o superior a 9.2 i utilitzar com a mínim el dialecte org.hibernate.dialect.PostgreSQL92Dialect

### MySql

Si s'útilitza una bd de tipus MySql, el mòdul canigo.persistence.jpa a partir de hiberntate proporciona els següents dialectes:

- org.hibernate.dialect.MySQLDialect: Per versions de la bd inferiors a 5
- org.hibernate.dialect.MySQL5Dialect: Per versions de la bd 5.x
- org.hibernate.dialect.MySQL5InnoDBDialec: Per versions de la bd 5.x amb InnoDB
- org.hibernate.dialect.MySQL57InnoDBDialect: Per versions de la bd 5.x amb InnoDB amb suport a fractal seconds precision (fsp)

Les versions més noves incorporen les funcionalitats de les versions anteriors.

Així, si es vol utilitzar un tipus de columna JSON, la versió de MySql ha de ser igual o superior a 5.7 i utilitzar com a mínim el dialecte org.hibernate.dialect.MySQL5Dialect

## Hibernate JSON type

El mòdul canigo.persistence.jpa, a partir de la versió 1.3.1, proporciona una implementació pel mapeig entre els objectes Java i la base de dades mitjançant Hibernate. Els tipus són:

- **cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonStringType**: Per a tipus de columna JSON de tipus text 
- **cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonBinaryType**: Per a tipus de columna JSON de tipus binari 
- **cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonNodeBinaryType**: Per a tipus de columna JSON de tipus binari emmagatzemant JSON Node

Aquests, realitzen el binding d'informació entre la base de dades i els objectes Java a partir de [Jackson](https://github.com/FasterXML/jackson).

## Carregar Hibernate JSON type

### Postgres

PostgreSQL a partir de la versió 9.2 dona suport als tipus:

- json
- jsonb

Aquests tipus són emmagatzemats amb binari per tant serà necessari utilitzar:

- cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonBinaryType
- cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonNodeBinaryType

### MySQL

MySQL a partir de la versió 5.7 dona suport als tipus:

- json

Aquests tipus són emmagatzemats amb text per tant serà necessari utilitzar:

- cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonStringType

Perquè hibernate carregui aquests tipus de mapeig es necessari utilitzar @TypeDefs, així per exemple si tenim una classe base comuna podem tenir per exemple:

```
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonBinaryType;
import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonNodeBinaryType;
import cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json.JsonStringType;

@TypeDefs({ @TypeDef(name = "json", typeClass = JsonStringType.class),
		@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
		@TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class), })
@MappedSuperclass
public class BaseEntity {

	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "increment")
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
```

## Exemple utilització hibernate JSON type

Per l'exemple utilitzarem l'entitat Event que emmagatzema una entitat Location amb la informació de la country i la city
Per l'entitat Location utilitzarem:
```
import java.io.Serializable;

public class Location implements Serializable {

    private String country;

    private String city;

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
```

### PostgreSQL

Necessitem crear la taula Event:

- Si la columna es de tipus json:
```
CREATE TABLE "event" (
	ID serial PRIMARY KEY,
	"location" json NOT NULL
);
```

- Si la columna es de tipus jsonb:
```
CREATE TABLE "event" (
	ID serial PRIMARY KEY,
	"location" jsonb NOT NULL
);
```

Així tindrem les entitats:

- Si la columna és de tipus json i volem emmagatzemar l'objecte Location utilitzarem @Column(columnDefinition = "json") amb @Type(type = "jsonb"):
```
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity(name = "EventJson")
@Table(name = "event")
public class EventJson extends BaseEntity {

    @Type(type = "jsonb")
    @Column(columnDefinition = "json")
    private Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
```

- Si la columna és de tipus jsonb i volem emmagatzemar l'objecte Location utilitzarem @Column(columnDefinition = "jsonb") amb @Type(type = "jsonb"):

```
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity(name = "EventJsonb")
@Table(name = "event")
public class EventJsonb extends BaseEntity {

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    @Basic( fetch = FetchType.LAZY )
    private Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
```

- Si la columna és de tipus jsonb i volem emmagatzemar un objecte JsonNode utilitzarem @Column(columnDefinition = "jsonb") amb @Type(type = "jsonb-node"):

```
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.JsonNode;

@Entity(name = "EventJsonbNode")
@Table(name = "event")
public class EventJsonbNode extends BaseEntity {

	@Type(type = "jsonb-node")
	@Column(columnDefinition = "jsonb")
	private JsonNode location;

    public JsonNode getLocation() {
        return location;
    }

    public void setLocation(JsonNode location) {
        this.location = location;
    }
}
```

Amb els repositoris:

```

import java.util.List;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;

public interface EventJsonBaseRepositoryCustom {

	public List<EventJson> findCountryEvents(String country);
	
}
```

```
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonbNode;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EventJsonbNodeRepository extends GenericRepository<EventJsonbNode, Long>, EventJsonbNodeRepositoryCustom {

}

```

```
public interface EventJsonbNodeRepositoryCustom extends EventJsonBaseRepositoryCustom {

}
```

```
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonb;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EventJsonbRepository extends GenericRepository<EventJsonb, Long>, EventJsonbRepositoryCustom {

}
```

```
public interface EventJsonbRepositoryCustom extends EventJsonBaseRepositoryCustom {

}
```

```
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EventJsonRepository extends GenericRepository<EventJson, Long>, EventJsonRepositoryCustom {

}
```

```
public interface EventJsonRepositoryCustom extends EventJsonBaseRepositoryCustom {

}
```

I les implementacions dels respositoris:

```
import java.util.List;

import org.springframework.data.jpa.repository.support.QueryDslRepositorySupport;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonBaseRepositoryCustom;

public abstract class EventJsonBaseRepositoryImpl extends QueryDslRepositorySupport implements EventJsonBaseRepositoryCustom {

	public EventJsonBaseRepositoryImpl(Class<?> domainClass) {
		super(domainClass);
	}

	@Override
	public List<EventJson> findCountryEvents(String country) {
		return getEntityManager()
				.createNativeQuery("SELECT id, location FROM event WHERE location->> 'country' = :country", EventJson.class)
				.setParameter("country", country).getResultList();
	}
	
}
```

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonbNode;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbNodeRepository;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbNodeRepositoryCustom;

public class EventJsonbNodeRepositoryImpl extends EventJsonBaseRepositoryImpl implements EventJsonbNodeRepositoryCustom {

	@Autowired
	@Lazy
	private EventJsonbNodeRepository eventRepository;

	public EventJsonbNodeRepositoryImpl() {
		super(EventJsonbNode.class);
	}

}
```

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonb;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbRepository;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbRepositoryCustom;

public class EventJsonbRepositoryImpl extends EventJsonBaseRepositoryImpl implements EventJsonbRepositoryCustom {

	@Autowired
	@Lazy
	private EventJsonbRepository eventRepository;

	public EventJsonbRepositoryImpl() {
		super(EventJsonb.class);
	}

}
```

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonRepository;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonRepositoryCustom;

public class EventJsonRepositoryImpl extends EventJsonBaseRepositoryImpl implements EventJsonRepositoryCustom {

	@Autowired
	@Lazy
	private EventJsonRepository eventRepository;

	public EventJsonRepositoryImpl() {
		super(EventJson.class);
	}

}
```

Per a implementar la funció "findCountryEvents" utilitzarem la query nativa:
```
SELECT id, location FROM event WHERE location->> 'country' = :country
```
On :country serà el valor dinàmic passat per paràmetre

### MySQL

Necessitem crear la taula Event:
```
CREATE TABLE event (
	ID bigint PRIMARY KEY,
	location json NOT NULL
);
```
Així tindrem la entitat:

```
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.BaseEntity;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.Location;

@Entity(name = "EventJson")
@Table(name = "event")
public class EventJson extends BaseEntity {

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
```

Amb els repositoris:

```
import java.util.List;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson;

public interface EventJsonBaseRepositoryCustom {

	public List<EventJson> findCountryEvents(String country);
	
}
```

```
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository;

public interface EventJsonRepository extends GenericRepository<EventJson, Long>, EventJsonRepositoryCustom {

}
```

```
public interface EventJsonRepositoryCustom extends EventJsonBaseRepositoryCustom {

}
```

I les implementacions dels respositoris:

```
import java.util.List;

import org.springframework.data.jpa.repository.support.QueryDslRepositorySupport;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.mysql.EventJsonBaseRepositoryCustom;

public abstract class EventJsonBaseRepositoryImpl extends QueryDslRepositorySupport implements EventJsonBaseRepositoryCustom {

	public EventJsonBaseRepositoryImpl(Class<?> domainClass) {
		super(domainClass);
	}

	@Override
	public List<EventJson> findCountryEvents(String country) {
		return getEntityManager()
				.createNativeQuery("SELECT id, location FROM event WHERE JSON_EXTRACT(location, \"$.country\") = :country", EventJson.class)
				.setParameter("country", country).getResultList();
	}
	
}
```

```
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.mysql.EventJsonRepository;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.mysql.EventJsonRepositoryCustom;

public class EventJsonRepositoryImpl extends EventJsonBaseRepositoryImpl implements EventJsonRepositoryCustom {

	@Autowired
	@Lazy
	private EventJsonRepository eventRepository;

	public EventJsonRepositoryImpl() {
		super(EventJson.class);
	}

}
```
Per a implementar la funció "findCountryEvents" utilitzarem la query nativa:

```
SELECT id, location FROM event WHERE JSON_EXTRACT(location, \"$.country\") = :country
```

On :country serà el valor dinàmic passat per paràmetre

## Test utilització hibernate JSON type

Els tipus de bd JSON no estan suportats per la bd H2, per tant els test s'han d'executar atacant a una bd real

### PostgreSQL

Per provar els repositoris tindrem els tests:

```
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.fasterxml.jackson.databind.JsonNode;

import cat.gencat.ctti.canigo.arch.core.utils.JacksonUtil;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonbNode;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbNodeRepository;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring/canigo-core.xml"})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EventJsonbNodeRepositoryTest {
	
	@Autowired
	private EventJsonbNodeRepository repository;

	@Before
	public void settingUp(){
		Assert.assertNotNull(repository);
		repository.deleteAll();
	}

	@Test
	public void test1CRUDOperations(){

		//Test if table is empty
		Assert.assertTrue(repository.findAll().isEmpty());
		
		//Test save
		JsonNode location = JacksonUtil.toJsonNode(
                "{" +
                "   \"country\": \"Romania\"," +
                "   \"city\": \"Cluj-Napoca\"" +
                "}"
            );
		
        EventJsonbNode event = new EventJsonbNode();
        event.setLocation(location);
		repository.save(event);

		//Test insert and recover
		EventJsonbNode event2 = new EventJsonbNode();
		event2.setLocation(location);
		repository.save(event2);
		EventJsonbNode event3 = repository.findOne(event2.getId());
		Assert.assertEquals(event3.getId(), event2.getId());
		Assert.assertEquals(event3.getLocation().get("country").asText(), location.get("country").asText());
		Assert.assertEquals(event3.getLocation().get("city").asText(), location.get("city").asText());
		
		//Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
		
	}
	
	
	@Test
	public void testCountryEvents() {
		JsonNode location = JacksonUtil.toJsonNode(
                "{" +
                "   \"country\": \"Romania\"," +
                "   \"city\": \"Cluj-Napoca\"" +
                "}"
            );
		
        EventJsonbNode event = new EventJsonbNode();
        event.setLocation(location);
		repository.save(event);
		
		List<EventJson> eventJsonList = repository.findCountryEvents(location.get("country").asText());
		for (EventJson event3 : eventJsonList) {
			Assert.assertEquals(event3.getLocation().getCountry(), location.get("country").asText());
		}

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
	}
	
}
```

```
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.Location;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJsonb;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonbRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring/canigo-core.xml"})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EventJsonbRepositoryTest {
	
	@Autowired
	private EventJsonbRepository repository;

	@Before
	public void settingUp(){
		Assert.assertNotNull(repository);
		repository.deleteAll();
	}

	@Test
	public void test1CRUDOperations(){

		//Test if table is empty
		Assert.assertTrue(repository.findAll().isEmpty());
		
		//Test save
        Location location = new Location();
        location.setCountry("Romania");
        location.setCity("Cluj-Napoca");

        EventJsonb event = new EventJsonb();
        event.setLocation(location);
		repository.save(event);

		//Test insert and recover
		EventJsonb event2 = new EventJsonb();
		event2.setLocation(location);
		repository.save(event2);
		EventJsonb event3 = repository.findOne(event2.getId());
		Assert.assertEquals(event3.getId(), event2.getId());
		Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		Assert.assertEquals(event3.getLocation().getCity(), location.getCity());
		
		//Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
		
	}
	
	@Test
	public void testCountryEvents() {
		Location location = new Location();
		location.setCountry("Romania");
		location.setCity("Cluj-Napoca");

		EventJsonb event = new EventJsonb();
		event.setLocation(location);
		repository.save(event);
		
		List<EventJson> eventJsonList = repository.findCountryEvents(location.getCountry());
		for (EventJson event3 : eventJsonList) {
			Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		}

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
	}
	
}
```

```
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.Location;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.postgres.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.postgres.EventJsonRepository;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/canigo-core.xml" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EventJsonRepositoryTest {

	@Autowired
	private EventJsonRepository repository;

	@Before
	public void settingUp() {
		Assert.assertNotNull(repository);
		repository.deleteAll();
	}

	@Test
	public void test1CRUDOperations() {

		// Test if table is empty
		Assert.assertTrue(repository.findAll().isEmpty());

		// Test save
		Location location = new Location();
		location.setCountry("Romania");
		location.setCity("Cluj-Napoca");

		EventJson event = new EventJson();
		event.setLocation(location);
		repository.save(event);

		// Test insert and recover
		EventJson event2 = new EventJson();
		event2.setLocation(location);
		repository.save(event2);
		EventJson event3 = repository.findOne(event2.getId());
		Assert.assertEquals(event3.getId(), event2.getId());
		Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		Assert.assertEquals(event3.getLocation().getCity(), location.getCity());

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());

	}

	@Test
	public void testCountryEvents() {
		Location location = new Location();
		location.setCountry("Romania");
		location.setCity("Cluj-Napoca");

		EventJson event = new EventJson();
		event.setLocation(location);
		repository.save(event);
		
		List<EventJson> eventJsonList = repository.findCountryEvents(location.getCountry());
		for (EventJson event3 : eventJsonList) {
			Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		}

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
	}

}
```

ATENCIÓ: Per executar aquests tests és necessari atacar a una bd PostgreSQL real

### MySQL

Per provar els repositoris tindrem el test:
```
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.Location;
import cat.gencat.ctti.canigo.arch.persistence.jpa.model.json.mysql.EventJson;
import cat.gencat.ctti.canigo.arch.persistence.jpa.repository.json.mysql.EventJsonRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/canigo-core.xml" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EventJsonRepositoryTest {

	@Autowired
	private EventJsonRepository repository;

	@Before
	public void settingUp() {
		Assert.assertNotNull(repository);
		repository.deleteAll();
	}

	@Test
	public void test1CRUDOperations() {

		// Test if table is empty
		Assert.assertTrue(repository.findAll().isEmpty());

		// Test save
		Location location = new Location();
		location.setCountry("Romania");
		location.setCity("Cluj-Napoca");

		EventJson event = new EventJson();
		event.setLocation(location);
		repository.save(event);

		// Test insert and recover
		EventJson event2 = new EventJson();
		event2.setLocation(location);
		repository.save(event2);
		EventJson event3 = repository.findOne(event2.getId());
		Assert.assertEquals(event3.getId(), event2.getId());
		Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		Assert.assertEquals(event3.getLocation().getCity(), location.getCity());

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());

	}

	@Test
	public void testCountryEvents() {
		Location location = new Location();
		location.setCountry("Romania");
		location.setCity("Cluj-Napoca");

		EventJson event = new EventJson();
		event.setLocation(location);
		repository.save(event);
		
		List<EventJson> eventJsonList = repository.findCountryEvents(location.getCountry());
		for (EventJson event3 : eventJsonList) {
			Assert.assertEquals(event3.getLocation().getCountry(), location.getCountry());
		}

		// Test delete all
		repository.deleteAll();
		Assert.assertTrue(repository.findAll().isEmpty());
	}

}
```

ATENCIÓ: Per executar aquests tests és necessari atacar a una bd MySQL real
