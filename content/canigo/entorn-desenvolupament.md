+++
date        = "2015-11-18"
lastmod     = "2019-04-23"
title       = "Entorn de desenvolupament"
description = "Màquina virtual amb l'ecosistema d'eines Canigó per a començar a desenvolupar"
sections    = "Canigó"
weight 	    = 5
+++


### Introducció

_L'entorn de desenvolupament_ és una màquina virtual Linux, basada en Lubuntu Desktop (Ubuntu Bionic Beaver 18.04.2 LTS) per ser una distribució d'escriptori Linux lleugera, derivada d'una de les distribucions més esteses del món (Ubuntu / Debian) i amb suport LTS, a la qual se li ha afegit una selecció de programari enfocat principalment a aplicacions Canigó.


### Objectius

Els objectius perseguits per l'entorn de desenvolupament són:

* Facilitar la posada en marxa de l'entorn de desenvolupament, aprovisionant una màquina virtual amb tot el necessari per a començar el desenvolupament d'una aplicació Canigó.
* Simular els entorns de desplegament als CPD Generalitat, facilitant contenidors amb les mateixes versions i configuracions dels PaaS que ens trobarem als clouds.

Addicionalment aquesta versió de l'entorn de desenvolupament no només s'ha actualitzat amb les últimes versions estables del programari, sino que s'ha fet que estigui alineada amb l'última versió de Canigó 3.4 per proporcionar la millor experiència d'usuari *out-of-the-box* en el desenvolupament d'aplicacions Canigó.


### Prerequisits

