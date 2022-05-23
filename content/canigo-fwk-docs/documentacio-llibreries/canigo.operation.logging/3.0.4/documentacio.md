+++
date        = "2022-04-13"
title       = "Documentació"
description = "Documentació canigo.operation.logging 3.0.4"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet administrar els logs de l’aplicació proporcionant les següents funcionalitats:

* Canviar en calent el nivell de log dels diferents paquets de l’aplicació
* Visualització de fitxers de logs en temps real mitjançant streaming amb WebSockets
* Descarregar els fitxers de logs

## Funcionalitats

### Beans

Conté l’entitat que s’ofereix per representar la informació on s’allotjarà la informació de control de la resposta dels serveis rest de consulta dels logs a *cat.gencat.ctti.canigo.arch.operation.logging.model.TailerControl*

Conté l’entitat que s’ofereix per representar la informació on s’allotjarà la informació i contingut dels logs en els serveis rest de consulta dels logs a *cat.gencat.ctti.canigo.arch.operation.logging.model.TailerReader*

Conté l’entitat que s’ofereix per representar la informació on s’allotjarà la informació del logger de la configuració dels logs a *cat.gencat.ctti.canigo.arch.operation.logging.dto.LoggerDTO*

Conté l’entitat que s’ofereix per representar la informació on s’allotjarà la informació del appender de la configuració dels logs a *cat.gencat.ctti.canigo.arch.operation.logging.dto.AppenderDTO*

### Service

S'ofereix el service *cat.gencat.ctti.canigo.arch.operation.logging.service.FileTailService* per a gestionar la monitorització dels logs de l'aplicació.

### Controller

S’ofereix el controller *cat.gencat.ctti.canigo.arch.operation.logging.endpoints.LogsResource* per exposar serveis rest per a consultar i gestionar la monitorització dels logs de l'aplicació.

### Runnable

S'ofereix el runnable *cat.gencat.ctti.canigo.arch.operation.logging.util.Tailer* per executar un thread que realitzi la monitorització dels logs de l'aplicació.

### Listener

S'ofereix el listener *cat.gencat.ctti.canigo.arch.operation.logging.util.TailerListener* per a escotlar events que es produeixin a la monitorització dels logs de l'aplicació.
