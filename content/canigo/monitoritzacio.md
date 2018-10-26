+++
date        = "2018-10-22"
title       = "Canigó. Monitorització d'aplicacions"
description = "Opcions que existeixen a l'actualitat per la monitorització d'aplicacions Canigó"
taxonomies  = []
sections    = "Canigó"
key         = "NOVEMBRE2018"
weight 		  = 6
+++

En aquesta plana s'enumeren les diferents funcionalitats que ofereix el framework Canigó per tal de monitoritzar les aplicacions. Aquestes funcionalitats es proporcionen als mòduls Canigó amb prefix "canigo.operation".

### Instrumentació (canigo.operation.instrumentation)

Gràcies a aquest mòdul l'aplicació pot expossar mètriques de número de peticions, temps de resposta, i errors els quals poden ser visualitzats fàcilment en un time-line.

![Instrumentació Canigó](/images/news/instrumentacio-canigo.png)

_Documentació de referència_: https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-instrumentacio/

### Administració de logs (canigo.operation.logging)

El mòdul d'administració de logs permet visualitzar traces en temps real gràcies a la tecnologia WebSockets, canviar el nivell de logs en calent, realitzar cerques, i descàrrega dels fitxers de log generats per l'aplicació.

_Documentació de referència_: https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-logging-admin/

#### Configuració nivell de logs

![Configuració de logs Canigó](/images/news/configuracioNivellLogs.PNG)

#### Visualització de logs

![Visualització de logs Canigó](/images/news/VisualitzacioLogs.PNG)

### Roadmap

En en roadmap de Canigó està previst incorporar alguna llibreria com [Metrics](https://metrics.dropwizard.io/) o estàndar com [Micrometer](https://micrometer.io/) mitjançant [Spring](https://spring.io/blog/2018/03/16/micrometer-spring-boot-2-s-new-application-metrics-collector) com a evolució de l'actual mòdul d'instrumentació. A més d'una consola de monitorització bàsica de l'aplicació, també es vol donar l'opció d'integrar les mètriques d'aplicacions Canigó amb eines tipus [Prometheus](https://prometheus.io/) o [New Relic](https://newrelic.com/), a més del Centre de Control de CTTI on poder tenir una visió general de l'estat de les aplicacions.

### Plataformes Container Cloud

A més de la pròpia monitorització de l'aplicació, cal tenir en compte que plataformes com Cloud Foundry (PaaS) o orquestradors Docker com Kubernetes (CaaS) proporcionen les seves pròpies eines de monitorització de consum de recursos i visualització de logs.

L'objectiu d'aquesta monitorització, ja sigui a nivell d'aplicació (temps de resposta, integracions, ...) o PaaS/CaaS (cpu, mem, disc), és tenir el màxim d'informació de l'estat del servei. L'agilitat en poder fer un diagnòstic quan hi ha un problema a una aplicació és molt important, així com definir un pla de capacitat i/o escalat automàtic en funció dels recursos que requereixi l'aplicació amb caràcter preventiu.
