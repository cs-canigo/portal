+++
date        = "2021-01-02"
title       = "Canigó. Com utilitzar Spring Retry per a realitzar reintents d'accions"
description = "Com utilitzar Spring Retry per a realitzar reintents d'accions que generen una excepció en executar-se"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar l'ús de la llibreria [Spring Retry](https://github.com/spring-projects/spring-retry)
per a projectes generats amb el Framework Canigó.

## Justificació

Existeixen escenaris de negoci que requereixen la possibilitat de reintentar una determinada operació quan s’ha produït una
fallada. Això és especialment útil quan es tracta d'errors temporals o transitoris com l'accés a un recurs extern.
_Spring Retry_ pot aplicar-se mitjançant diferents modalitats:

 * Modalitat declarativa: utilitzant únicament anotacions d’Spring permet aplicar reintents de forma senzilla i ràpida.

 * Modalitat imperativa: utilitzant `RetryTemplate` i les classes del package `org.springframework.retry.backoff` de la
 llibreria [Spring Retry](https://github.com/spring-projects/spring-retry) per a aplicar patrons de reintent.

Tot i que també es pot optar per combinar-les.

## Configuració

Per a utilitzar l'opció de reintents en un projecte generat amb el Framework Canigó, serà necessari afegir algunes dependències i
configuracions que es detallen a continuació.

### Dependències a afegir al fitxer `pom.xml`


```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
  </dependency>
```

També serà necessari afegir les llibreries [spring-retry](https://mvnrepository.com/artifact/org.springframework.retry/spring-retry)
i [aspectjweaver](https://mvnrepository.com/artifact/org.aspectj/aspectjweaver):

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

Els projectes generats amb el Framework Canigó ja disposen de les dependències de `AspectJ` necessàries
perquè funcioni el sistema de reintents. No obstant això, si es vol minimitzar l'impacte d'aquestes llibreries a la càrrega
de l'aplicació, la llibreria `aspectjweaver` serà la mínima necessària.

### Canvis a l'inicialitzador del projecte `Application.java`

Caldrà afegir l'anotació `@EnableRetry`:

```java
  @SpringBootApplication
  @EnableRetry
  public class Application extends SpringBootServletInitializer {
    ...
  }
```


## Funcionament

### Modalitat imperativa

<br/>
#### Implementació

Configuració de propietats al fitxer `application.yml`:

```yaml
retry:
  maxAttempts: 5
  initialIntervalRetries: 1000
  maxIntervalRetries: 3000
  multiplierRetries: 2.0
```

Serà necessari crear un `bean` amb la plantilla que conté el comportament dels reintents. Existeixen diferents
estratègies d'espera (back off) ja implementades com:

 * **ExponentialBackOffPolicy**: augmenta el període d'espera per a cada reintent en un conjunt donat utilitzant la
 funció Math.exp(double).

 * **ExponentialRandomBackOffPolicy**: escull un múltiple aleatori de l'interval d'espera definit per a cada reintent.

Exemple de configuració del `bean` utilitzant l'estratègia **ExponentialRandomBackOffPolicy**:

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

A la capa de servei serà necessari injectar la plantilla `retryTemplate` i utilitzar el mètode `execute` per a
embolcallar el contingut dels mètodes que requereixen reintents:

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

<br/>
#### Proves

<br/>
##### Proves unitàries

Es plantegen dos escenaris:

* Reintentar 3 vegades, les 2 primeres generen una excepció i l'última respon correctament.
* Reintentar 5 vegades, totes les execucions generen una excepció i, en arribar al màxim de reintents, es mostra l'excepció.

Configuració `/test/resources/spring/canigo-core.xml`:

```xml
  <context:component-scan base-package="cat.gencat.retrycanigoexample.service, cat.gencat.retrycanigoexample.config.retry" />
```

Test:

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

<br/>
##### Proves utilitzant l'eina *Postman*

Serà necessari modificar la capa de serveis per a crear un mètode que generi excepcions durant les primeres execucions
i després consulti correctament la capa de persistència:

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


### Modalitat declarativa

<br/>
#### Implementació

Crearem una nova capa on li agregarem l'anotació `@Retryable` amb la configuració dels reintents a cada mètode on es
vulgui aplicar. Cal fer-ho així donat els reintents es gestionen amb aspectes (`AspectJ`) i el mètode que es
configura amb les anotacions ha de ser diferent del mètode que genera l'excepció.

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

Perquè la capa de serveis rest utilitzi els reintents, haurà d'invocar a la nova capa amb les anotacions
(`RetryService` a l’exemple) i no directament a la capa de servei (`EquipamentService` a l’exemple):

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

<br/>
#### Proves

<br/>
##### Proves unitàries

Es plantegen dos escenaris:

* Reintentar 3 vegades, les 2 primeres generen una excepció i l'última respon correctament.
* Reintentar 5 vegades, totes les execucions generen una excepció i, en arribar al màxim de reintents, es mostra l'excepció.

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

<br/>
##### Proves utilitzant l’eina *Postman*

Cal modificar la capa de servei per a crear un mètode que generi excepcions durant les primeres execucions i després
consulti correctament la capa de persistència:

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


## Conclusió

 * Implementar l'opció de reintents a través de Spring permet crear **processos robusts amb tolerància a fallades ocasionals**,
 principalment pel que fa a processos associats al consum de serveis externs.

 * Utilitzar la **implementació imperativa permet reutilitzar patrons de reintents** sense haver de repetir
 configuracions a diferents anotacions.

 * Utilitzar la **implementació declarativa és més senzilla d'implementar** donat només requereix anotacions,
 encara que té algunes consideracions tals com:

    - S'han de generar excepcions en el mètode que es vol reintentar, ja que si es llança l'excepció en el
    mètode que conté l'anotació `@Retryable` els reintents no es realitzaran.

    - El mètode recuperable ha de ser públic i les crides a aquest mètode han de ser d'una classe externa
    perquè els reintents es realitzin.