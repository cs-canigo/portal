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

En aquest HowTo s'explica els passos a realitzar per a realitzar la [integració d'una aplicació Canigó al SIC](/noticies/2017-12-11-Canigo-Integracio-pipelines-SIC/).

El punt de partida és una aplicació Canigó generada pel [plugin de Canigó per a Eclipse](/canigo-download-related/plugin-canigo/), un projecte creat al [Gitlab de SIC] (http://canigo.ctti.gencat.cat/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/) i un usuari amb permisos per treballar-hi.

### Connectar amb Git

Primer de tot cal que es configurin els binaris per estar fora del control del Git, ja que no corresponen a codi font. Per això cal crear un fitxer [.gitignore](https://git-scm.com/docs/gitignore) a l'arrel de l'aplicació perquè ignori les parts que no s'han de sincronitzar amb el Git. Per exemple:

	target/
	
Típicament, a més de la carpeta de sortida de la compilació, també s'ignoren recursos propis de l'IDE de desenvolupament (Eclipse, NetBeans, IntelliJ, ...).

Inicialitzem l'aplicació com a repositori Git i pugem el codi:

	Anar a l'arrel de l'aplicació
	git init
	git remote add origin *path_projecte_git*
	git add .
	git commit -m "descripció commit"
	git push -u origin master
	
### Automatitzar el descriptor sic.yml

Per a la construcció i desplegament d'una aplicació mitjançant una pipeline al Jenkins, l'aplicació ha de disposar del fitxer "sic.yml" amb la versió de l'aplicació. Més informació al punt 3.3.3 del [Manual d'Usuari del SIC](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf). Aquesta serà la versió amb què s'etiquetarà el codi pujat al master un cop hagi superat les diferents fases prèvies de la pipeline (construcció, tests, ...).

Per a que el camp "version" d'aquest fitxer "sic.yml" no hagi de ser actualitzat manualment, es recomana automatitzar el procés a partir de la versió del projecte Maven:

A *src/main/resources* crear el fitxer "sic.yml" amb el següent contingut:

	version: ${project.version}
	
Al pom.xml de l'aplicació s'ha d'afegir el plugin **maven-resources-plugin** amb la següent configuració:

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

D'aquesta manera, quan es construeixi l'aplicació, automàticament s'establirà la versió al fitxer "/sic/sic.yml", a partir del qual la pipeline del SIC generarà el tag de l'aplicació al Git. 

*A partir de la versió 3.2.3 de Canigó, aquesta configuració ja estarà incorporada a la plantilla que genera el plugin d'Eclipse*
	

	

