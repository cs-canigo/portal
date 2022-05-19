+++
date        = "2021-12-03"
title       = "Canigó. Com configurar propietats en fitxers YAML per a proves unitàries"
description = "Com configurar les propietats en fitxers YAML per a proves unitàries per a projectes Canigó"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2022"
+++


## Introducció

**A partir de la versió 3.4 del Framework Canigó, es permet definir la configuració en format YAML en lloc del
tradicional format de propietats**. En cas de ser necessari sobreescriure propietats per a proves unitàries, és
possible generar un fitxer YAML, ubicar-lo a la carpeta de recursos de prova i referenciar el seu contingut
dins de qualsevol prova.

L'objectiu d'aquest article és mostrar **com configurar propietats en fitxers YAML per a proves unitàries** per a
projectes generats amb el Framework Canigó.

## Configuració

Per a incloure un fitxer de propietats en format YAML en un projecte Canigó, es necessita crear un fitxer `application.yml`
a la carpeta `src/test/resources/config/props`. Per exemple:

```yaml
application:
  id: YmlFileTestCanigo
  version: 1.0.0
  defaultLanguage: ca_ES

persistence:
  showSQL: true
  generateDdl: false
  database: HSQL
  dialect: org.hibernate.dialect.HSQLDialect
```

I fer ús de les propietats definides. Per exemple, al fitxer `app-custom-persistence-jpa.xml` de la carpeta `src/test/resources/config/spring`:

```xml
<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
  <description> Fem servir Hibernate com a motor de persistència per sota de JPA. </description>
  <property name="showSql" value="${persistence.showSQL}" />
  <property name="generateDdl" value="${persistence.generateDdl}" />
  <property name="database" value="${persistence.database}" />
  <property name="databasePlatform" value="${persistence.dialect}" />
</bean>
```

## Funcionament

Per a poder fer ús de les propietats en format YAML a les proves unitàries, serà necessari utilitzar el
`YamlPropertiesApplicationContextInitializer`. Per la qual cosa, serà necessari definir una classe per a la càrrega
de la configuració de Spring pel `ContextConfiguration`. Per exemple, `TestAppConfig.java`:

```java
...

@Configuration
@ImportResource({ "classpath:spring/canigo-core.xml" })
@ComponentScan(basePackages = { "cat.gencat.ymlfiletestcanigo.service" })
@EnableAutoConfiguration
public class TestAppConfig {

}
```

En el següent exemple de test utilitzarem `TestAppConfig` per a carregar la configuració de Spring i el `YamlPropertiesApplicationContextInitializer`
per a carregar les propietats en els fitxers YAML. Per exemple podríem tenir el test `EquipamentServiceTest.java`:

```java
...

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { TestAppConfig.class }, initializers = YamlPropertiesApplicationContextInitializer.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EquipamentServiceTest {

  @Value("${application.id}")
  private String aplicationId;

  ...

	@Test
  public void testYamlProperties() throws IOException {
    Assert.assertEquals("YmlFileTestCanigo", aplicationId);

    Resource resource = YamlPropertiesUtils.getYamlPropertiesResource();
    Optional<?> applicationYaml = new YamlPropertySourceLoader()
      .load(resource.getFilename(), resource)
      .stream().map(propertySource -> propertySource.getSource()).findFirst();

    Assert.assertTrue(applicationYaml.isPresent());
  }

  ...
}
```

### Proves 

Si executem el test `EquipamentServiceTest.testYamlProperties` podrem obtenir un resultat com el següent:

![Spring Yaml Test Ejemplo 1](/images/howtos/2021-01-16_spring_yaml_test_example1.gif)

## Conclusió

A Canigó és possible sobreescriure les propietats de l'aplicació mitjançant fitxers YAML que només apliquin a les proves unitàries.

<br/>
Per a més informació: [Mòdul de configuració](/canigo-fwk-docs/documentacio-per-versions/3.4LTS/3.4.9/moduls/moduls-generals/modul-configuracio/).
