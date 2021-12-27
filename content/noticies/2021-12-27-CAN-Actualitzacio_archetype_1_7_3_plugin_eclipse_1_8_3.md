+++
date = "2021-12-27"
title = "Canigó. Actualització archetype 1.7.3 i plugin Eclipse 1.8.3"
description = "S'ha publicat una nova versió de l'archetype i del plugin de l'eclipse de Canigó per a generar projectes amb Canigó 3.6.3"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "GENER2022"
+++

## Introducció

**L'arquetipus és una eina Maven que facilita la creació de projectes seguint una plantilla**. Utilitzant l'arquetipus i
executant un _goal_ de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves
funcionalitats.

**El _plugin_ és un connector desenvolupat específicament per a l'IDE Eclipse que permet afegir-hi menús contextuals
per a la creació de projectes Canigó fent ús de l'arquetipus de Maven**, a més d'afegir mòduls a un projecte creat i
amb una preconfiguració donada. Així, usant l'Eclipse, podem crear un projecte i afegir-l'hi els mòduls necessaris
obtenint un projecte preconfigurat per al marc de treball Canigó i estalviant temps als desenvolupadors.

S'ha actualitzat l'arquetipus i el plugin de Canigó per a **generar projectes amb Canigó 3.6.3** per a resoldre la vulnerabilitat de log4j.
Podeu consultar l'abast complet de la nova versió a les [Release Notes 3.6](/canigo-download-related/release-notes-canigo-36).

## Novetats _archetype_

La versió 1.7.3 de l'arquetipus de Canigó incorpora les següents novetats:

- Creació de projectes amb Canigó 3.6.3 per a resoldre la vulnerabilitat de log4j utilitzant la versió 2.17.0 de la llibreria log4j

## Novetats _plugin_ Eclipse

La nova versió 1.8.3 del _plugin_ fa servir la versió 1.7.3 de l'arquetipus per a generar projectes amb Canigó 3.6.3.
Per a instal·lar o actualitzar aquesta versió del _plugin_ serà necessari seguir els passos descrits a la secció
"Instal·lació" de la documentació del [_plugin_ Canigó per a Eclipse](/canigo-download-related/plugin-canigo/).

Cal destacar que per a utilitzar el plugin a partir de la versió 1.8.0, és necessari iniciar l'eclipse amb la màquina virtual de Java versió 11.

## Documentació addicional

Podeu consultar la documentació dels [Binaris de Canigó 3.6](/canigo/download/canigo-36/).

En el següent enllaç, podeu consultar la notícia de la publicació de la [versió 3.6.3 de Canigó]
(/noticies/2021-12-27-CAN-actualitzacio-canigo-3_4_9_3_6_3/).