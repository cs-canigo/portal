+++
date        = "2019-12-24"
title       = "Canigó. Com implementar tests unitaris amb Webflux a Canigó 3.4"
description = "How to per a implementar tests unitaris amb Webflux a aplicacions Canigó 3.4"
#section     = "howtos"
#categories  = ["canigo"]
key         = "GENER2020"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de crear tests unitaris a serveis desenvolupats amb WebFlux, funcionalitat proporcionada a partir de la versió 3.4.0 de Canigó.

### Introducció

Amb la publicació de Canigó 3.4.0 es proporciona suport a Spring 5, incoporant les funcionalitats de WebFlux. Spring WebFlux proporciona endpoints web de forma funcional, on les funcions són utilitzades per enrutar i capturar peticions.
Teniu disponible la documentació de WebFlux de Canigó 3.4 a [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/) i, per a més informació sobre programació funcional amb Spring 5, podeu consultar: https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html#webflux-fn.


Per a realitzar el **test de serveis WebFlux** hi intervenen dos objectes principals:

- *org.springframework.test.web.reactive.server.WebTestClient*: aquest component de Spring s'utilitza per a simular les crides que realitzaria un client als nostres serveis web. En el cas d’aplicacions Canigó, s’utilitzarà per a simular les crides que realitzaria un client als nostres serveis REST exposats amb WebFlux.

- *reactor.test.StepVerifier*: aquest component del projecte reactor s'utilitza per a verificar els serveis exposats en reactiu. En el nostre cas l'utilitzarem per a verificar la resposta dels serveis web REST exposats amb WebFlux.

Per a més informació sobre com realitzar test amb programació reactiva podeu consultar [Test unitaris amb programació reactiva a Canigó 3.4](/howtos/2019-03-Howto-Test_unitaris_programacio_reactiva_canigo_3_4/).
En aquest article utilitzarem els serveis exposats amb WebFlux seguint la guia [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/).

### Cas d’exemple

El cas d'exemple consta d'un repositori de dades que contindrà missatges homòlegs a un tweet on hi haurà un **identificador, un text i una data de creació**. Per aquest repositori de dades s’utilitzarà una base de dades Mongodb *cat.gencat.ctti.repository.TweetRepository*.

En el cas d'exemple hi consten dos serveis: obtenir tots els tweets i obtenir un tweet a partir del seu identificador. Aquests serveis són exposats amb Web flux de dues formes diferents:
<br>
- Mitjançant la definició de l’enrutament directament a les “RouterFuntions” en el path “/route-flux/tweets”
<br>
- Mitjançant “Handlers” en l’enrutament de les “RouterFuntions” en el path “/handler-flux/tweets”

En conclusió, tenim exposats quatre serveis REST:
<br>
- /route-flux/tweets
<br>
- /handler-flux/tweets
<br>
- /route-flux/tweets/{id}
<br>
- /handler-flux/tweets/{id}

#### Test unitaris serveis WebFlux

Per a realitzar el test d'aquests quatre serveis REST tenim dues opcions:
<br>
- Fer crides simulant un client als nostres serveis rest exposats de forma real.
<br>
- Fer crides simulant un client als nostres serveis rest mockejats.


##### Fer crides simulant un client als nostres serveis REST exposats de forma real

Per a realitzar les crides als nostres serveis REST exposats de forma real utilitzarem les funcionalitats del component *org.springframework.test.web.reactive.server.WebTestClient*.
Per a poder verificar que la resposta és l'esperada, a l'inici del test introduirem elements "tweets" utilitzant el repositori de tweets. D’aquesta forma podríem tenir un mètode que s'executi a l'inici del test de la següent manera:

```java

	@Autowired
	TweetRepository tweetRepository;
	Tweet helloWorldTweet;
	Tweet secondTweet;

	@Before
	public void before() {
		helloWorldTweet = new Tweet("Hello, World!");
		secondTweet = new Tweet("Second tweet");
		helloWorldTweet = tweetRepository.save(helloWorldTweet).block();
		secondTweet = tweetRepository.save(secondTweet).block();
	}

```

Utilitzarem el mètode "block" per assegurar-nos que, quan s'hagi executat el mètode "before", els elements han estat introduïts al sistema. Per a comprovar els serveis REST "all tweets" farem una crida al serveis comprovant que la resposta és un OK (http code 200), que en el body de la resposta hi ha un llistat d'elements de tipus "tweet" i que en el llistat hi consten els elements afegits al mètode "before".

