+++
date        = "2019-12-09"
title       = "Canigó. Actualització del mòdul d'accés al Servei de Signatura Centralitzada (SSC) del consorci Administració Oberta de Catalunya (AOC)"
description = "S'ha publicat una nova versió del mòdul Canigó 'SSC' utilitzant la versió 1.3.3 del Signador Centralitzat de l'AOC"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2019"
+++

## Introducció

Dins de l'abast de la **[versió 3.4.1 del framework Canigó](/canigo-download-related/release-notes-canigo-34)** s'ha alliberat una nova versió del mòdul Canigó d'accés al Servei de Signatura Centralitzada (SSC) del consorci Administració Oberta de Catalunya (AOC). El connector SSC, que forma part dels connectors funcionals de la Generalitat, té la missió de proporcionar una interfície que utilitzi l’API SmartWrapper per a poder donar accés als diferents tipus de signatura que ofereix el servei. SSC és la solució que dóna cobertura al concepte de sistema de signatura electrònica per a l’actuació administrativa automatitzada, tal com es descriu a la LAECSP (art.18, Llei 11/2007).

## Novetats

Amb la versió 2.2.x del mòdul SSC de Canigó es proporciona la integració amb els serveis signatura centralitzada de l'AOC en la seva versió 1.3.3. Les principals novetats que proporciona aquesta actualització són:

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

Està disponible la documentació del mòdul SSC de Canigó al portal d'arquitectura: [Mòdul SSC](/canigo-documentacio-versions-3x-integracio/modul-ssc/). Per a més informació sobre el servei de signatura centralitzada de l'AOC podeu consultar la [Guia d'integracio SCC v1-3-3](/related/canigo/documentacio/modul-ssc/guiaintegraciossc-v1-3-3.pdf "Guia Integració SSC").
