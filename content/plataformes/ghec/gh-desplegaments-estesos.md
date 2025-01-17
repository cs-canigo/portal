
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
El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions que apuntin a arquitectures Cloud native i desplegaments a Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser Kubernetes o Màquines Virtuals. També els desplegaments de canvis en bases de dades poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase o Flyway, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL, ...


## Al detall 📋

Per a això es dissenya un model de desplegament estès o delegat ja que seran els diferents equips de desenvolupament els que s' encarreguen d' implementar les diferents accions del desplegament, quedant en l' abast de l' equip GHEC el proveïment dels workflows.


El motiu de delegar el desplegament al proveïdor d' aplicacions i no automatitzar el 100% d' aquest a GHEC, obeeix a diferents motius:

1. Tecnologia no estratègica, no estant dins del Roadmap la inversió en aquestes per a l'automatització dels desplegaments.
2. Aspectes de seguretat, es delega a l'aplicació el desplegament, per no obrir connectivitats ni usar self-hosted runners que dificultin la gestió a nivell de CI/CD.


A dia d' avui hi ha 3 modalitats de desplegament al radar que podrien encaixar en un model de desplegament delegat:

1. Kubernetes, amb cartes Helm
2. Bases de dades, amb Liquibase
3. Màquines virtuals amb Ansible (a futur)

L'idea del model és el següent : 

Creació d'un executor (ja sigui amb una funció o amb un contenidor, depenent de tecnologia) que simplement serà invocat des d'un pipeline i executarà un contenidor on estaran disponibles totes les accions necessàries per fer el desplegament delegat de l'aplicació

S'aportaran dos workflows CD :
- **Executor Workflow CD**, el qual s'encarregarà de pujar al Cloud el contenidor (amb les instruccions de desplegament) i la funció.
- **Descriptor Workflow CD**, el qual s'encarregarà de pujar els fitxers (Helm charts, scripts sql, vm) a un storage i invocar a la funció perquè executi les accions del desplegament.

Actualment, s'ha realitzat 3 tipus de Proves de Concepte (PoCs) que són les que es mostren en aquesta documentació:

1. Desplegament d'aplicacions a Kubernetes (AWS) mitjançant Helm Charts
2. Desplegament d'aplicacions a Kubernetes (AZURE) mitjançant Helm Charts
3. Desplegament de scripts de BBDD amb Liquibase en AuroraDB PosgreSQL en AWS.



### Desplegament d' aplicacions a Kubernetes AWS mitjançant Helm Charts

En el següent diagrama, es pot observar el disseny d'un desplegament estès per a Helm Charts a Elastic Kubernetes Service (EKS).

  ![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_aws.png) 

Existint dos workflows CD.
+ **Executor WorkFlow CD**, per realitzar el desplegament de la funció Lambda que realitzarà l' execució de les accions necessàries per desplegar l' aplicació.

+ **Descriptor WorkFlow CD**, que pujarà els Helm Charts de l'aplicació a un bucket S3 perquè posteriorment la lambda els recuperi i els executi.



**EXECUTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :


![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_aws_executor.png)


1. Creació d'un contenidor per emmagatzemar la funció lambda. Aquest contenidor té capacitats d' execució per a Helm Charts.
2. Pujada del Contenidor en un ECR (Elastic Container Registry)
3. Actualització de la imatge i de la lambda.

D' aquesta manera, tindrem l' executor preparat per ser invocat i realitzar les accions necessàries per al desplegament.

**DESCRIPTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :


![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_aws_descriptor.png) 


1. Pujada dels Helm Charts de l'aplicació a un Bucket S3 d'AWS.
2. Invocació de la Lambda que es va desplegar anteriorment.
    - La lambda descarrega els Helm Charts del Bucket. 
    - La lambda recupera les credencials d' accés a l' EKS.
    - Desplegament de l' aplicació a EKS.


### Despliegue de aplicaciones en Kubernetes AZURE mediante Helm Charts


En el següent diagrama, es pot observar el disseny d'un desplegament estès per a Helm Charts en AZURE Kubernetes Service (AKS).

![Desplegaments esteso Kubernetes en Azure](/images/GHEC/gh_desplegaments_estesos_k8s_azure.png) 

Existint dos workflows CD.
+ **Executor WorkFlow CD**, per realitzar el desplegament d'un contenidor que posteriorment serà executat per realitzar el desplegament (Aquesta és la principal diferència respecte al desplegament a AWS.)
+ **Descriptor WorkFlow CD**, que pujarà els Helm Charts de l'aplicació a un Blob Storage perquè posteriorment el contenidor el desplegui en un AKS.


**EXECUTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :

![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_azure_executor.png)


1. Creació d'un contenidor. Aquest contenidor té capacitats d' execució per a Helm Charts.
2. Pujada del Contenidor en un ACR (Azure Container Registry)
3. Actualització del Contenidor.

D' aquesta manera, tindrem l' executor preparat per ser invocat i realitzar les accions necessàries per al desplegament.

**DESCRIPTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :

![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_azure_descriptor.png) 


1. Pujada dels Helm Charts de l'aplicació a un Azure Blob Storage.
2. Deploy del contenidor mitjançant ACI (Azure Container Instance).
    - L'ACI, descarrega els Helm Charts de l'Storage. 
    - Recupera les credencials d' accés a l' AKS d' un KeyVault.
    - Desplegament de l' aplicació a AKS.


### Desplegament de scripts de BBDD a AuroraDB en AWS.

En el següent diagrama, es pot observar el disseny d'un desplegament estès per a Helm Charts a Elastic Kubernetes Service (EKS).

  ![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_bbdd_aws.png) 

Existint dos workflows CD.
+ **Executor WorkFlow CD**, per realitzar el desplegament de la funció Lambda que realitzar l' execució de les accions per realitzar el desplegament
+ **Descriptor WorkFlow CD**, que pujarà els Scripts de BBDD a un bucket S3 perquè posteriorment la lambda els recuperi i els executi.

**EXECUTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :

![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_aws_executor.png)


1. Creació d'un contenidor per emmagatzemar la funció lambda. Aquest contenidor té capacitats d' execució per a scripts de BBDD amb LiquiBase.
2. Pujada del Contenidor en un ECR (Elastic Container Registry)
3. Actualització de la imatge i de la lambda.

D' aquesta manera, tindrem l' executor preparat per ser invocat i realitzar les accions necessàries per al desplegament.


**DESCRIPTOR WORKFLOW CD**
Serà executat sota demanda per l'usuari amb els següents steps :


![Desplegaments esteso Kubernetes en AWS](/images/GHEC/gh_desplegaments_estesos_k8s_bbdd_descriptor.png) 

1. Pujada dels Scripts de BBDD a un Bucket S3 d'AWS.
2. Invocació de la Lambda que es va desplegar anteriorment.
    - La lambda descarrega els scripts del bucket.
    - La lambda recupera les credencials d'accés a AuroraBD
    - Execució dels scrips a la BBDD.
