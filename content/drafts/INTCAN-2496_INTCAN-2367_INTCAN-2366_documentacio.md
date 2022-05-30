+++
date        = "2022-05-30"
title       = "Documentació"
description = "Documentació màquina virtual 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 3
+++

### Introducció

**_L'entorn de desenvolupament_ és una màquina virtual Linux**, basada en Lubuntu Desktop (Ubuntu Bionic Focal 20.4.2 LTS)
per ser una distribució d'escriptori Linux lleugera, derivada d'una de les distribucions més esteses del món (Ubuntu / Debian)
i amb suport LTS, **a la qual se li ha afegit una selecció de programari enfocat principalment a aplicacions Canigó**.


### Objectius

Els objectius perseguits per l'entorn de desenvolupament són:

* Facilitar la posada en marxa de l'entorn de desenvolupament, aprovisionant una màquina virtual amb tot el necessari
per a començar el desenvolupament d'una aplicació Canigó.
* Simular els entorns de desplegament als CPD's Generalitat, facilitant contenidors amb les mateixes versions i
configuracions dels PaaS que ens trobarem als clouds.

Addicionalment, aquesta versió de l'entorn de desenvolupament no només s'ha actualitzat amb les últimes versions
estables del programari, sinó que s'ha fet que estigui alineada amb l'última versió de Canigó 3.6.x per a proporcionar
la millor experiència d'usuari *out-of-the-box* en el desenvolupament d'aplicacions Canigó.


### Prerequisits

Per poder treballar amb l'entorn de desenvolupament s'ha d'instal·lar prèviament el següent programari:

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://www.vagrantup.com/downloads.html)
* [Vagranfile](https://github.com/gencat/dev-environment/releases/tag/3.1.0) amb la configuració de l'entorn Canigó

Per a poder utilitzar l'entorn de desenvolupament és necessari:

* 180 GB de disc dur lliure
* 6 GB de memòria ram lliure
* 32 MB de memòria de vídeo lliure

### Instal·lació

La versió 3.1.0 ha simplificat i automatitzat la configuració inicial fins al punt de no haver de fer cap acció
especial per part de l'usuari.

1. Descarregar la configuració del vagrant amb la següent comanda
```
git clone https://github.com/gencat/dev-environment.git
```

2. Anar al directori `dev-environment/Vagrant` i arrencar l'entorn amb
```
vagrant up
```

Amb aquesta última instrucció, vagrant aixeca una màquina virtual a Virtualbox, i executa les comandes que
inclogui el fitxer `Vagrantfile`. El temps d'instal·lació pot variar **entre 25 i 60 minuts**, pel fet que
ha de descarregar i instal·lar tot el programari necessari.

En el moment que a la màquina virtual aixecada es vegi l'escriptori, el procés haurà finalitzat.

<br/>
#### Notes addicionals

* Tot i que es pot engegar i aturar la màquina virtual a través de VirtualBox, es recomana utilitzar les
comandes `vagrant up` i `vagrant halt` per fer aquestes accions.
* Es recomana no realitzar cap actualització ni de versió de sistema operatiu ni d'eines a l'entorn sense prèvia
consulta a l'equip del CS Canigó.
* **Hosts Windows/Mac**: En el cas que hi hagi problemes de codificació en el moment d'arrencar l'entorn, es pot
deure al fet que els fitxers de text (p. ex. `provision.sh`) s'han adaptat automàticament als caràcters EOL del host.
 En aquest cas s'ha d'indicar a GIT que no faci aquesta adaptació automàtica (respectant el contingut original),
 amb les següents dues comandes i tornant a instal·lar de zero l'entorn (`git clone` + `vagrant up`).

```
git config --global core.autocrlf false
vagrant destroy -f
```

### Programari base

S'ha instal·lat un conjunt de programari base per a les tasques complementàries de desenvolupament.
Aquest programari s'ha instal·lat dins el directori `/opt`.

* Open JDK 8
* Open JDK 11
* Visual VM 1.4.3
* Clients per diferents BBDD (Mysql, PostgreSQL, MongoDB i Redis)
* Navegador Mozilla FireFox Quantum (>= 96.0)
* Client VPNC per accés a XCAT
* Navegador Google Chrome (>= 97.0.4692.99)
* Engine Docker i Docker Compose Tool per l'execució de contenidors Docker
* Servidor Apache HTTP (2.4)

### Programari addicional

A banda del programari base, s'ha instal·lat i configurat un conjunt de programari addicional dins el directori `/opt`,
amb les versions alineades al [Full de ruta del programari CTTI]
(https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/).

* LanguageTool 5.3 - Per revisar gramàtica, ortografia i formes correctes del català.

* DBeaver 6.0.2 - Eina multi-paradigma (SQL, No-SQL, etc.) per a BBDD.

* SoapUI 5.7.0 - Eina per treballar amb serveis SOAP i REST.

* jMeter 5.1.1 - Eina per fer validacions funcionals, proves de càrrega i mesures de rendiment d'aplicacions.

* NodeJS - Servidor d'aplicacions JS. Les versions instal·lades són 14.18.3 i 16.13.2.

* Visual Studio Code - Editor altament extensible (mitjançant plugins). Recomanable principalment per a treballar
amb tecnologies frontend (AngularJS, Javascript, Typescript, etc.)

* Maven 3.8.3

* IDE - [Spring Tool Suite 4.13.0](https://spring.io/tools) (basat en Eclipse 2.3.800.v20211124-1800), i els següents plugins:
  - [Plugin CTTI Canigó]((/canigo-fwk-docs/entorn-de-desenvolupament/plugin-eclipse/)) per a la creació aplicacions Canigó 3.6.x basades en arquitectura REST+HTML5/JS.
  - Spring Tool Suite per facilitar el desenvolupament d'aplicacions basades en [Spring](http://spring.io/projects).
  - SonarLint permet detectar i solucionar problemes de qualitat al codi (actualment Java, JavaScript, Python i PHP) [SonarLint](https://www.sonarlint.org/).

* jEdit 5.5.0 - Editor de textos (més lleuger que VS Code) basat en Java. Recomanable per a l'edició de fitxers grans (logs).

### Screenshots

A continuació s'adjunta un petit recull de captures de pantalla on es pot copsar l'escriptori i diferents programes per treballar-hi.

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_35_36.png" width="960px" /><p style="font-size: small;">Figura 1. Escriptori</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_37_15.png" width="960px" /><p style="font-size: small;">Figura 2. Exemples de comandes al terminal</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_33_42.png" width="960px" /><p style="font-size: small;">Figura 3. Eclipse Spring Tool Suite 4</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_45_54.png" width="960px" /><p style="font-size: small;">Figura 4. Gestor DBeaver</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_49_50.png" width="960px" /><p style="font-size: small;">Figura 5. VS Code</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_18_04_2019_10_35_03.png" width="960px" /><p style="font-size: small;">Figura 6. Editor jEdit</p></center>

<center><img src="/images/bloc/201904-entorn-desenvolupament/VirtualBox_CanigoDev-3.0.0_23_04_2019_10_29_24.png" width="960px" /><p style="font-size: small;">Figura 7. Language Tool</p></center>