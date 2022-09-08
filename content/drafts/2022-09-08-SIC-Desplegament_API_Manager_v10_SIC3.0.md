+++
date        = "2022-09-08"
title       = "SIC. Desplegament API Manager corporatiu al SIC 3.0"
description = "El SIC 3.0 permet dur a terme la publicació i el desplegament automatitzat de les APIS de producte."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
key         = "OCTUBRE2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**.

La Generalitat de Catalunya ofereix una Plataforma per al servei d’**API Manager Corporatiu** en modalitat SaaS basada
en la solució IBM API Connect 10 Reserved Instance. Aquest servei permet gestionar el cicle de vida de les APIS de
manera senzilla i segura amb l’objectiu de facilitar-ne tant la seva publicació com el seu consum.

## Novetats

El **SIC 3.0 passa a permetre la publicació i el desplegament automatitzat de les APIS per a gestionar el seu cicle de vida,
atorgant la màxima agilitat i autonomia als equips de desenvolupament**. Amb aquest objectiu, es proporciona un conjunt
de pipelines que permeten gestiona el cicle de vida complet de les APIS d'una forma estandaritzada:

- PUBLISH: publicació d’una nova versió d’un producte i APIS associades
- INFO: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres)
- Operacions:
    * DELETE: eliminació del producte
    * DEPRECATE: deprecació d’una versió del producte sense deixar cap versió vigent
    * REPLACE: retirada d’una de les versions vigents del producte i migració de subscripcions
    * RETIRE: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden)
    * SUPERSEDE: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”

Per a més informació, podeu consultar: https://canigo.ctti.gencat.cat/apim/

Amb l’objectiu que els usuaris sàpiguen com s’ha de configurar i quin serà el funcionament, s’ha adaptat la documentació i s’han
incorporat exemples:

- [Autoservei de pipelines](/sic30-serveis/autoservei-pipelines/)
- [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)
- [Exemple fitxer ACA](/related/sic/3.0/aca_despl_api_manager.yml.yml)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).