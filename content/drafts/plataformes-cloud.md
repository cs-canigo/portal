+++
date        = "2020-06-11"
title       = "Plataformes Cloud"
description = "Plataformes cloud disponibles a la Generalitat de catalunya"
sections    = "Cloud"
weight      = 2
categories  = ["cloud","caas","xpaas","dbaas","iaas"]
+++

Les plataformes cloud que ofereix la Generalitat de Catalunya clasificades per CPD, són les seguents:

![Plataformes cloud per CPD ](/related/cloud/catalegCloud_cpd.png)


Les plataformes cloud que ofereix la Generalitat de Catalunya clasificades per tipologia, són les seguents:

![Plataformes cloud per Tipologia ](/related/cloud/catalegCloud_tipologia.png)


## Cloud Privat

### CaaS

#### AppAgile

**Actualment aquesta plataforma està deprecada i està en procés de migració a Openshift 4. No es desplegarà cap aplicació nova.**

- http://appagile.io/
- Basat en Openshift: https://www.openshift.com/
- Contenidors docker i orquestració amb Openshift
- Versió:  **OpenShift Container Platform 3.9.65 i Kubernetes 1.9.1.** 
  
Disponible a CPD4 en entorns de consolidables.

#### Openshift 4

- Openshift: https://www.openshift.com/
- Contenidors docker i orquestració amb Openshift
- Versió:  **OpenShift Container Platform 4.3 i Kubernetes 1.16.** 
- Disposa de Service Mesh. **Apte per desplegar aplicacions basades en microserveis.** 

Disponible a CPD3 i CPD4 en entorns de consolidables.

Disponible a CPD4 en entorns de critics.

#### SwarmMe

- Basat en Swarm: https://docs.docker.com/swarm/
- Contenidors docker i orquestració amb Swarm
- Versió: **Docker 18.9**

Disponible a CPD1 en entorns de consolidables.

#### KaaS

- Basat en Kubernetes: https://kubernetes.io/
- Contenidors docker i orquestració amb Kubernetes
- Versió: **Kubernetes 1.14.8. Docker 18.9**

Disponible a CPD2 en entorns de consolidables.

### DBaaS

#### AppAgile

**Actualment aquesta plataforma està deprecada i està en procés de migració a Openshift 4. No es desplegarà cap aplicació nova.**

- http://appagile.io/
- Basat en Openshift: https://www.openshift.com/
- S'ofereixen les Bases de dades administrades PostgreSQL i MySQL.

Disponible a CPD4 en entorns de consolidables.

#### Openshift 4

- Openshift: https://www.openshift.com/
- S'ofereixen les Bases de dades administrades PostgreSQL i MySQL.

Disponible a CPD4 en entorns de consolidables.

Disponible a CPD4 en entorns de critics.

#### KaaS

- Basat en Kubernetes: https://kubernetes.io/
- S'ofereixen les Bases de dades administrades PostgreSQL, MongoDB i Redis.

Disponible a CPD2 en entorns de consolidables.

### xPaaS

#### KaaS

- Basat en Kubernetes: https://kubernetes.io/
- S'ofereixen serveis administrats de WAS Liberty, Zipkin, Nginx, Jaeger, Kafka, Zookeeper, ElasticSearch, Apache Ignite, Consul, Kong

Disponible a CPD2 en entorns de consolidables.


## Cloud Públic

### xPaaS

#### IBMCloud Runtimes

Basat en Cloud Foundry
Java, Node.js, PHP, Python, Ruby, Swift i Go
També permet runtimes i contenidors personalitzats.

- https://www.ibm.com/cloud-computing/bluemix/es/runtimes

#### Azure

.NET, Java, Node.js, PHP i Python a Windows
.NET Core, Node.js, PHP i Ruby a Linux

- https://azure.microsoft.com/es-es/services/app-service/web/

### CaaS

#### IBMCloud Kubernetes

Contenidors docker desplegats sobre la plataforma Kubernetes

- https://www.ibm.com/cloud-computing/bluemix/es/containers
- Versió: **Kubernetes 1.16.10 Containerd 1.3.4**

### DBaaS

#### Compose

ElasticSearch, MongoDB, PostgreSQL, Redis

- https://www.compose.com/

#### Azure

Principalment SQL Server, PostgreSQL i MySQL

- https://azure.microsoft.com/es-es/services/sql-database/
- https://azure.microsoft.com/es-es/services/mysql/
- https://azure.microsoft.com/es-es/services/postgresql/

### IaaS

#### Azure

Màquines virtuals windows i linux.

- https://azure.microsoft.com/es-es/
