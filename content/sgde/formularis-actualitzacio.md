+++
date        = "2018-03-09"
title       = "Actualització de plataforma al servei d'eFormularis"
description = "Upgrade de versió d'Adobe LiveCycle a Adobe Experience Manager (AEM)"
sections    = "SGDE"
toc         = true
taxonomies  = []
weight 		= 4
+++

Des del CS Canigó s'està treballant en l'actualització del producte base del servei, Adobe LiveCycle ES4. **Adobe Experience Manager (AEM) 6.3** és l'evolució d'aquest producte, el qual, a més d'oferir les mateixes funcionalitats de les que ja disposa Adobe LiveCycle, n'afegeix de noves. D'entre aquestes noves funcionalitats destaca la possibilitat de poder treballar amb formularis HTML5.

Per tant, l'actualització del producte té principalment dos objectius:

* Evitar l'obsolescència mantenint la compatibilitat amb les funcionalitats actuals relatives a **Formularis PDF**
* Oferir un nou motor per poder donar servei a **Formularis HTML5**

## Formularis PDF

_Dominis PRE_

* preproduccio.eformularis.intranet.gencat.cat
* eformularis.pre.intranet.gencat.cat
* preproduccio.sgde.intranet.gencat.cat
* sgde.pre.intranet.gencat.cat

_Dominis PRO_

* eformularis.intranet.gencat.cat
* sgde.intranet.gencat.cat

### Autoservei Adobe (Existent)

Aplicació web per l'activació i publicació de formularis PDF.

_PRE_

http://preproduccio.eformularis.intranet.gencat.cat/AutoserveiAdobe

_PRO_

http://eformularis.intranet.gencat.cat/AutoserveiAdobe

### WS SOAP (Existent)

Webservice per operar amb formularis PDF. Els contractes de les diferents versions del webservice es mantindran intactes:

_PRE_

http://preproduccio.eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://preproduccio.eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://preproduccio.eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

_PRO_

http://eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV2?wsdl
http://eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacioV1?wsdl
http://eformularis.intranet.gencat.cat/ServeisInvocacio/serveis/ServeisInvocacio?wsdl

### REST API (Nova)

Com a millora a l'actual servei de Formularis PDF, s'incorpora una nova REST API amb les mateixes funcionalitats que ofereix el WS SOAP. Aquesta REST API està basada en Swagger2.

![REST API eForms](/related/sgde/serveis-invocacio-api.png)

Es recomana que, un cop es posi en marxa la nova plataforma, les noves aplicacions que s'integrin al servei utilitzin aquesta REST API. En breu es publicarà informació de com fer ús d'aquesta nova API.

## Formularis HTML5

En aquest punt s'està treballant tant en la vessant més **tècnica** com en la **governança** d'aquest nou servei de Formularis HTML5. Els Adaptive Forms d'AEM són els elements que proporcionen formularis HTML5 adaptatius als usuaris.

![REST API eForms](/related/sgde/formulari-html5.png)

<br><br>

Aquesta actualització del producte s'està realitzant en una infraestructura paral·lela a l'actual. Per tant, caldrà que els integradors facin proves en aquesta nova plataforma abans no es posi en servei. Si les proves són satisfactòries, el canvi de plataforma haurà de ser totalment transparent.

Durant les pròximes setmanes s'aniran comunicant amb més detall totes les novetats d'aquesta actualització en aquest mateix portal, així com una planificació de disponibilitat d'entorns, períodes de proves per part dels integradors, i posada en marxa del servei. També s'enviaran notificacions per correu als integradors per consensuar aquest calendari.

## Comunicacions

### [6-4-2018] Comunicat eFormularis - Actualització tecnològica del servei

Benvolguts,
 
Des del CS Canigó us informem que pròximament es farà efectiva una actualització tecnològica del servei **eFormularis**(Formularis Adobe).
 
Emmarcat en l’evolució de la plataforma d’eFormularis, es desplegarà la solució AEM (Adobe Experience Manager) que substitueix a l’actual Adobe LiveCycle com a producte base del servei. En concret, amb aquest upgrade es pasa d'Adobe LiveCycle ES4 SP1 (11.0) a AEM 6.3, la instal·lació del qual s'ha realitzat en nous servidors amb noves versions de sistema operatiu i servidor d'aplicacions. Amb aquest canvi, a més de mantenir la plataforma al dia, s’evoluciona el servei per tenir capacitat de publicació de formularis en html a més dels actuals pdf.

El traspàs de formularis als nous servidors serà realitzat pel CS Canigó dins d'aquest procés d'actualització del servei i, per tant, no s’hauran de tornar a activar/publicar.
Igualment, les aplicacions consumidores del servei d'eFormularis hauran de validar que tot segueix funcionant igual que abans. Per fer-ho, prèviament hauran de sol·licitar connectivitat cap als nous servidors (ip:port) des dels servidors d’aplicacions on es troben desplegades. Aquest tràmit s'hauria de realitzar durant les dues properes setmanes (9-4-2018 - 23-4-2018) per l'entorn de Preproducció. Per l'entorn de Producció la data límit és el 11-6-2018 tot i que es recomana fer-ho amb la màxima antelació possible.

