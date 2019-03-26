+++
date        = "2019-03-18"
title       = "Utilització de mongo reactiu"
description = "Com configurar aplicació Canigó 3.4 per utilitzar mongo reactiu"
section     = "howtos"
categories  = ["canigo"]
key         = "ABRIL2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin utilitzar les funcionalitats de reactiu en una base de dades Mongodb

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.4 del Framework Canigó

### Introducció

El mes de Març del 2019 s'ha publicat la versió 3.4 del Framework Canigó. Aquesta versió incorpora la possibilitat d'utilitzar les funcionalitats de reactiu en una base de dades Mongodb

Per a passar una aplicació 3.3 a 3.4 hi ha disponible la següent guia ["Actualització Canigó 3.3 a Canigó 3.4"](/howtos/2019-03-Howto-Actualitzacio_Canigo3_3_Canigo3_4)

L'objectiu d'aquest Howto és mostrar els procediments necessaris poder utilitzar les funcionalitats de reactiu en una base de dades Mongodb. El punt de partida d'aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse i actualitzada a la versió 3.4.0 de Canigó.


### Introducció programació reactiu

En termes simples, la programació reactiva tracta d'aplicacions no bloquejadores que són asíncrones i orientades a esdeveniments i requereixen un nombre reduït de fils per escalar. Un aspecte clau d'aquesta definició és el concepte de contrapressió, que és un mecanisme per garantir que els productors no aclaparen els consumidors. Per exemple, en una pipeline de components reactius que s'estén des de la base de dades fins al socket HTTP, quan el client HTTP és lent, el repositori de dades es ralentitza o s’atura fins que la capacitat s’alliberi

Canigó 3.4 té com a base Spring Framework 5 que aporta funcionalitats amb streams reactius utilitzant el projecte Reactor

Per a més informació:

