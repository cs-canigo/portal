+++
date        = "2016-03-01"
title       = "Nou connector de Canigó 3 amb la Plataforma de Serveis de Gestió documental (PSGD)"
description = "S'ha publicat un nou connector de Canigó 3 amb la Plataforma de Serveis de Gestió documental (en endavant PSGD). El propòsit del connector és proporcionar una interfície Java per accedir als serveis exposats per la PSGD."
section     = "Notícies"
categories  = ["canigo"]
key         = "MARC2016"
+++

S'ha publicat un nou connector de Canigó 3 amb la Plataforma de Serveis de Gestió documental (en endavant PSGD). El propòsit del connector és proporcionar una interfície Java per accedir als serveis exposats per la PSGD.

El connector permet el consum de totes les funcionalitats oferides per aquest servei:

* _Gestió del token d'autenticació_: controla el cicle de vida del token d'autenticació renovant-ho automàticament quan aquest hagi caducat
* _Gestió de documents_: permet el consum de les funcionalitats relacionades amb documents
	- Alta d’un nou document (en streaming)
	- Baixa lògica d’un document
	- Marcar un document com a no modificable (“Check-out”)
	- Carregar una nova versió d’un document i marcar-lo com a modificable (“Check-in”)
	- Editar les metadades d’un document
	- Descarregar un document (en streaming)
	- Cercar documents en funció de les seves metadades
* _Gestió de relació d’expedients_: permet el consum dels serveis relacionats amb la gestió de carpetes contenidores de documents
	- Alta d’un expedient
	- Baixa d’un expedient
	- Assignació d’un document a un expedient
	- Eliminar l’assignació d’un document a un expedient
* _Gestió del repositori_: permet el consum dels serveis relacionats amb la gestió del quadre de classificació i del tipus de documents
suportats.
	- Manteniment del quadre de classificació
	- Manteniment de la tipologia de documents

Aquest connector és el primer dins el framework que consumeix serveis REST i no Webservices (SOAP). Donat que Canigó està basat en [Spring](https://projects.spring.io/spring-framework/) s'ha emprat la classe [RestTemplate](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html) per a la seva implementació. Destacar també la modalitat en streaming utilitzada per l'enviament de fitxers de gran mida evitant possibles problemes de memòria en les aplicacions.

En cas de tenir qualsevol dubte en l'ús del connector de Canigó 3 amb la PSGD podeu consultar la [documentació del connector](http://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-integracio/modul-psgd/) publicada al portal, posar-vos posar en contacte amb el CS Caniǵo a través del [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/CAN) amb una petició de consulta o suport, o bé enviant-nos un correu a la nostra [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
