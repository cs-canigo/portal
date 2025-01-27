+++
date        = "2024-03-04"
title       = "Comunicació proveïdors d'aplicacions amb Suport Cloud"
description = "Canals de comunicació disponibles pels proveïdors d'aplicacions amb Suport Cloud"
sections    = "Cloud"
categories  = ["cloud"]
aliases     = ["/cloud/comunicacio-suport-cloud/"]
weight      = 6
+++

S'oficialitzen el [**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd.ctti.gencat.cat/jiracstd) i [**Remedy**](https://pautic.gencat.cat/) com a canals de comunicació amb l'equip de Suport Cloud. A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells:

<br/>

#### Aplicacions en servei

Per les aplicacions que estiguin en servei:

- **Remedy**

_Incidències_, _Consultes_ (*) i _Canvis_ que es vulguin fer arribar a l'equip de Suport Cloud s'han de crear a Remedy informant l'aplicació afectada com a "Service" i "AM22_23-N2-CSCLOUD" com a "Assigned Group".

(*) per les consultes cal informar el camp “INCIDENT TYPE” el valor “USER SERVICE REQUEST”.


<div class="message information">
Donat que a les plataformes Cloud gestionades des de Suport Cloud es dóna accés a <b>logs</b> i <b>monitoratge</b> de l'aplicació, per l'agilitat en la resolució de les incidències és vital que el proveïdor d'aplicacions hagi revisat abans tota la informació de la qual disposa. També gràcies als <b>jobs de desplegament</b> del <a href="http://canigo.ctti.gencat.cat/sic/">SIC</a> és autònom per redesplegar el servei afectat. Per tant, només haurien d'arribar incidències a Suport Cloud relacionades amb la plataforma (Ex. indisponibilitat global de la plataforma), que ni tan sols redesplegant el servei puguin resoldre's.
</div>

**Per tractar sol.licituds d'assignació de llicències de tipus Power Platform**, un cop Bústia de Llicències confirma que es pot assignar una llicència, hauríeu de sol·licitar al SAU que obri un tiquet de Remedy tipus "Consulta sense Service" i que l’assigni al grup "AM22_23-N2-CSCLOUD", adjuntant el correu de Bústia i el formulari de Power Platform degudament emplenat.

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
     
<br/>

  El conjunt de subtasques creades automàticament en la creació del tiquet ACOCLDSIC dependrà de la plataforma seleccionada:
   - Openshift
      - [Openshift] – INT- Crear Pipelines
      - [Openshift] – INT- Configurar Secrets
      - [Openshift] – INT- Instal·lar Certificats
      - [Openshift] – PRE – Crear Pipelines
      - [Openshift] – PRE – Configurar Secrets
      - [Openshift] – PRE – Instal·lar Certificats
      - [Openshift] – PRO – Crear Pipelines
      - [Openshift] – PRO – Configurar Secrets
      - [Openshift] – PRO – Instal·lar Certificats
      - [Openshift] – N/A – Creació CMDB

   - Azure
      - [Azure] – Aprovisionar xarxa i labels
      - [Azure] – Connexió NET0
      - [Azure] – Crear Pipelines
      - [Azure] – Creació CMDB

   - AWS
      - [AWS] – Aprovisionar xarxa i labels
      - [AWS] – Connexió NET0
      - [AWS] – Crear Pipelines
      - [AWS] – Creació CMDB
  
   - PowerPlatform
      - [PowerPlatform] – Instal·lar Llicències
      - [PowerPlatform] – PRE – Crear Entorn
      - [PowerPlatform] – PRO – Crear Entorn 
      - [PowerPlatform] – Creació CMDB
    
   - IBMCloud
      - [IBMCloud] – INT- Crear Pipelines
      - [IBMCloud] – INT- Configurar Secrets
      - [IBMCloud] – INT- Instal·lar Certificats
      - [IBMCloud] – PRE – Crear Pipelines
      - [IBMCloud] – PRE – Configurar Secrets
      - [IBMCloud] – PRE – Instal·lar Certificats
      - [IBMCloud] – PRO – Crear Pipelines
      - [IBMCloud] – PRO – Configurar Secrets
      - [IBMCloud] – PRO – Instal·lar Certificats
      - [IBMCloud] – N/A – Creació CMDB
    
   - GoogleCloud
      - [GoogleCloud] – Aprovisionar xarxa i labels
      - [GoogleCloud] – Connexió NET0
      - [GoogleCloud] – Crear Pipelines
      - [GoogleCloud] – Creació CMDB

   - OCI
      - [OCI] – Aprovisionar xarxa i labels
      - [OCI] – Connexió NET0
      - [OCI] – Crear Pipelines
      - [OCI] – Creació CMDB
        
<br/>

* Quan els tècnics de Suport Cloud comencin a treballar amb una de les subtasques, passaran la mateixa a l'estat In Progress.

* Si l' equip de Suport Cloud requereix informació addicional del lot d' aplicació posarà la subtasca en estat Pendent i l' assignarà a l' informador del tiquet ACOCLDSIC.
  
* Quan l' informador proporcioni la informació requerida pel tècnic de Suport Cloud, assignarà de nou la subtasca al tècnic i aquest la passarà a l' estat In Progress. L' informador assignarà la subtasca de nou al tècnic i detallarà en el camp Comentari la informació requerida o acció realitzada mitjançant l' opció Assignar, i la posarà en estat En Progrés mitjançant l' opció Usuari Afegeix.

* Un cop finalitzats els treballs requerits a la subtasca, el tècnic de Suport Cloud la passarà a l'estat Tancada pel motiu Finalitzada.

* Durant el temps de vida del projecte d' acompanyament, el lot d' aplicació podrà crear noves subtasques del tipus requerit que seran assignades al responsable del servei d' acompanyament de Suport Cloud i executades per Suport Cloud. El lot d' aplicació podrà demanar tasques addicionals en el projecte, incloses en l' abast del servei d' acompanyament Cloud, mitjançant la creació de noves subtasques. A la subtasca ha d' informar els camps següents:
   - Tasca: tipus de tasca demanada a Suport Cloud
   - Entorn
   - Resum
   - Descripció

  En cas que les subtasques creades pel lot no entrin en l' abast del servei, Suport Cloud les tancarà informant del motiu 
  Fora d' Àmbit.
  
* Un cop es finalitzin totes les tasques incloses en l' acompanyament de Suport Cloud per a un projecte, es tancarà el tiquet ACOCLDSIC amb el motiu Finalitzada.

<br/>

#### Aplicacions que no han iniciat el procés d'alta dins CTTI

_Consultes_ i _Suports_ han de realitzar-se al servei [**CS Suport Cloud**](https://cstd.ctti.gencat.cat/jiracstd/browse/CLD).

<br/>

En cas que no es disposi d’usuari al CSTD, cal que el gestor de projecte CTTI de l’aplicació faci arribar la petició d’alta d’usuari mitjançant una petició [**REMEDY**](https://pautic.gencat.cat/) de tipus “Gestió accés d'usuaris”, seleccionant “Alta” i l’aplicació “JIRA CSTD”, indicant DNI i el servei d’acompanyament que es vol sol·licitar l’accés”
