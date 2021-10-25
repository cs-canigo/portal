+++
date        = "2021-10-22"
title       = "Actualització Canigó 3.4 a Canigó 3.6"
description = "Com realitzar l'actualització d'una aplicació de Canigó 3.4 a Canigó 3.6"
section     = "howtos"
categories  = ["canigo"]
key         = "DECEMBRE2021"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin fer l'actualització a Canigó 3.6 de la seva aplicació Canigó 3.6.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.6 del Framework Canigó.

### Introducció

El mes de Novembre del 2021 s'ha publicat la versió 3.6 del Framework Canigó. Aquesta versió és una [versió LTS](/canigo/roadmap), i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de tenir un suport continuat així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquest Howto és mostrar els procediments necessaris per a realitzar l'actualització d'una aplicació realitzada amb Canigó 3.4. El punt de partida d'aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse.

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) es poden veure les versions dels mòduls i components de Canigó de les versions 3.4.x i 3.6.x. S'han d'actualitzar els intervals dels mòduls utilitzats per a migrar a Canigó 3.6.

La versió parent de Spring Boot és la 2.5.4, per tant, per una aplicació amb Spring Boot el parent quedaria:

```	
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.5.4</version>
	</parent>
```

### Passos a realitzar 

Després de canviar les versions dels mòduls decrits a la secció anterior, és necessari realitzar els següents canvis:

**1.** Canviar la constant `MediaType.APPLICATION_JSON_UTF8_VALUE` per `MediaType.APPLICATION_JSON_VALUE`

**2.** Els clients dels mòduls d'integració amb Web Service Soap s'han generat amb `CXF` i la transformació de objectes java a xml i al revés es realitza amb `JAXB`, aquest canvi té les següents implicacions:


**-** Tots els objectes generats són objectes separats, continguts dins de package i no com a subclasses, per exemple, de 
  
```
net.gencat.scsp.esquemes.avisos.smsResponse.SMSResponseDocument.SMSResponse
```
  
a:
  
```
net.gencat.scsp.esquemes.avisos.smsresponse.SMSResponse
```
  
**-** Nom de pacakge seguint la convenció de noms de package correcte, així els noms dels package són tots en minúscules, per exemple, de
  
```
net.gencat.scsp.esquemes.avisos.smsResponse.SMSResponseDocument.SMSResponse
```
  
a: 
 
```
net.gencat.scsp.esquemes.avisos.smsresponse.SMSResponse
```

**-** Modificació de la forma de crear els objectes java dels clients dels web service utilitzant sempre el `ObjectFactory` de cada pacakge, per exemple, de:

```
SMSRequest sms = SMSRequestDocument.Factory.newInstance().addNewSMSRequest();
```

a:

```
SMSRequest sms = new net.gencat.scsp.esquemes.avisos.smsrequest.ObjectFactory().createSMSRequest();
```

**-** Modificació de la forma de parseig del xml a objectes java, utilitzant `unmarshall`, per exemple, de:

```
SMSResponse docUuid = SMSResponseDocument.Factory.parse(nodeResposta).getSMSResponse();
```

a:

```
SMSResponse docUuid = (SMSResponse) JAXBContext.newInstance(SMSResponse.class).createUnmarshaller().unmarshal(nodeResposta);
```

**3.** Estàndarització dels noms dels package dels mòduls que no complien els estàndards, així de `cat.gencat.ctti.canigo.arch.support.resizeImg`, passa a ser: `cat.gencat.ctti.canigo.arch.support.resizeimg`

**4.** En el mòdul `canigo.integration.sarcat.planificat` s'han organitzat els objectes que contenien ja que estaven sense organitzar, és necessari reimportar els objectes

**5.** Els mètodes `findAll` de `GenericRepository` que utilitzin predicate, aquest no pot ser null, si el predicate és null, s'ha d'utilitzar el mètode `findAll` sense el predicate, per exemple de:

```
return repository.findAll(predicate, pageable)
```

a:

```
return predicate != null ? repository.findAll(predicate, pageable) : repository.findAll(pageable);
```

**6.** Per configurar la connexió amb Mongodb s'utilitza `MongoClientSettings` enlloc de `MongoClientOptions`, per exemple per configurar la connexió per defecte, de:

```
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
	 *
	 * @return mongo equipament listener
	 */
	@Bean
	public MongoEquipamentListener mongoEquipamentListener() {
		return new MongoEquipamentListener();
	}

	/**
	 * Mongo options.
	 *
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

a:

```
public class EquipamentMongoConfig extends MongoCoreConfig {

  /**
   * Inicialitza equipament mongo config.
   */
  public EquipamentMongoConfig() {
    super(MongoClientSettings.builder().build());
  }

  /**
   * Mongo equipament listener.
   *
   * @return mongo equipament listener
   */
  @Bean
  public MongoEquipamentListener mongoEquipamentListener() {
    return new MongoEquipamentListener();
  }

}
```

**7.** Eliminació de funcions `findAll` deprecades a `MongoGenericRepository`

**8.** Eliminació de `CanigoDBObjectMongodbSerializer`, és necessari utilitzar directament `SpringDataMongodbSerializer`

**9.** Modificació de la forma de contruir els objectes de JPA, utilitzant els mètodes estàtics, per exemple de:

```
new PageRequest(page - 1, rpp, getOrdenacio(sort))
```

a:

```
PageRequest.of(page - 1, rpp, getOrdenacio(sort))
```

de:

```
new Sort(orders)
```

a:

```
Sort.by(orders)
```

**10.** Per defecte no ve cap `HttpFirewall` configurat a Spring Security, per definir-ne un per defecte:

```
  @Bean
  protected HttpFirewall httpFirewall() {
    DefaultHttpFirewall firewall = new DefaultHttpFirewall();
    firewall.setAllowUrlEncodedSlash(true);
    return firewall;
  }
```

Podeu obtenir més informació sobre `HttpFirewall` a:

https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/firewall/HttpFirewall.html

**11.** Es necessari utilitzar l'última versió del schema del xsd de Spring Security, per exemple de:

```
http://www.springframework.org/schema/security/spring-security-4.2.xsd
```

a:

```
http://www.springframework.org/schema/security/spring-security-5.4.xsd
```

**12.** Si s'utilitza `WebMvcConfigurer` ja no es necessari extendre de `WebMvcConfigurerAdapter`, ja es pot implementar directament, per tant de:

```
public class WebConfig extends WebMvcConfigurerAdapter
```

a:

```
public class WebConfig implements WebMvcConfigurer
```

**13.** El mètode `getNumRegistre` del mòdul `canigo.integration.sarcat` ha canviat a `getNumsRegistre` per seguir amb el nom de la funció de SARCAT

**14.** S'ha eliminat la pàgina customitzada per l'exposició dels serveis amb Swagger `/canigo-api.html`. És necessari utilitzar la pàgina pròpia de Swagger a `/api/swagger-ui.html`
