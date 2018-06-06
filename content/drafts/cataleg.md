+++
date        = "2018-06-06"
title       = "Elements del catàleg"
description = "Docker, xPaaS, DBaaS"
sections    = "Container Cloud"
weight      = 2
toc = true
categories  = ["cloud","docker","container","paas"]
+++

L'objectiu del "Container Cloud" - anomenarem així a les solucions basades en containers (CaaS, Containers as a Service) a cloud públic i privat - , es disposar d'una sèrie d'elements que ens permetin fer córrer el nostre software sobre entorns d'execució "commodity", sense conèixer la infraestructura subjacent.

En aquest sentit, treballarem amb dos elements principals - xPaaS i Docker - i amb altres solucions com a servei -com algunes bases de dades-:

## **xPaaS**

Els xPaaS són runtimes d'execució estàndards i, segons el "gust" sobre el que treballem, tindrà denominacions diferents. Anomenarem a tots d'aquesta manera per a unificar conceptes. Actualment, els nostres xPaaS es basaran en Cloud Foundry: 

- **buildpack** (Cloud Foundry), disponible a **cloud públic**
	* Liberty for Java
	* Node.js
	* Go
	* PHP
	* Python
	* Ruby
	* Static site (Nginx)



### Configuració de l'engine

Cada xPaaS dona suport a diferents versions de l'engine que ha d'executar el codi. Posem com a exemple el [buildpack Node.js de Cloud Foundry](https://github.com/cloudfoundry/nodejs-buildpack). Per tal de configurar la versió 8.x de l'engine de Node.js corresponent a la versió actual CTTI del [full de ruta](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/), cal fer la següent configuració en el fitxer "package.json" ubicat a l'arrel de l'aplicació:

_package.json_

```
{
	name: "AppDemoNodeJS",
	version: "0.0.1",
	private: true,
	scripts: {
		start: "node app.js",
		test: "make test"
	},
	engines: {
		node: "8.11.1"
	},
	dependencies: {
		express: "^4.16.3",
		...
	},
	devDependencies: {
		mocha: "^5.2.0",
		...
	}
}
```

Com es pot observar, en la secció engines cal especificar la versió exacte de Node.js amb que volem que s'executi l'aplicació. En cas que no s'especifiqui, el buildpack executarà la versió per defecte que tingui establerta. En el cas del buildpack Node.js de Cloud Foundry coincideix amb la versió que hem indicat en el descriptor "package.json" de l'aplicació:

_manifest.yml_ (veure a [Github](https://github.com/cloudfoundry/nodejs-buildpack/blob/master/manifest.yml))

```
language: nodejs
default_versions:
- name: node
  version: 8.11.1
...
```

## **Contenidors (Docker)**

En quant als contenidors Docker, inicialment, aliniarem les versions del software del Full de Ruta de Programari amb les versions dels contenidors certificats per CTTI. Podeu trobar aquestes imatges certificades al [registre privat](https://docker-registry.ctti.extranet.gencat.cat).

Si necessiteu més informació del registre privat podeu consultar [Registre docker privat](http://canigo.ctti.gencat.cat/cloud/dockerRegistry/)

**Element**  | **Versió**   | **Imatge Docker**
------------ | ------------ |-----------
Apache 		 | 2.4    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.4
Apache GICAR Shibboleth| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3   |
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3   |
Apache Proxy ElasticSearch  	 | 2.4-1.0   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0
Nginx  	 | 1.10.3   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.10.3
Nginx  	 | 1.12.2   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.12.2
HAProxy		 | 1.5.1        | docker-registry.ctti.extranet.gencat.cat/gencatcloud/haproxy:1.5.1
Java		 | 7  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:7
Java		 | 8  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8
MongoDB 	 | 3.2.7   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mongodb:3.2
MySql 		 | 5.7   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mysql:5.7
NodeJS 		 | 4.8.6   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:4.8
NodeJS 		 | 6.12.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:6.12
NodeJS 		 | 8.9.1   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:8.9
PHP 		 | 5.6.32   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:5.6
PHP 		 | 7.1.11   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.1
Postgres	 | 9.6.5    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/postgres:9.6
Tomcat  	 | 7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:7
Tomcat  	 | 8.0-java7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0-java7
Tomcat  	 | 8.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0
Tomcat  	 | 8.5   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.5



La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d'avaluació de vulnerabilitats per a garantir en una primera instància la qualitat de les mateixes.

Per construir contenidors personalitzats, cal tenir present els [Criteris creació contenidors docker](https://canigo.ctti.gencat.cat/cloud/dockerImages/).

Més informació sobre Docker: https://www.docker.com/

### Bases de dades a contenidors

Les bases de dades a contenidors no disposen de cap servei com backups o gestió d'usuaris. El proveïdor d'aplicacions haurà de fer-se càrrec d'aquests serveis.

Tampoc ofereix un entorn en alta disponibilitat. És una modalitat no recomanada per entorns productius.

## SaaS

### DBaaS - Base de dades com a servei

- MongoDB, disponible a **cloud públic**
- ElasticSearch, disponible a **cloud públic**
- PostgreSQL, disponible a **cloud públic**
- SQLServer, disponible a **cloud públic**
- MySQL, disponible a **cloud públic**

A diferència de les bases de dades a contenidors, els DBaaS si que incorporen serveis de backups i gestió d'accés entre d'altres, a més de proporcionar un entorn en alta disponibilitat. És per aquest motiu que per entorns productius és recomanable el seu ús enlloc de bases de dades en contenidors.
