+++
date        = "2017-08-04"
title       = "Actualització Canigó 3.1 a Canigó 3.2"
description = "Com realitzar l'actualització d'una aplicació de Canigó 3.1 a Canigó 3.2"
section     = "howtos"
categories  = ["canigo"]
key         = "JULIOL2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin fer l'actualització a Canigó 3.2 de la seva aplicació Canigó 3.1

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.1 del Framework Canigó

### Introducció

El passat mes de Març s'ha publicat la versió 3.2 del Framework Canigó. Aquesta versió és una [versió LTS](/noticies/2017-07-05-Canigo-LTS/), i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de tenir un suport continuat així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquest Howto és mostrar els procediments necessaris per a realitzar l'actualització d'una aplicació realitzada amb Canigó 3.1. El punt de partida d'aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse.

## Aplicació REST

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) es poden veure les versions dels mòduls i components de Canigó de les versions 3.1.x i 3.2.x. S'han d'actualitzar els intervals dels mòduls utilitzats per a migrar a Canigó 3.2.

En cas de tenir alguna dependència de Spring al POM de l'aplicació s'ha d'actualitzar a la versió "4.3.4.RELEASE"

En cas de tenir la llibreria Xerces com a dependència s'ha d'actualitzar a la versió 2.11.0:

		<dependency>
		    <groupId>xerces</groupId>
		    <artifactId>xercesImpl</artifactId>
		    <version>2.11.0</version>
		</dependency>
		
S'ha d'afegir la dependència al nou mòdul "canigo.web.rs":
	
	<canigo.web.rs.version>1.0.0</canigo.web.rs.version>
	...
	<dependency>
		<groupId>cat.gencat.ctti</groupId>
		<artifactId>canigo.web.rs</artifactId>
		<version>${canigo.web.rs.version}</version>
	</dependency>
	
Els filtres *UrlRewriteFilter* i *LocalizationFilter* ja no es troben disponibles al mòdul "canigo.web.core". En cas de tenir la necessitat d'utilitzar-los s'ha d'afegir la dependència amb el mòdul "canigo.web.jsf":

	<dependency>
		<groupId>cat.gencat.ctti</groupId>
		<artifactId>canigo.web.jsf</artifactId>
		<version>${canigo.web.jsf.version}</version>
		<exclusions>
			<exclusion>
				<groupId>com.sun.faces</groupId>
				<artifactId>jsf-api</artifactId>
			</exclusion>
			<exclusion>
				<groupId>com.sun.faces</groupId>
				<artifactId>jsf-impl</artifactId>
			</exclusion>
			<exclusion>
				<groupId>javax.el</groupId>
				<artifactId>javax.el-api</artifactId>
			</exclusion>
			<exclusion>
				<groupId>com.sun.facelets</groupId>
				<artifactId>jsf-facelets</artifactId>
			</exclusion>
		</exclusions>
	</dependency>
	
Com que l'aplicació no és JSF, es pot excloure les llibreries JSF del mòdul..

### Servei de Logs

En Canigó 3.2 s'utilitza Log4j2 en comptes de Log4j. [S'han d'eliminar els fitxers log4j.xml de l'aplicació i substituir-los per log4j2.xml](https://logging.apache.org/log4j/2.x/manual/migration.html)

Per exemple el següent fitxer log4j.xml

	<?xml version="1.0" encoding="UTF-8" ?>
	<!DOCTYPE log4j:configuration PUBLIC "-//APACHE//DTD LOG4J//EN" "http://logging.apache.org/log4j/docs/api/org/apache/log4j/xml/log4j.dtd">

	<log4j:configuration xmlns:log4j='http://jakarta.apache.org/log4j/'
		debug="true">

		<!-- Architecture appender -->
		<appender name="file" class="org.apache.log4j.DailyRollingFileAppender">
			<param name="DatePattern" value="'.'yyyyMMdd" />
			<param name="File" value="/tmp/canigo.log" />
			<param name="Append" value="true" />
			<layout class="org.apache.log4j.PatternLayout">
				<param name="ConversionPattern" value="canigo Message: %d{dd MMM yyyy HH:mm:ss,SSS} %-5p [%t] %c - %m%n - %X{APPID}" />
			</layout>
		</appender>
		<appender name="console" class="org.apache.log4j.ConsoleAppender">
			<layout class="org.apache.log4j.PatternLayout">
				<param name="ConversionPattern" value="canigo Message: %d{dd MMM yyyy HH:mm:ss,SSS} %-5p [%t] %c - %m%n - %X{APPID}" />
			</layout>
		</appender>
		<category name="cat.gencat.ctti">
			<appender-ref ref="file" />
			<appender-ref ref="console" />
		</category>
		<root>
			<level value="debug" />
		</root>
	</log4j:configuration>
	
Es convertiria en el següent fitxer log4j2.xml

	<?xml version="1.0" encoding="UTF-8"?>
	<Configuration>
		<Appenders>
			<RollingFile name="DAILY_LOG" fileName="/tmp/canigo.log" filePattern="tmp/%d{ddMMyyyy}_canigo.log" append="true">
				<PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n"/>
				<Policies>
					<TimeBasedTriggeringPolicy interval="1"/>
				</Policies>                               
			</RollingFile>
			<Console name="STDOUT" target="SYSTEM_OUT">
				<PatternLayout
					pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />
			</Console>
		</Appenders>
		<Loggers>
			<Logger name="cat.gencat.ctti" level="debug" additivity="false">
				<AppenderRef ref="DAILY_LOG" />
				<AppenderRef ref="STDOUT" />
			</Logger>
			<Root level="debug">
				<AppenderRef ref="DAILY_LOG" />
				<AppenderRef ref="STDOUT" />
			</Root>
		</Loggers>
	</Configuration>

També s'ha de substituïr la forma de realitzar el logging a les nostres classes de l'aplicació. A Canigó 3.1 el procediment era el següent:

	...
	import org.apache.commons.logging.Log;
	import org.apache.commons.logging.LogFactory;
	...
	private static final Log logger = LogFactory.getLog(MyClass.class);
	...
	logger.debug("Això és un log");
	...
	
A Canigó 3.2 el procediment ha de ser el següent:

	...
	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;
	...
	private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
	...
	logger.debug("Això és un log");
	
### Esquemes de Spring

A banda d'assegurar-se que totes les llibreries que Spring tinguin el mateix versionatge "4.3.4.RELEASE" (cal tenir en compte que hi ha llibreries de Spring amb el seu propi versionatge, en aquest cas ens hem d'assegurar que disposem de la versió compatible amb la 4.3.4.RELEASE del core de Spring) hem d'actualitzar els esquemes XSD dels fitxers de configuració a la versió 4.3.

