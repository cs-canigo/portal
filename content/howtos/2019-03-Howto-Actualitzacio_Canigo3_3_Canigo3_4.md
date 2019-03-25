+++
date        = "2019-03-18"
title       = "Actualització Canigó 3.3 a Canigó 3.4"
description = "Com realitzar l'actualització d'una aplicació de Canigó 3.3 a Canigó 3.4"
section     = "howtos"
categories  = ["canigo"]
key         = "ABRIL2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin fer l'actualització a Canigó 3.3 de la seva aplicació Canigó 3.4

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.4 del Framework Canigó

### Introducció

El mes de Març del 2019 s'ha publicat la versió 3.4 del Framework Canigó. Aquesta versió és una [versió LTS](/canigo/roadmap), i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de tenir un suport continuat així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquest Howto és mostrar els procediments necessaris per a realitzar l'actualització d'una aplicació realitzada amb Canigó 3.1. El punt de partida d'aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse.

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) es poden veure les versions dels mòduls i components de Canigó de les versions 3.3.x i 3.4.x. S'han d'actualitzar els intervals dels mòduls utilitzats per a migrar a Canigó 3.4.

La versió parent de Spring boot és la 2.1.3.RELEASE, per tant, per una aplicació amb Spring boot el parent quedaria:

```	
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.1.3.RELEASE</version>
	</parent>
```

La versió de spring loeaded és la 1.2.8.RELEASE

### Passos a realitzar 

Després de canviar les versions dels mòduls decrits a la secció anterior, és necessari realitzar els següents canvis:

1. Canviar en el pom.xml el goal del plugin **maven-assembly-plugin** a **single**
2. Canviar la classe **org.springframework.boot.web.support.SpringBootServletInitializer** a **org.springframework.boot.web.servlet.support.SpringBootServletInitializer**
3. Canviar la classe **org.springframework.boot.autoconfigure.web.DispatcherServletAutoConfiguration** a **org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration**
4. Canviar la classe **org.springframework.data.jpa.repository.support.QueryDslRepositorySupport** a **org.springframework.data.jpa.repository.support.QuerydslRepositorySupport**
5. El mètode findOne de QuerydslPredicateExecutor retorna Optional, per simular el que retornava **findOne** de Spring 4.x es necessari canviar-ho per **findById(E).orElse(null)**
6. Modificar les **named querys amb paràmetres** per afegir-li el **número de cada paràmetre**, per exemple:
de:
```
@Query("select p from Person p where p.lastname = ?")
	List<Person> findByLastname(String lastname);
```	
a:
```
@Query("select p from Person p where p.lastname = ?1")
	List<Person> findByLastname(String lastname);
```
7. Es recomana utilitzar **org.springframework.data.mongodb.repository.support.QuerydslMongoPredicateExecutor** enlloc de **org.springframework.data.mongodb.repository.support.QuerydslMongoRepository** ja que aquest està deprecat
8. Modificar totes les utilitzacions del mètode **save(Iterable)** a **saveAll(Iterable)** de les classes que extenguin de cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository i de cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository
9. Modificar la versió de **java** com a mínim a la **versió 8** amb el plugin **maven-compiler-plugin** del pom.xml
```
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
```
10. Modificar el nom del metode **dispatcherServletRegistration** de Application.java per **apiDispatcherServletRegistration**
11. Utilitzar mètode **"public MongoClient mongoClient()"** enlloc de **"public Mongo mongo() throws Exception"** dels objectes que heredin de cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig
12. Afegir la propietat de sistema **"spring.main.allow-bean-definition-overriding"** a true al iniciar l'aplicació, afegint al Application.java:
```
System.setProperty("spring.main.allow-bean-definition-overriding", String.valueOf(true));
```
13. Si l'aplicació utilitza BD Mongodb, afegir l'annotació "@Configuration" a totes les classes que heredin de "cat.gencat.ctti.canigo.arch.persistence.mongodb.config.MongoCoreConfig"
14. Si l'aplicació utilitza BD mysql, canviar el driver **com.mysql.jdbc.Driver** per **com.mysql.cj.jdbc.Driver** al fitxer jdbc.properties
15. Si l'aplicació utilitza la seguretat per fitxer és necessari canviar el **"password-encoder"** del autentication provider, de:
```
		<security:authentication-provider>
 				<security:password-encoder hash="plaintext"/>
				<security:user-service properties="classpath:config/props/security.users.properties"/>
			</security:authentication-provider>
		</security:authentication-manager>
```
a:
```
		<security:authentication-manager>
			<security:authentication-provider>
				<security:password-encoder ref="passwordEncoder" />
				<security:user-service properties="classpath:config/props/security.users.properties"/>
			</security:authentication-provider>
		</security:authentication-manager>
		<bean id="passwordEncoder" class="org.springframework.security.crypto.password.NoOpPasswordEncoder"	factory-method="getInstance" />
```
O fer un update dels passwords afegint "{noop}" davant dels passwords, aixi per exemple si per l'usuari "user" tenia el password al fitxer de text "password" es necessari canviar-ho per "{noop}password"

No es recomana utilitzar la seguretat per fitxer en entorns productius

16. Si l'aplicació utilitza la seguretat **sense definir un "password-encoder"** en el atentication provider es necessari definir-ne un o utilitzar el "NoOpPasswordEncoder" que està deprecat, per exemple si tenim una security per BD amb:
```
		<security:authentication-manager>
			<security:authentication-provider>
				<security:jdbc-user-service data-source-ref="dataSource"/>
			</security:authentication-provider>
		</security:authentication-manager>
```
Es necessari canviar-ho per:
```
		<security:authentication-manager>
			<security:authentication-provider>
				<security:jdbc-user-service data-source-ref="dataSource"/>
				<security:password-encoder ref="passwordEncoder" />
			</security:authentication-provider>
		</security:authentication-manager>
		
		<bean id="passwordEncoder" class="org.springframework.security.crypto.password.NoOpPasswordEncoder"
		factory-method="getInstance" />
```
		
O fer un update dels passwords afeint "{noop}" davant dels passwords, aixi per exemple si per l'usuari "user" tenia el password a BD "password" es necessari canviar-ho per "{noop}password"

Es recomana utilitzar els "password.encoders" BCryptPasswordEncoder, Pbkdf2PasswordEncoder o SCryptPasswordEncoder
