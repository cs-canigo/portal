+++
date        = "2017-03-31"
title       = "Canigó. Publicació Canigó 3.2"
description = "Ha estat alliberada la versió 3.2 del framework Canigó. L'objectiu principal d'aquesta nova versió es facilitar el desenvolupament d'APIs REST amb un nou mòdul RS (RESTful Services) a més d'incorporar actualitzacions importants d'alguns mòduls principals com el de seguretat i persistència"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "ABRIL2017"
+++

Des de l'equip de Canigó s'està treballant en la versió 3.2 de Canigó, la qual incorporarà novetats importants com el suport a serveis REST i autenticació amb JWT (JSON Web Token) entre d'altres. Fa temps que tant des d'Arquitectura CTTI com des del CS Canigó s'està promovent l'ús d'arquitectures basades en servei REST al backend i consum de dades via Javascript en frontals web HTML5, i és en aquesta nova versió que s'incorporaran classes i configuracions de suport per facilitar el desenvolupament d'aplicacions que segueixin aquesta arquitectura.

Certificats amb els servidors del full de ruta Weblogic 12c i Tomcat 7/8. Java 7/8. Properament es realitzarà la certificació amb Websphere 8.5.

### Mòdul RS (RESTFul Services) [NOU]


### Mòdul de Seguretat [ACTUALITZAT]


### Mòdul de Persistència [ACTUALITZAT]


### Mòdul de Traces [ACTUALITZAT]


### Mòdul JSF [DEPRECAT]

Comentar que JSF (JavaServer Faces) passa a ser una tecnologia deprecada en aquesta versió de Canigó. En cap cas s'evolucionarà més enllà d'actualització de llibreries per tal de garantir la compatibilitat amb contenidors de servlets i servidors d'aplicacions del [Full de Ruta del Programari](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf).

### Plantilla

La introducció de [Swagger](http://swagger.io/), framework pel disseny, construcció, documentació i consum d'APIs REST, és clau per disposar d'un ecosistema que permeti treballar amb APIs REST de forma fàcil i intuïtiva.

<center>![Swagger a Canigó 3.2](/images/news/swagger-canigo.png)</center>

La integració realitzada amb Swagger i [JWT](https://jwt.io/) (JSON Web Token) permet validar la seguretat de les nostres APIs. Un cop obtingut el token (/api/auth) és possible fer crides a altres APIs REST de l'aplicació sempre que l'usuari hi estigui autoritzat. En cas contrari obtindrem un error "HTTP 401 - Unauthorized".

Per qualsevol dubte us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia](oficina-tecnica.canigo.ctti@gencat.cat) del CS Canigó.
