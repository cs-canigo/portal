+++
date        = "2016-05-11"
title       = "Elements del catàleg"
description = "Docker, xPaaS, DBaaS"
section     = "Container Cloud"
weight      = 1
toc = true
categories  = ["cloud","docker","container","paas"]
+++

L'objectiu del "Container Cloud" - anomenarem així a les solucions basades en containers (CaaS, Containers as a Service) a cloud públic i privat - , es disposar d'una sèrie d'elements que ens permetin fer córrer el nostre software sobre entorns d'execució "commodity", sense conèixer la infraestructura subjacent.

En aquest sentit, treballarem amb dos elements principals - xPaaS i Docker - i amb altres solucions com a servei -com algunes bases de dades-:

## **xPaaS**

Els xPaaS són runtimes d'execució estàndards i, segons el "gust" sobre el que treballem, tindrà denominacions diferents. Anomenarem a tots d'aquesta manera per a unificar conceptes. Actualment, els nostres xPaaS es basaran en cloudfoundry i openshift: 


- **buildpack** (cloud foundry), disponible a **cloud públic**
	* Liberty for Java
	* SDK for Node.js
	* Go
	* PHP
	* Python
	* Ruby
	* Static (nginx)

<br />

- **xpaas** (openshift), disponible a **cloud privat**
	* Tomcat (7, 8)
	* Node.js
	* Go
	* PHP
	* Python
	* Ruby

Les denominacions en altres clouds són:

- elastic beanstalk (amazon web services)
- appservice (azure)
- appengine (google)

En aquests xPaaS, quan es fa un "push" del codi o de l'artefacte, s'aixeca un entorn d'execució amb una potència i nombre d'instàncies prefixades.


## **Contenidors (Docker)**

En quant als contenidors Docker, inicialment, aliniarem les versions del software del Full de Ruta de Programari amb les versions dels contenidors certificats per CTTI. Podeu trobar aquestes imatges certificades a [DockerHub](https://hub.docker.com/r/gencatcloud/).


**Element**  | **Versió actual CTTI** | **Docker**
------------ | ----------------------- | ---------
Apache 		 | 2.2                     | https://hub.docker.com/r/gencatcloud/httpd/
Apache-GICAR | 1.0 (basada en Apache 2.2)                       | https://hub.docker.com/r/gencatcloud/gicar/
HaProxy		 | 1.5.1                   | https://hub.docker.com/r/gencatcloud/haproxy/
Java		| 7		|	https://hub.docker.com/r/gencatcloud/java/
MySql 		 | 5.7                     | https://hub.docker.com/r/gencatcloud/mysql/
NodeJS 		 | 4.2.6                     | https://hub.docker.com/r/gencatcloud/nodejs/
PHP 		 | 5.3.29                   | https://hub.docker.com/r/gencatcloud/php/
Postgres	 | 9.5.3	                   | https://hub.docker.com/r/gencatcloud/postgres/
Tomcat  	 | 7                     | https://hub.docker.com/r/gencatcloud/tomcat/

La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d'avaluació de vulnerabilitats per a garantir en una primera instància la qualitat de les mateixes.

Més informació sobre Docker: https://www.docker.com/

## SaaS

### DBaaS - Base de dades com a servei

- MongoDB, disponible a **cloud públic**
- ElasticSearch, disponible a **cloud públic**