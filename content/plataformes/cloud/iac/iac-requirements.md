+++
date        = "2024-04-02"
title       = "Requeriments IaC"
description = "Requeriments en l'ús d'infraestructura com a codi (IaC) amb Terraform"
sections    = "[IAC]"
categories  = ["cloud","docker","container","paas","aws","azure","gcloud","devops", "iac", "terraform"]
weight      = 1
toc         = true
+++

## Estructura de projecte

Aquesta és l'**estructura de directoris** recomanada per a un projecte d'infraestructura com a codi (IaC) amb Terraform:

```
root
├── env
│   ├── pro 
│   │   │── backend.tf
│   │   │── db.tf
│   │   │── container-registry.tf
│   │   │── container-platform.tf
│   │   │── ...
│   │   └── variables.tf
│   └── pre
│       │── backend.tf
│       │── db.tf
│       │── container-registry.tf
│       │── container-platform.tf
│       │── ...
│       └── variables.tf
└── modules 
    │── db 
    │    └── main.tf
    │    └── outputs.tf
    │    └── variables.tf
    │── container-registry 
    │    └── main.tf
    │    └── outputs.tf
    │    └── variables.tf
    ...
```

Els workflows de CI/CD d'infraestructura requereixen d'aquesta estructura pel seu correcte funcionament. Els diferents stages dels workflows treballen amb el directori adient corresponent a l'**entorn segons la branca** (dev/test/int=develop, release=pre, master=pro) en la que s'estigui actuant.

## Requeriments CI/CD


### Backend de Terraform

El backend de l'estat de Terraform s'ha de declarar de la següent manera:

_backend.tf_
```hcl
terraform {

  backend "azurerm" {
  }
}

provider "azurerm" {
  features {}
}
```

Això és així degut a que els workflows de CI/CD d'infraestructura fan ús de la connexió amb Azure per a l'emmagatzematge de l'estat de Terraform. En concret, s'utilitza un **Resource group** amb un **Storage Account** per aplicació, i dins un **Container** per a cada entorn. Aquest backend es configurarà dinàmicament al workflow de CD d'infraestructura.

### Plataformes de contenidors

Cal especificar en la definició del Terraform que s'ignorin els canvis en la imatge del contenidor per evitar la recreació del recurs en cada desplegament de la infraestructura. Les noves versions dels contenidors es desplegaran mitjançant el workflow de CD d'aplicació, no del CD d'infraestructura.

#### Container Apps (Azure)

```hcl
resource "azurerm_container_app" "app" {

  // ... omitted for brevity ...
  
  // Ignore versions deployed by Infraestructure CD workflow
  lifecycle {
    ignore_changes = [template[0].container[0].image]
  }

  // ... omitted for brevity ...

}
```

#### ECS (AWS)

```hcl
resource "aws_ecs_task_definition" "ecs_task" {

  // ... omitted for brevity ...

  // Ignore versions deployed by Infraestructure CD workflow, only track latest task revision managed by Application CD workflow
  track_latest = true

  // ... omitted for brevity ...

}
```

### Funcions

#### AWS

