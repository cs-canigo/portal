+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Migració de SACE a GICAR"
description = ""
section     = ""
taxonomies  = []
weight 		= 7
+++


Per motius històrics diverses aplicacions de la Generalitat fan encara l’ús del Servei d’Autenticació Centralitzat (més conegut com a SACE). Aquest és un servei obsolescent que està en fase d’extinció, i es recomana a totes les aplicacions que encara facin ús d’aquest servei, la migració de l’autenticació cap a GICAR.

Aquest apartat pretén donar unes directrius bàsiques sobre com abordar la migració d’una aplicació web integrada amb SACE vers GICAR. Es començarà explicant com s’integren actualment les aplicacions amb el SACE, i a continuació s’exposarà quin és el mecanisme que es proposa per a migrar l’autenticació a GICAR.

- 3.10.1.	Funcionament actual de l’autenticació de les aplicacions amb el SACE

La manera d’integrar-se amb el SACE, consistia en fer una crida HTTPS a una adreça, passant com a informació un fitxer XML, que de sortida contindrà les dades requerides.

https://sace.xxx.gencat.intranet/SACE/SACE_Logon.aspx

On xxx es dc, prepdc i desenvdc per als entorns de Producció, pre-producció i desenvolupament, respectivament. 
	
L’estructura del fitxer XML d’entrada i sortida de dades així com la informació que conté i el seu significat, s’especifica a continuació:

![Integració Aplicacions GICAR](/related/gicar/xmlsace.png)

El codi d’operació pot estar informat amb els següents valors:

![Integració Aplicacions GICAR](/related/gicar/saceoperacions.png)

Els paràmetres d’entrada seran recollits via POST per un camp que es diu XMLIn. Anàlogament, els paràmetres de sortida seran enviats via POST a la pàgina que s’indica en el tag <URL_RETORN> dins del contingut d’un camp que es diu  XMLOut.

Aquest funcionament feia necessari que les aplicacions haguessin de construir-se i presentar un formulari de login, i que aquest formulari de login, o un element dinàmic relacionat, hagués de gestionar els següents punts:

1.	Tenir tota la lògica de crida a SACE i d’enviament de paràmetres.
2.	Enviament de paràmetres de SACE cap a l’aplicació.
3.	Parsejat dels paràmetres retornats per SACE.
4.	Generació de la sessió de l’usuari en base a aquests paràmetres obtinguts

Esquemàticament l’aplicació està funcionant ara mateix de la següent manera:

![Integració Aplicacions GICAR](/related/gicar/sacejsp.png)

- 3.10.2.	Proposta de canvi de migració de SACE cap a GICAR

A continuació es descriu una estratègia orientada a la substitució del SACE per GICAR per a les aplicacions que utilitzen SACE. Comentar que l’estratègia que es descriu a continuació és la recomanada per a fer aquest tipus de migracions de SACE a GICAR, però no és la forma recomanada per a realitzar les intragracions amb GICAR per una aplicació que es construeixi des de 0.

En primer lloc el canvi suposa que a nivell de CPD, calgui instal·lar l’agent de SiteMinder sobre el servidor web on resideixi l’aplicació.

A nivell d’aplicacions el canvi proposat es basa en substituir el formulari de login propietari de l’aplicació anterior, per un JSP, ASP, PHP (element dinàmic de servidor), que estarà protegit a nivell de SiteMinder, que es limiti a fer el següent:

1.	Capturar les següents capçaleres HTTP:

- HTTP_GICAR_ID (conté el NIF de l’usuari) --> 11112222W
Captura obligatòria, a partir del qual s’obtindria el DNI de l’usuari autenticat.

- HTTP_GICAR (conté les dades de l’usuari al DC) = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”
Captura addicional, a partir del qual s’obtindrien altres dades de l’usuari autenticat.

2.	Generar la sessió de l’aplicació en base a aquests paràmetres obtinguts en anterioritat.

Aquest element JSP, ASP, PHP seria l’únic punt de l’aplicació que estaria protegit per SiteMinder, d’aquesta forma aquest JSP, quan fos accedit pel navegador de l’usuari, faria saltar el formulari de login de GICAR, i demanaria les credencials a l’usuari.

Per tant, un cop fet això la traça de navegació de l’usuari seria la següent:

1. L’usuari accedirà a la url l’aplicació web, a la zona on habitualment li demana fer login. Aquesta zona farà un HTTP-REDIRECT al component dinàmic desenvolupat. 

1. Saltaria la protecció de GICAR (SiteMinder) al intentar accedir al element dinàmic.

1. L’usuari introdueix la seva credencial (usuari o contrasenya /certificat). 

1. L’agent de SiteMinder genera les capçaleres HTTP corresponents, que indiquen que l’usuari està loguinat a GICAR.

1. L’element dinàmic desenvolupat captura les capçaleres de GICAR, i genera la sessió a l’usuari en l’aplicació.

![Integració Aplicacions GICAR](/related/gicar/funcionament-migracio-sace-gicar.png)

D’aquesta manera, es substitueix el formulari i les llibreries que fan les crides cap a SACE per una URL protegida per GICAR i una llibreria que recull les capçaleres HTTP i generen la sessió de l’aplicació.

Addicionalment al mètode proposat anteriorment (on només es proposa la protecció amb GICAR d’un únic element dinàmic que és el que recull les capçaleres de GICAR i el que genera la sessió de l’aplicació), també és possible tècnicament que totes les URLs de l’aplicació puguin ser protegides amb GICAR (de fet és el recomanable a nivell de seguretat). El fet de fer-ho d’una forma o d’una altra, depèn del grau d’interacció que tingui aquesta aplicació amb altres elements externs, que impossibilitin la protecció total de l’aplicació amb SiteMinder.
