+++
date        = "2020-03-24"
title       = "Canigó. Actualització plugin eclipse 1.7.7"
description = "S'ha publicat una nova versió del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.3"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Seguint l'objectiu del Centre de Suport Canigó de proporcionar als desenvolupadors d'aplicacions el màxim d'eines útils per a la creació de projectes, s'ha actualitzat el plugin de l'Eclipse per generar projectes amb **Canigó 3.4.3**. Podeu consultar l'abast complet a les [Release Notes, apartat Canigó 3.4.3](/canigo-download-related/release-notes-canigo-34). Aquest plugin de l’Eclipse és un connector desenvolupat a mida que afegeix menús contextuals a l'IDE per a la creació de projectes Canigó utilitzant l’arquetipus Maven i per afegir mòduls, a un projecte creat. Dins dels canvis introduits a aquesta nova versió hi consta l'evolució del mòdul de Seguretat SAML de Canigó per permetre l'autenticació i l'[autorització a Gicar via SAML](/drafts/2020-03-24-Actualitzacio_modul_Seguretat_Saml/) i la revisió de l'estat dels mòduls de Canigó.

## Novetats

A la nova versió 1.7.7 del plugin es modifiquen les preguntes al afegir el mòdul de seguretat, amb el següent resultat:

![](/images/news/Security_module_configuration_1_7_7.png)

![](/images/news/)

![](/images/news/)

![](/images/news/)

Segons l'opció seleccionada, el plugin modificarà els fitxers del projecte *WebSecurityConfig.java* i *app-custom-security.xml* per a configurar la seguretat del projecte segons les opcions seleccionades

Per instal·lar o actualitzar la versió del plugin és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació del Plugin d'Eclipse

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Seguretat SAML](/canigo-documentacio-versions-3x-core/modul-saml/)
