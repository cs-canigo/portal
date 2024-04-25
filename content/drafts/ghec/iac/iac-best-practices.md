+++
date        = "2024-04-02"
title       = "Bones pràctiques IaC"
description = "Bones pràctiques en infraestructura com a codi (IaC) amb Terraform"
sections    = "[IAC]"
categories  = ["cloud","docker","container","paas","aws","azure","gcloud","devops", "iac", "terraform"]
weight      = 1
+++

## Estructura de projecte

Aquesta és l'**estructura de directoris** recomanada per a un projecte d'infraestructura com a codi (IaC) amb Terraform:

```
root
├── env
│   ├── pro 
│   │   └── db 
│   │       ├── main.tf 
│   │       └── variables.tf
│   └── pre
│       └── db 
│           ├── main.tf 
│           └── variables.tf 
└── modules 
    └── db 
        └── main.tf
```

Els workflows de CI/CD d'infraestructura requereixen d'aquesta estructura pel seu correcte funcionament. Els diferents stages dels workflows treballen amb el directori adient corresponent a l'**entorn segons la branca** (dev/test/int=develop, release=pre, master=pro) en la que s'estigui actuant.

## Requeriments CI/CD

El backend de l'estat de Terraform s'ha de declarar de la següent manera per a poder fer ús dels workflows de CI/CD d'infraestructura:

backend.tf
```hcl
terraform {

  backend "azurerm" {
  }
}

provider "azurerm" {
  features {}
}
```

Això és així degut a que els workflows de CI/CD d'infraestructura fan ús de la connexió amb Azure per a l'emmagatzematge de l'estat de Terraform. En concret, s'utilitza un **Storage Account** amb un **Container** per a cada aplicació-entorn (dev/tst/int, pre, pro) i un **Blob** per a cada workspace de Terraform.

## Nomenclatura

### Objectiu

Establir un **estàndard de nomenclatura** per als serveis desplegats en diverses plataformes de núvol públic (AWS, Azure, Google, IBM Cloud etc.), proporcionant una estructura uniforme i coherent per a la identificació de recursos.

### Nomenclatura global

La nomenclatura que s'ha de seguir pels recursos desplegats en els diferents proveïdors de núvol públic és la següent:

* **acr-env-typ-iii**
  - **acr**: acrònim de l'aplicació (3 dígits).
  - **env**: entorn (3 dígits). Pot pendre els valors "dev/tst/int", "pre", "pro".
  - **typ**: tipus de recurs (3 dígits).
  - **iii**: índex seqüencial (3 dígits).

El **tipus de recurs** pot pendre els valors següents depenent del proveïdor de núvol públic:

