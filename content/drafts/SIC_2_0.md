+++
date        = "2017-06-7"
title       = "SIC. Posada en marxa SIC 2.0"
description = "SIC. Posada en marxa SIC 2.0"
sections    = ["Notícies"]
categories  = ["sic"]
+++

## SIC 2.0

El passat 31/05 es va realitzar la presentació oficial del SIC 2.0. Com ja s'ha comentat en altres comunicats, aquesta nova versió del SIC incorpora:

* Un autoservei d'usuaris, mitjançant el qual, els usuaris estan precarregats (només es requereix fer un login previ a GitLab) i s'ha establert un sistema d'assignació de privilegis que funciona de la següent manera:
	* Per a Release Managers i administradors de CPD/Lloc de Treball, els privilegis s'assignen de forma automàtica.
	* Per a la resta d'usuaris de Lot, els Release Managers gestionen els seus privilegis.
* Un autoservei de repositoris, mitjançant el qual, els Release Managers poden crear-los i concedir permisos d'accés a aquests a d'altres usuaris.
* Millora tecnològica:
	* Jobs de tipus Pipeline, que permeten extensibilitat i futures millores al SIC.
	* GIT com a nou SCM, que és de naturalesa distribuïda i que permet una millor gestió de branques, entre d'altres característiques.
* Solució als problemes d'espai deguts a l'emmagatzemament de binaris, mitjançant el nou sistema de Gestió de Binaris.

Aquestes noves funcionalitats s'han adquirit gràcies a la implantació dels següents sistemes:

* Integració amb GICAR
* GitLab
* Versió 2+ de Jenkins
* Implantació del mòdul de Gestió de Binaris (previst per al proper 26/06)

Podeu descarregar-vos el PPT de la 

## Període de convivència SIC 1.0 i SIC 2.0



## Informació disponible

Aquests canvis 
_______________________

____________________________
__________________

## _
## _
## _
##
##








Des de Canigó s'ha decidit introduïr el concepte de versions LTS (Long-Term Support), així com a dotar d'un significat molt concret als dígits destinats al versionatge del framework.

Les versions LTS són un tipus especial de versions que estan designades per a ser suportades per un periode més llarg del normal. En el període de temps entre dues versions LTS apareixeran versions de Canigó que solucionin bugs, eliminen vulnerabilitats o afegeixen noves funcionalitats.

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
