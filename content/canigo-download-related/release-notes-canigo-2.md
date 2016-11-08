+++
date        = "2015-03-31"
title       = "Release Notes Canigó 2.3.20"
description = ""
sections    = "Canigó"
weight      = 1
+++

#### Canvis

- Canvi [CAN-1726](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1726): Notificacions electròniques <br>
<b>Context</b>: Actualització del connector de la PICA amb el producte NT <br>
<b>Connector afectat</b>: canigo-connectors-nt <br>
<b>Solució</b>: Modificació del connector  <br>

- Canvi [CAN-1735](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1735): Actualització connector AEAT PICA  <br>
<b>Context</b>: Actualització del connector de la PICA amb el producte AEAT <br>
<b>Connector afectat</b>: canigo-connectors-pica-tributs <br>
<b>Solució</b>: Modificació del connector  <br>

- Canvi [CAN-1745](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1745): Actualització connector AEAT-TGSS  <br>
<b>Context</b>: Actualització del connector de la PICA amb el producte TGSS <br>
<b>Connector afectat</b>: canigo-connectors-pica-tributs <br>
<b>Solució</b>: Modificació del connector  <br>

- Canvi [CAN-1824](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1824): Consulta error connector pica  <br>
<b>Context</b>: Arrel d'una consulta sobre el connector de PSIS es detecta que cal actualitzar-ho donat que un dels camp que s'envia a la petició ha passat de ser opcional a obligatori i el connector no deixava informar-ho. <br>
<b>Servei afectat</b>: canigo-connectors-psis <br>
<b>Solució</b>: Modificació del connector  <br>

#### Bugs sol·lucionats

- Bug [CAN-1683](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1683) El connector de DNI no permet informar el camp funcionari <br>
<b>Context</b>: Problemes amb la impossibilitat de poder informar un valor a les crides del connector de la PICA-DNI.<br>
<b>Servei afectat</b>: canigo-connectors-pica-dni<br>
<b>Solució</b>: Modificació del connector <br>

- Bug [CAN-1765](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1765) Problemàtica en l'enviament d'e-mails <br>
<b>Context</b>: Problemes del servei a l'hora d'obtenir el Transport<br>
<b>Servei afectat</b>: canigo-services-mailing<br>
<b>Solució</b>: Modificació del connector <br>

- Bug [CAN-1884](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1884) Canigó integracions externes per Proxy<br>
<b>Context</b>: Problemes al intentar informar un campal desplegar amb Weblogic si es sobreescriuen certes variables a nivell global d'instància de JVM.<br>
<b>Servei afectat</b>: canigo-services-webservices<br>
<b>Solució</b>: Modificació del servei <br>

- Bug [CAN-1789](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-1789) Botó submit bloquejat a google chrome<br>
<b>Context</b>: Problemes amb el volum de dades que s'envien a validar mitjançant un formulari.<br>
<b>Servei afectat</b>: canigo-services-client<br>
<b>Solució</b>: Modificació de scripts que intervenen a l'enviament de dades de formularis <br>