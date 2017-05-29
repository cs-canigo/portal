+++
date        = "2017-06-01"
title       = "Desplegar una aplicació Canigó 3.2 a Websphere 8.5.x"
description = "Desplegar una aplicació Canigó 3.2 a Websphere 8.5.x"
section     = "howtos"
categories  = ["canigo"]
key         = "JUNY2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors que vulguin desplegar una aplicació Canigó 3.2 en un servidor d'aplicacions IBM Websphere 8.5.x

### Introducció

Canigó 3.2 incorpora JPA 2.1 i Hibernate 5.0 com a proveïdor. IBM Wesphere 8.5.x només dóna suport a JPA 2.0 incloent com a proveïdor OpenJPA 2.4. Degut a aquesta incompatibilitat, s'han de realitzar certes modificacions a les aplicacions Canigó per a poder ser desplegades a WebSphere 8.5.

En aquest HowTo es parteix de l'aplicació plantilla de Canigó que genera el [plugin d'Eclipse] (/canigo-download-related/plugin-canigo/).

### Modificar el pom.xml

S'ha de realitzar l'exclusió al mòdul de Spring Boot de **spring-boot-starter-tomcat**:

	<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <exclusions>
        <exclusion>
          <artifactId>spring-boot-starter-logging</artifactId>
          <groupId>org.springframework.boot</groupId>
        </exclusion>
        <exclusion>
          <artifactId>spring-boot-starter-tomcat</artifactId>
          <groupId>org.springframework.boot</groupId>
        </exclusion>
      </exclusions>
    </dependency>

S'ha de realitzar l'exclusió de la llibreria **xml-apis** del mòdul spring-boot-starter-data-jpa:

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
      <exclusions>
        <exclusion>
          <artifactId>spring-boot-starter-logging</artifactId>
          <groupId>org.springframework.boot</groupId>
        </exclusion>
        <exclusion>
          <artifactId>xml-apis</artifactId>
          <groupId>xml-apis</groupId>
        </exclusion>
      </exclusions>
    </dependency>

### Implementació de PersistenceProviderResolver

Per aconseguir que la nostra aplicació resolgui com a proveïdor de JPA HibernatePersistenceProvider, i no OpenJPA, hem d'implementar la nostra pròpia classe PersistenceProviderResolver. Un cop implementada, hem de fer que la nostra aplicació l'utilitzi registrant-la abans de realitzar la inicialització del mòdul de persistència.

Per fer això hem creat el paquet "cat.gencat.provawebsphere.websphere" a l'aplicació i creat el fitxer HibernatePersistenceProviderResolver.java amb el següent codi:

	package cat.gencat.provawebsphere.websphere;

	import org.hibernate.jpa.HibernatePersistenceProvider;
	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;

	import javax.persistence.spi.PersistenceProvider;
	import javax.persistence.spi.PersistenceProviderResolver;
	import javax.persistence.spi.PersistenceProviderResolverHolder;
	import java.util.Collections;
	import java.util.List;

	public class HibernatePersistenceProviderResolver implements PersistenceProviderResolver {
		
		/** Logger  */  
		private static final Logger logger = LoggerFactory.getLogger(HibernatePersistenceProviderResolver.class);
		
		private volatile PersistenceProvider persistenceProvider = new HibernatePersistenceProvider();

		@Override
		public List<PersistenceProvider> getPersistenceProviders() {
			return Collections.singletonList(persistenceProvider);
		}

		@Override
		public void clearCachedProviders() {
			persistenceProvider = new HibernatePersistenceProvider();
		}

		public static void register() {
			logger.debug("Registering HibernatePersistenceProviderResolver");
			PersistenceProviderResolverHolder.setPersistenceProviderResolver(new HibernatePersistenceProviderResolver());
		}
	}
	
Per assegurar que registrem el nostre proveïdor de JPA a l'inici de l'aplicació, abans de la creació de qualsevol altre bean de Spring, creem la classe PreInitializer amb el següent codi:

	package cat.gencat.provawebsphere.websphere;

	import org.springframework.beans.BeansException;
	import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
	import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
	import org.springframework.core.Ordered;
	import org.springframework.core.PriorityOrdered;

	 
	public class PreInitializer implements BeanFactoryPostProcessor, PriorityOrdered {  
		 @Override  
		 public int getOrder() {  
		  return Ordered.HIGHEST_PRECEDENCE;  
		 }  
		 @Override  
		 public void postProcessBeanFactory(  
		   ConfigurableListableBeanFactory beanFactory) throws BeansException {  
			 HibernatePersistenceProviderResolver.register();
		 }  
	} 

Al fitxer "Application.java" hem de crear el bean per la classe PreInitializer per a que es faci el registre:

	@Bean
    public PreInitializer preInitializer() {
		return new PreInitializer();
    }

### Definició entitats a "persistence.xml"

Al fitxer de persistència hem de definir totes les entitats que tingui l'aplicació. En la plantilla que utilitza aquest HowTo només hi ha l'entitat Equipament:

<persistence xmlns="http://java.sun.com/xml/ns/persistence"	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"
	version="1.0">

	<persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL">
			<class>cat.gencat.provawebsphere3.model.Equipament</class>  
	</persistence-unit>

</persistence>

### Configuració a WebSphere

Una vegada configurada la nostra aplicació a la consola web d'administració de WebSphere, abans d'iniciar-la, seleccionar la nostra aplicació, anar a "Cargador de clases" i seleccionar els següents valors:

**Clases cargadas con el cargador local primero (padre último)**

**Cargador de clases único para la aplicación**

![](/related/canigo/howto/imatges/20170501.jpg)

Seguint aquestes instruccions l'aplicació plantilla de Canigó 3.2 haurà estat desplegada de forma satisfactòria a WebSphere 8.5.
