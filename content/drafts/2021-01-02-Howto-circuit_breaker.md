+++
date        = "2021-01-02"
title       = "Canigó. Com implementar el patró Circuit Breaker"
description = "Com implementar el patró Circuit Breaker dins d'un projecte generat amb el framework Canigó."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar com implementar el patró _[Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)_, dins d'un projecte Canigó.

---
## Justificació

El patró _Circuit Breaker_ evita que una aplicació intenti de manera indefinida una operació que amb alta probabilitat vagi a fallar, permetent que continui l'aplicació mentres el problema amb l'operació es resolt. Adicionalment, es pot detectar quan s'ha resolt el problema permetent d'aquesta manera tornar a executar l'operació compromesa. 

![Spring circuit Diagrama](/images/howtos/2021-01-02_spring_circuit_diagrama.drawio.png)

Els estats que tracta el patró són:

 * Closed: El circuit està tancat i el fluxe flueix ininterrumpudament. Aquest és l'estat inicial, tot funciona bé.

 * Open: El circuit està obert i el fluxe interrumput. En aquest estat totes les crides al recurs/servei fallen inmediatament.

 * Half-Open: El circuit està mig obert (o mig tancat) donant una oportunitat al fluxe per a la seva restauració. En aquest estat l'aplicació tornarà a intentar realizar l'operació que fallava.

Algunas dels avantatges són:

 * Monitoreig: Danat que existeix un component que la seva única funcionalitat és validar l'estat dels serveis, és possible tenir un monitoreig a tiemps real, que indiqui els temps de resposta promig, freqüència de fallada, estat actual del servei i, sobre tot, notificacions en temps real si algún servei comença a fallar.

 * Sobrecarga: La capacitat d'obrir el circuit per un error o timeout que s'estima que passarà, ens estalvia el fet de tenir molts fills esperant a que un servei respongui, i si existen miles d'usuaris, és probable que s'arribi a tenir molts fils parats, el que provocaria que el sistema es sobrecargués, arribant a provocar reaccions en cadena que afectessin a altres components.

 * Tolerància a fallades: El patró pot redireccionar la petició, evitant tenir que respondre amb un error al client.


Quan s'utilitza un projecte Canigó que se basa en Spring, és possible implementar el patró utilitzant els projectes [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o [Resilience4j](https://github.com/resilience4j/resilience4j)

<div class="message warning">

El projecte Hystrix han deixat de desenvolupar-lo de forma activa tal i com s'indica a: <a href="https://github.com/Netflix/Hystrix/blob/master/README.md">Netflix/Hystrix README</a>. Com alternativa es pot utilitzar el proyecte: <a href="https://github.com/resilience4j/resilience4j">Resilience4j</a>.

</div>

---
---
## Spring Cloud Netflix Hystrix

---
### Configuració

Per aplicar aquest patró, és necessari agregar algunes dependències al projecte maven:

 * 'spring-cloud-starter-netflix-hystrix' conté la implementación del patró _Circuit Breaker_.

 * 'spring-cloud-starter-netflix-hystrix-dashboard' conté un panell bàsic. Opcional per monitoritzar el circuit.
 
 * 'spring-boot-starter-actuator' conté la implementació i generació de mètriques.
 
 * 'micrometer-registry-prometheus' exporta les mètriques en un format per ser entès per Prometheus.

És important mantenir la relació entre les dependències de 'Spring Cloud' i la versió de 'Spring Boot'. En aquest cas, si la versió de 'Spring Boot' és: '2.1.8.RELEASE', llavorç li correspon la versió: 'Greenwich.XX' de 'Spriing Cloud'. 

