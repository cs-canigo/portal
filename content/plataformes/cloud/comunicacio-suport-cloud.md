+++
date        = "2022-07-27"
title       = "Comunicació proveïdors d'aplicacions amb Suport Cloud"
description = "Canals de comunicació disponibles pels proveïdors d'aplicacions amb Suport Cloud"
sections    = "Cloud"
categories  = ["cloud"]
aliases     = ["/cloud/comunicacio-suport-cloud/"]
weight      = 6
+++

S'oficialitzen el [**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLD) i [**Remedy**](https://pautic.gencat.cat/) com a canals de comunicació amb l'equip de Suport Cloud. A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells:

<br/>

#### Aplicacions en servei

Per les aplicacions que estiguin en servei:

- **Remedy**

_Incidències_, _Consultes_ (*) i _Canvis_ que es vulguin fer arribar a l'equip de Suport Cloud s'han de crear a Remedy informant l'aplicació afectada com a "Service" i "AM10_19-N3-CLOUD" com a "Assigned Group".

(*) per les consultes cal informar el camp “INCIDENT TYPE” el valor “USER SERVICE REQUEST”.


<div class="message information">
Donat que a les plataformes Cloud gestionades des de Suport Cloud es dóna accés a <b>logs</b> i <b>monitoratge</b> de l'aplicació, per l'agilitat en la resolució de les incidències és vital que el proveïdor d'aplicacions hagi revisat abans tota la informació de la qual disposa. També gràcies als <b>jobs de desplegament</b> del <a href="http://canigo.ctti.gencat.cat/sic/">SIC</a> és autònom per redesplegar el servei afectat. Per tant, només haurien d'arribar incidències a Suport Cloud relacionades amb la plataforma (Ex. indisponibilitat global de la plataforma), que ni tan sols redesplegant el servei puguin resoldre's.
</div>

**Per tractar sol.licituds d'assignació de llicències de tipus Power Platform**, un cop Bústia de Llicències confirma que es pot assignar una llicència, hauríeu de sol·licitar al SAU que obri un tiquet de Remedy tipus "Consulta sense Service" i que l’assigni al grup "AM10_19-N3-CLOUD", adjuntant el correu de Bústia i el formulari de Power Platform degudament emplenat.

<br/>

#### Aplicacions en fase de projecte

Per les aplicacions en fase de projecte la comunicació s'ha de fer via **CSTD** al servei [**Servei Acompanyament Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLD). El proveïdor d'aplicacions ha de crear una petició en aquest servei informant el camp Sumari "Suport projecte NOM_PROJECTE". Mentre l'aplicació estigui en fase de projecte tot el suport (Ex. definició d'imatges Docker, definició de descriptors de desplegament,...) es canalitzarà en aquesta petició.

<br/>

S’ha creat un nou projecte per l’acompanyament Cloud i SIC que pròximament es posarà en servei.

Per a les aplicacions en fase de projecte la comunicació s’ha de fer via CSTD al servei [**Servei Acompanyament Suport Cloud i SIC**](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLDSIC). El procediment que ha de seguir el lot d'aplicació per a sol·licitar un acompanyament per part de Suport Cloud en fase de projecte mitjançant el projecte de Jira ACOCLDSIC és el següent:

* El lot d' aplicació obrirà un nou tiquet ACOCLDSIC a l' inici de la fase d' acompanyament de Suport Cloud. En la creació del tiquet s' hauran d' informar com a servei Suport Cloud, així com altres camps obligatoris que determinaran, entre altres coses, les subtasques que es crearan automàticament per al tiquet d' acompanyament. El tiquet ACOCLDSIC s' assignarà automàticament al responsable del servei d' acompanyament de Suport Cloud. En el tiquet ha d' informar els camps següents:
   - Tipus d' Incidència: Acompanyament Cloud
   - Organisme
   - Projecte
   - Resum
   - Codi ISOL
   - Descripció
   - CPD
   - Plataforma
   - Codi Servei
   - Codi Aplicació

El conjunt de subtasques creades automàticament en la creació del tiquet ACOCLDSIC dependrà de la plataforma seleccionada:

<br/>

#### Aplicacions que no han iniciat el procés d'alta dins CTTI

_Consultes_ i _Suports_ han de realitzar-se al servei [**CS Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/CLD).

<br/>

En cas que no es disposi d'usuari al CSTD, cal que el gestor de projecte CTTI de l'aplicació faci arribar la petició d'alta d'usuari al propi [servei CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CSTD) o bé enviant un correu a la bústia [cstd.ctti@gencat.cat](mailto:cstd.ctti@gencat.cat).
