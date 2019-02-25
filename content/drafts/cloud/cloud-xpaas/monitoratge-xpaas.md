+++
date        = "2019-02-25"
title       = "Monitoratge i traces a les plataformes xPaaS"
description = "Informació per accedir al monitoratge i traces a les diferents plataformes xPaaS."
sections    = "xPaaS Cloud"
weight      = 3
categories  = ["cloud","xpaas","ibmcloud","azure","cloudfoundry"]
+++

# Monitoratge i traces a les plataformes xPaaS

Dins del marc de la metodologia DevOps, s'ofereixen a lot d'aplicacions un conjunt d'eines per a que monitorin i tinguin accés a les traces de les diferents plataformes xPaaS.

A continuació es descriuen les diferents eines a cadascuna de les plataformes disponibles.

## IBMCloud BuildPacks

Al desplegar una aplicació a IBMCloud BuildPack, es proporciona a lot d'aplicacions permisos de **lectura** del seu projecte pels usuaris d'IBMCloud que sol·liciti.

### Monitoratge

Des de la [consola d'IBMCloud](https://cloud.ibm.com/), a l'apartat corresponent a **CloudFoundry** és tindrà accés de lectura de les diferents aplicacions.

Des d'allà es pot consultar de cada projecte la següent informació:

- Configuració dels diferents elements:
  - Buildpack
  - Nombre d'instàncies
  - Memòria de cada instància
  - Serveis connectats
  - Routes
  - ...
- Mètriques de consum en temps real
- Logs de les aplicacions


Podeu trobar més informació al respecte a [IBMCloud Cloud Foundry.](https://www.ibm.com/cloud/cloud-foundry)


### Logs

Des de la plataforma de Cloud Foundry els logs dels pods en temps real. Si necessiteu accedir a logs anteriors o de buildpacks que ja no existeixi, està disponible un Kibana amb tots els logs de l'aplicació amb una retenció de 3 dies i 500Mb màxim per dia.

Podeu accedir al Kibana directament des de la Plataforma de Cloud Foundry, a l'apartat de logs polsant el botó **View in Kibana.**

## Azure

Pendent de definir.