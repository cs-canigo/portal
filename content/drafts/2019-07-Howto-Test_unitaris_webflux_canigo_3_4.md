+++
date        = "2019-07-24"
title       = "Test unitaris amb Webflux a Canigó 3.4"
description = "How to per crear test unitaris amb Webflux a Canigó 3.4"
section     = "howtos"
categories  = ["canigo"]
key         = "AGOST2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de crear test unitaris a serveis desenvolupats amb WebFlux proporcionat a la versió 3.4.0 de Canigó.

### Introducció WebFlux

Amb la publicació de Canigó 3.4.0 es proporciona suport a Spring 5, proporcionant les funcionalitats de WebFlux

Teniu disponible la documentació de WebFlux de Canigó 3.4 a [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/)

Spring WebFlux proporciona endpoints web de forma funcional, on les funcions són utilitzades per enrutar i capturar peticions

Per a més informació sobre programació funcional amb Spring 5 podeu consultar: https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html#webflux-fn

### Introducció test WebFlux

Per a realitzar el test de serveis WebFlux hi intervenen 2 objectes principals: org.springframework.test.web.reactive.server.WebTestClient i reactor.test.StepVerifier

#### org.springframework.test.web.reactive.server.WebTestClient

Aquest component de spring s'utilitza per simular les crides que realitzaria un client als nostres serveis web. En el nostre cas l'utilitzarem per simular les crides que realitzaria un client als nostres serveis rest exposats amb webflux

#### reactor.test.StepVerifier

Aquest component del projecte reactor s'utilitza per verificar serveis exposats amb reactiu. En el nostre cas l'utilitzarem per verificar la resposta dels serveis web rest exposats amb webflux

