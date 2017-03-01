+++
date        = "2015-07-31"
title       = "Canigó. Certificació plugin Canigó a Eclipse Mars"
description = "Donada la recent publicació d'Eclipse Mars (4.5) des del CS Canigó s'ha certificat el funcionament del plugin per la creació de projectes Canigó 3.1 en aquesta versió d'Eclipse."
sections    = ["Notícies", "home"]
key			= "AGOST2015"
categories  = ["desenvolupament", "canigó"]
+++

Donada la recent publicació d'[Eclipse Mars (4.5)](https://projects.eclipse.org/releases/mars) des del CS Canigó s'ha certificat el funcionament del plugin per la creació de projectes Canigó 3.1 en aquesta versió d'Eclipse.

Aquesta és la taula actualitzada amb les diferents versions existents del plugin:

*Nota: en la taula es mostra l'última "fix" version de cada "minor" version*

|Versió Plugin|Versió Canigó|Versió JSF|Spring MVC|Versió Eclipse|Compatibilitat S.O.|
|-----|---|---|---|--------------|-------|
|**1.0.1**|3.0.1|1.2|N/A|Helios (3.6.1)|Windows|
|**1.1.0**|3.0.2|2.0|N/A|Helios (3.6.1)|Windows|
|**1.2.1**|3.1.x|2.2|4.1.0.RELEASE|Helios (3.6.1)|Windows|
|**1.3.1**|3.1.x|2.2|4.1.0.RELEASE|Luna (4.4)*|Windows + Linux|
|**1.4.0**|3.1.x|2.2|4.1.0.RELEASE|Mars (4.5)*|Windows + Linux|

*Per a fer servir les versions 1.3.1 i 1.4.0 del Plugin amb la distribució JEE d'Eclipse cal aplicar un patch que consisteix en substituir una llibreria de la instal·lació base:

_Eclipse Luna_

+ La llibreria que cal sobreescriure es troba a: \<eclipse_home\>/plugins/org.eclipse.m2e.maven.runtime_1.5.1.20150109-1819/jars/maven-embedder-3.2.1.jar
+ La llibrería amb la que s'ha de sobreescriure es pot descarregar des d'[aquest enllaç](http://canigo.ctti.gencat.cat/devenv/patch_plugin_canigo/maven-embedder-3.2.1.jar)

_Eclipse Mars_

+ La llibreria que cal sobreescriure es troba a: \<eclipse_home\>/plugins/org.eclipse.m2e.maven.runtime_1.6.0.20150526-2031/jars/maven-embedder-3.3.3.jar
+ La llibrería amb la que s'ha de sobreescriure es pot descarregar des d'[aquest enllaç](http://canigo.ctti.gencat.cat/devenv/patch_plugin_canigo/maven-embedder-3.3.3.jar)

Un cop finalitzat aquest procediment ja es pot crear un projecte Canigó des de l'Eclipse: New -> Other -> Assistent projectes Canigó -> Crear un projecte Canigó. Trobareu més informació relativa al Plugin de Canigó a la [documentació](/canigo-download-related/plugin-canigo).
