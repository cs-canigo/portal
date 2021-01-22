+++
date        = "2021-01-02"
title       = "Canigó. Como implementar el patrón Circuit Breaker"
description = "Como implementar el patrón Circuit Breaker dentro de un proyecto generado con el framework Canigó."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducción

El objetivo de este artículo es mostrar como implementar el patrón _[Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)_, dentro de un proyecto generado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/).

---
## Justificación

El patrón _Circuit Breaker_ evita que una aplicación intente de manera indefinida una operación que con alta probabilidad vaya a fallar, permitiendo que continúe la aplicación mientras el problema con la operación se resuelve. Adicionalmente, se puede detectar cuando se ha resuelto el problema permitiendo de esta manera volver a ejecutar la operación comprometida. 

Los estados que plantea el patrón son:

 * Closed: El circuito está cerrado y el flujo fluye ininterrumpidamente. Este es el estado inicial, todo funciona bien.

 * Open: El circuito está abierto y el flujo interrumpido. En este estado todas las llamadas al recurso/servicio fallan inmediatamente.

 * Half-Open: El circuito está medio abierto (o medio cerrado) dando una oportunidad al flujo para su restauración. En este estado la aplicación volverá a intentar realizar la petición al servicio/recurso que fallaba.

Algunas de las ventajas son:

 * Monitoreo: Dado que existe un componente que su única funcionalidad es validar el estado de los servicios, es posible tener un monitoreo en tiempo real, que indique los tiempos de respuesta promedio, frecuencia de falla, estado actual del servicio y, sobre todo, notificaciones en tiempo real sí algún servicio comienza a fallar.

 * Sobrecarga: La capacidad de abrir el circuito ante un error o timeout que se estima que va a pasar, ahorra el hecho de tener muchos hilos esperando a que un servicio responda, y si existen miles de usuarios, es probable tener muchísimos hilos detenidos, lo que provocaría que el sistema se sobre cargue, incluso, provocando reacciones en cadena que afecten a otros componentes.

 * Tolerancia a fallas: El patron puede redireccionar la petición, evitando tener que enviarle un error al cliente.


Cuando se utiliza un proyecto creado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) que se basa en Spring, es posible implementar el patrón utilizando los proyectos [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o [Resilience4j](https://github.com/resilience4j/resilience4j)

<div class="message warning">

El proyecto Hystrix ha dejado de desarrollarse de forma activa tal como se indica en: <a href="https://github.com/Netflix/Hystrix/blob/master/README.md">Netflix/Hystrix README</a>. Como alternativa se puede utilizar el proyecto: <a href="https://github.com/resilience4j/resilience4j">Resilience4j</a>.

</div>

---
---
## Spring Cloud Netflix Hystrix

---
### Configuración

Para aplicar este patrón, es necesario agregar algunas dependencias al proyecto maven:

 * 'spring-cloud-starter-netflix-hystrix' contiene la implementación del patrón _Circuit Breaker_.

 * 'spring-cloud-starter-netflix-hystrix-dashboard' contiene un dashboard básico opcional para monitorear el el circuito.
 
 * 'spring-boot-starter-actuator' contiene la implementacíon y generación de métricas.
 
 * 'micrometer-registry-prometheus' exporta las metricas en un formato entendible por Prometheus.

Es importante mantener la relación entre las dependencias de 'Spring Cloud' y la versión de 'Spring Boot', En este caso, sí la versión de 'Spring Boot' es: '2.1.8.RELEASE', entonces le corresponde la versión: 'Greenwich.XX' de 'Spriing Cloud'. 

En esta matriz de compatibilidad se encuentran los detalles: [spring-cloud](https://spring.io/projects/spring-cloud)

Contenido de `pom.xml`

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
    }
  )
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

![Spring circuit Ejemplo 5](/images/howtos/2021-01-02_spring_circuit_example5.png)


---
## Conclusión

 * Es posible aplicar patrones de diseño de software sobre proyectos generados con Canigó que incorporen la tolerancia a fallos. Uno de esos patrones es _Circuit Breaker_ y se puede implementar utilizando proyectos como [Spring Cloud Netflix Hystrix](https://github.com/Netflix/Hystrix) o [Resilience4j](https://github.com/resilience4j/resilience4j)
