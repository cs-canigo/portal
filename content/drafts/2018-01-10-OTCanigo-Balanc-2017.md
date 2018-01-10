+++
date        = "2017-01-05"
title       = "Oficina Tècnica de Canigó. Balanç 2017"
description = "Evolució dels serveis de la Oficina Tècnica de Canigó a l'any 2017"
sections    = ["drafts"]
categories  = ["sic, canigo, sgde"]
key         = "GENER2018"
+++

A continuació es mostren les fites aconseguides al 2017 segons ordre cronològic:

<center><iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1sqpklweKg2oJIwJcStMksqj6jggC9idUe_A_RW2BPeo&font=Default&lang=ca&initial_zoom=2&height=500' width='100%' height='500' frameborder='0'></iframe></center>

A mode resum, destacaríem les següents:

* _SIC_ :

	- Suport de Jenkins SIC per a la generació d'artefactes i desplegaments automàtics en tecnologies .Net i NodeJS.
	- Suport de Jenkins SIC per a l'execució d'scripts a BBDD MongoDB, MySQL, SQLServer i PostgreSQL.
	- Desplegaments de sites estàtics al Cloud des de jobs Jenkins SIC.
	- Adaptació de Jenkins al sistema d'obertura de peticions de desplegament via Remedy.
	- Disponibilitat de l'Slave Jenkins a CPD2.
	- Actualització de versions de programari del SIC: Jenkins, SVN i Nexus.
	- El SIC s'encarrega de la gestió integral del codi font i del reporting a direcció CTTI.

* _FW Canigó_ :

	- Publicació de [Canigó 3.2.0](http://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10450) amb suport a aplicacions REST, incorporació de Swagger, suport a seguretat basada en token JWT, exposició de dades de servei via REST.
	- [Canigó 3.2.1](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10461) amb actualització de llibreries, suport a la càrrega de propietats en jars i altres millores i resolució d'incidències
	- [Canigó 3.2.2] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10463) amb millores per donar suport a les millors pràctiques d'APIs REST, actulitació de llibreries i altres millores i resolució d'incidències
	- [Canigó 3.2.3] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10464) amb la publicació de jars amb test unitaris per als mòduls de Core, Web-Rest, Persistència i Seguretat
	- Certificació Canigó 3.2 en JBOSS EAP 6.4
	- Publicació de la versió 2.0.0 del [entorn de desenvolupament de Canigó] (/canigo/entorn-desenvolupament/)

* _SGDE_ :

	- STD - Augmentar el límit de mida de documents de Composició de PDFs a 20mb
	- Eformularis - S'ha deprecat la versió v8 del WS de ServeisInvocacio del servei d'eFormularis
    - STD - Composició de documents amb diferents orientacions

Per a més informació sobre els futurs evolutius planificats, podeu consultar el [Roadmap d'arquitectura del CTTI](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).
