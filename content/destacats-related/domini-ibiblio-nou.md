+++
date        = "2015-12-18"
title       = "Canvi de domini del repositori ibiblio a Maven"
description = ""
sections    = "Canigó"
+++

Recentment el repositori Maven d'*ibiblio* ha canviat de domini. Per tal que les aplicacions Canigó que accedeixen a aquest repositori puguin continuar resolent les dependències en aquest, caldrà actualitar-ne la referència.

La manera més fàcil de fer-ho sense modificar codi de l'aplicació és mitjançant el fitxer de configuració "settings.xml" de la instal·lació de Maven. S'ha d'afegir un mirror al nou domini:

```
<mirrors>
   	<mirror>
		<id>repoibiblio</id>
		<name>Repositori ibiblio</name>
		<url>http://maven.ibiblio.org/maven2/</url>
		<mirrorOf>ibiblio</mirrorOf>
	</mirror>
</mirrors>

```