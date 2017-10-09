+++
date        = "2017-05-01"
title       = "Ús de Spring Cache (Caffeine) en Canigó 3.2.2"
description = "Ús de Spring Cache (Caffeine) en Canigó 3.2.2"
section     = "howtos"
categories  = ["canigo"]
key         = "OCTUBRE2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que vulguin afegir Spring Cache a una aplicació Canigó 3.2.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.x del Framework Canigó.

### Introducció

En aquest HowTo s’explica com afegir Spring Cache a una aplicació Canigó 3.2. 
Per a fer-ho es desplega l’aplicació demo que genera el plugin de Canigó, per a mostrar el funcionament de Spring Cache primer es fa una prova sense utilitzar la cache i després una altre utilitzant la cache. 

En aquest primer exemple no se li especifica cap proveïdor específic de caching (caffeine, ehcache, etc.) de tal manera que l'exemple utilitzarà simplement ConcurrentHashMap.

A una aplicació real es pot triar la implementació de caching que es dessitgi, però es important utilitzar l'abstracció que proporciona [Spring Cache] (https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-caching.html#boot-features-caching) (estàndard JSR-107) ja que a banda de complir els estàndards no fixa una aplicació a un proveïdor de caching en concret i facilita en un futur qualsevol modificació.

En un segon exemple es mostra com utilitzar un proveïdor de caching, en aquest exemple [Caffeine] (https://github.com/ben-manes/caffeine) com llibreria de caching

## Exemple Configuració Spring Cache

### Afegir Llibreries

S'ha d'afegir al pom.xml la dependència a Spring Cache

    <!-- SPRING BATCH -->
     <dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-cache</artifactId>
		<exclusions>
			<exclusion>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-logging</artifactId>
			</exclusion>
		</exclusions>
	</dependency>
	
### Exemple d'accés sense Cache

A la classe **EquipamentService** es crea els mètodes *getById* i *simularLentitud*, aquest segón mètode es crea per a veure millor els efectes de l'us de cache vs el no utilitzar cache.

	 private void simularLentitud() {
        try {
            long time = 3000L;
            Thread.sleep(time);
        } catch (InterruptedException e) {
            throw new IllegalStateException(e);
        }
    }
	
Aquest mètode el que fa, es aturar el thread durant 3 segons.

	public Equipament getById(Long id) {
		simularLentitud();
        return getEquipament(id);
	}

Amb aquest mètode obtenint un equipament segons el seu ID, però fem que la crida s'aturi 3 segons.

Al nostre endpoint (**EquipamentServiceController**) afegim un mètode que realitzi múltiples crides al mètode getById.

	@GetMapping(value = "/howto", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponsePage<String> howto() {
		
		logger.info(".... Obtenint equipaments");
        logger.info("Equipament-1 -->" + equipamentService.getById(Long.valueOf(1)));
        logger.info("Equipament-2 -->" + equipamentService.getById(Long.valueOf(2)));
        logger.info("Equipament-1 -->" + equipamentService.getById(Long.valueOf(1)));
        logger.info("Equipament-2 -->" + equipamentService.getById(Long.valueOf(2)));
        logger.info("Equipament-1 -->" + equipamentService.getById(Long.valueOf(1)));
        logger.info("Equipament-1 -->" + equipamentService.getById(Long.valueOf(1)));

		return null;
	}
	
El que fa aquest mètode és simplement cridar 6 vegades a getById, tres vegades demanant el ID 1, i 3 vegades demanant el ID 2.

Si s'arrenca l'aplicació, es crida a /equipaments/howto i el resultat al log és:

	(howtoSpringCache) canigo Message: 09 10 2017 10:11:59,720 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - .... Obtenint equipaments
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:07,184 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:10,185 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:13,186 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:16,186 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:19,186 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:12:22,186 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]

Tot i que l'aplicació serveix els mateixos objectes múltiples vegades triga 3 segons a servir cadascún (La simulació de lentitud que hem fet).

### Exemple d'accés amb Cache

Per a activar la cache, hem de crear una Cache on s'enmmagatzemarà els Equipaments, per fer això utilitzem l'annotació @Cacheable de Spring (org.springframework.cache.annotation.Cacheable)

Al mètode que s'ha creat al punt anterior (getById) afegim l'annotació

	@Cacheable("equipaments")
	public Equipament getById(Long id) {
		simularLentitud();
        return getEquipament(id);
	}
	
Amb aquesta annotació s'indica que es crea la Cache "equipaments" on es guardaran els objectes retornats pel mètode getById.

Per a que l'aplicació processi les annotacions de Caching hem d'afegir l'annotació @EnableCaching a la nostra classe Application.java

	@SpringBootApplication
	@EnableCaching
	public class Application extends SpringBootServletInitializer implements WebApplicationInitializer {

		public static void main(final String[] args) throws Exception {
			if (System.getProperty("entorn") == null) {
				System.setProperty("entorn", "loc");
			}

			SpringApplication.run(Application.class, args);
		}
		
Si ara s'arrenca l'aplicació i es crida a /equipaments/howto i el resultat al log és:

	(howtoSpringCache) canigo Message: 09 10 2017 10:51:55,145 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - .... Obtenint equipaments
	(howtoSpringCache) canigo Message: 09 10 2017 10:51:58,179 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:52:01,180 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 10:52:01,181 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:52:01,182 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 10:52:01,182 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 10:52:01,182 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	
Ara es pot veure que les dos primeres crides trigen 3 segons ja que l'aplicació obté per primera vegada aquests Equipaments. Però per als 4 següents, entrega els objectes de manera inmediata (sense entrar al mètode i per tant sense aturar-se els 3 segons que hem simulat).

Es recomana utilitzar un dels proveïdors compatibles amb [Spring Cache] (https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-caching.html#_supported_cache_providers) ja que la configuració per defecte té evidents problemes com que l'objecte desat a Cache es manté indefinidament, amb els inconvenients que això comporta.

## Ús de Caffeine

### Prerequisits

Caffeine només funciona con Java 1.8 o superior, per això s'ha de compilar la nostra aplicació amb Java 1.8 i utilitzar Java 1.8 en el seu desplegament. Al pom.xml

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-compiler-plugin</artifactId>
		<configuration>
			<source>1.8</source>
			<target>1.8</target>
		</configuration>
	</plugin>

### Exemple

S'ha d'afegir la dependència de Caffeine al pom.xml

	<dependency>
		<groupId>com.github.ben-manes.caffeine</groupId>
		<artifactId>caffeine</artifactId>
	</dependency>

A **resources** es crea el fitxer application.properties per afegir les propietats de configuració de Caffeine

	spring.cache.cache-names: equipaments
	spring.cache.caffeine.spec: maximumSize=500, expireAfterWrite=30s
	
En aquesta configuració hem indicat que crea el directori de cache "equipaments", que té una mida màxima de 500 elements i que cada element es guarda fins a 30 segons després d'escriure's a la cache.

Si ara s'arrenca l'aplicació i es crida a /equipaments/howto i el resultat al log és:

	(howtoSpringCache) canigo Message: 09 10 2017 13:22:52,706 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - .... Obtenint equipaments
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:55,709 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:58,710 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:58,710 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:58,710 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:58,710 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:22:58,710 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]

Si es torna a fer la crida abans que passin 30 segons:

	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,510 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - .... Obtenint equipaments
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:09,511 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	
Els objectes continúen entregant-se inmediatament, però si es torna a fer la crida una vegada han passat 30 segons de la seva inserció:

	(howtoSpringCache) canigo Message: 09 10 2017 13:23:52,326 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - .... Obtenint equipaments
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:55,329 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:58,331 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:58,331 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:58,331 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-2 -->Equipament [nom=centre obert Alba]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:58,331 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	(howtoSpringCache) canigo Message: 09 10 2017 13:23:58,331 INFO cat.gencat.howtospringcache.endpoints.EquipamentServiceController - Equipament-1 -->Equipament [nom=estació autobusos]
	
Les dues primeres crides tornen a trigar 3 segons, ja que a la Cache ja no hi són els objectes.
