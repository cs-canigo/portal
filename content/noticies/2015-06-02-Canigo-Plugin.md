+++
date        = "2015-06-02"
title       = "Canigó. Actualització del plugin de Canigó per Eclipse"
description = "Recentment s'ha publicat una nova versió del Plugin de Canigó per Eclipse. Aquesta versió és compatible amb la versió d'Eclipse Luna (4.4) per a dos de les seves 2 distribucions: Eclipse IDE for Java Developers i Eclipse IDE for Java EE Developers. A banda d'aquesta actualització del plugin també s'ha certificat el seu funcionament en S.O. Linux."
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "canigó"]
key 		= "JUNY2015"
+++

Recentment s'ha publicat una nova versió del Plugin de Canigó per Eclipse. Aquesta versió és compatible amb la versió d'Eclipse Luna (4.4) per a dos de les seves distribucions: Eclipse IDE for Java Developers i Eclipse IDE for Java EE Developers. A banda d'aquesta actualització del plugin també s'ha certificat el seu funcionament en S.O. Linux.

A la següent taula s'aporta el detall de les diferents versions existents del plugin:

*Nota: en la taula es mostra la última "fix" version de cada "minor" version*

|Versió Plugin|Versió Canigó|Versió JSF|Spring MVC|Versió Eclipse|Compatibilitat S.O.|
|-----|---|---|---|--------------|-------|
|**1.0.1**|3.0.1|1.2|N/A|Helios (3.6.1)|Windows|
|**1.1.0**|3.0.2|2.0|N/A|Helios (3.6.1)|Windows|
|**1.2.1**|3.1.x|2.2|4.1.0.RELEASE|Helios (3.6.1)|Windows|
|**1.3.1**|3.1.x|2.2|4.1.0.RELEASE|Luna (4.4)*|Windows + Linux|

*Per a fer servir la versió 1.3.1 del Plugin amb la distribució JEE d'Eclipse Luna cal aplicar un patch que consisteix en substituïr una llibreria de la instal·lació base:

+ La llibreria que cal sobreescriure es troba a: \<eclipse_home\>/plugins/org.eclipse.m2e.maven.runtime_1.5.1.20150109-1819/jars/maven-embedder-3.2.1.jar
+ La llibrería amb la que s'ha de sobreescriure es pot descarregar des d'[aquest enllaç](http://canigo.ctti.gencat.cat/devenv/patch_plugin_canigo/maven-embedder-3.2.1.jar)

Un cop finalitzat aquest procediment ja es pot crear un projecte Canigó des de l'Eclipse: New -> Other -> Asistent projectes Canigó -> Crear un projecte Canigó. Trobareu més informació relativa al Plugin de Canigó a la [documentació](/canigo-download-related/plugin-canigo).