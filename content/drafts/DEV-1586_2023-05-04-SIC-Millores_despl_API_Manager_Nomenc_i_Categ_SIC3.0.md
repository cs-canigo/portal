+++
date        = "2023-05-02"
title       = "SIC. Millores al desplegament API Manager corporatiu al SIC 3.0: nomenclatura i categories de cerca"
description = "El SIC 3.0 incorpora millores per a dur a terme la publicació i el desplegament automatitzat de les APIS de producte."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
key         = "MAIG2023"
+++

## Introducció

El **[Servei d'Integració Contínua](/sic/) és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**.

**L'[API Manager Corporatiu](/apim/) és una plataforma en modalitat SaaS basada en la solució IBM API Connect 10 Reserved Instance**.
Aquest servei permet gestionar el cicle de vida de les APIS de manera senzilla i segura amb l’objectiu de facilitar-ne
tant la seva publicació com el seu consum.

## Novetats

**El SIC 3.0 passa a incorporar un nou estàndard de nomenclatura i categories** que es detalla a continuació:

### Nomenclatura

El SIC aplica una sèrie d'**estàndards de nomenclatura** amb l'objectiu de facilitar la identificació a simple vista de productes
i APIs publicades per part dels subscriptors i, a més, mitigar el possible risc de solapament de recursos. Les regles de
nomenclatura aplicades són les següents:

- Productes:

    * `name` obligatori i immutable que es correspon amb el codi de diàleg, el caràcter separador "-" i el nom del projecte.
      Per exemple: "0192-apim_demo_project".
    * `title` obligatori amb prefix de codi de diàleg, un espai en blanc i un text lliure. Per exemple: "0192 APIM Demo Project".

- APIs:

    * `x-ibm-name` obligatori amb prefix de codi de diàleg, el caràcter separador '-' i l'identificador de l'API.
      Per exemple: "0192-api_a".
    * `basePath` inclou el codi de diàleg. Per exemple: "/0192/api_a". Per tal de resoldre la crida al `target-url`
      de l’aplicació, s'implementa un pas a l’`Assembly` que s’encarrega d’eliminar el codi de diàleg del `requestPath`.

En qualsevol cas, si aquests criteris no s'acompleixen a la configuració del producte o les APIs, **el SIC durà a terme
els reemplaçaments necessaris per a assegurar la seva aplicació**. Donat el nom del producte és immutable, aquest no es
demana de cara a l’execució de les pipelines operatives de gestió del cicle de vida: DELETE, DEPRECATE, REPLACE, RETIRE
i SUPERSEDE.

### Categories de cerca

Amb l'objectiu de permetre l'aplicació de criteris de cerca sobre productes i APIs publicades als diferents catàlegs,
el SIC s'encarrega de la **injecció automàtica de dos nivells estàndards de categories** per codi de diàleg i nom del
projecte. Aquestes categories no invalidaran en cap cas les que es puguin haver indicat a la configuració,
simplement s'afegiran si no hi són.

### Exemples

A continuació, es mostren exemples amb els criteris aplicats:

- Exemple de configuració de producte:

```yaml
info:
  version: 1.0.1
  title: 0192 APIM Demo Project
  name: 0192-apim_demo_project
  categories:
    - '0192'
    - '0192/apim_demo_project'
```

- Exemple de configuració d'API:

```yaml
swagger: "2.0"
info:
  version: 1.0.1
  title: 0192 APIM Demo Project Api_a
  x-ibm-name: 0192-api_a
basePath: /0192/api_a
x-ibm-configuration:
  ...
  categories:
    - '0192'
    - '0192/apim_demo_project'
    - '0192/apim_demo_project/api_a'
  ...
```

## Impacte i estratègia de regularització

**La posada en servei de la funcionalitat descrita prevista per al 04/05/2023 és disruptiva** donat el nom del producte
(`info.name`) i de les APIs (`info.x-ibm-name`) sofreix canvis, així com el seu endpoint de consum (`basePath`).
Per la qual cosa, i pel que fa als productes integrats al SIC que requereixen regularització, es preveu la següent
estratègia posterior a la posada en servei:

1. El lot d'aplicacions desplega una nova versió del producte normalitzada mitjançant la pipeline de publicació de versions.

2. A partir d'aquest moment, les pipelines del SIC de gestió del cicle de vida de les APIs (DELETE, DEPRECATE, REPLACE,
RETIRE i SUPERSEDE) deixaran de ser operatives temporalment, ja que passaran a gestionar el nou identificador de producte
publicat. Per la qual cosa, cal fer una [Petició de suport a l'OT API Manager](/apim/suport/#aplicacions-en-servei)
per tal de:

    * Indicar que el nou producte com a "migration target" del producte a retirar,

    * Dur a terme la migració de subscripcions cap al nou producte,

    * Finalment, retirar el producte antic, que haurà quedat sense subscripcions i ja es podrà esborrar sense impacte.


<br/><br/>
Amb l’objectiu que els usuaris sàpiguen com s’ha de configurar i quin serà el funcionament, s’ha adaptat la documentació i s’han
incorporat exemples:

- [Com preparar productes i APIs per al desplegament a l'API Manager](/drafts/DEV-1586_preparar-apim/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).