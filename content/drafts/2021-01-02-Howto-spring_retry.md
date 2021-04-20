+++
date        = "2021-01-02"
title       = "Canigó. Com utilitzar Spring Retry per a realitzar reintents d'accions"
description = "Com utilitzar Spring Retry per a realitzar reintents d'accions que generen una excepció al executar-se"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar l'ús de la llibreria [Spring Retry](https://mvnrepository.com/artifact/org.springframework.retry/spring-retry) en un projecte
amb el framework Canigó

---
## Justificació

Existeixen escenaris de negoci que requereixen reintentar un procés una vegada hi ha hagut una fallada. Això és útil per exemple, quan es tracte d'errors temporals o transitoris com l'accés a un recurs extern.

_Spring Retry_ pot aplicar-se a diferents formes: 

 * De forma declarativa: Utilitzant només anotacions de Spring. Aquesta forma permet fàcilment i ràpidament aplicar reintents. 
 * De forma imperativa: Utilitzant `RetryTemplate` i les classes del package `org.springframework.retry.backoff` de la llibreria [Spring Retry](https://mvnrepository.com/artifact/org.springframework.retry/spring-retry).
 * Una mescla de les anteriors.

---
## Configuració

Per utilitzar l'opció de reintents en un projecte Canigó, es necessari agregar alguna dependències de maven.

### Canvis al fitxer `pom.xml`

> Els projectes de Canigó ja contenen les dependències de `AspectJ`, que són necessàries perquè funcionin els reintents. Si es vol minimitzar l'impacte d'aquestes llibreries a la cèrrega de l'aplicació, la llibreria mínima necessària seria la llibreria `aspectjweaver`. 

Dependències necessàries:

```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
  </dependency>
```

I les llibreries [spring-retry](https://mvnrepository.com/artifact/org.springframework.retry/spring-retry) i [aspectjweaver](https://mvnrepository.com/artifact/org.aspectj/aspectjweaver)

```xml
  <dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
  </dependency>
  <dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
  </dependency>
```

### Canvis a l'inicialitzador del projecte `Application.java`

> Es necessita afegir l'anotació `@EnableRetry`

```java
  @SpringBootApplication
  @EnableRetry
  public class Application extends SpringBootServletInitializer {
    ...
  }
```


---
## Ús 
### (de forma imperativa)

#### Desenvolupament 

> Configuració de propiedades: `application.yml`

```yaml
retry:
  maxAttempts: 5
  initialIntervalRetries: 1000
  maxIntervalRetries: 3000
  multiplierRetries: 2.0
```

> Es necessari crear un `bean` amb la plantilla que conté el comportament dels reintents. Existeixen diferents estratègies d'espera (back off) ja implementades, com:

 * ExponentialBackOffPolicy: augmenta el període d'espera per cada reintent en un conjunt donat utilitzant la función Math.exp(double).
 * ExponentialRandomBackOffPolicy: escull un múltiple aleatori de l'interval d'espera definit per a cada reintent.

> Exemple de configuració del `bean` utilitzant l'estratègia `ExponentialRandomBackOffPolicy`

```java
@Configuration
public class RetryConfig {
  @Value("${retry.maxAttempts:3}")
  private int maxAttempts;

  @Value("${retry.initialIntervalRetries:1000}")
  private long initialIntervalRetries;

  @Value("${retry.maxIntervalRetries:3000}")
  private long maxIntervalRetries;

  @Value("${retry.multiplierRetries:2.0}")
  private double multiplierRetries;

  @Bean
  public RetryTemplate retryTemplate() {
    RetryTemplate retryTemplate = new RetryTemplate();

    ExponentialRandomBackOffPolicy backOffPolicy = new ExponentialRandomBackOffPolicy();
    backOffPolicy.setInitialInterval(initialIntervalRetries);
    backOffPolicy.setMultiplier(multiplierRetries);
    backOffPolicy.setMaxInterval(maxIntervalRetries);
    retryTemplate.setBackOffPolicy(backOffPolicy);

    SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
    retryPolicy.setMaxAttempts(maxAttempts);
    retryTemplate.setRetryPolicy(retryPolicy);

    return retryTemplate;
  }
}
```

> A la capa de servei és necessari injectar la plantilla `retryTemplate` i utilitzar el mètode `execute` per embolcallar el contingut dels mètodes que requereixen reintents.

```java
@Service("equipamentService")
public class EquipamentServiceImpl implements EquipamentService {
  @Inject
  private EquipamentRepository repository;

  @Inject
  private RetryTemplate retryTemplate;

  @Override
  public List<Equipament> findAll() {
    return retryTemplate.execute(arg -> repository.findAll());
  }

  ...
}
```

#### Proves 

> Proves unitàries que plantegen 2 escenaris: 

* Reintentar 3 vegades, les 2 primeres generen una excepció, i l'última respon correctament.
* Reintentar 5 vegades, en totes les execucions es genera una excepció, a l'arribar al màxim de reintents es mostra l'excepció.

> Configuració: `/test/resources/spring/canigo-core.xml`

```xml
  <context:component-scan base-package="cat.gencat.retrycanigoexample.service, cat.gencat.retrycanigoexample.config.retry" />
```

> Test:

```java
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = { "classpath:spring/canigo-core.xml" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EquipamentRetryTemplateTest {
  @Inject
  private RetryTemplate retryTemplate;

  @Inject
  @Named("equipamentRetryService")
  private EquipamentService equipamentRetryService;

  @Inject
  @Named("equipamentRetryExceptionService")
  private EquipamentService equipamentRetryExceptionService;

  @Before
  public void settingUp() {
    assertNotNull(retryTemplate);
    assertNotNull(equipamentRetryService);
    assertNotNull(equipamentRetryExceptionService);
  }

  @Test
  public void testRetryWithFinalResponse() throws RetryException {
    List<Equipament> equipaments = retryTemplate.execute(arg -> this.equipamentRetryService.findAll());
    verify(equipamentRetryService, times(3)).findAll();
    assertFalse(equipaments.isEmpty());
  }
  
  @Test(expected = RetryException.class)
  public void testRetryWithFinalException() throws RetryException {
    List<Equipament> equipaments = retryTemplate.execute(arg -> this.equipamentRetryExceptionService.findAll());
    verify(equipamentRetryExceptionService, times(5)).findAll();
    assertTrue(equipaments.isEmpty());
  }

  @Configuration
  @EnableAspectJAutoProxy
  public static class SpringConfig {
    @Bean("equipamentRetryService")
    public EquipamentService equipamentRetryService() throws Exception {
      EquipamentService equipamentService = mock(EquipamentService.class);
      Equipament equipament = mock(Equipament.class);

      when(equipamentService.findAll())
        .thenThrow(new RetryException("Remote Exception 1"))
        .thenThrow(new RetryException("Remote Exception 2"))
        .thenReturn(Collections.singletonList(equipament));
      return equipamentService;
    }

    @Bean("equipamentRetryExceptionService")
    public EquipamentService equipamentRetryExceptionService() throws Exception {
      EquipamentService equipamentService = mock(EquipamentService.class);

      when(equipamentService.findAll())
        .thenThrow(new RetryException("Remote Exception 1"))
        .thenThrow(new RetryException("Remote Exception 2"))
        .thenThrow(new RetryException("Remote Exception 3"))
        .thenThrow(new RetryException("Remote Exception 4"))
        .thenThrow(new RetryException("Remote Exception 5"));
      return equipamentService;
    }
  }
}
```

![Spring Retry Exemple 1](/images/howtos/2021-01-02_spring_retry_example1.gif)


> Proves utilitzant Postman

> Es modificar la capa de serveis per crear un mètode que generi excepcions durant les primeres execucions, i després consulti correctament la capa de persistència.

```java
@Service("equipamentService")
public class EquipamentServiceImpl implements EquipamentService {

  private static final Logger logger = LoggerFactory.getLogger(EquipamentServiceImpl.class);
  private int counter = 0;

  @Inject
  private EquipamentRepository repository;

  @Inject
  private RetryTemplate retryTemplate;

  @Override
  public Page<Equipament> findPaginated(final Integer page, final Integer rpp, final String sort, final String filter) {
    return retryTemplate.execute(arg -> {
      if(++counter != 5) {
        logger.error("findPaginated retry = {}", counter);
        throw new RetryException("findPaginated retry");
      }
      counter = 0;
      return findAllPaginated(page, rpp, sort, filter);
    });
  }

  private Page<Equipament> findAllPaginated(final Integer page, final Integer rpp, final String sort, final String filter) {
    GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<>(Equipament.class, "equipament");
    builder.populateSearchCriteria(filter);
    Pageable pageable = PageRequest.of(page - 1, rpp, getOrdenacio(sort));
    return repository.findAll(builder.build(), pageable);
  }

  ...
}
```

![Spring Retry Exemple 2](/images/howtos/2021-01-02_spring_retry_example2.gif)


---
### (de forma declarativa)

#### Desenvolupament 

> Crearem una nova capa on li agregarem l'anotació `@Retryable` amb la configuració dels reintents a cada mètode on es vulgui aplicar reintents. Això és així, ja que els reintents es gestionen amb aspectes (AspectJ) i el mètode que es configura amb les anotacions ha de ser diferent del mètode que genera l'excepció.

```java
@Service
public class RetryService {
  @Inject
  private EquipamentService equipamentService;

  public void setEquipamentService(EquipamentService equipamentService) {
    this.equipamentService = equipamentService;
  }

  @Retryable(value = {RetryException.class}, maxAttempts = 5, backoff = @Backoff(1000))
  public List<Equipament> findAll() {
    return equipamentService.findAll();
  }

  @Retryable(value = {RetryException.class}, maxAttempts = 5, backoff = @Backoff(3000))
  public Page<Equipament> findPaginated(final Integer page, final Integer rpp, final String sort, final String filter) {
    return equipamentService.findPaginated(page, rpp, sort, filter);
  }
}
```

> Perquè la capa de serveis rest utilitzi els reintents, ha d'invocar a la nova capa amb les anotacions (RetryService del exemple) i no directament a la capa de servei (EquipamentService del exemple).

```java
@RestController
@RequestMapping("/equipaments")
public class EquipamentServiceController {
  @Inject
  private RetryService retryService;

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public ResponsePage<Equipament> findPaginated(
    @ApiParam(value = "Nombre de p&agrave;gines") @RequestParam(defaultValue = "1", value = "page", required = false) final Integer page,
    @ApiParam(value = "Valors per p&agrave;gina") @RequestParam(defaultValue = "10", value = "rpp", required = false) final Integer rpp,
    @ApiParam(value = "Camp Ordenaci&oacute; Ex(id,-municipi)") @RequestParam(defaultValue = "id,-municipi", value = "sort", required = false) final String sort,
    @ApiParam(value = "Filtre Ex(Municipi:Cambrils)") @RequestParam(value = "filter", required = false) final String filter) {

    Page<Equipament> equipaments = retryService.findPaginated(page, rpp, sort, filter);
    long offset = Long.valueOf(equipaments.getNumber()) * equipaments.getSize();
    Data<Equipament> data = new Data<>(equipaments.getTotalElements(), equipaments.getSize(),
      equipaments.getNumberOfElements(), offset, equipaments.getContent());

    return new ResponsePage<>(data);
  }
}
```

#### Proves 

> Proves unitàries que plantegen 2 escenaris:  

* Reintentar 3 vegades, les 2 primeres generen una excepció, i l'última respon correctament.
* Reintentar 5 vegades, en totes les execucions es genera una excepció, a l'arribar al màxim de reintents es mostra l'excepció.

```java
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = { "classpath:spring/canigo-core.xml" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EquipamentRetryTemplateTest {
  @Inject
  private RetryService retryService;

  @Inject
  @Named("equipamentRetryService")
  private EquipamentService equipamentRetryService;

  @Inject
  @Named("equipamentRetryExceptionService")
  private EquipamentService equipamentRetryExceptionService;

  @Before
  public void settingUp() {
    assertNotNull(retryService);
    assertNotNull(equipamentRetryService);
    assertNotNull(equipamentRetryExceptionService);
  }

  @Test
  public void testRetryWithFinalResponse() throws RetryException {
    retryService.setEquipamentService(equipamentRetryService);
    List<Equipament> equipaments = this.retryService.findAll();
    verify(equipamentRetryService, times(3)).findAll();
    assertFalse(equipaments.isEmpty());
  }

  @Test(expected = RetryException.class)
  public void testRetryWithFinalException() throws RetryException {
    retryService.setEquipamentService(equipamentRetryExceptionService);
    List<Equipament> equipaments = this.retryService.findAll();
    verify(equipamentRetryExceptionService, times(5)).findAll();
    assertTrue(equipaments.isEmpty());
  }

  @Configuration
  @EnableRetry
  public static class SpringConfig {
    @Bean("equipamentRetryService")
    public EquipamentService equipamentRetryService() throws Exception {
      EquipamentService equipamentService = mock(EquipamentService.class);
      Equipament equipament = mock(Equipament.class);
      when(equipamentService.findAll())
        .thenThrow(new RetryException("Remote Exception 1"))
        .thenThrow(new RetryException("Remote Exception 2"))
        .thenReturn(Collections.singletonList(equipament));
      return equipamentService;
    }

    @Bean("equipamentRetryExceptionService")
    public EquipamentService equipamentRetryExceptionService() throws Exception {
      EquipamentService equipamentService = mock(EquipamentService.class);
      when(equipamentService.findAll())
        .thenThrow(new RetryException("Remote Exception 1"))
        .thenThrow(new RetryException("Remote Exception 2"))
        .thenThrow(new RetryException("Remote Exception 3"))
        .thenThrow(new RetryException("Remote Exception 4"))
        .thenThrow(new RetryException("Remote Exception 5"));
      return equipamentService;
    }
  }
}
```

![Spring Retry Exemplo 3](/images/howtos/2021-01-02_spring_retry_example3.gif)


> Proves utilitzant Postman

> Es modifica la capa de servei per a crear un mètode que genera excepcions durant les primeres execucions, després consulta correctament la capa de persistència.

```java
@Service("equipamentService")
public class EquipamentServiceImpl implements EquipamentService {

  private static final Logger logger = LoggerFactory.getLogger(EquipamentServiceImpl.class);

  private int counter = 0;

  @Inject
  private EquipamentRepository repository;

  ...

  @Override
  public Page<Equipament> findPaginated(final Integer page, final Integer rpp, final String sort, final String filter) {
    if(++counter != 5) {
      logger.error("findPaginated retry = {}", counter);
      throw new RetryException("findPaginated retry");
    }
    counter = 0;
    GenericPredicateBuilder<Equipament> builder = new GenericPredicateBuilder<>(Equipament.class, "equipament");
    builder.populateSearchCriteria(filter);
    Pageable pageable = PageRequest.of(page - 1, rpp, getOrdenacio(sort));
    return repository.findAll(builder.build(), pageable);
  }

  ...
}
```

![Spring Retry Exemplo 4](/images/howtos/2021-01-02_spring_retry_example4.gif)


---
## Conclusió

 * Implementar l'opció de reintents a través de Spring permet crear processos robusts amb tolerància a fallades ocasionals, sobretot associats al consum de serveis externs.
 * Utilitzar la implementació imperativa permet reutilitzar patrons de reintents sense haver que repetir configuracions a vàries anotacions.
 * Utilitzar la implementació declarativa és més senzilla d'implementar, només requereix d'anotacions, encara que té algunes consideracions, tals com: 
    - S'han de generar excepcions en el mètode que es vol reintentar. Si es llança l'excepció en el mètode que conté l'anotació `@Retryable`, els reintents no es realitzaran.
    - El mètode recuperable ha de ser públic i les crides a aquest mètode han de ser d'una classe externa perquè els reintents es realitzin.
