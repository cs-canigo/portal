+++
date = "2021-10-22"
title = "Actualització Canigó 3.4 a Canigó 3.6"
description = "Com actualitzar una aplicació Canigó 3.4 a Canigó 3.6"
section = "howtos"
categories = ["canigo"]
key = "DESEMBRE2021"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin **actualitzar a Canigó 3.6 la seva aplicació Canigó 3.4**.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.6 del Framework Canigó.

### Introducció

El mes de **novembre del 2021 s'ha publicat la versió 3.6 del Framework Canigó**. Aquesta versió és una
[versió LTS](/canigo/roadmap) i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de
tenir un suport continuat, així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquest Howto és mostrar els procediments necessaris per a actualitzar una aplicació realitzada
amb Canigó 3.4 i el punt de partida d'aquesta guia és una aplicació creada amb el plugin de Canigó per l'Eclipse.

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) podeu consultar les versions
dels mòduls i components de Canigó de les versions 3.4.x i 3.6.x. Per tant, caldrà **actualitzar els intervals de
versions dels mòduls utilitzats per l'aplicació** per a migrar a Canigó 3.6.

La versió parent de Spring Boot és la 2.5.4, per tant, per una aplicació amb Spring Boot, la secció parent seria
com el que es mostra a continuació:

```
   <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.5.4</version>
   </parent>
```

### Passes a realitzar

Un cop actualitzades les versions dels mòduls segons indicat a la secció anterior, serà necessari realitzar
els següents passos:

**1.** Substituir la constant 'MediaType.APPLICATION_JSON_UTF8_VALUE' per 'MediaType.APPLICATION_JSON_VALUE'

**2.** Els clients dels mòduls d'integració amb Serveis Web Soap s'han generat amb 'CXF' i la transformació d'objectes
Java a XML i XML a Java es realitza amb 'JAXB'. Aquest canvi té les següents implicacions:


- 2.1. Tots els objectes generats són objectes independents continguts dins del package i no com a subclasses.
Per exemple, de:
```
net.gencat.scsp.esquemes.avisos.smsResponse.SMSResponseDocument.SMSResponse
```
a:
```
net.gencat.scsp.esquemes.avisos.smsresponse.SMSResponse
```

- 2.2. Els noms del packages segueixen la convenció de noms i, per tant, seran tots en minúscules.
Per exemple, de:
```
net.gencat.scsp.esquemes.avisos.smsResponse.SMSResponseDocument.SMSResponse
```
a:
```
net.gencat.scsp.esquemes.avisos.smsresponse.SMSResponse
```

- 2.3. Modificar la forma de crear els objectes Java dels clients dels serveis web utilitzant sempre
l’`ObjectFactory` de cada package. Per exemple, de:
```
SMSRequest sms = SMSRequestDocument.Factory.newInstance().addNewSMSRequest();
```
a:
```
SMSRequest sms = new net.gencat.scsp.esquemes.avisos.smsrequest.ObjectFactory().createSMSRequest();
```

**-** Modificar la forma de parseig d’XML a objectes Java usant `unmarshall`. Per exemple, de:
```
SMSResponse docUuid = SMSResponseDocument.Factory.parse(nodeResposta).getSMSResponse();
```
a:
```
SMSResponse docUuid = (SMSResponse) JAXBContext.newInstance(SMSResponse.class).createUnmarshaller().unmarshal(nodeResposta);
```

**3.** Estandaritzar els noms dels package dels mòduls que no acompleixen els estàndards.
Per exemple, `cat.gencat.ctti.canigo.arch.support.resizeImg` passa a ser: `cat.gencat.ctti.canigo.arch.support.resizeimg`

**4.** En el mòdul `canigo.integration.sarcat.planificat` s'han organitzat els objectes, per tant, serà necessari reimportar-los.

**5.** Els mètodes 'findAll' de 'GenericRepository' que facin ús de _predicate_, aquest no podrà ser nul.
En cas que el _predicate_ sigui nul, cal utilitzar el mètode 'findAll' sense el _predicate_. Per exemple de:
```
return repository.findAll(predicate, pageable)
```
a:
```
return predicate != null ? repository.findAll(predicate, pageable) : repository.findAll(pageable);
```

**6.** Per a configurar la connexió amb Mongodb s'utilitza 'MongoClientSettings' en lloc de 'MongoClientOptions'.
Per exemple, de:
```
@Configuration
public class EquipamentMongoConfig extends MongoCoreConfig {

   /** mongo client options. */
   protected static MongoClientOptions mongoClientOptions;

   /**
    * Inicialitza equipament mongo config.
    */
   public EquipamentMongoConfig() {
      super(mongoOptions());
   }

   /**
    * Mongo equipament listener.
    *
    * @return mongo equipament listener
    */
   @Bean
   public MongoEquipamentListener mongoEquipamentListener() {
      return new MongoEquipamentListener();
   }

   /**
    * Mongo options.
    *
    * @return mongo client options
    */
   @Bean
   public static MongoClientOptions mongoOptions() {
      if (mongoClientOptions == null) {
         mongoClientOptions = MongoClientOptions.builder().socketTimeout(2000).build();
      }
      return mongoClientOptions;
   }

}
```
a:
```
public class EquipamentMongoConfig extends MongoCoreConfig {

  /**
   * Inicialitza equipament mongo config.
   */
  public EquipamentMongoConfig() {
    super(MongoClientSettings.builder().build());
  }

  /**
   * Mongo equipament listener.
   *
   * @return mongo equipament listener
   */
  @Bean
  public MongoEquipamentListener mongoEquipamentListener() {
    return new MongoEquipamentListener();
  }

}
```

**7.** Eliminar funcions 'findAll' deprecades a 'MongoGenericRepository'

**8.** Eliminar 'CanigoDBObjectMongodbSerializer' donat és necessari utilitzar directament 'SpringDataMongodbSerializer'

**9.** Modificar la forma de construir els objectes de JPA fent ús dels mètodes estàtics. Per exemple, de:
```
new PageRequest(page - 1, rpp, getOrdenacio(sort))
```
a:
```
PageRequest.of(page - 1, rpp, getOrdenacio(sort))
```
, o de:
```
new Sort(orders)
```
a:
```
Sort.by(orders)
```

**10.** Per defecte no ve donat cap [`HttpFirewall`]
( https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/firewall/HttpFirewall.html)
configurat a Spring Security. Per definir-ne un per defecte:

```
  @Bean
  protected HttpFirewall httpFirewall() {
    DefaultHttpFirewall firewall = new DefaultHttpFirewall();
    firewall.setAllowUrlEncodedSlash(true);
    return firewall;
  }
```

**11.** És necessari utilitzar l'última versió de l’schema del XSD de Spring Security. Per exemple de:
```
http://www.springframework.org/schema/security/spring-security-4.2.xsd
```
a:
```
http://www.springframework.org/schema/security/spring-security-5.4.xsd
```

**12.** En cas d’utilitzar `WebMvcConfigurer`, ja no és necessari estendre de `WebMvcConfigurerAdapter` i es pot implementar
directament. Per tant, de:
```
public class WebConfig extends WebMvcConfigurerAdapter
```
a:
```
public class WebConfig implements WebMvcConfigurer
```

**13.** El mètode 'getNumRegistre' del mòdul 'canigo.integration.sarcat' ha canviat a 'getNumsRegistre' per alineament
amb el nom de la funció de SARCAT

**14.** S'ha eliminat la pàgina personalitzada per a l'exposició dels serveis amb Swagger '/canigo-api.html'.
És necessari utilitzar la pàgina pròpia de Swagger a '/api/swagger-ui.html'