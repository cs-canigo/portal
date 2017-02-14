+++
date        = "2017-02-14"
title       = "Plugin Canigó per a Eclipse"
description = "Plugin d'eclipse per a generar una aplicació Canigó."
sections    = "Canigó."
weight      = 1
+++

## Introducció

### Propòsit

El plugin de Canigó per a Eclipse permet crear de forma automàtica l'esquelet d'una aplicació Canigó. L'aplicació que es crea està orientada a servir com a punt de partida per a la creació d'una aplicació més complexe, però des del moment de la seva creació ja es desplegable i funcional.

#### Eclipse Mars

La última versió del plugin està certificada amb la versió d'Eclipse Mars, que podeu trobar al següent enllaç: https://eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/marsr

### Instal·lació

A la pestanya Help de l'Eclipse seleccionar "Install New Software..."

![](/related/canigo/documentacio/plugin-canigo/img1.jpg)

Prèmer sobre el botó Add i afegir el respository de Canigó:
http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/

![](/related/canigo/documentacio/plugin-canigo/img2.jpg)

Seleccionar *Plug-ins Canigo (JSF 2.2 i Rest) Eclipse Mars (Comp.Linux).

![](/related/canigo/documentacio/plugin-canigo/img3.jpg)

Una vegada instal·lat s'ha de tancar l'Eclipse i sobreescriure la llibreria:

<eclipse_home>/plugins/org.eclipse.m2e.maven.runtime_1.6.0.20150526-2031/jars/maven-embedder-3.3.3.jar

Amb la que s'ha de descarregar a:
http://canigo.ctti.gencat.cat/devenv/patch_plugin_canigo/maven-embedder-3.3.3.jar

## Crear Aplicació Canigó

A la vista Package Explorer de l'Eclipse fer botó dret: New -> Other

![](/related/canigo/documentacio/plugin-canigo/img4.jpg)

Seleccionar Assistent Projectes Canigó -> Crear un Projecte Canigó

![](/related/canigo/documentacio/plugin-canigo/img5.jpg)

El plugin pot generar dos tipus d'aplicacions:

* Aplicació web JSF: Crea una aplicació demo amb el front-end utilitzant Primefaces 5.0
* Aplicació REST: Crea una aplicació demo amb un CRUD de demo implementat amb HTML5/Javascript. Es dóna llibertat per triar la tecnologia per a realitzar el front-end (AngularJS, Bootstrap, EmberJS...) sempre que es compleixi el PIV de Gencat.
	
### Aplicació web JSF

Es genera un projecte a l'eclipse.

S'ha de prèmer el botó dret sobre el nou projecte i seleccionar Configure - Convert to maven project

![](/related/canigo/documentacio/plugin-canigo/img6.jpg)

Una vegada convertit a Maven Project els errors que tenia el projecte desapareixen al actualitzar-se les llibreries. S'ha de compilar el projecte i ja es pot desplegar:

![](/related/canigo/documentacio/plugin-canigo/img7.jpg)

### Aplicació REST

Es genera un projecte Maven a l'eclipse. S'ha de compilar i ja es pot desplegar:

![](/related/canigo/documentacio/plugin-canigo/img8.jpg)

## Afegir/Esborrar nous mòduls

Per afegir o treure mòduls de Canigó el plugin proporciona la possibilitat de fer-ho de forma automàtica.

S'ha de prèmer sobre el projecte, botó dret -> Canigó

![](/related/canigo/documentacio/plugin-canigo/img9.jpg)

