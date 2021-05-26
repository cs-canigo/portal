+++
date        = "2021-05-26"
title       = "Canigó. Com implementar el patró Circuit Breaker"
description = "Com implementar el patró Circuit Breaker dins d'un projecte Canigó."
section     = "howtos"
categories  = ["canigo"]
#key        = "JUNY2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar com implementar el patró _[Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)_,
dins d'un projecte generat amb el Framework Canigó.

## Justificació

És habitual que les aplicacions facin crides remotes a sistemes que poden fallar o penjar-se sense resposta fins
que s’arribi a un límit de temps d’espera. Aquest fet pot acabar implicant que el sistema es quedi sense recursos i
que impliquin fallades en cascada.
El patró **_Circuit Breaker_ permet evitar que una aplicació intenti de manera indefinida una operació que amb alta
probabilitat vagi a fallar**, permetent que continuï l'aplicació mentre el problema amb l'operació es resol.
Addicionalment, permet un restabliment automàtic quan el problema hagi quedat resolt tornant a executar l'operació compromesa.

![Spring circuit Diagrama](/images/howtos/2021-01-02_spring_circuit_diagrama.drawio.png)

Els estats que es tracten són:

 * **Closed**: el circuit està tancat i el flux ininterromput. Aquest és l'estat inicial quan tot funciona correctament.

 * **Open**: el circuit està obert i el flux interromput. En aquest estat totes les crides al recurs/servei tornen
 un error sense que es faci cap crida protegida.

 * **Half-Open**: el circuit està mig obert (o mig tancat) donant una oportunitat al flux per al seu restabliment.
 En aquest estat l'aplicació tornarà a intentar fer l'operació que estava fallant.

Alguns dels avantatges són:

 * **Monitoratge**: donat existeix un component que la seva única funcionalitat és validar l'estat dels serveis,
 és possible tenir un monitoratge en temps real que indiqui els temps de resposta mitjana, freqüència de fallada,
 estat actual del servei i, sobretot, notificacions en temps real si algun servei comença a fallar.

 * **Sobrecàrrega**: la capacitat d'obrir el circuit per un error o timeout que es preveu que passarà, ens estalvia
 el fet de tenir molts fils esperant que un servei respongui. Si hi ha milers d'usuaris, és probable que s'arribi a
 tenir molts fils parats, cosa que provocaria que el sistema se sobrecarregués i pogués arribar a provocar reaccions
 en cadena que afectessin altres components.

 * **Tolerància a fallades**: el patró permet redirigir la petició per a evitar haver de respondre amb un error al client.


