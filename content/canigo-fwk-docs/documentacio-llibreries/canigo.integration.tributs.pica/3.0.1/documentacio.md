+++
date        = "2021-12-13"
title       = "Documentació"
description = "Documentació canigo.integration.tributs.pica 3.0.1"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

L’objectiu d’aquest connector, és el de proporcionar accés als 3 grans serveis de consulta de dades fiscals que actualment ofereix la PICA. Aquests tres serveis són:

* AEAT: Agència Estatal de l’Administració Tributària
* ATC: Agència Tributària de Catalunya
* TGSS: Tresoreria General de la Seguretat Social

a més també es troba integrat el servei AEAT_ATC_TGSS que sintetitza una petita suite de les modalitats de servei dels 3 productes anteriors.

## Funcionalitats

### Beans

En el package *cat.gencat.ctti.canigo.arch.integration.tributs.pica.beans* s'ofereixen les entitats que representen la informació on s’allotjarà la resposta dels serveis de tributs de la PICA

### Service

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.tributs.pica.aeat.AeatConnector* per a la gestió de les operacions d'AEAT a través de la PICA

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.tributs.pica.atc.AtcConnector* per a la gestió de les operacions d'ATC a través de la PICA

S'ofereix el service *cat.gencat.ctti.canigo.arch.integration.tributs.pica.tgss.TgssConnector* per a la gestió de les operacions de TGSS a través de la PICA

### Exception

S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.tributs.pica.exceptions.AeatException* per dentificar els errors produïts a les operacions d'AEAT.

S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.tributs.pica.exceptions.AtcException* per dentificar els errors produïts a les operacions d'ATC.

S'ofereix la exception *cat.gencat.ctti.canigo.arch.integration.tributs.pica.exceptions.TgssException* per dentificar els errors produïts a les operacions de TGSS.
