+++
date        = "2022-05-01"
title       = "Canigó. Com configurar la ruta de la definició del client axis2 per a versions < 3.6.5"
description = "Howto per a mostrar com configurar la ruta de la definició del client axis2 per a versions de Canigó menors o iguals a 3.6.5"
section     = "howtos"
categories  = ["canigo"]
key         = "MAIG2022"
+++


## Introducció

L'objectiu d'aquest article és mostrar com configurar la ruta de la definició del client axis2 dins de projectes que utilitzen Canigó < 3.6.5

## Justificació

Els mòduls de Canigó associats a la PICA utilitzen les versions **1.9.2** del client de la PICA, el qual no permet configurar la ruta de la definició del client axis2, que per defecte té el següent valor: _/WEB-INF/classes!/axis2client/_. Aquesta configuració per defecte produeix un error en desplegar un projecte amb contendores web embeguts (per exemple tomcat) utilitzant _Spring Boot_, pel fet que no és possible trobar la ruta _/WEB-INF/classes!/axis2client/_ dins del jar que conté l'aplicació.

Per a corregir aquest error sense actualitzar la versió de Canigó, és necessari excloure manualment la versió **1.9.2** del client de la PICA, incloure la versió **1.10.0** del mateix client, reescriure el servei del connector de Canigó de la Pica: _PicaServiceWrapperImpl.java_, i modificar algunes configuracions de beans i properties.

## Passos a seguir

### Modificar l'arxiu: `pom.xml`

Es requereix excloure la versió **1.9.2** i incloure la versió **1.10.0** del client de la PICA.

```xml
...
  <properties>
    ...
    <api.pica.version>1.10.0</api.pica.version>
    ...
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>cat.gencat.ctti</groupId>
      <artifactId>canigo.integration.pica</artifactId>
      <version>${canigo.integration.pica.version}</version>
      <exclusions>
        <exclusion>
          <groupId>PICA</groupId>
          <artifactId>api-pica</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>PICA</groupId>
      <artifactId>api-pica</artifactId>
      <version>${api.pica.version}</version>
    </dependency>
    ...
  </dependencies>
...
```

### Modificar l'arxiu: `pica.properties`

Agregar la propietat que conté la ruta de l'especificació de axis2.

```properties
...
*.pica.axisdefinition.location=classpath:axis2client/
...
```

### Reescriure el servei del connector de la PICA de Canigó: `PicaServiceWrapperImpl.java`

Crear la classe: `PicaWithAxisDefinitionServiceWrapperImpl.java` que sobreescriu la classe original de Canigó: `PicaServiceWrapperImpl.java`

