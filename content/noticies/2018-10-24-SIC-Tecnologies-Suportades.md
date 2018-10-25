+++
date = "2018-10-24"
title = "SIC: Tecnologies suportades i conformitat amb el full de ruta"
description = "Aquest article és un recordatori de la matriu de tecnologies amb les quals el SIC és compatible"
sections = ["Notícies","home"]
categories = ["sic"]
key = "NOVEMBRE2018"
+++

El SIC ha detectat en les darreres integracions un increment de casos en què les tecnologies escollides pels proveïdors d'aplicacions no s'ajusten a la normativa CTTI. Aquest article, a tall de recordatori, resumeix els punts més importants a tenir en compte a l'hora d'escollir tecnologies i versions per a una aplicació.

## Estàndard de Full de ruta del programari

A l'hora de definir l'arquitectura d'una aplicació, un dels passos que cal realitzar és escollir quines tecnologies s'empraran i per a cada una d'elles quina versió és la més adient. En aquest punt, cal tenir en compte que CTTI publica periòdicament el [Full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/).

Aquest estàndard de caràcter normatiu indica per a les principals tecnologies les versions que:

* han passat a estat obsolet,
* són encara compatibles,
* són les preferides,
* pròximament seran compatibles
* i les versions compatibles amb el SIC

D'aquesta manera, cal tenir en compte aquesta informació per no tenir problemes de compatibilitat amb les tecnologies que ofereixen els CPDs i les tecnologies amb les quals treballa el SIC.

### Convergència del SIC

El SIC, en el seu full de ruta, té previst convergir amb les versions d'aquest estàndard. Hi ha casos, com amb les tecnologies JDK, en els quals el SIC és 100% compatible amb les tecnologies preferides i d'altres en les que encara no ofereix compatibilitat.

Si teniu cap dubte al respecte, podeu obrir una [consulta](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.

## Criteris per a tecnologies no descrites

Per a tecnologies no incloses en la normativa anterior, s'aconsella:

* **Posar en coneixement aquesta situació tan aviat com es pugui.** Informar al responsable del servei i a CTTI de la decisió que s'ha pres, aportant la seva justificació. L'àrea d'Arquitectura de CTTI podrà recomanar alternatives o d'altres solucions amb les quals poder treballar, facilitant la integració de l'aplicació amb els entorns disponibles a CTTI.
* **Escollir versions contemporànies amb les descrites al full de ruta.** D'aquesta manera, disminueix la possibilitat de tenir incompatibilitats entre les tecnologies escollides i les proposades per CTTI.
* **Acollir-se sempre que sigui possible a versions LTS**. En les versions LTS, els fabricants ofereixen una extensió addicional de suport (correcció de bugs, pegats de seguretat...). Aquest fet disminueix el nombre de vegades que caldrà incrementar versions majors de la tecnologia escollida, que podrien ser traumàtiques en l'aplicació.


