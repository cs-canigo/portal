+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.gecat 2.2.0"
sections    = "Canigó"
weight      = 3
+++

<div class="message warning">

A partir de la publicació de Canigó 3.4.3 el 26/03/2020 aquest mòdul quedarà deprecat, pel que no es preveu seguir evolucionant aquest mòdul.

</div>

## Propòsit

Utilització del connector al sistema SAP de Gecat des de qualsevol aplicació Java del Framework J2EE. L’abast d’aquest connector es fonamenta en la utilització de les funcions d’alta de factures, consultes i reserves online del SAP de Gecat, així com totes les funcions batch. El connector permet l’accés al SAP mitjançant objectes de consulta, transformant aquests objectes en una cadena de caràcters vàlida per al SAP. La cadena de retorn és transformada novament en un objecte que conté els registres de retorn.

## Funcionalitats

### Excepción

Contiene la excepción que se genera durante la conexión con Gecat "GecatConnectorException"

### Connector

Contiene la interfaz e implementación de "GecatConnector" que incluye los métodos de consultas de Gecat. 
