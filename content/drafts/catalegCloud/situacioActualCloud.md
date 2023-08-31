+++
date        = "2023-03-29"
title       = "Situació Actual Cloud"
description = "Situació Actual Cloud"
sections    = "Cataleg Cloud"
weight	    = 3
estandards =  ["cataleg cloud"]
+++

# Situació actual
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.2/css/responsive.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/catalegCloud/tableStyle.css">
<link rel="stylesheet" type="text/css" href="https://canigo.ctti.gencat.cat/drafts/catalegCloud/tableStyles.css">
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>
<!--<script type="text/javascript" language="javascript" src="catalegCloud.js"></script>-->

# **Taula de Continguts** {#TaulaContiguts}

1. [Introducció](#Introduccio)
2. [Situació actual](#SituacioActual)
    1. [Cloud Privat](#CloudPrivat)
        1. [CaaS](#CaaS)
           1. [Registre dockers privat](#RegistreDockerPrivat)
           2. [Creació de contenidors](#CreacioContenidors)
           3. [Imatges de contenidors base](#ImatgesContenidorsBase)
        2. [DBaaS](#DBaaS)
        3. [SIC: Desplegament d'aplicacions CaaS](#SIC)
        4. [Monitorització, logs i traces](#MonitoritzacioLogsTraces)
           1. [Openshift amb Istio](#OpenshiftAmbIstio)
        5. [Ticketing/Incidental](#TicketingIncidental)
    2. [Cloud Públic](#CloudPublic)
        1. [Catàleg de serveis](#CatalegServeis)
            1. [xPaaS](#CatalegServeisxPaaS)
            2. [DBaaS](#CatalegServeisDBaaS)
            3. [IaaS](#CatalegServeisIaaS)
            4. [Storage](#CatalegServeisStorage)
    3. [Cloud Híbrid](#CloudHibrid)
3. [Annexes](#Annexes)
    1. [SaaS sobre contenidors](#SaaSsobreContenidors)
        1. [Service Mesh](#ServiceMesh)
        2. [API Manager](#APIManager)

---

## **1. Introducció** {#Introduccio}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

La demanda d’arquitectures basades en solucions de núvol públic i/o contenidors ha augmentat de forma considerable en els darrers temps.

Aquest document pretén ser una guia que doni a conèixer, a aquelles persones que volen implementar sistemes cloud, quin ventall d’opcions, tant de productes com de nivells de servei, hi ha disponibles.

Així mateix, el document recull totes aquelles consideracions a tenir en compte perquè el procés de sol·licitud, validació i desplegament d’aquests tipus de solucions sigui el més àgil possible.

Ateses les grans diferències que es poden trobar en la manera de sol·licitar i la diversitat de temes a considerar, en endavant, es presenten dos grans grups de solucions:
- Les arquitectures basades en contenidors i que es poden desplegar tant en plataformes de núvol privat i públic.
- Les arquitectures basades en l’ús d’elements de núvol públic.

Així mateix, com a conclusió també es reservarà un espai per tractar les solucions basades en arquitectures híbrides.

## **2. Situació actual** {#SituacioActual}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

A la figura es mostren a molt alt nivell les solucions, les tecnologies disponibles i on es poden desplegar:

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%;">
    <tr>
        <th class="cttiNoBorder" width="9%" style="border-style: none;">Servei</th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD1</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD2</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD3</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD4</strong></th>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 20px;"><strong>SaaS</strong></th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 20px;"><strong>CaaS</strong></th>
        <td align="center"><img src="../img/kubernetes.png" width="30" alt="Kubernetes"></td>
        <td align="center"><img src="../img/kubernetes.png" width="30" alt="Kubernetes"> <img src="../img/openshift.png" width="30" alt="Openshift"></td>
        <td align="center"><img src="../img/openshift.png" width="30" alt="Openshift"></td>
        <td align="center"><img src="../img/openshift.png" width="30" alt="Openshift"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 20px;"><strong>xPaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="../img/istio.png" width="30" alt="Istio"></td>
        <td align="center"><img src="../img/istio.png" width="30" alt="Istio"></td>
        <td align="center"><img src="../img/istio.png" width="30" alt="Istio"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 20px;"><strong>DBaaS</strong></th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="../img/postgresql.png" width="30" alt="PostgreSQL"> <img src="../img/mysql.png" width="30" alt="MySQL"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 20px;"><strong>IaaS</strong></th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
</table>

### **2.1. Cloud Privat** {#CloudPrivat}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>
El cloud privat proporciona una sèrie d’avantatges respecte els altres, permet una integració més senzilla amb la resta de solucions de l'Àmbit mantenint els costos de forma moderada, etc. Per contra té una sèrie de limitacions com són l’alt risc l’obsolescència, baixa escalabilitat i flexibilitat davant pics de demanda, etc.  

Actualment es disposa de 3 tipus de plataforma on poder desplegar solucions de cloud privat : CaaS, xPaaS i DBaaS, les quals es detallen a continuació:

#### **2.1.1. CaaS** {#CaaS}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

El CTTI disposa de 5 opcions per poder desplegar solucions basades en contenidors. En totes elles el proveïdor ofereix el marc (o plataforma d’orquestració) on es desplegaran i gestionaran els contenidors. Hi ha dues tecnologies d’orquestració:

* Openshift
* Kubernetes

Qualsevol de les opcions tecnològiques d'orquestració (cadascuna amb les seves particularitats) permet als proveïdors d'aplicacions carregar, organitzar, executar, escalar, gestionar i aturar els contenidors mitjançant la virtualització basada en contenidors. Les particularitats de les diferents opcions tecnològiques d'orquestració es transparent pels proveïdors d'aplicacions.

Als casos on hi hagi un desplegament de bases de dades sobre contenidors les anomenem DBaaS, atès a què s'ofereixen amb una capa de gestió addicional per simplificar-ne l'operació i administració.

El tarifari de les solucions de contenidors es basa en: 

* La memòria total requerida pel sistema d’informació que ha d’hostatjar (assignació a nivell de namespace). Es a dir que cal considerar la memòria agregada de tots els contenidors a utilitzar. Igualment caldrà que, en el moment de desplegament, tinguin uns límits de CPU i RAM definits.
* L’adició de serveis d’administració per part de CPD en cas que sigui necessari.
* L’emmagatzematge persistent a afegir al sistema d’informació.

A continuació es mostra un gràfic per tal de mostrar una explicació visual de com es dimensionaria/distribuiria un sistema d'informació on hi hagués un sistema d'informació amb una série d'aplicacions i una base de dades on hi hagués dos agrupacions de contenidors dividits en dos namespaces (un per a aplicacions i un altre per a bases de dades) on la primera agrupació es dividis en dos grups de contenidors, el primer amb dos contenidors de 256 MBs i el segon amb tres contenidors de 256 MBs) i la segona agrupació de contenidors tingués un únic grup de contenidors amb dos contenidors de 512 MBs. A aquests contenidors se li afegiria un volum persistent de 200 MBs. La petició de catàleg final hauria d'incloure 2,256 GB de servei CaaS, 1 administració bàsica de BBDD i 200 GB d'emmagatzematge. Visualment quedaria resumit així:

<br>
<div align="left">
    <img src="../img/tarifa.png" style="width:60%;" />
</div>
<br>

* Segons l’opció triada per desplegar el sistema d’informació, la CPU assignada varia tal i com s’observa en la taula següent:

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="16%" style="font-size: 16px;">TALLA</th>
        <th class="cttiNoBorder" width="21%" colspan="2" style="font-size: 16px;"><div align="center"><strong>S</strong></th>
        <th class="cttiNoBorder" width="21%" colspan="2" style="font-size: 16px;"><div align="center"><strong>M</strong></th>
        <th class="cttiNoBorder" width="21%" colspan="2" style="font-size: 16px;"><div align="center"><strong>L</strong></th>
        <th class="cttiNoBorder" width="21%" colspan="2" style="font-size: 16px;"><div align="center"><strong>XL</strong></th>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">Plataforma / Recurs</th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>Memòria (MB)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>CPU (Milicores)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>Memòria (MB)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>CPU (Milicores)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>Memòria (MB)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>CPU (Milicores)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>Memòria (MB)</strong></th>
        <th class="cttiNoBorder" style="font-size: 16px;"><div align="center"><strong>CPU (Milicores)</strong></th>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">CPD1</th>
        <td style="font-size: 16px;"><div align="center"><strong>512</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>500</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>1024</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>1000</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>2048</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>2000</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>-</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>-</strong></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">CPD2</th>
        <td style="font-size: 16px;"><div align="center"><strong>256</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>62</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>512</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>125</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>1024</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>250</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>2048</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>500</strong></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">CPD3</th>
        <td style="font-size: 16px;"><div align="center"><strong>256</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>256</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>512</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>500</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>1024</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>1000</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>2048</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>2000</strong></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">CPD4</th>
        <td style="font-size: 16px;"><div align="center"><strong>254</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>54</strong><sup>(1)</sup></td>
        <td style="font-size: 16px;"><div align="center"><strong>512</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>108</strong><sup>(1)</sup></td>
        <td style="font-size: 16px;"><div align="center"><strong>1024</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>216</strong><sup>(1)</sup></td>
        <td style="font-size: 16px;"><div align="center"><strong>2048</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>432</strong><sup>(1)</sup></td>
    </tr>
</table>

<span style="font-size: 10px;font-style: italic;">(1): En procés d’ampliar la proporció a 1 GB:1000 milicores</span>


* Es poden sol·licitar serveis d’administració per elements de programari desplegats a la plataforma<sup>(*)</sup>.
* L’emmagatzematge persistent se sol·licita amb les mateixes consideracions que el de la resta d’elements de catàleg de CPD.

<span style="font-size: 10px;font-style: italic;">(*): Cal que, paral·lelament als serveis de CPD, el producte estigui certificat per CS Cloud per disposar dels automatismes de l’entorn d’integració contínua.</span>

**CaaS: tecnologies homologades**

Essencialment, qualsevol tecnologia que suporti l’ús de contenidors pot desplegar-se sobre les plataformes d’orquestració.

* El CTTI disposa d’un catàleg d’imatges docker homologades ([https://canigo.ctti.gencat.cat/cloud-caas/cataleg-contenidors/](https://canigo.ctti.gencat.cat/cloud-caas/cataleg-contenidors/)) on s’hi poden trobar els elements amb més demanda per la capa d’aplicació. 
* DBaaS: la informació dels elements disponibles es pot consultar a ([https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/](https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/)) en la secció de núvol privat.
* Per tecnologies o productes no catalogats, es poden aportar imatges de fora de catàleg tenint en compte les consideracions indicades pel CTTI ([https://canigo.ctti.gencat.cat/cloud-caas/dockerImages/](https://canigo.ctti.gencat.cat/cloud-caas/dockerImages/)).

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="30%" style="font-size: 16px;"><div align="center"><strong>Grup de Tecnologia</strong></th>
        <th class="cttiNoBorder" width="40%" style="font-size: 16px;"><div align="center"><strong>Producte</strong></th>
        <th class="cttiNoBorder" width="40%" style="font-size: 16px;"><div align="center"><strong>Plataformes disponibles</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Servidors web</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/apache.png" width="48" alt="Apache"> <img src="../img/nginx.png" width="48" alt="NGinx"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kubernetes.png" width="48" alt="Kubernetes"> <img src="../img/openshift.png" width="48" alt="Openshift"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Servidors d'aplicacions</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/java.png" width="48" alt="Java"> <img src="../img/nodejs.png" width="48" alt="NodeJS"> <img src="../img/php.png" width="48" alt="PHP"> <img src="../img/tomcat.png" width="48" alt="Tomcat"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kubernetes.png" width="48" alt="Kubernetes"> <img src="../img/openshift.png" width="48" alt="Openshift"></td>
    </tr>
</table>

**CaaS: Consideracions tècniques generals**

A l’hora d’utilitzar aquesta tecnologia cal tenir en compte les següents premisses:

* Els contenidors són de naturalesa volàtil, si es requereix persistència caldrà:
    * Afegir un volum persistent doncs aquest no es destruirà amb el contenidor.
    * Fer servir el suport d’alguna base de dades.
* Han de tenir un funcionament autònom, no està suportat cap manteniment manual i no està permès l’accés via SSH un cop desplegats.
* L’escalat horitzontal té preferència davant el vertical.
* Per evitar talls de servei es recomana fer servir HEALTCHECKS/LivenessProbe/ReadinessProbe.
* Només es poden desplegar contenidors mitjançant el SIC. Això implica:
    * Custodia del codi font
    * Un projecte/repositori per cada component desplegat com contenidor i per cada llibreria
    * La construcció dels artefactes es farà al SIC i seran els mateixos a tots els entorns. Això inclou la construcció d’imatges docker i proporcionar a l’equip de SIC/Suport cloud les instruccions necessàries (incloent eines i versions).

Pel que fa al desplegament pròpiament dit:

* A les plataformes basades en Kubernetes cal la creació de descriptors en format yaml. La creació d’aquest és responsabilitat de l’equip de desenvolupament i es repositaran a un projecte anomenat Orchestrators dins el directori del Codi de Diàleg del projecte.
* Cada entorn i component d’aplicació estarà separat en carpetes, amb els descriptors necessaris i el Secrets inclosos sense les dades sensibles.
* A la plataforma SwarmMe no requereix descriptors específics, però si disposar de la següent informació: Namespace, Imatge docker, xarxa, mida del contenidor, domini, port, rèpliques i paràmetres d’entorn.

La integració amb GICAR es realitza a la plataforma de contenidors via SAML tot fent servir les imatges disponibles certificades.

Tipus de desplegaments suportats amb Integració Contínua:

* Deployments
* StatefulSets
* DaemonSets

A tenir en compte:

* Una sola imatge per pod, amb el número de rèpliques que es considerin necessàries.
* Un sol projecte (codi construït) per imatge.
* Totes les imatges a desplegar parteixen d’un dockerfile. No es despleguen imatges preconstruïdes.
* Exposició de protocols HTTP/HTTPS. Les plataformes privades no suporten altres protocols, com per exemple SSH, JDBC, sFTP… doncs implica IP de publicació propia així com configuració d’un node-port.

**CaaS: Procediments**

* Alta elemen​​t catàleg

    ​Per a donar d'alta un element al catàleg de tipus CaaS privat, hi ha 3 actors : l'equip d'arquitectura del Centre Suport Cloud, l'equip d'operacions del Centre Suport Cloud i l'equip del Centre de Suport SIC.. El procediment consistiria en les següents tasques, sent l'iniciador l'equip d'Arquitectura del Centre de Suport Cloud:

    1. L'equip d'arquitectura del Centre de Suport Cloud crea la imatge segons el versionatge del full de ruta
    2. L'equip d'arquitectura del Centre de Suport Cloud realitza la documentació de la fitxa corresponent al element del catàleg
    3. L'equip d'arquitectura del Centre de Suport Cloud afegeix el nou element al registre de contenidors
    4. L'equip d'operacions del Centre de Suport Cloud valida els requeriments d'operació del nou element de catàleg
    5. L'equip d'operacions del Centre de Suport Cloud completa la fitxa corresponent al nou element de catàleg
    6. L'equip d'operacions del Centre de Suport Cloud afegeix l'element al catàleg de contenidors
    7. L'equip del Centre de Suport SIC valida el desplegament del nou element

    Visualment, el procediment seria aquest:
    
    <br>
    <div align="left">
        <img src="../img/altacaasprivat.png" style="width:60%;" />
    </div>
    <br>

* Manteniment elemen​​t catàleg
    
    Per a actualitzar​ un element al catàleg de tipus CaaS privat, hi ha 2 actors :  l'equip d'operacions del Centre Suport Cloud i l'equip del Centre de Suport SIC. El procediment consistiria en les següents tasques, , sent l'iniciador l'equip de Serveis del Centre de Suport Cloud:

    1. L'equip d'operacions del Centre de Suport Cloud realitza l'actualització de la imatge.
    2. L'equip d'operacions del Centre de Suport Cloud afegeix l'element actualitzat al catàleg de contenidors.
    3. L'equip del Centre de Suport SIC actualitza la imatge dins del SIC i valida la construcció del nou element (builders).

    Visualment, el procediment seria aquest:
    
    <br>
    <div align="left">
        <img src="../img/mantcaasprivat.png" style="width:60%;" />
    </div>
    <br>

<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

#### **2.1.1.1. Registre dockers privat** {#RegistreDockerPrivat}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**Introducció**

Docker per defecte està configurat per utilitzar el registre públic ([Docker Hub](https://hub.docker.com/)) com a repositori d’imatges.

Per persistir i gestionar les imatges docker privades és important disposar un registre docker privat:

Cal garantir que les imatges docker quedin persistides en algun repositori.

Cal garantir que les imatges docker dels diferents projectes no siguin públiques.

*Important: Les imatges base presents al dockerHub de gencatcloud deixaran de ser mantingudes i pròximament esborrades. D’ara endavant, cal utilitzar les imatges base del registre privat.​*

**Descripció del registre privat**

El registre privat escollit a la Generalitat de Catalunya és ([Harbor](https://vmware.github.io/harbor/)).

Destaquen les següents característiques:

* **Gestió d’usuaris RBAC:** Els repositoris docker estan organitzats en Projectes. Permet assignar permisos i rols als diferents usuaris a cada projecte.
* **Portal web:** Permet navegar per les imatges dels diferents projectes, veure vulnerabilitats, etc.
* **API REST:** La majoria d’operacions efectuades des del portal web, es poden fer via API.
* **Auditoria:** Totes les acciones que es facin sobre el registre queden registrades per poder ser analitzades en auditories.
* **Anàlisi de vulnerabilitats:** Totes les imatges repositades al Registre són analitzades amb l’eina ([Clair](https://github.com/coreos/clair)) per identificar les diferents vulnerabilitats.
* **Signatura d’Imatges:** Les imatges repositades al registre poden ser signades digitalment de cara a garantir la seva procedència i integritat. Actualment encara no implementat.​

**Ús del registre privat**

* **Accés​**

    El registre docker privat de la Generalitat de Catalunya, està disponible a l’URL https://registreimatges.sic.intranet.gencat.cat

    És un registre privat sense cap repositori públic.

* **Permisos**
    
    L’equip de suport cloud subministrarà al proveïdor d’aplicacions un usuari amb els següents permisos:

    * Permís de lectura del projecte associat a l’aplicació del projecte.
    * Permís de lectura del projecte gencatcloud amb les imatges base mantingudes per l’equip de Suport Cloud.

* **Consola web**

    Es pot accedir a la consola web introduint a un navegador la url d’accés.
    
    * Des de la consola web es pot navegar pels projectes.
    * Es pot accedir als repositoris d’un projecte fent clic al projecte.
    * Es pot accedir a les diferents versions de les imatges d’un repositori fent clic al repositori.
    * Per cada imatge, es poden observar les vulnerabilitats fent clic al tag de la imatge.
    * Per cada vulnerabilitat es pot observar la descripció de la mateixa fent clic a la vulnerabilitat.

* **Docker**

  * Descarrega d’una imatge
    
    Per accedir a les imatges del registre des de docker, cal seguir els següents passos:
    
    * Connectar-se al registre: docker login https://registreimatges.sic.intranet.gencat.cat
    * Introduir les credencials proporcionades per l’equip de SuportCloud.
    * Fer un pull de la imatge desitjada docker pull registreimatges.sic.intranet.gencat.cat/gencatcloud/java:8
    * Desconnectar-se del registre: docker logout https://registreimatges.sic.intranet.gencat.cat
    * Construir una imatge depenent d’una imatge repositada al registre privat​

Per exemple si tenim un dockerfile del tipus:​

```
FROM registreimatges.sic.intranet.gencat.cat/gencatcloud/java:8

MAINTAINER xxxx

ENV APP_DIR=/app

COPY xxxx.jar ${APP_DIR}
COPY run.sh /
```

*Important notar que el FROM ha d’incloure el registre privat*

* Cal primer connectar-se al registre: docker login https://registreimatges.sic.intranet.gencat.cat
* Construir la imatge docker build -t XXXX .
* Desconnectar-se del registre: docker logout https://registreimatges.sic.intranet.gencat.cat​

**Integració amb SIC**

Totes les aplicacions basades en contenidors desplegades via SIC, estan integrades amb el Registre Docker privat. Cada imatge que es desplegui a les diferents plataformes docker (Openshift, Kubernetes o SwarmMe), quedarà repositada al registre privat.​​​​​​

#### **2.1.1.2. Creació de contenidors** {#CreacioContenidors}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**Introducció**

A l’hora de crear les imatges dels diferents contenidors docker per les aplicacions gencat cal establir un conjunt de criteris que garanteixin la seva estabilitat i seguretat.

**Imatges homologades pel CTTI**

L’equip de Suport Cloud del CTTI manté un conjunt d’imatges docker de les tecnologies més utilitzades a la Generalitat de Catalunya. Aquestes imatges són compatibles amb totes les plataformes basades en contenidors disponibles a la Generalitat (Openshift i Kubernetes).

Aquestes imatges docker es poden trobar al registre docker privat, al projecte gencatcloud.

Podeu trobar més informació respecte al registre privat a ([Registre docker privat​](https://espai.ctti.gencat.cat/Governanca-TIC/Sistemes-informacio/Infraestructura/Cataleg-CPD-cloud/Contenidors/Registre-docker-privat/Pagines/default.aspx)).​

**Criteris per escollir la imatge base**

* Les imatges de docker es crearan sempre a partir del fitxer Dockerfile, en cap cas es crearan imatges a partir de contenidors.
* En cas que existeixin imatges homologades pel CTTI de la tecnologia requerida, el Dockerfile particular de cada aplicació haurà de tenir com a base la imatge homologada, utilitzant la directiva FROM.
* En cas que no existeixin imatges homologades pel CTTI de la tecnologia requerida, a l’hora d’escollir les imatges de base es faran servir els següents criteris:
  * Sempre es crearan les imatges utilitzant Dockerfile, en cap cas s’utilitzaran imatges preconstruides.
  * S’utilitzarà preferentment el Dockerfile d’Imatges oficials dels fabricants, normalment disponibles al ([docker hub](https://hub.docker.com/)).
  * En cas que existeixi una imatge oficial basada en ([Alpine](https://hub.docker.com/_/alpine/)), s’escollirà aquesta.
  * En cas que no existeixi una imatge oficial basada en Alpine, s’escollirà la imatge basada en Centos, substituint Centos per la versió d’Oracle Linux Slim corresponent. Aquesta substitució és necessària pel support de pegats de seguretat que ofereix Oracle Linux i no ofereix Centos.
  * En cas que no existeixi una imatge oficial basada en Alpine ni Centos, s’escollirà la que recomani el fabricant. Sol ser la que al tag només s’indica la versió.
* Mai s’escollirà el tag latest. És una versió que va canviant en el temps i genera inestabilitat a les aplicacions. Escollir sempre la versió més tancada possible.​

**Criteris generals per la creació de les imatges**

Alguns d’aquests criteris no apliquen en cas d’utilitzar les imatges homologades pel CTTI.

* Deixar instal·lat el nombre mínim de paquets al docker, si és necessari instal·lar paquets per realitzar compilacions, desinstal·lar-los un cop realitzada aquesta.
* Actualitzar els packets del sistema operatiu a l’última versió disponible amb tots els pegats de seguretat aplicats.
* No deixar el codi font al docker, un cop compilat, eliminar-lo.
* Incloure a la imatge el script **wait-for-it.sh**, adjuntat a baix, per poder testejar les comunicacions. Notar que requereix tenir el bash instal·lat.
* No executar mai el procés final de les aplicacions amb l’usuari root. La majoria de tecnologies inclouen scripts que utilitzen usuaris específics per arrencar-les.
* Fixar els uid i gid dels usuaris i grups utilitzats per executar els processos, amb l’objectiu d’evitar escalat de privilegis.
* Assegurar la seguretat dels directoris definint el propietari i els permisos explícitament. S’adjunta a baix l’script **docker-setup.sh** d’exemple.
* Executar el procés principal des d’un script, mai directament al Dockerfile.
* Utilitzar el volum /data per desar la informació que cal persistir.
* No executar múltiples processos a dins de la imatge docker. Docker està pensat per executar un únic procés.
* Fer servir imatges confiables de repositoris oficials i verificats.
* Exposar només els ports necessaris, i sempre que sigui possible, configurar l’aplicació per treballar amb ports no-estandar
* **No afegir mai credencials a les instruccions del Dockerfile ni afegir dades sensibles.**
* La imatge generada ha de ser independent de recursos externs i autosificient per arrencar a qualsevol entorn.
* Signar les imatges creades identificant l’equip que les ha generat.
* Prioritzar l’us de COPY sobre ADD.
* **Reduir el nº de layers** tot el possible, concatenant comandes que ho admetin (per exemple, RUN).
* Ubicar les comandes que menys canvi presentin a l’inici del Dockerfile.
* **No escriure els logs de l’aplicació a fitxers. Enviar els logs sempre a la sortida estàndard**. D’aquesta manera la plataforma capturarà els logs i no caldrà entrar als contenidors per veure’ls.​

Per garantir el compliment de les bones pràctiques en la generació de les imatges, utilitzar l’eina ([Haskell Dockerfile Linter (hadolint)](https://github.com/hadolint/hadolint))​.

**Criteris de seguretat**

* Intentar utilitzar l’última versió del producte, sol ser la que té menys vulnerabilitats de seguretat.
* Per validar la seguretat de les imatges creades, utilitzar l’eina Clair. En cas que es detectin vulnerabilitats, intentar eliminar-les instal·lant els patches necessaris.
* Aplicar totes les configuracions de seguretat recomanades pel fabricant o la comunitat per cada producte en particular.
* Es recomanable seguir les directrius de seguretat definides per CIS. CIS Docker Benchmark.

Abans de desplegar un contenidor a producció, es realitzarà una validació de seguretat utilitzant l’eina Clair. En cas de detectar vulnerabilitats de caràcter greu la imatge no serà desplegada.​

**Criteris específics de Openshift**

([Openshift](https://www.openshift.com/)), tot i que suporta desplegar imatges de docker, presenta uns criteris més restrictius de seguretat que cal tenir present a l’hora de construir el Dockerfile.

* No utilitzar l’usuari root ni per executar l’script principal del docker (normalment s’utilitza l’usuari root). Utilitzar la directiva USER uid per definir amb quin usuari s’executarà el procés.
* Cal tenir present que openshift executa el procés amb un id d’usuari aleatori que pertany al grup root.
  * ​Aquest usuari es crea a l’executar el docker. No existeix, ni es coneix, en etapa de construcció de la imatge de docker.
  * A causa de la característica anterior, és possible que algunes accions que habitualment es fan en etapa de construcció calgui fer-les en etapa d’execució amb alguna shell.
  * Cal que les carpetes on el procés escriu dades, pertanyin al grup root. Es pot veure a l’script docker-setup.sh inclòs abaix.
  * Algunes aplicacions necessiten que l’usuari estigui definit al fitxer /etc/passwd. En aquest cas existeixen dues opcions:
    * Utilitzar el paquet nss_wrapper per emular els canvis en aquest fitxer. Es necessari heretar de la imatge ([alpine-nss](https://git.intranet.gencat.cat/3048-intern/imatges-docker/alpine-nss)). Important llegir el README.md amb les instruccions de com utilitzar-la. Es pot veure un exemple d’ús a la imatge docker ([postgres](https://git.intranet.gencat.cat/3048-intern/imatges-docker/postgres). Fixeu-vos sobretot en l’ús del ENTRYPOINT.
    * Utilitar la funcionalitat que ofereix cri.o, motor de contenidors d’Openshift 4, que afegeix automàticament l’usuari amb que arrenca el contenidor al fitxer de /etc/password. Veure la plana web ([Openshift. Creating Images. Guidelines. OpenShift Origin-Specific Guidelines. Support Arbitrary User IDs](https://docs.openshift.com/container-platform/4.3/openshift_images/create-images.html) per més detalls.
  * Utilitzar variables d’entorn per la configuració.
  * Més informació de com construir les imatges de docker està disponible a:
    * ([​Openshift 4.10. Creating Images. Guidelines](https://docs.openshift.com/container-platform/4.10/openshift_images/create-images.html))
    * ([Openshift 3.11. Creating Images. Guidelines](https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html))
    * ([OpenShift Containers - Modification of /etc/passwd](https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html)

**Exemples**

Podeu trobar exemples de diferents imatges de docker seguint aquests criteris al ([registre docker privat](https://registreimatges.sic.intranet.gencat.cat/)) projecte gencatcloud. Podeu trobar els Dockerfiles de les imatges a ([git imatges docker](https://git.intranet.gencat.cat/3048-intern/imatges-docker/)).

Quan trobeu que per una tecnologia existeix la versió normal i la versió amb amb sufix -openshift, les imatges amb versió normal son compatibles amb docker(local) i Swarme i les imatges amb amb sufix -openshift són compatibles amb Kubernetes i Openshift.​

**Annexos**

*wait-for-it.sh*

```
#   !/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

cmdname=$(basename $0)

echoerr() { if  $QUIET -ne 1 ; then echo "$@" 1>&2; fi }

usage()
{
    cat << USAGE >&2
Usage:
    $cmdname host:port [-s] [-t timeout] [-- command args]
    -h HOST | --host=HOST       Host or IP under test
    -p PORT | --port=PORT       TCP port under test
                                Alternatively, you specify the host and port as host:port
    -s | --strict               Only execute subcommand if the test succeeds
    -q | --quiet                Don't output any status messages
    -t TIMEOUT | --timeout=TIMEOUT
                                Timeout in seconds, zero for no timeout
    -- COMMAND ARGS             Execute command with args after the test finishes
USAGE
    exit 1
}
wait_for()
{
    if  $TIMEOUT -gt 0 ; then
        echoerr "$cmdname: waiting $TIMEOUT seconds for $HOST:$PORT"
    else
        echoerr "$cmdname: waiting for $HOST:$PORT without a timeout"
    fi
    start_ts=$(date +%s)
    while :
    do
        (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1
        result=$?
        if  $result -eq 0 ; then
            end_ts=$(date +%s)
            echoerr "$cmdname: $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
            break
        fi
        sleep 1
    done
    return $result
}
wait_for_wrapper()
{
    # In order to support SIGINT during timeout: http://unix.stackexchange.com/a/57692
    if  $QUIET -eq 1 ; then
        timeout -t $TIMEOUT $0 --quiet --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
    else
        timeout -t $TIMEOUT $0 --child --host=$HOST --port=$PORT --timeout=$TIMEOUT &
    fi
    PID=$!
    trap "kill -INT -$PID" INT
    wait $PID
    RESULT=$?
    if  $RESULT -ne 0 ; then
        echoerr "$cmdname: timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
    fi
    return $RESULT
}
# process arguments
while  $# -gt 0 
do
    case "$1" in
        *:* )
        hostport=(${1//:/ })
        HOST=${hostport[0]}
        PORT=${hostport[1]}
        shift 1
        ;;
        --child)
        CHILD=1
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -s | --strict)
        STRICT=1
        shift 1
        ;;
        -h)
        HOST="$2"
        if  $HOST == "" ; then break; fi
        shift 2
        ;;
        --host=*)
        HOST="${1#*=}"
        shift 1
        ;;
        -p)
        PORT="$2"
        if  $PORT == "" ; then break; fi
        shift 2
        ;;
        --port=*)
        PORT="${1#*=}"
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if  $TIMEOUT == "" ; then break; fi
        shift 2
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --)
        shift
        CLI="$@"
        break
        ;;
        --help)
        usage
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage
        ;;
    esac
done
if | "$PORT" == "" ; then
    echoerr "Error: you need to provide a host and port to test."
    usage
fi
TIMEOUT=${TIMEOUT:-15}
STRICT=${STRICT:-0}
CHILD=${CHILD:-0}
QUIET=${QUIET:-0}
if  $CHILD -gt 0 ; then
    wait_for
    RESULT=$?
    exit $RESULT
else
    if  $TIMEOUT -gt 0 ; then
        wait_for_wrapper
        RESULT=$?
    else
        wait_for
        RESULT=$?
    fi
fi
if  $CLI != "" ; then
    if  $RESULT -ne 0 && $STRICT -eq 1 ; then
        echoerr "$cmdname: strict mode, refusing to execute subprocess"
        exit $RESULT
    fi
    exec $CLI
else
    exit $RESULT
fi
```

*docker-setup.sh*

```
#   !/bin/sh
#   setup directory for data
mkdir -p /data
chown -R nginx:0 /data
chmod g+w -R /data
chown -R nginx:0 /usr
chown -R nginx:0 /var

chgrp -R 0 /usr
chmod -R g+rw /usr
find /usr -type d -exec chmod g+x {} +

chgrp -R 0 /var
chmod -R g+rw /var
find /var -type d -exec chmod g+x {} +​
```
​

#### **2.1.1.3. Imatges de contenidors base** {#ImatgesContenidorsBase}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**​​​​Imatges de contenidors certificades**

Per facilitar la tasca de desenvolupament i creació d’aplicacions basades en contenidors, CTTI ofereix un conjunt d’imatges certificades i alineades amb les versions del software del ([Full de Ruta de Programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/)).

Podeu trobar aquestes imatges certificades al ([registre privat](https://registreimatges.sic.intranet.gencat.cat/)). Si necessiteu més informació d’aquest registre privat, podeu consultar ([Registre docker privat​​](https://espai.ctti.gencat.cat/Governanca-TIC/Sistemes-informacio/Infraestructura/Cataleg-CPD-cloud/Contenidors/Registre-docker-privat/Pagines/default.aspx)).

​<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Element</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Versió</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Imatge Docker</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Codi Font</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Apache</td>
        <td style="font-size: 16px;"><div align="center">​2.4​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/httpd:2.4</td>
        <td style="font-size: 16px;"><div align="center">([httpd](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd/tree/2.4))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Apache GICAR Shibboleth</td>
        <td style="font-size: 16px;"><div align="center">1.0.3</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/gicar-shibboleth:1.0.3</td>
        <td style="font-size: 16px;"><div align="center">​([​gicar-shibboleth](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth/tree/1.0.3))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Apache GICAR Shibboleth Kubernetes/Openshift​</td>
        <td style="font-size: 16px;"><div align="center">​1.0.3</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/gicar-shibboleth-openshift:1.0.3</td>
        <td style="font-size: 16px;"><div align="center">([​gicar-shibboleth-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-shibboleth-openshift/tree/1.0.3))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Apache Proxy ElasticSearch</td>
        <td style="font-size: 16px;"><div align="center">​2.4-1.0</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/httpd-proxy-es:2.4-1.0</td>
        <td style="font-size: 16px;"><div align="center">([​httpd-prox​y-es](https://git.intranet.gencat.cat/3048-intern/imatges-docker/httpd-proxy-es/tree/2.4-1.0))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Nginx</td>
        <td style="font-size: 16px;"><div align="center">1.18</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/nginx:1.18</td>
        <td style="font-size: 16px;"><div align="center">([ngi​nx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/nginx/tree/1.18))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">GICAR Nginx</td>
        <td style="font-size: 16px;"><div align="center">1.0.0</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/gicar-nginx:1.0.0</td>
        <td style="font-size: 16px;"><div align="center">([gic​ar-nginx](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-nginx/tree/1.0.0))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">GICAR Nginx Kubernetes/Openshift</td>
        <td style="font-size: 16px;"><div align="center">​1.0.0</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/gicar-nginx-openshift:1.0.0</td>
        <td style="font-size: 16px;"><div align="center">([gic​ar-nginx-openshift](https://git.intranet.gencat.cat/3048-intern/imatges-docker/gicar-nginx-openshift/tree/1.0.0))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Java</td>
        <td style="font-size: 16px;"><div align="center">​8​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/java:8</td>
        <td style="font-size: 16px;"><div align="center">([​ja​va](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/8))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Java</td>
        <td style="font-size: 16px;"><div align="center">11-openjdk​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/java:11-openjdk</td>
        <td style="font-size: 16px;"><div align="center">([java](https://git.intranet.gencat.cat/3048-intern/imatges-docker/java/tree/11))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">.Net Core</td>
        <td style="font-size: 16px;"><div align="center">​3.1</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/dotnet:1.0-3.1</td>
        <td style="font-size: 16px;"><div align="center">([​dot​net](https://git.intranet.gencat.cat/3048-intern/imatges-docker/dotnet/tree/3.1))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">NodeJS</td>
        <td style="font-size: 16px;"><div align="center">14</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:14</td>
        <td style="font-size: 16px;"><div align="center">([​no​de](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/14))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">NodeJS</td>
        <td style="font-size: 16px;"><div align="center">​16</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:16</td>
        <td style="font-size: 16px;"><div align="center">([no​de](https://git.intranet.gencat.cat/3048-intern/imatges-docker/node/tree/16))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">PHP</td>
        <td style="font-size: 16px;"><div align="center">​8.0</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:8.0</td>
        <td style="font-size: 16px;"><div align="center">([ap​ache-php](https://git.intranet.gencat.cat/3048-intern/imatges-docker/apache-php/tree/8.0))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Tomcat</td>
        <td style="font-size: 16px;"><div align="center">9.0-java8</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:9.0-java8</td>
        <td style="font-size: 16px;"><div align="center">([​tom​​cat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/9.0-java8))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Tomcat</td>
        <td style="font-size: 16px;"><div align="center">9.0-java11</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:9.0-java11</td>
        <td style="font-size: 16px;"><div align="center">([​tom​cat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat/tree/9.0-java11))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">9.0-java8</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java8</td>
        <td style="font-size: 16px;"><div align="center">([​tom​​cat](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat-hc/tree/9.0-java8))</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">9.0-java11</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:9.0-java11​</td>
        <td style="font-size: 16px;"><div align="center">​([tomc​at](https://git.intranet.gencat.cat/3048-intern/imatges-docker/tomcat-hc/tree/9.0-java11))</td>
    </tr>
</table>

**IMPORTANT:** De cara a minimitzar les vulnerabilitats de les aplicacions, es recomana que els proveïdors d’aplicacions les reconstrueixin periòdicament utilitzant aquestes imatges Docker certificades més actualitzades. Per realitzar aquestes tasques de construcció i desplegament s’ha de fer ús de les corresponents pipelines al Jenkins del SIC.

**Creació de contenidors**

La llista anterior no exclou que no es puguin lliurar contenidors que corrin altres productes i personalitzacions. En qualsevol cas, les imatges construïdes passaran per un servei d’avaluació de vulnerabilitats per a garantir en una primera instància la qualitat d’aquestes.

Per construir contenidors personalitzats, cal tenir present els ([Criteris creació contenidors docker](https://espai.ctti.gencat.cat/Governanca-TIC/Sistemes-informacio/Infraestructura/Cataleg-CPD-cloud/Contenidors/Creacio-contenidors/Pagines/default.aspx))​.

Més informació sobre Docker: ([https://www.docker.com/​](https://www.docker.com/)).

**Bases de dades a contenidors**

Les bases de dades a contenidors no disposen de cap servei com backups o gestió d’usuaris. El proveïdor d’aplicacions haurà de fer-se càrrec d’aquests serveis.

Tampoc ofereix un entorn en alta disponibilitat. És una modalitat no recomanada per entorns productius.​​​​​​​

**Imatges de contenidors obsoletes**

​​​​​​​Aquestes imatges són obsoletes/no suportades i no tenen manteniment. Poden contenir vulnerabilitats i no està recomanat el seu ús.

En cas d’utilitzar aquestes imatges es recomana l’actualització a les imatges suportades.​

​<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Element</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Versió</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Imatge Docker</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Apache GICAR Openshift</td>
        <td style="font-size: 16px;"><div align="center">1.0​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/gicar-openshift:1.0</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Nginx</td>
        <td style="font-size: 16px;"><div align="center">1.12​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/nginx:1.12</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Nginx</td>
        <td style="font-size: 16px;"><div align="center">1.14​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/nginx:1.14</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Nginx</td>
        <td style="font-size: 16px;"><div align="center">1.16​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/nginx:1.16</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​NodeJS</td>
        <td style="font-size: 16px;"><div align="center">4/td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:4</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​NodeJS</td>
        <td style="font-size: 16px;"><div align="center">6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​NodeJS</td>
        <td style="font-size: 16px;"><div align="center">8</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:8</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​NodeJS</td>
        <td style="font-size: 16px;"><div align="center">10​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:10</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​NodeJS</td>
        <td style="font-size: 16px;"><div align="center">​12</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/node:12</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​PHP</td>
        <td style="font-size: 16px;"><div align="center">5.6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:5.6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​PHP</td>
        <td style="font-size: 16px;"><div align="center">7.1</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:7.1</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​PHP</td>
        <td style="font-size: 16px;"><div align="center">7.2​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:7.2</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​PHP</td>
        <td style="font-size: 16px;"><div align="center">7.3​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:7.3</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​PHP</td>
        <td style="font-size: 16px;"><div align="center">7.4​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/apache-php:7.4</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Java</td>
        <td style="font-size: 16px;"><div align="center">6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/java:6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Java</td>
        <td style="font-size: 16px;"><div align="center">7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/java:7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">6-java6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:6-java6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">6-java7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:6-java7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">7-java6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:7-java6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">7-java7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:7-java7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">7​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">8.0-java7​​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:8.0-java7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">​8.0</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:8.0</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat</td>
        <td style="font-size: 16px;"><div align="center">8.5​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat:8.5</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">6-java6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:6-java6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">​6-java7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:6-java7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">7-java6​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:6-java6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">​​7-java7</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:7-java6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">8.0-java7​​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:8.0-java7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">8.0​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:8.0</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​Tomcat amb suport de Sessions distribuïdes</td>
        <td style="font-size: 16px;"><div align="center">8.5​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/tomcat-hc:8.5</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">9.3​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:9.3</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">​9.4</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:9.4</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">9.5​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:9.5</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">​9.6</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:9.6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">​10</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:10</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">Postgres</td>
        <td style="font-size: 16px;"><div align="center">11​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/postgres:11</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">MongoDB​</td>
        <td style="font-size: 16px;"><div align="center">​3.2​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/mongodb:3.2</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">MongoDB​</td>
        <td style="font-size: 16px;"><div align="center">3.4​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/mongodb:3.4</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">MongoDB​</td>
        <td style="font-size: 16px;"><div align="center">​3.6​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/mongodb:3.6</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">MongoDB​</td>
        <td style="font-size: 16px;"><div align="center">​4.0​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/mongodb:4.0</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">MongoDB​</td>
        <td style="font-size: 16px;"><div align="center">4.2​</td>
        <td style="font-size: 16px;"><div align="center">​registreimatges.sic.intranet.gencat.cat/gencatcloud/mongodb:4.2</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​MySql</td>
        <td style="font-size: 16px;"><div align="center">5.7​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/mysql:5.7</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center">​MySql</td>
        <td style="font-size: 16px;"><div align="center">​8.0​​</td>
        <td style="font-size: 16px;"><div align="center">registreimatges.sic.intranet.gencat.cat/gencatcloud/mysql:8.0</td>
    </tr>
</table>

#### **2.1.2. DBaaS** {#DBaaS}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>
Les bases de dades com a servei són un cas concret de CaaS on la base de dades és gairebé una “commodity” i gairebé no hi ha administració. L'administració que pot arribar a fer el proveidor d'infraestructura es redueix a gestionar la disponbilitat i l'obsolescència, així com configurar l'alta disponibilitat i el sistema de còpies de seguretat i recuperació. En cas que la base de dades no sigui administrada pel proveïdor d'infraestructura aquestes tasques recauen en el proveïdor d'aplicacions.


**Consideracions tècniques generals**

A l’hora d’utilitzar aquesta tecnologia cal tenir en compte les següents premisses:

* La base de dades estarà en un namespace propi.
* Els serveis d’administració que proporciona CPD estan principalment orientats a dotar l’alta disponibilitat i els backups.
* No es donaran credencials d’administració ni es pot connectar per SSH per modificar taules o dades.
* Totes les operacions sobre la base de dades s’efectuaran via SIC.

Pel que fa a l’storage:

* No es fa aprovisionament dinàmic de disc, si no un PVC (persistentVolumeClaim) del PV (persistentVolume) que genera el CPD. 
* A la configuració del fitxer de desplegament cal referenciar-lo.

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="30%" style="font-size: 16px;"><div align="center"><strong>Grup de Tecnologia</strong></th>
        <th class="cttiNoBorder" width="40%" style="font-size: 16px;"><div align="center"><strong>Producte</strong></th>
        <th class="cttiNoBorder" width="40%" style="font-size: 16px;"><div align="center"><strong>Plataformes disponibles</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Bases de Dades (DBaaS)</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/postgresql.png" width="48" alt="PostgreSQL"> <img src="../img/mysql.png" width="48" alt="MySQL"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/openshift.png" width="48" alt="Openshift"></td>
    </tr>
</table>

**Elements disponibles**

Actualment, els nostres DBaaS (administrats pel proveïdor d'infraestructura) disponibles al cloud privat són:

* Openshift

Els DBaaS tractats com a CaaS (no hi ha administració per part del proveïdor d'infraestructura) on l'administració es fa per part del proveïdor d'aplicacions estan disponibles tant a Openshift com a Kubernetes.

Openshift ofereix DBaaS en cloud privat administrades pel proveidor d'infraestructures CPD4.  Si s'escolleix un altre proveïdor d'infraestructures, actualment el servei d'administració de base de dades ha de ser ofert pel proveïdor d'aplicacions, ja que ara mateix la resta de proveïdors no ofereixen aquest tipus de servei

Actualment s’ofereixen les següents bases de dades:

* PostgreSQL
* MySQL​

**DBaaS: Procediments**

* Alta elemen​​t catàleg

    ​Per a donar d'alta un element al catàleg de tipus CaaS privat, hi ha 3 actors : l'equip d'arquitectura del Centre Suport Cloud, l'equip d'operacions del Centre Suport Cloud i l'equip del Centre de Suport SIC.. El procediment consistiria en les següents tasques, sent l'iniciador l'equip d'Arquitectura del Centre de Suport Cloud:

    1. L'equip d'arquitectura del Centre de Suport Cloud defineix l'element de catàleg i les necessitats bàsiques del mateix
    2. El proveïdor d'infraestructures realitza la proposta del nou element de catàleg
    3. El proveïdor d'infraestructures realitza la definició operativa, així com del servei i la facturació
    4. L'equip d'arquitectura del Centre de Suport Cloud dona la conformitat al nou element.
    5. Els equips d'arquitectura i operacions del Centre de Suport Cloud validen el nou element
    6. L'equip d'operacions del Centre de Suport Cloud valida l'aprovisionament i l'operativa del nou element
    7. L'equip d'operacions del Centre de Suport Cloud completa la fitxa corresponent al nou element de catàleg
    8. L'equip d'operacions del Centre de Suport Cloud afegeix l'element al catàleg de contenidors
    9. L'equip del Centre de Suport SIC modifica l'executor de scripts per a incorporar-ho al SIC
    10. L'equip del Centre de Suport SIC afegeix el nou element a la documentació CI/CD

    Visualment, el procediment seria aquest:
    
    <br>
    <div align="left">
        <img src="../img/altadbaasprivat.png" style="width:60%;" />
    </div>
    <br>

* Manteniment elemen​​t catàleg
    
    Per a actualitzar​ un element al catàleg de tipus CaaS privat, hi ha 2 actors :  l'equip d'operacions del Centre Suport Cloud i l'equip del Centre de Suport SIC. El procediment consistiria en les següents tasques, , sent l'iniciador l'equip de Serveis del Centre de Suport Cloud:

    1. El proveïdor d'infraestructures realitza l'alineament amb el full de ruta
    2. El proveïdor d'infraestructures realitza una proposta de canvi de versió i un procediment de migració
    3. Els equips d'arquitectura i operacions del Centre de Suport Cloud donen conformitat al canvi
    4. El proveïdor d'infraestructures realitza l'alta del CRD al ITSM
    5. L'equip d'operacions del Centre de Suport Cloud realitza la gestió del canvi amb el proveïdor d'aplicacions.
    6. L'equip del Centre de Suport SIC modifica l'executor de scripts per a incorporar-ho al SIC

<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

#### **2.1.3. SIC: Desplegament d'aplicacions CaaS** {#SIC}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**Tasques d’operació disponibles al SIC:**

Desplegament (inclosos tags i configmaps)
* Desplegament complet (aplicació i descriptors)
* Desplegament individual de l'aplicació
* Desplegament individual dels descriptors

Arrancada, parada i reinici: actualització d’algunes propietats dels descriptors de deployment/deploymentConfig

**Integració de contenidors al SIC:**

* Informació necessària:
    * Elements comuns:
        * Nom del repositori git del codi font.
        * En cas de necessitats de compilació, requeriments i instruccions al respecte.
        * Nom de la imatge docker (la versió s’agafa del fitxer sic.yml)
        * Path del fitxer Dockerfile.
        * Llista de correus electrònics en cas de notificacions de Jenkins.
    * Elements específics per Openshift i/o Kubernetes: 
        * Nom del repositori git dels descriptors 
        * Nom del descriptor de desplegament de Kubernetes/Openshift.

#### **2.1.4. Monitorització, logs i traces** {#MonitoritzacioLogsTraces}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

En desplegar una aplicació en contenidors es proporciona a lot d’aplicacions un usuari amb permisos de lectura de les traces del seu projecte.

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;">Plataforma</th>
        <th class="cttiNoBorder" width="75%" style="font-size: 16px;">Servei</th>
    </tr>
    <tr>
        <td width="25%" style="font-size: 16px;"><div align="center"><img src="../img/openshift.png" width="48" alt="Openshift"></td>
        <td width="75%" style="font-size: 16px;"><div align="left">Des de la consola web de les diferents plataformes es pot consultar de cada projecte la següent informació:</div>
        <div align="left">1. Estat dels desplegaments</div>
        <div align="left">2. Estat dels pods</div>
        <div align="left">3. Mètriques dels pods</div>
        <div align="left">4. Logs dels pods</div></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kibana.png" width="48" alt="Kibana"></td>
        <td style="font-size: 16px;"><div align="left">Les plataformes que ofereixen Kibana poden veure els logs dels seus pods en temps reals amb una retenció de 30 dies.</div></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/grafana.png" width="48" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="left">Accés via Grafana a les mètriques bàsiques d’un contenidor (CPU, RAM i xarxa).</div></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kubernetes.png" width="48" alt="Kubernetes"></td>
        <td style="font-size: 16px;"><div align="left">Accés als logs online via client Kubctl sense persistència.</td>
    </tr>
</table>

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Plataforma</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Monitoratge(*)</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Logs</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Traces(**)</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/openshift.png" width="48" alt="Openshift"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/prometheus.png" width="48" alt="Prometheus"> <img src="../img/grafana.png" width="48" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kibana.png" width="48" alt="Kibana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/jaeger.png" width="48" alt="Jaeger"> <img src="../img/istio.png" width="48" alt="Istio"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kubernetes.png" width="48" alt="Kubernetes"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/prometheus.png" width="48" alt="Prometheus"> <img src="../img/grafana.png" width="48" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kibana.png" width="48" alt="Kibana"></td>
        <td style="font-size: 16px;"></td>
    </tr>
</table>

<span style="font-size: 10px;font-style: italic;">(*)Si es vol afegir una monitorització específica, es pot implementar un Prometheus y Grafana propi de l’aplicació. Es poden fer servir els templates que Suport Cloud ofereix. Cal recordar que s’ha d’aprovisionar disc persistent per Prometheus.</span>

<span style="font-size: 10px;font-style: italic;">(**)Tots els proveïdors ofereixen monitorització i logs a nivell d’aplicació (mètriques genèriques). En el cas de les traces, només la instal·lació d’Istio sobre Openshift permetrà la visualització de traces</span>

##### **2.1.4.1. Openshift amb Istio** {#OpenshiftAmbIstio}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

Amb la implementació d’un Service Mesh (en aquest cas Istio) s’afegeixen eines per a la monitorització del sistema. El seguiment de mètriques, logs i traces dels microserveis (i de la resta del Sistema d’Informació si es configura així) es poden dur a terme amb les eines que proporciona Istio.

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Plataforma</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Monitoratge</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Logs</strong></th>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="center"><strong>Traces</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/storage.png" width="48" alt=""></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/prometheus.png" width="48" alt="Prometheus"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/elasticsearch.png" width="48" alt="ElasticSearch"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/zipkin.png" width="48" alt="Zipkin"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../img/dashboard.png" width="48" alt=""></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/grafana.png" width="48" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kibana.png" width="48" alt="Kibana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/jaeger.png" width="48" alt="Jaeger"></td>
    </tr>
</table>

#### **2.1.5. Ticketing/Incidental** {#TicketingIncidental}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

En funció de l'estat del projecte, el funcionament serà el següent:

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="25%" style="font-size: 16px;"><div align="left"><strong>Estat aplicació</strong></th>
        <th class="cttiNoBorder" width="75%" style="font-size: 16px;"><div align="center"><strong>Comunicació</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="left"><strong>En servei</strong></td>
        <td style="font-size: 16px;"><div align="center">Pautic per incidències, consultes i canvis</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="left"><strong>En fase de projecte</strong></td>
        <td style="font-size: 16px;"><div align="center">Via CSTD (Centre de Suport Tecnològic al Desenvolupament) al Servei Acompanyament Suport Cloud</td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="left"><strong>Sense iniciar el procés d'alta dins del CTTI</strong></td>
        <td style="font-size: 16px;"><div align="center">Adreçar consultes a [suport.cloud@gencat.cat](suport.cloud@gencat.cat)</td>
    </tr>
</table>

<div style="font-size: 10px;font-style: italic;">Donat que a les plataformes Cloud gestionades des de Suport Cloud es dona accés a logs i monitoratge de l'aplicació i que gràcies als jobs de desplegament del SIC és autònom per desplegar el servei afectat, només haurien d'arribar incidències a Suport Cloud relacionades amb la plataforma (Ex. indisponiblitat global de la plataforma), que ni tan sols redesplegant el servei puguin resoldre's.
</div>

### **2.2. Cloud Públic** {#CloudPublic}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

El cloud públic permet una escalabilitat i flexibilitat molt bona respecte a pics de demanda, un risc baix d’obsolescència, etc. en canvi els costos són més elevats i la integració amb la resta de solucions de l’empresa són més complexes.  

Actualment el CTTI disposa de 2 opcions per desplegar sistemes d’informació sobre núvol públic; Azure i IBM Cloud.

En el núvol públic hi podem desplegar tres tipologies principals de serveis:

* **xPaaS:** és un nivell superior d’abstracció que els contenidors. Són els motors d’execució auto-gestionats sobre els que es poden configurar determinades opcions (normalment referents a la potència mínima i es límits d’escalabilitat). 
* **DBaaS:** anàlogament al cas de contenidors, es tracta del cas particular de l’xPaaS en què el programari ofert com a servei és una base de dades.
* **IaaS:** infraestructura com a servei - màquina virtual, consistent en un servei de computació (CPU + memòria) i un servei d’emmagatzematge, amb un sistema operatiu (suportat per la plataforma de núvol públic) inclòs desplegada sobre núvol públic. No es considera IaaS una màquina virtual sobre la qual es desplegui una imatge de sistema operatiu no suportada per la plataforma de núvol públic. Indicar que, tal i com s’indica a la taula resum, aquest servei només es troba disponible actualment de la plataforma de núvol públic Azure​.​​


#### **2.2.1. Catàleg de Serveis** {#CatalegServeis}

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%; align: left;">
    <tr>
        <th class="cttiNoBorder" width="10%" style="font-size: 16px;"><div align="center"><strong>Plataforma</strong></th>
        <th class="cttiNoBorder" width="30%" style="font-size: 16px;"><div align="center"><img src="../img/aws.png" width="48" alt="AWS"></th>
        <th class="cttiNoBorder" width="30%" style="font-size: 16px;"><div align="center"><img src="../img/ibmcloud.png" width="48" alt="IBM Cloud"></th>
        <th class="cttiNoBorder" width="30%" style="font-size: 16px;"><div align="center"><img src="../img/azure.png" width="48" alt="Azure"></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>SaaS</strong></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/apiconnect.png" width="48" alt="IBM API Connect"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/powerapps.png" width="48" alt="PowerApps"> <img src="../img/dynamics365.png" width="48" alt="Dynamics 365"> <img src="../img/cdn.png" width="48" alt="Content Delivery Network"> <img src="../img/datafactory.png" width="48" alt="Data Factory"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>CaaS</strong></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/kubernetes.png" width="48" alt="Kubernetes"></td>
        <td style="font-size: 16px;"><div align="center"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>XPaaS</strong></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/java.png" width="48" alt="Java"> <img src="../img/nodejs.png" width="48" alt="NodeJS"> <img src="../img/go.png" width="48" alt="Go"> <img src="../img/microsoftnet.png" width="48" alt=".Net"> <img src="../img/php.png" width="48" alt="PHP"> <img src="../img/python.png" width="48" alt="Python"> <img src="../img/swift.png" width="48" alt="Swift"> <img src="../img/ruby.png" width="48" alt="Ruby"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/java.png" width="48" alt="Java"> <img src="../img/nodejs.png" width="48" alt="NodeJS"> <img src="../img/microsoftnet.png" width="48" alt=".Net"> <img src="../img/php.png" width="48" alt="PHP"> <img src="../img/python.png" width="48" alt="Python"> <img src="../img/ruby.png" width="48" alt="Ruby"> <img src="../img/docker.png" width="48" alt="Docker"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>DBaaS</strong></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/postgresql.png" width="48" alt="PostgreSQL"> <img src="../img/redis.png" width="48" alt="Redis"> <img src="../img/mongodb.png" width="48" alt="MongoDB"> <img src="../img/elasticsearch.png" width="48" alt="Elasticsearch"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/postgresql.png" width="48" alt="PostgreSQL"> <img src="../img/mysql.png" width="48" alt="MySQL"> <img src="../img/sqlserver.png" width="48" alt="SQL Server"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>IaaS</strong></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/virtualmachine.png" width="48" alt="Virtual Machine"></td>
    </tr>
</table>

##### **2.2.1.1. xPaaS** {#CatalegServeisxPaaS}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**Tarifes**

El tarifari associat al núvol públic és específic de l’element a sol·licitar i de l’ús que se’n faci durant la vida del sistema d’informació.

**Elements disponibles**

Els xPaaS són runtimes d’execució estàndards i, segons la tecnologia i la plataforma on treballem, tindrà denominacions diferents. Anomenarem a tots d’aquesta manera per a unificar conceptes. Actualment, els nostres xPaaS disponibles són:

* IBMCloud Runtimes:
    
    Basat en Cloudfoundry. Utilitza uns elements anomenats Buildpacks per definir la tecnologia de xPaaS.
    
    Existeixen molt buildpack diferents. Els més utilitzats són:
    
    * Java
    * Node.js
    * Go
    * .NET Core
    * PHP
    * Python
    * Swift
    * Ruby

* Azure App Services:

    Suporta les següents tecnologies:
    
    * .NET framework
    * .NET Core
    * Java
    * Node.js
    * PHP
    * Python
    * Ruby
    * Contenidors (dockers)

**Consideracions tècniques**

Anomenarem així als entorns d’execució, que:

* Són un nivell extra per sobre de la containerització
* Contenen un motor d’execució (p.e. un servidor d’aplicacions) on posarem la nostra aplicació o funcionalitat
* Configurarem:
    * La potència: CPU/RAM.
    * El nombre d’instàncies que correran en paral·lel per a aconseguir més concurrència.

El cas d’ús seria una aplicació de consulta simple amb temporalitat que pot fer augmentar o disminuir el seu ús de forma significativa. Alguns exemples:

* Consulta de l’estat de les platges.
* Consulta de les notes de selectivitat.
* Rastreig de xarxes socials.

Referent a l'emmagatzemament

* **IBM Cloud:** File Storage associat a contenidors com a PVC.
* **Azure:** Disc gestionat associat al servei. De manera addicional es pot crear un volum d'emmagatzemament (Azure Storage Account) orientat a (amb una lògica externa proporcionada per a, per exemple, un planificador de tasques) executar funcionalitats com càrregues de dades. En funció del tipus de volum d'emmagatzemament, aquest volum es pot compartir entre serveis.


##### **2.2.1.2. DBaaS** {#CatalegServeisxDBaaS}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**DBaaS:** la informació dels elements disponibles es pot consultar a https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/ en la secció de núvol públic.

**Tarifes**

El tarifari associat al núvol públic és específic de l’element a sol·licitar i de l’ús que se’n faci durant la vida del sistema d’informació.​​

**Consideracions tècniques generals**

Les bases de dades com a servei són un cas concret de xPaaS on:

* La DB és una “commodity”: no hi ha administració. De fet, és transparent on i com corre.
* Escala automàticament segons els requeriments (volum, índexos, …)
* El desenvolupador, amb les credencials d’accés, bàsicament guarda i recupera registres.

Les versions de les BBDD no les governa el CTTI, si no el proveïdor que ofereix el SaaS, per tant, l’actualització de les versions no és negociable.

Referent a l'emmagatzemament:

* **IBM Cloud:** File Storage associat a contenidors com a PVC.
* **Azure:** Disc gestionat associat al servei. De manera addicional es pot crear un volum d'emmagatzemament (Azure Storage Account) orientat a (amb una lògica externa proporcionada per a, per exemple, un planificador de tasques) executar funcionalitats com càrregues de dades. En funció del tipus de volum d'emmagatzemament, aquest volum es pot compartir entre serveis.

**Elements disponibles**

​Actualment, les plataformes disponibles al cloud públic  per a servei DBaaS són:

* IBM Cloud

    Dins de la plataforma IBM Cloud, s’ofereixen les següents Bases de dades:

    * MongoDB
    * ElasticSearch
    * PostgreSQL
    * Redis

* Microsoft Azure
    
    Dins de la plataforma Azure, s’ofereixen les següents Bases de dades:
    
    * SQL Server
    * PostgreSQL
    * MySQL

A diferència de les bases de dades a contenidors, els DBaaS incorporen serveis de backups i gestió d’accés entre d’altres, a més de proporcionar un entorn en alta disponibilitat. És per aquest motiu que per entorns productius és recomanable el seu ús en lloc de bases de dades en contenidors.​

Es poden sol·licitar altres elements disponibles als núvols públics que es posen a disposició de les ATIC que no estiguin homologats sempre i quan l'ATIC es faci responsable d'assumir el cost que generi. ​

##### **2.2.1.3. IaaS** {#CatalegServeisxIaaS}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**IaaS:** infraestructura com a servei - màquina virtual, consistent en un servei de computació (CPU + memòria) i un servei d’emmagatzematge, amb un sistema operatiu (suportat per la plataforma de núvol públic) inclòs desplegada sobre núvol públic.​

**Tarifes**

El tarifari associat al núvol públic és específic de l’element a sol·licitar i de l’ús que se’n faci durant la vida del sistema d’informació.​

**Elements disponibles**

La única plataforma on es poden sol·licitar serveis IaaS es Microsoft Azure.

**Consideracions tècniques generals**

S’aprovisiona infraestructura fins a nivell de Sistema Operatiu, per tant:

* Inclou la instal·lació del sistema operatiu, però no el seu manteniment.
* El desenvolupador no gestiona el maquinari, però si tot el programari.
* El desenvolupador disposa de credencials d’administrador per gestionar el servidor com consideri oportú.

Avantatges:

* Reducció de costos (respecte el Hosting tradicional, no respecte CaaS o SaaS).
* Escalabilitat millorada
* Desplegament simple
* Flexibilitat màxima.
* Per part de CSCloud s’aprovisiona (segons els requeriments rebuts):
    * Balancejos
    * Grups de xarxes
    * Backups de discs
    * Màquines virtuals amb el SO triat

Referent a l'emmagatzemament:

* **IBM Cloud:** File Storage associat a contenidors com a PVC.
* **Azure:** Disc gestionat associat al servei. De manera addicional es pot crear un volum d'emmagatzemament (Azure Storage Account) orientat a (amb una lògica externa proporcionada per a, per exemple, un planificador de tasques) executar funcionalitats com càrregues de dades. En funció del tipus de volum d'emmagatzemament, aquest volum es pot compartir entre serveis.

##### **2.2.1.4. Storage** {#CatalegServeisStorage}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

**Consideracions tècniques generals**

* **IBMCloud:** File Storage associat a contenidors com a PVC.
* **Azure:** Disc gestionat associat a màquina o crear un Storage Account que es pot compartir entre màquines.

### **2.3. Cloud Híbrid** {#CloudHibrid}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>
El cloud híbrid el podríem considerar com una solució intermèdia, on es combinen elements de catàleg de cloud privat i cloud públic al mateix temps. Aquesta solució potència les debilitats del cloud privat i del cloud públic alhora que manté les fortaleses respectives de cada solució.​

## **3. Annexes** {#Annexes}

### **3.1. SaaS sobre contenidors** {#SaaSsobreContenidors}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

Anomenarem així als serveis, que:

* Estan desplegats i s’executen a infraestructura cloud.
* Els usuaris només consumeixen el servei. No tenen capacitat de control o administració del mateix, més enllà de configuració a nivell d’usuari.
  
Disponibles actualment:

* ServiceMesh (no disponible en totes les plataformes cloud).
* API-Manager.

#### **3.1.1. Service Mesh** {#ServiceMesh}
<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>

* Cas d'ús:

Service Mesh es un terme que defineix aquells productes que busquen resoldre els problemes que generen les arquitectures basades en microserveis. Les seves funcionalitats clau inclouen seguretat, control del tràfic de xarxa i monitorització de l'aplicació.

Es important entendre que no es només instal·lar-ho, cal configurar-ho correctament i aprofitar-ho.
<br>

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" style="font-size: 16px;">Diagrama</th>
        <th class="cttiNoBorder" style="font-size: 16px;">Casos d'ús</th>
    </tr>
    <tr>
        <td style="font-size: 16px;" width="40%"><div align="center"><img src="../img/servicemeshcasus.png" width="100%" alt="Service Mesh"></td>
        <td style="font-size: 16px;" width="60%"><div align="Left">
        <div>- Aplicacions amb microserveis que es comuniquen directament entre ells de forma síncrona.</div>
        <div>- En el cas de comunicacions asíncrones, es més recomanable fer servir un gestor de cues, però un Service Mesh ens ajudaria en el cas de voler traces distribuïdes.</div>
        <div>- Aplicacions que requereixen de seguretat i/o control del tràfic entre microserveis.</div>
        </td>
    </tr>
</table>

**Principals funcions:**

* Control de tràfic entre contenidors:
  * Circuit Breakers.
  * Timeouts.
  * Reintents.
  * Balanceig de tràfic avançat.
  * Desplegaments avançats (Canary, Blue Green, Dark launching...).
* Securització del tràfic entre contenidors:
  * Encriptació SSL del Tràfic.
  * Mutual TLS.
  * Control d'accés.
* Monitoratge:
  * Estat dels microserveis.
  * Flux de tràfic entre microserveis.
  * Rendiment.
  * Traces distribuïdes.

Configuracions destacades de Service Mesh

* **Throttling:** permet limitar el nombre de peticions concurrents màxim a un microservei per evitar la seva saturació.
* **Circuit breaking:** es un patró que testeja el servei i, en cas que no es comporti correctament, tallar les peticions per evitar una fallida en cascada.
* **Mutual TLS:** força TLS pel tràfic entre els diferents pods dins el clúster, eliminant tot el tràfic no TLS. Recomanat per clústers públics multiregió.
* **ACL:** defineix la seguretat de les crides entre microserveis, indicant quins microserveis poden cridar a un microservei concret. Simplifica la seguretat en microserveis, tot eliminant la necessitat de l’ús de keys.
* **RBAC:** permet configurar quins usuaris poden fer peticions als serveis i establir els tipus de peticions HTTP (GET, POST, PUT, DELETE, etc.)

Exemples d’ús del Service Mesh:

* **Canary Deployment(*):** model de desplegament en que la nova versió de l’aplicació es desplega simultàniament amb la versió estable.
* **A/B Testing:** molt similar al Canary Deployment, amb dues versions desplegades a les que decidirem quins usuaris accedeixen a cadascuna. No es fa per percentatge d’accessos, si no que decidim quins usuaris fan servir una o altra versió.
* **Fault Injection:** permet injectar errors a un percentatge de les peticions. Permet simular i identificar el comportament del sistema en cas de fallida de xarxa i/o microserveis.
* **Timeouts:** permet afegir de forma transparent als microserveis, timeouts entre peticions per evitar colls d’ampolla i fallides en cascada.
* **Reintents:** permet afegir polítiques de reintents peticions per mitigar fallides puntuals de xarxa o microserveis.

#### **3.1.2. API Manager** {#APIManager}

Per a la publicació de les APIs públiques està disponible l’API-Manager Corporatiu. Es tracta de l’IBM API Connect.

Funcions de l’API-Manager:

* Funcionals:
  * Catàleg d’APIs disponible per al seu ús i versionat.
  * Autoservei en la subscripció a APIs.
  * Portal de publicació de la documentació associada a l’ús de les APIs.
  * Generació de reports sobre l’ús de les APIs.
  * Associació de cost a l’ús de les APIs i gestionar el ser repartiment.
* Tècniques:
  * Control d’accés i definició de plans.
  * Oferir diferents nivells de servei i control.
  * Anàlisi de les dades que es publiquen.
  * Seguretat:
    * Establir polítiques de cache.
    * Prevenció davant atacs.
    * Protecció dels sistemes de backoffice.
  * Aïllar els consumidors dels publicadors de serveis i dades.

<span style="font-size: 9px;"> [Inici](#TaulaContiguts)</span>
