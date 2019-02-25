+++
date        = "2019-02-15"
title       = "Procés de desplegament de solucions Cloud"
description = "Descripció simplificada del procés de desplegament de solucions Cloud"
sections    = "Cloud"
categories  = ["cloud","docker","container","paas","openshift","kubernetes","swarm","azure"]
weight = 5
+++

El desplegament de solucions cloud aplica el model DEVOPS.

## Procés de desplegament CTTI adaptat al Model DEVOPS

### Resum del procés

- Creació del document Descripció d'Arquitectura (DA) del projecte
- Obertura del Projecte d'Aprovisionament d'Infraestructura (PAI)
- Conformitat del DA per part de l'equip d'Arquitectura CTTI
- Assignació de CPD
- Reunió de Fase 0
- Oferta econòmica del PAI
- Acceptació Oferta Econòmica del PAI
- Alta de l'aplicació al SIC
- Creació de projectes i assignació de permisos al SIC
- Desenvolupament de l'aplicació
- Primer desplegament de l'aplicació al cloud
  - Aprovisionament de l'entorn d'execució no productiu
  - Configuració de l'aplicació al SIC
  - Primer Desplegament a l'entorn no productiu
  - Validació Aplicació a l'entorn no productiu
  - Estabilització de l'aplicació
  - Aprovisionament de l'entorn d'execució productiu
  - Primer Desplegament a l'entorn productiu
  - Validació Aplicació a l'entorn productiu
- Alta CMDB
- Posada en servei
- Afegir aplicació al servei de monitoratge Cloud
- Tancament de projecte

### Actors

- Lot d'Aplicacions
- Unitat d'Integració de solucions
- Gestor de Solucions del Departament/Organisme
- Àrea d'Arquitectura CTTI
- Equip de SIC
- Release manager SIC
- Equip de Suport Cloud
- Bústia de Projectes d'Infraestructura
- Àrea d'Aprovisionament de serveis TIC
- Equip de Cesicat
- Equip de NUS
- CPD
- ...

### Creació del document Descripció d'Arquitectura (DA) del projecte

Actor: Lot d'Aplicacions

El document de Descripció d'Arquitectura inclou les diferents vistes lògiques i físiques del sistema d’informació.

