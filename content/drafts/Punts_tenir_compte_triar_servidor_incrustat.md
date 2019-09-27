+++
date        = "2019-09-27"
title       = "Punts a tenir en compte a l'hora de triar un servidor incrustat"
description = "Punts a tenir en compte a l'hora de triar un servidor incrustat en una aplicació Canigó"
sections    = "Canigó"
+++


## Introducció

Canigó està basat en Spring i Spring boot, per tant, en una aplicació Canigó es poden utilitzar les funcionalitats de servidors incrustats que porta Spring boot.

Això permet desplegar una aplicació Canigó amb el seu propi servidor. Sent una aplicació autocontinguda especialment útil en entorns de desenvolupament o cloud.

Per a aplicacions que utilitzin l'stack de servlets, Spring Boot inclou els servidors incrustats: Tomcat, Jetty i Undertow

Per a aplicacions que utilitzin l'stack reactiu, Spring Boot inclou els servidors incrustats: Tomcat, Jetty, Undertow i Reactor Netty

![Spring MVC Webflux Venn](https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/images/spring-mvc-and-webflux-venn.png)

Les versions actuals que incorpora Spring Boot són:

|     	Servidor incrustat					|      				Versió					     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0.16	             			|
|  Undertow				          	  	 	|         2.0.17.Final         			|
|  Jetty			  		        	  	 	|         9.4.14.v20181114    			|
|  Netty (webflux)									|         4.1.33.Final        			|
|  Reactor Netty (reactor webflux)  |         0.8.5.RELEASE       			|

Aquestes versions poden variar segons la versió de Spring Boot utilitzada

## Punts a tenir en compte

Anem a llistar els diferents punts a tenir en compte a l'hora de triar un servidor incrustat per una aplicació Canigó

### Funcionalitats a utilitzar

El més important a l'hora de seleccionar una servidor d'aplicacions és tenir clar quines funcionalitats i necessitats té l'aplicació ja que no tots els servidors d'aplicacions implementen tot els stack de Java EE 8 o Java SE 8

Si una aplicacació té una necessitat especial és necessari revisar la documentació del servidor d'aplicacions per si aquesta necessitat està coberta pel servidor d'aplicacions incrustat que es vol utilitzar

La documentació dels servidors d'aplicacions està a:

[Tomcat](http://tomcat.apache.org/tomcat-9.0-doc/)

[Jetty](https://www.eclipse.org/jetty/documentation/)

[Undertow](http://undertow.io/documentation.html)

[Reactor Netty](https://projectreactor.io/docs/netty/release/reference/index.html)

A part de l'stack que implementa un servidor o un altre, un altre punt important a tenir en compte és la comunitat que hi ha darrera de cada servidor ja que això pot condicionar la rapidesa en la correció de bugs o sol·lució a problemes

Per últim, la principal diferència tecnològica entre un servidor i un altre que implementin el mateix stack tecnològic que utilitzarem a una aplicació és la seva lleugueresa, consum de memòria i/o escabilitat

Tenint en compte aquests punts, anem a llistat-los en cada un dels servidors d'aplicacions

### Tomcat

- El més popular servidor d'aplicacions amb suport de Apache

- Ben documentat amb una gran i forta comunitat de desenvolupadors utilitant-lo

- Suporta Java EE 8, Servlet 4.0, JSP 2.3, EL 3.0, WebSocket 1.1, JASPIC 1.1, HTTP/2, OpenSSL per TLS amb els connectos JSSE i TLS virtual hosting (SNI)

- Flexible i extensible a una versió Enterprise

### Jetty

- Suport de la comunitat eclipse amb gran suport

- Menys utilitzat en producció que Tomcat

- Utilitzat en alguns frameworks com GWT, JRuby, Grails i Scala/Lift

- Suporta Java EE 7, Servlet 3.1, JSP 2.3, EL 3.0, JSTL 1.2, JTA 1.2, WebSocket 1.0 i altres amb extensions

- Utilitza menys memòria que Tomcat, és menys pesat i proporciona més velocitat a l'escalat

- És petit i eficient amb poca necessitat de manteniment

### Undertow

- Suport de la comunitat JBoss i RedHad

- Utilitzat dins del servidor d'aplicacions Wildly

- És el que té menys documentació i menys comunitat darrera

- Suporta Servlet 4.0, HTTP/2 i WebSocket 1.1 

- És el servidor web incrustat més lleuguer, amb menys consum de memòria i amb una resposta més ràpida en peticions HTTP com les utilitzades en serveis Rest

- Per defecte està habilitada la persistencia de les connexions http. Això és una funcionalitat important a poder ser utilitzada per clients que suportin persistència en les connexions http per incrementar el rendiment

### Reactor Netty

- És part del projecte Reactor i està basat en el servidor Netty

- És el servidor més utilitzat en aplicacions reactives

- Està en evolució

- Suporta streams reactius, model de concurrència i bucle d'events, non blocking i backpressure-ready sobre TCP, UDP i HTTP i proporciona servidor http sobre HTTP/2 

- És el servidor a utilitzar si es vol utilitzar funcionalits de servidor o client amb reactiu 

## Documentació:

- http://tomcat.apache.org

- https://www.eclipse.org/jetty

- http://undertow.io

- https://projectreactor.io/docs/netty/release/reference/index.html

- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-web-servers.html

- https://examples.javacodegeeks.com/enterprise-java/spring/tomcat-vs-jetty-vs-undertow-comparison-of-spring-boot-embedded-servlet-containers/

- https://www.baeldung.com/spring-boot-servlet-containers


