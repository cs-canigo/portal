+++
date        = "2019-11-27"
title       = "Actualització archetype 1.6.4 i plugin Eclipse 1.7.6"
description = "S'ha publicat una nova versió del archetype i del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.1"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
key         = "NOVEMBRE2019"
+++

## Introducció

Dins dels lliurables de Canigó hi consten l'arquetipus (_archetype_) i el _plugin_ de l'Eclipse. Seguint l'objectiu de CS Canigó de proporcionar als desenvolupadors d'aplicacions les màximes eines útils per a la creació de projectes amb Canigó, s'ha actualitzat ambdós lliurables per generar projectes amb Canigó **versió 3.4.1**. Podeu consultar l'abast complet de la nova versió del framework a les [Release Notes apartat "Canigó 3.4.1"](/canigo-download-related/release-notes-canigo-34).

L'**arquetipus** és una eina Maven per a la creació de projectes seguint una plantilla. Així executant un _goal_ de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves funcionalitats.

El **_plugin_** de l'Eclipse és un connector desenvolupat per l'IDE Eclipse per afegir menús contextuals per a la creació de projectes Canigó utilitzant l'arquetipus i per afegir mòduls, a un projecte creat, amb una preconfiguració ja donada. Així utilitzant l'Eclipse podem crear un projecte i afegir-l'hi els mòduls necessaris, obtenint un projecte preconfigurat, estalviant temps als desenvolupadors.

## Novetats _archetype_

S'ha publicat la versió 1.6.4 de l'arquetipus del Canigó per a generar projectes amb Canigó 3.4.1, aquesta versió incorpora les següents novetats respecte a la versió 3.4.0:

- **Dependency Check**: Actualització llibreries depenent dels mòduls passant el dependency check.
- **Actualitzar connector antivirus Canigó de Symantec**: Actualització del connector de l’Antivirus de Canigó que actualment està utilitzant la versió 7 a l'última versió disponible.
- **Evolució del mòdul d’integració SSC**: Actualització del connector de SSC de Canigó per utilitzar la versió 1.3.3 del servei de SSC de l'AOC.

La principal novetat de la versió 3.4.0 de Canigó respecte a la versió 3.2 és la utilització de fitxers _yml_ per a la configuració de propietats de l'aplicació i la incorporació dels canvis necessaris per Spring 5 i Spring Boot 2.

## Novetats _plugin_ Eclipse

La nova versió 1.7.5 del _plugin_ utilitza la versió 1.6.4 de l'arquetipus de Canigó per generar projectes amb Canigó 3.4.1.

Per instal·lar o actualitzar la versió del _plugin_ és necessari seguir els passos descrits a la secció "Instal·lació" del _plugin_ Canigó per a Eclipse.

## Documentació addicional

Està disponible la documentació dels lliurables de Canigó 3.4 a: [Binaris de Canigó](/canigo/download/)

La documentació del _plugin_ de l'Eclipse està disponible: [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)

Detall dels canvis de Canigó 3.4.0: [Canigó. Publicació versió 3.4.0](/noticies/2019-03-29-actualitzacio-canigo-3_4_0/)

La guia per a passar manualment projectes de Canigó 3.2 a Canigó 3.4 es troba en el següent enllaç: [Actualitzar aplicació de Canigó 3.2 a Canigó 3.4](/howtos/2019-03-Howto-Actualitzacio_Canigo3_2_Canigo3_4/)