Per a més informació sobre com realitzar test amb programació reactiva podeu consultar [Test unitaris amb programació reactiva a Canigó 3.4](https://canigo.ctti.gencat.cat/howtos/2019-03-Howto-Test_unitaris_programacio_reactiva_canigo_3_4/)

### Introducció cas d’exemple

Per a aquesta guia utilitzarem els serveis exposats amb WebFlux seguint la guia [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/)

El cas d'exemple consta d'un repositori de dades on hi contindrà missatges homòlegs a un tweet, on tindrà un id, un text i una data de creació

Pel repositori de dades utilitzarem una base de dades Mongodb. El respositori té el nom *cat.gencat.ctti.repository.TweetRepository*

En el cas d'exemple hi consten 2 serveis: obtenir tots els tweets i obtenir un tweet pel seu id

Aquests 2 serveis són exposats amb Web flux de dues vies diferents:
<br>
- Mitjançant la definició de l’enrutament directament a les “RouterFuntions” en el path “/route-flux/tweets”
<br>
- Mitjançant “Handlers” en l’enrutament de les “RouterFuntions” en el path “/handler-flux/tweets”

En conclusió, tenim exposats 4 serveis rest:
<br>
- /route-flux/tweets
<br>
- /handler-flux/tweets
<br>
- /route-flux/tweets/{id}
<br>
- /handler-flux/tweets/{id}

### Test unitaris serveis WebFlux cas d'exemple

Per a realitzar el test d'aquest 4 serveis rest tenim dues vies:
<br>
- Fer crides simulant un client als nostres serveis rest exposats de forma real
<br>
- Fer crides simulant un client als nostres serveis rest mockejats

#### Fer crides simulant un client als nostres serveis rest exposats de forma real

Per a realitzar les crides als nostres serveis rest exposats de forma real utilitzarem les funcionalitats del component *org.springframework.test.web.reactive.server.WebTestClient*

Per a poder verificar que la resposta és l'esperada, al inici del test introduirem elements "tweets" utilitzant el repository de tweets

Així podríem tenir un mètode que s'executi al inici del test de la següent manera:

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

Utilitzarem el mètode "block" per assegurar-nos que quan s'hagi executat el mètode "before" els elements han estat introduits al sistema

Per a comprovar els serveis rest "all tweets" farem una crida al serveis rest, comprovant que la resposta és un OK (http code 200), que el en el body de la respota hi ha un llistat d'elements de tipus "tweet" i que en el llistat hi consten els elements afegits al mètode "before"

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

Per a comprovar els serveis rest "get tweet per id" farem una crida al serveis rest, comprovant que la resposta és un OK (http code 200), que el en el body de la respota hi ha un element de tipus "tweet" i que l'element retornat és el "tweet" que hem insertat prèviament al mètode "before"

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

Cal tenir en compte que en aquest cas estem fent crides "reals", per tant, la instància repository de "tweets" ha d'estar inicialitzada. En el nostre cas, no estem atacant a una bd MongoDB real, sinó que estem utilitzant una instància "simulada" de MongoDB creada amb test containers

En aquest cas no utilitzarem el component *reactor.test.StepVerifier* per a verificar els serveis rest amb reactiu ja que el connectar-nos als serveis en forma real, no podem garantir la seqüència de "tweets" de retorn

La classe completa de test és:

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
#### Fer crides simulant un client als nostres serveis rest mockejats

Per a realitzar les crides als nostres serveis rest mockejats utilitzarem les funcionalitats del component *org.springframework.test.web.reactive.server.WebTestClient* i per verificar la respota dels serveis rest amb reactiu utilitzarem *reactor.test.StepVerifier*

Per a poder verificar que la resposta és l'esperada, al inici del test introduirem elements "tweets" utilitzant el repository de tweets. Aquest el mockejarem per a no haver de tenir una bd instanciada i per poder tenir control de la resposta de cada mètode el repository

Així podríem tenir un mètode que s'executi al inici del test de la següent manera:

```java

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

```

A cada test, al component *org.springframework.test.web.reactive.server.WebTestClient* li indicarem quina definició de serveis rest, amb quines funcions de WebFlux i quin repository utilitzar (el mockjejat) 

Així per exemple, per testejar els serveis rest de "get all tweets" tindríem:

```java

	@Autowired
	TweetRouteRouterFuntionConfig tweetRouteRouterFuntionConfig;

	@Autowired
	TweetHandlerRouterFuntionConfig tweetHandlerRouterFuntionConfig;

	@Autowired
	TweetHandler tweetHandler;

	@Test
	public void testRouteWebFluxGetAllTweets() {
		String uri = "/route-flux/tweets";

		checkWebFluxGetAllTweets(WebTestClient
				.bindToRouterFunction(tweetRouteRouterFuntionConfig.routeFluxRouterFunction(tweetRepository)).build()
				.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		String uri = "/handler-flux/tweets";

		checkWebFluxGetAllTweets(WebTestClient
				.bindToRouterFunction(tweetHandlerRouterFuntionConfig.handlerFluxRouterFunction(tweetHandler)).build()
				.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetAllTweets(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).expectNext(secondTweet)
				.verifyComplete();
	}

```

Per a comprovar els serveis rest "get tweet per id" tindríem:

```java

	@Autowired
	TweetRouteRouterFuntionConfig tweetRouteRouterFuntionConfig;

	@Autowired
	TweetHandlerRouterFuntionConfig tweetHandlerRouterFuntionConfig;

	@Autowired
	TweetHandler tweetHandler;
	
	@Test
	public void testRouteWebFluxGetSingleTweet() {
		String uri = "/route-flux/tweets/{id}";

		checkWebFluxGetSingleTweet(WebTestClient
				.bindToRouterFunction(tweetRouteRouterFuntionConfig.routeFluxRouterFunction(tweetRepository)).build()
				.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		String uri = "/handler-flux/tweets/{id}";

		checkWebFluxGetSingleTweet(WebTestClient
				.bindToRouterFunction(tweetHandlerRouterFuntionConfig.handlerFluxRouterFunction(tweetHandler)).build()
				.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetSingleTweet(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).verifyComplete();
	}

```

Com es pot comprovar amb el component *org.springframework.test.web.reactive.server.WebTestClient* verifiquem la definició del servei i amb *reactor.test.StepVerifier* verifiquem la seqüència d'elements de la resposta del servei reactiu, introduïts prèviament al mètode *before*


La classe completa de test és:

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

import cat.gencat.ctti.endpoints.config.TweetHandlerRouterFuntionConfig;
import cat.gencat.ctti.endpoints.config.TweetRouteRouterFuntionConfig;
import cat.gencat.ctti.endpoints.handler.TweetHandler;
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
	TweetRouteRouterFuntionConfig tweetRouteRouterFuntionConfig;

	@Autowired
	TweetHandlerRouterFuntionConfig tweetHandlerRouterFuntionConfig;

	@Autowired
	TweetHandler tweetHandler;

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
		String uri = "/route-flux/tweets";

		checkWebFluxGetAllTweets(WebTestClient
				.bindToRouterFunction(tweetRouteRouterFuntionConfig.routeFluxRouterFunction(tweetRepository)).build()
				.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	@Test
	public void testHandlerWebFluxGetAllTweets() {
		String uri = "/handler-flux/tweets";

		checkWebFluxGetAllTweets(WebTestClient
				.bindToRouterFunction(tweetHandlerRouterFuntionConfig.handlerFluxRouterFunction(tweetHandler)).build()
				.get().uri(uri).accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetAllTweets(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).expectNext(secondTweet)
				.verifyComplete();
	}

	@Test
	public void testRouteWebFluxGetSingleTweet() {
		String uri = "/route-flux/tweets/{id}";

		checkWebFluxGetSingleTweet(WebTestClient
				.bindToRouterFunction(tweetRouteRouterFuntionConfig.routeFluxRouterFunction(tweetRepository)).build()
				.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	@Test
	public void testHandlerWebFluxGetSingleTweet() {
		String uri = "/handler-flux/tweets/{id}";

		checkWebFluxGetSingleTweet(WebTestClient
				.bindToRouterFunction(tweetHandlerRouterFuntionConfig.handlerFluxRouterFunction(tweetHandler)).build()
				.get().uri(uri, Collections.singletonMap("id", helloWorldTweet.getId()))
				.accept(MediaType.APPLICATION_JSON_UTF8).exchange().expectStatus().isOk().expectHeader()
				.contentType(MediaType.APPLICATION_JSON_UTF8).returnResult(Tweet.class).getResponseBody());
	}

	private void checkWebFluxGetSingleTweet(Flux<Tweet> flux) {
		StepVerifier.create(flux).expectSubscription().expectNext(helloWorldTweet).verifyComplete();
	}

}

```
