+++
date        = "2017-05-31"
title       = "Canigó. Versions LTS"
description = "Canigó. Versions LTS"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
+++

Des de Canigó s'ha decidit introduïr el concepte de versions LTS, així com a dotar d'un significat molt concret als dígits destinats al versionatge del framework.

Les versions LTS (Long-Term Support) són un tipus especial de versions que estan designades per a ser suportades per un periode més llarg del normal.  D'aquesta manera, amb aquest tipus de versionatge, es preveu donar suport a una versió LTS per un període de temps (encara per determinar) mentre es treballa en futurs evolutius.

Per exemple la versió de Canigó 3.2.0 publicada el passat mes de Març 2017 es considerada com la primera (i actual) versió LTS del framework.

En el període de temps entre dues versions LTS apareixeran versions de Canigó que solucionin bugs, eliminen vulnerabilitats o afegeixen noves funcionalitats.

Segons el tipus de versió, el seu versionatge tindrà un significat:

	4rt dígit: publicació de correccions d'incidències o noves funcionalitats que la seva publicació no pot esperar a l'agrupació de correccions o noves funcionalitats (modificació 3r dígit) [Ex. 3.2.0.1]
	3r dígit imparell: correcció d'incidències i vulnerabilitats [Ex. 3.2.1]
	3r dígit parell: correcció d'incidències i vulnerabilitats + Funcionalitats connectors [Ex 3.2.2]
	
Cada cert temps s'actualitzarà la versió LTS amb tots els canvis realitzats des de l'última publicació:

	Ex: 3.2.3 = LTS (engloba les versions 3.2.1/3.2.2)
	
Mentrestant des de el CS Canigó treballarà en la futura versió LTS amb noves funcionalitats, update de llibreries del framework i aquest procés es veurà reflectit al versionatge:

	3.3 = versió de proves interna no apta per producció
	3.4 = LTS + funcionalitats noves de CORE
