+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.avisosalertes.pica 2.3.2"
sections    = "canigo-fwk-docs"
weight      = 3
+++

### Propòsit

L’objectiu d’aquest connector és el de proporcionar accés als serveis d’enviament de SMS i CORREU del CTTI a través del servei AVISALERT de la PICA.

## Funcionalitats

### Beans

Conté l’entitat que s’ofereix per representar la informació on s’allotgarà la resposta de l'alerta síncrona a *cat.gencat.ctti.canigo.arch.integration.avisosalertes.pica.beans.DataResponse*

### Service

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.avisosalertes.pica.AvisosAlertesConnector* per a realitzar l'enviament d'avisos a través del servei AVISALERT de la PICA.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.integration.avisosalertes.pica.exceptions.AvisosAlertesException* per identificar els errors produits al mòdul.
