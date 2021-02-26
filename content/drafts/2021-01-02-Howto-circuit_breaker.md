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

![Spring circuit Diagrama](/images/howtos/2021-01-02_spring_circuit_diagrama.png)

Els estats que tracta el patró són:

 * Closed: El circuit està tancat i el fluxe flueix ininterrumpudament. Aquest és l'estat inicial, tot funciona bé.

 * Open: El circuit està obert i el fluxe interrumput. En aquest estat totes les crides al recurs/servei fallen inmediatament.

 * Half-Open: El circuit està mig obert (o mig tancat) donant una oportunitat al fluxe per a la seva restauració. En aquest estat l'aplicació tornarà a intentar realizar l'operació que fallava.

Algunas dels avantatges són:

 * Monitoreig: Danat que existeix un component que la seva única funcionalitat és validar l'estat dels serveis, és possible tenir un monitoreig a tiemps real, que indiqui els temps de resposta promig, freqüència de fallada, estat actual del servei i, sobre tot, notificacions en temps real si algún servei comença a fallar.

 * Sobrecarga: La capacitat d'obrir el circuit per un error o timeout que s'estima que passarà, ens estalvia el fet de tenir molts fills esperant a que un servei respongui, i si existen miles d'usuaris, és probable que s'arribi a tenir molts fils parats, el que provocaria que el sistema es sobrecargués, arribant a provocar reaccions en cadena que afectessin a altres components.

 * Tolerància a fallos: El patró pot redireccionar la petició, evitant tenir que respondre amb un error al client.


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

 * 'spring-cloud-starter-netflix-hystrix-dashboard' conté un panell bàsic opcional per monitoritzar el circuit.
 
 * 'spring-boot-starter-actuator' conté la implementacíon i generació de mètriques.
 
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

Contenido de `application.yml`

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

Per aplicar i provar el patró _Circuit Breaker_, es necessitaran 2 aplicacions, les dues de tipus Canigó. La primera (CircuitBreakerProvider) només tindrà l'exemple de servei Rest "Equipament" que conté Canigó. I la segona (CircuitBreakerConsumer) consumirà el servicio de la primera aplicació i tindrà els següents components: 

* Un component Spring de servei on s'aplicarà el patró _Circuit Breaker_.
* Un component Spring de control Rest que conté un endpoint de prova.
* Una configuració de Spring que habiliti el patró _Circuit Breaker_ dins de l'aplicación.

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

Contenido de `EquipamentClientController.java`

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

> Ejemplo de configuración de Spring:

Contenido de `EquipamentClientConfig.java`

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
### Configuración

Es necesario agregar algunas dependencias al proyecto maven:

 * 'resilience4j-circuitbreaker' contiene la implementación del patrón _Circuit Breaker_.
 
 * 'resilience4j-micrometer' contiene la implementación de la generación de métricas.
 
 * 'spring-boot-starter-actuator' contiene la implementacíon y generación de métricas.
 
 * 'micrometer-registry-prometheus' exporta las metricas en un formato entendible por Prometheus.

Contenido de `pom.xml`

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

Contenido de `application.yml`

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
### Desarrollo 

Para aplicar el patrón _Circuit Breaker_, se van a requerir, en este caso de ejemplo, 2 aplicaciones, ambas generadas con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/). La primera (CircuitBreakerProvider) solo tendría el ejemplo de servicio Rest "Equipament" que contiene Canigó. Y la segunda (CircuitBreakerConsumer) consumiría el servicio de la primera y tendría los siguientes componentes: 

* Un componente Spring de servicio donde se implementa el patrón _Circuit Breaker_.
* Un componente Spring de control Rest que contiene un endpoint de prueba.
* Una configuración de Spring que habilité el patrón _Circuit Breaker_ dentro de la aplicación.

> Ejemplo del componente de servicio con el patrón _Circuit Breaker_:

Contenido de `EquipamentClientService.java`

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

> Ejemplo del componente de control:

Contenido de `EquipamentClientController.java`

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

> Ejemplo de configuración de Spring:

Contenido de `EquipamentClientConfig.java`

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
## Pruebas 

> Para probar el funcionamiento se inician las 2 aplicaciones utilizando puertos diferentes, en este caso se utiliza el puerto: 8090 (donde se encuentra el servicio REST externo) y el puerto: 8095 (donde se aplica el patrón)


```sh
cd CircuitBreakerClient/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8090
```

```sh
cd CircuitBreakerServer/
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8095 -Dspring-boot.run.fork=false
```

---
> Prueba con el circuito cerrado

* Utilizando Postman se invoca el Servicio Rest Consumidor, en este caso: http://localhost:8095/equipaments/externs/10 y responde igual que el Servicio Rest Proveedor: http://localhost:8090/equipaments/10

![Spring circuit Ejemplo 1](/images/howtos/2021-01-02_spring_circuit_example1.gif)

---
> Prueba con el circuito abierto

* Si se detiene la aplicación del Servicio Rest Consumidor, y se invoca el Servicio Rest Proveedor, se comprueba que se desvia para invocar el método de recuperación, sin generar errores

![Spring circuit Ejemplo 2](/images/howtos/2021-01-02_spring_circuit_example2.gif)

---
> Monitorización

* Es posible obtener métricas de la ejecución del patrón utilizando distintas herramientas, por ejemplo, el tablero básico de 'netflix-hystrix-dashboard', o con [Prometheus](https://github.com/prometheus/prometheus)/[Grafana](https://github.com/grafana/grafana).

 * Métricas con 'netflix-hystrix-dashboard'

> http://localhost:8095/hystrix

![Spring circuit Ejemplo 3](/images/howtos/2021-01-02_spring_circuit_example3.gif)

 * Métricas con Prometheus

> http://localhost:9090/

![Spring circuit Ejemplo 4](/images/howtos/2021-01-02_spring_circuit_example4.gif)

 * Métricas con Grafana

> http://localhost:3000/

![Spring circuit Ejemplo 5](/images/howtos/2021-01-02_spring_circuit_example5.gif)


---
## Conclusión

 * Es posible aplicar patrones de diseño de software sobre proyectos generados con Canigó que incorporen la tolerancia a fallos. Uno de esos patrones es _Circuit Breaker_ y se puede implementar utilizando proyectos como [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o [Resilience4j](https://github.com/resilience4j/resilience4j)
