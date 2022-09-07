+++
date        = "2022-08-24"
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

1. [Introducció] (#Introduccio)
2. [Situació actual] (#SituacioActual)
    1. [Cloud Privat] (#CloudPrivat)
        1. [CaaS] (#CaaS)
        2. [DBaaS] (#DBaaS)
        3. [SIC: Desplegament d'aplicacions CaaS] (#SIC)
    2. [Cloud Públic] (#CloudPublic)
        1. [Catàleg de serveis] (#CatalegServeis)
            1. [xPaaS] (#xPaaS)
            2. [DBaaS] (#DBaaS)
            3. [IaaS] (#IaaS)
            4. [Storage] (#Storage)
3. [Governança] (#Governança)
    1. [Monitorització, logs i traces] (#MonitoritzacioLogsTraces)
        1. [Openshift amb Istio] (#OpenshiftAmbIstio)
    2. [Ticketing/Incidental] (#TicketingIncidental)
4. [Annexes] (#Annexes)
    1. [SaaS sobre contenidors] (#SaaSsobreContenidors)
        1. [Service Mesh] (#ServiceMesh)
        2. [API Manager] (#APIManager)

---

## **1. Introducció** {#Introduccio}

La demanda d’arquitectures basades en solucions de núvol públic i/o contenidors ha augmentat de forma considerable en els darrers temps.

Aquest document pretén ser una guia que doni a conèixer, a aquelles persones que volen implementar sistemes cloud, quin ventall d’opcions, tant de productes com de nivells de servei, hi ha disponibles.

Així mateix, el document recull totes aquelles consideracions a tenir en compte perquè el procés de sol·licitud, validació i desplegament d’aquests tipus de solucions sigui el més àgil possible.

Ateses les grans diferències que es poden trobar en la manera de sol·licitar i la diversitat de temes a considerar, en endavant, es presenten dos grans grups de solucions:
- Les arquitectures basades en contenidors i que es poden desplegar tant en plataformes de núvol privat i públic.
- Les arquitectures basades en l’ús d’elements de núvol públic.

Així mateix, com a conclusió també es reservarà un espai per tractar les solucions basades en arquitectures híbrides.
<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)
</div>

## **2. Situació actual** {#SituacioActual}

A la figura es mostren a molt alt nivell les solucions, les tecnologies disponibles i on es poden desplegar:
<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:100%;">
    <tr>
        <th class="cttiNoBorder"></th>
        <th class="cttiNoBorder" colspan="3" style="font-size: 24px;"><div align="center"><strong>Públic (Internet)</strong></th>
        <th class="cttiNoBorder" colspan="4" style="font-size: 24px;"><div align="center"><strong>Privat (Intranet)</strong></th>
    </tr>
    <tr>
        <th class="cttiNoBorder" width="9%" style="border-style: none;"></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>Comnpose</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>IBM Cloud</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>Azure</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD1</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD2</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD3</strong></th>
        <th class="cttiNoBorder" width="13%" style="font-size: 20px;text-align: center;"><strong>CPD4</strong></th>
    </tr>
    <tr>
        <th class="cttiNoBorder" align="right" style="font-size: 20px;text-align: right;"><strong>SaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/apiconnect.png" width="30" alt="IBM Apiconnect"></td>
        <td align="center"><img src="../../catalegCloud/img/powerapps.png" width="30" alt="PowerApps"> <img src="../../catalegCloud/img/dynamics365.png" width="30" alt="Swarm"> <img src="../../catalegCloud/img/cdn.png" width="30" alt="CDN"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" align="right" style="font-size: 20px;text-align: right;"><strong>CaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/kubernetes.png" width="30" alt="Kubernetes"></td>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/swarm.png" width="30" alt="Swarm"> <img src="../../catalegCloud/img/kubernetes.png" width="30" alt="Kubernetes"></td>
        <td align="center"><img src="../../catalegCloud/img/kubernetes.png" width="30" alt="Kubernetes"> <img src="../../catalegCloud/img/openshift.png" width="30" alt="Openshift"></td>
        <td align="center"><img src="../../catalegCloud/img/openshift.png" width="30" alt="Openshift"></td>
        <td align="center"><img src="../../catalegCloud/img/openshift.png" width="30" alt="Openshift"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" align="right" style="font-size: 20px;text-align: right;"><strong>xPaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/javaliberty.png" width="30" alt="JavaLiberty"> <img src="../../catalegCloud/img/python.png" width="30" alt="Python"> <img src="../../catalegCloud/img/ruby.png" width="30" alt="Ruby"> <img src="../../catalegCloud/img/nginx.png" width="30" alt="NGinx"> <img src="../../catalegCloud/img/php.png" width="30" alt="Php"> <img src="../../catalegCloud/img/nodejs.png" width="30" alt="NodeJS"> <img src="../../catalegCloud/img/go.png" width="30" alt="Go"></td>
        <td align="center"><img src="../../catalegCloud/img/microsoftnet.png" width="30" alt="Microsoft .Net"> <img src="../../catalegCloud/img/python.png" width="30" alt="Python"> <img src="../../catalegCloud/img/java.png" width="30" alt="Java"> <img src="../../catalegCloud/img/php.png" width="30" alt="Php"> <img src="../../catalegCloud/img/nodejs.png" width="30" alt="NodeJS"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/istio.png" width="30" alt="Istio"></td>
        <td align="center"><img src="../../catalegCloud/img/istio.png" width="30" alt="Istio"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" align="right" style="font-size: 20px;text-align: right;"><strong>DBaaS</strong></th>
        <td align="center"><img src="../../catalegCloud/img/postgresql.png" width="30" alt="PostgreSQL"> <img src="../../catalegCloud/img/mongodb.png" width="30" alt="MongoDB"> <img src="../../catalegCloud/img/elasticsearch.png" width="30" alt="ElasticSearch"></td>
        <td align="center"><img src="../../catalegCloud/img/postgresql.png" width="30" alt="PostgreSQL"> <img src="../../catalegCloud/img/mongodb.png" width="30" alt="MongoDB"> <img src="../../catalegCloud/img/redis.png" width="30" alt="Redis"> <img src="../../catalegCloud/img/elasticsearch.png" width="30" alt="ElasticSearch"></td>
        <td align="center"><img src="../../catalegCloud/img/postgresql.png" width="30" alt="PostgreSQL"> <img src="../../catalegCloud/img/sqlserver.png" width="30" alt="SQLServer"> <img src="../../catalegCloud/img/mysql.png" width="30" alt="MySQL"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/postgresql.png" width="30" alt="PostgreSQL"> <img src="../../catalegCloud/img/mysql.png" width="30" alt="MySQL"></td>
    </tr>
    <tr>
        <th class="cttiNoBorder" align="right" style="font-size: 20px;text-align: right;"><strong>IaaS</strong></th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="../../catalegCloud/img/iaas.png" width="30" alt="IaaS"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
</table>
<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)
</div>

### **2.1. Cloud Privat** {#CloudPrivat}

#### **2.1.1. CaaS** {#CaaS}

El CTTI disposa de 5 opcions per poder desplegar solucions basades en contenidors. En totes elles el proveïdor ofereix el marc (o plataforma d’orquestració) on es desplegaran i gestionaran els contenidors. Hi ha tres tecnologies d’orquestració:

* Openshift
* Kubernetes
* Swarm

Qualsevol de les opcions tecnològiques d’orquestració permet, malgrat les seves particularitats, als equips de desenvolupament carregar, organitzar, executar, escalar, gestionar i aturar els contenidors mitjançant la virtualització basada en contenidors.A les bases de dades sobre contenidors les anomenem DBaaS, atès a què s’ofereixen amb una capa de gestió addicional per simplificar-ne l’operació i administració.

El tarifari de les solucions de contenidors es basa en: 

* La memòria total requerida pel sistema d’informació que ha d’hostatjar (assignació a nivell de namespace). Es a dir que cal considerar la memòria agregada de tots els contenidors a utilitzar. Igualment caldrà que, en el moment de desplegament, tinguin uns límits de CPU i RAM definits.
* L’adició de serveis d’administració per part de CPD en cas que sigui necessari.
* L’emmagatzematge persistent a afegir al sistema d’informació.
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
        <td style="font-size: 16px;"><div align="center"><strong>250</strong></td>
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
        <td style="font-size: 16px;"><div align="center"><strong>54</strong><div style="font-size: 9px;font-style: italic;">1</div></td>
        <td style="font-size: 16px;"><div align="center"><strong>512</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>108</strong><div style="font-size: 9px;font-style: italic;">1</div></td>
        <td style="font-size: 16px;"><div align="center"><strong>1024</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>216</strong><div style="font-size: 9px;font-style: italic;">1</div></td>
        <td style="font-size: 16px;"><div align="center"><strong>2048</strong></td>
        <td style="font-size: 16px;"><div align="center"><strong>432</strong><div style="font-size: 9px;font-style: italic;">1</div></td>
    </tr>
</table>

<div style="font-size: 10px;font-style: italic;">
(1): En procés d’ampliar la proporció a 1 GB:1000 milicores
</div>

* Es poden sol·licitar serveis d’administració per elements de programari desplegats a la plataforma(*).
* L’emmagatzematge persistent se sol·licita amb les mateixes consideracions que el de la resta d’elements de catàleg de CPD.

<div style="font-size: 10px;font-style: italic;">
(*): Cal que, paral·lelament als serveis de CPD, el producte estigui certificat per CS Cloud per disposar dels automatismes de l’entorn d’integració contínua.
</div>


**CaaS: tecnologies homologades**

Essencialment, qualsevol tecnologia que suporti l’ús de contenidors pot desplegar-se sobre les plataformes d’orquestració.

* El CTTI disposa d’un catàleg d’imatges docker homologades ([https://canigo.ctti.gencat.cat/cloud-caas/cataleg-contenidors/](https://canigo.ctti.gencat.cat/cloud-caas/cataleg-contenidors/)) on s’hi poden trobar els elements amb més demanda per la capa d’aplicació. 
* DBaaS: la informació dels elements disponibles es pot consultar a ([https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/](https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/)) en la secció de núvol privat.
* Per tecnologies o productes no catalogats, es poden aportar imatges de fora de catàleg tenint en compte les consideracions indicades pel CTTI ([https://canigo.ctti.gencat.cat/cloud-caas/dockerImages/](https://canigo.ctti.gencat.cat/cloud-caas/dockerImages/)).

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


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


#### **2.1.2. DBaaS** {#DBaaS}

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
        <th class="cttiNoBorder" width="33%" style="font-size: 16px;"><div align="center"><strong>Grup de Tecnologia</strong></th>
        <th class="cttiNoBorder" width="34%" style="font-size: 16px;"><div align="center"><strong>Producte</strong></th>
        <th class="cttiNoBorder" width="33%" style="font-size: 16px;"><div align="center"><strong>Plataformes disponibles</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>CaaS - Servidors web</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/apache.png" width="44" alt="Apache"> <img src="../../catalegCloud/img/nginx.png" width="44" alt="NGinx"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/swarm.png" width="44" alt="SwarmMe"> <img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Kubernetes"> <img src="../../catalegCloud/img/openshift.png" width="44" alt="Openshift"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>CaaS - Servidors d'aplicacions</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/java.png" width="44" alt="Java"> <img src="../../catalegCloud/img/nodejs.png" width="44" alt="NodeJS"> <img src="../../catalegCloud/img/php.png" width="44" alt="PHP"> <img src="../../catalegCloud/img/tomcat.png" width="44" alt="Tomcat"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/swarm.png" width="44" alt="SwarmMe"> <img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Kubernetes"> <img src="../../catalegCloud/img/openshift.png" width="44" alt="Openshift"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>CaaS - Bases de Dades (DBaaS)</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/postgresql.png" width="44" alt="PostgreSQL"> <img src="../../catalegCloud/img/mysql.png" width="44" alt="MySQL"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/openshift.png" width="44" alt="Openshift"></td>
    </tr>
</table>


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


#### **2.1.3. SIC: Desplegament d'aplicacions CaaS** {#SIC}

**Integració de contenidors al SIC:**

* Informació necessària:
    * Elements comuns:
        * Nom del repositori git del codi font.
        * En cas de necessitats de compilació, requeriments i instruccions al respecte.
        * Nom de la imatge docker (la versió s’agafa del fitxer sic.yml)
        * Path del fitxer Dockerfile.
        * Llista de correus electrònics en cas de notificacions de Jenkins.
* Elements específics per Openshift i/o Kubernetes: nom del repositori git dels descriptors i nom del descriptor de desplegament de Kubernetes/Openshift.
* Elements específics per SwarmMe: Com que no disposa de descriptors, cal proporcionar: namespace, xarxa, mida del contenidor, domini, port, rèpliques, etc.

**Tasques d’operació disponibles al SIC:**

* Kubernetes i Openshift:
    * Desplegament
    * Desplegament de tags
    * Reinici
    * Parada
    * Arrancada
    * Desplegament de ConfigMaps
    * Actualització d’algunes propietats dels descriptors de deployment/deploymentConfig
* SwarmMe:
    * Desplegament


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


### **2.2. Cloud Públic** {#CloudPublic}

Actualment el CTTI disposa de 2 opcions per desplegar sistemes d’informació sobre núvol públic; Azure i IBM Cloud.

En el núvol públic hi podem desplegar tres tipologies principals de serveis:

* **xPaaS:** és un nivell superior d’abstracció que els contenidors. Són els motors d’execució auto-gestionats sobre els que es poden configurar determinades opcions (normalment referents a la potència mínima i es límits d’escalabilitat). 
* **DBaaS:** anàlogament al cas de contenidors, es tracta del cas particular de l’xPaaS en què el programari ofert com a servei és una base de dades.
* **IaaS:** infraestructura com a servei - màquina virtual amb sistema operatiu inclòs desplegada sobre núvol públic.


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


#### **2.2.1. Catàleg de Serveis** {#CatalegServeis}

##### **2.2.1.1. xPaaS** {#xPaaS}

El tarifari associat al núvol públic és específic de l’element a sol·licitar i de l’ús que se’n faci durant la vida del sistema d’informació.

**xPaaS:** la informació dels elements disponibles es pot consultar a [https://canigo.ctti.gencat.cat/cloud-xpaas/cataleg-xpaas/](https://canigo.ctti.gencat.cat/cloud-xpaas/cataleg-xpaas/)

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="33%" style="font-size: 16px;"><div align="center"><strong>Plataforma</strong></th>
        <th class="cttiNoBorder" width="34%" style="font-size: 16px;"><div align="center"><strong>Productes</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>IBMCLoud Runtimes</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/javaliberty.png" width="44" alt="Java Liberty"> <img src="../../catalegCloud/img/python.png" width="44" alt="Python"> <img src="../../catalegCloud/img/ruby.png" width="44" alt="Ruby"> <img src="../../catalegCloud/img/nginx.png" width="44" alt="NGinx"> <img src="../../catalegCloud/img/php.png" width="44" alt="PHP"> <img src="../../catalegCloud/img/nodejs.png" width="44" alt="NodeJS"> <img src="../../catalegCloud/img/go.png" width="44" alt="Go"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Azure App Services</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/microsoftnet.png" width="44" alt="Microsoft .Net"> <img src="../../catalegCloud/img/python.png" width="44" alt="Python"> <img src="../../catalegCloud/img/java.png" width="44" alt="Java"> <img src="../../catalegCloud/img/php.png" width="44" alt="PHP"> <img src="../../catalegCloud/img/nodejs.png" width="44" alt="NodeJS"></td>
    </tr>
</table>

**Consideracions tècniques generals**

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


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


##### **2.2.1.2. DBaaS** {#CatalegServeis}

**DBaaS:** la informació dels elements disponibles es pot consultar a https://canigo.ctti.gencat.cat/cloud-dbaas/cataleg-dbaas/ en la secció de núvol públic.

**Consideracions tècniques generals**

Les bases de dades com a servei són un cas concret de xPaaS on:

* La DB és una “commodity”: no hi ha administració. De fet, és transparent on i com corre.
* Escala automàticament segons els requeriments (volum, índexos, …)
* El desenvolupador, amb les credencials d’accés, bàsicament guarda i recupera registres.

Les versions de les BBDD no les governa el CTTI, si no el proveïdor que ofereix el SaaS, per tant, l’actualització de les versions no és negociable.
<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


##### **2.2.1.3. IaaS** {#CatalegServeis}

**IaaS:** infraestructura com a servei - màquina virtual amb sistema operatiu inclòs desplegada sobre núvol públic.

Es poden sol·licitar1 altres elements disponibles als núvols públics que es posen a disposició de les ATIC que no estiguin homologats sempre i quan l’ATIC es faci responsable d’assumir el cost que generi.

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;">
    <tr>
        <th class="cttiNoBorder" width="50%" style="font-size: 16px;"><div align="center"><strong>Plataforma</strong></th>
        <th class="cttiNoBorder" width="50%" style="font-size: 16px;"><div align="center"><strong>Productes</strong></th>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Compose</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/postgresql.png" width="44" alt="PostgreSQL"> <img src="../../catalegCloud/img/mongodb.png" width="44" alt="MongoDB"> <img src="../../catalegCloud/img/redis.png" width="44" alt="Redis"> <img src="../../catalegCloud/img/elasticsearch.png" width="44" alt="ElasticSearch"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>IBMCLoud</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/postgresql.png" width="44" alt="PostgreSQL"> <img src="../../catalegCloud/img/mongodb.png" width="44" alt="MongoDB"> <img src="../../catalegCloud/img/elasticsearch.png" width="44" alt="ElasticSearch"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><strong>Azure</strong></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/microsoftnet.png" width="44" alt="Microsoft .Net"> <img src="../../catalegCloud/img/python.png" width="44" alt="Python"> <img src="../../catalegCloud/img/sqlserver.png" width="44" alt="SQLServer"> <img src="../../catalegCloud/img/php.png" width="44" alt="PHP"> <img src="../../catalegCloud/img/nodejs.png" width="44" alt="NodeJS"></td>
    </tr>
</table>

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


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


##### **2.2.1.4. Storage** {#CatalegServeis}

**Consideracions tècniques generals**

* **IBMCloud:** File Storage associat a contenidors com a PVC.
* **Azure:** Disc gestionat associat a màquina o crear un Storage Account que es pot compartir entre màquines.


<div style="font-size: 9px;">

[Inici] (#TaulaContiguts)

</div>


## **3. Governança** {#Governança}

### **3.1. Monitorització, logs i traces** {#MonitoritzacioLogsTraces}

Al desplegar una aplicació en contenidors es proporciona a lot d’aplicacions un usuari amb permisos de lectura de les traces del seu projecte.

<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:70%;border-style:none;">
    <tr>
        <td width="10%" style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/openshift.png" width="44" alt="Openshift"></td>
        <td width="90%" style="font-size: 16px;"><div align="left">Des de la consola web de les diferents plataformes es pot consultar de cada projecte la següent informació:</div>
        <div align="left">1. Estat dels desplegaments</div>
        <div align="left">2. Estat dels pods</div>
        <div align="left">3. Mètriques dels pods</div>
        <div align="left">4. Logs dels pods</div>
    </td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kibana.png" width="44" alt="Kibana"></td>
        <td style="font-size: 16px;"><div align="left">Les plataformes que ofereixen Kibana poden veure els logs dels seus pods en temps reals amb una retenció de 30 dies.</div></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/grafana.png" width="44" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="left">Accés via Grafana a les mètriques bàsiques d’un contenidor (CPU, RAM i xarxa).</div></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Kubernetes"></td>
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
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/openshift.png" width="44" alt="Openshift"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/prometheus.png" width="44" alt="Prometheus"> <img src="../../catalegCloud/img/grafana.png" width="44" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kibana.png" width="44" alt="Kibana"></td>
        <td style="font-size: 16px;"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/ibmcloud.png" width="44" alt="Openshift"> <img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Kubernetes"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/prometheus.png" width="44" alt="Prometheus"> <img src="../../catalegCloud/img/grafana.png" width="44" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Kubernetes"></td>
        <td style="font-size: 16px;"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kubernetes.png" width="44" alt="Openshift"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/prometheus.png" width="44" alt="Prometheus"> <img src="../../catalegCloud/img/grafana.png" width="44" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../catalegCloud/img/kibana.png" width="44" alt="Kibana"></td>
        <td style="font-size: 16px;"></td>
    </tr>
    <tr>
        <td style="font-size: 16px;"><div align="center"><img src="./img/swarm.png" width="44" alt="Openshift"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../img/prometheus.png" width="44" alt="Prometheus"> <img src="../../catalegCloud/img/grafana.png" width="44" alt="Grafana"></td>
        <td style="font-size: 16px;"><div align="center"><img src="../../img/kibana.png" width="44" alt="Kibana"></td>
        <td style="font-size: 16px;"></td>
    </tr>
</table>

<div style="font-size: 10px;font-style: italic;">
(*)Si es vol afegir una monitorització específica, es pot implementar un Prometheus y Grafana propi de l’aplicació. Es poden fer servir els templates que Suport Cloud ofereix. Cal recordar que s’ha d’aprovisionar disc persistent per Prometheus.
</div>

<div style="font-size: 10px;font-style: italic;">
(**)Tots els proveïdors ofereixen monitorització i logs a nivell d’aplicació (mètriques genèriques). En el cas de les traces, només la instal·lació d’Istio sobre Openshift permetrà la visualització de traces
</div>

#### **3.1.1. Openshift amb Istio** {#OpenshiftAmbIstio}

Openshift amb Istio

### **3.2. Ticketing/Incidental** {#TicketingIncidental}

Ticketing/Incidental

## **4. Annexes** {#Annexes}

Annexes

### **4.1. SaaS sobre contenidors** {#SaaSsobreContenidors}

SaaS sobre contenidors

#### **4.1.1. Service Mesh** {#ServiceMesh}

Service Mesh

#### **4.1.2. API Manager** {#APIManager}

API Manager
