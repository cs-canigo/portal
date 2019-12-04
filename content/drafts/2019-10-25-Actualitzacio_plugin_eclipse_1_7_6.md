+++
date        = "2019-12-04"
title       = "Actualització plugin eclipse 1.7.6"
description = "S'ha publicat una nova versió del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.2"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "NOVEMBRE2019"
+++

## Introducció

Seguint l'objectiu de CS Canigó de proporcionar als desenvolupadors d'aplicacions les màximes eines útils per a la creació de projectes amb Canigó, s'ha actualitzat el _plugin_ de l'Eclipse de Canigó per generar projectes amb Canigó 3.4.2. Podeu consultar l'abast complet de la **versió 3.4.2 del framework Canigó** a les [Release Notes, apartat Canigó 3.4.2](/drafts/release-notes-canigo-34).

El _plugin_ de l’Eclipse és un connector desenvolupat per l’IDE Eclipse per afegir menús contextuals per a la creació de projectes Canigó utilitzant l’arquetipus i per afegir mòduls, a un projecte creat, amb una preconfiguració ja donada. Així utilitzant l’Eclipse podem crear un projecte i afegir-l’hi els mòduls necessaris, obtenint un projecte preconfigurat, estalviant temps als desenvolupadors.

Dins dels canvis de Canigó 3.4.2 hi costa l'evolució del mòdul de Seguretat de Canigó per permetre l'autenticació i l'autorització a Gicar, vegeu el tiquet [Autorització GICAR a Canigó](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-2383). Per a facilitar la utilització d'aquesta nova funcionalitat del mòdul de Seguretat, s'ha modificar el _plugin_ de Canigó per l'Eclipse.

## Novetats plugin eclipse

La nova versió 1.7.6 del _plugin_ incorpora una nova pregunta al mòdul de seguretat. Si s'ha seleccionat l'opció "GICAR" com a proveidor de seguretat:

![](/images/news/Security_module_configuration_1_7_6.png)

És necessari seleccionar una opció, BBDD o GICAR, a la pregunta "Tipus d'autorització Gicar?"

![](/images/news/Gicar_athorization_type.png)

Segons la opció seleccionada, el _plugin_ modificarà els fitxers del projecte amb:

* BBDD: L'autenticació per Gicar i autorització per BBDD com fins ara. 
* GICAR: L'autenticació i l'autorització per Gicar incorporats a la versió 3.4.2 de Canigó.

Per instal·lar o actualitzar la versió del _plugin_ és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse # Instal·lació](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació plugin eclipse

En els següents enllaços podeu consultar la documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
