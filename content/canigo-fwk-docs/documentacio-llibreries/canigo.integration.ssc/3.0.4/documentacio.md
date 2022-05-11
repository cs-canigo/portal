+++
date        = "2022-04-13"
title       = "Documentació"
description = "Documentació canigo.integration.ssc 3.0.4"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

L’objectiu d’aquest connector és proporcionar accés al Sistema de Signatura Centralitzada de Catcert (SSC). Aquest component, el qual es troba dins els connectors de serveis funcionals de la Generalitat, proporciona una interfície que utilitza l’API SmartWrapper per poder donar accés als diferents tipus de signatura que ofereix l’SSC.

## Funcionalitats

### Builders

En el package *cat.gencat.ctti.canigo.arch.integration.ssc.builder* s'ofereixen els builders per a generar les entitats encarregades de la comunicació emb els serveis de SSC.

### Service

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.ssc.SscConnector* per a gestionar les operacions cap a SSC.

### Exception

S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.ssc.exceptions.SCException* per identificar els errors produits al mòdul.
