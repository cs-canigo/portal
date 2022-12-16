+++
date = "2022-12-16"
title = "Com preparar productes i APIs per al desplegament a API Manager"
description = "Guia amb la informació més rellevant a tenir en compte per la integració al SIC del desplegament de productes i APIs a l'API Manager corporatiu"
sections = "SIC"
toc = true
taxonomies = []
weight = 2
+++

## Introducció

El **[Servei d'Integració Contínua](/sic/) és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**.

**L'[API Manager Corporatiu](/apim/) és una plataforma en modalitat SaaS basada en la solució IBM API Connect 10 Reserved Instance**.
Aquest servei permet gestionar el cicle de vida de les APIS de manera senzilla i segura amb l’objectiu de facilitar-ne
tant la seva publicació com el seu consum.

La organització de catàlegs, espais i productes és la següent:

- Hi ha **quatre catàlegs segons el tipus d’entorn i el tipus de visibilitat**: privat-pre, public-pre, privat i public.
- **Cada codi de diàleg disposarà d'un espai propi** amb la nomenclatura "CD" + <codi_diàleg> (agrupació de productes). Per exemple: "CD0192".
- Un producte és una agrupació d’APIs i plans que les acompanyen (unitat mínima a versionar, desplegar i subscriure).

## Preparació de productes i APIs

Un cop fet el desenvolupament amb [API Designer](https://www.ibm.com/docs/en/acvfc?topic=applications-creating-api-definitions-by-using-api-designer),
caldrà exportar els yml de definició del producte i les seves APIS per a repositar-los al sistema de gestió de
codi font (SCM - Source Code Management) del SIC d'acord amb les següents premisses:

* Cada producte es correspondrà amb un projecte dins el **codi de diàleg** adient, de forma que tota la gestió posterior de jobs
i creació de peticions Remedy s'associïn a l'aplicació corresponent. Per aquest mateix motiu, **no està contemplat la creació
de subgrups de projectes**, tot i que l'eina ho permeti.

* Els projectes poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la **branca MASTER**
i el contingut d’aquesta branca serà amb el que
treballaran les pipelines de desplegament per defecte. No obstant això, el sistema permetrà opcionalment
desplegar el codi font associat a la **branca EVOLUTIUS**.

* Aquest repositori **no és un entorn de desenvolupament**, per la qual cosa només les persones assignades com a Release
Managers seran les encarregades de consolidar el codi i
lliurar-lo. Aquest codi font ja haurà d'estar validat en entorns de desenvolupament i es lliurarà quan es decideixi
distribuir als entorns dels serveis TIC centrals.

* Les **pipelines seran les encarregades de generar els TAGS de Release** de codi corresponents.

## Preparació de la integració al SIC

Per tal de configurar la integració al SIC, tots els projectes hauran de disposar de la carpeta `/sic` al primer nivell
de carpeta i, dins d’aquesta carpeta, caldrà crear l’arxiu de configuració `aca.yml` que proporcionarà la configuració necessària:

|Variable|Requerit|Descripció|Valor per defecte|Exemple|
|--------|--------|----------|-----------------|-------|
|APIC_PRODUCT_FILE|No|Ruta i nom del fitxer descriptor per al desplegament de l'aplicació a l'Api Manager. La variable només serà requerida en cas que la ruta i/o nom del fitxer difereixi del suggerit|product.yml|-|
|APIC\_TARGET\_URL\_{N}|Si|URL de destí de les API's. <br/>- Format de la clau: APIC\_TARGET\_URL\_{0-*9a-*zA-Z}<br/>- Format del valor: \<api-file-name-with-extension\>:\<target-url\>|-|APIC\_TARGET\_URL\_1: 'api_1.0.0.yml:https\://backend/api'|

<br/><br/>
Per a més informació, podeu consultar:

- [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)
- [Exemple fitxer ACA](/related/sic/3.0/aca_despl_api_manager.yml)

## Funcionament

El SIC s'encarrega de la publicació i el desplegament automatitzat de les APIS,
atorgant la màxima agilitat i autonomia als equips de desenvolupament. En aquest sentit, es proporciona un conjunt de
pipelines que permeten gestionar el seu cicle de vida d’una forma estandarditzada:

- **PUBLISH**: publicació d’una nova versió d’un producte i APIS associades.
- **INFO**: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres).
- Operatives:
    * **DELETE**: eliminació del producte
    * **DEPRECATE**: deprecació d’una versió del producte sense deixar cap versió vigent.
    * **REPLACE**: retirada d’una de les versions vigents del producte i migració de subscripcions.
    * **RETIRE**: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden).
    * **SUPERSEDE**: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”.

Per a més informació, podeu consultar: [Servei d'API Manager Corporatiu](/apim/).

<br/>
Cal tenir present que:

- Durant el desplegament es requeriran **accions d’usuari** destinades a autoritzar l’evolució de les etapes de desplegament.
- Els jobs **notificaran** dels resultats a les adreces de correu assignades.

## Control i seguretat

El SIC aplica una sèrie de mecanismes de control i seguretat (snippets) que poden implicar canvis respecte a la
definició de productes i APIs del proveïdor:

- S’aplicaran **plans estandarditzats CTTI amb aprovació obligatòria de subscripcions**:

```yaml
plans:
  default-plan:
    title: Default Plan
    description: Default Plan
    approval: true
    rate-limits:
      default:
        value: 30/1second
        hard-limit: true
    burst-limits:
      default:
        value: 300/1second
```

- La **visibilitat del producte serà sempre de tipus `authenticated`**:

```yaml
visibility:
  view:
    type: authenticated
    orgs: []
    tags: []
    enabled: true
  subscribe:
    type: authenticated
    orgs: []
    tags: []
    enabled: true
```

- S’establirà **un mateix OAuth Provider per a totes les APIS d’un mateix catàleg**. Es contemplen dos tipus, que seran configurats
per l'equip de SIC: IBM Default o autenticació Gicar.

- No es permetrà configurar especificitats singulars per a les APIS dins un pla. En aquest sentit, la secció
"x-ibm-configuration.assembly.execute" serà reemplaçada aplicant la configuració de *target-url' indicada al fitxer ACA:

```yaml
execute:
  - set-variable:
      version: 2.0.0
      title: set-variable
      actions:
        - set: message.headers.authorization
          value: $(message.original.headers.authorization)
          type: string
  - invoke:
      title: invoke
      version: 2.0.0
      verb: keep
      target-url: '<replace_target_url>$(request.path)'
      follow-redirects: false
      timeout: 60
      parameter-control:
        type: blocklist
      header-control:
        type: blocklist
        values:
          - ^X-IBM-Client-Id$
      inject-proxy-headers: true
```

## Projecte d'exemple

Podeu descarregar el següent [Projecte d'exemple](/related/sic/3.0/apim-demo-project.zip).



<br/><br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).