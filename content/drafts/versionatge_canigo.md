+++
date        = "2017-05-31"
title       = "Canigó. Versions LTS"
description = "Canigó. Versions LTS"
sections    = ["Notícies"]
categories  = ["canigo"]
+++

Des de Canigó s'ha decidit introduïr el concepte de versions LTS (Long-Term Support), així com a dotar d'un significat molt concret als dígits destinats al versionatge del framework.

Les [versions LTS](http://canigo.ctti.gencat.cat/blog/2017/06/versions_lts/) són un tipus especial de versions que estan designades per a ser suportades per un periode més llarg del normal, l'objectiu de les quals és ser el més estable possible. En el període de temps entre dues versions LTS apareixeran versions de Canigó que solucionin bugs, eliminin vulnerabilitats o afegeixen noves funcionalitats.

La versió Canigó 3.2.0 publicada el passat mes de Març 2017 és considerada com la primera (i actual) versió LTS del framework.

Segons el tipus de release, el seu número de versió tindrà un significat:

	4rt dígit: publicació de correccions d'incidències o noves funcionalitats que la seva publicació no pot esperar a l'agrupació de correccions o noves funcionalitats (modificació 3r dígit) [Ex. 3.2.0.1]
	3r dígit imparell: correcció d'incidències i vulnerabilitats [Ex. 3.2.1]
	3r dígit parell: correcció d'incidències i vulnerabilitats + Funcionalitats connectors [Ex 3.2.2]
	
Cada cert temps (encara per determinar) es publicarà una nova versió LTS amb tots els canvis realitzats des de l'última versió també LTS:

	Ex: 3.2.3 = LTS (engloba les modificacions introduïdes a les versions 3.2.1 i 3.2.2 respecte la 3.2.0)
	
Respecte al segon dígit, les versions imparelles es consideren internes destinades a proves, i per tant, no seran aptes per a ser desplegades en entorns productius. Les vesions parelles incorporaran modificacions rellevants que poden suposar que sigui necessàri realitzar adaptacions a l'aplicació.

	Ex: 3.3 = versió de proves interna no apta per producció
	Ex: 3.4 = LTS + funcionalitats noves de CORE

PENDENT: OBJECTIUS QUE ES PERSEGUEIXEN AMB AQUESTA POLÍTICA DE VERSIONATGE

Aquesta és la nova política que es comença a aplicar a Canigó respecte al versionatge per tal de millorar la mantenibilitat del framework i facilitar als proveïdors d'aplicacions l'evolució de les seves aplicacions.
