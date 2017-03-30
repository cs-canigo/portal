+++
date        = "2017-03-31"
title       = "Canigó. Publicació Canigó 3.2"
description = "Ha estat alliberada la versió 3.2 del framework Canigó. L'objectiu principal d'aquesta nova versió es facilitar el desenvolupament d'APIs REST gràcies a la incorporació d'un nou Mòdul RS (RESTful Services). També s'han realitzat actualitzacions importants d'alguns mòduls principals com el de seguretat i persistència"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "ABRIL2017"
+++

Ha estat alliberada la versió 3.2 del framework Canigó. L'objectiu principal d'aquesta nova versió es facilitar el desenvolupament d'APIs REST gràcies a la incorporació d'un nou Mòdul RS (RESTful Services). També s'han realitzat actualitzacions importants d'alguns mòduls principals com els de seguretat, persistència i traces, i afegit tecnologies actuals com Swagger, Spring Boot i Docker a l'aplicació plantilla.

### Mòdul RS (RESTFul Services) [NOU]

...

### Mòdul de Seguretat [ACTUALITZAT]

JWT

### Mòdul de Persistència [ACTUALITZAT]

Spring Data JPA i QueryDSL

### Mòdul de Traces [ACTUALITZAT]

SLF4J i Log4J2

### Mòdul JSF [DEPRECAT]

JSF (JavaServer Faces) passa a ser una tecnologia deprecada en aquesta versió de Canigó. No s'ha evolucionat més enllà d'actualitzar versions de llibreries per tal de garantir la compatibilitat amb contenidors de servlets i servidors d'aplicacions del [Full de Ruta del Programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf).

### Repositori Maven al Nexus del SIC



### Plantilla d'aplicació

Gràcies al plugin d'Eclipse...

#### Swagger

La introducció de [Swagger](http://swagger.io/), framework pel disseny, construcció, documentació i consum d'APIs REST, és clau per disposar d'un ecosistema que permeti treballar amb APIs REST de forma fàcil i intuïtiva.

<center>![Swagger a Canigó 3.2](/images/news/swagger-canigo.png)</center>

La integració realitzada amb Swagger i [JWT](https://jwt.io/) (JSON Web Token) permet validar la seguretat de les nostres APIs. Un cop obtingut el token (/api/auth) és possible fer crides a altres APIs REST de l'aplicació sempre que l'usuari hi estigui autoritzat. En cas contrari obtindrem un error "HTTP 401 - Unauthorized".

#### Spring Boot



#### Docker

Comentar també que Canigó 3.2 pot ser desplegat en els contenidors Docker certificats per Suport Cloud, ja sigui en un jar executable amb Spring Boot a "gencatcloud/java:7"/"gencatcloud/java:8" com en un war a "gencatcloud/tomcat:7"/"gencatcloud/tomcat:8".

### Certificació amb servidors del full de ruta

Canigó 3.2 ha estat certificat amb els servidors del [Full de ruta del programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf). Weblogic 12c i Tomcat 7/8 amb el runtime Java d'Oracle versió 7 i 8. Properament es realitzarà la certificació amb Websphere 8.5.




Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia](oficina-tecnica.canigo.ctti@gencat.cat) del CS Canigó.