Es pot consultar el detall del document a l'article [Descripció d'Arquitectura.](https://qualitat.solucions.gencat.cat/lliurables/descripcio_arquitectura/)

### Obertura del Projecte d'Aprovisionament d'Infraestructura (PAI)

Actors:

- Gestor de Solucions del Departament/Organisme
- Unitat d'Integració de solucions

El gestor de Solucions del Departament/Organisme obrirà un Projecte d'Aprovisionament d'Infraestructura que serà gestionat per l'equip d'Integració de solucions durant la fase de projecte fins a la seva postada en Servei.

### Conformitat del DA per part de l'equip d'Arquitectura CTTI

Actors:

- Àrea d'Arquitectura CTTI
- Unitat d'Integració de solucions
- Gestor de Solucions del Departament/Organisme
- Lot d'Aplicacions

El DA pot arribar a l'equip d'arquitectura CTTI a través de dos canals:

- Des de la Unitat d'Integració de solucions. És el canal més habitual i es produeix quan en un pas previ s'ha obert un Projecte d'aprovisionament d'Infraestructura.
- Directament des del Gestor de Solucions del Departament/Organisme. Requereix que posteriorment s'obri un projecte d'Aprovisionament d'Infraestructura.

L'Àrea d'Arquitectura CTTI realitzarà la validació del DA seguint el procediment 
[Gestió de conformitats.](https://portic.ctti.gencat.cat/processosctti/Documents/FM09_Arquitectura,%20qualitat%20i%20est%C3%A0ndards/P09%20Arquitectura,%20qualitat%20i%20est%C3%A0ndards/P09S03N01_Gesti%C3%B3%20de%20Conformitats.pdf)

En cas de dubtes o disconformitats, es realitzaran iteracions amb el Lot d'Aplicacions per acabar de definir l'arquitectura definitiva.

Durant aquesta validació s'identificaran les possibles excepcions i es concretaran els requisits tècnics que cal considerar a l'hora de seleccionar la plataforma cloud on es desplegarà la solució.


### Assignació de CPD

Actors:

- Unitat d'Integració de solucions
- Àrea d'Aprovisionament de serveis TIC

La Unitat d'Integració de solucions i l'Àrea d'Aprovisionament de serveis TIC es reuneixen periòdicament per assignar a quina plataforma cloud cal desplegar la solució considerant entre altres els requisits tècnics validats per l'Àrea d'Arquitectura.


### Reunió de Fase 0

Actors assistents obligatoris:

- Lot d'Aplicacions
- Unitat d'Integració de solucions
- Gestor de Solucions del Departament/Organisme
- Equip de SIC
- Equip de Suport Cloud
- Equip de Cesicat
- Equip de NUS

La unitat d'Integració de solucions convoca la reunió de Fase 0 amb els actors assistents obligatoris i tots els actors addicionals que consideri necessaris.

En aquesta reunió s'acabaran de definir els possibles dubtes que hagin quedat pendents de DA i es definiran els propers passos a seguir.

Un cop tancat definitivament el DA, la unitat d'Integració de solucions l'enviarà a Bústia de Projectes d'Infraestructura amb la sol·licitud de noves infraestructures.


### Oferta econòmica del PAI

Actors:

- Bústia de Projectes d'Infraestructura
- Suport Cloud
- CPD

La Bústia de Projectes d'Infraestructura sol·licitarà l'oferta del PAI a:

- Suport cloud en el cas de clouds públics.
- CPD en el cas de clouds privats. Suport cloud inicialment realitza una oferta preliminar que posteriorment valida CPD.

### Acceptació Oferta Econòmica del PAI

Actors:

- Bústia de Projectes d'Infraestructura
- Gestor de Solucions del Departament/Organisme

L'equip de la Bústia de Projectes d'Infraestructura envia l'oferta a Gestor de Solucions del Departament/Organisme per a la seva acceptació.

### Alta de l'aplicació al SIC

Actors:


### Creació de projectes i assignació de permisos al SIC

Actors:

- Release Manager SIC
- Lot d'aplicacions

La plataforma SIC disposa d'un model d'autoservei que permet crear projectes i assignar permisos a usuaris. 

Podeu veure més detalls a l'article [Autoservei d'usuaris](https://canigo.ctti.gencat.cat/sic-serveis/autoservei-usuaris/)


### Desenvolupament de l'aplicació

Actors:

- Lot d'aplicacions
- Gestor de Solucions del Departament/Organisme

El Lot d'aplicacions desenvolupa l'aplicació amb el suport del Gestor de Solucions del Departament/Organisme.

### Primer desplegament de l'aplicació al cloud

#### Aprovisionament de l'entorn d'execució no productiu

Actors:

- Unitat d'Integració de solucions
- Gestor de Solucions del Departament/Organisme
- Suport Cloud
- CPD

Un cop es consideri la necessitat de disposar de l'entorn d'execució no productiu, el Gestor de Solucions del Departament/Organisme sol·licitarà a la Unitat d'Integració de solucions l'aprovisionament de l'entorn no productiu.

Seguidament, la Unitat d'Integració de solucions sol·licitarà la creació de l'entorn a l'equip de Suport Cloud.

Pels clouds públics, suport cloud realitzarà l'aprovisionament de l'entorn.
Pels clouds privats, suport cloud sol·licitarà al CPD que gestioni el cloud l'aprovisionament de l'entorn.

#### Configuració de l'aplicació al SIC

Actors:

- Lot d'aplicacions
- Suport Cloud
- SIC

Els equips de SIC i Suport Cloud, amb el suport de Lot d'aplicacions configuren les tasques necessàries a la plataforma SIC per automatitzar els desplegaments i operacions de l'aplicació facilitant l'autonomia del lot d'aplicacions.

Podeu veure més detalls dels requeriments necessaris per integrar-se amb SIC a:

- [Integració de contenidors a SIC](https://canigo.ctti.gencat.cat/draft/cloud/cloud-caas/integracio-contenidors-sic/)
- [Integració d'aplicacions xPaaS a SIC](https://canigo.ctti.gencat.cat/draft/cloud/cloud-xpaas/integracio-xpaas-sic/)

#### Primer Desplegament a l'entorn no productiu

Actors:

- Lot d'aplicacions
- Suport Cloud
  
Addicionalment al desenvolupament de les aplicacions, per desplegar als diferents clouds, cal tenir present una sèrie de consideracions específiques de cada cloud que cal tenir present.

Podeu visitar els articles:

 - [Consideracions al desplegament de contenidors](https://canigo.ctti.gencat.cat/draft/cloud/cloud-caas/consideracions-desplegament/), 
  - [Consideracions al desplegament de contenidors](https://canigo.ctti.gencat.cat/draft/cloud/cloud-xpaas/consideracions-desplegament/), 
  per consultar aquestes consideracions.

Suport Cloud, amb el suport de lot d'aplicacions realitzarà un primer desplegament a l'entorn no productiu, preferentment a traves de la plataforma SIC.


#### Validació Aplicació a l'entorn no productiu

Actors:

- Lot d'aplicacions
- Gestor de Solucions del Departament/Organisme
- Cesicat
- ...

Un cop desplegada l'aplicació a l'entorn no productiu es realitzaran diverses validacions de l'aplicació:

- Comunicacions
- Integracions
- Funcionals
- Rendiment
- Seguretat
- ...

En aquestes validacions participaran els actors necessaris per a cada tipologia.


#### Aprovisionament de l'entorn d'execució productiu

Actors:

- Unitat d'Integració de solucions
- Gestor de Solucions del Departament/Organisme
- Suport Cloud
- CPD

Un cop es consideri la necessitat de disposar de l'entorn d'execució productiu, el Gestor de Solucions del Departament/Organisme sol·licitarà a la Unitat d'Integració de solucions l'aprovisionament de l'entorn productiu.

Seguidament, la Unitat d'Integració de solucions sol·licitarà la creació de l'entorn a l'equip de Suport Cloud.

Pels clouds públics, suport cloud realitzarà l'aprovisionament de l'entorn.
Pels clouds privats, suport cloud sol·licitarà al CPD que gestioni el cloud l'aprovisionament de l'entorn.


#### Primer Desplegament a l'entorn productiu

Actors:

- Lot d'aplicacions
- Suport Cloud
  
Suport Cloud, amb el suport de lot d'aplicacions realitzarà un primer desplegament a l'entorn productiu, a través de la plataforma SIC.
Les actuacions necessàries pel desplegament són les mateixes realitzades per l'entorn no productiu


#### Validació Aplicació a l'entorn productiu

Actors:

- Lot d'aplicacions
- Gestor de Solucions del Departament/Organisme
- Cesicat
- ...

Un cop desplegada l'aplicació a l'entorn no productiu es realitzaran diverses validacions de l'aplicació:

- Comunicacions
- Integracions
- Funcionals
- ...

En aquestes validacions participaran els actors necessaris per a cada tipologia.

### Alta CMDB

Actors:

- Lot d'aplicacions
- Gestor de Solucions del Departament/Organisme
- Suport Cloud
- CPD
- Unitat d'Integració de solucions

Una vegada l'aplicació ha estat validada, els diferents actors generaran la documentació necessària per donar d'alta l'aplicació a la CMDB

La documentació serà sol·licitada i enviada a la Bústia de Projectes d'Infraestructura.

### Posada en servei

- Bústia de Projectes d'Infraestructura
- Gestor de Solucions del Departament/Organisme
- Unitat d'Integració de solucions

Sota petició de Gestor de Solucions del Departament/Organisme a Bústia de Projectes d'Infraestructura a través de la Unitat d'Integració de solucions, l'aplicació es posa en servei. 

### Afegir aplicació al servei de monitoratge Cloud

- Suport Cloud

Un cop l'aplicació està en servei, l'equip de suport cloud afegeix l'aplicació al servei de monitoratge cloud.

#### Tancament de projecte

- Lot d'aplicacions
- Bústia de Projectes d'Infraestructura
- Gestor de Solucions del Departament/Organisme
- Unitat d'Integració de solucions

Un cop l'aplicació està en servei es realitza el tancament del projecte.

## Comunicació amb CS Cloud

La comunicació amb Susport Cloud es realitzarà seguint les directrius definides a [[Comunicació proveïdors d'aplicacions amb Suport Cloud.](https://canigo.ctti.gencat.cat/draft/cloud/comunicacio-suport-cloud/)