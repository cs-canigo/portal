+++
date        = "2021-12-09"
title       = "SIC. Integració ITSM SIC 3.0"
description = "A partir del dd/MM/yyyy s'ha posat en servei la integració amb ITSM Remedy pels desplegaments en modalitat automàtica o delegada als entorns de PRE i PRO al SIC 3.0."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "FEBRER2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. 

El servei i eina per la gestió de serveis de tecnologies de la informació (ITSM en anglès) **Remedy és l'eina de gestió de desplegaments utilitzada pel CTTI**.

Fins el moment, el SIC només tenia la integració amb ITSM per la gestió dels desplegaments en el SIC en la modalitat semiautomàtica. En la integració, el propi SIC genera un tiquet Remedy CRQ en mode "Draft" que el proveïdor ha d'acabar de complimentar per a la realització del desplegament.

## Novetats

A partir del dia **dd/MM/yyyy (modificar la description també)** s'ha posat en servei la integració amb ITSM pels desplegaments en modalitat automàtica o delegada als entorns de PRE i PRO al SIC 3.0 per la generació de tiquets Remedy CRQ automàtics.

Amb aquesta integració actualment al SIC existeixen 2 tipus de integració amb ITSM per a generar tiquet Remedy CRQ: automàtics i en mode “Draft”.

La integració amb ITSM per la generació de tiquets Remedy CRQ automàtics es realitzen en les modalitats de desplegament automàtics al cloud i delegat als entorns de PRE i PRO. L’objectiu de la integració és enregistrar els desplegaments a l’eina ITSM pels entorns de PRE i PRO.

La integració amb ITSM per la generació de tiquets Remedy CRQ en mode “Draft” es realitza en la modalitat de desplegament semiautomàtic. Amb la nova integració aquesta integració no pateix canvis. El seu objectiu és generar una plantilla de petició Remedy que el proveïdor ha d’acabar de complimentar per a realitzar el desplegament.

Amb aquestes integracions, el ITSM té tota la informació per a realtizar l’auditoria de l’activitat dels desplegaments als entorns de PRE i PRO.


### Integració amb ITSM per la generació de tiquets Remedy CRQ automàtics

Aquesta integració aplica a les pipelines de desplegament del SIC 3.0: DEPLOY, DEPLOY-TAG, DEPLOY-ALL, DEPLOY-DESCRIPTORS i DEPLOY-APIM.

En el moment en que s'inicia el desplegament de l'entorn, en el stage de "Deploy confirmation", l'usuari haurà d'indicar la informació requerida per a la generació del tiquet Remedy: servei associat, categorització i informació del desplegament.

Com a dates de planificació del canvi, s’assumirà la data i hora en què s’inicia el desplegament i una previsió estàndard de finalització de 30 minuts.

Un cop indicada la informació requerida i confirmat el desplegament, en el stage "ITSM Register" es generarà el tiquet Remedy CRQ amb tota la informació necessària.

Un cop realitzat el desplegament, incloent-hi possibles tasques pre-post desplegament, en el stage "ITSM Close" s'actualitzarà el tiquet a "Implementation in Progress" i rao (status reason) "In development" indicant la data i hora d'inici real del desplegament i es tancarà el tiquet segons les següents situacions:

- El desplegament finalitza correctament: Estat = Closed – Successful, indicant la data i hora de finalització del desplegament. En aquest cas la pipeline continua amb les següents etapes.

- El desplegament finalitza amb errors: Estat = Closed – Unsuccessful, indicant la data i hora de finalització del desplegament. En aquest cas la pipeline es cancel·la indicant que s'han produït errors en el desplegament.
   

<br/>
Per a més informació:

- [Servei d'Integració Contínua](/sic30-serveis/ci/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
