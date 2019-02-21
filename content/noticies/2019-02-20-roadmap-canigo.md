+++
date        = "2019-02-20"
title       = "Canigó. Roadmap del framework"
description = "En aquesta notícia presentem el roadmap previst per les properes versions del framework Canigó"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "MARC2019"
+++

En aquesta notícia presentem el roadmap previst per les properes versions del framework Canigó:

![canigo-roadmap](/images/news/canigo-roadmap.PNG)

### Canigó 3.4.0 (LTS)

**Actualització tecnologies base**

* Java 9
* Spring 5.0.7.RELEASE
* Spring Boot 2.1.0.RELEASE
* Spring Security 5.0.3.RELEASE

**Arquitectura**

* Possibilitat d’utilització de profiles de Spring
* Programació amb estàndard de Streams Reactius
* Programació reactiva (Spring WebFlux)
* Programació funcional (Spring WebFlux)
* Suport servidors incrustats amb suport a reactiu (Jetty, Undertow)
* Certificació amb servidors embeguts (Spring Boot)

**Connectors**

* Actualització connector amb ARESTA

### Canigó 3.4.1

**Productivitat**

* Actualització plugin Eclipse Canigó
* Actualització entorn de desenvolupament

**Arquitectura**

* Certificació amb servidors del full de ruta del CTTI

**How-to's**

* Spring profile amb Canigó
* Exemples de programació amb streams reactius, programació reactiva, programació funcional

### Canigó 3.5.0 (Interna)

**Pilot**

* Aplicació amb microserveis
* Integració amb peces d’un sistema de microserveis
    * Configuration service (Consul, Spring Cloud Config Server, ...)
    * Discovery service (Consul, Eureka Server, ...)
    * Gateway service (Zuul proxy, Ribbon, Istio, ...)
    * Acces control service (Spring Session, Istio, ...)
    * Cache distribuida (Hazelcast, redis, ...)
    * Client balancing (Ribbon, Hystrix, Turbine, Istio, ...)
    * Telemetria (Prometheus, Grafana, ...)
    * Traces distribuides (Zipkin)
    * Explotació traces (Logstash, Elastic Search, Kibana)

### Canigó 3.5.1 (Interna)

**Pilot**

* Ampliació de la telemetria d’una aplicació (Prometheus, Grafana, ...)
* Ampliació de l’explotació traces d’una aplicació (Logstash, Elastic Search, Kibana)
* Ampliació execució test amb containers (Testcontainers, VuGen)

**Productivitat**

* Generació de projecte Canigó a partir de web inicialitzadora

A banda del framework Java, des del CS Canigó s'estan avaluant altres iniciatives:

**CanigoJS**: mòduls de suport a desenvolupament de frontends. Estandarització del desenvolupament i facilitat d'integració amb el SIC

...

Per qualsevol suggerència o consulta relativa a aquest roadmap podeu obrir un tiquet al servei CAN del CSTD, o enviar un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
