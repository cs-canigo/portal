+++
date        = "2017-09-08T17:11:42+01:00"
title       = "Descripció de la situació actual dels directoris de la Generalitat"
description = "Mapa actual de Directoris de la Generalitat"
section     = "directoris-integracio"
taxonomies  = []
toc 		= false
weight 		= 3
+++


### Context organitzatiu:

L’actual organització TIC de la Generalitat, contempla els següents elements que són decisius a l’hora d’exposar l’arquitectura de directoris definida:

Proveïdors de Lloc de Treball: cada proveïdor de lloc de treball disposa d’un directori que dóna servei a cadascun dels Lots de lloc de treball, definint els següents interlocutors:

	- LT1:  proveïdor  que  gestiona  els  serveis  de  lloc  de  treball  transversals  (Correu, Sharepoint, Lynk, i File)

	- LT2A: proveïdor que gestiona el servei de lloc de treball d’Ensenyament ( Plataforma, PC, i Printing)
	- LT2B: proveïdor que gestiona el servei de lloc de treball de Governació, Empresa i Ocupació, Benestar Social i Família, Economia i Coneixement, Presidència, i Salut ( Plataforma, PC, i Printing)
	- LT2C: proveïdor que gestiona el servei de lloc de treball de Justícia, Agricultura, Cultura, Territori i Sostenibilitat ( Plataforma, PC, i Printing).

	Aquests directoris de LT2A, LT2B i LT2C, contenen:
	- Les identitats de les persones que treballen en cadascun d’aquests departaments de la Generalitat.
	- Els objectes de les màquines (màquines, impressores, etc)  que s’utilitzen per a treballar en aquests departaments.
	- Els grups de seguretat que tenen associades totes aquestes persones i objectes de màquina anteriorment definits.

Proveïdors de CPD: cada proveïdor de CPD disposa d’un directori (CPD1 o  CPD2 o  CPD3 o  CPD4).

	Aquests directoris contenen:
	- Els objectes de les màquines i servidors que hi ha a cada CPD.
	- Els usuaris tècnics de servei d’aquests servidors i màquines.
	- Els grups de seguretat corresponents als anteriors objectes i usuaris tècnics.

A banda d’això, els directoris de CPD:

	- Actuaran fent les funcions de DNS pels servidors del propi CPD (resolent els dominis interns de les màquines del CPD). Així doncs, el servidors DNS centrals del nus XCAT, delegaran la zona cpdx.intranet.gencat.cat i cpdxpre.intranet.gencat.cat als directoris de CPD.

	- Actuaran fent funcions de NTP pels servidors del propi CPD. Recolliran l’hora dels servidors NTP de nus i seran els encarregats de distribuir-la pels servidors del propi CPD.

### La gestió d'identitats corporativa:

A l’hora d’avaluar les relacions entre directoris de lloc de treball de LT1 i LT2, cobra un paper clau la Gestió d’Identitats Corporativa (Gestió d’Identitats i Control d’Accés als Recursos – GICAR), donat que és l’element encarregat d’automatitzar i normalitzar les següents tasques:
- Alta, baixa, i modificació dels usuaris de la Generalitat en els corresponents directoris de lloc de treball LT2 (FMO).
- Canvi de contrasenya i suspensió dels usuaris en els diferents directoris.

En la següent il·lustració es mostra el flux de propagació de la informació dels usuaris establert:

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - gicar.PNG)

•	Els  interlocutors  de  RRHH  dels  diferents  departaments  treballen  sobre  les  eines  que  tenen establertes a per a dur a terme l’alta, la baixa i la modificació dels usuaris (GIP/SIP i GDI).

•	L’eina de gestió d’identitats corporativa (GICAR), detecta els canvis produïts per les diferents eines de RRHH, i a través d’aquests canvis gestiona el cicle de vida de les identitats.

•	GICAR aprovisiona aquests canvis als directoris de Lloc de treball de forma automàtica (LT1, i LT2A, LT2B, i LT2C).

### Els directoris de LT1 i LT2

Els noms de domini que tenen els directoris de lloc de treball de LT1 i LT2, són els següents:

		LT1		•	PRO: ssccit.gencat

		LT2A	•	PRE: GCAPRE.intranet.gencat.cat
				•	PRO: GCA.intranet.gencat.cat

		LT2B	•	PRE: GCBPRE.intranet.gencat.cat
				•	PRO: GCB.intranet.gencat.cat

		LT2C	•	PRE: GCCPRE.intranet.gencat.cat
				•	PRO: GCC.intranet.gencat.cat

