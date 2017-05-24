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

Google Cloud Next 17 és l'esdeveniment que va organtizar Google a San Francisco els dies 8, 9 i 10 de març. En aquest esdeveniment s'aprofita per a presentar les novetats referents al treball a nivell empresarial en Cloud, tan en lloc de treball (GSuite), com a nivell d'aplicacions (Google Cloud Platform).

Tota l'agenda de l'esdeveniment es pot veure a [Schedule](https://cloudnext.withgoogle.com/schedule) i les conferències estan publicades a [Youtube](https://www.youtube.com/playlist?list=PLIivdWyY5sqI8RuUibiH8sMb1ExIw0lAR.). 

![GSuite](/images/bloc/Imatge1.png)

La solució de Google al treball col.laboratiu en Cloud amb funcionalitat empresarial és GSuite. Durant l'esdeveniment es van presentar les principals novetats en aquesta Suite:

- **Team Drive**. Google Drive Corporatiu . Permetrà veure’s com a unitat local tot i no estar sincronitzat. Els documentes hostatjats no pertanyen a una persona, sinó a la corporació.
- **App Maker** Entorn de desenvolupament d’aplicacions JS internes orientades a gestió de dades. (https://developers.google.com/appmaker/)
- **Jamboard** Pissarra que permet col·laboració en temps real a través de Hangouts.

![GCPlatform](/images/bloc/Imatge3.png)

Dins de la categoria de Cloud Platform, Google ofereix solucions a diferents nivells:
## Plataformes d'execució
On segons si la gestió recau més en el desenvolupador o en Google, ens ofereix:

- **AppEngines**. Motors d'execució gestionats per Google on sols es desplega el codi d'aplicació.
- **Contenidors**. Desplegament de contenidors a través de l'orquestrador **Kubernetes**. 
- **Infraestructura**. Potencia a nivell de SO.
- **Cloud Functions**. Serveis Serverless, **novetat presentada en l'esdeveniment en estat beta.**

Les principals novetats en aquesta categoria es van presentar a nivell de Kubernetes:
**Kubernetes** és l'orquestrador de clústers de contenidors opensource desenvolupat per Google. Les seves principals funcionalitats inclouen:

- Auto-corregit
- programació del desplegament
- Escalat horitzontal manual I automatitzat
- Reinici automàtic
- Balanceig integrat

Algunes de les novetats presentades en la **versió 1.6 de Kubernetes** son:

- Balanceig Multi-Cluster / multi-zona  N7 amb SSL amb una única IP (Ingress)
- Nous paràmetres de desplegament:
- Condicionar el desplegament a la tipologia de hardware sobre el que s'executa:
	- Desplega a la màquina mes barata
	- Desplega a la màquina que té un mínim de prestacions a nivell de maquinari
	- Desplega a la màquina que té un mínim de prestacions a nivell de tipus de disc
- Aprovisionamet dinàmic de volums estàtics 
- Aplicacions amb estat
- Federació de clústers (kubefed) en diverses regions(fins i tot entre on-premise i cloud)
- Afinitat a pods
- Afinitat a zones
- Definició dinàmica de DNS

## Emmagatzemament de dades
En aquesta categoria, la principal novetat va ser la presentació de **Spanner**. Una base de dades com a servei **transaccional** que permet l'escalat horitzontal a diferents zones. En l'esdeveniment es va presentar una simulació amb les següents característiques:
- BBDD desplegada en tres regions Google
- 500.000 ventes transaccionals per minut
- 3 Bilions de files
- 80 TB BBDD
- Completament administrada. Replicació, Failover

## Data Analytics - Machine Learning
Punt molt potent de Google. Es van presentar varies novetats en aquest apartat:

- **DPL Data Lost Prevention.** Basat en el principi de sols guardar les dades que son necessàries, identifica les dades sensibles de les imatges i les oculta abans de guardar-les.
- **API d'indexació d'imatges**. API que permet categoritzar una imatge en diferents eixos, contingut, detecció de cares, OCR, geogràficament, etc.
- **API d'indexació de vídeos**. API que permet no únicament categoritzar un video, sinó identificar el seu contingut i el moment en que apareix. Molt il·lustrativa la demostració feta a l'esdeveniment: [API video ](https://www.youtube.com/watch?v=mDAoLO4G4CQ)


## Xarxa
Durant l'esdeveniment es van presentar les funcionalitats de Google Cloud Platform en la definició de xarxa en que es va remarcar:

- **La xarxa ha de ser global.** El Cloud ha de ser una extensió de la xarxa local per tal de donar alta disponibilitat en diferents zones en format híbrid (part de la infraestructura en local, i part en el Cloud) utilitzant l'espai d'IPs privades propies.
- **La xarxa com a servei.** Les funcions de xarxa s'han d'oferir com a serveis distribuïts i gestionats. Dins d'aquest punt es va presentar els diferents models de XPN, Xarxes privades entre projectes.
