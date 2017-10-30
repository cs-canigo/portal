+++
date          = "2017-11-02"
title         = "Orquestradors de contenidors"
description   = "Consideracions respecte als orquestradors de contenidors"
sections      = "Container Cloud"
weight        = 6
categories    = ["cloud","docker","container","paas","openshift","kubernetes","swarm"]
+++
## Introducció

En un entorn productiu, el desplegament utilitzant contenidors, moltes vegades no és suficient, és necessari disposar d'un conjunt de recursos addicionals que siguin capaços d'oferir un nivell de servei prou bo.
Aquests recursos són oferts pels orquestradors.
Al mercar existeixen diferents eines per orquestrar els contenidors docker.
La Generalitat de Catalunya dóna suport als següents orquestradors:
* AppAgile (basat en Openshift)
* Kubernetes
* SwarmMe (basat en Swarm)

Tot i que conceptualment tenen molts punts en comú, cadascun d'aquests orquestradors presenta components i maneres de treballar particulars.
En aquest article es defineix la manera de treballar i els components a utilitzar en cada orquestrador amb l'objectiu de minimitzar l'esforç necessari.

## Aspectes bàsics
En un entorn productiu de contenidors, cal tenir present un conjunt d'aspectes més enllà dels propis contenidors.
Els orquestradors ens ajudaran a assolir alguns dels següents aspectes.

### Registre
Les imatges de contenidors, un cop creades a partir del Dockerfile, cal repositar-les en un registre.
Docker ofereix un registre públic amb imatges de tot tipus oferides per fabricants de productes i col·laboradors particulars. És el [Docker Hub](https://hub.docker.com/).
Per repositar les imatges privades fruit dels diferents desenvolupaments de projectes, cal tenir un registre privat que només permeti accedir a les imatges als usuaris autoritzats.

### Seguretat
Els contenidors docker s'executen sobre el Docker Engine. Tot i que els contenidors són bastant segurs i cap a fora de la màquina on s'executen només exposen els ports que es defineixen al Dockerfile, si tenim diverses aplicacions, cadascuna amb diversos contenidors cal afegir una capa de seguretat entre elles.
Addicionalment cal establir una capa de seguretat a la gestió de les diferents aplicacions de manera que cada aplicació pugui ser administrada per un tenant sense que altres tenants puguin accedir a ella. 

### Alta disponibilitat i escalat
Els contenidors docker en si, no ofereixen alta disponibilitat. No està inclòs al concepte de contenidor. La idea per alta disponibilitat és realitzar escalat horitzontal de 2 o més contenidors idèntics.
És necessari un component extern que controli el nombre de contenidors aixecats contínuament.

### Balanceig
Quan es disposen de més d'un contenidor d'un tipus, és necessari disposar d'un element que faci balanceig entre els diversos contenidors.

### Serveis
Els contenidors de docker s'exposen com a serveis a través de paràmetres a la comanda d'execució dels contenidors, mapejant ports interns del container amb ports externs del host. És necessària una capa addicional que permeti gestionar d'una manera una mica més àgil i flexible aquesta exposició.  

### Enrutament
Addicionalment al balanceig, és necessari disposar d'un element enrutador que permeti:
* Configurar certificats SSL
* Enrutar el transit entre diferents xarxes per oferir per exemple serveis només intranet o internet

### Emmagatzematge
L'emmagatzematge als contenidors s'estableix a través dels volums. És necessària una gestió addicional dels mateixos que ofereixin una millor granularitat a l'hora de proveir l'emmagatzematge des de diferents fonts.

### Monitorizació de recursos i logs
Els contenidors Docker normalment es configuren per a què els logs s'enviïn a la sortida estàndard. Quan existeix un volum elevat de containers, la monitorització es pot complicar molt. És necessària algun tipus d'eina que faciliti aquesta monitorització.

### Quotes
Els contenidors dockers, no tenen cap tipus de quota definida. Poden consumir tots els recursos de maquinari que requereixin. Per garantir l'estabilitat dels entorns productius, és necessari que hi hagi algun component que pugui limitar el consum de recursos de cada contenidor.

### Desplegament
Actualment els cicles de vida de desenvolupament d'aplicacions van cap a models CI/CD i DevOps.
La Generalitat de Catalunya disposa de l'eina SIC per realitzar els desplegaments.
Són necessàries eines que facilitin la integració d'un model de basat en contenidors amb eines de CI/CD com el SIC. 

## Comparativa entre orquestradors

### Característiques

|  Característica |  AppAgile | Kubernetes  | SwarmMe  |
|-----------------|:---------:|:-----------:|:--------:|
| Registre  |  X | -  |  X |
| Seguretat  | X  |  X | X  |
| Alta disponibilitat i escalat  | X  | X  | X  |
| Balanceig  | X  | X | X |
| Serveis | X | X | X |
| Enrutament | X  | X  | - |
| Emmagatzematge | X | X | - |
| Monitorizació de recursos i logs | X | X | X |
| Quotes | X | X | - |
| Desplegament | X | X | X |

### Components

Al següent diagrama es descriu:

* Principals components de cada orquestrador
* Correspondències entre els components de cada orquestrador
* Components permesos a la Generalitat de Catalunya  

![comparativa entre Orquestradors docker](/related/cloud/comparativaOrquestradors.png)

## Descripció dels orquestradors
### SwarmMe
Està basat en Swarm.
Swarm és l'orquestrador oficial de docker. Actualment és el menys evolucionat dels tres.
SwarmMe complementa alguna de les mancances que Swarm presenta (Registre, Sistema centralitzat de logs, eines de desplegament, ...)

Per més informació podeu consultar https://docs.docker.com/engine/swarm/ .

### Kubernetes
Va ser creat per Google.
Actualment està evolucionant molt.
Recentment ha rebut el suport oficial de docker.
Per més informació podeu consultar la web https://kubernetes.io/ .

### AppAgile
AppAgile està basat en Openshift Container Platform.
Desenvolupat per Red Hat, basat en Kubernetes.
Afegeix funcionalitat addicional a Kubernetes (gestió d'usuaris, segmentació de xarxa, sistema centralitzat de logs).
Acostuma a portar un endarreriment respecte a l'última versió de kubernetes d'uns tres o quatre mesos.

Per detalls i exemples podeu visitar la plana http://canigo.ctti.gencat.cat/drafts/contenidors_appagile/.

Per més informació podeu consultar les webs http://appagile.io/ i https://docs.openshift.com/container-platform/3.4/ .

## Imatges
A l'hora de construir les imatges docker, cal tenir present els criteris definits per la Generalitat de Catalunya i que cada orquestrador, tot i que totes les plataformes es basen en docker, té les seves particularitats.

A la plana [Criteris creació contenidors docker](http://canigo.ctti.gencat.cat/cloud/dockerImages/) podeu trobar més informació al respecte. 


