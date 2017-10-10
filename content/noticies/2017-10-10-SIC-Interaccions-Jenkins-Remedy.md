+++
date        = "2017-10-10"
title       = "SIC. Interacció entre Jenkins i Remedy"
description = "Degut al nombre de consultes rebudes aquest mes sobre la interacció entre Jenkins i Remedy a l'hora de generar canvis, hem creat aquest article on s'exposa com es relacionen aquests dos elements."
sections    = ["noticies", "home"]
categories  = ["sic"]
key         = "OCTUBRE2017"
+++

## Remedy al SIC

Des d'inicis de 2016, el SIC va habilitar una nova forma de comunicar els canvis originats per evolutius d'aplicacions mitjançant la creació d'un draft de CRQ a Remedy. D'aquesta manera el SIC s'adaptava al creixent nombre d'aplicacions que s'integrava amb Remedy; deixant progressivament en desús el procediment d'enviament de correus a CPD per a peticions de canvi.

### Procediment de creació d'un Draft a Remedy a través d'una CRQ

Actualment, la interacció amb Remedy es produeix en els jobs/stages que incloguin un **desplegament semiautomàtic**. Un **desplegament semiautomàtic** és aquell que el SIC hi proporciona els artefactes generats en una fase o un job previ però alhora requereix la intervenció de CPD per tal de realitzar el desplegament. Per tal de lligar la intervenció de CPD amb el SIC, és el propi SIC el que crea un Draft a Remedy i hi informa textualment on ha dipositat els artefactes per tal que CPD els pugui recollir.

El procediment actual quan es crea un Draft a Remedy és el següent en els desplegaments semiautomàtics:

#### 1. S'invoca el job de Jenkins

Ja sigui realitzant un push a la branca master del projecte GitLab (mètode SIC 2.0), ja sigui invocant-lo directament (mètode SIC 1.0), el job comença l'execució identificant l'usuari que ha disparat l'execució del job.

<CENTER>![Invocació de Jobs al SIC](/images/news/invocacioJobs.png)</center>

#### 2. Invocació a Remedy

Després de realitzar les tasques necessàries, el job invoca al Web Service de Remedy per tal de crear el *Change Request* (CRQ en endavant) en estat Draft.

Jenkins té un usuari genèric per autenticar-se amb aquest web service i, entre d'altres paràmetres, ha d'indicar un usuari com a **creador** de la CRQ. Jenkins assigna l'usuari que ha identificat en el pas anterior com a usuari creador.

<CENTER>![Invocació al Web Service de Remedy](/images/news/InvocacioWSRemedy.png)</center>

#### 3. Funcionalitat interna a Remedy

El Web Service de Remedy valida que l'usuari informat té permisos per poder crear CRQs en el servei sol·licitat. Un cop l'ha validat, el Web Service de Remedy obté un llistat de tots els coordinadors de canvi vàlids i n'agafa un a l'atzar. Finalment, acaba creant el Draft.

<CENTER>![Tasques internes del WS de Remedy](/images/news/tasquesWSRemedy)</center>

Podeu consultar aquesta i altra informació al [Manual d'Usuari del SIC](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf).

