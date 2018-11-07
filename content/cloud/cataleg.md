+++
date        = "2018-11-07"
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

En quant als contenidors Docker, inicialment, aliniarem les versions del software del [Full de Ruta de Programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) amb les versions dels contenidors certificats per CTTI. Podeu trobar aquestes imatges certificades al [registre privat](https://docker-registry.ctti.extranet.gencat.cat).

Si necessiteu més informació del registre privat podeu consultar [Registre docker privat](http://canigo.ctti.gencat.cat/cloud/dockerRegistry/)

**Element**  | **Versió**   | **Imatge Docker**   | **Codi font**
------------ | ------------ |-------------------- |-----------
Apache 		 | 2.4    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.4   | [httpd](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd/tree/2.4)
Apache GICAR Shibboleth| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3   | [gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0.3)
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3   | [gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.3)
Apache Proxy ElasticSearch  	 | 2.4-1.0   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/2.4-1.0)
Nginx  	 | 1.12.2   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.12.2   | [nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.12.2)
Nginx  	 | 1.14.0   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.14.0   | [nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.14.0)
Java		 | 7  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:7   | [java](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/7)
Java		 | 8  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8   | [java](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/8)
MySql 		 | 5.7   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mysql:5.7   | [mysql](https://git.intranet.gencat.cat/3048-intern/imatges-docker/mysql/tree/5.7)
NodeJS 		 | 6   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:6   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/6)
NodeJS 		 | 8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:8   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/8)
NodeJS 		 | 10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:10   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/10)
PHP 		 | 7.1.11   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.1   | [apache-php](https://git.intranet.gencat.cat/3048-intern/imatges-docker/apache-php/tree/7.1)
Postgres	 | 10.5   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/postgres:10.5   | [postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres/tree/10.5)
Tomcat  	 | 7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:7   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/7)
Tomcat  	 | 8.0-java7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0-java7   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.0-java7)
Tomcat  	 | 8.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.0)
Tomcat  	 | 8.5   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.5   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.5)
Tomcat  	 | 9.0-java8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.5   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/9.0-java8)
Maven builder  	 | 1.0-3.5.3-8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/maven-builder:1.0-3.5.3-8   | [maven builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/maven-builder/tree/1.0-3.5.3-8)
Npm builder  	 | 1.1-3.10.10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.1-3.10.10  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.1-3.10.10)
Npm builder  	 | 1.1-5.6.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.1-5.6.0  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.1-5.6.0)

La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d'avaluació de vulnerabilitats per a garantir en una primera instància la qualitat de les mateixes.