En cas que les funcions Lambda a desplegar superin els 50MB de tamany, pel seu desplegament cal recolzar-se en un **bucket S3** per a l'emmagatzematge dels fitxers de la funció. Com a part de la infraestructura base creara per l'aplicació (ACOCLDSIC) s'haurà creat aquest bucket, el nom del qual haurà d'especificar-se en la invocació del workflow de CD. Més informació a [Workflows - Function CD](/drafts/ghec/gh-definicio-workflows#function-cd-function-cdyaml).

## Nomenclatura

### Objectiu

Establir un **estàndard de nomenclatura** per als serveis desplegats en diverses plataformes de núvol públic (AWS, Azure, Google, IBM Cloud etc.), proporcionant una estructura uniforme i coherent per a la identificació de recursos.

### Nomenclatura global

La nomenclatura que s'ha de seguir pels recursos desplegats en els diferents proveïdors de núvol públic és la següent:

* **acr-env-typ-lll-\<funcionalitat\>-iii**
  - **acr**: acrònim de l'aplicació (3 dígits).
  - **env**: entorn (3 dígits). Pot pendre els valors "dev/tst/int", "pre", "pro".
  - **typ**: tipus de recurs (3 dígits).
  - **lll**: localització/regió (3 dígits).
  - **funcionalitat**: funcionalitat del recurs (màxim 10 dígits).
  - **iii**: índex seqüencial (3 dígits).

* Taula **hiperescalars**:

    | Codi | Nom |  
    |------|-------|
    | aws  | Amazon Web Services
    | azr  | Microsoft Azure
    | gcp  | Google Cloud Platform
    | ibm  | IBM Cloud

* Taula **localització/regions**:

  * **AWS**

  | Codi | Regió | Nom   |  
  |------|-------|-------|
  | ew1  | eu-west-1 | Europe (Ireland) *Default*
  | ec1  | eu-central-1 | Europe (Frankfurt)
  | ue1  | us-east-1 | US East (N. Virginia) *Only for some services* 

  * **Azure**

  | Codi | Regió | Nom   |  
  |------|-------|-------|
  | we1  | West Europe | Europe (Netherlands)
  | sc1  | Sweden Central | Europe (Sweden)
  | gw1  | Germany West Central | Europe (Frankfurt) *Default*
  
  * **GCP**
  
  | Codi | Regió | Nom   |  
  |------|-------|-------|
  | ew3  | europe-west3 | Europe (Frankfurt) *Default*

    Regió secundària per definir

El **tipus de recurs** pot pendre els valors següents depenent del proveïdor de núvol públic:

- **AWS**: 
  - **s3**: Amazon Simple Storage Service (S3)
  - **ecs**: Amazon Elastic Container Service (Amazon ECS)
  - **app**: AWS App Runner
  - **ecr**: Amazon Elastic Container Registry (ECR)
  - **lam**: AWS Lambda 
  - **evn**: Amazon EventBridge
  - **sfn**: AWS Step Functions
  - **api**: Amazon API Gateway
  - **cdn**: Amazon CloudFront
  - **vpc**: Amazon Virtual Private Cloud (VPC)
  - **lbg**: Elastic Load Balancing (ELB)
  - **aur**: Amazon Aurora
  - **rds**: Amazon Relational Database Service (RDS)
  - **ddb**: Amazon DynamoDB
  - **cwa**: Amazon CloudWatch
  - **scr**: AWS Secrets Manager
  - **pms**: AWS Parameter Store
  - **efs**: Amazon Elastic File System (EFS)
  - **sbg**: Subnet Group
  - **scg**: Security Group
  - **vcn**: VPC Connector (App Runner)
  - **sdc**: Service Discovery (ECS)
  - **vpl**: VPC link


- **Azure**:
  - **str**: Azure Storage Account
  - **cap**: Azure Container Apps
  - **aci**: Azure Container Instances
  - **acr**: Azure Container Registry
  - **fun**: Azure Functions
  - **egr**: Azure Event Grid
  - **api**: Azure API Management
  - **fdw**: Azure Front Door
  - **vne**: Azure Virtual Network
  - **lbr**: Azure Load Balancer
  - **cos**: Azure Cosmos DB
  - **sql**: Azure SQL Database
  - **key**: Azure Key Vault
  - **mon**: Azure Monitor
  - **log**: Azure Logic Apps
  - **fsb**: Azure File Storage
  - **rsg**: Azure Resource Group
  - **sne**: Azure Subnet
  - **sct**: Azure Storage Container
  - **sbl**: Azure Storage Blob
  - **lgw**: Azure Log Analytics Workspace
  - **cae**: Azure Container App Environment
  - **dns**: Azure Private DNS Zone Virtual Network Link
  - **cps**: Azure Cosmos DB PostgreSQL Cluster
  - **ape**: Azure Private Endpoint
  - **cmd**: Azure Cosmos DB MongoDB Database
  - **svp**: Azure Service Plan
  - **lfa**: Azure Linux Function App
  - **wfa**: Azure Windows Function App
  - **ass**: Azure Storage Share
  - **uai**: Azure user assigned identity
  - **aes**: Azure container app environment storage

- **GCP**:
  - **cos**: Google Cloud Storage
  - **gke**: Google Kubernetes Engine
  - **run**: Google Cloud Run
  - **arc**: Google Artifact Registry
  - **fun**: Google Cloud Functions
  - **pub**: Google Cloud Pub/Sub
  - **api**: Google Cloud API Gateway
  - **cdn**: Google Cloud CDN
  - **vpc**: Google Cloud VPC
  - **lbr**: Google Cloud Load Balancer
  - **sql**: Google Cloud SQL
  - **dta**: Google Cloud Datastore
  - **fbs**: Google Cloud Firestore
  - **sec**: Google Cloud Secret Manager
  - **key**: Google Cloud KMS
  - **log**: Google Cloud Logging
  - **mon**: Google Cloud Monitoring
  - **fsb**: Google Cloud File Storage

### Etiquetatge de Recursos

L'**etiquetatge** de recursos és essencial per organitzar, identificar i gestionar recursos al núvol de manera eficient i efectiva. S'han d'utilitzar aquestes etiquetes:
```
CodiAplicacio: codi d'aplicació
CodiEntitat: codi d'entitat
CodiInap: acrònim
CodiJira: codi de facturació 
CodiServei: codi d'infraestructura
Entorn: entorn de desplegament
```
Exemple:
```
CodiAplicacio: 3049
CodiEntitat: JUS
CodiInap: BMD
CodiJira: CPDut-xx
CodiServei: 7_713
Entorn: PRE
```
 
### Compliment de Polítiques

Per garantir el **compliment de les polítiques** establertes per Suport Cloud per al desplegament d'infraestructura en els diferents proveïdors Cloud, s'han de seguir aquestes pràctiques:
- Configurar i aplicar les polítiques definides en el codi IaC de la infraestructura de l'aplicació.
- Revisar i auditar regularment el compliment de les polítiques establertes de la infraestructura de l'aplicació.
- Integrar la gestió de les polítiques en els fluxos de treball d'infraestructura com a codi per garantir la seva aplicació coherent.

En el [workflow de CI d'infraestructura](https://canigo.ctti.gencat.cat/plataformes/ghec/gh-definicio-workflows/#worfklows-de-continuous-integration-ci-per-a-infraestructura-iac) es realitza una **validació de compliment de polítiques** abans d'executar el workflow de CD. En concret, aquesta validació es realitza al stage de **Scan check**.

Aquest és el repositori on es pot trobar el detall de la informació de les polítiques: https://github.com/ctti-arq/ghec-checkov-policies.

## Backups (AWS)

Per a incloure els recursos requerits en els plans de còpia de seguretat creats per l'organització, seran necessàries les següents accions en el codi terraform d'aquests:

- Encriptar els recursos corresponents amb la clau KMS existent en el compte com a part de la infraestructura base.
- Etiquetar els recursos amb l'etiqueta corresponent a la freqüència/retenció desitjada:

| Key | Value |  
|------|-------|
| diaria  | diaria
| semanal-basica  | semanal-bas
| semanal-avanzada  | semanal-av
| mensual  | mensual
| anual-basica  | anual-bas
| anual-avanzada  | anual-av

S'inclou més informació en les plantilles d'exemple de IaC.
