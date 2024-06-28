+++
date        = "2022-05-26"
title       = "API Manager Corporatiu"
description = "Descripció del servei"
sections    = "ApiManager Cloud"
weight      = 1
categories  = ["cloud","apim"]
+++

El servei d'API Manager Corporatiu de la Generalitat de Catalunya permet als departaments/proveïdors d'aplicacions **gestionar el cicle de vida de les APIS** de manera senzilla i segura. El servei ofereix la possibilitat de publicar **API's públiques** i **API's privades** , aquest últim tant en context Intranet com Extranet de la Generalitat. 

![Pàgina principal](/related/apim/APIM.PNG)

## Descripció

El servei d'API Manager Corporatiu ofereix les següents funcionalitats:

- Disposa d'un catàleg amb funcionalitats per a versionar i descobrir APIs (inventari de les APIs)
- Disposa de funcionalitats d'autoservei en la subscripció a APIs, en base a uns plans definits
- Entorn de treball pels desenvolupadors d’APIs. Aporta un portal on publicar documentació associada a la utilització de les APIs
- Proporciona accés a generar reportings sobre l'ús de les APIs (analítiques d'ús i de control del consum)
- Permet aplicar polítiques d'ús i de seguretat.
- Integració amb autenticació GICAR (KeyCloak Corporatiu).

El servei s'ofereix en **modalitat SaaS de pagament per ús**.

La infraestructura dels **API Gateways** pot ser:

|Modalitat|Descripció|
|-------|-------|
|Gateways CTTI Compartits|Infraestructura compartida onpremise|
|Gateways dedicats|Infraestructura dedicada onpremise (exclusiva del departament que la sol·licita)|
|Contenidors|Desplegament de l'API Gateway en contenidor|

## Plataforma

La plataforma del servei l'API Manager corporatiu es basa en la solució al núvol API Connect. Consta de tres elements bàsics:

|Element|Descripció|
|-------|-------|
|Portal per a desenvolupadors|Portal web d’accés als possibles consumidors de les APIs on poden consultar les APIs disponibles, informació de com utilitzar-les, i demanar accés al seu ús amb un previ registre per a obtenir un token d’accés|
|Portal de gestió d’APIs| Portal web d’accés als gestors de l’API on poden consultar les APIs disponibles, administrar els accessos, plans i analitzar les dades d’accés|
|API Gateway|Element tecnològic (escalable segons necessitat) on passen les peticions en el moment d’execució. Rep les definicions de les APIs i dels permisos dels diferents portals d’administració. És on arriben les peticions dels clients registrats i que redirigeix la petició als backends|

Podeu trobar més informació del producte a https://cloud.ibm.com/docs/services/apiconnect?topic=apiconnect-getting-started.

## Documentació

Es posa a disposició documentació on es detallen les característiques i metodologia de treball del servei d'API Manager.

La podeu trobar a https://canigo.ctti.gencat.cat/apim/documentacio/

