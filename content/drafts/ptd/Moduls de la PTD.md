+++
date        = "2025-01-16"
title       = "Mòduls de la PTD"
description = "Mòduls i serveis disponibles a la PTD"
sections    = "PTD"
toc         = false
taxonomies  = []
weight      = 2
+++

## Serveis i Capacitats de la PTD

La **Plataforma Transversal de Dades de la Generalitat de Catalunya (PTD)** es presenta com una solució tecnològica integral, adaptable, fiable i orientada a resoldre els reptes presents i futurs de l’administració.

Està construïda sobre una arquitectura SaaS multicloud que prioritza l'ús de tecnologies open source, incloent eines com Databricks, Spark i Delta Lake.

La proposta arquitectònica és compatible amb el model europeu de Gaia-X, ja que permet l'emmagatzematge, processament i transmissió de la informació per a compartir dades amb clients, mantenint la sobirania de les dades. També compleix amb els requisits d'arquitectura federada, descentralitzada i oberta de Gaia-X.

Aquesta plataforma integra mòduls per a la gestió de Dades de Referència i Mestres de Dades d'ús corporatiu, així com un mòdul específic d'Integració i Data Quality, destacant la importància de la diversitat, complexitat i sensibilitat de les dades tractades.

<br>

![Cas 1](/plataformes/ptd/related/PTD/PTD01.png)

<br>

### Mòduls de la PTD

Els mòduls de la PTD responen a les diferents necessitats d’ingesta, qualitat, emmagatzematge, transformació i publicació de les dades. A continuació, es detallen de manera separada els diversos mòduls que formen part de la PTD, així com les eines utilitzades en cadascun d'ells.

<br>

![Cas 2](/plataformes/ptd/related/PTD/PTD02.png)

- **Connexió/Ingesta:** Les capacitats de connexió i ingesta de la PTD permeten integrar múltiples orígens de dades i formats, tant on-premise com al cloud, en batch o en temps real. També es pot integrar amb Webservices, API Rest i sistemes d’esdeveniments en streaming com Confluent Kafka. Permet utilitzar Databricks amb processos ad-hoc d’ingesta o el Mòdul ITQ per automatitzar i planificar càrregues, o virtualitzar els orígens amb Denodo per desacoblar les fonts de dades dels seus processaments de càrrega.

<br>

![Cas 3](/plataformes/ptd/related/PTD/PTD03.png)

- **Data Quality:** La PTD ofereix una solució configurable de qualitat de dades basada en Spark que s'executa sobre Databricks i utilitza taules Delta Lake. Normalitza la qualitat de les dades d’entrada validant-les, corregint-les i enriquint-les. Pot processar dades en diversos formats i recollir-les mitjançant JDBC de multitud de bases de dades. També gestiona dades en temps real en forma d'esdeveniments, i el procés de qualitat inclou ingesta, validació, enriquiment, remediació, remediació manual i consolidació.

<br>

![Cas 4](/plataformes/ptd/related/PTD/PTD04.png)

- **Emmagatzematge i dominis d’informació:** El Data Lake central de la PTD utilitza Databricks, amb tecnologies com Apache Spark, Delta Lake i Delta Sharing. Databricks facilita la gestió centralitzada de dades amb Unity Catalog i una col·laboració eficient gràcies a la seva arquitectura Lakehouse. La PTD adopta un enfocament Datamesh, on diverses bases de dades coexisteixen en un entorn governat i distribuït per dominis funcionals, estandarditzant els fluxos de dades en capes: Bronze (dada crua), Silver (dada amb qualitat) i Gold (dada enriquida).

<br>

![Cas 5](/plataformes/ptd/related/PTD/PTD05.png)

- **Transformació:** La PTD amb Databricks ofereix una plataforma integrada per a l'execució de processos Spark que faciliten la transformació, l'enriquiment i la gestió del cicle de vida de les dades. També, amb interfícies per a l'orquestració visual de workflows i la gestió de tasques, permet als usuaris desenvolupar i executar transformacions de dades en temps real mitjançant notebooks. Això millora l'autonomia dels usuaris, la gestió de càrregues i la interacció entre tenants, essent més eficaç i flexible.

<br>

![Cas 6](/plataformes/ptd/related/PTD/PTD06.png)

- **Publicació:** La disponibilització de dades es pot fer amb Delta Sharing de Databricks, que permet compartir dades de manera segura entre entorns interns i externs, i amb els BIs corporatius. Els usuaris poden accedir a les dades en temps real sense duplicar-les, facilitant l'anàlisi i el govern. La PTD també disposa de virtualització amb Denodo per desacoblar dades heterogènies en una única font de les eines d’explotació. Si es necessita de Microserveis, s'emprarà Openshift cloud com a solució comuna multicloud.