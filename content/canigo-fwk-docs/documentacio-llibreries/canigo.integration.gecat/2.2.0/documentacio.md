+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.gecat 2.2.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

<div class="message warning">

A partir de la publicació de Canigó 3.4.3 el 26/03/2020 aquest mòdul quedarà deprecat, pel que no es preveu seguir evolucionant aquest mòdul.

</div>

## Propòsit

Utilització del connector al sistema SAP de Gecat des de qualsevol aplicació Java del Framework J2EE. L’abast d’aquest connector es fonamenta en la utilització de les funcions d’alta de factures, consultes i reserves online del SAP de Gecat, així com totes les funcions batch. El connector permet l’accés al SAP mitjançant objectes de consulta, transformant aquests objectes en una cadena de caràcters vàlida per al SAP. La cadena de retorn és transformada novament en un objecte que conté els registres de retorn.

## Funcionalitats

### Beans

En el package *cat.gencat.ctti.canigo.arch.integration.gecat.batch* conté les entitats que s’ofereixen per representar la informació on s’allotgarà la resposta de la funcionalitat de *batch* de SAP de Gecat.

En el package *cat.gencat.ctti.canigo.arch.integration.gecat.consultes* conté les entitats que s’ofereixen per representar la informació on s’allotgarà la resposta de la funcionalitat de *consultes* de SAP de Gecat.

En el package *cat.gencat.ctti.canigo.arch.integration.gecat.factures* conté les entitats que s’ofereixen per representar la informació on s’allotgarà la resposta de la funcionalitat de *factures* de SAP de Gecat.

En el package *cat.gencat.ctti.canigo.arch.integration.gecat.reserves* conté les entitats que s’ofereixen per representar la informació on s’allotgarà la resposta de la funcionalitat de *reserves* de SAP de Gecat.

### Service

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.gecat.connector.GecatConnector* per a realitzar les operacions d’alta de factures, consultes i reserves online del SAP de Gecat

### Exception

S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.gecat.exception.GecatConnectorException* per identiticar els errors produits al mòdul.
