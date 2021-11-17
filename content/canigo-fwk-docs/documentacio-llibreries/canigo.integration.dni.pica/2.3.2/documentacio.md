+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.integration.dni.pica 2.3.2"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El propòsit del connector és proporcionar una interfície java per accedir a la PICA (Plataforma d’Integració i Col.laboració Administrativa) per a la consulta de dades del DNI.

## Funcionalitats

### Beans

Conté l’entitat que s’ofereix per representar la informació on s’allotgarà les dades de la consulta del DNI a *cat.gencat.ctti.canigo.arch.integration.dni.pica.beans.DadesConsultaDni*

Al package *net.gencat.scsp.esquemes.dniPICA* s'ofereixen les entitats per a la comunicació amb els serveis de consulta de DNI de la PICA.

### Service

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.dni.pica.DniConnector* per a accedir a la PICA per a la consulta de dades del DNI.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.integration.dni.pica.exceptions.DniException* per identiticar errors produits al mòdul.
