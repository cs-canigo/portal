
+++
date         = "2024-04-19"
title        = "Desplegaments estesos"
description  = "Informació sobre desplegaments estesos per a Kubernetes, Màquines Virtuals i Scripts BBDD"
weight      = "9"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-desplegaments-estesos",
    "/ghec/gh-desplegaments-estesos"
]
+++


## Objectiu 🚀
El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions que apuntin a arquitectures Cloud native i desplegaments en Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser Kubernetes o Màquines Virtuals. També els desplegaments de canvis en bases de dades poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL, ...

## En detall 📋

Per a això es dissenya un model de desplegament estès o delegat ja que seran els diferents equips de desenvolupament els que s'encarreguin d'implementar les diferents accions del desplegament, quedant en l'àmbit de l'equip GHEC l'aprovisionament dels workflows.

El motiu de delegar el desplegament al proveïdor d'aplicacions i no automatitzar el 100% d'aquest en GHEC, obeeix a diferents motius:

1. Tecnologia no estratègica, no estant dins del Roadmap la inversió en aquestes per a l'automatització dels desplegaments.
2. Aspectes de seguretat, es delega a l'aplicació el desplegament, per no obrir connectivitats ni usar self-hosted runners que dificultin la gestió a nivell de CI/CD.

A dia d'avui hi ha 3 modalitats de desplegament en el radar que podrien encaixar en un model de desplegament delegat:

1. Kubernetes, amb charts Helm i desplegament de manifestos amb kubectl
2. Execució de scripts de Bases de dades (liquibase, psql, sqlcmd...)
3. Màquines virtuals amb Ansible (a futur en el roadmap)

La idea del model és la següent:

Creació d'un executor (ja sigui amb una funció lambda per a AWS o amb container instance per a Azure), que serà invocat des d'un workflow i executarà un contenidor on estaran disponibles totes les accions necessàries per fer el desplegament delegat corresponent.

S'aportaran dos workflows CD:
- **Executor Workflow CD**, el qual s'encarregarà de generar i pujar al Cloud el contenidor basat en un Dockerfile que en iniciar executa un script amb les instruccions de desplegament, i la funció per al cas d'AWS.
- **Descriptor Workflow CD**, el qual s'encarregarà de pujar els arxius (Helm charts, manifestos, scripts de bases de dades, etc.) a un storage i invocar a la funció per a que executi les accions del desplegament per a AWS, i per al cas d'Azure aixecar un ACI que executi aquest contenidor generat prèviament.

Actualment, s'han realitzat 4 tipus de Proves de Concepte (PoCs) que són les que es mostren en aquesta documentació:

1. Desplegament de helm charts i manifestos en un clúster de Kubernetes EKS en AWS.
2. Desplegament o execució de scripts de bases de dades amb liquibase i psql en AWS.
3. Desplegament de helm charts i manifestos en un clúster de Kubernetes AKS en Azure.
4. Desplegament o execució de scripts de bases de dades amb sqlcmd en Azure.

Aquestes proves de concepte es carreguen com a exemples en els repositoris de desplegaments estesos quan es creen com a punt de partida per als equips de desenvolupament.

## Pre-requisits d'infraestructura per al correcte funcionament del model 📋

Per al funcionament del model de desplegaments estesos es requereix d'una sèrie de recursos al núvol que els equips de desenvolupament hauran d'aprovisionar prèviament, que es detallen a continuació, i depenen del proveïdor de cloud en el qual es vulgui desplegar o executar els descriptors.

Per a més detall i exemples amb snippets de codi, es pot consultar la documentació específica per als pre-requisits del model de desplegaments estesos segons el proveïdor de cloud [PRE-REQUISITES Desplegaments Estesos](../gh-capacitat-tecnologiques/).

### AWS

Per al desplegament de descriptors en AWS es requereix dels següents recursos d'infraestructura:

1. **Elastic Container Registry (ECR)**: Per a emmagatzemar les imatges de contenidors que es generin a partir dels Dockerfiles.
2. **Lambda basada en contenidors**: Per a executar el contenidor que es generi a partir de la imatge pujada a ECR. Aquesta lambda serà una funció basada en contenidor (no en codi).
3. **Bucket S3**: Per a emmagatzemar els descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) que es vulguin desplegar.
4. **Secrets Manager**: Per a emmagatzemar les credencials d'accés als recursos que es vulguin modificar (clúster de kubernetes, base de dades, etc.).
5. **IAM Role**: Per a donar permisos a la lambda perquè pugui accedir als recursos necessaris, tant per a descarregar els descriptors del bucket, com per a obtenir les credencials del Secrets Manager. A més, s'hauran de donar permisos a la lambda perquè pugui fer la connexió i el desplegament dels descriptors en els recursos.
6. **Endpoint gateway**: Per a que la lambda pugui accedir als recursos de la VPC (S3).

### Azure

Per al desplegament de descriptors en Azure es requereix dels següents recursos d'infraestructura:

1. **Azure Container Registry (ACR)**: Per a emmagatzemar les imatges de contenidors que es generin a partir dels Dockerfiles.
2. **Storage Account i Blob Storage**: Per a emmagatzemar els descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) que es vulguin desplegar.
3. **KeyVault**: Per a emmagatzemar les credencials d'accés als recursos que es vulguin modificar (clúster de kubernetes, base de dades, etc.).

## Model de desplegament estès per a AWS

En el següent diagrama, es pot observar el disseny del model de desplegament estès per al cloud de **AWS**.

  ![Desplegaments estesos en AWS](/images/GHEC/gh_desplegaments_estesos_AWS.png)

Existint dos workflows CD:
+ **Executor WorkFlow CD**, que a partir d'un Dockerfile, un script python d'inicialització del contenidor i un fitxer requirements.txt amb un llistat d'eines requerides, es generarà una imatge que serà pujada a un ECR (Elastic Container Registry) per a ser enllaçada amb una funció Lambda de tipus container, que serà posteriorment (en el workflow de CD de descriptors) l'encarregada d'aixecar un contenidor a partir d'aquesta imatge, realitzant totes les accions de desplegament definides en el script d'inicialització.

Les accions a grans trets que realitzaria el workflow serien les següents:

  ![Desplegaments estesos Executor en AWS](/images/GHEC/gh_desplegaments_estesos_executor_aws.png)

1. Generació d'una imatge de contenidor a partir d'un Dockerfile, un requirements.txt i un script d'inicialització amb les eines i accions necessàries per al desplegament.
2. Pujada de la imatge a un ECR (Elastic Container Registry).
3. Actualització de la lambda amb la nova imatge generada en el pas anterior.

+ **Descriptor WorkFlow CD**, que s'encarregarà de pujar els arxius indicats com a paràmetre d'entrada o descriptors en un bucket S3 d'AWS, i de posteriorment invocar a la funció Lambda que s'ha desplegat anteriorment, perquè executi les accions de desplegament, fent ús dels arxius pujats al bucket, obtenint les credencials d'accés, fent la connexió i l'execució dels descriptors.

Les accions a grans trets que realitzaria el workflow serien les següents:

  ![Desplegaments estesos Descriptor en AWS](/images/GHEC/gh_desplegaments_estesos_descriptor_aws.png)

1. Pujada dels descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) a un Bucket S3 d'AWS.
2. Invocació de la Lambda que es va actualitzar anteriorment en l'Executor WorkFlow CD.
    - La lambda descarrega els descriptors del Bucket S3.
    - La lambda recupera les credencials d'accés o connexió al recurs (base de dades, clúster, etc.) d'un secret del Secrets Manager.
    - Connexió i desplegament/execució dels descriptors en el recurs.

## Model de desplegament estès per a Azure

En el següent diagrama, es pot observar el disseny del model de desplegament estès per al cloud de **Azure**.

  ![Desplegaments estesos en Azure](/images/GHEC/gh_desplegaments_estesos_azure.png)

