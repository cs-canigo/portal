+++
date        = "2018-01-17"
title       = "Comunicació proveïdors d'aplicacions amb Suport Cloud"
description = "Canals de comunicació disponibles pels proveïdors d'aplicacions amb Suport Cloud"
sections    = "Container Cloud"
categories  = ["cloud"]
+++

S'oficialitzen el [**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd.ctti.gencat.cat/) i [**Remedy**](https://pautic.gencat.cat/) com a únics canals de comunicació amb l'equip de Suport Cloud. A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells:

<br/><br/><br/><br/>

#### Aplicacions en "running"

Per les aplicacions que estiguin en running:

- **Remedy**

_Incidències_ i _Canvis_ que es vulguin fer arribar a l'equip de Suport Cloud s'han de crear a Remedy informant l'aplicació afectada com a "Service" i "A6-N3-CLOUD" com a "Assigned Group".

Donat que a les plataformes Cloud gestionades des de Suport Cloud es dóna accés a logs i monitorització de l'aplicació, per l'agilitat en la resolució de les incidències és vital que el proveïdor d'aplicacions hagi revisat abans tota la informació de la qual disposa. També gràcies als jobs de desplegament del [**SIC**](http://canigo.ctti.gencat.cat/sic/) és autònom per redesplegar el servei afectat. Per tant, només haurien d'arribar incidències a Suport Cloud relacionades amb la plataforma (Ex. indisponibilitat global de la plataforma), que ni tan sols redesplegant el servei puguin resoldre's.

- **CSTD**

_Consultes_ i _Suports_ han de realitzar-se al servei [**CS Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/CLD).

<br/><br/>

#### Aplicacions en "fase de projecte"

Per les aplicacions en fase de projecte, la comunicació sempre s'ha de fer via **CSTD** al servei [**Servei Acompanyament Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLD). El proveïdor d'aplicacions ha de crear una petició en aquest servei informant el camp Sumari "Suport projecte <NOM_PROJECTE>". Mentre l'aplicació estigui en fase de projecte tot el suport (Ex. definició imatges Docker, definició descriptors de desplegament,...) es canalitzarà en aquesta petició.

<br/><br/>

#### Aplicacions que no han iniciat el procés d'alta dins CTTI

**Consultes** i **Suports** han de realitzar-se al servei [**CS Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/CLD).

<br/><br/>

En cas que no es disposi d'usuari al CSTD, cal que el gestor de projecte CTTI de l'aplicació faci arribar la petició d'alta d'usuari al propi [servei CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CSTD) o bé enviant un correu a la bústia [cstd.ctti@gencat.cat](mailto:cstd.ctti@gencat.cat).

Les peticions dirigides a la bústia [suport.cloud@gencat.cat](mailto:suport.cloud@gencat.cat) seràn rebutjades comunicant el canal adient per realitzar la petició.