L’estructura lògica interna dels directoris de lloc de treball, ha de ser, la que es descriu a continuació.
A més de les OUs i contenidors generats per defecte per un domini basat en Windows (com els contenidors "Users" i "Computers" o la unitat organitzativa "Domain Controllers"), el directori ha de contenir les següents cinc Unitats Organitzatives:

	- Persones
	- Grups
	- Usuaris Tècnics Funcionals
	- Usuaris Tècnics de Servei
	- Equips

, tal com es mostra en el dibuix:

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir-ous.PNG)



- **Branca Persones**

La OU de "Persones" ha de contenir tots els comptes d'usuari que han d’estar en els directoris, i que han d’estar vinculats amb identitats donades d'alta a GICAR. La OU de “Persones” estarà organitzada pels departaments als quals dóna suport el LOT en qüestió. Dins de cada una d’aquestes OU departamentals existiran 3 unitats organitzatives:

•	“Pendents  Alta”  la  qual  serà  la  OU  on  GICAR  deixa  els  usuaris  pertanyents  a  cada  un  dels departaments quan són creats i previ pas a ser mogut manualment per un administrador a la seva OU definitiva (es mouran a una dels OUs corresponents als organismes pertanyents a aquest departament).
•	“Pendents Baixa” la qual allotjarà els usuaris que en breu seran donats de baixa. GICAR gestiona automàticament i de forma automatitzada l’alimentació d’aquestes OU’s.
•	“Organismes”  la  qual  estarà  composta  per  una  OU  per  cadascun  dels  organismes  dependents d'aquest departament.

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir-ous-persones.PNG)
  
La branca d’Organisme tindrà definida l’estructura d’arbre que el lot hagi definit per a gestionar el lloc de treball d’aquell departament. És una branca la qual la seva estructura serà definida segons criteri del proveïdor de lloc de treball, tanmateix es demana que aquesta estructura es defineixi el més semblant possible a la estructura organitzativa del departament o organisme al qual se li doni servei, i que aquesta estructura pugui facilitar implementar polítiques de seguretat sobre els usuaris que estiguin dins d’aquesta branca.

La clau pública del certificat X509 de l’usuari podrà estar emmagatzemada en els directoris de lloc de treball, com un atribut més de la identitat. Aquesta clau pública s’emmagatzemarà en l’atribut “X509-Cert” de la identitat. 


- **Branca de Grups**

La OU "Grups" ha d’estar dividida per la OU "Departamentals" i la OU “Corporatius". 

La OU "Departamentals" estarà organitzada per departament, i dins d'aquesta OU es proposa l'estructura:

	•	Una OU per organisme: l’estructura d'OU’s ubicada dins d'aquesta és una aproximació a l'actual estructura d'OUs existents dins dels dominis actuals, i facilita la identificació dels grups migrats dins del nou domini.

	•	Una OU per aplicació o accés a recurs ("Aplicació N"): es crearan tantes OUs com aplicacions o accessos a tipus de recurs. Per exemple, si es requereix crear grups d'usuaris per crear unitat de xarxa, es crearà una OU anomenada "Assignació Unitats de xarxa", i dins d'aquesta es crearien els grups d'usuari necessaris als quals se'ls configurarà una unitat de xarxa.

Addicionalment els següents grups es generaran a la OU “Departamentals”:

	•	Nadiu_DeptN: donarà accés a les aplicacions/recursos propis d'un departament amb el rol d'usuari intern del departament. Tot usuari intern del departament tindrà aquest grup.

	•	Convidat_DeptN: donarà accés a les aplicacions/recursos propis d'un departament amb el rol d'usuari convidat. Tot usuari extern del departament tindrà aquest grup.

	•	Deshabilitat_DeptN: donarà accés a les aplicacions/recursos propis d'un departament amb el rol que sigui, a posteriori que aquests usuaris s'hagin donat de baixa.

La OU "Corporatius" inclou tres grups generats per GICAR i els membres del grup també seran subministrats per la mateixa eina. Són grups d'ús optatiu:

	•	Nadiu_Corporatiu: donarà accés a les aplicacions/recursos corporatius amb el rol d'usuari intern de la Generalitat. Tot usuari intern de la Generalitat tindrà aquest grup.

	•	Convidat_Corporatiu:  donarà  accés  a  les  aplicacions/recursos  corporatius  amb  el  rol d'usuari extern a la Generalitat. Tot usuari extern de la Generalitat tindrà aquest grup.

	•	Deshabilitat_Corporatiu: donarà accés a les aplicacions/recursos corporatius encara que l'usuari ja no formi part de la Generalitat.


