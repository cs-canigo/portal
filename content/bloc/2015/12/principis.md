+++
date        = "2015-12-01"
title       = "Principis d'Arquitectura de Sistemes d'Informació"
description = "Recomanacions a seguir en la construcció de sistemes d'informació a la Generalitat de Catalunya"
bloc_tags	= ["bones pràctiques"]
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
1. **Evita els monòlits**: divideix les aplicacions en blocs per funcionalitats (això és, en processos o serveis independents). Aquest principi s'ha d'aplicar a totes les capes. Una aplicació tipus hauria d'estar dividida en els següents mòduls:

	- Públic general (internet)
	- Col·laboradors externs (extranet)
	- Backoffice (intranet)
	- Processos batch
	- Extraccions (ETL)
 
1. Els **serveis** (backend) exposaran el seu negoci mitjançant **REST** i en format **JSON**. 
 
1. La **presentació** (client/frontend) i el **backend/negoci** estaran **desacoblats**.  
 
1. En el cas d'aplicacions web, la presentació estarà construïda amb **tecnologies estàtiques** (html5/javascript/css) i **consumirà els serveis** que li proporcioni el backend. 
 
1. **Emmagatzema a la memòria** cau tot allò que sigui possible (tant a client com a servidor) i utilitzant la tecnologia que millor s'adapti (html5 cache, localstorage, ..., a client i Redis, Varnish, Memcache, caché personalitzada, ..., a servidor) 
 
1. **Utilitza la tecnologia que millor encaixi** al cas d'ús, si cal combinant tecnologies, ja que en un mateix sistema en poden conviure diverses.  
 
1. **Avalua el peatge** (cost vs benefici a mig i llarg termini) d'utilitzar productes vs desenvolupar a mida. En qualsevol cas, millor un producte o llibreria especialitzada que productes o llibreries multipropòsit.
 
1. Tingues present sempre els **costos d'infraestructura i llicència** requerits per a posar en marxa la solució: és un cost recurrent (_TCO_). 
 
1. **Incorpora** sempre els conceptes d'**alta disponibilitat**, d'**alta concurrència** i _**zero downtime**_.
 
1. **Pensa** sempre que l'aplicació pot ser **consumida** o **integrar-se amb 3rs**: facilita els mecanismes en forma de **serveis** per a fer-ho.
 
1. Tingues present sempre la **compatibilitat cap a enrere** dels teus serveis: si exposes una API REST i actualitzes el teu servei, que sigui compatible amb versions anteriors  per a evitar actualitzacions innecessàries als teus consumidors i d'aquesta manera poder evolucionar el servei lliurement.  
 
1. Pensa en l'**impacte d'actualització** que pugui tenir un canvi de sistema operatiu, _middleware_ o producte allà on corre l'aplicació: quant menys acoblament amb el sistema de base i utilitzant estàndards, més senzilla serà l'actualització o l'**ampliació de funcionalitats** de l'aplicació. 

1. Pensa en la **portabilitat de les aplicacions**, això és, que es puguin moure amb facilitat d'un cloud privat a un cloud públic, per exemple.
 
1. Incorpora **aspectes qualitatius al cicle de vida** de l'aplicació: 

	* **Proves** per a verificar la qualitat o requisits no funcionals del sistema. 
	* **Documentació** detallada del projecte (descripció d'arquitectura, document funcional, manual de desplegament, manual d'explotació, ...). 
	* Control de **versions**
	* **Desplegament automatitzat**, execució de **proves automàtiques** que verifiquin la instal·lació i **integració contínua**.

1. Pensa en els **costos** i en la seva **optimització**:

	* Entèn els actius que es despleguen i quant costen
	* Dissenya per a oferir elasticitat enlloc de per a suportar els pics de càrrega
	* Identifica recursos desaprofitats i apaga'ls quan no els necessitis
	* Arquitectura/dissenya les càrregues de treball amb els costos en ment
	* Estigues al dia de les actualitzacions del cicle de vida de les tecnologies

-->