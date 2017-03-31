+++
date        = "2017-03-31"
title       = "Canigó. Publicada nova versió 3.2 del framework"
description = "La versió 3.2 del framework Canigó presenta novetats molt importants respecte a les seves predecessores. L'objectiu principal d'aquesta nova versió és facilitar el desenvolupament d'aplicacions que segueixin el patró d'arquitectura recomanat pel CS Canigó, consistent en el desacoblament del frontend web vers els serveis de backend que exposen les dades de negoci"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "ABRIL2017"
+++

Amb l'alliberament de la versió 3.2 del framework Caniǵo s'assoleix un dels objectius que es persegueix des de fa temps al CS Canigó, consistent en facilitar el desenvolupament d'aplicacions que segueixin el patró d'arquitectura on el frontend web i el backend que exposa les dades de negoci estan totalment desacoblats. Amb aquesta finalitat s'ha incorporat un nou Mòdul RS (RESTful Services) el qual dóna suport al desenvolupament d'APIs REST. A més d'aquest nou mòdul, Canigó 3.2 té actualitzacions importants d'alguns mòduls core com els de seguretat, persistència i traces. L'altre gran objectiu d'aquesta nova versió de Canigó és facilitar el desplegament en entorns corporatius a CPDs i Container Clouds. En aquesta línia s'ha certificat el seu funcionament en Tomcat 8 i Weblogic 12c, i introduït Docker a la plantilla d'aplicació.

<br>
### Mòduls

A continuació es descriuen els canvis més rellevants als mòduls que formen part del framework.

##### Mòdul RS (RESTFul Services) [_NOU!_]

