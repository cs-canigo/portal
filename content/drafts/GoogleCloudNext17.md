+++ date = "2017-05-23" title = "Google Cloud Next 17" description = "Google Cloud Next 17" section = "noticies" categories = ["cloud"] key = "MAIG2017" +++

# Google Cloud Next '17

![GoogleNext17](/static/images/bloc/GC17.png)

Google Cloud Next 17 és l'esdeveniment que va organitzar Google a San Francisco els dies 8, 9 i 10 de març. En aquest esdeveniment es presenten les novetats amb vocació empresarial al cloud, tan en el que respecta a lloc de treball (GSuite), com a nivell de construcció i desplegament d'aplicacions (Google Cloud Platform).

Tota l'agenda de l'esdeveniment es pot veure a [Schedule](https://cloudnext.withgoogle.com/schedule) i les conferències estan disponibles a [Youtube](https://www.youtube.com/playlist?list=PLIivdWyY5sqI8RuUibiH8sMb1ExIw0lAR.). 

## GSuite
![GSuite](/static/images/bloc/Imatge1.png)

La solució de Google al treball col.laboratiu en cloud amb vocació empresarial és GSuite [Toni: afegir link]. Les principals novetats en aquest producte van ser:

### Team Drive 
Similar a Google Drive però amb vocació corporativa. Permetrà veure'l com a unitat local tot i no estar sincronitzat. La diferència principal amb Google Drive es que els documents emmagatzemats no pertanyen a una persona, sinó a la corporació. [Toni: com és maneguen els usuaris? va per domini de correu?][Toni: afegir link]

### App Maker
Entorn de desenvolupament d'aplicacions JS internes orientades a gestió de dades. [App Maker](https://developers.google.com/appmaker/)[Toni: quina utilitat té a nivell empresa? Necessites un navegador? és scripting a com el gscript que hi ha a Spreadsheets? Ho pots explicar?]

### Jamboard 
Pissarra que permet col·laboració en temps real a través de Hangouts.[Toni: incloure una foto. És una pissarra física o una aplicació que corre en navegador?]

## Google Cloud Platform
![GCPlatform](/static/images/bloc/Imatge3.png)

Pel que respecte a les plataformes cloud que ofereix Google, van presentar les següents novetats:

### Plataformes d'execució
Disposen de diferents opcions en que els integradors tenen més o menys graus de llibertat:

* **AppEngines**. Motors d'execució gestionats per Google on sols es desplega el codi d'aplicació. [Toni: Explicar la diferència entre AppEngines o Infraestructura, no queda clar]
* **Contenidors**. Desplegament de contenidors a través de l'orquestrador **Kubernetes**. 
* **Infraestructura**. Potència a nivell de SO.[Toni: explicar millor la diferència amb AppEngines]
* **Cloud Functions**. Presentada en l'esdeveniment en estat beta. Té característiques similars a la que Amazon presenta com a AWS Lambda. Serveis Serverless [Toni: explicar una mica més que vol dir serverless]

Les principals novetats en aquesta categoria es van presentar a Kubernetes.
**Kubernetes** és l'orquestrador de clusters de contenidors opensource desenvolupat per Google. Les seves principals funcionalitats inclouen:
* Auto-corregit [Toni: explicar. què s'autocorregeix?]
* Programació [Toni: data i hora?] del desplegament [Toni: dels contenidors?, del creixement?]
* Escalat horitzontal manual o automàtic
* Reinici automàtic [Toni: en quins casos?]
* Balanceig integrat [Toni: Manual o automàtic o sempre automàtic?]

Algunes de les novetats presentades en la versió 1.6 de Kubernetes son:
* Balanceig Multi-Cluster / multi-zona  N7 amb SSL amb una única IP (Ingress) [Toni: què és Ingress? posar link]
* Nous paràmetres de desplegament:
** Condicionar el desplegament a la tipologia de hardware sobre el que s'executa:
*** Desplega a la màquina mes barata
*** Desplega a la màquina que té un mínim de prestacions a nivell de maquinari
*** Desplega a la màquina que té un mínim de prestacions a nivell de tipus de disc
* Aprovisionament dinàmic de volums estàtics 
* Aplicacions amb estat
* Federació de clústers (Kubefed)[Toni: posar link] en diverses regions (fins i tot entre on-premise i cloud)
* Afinitat a pods [Toni: què són els pods?]
* Afinitat a zones [Toni: són les zones geogràfiques de disponibilitat de Google Cloud?]
* Definició dinàmica de DNS [Toni: què vol dir?]

### Emmagatzemament de dades
En aquesta categoria, la principal novetat va ser la presentació de **Spanner**. [Toni: afegir link] Una base de dades relacional com a servei, que permet l'escalat horitzontal a diferents zones de disponibilitat. En l'esdeveniment es va presentar una demo [Toni: tenim link al youtube?] amb les següents característiques:
- BBDD desplegada en tres regions Google
- 500.000 ventes [Toni: vendes?] transaccionals per minut
- 3 Bilions [Toni: són bilions americans?] de files
- 80 TB BBDD
- Completament administrada. Replicació, Failover [Toni: failover automàtic?]

### Data Analytics - Machine Learning
És un dels aspectes en que Google aposta fortament. Es van presentar vàries novetats en aquest apartat: [Toni: tot està basat en tractament d'imatges i videos? Potser cal indicar-ho al títol: "Machine Learning aplicat al tractament d'imatges i videos"]
* **DLP Data Loss Prevention.** Basat en el principi de sols guardar les dades que son necessàries, identifica les dades sensibles de les imatges i les oculta abans de guardar-les.
* **API d'indexació d'imatges**. API que permet categoritzar una imatge en diferents eixos, contingut, detecció de cares, OCR, geogràficament, etc.
* **API d'indexació de vídeos**. API que permet categoritzar un vídeo, a més a més d'identificar el seu contingut i el moment en que apareix. Molt il·lustrativa la demo feta a l'esdeveniment: [API vídeo ](https://www.youtube.com/watch?v=mDAoLO4G4CQ)

### Xarxa
Es van presentar les funcionalitats en la definició de la xarxa en que es va remarcar:
* **La xarxa ha de ser global.** El cloud ha de ser una extensió de la xarxa local per tal de donar alta disponibilitat en diferents zones en format híbrid (part de la infraestructura en local, i part en el cloud) utilitzant l'espai d'IPs privades pròpies.
* **La xarxa com a servei.** Les funcions de xarxa s'han d'oferir com a serveis distribuïts i gestionats. Dins d'aquest punt es va presentar els diferents models de XPN, Xarxes privades entre projectes. [Toni: quina és la definició de XPN?]

[Toni: aquí caldria tancar l'article amb una valoració pròpia de l'esdeveniment. tancar-lo així és massa abrupte. També podem aportar referències a les slides i o vídeos]
