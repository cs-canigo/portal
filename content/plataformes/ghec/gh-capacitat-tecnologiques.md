
+++
date         = "2024-11-20"
title        = "Capacitat Tecnológiques de GHEC"
description  = "Capacitat Tecnológiques de GHEC"
weight      = "2"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-capacitat-tecnologiques",
    "/ghec/gh-capacitat-tecnologiques",
    "/plataformes/ghec/gh-capacitat-tecnologiques"
]
+++

## Objectiu  🚀

El present document descriu les diferents capacitats tecnològiques que suporta actualment la plataforma de GHEC.

## Capacitats Tecnològiques  📋

Les diferents capacitats tecnològiques que actualment suporta la plataforma són :


### Tipus d'Artefactes i les seves tecnologies

En el següent quadrant es poden observar les capacitats de tipus de repositoris o artefactes que són suportades en el model.

![Capacitat Tecnológiques](/images/GHEC/gh_capacidades_tecnologicas.png)


### Desplegament a Hyperescalares 

Actualment, se suporten els desplegaments en els següents Hyperescalars, de les tecnologies i artefactes indicats en el capítol anterior:

![Capacitat Tecnológiques](/images/GHEC/gh-hyperescalares_cloud.png)                                        

### Altres capacitats
Addicionalment, la plataforma suporta les següents capacitats :

* ### Desplegaments d'API's en IBM API Connect. 

    ![IBM APIConnect](/images/GHEC/gh-ibm_api_connect.png)

    Suport a les següents accions i operatives :

    * PUBLISH: publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als catàlegs preproductius sempre que no hagin arribat a producció.

    * INFO: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres). Caldrà seleccionar el catàleg del qual es desitja informació.

    * Operatives:
        * DELETE: eliminació del producte. Caldrà seleccionar el catàleg sobre el qual es desitja esborrar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
        * DEPRECATE: deprecació d’una versió del producte sense deixar cap versió vigent. Caldrà seleccionar el catàleg sobre el qual es desitja deprecar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
        * REPLACE: retirada d’una de les versions vigents del producte i migració de subscripcions. Caldrà seleccionar el catàleg sobre el qual es desitja reemplaçar, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.
        * RETIRE: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden). Caldrà seleccionar el catàleg sobre el qual es desitja retirar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
        * SUPERSEDE: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”. Caldrà seleccionar el catàleg sobre el qual es desitja fer el supersede, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.


    En el següent enllaç, es pot revisar la definició de workflows per a totes les tipologies incloent API's
    [Workflows Reutilitzables](../gh-definicio-workflows/)

    Més informació sobre API's al portal de Canigó 
    [Informació sobre API's]( https://canigo.ctti.gencat.cat/plataformes/apim/)

* ### Desplegaments estesos. 

    El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions que apuntin a arquitectures Cloud native i desplegaments a Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser Kubernetes o Màquines Virtuals. També els desplegaments de canvis en bases de dades poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase o Flyway, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL, ...

    Les capacitats actuals són :

    * Desplegaments en AWS de : 
        * Scripts BBDD
        * Kubernetes amb Helm

    Més informació sobre desplegaments estesos : [Desplegaments Estesos](../gh-desplegaments-estesos/)


