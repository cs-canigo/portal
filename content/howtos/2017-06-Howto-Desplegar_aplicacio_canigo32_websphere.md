+++
date        = "2017-06-01"
title       = "Desplegar una aplicació Canigó 3.2 a Websphere 8.5.x"
description = "Desplegar una aplicació Canigó 3.2 a Websphere 8.5.x"
section     = "howtos"
categories  = ["canigo"]
key         = "JUNY2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors que estiguin interesats en desplegar una aplicació Canigó 3.2 en un IBM Websphere 8.5.x

### Introducció

La versió Canigó 3.2 de Canigó incorpora JPA 2.1 mentres que IBM Wesphere 8.5.x només dóna support a JPA 2.0 mitjançant la implementació d'OpenJPA 2.4.0 que incorpora. Degut a aquesta incompatibilitat s'han de realitzar unes modificions a les aplicacions Canigó per a poder desplegar en IBM Websphere.

En aquest HowTo es parteix de l'aplicació Canigó que genera el [plugin de Canigó] (/canigo-download-related/plugin-canigo/)

### Modificar el pom.xml

S'ha de realitzar l'exclusió al mòdul de Spring Boot de Tomcat **spring-boot-starter-tomcat**

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

S'ha de realitzar l'exclusió de la llibreria **xml-apis** del mòdul de Spring Boot, spring-boot-starter-data-jpa

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

### PersistenceProviderResolver

Per a aconseguir que la nostra aplicació resolgui a HibernatePersistenceProvider i no carregui el Provider que proporciona la implementació OpenJPA de Websphere hem de implementar la nostra pròpia classe de PersistenceProviderResolver i fer que la nostra aplicació utilitzi aquesta classe registrant-la abans de realitzar la inicialització de la nostra capa de persistència.

Per fer això hem creat la carpeta webpshere a l'aplicació i creat el fitxer HibernatePersistenceProviderResolver.java amb el següent codi:

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
	
I per a assegurar que registrem el nostre provider al inici de l'aplicació creem la classe PreInitializer amb el següent codi:

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

Al fitxer Application.java hem de crear el bean de la classe PreInitializer per a que es faci el registre:

	@Bean
    public PreInitializer preInitializer() {
		return new PreInitializer();
    }

### Persistence.xml

Al fitxer de persistència hem de definir totes les entitats que tingui l'aplicació. En la plantilla que utilitza aquest HowTo només hi ha la entitat Equipaments:

<persistence xmlns="http://java.sun.com/xml/ns/persistence"	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"
	version="1.0">

	<persistence-unit name="canigo" transaction-type="RESOURCE_LOCAL">
			<class>cat.gencat.provawebsphere3.model.Equipament</class>  
	</persistence-unit>

</persistence>

### Configuració a Websphere

Una vegada desplegat el nostre WAR hem de seleccionar la nostra aplicació, anar a Cargador de clases i seleccionar els següents valors:

**Clases cargadas con el cargador local primero (padre último)**

**Cargador de clases único para la aplicación**

![](/related/canigo/howto/imatges/20170501.jpg)