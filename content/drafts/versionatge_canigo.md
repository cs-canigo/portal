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

	4rt dígit: publicació de correccions d'incidències o noves funcionalitats que la seva publicació no pot esperar a l'agrupació de correccions o noves funcionalitats (modificació 3r dígit) - No planificades [Ex. 3.2.0.1]
	3r dígit imparell: correcció d'incidències i vulnerabilitats, o millores - Cada 3 mesos [Ex. 3.2.1]
	3r dígit parell: correcció d'incidències i vulnerabilitats + Noves funcionalitats - Cada 6 mesos [Ex 3.2.2] (1)
	
	(1) en cas que no hi hagi noves funcionalitats a publicar, s'alliberaria una versió amb digit imparell i es pospossaria 3 mesos l'alliberament de la versió amb dígit parell

Cada 2 anys, excepte aquest primer any per poder tenir una convivència d'un any entre versions LTS, es publicarà una nova versió LTS amb tots els canvis (correcció d'incidències i vulnerabilitats, millores, noves funcionalitats) realitzats des de l'última versió també LTS:

	Ex: 3.2.4 = LTS (engloba les modificacions introduïdes a les versions 3.2.1 i 3.2.2 respecte la 3.2.0)
	
Respecte al segon dígit, les versions imparelles es consideren internes destinades a proves, i per tant, no seran aptes per a ser desplegades en entorns productius. Les versions parelles incorporaran modificacions rellevants que poden suposar que sigui necessàri realitzar adaptacions a l'aplicació.

	Ex: 3.3 = versió de proves interna no apta per producció
	Ex: 3.4 = LTS + funcionalitats noves al core

Aquest és el roadmap previst per Canigó:

TODO

L'objectiu d'aquesta política de versionatge és evitar l'**obsolescència** tecnològica de les aplicacions que utilitzin Canigó, forçant la seva actualització com a màxim cada 2 anys a la versió LTS actual. Per qualsevol dubte al respecte us podeu possar en contacte amb l'Oficina Tècnica de Canigó fent una petició al [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o per correu a la [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).


