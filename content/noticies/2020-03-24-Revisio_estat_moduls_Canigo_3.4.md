+++
date        = "2020-03-24"
title       = "Canigó. Revisió estat mòduls Canigó 3.4"
description = "Revisió de l'estat dels mòduls de Canigó, deprecant funcionalitats obsoletes i ampliant els testos dels mòduls"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
#key         = "ABRIL2020"

+++

## Introducció

Dins de l'abast de la **versió 3.4.3 del Framework Canigó s'ha alliberat una nova versió dels mòduls de Canigó** a partir de la realització d'un anàlisis previ sobre l'estat
dels mòduls, les seves funcionalitats i els testos associats.

## Novetats
A partir de l'anàlisi realitzat, s'han fet les següents revisions:

- El mòdul **canigo.integration.documentum** passa a estar deprecat.
La forma de comunicació amb *Documentum* i la versió suportada han quedat obsoletes. No es preveu més evolució d'aquest mòdul.

- El mòdul **canigo.integration.sap** i **canigo.integration.gecat** passen a estar deprecats.
La forma de comunicació amb SAP i la versió suportada han quedat obsoletes. No es preveu més evolució d'aquests mòduls.

- El mòdul **canigo.symantec.stub** passa a estar deprecat.
S'ha canviat la forma de realitzar test sobre el mòdul d'antivirus utilitzant *mockito*, i per tant, ja no és necessari aquest mòdul. No es preveu més evolució d'aquest mòdul.

- Ampliació dels testos dels mòduls **canigo.integration.icc**, **canigo.integration.notificacions.electroniques.ws**, **canigo.integration.sgde**, **canigo.operation.logging**,
**canigo.security.saml**, **canigo.security.saml.bridge**, **canigo.security.saml.rest**, **canigo.support.lopd**, **canigo.support.merging** i **canigo.test**.


## Documentació de Canigó

Per a obtenir més informació sobre els mòduls de Canigó podeu consultar la [documentació de Canigó](/canigo-documentacio/) al Portal de Frameworks i Solucions d’Arquitectura.
