+++
date        = "2018-04-04"
title       = "SIC. Configuració multi-entorn en SPAs"
description = "Amb la separació de frontend i backend que es recomana aplicar com a patró d'arquitectura en aplicacions Canigó, i per tal d'acomplir els requeriments d'una única construcció no depenent de l'entorn que s'imposa des del SIC, cal donar una solució de configuració multi-entorn en una SPA (Single Page Application)"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "ABRIL2018"
+++

Amb la separació de frontend i backend que es recomana aplicar com a patró d'arquitectura en aplicacions Canigó, i per tal d'acomplir els requeriments d'una única construcció no depenent de l'entorn que s'imposa des del SIC, cal donar una solució de configuració multi-entorn per la part de frontend. Amb aquest objectiu es presenten diferents opcions i quina és la recomanada des del CS Canigó.

Opció 1) Configuració embeguda al client

Configuració única "hardcoded" al client

*Avantatges*

* És la solució més simple

*Inconvenients*

* Es pot estar exposant informació sensible al repositori de codi
* Per desplegar a cada entorn cal modificar el codi font amb la configuració específica
* No dona suport a configuració multi-entorn

*Conclusió*

Pot ser una configuració vàlida per un pilot però per una aplicació que hagi de desplegar-se en entorns productius.

Opció 2) Configuració per domini d'aplicació

Configuració multi-entorn "hardcoded" al client, i obtinguda en funció del domini de l'aplicació. Per exemple, si el domini de l'aplicació és "preproduccio.app.gencat.cat", s'obtindria la configuració corresponent a l'entorn de preproduccio. Aquesta lògica hauria d'estar al propi codi font o bé en un mòdul reusable entre SPAs.

*Avantatges*

* És una solució relativament fàcil d'aplicar
* Multi-entorn, per desplegar a cada entorn no cal modificar el codi font amb la configuració específica

*Inconvenients*

* Es pot estar exposant informació sensible al repositori de codi
* Un canvi de configuració a qualsevol entorn suposa tenir que reconstruir la SPA

*Conclusió*

Tot i ser millor que l'opció 1), té mancances no assumibles per ser adoptada com a solució

Opció 3) Obtenir la configuració mitjançant una crida REST al backend

Per aplicar aquesta solució cal que el backend exposi un endpoint d'on obtenir la configuració específica per l'entorn que requereix la SPA. Per exemple, en un backend Canigó podria ser http://<server>:<port>/api/frontendProperties
Aquesta crida s'hauria de forma autenticada (Ex. JWT) un cop l'usuari ha fet login a l'aplicació i ha obtingut el token d'accés.

*Avantatges*

* L'accés a la configuració és segur
* És una solució relativament fàcil d'aplicar

*Inconvenients*

* L'entrada a l'aplicació té el delay que suposa fer aquesta crida al backend per obtenir la configuració

*Conclusió*

El principal inconvenient que té aquesta solució és el delay que s'afegeix en la càrrega de la SPA

Tot i que poden haver-hi altres solucions, l'opció 3) compleix els requeriments mínimament acceptables i és una solució força natural a aplicar en una SPA amb un backend Canigó 3.2. Per a més detall, des del CS Canigó hem preparat el [HowTo - Configuració multi-entorn a una SPA amb backend Canigó](http://canigo.ctti.gencat.cat/howtos/2018-04-howto-frontend-multientorn/).