```java

  @Autowired
	WebTestClient webTestClient;

  ...

	@Test
	public void testRouteWebFluxGetAllTweets() {
		testGetAllTweets("/route-flux/tweets");
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		testGetAllTweets("/handler-flux/tweets");
	}

	private void testGetAllTweets(String uri) {
		webTestClient.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8).expectBodyList(Tweet.class)
				.contains(helloWorldTweet, secondTweet);
	}

```

Per a comprovar els serveis REST "get tweet per identificador" farem una crida al serveis comprovant que la resposta és un OK (http code 200), que en el body de la resposta hi ha un element de tipus "tweet" i que l'element retornat és el "tweet" que hem insertat prèviament al mètode "before".

```java

  @Autowired
	WebTestClient webTestClient;

  ...

	@Test
	public void testRouteWebFluxGetSingleTweet() {
		testGetSingleTweet("/route-flux/tweets/{id}");
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		testGetSingleTweet("/handler-flux/tweets/{id}");
	}

	private void testGetSingleTweet(String uri) {

		webTestClient.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).expectBody(Tweet.class).consumeWith(response -> Assertions
						.assertThat(response.getResponseBody()).isNotNull().isEqualTo(helloWorldTweet));
	}

```

Cal tenir present que en aquest cas estem fent crides reals i, per tant, la instància repositori de "tweets" ha d'estar inicialitzada. En el nostre cas, no estem atacant a una base de dades MongoDB real, sinó que estem utilitzant una instància "simulada" de MongoDB creada amb test containers.
En aquest cas no utilitzarem el component *reactor.test.StepVerifier* per a verificar els serveis REST amb reactiu ja que, al connectar-nos als serveis en forma real, no podem garantir la seqüència de "tweets" de retorn.

La classe completa de test seria doncs:

```java

package cat.gencat.ctti.endpoints;

import java.util.Collections;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;

import cat.gencat.ctti.model.Tweet;
import cat.gencat.ctti.repository.TweetRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
		"spring.main.allow-bean-definition-overriding=true" })
public class TweetWebFluxWebTest {

	@Autowired
	WebTestClient webTestClient;

	@Autowired
	TweetRepository tweetRepository;

	Tweet helloWorldTweet;
	Tweet secondTweet;

	@Before
	public void before() {
		helloWorldTweet = new Tweet("Hello, World!");
		secondTweet = new Tweet("Second tweet");
		helloWorldTweet = tweetRepository.save(helloWorldTweet).block();
		secondTweet = tweetRepository.save(secondTweet).block();
	}

	@Test
	public void testRouteWebFluxGetAllTweets() {
		testGetAllTweets("/route-flux/tweets");
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		testGetAllTweets("/handler-flux/tweets");
	}

	private void testGetAllTweets(String uri) {
		webTestClient.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8).expectBodyList(Tweet.class)
				.contains(helloWorldTweet, secondTweet);
	}

	@Test
	public void testRouteWebFluxGetSingleTweet() {
		testGetSingleTweet("/route-flux/tweets/{id}");
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		testGetSingleTweet("/handler-flux/tweets/{id}");
	}

	private void testGetSingleTweet(String uri) {
		webTestClient.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).expectBody(Tweet.class).consumeWith(response -> Assertions
						.assertThat(response.getResponseBody()).isNotNull().isEqualTo(helloWorldTweet));
	}

}

```

##### Fer crides simulant un client als nostres serveis REST mockejats

Per a realitzar les crides als nostres serveis rest mockejats utilitzarem les funcionalitats del component *org.springframework.test.web.reactive.server.WebTestClient* i, per a verificar la resposta dels serveis REST amb reactiu, utilitzarem *reactor.test.StepVerifier*
Per a poder verificar que la resposta és l'esperada, a l'inici del test introduirem elements "tweets" utilitzant el repositori de tweets. Aquest el mockejarem per a no haver de tenir una base de dades instanciada i per a poder tenir control de la resposta de cada mètode del repositori.

Així podríem tenir un mètode que s'executi a l’inici del test de la següent manera:

```java

	@MockBean
	TweetRepository tweetRepository;
	Tweet helloWorldTweet;
	Tweet secondTweet;

	...

	@Before
	public void before() {
		helloWorldTweet = new Tweet("Hello, World!");
		helloWorldTweet.setId("1");
		secondTweet = new Tweet("Second tweet");
		secondTweet.setId("2");
		Mockito.when(tweetRepository.findAll()).thenReturn(Flux.just(helloWorldTweet, secondTweet));
		Mockito.when(tweetRepository.findById(Mockito.anyString())).thenReturn(Mono.just(helloWorldTweet));
	}

```

