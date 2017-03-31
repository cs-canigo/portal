+++
date        = "2017-03-31"
title       = "Canigó. Publicació Canigó 3.2"
description = "Ha estat alliberada la versió 3.2 del framework Canigó. L'objectiu principal d'aquesta nova versió es facilitar el desenvolupament d'APIs REST gràcies a la incorporació d'un nou Mòdul RS (RESTful Services). També s'han realitzat actualitzacions importants d'alguns mòduls principals com el de seguretat i persistència"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "ABRIL2017"
+++

Ha estat alliberada la versió 3.2 del framework Canigó. L'objectiu principal d'aquesta nova versió és facilitar el desenvolupament d'aplicacions que segueixen el patró d'arquitectura recomanat pel CS Canigó consistent en el desacoblament del frontend web vers els serveis de backend que exposen les dades de negoci. Amb aquesta finalitat, s'ha incorporat un nou Mòdul RS (RESTful Services) el qual dóna suport al desenvolupament d'APIs REST, a més d'actualitzacions importants d'alguns mòduls principals com els de seguretat, persistència i traces. L'altre gran objectiu de Canigó 3.2 és facilitar el desplegament en entorns corporatius a CPDs i Container Clouds. En aquesta línia s'ha introduït Docker a la plantilla d'aplicació Canigó 3.2.


### Mòdul RS (RESTFul Services) [_NOU_]

El Mòdul RS ha estat introduït al framework per permetre l'exposició de dades mitjançant serveis REST de forma àgil i seguint les millors pràctiques d'[APIs REST](http://canigo.ctti.gencat.cat/blog/2016/01/api/).

Les principals característiques d'aquest mòdul són les següents:

* Control genèric d'errors
* Classes estàndard de resposta
* APIs REST incorporades per exposar les propietats de configuració de l'aplicació i mòduls carregats

Tot el contingut es serveix en format JSON.

Podeu trobar tota la informació d'aquest mòdul a la següent [pàgina](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-rs/) del portal.

### Mòdul de Seguretat [_ACTUALITZAT_]

Com a gran novetat s'incorpora el suport a [JWT (JSON Web Token)](https://jwt.io/) per tal de permetre la construcció d'aplicacions stateless que puguin ser fàcilment escalables. En concret, la llibreria utilitzada és [JJWT (Java JWT)](https://github.com/jwtk/jjwt).

L'ús de JWT és compatible amb GICAR, i la resta de proveïdors de seguretat suportats per Canigó. 
Un cop l'usuari ha estat autenticat, el backend Canigó genera un token que haurà de ser enviat pel client a la capçalera HTTP per a cada petició.

### Mòdul de Persistència [_ACTUALITZAT_]


Spring Data JPA i QueryDSL

### Mòdul de Traces [_ACTUALITZAT_]

SLF4J+Log4J2

### Mòdul JSF [_DEPRECAT_]

JSF (JavaServer Faces) passa a ser una tecnologia deprecada en aquesta versió de Canigó. No s'ha evolucionat més enllà d'actualitzar versions de llibreries per tal de garantir la compatibilitat amb contenidors de servlets i servidors d'aplicacions del [Full de Ruta del Programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf).

### Repositori Maven al Nexus del SIC

https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/

### Plantilla d'aplicació

Gràcies al plugin d'Eclipse...

A partir d'aquesta nova versió del plugin deixa de donar-se la opció de crear d'aplicacions Canigó basades en JSF.

#### Swagger

La introducció de [Swagger](http://swagger.io/), framework pel disseny, construcció, documentació i consum d'APIs REST, és clau per disposar d'un ecosistema que permeti treballar amb APIs REST de forma fàcil i intuïtiva.

<center>![Swagger a Canigó 3.2](/images/news/swagger-canigo.png)</center>

La integració realitzada amb Swagger i [JWT](https://jwt.io/) (JSON Web Token) permet validar la seguretat de les nostres APIs. Un cop obtingut el token (/api/auth) és possible fer crides a altres APIs REST de l'aplicació sempre que l'usuari hi estigui autoritzat. En cas contrari obtindrem un error "HTTP 401 - Unauthorized".

#### Spring Boot

Agilitat en el desplegament...

#### Docker

Canigó 3.2 pot ser desplegat en els contenidors Docker certificats per Suport Cloud, ja sigui en un jar executable amb Spring Boot a "gencatcloud/java:7"/"gencatcloud/java:8" com en un war a "gencatcloud/tomcat:7"/"gencatcloud/tomcat:8". D'aquesta manera es vol facilitar el desplegament d'aplicacions Canigó en entorns cloud com Bluemix i Openshift.

### Certificació amb servidors del full de ruta

Canigó 3.2 ha estat certificat amb els servidors del [Full de ruta del programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf). Weblogic 12c i Tomcat 7/8 amb el runtime Java d'Oracle versió 7 i 8. Properament es realitzarà la certificació amb Websphere 8.5.

Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia](oficina-tecnica.canigo.ctti@gencat.cat) del CS Canigó.
