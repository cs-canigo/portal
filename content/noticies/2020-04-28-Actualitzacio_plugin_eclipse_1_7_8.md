+++
date        = "2020-05-21"
title       = "Canigó. Actualització plugin Eclipse 1.7.8"
description = "S'ha publicat una nova versió del plugin de l’Eclipse de Canigó per a modificar projectes afegint el mòdul de Mongodb 2.3.0"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Seguint l'objectiu del Centre de Suport Canigó de proporcionar als desenvolupadors el màxim d'eines útils per a la creació de
projectes dins el marc de treball, s'ha actualitzat el _plugin_ de l'Eclipse per a modificar projectes afegint el mòdul de
Mongodb 2.3.0. Podeu consultar l'abast complet a les [Release Notes, apartat Canigó 3.4.4]
(/canigo-download-related/release-notes-canigo-34).

Aquest plugin de l’Eclipse és un connector desenvolupat a mida que afegeix menús contextuals a l'IDE per a la
creació de projectes Canigó utilitzant l’arquetipus Maven, encarregant-se de la incorporació de mòduls a un projecte amb
una configuració ja donada. Dins dels canvis introduïts en aquesta nova versió, hi consta l'actualització
del mòdul de **Mongodb versió 2.3.0** per a utilitzar el **driver de Mongo 2.13.3** compatible amb **Mongodb 4.2**.

## Novetats

En seleccionar l'opció mòdul de persistència anomenada **Mongodb module** s'actualitzarà automàticament el projecte
per a que utilitzi la nova versió del mòdul:

![](/images/news/Plugin_1.7.8_add_mongodb_module.png)

Per a instal·lar o actualitzar la versió del _plugin_ serà necessari seguir els passos descrits a la secció
[Instal·lació](/canigo-download-related/plugin-canigo/#instal-lació) del Plugin Canigó per a Eclipse.

## Documentació del Plugin

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Mongodb](/canigo-documentacio-versions-3x-core/modul-mongodb/)
