+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.operation.logging 2.2.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet administrar els logs de l’aplicació proporcionant les següents funcionalitats:

* Canviar en calent el nivell de log dels diferents paquets de l’aplicació
* Visualització de fitxers de logs en temps real mitjançant streaming amb WebSockets
* Descarregar els fitxers de logs

## Funcionalitats

### Model

Contiene las entidades que representan los datos de consulta de logs

### Service

Contiene el servicio "FileTailService" que activa la monitorización

### Endpoints

Contiene el EndPoint de consulta de logs. 