Per a comprovar els serveis REST "all tweets" farem una crida al serveis comprovant que la resposta és un OK (http code 200) i que en el body de la resposta hi ha un llistat d'elements de tipus "tweet". Per a verificar el contingut de la resposta, obtindrem el flux del servei reactiu i comprovarem, amb el component *reactor.test.StepVerifier*, que els elements que hem afegit al mètode "before" són els que obtenim a la resposta i que la seqüència amb que els obtenim és l'esperada.

Així per exemple, per a testejar els serveis REST de "get all tweets" tindríem:

```java

	@Autowired
	WebTestClient webTestClient;

	...

	@Test
	public void testRouteWebFluxGetAllTweets() {
		testGetAllTweets("/route-flux/tweets");
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		testGetAllTweets("/handler-flux/tweets");
	}

	private void testGetAllTweets(String uri) {
		checkWebFluxGetAllTweets(webTestClient.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange()
				.expectStatus().isOk().expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
				.returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetAllTweets(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).expectNext(secondTweet)
				.verifyComplete();
	}

```

Per a comprovar els serveis REST "get tweet per identificador" farem una crida al serveis comprovant que la resposta és un OK (http code 200) i que en el body de la resposta hi ha elements de tipus "tweet". Per a verificar el contingut de la resposta, obtindrem el flux del servei reactiu i comprovarem, amb el component *reactor.test.StepVerifier*, que l'element que hem afegit al mètode "before" és el que obtenim a la resposta i que no obtenim cap més element.

Per a comprovar els serveis REST "get tweet per identificador" tindríem:

```java

	@Autowired
	WebTestClient webTestClient;

	...

	@Test
	public void testRouteWebFluxGetSingleTweet() {
		testGetSingleTweet("/route-flux/tweets/{id}");
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		testGetSingleTweet("/handler-flux/tweets/{id}");
	}

	private void testGetSingleTweet(String uri) {
		checkWebFluxGetSingleTweet(webTestClient.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetSingleTweet(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).verifyComplete();
	}

```

La classe completa de test seria doncs:

```java

package cat.gencat.ctti.endpoints;

import java.util.Collections;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;

import cat.gencat.ctti.model.Tweet;
import cat.gencat.ctti.repository.TweetRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
		"spring.main.allow-bean-definition-overriding=true" })
public class TweetWebFluxMockWebTest {

	@Autowired
	WebTestClient webTestClient;

	@MockBean
	TweetRepository tweetRepository;

	Tweet helloWorldTweet;
	Tweet secondTweet;

	@Before
	public void before() {
		helloWorldTweet = new Tweet("Hello, World!");
		helloWorldTweet.setId("1");
		secondTweet = new Tweet("Second tweet");
		secondTweet.setId("2");
		Mockito.when(tweetRepository.findAll()).thenReturn(Flux.just(helloWorldTweet, secondTweet));
		Mockito.when(tweetRepository.findById(Mockito.anyString())).thenReturn(Mono.just(helloWorldTweet));
	}

	@Test
	public void testRouteWebFluxGetAllTweets() {
		testGetAllTweets("/route-flux/tweets");
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		testGetAllTweets("/handler-flux/tweets");
	}

	private void testGetAllTweets(String uri) {
		checkWebFluxGetAllTweets(webTestClient.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange()
				.expectStatus().isOk().expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
				.returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetAllTweets(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).expectNext(secondTweet)
				.verifyComplete();
	}

	@Test
	public void testRouteWebFluxGetSingleTweet() {
		testGetSingleTweet("/route-flux/tweets/{id}");
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		testGetSingleTweet("/handler-flux/tweets/{id}");
	}

	private void testGetSingleTweet(String uri) {
		checkWebFluxGetSingleTweet(webTestClient.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetSingleTweet(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).verifyComplete();
	}

}

```

### Conclusions

- Per a simular la crida als serveis REST reactius i verificar la resposta utilitzarem les funcionalitats del component **org.springframework.test.web.reactive.server.WebTestClient**.
- Per verificar el contingut i la seqüencia de resposta dels serveis rest reactius utilitzarem **reactor.test.StepVerifier**.
- Si volem realitzar tests d'integració complets extrem a extrem utilitzarem l'estratègia de **fer crides simulant un client als nostres serveis rest exposats de forma real**.
- Si volem realitzar testos del negoci associat als serveis REST reactius utilitzarem l'estratègia de **fer crides simulant un client als nostres serveis rest mockejats**.