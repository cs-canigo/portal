
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


## RELEASE v4

### Release notes

<br>Els canvis o changelog de la v4 són els següents:

* **Desplegaments estesos:** documentació i exemples per a desplegaments estesos en [Desplegaments estesos](../../../gh-desplegaments-estesos)
* **Publicació de llibreries complexes per a projectes java-maven multi-mòdul en GitHub Packages**
* **Suport a GCP (Google Cloud Platform):** s'afegeix suport a GCP en els workflows d'infraestructura i a desplegaments de contenidors, funcions i contingut estàtic.
* **Model flexible de CI/CD per a tecnologies no suportades:** s'afegeix un model flexible de CI/CD per a tecnologies no suportades en els workflows de contenidors, funcions i contingut estàtic. Més informació en [Modelo flexible de CI/CD con tecnología "custom"](../../../gh-capacitat-tecnologiques)
* **Nou paràmetre "container_app" per a desplegaments en ACA (Azure Container Apps)**
* **Correcció per al funcionament de sonar per a projectes JAVA 8**
* **Suport a Databricks**

### Canvis a les plantilles

<br>S'han modificat tots els plantilles de les diferents tipologies per apuntar a la v4, que ja ha estat mergeada a la branca master. 

Estàtics: [https://github.com/ctti-arq/static-template](https://github.com/ctti-arq/static-template)  
Contenidors: [https://github.com/ctti-arq/container-template](https://github.com/ctti-arq/container-template)  
Infraestructura: [https://github.com/ctti-arq/infrastructure-template](https://github.com/ctti-arq/infrastructure-template)  
Llibreries: [https://github.com/ctti-arq/library-template](https://github.com/ctti-arq/library-template)  
Funcions: [https://github.com/ctti-arq/function-template](https://github.com/ctti-arq/function-template)  
Estessos: [https://github.com/ctti-arq/executor-template](https://github.com/ctti-arq/executor-template)  
Apim: [https://github.com/ctti-arq/apim-template](https://github.com/ctti-arq/apim-template)  
Databricks: [https://github.com/ctti-arq/databricks-template](https://github.com/ctti-arq/databricks-template)

## RELEASE v3

### Release notes

La v3 no es depreca però no evolucionarà a no ser que sigui per a parches de seguretat. Per això s'ha creat una branca backup del que hi ha actualment a la versió v3.0.33 per alliberar les properes versions (si n'hi hagués) sobre aquesta branca amb els canvis del pegat

## Versions anteriors

Les versions V1 i V2 dels reusable workflows estan discontinuades.