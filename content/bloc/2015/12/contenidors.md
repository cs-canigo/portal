+++
date        = "2015-12-02"
title       = "Docker: crea, desplega i executa aplicacions en contenidors"
description = "Docker és una tecnologia que ha revolucionat el desplegament d’aplicacions i de programari degut a la seva senzillesa, facilitat d'ús i velocitat de  desplegament."
bloc_tags	= ["desplegament", "contenidors", "docker"]
imatge 		= "/images/bloc/docker/large_h-dark-trans.png"
+++


Des de la Unitat d'Arquitectura de CTTI estem avaluant **Docker** com a tecnologia de desplegament d'aplicacions, de cara a utilitzar-la en el futur als clouds de la Generalitat.

Docker és una tecnologia que ha revolucionat el desplegament d’aplicacions i de programari degut a la seva senzillesa, facilitat d'ús i velocitat de  desplegament.

El seu fonament és l’ús de plantilles, anomedades "imatges", que inclouen tant el sistema operatiu com les dependències necessàries per a executar les aplicacions. Aquestes imatges són: 

* **Extensibles**, podent partir d'imatges ja creades, i poder-hi afegir les característiques requerides a nivell de programari. 

* **Exportables**: la definició de la imatge consisteix en un fitxer de text (Dockerfile) que pot ser utilitzat per a crear la imatge a qualsevol ordinador/servidor i sistema operatiu.

* **Lleugeres** en comparació amb les màquines virtuals tradicionals

A partir de les imatges Docker s'arrenquen els contenidors. Els contenidors són instàncies executades d'una imatge concreta, arrencada amb una sèrie de característiques. Per exemple, una contenidor es pot arrencar amb aïllament de CPU i RAM, i amb volums de dades compartits entre el host i el contenidor per a realitzar certes operacions. 

Degut a que els contenidors no arrenquen un sistema operatiu complet, a diferència de les màquines virtuals, el seu _footprint_ és molt petit i són capaços d'arrencar en pocs segons, aspecte que permet l'escalat automàtic d'aplicacions de manera molt senzilla i sota demanda.

## Comparativa entre VM i Docker

![comparativa vm i docker](/images/bloc/docker/vm-vs-container2.png)

Un altre aspecte a destacar és que els contenidors, i concretament Docker, és una tecnologia adoptada a la majoria de cloud públics (Amazon, Google, Azure, Bluemix, ...), fent dels contenidors una tecnologia portable i àmpliament suportada, junt amb un, cada cop més gran, ecosistema d'eines per a governar el cicle de vida dels contenidors i les imatges.

A més, els fabricants de software també proporcionen imatges Docker oficials, donant certes garanties sobre la tecnologia i la manera de fer servir els seus productes.

Des de la Unitat d'Arquitectura, una de les imatges que hem creat és la de **"Apache GICAR"**. Aquesta imatge ens permet aixecar instàncies d'Apache amb l'agent de Siteminder instal·lat i configurat en un segon (literalment), amb polítiques i configuracions diverses que es passen al contenidor en el moment de l'arrencada.