Per construir contenidors personalitzats, cal tenir present els [Criteris creació contenidors docker](https://canigo.ctti.gencat.cat/cloud/dockerImages/).

Més informació sobre Docker: https://www.docker.com/

### Bases de dades a contenidors

Les bases de dades a contenidors no disposen de cap servei com backups o gestió d'usuaris. El proveïdor d'aplicacions haurà de fer-se càrrec d'aquests serveis.

Tampoc ofereix un entorn en alta disponibilitat. És una modalitat no recomanada per entorns productius.

## **Contenidors (Docker) Obsolets**

**Aquest contenidors són obsolets/no suportats i no tenen manteniment. Poden contenir vulnerabilitats i no està recomanat el seu ús.** 

**En cas d'utilitzar aquestes imatges es recomana l'actualització a les imatges suportades.**

**Element**  | **Versió**   | **Imatge Docker**   | **Codi font**
------------ | ------------ |-------------------- |-----------
Apache 		 | 2.2    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.2   | [httpd](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd/tree/2.2)
Apache GICAR Shibboleth| 1.0    |No disponible   | [gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0)
Apache GICAR Shibboleth| 1.0.1    |No disponible   | [gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0.1)
Apache GICAR Shibboleth| 1.0.2    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.2   | [gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0.2)
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0   | [gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0)
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0.1    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.1   | [gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.1)
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0.2    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.2   | [gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.2)
Apache GICAR Openshift| 1.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-openshift:1.0   | No disponible
Apache Proxy ElasticSearch  	 | 1.0   |No disponible   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/1.0)
Apache Proxy ElasticSearch  	 | 1.1   |No disponible   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/1.1)
Apache Proxy ElasticSearch  	 | 2.2-1.0   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.2-1.0   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/2.2-1.0)
Apache Proxy ElasticSearch  	 | 2.2-1.1   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.2-1.1   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/2.2-1.1)
Httpd Proxy ElasticSearch  	 | 0.1   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd22-proxy-es:0.1   | No disponible
Httpd Proxy ElasticSearch  	 | 1.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd22-proxy-es:1.0   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd22-proxy-es/tree/1.0)
Httpd Proxy ElasticSearch  	 | 1.1   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd22-proxy-es:1.1   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd22-proxy-es/tree/1.1)
Httpd Proxy ElasticSearch  	 | release-1.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd22-proxy-es:release-1.0   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd22-proxy-es/tree/1.0)
Httpd Proxy ElasticSearch  	 | release-1.1   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd22-proxy-es:release-1.1   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd22-proxy-es/tree/1.1)
Nginx  	 | 1.10.3   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.10.3   | [nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.10.3)
HAProxy		 | 1.2.1        | docker-registry.ctti.extranet.gencat.cat/gencatcloud/haproxy:1.2.1   | [haproxy](https://git.intranet.gencat.cat/3048-intern/imatges-docker/haproxy/tree/1.2.1)
HAProxy		 | 1.5.1        | docker-registry.ctti.extranet.gencat.cat/gencatcloud/haproxy:1.5.1   | [haproxy](https://git.intranet.gencat.cat/3048-intern/imatges-docker/haproxy/tree/1.5.1)
MongoDB 	 | 3.2   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mongodb:3.2   | [mongodb](https://git.intranet.gencat.cat/3048-intern/imatges-docker/mongodb/tree/3.2)
MongoDB 	 | 3.4   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mongodb:3.4   | [mongodb](https://git.intranet.gencat.cat/3048-intern/imatges-docker/mongodb/tree/3.4)
MongoDB 	 | 3.6   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mongodb:3.6   | [mongodb](https://git.intranet.gencat.cat/3048-intern/imatges-docker/mongodb/tree/3.6)
NodeJS 		 | 4  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:4   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/4)
NodeJS 		 | 4.8 (1)  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:4.8   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/4.8)
NodeJS 		 | 6.12  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:6.12   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/6.12)
NodeJS 		 | 6.14 (2)  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:6.14   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/6.14)
NodeJS 		 | 8.9  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:8.9   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/8.9)
NodeJS 		 | 8.12 (3)  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:8.12   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/8.12)
NodeJS 		 | 10.13 (4)  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:10.13   | [node ](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/10.13)
PHP 		 | 5.6   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:5.6   | [apache-php](https://git.intranet.gencat.cat/3048-intern/imatges-docker/apache-php/tree/5.6)
Postgres	 | 9.3    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/postgres:9.3   | [postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres/tree/9.3)
Postgres	 | 9.6    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/postgres:9.6   | [postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres/tree/9.6)
Tomcat  	 | 7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:7   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/7)
Sftp  	 | 1.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/sftp:1.0   | [sftp](https://git.intranet.gencat.cat/3048-intern/imatges-docker/sftp/tree/1.0)
Npm builder  	 | 1.0-2.15.11   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-2.15.11  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-2.15.11)
Npm builder  	 | 1.0-3.10.10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-3.10.10  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-3.10.10)
Npm builder  	 | 1.0-5.6.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-5.6.0  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-5.6.0)


### Notes:

* (1) renombrat a a node:4
* (2) renombrat a a node:6
* (3) renombrat a a node:8
* (4) renombrat a a node:10

## SaaS

### DBaaS - Base de dades com a servei

- MongoDB, disponible a **cloud públic**
- ElasticSearch, disponible a **cloud públic**
- PostgreSQL, disponible a **cloud públic**
- SQLServer, disponible a **cloud públic**
- MySQL, disponible a **cloud públic**

A diferència de les bases de dades a contenidors, els DBaaS si que incorporen serveis de backups i gestió d'accés entre d'altres, a més de proporcionar un entorn en alta disponibilitat. És per aquest motiu que per entorns productius és recomanable el seu ús enlloc de bases de dades en contenidors.
