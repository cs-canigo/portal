+++
date        = "2016-09-12"
title       = "(micro)serveis"
description = "Patró de disseny: (micro)serveis"
section 	= ["Bloc", "Notícies"]
draft 		= true
categories  = ["arquitectura", "desenvolupament", "canigó"]
enllac      = "http://canigo.ctti.gencat.cat/bloc/2016/05/rest-vs-jsf/"
imatge 		= "/images/bloc/microserveis.png"
key         = "OCTUBRE2016"
+++

(micro)serveis és un patró de disseny de sistemes orientat a decomposar una aplicació en les seves unitats funcionals mínimes, tractar-les com a aplicacions independents, on cada servei és responsable d'un domini de negoci i la resta de serveis es comuniquen amb ell mitjançant interfícies i contractes estàndard (per exemple, HTTP/REST amb una API coneguda).

Posem (micro) entre parèntesi perquè la granularitat dels serveis dependrà de diversos factors, però el que sí que és important és que les comunicacions entre els diferents serveis/mòduls/funcionalitats es realitzi mitjançant les interfícies que s'exposin. El que no es farà en cap cas és anar a buscar les dades al repositori del servei que volem consumir. És a dir, cada servei serà "l'única font de la veritat" de les dades que gestiona (https://en.wikipedia.org/wiki/Single_source_of_truth).

### Millors pràctiques

- un servei, un repositori independent: els serveis no comparteixen repositori (lògic)
- cada servei té un procés de construcció (build) independent
- es recomana desplegar en contenidors o runtimes estàndards
- s'han de respectar els contractes/interfícies interns (diferents equips de desenvolupament?) i externs (clients o aplicacions terceres)
	

### Beneficis

- cada servei és relativament petit i pot ser desplegat independentment de la resta (això sí, s'han de vigilar els canvis de contracte i per a això és important el versionat dels serveis).

- en ser serveis independents i desplegats de manera independent, poden ser escalats per separat: els monòlits, per contra, s'han d'escalar en bloc.

- permet fer conviure diverses tecnologies en un sistema, de manera que l'únic que ens hem de preocupar d'estandarditzar és la interfície de comunicació (API)

- si un servei té problemes, no té perquè veure's afectat tot el sistema, això sí, s'ha de gestionar en els diferents serveis la tolerància a errors de serveis tercers.


### Inconvenients

- s'ha d'automatitzar TOT des del principi del projecte, ja que la coordinació és la clau de l'èxit.

- en sistemes grans i amb molts serveis, apareixen patrons relacionats que cal gestionar, per a coregrafiar els fluxes, gestionar la configuració, ...:

	- service registration: els microserveis s'han d'enregistrar (ells mateixos o via un servei dedicat) al servei de registre

	- service discovery: han de poder ser "descoberts" pels clients abans de ser cridats o a la banda de servidor, que seria la millor pràctica, (en aquest cas, per un API Gateway), de manera que el sistema sabrà les diferents instàncies que corren i a les que dirigir les peticions

	- seria recomanable disposar d'un API Gateway per a governar els serveis (seguretat, discovery, caché, ...)

- estem acostumats a tenir les dades centralitzades mentre que en aquest patró estan descentralitzades. Per exemple estem acostumats a tenir eines de reporting o BI que accedeixen a un repositori centralitzat. En aquest cas, on els repositoris poden ser diferents i estar ubicats en diferents llocs, es pot optar per disposar d'una BD que agregui la informació per al reporting.

### Canigó + (micro)serveis 

Com que estem parlant d'un patró, la seva implementació es pot realitzar de diverses maneres. I com ja hem comentat, aquest patró permet la cohexitència de diverses tecnologies. 

En el cas de Canigó, basat en Spring, tot dependrà del disseny que es faci de l'aplicació. Això sí, implica respectar els principis d'arquitectura i les millors pràctiques en la construcció d'apis i serveis. A més, algunes de les característiques d'aquest patró ja estan resoltes dins Spring Cloud (routing, load balancing, registry, discovery, ...) i per això recomanem el seu ús als projectes Canigó.


<br /><br />

**Referències**:

- https://www.nginx.com/blog/introduction-to-microservices/
- http://microservices.io/patterns/microservices.html
- https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/
- https://netflix.github.io/ (Common Runtime Services & Libraries: Eureka, Zuul, ...)
- https://spring.io/blog/2015/07/14/microservices-with-spring
- http://projects.spring.io/spring-cloud/