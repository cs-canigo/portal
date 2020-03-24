+++
date        = "2020-03-24"
title       = "Canigó. Revisió estat mòduls Canigó 3.4"
description = "Revisió de l'estat dels mòduls de Canigó, deprecant funcionalitats obsoletes i ampliant els testos dels mòduls"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "ABRIL2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.3 del framework Canigó** s'ha alliberat una nova versió dels mòduls de Canigó després de la realització d'un anàlisis sobre l'estat dels mòduls, les seves funcionalitats i els testos associats.

## Novetats

Després de la realització de l'anàlisis de l'estat dels mòduls s'han realitzat els següents canvis:

- El mòòdul canigo.integration.documentum passa a estar deprecat. La forma de comunicació amb documentum i la versió de documentum suportada estan obsoletes. No hi haurà més evolució d'aquest mòdul de Canigó

- El mòdul canigo.symantec.stub passa a estar deprecat. S'ha canviat la forma de realitzar test sobre el mòdul d'antivirus utilitzant mockito, i per tant, ja no és necessari aquest mòdul. No hi haurà més evolució d'aquest mòdul de Canigó

- Ampliació dels testos dels mòduls canigo.integration.icc, canigo.integration.notificacions.electroniques.ws, canigo.integration.sgde, canigo.operation.logging, canigo.security.saml, canigo.security.saml.bridge, canigo.security.saml.rest, canigo.support.lopd, canigo.support.merging i canigo.test


## Documentació de Canigó

Per a obtenir més informació sobre els mòduls de Canigó podeu consultar la [documentació de Canigó](/canigo-documentacio/) al Portal de Frameworks i Solucions d’Arquitectura.
