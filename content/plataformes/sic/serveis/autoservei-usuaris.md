---
toc: true
title: Autoservei d'usuaris
description: Autoservei d'usuaris mitjançant el Servei de Custòdia de Codi (Gitlab)
date: 2023-05-22
sections: SIC
taxonomies: []
aliases:
  - /sic30-serveis/autoservei-usuaris/
  - /sic/autoservei-usuaris/
  - /noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/
  - /sic-serveis/autoservei-usuaris/
weight: 4
---
## Introducció

El SIC proporciona un servei de gestió d'usuaris per a que els lots d'aplicacions disposin d'autonomia a l'hora d'assignar permisos d'accés sobre els diferents serveis.
Abans d'entrar en el [funcionament](/plataformes/sic/serveis/sic30-serveis/autoservei-usuaris/#funcionament) de l'autoservei d'usuaris,
explicarem breument l'actual estructura de permisos del SIC.

## Estructura de permisos

El SIC té estructurada la seva seguretat en diferents tipus de grups:

* Grups per a lots i proveïdors d'aplicacions
* Grups per a CPDs i LdTs
* Altres grups

### Grups per a lots i proveïdors d'aplicacions

Aquests tipus de grups contenen a desenvolupadors i altres perfils que componen l'amalgama de perfils requerits per desenvolupar una aplicació. Dins d'aquests tipus de grups, distingim dos subtipus:

* Release Managers
* Responsables de lot

A continuació, descriurem cadascun d'aquests subtipus.
<br/><br/>

#### Release Managers

Aquest tipus de grup recull als Release Managers, és a dir, a tots els usuaris amb perfil Release Manager que pertanyen a un
codi d'aplicació concret. Els membres d'un grup Release Managers són perfils que poden:

* Operar amb servei de **custòdia de codi**.
* **Concedir permisos** a altres companys per accedir com a Developers o Mantainers al codi d'aplicació corresponent, passant aquests últims a ser Release Managers a tots els efectes.
* **Crear nous projectes** dins del grup de l'aplicació.
* Accedir als serveis d'**integració contínua**.
* Accedir al servei de gestió de **binaris** per dipositar i recollir arxius.

#### Responsables de lot

Aquest tipus de grup recull als **responsables del lot d'aplicacions: equip d'arquitectura, qualitat, responsables de contracte i altres**. <br/>
Aquest grup és un agregador de totes les aplicacions del lot disposant d'una **participació transversal a tots els codis
de les aplicacions** i podent realitzar les mateixes accions que un Release Manager. <br/>
Els membres d'aquests grups seran gestionats per l’aplicació de [Control d’Accés de Recursos de GICAR](https://gicar.intranet.gencat.cat/gdi/controlaccesrecursos/),
disposant d'un grup per a cada un dels lots d'aplicacions segons la contractació vigent \[AM01-AM20].

### Grups d'àmbit

