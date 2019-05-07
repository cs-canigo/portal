+++
date        = "2019-05-06
lastmod     = "2019-05-06
title       = "SIC. Canvi de lots segons la nova contractació 2019 del Centre de Telecomunicacions i Tecnologies de la Informació de la Generalitat de Catalunya"
description = ""
sections    = ""
weight 	    = 5
+++


....

## Introducció

**El dia 01/06/2019 es farà efectiu la nova configuració de lots de les aplicacions** segons la nova contractació del 2019 del Centre de Telecomunicacions i Tecnologies de la Informació de la Generalitat de Catalunya. S'ha constituït una Oficina Tècnica per a la Transició que s'encarregarà de la coordinació del canvi i s'ha elaborat un document que recopila la informació necessària per a fer, provisionalment, el traspàs d'accés al codi font de les aplicacions entre els proveïdors de manteniment d’aplicacions que surten i els que entren, definint el procediment durant el procés de transició i les responsabilitats de cada una de les parts que intervenen.

## Objectius

L'objectiu és informar als diferents lots entrants i sortints que, un cop es faci efectiva la nova configuració de lots de l'inventari d'aplicacions, els lots sortints deixaran de disposar d'accés a les aplicacions que traspassa i els lots entrants hauran d'encarregar-se de definir els usuaris que exerciran el rol de Release Manager de les aplicacions que recepciona. 

## Procediment

A continuació, es defineix el procediment a seguir a partir del dia 01/06/2019 per a la gestió dels serveis del SIC de custodia de codi font, integració continua i servei de binaris.
Veure: [Serveis](/sic/serveis/).

### Nous usuaris Release Manager

Les aplicacions que canvien de lot, per defecte, no disposaran d'usuaris Release Manager. Els responsables de lot doncs seran els encarregats de definir els usuaris que exerciran el rol de Release Manager mitjançant l'[Autoservei d'usuaris] (/sic-serveis/autoservei-usuaris/) i, per tant, passaran a disposar d'accés als serveis del SIC i podran otorgar accés a la resta de companys.

### Accés provisional al lot sortints

En cas de necessitar otorgar accés provisional al lot sortint durant els 6 mesos de periode de garantia, els responsables de lot i Release Managers podran otorgar accés en mode lectura al repositori de les aplicacions mitjançant l'[Autoservei d'usuaris] (/sic-serveis/autoservei-usuaris/). Per a que l'accés sigui en mode lectura, caldrà assignar el rol REPORTER als usuaris.