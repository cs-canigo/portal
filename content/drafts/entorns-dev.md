+++
date        = "2018-06-01"
title       = "Entorns de desenvolupament"
description = "Entorns de desenvolupament recomanats compatibles amb les Plataformes Cloud"
sections    = "Container Cloud"
weight      = 7
categories  = ["cloud","docker","container","paas"]
+++

## Openshift

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/) basades en OpenShift, es recomana utilitzar [Minishift](https://www.openshift.org/minishift/). La versió a instal·lar ha de ser compatible amb la versió d'OpenShift.

**Plataforma Cloud**  | **Versió Openshift**   | **Versió Minishift compatible**
------------ | ------------ | ------------
CPD4 AppAgile (privat)  |  3.4.1  | v1.0.0-beta.3 o superior

## Bluemix


En el cas de Bluemix:

* _Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/) basades en Kubernetes, es recomana utilitzar [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/)
* _Apps_: per les apps (xPaaS de CloudFoundry) es recomana utilitzar [PCF Dev](https://pivotal.io/pcf-dev).

La versió a instal·lar de Kubernetes, Docker i PCF Dev en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/).

**Plataforma Cloud**  | **Versió Cloud Foundry**   | **Versió PCF Dev**
------------ | ------------ | ------------
Bluemix - Apps	| 270.030 | v0.30.0

**Plataforma Cloud**  | **Versió Kubernetes**   |  **Versió Minikube**
------------ | ------------ | ------------
Bluemix - Kubernetes  |  1.9.7  | 0.25 o superior

## SwarmMe
Per les Plataformes Cloud basades en Swarm, es recomana utilitzar  [docker-compose](https://docs.docker.com/compose/)

La versió a instal·lar de docker-compose en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/).

**Plataforma Cloud**  | **Versió Docker**   | **Versió Docker-compose**
------------ | ------------ | ------------
CPD1 SwarmMe (privat)	| 17.03.1-ce | 1.13.0