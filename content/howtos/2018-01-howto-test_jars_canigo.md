+++
date = "2017-12-12"
title = "Proves Unitàries Mòduls de Canigó"
description = "Realitzar proves unitàries de mòduls de Canigó"
section = "howtos"
categories = ["canigo"]
key = "GENER2018"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2.3.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.3 del Framework Canigó.

### Introducció

Amb la publicació de Canigó 3.2.3 els mòduls Core, Web-RS, Persistència i Seguretat proporcionen uns jars que inclouen els seus tests unitaris (tipus test-jar).

Amb aquests jars des de l'aplicació creada es pot executar aquests tests per a comprovar que els mòduls funcionen correctament. Aquests tests es poden executar amb llibreries més actuals i d'aquesta manera comprovar que els mòduls continuen funcionant, o en cas contrari que les noves llibreries no són compatibles amb Canigó

### Test Jars

Si es crea una nova aplicació amb el [plugin de Canigó](/canigo-download-related/plugin-canigo/) aquestes llibreries ja vénen incorporades al pom.xml

	<dependency>
	   <groupId>cat.gencat.ctti</groupId>
	   <artifactId>canigo.core</artifactId>
	   <type>test-jar</type>
	   <version>${canigo.core.version}</version>
	   <scope>test</scope>
	   <classifier>tests</classifier>
	</dependency>
	<dependency>
	   <groupId>cat.gencat.ctti</groupId>
	   <artifactId>canigo.web.rs</artifactId>
	   <type>test-jar</type>
	   <version>${canigo.web.rs.version}</version>
	   <scope>test</scope>
	   <classifier>tests</classifier>
	</dependency>
	<dependency>
	   <groupId>cat.gencat.ctti</groupId>
	   <artifactId>canigo.persistence.jpa</artifactId>
	   <type>test-jar</type>
	   <version>${canigo.persistence.jpa}</version>
	   <scope>test</scope>
	   <classifier>tests</classifier>
	</dependency>

I també el plugin de Maven que fa que s'executin els tests dels mòduls:


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
							<dependency>cat.gencat.ctti:canigo.persistence.jpa</dependency>
							<dependency>cat.gencat.ctti:canigo.web.rs</dependency>
						</dependenciesToScan>
						<excludes>
							<exclude>%regex[${project.groupId}.*.*Test.*]</exclude>
						</excludes>
					</configuration>
				</execution>
			</executions>
		</plugin>

### Executar els tests

Per executar els tests només cal cridar al goal de maven **test**

	Results :

	Tests run: 57, Failures: 0, Errors: 0, Skipped: 0

Si per exemple es vol probar que una nova versió d'Hibernate és compatible amb els mòduls Canigó s'ha d'afegir la llibreria que es desitgi provar amb **scope test**


	<dependency>
		<groupId>org.hibernate</groupId>
		<artifactId>hibernate-core</artifactId>
		<version>5.2.10.Final</version>
	</dependency>
			
	<dependency>
		<groupId>org.hibernate</groupId>
		<artifactId>hibernate-entitymanager</artifactId>
		<version>5.2.10.Final</version>
	</dependency>

I tornar a llençar el goal maven de test:

	Tests run: 57, Failures: 0, Errors: 2, Skipped: 0

Amb aquestes noves llibreries, el mòdul canigo-persistence no passa els tests, amb el qual significa que no es pot utilitzar amb Canigó.

Amb aquest procediment es pot validar si es poden utilitzar llibreries més actuals que les proporcionades als mòduls de Canigó.

