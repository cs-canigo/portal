+++
date        = "2018-03-05"
title       = "SIC. Branca Master al Git del SIC"
description = "Arrel les consultes rebudes les darreres setmanes, creiem convenient publicar aquest article on s'explica els usos de les branques al SIC."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "FEBRER2018"
+++

Arrel les consultes rebudes les darreres setmanes, creiem convenient publicar aquest article on s'explica els usos de les branques al SIC.

## Models de gestió de branques en repositoris Git

Hi ha un gran ventall d'aproximacions que es poden conjugar per a la gestió de branques d'un repositori git:

1. Ús d'una sola branca, seguint el principi del [trunk-based (o master-based) development](https://continuousdelivery.com/foundations/continuous-integration/).
2. Ús d'un sistema de branques procedimentat en el que hi ha branques fixes i branques temporals, com per exemple [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/).
3. Ús de branques no procedimentat.

## Model adoptat al SIC

Dins d'aquest gran amalgama de possibilitats, des del SIC s'estableix utilitzar únicament la branca **master**, és a dir, és un model basat en la primera opció. L'adopció d'aquest model respon a l'ús que se'n fa del repositori Git del SIC: és un repositori de lliurables.

Les pipelines, que actualment només construeixen i despleguen, en el futur realitzaran altres tasques:

* Anàlisi de la qualitat del codi
* Anàlisi de vulnerabilitats
* Proves d'acceptació, de fum, etc.

Moltes d'aquestes tasques només tenen sentit quan es tracta de lliurables.

Per aquests motius, al SIC només els canvis a la branca **master** són els que inicien l'execució de la pipeline associada a l'aplicació. Els canvis a la resta de branques són ignorats per Jenkins.

## Model que ha d'adoptar el proveïdor d'aplicacions

El model que es recomana seguir des del SIC en l'entorn de desenvolupament del proveïdor d'aplicacions és el mateix model que adopta el SIC: una sola branca (amb una metodologia **trunk-based**).

S'han actualitzat el [FAQ](http://canigo.ctti.gencat.cat/sic/faq/), el [Manual d'Usuari](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf) i [Manual d'Integració](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-integracio.pdf) tot indicant que únicament la branca master és la que té associades pipelines de Jenkins.

Si teniu cap dubte al respecte, podeu obrir una [consulta](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
