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

Cal que es pugi el codi font de l’aplicació al respositori del SIC. 
* No es poden incloure binaris de llibreries ni d’altres mòduls ni executables (JAR, WAR, EAR, DLL, EXE...). A tal efecte, s’ha habilitat un sistema de Gestió de Binaris substitutori del SVN del SIC.
* Aquest repositori no és un entorn de desenvolupament, per lo que només les persones assignades com a Release Managers seran les encarregades de consolidar el codi i lliurar-lo.
* Els repositoris poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la branca MASTER i el contingut d’aquesta branca serà amb el que treballaran les pipelines de Jenkins.
* Les pipelines de Jenkins seran les encarregades de generar els TAGS corresponents. Es generaran TAGs de BUILD un cop s’aconsegueixi construir els artefactes i TAGS definitius un cop finalitzada la verificació a l’entorn de PREPRODUCCIÓ.

## Estructura de projectes

Dins del grup del codi de diàleg, es tindran tant projectes com a conjuntts de codi font susceptibles de ser versionats de forma independent al de la resta de projectes. Pot tractar-se d’una llibreria, un microservei, un mòdul o un programa sense fragments independents.
* Tots els projectes hauran de disposar de la carpeta /sic/ al primer nivel de la carpeta de codi de projecte i, dins d’aquesta carpeta, cal crear l’arxiu “sic.yml” que albergarà la versió funcional del projecte. Per exemple: “version: 1.1.0”
* ...