El Mòdul RS ha estat introduït al framework per permetre l'exposició de dades mitjançant serveis REST de forma àgil i seguint les millors pràctiques d'[APIs REST](http://canigo.ctti.gencat.cat/blog/2016/01/api/).

Les principals característiques d'aquest mòdul són les següents:

* Control genèric d'errors
* Classes estàndard de resposta
* APIs REST incorporades per exposar les propietats de configuració de l'aplicació i mòduls carregats

Tot el contingut es serveix en format JSON.

Podeu trobar tota la informació d'aquest mòdul a la següent [pàgina](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-rs/) del portal.

##### Mòdul de Seguretat [_ACTUALITZAT!_]

Com a gran novetat al Mòdul de Seguretat s'incorpora el suport a [JWT (JSON Web Token)](https://jwt.io/) per tal de permetre la construcció d'aplicacions stateless que puguin ser fàcilment escalables. En concret, la llibreria utilitzada és [JJWT (Java JWT)](https://github.com/jwtk/jjwt).

L'ús de JWT és compatible amb GICAR i la resta de proveïdors de seguretat suportats per Canigó. 
Un cop l'usuari ha estat autenticat, el backend Canigó genera un token que haurà de ser enviat pel client a la capçalera HTTP per a cada petició.

Podeu trobar tota la informació d'aquest mòdul a la següent [pàgina](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-seguretat/) del portal.

##### Mòdul de Persistència (JPA) [_ACTUALITZAT!_]

[Spring Data JPA] (http://projects.spring.io/spring-data-jpa/) i [QueryDSL] (http://www.querydsl.com/) passen a ser les llibreries de suport principals per l'accés a dades.

Gràcies a Spring Data JPA i l'ús de repositoris es redueix el codi necessari per fer accessos a la base de dades. Les operacions més habituals són proporcionades pels repositoris i afegir nous mètodes d'accés a dades a aquests repositoris és molt fàcil.

QueryDSL permet la generació de queries dinàmiques de forma segura mitjançant codi. És compatible amb JPA i, de la mateixa manera que Spring Data, dóna suport als motors de bases de dades més populars (Oracle, MySQL, PostgreSQL, SQLServer, MongoDB).

Podeu trobar tota la informació d'aquest mòdul a la següent [pàgina](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-jpa/) del portal.

##### Mòdul de Traces [_ACTUALITZAT!_]

L'actualització de Log4j a SLF4J+Log4j2 és la principal novetat que incorpora aquest mòdul. A continuació s'enumeren els principals avantatges que suposa aquest canvi:

* Loggers asíncrons
* Nivells de log personalitzats
* Reconfiguració automàtica
* Ús més eficient de memòria i millores en la concurrència
* Fàcilment extensible
* Configuració en més formats: XML, JSON, YAML

Podeu trobar tota la informació d'aquest mòdul a la següent [pàgina](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-traces/) del portal.

##### Mòdul JSF [_DEPRECAT!_]

JSF (JavaServer Faces) passa a ser una tecnologia deprecada en aquesta versió de Canigó. No s'ha evolucionat més enllà d'actualitzar versions de llibreries per tal de garantir la compatibilitat amb contenidors de servlets i servidors d'aplicacions del [Full de Ruta del Programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf).

<br>
### Nou Repositori Maven al Nexus del SIC

Canigó 3.2, en el seu core, incorpora un canvi important. Aquest canvi és el pas d'un repositori Maven a un grup de repositoris amb accés SSL: https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/

Gràcies a l'ús d'aquest grup de repositoris disponible al Nexus del SIC, qualsevol canvi (actualització, eliminació, afegit) als repositoris que formen part del grup serà transparent al desenvolupador d'aplicacions Canigó.

<br>
### Nova plantilla d'aplicació Canigó 3.2

La nova versió 1.6.0 del [Plugin d'Eclipse de Canigó](http://canigo.ctti.gencat.cat/canigo-download-related/plugin-canigo/) permet la creació d'aplicacions Canigó 3.2. A partir d'aquesta nova versió del plugin deixa de donar-se l'opció de crear aplicacions Canigó basades en JSF.

A continuació es descriuen les novetats més importants que incorpora la plantilla d'aplicació Canigó 3.2.

##### Swagger

La introducció de [Swagger](http://swagger.io/), framework pel disseny, construcció, documentació i consum d'APIs REST, és clau per disposar d'un ecosistema que permeti treballar amb APIs REST de forma fàcil i intuïtiva.

<center>![Swagger a Canigó 3.2](/images/news/swagger-canigo.png)</center>

La integració realitzada amb Swagger i JWT permet validar la seguretat de les nostres APIs de forma ràpida.

##### Spring Boot

[Spring Boot](https://projects.spring.io/spring-boot/) ens permet executar l'aplicació sense necessitat de disposar d'un servidor d'aplicacions o contenidor de servlets. És capaç d'executar-ne un internament (Tomcat, Jetty o Undertow) i aixecar l'aplicació.

Aquesta és la característica més important, però en té d'altres:

* Simplificació de configuració Maven
* Configuracions de Spring de forma automàtica
* No genera codi i no requereix configuració per XML

##### Docker

Canigó 3.2 pot ser desplegat en els contenidors Docker certificats per [Suport Cloud](http://canigo.ctti.gencat.cat/cloud/), ja sigui en un jar executable (Spring Boot) amb Java o en un war a Tomcat:

*Bluemix*

* [gencatcloud/java](https://hub.docker.com/r/gencatcloud/java)
* [gencatcloud/tomcat](https://hub.docker.com/r/gencatcloud/tomcat)

*OpenShift*

* [gencatcloud/java-openshift](https://hub.docker.com/r/gencatcloud/java-openshift)
* [gencatcloud/tomcat-openshift](https://hub.docker.com/r/gencatcloud/tomcat-openshift)

D'aquesta manera es vol facilitar el desplegament d'aplicacions Canigó en entorns Container Cloud com [Bluemix](https://console.eu-gb.bluemix.net/) i d'altres basats en [OpenShift](https://www.openshift.org/).

<br>
### Certificació amb servidors del full de ruta

Canigó 3.2 ha estat certificat amb alguns dels servidors del [Full de ruta del programari del CTTI](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf) amb el runtime Java d'Oracle suportat per c:

* Weblogic 12c
* Tomcat 7/8
* Websphere 8.5 (_properament_)

<br><br>

Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia](oficina-tecnica.canigo.ctti@gencat.cat) del CS Canigó.
