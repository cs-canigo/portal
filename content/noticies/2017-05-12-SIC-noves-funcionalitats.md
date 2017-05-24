+++
date        = "2017-05-12"
title       = "SIC 2.0: Millores en la gestió d'usuaris i repositoris"
description = "Atès la imminent arribada del SIC 2.0, és convenient que tots els usuaris siguin coneixedors de les noves funcionalitats que ofereix aquesta versió. En aquest article, fem un resum dels mòduls de gestió d'usuaris i repositoris."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "MAIG2017"
+++

Atès la imminent arribada del SIC 2.0, és convenient que tots els usuaris siguin coneixedors de les noves funcionalitats que ofereix aquesta versió. En aquest article, fem un resum dels mòduls de gestió d'usuaris i repositoris.

## Autoservei d'usuaris

Amb l'autoservei d'usuaris, hi ha un rol que pateix una evolució molt important al SIC: el rol de *Release Manager*. Els usuaris amb aquest rol podran gestionar els usuaris dels seus projectes. En concret, podran realitzar, a més de les funcions que ja disposaven al SIC 1.0, les següents accions:

* Concedir/treure els accessos dels seus projectes publicats al SIC als usuaris que considerin oportú.
* Definir quins permisos té cada usuari en cadascun dels projectes (poden concedir el rol de *Release Manager* a altres usuaris que no el tinguin).

A més d'aquestes noves funcionalitats, cal recordar que ja no caldrà sol·licitar les altes i baixes dels usuaris al SIC. El SIC 2.0 s'ha integrat amb GICAR i, per tant, la gestió d'usuaris es realitza a través de GICAR. 

D'aquesta manera, ja no caldrà realitzar peticions a SAU/Remedy per cobrir cap necessitat dels proveïdors d'aplicacions pel que fa a la gestió d'usuaris del SIC.

## Autoservei de repositoris

De forma similar que amb l'autoservei d'usuaris, el rol de *Release Manager* adquireix també més funcionalitats pel que fa a la gestió de repositoris.

Al SIC 2.0 disposem d'un nou gestor de repositoris de codi font: **GitLab**. A més a més de les diferències tècniques (els repositoris són Git i no SVN), n'hi ha d'organitzatives. Aprofitant tota l'experiència adquirida amb el SIC 1.0, hem configurat els repositoris de forma diferent. Ara hi ha només un nivell d'agrupació: el codi d'aplicació. L'acrònim de Departament/Unitat Organitzativa l'hem eliminat. D'aquesta manera és més senzill localitzar els projectes a través de l'eina i l'estructura roman independent dels canvis departamentals.

Tot usuari al GitLab pot crear repositoris i grups de repositoris en el seu propi espai personal. Els *Relase Managers*, a més a més, podran crear repositoris oficials en l'espai del SIC. Simplement, hauran d'entrar al grup corresponent al codi d'aplicació del projecte i els hi apareixerà l'opció de creació.

Per tant, desapareix la necessitat de realitzar peticions a SAU/Remedy per sol·licitar la creació d'un nou repositori al SIC. Els lots d'aplicacions són autònoms pel que fa als repositoris.

## Avantatges

Els avantatges de l'evolució del SIC 2.0 són:

* S'eliminen temps d'espera administratius. Els lots d'aplicacions poden treballar des del primer dia de forma autònoma.
* Estandardització dels usuaris del SIC, en haver integrat aquest amb GICAR.
* No cal involucrar a responsables d'àmbit ni de lot per a la gestió d'usuaris i de repositoris. El lot d'aplicacions té l'autoritat per fer-ho.
* Desapareix la limitació de disposar com a màxim 3 *Release Managers* per lot i àmbit.

Aviat podreu consultar tota la documentació associada a aquesta nova versió del SIC al [portal|http://canigo.ctti.gencat.cat/sic-documentacio/.

Per a qualsevol dubte o suggeriment, podeu contactar amb el SIC a través de SAU/Remedy o un correu electrònic a la bústia [`oficina-tecnica.canigo.ctti@gencat.cat`](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
