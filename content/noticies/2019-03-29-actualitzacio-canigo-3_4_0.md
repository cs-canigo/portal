+++
date        = "2019-03-25"
title       = "Canigó. Publicació versió 3.4.0"
description = "S'ha publicat una nova versió de Canigó donant suport a Spring 5, Spring Boot 2 i nous paradigmes de programació. També s’inclou l’actualització del connector amb la Plataforma de Serveis de Gestió Documental (PSGD)"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "ABRIL2019"
+++

## Propòsit

Amb l’alliberament de la versió 3.4 del framework Canigó s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes versions suportades de Java i Spring, a més de permetre nous paradigmes de programació.

Com a afegit, a la versió 3.4 també s’inclou l’actualització del connector amb la Plataforma de Serveis de Gestió Documental (PSGD), també coneguda com a ARESTA.

## Actualització tecnologies base

### Java 11

El Setembre de 2018, Oracle va publicar la versió 11 de Java, la primera versió LTS amb la nova política de sis mesos de cicle de suport. Podeu consultar la documentació d'aquesta versió, així com les seves release notes al següent [enllaç](https://www.oracle.com/technetwork/java/javase/11-relnotes-5012447.html).

Des del CS Canigó, s'ha certificat la compatibilitat de Canigó 3.4.0 amb aquesta versió Java 11. També s'ha certificat la compatibilitat de Canigó 3.4.0 amb la nova imatge Docker per a Java 11 disponible al [catàleg de components de Suport Cloud](/cloud/cataleg/) 

### Spring 5

Spring Framework ofereix un model complet de programació i configuració per a aplicacions empresarials basades en Java. Spring 5 és la primera gran entrega de Spring Framework des de la versió 4 publicada el Desembre de 2013.

El principal objectiu de Spring 5 és proporcionar els nous paradigmes de programació amb programació funcional (webflux) i programació reactiva.

A més, el resum d'actualitzacions que incorpora són les següents:

### Principals actualitzacions de la línia base:
- Java SE 8+ Java EE 7+
- JDK 8
- Servlet 3.1
- Bean validation 1.1
- JPA 2.1
- JMS 2.0
- Millores en el test

### Principals extensions de la línia base
- Java EE 8
- Servlet 4.0
- Bean validation 2.0
- JPA 2.2
- JMS 2.0
- JSON Bingdins API 1.0
- Hibernate validator 6.0
- Apache Johnzon 1.1
- Refinat de la interacció amb resouces amb NIO.2

Segons estudis realitzats a 5.160 desenvolupadors a finals del 2018, el 24% de les aplicacions que utilitzaven Spring ja utilitzaven la versió 5.

### Spring Boot 2

Spring Boot, al igual que Canigó, proporciona eines pel desenvolupament fàcil d'aplicacions empresarials amb el mínim possible de configuració.

Spring Boot 1 acaba la seva línia de desenvolupament i manteniment a l'Agost del 2019.

Spring Boot 2 el seu principal objectiu és donar suport a Spring 5, Java 8 a la seva línia base i l'actualització de les versions de les seves dependències així com també actualització dels seus servidors suportats.

Segons estudis realitzats a 5.160 desenvolupadors a finals del 2018, amb pocs mesos des de la seva publicació, el 30% de les aplicacions que utilitzaven Spring Boot utilitzaven la versió 2,

Amb l'actualització a Spring Boot 2, Canigó 3.4.0 proporciona una actualitzada, potent, fàcil i productiva eina de creació d'aplicacions amb Java.

## Arquitectura

A la versió 3.4.0 de Canigó amb Spring 5 i Spring Boot 2 es proporciona les següents funcionalitats:

### Configuració propietats amb yaml