Existint dos workflows CD:
+ **Executor WorkFlow CD**, que a partir d'un Dockerfile, un script python d'inicialització del contenidor i un fitxer requirements.txt amb un llistat d'eines requerides, es generarà una imatge que serà pujada a un ACR (Azure Container Registry) per a ser utilitzada posteriorment en el workflow de CD de descriptors, sent la imatge utilitzada per a aixecar un Azure Container Instance (ACI), que s'encarregarà de realitzar totes les accions de desplegament definides en el script d'inicialització.

Les accions a grans trets que realitzaria el workflow serien les següents:

  ![Desplegaments estesos Executor en Azure](/images/GHEC/gh_desplegaments_estesos_executor_azure.png)

1. Generació d'una imatge de contenidor a partir d'un Dockerfile, un requirements.txt i un script d'inicialització amb les eines i accions necessàries per al desplegament.
2. Pujada de la imatge a un ACR (Azure Container Registry).

+ **Descriptor WorkFlow CD**, que s'encarregarà de pujar els arxius indicats com a paràmetre d'entrada o descriptors en un blob storage d'Azure, i de posteriorment crear i executar un Azure Container Instance a partir de la imatge generada en el workflow anterior, perquè executi les accions de desplegament, fent ús dels arxius pujats al bucket, obtenint les credencials d'accés, fent la connexió i l'execució dels descriptors.

Les accions a grans trets que realitzaria el workflow serien les següents:

  ![Desplegaments estesos Descriptor en Azure](/images/GHEC/gh_desplegaments_estesos_descriptor_azure.png)

1. Pujada dels descriptors (Helm Charts, manifestos, scripts de bases de dades, etc.) a un blob storage d'Azure.
2. Creació d'un ACI i inicialització del contenidor a partir de la imatge generada anteriorment en l'Executor WorkFlow CD en la xarxa i subxarxa compartida amb el recurs a modificar.
    - L'ACI descarrega els descriptors del blob storage.
    - L'ACI recupera les credencials d'accés o connexió al recurs (base de dades, clúster, etc.) d'un KeyVault.
    - Connexió i desplegament/execució dels descriptors en el recurs.

## Paràmetres rebuts pels workflows 📋

Per a conèixer el detall dels paràmetres que es poden rebre en els workflows de desplegaments estesos, es pot consultar la documentació específica per als paràmetres d'entrada dels workflows de desplegaments estesos segons el proveïdor de cloud [Configuració workflows Desplegaments Estesos](../workflows/gh-configuracio-workflows.md/).

Com es menciona, els paràmetres rebuts pel workflow dependran del tipus de cloud en el qual es vulgui desplegar o executar els descriptors, i del tipus de desplegament que es vulgui realitzar:

### Executor WorkFlow CD

Els paràmetres comuns per a tots els desplegaments són:
  - cloud
  - engine
  - technology
  - executor_image_version
  - environment
  - registry_name

Els paràmetres específics per a cada tipus de desplegament són:

1. AWS
    - function_name

### Descriptor WorkFlow CD

Els paràmetres comuns per a tots els desplegaments són:
  - cloud
  - engine
  - technology
  - executor_image_version
  - artifact_version
  - environment
  - storage_name
  - descriptors_relative_path
  - connection_secret_name

Els paràmetres específics per a cada tipus de desplegament són:

1. AWS i Kubernetes
    - function_name
    - cluster_name
    - namespace

2. AWS i Bases de dades
    - function_name
    - database_endpoint
    - database_name
    - database_user

3. Azure i Kubernetes
    - registry_name
    - vnet_name (opcional)
    - subnet_name (opcional)
    - resource_group
    - blob_name
    - key_vault_name
    - azure_region
    - cluster_name
    - namespace

4. Azure i Bases de dades
    - registry_name
    - vnet_name (opcional)
    - subnet_name (opcional)
    - resource_group
    - blob_name
    - key_vault_name
    - azure_region
    - database_endpoint
    - database_name
    - database_user
