+++
date        = "2019-12-10"
title       = "Canigó. Actualització archetype 1.6.4 i plugin Eclipse 1.7.5"
description = "S'ha publicat una nova versió del archetype i del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.1"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2019"
+++

## Introducció

Dins dels lliurables de Canigó hi consten l'arquetipus (_archetype_) i el _plugin_ de l'Eclipse. Seguint l'objectiu de CS Canigó de proporcionar facilitadors per a la creació de projectes Canigó als desenvolupadors d'aplicacions, s'ha actualitzat ambdós lliurables per generar projectes amb Canigó **versió 3.4.1**. Podeu consultar l'abast complet de la nova versió del marc de treball a les [Release Notes apartat "Canigó 3.4.1"](/canigo-download-related/release-notes-canigo-34).

L'**arquetipus** és una eina Maven que facilita la creació de projectes seguint una plantilla. Utilitzant l'arquetipus i executant un _goal_ de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves funcionalitats.

El **_plugin_** és un connector desenvolupat específicament per a l'IDE Eclipse que permet afegir-hi menús contextuals per a la creació de projectes Canigó utilitzant l'arquetipus de Maven, a més a més d'afegir mòduls a un projecte creat i amb una preconfiguració ja donada. Així, utilitzant l'Eclipse, podem crear un projecte i afegir-l'hi els mòduls necessaris obtenint un projecte preconfigurat per al marc de treball Canigó i estalviant temps als desenvolupadors.

## Novetats _archetype_

La versió 1.6.4 de l'arquetipus de Canigó incorpora les següents novetats respecte a la versió 1.6.3:

- **Dependency Check**: Actualització llibreries depenent dels mòduls passant els controls de Dependency Check.
- **Actualitzar connector antivirus Canigó de Symantec**: Actualització del connector de l’Antivirus de Canigó a l'última versió disponible del client Symantec.
- **Evolució del mòdul d’integració SSC**: Actualització del connector del Servei de Signatura Centralitzada de Canigó per utilitzar la versió 1.3.3 de la solució SSC de l'AOC.

## Novetats _plugin_ Eclipse

La nova versió 1.7.5 del _plugin_ utilitza la versió 1.6.4 de l'arquetipus de Canigó per generar projectes amb Canigó 3.4.1. Per instal·lar o actualitzar aquesta versió del _plugin_ és necessari seguir els passos descrits a la secció "Instal·lació" de la [documentació del _plugin_ Canigó per a Eclipse](/canigo-download-related/plugin-canigo/).

## Documentació addicional

Està disponible la documentació dels lliurables de Canigó 3.4 a: [Binaris de Canigó](/canigo/download/)

En el següent enllaç, pot consultar els canvis que s'incorporen a partir de la versió 3.4.0 i que també apliquen a la 3.4.1: [Canigó. Publicació versió 3.4.0](/noticies/2019-03-29-actualitzacio-canigo-3_4_0).
