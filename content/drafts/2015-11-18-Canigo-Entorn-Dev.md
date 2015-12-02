+++
date        = "2015-11-18"
title       = "Canigó. Nou entorn de desenvolupament"
description = "A mitjans d'aquest mes de Novembre ha estat publicat el nou entorn de desenvolupament de Canigó. Amb aquest nou entorn es canvia l'antic instal·lable (.exe) exclusiu per a sistemes operatius Windows per un entorn multiplaforma amb moltes més possibilitats."
section     = "Notícies"
key         = "DESEMBRE2015"
categories  = ["canigo"]
+++

A mitjans d'aquest mes de Novembre ha estat publicat el nou entorn de desenvolupament de Canigó. Amb aquest nou entorn es canvia l'antic instal·lable (.exe) exclusiu per a sistemes operatius Windows per un entorn multiplaforma amb moltes més possibilitats.


A continuació s'especifiquen les característiques més rellevants d'aquest nou entorn de desenvolupament:

**Màquina virtual**

* VM [Oracle VirtualBox](https://www.virtualbox.org/): aprovisionament de màquina virtual a partir d'un script [Vagrant](https://www.vagrantup.com/)
* Linux: màquina virtual basada en sistema operatiu [Ubuntu](http://www.ubuntu.com/)
* Personalitzacions: màquina virtual personalitzada proporcionant un espai d'eines CTTI

**IDE**

L'IDE és [Spring Tool Suite] (https://spring.io/tools) (basat en Eclipse Mars) amb jre7 (Oracle) i els següents plugins:

* M2Eclipse per integració amb [Apache Maven](https://maven.apache.org/)
* Canigó 1.4.1 per creació aplicacions Canigó 3.1 basades en arquitectura REST+HTML5/JS o JSF
* Spring Tool Suite per facilitar el desenvolupament d'aplicacions basades en [Spring](http://spring.io/projects)
* Docker Tooling per manegar els contenidors [Docker](https://www.docker.com/)
* Subclipse per integració amb [Subversion] (https://subversion.apache.org/)
* SonarQube per integració amb [SonarQube] (http://spring.io/projects) (antic Sonar)

**Altres**

* Engine Docker i Docker Compose Tool per l'execució de contenidors Docker
* Navegador Google Chrome
* Client VPNC per accés a XCAT
* Fons de pantalla corporatiu CTTI
* Accessos directes a eines CTTI: SIC ([SVN](http://svn.intranet.gencat.cat) i [Jenkins](http://hudson.intranet.gencat.cat)), [JIRA CSTD](https://cstd.ctti.gencat.cat/), [Portal Frameworks i Solucions d'Arquitectura](http://canigo.ctti.gencat.cat/).


A més d'aquest nou entorn de desenvolupament des del CS Canigó també s'ha publicat una aplicació demo [Equipaments](https://github.com/cs-canigo/equipaments) amb la finalitat de proporcionar als proveïdors d'aplicacions un exemple d'aplicació Canigó 3.1 per a ser desplegada en contenidors Docker. L'ús d'aquests contenidors Docker pretén simular el desplegament en els PaaS del [Full de ruta de CTTI] (https://portic.ctti.gencat.cat/les_tic/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf#search=full%20de%20ruta). El stack on es desplega aquesta aplicació demo Equipaments és Apache 2.4/Tomcat 7/MySQL 5.6.

A la secció ["Framework Canigó"](http://canigo.ctti.gencat.cat/canigo/) -> ["Entorn de desenvolupament"](http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) dins d'aquest portal podeu trobar més informació amb el detall del procés d'instal·lació, execució de l'aplicació demo Equipaments així com d'altra informació d'interès per a treballar amb aquest nou entorn de desenvolupament.

Per a qualsevol dubte, problema o suggerència relatiu a aquest nou entorn de desenvolupament ens podeu fer arribar una petició al servei [CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o bé enviar-nos un correu a la nostra [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).