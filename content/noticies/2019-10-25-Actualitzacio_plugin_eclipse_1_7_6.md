+++
date        = "2019-12-24"
title       = "Canigó. Actualització plugin eclipse 1.7.6"
description = "S'ha publicat una nova versió del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.2"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Seguint l'objectiu del Centre de Suport Canigó de proporcionar als desenvolupadors d'aplicacions el màxim d'eines útils per a la creació de projectes amb aquest marc de treball, s'ha actualitzat el _plugin_ de l'Eclipse per generar projectes amb **Canigó 3.4.2**. Podeu consultar l'abast complet a les [Release Notes, apartat Canigó 3.4.2](/noticies/release-notes-canigo-34). Aquest plugin de l’Eclipse és un connector desenvolupat a mida que afegeix menús contextuals a l'IDE per a la creació de projectes Canigó utilitzant l’arquetipus Maven i per afegir mòduls, a un projecte creat, amb una preconfiguració ja donada. Dins dels canvis introduits en aquesta nova versió hi consta l'evolució del mòdul de Seguretat de Canigó per permetre l'autenticació i l'autorització a Gicar [Autorització GICAR a Canigó](/noticies/2019-10-22-Actualitzacio_modul_Seguretat), per a facilitar la utilització d'aquesta nova funcionalitat del mòdul de Seguretat.

## Novetats

La nova versió 1.7.6 del _plugin_ incorpora una nova pregunta al mòdul de seguretat, consistent en si s'ha seleccionat l'opció "GICAR" com a proveïdor de seguretat:

![](/images/news/Security_module_configuration_1_7_6.png)

És necessari seleccionar una opció, BBDD o GICAR, a la pregunta "Tipus d'autorització Gicar?"

![](/images/news/Gicar_athorization_type.png)

Segons l'opció seleccionada, el _plugin_ modificarà els fitxers del projecte amb:

* BBDD: L'autenticació per Gicar i autorització per BBDD com fins ara. 
* GICAR: L'autenticació i l'autorització per Gicar incorporats a la versió 3.4.2 de Canigó.

Per instal·lar o actualitzar la versió del _plugin_ és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse # Instal·lació](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació del Plugin d'Eclipse

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
