+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.operation.instrumentation 2.3.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet a l’aplicació generar dades d’instrumentació de la seva execució, per tal de poder ser explotades posteriorment amb eines de monitorització.

Dins d’aquest mòdul podem trobar les següents funcionalitats:

* Instrumentació de les peticions web: nombre de peticions, nombre d’errors i temps mig per petició.
* Instrumentació manual en format log de mètodes de classes aplicatives.


## Funcionalitats

### Model

Contiene la entidad que representa los datos de respuesta "Result"

### Excepción

Contiene la excepción que se genera en la instrumentación "InstrumentationException"

### Controller

Contiene el EndPoint de consultas de instrumentación "InfoMonitoringController"
