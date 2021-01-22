+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.tributs.pica 2.4.1"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

L’objectiu d’aquest connector ,es el de proporcionar accés als 3 grans serveis de consulta de dades fiscals que actualment ofereix la PICA. Aquests tres serveis són:

* AEAT: Agència Estatal de l’Administració Tributària
* ATC: Agència Tributària de Catalunya
* TGSS: Tresoreria General de la Seguretat Social

a més també es troba integrat el servei AEAT_ATC_TGSS que sintetitza una petita suite de les modalitats de servei dels 3 productes anteriors.

## Funcionalitats

### Beans

Contiene las entidades que representan las peticiones y respuestas

### Excepción

Contiene las excepciones que se generan al consultar los tributos

### Tributs Pica

Contiene la clase abstracta "AbstractConnectorImpl" y sus implementaciones que incluyen los métodos de consultas.
