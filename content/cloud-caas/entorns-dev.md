+++
date        = "2020-06-12"
title       = "Entorns de desenvolupament"
description = "Entorns de desenvolupament recomanats compatibles amb les Plataformes Cloud"
sections    = "Container Cloud"
weight      = 7
categories  = ["cloud","docker","container","paas"]
+++

## AppAgile

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/) basades en OpenShift 3.x, es recomana utilitzar [Minishift](https://www.okd.io/minishift/). La versió a instal·lar ha de ser compatible amb la versió d'OpenShift.

**Plataforma Cloud**  | **Versió Openshift**   | **Versió Minishift compatible**
------------ | ------------ | ------------
CPD4 AppAgile (privat)  |  3.9.65  | v1.16.1 o superior

Podeu trobar més informació a :
- https://docs.okd.io/3.11/minishift/getting-started/preparing-to-install.html
- https://github.com/minishift/minishift/releases

## Openshift 4

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/) basades en OpenShift 4, es recomana utilitzar [Codeready](https://developers.redhat.com/products/codeready-containers/overview). La versió a instal·lar ha de ser compatible amb la versió d'OpenShift 4.

**Plataforma Cloud**  | **Versió Openshift**   | **Versió Codeready compatible**
------------ | ------------ | ------------
CPD4 Openshift 4 (privat)  |  4.3  | v1.11.0 o superior
CPD3 Openshift 4 (privat)  |  4.3  | v1.11.0 o superior

Podeu trobar més informació a :
- https://code-ready.github.io/crc/
- https://cloud.redhat.com/openshift/install/crc/installer-provisioned
- https://mirror.openshift.com/pub/openshift-v4/clients/crc/1.11.0/
<br/><br/>

## Bluemix - kubernetes

En el cas de Bluemix:

* Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/) basades en Kubernetes, es recomana utilitzar [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/)

La versió a instal·lar de Kubernetes i  Docker en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/).


**Plataforma Cloud**  | **Versió Kubernetes**   |  **Versió Minikube**
------------ | ------------ | ------------
Bluemix - Kubernetes  |  1.16.10  | v1.4 o superior

## IBM CaaS

En el cas de IBM CaaS:

Per les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/) basades en Kubernetes, es recomana utilitzar [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/)

La versió a instal·lar de Kubernetes i Docker en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/).

**Plataforma Cloud**  | **Versió Kubernetes**   |  **Versió Minikube**
------------ | ------------ | ------------
CaaS - Kubernetes  |  1.14.8  | v1.0 o superior

## SwarmMe

Per les Plataformes Cloud basades en Swarm, es recomana utilitzar  [docker-compose](https://docs.docker.com/compose/) o [docker Swarm]((https://docs.docker.com/engine/swarm/))

La versió a instal·lar de docker-compose en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes-cloud/).

**Plataforma Cloud**  | **Versió Docker**   | **Versió Docker-compose**
------------ | ------------ | ------------
CPD1 SwarmMe (privat)	| 18.9.6 | 1.20.0

