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

Dins d'aquest gran amalgama de possibilitats, des del SIC s'estableix utilitzar únicament la branca **master**, és a dir, és un model basat en la primera opció.

L'adopció d'aquest model respon a l'ús que se'n fa del repositori Git del SIC: és un repositori de lliurables.

Les pipelines, que actualment només construeixen i despleguen, en el futur realitzaran altres tasques:

* Anàlisi de la qualitat del codi
* Anàlisi de vulnerabilitats
* Proves d'acceptació, de fum, etc.

Moltes d'aquestes tasques només tenen sentit quan es tracta de lliurables.

## Model que ha d'adoptar el proveïdor d'aplicacions

El model que es recomana seguir des del SIC en l'entorn de desenvolupament del proveïdor d'aplicacions és el mateix model que adopta el SIC: una sola branca.

Amb altres models, el fet de tenir branques de funcionalitats provoca que hi hagi una divergència que va creixent a mesura que es van acumulant canvis a la branca de funcionalitat així com a la branca master. Aquesta divergència augmenta exponencialment el temps dedicat a fer els merge quan s'han d'integrar els canvis. Quantes més modificacions s'hagin fet a la branca central i a la branca de la nova funcionalitat, molt més temps i dedació requerirà la seva integració.

Pràcticament la totalitat de les funcionalitats que s'han de desenvolupar poden desintegrar-se en funcionalitats més petites. Aquesta segmentació de funcionalitats aporta una sèrie de característiques:

* Afavoreix l'existència de cicles de desenvolupament més curts, amb els que cal menys esforç per integrar noves funcionalitats a la branca central de desenvolupament.
* Les proves unitàries que es fan amb cada commit passen a ser molt menys pessades, ja que el codi modificat és menor, donant *feedback* en uns pocs minuts.
* Si hi ha regressió, la seva correcció és molt més senzilla.

En resum, es passa d'un model incremental (en el que una funcionalitat va creixent i quan està completa s'integra a la branca central) a un model iteratiu (cada subfuncionalitat s'integra una rere l'altra) augmentant la freqüència d'integracions de codi i reduint-ne la seva complexitat. És a dir, s'adopta un model d'**Integració Contínua**.

Per tant, en pro de la qualitat del codi i de la productivitat, des del SIC es recomana tenir integracions a la branca master amb una freqüència mínima diària (o quasi diària) i treballar amb una metodologia **trunk-based**.

S'han actualitzat el [FAQ](http://canigo.ctti.gencat.cat/sic/faq/), el [Manual d'Usuari](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf) i [Manual d'Integració](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-integracio.pdf) tot indicant aquesta informació.

Si teniu cap dubte al respecte, podeu obrir una [consulta](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
