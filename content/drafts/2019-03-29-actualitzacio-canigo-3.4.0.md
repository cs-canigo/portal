+++
date        = "2019-03-29"
title       = "Canigó. Publicació versió 3.4.0 Canigó"
description = "S'ha publicat una nova versió de Canigó donant suport a Spring 5, Spring Boot 2 i nous paradigmes de programació. També s’inclou l’actualització del connector amb la Plataforma de Serveis de Gestió Documental (PSGD)"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "ABRIL2019"
+++

## Propòsit

Amb l’alliberament de la versió 3.4 del framework Caniǵo s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes versions suportades de Java i Spring i proporcionar nous paradigmes de programació.

Amb la versio 3.4 també s’inclou l’actualització del connector amb la Plataforma de Serveis de Gestió Documental (PSGD), també coneguda com a ARESTA.

## Actualització tecnologies base

### Java 11

El setembre del 2018 Oracle va publicar la versió 11 de Java, la primera versió LTS amb la nova política de sis mesos de cicle de Oracle

Podeu consultar la documentació d'aquesta versió, així com la seva release notes, a: https://www.oracle.com/technetwork/java/javase/11-relnotes-5012447.html

S'ha certificat la compatibilitat de Canigó 3.4.0 amb Java 11

També s'ha certificat la compatibilitat de Canigó 3.4.0 amb el nou contenidor Docker per a Java 11 disponible al [Catàleg de components de Canigó Cloud](/cloud/cataleg/) 

### Spring 5

El Spring Framework ofereix un model complet de programació i configuració per a aplicacions empresarials basades en Java modernes

Spring 5 és la primera gran entrega de Spring Framework des de la versió 4 publicada el decembre de 2013

El principal objectiu de Spring 5 és proporcionar els nous paradigmes de programació amb programació funcional (webflux) i programació reactiva

A més, el resum d'actualitzacions que incorpora són les següents:

### Principals actualitzacions de la línia base:
- Java SE 8+ Java EE 7+
- JDK 8
- Servlet 3.1
- Bean validation 1.1
- JPA 2.1
- JMS 2.0
- Millores en el test

### Principals extensions de la línea base
- Java EE 8
- Servlet 4.0
- Bean validation 2.0
- JPA 2.2
- JMS 2.0
- JSON Bingdins API 1.0
- Hibernate validator 6.0
- Apache Johnzon 1.1
- Refinat de la interacció amb resouces amb NIO.2

Segons estudis realitzats a 5160 desenvolupadors a finals del 2018, el 24% de les aplicacions que utilitzaven Spring utilitzaven la versió 5

### Spring Boot 2

Spring Boot, al igual que Canigó, proporciona eines pel desenvolupament fàcil d'aplicacions empresarials amb el mínim possible de configuració

Spring Boot 1 acaba la seva linea de desenvolupament i manteniment a l'Agost del 2019

Spring Boot 2 el seu principal objectiu és donar suport a Spring 5, Java 8 a la seva linea base i l'actualització de les versions de les seves dependencies així com també actualització dels seus servidors suportats

Segons estudis realitzats a 5160 desenvolupadors a finals del 2018, amb pocs mesos des de la seva publicació, el 30% de les aplicacions que utilitzaven Spring Boot utilitzaven la versió 2

Amb l'actualització a Spring Boot 2, Canigó 3.4.0 proporciona una actualitzada, potent, fàcil i productiva eïna de creació d'aplicacions amb Java

## Arquitectura

A la versió 3.4.0 de Canigó amb Spring 5 i Spring Boot 2 es proporciona les següents funcionalitats:

### Configuració propietats amb yaml



### Programació amb estàndard de Streams Reactius

### Programació reactiva

### Programació funcional (webflux)

### Certificació amb servidors embeguts

## Connectors

### Actualització connector amb ARESTA

L'objectiu d'aquest connector es proporcionar punt d’accés cap a la Plataforma de Serveis de Gestió Documental (PSGD) també coneguda com a ARESTA

El pròposit d'aquest connector és proporcionar una interfície funcional que faciliti a les aplicacions l’ús de la PSGD

A la versió 3.4.0 de Canigó, s'ha alineat el connector amb PSGD o ARESTA a la versió 6.0 

Podeu consultar la documentació d'aquest connector a [Mòduls d'Integració - ARESTA (PSGD)](/canigo-documentacio-versions-3x-integracio/modul-psgd/)

## Com utilitzar Canigó 3.4.0

Properament es publicarà una actualització de l'entorn de desenvolupament i del plugin per l'eclipse per a la creació de projectes amb Canigó 3.4.0

Per poder passar una aplicació de Canigó 3.3.x a Canigó 3.4.0 podeu seguir els passos descrits a [Actualització Canigó 3.3 a Canigó 3.4](/howtos/2019-03-Howto-Actualitzacio_Canigo3_3_Canigo3_4)



Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al servei CAN del JIRA CSTD o enviant-nos un mail a la bústia del CS Canigó
