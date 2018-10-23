+++
date        = "2018-10-22"
title       = "Canigó. Monitorització d'aplicacions"
description = "En aquest article s'analitzen les opcions que existeixen a l'actualitat per la monitorització d'aplicacions Canigó"
sections    = ["noticies"]
categories  = ["canigo"]
key         = "NOVEMBRE2018"
+++

En aquest article es vol fer un recordatori de les diferents funcionalitats que ofereix el framework Canigó per tal de monitoritzar les aplicacions. Aquestes funcionalitats estan agrupades dins els mòduls "canigo.operation":

* _canigo.operation.instrumentation_:



* _canigo.operation.logging_: 


## Roadmap

En en roadmap de Canigó està previst incorporar alguna llibreria com [Metrics](https://metrics.dropwizard.io/) o estàndar com [Micrometer](https://micrometer.io/) mitjançant [Spring](https://spring.io/blog/2018/03/16/micrometer-spring-boot-2-s-new-application-metrics-collector) com a evolució de l'actual mòdul d'instrumentació. A més d'una consola de monitorització bàsica de l'aplicació, també es vol integrar les aplicacions Canigó amb eines centralitzades tipus Prometheus o New Relic, a més del Centre de Control de CTTI on poder tenir una visió general de l'estat de les aplicacions.

## Plataformes Container Cloud

A més de la pròpia monitorització de l'aplicació, cal tenir en compte que plataformes com Cloud Foundry o orquestradors Docker com Kubernetes proporcionen funcionalitats de monitorització de consum de recursos i visualització de logs.



L'objectiu final és poder oferir les facilitats necessaries als proveïdors d'aplicacions i personal CTTI 
