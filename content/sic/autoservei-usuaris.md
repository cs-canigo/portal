+++
date        = "2017-07-18"
title       = "Autoservei d'usuaris"
description = "Autoservei d'usuaris SIC 2.0 al GitLab"
aliases = [
    "/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/",
    "/noticies/2017-11-10-SIC-Estructura-permisos-i-Autoservei/"
]
sections    = "SIC"
taxonomies  = []
weight 		= 10
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


### Estructura de permisos del SIC 2.0

El SIC 2.0 té estructurada la seva seguretat en diferents tipus de grups:

* Grups per a lots i proveïdors d'aplicacions
* Grups per a CPDs i LdT
* Altres grups


#### Grups per a lots d'aplicacions

Aquests tipus de grups contenen a desenvolupadors i altres perfils que componen l'amalgama de perfils requerits per desenvolupar una aplicació. Dins d'aquests tipus de grups, distingim tres subtipus de grups:

* Release Managers
* Responsable de lot

A continuació, descriurem cadascun d'aquests subtipus.

**Release Managers**

Aquest tipus de grup recull als Release Managers (RM, en endavant). És a dir, recullen a tots els usuaris amb perfil Release Manager que pertanyen a un codi d'aplicació concret. Per exemple, el grup de RM del codi d'aplicació 0192 recull tots els Release Managers d'aquest codi d'aplicació.

Els membres d'un grup RM són perfils que poden:

* Operar amb el GitLab
* Concedir permisos a altres companys per accedir com a Developers o Masters al codi d'aplicació corresponent
* Crear projectes dins del grup oficial (el que té com a nom el codi d'aplicació) al GitLab
* Accedir a la plataforma Jenkins per veure el resultat de l'execució d'un job
* Dipositar i recollir binaris dipositats prèviament al mòdul de Gestió de binaris

**Responsable de lot**

Aquest tipus de grup recull als Responsables de Lot (RSPL, en endavant). Al SIC 1.0, els membres d'aquest tipus de grup eren els encarregats de sol·licitar accés per a un RM. Actualment, al SIC 2.0, aquesta funcionalitat careix de valor gràcies a l'autoservei d'usuaris, mitjançant el qual els propis RMs poden concedir accés a companys. Aquest grup ha passat a ser un agregador tots els codis d'aplicació per a un lot. És a dir, són membres d'un lot d'aplicacions amb una participació transversal a tots els codis d'aplicació i poden realitzar les mateixes accions que un RM.


#### Grups de CPD i Ldt

Aquests tipus de grups corresponen a CPDs (CPD1, CPD2...) i a LDT (LT2A, LT2B...). Els membres d'aquest tipus de grup tenen accés en mode lectura als repositoris i al mòdul de gestió de binaris i poden executar a Jenkins jobs de desplegament automàtic per als codis d'aplicació que els hi corresponen.

La pertinença als grups d'aquest tipus és automàtica i ve donada per la categorització que fa GICAR als usuaris, els quals assigna a un LOT/CPD/LDT concret en el moment de la creació. Per tant, tot usuari de GICAR per ser d'un CPD o un grup de LDT concrets té accés preconcedit al SIC 2.0.


#### Altres tipus de grups

Al SIC 2.0 tenim altres grups per a la gestió del servei i altres funcionalitats. Grup d'administradors, un grup concret per a Qualitat, etc. Són grups per al correcte funcionament i per a la integració del SIC amb la resta d'agents del CTTI.

La pertincença als grups d'aquest tipus es realitza de forma manual ja que els usuaris d'aquest tipus de grups varia amb molt poca freqüència.

### Autoservei

Per tant, l'autoservei d'usuaris afecta als lots i proveïdors fora de lot d'aplicacions. Tot usuari que necessiti accés haurà de sol·licitar als companys que ja en tenen que els hi concedeixin accés. Us recordem que a l'inici d'aquest document explicàvem com concedir permisos a companys per accedir al SIC com RM.

Hem inclòs referències a aquest article tant a l'apartat de [manuals del SIC](http://canigo.ctti.gencat.cat/sic-documentacio/manuals/) com a l'apartat de [FAQ del SIC](http://canigo.ctti.gencat.cat/sic/faq/) dins del web d'arquitectura per a que sigui més fàcil localitzar-lo.



Per a qualsevol dubte o aclariment sobre el funcionament de l'Autoservei d'usuaris SIC al GitLab, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
