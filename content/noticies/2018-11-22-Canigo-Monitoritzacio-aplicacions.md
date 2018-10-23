+++
date        = "2018-10-22"
title       = "Canigó. Monitorització d'aplicacions"
description = "En aquest article s'analitzen les opcions que existeixen a l'actualitat per la monitorització d'aplicacions Canigó"
sections    = ["noticies"]
categories  = ["canigo"]
key         = "NOVEMBRE2018"
+++

En aquest article es vol fer un recordatori de les diferents funcionalitats que ofereix el framework Canigó per tal de monitoritzar les aplicacions. Aquestes funcionalitats estan agrupades dins els mòduls "canigo.operation":

* **canigo.operation.instrumentation**

Gràcies a aquest mòdul l'aplicació pot expossar mètriques de número de peticions, temps de resposta, i errors els quals poden ser visualitzats fàcilment en un time-line.

![Instrumentació Canigó](/images/news/instrumentacio-canigo.png)

També pot ajudar a conèixer l'estat d'algun servei amb que s'hagi d'integrar l'aplicació (Ex. base de dades, ldap, ...).

_Documentació de referència_: https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-instrumentacio/

* **canigo.operation.logging**

El mòdul d'administració de logs permet visualitzar traces en temps real gràcies a la tecnologia WebSockets, canviar el nivell de logs en calent, realitzar cerques, i descàrrega dels fitxers de log generats per l'aplicació.

_Documentació de referència_: https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-logging-admin/

## Roadmap

En en roadmap de Canigó està previst incorporar alguna llibreria com [Metrics](https://metrics.dropwizard.io/) o estàndar com [Micrometer](https://micrometer.io/) mitjançant [Spring](https://spring.io/blog/2018/03/16/micrometer-spring-boot-2-s-new-application-metrics-collector) com a evolució de l'actual mòdul d'instrumentació. A més d'una consola de monitorització bàsica de l'aplicació, també es vol donar l'opció d'integrar les mètriques d'aplicacions Canigó amb eines centralitzades tipus [Prometheus](https://prometheus.io/) o [New Relic](https://newrelic.com/), a més del Centre de Control de CTTI on poder tenir una visió general de l'estat de les aplicacions.

## Plataformes Container Cloud

A més de la pròpia monitorització de l'aplicació, cal tenir en compte que plataformes com Cloud Foundry o orquestradors Docker com Kubernetes proporcionen funcionalitats de monitorització de consum de recursos i visualització de logs.

**Cloud Foundry**

![CloudFoundry Monitoring](/images/news/cloudfoundry-monitoring.png)

**Dashboard Kubernetes**

![Kubernetes Monitoring](/images/news/kubernetes-monitoring.png)

L'objectiu d'aquesta monitorització, ja sigui a nivell d'aplicació o PaaS/Docker, és tenir el màxim d'informació de l'estat de l'aplicació. L'agilitat en poder fer un diagnòstic quan hi ha un problema a una aplicació és molt important, així com definir un pla de capacitat en funció dels recursos que requereixi l'aplicació amb caràcter preventiu.
