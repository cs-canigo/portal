
+++
date        = "2016-04-14"
title       = "Interfície d'usuari a client vs JSF"
description = ""
section     = ""
draft 		= true
categories  = ["desenvolupament", "canigó"]
+++

Des de fa més de 3 anys, des de la Unitat d'Arquitectura Corporativa i el Centre de Suport Canigó, promovem la creació d'aplicacions orientades a serveis/API (dins els moviments de API Economy, API First, API Strategy) on la capa de presentació és un client més d'aquesta API. A més, proposem que aquest client html sigui totalment estàtic, on no hi hagi renderització des del costat de servidor: d'aquesta manera, el manteniment i evolució de l'aplicació és més senzill i no depenem de frameworks pesats de servidor (com és JSF o Struts).

Per aquest motiu, us comuniquem que a partir d'aquest moment, *l'ús de JSF ha de ser exclusiu a efectes de manteniment d'aplicacions*. Qualsevol nova aplicació o funcionalitat dins d'una aplicació, s'hauria de desenvolupar seguint el patró REST, on el servidor exposa la lògica de negoci mitjançant serveis en format JSON (i seguint les millor pràctiques en desenvolupament d'APIs que trobareu al nostre bloc) i el client, normalment desenvolupat amb tecnologia estàtica (html/javascript/css), consumeix aquest servei.

Això no vol dir que no es puguin utilitzar elements de servidor (jsp) per a facilitar la renderització de plantilles, però s'hauria de reduir a la mínima expressió.

Des del CS Canigó s'han anat publicant notícies i enviant comunicats durant aquests darrers anys promocionant aquest tipus d'arquitectura moderna REST+HTML5/JS. A continuació llistem diverses referències:

### Notícies

http://canigo.ctti.gencat.cat/noticies/2015-09-01-Canigo-Plantilla-aplicacio-rest/

http://canigo.ctti.gencat.cat/noticies/2015-07-24-Canigo-Arquitectura-aplicacio-recomanada/

http://canigo.ctti.gencat.cat/noticies/2015-02-05-Canigo-integracio-serveis-rest-gicar/

http://canigo.ctti.gencat.cat/noticies/2015-01-08-canig%C3%B3-REST/

### Comunicats (anteriors a Febrer 2015, no publicats en el nou portal)

Comunicat Gener 2015

Comunicat Novembre 2013

Comunicat Maig 2013

### Canigó

Properes publicacions del framework Canigó 3 deixaran de donar suport a JSF. També el plugin d'Eclipse inclòs en el [Entorn de desenvolupament Canigó] (http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) per a generació de noves aplicacions no permetrà la generació d'aplicacions basades en aquesta tecnologia. L'única opció serà la creació d'aplicacions amb arquitectura REST+HTML5/JS.