- **AWS**: 
  - **s3**: Amazon S3
  - **ecs**: Amazon ECS
  - **app**: AWS App Runner
  - **ecr**: Amazon ECR
  - **lam**: AWS Lambda 
  - **evn**: Amazon EventBridge
  - **sfn**: AWS Step Functions
  - **api**: Amazon API Gateway
  - **cdn**: Amazon CloudFront
  - **vpc**: Amazon VPC
  - **lbg**: Elastic Load Balancing
  - **aur**: Amazon Aurora
  - **rds**: Amazon RDS
  - **ddb**: Amazon DynamoDB
  - **cwa**: Amazon CloudWatch
  - **scr**: AWS Secrets Manager
  - **pms**: AWS Parameter Store
  - **efs**: Amazon EFS

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
CodiAplicacio: Codi d'Aplicació
Codientitat: Codi d'Entitat
Codilnap:
CodiJira: Codi de Jira
CodiServei: Codi de Servei
Entorn: Entorn
```
Exemple:
```
CodiAplicacio: 3049
CodiEntitat: JUS
Codilnap: BMD
Codijira: CPDut-xx
CodiServei: 7_713
Entorn: PRE
```
 
### Compliment de Polítiques:

Per garantir el **compliment de les polítiques** establertes per Suport Cloud per al desplegament d'infraestructura en els diferents proveïdors Cloud, s'han de seguir aquestes pràctiques:
- Configurar i aplicar les polítiques definides en el codi IaC de la infraestructura de l'aplicació.
- Revisar i auditar regularment el compliment de les polítiques establertes de la infraestructura de l'aplicació.
- Integrar la gestió de les polítiques en els fluxos de treball d'infraestructura com a codi per garantir la seva aplicació coherent.

En el workflow de CI d'infraestructura es realitza una **validació de compliment de polítiques** abans d'executar el workflow de CD.

### Bones Pràctiques en Infraestructura com a Codi (IaC):

Per a una implementació efectiva de la infraestructura com a codi, a més de la nomenclatura, etiquetatge i compliment de SCPs, és important seguir una sèrie de **bones pràctiques**:

* Ús de blocs **"data"**: Aquesta característica permet consultar informació sobre recursos ja existents en la infraestructura desplegada en qualsevol dels proveïdors de núvol utilitzats, d'aquesta manera, s'evita incloure en el codi, o en variables, valors com identificadors, o atributs d'altres recursos. En el seu lloc, des del codi es faria referència a l' atribut desitjat de la sortida del bloc data.

  Per exemple, per desplegar recursos vinculats a subxarxes d'AWS, enlloc d'incloure els identificadors d'aquesta manera:
  ```
  …
  subnet_ids = [“subnet-xxxx”,”subnet-yyyy”,”subnet-zzzz”]
  …
  ```

  S'hauria d' incloure el codi següent:
  ```
  data "aws_vpc" "vpc" {
    tags = {
      Name = "CommonVPC"
    }
  }
  data "aws_subnets" "private_subnets" {
    filter {
      name   = "vpc-id"
      values = [data.aws_vpc.vpc.id]
    }

    tags = {
      Type = "Private"
    }
  }
  ```
  I d'aquesta manera podran referenciar-se així en el codi:
  ```
  …
  subnet_ids = data.aws_subnets.private_subnets.ids
  …
  ```
  (En el registre oficial de Terraform, en seleccionar el proveïdor, i desplegar la informació de cadascun dels serveis, es pot veure una llista amb els blocs "data" disponibles).

*	**Variables** i **tfvars**: Llevat de camps obligatoris per al recurs desplegat, o aspectes fixats per polítiques de compliment, qualsevol atribut modificable hauria de tenir una variable definida en el fitxer variables.tf, incloent per a cadascuna d'elles la descripció, tipus (indicant l'estructura acceptada, en el cas d'atributs complexos), valors per defecte, i, preferiblement, "constraints", que validin els valors proporcionats.

  ```
  variable "volume_size_gb" {
    type        = number
    description = "Tamaño del volumen en GB"
    default     = 50
  }
  ```

  De la mateixa manera, per facilitar la modificació dels recursos, és important fer ús dels fitxers "tfvars", que es componen únicament de parells clau-valor, sent la clau el nom de cadascuna les variables definides en el fitxer variables.tf. Per a l' exemple anterior, en el tfvars caldria incloure una línia amb el contingut següent:

  ```
  volume_size_gb = 100
  ```

  Si el fitxer es crea amb el següent nom “auto.tfvars”, es carregarà automàticament en executar les comandes.

  Per utilitzar la variable en el codi:

  ```
  resource "aws_ebs_volume" "instance_volume" {
    size             = var.volume_size_gb
    # Altres atributs...
  }
  ```

*	Ús de **"locals"**: aquesta funcionalitat permet definir valors que es poden reutilitzar dins dels recursos, evitant així la repetició de noms i simplificant la composició de valors. Un cas d'ús comú és, per exemple, si per seguir la naming convention cal compondre el nom d'un recurs amb la regió, l'entorn, el tipus de recurs, i un identificador; i a més aquest nom s'utilitzarà en diferents recursos, en lloc de fer la composició dins dels recursos, i per tant, reduir la llegibilitat d'aquests, es podria definir una variable local per a aquesta funció, i fer-hi referència.

  ```
  locals {
    #Exemple per a composar un nom amb valors de variables i text pla
  instance_name = “${var.region}-${var.environment}-ec2-${var.instance_identifier}”  

    
  # Exemple per recuperar valors sensibles de Secrets Manager i seleccionar només un camp concret
    username = jsondecode(data.aws_secretsmanager_secret_version.credentials.secret_string)["username"]
    password = jsondecode(data.aws_secretsmanager_secret_version.credentials.secret_string)["password"]
  }
  ```

  A més, en moltes ocasions, resulta imprescindible dur a terme certa lògica o processament dels valors d'entrada, com per exemple, mergear llistes, eliminar valors nuls, realitzar bucles sobre els elements per modificar alguns camps, etc., per això, es recomana fer ús de funcions de Terraform (Functions - Configuration Language | Terraform | HashiCorp Developer) dins del bloc "locals". D'aquesta manera, en el recurs, únicament caldrà fer una referència al nom de la variable local "local.nombre_local", la qual cosa millora la llegibilitat i la capacitat de manteniment del codi.

* **Referències** entre recursos: Directament relacionat amb els dos punts anteriors, és important que no hi hagi cap identificador o atribut d'un altre recurs definit directament en el codi. En el seu lloc, cal referenciar blocs data, locals, o variables. I si, per un motiu molt concret, utilitzar referències produeix un "cycle" (Bucle infinit de referències), s'haurà d'utilitzar un "shared", i que està generant el conflicte.

*	Definició de **tags** a nivell de Provider: Definir etiquetes (tags) per defecte a nivell de provider permet aplicar etiquetes comunes a tots els recursos creats dins d'aquest proveïdor, la qual cosa facilita la gestió i l'organització:

    ```
    provider "aws" {
      region = "eu-west-1"
      # Etiquetes comuns per a tots els recursos creats per aquest proveïdor
      default_tags {
        Environment = "production"
      }
    }
    ```

*	Configuració de **múltiples providers**: En el cas de ser necessari, és possible utilitzar múltiples providers en una mateixa configuració, per a un mateix proveïdor Cloud, fent ús d'àlies, podent desplegar recursos en regions diferents, la qual cosa aporta flexibilitat i control sobre la distribució dels recursos. Per exemple, a AWS, hi ha alguns serveis que s'han de desplegar a North Virginia obligatòriament, això fa que, si la infraestructura s'està desplegant a Frankfurt, sigui necessari utilitzar múltiples providers, i indicar amb què provider cal crear cada recurs, per així evitar haver de llançar dues configuracions diferents:

```
provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  alias  = "north-virginia"
  region = "us-east-1"
}

