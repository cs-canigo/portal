+++
date        = "2016-05-30"
title       = "SIC. Suport a NodeJS"
description = "Suport a construcció i desplegament d'aplicacions NodeJS. Inclou resolució de dependències amb npm (Node Package Manager) per JavaScript."
section     = "Notícies"
categories  = ["SIC"]
key         = "JUNY2016"
+++

Durant el mes de Maig s'ha dotat al SIC de les eines i procediments necessaris per poder empaquetar i desplegar aplicacions [NodeJS](https://nodejs.org/) en entorns corporatius. A la secció de Documentació del SIC del Portal de Frameworks i Solucions d'Arquitectura podeu trobar noves versions dels següents documents:

- <i>[Formulari d'alta d'aplicació per al Portal d'Integració Contínua (Tasques al Jenkins)](/related/sic/SIC-Formulari-Construccio-Desplegament-Aplicacio.xlsx):</i>  en aquest formulari s'ha afegit una nova pestanya "NodeJS-Construcció,Desplegament" amb els camps necessaris per al desplegament d'aplicacions NodeJS en entorns d'INT, PRE i PRO.
- <i>[Manual d'Integració:](/related/sic/manual-integracio.pdf)</i> afegit detall dels requeriments per la integració d'aplicacions NodeJS al SIC.
- <i>[Manual d'Usuari:](/related/sic/manual-usuari.pdf)</i> afegida informació per l'ús de Jenkins per tal de fer desplegaments d'aplicacions NodeJS amb el SIC.

La custòdia de codi d'aplicacions NodeJS al SVN del SIC ja era permesa, i amb l'afegit de la construcció i els desplegaments es proveeix al SIC de la possibilitat de gestionar el cicle de vida d'aplicacions desenvolupades amb aquesta tecnologia. Al SIC es resolen les dependències de l'aplicació via [npm (Node Package Manager)](https://www.npmjs.com/) a través del Nexus, motiu pel qual no és permès pujar carpetes "node_modules" amb el codi d'aquestes dependències. En cas de ser necessari els proveïdors d'aplicacions poden demanar la instal·lació de paquets npm propis al Nexus.

Destacar que de la mateixa manera que amb aplicacions JEE i PHP, també es permet l'execució de scripts de bases de dades Oracle/MongoDB en els desplegaments automàtics a INT. Per a PRE i PRO, els procediments de desplegament són semi-automàtics amb lliurament per sFTP d'artefactes a CPD i enviament de correu de sol·licitud de desplegament a SAU CTTI o sol·licitud de canvi a Remedy.

Per a qualsevol dubte referent a la integració d'aplicacions NodeJS al SIC ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy.