L'esquema XSD de Spring Security ha d'actualitzar-se a la versió 4.1.

Per exemple, el fitxer app-custom-security.xml quedaria amb la següent capçalera:

	<?xml version="1.0" encoding="UTF-8"?>
	<beans  xmlns="http://www.springframework.org/schema/beans"
			xmlns:security="http://www.springframework.org/schema/security"
			xmlns:context="http://www.springframework.org/schema/context"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			xmlns:jdbc="http://www.springframework.org/schema/jdbc"
			xsi:schemaLocation="http://www.springframework.org/schema/beans 	http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
								http://www.springframework.org/schema/context 	http://www.springframework.org/schema/context/spring-context-4.3.xsd
								http://www.springframework.org/schema/security 	http://www.springframework.org/schema/security/spring-security-4.1.xsd
								http://www.springframework.org/schema/jdbc 		http://www.springframework.org/schema/jdbc/spring-jdbc-4.3.xsd">

### Dispatcher-servlet

A la versió 4.3.4 de Spring la propietat *mediaTypes* del bean ContentNegotiatingViewResolver ja no és modificable. En aquesta versió *ContentNegotiatingViewResolver* delega en l'objecte *ContentNegotiationManager* la gestió d'aquesta propietat:

Al fitxer "dispatcher-servlet.xml" s'ha de substituir el bean actual:

	<bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
		<property name="order" value="1" />
		<property name="mediaTypes">
			<map>
				<entry key="json" value="application/json" />
			</map>
		</property>
		<property name="defaultViews">
			<list>
				<bean class="org.springframework.web.servlet.view.json.MappingJackson2JsonView" />
			</list>
		</property>
	</bean>
	
Per:

	<bean id="contentNegotiationManager"  class="org.springframework.web.accept.ContentNegotiationManagerFactoryBean">
        	<property name="favorPathExtension" value="true" />
        	<property name="ignoreAcceptHeader" value="true"/>

		<property name="mediaTypes">
		    <map>
			<entry key="json" value="application/json"/>
		   </map>
		</property>
   	</bean>
	
	<bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
		<property name="order" value="1" />
		<property name="contentNegotiationManager" ref="contentNegotiationManager"/>
		<property name="defaultViews">
			<list>
				<bean class="org.springframework.web.servlet.view.json.MappingJackson2JsonView" />
			</list>
		</property>
	</bean>
	
## Aplicació JSF

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) es poden veure les versions dels mòduls i components de Canigó de les versions 3.1.x i 3.2.x. S'han d'actualitzar els intervals dels mòduls utilitzats per a migrar a Canigó 3.2.

En cas d'utilitzar el mòdul "canigo.operation.instrumentation", l'última versió d'aquest mòdul és només per a aplicacions REST. S'ha de treure la dependència a aquest mòdul i afegir la dependència al nou mòul "canigo.operation.instrumentation.jsf":

	<dependency>
	      <groupId>cat.gencat.ctti</groupId>
	      <artifactId>canigo.operation.instrumentation.jsf</artifactId>
	      <version>${canigo.operation.instrumentation.jsf}</version>
    	</dependency>
	
En cas de tenir alguna dependència amb Spring al POM de l'aplicació s'ha d'actualitzar a la versió 4.3.4.RELEASE.

En cas de tenir la llibreria Xerces com a dependència s'ha d'actualitzar a la versió 2.11:

		<dependency>
		    <groupId>xerces</groupId>
		    <artifactId>xercesImpl</artifactId>
		    <version>2.11.0</version>
		</dependency>
		
### Servei de Logs

Idem "Aplicació REST"

### Esquemes de Spring

Idem "Aplicació REST"
