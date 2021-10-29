+++
date        = "2021-10-26"
title       = "Canigó. Com configurar propiedades en fitxers YAML per a proves unitaries a Canigó"
description = "Com configurar propiedades en fitxers YAML per a proves unitaries per a projectes amb Canigó"
#section     = "howtos"
#categories  = ["canigo"]
#key         = "DESEMBRE2021"
+++


## Introducció

A partir de la versió 3.4.0 del Framework Canigó, la configuració es pot definir en format YAML, en lloc del tradicional format de propietats. En el cas de ser necesari sobrescriure propietats per a proves unitaries, és possible generar un fitxer YAML, ubicar-lo a la carpeta de recursos de prova i referenciar el seu contingut dins de qualsevol prova.

L'objectiu d'aquest article és mostrar com configurar propietats en fitxers YAML per a proves unitaries dins d'un projecte generat amb el framework Canigó

## Configuració

Per agregar un fitxer de propietats en format YAML en un projecte amb Canigó, es requereixen els següents canvis:

- Es necessita crear un fitxer `application.yml` a la carpeta `src/test/resources/config/props`, per exemple:

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

- Utilitzant les propietats, per exemple, al fitxer `app-custom-persistence-jpa.xml` de la carpeta `src/test/resources/config/spring`:

```xml
<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
  <description> Fem servir Hibernate com a motor de persistència per sota de JPA. </description>
  <property name="showSql" value="${persistence.showSQL}" />
  <property name="generateDdl" value="${persistence.generateDdl}" />
  <property name="database" value="${persistence.database}" />
  <property name="databasePlatform" value="${persistence.dialect}" />
</bean>
```

## Ús 

Per a poder fer ús de les propietats en YAML a les proves unitàries, serà necessari utilitzar el `YamlPropertiesApplicationContextInitializer`, per això serà necessari definir una classe per la carga de la configuració de Spring pel `ContextConfiguration`, per exemple, `TestAppConfig.java`:

```java
...

@Configuration
@ImportResource({ "classpath:spring/canigo-core.xml" })
@ComponentScan(basePackages = { "cat.gencat.ymlfiletestcanigo.service" })
@EnableAutoConfiguration
public class TestAppConfig {

}
```

En el nostre test utilitzarem `TestAppConfig` per carregar la configuració de Spring i el `YamlPropertiesApplicationContextInitializer` per carregar les propietats en els fitxers YAML, per exemple podriem tenir el test `EquipamentServiceTest.java`

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

Si executem el test `EquipamentServiceTest.testYamlProperties`, podrem obtenir un resultat com:

![Spring Yaml Test Ejemplo 1](/images/howtos/2021-01-16_spring_yaml_test_example1.gif)


## Conclusió

 * A Canigó és possibile sobreescriure les propietats de l'aplicació a través de fitxers YAML que només afectin a les proves unitàries.

## Més informació

Per a més informació podeu consultar la documentació del [Mòdul de configuració](/canigo-documentacio-versions-34-core/modul-configuracio/) de Canigó
