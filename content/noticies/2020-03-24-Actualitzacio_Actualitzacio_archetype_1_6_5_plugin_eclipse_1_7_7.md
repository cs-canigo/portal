+++
date        = "2020-03-24"
title       = "Canigó. Actualització archetype 1.6.5 i plugin eclipse 1.7.7"
description = "S'ha publicat una nova versió de l’arquetipus i del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.3"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

Dins dels lliurables de Canigó hi consten l’*archetype* i el *plugin* de l’Eclipse.
Seguint l’objectiu de CS Canigó de proporcionar facilitadors per a la creació de projectes Canigó als desenvolupadors d’aplicacions, s’han actualitzat ambdós lliurables per a
generar projectes amb **Canigó 3.4.3**. Podeu consultar l’abast complet de la nova versió del marc de treball a les [Release Notes, apartat Canigó 3.4.3](/canigo-download-related/release-notes-canigo-34).

* L’*archetype* és una eina Maven que **facilita la creació de projectes seguint una plantilla**. Utilitzant l’arquetipus i executant un *goal* de maven obtenim un projecte Canigó amb una
base preconfigurada i preparada per a incorporar-li noves funcionalitats.

* El *plugin* és un **connector desenvolupat específicament per a l’IDE Eclipse** que permet afegir-hi menús contextuals per a la creació de projectes Canigó utilitzant
l’arquetipus de Maven, a més de permetre afegir mòduls a un projecte creat i amb una configuració per defecte. D’aquesta manera, podem crear un projecte amb l’Eclipse i
afegir-l’hi els mòduls necessaris obtenint un projecte preparat per al marc de treball Canigó i estalviant temps als desenvolupadors.


## Novetats *archetype*

La versió 1.6.5 de l’arquetipus de Canigó incorpora les següents novetats respecte a la versió anterior:

- **Revisió de l'estat dels mòduls** a partir de l'anàlisi del seu estat, les seves funcionalitats i els testos associats

- **Actualització del mòdul de Seguretat SAML**, incorporant l'opció d'autorització per Gicar

## Novetats *plugin* d'Eclipse

La nova versió 1.7.7 del plugin utilitza la versió 1.6.5 de l’arquetipus de Canigó per a generar projectes amb Canigó 3.4.3 i s'han modificat les opcions en afegir el mòdul de seguretat.
A continuació s'explica el seu funcionament.

Es proporcionen tres opcions:

* **Si es vol token**, amb les possibles respostes: Si/No

![](/images/news/Plugin_1.7.7_add_security_token.png)

* El **proveïdor que volem fer servir**, amb les possibles respostes: Arxiu/BBDD/Gicar/Saml (si es vol seguretat amb token) o Arxiu/BBDD/Gicar (si no es vol amb token)

![](/images/news/Plugin_1.7.7_add_security_provider.png)

* La **forma d'autorització**, amb les possibles respostes: BBDD/Gicar, només si el proveïdor es Gicar o Saml

![](/images/news/Plugin_1.7.7_add_security_gicar.png)

<br/>
A la versió 1.7.7 del plugin s'ha afegit l'opció d’autorització per Saml i per Gicar de forma que, segons l'opció seleccionada, el plugin modificarà els fitxers del
projecte `WebSecurityConfig.java` i `app-custom-security.xml` per a configurar la seguretat del projecte segons les opcions seleccionades.

<br/>
Per a instal·lar o actualitzar la versió del plugin és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/#instal-lació).

## Documentació

Teniu disponible la següent documentació:

* [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)
* [Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
* [Mòdul de Seguretat SAML](/canigo-documentacio-versions-3x-core/modul-saml/)
