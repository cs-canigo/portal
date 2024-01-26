---
title: Tipologies Cloud
description: Descripció dels diferents tipus de cloud i les seves
  característiques més importants
date: 2024-01-12
sections: Cloud
categories:
  - cloud
  - docker
  - container
  - paas
  - openshift
  - kubernetes
  - swarm
  - azure
aliases:
  - /cloud/tipologies-cloud/
weight: 1
---

Bàsicament es poden distingir 3 tipus de cloud:

- Cloud públic
- Cloud privat
- Cloud hibrid

### Cloud públic

Els servidors de cloud estan allotjats a instalacions de tercers i tot i que en alguns casos els recursos són d'us exclusiu, la major part de vegades els recursos són compartits.

La connexió als clouds públics es realitza a traves d'internet o alguna VPN.

Característiques:

- Multitud de serveis gestionats
- Millores de costos altes
- Escalabilitat i flexibilitat molt altes
- Resposta bona davant de pics de demanda
- Modular i escalable

### Cloud privat

Els servidors de cloud estan allotjats a instalacions propies o a centres de dades dedicats d'ús exclusiu.

La connexió als clouds privats es realitza a traves de la xarxa interna de la empresa.

Característiques:

- Integració amb la operativa de l'empresa senzilla
- Millores de costos moderades
- Escalabilitat i flexibilitat limitades
- Riscos d'obsolescència
- Resposta limitada davant de pics de demanda
- Normalment a mida


### Cloud hibrid

Es una barreja del entre els dos models anteriors, part dels recursos estan en cloud públic i part dels recursos estan en cloud privat.

- Integració amb la operativa de l'empresa mitja
- Millores de costos intermèdies
- Escalabilitat i flexibilitat mitges
- Adequat per escenaris de desbordament
- Normalment a mida

## Tipologies Cloud segons el nivell de servei

Dins del món cloud existeixen diferents tipus de cloud en funció del nivell de servei que ofereixen.

Es poden distingir diferents tipologies de serveis cloud:

- SaaS: Software com a servei
- Computació:
  - FaaS: Funcions com a servei
  - PaaS: Plataforma com a servei
  - CaaS: Contenidors com a servei
- DBaaS: Base de dades com a servei
- IaaS: Infraestructura com a servei

A banda, existeixen moltíssims altres serveis empaquetats i gestionats pel proveïdor de cloud: sistemes de notificacions, cues, workflows, events, ....

![Tipus de cloud](/related/cloud/tipusCloud.png) 

### SaaS

Anomenarem així als serveis, que:

- Estan desplegats i s’executen a infraestructura cloud.
- El servei és compartit entre tots els usuaris.
- Els usuaris només consumeixen el servei. No tenen capacitat de control o administració del mateix, més enllà de configuració a nivell d’usuari.

### FaaS

Anomenarem així als entorns d’execució, que:

- Són l'expressió mínima d'un microservei: rep una entrada i executa una sortida.
- Estan orientades a events. 
- No ens preocupem per l'escalabilitat
- Com a molt, indiquem la mida de la funció (en RAM consumida).

### PaaS

Anomenarem així als entorns d’execució, que:

- Són un nivell extra per sobre de la containerització
- Contenen un motor d’execució (p.e. un servidor d’aplicacions) on posarem la nostra aplicació o funcionalitat
- Configurarem:
  - la potència: cpu/ram
  - la política d'escalat

### CaaS

Anomenarem així als entorns d’execució, que:

- L'element d'empaquetat és el contenidor i el proporciona el desenvolupador.
- Configurarem:
  - la potència: cpu/ram
  - la política d'escalat

### DBaaS

Les bases de dades com a servei són un cas concret de xPaaS on:
  
- la db és una commodity: no hi ha administració, de fet, és transparent on i com corre
- escala automàticament segons els requeriments (volum, índexos, ...)
- el desenvolupador, amb les credencials d’accés, bàsicament guarda i recupera registres

### IaaS

- S’aprovisiona infraestructura fins a nivell de Sistema Operatiu.
- Inclou la instal·lació del sistema operatiu, però no el seu manteniment.
- El desenvolupador no gestiona el maquinari, però si tot el programari.
- El desenvolupador disposa de credencials d’administrador per gestionar el servidor com consideri oportú.
- El desenvolupador és responsable d’instal·lar i mantenir tot el programari necessari.
