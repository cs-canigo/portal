+++
date        = "2021-01-16"
title       = "Canigó. Como configurar propiedades en archivos YAML para pruebas unitarias"
description = "Como configurar propiedades en archivos YAML para pruebas unitarias"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2021"
+++


## Introducción

El objetivo de este artículo es mostrar como configurar propiedades en archivos YAML para test dentro de un proyecto generado con el framework Canigó

---
## Justificación

A partir de la versión 3.4.0 del Framework Canigó, la configuración se genera por defecto en formato YAML, en vez del tradicional formato de propiedades. En el caso de ser necesario sobrescribir propiedades para pruebas unitarias, es posible generar un archivo YAML, ubicarlo en la carpeta de recursos de pruebas y referenciar su contenido dentro de cualquier prueba.

---
## Configuración

Para agregar un archivo de propiedades en formato Yaml en un proyecto creado con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/), se requieren los siguientes ajustes:

> Se necesita crear un archivo `application.yml` en la carpeta `src/test/resources/config/props`

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

> Se necesita ajustar el archivo `app-custom-persistence-jpa.xml` en la carpeta `src/test/resources/config/spring`

```xml
<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
  <description> Fem servir Hibernate com a motor de persistència per sota de JPA. </description>
  <property name="showSql" value="${persistence.showSQL}" />
  <property name="generateDdl" value="${persistence.generateDdl}" />
  <property name="database" value="${persistence.database}" />
  <property name="databasePlatform" value="${persistence.dialect}" />
</bean>
```

---
## Uso 

### Desarrollo 

> Se requiere crear una configuración de Spring. Ejemplo de configuración `TestAppConfig.java`

```java
package cat.gencat.ymlfiletestcanigo.config;

...

@Configuration
@ImportResource({ "classpath:spring/canigo-core.xml" })
@ComponentScan(basePackages = { "cat.gencat.ymlfiletestcanigo.service" })
@EnableAutoConfiguration
public class TestAppConfig {

}
```

> Cambios en las anotaciones para las pruebas unitarias `EquipamentServiceTest.java`

```java
package cat.gencat.ymlfiletestcanigo.service;

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

### Pruebas 

> Test:

![Spring Yaml Test Ejemplo 1](/images/howtos/2021-01-16_spring_yaml_test_example1.gif)


---
## Conclusión

 * Es posible sobrescribir las propiedades de la aplicación a través de archivos en formato YAML que solo afecten a las pruebas unitarias.
