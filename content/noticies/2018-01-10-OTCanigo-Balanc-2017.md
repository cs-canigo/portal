+++
date        = "2018-01-10"
title       = "Oficina Tècnica de Canigó. Balanç 2017"
description = "Evolució dels serveis de l'Oficina Tècnica de Canigó i Suport Cloud a l'any 2017"
sections    = ["noticies", "home"]
categories  = ["sic, canigo, sgde", "cloud"]
key         = "GENER2018"
+++

A continuació es mostren les fites aconseguides el 2017 segons ordre cronològic:

<center><iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1se11kf-cofPGpMC7IQgwIcO3i1Lt_0SbVWjRMKZpHMQ&font=Georgia-Helvetica&lang=ca&initial_zoom=2&height=500' width='100%' height='500' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe></center>

A mode resum, destacaríem les següents:

* **SIC (Servei d'Integració Continua)**

	- Publicació del SIC 2.0, el qual inclou:
		- Integració al SIC del nou sistema de gestió de versions de codi (Git).
		- Integració de la seguretat del SIC amb GICAR.
		- Autoservei d'usuaris al SIC, mitjançant el qual els usuaris de CTTI i de CPD/LDT tenen accés de forma automàtica i els usuaris de Lot d'aplicacions poden concedir-se permisos dins el mateix lot i àmbit.
		- Gràcies a la incorporació de l'Autoservei de repositoris al SIC, els usuaris de lot d'aplicacions poden crear-se de forma autònoma els seus repositoris.
		- Integració de jobs en format pipeline al SIC.
		- Creació d'un Sistema de Gestió de Binaris, mitjançant el qual s'evita l'antipatró de dispositar artefactes als sistemes de versions de codi.
	- Integració del SIC amb les plataformes de contenidors Docker Bluemix Container Service (Kubernetes) i AppAgile (Openshift)
	- Integració del SIC amb Bluemix Cloud Foundry PaaS
	- Participació de l'equip del SIC en el procés d'alta de noves solucions
	- Pas a HTTPs de la totalitat de serveis del SIC 2.0
	- Actualització de versió del servei Nexus a la versió 3.2.1
	- Integració d'un sistema de desplegament automàtic als entorns de PRE i PRO (amb tall de servei)


* **Suport Cloud**

	- Posada en servei de la plataforma de contenidors on-premise SwarmMe
	- Posada en servei de la plataforma de contenidors on-premise AppAgile
	- Migració d'aplicacions del servei "Single and Scalable Group Container Service de Bluemix" al nou "Bluemix Container Service" basat en Docker i Kubernetes
	- Millora d'imatges Docker estàndard de gencatcloud, ara basades en Alpine, més segures i de tamany més reduït
	- Implementació de nova imatge Docker Apache-Shibboleth per la integració amb GICAR, tant a cloud privat com públic
	- Suport al desplegament d'aplicacions en les diferents plataformes cloud: AppAgile, SwarmMe, Azure i Bluemix


* **Canigó**

	- Publicació de [Canigó 3.2.0](http://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10450) amb suport a arquitectures HTML5/JS+REST: incorporació de Swagger, suport a seguretat basada en token JWT, exposició de dades de servei via REST, ...
	- Publicació de [Canigó 3.2.1](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10461) amb actualització de llibreries, suport a la càrrega de propietats en jars i altres millores i resolució d'incidències
	- Publicació de [Canigó 3.2.2] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10463) amb millores per donar suport a les best practices per la implementació d'APIs REST, actualització de llibreries i altres millores i resolució d'incidències
	- Publicació de [Canigó 3.2.3] (https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10464) amb la publicació de jars amb test unitaris per als mòduls core, web-rest, persistència i seguretat
	- Nova política de versions [LTS] (/noticies/2017-07-05-Canigo-LTS/) pel Framework Canigó
	- Certificació Canigó 3.2 en JBoss EAP 6.4
	- Publicació de la versió 2.0.0 del [entorn de desenvolupament de Canigó] (/canigo/entorn-desenvolupament/) amb actualització de programari


* **SGDE (Servei de Gestió del Document Electrònic)**

	- STD (Servei de Transformació de Documents): augmentat el límit de mida de documents per les operacions de composició de PDFs a 20MB
	- eFormularis: deprecada la versió v8 del WS de ServeisInvocacio
        - STD (Servei de Transformació de Documents): composició de documents amb diferents orientacions de pàgina

Per a més informació sobre els futurs evolutius planificats, podeu consultar el [Roadmap d'arquitectura del CTTI](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).
