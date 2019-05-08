+++
date        = "2019-05-06"
lastmod     = "2019-05-06"
title       = "SIC. Canvi de lots segons la nova contractació 2019 del Centre de Telecomunicacions i Tecnologies de la Informació de la Generalitat de Catalunya"
description = ""
sections    = ""
weight 	    = 5
+++


....

## Introducció

**El dia 01/06/2019 es farà efectiva la nova configuració de lots de les aplicacions** en base a la nova contractació de proveïdors del Centre de Telecomunicacions i Tecnologies de la Informació de la Generalitat de Catalunya. Per al procés de transició, s'ha constituït una Oficina Tècnica de Transició que s'encarregarà de la coordinació del canvi i s'ha elaborat un document que recopila la informació necessària per a fer el traspàs d'accés al codi font de les aplicacions entre els proveïdors de manteniment d’aplicacions que surten i els que entren, definint el procediment durant el procés de transició i les responsabilitats de cada una de les parts intervinents.

## Objectius

L'objectiu és informar als diferents lots entrants i sortints del procediment de traspàs de les aplicacions, així com les actuacions que es duran a terme i la seva afectació.

## Procediment

A continuació, es defineix el procediment a seguir per a la gestió dels serveis del SIC de custodia de codi font, integració continua i servei de binaris.

Veure: [Serveis del SIC](/sic/serveis/).

### Servei de custodia de codi font
Per aplicacions que tinguin el codi font ubicat al repositori del SIC, serà necessari que el lot entrant disposi d'accés al Git Corporatiu. Per a poder fer un primer intent d'accés al Git, caldrà disposar prèviament del corresponent usuari GICAR i que aquest es trobi bolcat a l'LDAP del SIC. En cas d'incidència, caldrà obrir una incidència al portal d'atenció a l'usuari a través del [Portal d'autoservei](https://pautic.gencat.cat).

**Els responsables de proporcionar l'accés als repositoris seran els proveïdors sortints** i ho faran ells mateixos mitjançant l'[Autoservei d'usuaris](sic-serveis/autoservei-usuaris/) atorgant accessos en mode lectura (rol REPORTER) al lot entrant. Quan es decideixi de forma consensuada entre els dos proveïdors, el proveïdor sortint li proporcionarà accés d'escriptura (rol MASTER/MANTAINER) al proveïdor entrant per a que passin a formar part del grup de Release Manager i, per tant, passin a administrar els serveis del SIC.

Finalment, en el moment que es decideixi de forma consensuada, el proveïdor entrant **revocarà l'accés al proveïdor sortint a tots els seus projectes**, tot i que podran optar temporalment per permetre'ls accés en mode lectura durant els 6 mesos de garantia abans de revocar els permisos de forma definitiva.

### Servei d'integració continua i servei de binaris

Aquests serveis seran accessibles actualment pels responsables de lot sortint i els Release Manager; ja siguin, aquests últims, corresponents al lot entrant o sortint. En el moment en que es revoqui l'accés als Release Managers del lot sortint a tots els seus projectes, aquests deixaran de disposar d'accés als serveis del SIC.

A partir del **dia 01/06/2019, automàticament deixaran automàticament de disposar d'accés els responsables del lot sortint**.
