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
<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min.js"></script>
<!--<script type="text/javascript" language="javascript" src="catalegCloud.js"></script>-->

# **Taula de Continguts** {#TaulaContiguts}

1. [Introducció] (#Introduccio)
2. [Situació actual] (#SituacioActual)
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

## **2. Situació actual** {#SituacioActual}

A la figura es mostren a molt alt nivell les solucions, les tecnologies disponibles i on es poden desplegar:
<table cellpadding="7" cellspacing="1" style="padding-left:50px;border-collapse:collapse;width:90%;">
    <tr>
        <th style="border-style: none;"></th>
        <th colspan="3" style="font-size: 16px;"><strong>Públic (Internet)</strong></th>
        <th colspan="4" style="font-size: 16px;"><strong>Privat (Intranet)</strong></th>
    </tr>
    <tr>
        <th width="9%" style="border-style: none;"></th>
        <th width="13%" style="font-size: 14px;"><div align="center">Compose</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">IBM Cloud</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">Azure</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">CPD1</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">CPD2</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">CPD3</div></th>
        <th width="13%" style="font-size: 14px;"><div align="center">CPD4</div></th>
    </tr>
    <tr>
        <th align="right" style="border-style: none;"><strong>SaaS</th>
        <td align="center"></td>
        <td align="center"><img src="apiconnect.png" width="24" height="24" alt="IBM Apiconnect"></td>
        <td align="center"><img src="./powerapps.png" width="24" height="24" alt="PowerApps"> <img src="./dynamics365.png" width="24" height="24" alt="Swarm"> <img src="./cdn.png" width="24" height="24" alt="CDN"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <th align="right" style="border-style: none;"><strong>CaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="./kubernetes.png" width="24" height="24" alt="Kubernetes"></td>
        <td align="center"></td>
        <td align="center"><img src="./swarm.png" width="24" height="24" alt="Swarm"> <img src="./kubernetes.png" width="24" height="24" alt="Kubernetes"></td>
        <td align="center"><img src="./kubernetes.png" width="24" height="24" alt="Kubernetes"> <img src="./openshift.png" width="24" height="24" alt="Openshift"></td>
        <td align="center"><img src="./openshift.png" width="24" height="24" alt="Openshift"></td>
        <td align="center"><img src="./openshift.png" width="24" height="24" alt="Openshift"></td>
    </tr>
    <tr>
        <th align="right" style="border-style: none;"><strong>xPaaS</strong></th>
        <td align="center"></td>
        <td align="center"><img src="./javaliberty.png" width="24" height="24" alt="JavaLiberty"> <img src="./python.png" width="24" height="24" alt="Python"> <img src="./ruby.png" width="24" height="24" alt="Ruby"> <img src="./nginx.png" width="24" height="24" alt="NGinx"> <img src="./php.png" width="24" height="24" alt="Php"> <img src="./nodejs.png" width="24" height="24" alt="NodeJS"> <img src="./go.png" width="24" height="24" alt="Go"></td>
        <td align="center"><img src="./microsoftnet.png" width="24" height="24" alt="Microsoft .Net"> <img src="./python.png" width="24" height="24" alt="Python"> <img src="./java.png" width="24" height="24" alt="Java"> <img src="./php.png" width="24" height="24" alt="Php"> <img src="./nodejs.png" width="24" height="24" alt="NodeJS"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="./istio.png" width="24" height="24" alt="Istio"></td>
        <td align="center"><img src="./istio.png" width="24" height="24" alt="Istio"></td>
    </tr>
    <tr>
        <th align="right" style="border-style: none;"><strong>DBaaS</strong></th>
        <td align="center"><img src="./postgresql.png" width="24" height="24" alt="PostgreSQL"> <img src="./mongodb.png" width="24" height="24" alt="MongoDB"> <img src="./elasticsearch.png" width="24" height="24" alt="ElasticSearch"></td>
        <td align="center"><img src="./postgresql.png" width="24" height="24" alt="PostgreSQL"> <img src="./mongodb.png" width="24" height="24" alt="MongoDB"> <img src="./redis.png" width="24" height="24" alt="Redis"> <img src="./elasticsearch.png" width="24" height="24" alt="ElasticSearch"></td>
        <td align="center"><img src="./postgresql.png" width="24" height="24" alt="PostgreSQL"> <img src="./sqlserver.png" width="24" height="24" alt="SQLServer"> <img src="./mysql.png" width="24" height="24" alt="MySQL"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="./postgresql.png" width="24" height="24" alt="PostgreSQL"> <img src="./mysql.png" width="24" height="24" alt="MySQL"></td>
    </tr>
    <tr>
        <th align="right" style="border-style: none;"><strong>IaaS</strong></th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="./iaas.png" width="24" height="24" alt="IaaS"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
</table>

## **3. Governança** {#Governança}

### **3.1. Monitorització, logs i traces** {#MonitoritzacioLogsTraces}

Al desplegar una aplicació en contenidors es proporciona a lot d’aplicacions un usuari amb permisos de lectura de les traces del seu projecte.

#### **3.1.1. Openshift amb Istio** {#OpenshiftAmbIstio}

### **3.2. Ticketing/Incidental** {#TicketingIncidental}

## **4. Annexes** {#Annexes}

### **4.1. SaaS sobre contenidors** {#SaaSsobreContenidors}

#### **4.1.1. Service Mesh** {#ServiceMesh}

#### **4.1.2. API Manager** {#APIManager}