Per poder treballar amb l'entorn de desenvolupament s'ha d'instal·lar prèviament el següent programari:

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://www.vagrantup.com/downloads.html)
* [Vagranfile](https://github.com/gencat/dev-environment/releases/tag/3.0.0) amb la configuració de l'entorn Canigó


### Instal·lació

La versió 3.0.0 ha simplificat i automatitzat la configuració inicial fins al punt de no haver de fer cap acció especial per part de l'usuari (vegeu apartat _KNOWN ISSUES_ de la versió).

1. Descarregar la configuració del vagrant amb la següent comanda

        git clone https://github.com/gencat/dev-environment.git

2. Anar al directori `dev-environment/Vagrant` i arrencar l'entorn amb

        vagrant up

    Amb aquesta última instrucció, vagrant aixeca una màquina virtual a Virtualbox, i executa les comandes que inclogui el fitxer `Vagrantfile`. El temps d'instal·lació pot variar **entre 25 i 90 minuts**, pel fet que ha de descarregar i instal·lar tot el software necessari.

En el moment que a la màquina virtual aixecada es vegi l'escriptori, el procés haurà finalitzat.


#### Notes addicionals

* Tot i que es pot engegar i aturar la màquina virtual a través de VirtualBox, es recomana utilitzar les comandes `vagrant up` i `vagrant halt` per fer aquestes accions.
* Es recomana no realitzar cap actualització ni de versió de sistema operatiu ni d'eines a l'entorn sense prèvia consulta a l'equip del CS Canigó.


### Software base

El software base s'ha instal·lat un conjunt de programari per a les tasques complementàries de desenvolupament. Aquest software addicional s'ha instal·lat dins el directori `/opt`

* Open JDK 8 (1.8.0_191)
* Visual VM 1.3
* Clients per diferents BBDD (Mysql, PostgreSQL, MongoDB i Redis)
* Navegador Mozilla FireFox Quantum (66.0.3)
* Client VPNC per accés a XCAT
* Navegador Google Chrome (73.0.3683.103)
* Engine Docker i Docker Compose Tool per l'execució de contenidors Docker
* Servidor Apache HTTP (2.4)


### Software addicional

A banda del software base s'ha instal·lat i configurat un conjunt de programari addicional dins el directori `/opt`, amb les versions alineades al [full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/).

* Open JDK 11 (11.0.2 : OpenJDK 64-Bit Server VM 18.9)
* LanguageTool 5.3 - Per revisar gramàtica, ortografia i formes correctes del català.
* DBeaver 6.0.2 - Eina multi-paradigma (SQL, No-SQL, etc.) per a BBDD.
* SoapUI 5.5.0 - Eina per treballar amb serveis SOAP i REST.
* jMeter 5.1.1 - Eina per fer validacions funcionals, proves de càrrega i mesures de rendiment d'aplicacions.
* NodeJS - Servidor d'aplicacions JS. Les versions instal·lades són 8.15.1 i 10.15.3.
* Visual Studio Code - Editor altament extensible (mitjançant plugins). Recomanable principalment per a treballar amb tecnologies frontend (AngularJS, Javascript, Typescript, etc.)
* Maven 3.5.3
* IDE - [Spring Tool Suite 4.2.0](https://spring.io/tools) (basat en Eclipse 2019/03), i els següents plugins:
  - [Plugin CTTI Canigó](https://canigo.ctti.gencat.cat/canigo-download-related/plugin-canigo/) per creació aplicacions Canigó 3.4 basades en arquitectura REST+HTML5/JS.
  - Spring Tool Suite per facilitar el desenvolupament d'aplicacions basades en [Spring](http://spring.io/projects).
  - SonarLint permet detectar i solucionar problemes de qualitat al codi (actualment Java, JavaScript, Python i PHP) [SonarLint](https://www.sonarlint.org/).
* jEdit 5.5.0 - Editor de textos (més lleuger que VS Code) basat en Java. Recomanable per a l'edició de fitxers grans (logs).


### Screenshots

A continuació s'adjunta un petit recull de captures de pantalla on es pot copsar l'escriptori i diferents programes per treballar-hi.

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_35_36.png" width="50%" /><p style="font-size: small;">Figura 1. Escriptori</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_37_15.png" width="50%" /><p style="font-size: small;">Figura 2. Exemples de comandes al terminal</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_33_42.png" width="50%" /><p style="font-size: small;">Figura 3. Eclipse Spring Tool Suite 4</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_45_54.png" width="50%" /><p style="font-size: small;">Figura 4. Gestor DBeaver</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_49_50.png" width="50%" /><p style="font-size: small;">Figura 5. VS Code</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_35_03.png" width="50%" /><p style="font-size: small;">Figura 6. Editor jEdit</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_29_24.png" width="50%" /><p style="font-size: small;">Figura 7. Language Tool</p></center>


### Versions

#### 3.0.0 (22/04/2019) -- <span style="color:green">OPERATIVA</span>

_RELEASE NOTES_

* Actualitzacions del programari i millores generals.
* Certificació funcionament amb plugin d'Eclipse v1.7.0 de Canigó.

_KNOWN ISSUES_

* El sistema d'àudio (hda, ac97) no funciona correctament degut a un error relacionat amb la versió de VirtualBox (p.e. 5.2.18). En versions més noves (>= 6.0.0) pot estar resolt (tot i que no s'ha verificat aquest punt). Podeu trobar més informació al següent enllaç: [https://forums.virtualbox.org/viewtopic.php?f=8&t=91190](https://forums.virtualbox.org/viewtopic.php?f=8&t=91190)

#### 2.0.4 (22/11/2018)

_RELEASE NOTES_

* Deshabilitats "Update sites" excepte pel plugin de Canigó
* Certificació funcionament amb plugin d'Eclipse v1.7.0 de Canigó

#### 2.0.3 (6/8/2018)

_RELEASE NOTES_

* Millores en el procés de construcció de la VM per tal d'aïllar-lo d'alguns recursos externs importats ara dins el [repositori](https://github.com/gencat/dev-environment/tree/master/Vagrant/resources) de l'entorn de desenvolupament.

#### 2.0.2 (25/6/2018)

_RELEASE NOTES_

* Es detecten problemes amb el servei de VirtualBox Guest Additions. No s'instal·len i es deixa desactivada l'acceleració 3D

#### 2.0.1 (19/6/2018)

_RELEASE NOTES_

* S'activa l'acceleració 3D i s'incrementa la memòria de video per poder arrencar la VM ja que havia deixat de funcionar el mode gràfic

#### 2.0.0 (20/11/2017)

_RELEASE NOTES_

* Incorporada nova versió del plugin d'Eclipse per Canigó 3.2
* Implementat procés de healthcheck per comprovar el correcte funcionament del procés de construcció de la VM

#### 1.0.4 (29/05/2017)

_RELEASE NOTES_

* Actualitzada la versió de Oracle Java a 1.8

#### 1.0.3 (21/03/2017)

_RELEASE NOTES_

* Actualitzada la màquina virtual a Ubuntu 16.04
* Actualitzat el plugin SVN a la versió 1.12.x

#### 1.0.2 (9/1/2017)

_RELEASE NOTES_

* Revisats enllaços "trencats" a instal·lables (Subclipse, Docker Tooling, ...)

#### 1.0.1 (16/3/2016)

_RELEASE NOTES_

* Actualització a Ubuntu 15.10

_RELEASE NOTES_

En cas de voler actualitzar a la v1.0.1 des de la v1.0.0 de l'entorn de desenvolupament cal...

* Fer l'upgrade a la versió 15.10 d'Ubuntu
* Executar les següents comandes per a que segueixi apareixent el fons de pantalla corporatiu CTTI:

		$ sudo cp /usr/share/lubuntu/wallpapers/1510-lubuntu-default-wallpaper.png /usr/share/lubuntu/wallpapers/1510-lubuntu-default-wallpaper_bck.png
		$ sudo wget http://canigo.ctti.gencat.cat/devenv/fonspantalla_1280.png -O /usr/share/lubuntu/wallpapers/1510-lubuntu-default-wallpaper.png

* Revisar la configuració de teclat a Preferències -> IBus Preferences -> Input method (en cas de no estar activat l'IBus cal activar-lo a Preferències -> Language Support -> Keyboard input method system)

#### 1.0.0 (16/11/2015)

RELEASE NOTES

* Versió inicial
