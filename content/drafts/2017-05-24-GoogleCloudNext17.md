+++
date        = "2017-05-24"
title       = "Google Cloud Next 17"
description = "Novetats Google Cloud Next 17"
sections = []
blog_tags = ["google", "kubernetes"]
imatge = "/images/bloc/GC17.png"
aliases = [
"/bloc/2017/05/GC17/"
]
key         = "MAIG2017"
+++

![GoogleNext17](/images/bloc/GC17.png)

Google Cloud Next 17 és l'esdeveniment que va organitzar Google a San Francisco els dies 8, 9 i 10 de març. En aquest esdeveniment es presenten les novetats amb vocació empresarial al cloud, tan en el que respecta a lloc de treball (GSuite), com a nivell de construcció i desplegament d'aplicacions (Google Cloud Platform).

![GSuite](/images/bloc/Imatge1.png)

La solució de Google al treball col.laboratiu en cloud amb vocació empresarial és [GSuite](https://gsuite.google.es/) . Les principals novetats en aquest producte van ser:

## Team Drive 
Similar a Google Drive però amb vocació corporativa. [Team Drive](https://www.youtube.com/watch?v=ywBuQZOHX-E) permetrà veure'l com a unitat local tot i no estar sincronitzat. La diferència principal amb Google Drive es que els documents emmagatzemats no pertanyen a una persona, sinó a la corporació. 

## App Maker
Entorn de desenvolupament d'aplicacions JavaScript internes orientades a gestió de dades a l'abast dels usuaris funcionals. Permet utilitzar plantilles així com les APIs propies de Google per a dotar de funcionalitat les aplicacions de manera senzilla. [App Maker](https://www.youtube.com/watch?v=Br6aNwDXDgQ)

<!--[Toni: quina utilitat té a nivell empresa? Necessites un navegador? és scripting a com el gscript que hi ha a Spreadsheets? Ho pots explicar?]-->

## Jamboard 
Pissarra que permet col·laboració en temps real a través de Hangouts.
![Jamboard](/images/bloc/jamboard.jpg)

![GCPlatform](/images/bloc/Imatge3.png)

Pel que respecte a les plataformes cloud que ofereix Google, van presentar les següents novetats:
2
## Plataformes d'execució
Disposen de diferents opcions en que els integradors tenen més o menys graus de llibertat:

- **AppEngines**. Motors d'execució gestionats per Google i utilitzats com a servei on sols es desplega els recursos de l'aplicació, sigui codi o dades.
- **Contenidors**. Desplegament de contenidors a través de l'orquestrador **Kubernetes**. 
- **Infraestructura**. Potència a nivell de SO. Equivalent a un element IaaS, on sols es proporciona un SO.
- **Cloud Functions**. Presentada en l'esdeveniment en estat beta. Té característiques similars a la que Amazon presenta com a AWS Lambda. Serveis Serverless, sols s'executa en rebre un event.

Les principals novetats en aquesta categoria es van presentar a Kubernetes.
**Kubernetes** és l'orquestrador de clusters de contenidors opensource desenvolupat per Google. Les seves principals funcionalitats inclouen:

- **Portable**, entre escenaris de cloud públic, privat o híbird
- **Auto-corregit** ,permet auto-ubicar, auto-restart, auto-replica, auto-scaling
- **Balanceig integrat** permet definir regles de balanceig de càrrega entre els recursos 

Algunes de les novetats presentades en la versió 1.6 de Kubernetes son:

- Balanceig Multi-Cluster / multi-zona  N7 amb SSL amb una única IP. Ingress és un recurs Kubernetes que permet encapsular condicions i configuració per a enrutar tràfic extern a serveis interns.
- Nous paràmetres de desplegament:
   - Condicionar el desplegament a la tipologia de hardware sobre el que s'executa:
        - Desplega a la màquina mes barata
        - Desplega a la màquina que té un mínim de prestacions a nivell de maquinari
        - Desplega a la màquina que té un mínim de prestacions a nivell de tipus de disc
  - Aprovisionament dinàmic de volums estàtics 
  - Aplicacions amb estat
  - Federació de clústers ([Kubefed](https://kubernetes.io/docs/tasks/federation/set-up-cluster-federation-kubefed/)) en diverses regions (fins i tot entre on-premise i cloud)
  - Afinitat a pods
  - Afinitat a zones geogràfiques
  - Definició dinàmica de DNS 

## Emmagatzemament de dades
En aquesta categoria, la principal novetat va ser la presentació de [Spanner](https://cloud.google.com/spanner/). Una base de dades relacional com a servei, que permet l'escalat horitzontal a diferents zones de disponibilitat. En l'esdeveniment es va presentar una [demo](https://www.youtube.com/watch?v=AC9xUc4SkvU) amb les següents característiques:

- BBDD desplegada en tres regions Google
- 500.000 ventes [Toni: vendes?] transaccionals per minut
- 3 Bilions [Toni: són bilions americans?] de files
- 80 TB BBDD
- Completament administrada. Replicació, Failover [Toni: failover automàtic?]

## Data Analytics - Machine Learning
És un dels aspectes en que Google aposta fortament. Es van presentar vàries novetats en aquest apartat: 
- **DLP Data Loss Prevention.** Basat en el principi de sols guardar les dades que son necessàries, identifica les dades sensibles de les imatges i les oculta abans de guardar-les.
- **API d'indexació d'imatges**. API que permet categoritzar una imatge en diferents eixos, contingut, detecció de cares, OCR, geogràficament, etc.
- **API d'indexació de vídeos**. API que permet categoritzar un vídeo, a més a més d'identificar el seu contingut i el moment en que apareix. Molt il·lustrativa la demo feta a l'esdeveniment: [API vídeo ](https://www.youtube.com/watch?v=mDAoLO4G4CQ)

## Xarxa
Es van presentar les funcionalitats en la definició de la xarxa en que es va remarcar:
- **La xarxa ha de ser global.** El cloud ha de ser una extensió de la xarxa local per tal de donar alta disponibilitat en diferents zones en format híbrid (part de la infraestructura en local, i part en el cloud) utilitzant l'espai d'IPs privades pròpies.
- **La xarxa com a servei.** Les funcions de xarxa s'han d'oferir com a serveis distribuïts i gestionats. Dins d'aquest punt es va presentar els diferents models de XPN (Cross-Project Networking), Xarxes privades entre projectes. 

Podeu trobar tota l'agenda de l'esdeveniment a [Schedule](https://cloudnext.withgoogle.com/schedule) i les conferències estan disponibles a [Youtube](https://www.youtube.com/playlist?list=PLIivdWyY5sqI8RuUibiH8sMb1ExIw0lAR).
