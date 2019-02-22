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

<br />
### Canigó 3.4.0 (LTS)

En aquesta versió es realitzarà una actualització tecnològica del framework per tal d'anar a versions suportades de Java i Spring principalment, i donar suport a nous paradigmes de programació. També s'inclou l'actualització del connector amb la Plataforma de Serveis de Gestió Documental (PSGD), també coneguda com a ARESTA.

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

En aquesta versió es persegueix principalment certificar el framework Canigó 3.4.x amb els servidors suportats al [full de ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/). També fer difusió i millorar la productivitat dels equips de desenvolupament permetent la generació d'aplicacions Canigó 3.4.x mitjançant l'[entorn de desenvolupament de Canigó](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/).

**Productivitat**

* Actualització plugin Eclipse Canigó
* Actualització entorn de desenvolupament

**Arquitectura**

* Certificació amb servidors del full de ruta del CTTI

**How-to's**

* Spring profile amb Canigó
* Exemples de programació amb streams reactius, programació reactiva, programació funcional

### Canigó 3.5.0 (Interna)

En aquesta versió interna, no destinada a entorns productius, es realitzarà un pilot d'arquitectura de microserveis.

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

En aquesta versió interna, no destinada a entorns productius, es realitzarà un pilot amb una aplicació Canigó per integrar-la amb serveis centralitzats de telemetria i traces, així com afegir-hi tests amb el suport d'entorns dockeritzats. També es planteja un nou generador d'aplicacions Canigó de l'estil [Spring Initializr](https://start.spring.io/) totalment agnòstic de l'IDE de desenvolupament.

**Pilot**

* Ampliació de la telemetria d’una aplicació (Prometheus, Grafana, ...)
* Ampliació de l’explotació traces d’una aplicació (Logstash, Elastic Search, Kibana)
* Ampliació execució test amb containers (Testcontainers, VuGen)

**Productivitat**

* Generació de projecte Canigó a partir de web inicialitzadora

<br />
A banda del framework Java, des del CS Canigó s'estan avaluant altres iniciatives com proporcionar mòduls de suport a frontends web amb la finalitat d'estandaritzar i facilitar tant el desenvolupament com la integració amb el SIC (construcció, test, desplegament).

<br />
Per qualsevol suggerència o consulta relativa a aquest roadmap podeu obrir un tiquet al servei [CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del CSTD, o enviar un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
