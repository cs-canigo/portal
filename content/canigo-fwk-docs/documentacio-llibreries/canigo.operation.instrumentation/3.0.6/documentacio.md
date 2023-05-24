+++
date        = "2023-05-24"
title       = "Documentació"
description = "Documentació canigo.operation.instrumentation 3.0.6"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet a l’aplicació generar dades d’instrumentació de la seva execució, per tal de poder ser explotades posteriorment amb eines de monitorització.

Dins d’aquest mòdul podem trobar les següents funcionalitats:

* Instrumentació de les peticions web: nombre de peticions, nombre d’errors i temps mig per petició.
* Instrumentació manual en format log de mètodes de classes aplicatives.


## Funcionalitats

### Beans

Conté l’entitat que s’ofereix per representar la informació on s’allotjarà la resposta de la monitorització a *cat.gencat.ctti.canigo.arch.operation.instrumentation.model.Result*.

### Filter

S'ofereix el filter *cat.gencat.ctti.canigo.arch.operation.instrumentation.filter.InstrumentationFilter* per a recuperar la infromació per a la monitorització de l'aplicació.

### Controller

S’ofereix el controller *cat.gencat.ctti.canigo.arch.operation.instrumentation.controller.InfoMonitoringController* per a exposar serveis rest per obtenir informació de monitorització de l'aplicació.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.operation.instrumentation.exception.InstrumentationException* per identificar els errors produïts al mòdul.
