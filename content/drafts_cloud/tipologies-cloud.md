+++
date        = "2019-02-25"
title       = "Tipologies Cloud"
description = "Descripció dels diferents tipus de cloud i les seves característiques més importants"
sections    = "Cloud"
categories  = ["cloud","docker","container","paas","openshift","kubernetes","swarm","azure"]
weight = 1
+++

Bàsicament es poden distingir 3 tipus de cloud:

- Cloud públic
- Cloud privat
- Cloud hibrid

### Cloud públic

Els servidors de cloud estan allotjats a instalacions de tercers i tot i que en alguns casos els recursos són d'us exclusiu, la major part de vegades els recursos són compartits.

La connexió als clouds públics es realitza a traves d'internet o alguna VPN.

Característiques:

- Integració amb la operativa de l'empresa complexa
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

Bàsicament es poden distingir 5 tipus de cloud:

- SaaS
- xPaaS
- DBaaS
- CaaS
- IaaS

![Tipus de cloud](/related/cloud/tipusCloud.png) 

### SaaS

Anomenarem així als serveis, que:

- Estan desplegats i s’executen a infraestructura cloud.
- El servei és compartit entre tots els usuaris.
- Els usuaris només consumeixen el servei. No tenen capacitat de control o administració del mateix, més enllà de configuració a nivell d’usuari.

### xPaaS

Anomenarem així als entorns d’execució, que:

- Són un nivell extra per sobre de la containerització
- Contenen un motor d’execució (p.e. un servidor d’aplicacions) on posarem la nostra aplicació o funcionalitat
- Configurarem:
  - la potència: cpu/ram
  - el nombre d’instàncies que correran en paral·lel per a aconseguir més concurrència

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

