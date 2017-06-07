+++
date        = "2017-06-07"
title       = "SIC. Llençament del SIC 2.0"
description = "SIC. Llençament del SIC 2.0"
sections    = ["Notícies"]
categories  = ["sic"]
+++

## SIC 2.0

El passat 31 de Maig es va realitzar la presentació oficial del SIC 2.0. Com ja s'ha comentat en altres comunicats, aquesta nova versió del SIC incorpora:

* Un autoservei d'usuaris, mitjançant el qual, els usuaris estan precarregats (només es requereix fer un login previ a GitLab) i s'ha establert un sistema d'assignació de privilegis que funciona de la següent manera:
	* Per a Release Managers i administradors de CPD/Lloc de Treball, els privilegis s'assignen de forma automàtica.
	* Per a la resta d'usuaris de Lot, els Release Managers gestionen els seus privilegis.
* Un autoservei de repositoris, mitjançant el qual, els Release Managers poden crear-los i concedir permisos d'accés a aquests a d'altres usuaris.
* Millora tecnològica:
	* Jobs de tipus Pipeline, que permeten extensibilitat i futures millores al SIC.
	* GIT com a nou SCM, que és de naturalesa distribuïda i que permet una millor gestió de branques, entre d'altres característiques.
* Solució als problemes d'espai deguts a l'emmagatzemament de binaris, mitjançant el nou sistema de Gestió de Binaris.

Aquestes noves funcionalitats s'han adquirit gràcies a la implantació dels següents sistemes:

* Integració amb GICAR
* GitLab
* Versió 2+ de Jenkins
* Implantació del mòdul de Gestió de Binaris (previst per al proper 26 de Juny)

Podeu descarregar-vos la presentació fent clic a [aquest enllaç](/related/sic/2.0/SIC-2.0.pdf).

## Període de convivència SIC 1.0 i SIC 2.0

Com bé sabeu, s'ha establert un període de convivència de SIC 1.0 i SIC 2.0. Us recordem que per accedir a qualsevol sistema del SIC **caldrà utilitzar els credencials de GICAR** a excepció del SVN, al que seguirà accedint amb els credencials antics.

Tot nou codi d'aplicació es crearà al GitLab i no al SVN.

### Migració de repositoris

Donades les diferents característiques de cadascun dels proyectes i de cadascun dels proveïdors de lot d'aplicacions, la migració de repositoris corre a càrrec dels proveïdors de lot d'aplicacions.

Es recomana als proveïdors d'aplicacions que encara treballin amb SVN que migrin a GIT els seus entorns locals, ja que el mètode recomanat per a les migracions és afegir en l'entorn de desenvolupament el nou *remote* corresponent al GitLab del SIC i fer push a aquest remote cada cop que es vulgui generar una versió entregable al SIC. D'aquesta manera, a més de facilitar-se molt la migració de les seves aplicacions, els proveïdors d'aplicacions estaran alineats tecnològicament amb el SIC.

No es permet la inclusió d'arxius binaris al GitLab. En el cas que s'hagi d'emmagatzemar binaris, el SIC ofereix les següents alternatives:

* Per a llibreries: Utilitzar el Nexus del SIC.
* Per a d'altres binaris:
	* Fins al 26 de Juny, s'haurà de seguir utilitzant el SVN per a la pujada de binaris.
	* A partir del 26 de Juny, s'haurà d'utilitzar el nou mòdul de Gestió de Binaris, que estarà disponible a través de l'URL: [`https://bin.sic.intranet.gencat.cat`](https://bin.sic.intranet.gencat.cat).

## Informació disponible

Aquestes són les característiques més importants que cal tenir en compte amb el SIC 2.0. Per a més informació, podeu consultar el [FAQ del SIC](/sic/faq/) i/o els [Manuals del SIC](/sic-documentacio/manuals/).

En cas de tenir qualsevol dubte, ens podeu enviar una consulta a través de SAU-Remedy (servei Framework SIC) o al correu: `oficina-tecnica.canigo.ctti@gencat.cat`.