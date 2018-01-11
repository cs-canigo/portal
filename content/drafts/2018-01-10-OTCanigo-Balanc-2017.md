+++
date        = "2018-01-10"
title       = "Oficina Tècnica de Canigó. Balanç 2017"
description = "Evolució dels serveis de l'Oficina Tècnica de Canigó l'any 2017"
sections    = ["drafts"]
categories  = ["sic, canigo, sgde"]
key         = "GENER2018"
+++

A continuació es mostren les fites aconseguides el 2017 segons ordre cronològic:

<center><iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1se11kf-cofPGpMC7IQgwIcO3i1Lt_0SbVWjRMKZpHMQ&font=Georgia-Helvetica&lang=ca&initial_zoom=2&height=500' width='100%' height='500' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe></center>

A mode resum, destacaríem les següents:

* _SIC_ :

	- Publicació del SIC 2.0, que inclou:
		- Integració al SIC del nou sistema de gestió de versions de codi (Git).
		- Integració de la seguretat del SIC amb GICAR.
		- Autoservei d'usuaris al SIC, mitjançant el qual els usuaris de CTTI i de CPD/LDT tenen accés de forma automàtica i els usuaris de Lot d'aplicacions poden concedir-se permisos entre companys del mateix lot i àmbit.
		- Gràcies a la incorporació de l'Autoservei de repositoris al SIC, els usuaris de lot d'aplicacions poden crear-se de forma autonòma els seus repositoris.
		- Integració de jobs en format pipeline al SIC.
		- Creació d'un Sistema de Gestió de Binaris, mitjançant el qual s'evita l'antipatró de dispositar artefactes als sistemes de versions de codi.
	- Integració del SIC als Clouds Kubernetes de Bluemix i AppAgile (Openshift).
	- Integració del SIC en el procés d'alta d'aplicacions a CTTI a través de la participació a les reunions de fase 0 de nous projectes.
	- Pas a HTTPs de la resta de serveis del SIC 2.0.
	- Actualització de versió del servei Nexus a la versió 3.2.1.
	- Integració d'un sistema de desplegament automàtic als entorns de PRE i PRO (amb tall de servei).

* _FW Canigó_ :

	- Publicació de [Canigó 3.2.0](http://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10450) amb suport a aplicacions REST, incorporació de Swagger, suport a seguretat basada en token JWT, exposició de dades de servei via REST.
	- Publicació de [Canigó 3.2.1](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10461) amb actualització de llibreries, suport a la càrrega de propietats en jars i altres millores i resolució d'incidències
	- Publicació de [Canigó 3.2.2] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10463) amb millores per donar suport a les millors pràctiques d'APIs REST, actualització de llibreries i altres millores i resolució d'incidències
	- Publicació de [Canigó 3.2.3] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10464) amb la publicació de jars amb test unitaris per als mòduls de Core, Web-Rest, Persistència i Seguretat
	- Nova política de versions [LTS] (/noticies/2017-07-05-Canigo-LTS/) per al Framework Canigó
	- Certificació Canigó 3.2 en JBOSS EAP 6.4
	- Publicació de la versió 2.0.0 del [entorn de desenvolupament de Canigó] (/canigo/entorn-desenvolupament/)

* _SGDE_ :

	- STD - S'ha augmentat el límit de mida de documents de Composició de PDFs a 20mb
	- Eformularis - S'ha deprecat la versió v8 del WS de ServeisInvocacio del servei d'eFormularis
    - STD - Composició de documents amb diferents orientacions

Per a més informació sobre els futurs evolutius planificats, podeu consultar el [Roadmap d'arquitectura del CTTI](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).