Quan s'utilitza un projecte Canigó que es basa en Spring és possible implementar el patró utilitzant els
projectes [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o
[Resilience4j](https://github.com/resilience4j/resilience4j).

<div class="message information">
El projecte Hystrix ha deixat de desenvolupar-se de forma activa tal com s'indica a:
<a href="https://github.com/Netflix/Hystrix/blob/master/README.md">Netflix/Hystrix README</a>.
Com a alternativa es pot utilitzar el projecte <a href="https://github.com/resilience4j/resilience4j">Resilience4j</a>.
</div>

<br/>
A continuació es mostrarà informació de configuració i desenvolupament en cada cas.

## Spring Cloud Netflix Hystrix
---

### Configuració

Caldrà afegir algunes dependències al projecte _Maven_:

 * `spring-cloud-starter-netflix-hystrix`: proporciona la implementació del patró _Circuit Breaker_.

 * `spring-cloud-starter-netflix-hystrix-dashboard`: és opcional i proporciona un panell bàsic per a monitorar el circuit.

 * `spring-boot-starter-actuator`: proporciona la implementació i generació de mètriques.

 * `micrometer-registry-prometheus`: exporta les mètriques en un format per a ser entès per Prometheus.

És important mantenir la relació entre les dependències de _Spring Cloud_ i la versió de _Spring Boot_.
Podeu consultar la matriu de compatibilitat de [Spring Cloud](https://spring.io/projects/spring-cloud).
Per exemple, si la versió de _Spring Boot_ és 2.1.8.RELEASE, li correspondrà la versió _Greenwich.XX_ de _Spring Cloud_.

<br/>
Exemple de fitxer `pom.xml`:

```xml
  <properties>
    <spring-cloud.version>Greenwich.SR6</spring-cloud.version>
  </properties>
  ...

  <dependencies>
    ...
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
  </dependencies>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${spring-cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  ...
}
```

Exemple de fitxer `application.yml`:

```yaml

...

# Actuator
management:
  endpoint:
    health:
      #### Show all details of health
      enabled: true
      show-details: always
  endpoints:
    web:
      cors:
        allowed-origins: true
      exposure:
        include: "*"

hystrix:
  metrics:
    enabled: true
```

### Desenvolupament

A mode d’exemple, per a aplicar i provar el patró _Circuit Breaker_ es necessitaran dues aplicacions de tipus Canigó:
l'aplicació **CircuitBreakerProvider** que només tindrà l'exemple de servei Rest "Equipament" de Canigó, i
l'aplicació **CircuitBreakerConsumer** que consumirà el servei implementat i incorporarà els següents components:

* Component Spring de servei on s’implementarà el patró _Circuit Breaker_ (`EquipamentClientService.java`):

```java
package cat.gencat.circuitbreakerconsumer.config.client;

...

@Service
public class EquipamentClientService {

  private static final String EXTERNAL_EQUIPAMENTS_URL = "http://localhost:8090/equipaments/";
  private final RestTemplate restTemplate;

  public EquipamentClientService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @HystrixCommand(
    fallbackMethod = "getAltenatiuEquipament",
    commandProperties = {
      @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "4"),
      @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
      @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1000")
    })
  public Equipament getClientEquipament(Long equipamentId) {
    return this.restTemplate.getForObject(URI.create(EXTERNAL_EQUIPAMENTS_URL + equipamentId), Equipament.class);
  }

  public Equipament getAltenatiuEquipament(Long equipamentId) {
    Equipament equipament = new Equipament(equipamentId);
    equipament.setNom("equipament genèric");
    equipament.setMunicipi("municipi per defecte");
    return equipament;
  }
}
```


* Component Spring de control Rest que contindrà un endpoint de prova (`EquipamentClientController.java`):

```java
package cat.gencat.circuitbreakerconsumer.endpoints.client;

...

@RestController
@RequestMapping("/equipaments")
public class EquipamentClientController {
  @Inject
  private EquipamentClientService clientService;

  @GetMapping(value = "/externs/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
  public Equipament getClientEquipament(@PathVariable("id") final Long equipamentId) {
    return clientService.getClientEquipament(equipamentId);
  }
}
```


* Configuració de Spring que habilitarà el patró _Circuit Breaker_ dins de l'aplicació (`EquipamentClientConfig.java`):

```java
package cat.gencat.circuitbreakerconsumer.config.client;

...

@EnableHystrixDashboard
@EnableCircuitBreaker
@Configuration
public class EquipamentClientConfig {
  @Bean(name = "restTemplate")
  public RestTemplate getRestTemplate() {
    return new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
  }
}
```

## Resilience4j
---

### Configuració

Caldrà afegir algunes dependències al projecte _Maven_:

 * `resilience4j-circuitbreaker`: proporciona la implementació del patró _Circuit Breaker_.

 * `resilience4j-micrometer`: proporciona la implementació de la generació de mètriques.

 * `spring-boot-starter-actuator`: proporciona la implementació i generació de mètriques.

 * `micrometer-registry-prometheus`: exporta les mètriques en un format per a ser entès per Prometheus.

Exemple de fitxer `pom.xml`:

```xml
  ...

  <dependencies>
    ...
    <dependency>
      <groupId>io.github.resilience4j</groupId>
      <artifactId>resilience4j-circuitbreaker</artifactId>
      <version>1.6.1</version>
    </dependency>
    <dependency>
      <groupId>io.github.resilience4j</groupId>
      <artifactId>resilience4j-micrometer</artifactId>
      <version>1.6.1</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
  </dependencies>

  ...
}
```

Exemple de fitxer `application.yml`:

```yaml

...

# Actuator
management:
  endpoint:
    health:
      #### Show all details of health
      enabled: true
      show-details: always
  endpoints:
    web:
      cors:
        allowed-origins: true
      exposure:
        include: "*"
```

### Desenvolupament

A mode d’exemple, per a aplicar i provar el patró _Circuit Breaker_ es necessitaran dues aplicacions de tipus Canigó:
l'aplicació **CircuitBreakerProvider** que només tindrà l'exemple de servei Rest "Equipament" de Canigó, i
l'aplicació **CircuitBreakerConsumer** que consumirà el servei implementat i incorporarà els següents components:

* Component Spring de servei on s’implementarà el patró _Circuit Breaker_ (`EquipamentClientService.java`):

```java
package cat.gencat.circuitbreakerconsumer.config.client;

...

@Service
public class EquipamentClientService {

  private static final Logger log = LoggerFactory.getLogger(EquipamentClientService.class);
  private static final String EXTERNAL_EQUIPAMENTS_URL = "http://localhost:8090/equipaments/";
  private final RestTemplate restTemplate;
  private final MeterRegistry meterRegistry;
  private final CircuitBreakerRegistry circuitBreakerRegistry;
  private final CircuitBreaker circuitBreaker;

  public EquipamentClientService(RestTemplate restTemplate, MeterRegistry meterRegistry, CircuitBreakerRegistry circuitBreakerRegistry) {
    this.restTemplate = restTemplate;
    this.meterRegistry = meterRegistry;
    this.circuitBreakerRegistry = circuitBreakerRegistry;
    this.circuitBreaker = createCircuitBreaker();
  }

  public Equipament getClientEquipament(Long equipamentId) {
    CheckedFunction0<Equipament> providerServiceCall = CircuitBreaker.decorateCheckedSupplier(circuitBreaker,
      () -> this.restTemplate.getForObject(URI.create(EXTERNAL_EQUIPAMENTS_URL + equipamentId), Equipament.class));
    Try<Equipament> result = Try.of(providerServiceCall).recover(throwable -> getAltenatiuEquipament(equipamentId));
    return result.get();
  }

  public Equipament getAltenatiuEquipament(Long equipamentId) {
    Equipament equipament = new Equipament(equipamentId);
    equipament.setNom("equipament genèric");
    equipament.setMunicipi("municipi per defecte");
    return equipament;
  }

  private CircuitBreaker createCircuitBreaker() {
    CircuitBreakerConfig circuitBreakerConfig = CircuitBreakerConfig.custom()
      .minimumNumberOfCalls(4)
      .failureRateThreshold(50)
      .waitDurationInOpenState(Duration.ofMillis(20000)).build();

    CircuitBreaker breaker = circuitBreakerRegistry.circuitBreaker("equipament-proveidor", circuitBreakerConfig);
    breaker.getEventPublisher()
      .onSuccess(event -> log.info("Truqueu a l'èxit mitjançant circuit breaker"))
      .onCallNotPermitted(event -> log.info("Trucada denegada per circuit breaker"))
      .onError(event -> log.info("La trucada ha fallat mitjançant circuit breaker"));

    return breaker;
  }

  @PostConstruct
  public void init() {
    TaggedCircuitBreakerMetrics
      .ofCircuitBreakerRegistry(circuitBreakerRegistry)
      .bindTo(meterRegistry);
  }
}
```


* Component Spring de control Rest que contindrà un endpoint de prova (`EquipamentClientController.java`):

```java
package cat.gencat.circuitbreakerconsumer.endpoints.client;

...

@RestController
@RequestMapping("/equipaments")
public class EquipamentClientController {
  @Inject
  private EquipamentClientService clientService;

  @GetMapping(value = "/externs/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
  public Equipament getClientEquipament(@PathVariable("id") final Long equipamentId) {
    return clientService.getClientEquipament(equipamentId);
  }
}
```


* Configuració de Spring que habilitarà el patró _Circuit Breaker_ dins de l'aplicació (`EquipamentClientConfig.java`):

```java
package cat.gencat.circuitbreakerconsumer.config.client;

...

@Configuration
public class EquipamentClientConfig {
  @Bean(name = "restTemplate")
  public RestTemplate getRestTemplate() {
    return new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
  }
}
```

## Proves

Per a verificar el funcionament s'iniciaran les dues aplicacions utilitzant ports diferents.
En aquest cas s'utilitzarà el port 8090 (on es troba el servei REST extern) i el port 8095 (on s'aplica el patró _Circuit Breaker_):


```sh
cd CircuitBreakerClient/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8090
```

```sh
cd CircuitBreakerServer/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8095 -Dspring-boot.run.fork=false
```

<br/>
**Prova amb el circuit tancat**

Utilitzant l’eina _Postman_ s'invoca el Servei Rest Consumidor http://localhost:8095/equipaments/externs/10 i,
com es pot veure, respon de la mateixa manera que el Servei Rest Proveïdor http://localhost:8090/equipaments/10:

![Spring circuit Ejemplo 1](/images/howtos/2021-01-02_spring_circuit_example1.gif)

<br/>
**Prova amb el circuit obert**

Si es para l'aplicació del Servei Rest Consumidor i s'invoca el Servei Rest Proveïdor, es pot comprovar que es
desvia per a invocar el mètode de recuperació sense generar errors:

![Spring circuit Ejemplo 2](/images/howtos/2021-01-02_spring_circuit_example2.gif)

<br/>
**Monitorització**

És possible obtenir mètriques de l'execució del patró utilitzant diferents eines com, per exemple, el tauler
bàsic de 'netflix-hystrix-dashboard' o [Prometheus](https://github.com/prometheus/prometheus)/
[Grafana](https://github.com/grafana/grafana).

<br/>
**Mètriques amb 'netflix-hystrix-dashboard'** (http://localhost:8095/hystrix):

![Spring circuit Ejemplo 3](/images/howtos/2021-01-02_spring_circuit_example3.gif)

<br/>
**Mètriques amb Prometheus** (http://localhost:9090/):

![Spring circuit Ejemplo 4](/images/howtos/2021-01-02_spring_circuit_example4.gif)

<br/>
**Mètriques amb Grafana** (http://localhost:3000/):

![Spring circuit Ejemplo 5](/images/howtos/2021-01-02_spring_circuit_example5.gif)

## Conclusió

És possible aplicar patrons de disseny de software sobre projectes generats amb Canigó que incorporen la
tolerància a fallades. Un d'aquests patrons és _Circuit Breaker_ i es pot implementar utilitzant projectes
com [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o
[Resilience4j](https://github.com/resilience4j/resilience4j).