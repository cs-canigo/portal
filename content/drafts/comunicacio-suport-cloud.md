+++
date        = "2018-01-17"
title       = "Comunicació proveïdors d'aplicacions amb Suport Cloud"
description = "Canals de comunicació disponibles pels proveïdors d'aplicacions amb Suport Cloud"
sections    = "Container Cloud"
categories  = ["cloud"]
+++

S'oficialitza el [**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd.ctti.gencat.cat/) i [**Remedy**](https://pautic.gencat.cat/) com a únics canals de comunicació oficials amb l'equip de Suport Cloud. A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells:

### Aplicacions en **fase de projecte**:

Per les aplicacions en fase de projecte la comunicació sempre s'ha de fer via CSTD al servei [Servei Acompanyament Suport Cloud](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLD). El proveïdor d'aplicacions ha de crear una petició en aquest servei informant al camp Sumari "Suport projecte <NOM_PROJECTE>". Mentre l'aplicació estigui en fase de projecte tot el suport (Ex. definició imatges Docker, definició descriptors de desplegament,...) es canalitzarà en aquesta petició.

### Aplicacions en **running**:

Per les aplicacions que estiguin en running:

* Remedy: les incidències s'han de crear a Remedy informant l'aplicació afectada com a "Service*+" i "A6-N3-CLOUD" com a "Assigned Group*+". Donat que en les plataformes Cloud gestionades des de Suport Cloud es dona accés a logs i monitorització de l'aplicació, per l'agilitat en la resolució de les incidències és vital que el proveïdor d'aplicacions hagi revisat abans tota la informació de la que disposa. Només haurien d'arribar incidències a Suport Cloud relacionades amb la plataforma (Ex. indisponibilitat global de la plataforma).
* CSTD (Centre de Suport Tecnològic al Desenvolupament): 

Les peticions dirigides a la bústia [suport.cloud@gencat.cat](mailto:suport.cloud@gencat.cat) seràn rebutjades comunicant el canal adient per realitzar la petició.


- Funcions internes CS Cloud: per a tasques internes de l'equip a les que no vulguem donar visibilitat. Per a noves solucions (projectes d'Integració de Solucions) utilitzarem tasques de tipus "Projecte" amb totes les subtasques necessàries.
- Acompanyament: aquesta tasca de suport d'un recorregut més llarg del que pugui ser una petició puntual per informar una incidència, consulta, etc, la faríem servir pel suport continuat en fase de projecte, i que ara són correus amunt i avall i/o trucades amb els proveïdors. Aquestes tasques s'enllaçarien amb el "Projecte" intern nostre del que he parlat en el punt anterior.
- CS Cloud: per a Incidències/Consultes/Suport/Canvis dels projectes en running.

El servei a informar seria l'aplicació (Ex. Memorial, Sala Premsa, ...) en qüestió, i ens l'assignarien a "A6-N3-CLOUD". Això no hauria d'anar via JIRA CSTD.
