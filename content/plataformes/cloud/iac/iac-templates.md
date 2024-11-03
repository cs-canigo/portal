+++
date        = "2024-04-02"
title       = "Plantilles IaC"
description = "Plantilles d'infraestructura com a codi (IaC) pels diferents proveïdors de cloud: AWS, Azure, GCP, etc"
sections    = "[GHEC]"
categories  = ["cloud","docker","container","paas","aws","azure","gcloud","devops", "iac", "terraform"]
weight      = 3
+++

## Plantilles d'infraestructura com a codi (IaC)

Les **plantilles d'infraestructura com a codi (IaC)** són un conjunt de fitxers que defineixen la infraestructura necessària per a una aplicació o servei. Aquestes plantilles són utilitzades per a desplegar i gestionar la infraestructura de forma automatitzada, permetent així la creació de recursos de forma ràpida i eficient.

Les plantilles d'IaC són una eina fonamental en el desenvolupament de solucions en el núvol. En aquesta secció trobareu plantilles d'IaC per als diferents proveïdors de núvol públic: AWS, Azure, GCP. Aquestes plantilles us serviran com a punt de partida per a implementar la infraestructura com a codi de les vostres aplicacions afegint, eliminant i/o modificant el contingut que hi podeu trobar.

### Terraform

**[Terraform](https://www.terraform.io/)** és una eina d'infraestructura com a codi (IaC) de codi obert que permet als desenvolupadors i als equips d'operacions gestionar la infraestructura com a codi. Terraform permet als usuaris definir i configurar la infraestructura en un llenguatge de programació de propòsit general, i després desplegar aquesta infraestructura de forma automatitzada.

## Plantilles Terraform disponibles

A continuació s'especifiquen les plantilles d'infraestructura disponibles pels diferents hiperescalars. Aquestes estan basades en serveis Cloud-Native per tal de facilitar als proveïdors d'aplicacions la seva gestió. Per cadascuna d'elles s'enumeren els serveis més rellevants que incorporen, així com l'enllaç al seu codi font.

 > Les plantilles es poden trobar a **GitHub Enterprise Cloud (GHEC)**. Abans d'accedir-hi, cal que l'usuari hagi estat **donat d'alta a la plataforma i s'hagi autenticat**: https://github.com/enterprises/gencat
 {.warning}

### AWS

#### [v1.1.0](https://github.com/ctti-arq/iac-aws-templates/tree/1.1.0/)

_Release notes_:

* S'ha modificat la configuració dels recursos per a complir amb les polítiques de seguretat i estàndards definits per l'organització.
* S'ha modificat la configuració dels recursos i blocs 'data' per a incloure la possibilitat d'utilitzar un model de Networking amb dos rangs CIDR (Subxarxes enrutables i no enrutables)

#### [v1.0.0](https://github.com/ctti-arq/iac-aws-templates/tree/1.0.0/)

_Release notes_:

* Arquitectura tipus per contenidors (Serverless container platform​)

    _Serveis_: AWS Application Load Balancer, AWS ECS Fargate, AWS Aurora Serverless (PostgreSQL)

    _Ubicació dins el repositori_: template-fargate

* Arquitectura tipus per contenidors (Serverless container application service​)

    _Serveis_: AWS Application Load Balancer, AWS AppRunner, AWS Aurora Serverless (PostgreSQL)

    _Ubicació dins el repositori_: template-apprunner

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: AWS Api Gateway, AWS Lambda, AWS DynamoDB

    _Ubicació dins el repositori_: template-apigateway


### Azure

#### [v1.0.0](https://github.com/ctti-arq/iac-azure-templates/tree/1.0.0/)

* Arquitectura tipus per contenidors (CaaS)

    _Serveis_: Azure ContainerApps, Azure CosmosDB (PostgreSQL)

    _Codi font_: https://github.com/ctti-arq/iac-azure-templates/tree/master/template-container

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: Azure Functions, Azure CosmosDB (MongoDB)

    _Codi font_: https://github.com/ctti-arq/iac-azure-templates/tree/master/template-functions

### GCP

 :warning: **Les plantilles que es poden trobar en aquesta secció estan en fase de validació pel que encara no es recomana el seu ús per part de les aplicacions**

* Arquitectura tipus per contenidors (CaaS)

    _Serveis_: Google Cloud Run, Google Cloud SQL (PostgreSQL)

    _Codi font_: https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudrun

* Arquitectura tipus per funcions (FaaS)

    _Serveis_: Google Cloud Functions, Google Cloud Datastore

    _Codi font_: https://github.com/ctti-arq/iac-google-templates/tree/master/template-cloudfunction-nosql

