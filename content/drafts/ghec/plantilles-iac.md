+++
date        = "2024-04-02"
title       = "Plantilles IaC"
description = "Plantilles d'infraestructura com a codi (IaC) pels diferents proveïdors de cloud: AWS, Azure, GCP, etc"
sections    = "[GHEC]"
categories  = ["cloud","docker","container","paas","aws","azure","gcloud","devops", "iac", "terraform"]
weight      = 10
+++


## Plantilles d'infraestructura com a codi (IaC)

Les plantilles **d'Infraestructura com a codi (IaC)** són un conjunt de fitxers que defineixen la infraestructura necessària per a una aplicació o servei. Aquestes plantilles són utilitzades per a desplegar i gestionar la infraestructura de forma automatitzada, permetent així la creació de recursos de forma ràpida i eficient.

Les plantilles d'IaC són una eina fonamental en el desenvolupament de solucions en el núvol. En aquesta secció trobareu plantilles d'IaC per als diferents proveïdors de núvol públic, com ara AWS, Azure, GCP, etc. Aquestes plantilles us serviran com a punt de partida per a implementar l a infraestructura com a codi de les vostres aplicacions afegint, eliminant i/o modificant el contingut que hi podeu trobar.

## Terraform

[Terraform](https://www.terraform.io/) és una eina d'infraestructura com a codi (IaC) de codi obert que permet als desenvolupadors i als equips d'operacions gestionar la infraestructura com a codi. Terraform permet als usuaris definir i configurar la infraestructura en un llenguatge de programació de propòsit general, i després desplegar aquesta infraestructura de forma automatitzada.

## Plantilles Terraform disponibles

- [Plantilles d'IaC per a AWS](/cloud/automation/iac/aws)

* Arquitectura típica contenidors (CaaS): AWS Application Load Balancer, AWS ECS Fargate, AWS Aurora Serverless (PostgreSQL)

https://github.com/ctti-arq/iac-aws-templates/tree/master/template-fargate

* Arquitectura típica funcions (FaaS): AWS Api Gateway, AWS Lambda, AWS DynamoDB

https://github.com/ctti-arq/iac-aws-templates/tree/master/template-apigateway

- [Plantilles d'IaC per a Azure](/cloud/automation/iac/azure)

* Arquitectura típica contenidors (CaaS): Azure ContainerApps, Azure CosmosDB (PostgreSQL)

https://github.com/ctti-arq/iac-azure-templates/

* Arquitectura típica funcions (FaaS): Azure Functions, Azure CosmosDB (MongoDB)

https://github.com/ctti-arq/iac-azure-templates/

- [Plantilles d'IaC per a GCP](/cloud/automation/iac/gcp)

* Arquitectura típica contenidors (CaaS): Google Cloud Run, Google Cloud SQL (PostgreSQL)

https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudrun

* Arquitectura típica funcions (FaaS): Google Cloud Functions, Google Cloud Datastore

https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudfunction-nosql
