+++
date        = "2019-02-13"
title       = "Entorns de desenvolupament"
description = "Entorns de desenvolupament recomanats compatibles amb les Plataformes Cloud"
sections    = "Container Cloud"
weight      = 7
categories  = ["cloud","docker","container","paas"]
+++

## AppAgile

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/) basades en OpenShift, es recomana utilitzar [Minishift](https://www.openshift.org/minishift/). La versió a instal·lar ha de ser compatible amb la versió d'OpenShift.

**Plataforma Cloud**  | **Versió Openshift**   | **Versió Minishift compatible**
------------ | ------------ | ------------
CPD4 AppAgile (privat)  |  3.9.65  | v1.16.1 o superior

## Bluemix - kubernetes

En el cas de Bluemix:

* Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/) basades en Kubernetes, es recomana utilitzar [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/)

La versió a instal·lar de Kubernetes i  Docker en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/).


**Plataforma Cloud**  | **Versió Kubernetes**   |  **Versió Minikube**
------------ | ------------ | ------------
Bluemix - Kubernetes  |  1.12.5  | 0.32 o superior

## IBM CaaS

En el cas de IBM CaaS:

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/) basades en Kubernetes, es recomana utilitzar [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/)

La versió a instal·lar de Kubernetes i Docker en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/).

**Plataforma Cloud**  | **Versió Kubernetes**   |  **Versió Minikube**
------------ | ------------ | ------------
CaaS - Kubernetes  |  1.11.5  | 0.28.1 o superior

## SwarmMe

Per les Plataformes Cloud basades en Swarm, es recomana utilitzar  [docker-compose](https://docs.docker.com/compose/)

La versió a instal·lar de docker-compose en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/drafts_cloud/plataformes-cloud/).

**Plataforma Cloud**  | **Versió Docker**   | **Versió Docker-compose**
------------ | ------------ | ------------
CPD1 SwarmMe (privat)	| 17.03.1-ce | 1.13.0

