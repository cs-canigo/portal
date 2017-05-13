+++
date        = "2017-05-11"
title       = "SIC 2.0: Millores en l'operativa dels usuaris del servei"
description = "Atès la imminent arribada del SIC 2.0, és convenient que tots els usuaris siguin coneixedors de les noves funcionalitats que ofereix aquesta versió. En aquest article, en fem un resum."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "MAIG2017"
+++

Atès la imminent arribada del SIC 2.0, és convenient que tots els usuaris siguin coneixedors de les noves funcionalitats que ofereix aquesta versió. En aquest article, en fem un resum.

## Autoservei d'usuaris

Amb l'autoservei d'usuaris, hi ha un rol que pateix una evolució sense precedents al SIC: el rol de *Release Manager*. Els usuaris amb aquest rol podran gestionar els usuaris dels seus projectes. En concret, podran realitzar, a més de les funcions que ja disposaven al SIC 1.0, les següents accions:

* Concedir/treure els accesos dels seus projectes publicats al SIC als usuaris que considerin oportú.
* Definir quins permisos té cada usuari en cadascun dels projectes (poden concedir el rol de *Release Manager* a d'altres usuaris que no el tinguin).

A més d'aquestes noves funcionalitats, cal recordar que ja no caldrà sol·licitar les altes i baixes dels usuaris al SIC. El SIC 2.0 s'ha integrat amb GICAR i, per tant, la gestió d'usuaris es realitza a través de GICAR. 

D'aquesta manera, ja no caldrà realitzar peticions a SAU/Remedy per cobrir cap necessitat dels proveïdors d'aplicacions pel que fa a la gestió d'usuaris del SIC.

## Autoservei de repositoris

De forma similar que amb l'Autoservei d'usuaris, el rol de *Release Manager* adquireix també més funcionalitats pel que fa a la gestió de repositoris.

Al SIC 2.0 disposem d'un nou gestor de repositoris de codi font: **GitLab**. A més a més de les diferències tècniques (ara els repositoris són GIT i no SVN), n'hi ha d'organitzatives. Aprofitant tota l'experiència adquirida amb el SIC 1.0, hem configurat els repositoris de forma diferent. Ara hi ha només un nivell d'agrupació: el codi d'aplicació. L'acrònim de Departament/Unitat Organitzativa l'hem eliminat. D'aquesta manera és més senzill localitzar els projectes a través de l'eina i l'estructura romana independent dels canvis departamentals.

Tot usuari al **GitLab** pot crear repositoris i grups de repositoris en el seu propi espai personal. Els *Relase Managers*, a més a més, podran crear repositoris oficials en l'espai del SIC. Simplement, hauran d'entrar al grup corresponent al codi d'aplicació del projecte i els hi apareixerà l'opció de creació.

Per tant, desapareix la necessitat de realitzar peticions a SAU/Remedy per sol·licitar la creació d'un nou repositori al SIC. Els lots d'aplicacions són autònoms pel que fa als repositoris.

## Avantatges

Els avantantges de l'evolució del SIC 2.0 són:

* S'eliminen temps d'espera administratius. Els desenvolupadors poden treballar des del primer dia.
* No cal fer cap tràmit administratiu addicional per poder treballar amb els repositoris del SIC. Els equips de desenvolupament es poden centrar exclusivament en les tasques tècniques pròpies del negoci, que són les que aporten valor.
* Estandardització dels usuaris del SIC, a l'haver-se integrat aquest amb GICAR.
* No cal involucrar a responsables d'àmbit ni de lot per a la gestió d'usuaris i de repositoris. El propi equip de desenvolupament és autònom.
* Desapareix la limitació de disposar com a màxim 3 *Release Managers* per lot i àmbit.

Per a qualsevol dubte o suggerència, podeu contactar amb el sic a través de SAU/Remedy o un correu electrònic a: `oficina-tecnica.canigo.ctti@gencat.cat`.
