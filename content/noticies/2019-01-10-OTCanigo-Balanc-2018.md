+++
date        = "2019-01-10"
title       = "Oficina Tècnica de Canigó i Suport Cloud. Balanç 2018"
description = "Evolució dels serveis de l'Oficina Tècnica de Canigó i Suport Cloud a l'any 2018"
sections    = ["noticies", "home"]
categories  = ["sic, canigo, sgde", "cloud"]
key         = "GENER2019"
+++

**TODO**

A continuació es mostren les fites aconseguides el 2018 segons ordre cronològic:

<center><iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=15wu7P9o-vGz4N9psnSswTD4FGbbWatxQDE58OGZcP70&font=Default&lang=ca&hash_bookmark=true&initial_zoom=1&height=650' width='100%' height='650' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe></center>

A mode resum, destacaríem les següents:

### Suport Cloud

- Posada en servei de la plataforma de contenidors on-premise **SwarmMe**
- Posada en servei de la plataforma de contenidors on-premise **AppAgile**
- Migració d'aplicacions del servei Single and Scalable Group Container Service de Bluemix al nou **Bluemix Container Service** basat en Docker i Kubernetes
- Millora d'imatges Docker estàndard de gencatcloud, ara basades en la distribució de Linux **Alpine**, més segures i de tamany més reduït
- Implementació de nova imatge Docker Apache-Shibboleth per la integració amb **GICAR**, tant a cloud privat com públic
- Suport al desplegament d'aplicacions en les diferents plataformes de contenidors i cloud públic en catàleg: AppAgile, SwarmMe, Azure i Bluemix


### SIC (Servei d'Integració Continua)

- Publicació de l'**autoservei de jobs del SIC**, mitjançant el qual els proveïdors són autònoms per a la generació de les seves pròpies pipelines de construcció i desplegament al SIC.
- Integració del servidor d'aplicacions **JBoss**.
- Integració del generador de webs estàtiques **Hugo**.
- Creació d'un **procediment estàndard per a la integració d'oficines CTTI** al SIC.
- Creació del **Connector de l'Oficina de Qualitat**.


### Canigó

- Publicació de [**Canigó 3.2.0**](http://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10450) amb suport a arquitectures HTML5/JS+REST: Spring Boot, Swagger, JWT,...
- Publicació de [**Canigó 3.2.1**](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10461) amb actualització de llibreries, suport a la càrrega de propietats en jars, millores i resolució d'incidències
- Publicació de [**Canigó 3.2.2**] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10463) amb millores per donar suport a les best practices per la implementació d'APIs REST, actualització de llibreries, millores i resolució d'incidències
- Publicació de [**Canigó 3.2.3**] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10464) amb la publicació de jars amb test unitaris per als mòduls core, web-rest, persistència i seguretat
- Nova política de [**versions LTS**] (/noticies/2017-07-05-Canigo-LTS/) pel Framework Canigó
- Certificació Canigó 3.2 en **JBoss EAP 6.4**
- Publicació de la [**versió 2.0.0 del entorn de desenvolupament de Canigó**] (/canigo/entorn-desenvolupament/) amb actualització de programari


### **SGDE (Servei de Gestió del Document Electrònic)**

- STD (Servei de Transformació de Documents): **augmentat el límit de mida de documents** per les operacions de composició
- eFormularis: **deprecada versió v8** del WS de ServeisInvocacio
- STD (Servei de Transformació de Documents): composició de documents amb **diferents orientacions de pàgina**

Per a més informació sobre els futurs evolutius planificats, podeu consultar el [Roadmap d'arquitectura del CTTI](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).
