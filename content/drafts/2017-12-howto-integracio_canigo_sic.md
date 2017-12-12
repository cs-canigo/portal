+++
date = "2017-12-12"
title = "Integració d'una aplicació Canigó a SIC 2.0"
description = "Integració d'una aplicació Canigó a SIC 2.0"
section = "howtos"
categories = ["canigo"]
key = "DESEMBRE2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2 i s'hagin d'integrar al SIC.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.x del Framework Canigó.

### Introducció

En aquest HowTo s'explica els passos a realitzar per a realitzar la [integració d'una aplicació Canigó al SIC](noticies/2017-12-11-Canigo-Integracio-pipelines-SIC/).

Aquest HowTo parteix de tenir una aplicació Canigó generada pel [pluguin de Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)

### Connectar amb Git

Una vegada es disposa d'un projecte creat al [Gitlab de SIC] (http://canigo.ctti.gencat.cat/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/) els passos per a sincronitzar la nostra aplicació Canigó amb el Git són:

Crear un fitxer [.gitignore](https://git-scm.com/docs/gitignore) a l'arrel de l'aplicació perquè ignori les parts que no s'han de sincronitzar amb el Git. Per exemple:

	target/
		
Inicialitzar l'aplicació com a repositori git i pujar el codi.

	Anar a l'arrel de l'aplicació
	git init
	git remote add origin *path_projecte_git*
	git add .
	git commit -m "descripció commit"
	git push -u origin master
	
### Automatitzar el descriptor sic.yml

Per a la construcció i desplegament d'una pipeline al Jenkins l'aplicació ha de disposar del fitxer sic.yml amb la versió de l'aplicació. Més informació al punt 3.3.3 del [Manual d'Usuari del SIC](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf).

Per a que cada vegada que es generi una nova versió de l'aplicació amb Maven aquest fitxer estigui actualitzat s'han de realitzar les següents passes:

A *src/resources* crear la plantilla el fitxer sic.yml amb el següent contingut:

	version: ${project.version}
	
Al pom.xml s'ha d'afegir el plugin **maven-resources-plugin**

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-resources-plugin</artifactId>
		<version>3.0.2</version>
		<executions>
			<execution>
				<id>set-version</id>
				<phase>process-resources</phase>
				<goals>
					<goal>copy-resources</goal>
				</goals>
				<configuration>
					<useDefaultDelimiters>true</useDefaultDelimiters>
					<outputDirectory>sic</outputDirectory>
					<resources>          
						<resource>
							<directory>src/main/resources</directory>
							<filtering>true</filtering>
							<includes>
								<include>sic.yml</include>
							</includes>
						</resource>
					</resources>
				</configuration>            
			</execution>
		</executions>
	</plugin>

Amb aquestes passes s'actualitza la versió al fitxer /sic/sic.yml. 

*A partir de la versió 3.2.3 de Canigó aquesta configuració ja vendrà inclosa a la plantilla que es genera al plguin*
	

	

