+++
date        = "2017-06-09"
title       = "Entorns de desenvolupament"
description = "Entorns de desenvolupament recomanats compatibles amb les Plataformes Cloud"
sections    = "Container Cloud"
weight      = 7
categories  = ["cloud","docker","container","paas"]
+++

## Openshift

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/) basades en OpenShift, es recomana utilitzar [Minishift](https://www.openshift.org/minishift/). La versió a instal·lar ha de ser compatible amb la versió d'OpenShift.

**Plataforma Cloud**  | **Versió Openshift Origin**   | **Versió Minishift compatible**
------------ | ------------ | ------------
CPD3 Containers (privat)		|  1.3.1 (OpenShift 3.3)  | 0.9.0
CPD4 AppAgile (privat)  |  1.4.1 (OpenShift 3.4)  | 1.0.0

## Bluemix

En el cas de Bluemix:

* _Contenidors_: per els contenidors Docker es pot treballar amb l'engine [Docker](https://www.docker.com/community-edition/) i [Docker Compose](https://docs.docker.com/compose/) directament, sense necessitat de cap orquestrador específic ni plataforma "minimalista".
* _Apps_: per les apps (xPaaS de CloudFoundry) es recomana utilitzar [PCF Dev](https://pivotal.io/pcf-dev).

La versió a instal·lar de Docker, Docker-Compose i PCF Dev en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/).

**Plataforma Cloud**  | **Versió Cloud Foundry**   | **Versió PCF Dev**
------------ | ------------ | ------------
Bluemix - Apps	| 1.7.0 (v235) | 0.18.0

**Plataforma Cloud**  | **Versió Docker**   |  **Versió Docker-Compose**
------------ | ------------ | ------------
Bluemix - Containers  |  1.10 o posterior  | 1.6 o posterior