Aquest tipus de grup recull als **responsables d'àmbit** d'acord amb l'organigrama departamental de la Generalitat. <br/>
Aquest grup és un agregador de totes les aplicacions de l'àmbit disposant d'una **participació transversal a tots els codis
de les aplicacions** i podent realitzar les mateixes accions que un Release Manager (a excepció de l'entrega de binaris per al seu desplegament). <br/>
Els membres d'aquests grups seran gestionats per l’aplicació de [Control d’Accés de Recursos de GICAR](https://gicar.intranet.gencat.cat/gdi/controlaccesrecursos/),
disposant d'un grup per a cada un dels departaments/unitats previstes d'acord amb l'organigrama departamental vigent.

| Relació de grups d'àmbit                                            |
| ------------------------------------------------------------------- |
| DEPARTAMENT D'ACCIÓ CLIMÀTICA, ALIMENTACIÓ I AGENDA RURAL           |
| AGÈNCIA CATALANA DE CONSUM (ACC)                                    |
| AGÈNCIA PER A LA COMPETITIVITAT DE L'EMPRESA (ACCIO)                |
| AGÈNCIA CATALANA DE TURISME (ACT)                                   |
| AUTORITAT CATALANA DE PROTECCIÓ DE DADES (APDCAT)                   |
| AGÈNCIA TRIBUTÀRIA DE CATALUNYA                                     |
| DEPARTAMENT DE DRETS SOCIALS                                        |
| CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA                          |
| D.G. D'ATENCIÓ CIUTADANA                                            |
| CONSELL CATALA DE L'ESPORT                                          |
| FUNDACIÓ CENTRE DE LA SEGURETAT DE LA INFORM. CAT.                  |
| DEPARTAMENT DE CULTURA                                              |
| CENTRE DE TELECOMUNICACIONS I TECNOLOGIES DE LA INFORMACIO          |
| DIRECCIÓ GENERAL DE LA POLICIA                                      |
| ENT.AUTONOMA DIARI OFICIAL I PUBLICACIONS DE LA GENERALITAT         |
| ESCOLA D'ADMINISTRACIÓ PÚBLICA DE CATALUNYA (EAPC)                  |
| DEPARTAMENT D'ECONOMIA I HISENDA                                    |
| DEPARTAMENT D'EMPRESA I TREBALL                                     |
| DEPARTAMENT D'EDUCACIÓ                                              |
| DEPARTAMENT D'ACCIÓ EXTERIOR I GOVERN OBERT                         |
| INSTITUT CATALÀ D'ENERGIA (ICAEN)                                   |
| INSTITUT CATALÀ DE LA SALUT                                         |
| DEPARTAMENT D'IGUALTAT I FEMINISMES                                 |
| DEPARTAMENT D'INTERIOR                                              |
| DEPARTAMENT DE JUSTÍCIA                                             |
| OFICINA ANTIFRAU DE CATALUNYA                                       |
| DEPT. PDA -CONNECTIVITAT CENTRALITZADA                              |
| DEPARTAMENT DE POLÍTIQUES DIGITALS I ADMINISTRACIÓ PÚBLICA          |
| DEPARTAMENT DE LA PRESIDÈNCIA                                       |
| SINDICATURA DE COMPTES DE CATALUNYA                                 |
| SERVEI CATALA DE TRANSIT                                            |
| SISTEMA D'EMERGÈNCIES MÈDIQUES, SA (SEMSA)                          |
| SERVEI CATALÀ DE LA SALUT                                           |
| SERVEI D'OCUPACIÓ DE CATALUNYA                                      |
| DEPARTAMENT DE RECERCA I UNIVERSITATS                               |
| DEPARTAMENT DE VICEPRESIDÈNCIA I DE POLÍTIQUES DIGITALS I TERRITORI |

### Grups de CPDs i LdTs

Aquests tipus de grups recullen als tècnics dels diferents centres de processament de dades (CPD) i a llocs de treball (LdT).
Els membres d'aquest tipus de grups tenen **accés en mode lectura als repositoris i al servei de gestió de binaris**, a més poden executar a
Jenkins jobs de desplegament automàtic per CPD per als codis d'aplicació corresponents. <br/>
Els membres d'aquests grups seran gestionats per l’aplicació de [Control d’Accés de Recursos de GICAR](https://gicar.intranet.gencat.cat/gdi/controlaccesrecursos/),
disposant d'un grup per a cada un dels proveïdors d'infraestructura i categoria de lloc de treball vigents.

### Altres grups

Es tracta de grups especials per a la gestió del servei: **Administració, Oficina de Qualitat i Oficina de Seguretat**.
És a dir, són grups necessaris per al correcte funcionament dels serveis i per a la integració amb la resta d'agents del CTTI. <br/>
Aquests grups seran gestionats per l’aplicació de [Control d’Accés de Recursos de GICAR](https://gicar.intranet.gencat.cat/gdi/controlaccesrecursos/).

## Funcionament

A continuació, ens centrarem en la gestió de membres del grup de **Release Managers de les aplicacions mitjançant l'autoservei d'usuaris**.
Aquest servei es realitza mitjançant l'eina de custòdia de codi font implantada: [GitLab](https://git.intranet.gencat.cat/).

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://git.intranet.gencat.cat <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics de CPD disposaran d'accés al servei. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable.

### Creació de comptes d'usuari

Per a poder accedir al servei caldrà disposar d'un usuari GICAR operatiu i crear el compte corresponent. Per a fer-ho, haurà d'introduir l'identificador d'usuari i contrasenya i, en cas de tractar-se d'un nou compte, el sistema el redirigirà a la plana de perfil per a que pugui dur a terme el procés d'alta. <br/>

**IMPORTANT**: És imprescindible que la identitat GICAR de l'usuari tingui informada l'**adreça de correu**. Per tant, tant si el sistema el redirigeix contínuament a la pàgina de perfil per informar l'adreça de correu, com si no pot accedir al servei perquè es produeix un error d'autenticació amb unes credencials vàlides, caldrà fer una petició de suport al servei GICAR a través de SAU-Remedy.

### Estructura de grups i projectes

Els **Grups** tindran com a identificador el codi de diàleg de les aplicacions. Els usuaris Release Manager hauran de crear **Projectes** dins aquests grups per tal de disposar dels repositoris Git on fer la pujada de codi font de les aplicacions.

Per a més informació: [Custòdia de codi font](/plataformes/sic/serveis/sic30-serveis/scm/)

### Permisos d'accés

En crear projectes dins els grups d'aplicació, la resta d'usuaris del lot que no siguin Release Manager no disposaran de visibilitat.



![Visibilitat resta usuaris Lot](/images/news/autoserveiUsuaris_2.PNG)


Els mateixos usuaris Release Manager podran consultar, editar, afegir i eliminar membres del projecte, però ho hauran de fer \*\*a nivell de projecte\*\*, no de grup de projectes.



![Proporcionar accés a Projecte](/images/news/autoserveiUsuaris_3.PNG)



Per a concedir accés sobre un projecte caldrà:

* Accedir al **projecte**.
* Mitjançant el menú superior cal seleccionar "**Project information**" i, dins aquest ,"**Members**".
* A la plana que apareix, pressionar el botó "**Invite members**".
* Al formulari que apareix, cercar l'usuari al qual es vol donar accés. La cerca es pot realitzar per nom o NIF. S'aconsella **cercar per NIF**.
* Escollir el **rol** que ha de tenir l'usuari dins el projecte:
  		 *Rol Mantainer: permetrà treballar amb el projecte en qüestió, crear nous projectes dins el grup de l'aplicació i proporcionar accés a altres usuaris als projectes dins el grup.*
  		 Rol Developer: únicament permetrà treballar amb el projecte en qüestió (descàrrega i pujades).
  		* Rol Reporter: únicament permetrà visualitzar el codi font del projecte.
* Prémer el botó de "**Invite**"



![Proporcionar accés a Projecte](/images/news/autoserveiUsuaris_4.PNG)




En el cas que el rol escollit per a l'usuari hagués estat de **Mantainer**, l'endemà de l'assignació, l'usuari haurà adquirit accés a la resta de projectes del grup de l'aplicació, convertint-se a efectes pràctics en un nou Release Manager del codi d'aplicació. Aquesta **promoció a Release Manager** permetrà l'accés a la resta de serveis del SIC: custòdia de codi, gestió de binaris i integració contínua.



![Visibilitat adquirida segons Rol](/images/news/autoserveiUsuaris_5.PNG)




**AVÍS**: Si desitja concedir permisos a un usuari per a un grup que no disposa de cap projecte, caldrà prèviament crear el projecte per a poder dur a terme l'assignació desitjada.




Si voleu més informació podeu consultar la secció de **[Guies](/plataformes/sic/guies/sic30-guies/)**.

Si teniu qualsevol dubte o problema podeu revisar les **[Preguntes Freqüents](/sic/faq)** o utilitzar els canals de **[Suport](/sic/suport)**.
