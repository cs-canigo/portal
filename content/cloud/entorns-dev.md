+++
date        = "2017-06-09"
title       = "Entorns de desenvolupament"
description = "Entorns de desenvolupament recomanats compatibles amb les Plataformes Cloud"
sections    = "Container Cloud"
weight      = 7
categories  = ["cloud","docker","container","paas"]
+++

## Openshift

Per les Plataformes Cloud basades en OpenShift, es recomana utilitzar [Minishift](https://www.openshift.org/minishift/).
La versió a instal·lar en entorns de desenvolupament ha de ser compatible amb la versió d'Openshift de les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/).

## Bluemix

En el cas de Bluemix:

* _Contenidors_: per els contenidors Docker es pot treballar amb l'engine [Docker](https://www.docker.com/community-edition/) i [Docker Compose](https://docs.docker.com/compose/) directament, sense necessitat de cap orquestrador específic ni plataforma "minimalista".
* _Apps_: per les apps (xPaaS de CloudFoundry) es recomana utilitzar [PCF Dev](https://pivotal.io/pcf-dev)

La versió a instal·lar de Docker, Docker-Compose, PCF DEV i en entorns de desenvolupament, ha de ser compatible amb la versió utilitzada en les [Plataformes Cloud](http://canigo.ctti.gencat.cat/cloud/plataformes/).
