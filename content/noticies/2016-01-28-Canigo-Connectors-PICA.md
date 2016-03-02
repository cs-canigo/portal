+++
date        = "2016-01-28"
title       = "Noves versions dels connectors de Canigó amb la PICA"
description = "S'han publicat noves versions dels connectors amb la PICA per a complir les noves restriccions d'esquema"
section     = "Notícies"
categories  = ["canigo"]
key         = "FEBRER2016"
+++

S'han publicat noves versions dels connectors amb la PICA per a complir les noves restriccions d'esquema. És necessari informar les dades Nom i Nif d'emissor, així com informar les dades d'un funcionari en la majoria dels productes de la PICA. Els valors dels camps "nifEmisor" i "nomEmisor" a informar s’han de consultar a la [OT PICA](mailto:requeridors.otpica.ctti@gencat.cat). Per a més detall dels productes podeu visitar la Intranet d'Administració Electrònica ([IPAE](http://ipae.intranet.gencat.cat)).

A continuació es mostren les noves versions publicades dels connectors amb la PICA per Canigó 2 i Canigó 3:

__Canigó 2__:

|Nom connector|Versió|
|-----|--------------|
|**canigo-connectors-pica-avisosalertes**|1.0.1|
|**canigo-connectors-pica-dni**|1.1.0|
|**canigo-connectors-pica-padro**|1.0.1|
|**canigo-connectors-pica-tributs**|1.0.2|
|**canigo-connectors-sarcat**|1.1.1|
|**canigo-connectors-psis**|1.0.2|
|**canigo-connectors-nt**|1.0.2|

* _Per a més informació consultar la documentació de [Canigó 2](/canigo-documentacio-versions-anteriors/versio-2/)_

__Canigó 3__:

|Nom connector|Versió|
|-----|--------------|
|**canigo.integration.avisosalertes_pica**|1.1.2|
|**canigo.integration.dni.pica**|1.2.0|
|**canigo.integration.padro.pica**|1.1.1|
|**canigo.integration.tributs.pica**|1.1.2|
|**canigo.integration.sarcat.pica**|1.1.2|
|**canigo.integration.psis**|1.1.2|
|**canigo.integration.notificacions.electroniques**|1.3.1|

* _Per a més informació consultar la documentació de [Canigó 3](/canigo-documentacio-versions-3x-integracio/)_

Els canvis a l'esquema estan operatius des del 21 de desembre a PRE i durant els pròxims mesos s'aniran incorporant a PRO. Recomanem que es realitzin proves contra preproducció i en cas de no tenir nif/nom emissor que es demani a la PICA com més aviat millor.

En cas de tenir qualsevol dubte en l'ús per part de les aplicacions dels connectors amb la PICA us podeu posar en contacte amb el CS Caniǵo a través del [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/CAN) amb una petició de consulta o suport, o bé enviant-nos un correu a la nostra [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
