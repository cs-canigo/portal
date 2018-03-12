+++
date        = "2018-03-09"
title       = "Actualització de plataforma al servei d'eFormularis"
description = "Upgrade de versió d'Adobe LiveCycle a Adobe Experience Manager (AEM)"
sections    = "SGDE"
taxonomies  = []
weight 		= 4
+++

Des del CS Canigó s'està treballant en l'actualització del producte base del servei, Adobe LiveCycle. **Adobe Experience Manager (AEM)** és l'evolució d'aquest producte, el qual, a més d'oferir les mateixes funcionalitats de les que ja disposa Adobe LiveCycle, n'afegeix de noves. D'entre aquestes noves funcionalitats destaca la possibilitat de poder treballar amb formularis HTML5.

Per tant, l'actualització del producte té principalment dos objectius:

* Evitar l'obsolescència mantenint la compatibilitat amb les funcionalitats actuals relatives a **Formularis PDF**
* Oferir un nou motor per poder donar servei a **Formularis HTML5**

### Formularis PDF

#### Autoservei Adobe (Existent)

Aplicació web per l'activació i publicació de formularis PDF.

_PRE_

http://preproduccio.sgde.intranet.gencat.cat/AutoserveiAdobe

_PRO_

http://sgde.intranet.gencat.cat/AutoserveiAdobe

#### WS SOAP (Existent)

Webservice per operar amb formularis PDF. Els contractes de les diferents versions del webservice es mantindran intactes:

_PRE_

http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

_PRO_

http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://sgde.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

#### REST API (Nova)

Com a millora a l'actual servei de Formularis PDF, s'incorpora una nova REST API amb les mateixes funcionalitats que ofereix el WS SOAP. Aquesta REST API està basada en Swagger2.

![REST API eForms](/related/sgde/serveis-invocacio-api.png)

Es recomana que, un cop es posi en marxa la nova plataforma, les noves aplicacions que s'integrin al servei utilitzin aquesta REST API.

### Formularis HTML5

En aquest punt s'està treballant tant en la vessant més **tècnica** com en la **governança** d'aquest nou servei de Formularis HTML5. Els Adaptive Forms d'AEM són els elements que proporcionen formularis HTML5 adaptatius als usuaris

![REST API eForms](/related/sgde/formulari-html5.png)

<br><br>

Aquesta actualització del producte s'està realitzant en una infraestructura paral·lela a l'actual. Per tant, caldrà que els integradors facin proves en aquesta nova plataforma abans no es posi en servei. Si les proves són satisfactòries, el canvi de plataforma haurà de ser totalment transparent.

Durant les pròximes setmanes s'aniran comunicant amb més detall totes les novetats d'aquesta actualització en aquest mateix portal, així com una planificació de disponibilitat d'entorns, períodes de proves per part dels integradors, i posada en marxa del servei. També s'enviaran notificacions per correu als integradors per consensuar aquest calendari.

Per qualsevol dubte us podeu posar en contacte amb el CS Canigó preferiblement a través del [servei STF del CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/STF) o [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
