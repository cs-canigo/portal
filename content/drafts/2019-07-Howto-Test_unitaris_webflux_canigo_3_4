+++
date        = "2019-07-24"
title       = "Test unitaris amb Webflux a Canigó 3.4"
description = "How to per crear test unitaris amb Webflux a Canigó 3.4"
section     = "howtos"
categories  = ["canigo"]
key         = "AGOST2019"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de crear test unitaris a serveis desenvolupats amb WebFlux proporcionat a la versió 3.4.0 de Canigó.

### Introducció WebFlux

Amb la publicació de Canigó 3.4.0 es proporciona suport a Spring 5, proporcionant les funcionalitats de WebFlux

Teniu disponible la documentació de WebFlux de Canigó 3.4 a [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/)

Spring WebFlux proporciona endpoints web de forma funcional, on les funcions són utilitzades per enrutar i capturar peticions

Per a més informació sobre programació funcional amb Spring 5 podeu consultar: https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html#webflux-fn

### Introducció test WebFlux

### Introducció cas d’exemple

Per a aquesta guia utilitzarem els serveis exposats amb WebFlux seguint la guia [modul-webFlux](/canigo-documentacio-versions-3x-altres/modul-webFlux/)

El cas d'exemple consta d'un repositori de dades on hi contindrà missatges homòlegs a un tweet, on tindrà un id, un text i una data de creació

Pel repositori de dades utilitzarem una base de dades Mongodb

En el cas d'exemple s'exposen 2 serveis amb WebFlux, obtenir tots els tweets i obtenir un tweet pel seu id, mitjançant la definició de l’enrutament directament a les “RouterFuntions” en el path “/route-flux/tweets” i s'exposen aquests mateixos serveis mitjançant “Handlers” en l’enrutament de les “RouterFuntions” en el path “/handler-flux/tweets”

Realitzarem test unitaris d'aquests 4 serveis amb Webflux 

### Test unitaris serveis WebFlux cas d'exemple

