+++
date        = "2024-03-04"
title       = "Comunicació CPDs amb Suport Cloud"
description = "Canals de comunicació disponibles pels CPDs amb Suport Cloud"
sections    = "Cloud"
categories  = ["cloud"]
aliases     = ["/cloud/comunicacio-cpd-suport-cloud/"]
weight      = 6
+++

S'oficialitzen el [**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd-ctti.atlassian.net/) i [**Remedy**](https://pautic.gencat.cat/) com a canals de comunicació amb l'equip de Suport Cloud. A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells:

<br/>

#### Aplicacions en servei

Per les aplicacions que estiguin en servei:

- **Remedy**

_Incidències_, _Consultes_ (*) i _Canvis_ que es vulguin fer arribar a l'equip de Suport Cloud s'han de crear a Remedy informant l'aplicació afectada com a "Service" i "AM22_23-N2-CSCLOUD" com a "Assigned Group".

(*) per les consultes cal informar el camp “INCIDENT TYPE” el valor “USER SERVICE REQUEST”.

<br/>

#### Aplicacions en fase de projecte

S’ha creat un nou projecte per l’acompanyament Cloud i SIC que pròximament es posarà en servei.

Per a les aplicacions en fase de projecte la comunicació s’ha de fer via CSTD al servei [**Servei Acompanyament Suport Cloud i SIC**](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOCLDSIC/boards/43). El procediment que ha de seguir el CPD en els acompanyaments per part de Suport Cloud en fase de projecte mitjançant el projecte de Jira ACOCLDSIC és el següent:

* El lot d' aplicació obrirà un nou tiquet ACOCLDSIC a l' inici de la fase d' acompanyament de Suport Cloud. El conjunt de subtasques creades automàticament en la creació del tiquet ACOCLDSIC dependrà de la plataforma seleccionada.

* Durant el temps de vida del projecte d' acompanyament, el lot d' aplicació podrà crear noves subtasques del tipus requerit que seran assignades al responsable del servei d' acompanyament de Suport Cloud.

* Quan els tècnics de Suport Cloud comencin a treballar amb una de les subtasques, passaran la mateixa a l'estat In Progress.
  
* Si l' equip de Suport Cloud requereix informació addicional o treballs per part de CPD posarà la subtasca en estat Pendent i l' assignarà al tècnic de CPD.

* Quan el tècnic de CPD proporcioni la informació o realitzi les tasques requerides pel tècnic de Suport Cloud assignarà de nou la subtasca al tècnic i aquest la passarà a l' estat In Progress. Una vegada completat el treball, el tècnic de CPD l'assignarà de nou al tècnic de Suport Cloud i detallarà en el camp Comentari la informació requerida o el treball realitzat mitjançant l'opció Assignar, i la posarà en estat En Progrés mitjançant l'opció Usuari Afegeix.

* Un cop finalitzats els treballs requerits a la subtasca, el tècnic de Suport Cloud la passarà a l'estat Tancada pel motiu Finalitzada.
  
* Un cop es finalitzin totes les tasques incloses en l' acompanyament de Suport Cloud per a un projecte, es tancarà el tiquet ACOCLDSIC amb el motiu Finalitzada.