A través d’aquests grups definits en la branca de grups és possible fer que les aplicacions puguin autoritzar a un conjunt d’usuaris en concret.

Es recomana que les aplicacions corporatives que hagin de ser usades per personal intern utilitzin els grups Nadiu_Corporatiu per a treballar.

Per altra banda, es recomana que les aplicacions departamentals que hagin de ser usades per personal intern dels departaments, utilitzin el grup Nadiu_DeptN per a poder treballar.


- **Branca d’usuaris tècnics funcionals.**

Aquesta branca tindrà una estructura igual a la OU ‘Departamentals’ de dins de la OU de ‘Grups’. D’aquest arbre d’OU’s penjarà una OU per a cada aplicació. Dins de cadascuna d’aquestes OU’s d’aplicació estaran ubicats els usuaris tècnics funcionals. La nomenclatura d’aquests usuaris es deixarà a criteri del proveïdor de Lloc de Treball.


- **Branca d’usuaris tècnics de servei.**

Aquesta branca tindrà una estructura igual a la OU ‘Departamentals’ de dins de la OU de ‘Grups’. D’aquest arbre d’OU’s penjarà una OU per a cada aplicació. Dins de cadascuna d’aquestes OU’s d’aplicació, estaran ubicats els usuaris tècnics de serveis. La nomenclatura d’aquests usuaris es deixarà a criteri del proveïdor de Lloc de Treball.


- **Branca d’equips**

Aquesta branca serà lliure, a partir dels criteris de gestió de la mateixa que defineixi el proveïdor de Lloc de Treball.


- **Convivència amb els directoris de lloc de treball NO TRANSFORMATS (CMO)**

Fins al desplegament del nou model TIC, cada departament tenia el seu directori departamental NO TRANSFORMAT (CMO). Aquests directoris són els utilitzats per les estacions de treball no transformades (antics lots de lloc de treball de l’anterior model TIC, que s’extingiran un cop s’hagi fet la transformació de lloc de treball dels PC’s d’aquell departament), i per les aplicacions que encara no s’han migrat cap al directori de CPD.

Mentre el lloc de treball de l’usuari no s’hagi transformat, s’ha de considerar que els PC’s dels usuaris estaran al domini de lloc de treball CMO. Això és clau tenir-ho present de cara a avaluar si les aplicacions podran funcionar correctament en aquest entorn.

Els directoris de lloc de treball CMO contenen:
•	Usuaris.
•	Equips PC no transformats.
•	Servidors.
•	Grups d’autorització (aplicacions i servidor de fitxers).

L’estructura i nomenclatura de dominis d’aquests directoris és No Homogènia entre departaments, i no és objectiu d’aquest document descriure-la.

### Els directoris de CPD

Cada CPD disposa d’un directori que té com a objectiu donar suport als servidors Windows que calgui donar d’alta en cada CPD.

Aquests directoris tenen les següents funcions:
•	Registrar en domini els servidors donats d’alta.
•	Disposar de grups d’autorització d’accés als serveis de CPD.
•	Disposar d’usuaris tècnics per a aixecar serveis i arrencar processos.

L’estructura d’aquests directoris de CPD és la mateixa que els directoris LT1 i LT2 FMO, amb la diferència de que els directoris de CPD no contenen usuaris personals (únicament disposen d’usuaris tècnics), donat que aquests usuaris es troben definits als directoris de LT1 i de LT2.

Els noms de domini que tenen els directoris de CPD, són els següents:

		CPD1	•	PRE: CPD1PRE.intranet.gencat.cat
				•	PRO: CPD1.intranet.gencat.cat
		CPD2	•	PRE: CPD2PRE.intranet.gencat.cat
				•	PRO: CPD2.intranet.gencat.cat
		CPD3	•	PRE: CPD3PRE.intranet.gencat.cat
				•	PRO: CPD3.intranet.gencat.cat
		CPD4	•	PRE: CPD4PRE.intranet.gencat.cat
				•	PRO: CPD4.intranet.gencat.cat


### Relacions de confiança entre els directoris de la Generalitat

El model preveu que existeixin les següents relacions de confiança entre les diferents tipologies de directori:


![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - relconf.PNG)
  

En el següent diagrama es mostren les relacions de confiança previstes entre directoris.


![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - relconf - diag.PNG)

