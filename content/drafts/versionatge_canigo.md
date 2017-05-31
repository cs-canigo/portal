+++
date        = "2017-05-31"
title       = "Versionatge Canigó. Introducció de l'´ús de versions LTS"
description = "Versionatge Canigó. Introducció de l'´ús de versions LTS"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "JUNY2017"
+++

En la futura evolució de Canigó es preveu introduïr el concepte de versions LTS, així com a dotar de significat especials als dígits de versionatge.

Les versions LTS (Long-Time Support) són un tipus especial de versions que estan designades per a ser suportades per un periode més llarg del normal. 

D'aquesta forma, amb aquest tipus de versionatge, des de el CTTI es preveu donar suport a una versió LTS per un període de temps (encara per determinar) mentres es treballa en futurs evolutius.

Per exemple la versió de Canigó publicada al passat març (3.2.0) es conside com la primera (i actual) versió LTS del framework.

En el període de temps entre dues versions LTS apareixeran versions de Canigó que solucionin bugs, eliminen vulnerabilitats o afegeixen noves funcionalitats.

Segons el tipus de versió, el seu versionatge tindrà un significat:

	4rt dígit: Publicació de correccions d'incidències o noves funcionalitats que la seva publicació no pot esperar a l'agrupació de correccions o noves funcionalitats (modificació 3r dígit)
	3r dígit imparell: correcció d'incidències i vulnerabilitats = 3.2.1
	3r dígit parell: correcció d'incidències i vulnerabilitats + Funcionalitats connectors = 3.2.2
	
Cada cert temps (per determinar) s'actualitzarà la versió LTS amb tots els canvis realitzats des de l'última publicació:

	3.2.3 = LTS (engloba les versions 3.2.1/3.2.2)
	
Mentrestant des de el CS Canigó treballarà en la futura versió LTS amb noves funcionalitats, update de llibreries del framework i aquest procés es veurà reflectit al versionatge:

	3.3 = versió de proves interna no apta per producció
	3.4 = LTS + funcionalitats noves de CORE
	
