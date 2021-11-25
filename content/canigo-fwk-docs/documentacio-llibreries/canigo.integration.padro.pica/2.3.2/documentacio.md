+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.padro.pica 2.3.2"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

L’objectiu d’aquest connector, és el de proporcionar un punt d’accés utilitzant la plataforma PICA cap serveis d’empadronament publicats en aquesta plataforma.

## Funcionalitats

### Beans

Conté l'entitat *cat.gencat.ctti.canigo.arch.integration.padro.pica.beans.DataResponse* per representar la informació on s’allotgarà la resposta dels serveis de consulta de Padró a través de la PICA.

### Service

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.padro.pica.PadroConnector* per a realitzar les operacions pels serveis de consulta de Padró a través de la PICA.

### Exception

 S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.padro.pica.exceptions.PadroException* per identificar els errors produits en el mòdul.