
+++
date         = "2025-02-12"
title        = "Reusable workflows"
description  = "Informació de les diferents versions de reusable workflows disponibles"
weight      = "3"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-reusable-workflows",
    "/ghec/gh-reusable-workflows",
    "/plataformes/ghec/gh-reusable-workflows",
    "/plataformes/ghec/workflows/gh-reusable-workflows"
]
+++

## [RELEASE v4](https://github.com/ctti-arq/reusable-workflows/releases/tag/v4)

### Release notes

<br>Els canvis o changelog de la v4 són els següents:

* **Desplegaments estesos:** documentació i exemples per a desplegaments estesos en [Desplegaments estesos](../../../gh-desplegaments-estesos)
* **Publicació de llibreries complexes per a projectes java-maven multi-mòdul en GitHub Packages**
* **Suport a GCP (Google Cloud Platform):** s'afegeix suport a GCP en els workflows d'infraestructura i als worfklows de desplegaments de contenidors, funcions i contingut estàtic
* **Model flexible de CI/CD per a tecnologies no suportades:** s'afegeix un model flexible de CI/CD per a tecnologies no suportades en els workflows de contenidors, funcions i contingut estàtic. Més informació a [Model flexible de CI/CD amb tecnología "custom"](../../../gh-capacitat-tecnologiques)
* **Nou paràmetre "container_app" per a desplegaments en ACA (Azure Container Apps)** per tal d'alinear la nomenclatura amb la del hiperescalar
* **Correcció del funcionament de la integració amb SonarQube per a projectes Java 8**
* **Suport a Databricks**, incloent una nova tecnlogia suportada en els workflows d'aplicació anomenada "databricks"

### Canvis a les plantilles

<br>S'han modificat totes les plantilles de les diferents tipologies de components per utilitzar la v4 dels reusable workflows. 

* Infraestructura: [https://github.com/ctti-arq/infrastructure-template](https://github.com/ctti-arq/infrastructure-template)  
* Contenidors: [https://github.com/ctti-arq/container-template](https://github.com/ctti-arq/container-template)  
* Funcions: [https://github.com/ctti-arq/function-template](https://github.com/ctti-arq/function-template)  
* Estàtics: [https://github.com/ctti-arq/static-template](https://github.com/ctti-arq/static-template)  
* Llibreries: [https://github.com/ctti-arq/library-template](https://github.com/ctti-arq/library-template)  
* Apim: [https://github.com/ctti-arq/apim-template](https://github.com/ctti-arq/apim-template)  
* Databricks: [https://github.com/ctti-arq/databricks-template](https://github.com/ctti-arq/databricks-template)
* Executor (per desplegament estesos): [https://github.com/ctti-arq/executor-template](https://github.com/ctti-arq/executor-template)  

## [RELEASE v3](https://github.com/ctti-arq/reusable-workflows/releases/tag/v3)

### Release notes

La v3 no es depreca però no evolucionarà a no ser que sigui per a pegats de seguretat.

## Versions anteriors

Les versions v1 i v2 dels reusable workflows estan discontinuades.