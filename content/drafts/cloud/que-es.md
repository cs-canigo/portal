---
title: Què és cloud computing
description: Descripció de què considerem cloud computing a CTTI.
date: 2023-09-19T11:31:32.976Z
sections:
  - cloud
weight: "1"
---

## Què és Cloud Computing 
 
Entenem per Cloud Computing el *pool* de recursos ofert per un tercer, al que podem accedir a través d'Internet i que ens permet executar diferents tasques (computació, emmagatzematge o serveis empaquetats) amb modalitats més o menys administrades pel propi proveïdor de cloud. 
 
Les característiques principals del Cloud Computing són: 

* Sota demanda 
* Pagament per ús 
* Escalabilitat 
* Flexibilitat 
* Multilocalització 

## Normes bàsiques sobre Cloud Computing a CTTI

Els hiperescalars admesos per CTTI són: 

* Microsoft Azure
* AWS
* Google Cloud Platform 
* IBM Cloud

Per als anteriors, cal tenir en compte les següents normes bàsiques: 

* Tots els serveis han d'ubicar-se dintre dels tenants / organitzacions de cloud públic de la Generalitat. 
* Tots els serveis han d'estar allotjats dins de la Unió Europea. 
* En el cas de projectes híbrids, la comunicació entre CPDs On-prem i el Cloud Públic ha de fer-se sempre a través de la NET0. 
* S’hauran d’utilitzar mecanismes d’autenticació i autorització robustos: 

    * per l'accés d’usuaris als comptes o subscripcions cloud, preferiblement amb un segon factor d’autenticació. 
    * Els sistemes d’informació desplegats hauran d’utilitzar els mateixos mecanismes d’autenticació (GICAR) que els desplegats en mode tradicional. 
 
## Què es consideren aplicacions Cloud Native? 

Cloud Native és un patró d’arquitectura de software per desenvolupar aplicacions utilitzant principis esencials de cloud computing com escalabilitat, elasticitat i agilitat. 

Els 4 pilars de Cloud Native són els següents: 

* Continuous Delivery (lliurament continu): aquesta és una de les principals motivacions del Cloud Native, poder fer lliurament de software més ràpid. Per això tot el procés de lliurament ha d’estar automatitzat assegurant aspectes com la qualitat i la seguretat.  

* Microserveis: patró d’arquitectura per a desenvolupar aplicacions en serveis petits i independents mitjançant el qual s’afavoreix l’agilitat i s’eviten els problemes de lentitud i riscos associats a arquitectures monolítiques. El fet ser independents també permet que puguin escalar de forma separada. 

* Contenidors/Funcions: modalitat d’empaquetar software que afavoreix la portabilitat entre Clouds, i una execució més lleugera en quan a consum de recursos i predictible que no pas desplegant-se en servidors d’aplicacions sobre màquines virtuals. 

* Observabilitat: en aplicacions Cloud Native és molt important poder tenir traçabilitat de les accions que s’executen degut a l’alta segmentació dels seus components (microserveis). La integració de les traces (logs) d’una aplicació en una plataforma de monitorització nativa del Cloud o externa és imprescindible.  

Per a que una aplicació es consideri Cloud Native ha de seguir aquests pilars. 

 
## Què és Software com a Servei (SaaS) 
 

Software com a Servei es refereix a l’ús de software (funcionalitat) administrat i operat per un tercer i que es consumeix directament a través d’internet, sense necessitat d’instal·lar res.  

Algunes de les característiques principals del SaaS són: 

* Pagament per ús: llicenciament basat en una o diverses mètriques (número d’usuaris, aplicacions, emmagatzematge, ...) 

* Single Sign On: integració amb GICAR en el cas de CTTI 

En quant a les característiques del servei: 

* Model multitenant: una sola instal·lació dona servei a diferents clients/usuaris 

* Alta disponibilitat: el proveïdor s’encarrega d’acomplir el SLA establert i exposa els mecanismes que permeten monitoritzar l’estat de salut dels diferents components. 

* Elasticitat: el proveïdor s’encarrega de monitoritzar i preveure usos per a fer créixer o decréixer els recursos del producte. 

* Seguretat: tant pel que fa a la seguretat de les dades com de l’aplicació exposada a internet, ha de complir amb ISO 27001, CSA-Star Level 2 o Esquema Nacional de Seguretat. 

* Auditoria: el producte permet accedir a logs d’auditoria ja sigui per a complir amb normativa legal o analitzar l’ús de la solució (seguretat, ...). 



## LowCode 

El paradigma LowCode (LCDP – LowCode Development Platform / LCAP – LowCode Application Platform) pretén reduir el temps d’entrega de valor, automatitzant el cicle de desenvolupament i desplegament d’aplicacions des de la idea fins a que aquesta és funcional i productiva. 

Són plataformes que permeten la construcció basada en interfícies gràfiques (drag and drop de components) i de fluxos per a controlar els processos i tot i que en la majoria de casos no cal afegir codi propi, per a casos excepcionals o components o integracions no existents, es poden extendre amb codi propi (.Net, Java, ...). 

Aquestes plataformes sempre es contractaran en modalitat PaaS/SaaS pel que la infraestructura es gestionada pel propi fabricant, no des de CTTI. 