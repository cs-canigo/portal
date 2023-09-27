---
title: Catàleg de serveis cloud
description: ""
date: 2023-09-19T11:31:32.976Z
sections:
  - cloud
weight: "2"
toc: true
---


El catàleg de serveis cloud permet donar resposta tecnològica a les necessitats de negoci. Aquest catàleg cloud permetrà la construcció de solucions tecnològiques transversals així com de solucions departamentals. 

Com a primera aproximació a definir criteris de selecció de cloud podríem centrar-nos en requisits tècnics, de seguretat, d’escalabilitat, de costos, etc. de la solució a desenvolupar.​​

Hi ha tres tipus de cloud on es pot desplegar la solució: el cloud privat, el cloud públic o el cloud híbrid.
​​
## ​Cloud privat

​El cloud privat proporciona una sèrie d’avantatges respecte als altres, permet una integració més senzilla amb la resta de solucions de l'Àmbit mantenint els costos de forma moderada, etc. Per contra, té una sèrie de limitacions com són l’alt risc l’obsolescència, baixa escalabilitat i flexibilitat davant pics de demanda, etc.  

Actualment, es disposa de 3 tipus de plataforma on poder desplegar solucions de cloud privat: CaaS, xPaaS i DBaaS, les quals es detallen a continuació:

### ​CaaS (Contenidors com a Servei)
El CTTI disposa de 5 opcions (es poden veure de manera esquemàtica a la taula del final d'aquesta plana) per poder desplegar solucions basades en contenidors. En totes elles el proveïdor ofereix un marc o plataforma d'orquestració on es desplegaran i gestionaran els contenidors. Hi ha dues tecnologies d'orquestració:

* ​Openshift
* Kubernetes

Qualsevol de les opcions tecnològiques d'orquestració (cadascuna amb les seves particularitats) permet als proveïdors d'aplicacions carregar, organitzar, executar, escalar, gestionar i aturar els contenidors mitjançant la virtualització basada en contenidors. Les particularitats de les diferents opcions tecnològiques d'orquestració és transparent pels proveïdors d'aplicacions.

Als casos on hi hagi un desplegament de bases de dades sobre contenidors les anomenem DBaaS, atès a què s'ofereixen amb una capa de gestió addicional per simplificar-ne l'operació i administració.

### xPaaS

​​​Anomenarem així als entorns d'execució, que:

* ​​Són un nivell extra per sobre de la contenerització
* ​Contenen un motor d'execució (ja sigui un servidor d'aplicacions o un intèrpret on posarem la nostra aplicació o funcionalitat).
* Configurarem amb la potència CPU/RAM i el nombre d'instàncies que s'executaran en paral·lel per a aconseguir més concurrència.

### DBaa​​S (bases de dades com a servei)

Les bases de dades com a servei són un cas concret de CaaS on la base de dades és gairebé una “commodity” i gairebé no hi ha administració. L'administració que pot arribar a fer el proveïdor d'infraestructura es redueix a gestionar la disponibilitat i l'obsolescència, així com configurar l'alta disponibilitat i el sistema de còpies de seguretat i recuperació. En cas que la base de dades no sigui administrada pel proveïdor d'infraestructura aquestes tasques recauen en el proveïdor d'aplicacions.


## ​Cloud públic​

El cloud públic permet una escalabilitat i flexibilitat molt bona respecte a pics de demanda, un risc baix d’obsolescència, etc. En canvi, els costos són més elevats i la integració amb la resta de solucions de l’empresa són més complexes.  

Actualment, el CTTI disposa de diferents opcions per a desplegar sistemes d’informació sobre núvol públic; AWS, Azure, Google Cloud Platform i IBM Cloud.

En el núvol públic hi podem desplegar diferents tipologies principals de serveis, amb major o menor grau d'abastracció i per tant, d'administració per part nostra (sempre escollirem els graus més alts d'abastracció, tendint al paradigma *serverless*):

* xPaaS: és un nivell superior d’abstracció que els contenidors. Són els motors d’execució autogestionats sobre els que es poden configurar determinades opcions (normalment referents a la potència mínima i límits d’escalabilitat).

* FaaS: funcions com a servei. Seria la mínima expressió d'un microservei, petites funcions que reaccionen a events i poden servir per a exposar funcionalitat o coordinar-se amb altres serveis del núvol.

* DBaaS: anàlogament al cas de contenidors, es tracta del cas particular de l’xPaaS en què el programari ofert com a servei és una base de dades.

* IaaS: màquina virtual, consistent en un servei de computació (CPU + memòria) i un servei d’emmagatzematge, amb un sistema operatiu (suportat per la plataforma de núvol públic) inclòs desplegada sobre núvol públic. No es considera IaaS una màquina virtual sobre la qual es desplegui una imatge de sistema operatiu no suportada per la plataforma de núvol públic. Indicar que, tal com s’indica a la taula resum, aquest servei només es troba disponible actualment de la plataforma de núvol públic Azure​.​​


## Cloud híbrid

El cloud híbrid el podríem considerar com una solució intermitja, on es combinen elements de catàleg de cloud privat i cloud públic al mateix temps. 

En el cas de projectes híbrids, la comunicació entre CPDs On-prem i el Cloud Públic ha de fer-se sempre a través de la NET0.

## Resum de tecnologies

<style>
    table{width: 100%}
</style>

### Públic (Internet)​​

| **​Servei** | **​AWS​** | **IBM Cloud​**                           | **​Azure**                                                               |
|-------------|-----------|------------------------------------------|--------------------------------------------------------------------------|
| **​SaaS**   | ​         | ​IBM apiconnect                          | PowerApps <br>Microsoft Dynamics 365<br> CDN<br>Data Factory​                          |
| **​CaaS**   | ​         | ​Kubernetes                              | ​                                                                        |
| **​XPaaS**  |           | Java<br> Node.js<br> Go<br> .NET Core<br> PHP<br> Python<br> Swift<br> Ruby | .NET framework<br> .NET Core<br> Java<br> Node.js<br> PHP<br> Python<br> Ruby<br> Contenidors (dockers)​​​​ |
| **​DBaaS**  | ​         | PostgreSQL<br> Redis<br> MongoDB<br> Elastic Search​    | ​PostgreSQL<br> MySQL<br> Microsoft SQL Server                                     |
| **​IaaS**   |           | ​​​                                      | ​Virtual Machine                                                         |

### Privat (Intranet)​

| **Servei** | **​CPD1**   | **​CPD2**             | **CPD3**              | **CPD4**              |
|------------|-------------|-----------------------|-----------------------|-----------------------|
| **​SaaS**  | ​           | ​                     | ​                     | ​                     |
| **​CaaS**  | ​Kubernetes | ​​​Openshift          | ​Openshift            | Openshift​            |
| **​XPaaS** | ​           | ​Istio (service mesh) | ​Istio (service mesh) | ​Istio (service mesh) |
| **​DBaaS** | ​           | ​                     | ​                     | ​​PostgreSQLMySQL     |
| **​IaaS**  | ​           | ​                     | ​                     | ​​                    |