[Reactive Stream](http://www.reactive-streams.org/)

[Reactor](https://projectreactor.io/)

[Spring Framework reactive](https://docs.spring.io/spring-framework/docs/5.0.0.M1/spring-framework-reference/html/web-reactive.html)

[Notes on Reactive Programming](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape)


### Introducció cas d'exemple

Per il·lustrar aquesta guia utilitzarem un repositori de dades on hi contindrà missatges homòlegs a un tweet, on tindrà un id, un text i una data de creació

Pel repositori de dades utilitzarem una base de dades Mongodb i utilitzarem les funcionalitats de reactiu per accedir-hi

En l'exemple exposarem un CRUD de serveis rest sobre l'entitat tweet i exposarem 2 serveis rest de tipus stream per il·lustrar un efecte tipus timeline


### Exemple

Per l'exemple utilitzarem una base de dades Mongodb en local al port 27017 amb una base de dades amb nom "canigo_persistence_mongo"

Començarem per afegir les dependències a Canigó Mongodb, Spring Mongodb, reactiu, reactor i Mongodb per test

```xml
<canigo.persistence.mongodb.version>[2.0.0,2.1.0)</canigo.persistence.mongodb.version>
```

```xml
		<dependency>
			<groupId>cat.gencat.ctti</groupId>
			<artifactId>canigo.persistence.mongodb</artifactId>
			<version>${canigo.persistence.mongodb.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
			<exclusions>
				<exclusion>
					<artifactId>spring-boot-starter-logging</artifactId>
					<groupId>org.springframework.boot</groupId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>io.projectreactor</groupId>
			<artifactId>reactor-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>de.flapdoodle.embed</groupId>
			<artifactId>de.flapdoodle.embed.mongo</artifactId>
			<scope>test</scope>
		</dependency>
```

Afegirem la propietat per la connexió a Mongodb, utilitzarem el estàndard de connexió per String de connexió a Mongodb, recomanem utilitzar aquesta forma de connexió, per més informació podeu consultar: https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options
```properties
*.mongodb.uri=mongodb://127.0.0.1:27017/canigo_persistence_mongo?socketTimeoutMS=5000
```

Necessitem crear un configurador que extengui de *cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig* que crearà la connexió a la base de dades Mongodb a partir del String de connexió, un exemple de configurador podria ser:

```java
import org.springframework.context.annotation.Configuration;

import cat.gencat.ctti.canigo.arch.persistence.mongodb.config.ReactiveMongoCoreConfig;

@Configuration
public class ReactiveMongoConfig extends ReactiveMongoCoreConfig {


}
```

En aquest configurador hi podríem registrar els listeners que necessitéssim de Mongodb

Partim de l'entitat Tweet amb la definició:
```java
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "tweets")
public class Tweet {
    @Id
    private String id;

    @NotBlank
    @Size(max = 140)
    private String text;

    @NotNull
    private Date createdAt = new Date();

    public Tweet() {

    }

    public Tweet(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
```

Crearem el repository de l'entitat Tweet, utilitzarem les funcionalitats que aporta Spring per a repositoris reactius amb Mongo amb ReactiveMongoRepository

```java
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.stereotype.Repository;

import cat.gencat.ctti.model.Tweet;
import reactor.core.publisher.Flux;

@Repository
public interface TweetRepository extends ReactiveMongoRepository<Tweet, String> {
	
	@Tailable
	Flux<Tweet> findTweetsBy();

}
```

Hem definit un mètode de consulta de tweets de tipus "Tailable" per mantenir la connectivitat esperant a nous tweets

Per a utilitzar aquest mètode la collection de Mongo ha de ser de tipus capped. Si la collection és de tipus capped no es pot utilitzar la funcionalitat d'eliminació d'elements. Si s'utilitza tailable a una collection no capped o s'eliminen elements a una collection capped s'obtindrà un error. Per tenir un exemple complet exposarem un servei utilitzant tailable i un servei d'eliminació d'elements però en un cas real no podrien conviure a la mateixa collection

Per simplificar l'exemple utilitzarem directament el repositori al controller, recomanem, però, utilitzar la capa service entre els controllers i els repositoris

```java
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat.gencat.ctti.model.Tweet;
import cat.gencat.ctti.repository.TweetRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/tweets")
public class TweetController {

    @Autowired
    private TweetRepository tweetRepository;

    @GetMapping
    public Flux<Tweet> getAllTweets() {
        return tweetRepository.findAll();
    }

    @PostMapping
    public Mono<Tweet> createTweets(@Valid @RequestBody Tweet tweet) {
        return tweetRepository.save(tweet);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Tweet>> getTweetById(@PathVariable(value = "id") String tweetId) {
        return tweetRepository.findById(tweetId)
                .map(savedTweet -> ResponseEntity.ok(savedTweet))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Tweet>> updateTweet(@PathVariable(value = "id") String tweetId,
                                                   @Valid @RequestBody Tweet tweet) {
        return tweetRepository.findById(tweetId)
                .flatMap(existingTweet -> {
                    existingTweet.setText(tweet.getText());
                    return tweetRepository.save(existingTweet);
                })
                .map(updateTweet -> new ResponseEntity<>(updateTweet, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteTweet(@PathVariable(value = "id") String tweetId) {

        return tweetRepository.findById(tweetId)
                .flatMap(existingTweet ->
                        tweetRepository.delete(existingTweet)
                            .then(Mono.just(new ResponseEntity<Void>(HttpStatus.OK)))
                )
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Tweets are Sent to the client as Server Sent Events
    @GetMapping(value = "/event-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Tweet> eventStreamTweets() {
        return tweetRepository.findTweetsBy();
    }
    
    // Tweets are Sent to the client as stream json
    @GetMapping(path = "/stream-json", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<Tweet> streamJsonTweets() {
        return tweetRepository.findTweetsBy();
    }

}
```

En aquest controller exposem un CRUD de serveis rest sobre el path "/tweets" i dos serveis en stream: "/tweets/event-stream" per enviar tweets produint "text/event-stream" i "/tweets/stream-json" per enviar tweets produint "application/stream+json" per simular un efecte de tipus timeline

#### Test serveis rest

Per observar el comportament dels serveis amb streaming iniciarem l'aplicació amb Spring boot i utilitzarem un navegador amb la url:

```
http://localhost:8080/api/tweets/event-stream
```

i

```
http://localhost:8080/api/tweets/stream-json
```

Observarem que el navegador està esperant resposta del servidor

Enviarem un nou tweet, per exemple fent:
```
curl -X POST \
  http://localhost:8080/api/tweets \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hello, World!"}'
```

I observarem com en el navegador ha aparegut el nou tweet simulant l'efecte de timeline

#### Junit repositori reactiu

Per provar el respositori reactiu utilitzarem un Embeded Mongo

Crearem una configuració utilitzant el Embeded Mongo

```java
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "cat.gencat")
@EnableAutoConfiguration(exclude = { MongoAutoConfiguration.class })
@AutoConfigureAfter(EmbeddedMongoAutoConfiguration.class)
public class EmbeddedReactiveMongoConfig extends AbstractReactiveMongoConfiguration {

	private final Environment environment;

	public EmbeddedReactiveMongoConfig(Environment environment) {
		this.environment = environment;
	}

	@Override
	@Bean
	@DependsOn("embeddedMongoServer")
	public MongoClient reactiveMongoClient() {
		int port = environment.getProperty("local.mongo.port", Integer.class);
		return MongoClients.create(String.format("mongodb://localhost:%d", port));
	}

	@Override
	protected String getDatabaseName() {
		return "embedded-reactive-mongo";
	}

}
```

En un test de Junit podem utilitzar aquesta configuració enlloc que la de l'aplicació "ReactiveMongoConfig", per exemple:

```java
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cat.gencat.ctti.config.AppConfig;
import cat.gencat.ctti.config.EmbeddedReactiveMongoConfig;
import cat.gencat.ctti.model.Tweet;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class, EmbeddedReactiveMongoConfig.class })
public class TweetRepositoryTest {

	@Autowired
	TweetRepository tweetRepository;

	@Test
	public void testSaveTweet() {
		Tweet originTweet = new Tweet("Hello, World!");
		Mono<Tweet> tweetMono = tweetRepository.save(originTweet);

		StepVerifier.create(tweetMono).assertNext(createdTweet -> {
			Assert.assertNotNull(createdTweet);
			Assert.assertNotNull(createdTweet.getId());
			Assert.assertNotNull(createdTweet.getText());
			Assert.assertEquals(originTweet.getText(), createdTweet.getText());
			Assert.assertNotNull(createdTweet.getCreatedAt());
			Assert.assertEquals(originTweet.getCreatedAt(), createdTweet.getCreatedAt());

		}).expectComplete().verify();
	}

}
```

En aquest exemple provem el mètode de guardar tweets de forma reactiva
