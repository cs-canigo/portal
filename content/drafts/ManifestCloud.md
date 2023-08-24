+++
date        = "2023-07-25"
lastmod     = "2023-07-26"
title       = "Manifest Cloud"
description = "Principals aspectes a l'hora de proposar una solució basada en elements de núvol públic a CTTI."
sections    = ["drafts"]
blog_tags   = ["cloud"]
categories  = ["blog","gestors"]
+++


## MANIFEST


* Les opcions disponibles per desplegar solucions a núvol públic es poden consultar a [**Solucions homologades**](#cloud-reqs). Aquestes opcions recullen: proveïdors de núvol públic hiperescalars, lowcode i les ubicacions possibles tant a nivell físic com lògic.
* La comunicació entre sistemes desplegats a núvol públic amb sistemes desplegats on-premise només es pot fer via les interfícies de servei que el sistema exposi (APIs). 
* Excepcionalment, per les solucions SaaS que no estiguin en la llista de solucions homologades hauran de complir com a mínim amb una certificació de seguretat reconeguda internacionalment. 
* Les consideracions recollides al manifest, formen part de la solvència tècnica  de les solucions que es poden proposar.
* Qualsevol combinació no recollida en les línies anteriors requerirà una aprovació explícita per part de la CTTI i l’Agència de Ciberseguretat aportant per part del responsable del projecte la definició del model d’operació de la solució des del punt de vista de la infraestructura i de la seguretat.
* Per a utilitzar els productes dels diferents marketplaces dels proveïdors cloud cal autorització expressa de CTTI. L’accés als marketplaces serà en model privat.


## Solucions homologades
<a name="cloud-reqs"></a>
### Núvol públic

Entenem per Cloud Computing el pool de recursos ofert per un tercer, al que podem accedir a través d'Internet i que ens permet executar diferents tasques (computació, emmagatzematge o serveis empaquetats) amb modalitats més o menys administrades pel propi proveïdor de cloud.
Proveïdors de núvol públic hiperescalars disponibles:

* Els hiperescalars admesos per CTTI són: **Microsoft Azure**, **AWS**, **Google Cloud Platform** i **IBM Cloud**.
* Per als anteriors, cal tenir en compte les següents normes bàsiques: 
* Tots els serveis han d'estar allotjats dins de la Unió Europea.
* Tots els serveis han d'ubicar-se dintre dels tenants / organitzacions de cloud públic de la Generalitat. 
* Tota comunicació entre un sistema desplegat a una plataforma (tenant/organització) de núvol públic concreta i l’exterior (sigui un CPD on-premise, una altra plataforma de núvol públic, un servei SaaS, etc) haurà de fer-se sempre a través del servei de gestió de comunicacions i de seguretat perimetral (NET0) de les plataformes de núvol públic de la Generalitat de Catalunya.
* Altres normes de treball a tenir en compte a l’hora de desplegar solucions a núvol públic com, per exemple, l’obligatorietat de doble factor d’autenticació pels comptes d’accés a subscripcions, integració amb GICAR i el desplegament basat en IaC, es poden consultar aquí.


### Lowcode
Les solucions de lowcode admeses per CTTI són: Outsystems, Appian i Microsoft Power apps.
L’ús de qualsevol d’aquestes tres opcions s’haurà de regir per la normativa que manté la Direcció de Solucions TIC Sostenibles i que es pot consultar secció de [**Lowcode**](https://canigo.ctti.gencat.cat/lowcode/plataformes/) del portal.
