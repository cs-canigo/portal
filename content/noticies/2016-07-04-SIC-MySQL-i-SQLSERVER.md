+++
date        = "2016-07-04"
title       = "SIC. Suport a MySQL i Microsoft SQL SERVER"
description = "Suport a les bases de dades de tipus MySQL i Microsoft SQL SERVER. Els jobs de desplegament a INT són capaços d'executar scripts DDL i DML d'aquestes bases de dades."
section     = "Notícies"
categories  = ["SIC"]
key         = "JULIOL2016"
+++

Durant el mes de Juny s'ha dotat al SIC de les eines i procediments necessaris per poder donar suport a les bases de dades *MySQL* i *Microsoft SQL SERVER*. Aquesta nova addició de tecnologies de Bases de Dades té afectació als següents documents de  la secció de Documentació del SIC del Portal de Frameworks i Solucions d'Arquitectura:

- <i>[Formulari d'alta d'aplicació per al Portal d'Integració Contínua (Tasques al Jenkins)](/related/sic/SIC-Formulari-Construccio-Desplegament-Aplicacio.xlsx):</i> a la llengüeta "Scripts BBDD" podreu incloure les dades de connexió a aquests tipus de bases de dades. Recordar-vos que per a cada connexió, caldrà copiar i pegar la taula amb la informació pertinent.

![Formulari scripts BBDD MySQL i SQLSERVER](/images/news/SIC-formulari_ Jenkins_SQL.png "Formulari scripts BBDD MySQL i SQLSERVER")

- <i>[Manual d'Usuari:](/related/sic/manual-usuari.pdf)</i> afegida informació per la configuració del fitxer de plans de BBDD per a aquestes bases de dades.

A continuació es mostra un exemple de com podria quedar el fitxer de plans per a una aplicació amb que utilitzés aquestes bases de dades:

![Script plans MySQL i SQLSERVER](/images/news/SIC-fitxer_plans.png "MySQL i SQLSERVER")

Al fitxer de plans s'indica l'**idBBDD**. Aquest atribut fa referència al nom de la connexió que s'ha definit al formulari anterior i indica que l'script indicat s'ha d'executar a través de la connexió de base de dades amb aquest nom.

Destacar que l'execució de scripts només es troba disponible per als entorns d'INT. Per PRE i PRO, els procediments de desplegament són semi-automàtics amb lliurament per sFTP d'artefactes a CPD, i enviament de correu de sol·licitud de desplegament a SAU CTTI o sol·licitud de canvi a Remedy.

Per a qualsevol dubte referent a l'execució de scripts de MongoDB ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy.
