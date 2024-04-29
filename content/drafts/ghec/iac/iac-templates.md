+++
date        = "2024-04-02"
title       = "Plantilles IaC"
description = "Plantilles d'infraestructura com a codi (IaC) pels diferents proveïdors de cloud: AWS, Azure, GCP, etc"
sections    = "[GHEC]"
categories  = ["cloud","docker","container","paas","aws","azure","gcloud","devops", "iac", "terraform"]
weight      = 1
+++


## Plantilles d'infraestructura com a codi (IaC)

Les **plantilles d'infraestructura com a codi (IaC)** són un conjunt de fitxers que defineixen la infraestructura necessària per a una aplicació o servei. Aquestes plantilles són utilitzades per a desplegar i gestionar la infraestructura de forma automatitzada, permetent així la creació de recursos de forma ràpida i eficient.

Les plantilles d'IaC són una eina fonamental en el desenvolupament de solucions en el núvol. En aquesta secció trobareu plantilles d'IaC per als diferents proveïdors de núvol públic: AWS, Azure, GCP. Aquestes plantilles us serviran com a punt de partida per a implementar la infraestructura com a codi de les vostres aplicacions afegint, eliminant i/o modificant el contingut que hi podeu trobar.

## Terraform

**[Terraform](https://www.terraform.io/)** és una eina d'infraestructura com a codi (IaC) de codi obert que permet als desenvolupadors i als equips d'operacions gestionar la infraestructura com a codi. Terraform permet als usuaris definir i configurar la infraestructura en un llenguatge de programació de propòsit general, i després desplegar aquesta infraestructura de forma automatitzada.

## Plantilles Terraform disponibles

A continuació s'especifiquen les plantilles d'infraestructura disponibles pels diferents hiperescalars. Aquestes estan basades en serveis Cloud-Native per tal de facilitar als proveïdors d'aplicacions la seva gestió. Per cadascuna d'elles s'enumeren els serveis més rellevants que incorporen, així com l'enllaç al seu codi font.

### Plantilles d'IaC per a AWS

* Arquitectura tipus per contenidors (CaaS)

    _Serveis_: AWS Application Load Balancer, AWS ECS Fargate, AWS Aurora Serverless (PostgreSQL)

    _Codi font_: https://github.com/ctti-arq/iac-aws-templates/tree/master/template-fargate

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: AWS Api Gateway, AWS Lambda, AWS DynamoDB

    _Codi font_: https://github.com/ctti-arq/iac-aws-templates/tree/master/template-apigateway


### Plantilles d'IaC per a Azure

* Arquitectura tipus per contenidors (CaaS)

    _Serveis_: Azure ContainerApps, Azure CosmosDB (PostgreSQL)

    _Codi font_: https://github.com/ctti-arq/iac-azure-templates/

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: Azure Functions, Azure CosmosDB (MongoDB)

    _Codi font_: https://github.com/ctti-arq/iac-azure-templates/

### Plantilles d'IaC per a GCP

* Arquitectura tipus per contenidors (CaaS)

    _Serveis_: Google Cloud Run, Google Cloud SQL (PostgreSQL)

    _Codi font_: https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudrun

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: Google Cloud Functions, Google Cloud Datastore

    _Codi font_: https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudfunction-nosql
