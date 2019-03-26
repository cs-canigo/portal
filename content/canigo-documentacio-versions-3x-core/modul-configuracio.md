+++
date        = "2019-03-18T13:55:42+01:00"
title       = "Mòdul de configuració"
description = "Configuracio de les propietats dels components de l'aplicació."
sections    = "Canigó. Documentació versió 3.x"
weight      = 3
toc 		    = true
+++

## Propòsit

El mòdul de configuració té com a propòsit la configuració de les
propietats de qualsevol component de l'aplicació. Aquestes propietats
poden ser tant referències a altres objectes com propietats internes
(atributs) que necessiten per al seu correcte funcionament.

Una de les principals avantatges del mòdul respecte la classe
[PropertyPlaceholderConfigurer](http://docs.spring.io/spring/docs/4.3.3.RELEASE/javadoc-api/org/springframework/beans/factory/config/PropertyPlaceholderConfigurer.html "Documentacio de Spring")
aportada per Spring, és la possibilitat de disposar de propietats
dependents d'entorn sense necessitat de cap configuració extra a nivell
de beans - propietats.

## Limitacions

Per aplicacions Canigó 3.4 que utilitzin Spring Boot, el mòdul de configuració presenta les següents limitacions:

* no és compatible amb la càrrega de propietats depenent dels profiles de Spring Boot (spring.profiles.active o SPRING_PROFILES_ACTIVE). Si es vol fer depenent els valors de les propietats segons l'entorn, s'han de seguir les instruccions especificades en aquesta plana.

* condicionar la configuració de Spring Boot (Veure secció "Condicionar la configuració de Spring Boot" d'aquesta plana)

<div class="message warning">
A la propera versió de Canigó, es preveu deprecar aquest mòdul de configuració en favor dels profiles de Spring Boot
</div>

## Instal.lació

El mòdul de configuració i el corresponent test unitari s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. 
En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```xml
<canigo.core.version>[4.0.0,4.1.0)</canigo.core.version>
<canigo.test.version>[2.0.0,2.1.0)</canigo.test.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.core</artifactId>
    <version>${canigo.core.version}</version>
</dependency>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.test</artifactId>
    <version>${canigo.test.version}</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.core</artifactId>
    <type>test-jar</type>
    <version>${canigo.core.version}</version>
    <scope>test</scope>
    <classifier>tests</classifier>
</dependency>
```

Al pom.xml també s'ha d'afegir el plugin que executa el test unitari del mòdul de configuració:
```xml
<build>
    ...
    <plugins>
        ...
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <executions>
                <execution>
                    <id>base-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>test</goal>
                    </goals>
                    <configuration>
                        <dependenciesToScan>
                            <dependency>cat.gencat.ctti:canigo.core</dependency>
                            ...
                        </dependenciesToScan>
			<excludes>
				<exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
			</excludes>
                    </configuration>
                </execution>
                ...
            </executions>
        </plugin>
        ...
    </plugins>
    ...
</build>    
```

## Configuració de l'entorn

El concepte d'Entorn es defineix mitjançant la propietat entorn, a la
que s'assigna el valor corresponent a l'arrancar la màquina virtual
Java

```java
java ... -Dentorn=pro
```

Aquesta configuració de l'entorn es utilitzada pel servei de configuració per obternir les propietats segons l'entorn

## Configuració propietats en format yaml

A la versió Canigó 3.4 es proporciona la funcionalitat de càrrega de propietats definides a fitxers yaml

Yaml és un estàndard de format fàcilment llegible que signigica "YAML Ain't Markup Language", per a més informació es pot consultar: https://yaml.org/

Es recomana passar les propietats definides en format properties a format yaml

En properes versions de Canigó s'eliminarà l'actual funcionalitat de configuració de propietats de Canigó, per utilitzar les funcionalitats de configuració de propietats de Spring

Els arxius de configuració de propietats de l'aplicació han d'estar en la següent ubicació:

```
    <PROJECT_ROOT>/src/main/resources/config/props/
```

I han de tenir el nom:

```
application*.yml
```

### Configuració segons l'entorn

Es necessari definir un fitxer yaml per cada entorn, aixi pels entorns de loc, dev, pre i pro necessitem definir els fitxers:

```
application-loc.yml
application-dev.yml
application-pre.yml
application-pro.yml
```

Si no es defineix un fitxer específic per l'entorn agafarà la configuració del fitxer application.yml, així si tenim els entorns loc, dev, pre i pro i tenim la mateixa configuració per loc i per dev podriem tenir els fitxers:
```
application.yml
application-pre.yml
application-pro.yml
```

A cada fitxer necessitem tenir definides totes les propietats de l'aplicació

En futures versions de Canigó s'utilitzarà la configuració de propietats de Spring en un sol fitxer yaml

### Propietats de format properties a format yaml

Es necessari passar les claus de les propietats de l'aplicació de formar properties a format yaml

El resum del format yaml seria:
- Estructurat per indentació
- Els llistats es senyalen amb un guió
- Els valors de les propietats estan separats per dos punts

Un exemple de format yaml seria:
https://yaml.org/start.html

Si partim, per exemple, de les propietats:

```properties
application.Id = provaCanigoSpringBoot2MVC
application.version = 1.0.0
application.defaultLanguage = ca_ES
persistence.database=H2
persistence.dialect=org.hibernate.dialect.H2Dialect
publishInfoModules=false
publishInfoProperties=false
```

En el fitxer application.yml hauriem de tenir la definició:

```yaml
application:
  id: provaCanigoSpringBoot2MVC
  version: 1.0.0
  defaultLanguage: ca_ES
persistence:
  database: H2
  dialect: org.hibernate.dialect.H2Dialect
publishInfoModules: false
publishInfoProperties: false
```

Com es pot observar, amb la indentació es poden agrupar propietats, així, tenim que les claus "database" i "dialect" que pengen de "persistence" acaben formant les propietat "persistence.database" i "persistence.dialect"

Les propietats en format yaml tindran prioritat a les propietats definides en format properties 

## Configuració propietats en format properties

No requereix configuració per part del desenvolupador. Els xmls de
configuració del servei es troben internalitzats dins del jar del core,
i s'inicialitzarà de manera automàtica un cop arrenqui l'aplicació.

Els arxius de configuració de propietats de l'aplicació han d'estar en
la següent ubicació:

```
    <PROJECT_ROOT>/src/main/resources/config/props/*.properties
```

Tots els arxius d'aquest directori han de complir el format de multi-entorn 

### Configuració segons l'entorn

A partir de la versió 3.0 de Canigó i per tal de reduir el número
d'arxius de configuració per entorn, s'introdueixen els arxius de
propietats multientorn. Cadascuna de les claus d'aquests arxius de
configuració disposa de dues parts:

-   **Entorn:** identifica l'entorn en el que aquesta propietat serà
    vàlida. El entorn amb asterisc indica valor per defecte. En el cas
    de que existeixi una propietat específica per a l'entorn, aquesta es
    seleccionarà per defecte.
-   **Clau:** propietat de identifica un determinat valor de
    configuració.

Un exemple d'un arxiu de propietats de configuració *exemple.properties*
podria ser el següent:

```properties
# Arxiu de configuració per al mòdul d'antivirus
*.antivirus.serverIp=127.0.0.1
pro.antivirus.serverIp=11.11.11.02
int.antivirus.serverIp=21.21.11.02
*.antivirus.serverPort=1344
int.antivirus.serverPort=1567
```


Així, en l'exemple anterior tindríem la següent configuració per entorn:

Clau|Entorn|Valor|Comentari
----|------|-----|---------
antivirus.serverIp|loc|127.0.0.1|Configuració per defecte. No hi ha propietat específica per al entorn local.
antivirus.serverIp|dev|127.0.0.1|Configuració per defecte. No hi ha propietat específica per al entorn de desenvolupament.
antivirus.serverIp|int|21.21.11.02|Configuració específica per a l'entorn d'integració.
antivirus.serverIp|pre|127.0.0.1|Configuració per defecte. No hi ha propietat específica per al entorn de preproducció
antivirus.serverIp|pro|11.11.11.02|Configuració específica per a l'entorn de producció.
antivirus.serverPort|loc|1344|Configuració per defecte. No hi ha propietat específica per al entorn local.
antivirus.serverPort|dev|1344|Configuració per defecte. No hi ha propietat específica per al entorn de desenvolupament.
antivirus.serverPort|int|1567|Configuració específica per a l'entorn d'integració.
antivirus.serverPort|pre|1344|Configuració per defecte. No hi ha propietat específica per al entorn de preproducció.
antivirus.serverPort|pro|1344|Configuració per defecte. No hi ha propietat específica per al entorn de producció.

Amb la configuració en funció de l'entorn, el servei de
configuració de Canigó cerca la configuració adient en els diferents
arxius de configuració de la carpeta
```
<PROJECT_ROOT>/src/main/resources/config/props/
```

## Utilització del mòdul

Degut a la pròpia naturalesa del mòdul, l'obtenció de les propietats des
de classes "clients" no requereix cap injecció de dependències o
configuració addiccional. La resolució de les propietats per entorn es
realitzarà de manera automàtica i transparent per al desenvolupador.

-   Exemple d'inserció de propietats en configuració de Beans de Spring
    basada en XML:

    ```xml
    <bean id="antivirus"  class="cat.gencat.ctti.canigo.arch.integration.antivirus.impl.AntivirusImpl">
        <property name="remote" value="${antivirus.remote:false}" />
            <property name="serverIP" value="${antivirus.serverIp}" />
        <property name="serverPort" value="${antivirus.serverPort}" />
    </bean>
    ```

    

-   Exemple d'inserció de propietats en configuració de Beans de Spring bassat en anotacions:

    ```java
    @Repository
    public class AntivirusImpl implements Antivirus{
        @Value("${antivirus.serverIp}")
        private String serverIP;
    }
    ```

## Configuració a servidors JEE corporatius

### Concepte de configuració amb propietats globals

A partir de la versió 3.0.3 del mòdul canigo.core s'inclou la
possibilitat de poder fer servir propietats definides fora de
l'aplicació. Aquestes propietats es configuren a nivell del servidor JEE
mitjançant un fitxer de propietats la ruta del qual és especificada
durant l'arrencada de la JVM. Les propietats d'aquest fitxer afecten a
totes les aplicacions desplegades al servidor que incorporin aquesta
versió (o posterior) del mòdul canigo.core. També es dona flexibilitat
per poder definir excepcions per a certes aplicacions mitjançant un
fitxer de propietats específic. 
 Per aconseguir aquest funcionament cal que el proveïdor de l'aplicació
i l'administrador del servidor JEE al CPD facin una sèrie de
configuracions: 
 

#### Proveïdor de l'aplicació Canigó

Cal definir a l'aplicació la següent propietat al fitxer:
**src/main/resources/config/props/application.properties**

Propietat|Requerit|Descripció
---------|--------|----------
codi_aplicacio|NO|Típicament serà el codi de diàleg de l'aplicació. Cal informar-ho nomes si es vol emprar un fitxer de propietats específiques per a l'aplicació en comptes del global de servidor.

#### Administrador del servidor JEE al CPD

<div class="message warning">
Deixar clar que aquest punt és responsabilitat de CPD i que l'únic que necessita conèixer de l'aplicació per poder-ne fer una configuració específica és el <b>codi_aplicacio</b>.
</div>


##### Indicar path de la carpeta del fitxer de propietats globals

Al arrencar la màquina virtual de Java cal indicar la següent propietat:

```java
java ... -Dconf_dir=[ pathToConfDir ]
```

On [ pathToConfDir ] és el path de la carpeta al servidor on hi figura
l'arxiu de propietats global server.properties.
 

##### Informar el fitxer de propietats globals

Al servidor cal crear el següent fitxer de propietats: **[ pathToConfDir
]/server.properties**
 I definir les següents propietats:

Propietat|Requerit|Descripció
---------|--------|----------
entorn|SI|Nom de l'entorn
codi_servei|NO|Cal informar-ho només si es vol habilitar l'ús de fitxers de propietats específics per a aplicacions al servidor.

    
A aquest fitxer caldria afegir-hi la resta de propietats globals que es
vulguin definir per a totes les aplicacions que es despleguin en aquest
servidor. 


##### Informar el fitxer de propietats específic d'aplicació

En cas de voler habilitar fitxers de propietats específics per a una
aplicació, caldria crear la següent estructura de carpetes i fitxers: 
 **[ pathToConfDir ]/[ entorn ]/[ codi_servei ]/[ codi_aplicacio
]/app.properties** 
 

#### Exemples d'ús de propietats globals a servidor

##### Exemple 1: Ús de propietats globals definides al servidor

Es vol que totes les aplicacions desplegades al servidor facin servir la
mateixa configuració per al servei d'enviament de correus, tret del
username i password del compte d'enviament que les definiran les pròpies
aplicacions. Per a aquest propòsit:

-   Els proveïdors de les aplicacions que despleguin en aquest servidor
    hauran d'indicar les propietats referents al username/password al
    fitxer de propietats de configuració de correu de l'aplicació:
    **/src/main/resources/config/props/mail.properties**.

    ```java
    *.mail.username=demo@gencat.cat
    *.mail.password=*****
    ```

-   Els administradors del servidor hauran de :
    -   Indicar el path de la carpeta del fitxer de propietats globals
        durant l'arrencada de la JVM:

        ```java
        java ... -Dconf_dir=/serveis/conf
        ```

    -   Crear el fitxer de propietats globals i informar les seves
        propietats: **/serveis/conf/server.properties**

        ```java
        entorn=loc
        #Propietats globals d'enviament de correu per a totes les aplicacions desplegades
        *.mail.host=smtp-intranet.gencat.intranet
        *.mail.port=25
        *.mail.protocol=smtp
        *.mail.maxAttachmentSize=1024
        ```

        

##### Exemple 2: Ús de propietats específiques d'aplicació definides al servidor

Es vol definir el nom dels dataSources de les conexions per JNDI de les
aplicacions mitjançant els fitxers de propietats específics d'aplicació
dins servidor. Per a aquest propòsit:

-   Els proveïdors de l'aplicació hauran d'informar la propietat
    **codi_aplicacio** al fitxer de propietats de la seva aplicació:
    **src/main/resources/config/props/application.properties**

    ```java
    codi_aplicacio=001
    ```

-   Els administradors del servidor hauran de :
    -   Indicar el path de la carpeta del fitxer de propietats globals
        durant l'arrencada de la JVM:

        ```java
        java ... -Dconf_dir=/serveis/conf
        ```

    -   Crear el fitxer de propietats globals i informar les seves
        propietats: **/serveis/conf/server.properties**

        ```java
        entorn=pre
        codi_servei=demo
        ```

        

    -   Crear l'estructura de carpetes i el fitxer de propietats
        específic per a l'aplicació al servidor (+ creació estructura
        directoris): **/serveis/conf/pre/demo/001/app.properties**

        ```java
        #Configuració de l'orígen de dades per JNDI per a l'aplicació 001
        *.jndi.name=java:comp/env/dataSource001
        ```

        Prèviament cal que l'administrador del servidor hagi consultat
        aquest **codi_aplicacio** al proveïdor de l'aplicació. 
         
		 
### Modificar ubicació dels fitxers en format propietats

Per defecte Canigó carrega les propietats en format properties que es troben a **classpath:/config/props/*.properties**. 

Si es vol modificar aquest path s'ha d'afegir la propietat **application.configLocation** al fitxer **application.properties**. Per exemple per carregar fitxers de propietats en jars externs a l'aplicació:

	*.application.configLocation=classpath*:/config/props/*.properties
	

## Condicionar la configuració de Spring Boot

Spring Boot ofereix la possibilitat de condicionar diversos aspectes de la configuració (Per exemple quines classes s'han de carregar, o que controladors s'han d'exposar) segons si compleixen unes condicions:

https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-auto-configuration.html

### Configuració de propietats de Spring Boot amb format yaml

Per a poder utilitzar la funcionalitat de "@ConfigurationProperties" de Spring Boot és necessari crear el següent initializer:
```java
import java.io.IOException;

import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.Resource;

import cat.gencat.ctti.canigo.arch.core.config.YamlPropertiesUtils;

public class YamlPropertiesApplicationContextInitializer
		implements ApplicationContextInitializer<ConfigurableApplicationContext> {

	@Override
	public void initialize(ConfigurableApplicationContext applicationContext) {
		Resource resource = YamlPropertiesUtils.getYamlPropertiesResource();
		try {
			for (PropertySource<?> propertySource : new YamlPropertySourceLoader().load(resource.getFilename(),
					resource)) {
				applicationContext.getEnvironment().getPropertySources().addFirst(propertySource);
			}
		} catch (IOException ex) {
			throw new IllegalStateException("Failed to load yml configuration from " + resource.getFilename(), ex);
		}
	}
}
```

I inicialitzar-lo al "Application.java" on canviem:

```java
	public static void main(final String[] args) throws Exception {
		if (System.getProperty("entorn") == null) {
			System.setProperty("entorn", "loc");
		}

		if (System.getProperty("application.defaultLanguage") == null)
			System.setProperty("application.defaultLanguage", "ca_ES");
		
		System.setProperty("spring.main.allow-bean-definition-overriding", String.valueOf(true));

		SpringApplication.run(Application.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
```
per:
```java
	public static void main(final String[] args) throws Exception {
		if (System.getProperty("entorn") == null) {
			System.setProperty("entorn", "loc");
		}

		if (System.getProperty("application.defaultLanguage") == null)
			System.setProperty("application.defaultLanguage", "ca_ES");

		System.setProperty("spring.main.allow-bean-definition-overriding", String.valueOf(true));

		SpringApplicationBuilder builder = new SpringApplicationBuilder();
		addSourcesAndInitializers(builder);
		builder.run(args);
	}

	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder builder) {
		return addSourcesAndInitializers(builder);
	}

	private static SpringApplicationBuilder addSourcesAndInitializers(SpringApplicationBuilder builder) {
		addSources(builder);
		addInitializers(builder);
		return builder;
	}

	private static SpringApplicationBuilder addSources(SpringApplicationBuilder builder) {
		return builder.sources(Application.class);
	}

	private static SpringApplicationBuilder addInitializers(SpringApplicationBuilder builder) {
		return builder.initializers(new YamlPropertiesApplicationContextInitializer());
	}
```

A més, necessitem registrar els "@ConfigurationProperties", així en el "@Configuration" de l'aplicació, "AppConfig.java", podriem tenir:
```java
import cat.gencat.ctti.properties.ApplicationProperties;

@Configuration
@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
@EnableTransactionManagement
@EnableAutoConfiguration
@EnableConfigurationProperties(ApplicationProperties.class)
public class AppConfig {

}
```

Amb aquests canvis tindriem l'aplicació configurada per carregar les propietats amb format yaml i utilitzar les funcionalitats de String com el "@ConfigurationProperties"

Un exemple d'utilització de les funcionalitats de Spring podria ser una classe per mapejar la clau "application" del nostre fitxer yaml, tenint l'estructura:
```java
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

	String id;
	
	String version;
	
	String defaultLanguage;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getDefaultLanguage() {
		return defaultLanguage;
	}

	public void setDefaultLanguage(String defaultLanguage) {
		this.defaultLanguage = defaultLanguage;
	}

}
```

On la podriem utilitzar utilitzant la injecció de Spring:
```java
	@Autowired
	ApplicationProperties applicationProperties;
	...
	applicationProperties.getId()
```

També podem accedir a les propietats com fins ara utilitzant place holders, per exemple:
```java
	@Value("${application.id}")
	String applicationId;
```

Per poder utilitzar els "@ConfigurationProperties" en els tests, es necessari registrar també l'initializer en el test i registrar els "@ConfigurationProperties"

Així, podriem tenir una classe de configuració del test homologa a "AppConfig.java":
```java
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import cat.gencat.ctti.properties.ApplicationProperties;

@Configuration
@ImportResource({ "classpath:spring/canigo-core.xml" })
@EnableTransactionManagement
@EnableAutoConfiguration
@EnableConfigurationProperties(ApplicationProperties.class)
public class TestAppConfig {
	
}
```
I utilitzar aquest "@Configuration" en un test utilitzant també el inicializer:
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
		TestAppConfig.class }, initializers = YamlPropertiesApplicationContextInitializer.class)
public class YamlPropertiesTest {
...
}
```		

### Configuració de propietats de Spring Boot amb format properties

Per a poder utilitzar propietats en aquestes condicions s'han de carregar específicament per a aquest motiu en un fitxer de configuració propi que llegeixi SpringBoot, ja que les propietats de l'aplicació es carreguen després de resoldre aquestes condicions.

SpringBoot per defecte cerca les propietats en un fitxer que es digui application.properties a src/resources. Les propietats que es dessitgi utilitzar en la configuració de SpringBoot s'han d'afegir en aquest fitxer.

Si es vol utilitzar profiles de Spring, s'hauria de crear un fitxer application-{profile}.properties.

Una altre forma de carregar un fitxer de propietas és d'afegir l'annotació @PropertySource al nostre fitxer de de configuració:

```java
	@Configuration
	@PropertySource("classpath:/config/props/boot.properties")
	@ImportResource({ "classpath:cat/gencat/ctti/canigo/arch/core/config/canigo-core.xml" })
	@EnableTransactionManagement
	public class AppConfig {
		
	}
```

Indicant el path on es troba aquest fitxer.

Un exemple d'aquesta condicionalitat es pot trobar al [servei de seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)


Preguntes freqüents
-------------------

## Accés manual al servei de configuració

Encara que no és recomanable accedir a les propietats del mòdul de
manera directa, el desenvolupador pot realitzar una crida de forma
externa mitjançant el patró ['Dependency
Injection'](http://martinfowler.com/articles/injection.html "Dependency Injection")
al mòdul i les seves propietats d'entorn.

-   Injecció de dependències mitjançant xml. Per exemple:
     Ruta proposada:
    <PROJECT_ROOT>/src/main/resources/spring/exemple-beans-config.xml

```xml
<bean id="myBean"  class="cat.gencat.app.exemples.Injection">
    <property name="configuration" ref="propertiesConfiguration" />
</bean>
```



La clase Injection tindria la següent estructura:

```java
import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;

public class Injection {
     PropertiesConfiguration configuration;

     public void setConfiguration(PropertiesConfiguration  configuration){
         this.configuration = configuration;
     }

}
```



Injecció del mòdul de configuració dins del bean "myBean". Spring
s'encarregarà d'injectar la configuració del mòdul de propietats
executant el mètode setConfiguration.

-   Injecció de dependències mitjançant annotacions:

```java
import cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration;

@Component("myBean")
public class Injection {
     @Autowired
     PropertiesConfiguration configuration;

     public void execute(){

         String ip = configuration.getProperty("antivirus.serverIp");
     }

}
```



L'anotació @Autowired injecta en aquest cas, un bean de tipus
cat.gencat.ctti.canigo.arch.core.config.PropertiesConfiguration
que Spring trobarà en el context de l'aplicació.
