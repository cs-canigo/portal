+++
date        = "2016-05-30"
title       = "SIC. Suport a MongoDB"
description = "Suport a la primera base de dades NoSQL al SIC. Els jobs de desplegament a INT són capaços d'executar codi Javascript per manipular documents i crear o eliminar col·leccions de documents, indexos, etc."
section     = "Notícies"
categories  = ["SIC"]
key         = "JUNY2016"
+++

Durant el mes de Maig s'ha dotat al SIC de les eines i procediments necessaris per poder donar suport a MongoDB. A  la secció de Documentació del SIC del Portal de Frameworks i Solucions d'Arquitectura podeu trobar noves versions dels següents documents:

- <i>[Formulari d'alta d'aplicació per al Portal d'Integració Contínua (Tasques al Jenkins)](/related/sic/SIC-Formulari-Construccio-Desplegament-Aplicacio.xlsx):</i> en aquest formulari s'ha afegit una nova pestanya "Scripts BBDD" amb els camps necessaris per demanar l'execució de scripts MongoDB.

![Formulari scripts BBDD](/images/news/formulari_mongodb.PNG "Formulari scripts BBDD")

- <i>[Manual d'Usuari:](/related/sic/manual-usuari.pdf)</i> afegida informació per la configuració del fitxer de plans de BBDD per a MongoDB.

Un exemple de com podria quedar el fitxer de plans per a MongoDB seria el següent:

![Script plans MongoDB](/images/news/plans_mongodb.PNG "Script plans MongoDB")

L'**idBBDD** fa referència a la base de dades on s'ha d'executar el script, no al tipus (podria haver scripts per dues bases de dades MongoDB, per exemple).

Destacar que l'execució de scripts només es troba disponible per als entorns d'INT. Per PRE i PRO, els procediments de desplegament són semi-automàtics amb lliurament per sFTP d'artefactes a CPD, i enviament de correu de sol·licitud de desplegament a SAU CTTI o sol·licitud de canvi a Remedy.

Per a qualsevol dubte referent a l'execució de scripts de MongoDB ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy.
