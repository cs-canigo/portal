+++
date        = "2024-12-31"
title       = "API Manager Corporatiu"
description = "Descripció del servei"
sections    = "APIM"
weight      = 1
categories  = ["cloud","apim"]
+++

El servei d'API Manager Corporatiu de la Generalitat de Catalunya permet als departaments/proveïdors d'aplicacions **gestionar el cicle de vida de les APIs** de manera senzilla i segura. El servei ofereix la possibilitat de publicar **API's públiques** i **API's privades** , aquest últim tant en context Intranet com Extranet de la Generalitat. 

<p>
  <img src="/related/apim/APIM.png" width="600" height="400"/>
</p>

## Descripció

El servei d'API Manager Corporatiu ofereix les següents funcionalitats:

- Disposa d'un catàleg amb funcionalitats per a versionar i descobrir APIs (inventari de les APIs)
- Disposa de funcionalitats d'autoservei en la subscripció a APIs, en base a uns plans definits
- Entorn de treball pels desenvolupadors d’APIs. Aporta un portal on publicar documentació associada a la utilització de les APIs
- Proporciona accés a generar reportings sobre l'ús de les APIs (analítiques d'ús i de control del consum)
- Permet aplicar polítiques d'ús i de seguretat.
- Integració amb autenticació GICAR (KeyCloak Corporatiu).

El servei s'ofereix en **modalitat SaaS de pagament per ús**.

El servei ofereix els següents tipus d’aprovisionament d’infraestructura dels **API Gateways**:

|Modalitat|Descripció|
|-------|-------|
|Gateways CTTI Compartits|Infraestructura compartida on-premise, desplegat a CPD2|

Hi ha la possibilitat d'ampliar la infraestructura compartida amb Gateways en altres CPDs en cas de necessitat. Requeriria avaluació dels requisits.

## Plataforma

La plataforma del servei l'API Manager corporatiu es basa en la solució al núvol API Connect. Consta de tres elements bàsics:

|Element|Descripció|
|-------|-------|
|Portal per a desenvolupadors|Portal web d’accés als possibles consumidors de les APIs on poden consultar les APIs disponibles, informació de com utilitzar-les, i demanar accés al seu ús amb un previ registre per a obtenir un token d’accés|
|Portal de gestió d’APIs| Portal web d’accés als gestors de l’API on poden consultar les APIs disponibles, administrar els accessos, plans i analitzar les dades d’accés|
|API Gateway|Element tecnològic (escalable segons necessitat) on passen les peticions en el moment d’execució. Rep les definicions de les APIs i dels permisos dels diferents portals d’administració. És on arriben les peticions dels clients registrats i que redirigeix la petició als backends|

Podeu trobar més informació del producte a https://cloud.ibm.com/docs/services/apiconnect?topic=apiconnect-getting-started.

## Documentació

A continuació, s'adjunta el document del Welcome Pack d'API Manager Corporatiu, el qual comenta per sobre diversos dels punts i les característiques més importants del servei, i que serveix com a primera guia per començar a entendre alguns conceptes bàsics de la plataforma.
- [Welcome Pack](/related/apim/APIM-Welcome-Pack-v3.pdf): introducció al servei d'API Manager Corporatiu. 

Alhora, s'inclou el document d'Estratègies de l'ús de l'API Manager, que inclou informació complementària o addicional al Welcome Pack, i on es pot llegir sobre la importància i els beneficis d'utilitzar aquest servei.
- [Estratègies de l’ús de l’API Manager](/related/apim/Estrategies_Us_API_v2.pdf): estratègies de l'ús del servei d'API Manager Corporatiu.

La resta de la documentació detallada on es detallen les característiques i la metodologia de treball del servei d'API Manager Corporatiu, juntament amb tots els recursos que pugui necessitar un proveïdor o consumidor, es troba a la següent url: https://canigo.ctti.gencat.cat/plataformes/apim/documentacio/
