+++
date        = "2016-05-11"
title       = "Cicle de vida"
description = "Cicle de vida de les aplicacions Cloud containeritzades i xPaas/buildpack"
sections    = "Container Cloud"
weight      = 4
categories  = []
+++

Gràcies a l'ús del Container Cloud el cicle de vida de les aplicacions pot automatitzar-se de forma fàcil. És aquí on el SIC (Servei d'Integració Continua) té un paper essencial, ja que és l'encarregat de proporcionar els processos per assolir aquesta automatització.

Expliquem, des d'un inici, quines són les passes que segueix una aplicació fins a arribar a executar-se en el Container Cloud:

### Definició d'Arquitectura

És en aquesta fase on el proveïdor d'aplicacions, conjuntament amb Integració de Solucions, analitzaran si l'aplicació és susceptible d'anar al Container Cloud. Amb el suport de l'equip d'Administració Cloud i Arquitectura CTTI es prendrà una decisió i es determinarà quin és el cloud destí més apropiat.

Els proveïdors d'aplicacions poden adreçar qualsevol petició de consulta o suport al [CS Suport Cloud del CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CLD).

### Alta projecte

Un cop el document d'arquitectura hagi estat aprovat, així com el pressupost associat als elements a aprovisionar al cloud, es procedirà a l'alta del projecte.

En aquesta fase s'aprovisionaran els recursos necessaris en el cloud destí i en el SIC per al desplegament de l'aplicació, així com els usuaris d'accés pels proveïdors d'aplicacions per la monitorització de l'aplicació (logs, consum recursos, ...) i el seu desplegament.

### Construcció i desplegament

Les aplicacions es construiran i desplegaran sempre des del SIC. Els elements utilitzats per la "containerització" de les aplicacions seran els següents:

#### _xPaaS_

* Els xPaaS utilitzats seran els buildpacks oficials de CloudFoundry per IBM Bluemix i els xPaaS d'OpenShift per CPD3 Containers. Més informació al [catàleg cloud](http://canigo.ctti.gencat.cat/cloud/cataleg/#xpaas:60ff5dd56c9d5f883640685f4f912b83). 

#### _Contenidors (Docker)_

* Les imatges utilitzades per les aplicacions han de ser les [oficials de Gencat](http://canigo.ctti.gencat.cat/cloud/cataleg/#contenidors-docker:60ff5dd56c9d5f883640685f4f912b83), o bé extensions d'aquestes. Aquestes imatges han estat certificades per l'equip d'Administració del Cloud. Qualsevol extensió d'aquestes imatges passarà un procés de validació de vulnerabilitats en el procés de construcció al SIC. En cas que l'extensió introdueixi alguna vulnerabilitat l'aplicació no es desplegarà.

Pel que fa als entorns, per defecte existirà un de PROductiu i un altre de PREproductiu. Els desplegaments en aquests entorns es realitzaran seguint l'estratègia de [blue-green deployment](http://martinfowler.com/bliki/BlueGreenDeployment.html).

  
  

A continuació mostrem un diagrama on s'il·lustra el flux i els diferents equips que intervenen en el cicle de vida d'una aplicació al Container Cloud:

![Cicle de Vida Container Cloud](/related/cloud/lifecycle.png)
