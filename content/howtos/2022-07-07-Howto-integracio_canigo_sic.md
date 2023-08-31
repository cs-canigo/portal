+++
date = "2022-07-07"
title = "Integració d'una aplicació Canigó a SIC"
description = "Com integrar una aplicació Canigó 3.x a Sistema d'Integració Contínua (SIC)"
section = "howtos"
categories = ["canigo"]
key = "AGOST2022"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors que hagin d'integrar al SIC una aplicació Canigó.

## Prerequisits

Els passos descrits en aquest document apliquen a la versió 3.x del Framework Canigó i el punt de partida és una aplicació
generada pel [Plugin de Canigó per a Eclipse](/canigo-fwk-docs/entorn-de-desenvolupament/plugin-eclipse/), un projecte repositat al
[Sistema de Custòdia](/plataformes/sic/serveis/sic30-serveis/scm/) del SIC i un usuari amb permisos per a treballar-hi.

## Integració al SIC

### Repositar el codi font

Primer de tot cal que es configurin els binaris per estar fora del control del Git, ja que no corresponen a codi font.
Per això cal crear un fitxer [.gitignore](https://git-scm.com/docs/gitignore) a l'arrel de l'aplicació perquè
ignori les parts que no s'han de sincronitzar amb el Git.
Per exemple:

	target/

<div class="message information">
A més de la carpeta de sortida de la compilació, es recomana ignorar també recursos propis de l'IDE de desenvolupament
(Eclipse, NetBeans, IntelliJ, etc).
</div>

Inicialitzem l'aplicació com a repositori Git i pugem el codi font:

	-- cal posicionar-se a l'arrel de l'aplicació
	git init
	git remote add origin *path_projecte_git*
	git add .
	git commit -m "descripció commit"
	git push -u origin master

### Preparar l'aplicació

Podeu consultar les guies proporcionades per a la integració d'aplicacions al SIC en funció de la versió del servei:

- **SIC 2.0**:
    * [Com preparar una aplicació per desplegar-la automàticament](/sic20-guies/preparar-aplicacio/)
    * [Com construir el fitxer ACA](/sic20-guies/fitxer-aca/)

- **SIC 3.0**:
    * [Com preparar una aplicació per desplegar-la automàticament](/sic30-guies/preparar-aplicacio/)
    * [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)
    * [SIC 3.0 i procés de transició](/sic-serveis/sic20-sic30/)

### Automatitzar la versió (opcional)

En qualsevol versió del servei (2.0 i 3.0), és possible automatitzar el descriptor `sic.yml` per a evitar haver d'indicar manualment la
versió de l'aplicació que es desplega en cada moment. Aquesta versió serà la versió amb la qual s'etiquetarà el codi font
un cop superada l'etapa de construcció. Per tant, es recomana automatitzar-ho perquè agafi la versió del projecte _Maven_
com es mostra a continuació:

Cal crear el fitxer `src/main/resources/sic.yml` amb el següent contingut:

	version: ${project.version}
	
Cal afegir el plugin `maven-resources-plugin` al fitxer `pom.xml` de l'aplicació amb la següent configuració:

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

D'aquesta manera, quan es construeixi l'aplicació automàticament s'establirà la versió al fitxer `/sic/sic.yml`
assegurant la coherència i es minimitzarà el risc d'error per tag existent.
**A partir de la versió 3.2.3 de Canigó, aquesta configuració ja es troba incorporada a la plantilla** que genera el plugin d'Eclipse.