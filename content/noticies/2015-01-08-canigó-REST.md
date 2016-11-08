+++
date        = "2015-01-10"
title       = "Cas d'èxit d'aplicació Canigo 3 amb arquitectura HTML5 + REST"
description = "L'arquitectura que des del CS Canigó s'està promovent per aplicacions web ja està sent adoptada per noves aplicacions, com és el cas de l'aplicació d'Ajuts i Subvencions (Transversal)"
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "canigó"]
+++

L'arquitectura que des del CS Canigó s'està promovent per aplicacions web ja està sent adoptada per noves aplicacions, com és el cas de l'aplicació d'Ajuts i Subvencions (Transversal). Aquesta aplicació Canigó 3 ha utilitzat una arquitectura híbrida, 90% HTML5+REST i un 10% JSP. Aquesta petita part basada en JSP (Java Server Pages) bàsicament s'ha fet per a generar l'estructura de la pàgina (template) en què es basa l'aplicació SPA (Single Page Application, aplicació de pàgina única) on les diferents parts de la pàgina es poden refrescar sense haver de recarregar tota la pàgina. La resta de codi de la capa de presentació és estàtic, no generat des del servidor, utilitzant javascript per a cridar serveis REST/JSON i formatar-los al navegador. Les conclusions per part de l'equip tècnic del projecte han estat molt positives pel que fa l'ús d'aquesta arquitectura respecte a la predecessora basada en JSF (Java Server Faces).

El següent diagrama il·lustra les diferents capes d'una aplicació Canigó 3 amb aquesta arquitectura HTML5+REST:

![Arquitectura Canigó Restful](/images/news/arquitectura-canigo-restful.png)

Com es pot observar la comunicació entre la capa de presentació i la capa de lògica de negoci es fa mitjançant el controlador REST. Aquest desacoblament entre client (Presentació) i servidor (Negoci-Dades) facilita la implementació de diferents clients (escriptori, mòbil, etc.) per accedir a uns mateixos recursos de servidor. En el comunicat de Novembre 2013 podeu trobar més informació respecte a aquest tipus d'arquitectura i el codi font d'una aplicació demo.

Pel que fa als frameworks a utilitzar a la capa de presentació destaquem els següents:

- Bootstrap: framework HTML, CSS i Javascript per al desenvolupament d'aplicacions web responsives. Incorpora plugins Javascript que requereixen JQuery. 
- AngularJS: framework Javascript per desenvolupament d'aplicacions web. Facilita el desenvolupament a més de proposar patrons de disseny per dur-les a terme. Requereix JQuery. En cas de no estar present a l'aplicació utilitza una versió reduïda (jqLite) que inclou el necessari pel seu funcionament.
- Bootstrap UI: llibreria de components Bootstrap basats en AngularJS.

A més d'aquestes llibreries que hem destacat existeixen moltes altres (JQuery UI, Backbone.js, Ember.js, etc.). Des del CS Canigó es dóna llibertat pel que fa als frameworks a utilitzar a la capa de presentació sempre que es compleixi la normativa de desenvolupament web del CTTI i el PIV (Programa d'Identificació Visual). 

Recordar que la nova versió de l'entorn de treball de Canigó 3 permet la creació d'una plantilla d'aplicació Canigó 3.1 amb aquesta arquitectura HTML5+REST. En aquesta plantilla s'inclou un exemple de CRUD (Create-Read-Update-Delete) d'una entitat.  Per qualsevol dubte referent a aquest tipus d'arquitectura en aplicacions Canigó 3 us podeu posar en contacte amb l'equip del CS Canigó, preferiblement fent una petició de Suport al JIRA CSTD o enviant un correu a la bústia oficina-tecnica.canigo.ctti@gencat.cat.
