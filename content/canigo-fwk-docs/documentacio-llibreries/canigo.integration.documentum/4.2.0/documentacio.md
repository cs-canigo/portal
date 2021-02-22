+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.documentum 4.2.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

<div class="message warning">

A partir de la publicació de Canigó 3.4.3 el 26/03/2020 aquest mòdul quedarà deprecat, pel que no es preveu seguir evolucionant aquest mòdul.

</div>

## Propòsit

Utilització del connector al sistema Documentum des de qualsevol aplicació Java del Framework J2EE. L’abast d’aquest sistema es fonamenta una interfície Java per a accedir a Documentum, permetent emmagatzemar i recuperar documents a més d’altres operacions relacionades com la creació de carpetes o assignació de propietats.

## Funcionalitats

### Service

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.documentum.DocumentumService* per a la gestió de la sessió amb Documentum.

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.documentum.DocumentumConnector* per a la gestió de les operacions amb Documentum.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.integration.documentum.exceptions.DocumentumException* per identificar errors produits al mòdul.
