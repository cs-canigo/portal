+++
date        = "2021-02-08"
title       = "Canigó. Com instalar les VBOX guest additions"
description = "Com instalar les VBOX guest additions a l'entorn de desenvolupament de Canigó."
section     = "howtos"
categories  = ["canigo"]
#key        = "GENER2021"
+++


## Introducció

Dins dels entregables del framework Canigó hi costa l'entorn de desenvolupament de Canigó. 

L’entorn de desenvolupament és una màquina virtual Linux, basada en Lubuntu Desktop (Ubuntu Bionic Beaver 18.04.2 LTS) per ser una distribució d’escriptori Linux lleugera, derivada d’una de les distribucions més esteses del món (Ubuntu / Debian) i amb suport LTS, a la qual se li ha afegit una selecció de programari enfocat principalment a aplicacions Canigó.

Els objectius perseguits per l’entorn de desenvolupament són:

* Facilitar la posada en marxa de l’entorn de desenvolupament, aprovisionant una màquina virtual amb tot el necessari per a començar el desenvolupament d’una aplicació Canigó.

* Simular els entorns de desplegament als CPD Generalitat, facilitant contenidors amb les mateixes versions i configuracions dels PaaS que ens trobarem als clouds.

Per a poder utilizar l'entorn de desenvolupament més integrat amb l'ordinador Host on està allotjada, per, per exemple, compartir fitxers entre la màquina virtual i el Host, és necessari instalar les VBOX guest additions

## Instalar VBOX guest additions

### Coneixer la versió del Virtual Box

Per a poder instalar les VBOX guest additions és necessari saber quina és la versió del Virtual Box, per a saber-ho anirem a:

Ayuda > Acerca de Virtual Box ...

![Acerca de Virtual Box](/images/howtos/2021-02-08-Acerca_virtual_box.png)

Aquí podem veure per exemple que la versió és la 5.2.16

### Instalar VBOX guest additions

Una vegada instalat l'entorn de desenvolupament de Canigó seguint les instruccions de:

[Entorn de desenvolupament](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)

Entrem en un terminal i executem:

```
cd /tmp
wget -nv http://download.virtualbox.org/virtualbox/5.2.16/VBoxGuestAdditions_5.2.16.iso
sudo mkdir VBoxGuestAdditions
sudo mount -o loop,ro /tmp/VBoxGuestAdditions_5.2.16.iso /tmp/VBoxGuestAdditions/
cd VBoxGuestAdditions/
echo yes | sudo ./VBoxLinuxAdditions.run  --nox11
shutdown now
```

## Afegir carpeta compartida

Una vegada parada la màquina virtual ja podem afegir la carpeta compartida, per això seleccionarem el nom de la màquina virtual al Virtual Box, clicarem botó dret i seleccionarem "Configuracion" o clicarem Control+s

![Configuración Virtual Box](/images/howtos/2021-02-08-Virtualbox_configuracion.png)

Seleccionarem l'opció "Carpetas compartidas"

![Carpetas compartidas Virtual Box](/images/howtos/2021-02-08-Virtualbox_carpetas_compartidas.png)

Selecionarem "Nueva carpeta compartida"

Seleccionarem la carpeta que volem compartir i seleccionarem "Automontar" per a que sigui permanent

![Agregar carpetas compartidas Virtual Box](/images/howtos/2021-02-08-Virtualbox_agregar_carpetas_compartidas.png)

Una vegada afegit, ja podem iniciar la màquina virtual i comprovar que tenim la carpeta muntada

![Carpeta compartida entorn desenvolupament](/images/howtos/2021-02-08-Carpeta_compartida_entorn_desenvolupament.png)
