+++
date        = "2019-09-12"
title       = "Actualització mòdul SSC Canigó"
description = "S'ha publicat una nova versió del mòdul de SSC de Canigó utilitzant la versió 1.3.3 del Signador Centralitzat del AOC"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "OCTUBRE2019"
+++

Dins de l'abast de la **versió 3.4.1 del framework Canigó** s'ha allibrerat una nova versió del mòdul de SSC de Canigó utilitzant la versió 1.3.3 del Signador Centralitzat del AOC

Podeu consultar l'abast complet de la versió 3.4.1 a:

[Abast Canigó 3.4.1](https://cstd.ctti.gencat.cat/jiracstd/issues/?jql=project%20%3D%20CAN%20AND%20fixVersion%20%3D%203.4.1)

## Introducció

El connector SSC es troba dins els connectors de serveis funcionals de la Generalitat.

El propòsit del connector és proporcionar una interfície que utilitzi l’API SmartWrapper per poder donar accés als diferents tipus de signatura que ofereix el Signador Centralitzat del AOC.

El Signador Centralitzat del AOC és la solució que dóna cobertura al concepte de sistema de signatura electrònica per a l’actuació administrativa automatitzada, tal com es descriu a la LAECSP (art.18, Llei 11/2007).

## Novetats

Amb la versió 2.2.x del mòdul de SSC de Canigó es proporciona la integració amb els serveis de SSC del AOX versió 1.3.3

Les principals novetats que propociona l'actualització del mòdul de SSC de Canigó són:

* Suport a tipus de signatura Detached Hash pels serveis:
  * CMS
  * CAdES-BES
  * CAdES-T
  * XMLDSig
  * XAdES-BES
  * XAdES-T
  
* Suport pel tractament de fitxers grans pels serveis:
  * CAdES-BES: Attached / Detached
  * CAdES-BES-PDF: Attached / Detached
  * XAdES-BES: Enveloping / Enveloped / Detached

## Documentació mòdul

Està disponible la documentació del mòdul de SSC de Canigó al portal d'arquitectura:

[Mòdul SSC](/canigo-documentacio-versions-3x-integracio/modul-ssc/)

Per a més informació sobre el servei de Signador Centralitzat del AOC podeu consultar:

[guiaintegraciossc-v1-3-3.pdf](/related/canigo/documentacio/modul-ssc/guiaintegraciossc-v1-3-3.pdf "Guia Integració SSC")
