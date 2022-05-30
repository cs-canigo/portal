+++
date        = "2022-05-30"
title       = "Canigó. Com instal·lar les VBOX guest additions"
description = "Com instal·lar les VBOX guest additions a l'entorn de desenvolupament de Canigó"
section     = "howtos"
categories  = ["canigo"]
#key        = "JULIOL2022"
+++


## Introducció

Dins dels lliurables del framework Canigó hi consta l'[Entorn de desenvolupament de Canigó](/canigo-fwk-docs/entorn-de-desenvolupament/).
**Es tracta d'una màquina virtual Linux, basada en Lubuntu Desktop** (Ubuntu Bionic Focal 20.4 LTS)
pel fet de ser una distribució d’escriptori Linux lleugera, derivada d’una de les distribucions més esteses del món (Ubuntu/Debian)
i amb suport LTS, a la qual se li ha afegit una selecció de programari enfocat principalment a aplicacions Canigó.

Els objectius perseguits per l’entorn de desenvolupament són:

* Facilitar la posada en marxa de l’entorn de desenvolupament, aprovisionant una màquina virtual amb tot el necessari
per a començar el desenvolupament d’una aplicació Canigó.

* Simular els entorns de desplegament als CPD de la Generalitat, facilitant contenidors amb les mateixes versions i
configuracions dels PaaS que ens trobarem als clouds.

Per a poder utilitzar l'entorn de desenvolupament d'una forma més integrada amb l'ordinador host on està allotjada, per exemple
per a compartir fitxers entre la màquina virtual i el host, és necessari instal·lar les *VBOX guest additions*.
A continuació es descriuen els passos per a fer-ho.

## Conèixer la versió de Virtual Box

Per a poder instal·lar les *VBOX guest additions* és necessari saber abans quina és la versió de Virtual Box. Per a obtenir-la,
cal anar al menú:

*Ayuda > Acerca de Virtual Box ...*

![Acerca de Virtual Box](/images/howtos/2021-02-08-Acerca_virtual_box.png)

On podrem comprovar que la versió, en aquest cas, és la 6.1.26.

## Instal·lar VBOX guest additions

Un cop finalitzada la instal·lació de l'entorn de desenvolupament de Canigó seguint les instruccions indicades a l'
[Entorn de desenvolupament](/canigo-fwk-docs/entorn-de-desenvolupament/), caldrà entrar en un terminal
i executar les següents comandes indicant la versió adient.

Exemple per a la versió 6.1.26:

```
cd /tmp
wget -nv http://download.virtualbox.org/virtualbox/6.1.26/VBoxGuestAdditions_6.1.26.iso
sudo mkdir VBoxGuestAdditions
sudo mount -o loop,ro /tmp/VBoxGuestAdditions_6.1.26.iso /tmp/VBoxGuestAdditions/
cd VBoxGuestAdditions/
echo yes | sudo ./VBoxLinuxAdditions.run  --nox11
shutdown now
```

## Afegir carpeta compartida

Una vegada parada la màquina virtual ja podrem afegir la carpeta compartida. Per a fer-ho, seleccionarem el nom de la màquina
virtual al Virtual Box, clicarem botó dret i seleccionarem "Configuracion" (o bé, Ctrl+S):

![Configuración Virtual Box](/images/howtos/2021-02-08-Virtualbox_configuracion.png)

Seleccionarem l'opció "Carpetas compartidas":

![Carpetas compartidas Virtual Box](/images/howtos/2021-02-08-Virtualbox_carpetas_compartidas.png)

Crearem una "Nueva carpeta compartida", definirem la carpeta que volem compartir i seleccionarem "Automontar" per a que sigui permanent:

![Agregar carpetas compartidas Virtual Box](/images/howtos/2021-02-08-Virtualbox_agregar_carpetas_compartidas.png)

Un cop fet, ja podrem iniciar la màquina virtual i comprovar que tenim la carpeta muntada:

![Carpeta compartida entorn desenvolupament](/images/howtos/2021-02-08-Carpeta_compartida_entorn_desenvolupament.png)