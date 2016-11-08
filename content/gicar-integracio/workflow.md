+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Procés d'autenticació amb Siteminder"
description = "Descripció del procés i finalització de la sessió activa"
sections    = "GICAR"
taxonomies  = []
weight 		= 3
+++

A continuació es descriuen els passos que SiteMinder segueix per portar a terme l’autenticació d’un usuari, i disposar d’un entorn de Single Sign On Web:

1.	L’usuari intenta accedir al recurs protegit. Si l’usuari no ha iniciat cap sessió o aquesta ha caducat, l’agent de SiteMinder instal·lat interceptarà la petició per tal de que es produeixi un desafiament d’autenticació (Punt 2). Altrament, si l’usuari té una sessió activa, aquest accedirà directament a l’aplicació.

1.	L’Agent de SiteMinder instal·lat en el Servidor Web on resideix el frontal de l’aplicació en qüestió intercepta la petició (primer filtre de virtual hosts) podent:

	- Ignorar-la: en el cas que sigui un domini que s’hagi decidit ignorar de la protecció de SiteMinder
	- Enviar la petició al SiteMinder Policy Server que analitzarà el tipus de protecció, si hi ha una sessió activa, etc.

1.	SiteMinder avalua si es tracta d’un recurs protegit

	- Si està protegit, SiteMinder avalua si l’usuari té una sessió activa.
	- Si no té sessió activa, se li  demanen a l’usuari les seves credencials o el Certificat Digital. SiteMinder farà una validació de les credencials al Directori Corporatiu i s’assegurarà de la validesa del certificat. Si tot és correcte, s’obrirà una nova sessió per a l’usuari validat.

1.	Feta la validació, SiteMinder (via l’agent) envia a l’aplicació les capçaleres HTTP (indicades en el punt anterior) per a que l’aplicació conegui la identitat de l’usuari validat.

	Esmentar que és el browser (client web) de l’usuari el que genera en local la cookie de sessió, mitjançant el qual SiteMinder determina si una sessió està activa o no, així com el temps d’expiració de la mateixa.

	![Integració Aplicacions GICAR](/related/gicar/esquema-acces.png)

1.	A partir d’aquest moment, és la pròpia aplicació (amb les capçaleres rebudes que identifiquen a la persona autenticada) qui determina si l’usuari està autoritzat, amb quins permisos, etc..

![Integració Aplicacions GICAR](/related/gicar/esquema-acces2.png)

## Finalització de la sessió activa

Hi ha dues maneres de terminar una sessió amb GICAR: o bé a través del formulari de logoff específic de GICAR, o bé a partir d’un timeout.

El timeout es un paràmetre definit en els Policy Servers que provoca la terminació de la sessió en el cas que s’hagi superat un cert temps sense activitat. Aquest temps màxim d’inactivitat pot ser diferent per cada aplicació. En el cas d’accedir a una aplicació amb GICAR i fer ús del Single Sign On per a accedir a una altra, cal tenir en compte que el temps de timeout no es veurà modificat i seguirà mantenint el valor que estigués indicat per a la primera aplicació.

Una altra manera per a terminar la sessió, es que l’aplicació invoqui el formulari de logoff que posa a disposició GICAR. Aquest formulari realitza l’esborrat de les cookies associades a la sessió, cosa que provoca la seva finalització. Així doncs, només cal que l’aplicació invoqui una de les URL següents segons l’entorn en que es trobi:

Si l’aplicació té domini xxx.gencat.cat:
 
- A PRE: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://preproduccio.idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 
	- https://preproduccio.idp4-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 

- A PRO: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 
	- https://idp4-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 

Si l’aplicació té un domini aliè a xxx.gencat.cat, caldrà consultar el tema als responsables de GICAR.

