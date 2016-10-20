+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Descripció del servei"
description = "Informació general del servei GICAR"
sections    = "GICAR"
taxonomies  = []
toc 		= true
weight 		= 1
+++


Aquesta guia descriu els aspectes més rellevants per portar a terme la integració d’aplicacions amb la plataforma de Gestió d’Identitats i Control d’Accés als Recursos (en endavant GICAR). GICAR és l’eina amb que s’ha dotat a la Generalitat de Catalunya per a la gestió centralitzada de les identitats de persones que interactuen amb els sistemes d’informació.

GICAR proveeix principalment dos grans funcionalitats:

<br />

1. **Autenticació**: on es descriuen els mecanismes per integrar el model d’autenticació de GICAR amb les aplicacions que s’hi vagin integrant. 

	En el següent esquema s’especifica a mode general quines són les aplicacions que es recomana que siguin integrades amb GICAR a nivell d’autenticació, i quines es recomana que s’integrin per altres sistemes d’autenticació.

	![Integració Aplicacions GICAR](/related/gicar/tipus-autenticacio.png)

	Per aplicacions que calgui integrar-les amb sistemes d’autenticació basats en Windows Autentication, caldria adreçar-se a la “Guia d’Integració amb els directoris del nou model TIC”

	<br /><br />

1. **Provisió**: on es descriuen els mecanismes per poder gestionar els recursos (aplicacions) a les que té accés una identitat del Directori Corporatiu.

	Es important remarcar que el Directori Corporatiu és el dipòsit central d’identitats de GICAR i que, per tant, és requisit indispensable estar al Directori Corporatiu per poder gaudir de tots els serveis i funcionalitats que aporta la plataforma.

### Esquema general de GICAR

Per facilitar la comprensió de la plataforma de Gestió d’Identitats, s’inclou a continuació un esquema de l’arquitectura de capes que configuren la plataforma GICAR.


![Integració Aplicacions GICAR](/related/gicar/esquema-general-gicar.png)


La plataforma GICAR es fonamenta bàsicament en dos objectius principals:
- Facilitar la gestió de les identitats (persones) de treballen o col•laboren amb la Generalitat de Catalunya (funcionaris, interins, empreses públiques, externs, etc).
- Facilitar la gestió i el control de l’accés als recursos per part de les identitats, entenent com a recurs qualsevol eina, sistema d’informació o aplicació necessari per a què el professional desenvolupi les seves funcions.

Tal i com s’ha indicat, el dipòsit central d’identitats de GICAR és el Directori Corporatiu de la Generalitat de Catalunya. Aquest Directori permet gestionar els següents tipus de col•lectius d’identitats:

- El col·lectiu T1: professionals de la Generalitat de Catalunya gestionats des de l’aplicació de personal GIP/SIP, és a dir, tots aquells que cobren la seva nòmina des de l’aplicació de personal.  En general, funcionaris que treballen als departaments.

- El col·lectiu T2: professionals de la Generalitat no gestionats des de l’aplicació de personal GIP/SIP, és a dir, tots aquells que no cobren la seva nòmina des de GIP/SIP.  En general, personal d’empreses públiques, consorcis, ...

- El col·lectiu T3: professionals que col•laboren amb la Generalitat. En general, treballadors temporals, oficines liquidadores, personal d’altres administracions / organismes / ens locals, becaris, ...


Actualment es disposa de dues vies per donar d’alta/baixa/modificar identitats del Directori Corporatiu, que es descriuen a continuació:

1.	Via GIP/SIP: utilitzat només per identitats del col.lectiu T1. Quan una identitat modifica el seu estat en el GIPSIP (Alta/Baixa/Modificació), es llança un procés batch que alimenta el Directori Corporatiu amb els canvis que han tingut lloc. El GIPSIP sempre actuarà com a mestre de dades del Directori per identitats tipus T1.

2.	Via GDI (Gestió d’Identitats): eina que permet fer l’alta / baixa / modificació d’identitats T1, T2, T3 i no-nominals al Directori Corporatiu. Per les identitats T1, un cop se’ls ha assignat un Lloc de Treball, passaran a dependre exclusivament de GIP/SIP i amb GDI no es podran modificar. 

Pel que fa als mecanismes d’autenticació d’usuaris, la plataforma disposa de la següent eina:

- SiteMinder: que s’ocupa de l’autenticació d’identitats al Directori Corporatiu que intenten accedir a aplicacions Web (ja sigui amb usuari i contrasenya o bé amb certificat Digital). És una eina, com es veurà en el següent punt, que permet disposar de Single Sign On d’aplicacions Web. A banda del Directori Corporatiu, aquest component també permet autenticar usuaris de les administracions locals de Catalunya (a través del directori de l’EACAT), i permet autenticar certificats digitals vàlids, a través del servei de PSIS del Consorci AOC.

Pel que fa als mecanismes de provisió i control d’accés a recursos, GICAR aporta les següents funcionalitats:

- Disposa d’una eina de Workflow per gestionar les peticions d’alta/baixa/modificació d’accés a recursos (aplicacions)
- Disposa d’una eina de recordatori de contrasenya, que permet que cada identitat del Directori Corporatiu es gestioni la seva pròpia contrasenya.
- Disposa d’una eina per sincronitzar la contrasenya de diferents aplicacions.
- Permet controlar i administrar l’accés a les aplicacions integrades en GICAR

Actualment la plataforma de Gestió d’Identitats disposa de dos entorns:

- Entorn de Pre-Producció
- Entorn de Producció
