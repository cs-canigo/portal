+++
date        = "2015-12-01"
title       = "Principis d'Arquitectura de Sistemes d'Informació"
description = "Recomanacions a seguir en la construcció de sistemes d'informació a la Generalitat de Catalunya"
bloc_tags	= ["bones pràctiques"]
section 	= ["Bloc"]
aliases = [
    "/principis",
    "/bloc/principis",
    "/bloc/2015/11/principis",
    "/arquitectura/principis",
    "/arquitectura/2015/11/principis"

]
imatge 		= "/images/bloc/principis.png"
teletext_id	= "principis"
langs = ["ca","es"]
+++
<!--

## Principis sobre el  disseny d'aplicacions


1. Segregació de funcions/responsabilitats. Les aplicacions han d’estar estructuralment dividides en blocs independents per funcionalitats, processos de negoci o serveis, per tal d’evitar els monòlits.

Aquest principi és d’aplicació a totes les capes. Una aplicació tipus pot dividir-se fàcilment, per exemple, en els següents mòduls:

	* Públic general (internet)
	* Col·laboradors externs (extranet)
	* Backoffice (intranet)
	* Processos batch
	* Extraccions (ETL)
	* La presentació (client/frontend) i el backend/negoci estaran desacoblats.

1. Orientació a serveis. Cada cop més, les aplicacions poden ser consumides externament o bé han d’integrar-se amb 3rs. Els backend han d’exposar la seva funcionalitat de negoci via serveis per facilitar-ho. 

1. Emmagatzema a la memòria cau tot allò que sigui possible. Per fer-ho, utilitza la tecnologia que millor s’adapti tant a client (html5 cache, localstorage , etc.) com a servidor (Redis, Varnish, Memcache, caché personalitzada, etc.)

1. Tingues present sempre la compatibilitat cap a enrere dels teus serveis: si exposes una API REST i actualitzes el teu servei, que sigui compatible amb versions anteriors per a evitar actualitzacions innecessàries als teus consumidors i d’aquesta manera poder evolucionar el servei lliurement.

1. Dissenya l'aplicació o servei tenint present els conceptes d'elasticitat (enlloc de per a suportar els pics de càrrega), d’alta disponibilitat, d’alta concurrència i zero downtime.

1. Pensa en la portabilitat de les aplicacions, això és, que es puguin moure amb facilitat d’un cloud privat a un cloud públic, per exemple.

1. A l’hora de dissenyar el teu sistema cal incorporar aspectes qualitatius al cicle de vida:

	* Proves per a verificar la qualitat o requisits no funcionals del sistema.
	* Documentació detallada del projecte (descripció d’arquitectura, document funcional, manual de desplegament, manual d’explotació, …).
	* Control de versions. El sistema en el seu conjunt ha de ser tractat com un producte amb les seves versions majors, menors, etc
	* Desplegament automatitzat, execució de proves automàtiques que verifiquin la instal·lació i integració contínua.

1. Són d'aplicació en aquest apartat els principis que estableix la Guia Web Gencat


## Principis sobre la tecnologia


1. Utilitza la tecnologia que millor encaixi al cas d’ús, si cal combinant tecnologies, ja que en un mateix sistema en poden conviure diverses.

1. Els serveis (backend) exposaran el seu negoci mitjançant REST i en format JSON.

1. En el cas d’aplicacions web, la presentació estarà construïda amb tecnologies estàtiques (html5/javascript/css) i consumirà els serveis que li proporcioni el backend. 

1. Davant solucions estàndards utilitzarem preferentment les tecnologies del Full de Ruta. Aquest fet no exclou que per a noves solucions es puguin utilitzar altres tecnologies, que eventualment passaran a formar-ne part.

1. Des de les unitats d'Arquitectura s'ha de fer un seguiment de noves tecnologies, per a avaluar el seu encaix i tenir altres opcions davant noves necessitats dels projectes (per exemple, nous llenguatges i frameworks o provisió d'infraestructura).

## Principis sobre el cost i manteniment de les solucions


1. Cal tenir presents els costos d’infraestructura i el model de llicenciament requerits per a posar en marxa una solució ja que representen un cost recurrent.

1. Pensa en els costos i en la seva optimització:

	* Monitoritza els teus serveis per a identificar necessitats d'ampliació o reducció de recursos i poder ajustar els costos en conseqüència
	* Arquitectura/dissenya les càrregues de treball amb els costos en ment

1. "Opensource vs Comercial vs Construcció a mida": a l'hora de concebre una nova solució, s'ha de regir pel següent arbre de decisió:

	* Per a problemes comuns, utilitza "Opensource". 
	* Per a problemes poc comuns, compra. 
	* Per a problemes únics, construeix.

A l’hora de triar entre utilitzar un producte (opensource o comercial) o fer un desenvolupament a mida cal fer una avaluació del cost vs. benefici de l’opció triada respecte a les altres.

1. Pensa en l’impacte d’actualització que pugui tenir un canvi de sistema operatiu, middleware o producte allà on corre l’aplicació: quant menys acoblament amb el sistema de base i utilitzant estàndards, més senzilla serà l’actualització o l’ampliació de funcionalitats de l’aplicació.

-->