```java
package cat.gencat.ctti.canigo.arch.integration.pica;

...

public class PicaWithAxisDefinitionServiceWrapperImpl implements IPicaServiceWrapper, InitializingBean {
  private static final Logger log = LoggerFactory.getLogger(PicaWithAxisDefinitionServiceWrapperImpl.class);
  private static final String PICA_PARAMS_SSL_INCOMPLETS = "pica.params.ssl.incomplets";
  private static final String PICA_EXCEPCIO = "pica.excepcio";
  private static final String PICA_MODALITAT_INDEFINIDA = "pica.modalitat.indefinida";

  private HashMap<String, ProducteModalitat> modalitats = new HashMap<>();
  private Requeridor requeridor;
  private Resource axisDefinition;
  private String trustStoreSSLKeystore;
  private String trustStoreSSLKeystoreType;
  private String trustStoreSSLKeystorePassword;

  public void afterPropertiesSet() {
    if (StringUtils.hasText(trustStoreSSLKeystore) && StringUtils.hasText(trustStoreSSLKeystorePassword)
      && StringUtils.hasText(trustStoreSSLKeystoreType)) {
      SSLConfiguration.setTrustStoreSSLKeystore(trustStoreSSLKeystore);
      SSLConfiguration.setTrustStoreSSLKeystoreType(trustStoreSSLKeystoreType);
      SSLConfiguration.setTrustStoreSSLKeystorePassword(trustStoreSSLKeystorePassword);
      SSLConfiguration.initSSL();
    } else {
      log.info(PICA_PARAMS_SSL_INCOMPLETS);
    }
    log.info("PICA module loaded...");
  }

  public IPICAServiceSincron getPicaWebServiceSincronInstance(String modalitat) {
    if (modalitats.containsKey(modalitat)) {
      IPICAWithAxisDefinitionServiceSincron result;
      result = new PICAWithAxisDefinitionWebServiceSincron();
      result.setProducteModalitat(modalitats.get(modalitat));
      result.setRequeridor(requeridor);
      result.setAxisDefinition(axisDefinition);
      return result;
    }
    throw new WrappedCheckedException(prepareDetails(PICA_MODALITAT_INDEFINIDA));
  }

  public IPICAServiceAsincron getPicaWebServiceAsincronInstance(String modalitat) {
    if (modalitats.containsKey(modalitat)) {
      IPICAWithAxisDefinitionServiceAsincron result;
      result = new PICAWithAxisDefinitionWebServiceAsincron();
      result.setProducteModalitat(modalitats.get(modalitat));
      result.setRequeridor(requeridor);
      result.setAxisDefinition(axisDefinition);
      return result;
    }
    throw new WrappedCheckedException(prepareDetails(PICA_MODALITAT_INDEFINIDA));
  }

  ExceptionDetails prepareDetails(String errorMessage) {
    return new ExceptionDetails(Objects.requireNonNullElse(errorMessage, PICA_EXCEPCIO));
  }

  ExceptionDetails prepareDetails() {
    return prepareDetails(null);
  }

  public CridaSincronaResponseDocument ferPeticioAlServei(IPICAServiceSincron serviceSincron) {
    try {
      return serviceSincron.ferPeticioAlServei();
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(PICAExceptionUtils.getOriginalCause(e)));
    }
  }

  public CridaAsincronaResponseDocument ferPeticioAlServei(IPICAServiceAsincron serviceAsincron) {
    try {
      return serviceAsincron.ferPeticioAlServei();
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(PICAExceptionUtils.getOriginalCause(e)));
    }
  }

  public List<DadesEspecifiques> extreuDadesEspecifiques(IPICAServiceSincron service, CridaSincronaResponseDocument resposta) {
    try {
      return service.getDadesEspecifiquesResposta(resposta);
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(e.getMessage()));
    }
  }

  public List<DadesEspecifiques> extreuDadesEspecifiques(IPICAServiceAsincron service, ObtindreResultatResponseDocument resposta) {
    try {
      return service.getDadesEspecifiquesResposta(resposta);
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(e.getMessage()));
    }
  }

  public EstatAsincron extreuEstatPeticio(IPICAServiceAsincron serviceAsincron, ObtindreResultatResponseDocument resposta) {
    try {
      return serviceAsincron.getEstatPeticio(resposta);
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(e.getMessage()));
    }
  }

  public EstatAsincron extreuEstatPeticio(IPICAServiceAsincron serviceAsincron, CridaAsincronaResponseDocument resposta) {
    try {
      return serviceAsincron.getEstatPeticio(resposta);
    } catch (PICAException e) {
      throw new WrappedCheckedException(e, prepareDetails(e.getMessage()));
    }
  }

  public ObtindreResultatResponseDocument obtenirResultatPeticio(IPICAServiceAsincron serviceAsincron) {
    try {
      return serviceAsincron.obtindreResultatPeticio();
    } catch (PICAServiceException e) {
      throw new WrappedCheckedException(e, prepareDetails());
    }
  }

  public HashMap<String, ProducteModalitat> getModalitats() {
    return modalitats;
  }

  /* getters and setters */
}

```

### Agregar un bean en: `app-integration-custom.xml` que invoqui al servei creat

Modificar l'arxiu de configuració de beans de l'aplicació: `app-integration-custom.xml`, per a incorporar un bean que gestioni el servei: `PicaWithAxisDefinitionServiceWrapperImpl.java`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans ...>
  ...
  <bean abstract="true" id="abstractPicaWithAxisDefinitionService"
        class="cat.gencat.ctti.canigo.arch.integration.pica.PicaWithAxisDefinitionServiceWrapperImpl"
        scope="prototype">
    <description>Abstract pica service with default configuration</description>
    <property name="trustStoreSSLKeystore" value="${pica.trustStore.location}"/>
    <property name="trustStoreSSLKeystoreType" value="${pica.trustStore.type}"/>
    <property name="trustStoreSSLKeystorePassword" value="${pica.trustStore.password}"/>
    <property name="axisDefinition" value="${pica.axisdefinition.location}"/>
    <property name="requeridor" ref="requeridor"/>
  </bean>

  <bean id="picaService" parent="abstractPicaWithAxisDefinitionService"
        class="cat.gencat.ctti.canigo.arch.integration.pica.PicaWithAxisDefinitionServiceWrapperImpl"
        scope="prototype">
    <property name="requeridor" ref="requeridor"/>
    <property name="modalitats">
      <map>
        ...
      </map>
    </property>
  </bean>
</beans>
```

## Conclusió

És possible configurar la ruta de la definició del client axis2 sense actualitzar el connector de la PICA de Canigó.
