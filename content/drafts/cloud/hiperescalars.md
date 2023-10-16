---
title: Hiperescalars disponibles
description: "- Cloud Públic: AWS, Azure, Google Cloud Platform, IBM Cloud<br ><br > - Cloud privat: Openshift"
date: 2023-09-19T11:31:32.976Z
sections:
  - cloud
weight: "2"
toc: false
---

Els hiperescalars i el seu catàleg de serveis permet donar resposta tecnològica a les necessitats de negoci. Aquest catàleg cloud permetrà la construcció de solucions tecnològiques transversals així com de solucions departamentals. 

Com a primera aproximació a definir criteris de selecció de cloud podríem centrar-nos en requisits tècnics, de seguretat, d'escalabilitat, de costos, etc. de la solució a desenvolupar.​​

Hi ha tres tipus de cloud on es pot desplegar la solució: el cloud privat, el cloud públic o el cloud híbrid (on part de la càrrega de treball pot estar a cloud públic i una altra part a cloud privat).
​​
## ​Cloud privat

​El cloud privat permet una integració més senzilla amb la resta de solucions d'un àmbit concret (sobretot a nivell de comunicacions i xarxa) mantenint els costos de continguts. Per contra, té una sèrie de limitacions com per exemple el risc d'obsolescència, així com menor escalabilitat i flexibilitat davant pics de càrrega.  

El cloud privat es basa principalment en Redhat Openshift, on es poden desplegar contenidors amb els components de l'aplicació, així com BD en mode gestionat pel proveïdor de CPD.


## ​Cloud públic​

El cloud públic permet escalabilitat, flexibilitat i alta disponibilitat *out of the box* i un risc menor d'''obsolescència, ja que ens obliga a mantenir-nos actualitzats per a gaudir de tots els avantatges que proporciona. Un aspecte que pot ser més complex és la integració amb la resta de solucions de l'empresa si aquestes no es fan via interfícies tipus API i/o els sistemes no estan exposats a internet.  

Actualment, el CTTI disposa de diferents opcions per a desplegar sistemes d'informació sobre núvol públic: **AWS**, **Azure**, **Google Cloud Platform** i **IBM Cloud**.

En el núvol públic hi podem desplegar diferents tipologies de serveis, amb major o menor grau d'abstracció i per tant, d'administració per part nostra. Sempre escollirem els graus més alts d'abstracció, tendint al paradigma *serverless*, on el proveïdor de cloud s'encarrega de la complexitat inherent de l'operació de la infraestructura i ens exposa el servei, on nosaltres posarem codi, contenidors o els registres necessaris a la nostra base de dades, i ells ho faran córrer:

* **PaaS**: són entorns d'execució de codi on l'hiperescalar s'encarrega de fer córrer l'aplicació i sobre els que es poden configurar determinades opcions (normalment referents a la potència mínima i límits d'escalabilitat).

* **CaaS**: contenidors com a servei. Entorns on lliurem un contenidor i l'hiperescalar s'encarrega de fer-ho correr. Poden ser *serverless* o córrer sobre orquestradors de contenidors, tot i que en el nostre cas optarem per la primera opció preferentment.

* **FaaS**: funcions com a servei. Seria la mínima expressió d'un microservei, petites peces de codi que reaccionen a events i poden servir per a exposar funcionalitat o coordinar-se amb altres serveis del núvol.

* **DBaaS**: anàlogament al cas de contenidors, es tracta del cas particular de l'xPaaS en què el programari ofert com a servei és una base de dades, on s'incorporen els mecanismes d'escalat, alta disponibilitat, backup, ...

* **IaaS**: màquina virtual, consistent en un servei de computació (CPU + memòria) i un servei d'emmagatzematge, amb un sistema operatiu (suportat per la plataforma de núvol públic) inclòs desplegada sobre núvol públic. No es considera IaaS una màquina virtual sobre la qual es desplegui una imatge de sistema operatiu no suportada per la plataforma de núvol públic. Les màquines virtuals no serien l'opció desitjada de desplegament de sistemes d'informació de la Generalitat a núvol públic, ja que requereix de cert nivell d'administració. S'optarà per aquest mode de computació en cas de fer moviments tipus lift & shift i modernitzar les aplicacions un cop estiguin a cloud públic.

<!-- 
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

-->