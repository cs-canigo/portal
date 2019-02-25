+++
date        = "2019-02-25"
title       = "Monitoratge i traces a les plataformes IaaS"
description = "Informació per accedir al monitoratge i traces a les diferents plataformes IaaS."
sections    = "IaaS Cloud"
weight      = 3
categories  = ["cloud","iaas","azure"]
+++

Dins del marc de la metodologia DevOps, s'ofereixen a lot d'aplicacions un conjunt d'eines per a que monitorin i tinguin accés a les traces de les diferents plataformes IaaS.

A continuació es descriuen les diferents eines a cadascuna de les plataformes disponibles.

## Azure

Al desplegar una aplicació a Azure, es proporciona a lot d'aplicacions permisos de **lectura** del seu projecte pels usuaris GICAR que sol·liciti.

### Monitoratge

Des de la [consola d'Azure](https://portal.azure.com/), és tindrà accés de lectura de les diferents aplicacions.

Des d'allà es pot consultar de cada Grup de recursos la següent informació:

- Configuració dels diferents elements:
  - Maquines virtuals
  - Xarxa
  - Security Groups
  - Balancejadors
  - IP's
  - ...
- Mètriques de consum de recursos del les màquines virtuals amb una retenció de 30 dies.

### Logs

Des de la consola d'Azure es poden veure els següents logs:

- Logs d'arrancada de les màquines virtuals.
- Logs del sistema operatiu.

La gestió dels logs d'aplicacions, al tractar-se d'un entorn IaaS on només es gestiona la infraestructura i no les aplicacions dependrà del lot d'aplicacions.
