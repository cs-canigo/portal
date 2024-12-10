
+++
date         = "2024-11-20"
title        = "Tecnologies suportades"
description  = "Capacitats tecnològiques de la plataforma GitHub Enterprise Cloud (GHEC)"
weight      = "4"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-capacitat-tecnologiques",
    "/ghec/gh-capacitat-tecnologiques"
]
+++

## Objectiu  🚀

El present document descriu les diferents capacitats tecnològiques que suporta actualment la plataforma GHEC.


## Llenguates i tipus d'artefactes

A la següent matriu es poden observar els llenguatges i tipus d'artefactes suportats:

![Capacitat Tecnológiques](/images/GHEC/gh_capacidades_tecnologicas.png)


## Desplegament a hiperescalars 

Actualment, estan certificats els desplegaments als següents hiperescalars, sempre acotat als llenguatges i tipus d'artefactes indicats en la secció anterior:

![Capacitat Tecnológiques](/images/GHEC/gh-hyperescalares_cloud.png)                                        


## Altres capacitats

Addicionalment, la plataforma suporta les següents capacitats :

### Desplegaments a [API Manager corporatiu (APIM)](https://canigo.ctti.gencat.cat/plataformes/apim/)

Suport a les següents accions i operatives:

* **PUBLISH**: publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als catàlegs preproductius sempre que no hagin arribat a producció.

* **INFO**: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres). Caldrà seleccionar el catàleg del qual es desitja informació.

* Operatives:
    * **DELETE**: eliminació del producte. Caldrà seleccionar el catàleg sobre el qual es desitja esborrar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **DEPRECATE**: deprecació d’una versió del producte sense deixar cap versió vigent. Caldrà seleccionar el catàleg sobre el qual es desitja deprecar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **REPLACE**: retirada d’una de les versions vigents del producte i migració de subscripcions. Caldrà seleccionar el catàleg sobre el qual es desitja reemplaçar, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **RETIRE**: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden). Caldrà seleccionar el catàleg sobre el qual es desitja retirar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **SUPERSEDE**: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”. Caldrà seleccionar el catàleg sobre el qual es desitja fer el supersede, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.


    En el següent enllaç, es pot revisar la definició de workflows per a totes les tecnologies incloent API's: [Workflows Reutilitzables](../gh-definicio-workflows/).


### Desplegaments estesos

El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions cap a arquitectures cloud-native desplegades a Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser **clusters de Kubernetes** o **màquines virtuals**. També els desplegaments de canvis en **bases de dades** poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase o Flyway, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL o altres motors de bases de dades.

Les tecnlogies certificades actualment són les següents:

* Desplegaments a AWS de:
    * Scripts BBDD
    * Kubernetes amb Helm
    * Màquines Virtuals (En roadmap)

* Desplegaments a Azure de:
    * Scripts BBDD (En preparació)
    * Kubernetes amb Helm (En preparació)
    * Màquines Virtuals (En roadmap)


Més informació sobre desplegaments estesos : [Desplegaments Estesos](../gh-desplegaments-estesos/)