resource " aws_wafv2_web_acl " "web_acl" {
  provider = aws.us-west
  ...
}
```

*	Utilització de **"for_each"** per davant de "count" per a la creació dinàmica de recursos: Utilitzar "for_each" en lloc de "count" permet iterar sobre un mapa de recursos en lloc d'una llista, la qual cosa ofereix major flexibilitat i control sobre els recursos creats. Això vol dir, que, si cal crear múltiples recursos d'un mateix tipus, i s'utilitza count, prenent com a valor el nombre d'elements d'una llista, com l'iterador és numèric, si s'eliminés un element intermedi de la llista, s'actualitzarien tots els recursos creats després d'aquest "índex", però, si en el seu lloc s'utilitza "for_each", on s'anirà utilitzant un element de la llista/mapa directament, si s'esborra un element intermedi de la llista, la resta no es veuen afectats, ja que no hi ha un iterador numèric.

    ```
    variable "instances" {
      type = map
      default = {
        "instance-1" = "t2.micro"
        "instance-2" = "t2.medium"
      "instance-2" = "t2.small"
      }
    }

    resource "aws_instance" "instance" {
      for_each = var.instances
      ami      = "ami-xxxxx"
      instance_type = each.value
      # Otros atributos...
    }
    ```

    Els recursos creats tindran el següent format:

    ```
    aws_instance.instance[“instance-1”]
    aws_instance.instance[“instance-2”]
    aws_instance.instance[“instance-3”]
    ```

    Per la qual cosa esborrar l'element "instance-2" de la llista no afecta la resta.

*	**Dependències** entre recursos: Si bé Terraform genera un arbre de dependències automàticament en realitzar un pla d' execució, de cara al manteniment i llegibilitat del codi, pot resultar de gran ajut seguir els següents estàndards en la definició del codi:

    - en la mesura dels possible, posicionar els recursos en el codi en l'ordre en què es creen, és a dir, en primer lloc les dependències, i posteriorment els recursos que en fan ús.
    - tot i que en fer referència a un recurs en algun dels atributs, ja es genera una dependència implícita entre aquests, en certs casos, pot ser necessari especificar un ordre concret per algun motiu. Per a això, es fa ús del bloc "depends_on" dins del recurs que té una dependència, d'aquesta manera es declara la dependència de forma explícita. 

    ```
    depends_on = [
        aws_iam_role_policy.instance_policy
    ]
    ```

    Opcionalment, es podria afegir el bloc "depends_on" dins dels recursos amb múltiples referències, encara que aquestes ja estiguin definides implícitament, per indicar en un mateix punt tots els recursos dels quals depèn aquest. Això pot ser una gran millora en la llegibilitat del codi.

 
## ANNEX
Enllaços d’interés:

* Terraform
  * https://learn.hashicorp.com/tutorials/terraform/data-sources
  * https://learn.hashicorp.com/tutorials/terraform/variables
  * https://learn.hashicorp.com/tutorials/terraform/locals
  * https://learn.hashicorp.com/tutorials/terraform/for-each
  * https://learn.hashicorp.com/tutorials/terraform/dependencies
* GCP naming conventions: https://cloud.google.com/blog/products/gcp/introducing-gcp-resource-naming-conventions
* AWS naming conventions
  * https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
  * https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/naming-conventions.html
* Azure naming conventions:
  * https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming
  * https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging
