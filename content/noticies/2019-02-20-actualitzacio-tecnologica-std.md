+++
date        = "2019-02-20"
title       = "STD. Actualització tecnològica del servei"
description = "L'últim trimestre del 2018 es va iniciar un projecte d'actualització tecnològica del servei STD que està previst que finalitzi a l'Abril. També es realitza una rearquitectura del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat"
sections    = ["Notícies"]
categories  = ["sgde"]
key         = "MARC2019"
+++

L'últim trimestre del 2018 es va iniciar un projecte d'**actualització tecnològica del servei STD** que està previst que finalitzi a l'Abril. També es realitza una **rearquitectura** del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat.

## Rearquitectura

Tota la capa d'aplicació es mou a contenidors Docker a la plataforma [AppAgile](https://canigo.ctti.gencat.cat/cloud/contenidors_appagile/). Només el servei de conversió de documents ofimàtics MS Office a PDF requereix d'un engine el qual ha de residir a un entorn Windows aprovisionat en VMs a CPD.

* Composició i CSV
* Conversió MS Office
* Conversió LibreOffice i imatges
* OCR

Gràcies a aquesta rearquitectura és possible escalar els diferents serveis per separat dependent del seu consum, a més d'estar aillats motiu pel qual un problema en un dels serveis no afectarà a la resta. Tot el cicle de vida de cada servei és independent, podent ser evolucionat per separat. La construcció, versionat i desplegament via SIC serà independent per cadascun.

## Actualització tecnològica

A continuació es detallen les actualitzacions de versions i canvis de productes més rellevants:

* Tots els serveis basats en **Canigó** s'actualitzen a la versió [3.2.7](https://canigo.ctti.gencat.cat/canigo/roadmap/).
* Es canvia l'engine de conversió de MS Office a PDF, passant de [J-Interop](http://www.j-interop.org/) a [**documents4j**](https://documents4j.com/)
* S'actualitza la versió de MS Office de 2012 a 2016
* S'actualitza la versió de LibreOffice de x a y
* S'actualitza la versió de Tessearact, engine OCR, de x a y
* S'actualitza la versió 

Nova REST API







Container Cloud AppAgile:

Contenidors Docker java:8 Spring Boot - Canigó 3.2 - 
LibreOffice 5.4
Tesseract OCR
SOAP per compatibilitat amb clients existents

VM:

Windows Server 2016
MS Office 2016
Documents4j



Explicar canvis de dominis, dates 

Explicar sondes a contenidors, i enllaçar amb howTo.
