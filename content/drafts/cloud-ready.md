+++
date        = "2016-09-15"
title       = "Cloud-Ready"
description = "Aspectes a tenir en compte en el disseny de l'arquitectura d'una aplicació per estar preprarada per anar al Cloud"
sections    = ["Bloc", "home"]
bloc_tags	= ["patrons de disseny", "microserveis", "api"]
imatge 		= "/images/bloc/cloud-ready.png"
key         = "OCTUBRE2016"
+++

Per tal que una aplicació pugui ser desplegada al **Cloud** cal que hagi estat dissenyada amb aquesta finalitat. Aquest disseny, normalment, és més complex que el disseny que es pugui realitzar per una aplicació destinada a ser desplegada en servidors "on-premise". Són molts els avantatges de l'entorn Cloud (flexibilitat, agilitat en aprovisionament, facilitat per desplegament continu,...) que fan que l'esforç en la **definició de l'arquitectura** valgui la pena.

A continuació s'enumeren diferents conceptes a tenir en compte en el disseny d'una aplicació que vulgui estar preparada per anar al Cloud:

### Micro-serveis

L'aplicació ha de ser concebuda com una col·lecció de serveis, no com a una única peça (monolít).


### Escalabilitat

Una arquitectura oriendata micro-serveis permetrà l'**escalabilitat** de cada servei per separat. Els entorns Cloud estan dissenyats per aprovisionar moltes petites màquines, no poques de gran potència. Per tant, les arquitectures orientades a micro-serveis són de forma natural fàcilment integrables en entorns Cloud.

### Agnòstic de la infraestructura

L'aplicació no ha d'accedir a recursos particulars de la infraestructura


### Robustesa

Cada component ha de ser autònom podent funcionar encara que la resta no estiguin disponibles.

### Desacoblament de la informació


### Stateless


### Emmagatzemament






### Seguretat


### Interoperabilitat

#### Protocols moderns i estàndards


#### Optimització de la comunicació entre components



### DevOps

#### Configuració


#### Automatització



#### Monitorització

CPU, Mem

#### Traçabilitat

No escriure logs a fitxer


Una aplicació dissenyada tenint en compte tots aquests aspectes estarà preparada per anar al Cloud.

<br />

**Referències**:

- http://blog.octo.com/en/cloud-ready-applications/
- http://www.ibm.com/developerworks/websphere/techjournal/1404_brown/1404_brown.html
- http://techbeacon.com/5-steps-building-cloud-ready-application-architecture
