+++
date        = "2019-11-29"
title       = "Canigó. Punts a tenir en compte a l'hora de triar un servidor incrustat"
description = "Llistat dels diferents punts a tenir en compte a l'hora de triar un servidor incrustat per una aplicació Canigó."
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "DESEMBRE2019"
+++


## Introducció

Canigó està basat en Spring i Spring Boot, per tant, en una aplicació Canigó es poden utilitzar les funcionalitats de servidors incrustats que porta Spring Boot. Això permet desplegar una aplicació Canigó amb el seu propi servidor, sent una aplicació autocontinguda especialment útil en entorns de desenvolupament o _cloud_.

En funció de l'_stack_ que utilitzin les aplicacions, Spring Boot inclou uns o altres servidors incrustats:

- _Stack_ de _servlets_: Tomcat, Jetty i Undertow.
- _Stack_ reactiu: Tomcat, Jetty, Undertow i Reactor Netty.

![Spring MVC Webflux Venn](https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/images/spring-mvc-and-webflux-venn.png)

Les versions actuals que incorpora Spring Boot són:

|     	Servidor incrustat					|      				Versió					     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0.16	             			|
|  Undertow				          	  	 	|         2.0.17.Final         			|
|  Jetty			  		        	  	 	|         9.4.14.v20181114    			|
|  Netty (webflux)									|         4.1.33.Final        			|
|  Reactor Netty (reactor webflux)  |         0.8.5.RELEASE       			|

Aquestes versions poden variar segons la versió de Spring Boot utilitzada.

## Punts a tenir en compte

El més important a l'hora de seleccionar un servidor d'aplicacions incrustat és tenir clar quines funcionalitats i necessitats té l'aplicació, ja que no tots els servidors d'aplicacions implementen tot els _stack_ de Java EE 8 o Java SE 8.  Si una aplicació té alguna necessitat especial, cal revisar la documentació del servidor per determinar si aquesta està coberta pel que es vol utilitzar, en els següents enllaços trobarà aquesta informació:

- [Tomcat](http://tomcat.apache.org/tomcat-9.0-doc/)
- [Jetty](https://www.eclipse.org/jetty/documentation/)
- [Undertow](http://undertow.io/documentation.html)
- [Reactor Netty](https://projectreactor.io/docs/netty/release/reference/index.html)

A part de l'_stack_ que implementa cada servidor d'aplicacions, un altre punt important a tenir en compte és la comunitat que hi ha darrere de cadascun d'ells, ja que això pot condicionar la rapidesa en la correcció de _bugs_ o solució a problemes.

Per últim, la principal diferència tecnològica entre un servidor i un altre que implementin el mateix _stack_ tecnològic que utilitzarem a una aplicació és la seva lleugeresa, consum de memòria i/o escalabilitat.

A continuació detallem cadascun dels possibles servidors incrustats per una aplicació Canigó, tenint en compte les funcionalitats esmentades anteriorment:

### Tomcat

Tomcat és el servidor d’aplicacions més popular i compta amb suport d'Apache. És un programari de codi obert, molt ben documentat i mantingut per una gran comunitat de desenvolupadors, és flexible i extensible a una versió Enterprise.

Suporta Java EE 8, Servlet 4.0, JSP 2.3, EL 3.0, WebSocket 1.1, JASPIC 1.1, HTTP/2, OpenSSL per TLS amb els connectors JSSE i TLS virtual hosting (SNI).

### Jetty

Jetty és un servidor d'aplicacions de codi lliure i obert que té el suport de la comunitat Eclipse. Utilitza menys memòria que Tomcat, és senzill, menys pesat i per tant, proporciona més velocitat a l'escalat. És eficient i amb poca necessitat de manteniment. S'utilitza en alguns frameworks com GWT, JRuby, Grails i Scala/Lift.

Suporta Java EE 7, Servlet 3.1, JSP 2.3, EL 3.0, JSTL 1.2, JTA 1.2, WebSocket 1.0 i altres amb extensions.

### Undertow

Undertow és el servidor web incrustat més lleuger, amb menys consum de memòria i amb una resposta més ràpida en peticions HTTP com les emprades en serveis Rest. Undertow és utilitzat dins del servidor d'aplicacions WildFly i té el suport de les comunitats JBoss i Red Hat, tot i això, és el que té menys documentació i menys comunitat darrera.

Suporta Servlet 4.0, HTTP/2 i WebSocket 1.1. 

Per defecte està habilitada la persistència de les connexions http. Funcionalitat important a tenir en compte, per a clients que suportin persistència en les connexions http per incrementar el rendiment.

### Reactor Netty

Reactor Netty està en evolució, és part del projecte Reactor i està basat en el servidor Netty el qual és el servidor més utilitzat en aplicacions reactives i per tant, és el servidor a utilitzar si es vol funcionalitats de servidor o client amb reactiu.

Suporta _streams_ reactius, model de concurrència i bucle d'_events_, _non blocking_ i _backpressure-ready_ sobre TCP, UDP i HTTP i proporciona servidor http sobre HTTP/2.

## Documentació de referència:

En els següents enllaços pot trobar informació addicional tant dels servidors d'aplicacions de Canigó com també d'algunes comparatives que el poden ajudar a escollir el més adequat per cada aplicació:

- http://tomcat.apache.org

- https://www.eclipse.org/jetty

- http://undertow.io

- https://projectreactor.io/docs/netty/release/reference/index.html

- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-web-servers.html

- https://examples.javacodegeeks.com/enterprise-java/spring/tomcat-vs-jetty-vs-undertow-comparison-of-spring-boot-embedded-servlet-containers/

- https://www.baeldung.com/spring-boot-servlet-containers