A continuació es descriuen els dominis i IPs dels entorns:
 
**PREPRODUCCIÓ**
 
_Dominis_:

eformularis.pre.intranet.gencat.cat (Deprecat)

preproduccio.sgde.intranet.gencat.cat

sgde.pre.intranet.gencat.cat (Deprecat)

_Nota: aquest domini no es va informar en el comunicat. Aprofitem per indicar que, de la mateixa manera que el domini "eformularis.pre.intranet.gencat.cat", es donarà de baixa a mig termini donat que no compleix la normativa de dominis_

preproduccio.eformularis.intranet.gencat.cat (Nou)
 
_IP actual_:

10.53.12.1 (port 80)
 
_IP nova_:
10.1.126.83 (ports 80 i 443)
 
**PRODUCCIÓ**
 
_Dominis_:

sgde.intranet.gencat.cat

eformularis.intranet.gencat.cat
 
_IP actual_:

10.52.12.1 (port 80)
 
_IP nova_:

10.1.118.54 (ports 80 i 443)
 
Pel nou entorn de preproducció es crearà el domini "preproduccio.eformularis.intranet.gencat.cat" per tal d’acomplir la normativa de nomenclatura de dominis. El domini "eformularis.pre.intranet.gencat.cat" es donarà de baixa durant els propers mesos, per tant, recomanem que les aplicacions que l'estiguin fent servir canviïn al nou "preproduccio.eformularis.intranet.gencat.cat". La data definitiva de baixa del domini "eformularis.pre.intranet.gencat.cat" es comunicarà pròximament.

Les dates de disponibilitat previstes dels nous entorns són les següents:

* **PRE**: 23-4-2018
* **PRO**: 11-6-2018

En cas que es requereixi accés a l’entorn antic de Preproducció a partir del 23-4-2018 fins el 11-6-2018, moment en que els nous entorns de Preproducció i Producció estiguin alineats, es podrà seguir fent per IP.
És molt recomanable provar els formularis en el nou entorn de Preproducció abans no es faci efectiu el canvi de servidors a l’entorn Productiu. Durant les dues darreres setmanes d'Abril i tot el mes de Maig està previst que les aplicacions facin aquestes proves al nou entorn de Preproducció i reportin possibles incidents preferiblement via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd) o en cas de no disposar de permisos d’accés a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat). Sol·licitem que el responsable de cada aplicació comuniqui la finalització de les proves i el seu resultat a aquesta bústia. Així des del CS Canigó podrem fer un seguiment de l’evolució d’aquestes proves en el nou entorn.
Voldríem destacar com a canvi més important el realitzat en les operacions que treballen amb fitxers annexes. Per aquestes en concret s'haurien de fer proves el més exhaustives que sigui possible. Tal com hem indicat al paràgraf anterior, per qualsevol problema us podeu posar en contacte amb el CS Canigó pels canals oficials.

Salutacions,


### [6-4-2018] Comunicat STD - Canvi IPs del servei

Benvolguts,

Des del CS Canigó us informem que pròximament les IPs dels dominis "preproduccio.sgde.intranet.gencat.cat" i "sgde.intranet.gencat.cat" del servei **STD (Sistema de Transformació de Documents)** canviaran degut a un canvi a la infraestructura:

**preproduccio.sgde.intranet.gencat.cat**

IP actual:

10.53.12.1 (port 80)

IP nova:

10.1.126.83(ports 80 i 443)

**sgde.intranet.gencat.cat**

IP actual:

10.52.12.1 (port 80)

IP nova:

10.1.118.54 (ports 80 i 443)

Les dates previstes pel canvi a cada entorn són les següents:

* **PRE**: 23-4-2018
* **PRO**: 11-6-2018

Cal que els integradors sol·licitin connectivitat cap a la nova ip i ports des dels servidors on es troben desplegades les aplicacions. Aquest tràmit s'hauria de realitzar durant les dues properes setmanes (9-4-2018 - 23-4-2018) per l'entorn de Preproducció. Per l'entorn de Producció la data límit és el 11/6 tot i que es recomana fer-ho amb la màxima antelació possible.

Per qualsevol dubte o incident podeu contactar amb el CS Canigó preferiblement via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd) o en cas de no disposar de permisos d’accés a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat). Sol·licitem que el responsable de cada aplicació confirmi que està preparada pel canvi a aquesta bústia.

Salutacions,

<br><br>
Per qualsevol dubte us podeu posar en contacte amb el CS Canigó preferiblement a través del [servei STF del CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/STF) o [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
