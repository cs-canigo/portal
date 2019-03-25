+++
date        = "2019-03-25"
title       = "Test unitaris amb programació reactiva a Canigó 3.4"
description = "How to per crear test unitaris amb programació reactiva a Canigó 3.4"
section     = "howtos"
categories  = ["canigo"]
key         = "ABRIL2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de crear test unitaris a Streams reactius proporcionats a la versió 3.4.0 de Canigó

### Introducció programació reactiva

Amb la publicació de Canigó 3.4.0 es proporciona suport a Spring 5

Spring 5 proporciona les funcionalitats per a la programació reactiva utilitzant el estàndard de Streams reactius

L'objectiu és proporcionar eines per a crear aplicacions no bloquejants, que sigui asíncron, orientat a esdeveniments i que requereixi un nombre reduït de fils

Spring 5 utilitza el projecte [Reactor](https://projectreactor.io/) per a crear sistemes reactius eficients

Per a més informació sobre programació reactiva amb Spring 5 podeu consultar:
https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html

### Introducció test programació reactiva

El projecte Reactor proporciona les principals funcionalitats pel testeig de programació reactiva:
- Testing d'una seqüència de passos d'un escenari amb programació reactiva
- Producció de dades en un ordre en concret per testejar el comportament dels operadors

Els principals components que proporcionen aquestes funcionalitats són:
- StepVerifier
- TestPublisher

El resum dels passos a utilitzar per crear un test seria:
- Creació de l'escenari
- Els diferents passos a provar en el fluxe de dades del stream
- Verificació final que la seqüència es compleix 

Per a més informació podeu consultar la documentació del projecte [Reactor testing](https://projectreactor.io/docs/core/release/reference/#testing)

### Test unitaris streams 

#### StepVerifier
Per il·lustrar exemples de tests unitaris de serveis amb StepVerifier, partirem d'un servei de Spring que exposa mètodes que retornen un fluxe de dades en streams, aquest servei seria:
```java
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

import reactor.core.publisher.Flux;

import org.springframework.stereotype.Service;

@Service
public class Testing {

	static final Set<String> NAMES = new LinkedHashSet<>(Arrays.asList(
			"Victor","Simon","Rick","Morty","Beth","Jerry","Summer"
	));

	public Flux<Integer> tenToZero() {
		return Flux.range(0, 11)
		           .map(i -> 10 - i);
	}

	public Flux<Integer> operateOnTenToZero(Function<Integer, Integer> operation) {
		return tenToZero().map(operation);
	}

	public Flux<String> namesPerSecond() {
		List<String> randomizedNames = new ArrayList<>(NAMES);
		Collections.reverse(randomizedNames);

		return Flux.fromIterable(randomizedNames)
				.delayElements(Duration.ofSeconds(1));
	}
}
```

Per provar el primer mètode "tenToZero" podriem comprovar que una vegada creada la seqüencia es compleix la seqüencia següent:
1. S'obté l'element "10"
2. Els següents elements són els elements "9", "8", "7", "6", "5"
3. Que després vindran 4 elements més
4. Que no obtindrem més elements

Per això podríem tenir el test:
```java
...
	@Test
	public void tenToZero() {
		StepVerifier.create(test.tenToZero())
		            .expectNext(10)
		            .expectNext(9, 8, 7, 6, 5)
		            .expectNextCount(4)
		            .expectNext(0)
		            .verifyComplete();
	}
...
```

Altres exemples de tests dels mètodes podrien ser:
```java
...
@Test
	public void multiplyByTenToZero() {
		StepVerifier.create(test.operateOnTenToZero(i -> 10 * i))
		            .expectSubscription()
		            .expectNextCount(5)
		            .assertNext(v -> assertThat(v).isEqualTo(50))
		            .expectNext(40, 30, 20, 10, 0)
		            .verifyComplete();
	}

	@Test
	public void divideByTenToZeroErrors() {
		StepVerifier.create(test.operateOnTenToZero(i -> 10 / i))
		            .expectNext(1)
		            .expectNextCount(4)
		            .expectNext(2)
		            .expectNextCount(2)
		            .expectNext(5, 10)
		            .verifyErrorSatisfies(e -> assertThat(e).isInstanceOf(ArithmeticException.class)
		                                                    .hasMessage("/ by zero"));
	}

	@Test
	public void namesPerSecond() {
		StepVerifier.create(test.namesPerSecond()
		                        .doOnNext(System.out::println))
		            .recordWith(ArrayList::new)
		            .thenConsumeWhile(Objects::nonNull)
		            .consumeRecordedWith(l -> assertThat(Testing.NAMES).containsAll(l))
		            .verifyComplete();
	}

	@Test
	public void namesPerSecondWithoutTime() {
		StepVerifier.withVirtualTime(() -> test.namesPerSecond()
		                                       .doOnNext(System.out::println))
		            .expectSubscription()
		            .expectNoEvent(Duration.ofSeconds(1))
		            .expectNext("Summer")
		            .thenAwait(Duration.ofSeconds(2))
		            .expectNextCount(2)
		            .thenAwait(Duration.ofMinutes(1))
		            .expectNext("Morty", "Rick", "Simon", "Victor")
		            .verifyComplete();
	}
...
```

On tenim que:
- En el test "multiplyByTenToZero" s'utilitza:
	- "expectSubscription" per comprovar que existeix una subscripció en el stream
	- "assertNext" amb "FunctionalInterface" i lambdas de java per fer comprovacions al element del stream
	
- En el test "divideByTenToZeroErrors" s'utilitza:
	- "verifyErrorSatisfies" per verificar que es rep un error i que aquest compleix un requisits definits
	
- En el test "namesPerSecond" s'utilitza:
	- "recordWith", "thenConsumeWhile", "consumeRecordedWith", per agrupar en una llista els elements retornats, cada segon, pel fluxe i comprovar que són els elements de la llista
	
- En el test "namesPerSecondWithoutTime" s'utilitza:
	- "expectNoEvent" per verificar que no hi ha cap event a la subcripció durant un temps concret
	- "expectNext" després de "expectNoEvent", per verificar que passat el temps definit a "expectNoEvent" hi ha l'element que esperem
	- "thenAwait" per esperar un temps en concret perquè hi hagi events 
	- "expectNextCount" després de "thenAwait", per verificar que passat el temps definit a "thenAwait", hi ha el nombre d'elements que esperem
	
Altres funcionalitats interessants seria:
- "expectNextMatches"	per verificar que els elements compleixen un predicat
- "expectError", "expectError" especificant l'error, "expectErrorMessage", "expectErrorMatches" i "expectErrorSatisfies" per fer comprovacions a l'error esperat
	
Per a més informació sobre l'exemple de la prova podeu consultar:
https://github.com/simonbasle-demos/s1p-reactor-in-action

#### TestPublisher 
Per il·lustrar exemples de tests unitaris de serveis utilitzant TestPublisher per a la creació del fluxe de dades, partirem d'una classe que exposa un servei per transformar un fluxe de dades amb String a majúscules:
```java
import reactor.core.publisher.Flux;

class UppercaseConverter {
    private final Flux<String> source;
 
    UppercaseConverter(Flux<String> source) {
        this.source = source;
    }
 
    Flux<String> getUpperCase() {
        return source
          .map(String::toUpperCase);
    }   
}
```

Utilitzarem TestPublisher per crear un fluxe de dades que es passarà a la classe UppercaseConverter
```java
    @Test
    public void testPublisherInAction() {
        final TestPublisher<String> testPublisher = TestPublisher.create();

        UppercaseConverter uppercaseConverter = new UppercaseConverter(testPublisher.flux());

        StepVerifier.create(uppercaseConverter.getUpperCase())
          .then(() -> testPublisher.emit("aA", "bb", "ccc"))
          .expectNext("AA", "BB", "CCC")
          .verifyComplete();
    }
```

Una vegada creat el fluxe i la connexió amb UppercaseConverter, s'utilitza el step "then" per emetre els elements a la subscripció i verificar que, en els següents passos, els elements creats al "TestPublisher" són transformats a majúscules

Per a més informació sobre l'exemple podeu consultar:
https://github.com/eugenp/tutorials/tree/master/spring-5-reactive

### Test unitaris streams reactius

Per il·lustrar exemples de tests unitaris de serveis amb streams reactius utilitzarem un repository amb Mongodb. Per a més informació com utilitzar reactiu amb un repositori de dades Mongodb, s'ha publicat la guia d'[Utilització de mongo reactiu](/howtos/2019-03-Howto-Utilitzacio_mongo_reactiu.md)

Per l'exemple partirem d'un element "Account", amb el id, owner i value
```java
@Document
public class Account {
  
    @Id
    private String id;
    private String owner;
    private Double value;
  
    // getters and setters
}
```

Utilitzarem el repositori "AccountCrudRepository" utilitzant "ReactiveCrudRepository" de Spring
```java
import cat.gencat.ctti.model.Account;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface AccountCrudRepository extends ReactiveCrudRepository<Account, String> {

    public Flux<Account> findAllByValue(Double value);

    public Mono<Account> findFirstByOwner(Mono<String> owner);
}
```

Pel test podríem provar que si guardem un "Account" al respository, si consultem els "Accounts" obtenim l'element guardat, per exemple:
```java
...
@Test
public void givenValue_whenFindAllByValue_thenFindAccount() {
		StepVerifier.create(repository.save(new Account(null, "Bill", 12.3)))
		.expectNextCount(1)
		.verifyComplete();

    StepVerifier
      .create(repository.findAllByValue(12.3))
      .assertNext(account -> {
          assertEquals("Bill", account.getOwner());
          assertEquals(Double.valueOf(12.3) , account.getValue());
          assertNotNull(account.getId());
      })
      .expectComplete()
      .verify();
}
...
```

Per la pròpia definició dels streams reactius, no es pot garantir que immediatament després de la crida al mètode "save" el repositori ha guardat la informació

El mètode "block" s'ha d'evitar utilitzar en el tractament de streams ja que es crea un bloqueig

Per a garantir que quan utilitzem el mètode "findAllByValue" s'ha guardat la informació al repository s'ha utilitzat 2 StepVerifier

Per provar el mètode "findFirstByOwner" podriem utilitzar un test "homòleg" a l'anterior:
```java
...
@Test
public void givenOwner_whenFindFirstByOwner_thenFindAccount() {
    StepVerifier.create(repository.save(new Account(null, "Bill", 12.3)))
		.expectNextCount(1)
		.verifyComplete();
		
    StepVerifier
      .create(repository.findFirstByOwner(Mono.just("Bill")))
      .assertNext(account -> {
          assertEquals("Bill", account.getOwner());
          assertEquals(Double.valueOf(12.3) , account.getValue());
          assertNotNull(account.getId());
      })
      .expectComplete()
      .verify();
}
...
```

Per provar explícitament el mètode "save" del repository, podríem tenir:
```java
...
@Test
public void givenAccount_whenSave_thenSaveAccount() {
    StepVerifier
      .create(repository.save(new Account(null, "Bill", 12.3)))
      .assertNext(account -> assertNotNull(account.getId()))
      .expectComplete()
      .verify();
}
...
```

Com es pot apreciar a les proves, al step "assertNext" amb "FuntionalInterface" i lambdas de Java podem tenir els "Asserts" que necessitem
