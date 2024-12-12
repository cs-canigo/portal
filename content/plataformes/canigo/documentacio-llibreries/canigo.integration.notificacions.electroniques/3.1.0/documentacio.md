+++
date        = "2024-12-12"
title       = "Documentació"
description = "Documentació canigo.integration.notificacions.electroniques 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El propòsit d’aquesta documentació és donar a conèixer el mòdul de WebServices de Canigó3 per Enotum, la seva configuració i el seu ús per part de les aplicacions.

## Funcionalitats

### Beans

Conté el package *net.gencat.scsp.esquemes.productes.nt* on s'ofereixen les entitats que s’ofereixen per representar la informació on s’allotjarà la resposta dels serveis de notiticacions per Enotum.

### Service

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.NotificacionsElectroniquesConnector* per obtenir els serveis per Enotum.

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.ServeisCiutada* per realitzar les notificacions per Enotum al ciutadà.

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.ServeisEmpleatPublic* per realitzar les notificacions per Enotum a un empleat públic.

### Exception
 
S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.notificacionselectroniques.exepcions.NotificacionsElectroniquesModuleExcepcion* per identificar els errors produïts al mòdul.
