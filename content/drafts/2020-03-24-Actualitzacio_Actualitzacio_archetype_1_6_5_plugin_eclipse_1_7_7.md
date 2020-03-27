+++
date        = "2020-03-24"
title       = "Canigó. Actualització archetype 1.6.5 i plugin eclipse 1.7.7"
description = "S'ha publicat una nova versió del archetype i del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.3"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Dins dels lliurables de Canigó hi consten l’arquetipus (archetype) i el plugin de l’Eclipse. Seguint l’objectiu de CS Canigó de proporcionar facilitadors per a la creació de projectes Canigó als desenvolupadors d’aplicacions, s’ha actualitzat ambdós lliurables per generar projectes amb **Canigó 3.4.3**. Podeu consultar l’abast complet de la nova versió del marc de treball a les [Release Notes, apartat Canigó 3.4.3](/canigo-download-related/release-notes-canigo-34).

L’arquetipus és una eina Maven que facilita la creació de projectes seguint una plantilla. Utilitzant l’arquetipus i executant un goal de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves funcionalitats.

El plugin és un connector desenvolupat específicament per a l’IDE Eclipse que permet afegir-hi menús contextuals per a la creació de projectes Canigó utilitzant l’arquetipus de Maven, a més a més d’afegir mòduls a un projecte creat i amb una preconfiguració ja donada. Així, utilitzant l’Eclipse, podem crear un projecte i afegir-l’hi els mòduls necessaris obtenint un projecte preconfigurat per al marc de treball Canigó i estalviant temps als desenvolupadors.


## Novetats *archetype*

La versió 1.6.5 de l’arquetipus de Canigó incorpora les següents novetats respecte a la versió anterior:

- Revisió de l'estat dels mòduls: Realització d’un anàlisis sobre l’estat dels mòduls, les seves funcionalitats i els testos associats.

- Actualització mòdul de Seguretat SAML: Actualització del mòdul de Seguretat SAML incorporant l'opció d'autorització per Gicar.

## Novetats *plugin Eclipse*

La nova versió 1.7.7 del plugin utilitza la versió 1.6.5 de l’arquetipus de Canigó per generar projectes amb Canigó 3.4.3 i s'han modificat les preguntes al afegir el mòdul de seguretat, amb el següent resultat:

Només tenim 3 preguntes:

![](/images/news/Plugin_1.7.7_add_security.png)

1. Si es vol token, amb les respostes si o no

![](/images/news/Plugin_1.7.7_add_security_token.png)

2. El provider que volem fer servir:

![](/images/news/Plugin_1.7.7_add_security_provider.png)

Amb les respostes Arxiu, BBDD, Gicar i Saml si es vol seguretat amb token i Arxiu, BBDD i Gicar si no es vol amb token

3. La forma d'autorització:

![](/images/news/Plugin_1.7.7_add_security_gicar.png)

![](/images/news/Plugin_1.7.7_add_security_saml.png)

Amb les respostes BBDD i Gicar si el provider es Gicar o Saml

A la versió 1.7.7 del plugin s'ha afegit l'opció provider Saml i autorització per Gicar

Segons l'opció seleccionada, el plugin modificarà els fitxers del projecte *WebSecurityConfig.java* i *app-custom-security.xml* per a configurar la seguretat del projecte segons les opcions seleccionades

Per instal·lar o actualitzar la versió del plugin és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació del Plugin d'Eclipse

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
* [Mòdul de Seguretat SAML](/canigo-documentacio-versions-3x-core/modul-saml/)
