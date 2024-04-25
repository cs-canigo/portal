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

## Nomenclatura

### Objectiu

Establir un **estàndard de nomenclatura** per als serveis desplegats en diverses plataformes de núvol públic (AWS, Azure, Google, IBM Cloud etc.), proporcionant una estructura uniforme i coherent per a la identificació de recursos.

### Nomenclatura global

El nom d'un objecte associat a un servei d'infraestructura constarà de 10 dígits distribuïts segons una codificació específica, incloent elements com el codi únic del servei, tipus de servei, producte associat, entorn i un índex seqüencial controlat pel proveïdor d'infraestructura.

#### Codificació Detallada 

* **aa-zzz-eee-iii**
  - **ser**: Codi únic del servei/aplicació.
  - **yyy**: Tipus de servei (transversal, xarxa, seguretat, emmagatzematge, etc.).
  - **zzz**: Producte associat al tipus de servei.
  - **eee**: Entorn (producció, preproducció, test, etc.).
  - **iii**: Índex seqüencial controlat pel proveïdor d' infraestructura.

Revisar **Annexos** per a més informació més detallada.

#### Components

- Servei: Identificació única designada per la Unitat de Gestió de Catàleg de Serveis.
- Entorn: Classificació de l' entorn del qual pertany l' objecte.
  - **pro**: Producció / Explotació
  - **pre**: Preproducció / Test
  - **int**: Integració
  - **des**: Desenvolupament
  - **prs**: Proves de sistemes
  - **prp**: Proves de proveïdor
  - **for**: Formació
  - **con**: Consolidació
  - **Laboratori**: Laboratoris

- Índex: Nombre seqüencial controlat pel proveïdor d' infraestructura.
  - Aquest codi serà de 3 dígits en tots els casos.
    - Exemples d’indexos: 000 ... 007 ... 016 .... 109 ... 243 ... 978 ... 999
    - Exemples de nomenclatura:  agc-aaaa-zzz-pro-001,  bcm-aaaa-zzz-pre-057 

- Tipus: 
  - **emm**: Emmagatzemament
  - **seg**: Seguretat
  - **xar**: Xarxa
  - **entre**: Transversal

