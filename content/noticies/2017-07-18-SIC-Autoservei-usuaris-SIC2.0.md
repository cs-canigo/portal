+++
date        = "2017-07-18"
title       = "SIC 2.0. Funcionament de l'Autoservei d'usuaris al GitLab"
description = "Aquest article descriu amb detall el funcionament de l'Autoservei d'usuaris SIC 2.0 al GitLab (editat el 2018-04-30 adaptant-se al model de seguretat 2018 del SIC)"
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "AGOST2017"
+++

Aquest article pretén descriure al detall funcionament de l'**Autoservei d'usuaris SIC 2.0 al [GitLab](https://git.intranet.gencat.cat/)**.

**Avís**: Aquest article ha estat editat el 30/04/2018 adaptant-lo al nou model de seguerat del SIC posat en producció en aquesta data.

Els usuaris que ja eren **"Release Manager Lot x Àmbit"** al sistema SIC 1.0, mantindran el mateix rol al sistema SIC 2.0. Això significa que en accedir al portal del GitLab (mitjançant credencials GICAR) podran trobar els Grups corresponents als codis de diàleg de les seves aplicacions.

_Important_: durant el primer accés al GitLab no es comptarà amb visibilitat en els Grups d'aplicacions. Caldrà esperar a l'endemà del primer login per tal de gaudir d'aquests accessos. Cal també destacar que la identitat GICAR de l'usuari ha de tenir informada l'adreça de correu, en cas contrari haurà de gestionar l'alta d'aquesta informació per poder accedir al Git.

Els **Grups** tindran com a nom el codi de diàleg de les aplicacions. Els usuaris Release Manager hauran de crear **Projectes** dins aquests grups per tal de disposar dels repositoris Git on fer la pujada de codi font de les aplicacions.

<center>![RML a SIC 1.0 VS SIC 2.0](/images/news/autoserveiUsuaris_1.PNG)</center>
<br/><br/>
Al crear els Projecte/s dins els grups d'aplicació, la resta d'usuaris del Lot que no siguin Release Manager no tindran visibilitat a aquests.

<CENTER>![Visibilitat resta usuaris Lot](/images/news/autoserveiUsuaris_2.PNG)</center>
<br/><br/>
Per tal de poder accedir a la vista d'aquests Grups/Projectes, cal navegar cap a les respectives seccions des del menú d'opcions. Aquest es desplega i replega picant al botó amb icone <img style="display:inline" src="/images/news/icone_menu_gitlab.PNG" alt="icone menu gitlab"/> , situat a la part superior esquerra.

Els mateixos usuaris Release Manager poden donar visibilitat a la resta d'usuaris que hagin d'accedir. La visibilitat la podran proporcionar a nivell de Projecte, no a nivell de Grup.

<CENTER>![Proporcionar accés a Projecte](/images/news/autoserveiUsuaris_3.PNG)</center>
<br/><br/>
Per tal de concedir l'accés d'un usuari a un Projecte cal:

* Accedir al Projecte al qual es vol proporcionar accés.
* Mitjançant el menú superior cal seleccionar "Settings" i, dins aquest ,"Members".
* Al formulari que apareix, cercar l'usuari al qual es vol donar l'accés. La cerca es pot realitzar per Nom o NIF. S'aconsella cercar per NIF.
* Escollir el rol que ha de tenir l'usuari dins el Projecte:
	* Rol Master: Permetrà crear Projectes sota el grup d'aplicació i proporcionar accés a altres usuaris als projectes dins el grup.
	* Rol Developer: Només permetrà treballar amb el projecte en qüestió (descàrrega i pujades).
* Picar sobre el botó de "Add to Project"

<CENTER>![Proporcionar accés a Projecte](/images/news/autoserveiUsuaris_4.PNG)</center>
<br/>

Amb aquesta acció, l'usuari ja podrà accedir al Projecte.
Cas que el rol escollit per a l'usuari hagués estat de Master, l'endemà de l'assignació, l'usuari haurà adquirit accés a la resta de projectes del grup d'aplicacions (Projectes), convertint-se a efectes pràctics en un altre Release Manager.

<CENTER>![Visibilitat adquirida segons Rol](/images/news/autoserveiUsuaris_5.PNG)</center>
<br/>

**AVÍS**: Si es desitja concedir permisos a un usuari per a un grup que no té cap projecte, caldrà prèviament crear el projecte per fer l'assignació desitjada.

Per a qualsevol dubte o aclariment sobre el funcionament de l'Autoservei d'usuaris SIC al GitLab, podeu obrir una petició de Consulta a 'Framework SIC' via SAU-Remedy o contacta amb la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat).