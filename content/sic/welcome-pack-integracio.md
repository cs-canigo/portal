+++
date        = "2018-12-07"
title       = "Com integrar una aplicació al SIC?"
description = "Welcome pack amb la informació més rellevant a tenir en compte per la integració d'una aplicació al SIC"
sections    = "SIC"
toc         = true
taxonomies  = []
weight 		= 4
+++

## Introducció

En el cas que l’aplicació utilitzi el servei de custodia de codi i la seva tecnologia permeti la construcció i desplegament automatitzat d’artefactes, s’hauran d’acomplir una sèrie de requeriments per a que es pugui dur a terme la construcció dels corresponents jobs de desplegament.

## Lliurament de codi font

Cal que es pugi el codi font de l’aplicació al repositori del SIC:

* Els projectes han de crear-se dins el **codi de diàleg** adient, de forma que tota la gestió posterior de jobs i creació de peticions Remedy s'associïn al codi d'aplicació corresponent.
* **No es poden incloure binaris** de llibreries ni d’altres mòduls ni executables (JAR, WAR, EAR, DLL, EXE...). A tal efecte, s’ha habilitat un sistema de Gestió de Binaris.
* Aquest repositori no és un entorn de desenvolupament, per lo que només les persones assignades com a **Release Managers** seran les encarregades de consolidar el codi i lliurar-lo.
* Els repositoris poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la **branca MASTER** i el contingut d’aquesta branca serà amb el que treballaran les pipelines de Jenkins.
* Les pipelines de Jenkins seran les encarregades de generar els **TAGS** corresponents. Es generaran TAGs de build un cop s’aconsegueixi construir els artefactes i TAGS definitius un cop finalitzada la verificació a l’entorn de PREPRODUCCIÓ.

## Estructura de projectes
L'estructura de projectes i el seu contingut ha de ser compatible amb el sistema establert d'Integració Continua:

* Dins del grup del codi de diàleg, es tindran **tant projectes com a conjunts de codi font susceptibles de ser versionats** de forma independent al de la resta de projectes. Pot tractar-se d’una llibreria, un microservei, un mòdul o un programa sense fragments independents.
* Tots els projectes hauran de disposar de la carpeta /sic/ al primer nivell de la carpeta de codi de projecte i, dins d’aquesta carpeta, cal crear l’arxiu **sic.yml** que albergarà la versió funcional del projecte. Per exemple: “version: 1.1.0”.
* Per tal d’automatitzar la creació de pipelines, els projectes hauran de disposar de l’arxiu de configuració **aca.yml** que caldrà ubicar dins la mateixa carpeta /sic/.
* No es permet l'ús de versions **Snapshot**.
* Si es contempla l'execució de scripts de desplegament a BBDD, cal preparar el fitxer de **plans** i scripts a una carpeta independent.

## Llibreries
Respecte a les llibreries requerides pels projectes, en funció del seu tipus, cal tenir en compte les següents premisses:

* **Llibreries de tercers que no siguin públiques**: caldrà publicar-les manualment al Nexus, per lo que haureu d'indicar al SIC d'on baixar-les per tal d'enregistrar les llibreries oficials.
* **Llibreries pròpies**: el seu codi font haurà d'estar en projectes diferenciats al grup corresponent al codi de diàleg. Aquestes es generaran i es publicaran al Nexus mitjançant jobs de Jenkins addicionals.
* **Llibreries pròpies no associades a projecte**: hauria de tractar-se d'un cas residual i justificat. Haureu de fer-les arribar al SIC per tal de publicar-les manualment al Nexus.

## Modalitats de desplegament
Es contemplen diverses modalitats de desplegament en funció de l’entorn. Actualment, el sistema establert és el següent:

* Entorn **INT**: automàtica (es construeixen els artefactes i es despleguen als servidors web, d’aplicacions i/o de bases de dades).
* Entorn **PRE/PRO**: semiautomàtica (es dipositen els artefactes per a que el CPD s’encarregui del seu desplegament) o automàtic per CPD (modalitat automàtica on els tècnics de CPD assignats seran els encarregats d’autoritzar i executar les etapes de desplegament). Aquesta modalitat haurà d’acordar-se amb els diferents implicats.
* **Altres entorns**: caldrà especificar la modalitat aplicable i quina posició ocuparan dins el procés.