A aquesta matriu de compatibilidad es troben els detalls: [spring-cloud](https://spring.io/projects/spring-cloud)

Contingut del `pom.xml`

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

Contingut de `application.yml`

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

---
### Desenvolupament 

Per aplicar i provar el patró _Circuit Breaker_, es necessitaran 2 aplicacions, les dues de tipus Canigó. La primera (CircuitBreakerProvider) només tindrà l'exemple de servei Rest "Equipament" que conté Canigó. I la segona (CircuitBreakerConsumer) consumirà el servei de la primera aplicació i tindrà els següents components: 

* Un component Spring de servei on s'aplicarà el patró _Circuit Breaker_.
* Un component Spring de control Rest que conté un endpoint de prova.
* Una configuració de Spring que habiliti el patró _Circuit Breaker_ dins de l'aplicació.

> Exemple del component de servei amb el patró _Circuit Breaker_:

Contingut de `EquipamentClientService.java`

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

> Exemple del component de control:

Contingut de `EquipamentClientController.java`

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

> Exemple de configuració de Spring:

Contingut de `EquipamentClientConfig.java`

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

---
---
## Resilience4j

---
### Configuració

Es necesari agregar algunes dependències al projecte maven:

 * 'resilience4j-circuitbreaker' conté la implementacin del patró _Circuit Breaker_.
 
 * 'resilience4j-micrometer' conté la implementació de la generació de mètriques.
 
 * 'spring-boot-starter-actuator' conté la implementació i generació de mètriques.
 
 * 'micrometer-registry-prometheus' exporta les mètriques en un format entendible per Prometheus.

Contingut de `pom.xml`

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

Contingut de `application.yml`

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

---
### Desenvolupament 

Per aplicar el patró _Circuit Breaker_, serà necessari, en aquest cas d'exemple, 2 aplicacions, les dues generades amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/). La primera (CircuitBreakerProvider) només tindrà l'exemple de servei Rest "Equipament" que conté Canigó, i la segona (CircuitBreakerConsumer) consumirà el servei de la primera i tindrà els següents components: 

* Un component Spring de servei on s'implementa el patró _Circuit Breaker_.
* Un component Spring de control Rest que conté un endpoint de prova.
* Una configuració de Spring que habili el patró _Circuit Breaker_ dins de l'aplicació.

> Exemple del component de servei amb el patró _Circuit Breaker_:

Contingut de `EquipamentClientService.java`

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

> Exemple del component de control:

Contingut de `EquipamentClientController.java`

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

> Exemple de configuració de Spring:

Contingut de `EquipamentClientConfig.java`

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


---
## Proves 

> Per provar el funcionament s'iniciaran les 2 aplicacions utilitzant ports diferents, en aquest cas s'utiliza el port: 8090 (on es troba el servei REST extern) i el port: 8095 (on s'aplica el patró)


```sh
cd CircuitBreakerClient/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8090
```

```sh
cd CircuitBreakerServer/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8095 -Dspring-boot.run.fork=false
```

---
> Prova amb el circuit tancat

* Utilitzant Postman s'invoca el Servei Rest Consumidor, en aquest cas: http://localhost:8095/equipaments/externs/10 i respon igual que el Servicio Rest Proveedor: http://localhost:8090/equipaments/10

![Spring circuit Ejemplo 1](/images/howtos/2021-01-02_spring_circuit_example1.gif)

---
> Prova amb el circuit obert

* Si es para l'aplicació del Servei Rest Consumidor, i s'invoca el Servei Rest Proveedor, es comprova que es desvia per invocar el mètode de recuperació, sense generar errors

![Spring circuit Ejemplo 2](/images/howtos/2021-01-02_spring_circuit_example2.gif)

---
> Monitorització

* És possible obtenir mètriques de l'execució del patró utilitzant diferents eines, per exemple, el tabler bàsic de 'netflix-hystrix-dashboard', o amb [Prometheus](https://github.com/prometheus/prometheus)/[Grafana](https://github.com/grafana/grafana).

 * Mètriques amb 'netflix-hystrix-dashboard'

> http://localhost:8095/hystrix

![Spring circuit Ejemplo 3](/images/howtos/2021-01-02_spring_circuit_example3.gif)

 * Mètriques con Prometheus

> http://localhost:9090/

![Spring circuit Ejemplo 4](/images/howtos/2021-01-02_spring_circuit_example4.gif)

 * Mètriques con Grafana

> http://localhost:3000/

![Spring circuit Ejemplo 5](/images/howtos/2021-01-02_spring_circuit_example5.gif)


---
## Conclusió

 * És possible aplicar patrons de disseny de software sobre projectes generats amb Canigó que incorporen la tolerància a fallades. Un d'aquests patrons és _Circuit Breaker_ i es pot implementar utilitzant projectes como [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o [Resilience4j](https://github.com/resilience4j/resilience4j)
