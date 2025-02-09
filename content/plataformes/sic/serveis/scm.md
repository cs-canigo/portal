+++
date = "2022-11-21"
title = "Custòdia de codi font"
description = "GitLab és l'eina implantada al SIC per la custòdia de codi font"
aliases = [
    "/sic30-serveis/scm/",
    "/howtos/2017-07-Howto-Migrar-repositori-SVN-a-repositori-GIT/"
]
sections = "SIC"
taxonomies = []
toc = true
weight = 1
+++

![GitLab](/related/sic/serveis/gitlab-logo.png "GitLab")

## Introducció

**GitLab** és l'eina implantada al SIC per la custòdia de codi font. Es tracta d'un servei web de control de versions i desenvolupament de software col·laboratiu basat en Git. A més de gestor de repositoris, el servei ofereix també allotjament de Wikis i un sistema de seguiment d'errors, tot publicat sota una llicència de codi obert.
<br>
<br>
Gitlab és utilitzat per més de 100.000 organitzacions d'arreu del món. S’han realitzar proves en organitzacions amb 10.000 projectes amb el mateix temps i la mateixa qualitat de resposta que amb un sol projecte.
<br>
<br>
El Gitlab està integrat amb el Servei d'Integració Contínua, en publicar una nova versió del codi font sobre la branca MASTER, automàticament es dispararà la tasca de construcció i desplegament associada en el sistema d’Integració Contínua (Jenkins).
<br>
<br>
Aquest repositori no és un entorn de desenvolupament, per lo que només les persones assignades com a Release Managers seran les encarregades de **consolidar el codi i lliurar-lo**. Aquest codi font ja haurà d’estar validat en entorns de desenvolupament i es lliurarà quan es decideixi distribuir als entorns dels serveis TIC centrals.

## Funcionament

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://git.intranet.gencat.cat <br/>
Per a poder accedir via VPN cal assegurar que es disposa de connectivitat pel port 443/TCP i, en cas de no disposar de connectivitat, caldrà obrir una petició demanant l'obertura de Tallafocs dels seus entorns.

Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics de CPD disposaran d'accés al servei, així com la resta de membres de l'equip de desenvolupament als que es decideixi atorgar accés. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable. <br/>

![GitLab](/related/sic/serveis/gitlab-sic.png)
<br/>

### Creació de comptes d'usuari i permisos d'accés

Per a poder accedir al servei caldrà disposar d'un usuari GICAR operatiu (amb l'adreça de correu associada) i crear el compte corresponent. Per a fer-ho, haurà d'introduir l'identificador d'usuari i contrasenya i, en cas de tractar-se d'un nou compte, el sistema el redirigirà a la plana de perfil per a que pugui dur a terme el procés d'alta. <br/>
Si no disposa d'accés als grups i projectes s'haurà d'adreçar als **Release Managers** del codi de diàleg o al responsable del lot per a que l'incloguin com a membre del projecte o projectes que es considerin. A partir d’aquest moment, ja podrà gestionar el codi font i a l'endemà l'usuari passarà a ser un Release Manager a tots els efectes, disposant d'accés a tots els serveis del SIC per al codi de diàleg corresponent.

Per a més informació: [Autoservei d'usuaris](/plataformes/sic/serveis/sic30-serveis/autoservei-usuaris/)

### Estructura de grups i projectes

Totes les aplicacions que recull l'inventari d'aplicacions disposen automàticament d'un grup al GitLab per al codi de diàleg del CTTI corresponent (per exemple: https://git.intranet.gencat.cat/0192). Dins el grup assignat, es poden crear tants projectes com conjunts de codi susceptibles de ser versionats de forma independent. Pot tractar-se d'una **llibreria, un microservei, un mòdul o un programa sense fragments independents**.
<br/>
Per accedir a la vista de grups i projectes, ho podrà fer des del menú d'opcions generals (botó <img style="display:inline" src="/images/news/icone_menu_gitlab.PNG" alt="icone menu gitlab"/> situat a la part superior esquerra).
<br/>

A continuació es detallen les restriccions aplicades a l'hora de fer el lliurament de codi:

* **No es poden incloure binaris** de llibreries ni d’altres mòduls ni executables (JAR, WAR, EAR, DLL, EXE...) i la
mida màxima dels arxius serà de 25MB. A tal efecte,
s’ha habilitat un sistema de gestió de [Binaris](bin.sic.intranet.gencat.cat).

* No es permet l'ús de versions **snapshot**, per lo que s'impedirà la pujada del fitxer `pom.xml` si aquest les referencia.

* No es permet incloure fitxers de configuració de les eines de construcció: `settings.xml` (Maven), `.npmrc` (Npm) o
`nuget.config` (.NET Framework). Aquestes configuracions seran injectades per SIC amb tota la configuració necessària.

Per a arxius de gran mida, es podrá fer ús de l'extensió [Git-lfs](/howtos/2019-10-09-sic-Howto-Git-lfs).

### Creació de nous projectes

Per a crear nous projectes caldrà dirigir-se al grup del codi de diàleg i prémer l'acció "New project". Haurà d'indicar el nom del projecte i seleccionar el nivell de visibilitat "Private".

<CENTER>![Nou projecte](/related/sic/serveis/new_project.png)</center>
<br/>

### Integració contínua

En publicar una nova versió del codi font sobre la branca MASTER, automàticament es dispararà la tasca de construcció i desplegament associada en el sistema d'Integració Contínua (Jenkins). En aquest sentit, cal tenir presents algunes premisses:

* Els repositoris poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la branca **MASTER** i el contingut d’aquesta branca serà amb el que treballarà la tasca associada.
* Cal proporcionar processos de construcció d’artefactes **independents de les màquines i plataformes** on s’executen, de forma que siguin aplicables tant en els entorns de desenvolupament com en els entorns del SIC.

Per a més informació: [Integració contínua](/plataformes/sic/serveis/sic30-serveis/ci/)

<br/><br/>
Teniu a la vostra disposició alguns articles relacionats amb el servei:

- [Utilitzar Git-lfs per a arxius de gran tamany](/howtos/2019-10-09-sic-Howto-Git-lfs)
- [Configurar notificacions via email al Gitlab](/howtos/2019-10-09-sic-Howto-Gitlab-Mail)

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).