+++
date        = "2018-03-09"
title       = "Actualització de plataforma a eFormularis"
description = "Upgrade de versió d'Adobe LiveCycle a Adobe Experience Manager (AEM)"
sections    = "SGDE"
taxonomies  = []
weight 		= 4
+++

Des del CS Canigó s'està treballant en l'actualització del producte base del servei, Adobe LiveCycle. Adobe Experience Manager (AEM) és l'evolució d'aquest producte, el qual, a més d'oferir les mateixes funcionalitats de les que ja disposava Adobe LiveCycle, n'afegeix de noves. D'entre aquestes noves funcionalitats destaca la possibilitat de poder treballar amb formularis HTML5.

Per tant, l'actualització del producte té principalment dos objectius:

1) Evitar l'obsolescència mantenint la compatibilitat amb les funcionalitats actuals relatives a **Formularis PDF**

Nota: els dominis "preproduccio.sgde.intranet.gencat.cat" i "sgde.intranet.gencat.cat" són àlies dels dominis "eformularis.pre.intranet.gencat.cat" i "eformularis.intranet.gencat.cat"

- Autoservei Adobe (Existent)

Aplicació web per l'activació i publicació de formularis PDF.

_PRE_
http://preproduccio.sgde.intranet.gencat.cat/AutoserveiAdobe

_PRO_ (eformularis.intranet.gencat.cat)
http://sgde.intranet.gencat.cat/AutoserveiAdobe

- WS SOAP (Existent)

Webservice per operar amb formularis PDF. Els contractes de les diferents versions del webservice es mantindran intactes:

_PRE_ (preproduccio.eformularis.intranet.gencat.cat)
http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

_PRO_ (eformularis.intranet.gencat.cat)
http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

- REST API (Nova)

Com a millora a l'actual servei de Formularis PDF, s'incorpora una nova REST API amb les mateixes funcionalitats que ofereix el WS SOAP. Aquesta REST API esta basada en Swagger2.

CAPTURA

Es recomana que, un cop es posi en marxa la nova plataforma, les noves aplicacions que s'integrin al servei utilitzin aquesta REST API.

2) Oferir un nou motor per poder donar servei a **Formularis HTML5**

En aquest punt s'està treballant tant en la vessant més tècnica com en la governança d'aquest nou servei de Formularis HTML5.

Aquesta actualització del producte s'està realitzant en una infraestructura paral·lela a l'actual. Per tant, caldrà que els integradors facin proves en aquesta nova plataforma abans no es posi en servei. Si les proves són satisfactòries, el canvi haurà de ser totalment transparent.

Durant les properes setmanes s'aniran comunicant amb més detall totes les novetats d'aquesta actualització en aquest mateix portal, així com una planificació de disponibilitat d'entorns i periodes de proves per part dels integradors.
Per qualsevol dubte us podeu posar en contacte amb el CS Canigó preferiblement a través del [servei STF del CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/STF) o [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
