+++
date        = "2019-01-10"
title       = "Oficina Tècnica de Canigó i Suport Cloud. Balanç 2018"
description = "Evolució dels serveis de l'Oficina Tècnica de Canigó i Suport Cloud a l'any 2018"
sections    = ["noticies", "home"]
categories  = ["sic, canigo, sgde", "cloud"]
key         = "GENER2019"
+++

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

- Publicació de [**Canigó 3.2.4**](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN/versions/10494) amb millores al servei de mailing, d'instrumentació i de seguretat al servei RS (suport a serveis REST)
- Publicació de [**Canigó 3.2.5**](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN/versions/10498) amb la inclusió d'un nou mòdul per suport a SAML2, millores de rendiment al mòdul d'instrumentació, actualització de Spring per resolució de vulnerabilitats reconegudes (CVE's), i resolució d'incidències al servei de persistència i LOPD
- Publicació de [**Canigó 3.2.6**](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN/versions/10601) amb la inclusió d'un nou mòdul de suport a MongoDB i a PostgreSQL al mòdul de persistència
- Publicació de [**Canigó 3.2.7**](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN/versions/10602) amb la inclusió de 
- Certificació Canigó 3.2 en **JBoss EAP 6.4**
- Publicació de les [**versions 2.0.1, 2.0.2, 2.0.3, i 2.0.4 de l'entorn de desenvolupament de Canigó**] (/canigo/entorn-desenvolupament/) amb millores al procés de construcció, actualitzacions del plugin d'Eclipse de Canigó i resolució d'incidències


### **SGDE (Servei de Gestió del Document Electrònic)**

- STD (Servei de Transformació de Documents): **augmentat el límit de mida de documents** per les operacions de composició
- eFormularis: **deprecada versió v8** del WS de ServeisInvocacio
- STD (Servei de Transformació de Documents): composició de documents amb **diferents orientacions de pàgina**

Per a més informació sobre els futurs evolutius planificats, podeu consultar el [Roadmap d'arquitectura del CTTI](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).
