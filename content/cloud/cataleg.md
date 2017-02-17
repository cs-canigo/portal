+++
date        = "2016-05-11"
title       = "Elements del catàleg"
description = "Docker, xPaaS, DBaaS"
sections    = "Container Cloud"
weight      = 1
toc = true
categories  = ["cloud","docker","container","paas"]
+++

L'objectiu del "Container Cloud" - anomenarem així a les solucions basades en containers (CaaS, Containers as a Service) a cloud públic i privat - , es disposar d'una sèrie d'elements que ens permetin fer córrer el nostre software sobre entorns d'execució "commodity", sense conèixer la infraestructura subjacent.

En aquest sentit, treballarem amb dos elements principals - xPaaS i Docker - i amb altres solucions com a servei -com algunes bases de dades-:

## **xPaaS**

Els xPaaS són runtimes d'execució estàndards i, segons el "gust" sobre el que treballem, tindrà denominacions diferents. Anomenarem a tots d'aquesta manera per a unificar conceptes. Actualment, els nostres xPaaS es basaran en Cloud Foundry i OpenShift: 

- **buildpack** (Cloud Foundry), disponible a **cloud públic**
	* Liberty for Java
	* Node.js
	* Go
	* PHP
	* Python
	* Ruby
	* Static site (Nginx)

<br />

- **xpaas** (OpenShift), disponible a **cloud privat**
	* Tomcat
	* Node.js
    * Perl
	* PHP
	* Python
	* Ruby

Les denominacions en altres clouds són:

- Elastic Beanstalk (Amazon Web Services)
- App Service (Azure)
- App Engine (Google)

En aquests xPaaS, quan es fa un "push" del codi o de l'artefacte, s'aixeca un entorn d'execució amb una potència i nombre d'instàncies prefixades.


### Configuració de l'engine

Cada xPaaS dona suport a diferents versions de l'engine que ha d'executar el codi. Posem com a exemple el [buildpack Node.js de Cloud Foundry](https://github.com/cloudfoundry/nodejs-buildpack). Per tal de configurar la versió 4.x de l'engine de Node.js corresponent a la versió actual CTTI del [full de ruta](https://portic.ctti.gencat.cat/les_tic/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf), cal fer la següent configuració en el fitxer "package.json" ubicat a l'arrel de l'aplicació:

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
		node: "4.6.0"
	},
	dependencies: {
		express: "^4.13.3",
		...
	},
	devDependencies: {
		mocha: "^2.4.5",
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
  version: 4.6.0
...
```

## **Contenidors (Docker)**

En quant als contenidors Docker, inicialment, aliniarem les versions del software del Full de Ruta de Programari amb les versions dels contenidors certificats per CTTI. Podeu trobar aquestes imatges certificades a [DockerHub](https://hub.docker.com/r/gencatcloud/).

Es publiquen dos imatges per separat per cada element:

- Docker: imatge certificada a [Bluemix IBM Containers](https://www.ibm.com/cloud-computing/bluemix/containers)
- Docker-OpenShift: imatge certificada a [OpenShift](https://www.openshift.org/)

**Element**  | **Versió**   | **Docker** | **Docker-OpenShift**
------------ | ------------ |----------- | --------------------
Apache 		 | actual FRP    |https://hub.docker.com/r/gencatcloud/httpd/    | https://hub.docker.com/r/gencatcloud/httpd-openshift/
Apache-GICAR | 1.0 (Apache 2.2)   | https://hub.docker.com/r/gencatcloud/gicar/ | https://hub.docker.com/r/gencatcloud/gicar-openshift/
HAProxy		 | 1.5.1        | https://hub.docker.com/r/gencatcloud/haproxy/ | -
Java		 | actual FRP   | https://hub.docker.com/r/gencatcloud/java/  | https://hub.docker.com/r/gencatcloud/java-openshift/
MySql 		 | actual FRP   | https://hub.docker.com/r/gencatcloud/mysql/    | https://hub.docker.com/r/gencatcloud/mysql-openshift
NodeJS 		 | actual FRP   | https://hub.docker.com/r/gencatcloud/nodejs/ | https://hub.docker.com/r/gencatcloud/nodejs-openshift/
PHP 		 | actual FRP   | https://hub.docker.com/r/gencatcloud/php/ | https://hub.docker.com/r/gencatcloud/php-openshift/
Postgres	 | 9.5.3    |https://hub.docker.com/r/gencatcloud/postgres/ | https://hub.docker.com/r/gencatcloud/postgres-openshift/
Tomcat  	 | actual FRP   | https://hub.docker.com/r/gencatcloud/tomcat/ | https://hub.docker.com/r/gencatcloud/tomcat-openshift/

_Per a tots els elements presents al [Full de Ruta del Programari (FRP) del CTTI](https://portic.ctti.gencat.cat/les_tic/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf) està disponible la versió actual CTTI._
_Per als elements que no estan presents al [Full de Ruta del Programari (FRP) del CTTI](https://portic.ctti.gencat.cat/les_tic/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf) s'especifica la versió disponible més actual._


La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d'avaluació de vulnerabilitats per a garantir en una primera instància la qualitat de les mateixes.

Més informació sobre Docker: https://www.docker.com/

## SaaS

### DBaaS - Base de dades com a servei

- MongoDB, disponible a **cloud públic**
- ElasticSearch, disponible a **cloud públic**
- PostgreSQL, disponible a **cloud públic**
- MySQL (Beta), disponible a **cloud públic**
- SQLServer, disponible a **cloud públic**
