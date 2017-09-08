+++
date        = "2017-09-08T17:11:42+01:00"
title       = "Introducció"
description = "Introducció a l'arquitectura de Directoris de la Generalitat"
section     = "Documentació"
taxonomies  = []
toc 		= false
weight 		= 2
+++



Tota aplicació que requereixi autenticació als Active Directory de la Generalitat de Catalunya (en endavant, directoris) ha de integrar-se als mateixos de la manera més estàndard possible, aprofitant les eines i bones pràctiques posades a disposició del desenvolupament per part de la Generalitat de Catalunya.

Aquesta guia descriu les directrius i recomanacions més rellevants que han de complir els productes i les aplicacions, per portar a terme la integració d’aplicacions que requereixin de Windows Authentication amb els directoris de la Generalitat, per a assolir l’objectiu de poder implementar els serveis d’autenticació i autorització que es requereixin. 

Aquesta guia no està dirigida a aplicacions J2EE estàndard, sinó que està pensada específicament per aplicacions i productes tancats que requereixin Windows Authentication per a poder autenticar i autoritzar. Per aquestes aplicacions es recomana fer servir el model que es descriu en la Guia d’Integració d’Aplicacions amb GICAR, donat que el model d’autenticació és molt més escalable, versàtil, flexible i senzill. 

Les directrius indicades en aquest document apliquen:

- A tots els productes i aplicacions que utilitzin Windows Autentication o susceptibles d’autenticar usuaris amb Directori Actiu.
- A tots els proveïdors de desenvolupament i manteniment d’aplicacions, i també als proveïdors de CPD.

A continuació, a mode de glossari, es defineixen diversos dels tecnicismes que es citen a la Guia
- AD: Active Directory.
- CN: Common Name. Atribut que identifica un objecte personal d’un directori o un grup.
- CMO: Current Model Operation: infraestructures heretades dels models TIC de la Generalitat anteriors.
- FMO: Future Model Operation: infraestructures noves desplegades arrel del model TIC actual de la Generalitat de Catalunya.
- GICAR: Gestió d’Identitats I Control d’Accés als Recursos. Sistema de gestió d’identitats corporatiu de la Generalitat.
- OU: Unitat Organitzativa d’un directori. És la unitat d’agregació d’un directori sota el qual poden haver-hi altres objectes d’un directori, com podrien ser objectes personals o grups.
- Proxy Invers: configuració que es pot fer en un frontal web (apache o IIS) que permet fer servir el frontal com a punt d’accés únic per accedir als continguts de diversos servidors d’aplicacions.
- Relació de confiança: configuració que es pot dur a terme a dins de un domini, on es permet a els usuaris d’un domini a fer certes operacions en recursos d’un altre domini. Amb aquestes configuracions es permet la interoperabilitat d’operacions d’usuaris entre diferents dominis.
- TIC: Tecnologies de la Informació i les Comunicacions.
- Windows Authenticacion: protocols d’autenticació propis dels sistemes operatius Windows i suportats per la majoria de productes Microsoft.
 