- Emmagatzematge / Seguretat / Xarxa / Transversal:

  - Emmagatzemament: 
    - **blo**: Bloquejat
    - **fit**: Fitxers
    - **obj**: Objectes
    - **arx**: Arxivat

  - Seguretat (seg): Tipus de serveis de seguretat inclouen:
    - **nat**: Accés extern a l’entorn
    - **fba**: Filtrat de ports a un balancejador de frontend
    - **fro**: Accés a les instàncies de frontend
    - **bba**: Filtrat de ports a un balancejador de backend
    - **bac**: Accés a les instàncies de backend
    - **bdd**: Accés a les bases de dades
    - **tal**: Tallafocs
    - **wta**: Tallafocs d’aplicacions web
    - **cls**: Azure Security Center / AWS Security Hub

  -	Xarxa (xar): Tipus de serveis de xarxa inclouen:
      - **vpu**: Xarxa virtual (vpc, vnet)
      - **vpr**: Xarxa privada virtual (vpn)
      - **spr**: Subxarxa privada
      - **spu**: Subxarxa pública
      - **rpr**: Taules d’enrutament privada
      - **rpu**: Taules d’enrutament públic
      - **dhc**: Opció DHCP
      - **pas**: Passarel·la internet (passarel·la d'internet)
      - **bal**: Balancejador de càrrega
      - **per**: Permutador
      - **wan**: Azure WAN / AWS Transit Gateway
      - **alp**: Azure Express Route / AWS Direct Connect

  -	Transversal (tra): Tipus de serveis transversals inclouen:
      - **sub**: Subscripció
      - **gre**: Grup de recursos
      - **org**: Organització/Tenant
      - **oru**: Unitat Organitzativa / Grup de Direcció
      - **com**: Subscripció / Compte
      - **esp**: Espai de noms

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

### Bones Pràctiques en Infraestructura com a Codi (IaC):

Per a una implementació efectiva de la infraestructura com a codi, a més de la nomenclatura, etiquetatge i compliment de SCPs, és important seguir una sèrie de **bones pràctiques**:

* Ús de blocs **"data"**: Aquesta característica permet consultar informació sobre recursos ja existents en la infraestructura desplegada en qualsevol dels proveïdors de núvol utilitzats, d'aquesta manera, s'evita incloure en el codi, o en variables, valors com identificadors, o atributs d'altres recursos. En el seu lloc, des del codi es faria referència a l' atribut desitjat de la sortida del bloc data.

  Per exemple, per desplegar recursos vinculats a subxarxes d' AWS, enlloc d'incloure els identificadors d'aquesta manera:
  ```
  …
  subnet_ids = [“subnet-xxxx”,”subnet-yyyy”,”subnet-zzzz”]
  …
  ```

  S' hauria d' incloure el codi següent:
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

 
## ANNEX I

Enllaços d’interés:

* https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
* https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging


## ANNEX II

### ANNEX II - Tipus 
	
Els 3 dígits associats al tipus indica la tecnologia associada a l’objecte.

- **mav** màquina virtual.
- **maf** màquina física
- **ivi** infraestructura de virtualització
- **cop** sistemes de còpies de seguretat
- **mon** sistema de monitoratge
- **web** sistema web
- **mwa** sistema middleware
- **bdd** base de dades
- **app** aplicació
- **dir** servei de directori
- **sap** sistema sap
- **gdo** gestor documental
- **con** sistema de contenidors


### ANNEX II - Productes – màquines físiques, virtuals, infraestructures de virtualització 

Màquines físiques

- **win** Windows 
- **rhl** Redhat Linux
- **sul** Suse Linux
- **orl** Oracle Linux
- **aix** IBM AIX
- **hpu** HP UX
- **sol** Oracle Solaris


Màquines virtuals
- **win** Windows 
- **rhl** Redhat Linux
- **sul** Suse Linux
- **orl** Oracle Linux


Infraestructures de virtualització
- **vmw** VMWare 
- **xen** XenApp & XenDesktop
- **hip** Hiper-V


### ANNEX II - Productes - còpies de seguretat i monitoratge 
	
Backup 
- **net** Veritas Netbackup
- **com** Commvault
- **vee** Veeam
- **aba** AWS Backup / Azure Backup
- **asg** AWS Storage Gateway Azure Data Box Gateway
	
Monitoratge 
- **mic** Microfocus
- **dyn** Dynatrace
- **dat** Datadog
- **spl** Splunk
- **sol** Solarwinds
- **nag** Nagios
- **amo** AWS Cloudwatch / Azure Monitor

### ANNEX II - Productes – sistemes web, sistemes middleware

Servidors web
- **apa** Apache
- **iis** IIS
- **ngi** ngnix
- **ihs** IBM HTTP Server
- **ohs** Oracle HTTP Server
- **asw** AWS Simplify / Azure Static WebApps
	

Servidors d’aplicacions
- **wlg** Weblogic
- **tom** Tomcat
- **jbo** JBoss
- **net** .NET
- **php** PHP
- **node** Node.js
- **jd** JDK
- **pyt** Python
- **rub** Ruby
- **go0** Go
- **aap** Azure App Service / AWS Elastic Beanstalk
- **afu** Azure Functions / AWS Lambda

### ANNEX II - Productes – bases de dades 

Bases de dades
- **ora** Oracle / Amazon RDS for Oracle
- **sql** SQL Server / Amazon RDS for SQL Server / Azure SQL Database
- **mys** MySQL / Amazon RDS for MySQL / Azure Database for MySQL
- **mar** MariaDB / Amazon RDS for MariaDB / Azure Database for MariaDB
- **pos** PostgreSQL / Amazon RDS for PostgreSQL / Azure Database for PostgreSQL
- **red** Redis / Azure ElasticCache
- **ela** Elasticsearch / Amazon Opensearch
- **mon** MongoDB / AWS DynamoDB / Azure Cosmos
- **dwh** Amazon Redshift / Azure Synapse Analytics

### ANNEX II - Productes - SAP, gestió documental 
	
SAP
- **bdd** Base de dades 
- **scs** ASCS/SCS
- **web** Web Dispatcher
- **ers** Enqueue Replication Server
- **gfs** Global FileSystem
- **cei** Central Instance
- **dii** Dialog Instace
	

Gestió documental
- **doc** Documentum 
- **fil** Filenet
- **alf** Alfresco
- **ocm** OpenCMS
- **lif** Liferay
- **sha** Sharepoint

### ANNEX II - Productes – directori, contenidos

Directori
- **mad** Active Directory
- **opl** OpenLDAP
- **iam** Azure Active Directory / AWS Identity and Access Management

Contenidors
- **ope** Redhat Openshift / Redhat Openshift Service on AWS / Azure Redhat Openshift
- **tan** VMWare Tanzu
- **ran** Suse Rancher
- **kub** Kubernetes / AWS Elastic Kubernetes Service / Azure Kubernetes Service
- **kse** AWS Fargate / Azure Container Apps
