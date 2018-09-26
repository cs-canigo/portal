+++
date        = "2018-09-26"
title       = "Publicació Canigó versió 3.2.6  Canigó"
description = "S'ha publicat un nou mòdul de Canigó 3 per a connexions amb Base de Dades MongoDB. El propòsit del mòdul és proporcionar les utilitats per a realitzat la connexió i consultes a una Base de Dades MongoDB"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "OCTUBRE2018"
+++

## Suport per a PostgreSQL

S'ha afegit a Canigó 3.2.6 el suport per la BBDD de PostgreSQL mitjançant l'estàndard JPA.

Tot i que la utilització de PostgreSQL es podia fer directament per part dels diferents proveïdors (configurant l'aplicació, i els servidors d'aplicacions als diferents entorns), amb aquesta nova versió de Canigó la configuració s'automatitza i es certifica el suport a aquesta BBDD.

### Per què PostgreSQL?

PostgreSQL és una BBDD relacional robusta de codi obert, que ofereix un suport ampli de l'estàndard SQL:2011, a més a més d'un gran ventall de característiques opcionals (que no formen part del nucli de l'estàndard).

Les principals característiques són un rendiment especialment bo en consultes complexes (escenaris OLTP/OLAP), compliment ACID estricte, replicació de dades entre diferents servidors, seguretat avançada de dades (rols i encriptació), suport avançat per tipus de dades com per exemple JSON, XML o GIS, consultes de tipus _full-text search_ ràpides i personalització i definició de nous/ves tipus de dades, funcions, operadors, etc.

## MongoDB

S'ha publicat un nou mòdul de Canigó 3 per a connexions amb bases de dades MongoDB. El propòsit del mòdul és proporcionar les utilitats per a realitzat la connexió i consultes a una base de dades MongoDB.

MongoDB és un programari de codi obert, per a la creació i gestió de base de dades orientada a documents, escalable, d'alt rendiment i lliure. La base de dades és orientada a document, d'aquesta manera gestiona col·leccions de documents similars al format de dades JSON.

Per a més informació es pot consultar la pàgina oficinal de [MongoDB] (https://www.mongodb.com/).

El nou mòdul utilitza Spring Data MongoDB i QueryDSL. Es pot trobar informació sobre aquests frameworks a la documentació de referència:

* [Spring Data MongoDB] (https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/). 
* [QueryDSL] (http://www.querydsl.com/static/querydsl/latest/reference/html/)

Com amb el mòdul JPA per a bases de dades relacionals, en aquest nou mòdul per a bases de dades MongoDB, es proporcionen les funcionalitats per a la generació de consultes de forma fàcil i senzilla.

En cas de tenir qualsevol dubte en l'ús del mòdul de Canigó 3 amb MongoDB podeu consultar la [documentació del mòdul](https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-mongodb) publicada al portal, posar-vos posar en contacte amb el CS Caniǵo a través del [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/CAN) amb una petició de consulta o suport, o bé enviant-nos un correu a la nostra [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).

## Mòdul canigo.persistence.core

Durant la fase de desenvolupament dels nous mòduls de persistència de dades s'ha creat un mòdul tècnic nou amb funcionalitats comunes dels paradigmes relacional/SQL i noSQL de MongoDB.

## Plugin Eclipse

El plugin pe l'IDE Eclipse, utilitzat a l'entorn de desenvolupament amb Canigó oficial, s'ha actualitzat amb la incorporació de les dues noves opcions per configurar la BBDD: PostgreSQL i MongoDB.

