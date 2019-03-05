+++
date        = "2019-02-21"
title       = "Elements del catàleg de contenidors"
description = "Descripció de les imatges docker base proporcionades pel CTTI."
sections    = "Cloud"
weight      = 1
toc = true
categories  = ["cloud","docker","container", "kubernetes","openshift","swarm", "appagile", "swamme", "ibm", "caas"]
+++

En aquesta secció es descriuen les diferents imatges docker homologades pel CTTI i utilitzables a les diferents plataformes de contenidors.

## **Imatges de contenidors base**

Per facilitar la tasca de desenvolupament i creació d'aplicacions basades en contenidors, CTTI ofereix un conjunt d'imatges certificades i alineades amb les versions del software del [Full de Ruta de Programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/).

Podeu trobar aquestes imatges certificades al [registre privat](https://docker-registry.ctti.extranet.gencat.cat). Si necessiteu més informació d'aquest registre privat, podeu consultar [Registre docker privat](http://canigo.ctti.gencat.cat/draft/cloud/cloud-caas/dockerRegistry/).

**Element**  | **Versió**   | **Imatge Docker**   | **Codi font**
------------ | ------------ |-------------------- |-----------
Apache 		 | 2.4    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd:2.4   | [httpd](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd/tree/2.4)
Apache GICAR Shibboleth| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3   | [gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0.3)
Apache GICAR Shibboleth Kubernetes/Openshift| 1.0.3    |docker-registry.ctti.extranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3   | [gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.3)
Apache Proxy ElasticSearch  	 | 2.4-1.0   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0   | [httpd-proxy-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/2.4-1.0)
Nginx  	 | 1.12   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.12   | [nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.12)
Nginx  	 | 1.14   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/nginx:1.14   | [nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.14)
Java		 | 7  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:7   | [java](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/7)
Java		 | 8  | docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8   | [java](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/8)
MySql 		 | 5.7   |docker-registry.ctti.extranet.gencat.cat/gencatcloud/mysql:5.7   | [mysql](https://git.intranet.gencat.cat/3048-intern/imatges-docker/mysql/tree/5.7)
NodeJS 		 | 6   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:6   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/6)
NodeJS 		 | 8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:8   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/8)
NodeJS 		 | 10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/node:10   | [node](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/10)
PHP 		 | 7.1   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.1   | [apache-php](https://git.intranet.gencat.cat/3048-intern/imatges-docker/apache-php/tree/7.1)
PHP 		 | 7.2   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/apache-php:7.2   | [apache-php](https://git.intranet.gencat.cat/3048-intern/imatges-docker/apache-php/tree/7.2)
Postgres	 | 10.5   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/postgres:10.5   | [postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres/tree/10.5)
Tomcat  	 | 9.0-java8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:9.0-java8   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/9.0-java8)
Maven builder  	 | 1.0-3.5.3-8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/maven-builder:1.0-3.5.3-8   | [maven builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/maven-builder/tree/1.0-3.5.3-8)
Maven builder  	 | 1.0-3.6-8   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/maven-builder:1.0-3.6-8   | [maven builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/maven-builder/tree/1.0-3.6-8)
Npm builder  	 | 1.0-4-2.15.11   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-4-2.15.11  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-4-2.15.11)
Npm builder  	 | 1.0-6-3.10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-6-3.10  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-6-3.10)
Npm builder  	 | 1.0-8-5.6    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-8-5.6   | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-8-5.6 )
Npm builder  	 | 1.0-8-6.4   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-8-6.4  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-8-6.4)
Npm builder  	 | 1.0-10-6.4    | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-10-6.4   | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-10-6.4 )

<br>
**IMPORTANT**: De cara a minimitzar les vulnerabilitats de les aplicacions, es recomana que periòdicament els proveïdors d'aplicacions les reconstrueixin utilitzant aquestes imatges Docker certificades més actualitzades. Per realitzar aquestes tasques de construcció i desplegament s'ha de fer ús de les corresponents pipelines al Jenkins del SIC.
<br>

La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d'avaluació de vulnerabilitats per a garantir en una primera instància la qualitat d'aquestes.

Per construir contenidors personalitzats, cal tenir present els [Criteris creació contenidors docker](https://canigo.ctti.gencat.cat/draft/cloud/cloud-caas/dockerImages/).

Més informació sobre Docker: https://www.docker.com/

### Bases de dades a contenidors

Les bases de dades a contenidors no disposen de cap servei com backups o gestió d'usuaris. El proveïdor d'aplicacions haurà de fer-se càrrec d'aquests serveis.

Tampoc ofereix un entorn en alta disponibilitat. És una modalitat no recomanada per entorns productius.

## **Imatges de contenidors obsoletes**

**Aquestes imatges són obsoletes/no suportades i no tenen manteniment. Poden contenir vulnerabilitats i no està recomanat el seu ús.** 

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
Tomcat  	 | 8.0-java7   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0-java7   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.0-java7)
Tomcat  	 | 8.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.0   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.0)
Tomcat  	 | 8.5   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/tomcat:8.5   | [tomcat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/8.5)
Sftp  	 | 1.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/sftp:1.0   | [sftp](https://git.intranet.gencat.cat/3048-intern/imatges-docker/sftp/tree/1.0)
Npm builder  	 | 1.0-2.15.11   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-2.15.11  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-2.15.11)
Npm builder  	 | 1.0-3.10.10   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-3.10.10  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-3.10.10)
Npm builder  	 | 1.0-5.6.0   | docker-registry.ctti.extranet.gencat.cat/gencatcloud/npm-builder:1.0-5.6.0  | [npm builder](https://git.intranet.gencat.cat/3048-intern/imatges-docker/npm-builder/tree/1.0-5.6.0)


### Notes:

* (1) renombrat a a node:4
* (2) renombrat a a node:6
* (3) renombrat a a node:8
* (4) renombrat a a node:10
