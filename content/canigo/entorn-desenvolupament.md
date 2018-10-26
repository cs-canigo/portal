+++
date        = "2015-11-18"
lastmod     = "2017-11-20"
title       = "Entorn de desenvolupament"
description = "Màquina virtual amb l'ecosistema d'eines Canigó per a començar a desenvolupar"
sections    = "Canigó"
weight 		= 5
+++

### Objectius

* Facilitar la posada en marxa de l'entorn de desenvolupament, aprovisionant una màquina virtual amb tot el necessari per a començar el desenvolupament d'una aplicació Canigó.
* Simular els entorns de desplegament als CPD Generalitat, facilitant contenidors amb les mateixes versions i configuracions dels PaaS que ens trobarem als clouds.

### Pre requisits

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://www.vagrantup.com/downloads.html)
* [Vagranfile](https://github.com/gencat/dev-environment/releases/tag/2.0.3) amb la configuració de l'entorn Canigó

La creació de la VM ha estat certificada amb Vagrant 2.1.1. Es recomana l'ús d'aquesta versió o superior.

### Com començar?

* Descarregar i descomprimir el [zip](https://github.com/gencat/dev-environment/archive/2.0.3.zip) a la carpeta que desitgem (p.e. c:/vms o /home/user/vms)

* Anar per línia de comanda a la carpeta on estigui el Vagrantfile i executem:

		vagrant up

	Amb aquesta instrucció, vagrant aixecarà una màquina virtual a Virtualbox i executarà les comandes que inclogui el Vagrantfile. El temps d'instal·lació serà llarg degut a que instal·la tot el software necessari per a desenvolupar i desplegar en els entorns de proves (es pot veure què instal·la reseguint el shell script).

* En el moment que a la màquina virtual aixecada es vegi l'escriptori, el procés ja haurà finalitzat. Podem tancar la màquina i engegar-la i aturar-la a través de VirtualBox.


### Setup inicial

* Usuari i password: canigo/canigo
* Obrir un terminal i executar

		sudo dpkg-reconfigure keyboard-configuration

* _Important_: es recomana no realitzar cap actualització ni de versió de sistema operatiu ni d'eines a l'entorn sense previa consulta a l'equip del CS Canigó. En aquesta linia s'hauria de configurar l'Eclipse per deshabilitar les notificacions d'actualitzacions disponibles a Preferences -> Install/Update -> Automatic Updates -> Automatically find new updates and notify me

### Programari instal·lat

* IDE: [Spring Tool Suite] (https://spring.io/tools) (basat en Eclipse Mars) amb JDK 8 (Oracle) i els següents plugins:

	- M2Eclipse per integració amb [Apache Maven](https://maven.apache.org/)
	- [CTTI Canigó](https://canigo.ctti.gencat.cat/canigo-download-related/plugin-canigo/) per creació aplicacions Canigó 3.2 basades en arquitectura REST+HTML5/JS
	- Spring Tool Suite per facilitar el desenvolupament d'aplicacions basades en [Spring](http://spring.io/projects)
	- Subclipse per integració amb [Subversion] (https://subversion.apache.org/)
	- SonarQube per integració amb [SonarQube] (http://www.sonarqube.org/) (antic Sonar)

* Altres

	- Engine Docker i Docker Compose Tool per l'execució de contenidors Docker
	- Navegador Google Chrome
	- Client VPNC per accés a XCAT

### Oracle VirtualBox

Si es vol poder copiar text entre la màquina host i la guest cal activar la opció Dispositiu -> Portapapers compartit -> Bidireccional

Si es volen afegir carpetes compartides entre la màquina host i la guest s'han de seguir les següents passes:

* Afegir el grup vboxsf a l'usuari canigo (cal ser root o fer sudo):

		$ sudo usermod -a -G vboxsf canigo

* Reiniciar la màquina o tornar logar-se.
* Afegir les carpetes desitjades a través de Dispositius -> Carpetes compartides -> Preferències de carpetes compartides... Es pot fer en "calent" i apareixen al directori "/media" dins la màquina virtual.

### Versions

#### 2.0.3 (6/8/2018) -- <span style="color:green">OPERATIVA</style>

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
