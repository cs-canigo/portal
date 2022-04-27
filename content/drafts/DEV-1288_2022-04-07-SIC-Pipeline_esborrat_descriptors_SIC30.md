+++
date        = "2022-04-07"
title       = "SIC. Nova pipeline d'esborrat de descriptors al SIC 3.0"
description = "El SIC 3.0 proporciona una nova pipeline per a l'esborrat de descriptors desplegats (DELETE-DESCRIPTORS)."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "JUNY2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. A més de proporcionar una pipeline principal per al desplegament de l'aplicació i pipelines operatives
(start, stop o restart), es proporcionen pipelines avançades de desplegament:

- **DEPLOY-DESCRIPTORS**: permet desplegar canvis en els descriptors (noves variables d'entorn, canvis en la configuració i altres)
sense fer la construcció i desplegament de la imatge.

- **DEPLOY-ALL**: permet fer un desplegament complet davant canvis en l'aplicació, orquestradors i/o descriptors.

- **DEPLOY-TAG**: permet redesplegar un determinat tag de la imatge de l'aplicació que s'hagi desplegat amb èxit a producció,
concebuda per a poder fer un *rollback* a una versió anterior.

En aquest escenari, en cas de requerir revertir el desplegament d'un descriptor, el procediment implicava fer una petició
a l'equip de Suport Cloud.

## Novetats

Amb l'objectiu de dotar d'una major autonomia als lots d'aplicacions, el **SIC 3.0 passa a proporcionar una nova pipeline
anomenada `DELETE-DESCRIPTORS` que s'encarregarà de l'esborrat de descriptors desplegats a Openshift i Kubernetes**.
Aquesta pipeline s'ubica al directori "Advanced" i permetrà seleccionar l'entorn i el fitxer descriptor sobre el qual
actuar (permetent actuar sobre tots ells si així es requereix), i s'encarregarà de revertir el desplegament d'aquests
a la plataforma de contenidors.
Cal tenir present que el fitxer descriptor se seleccionarà d'entre els descriptors repositats al
Servei de Custòdia de Codi, per la qual cosa, si aquest descriptor no ha estat desplegat prèviament, la pipeline finalitzarà
amb errors.

Per a més informació: [Autoservei de pipelines](/sic30-serveis/autoservei-pipelines/).

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).