YAML és un estàndard de format fàcilment llegible que significa "YAML Ain't Markup Language", per a més informació es pot consultar el següent [enllaç](https://yaml.org/).

A la versió Canigó 3.4.0 es proporciona la funcionalitat de càrrega de propietats definides a fitxers yaml.

L'objectiu d'aquest canvi és utilitzar un estàndard més actual i llegible per a la definició de les propietats de les aplicacions i poder, en properes versions de Canigó, utilitzar totes les funcionalitats de configuració de propietats de Spring.

Per a aplicacions amb Canigó 3.4, es recomana passar les propietats definides en format properties a format yaml.

En properes versions de Canigó s'eliminarà l'actual funcionalitat de configuració de propietats pròpia de Canigó, per utilitzar les funcionalitats de configuració de propietats estàndard de Spring.

Per a més informació podeu consultar la documentació del [Mòdul de configuració](/canigo-documentacio-versions-3x-core/modul-configuracio/).

### Programació amb estàndard de Streams Reactius

Introduïts a la versió 8 de Java, els Streams són utilitzats pel processament eficient de col·leccions d'objectes.

Streams Reactius és un estàndard per al processament de streams asíncrona, amb contrapressió i no bloquejant. L’estàndard es defineix al [Manifest Reactiu](http://www.reactive-streams.org/)

El resum d'aquest estàndard seria que es crea un fluxe on existeix un publicador i un consumidor. El publicador va publicant elements al fluxe a la velocitat que el consumidor les consumeix, sense que hi hagi un bloqueig per part del publicador, ni una contrapressió pel consumidor.

[//]: # (https://alexandreesl.com/tag/reactive-streams/)
![Reactive streams](https://canigo.ctti.gencat.cat/noticies/reactive-streams.png)

El resum de passos per una comunicació reactiva serien:
1. El productor (o publicador) es subscriu amb un consumidor (o subscriptor)
2. El consumidor quan està llest li indica al productor
3. El productor li envia elements al consumidor
4. El consumidor processa els elements i li demana més elements o cancel·la la petició al productor

Spring 5 utilitza el projecte [Reactor](https://projectreactor.io/) per a crear sistemes reactius eficients.

### Programació reactiva

Spring 5 proporciona les funcionalitats per a la programació reactiva utilitzant l'estàndard de Streams Reactius.

L'objectiu és proporcionar eines per a crear aplicacions no bloquejants, que siguin asíncrones, orientades a esdeveniments i que requereixin d'un nombre reduït de fils.

Amb el nou mòdul Spring Web Reactive, Spring proporciona un model de programació tradicional amb Model-Vista-Controlador (MVC), però executat amb reactiu i no bloquejant. A la imatge següent es mostra una comparativa entre Spring MVC i Spring Web Reactive:

![Web Reactive overview](https://docs.spring.io/spring-framework/docs/5.0.0.M1/spring-framework-reference/html/images/web-reactive-overview.png)

Un exemple pràctic on podrien actuar els Streams Reactius seria quan tenim un repositori de dades (que actua com a productor) que produeix dades que un servidor HTTP (que actua com a consumidor) escriu com a resposta. En l'exemple, el principal propòsit dels Streams Reactius seria delegar al servidor HTTP el control de com de ràpid o lent el repositori de dades ha de proporcionar les dades.

Els endpoints web de Spring MVC i WebFlux suporten reactiu com a retorn, però WebFlux, a més, proporciona suport per entrada de dades reactiva. Per a que un repositori de dades suporti reactiu el seu driver ha de ser no bloquejant (non-blocking). Els drivers de bases de dades que actualment proporcionen non-blocking, són: MongoDB, Redis, Cassandra i Couchbase.

Per a mostrar com utilitzar reactiu amb un repositori de dades s'ha publicat la següent guia d'[Utilització de mongo reactiu](/canigo-documentacio-versions-3x-altres/modul-mongo-reactiu/).

Per a més informació sobre programació reactiva amb Spring 5 podeu consultar aquest [enllaç](https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html).

### Programació funcional (WebFlux)

La programació funcional va néixer per poder proporcionar un desenvolupament orientat a l'aplicació de funcions declarades.

Spring WebFlux proporciona endpoints web de forma funcional a més dels controladors tradicionals, proporcionant un lleuger model de programació funcional on les funcions són utilitzades per enrutar i capturar peticions a més de la tradicional programació imperativa.

A la següent imatge es pot observar la comparativa de funcionalitats entre Spring MVC i Spring WebFlux:

![Spring MVC Webflux Venn](https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/images/spring-mvc-and-webflux-venn.png)

Spring WebFlux està suportat a Tomcat, Jetty, Netty, Undertow i contenidors Servlet 3.1+.

Per a mostrar com utilitzar aquest nou paradigma de programació web s'ha publicat la guia [Utilització de web flux](/canigo-documentacio-versions-3x-altres/modul-webFlux/).

Per a més informació sobre programació funcional amb Spring 5 podeu consultar aquest [enllaç](https://docs.spring.io/spring-framework/docs/5.1.5.RELEASE/spring-framework-reference/web-reactive.html#webflux-fn).

### Spring MVC o WebFlux

Els següents punts són un resum del què s'han de tenir en compte a l'hora de decidir-se per utilitzar Spring MVC o WebFlux en una aplicació:

- Si l'aplicació amb Spring MVC funciona correctament, no hi ha necessitat de canvi

- Si necessites un web stack amb non-blocking, Spring WebFlux et proporcionarà el màxim de funcionalitats reactives

- Si necessites una aplicació el més lleugera possible, amb programació web funcional i utilització de lambdas de Java 8, Spring Web flux et proporcionarà endpoint web funcionals

- Si l'aplicació utilitza apis de persistència bloquejants (JPA, JDBC) o apis externes bloquejants, Spring MVC és la millor solució

- Encara que l'aplicació hagi d'estar basada en Spring MVC, els controladors de Spring MVC poden cridar a altres components reactius com serveis remots o repositoris de dades no bloquejants.

Si teniu dubtes a l'hora de decidir si utilitzar Spring MVC o WebFlux, podeu posar-vos en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat) per tractar el vostre cas.

### Certificació amb servidors incrustats (Spring Boot)

S'ha certificat la compatibilitat de Canigó 3.4.0 amb els següents servidors incrustats amb Spring Boot:

|     	Servidor incrustat					|      				Versió					     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0.16	             			|
|  Undertow				          	  	 	|         2.0.17.Final         			|
|  Jetty			  		        	  	 	|         9.4.14.v20181114    			|
|  Netty (webflux)									|         4.1.33.Final        			|
|  Reactor Netty (reactor webflux)  |         0.8.5.RELEASE       			|

Per la següent versió de Canigó es certificarà Canigó 3.4.x amb els servidors suportats al [full de ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/)

Per més informació podeu consultar aquest [enllaç](/canigo/download/).

## Connectors

Com a afegit, a la versió 3.4.0 s'ha actualitzat el següent mòdul d'integració:

### ARESTA

L'objectiu d'aquest connector és proporcionar un punt d’accés cap a la Plataforma de Serveis de Gestió Documental (PSGD), també coneguda com a ARESTA, facilitant a les aplicacions l’ús d'aquesta plataforma.

A la versió 3.4.0 de Canigó, s'ha alineat el connector amb PSGD o ARESTA a la versió 6.0.

Podeu consultar la documentació d'aquest connector a [Mòduls d'Integració - ARESTA (PSGD)](/canigo-documentacio-versions-3x-integracio/modul-psgd/).

## Com utilitzar Canigó 3.4.0

Properament es publicarà una actualització de [l'entorn de desenvolupament](/canigo/entorn-desenvolupament/) i del [plugin de Canigó per Eclipse](/canigo-download-related/plugin-canigo/) per a la creació d'aplicacions Canigó 3.4.0.

Per poder passar una aplicació de Canigó 3.2 a Canigó 3.4 podeu seguir els passos descrits a [Actualització Canigó 3.2 a Canigó 3.4](/howtos/2019-03-Howto-Actualitzacio_Canigo3_2_Canigo3_4/).

<br/>
Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
