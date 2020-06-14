+++
date        = "2020-06-09"
title       = "Canigó. Revisió regles SonarQube mòduls core"
description = "S'han revisat i resolt els problemes detectats per SonarQube als mòduls core de Canigó"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "JUNY2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.4 del Framework Canigó s'ha realitzat la revisió del codi font a partir de les regles
de SonarQube als mòduls core de Canigó**. Podeu consultar l'abast complet de la versió 3.4.4 a les
[Release Notes, apartat Canigó 3.4.4](/canigo-download-related/release-notes-canigo-34).

## Novetats

Des de l'Oficina de Qualitat s’ha escollit SonarQube com a eina que s'encarrega de **detectar _bugs_, vulnerabilitats i
defectes en el codi**. Aquesta eina pot ser integrada a l’entorn de desenvolupament, lo que permetria una inspecció continua, i
pot ser instal·lada a un servidor. S'han definit unes portes o **_Quality Gates_ amb unes mesures mínimes que han d’acomplir els lliurables**,
que els proveïdors hauran de configurar en els seus respectius entorns.

<br/>
S'han revisat i solucionat els problemes detectats pel SonarQube als següents **mòduls de Canigó**:

* canigo.core
* canigo.operation.logging
* canigo.persistence.core
* canigo.persistence.jpa
* canigo.persistence.mongodb
* canigo.root
* canigo.security
* canigo.support.lopd
* canigo.support.merging
* canigo.test
* canigo.web.core
* canigo.web.rs
* canigo.operation.instrumentation
* canigo.support.fileupload
* canigo.support.icc.datatypes
* canigo.support.icc
* canigo.support.mailing
* canigo.support.ole
* canigo.support.resizeimg
* canigo.support.sftp


## Documentació de les versions

Podeu consultar el detall de la versió de cada mòdul a la [Matriu de Compatibilitats](/canigo-download-related/matrius-compatibilitats/)
al Portal de Frameworks i Solucions d’Arquitectura.

Per a més informació sobre l'eina de revisió de codi font establerta per l'Oficina de Qualitat podeu
consultar: https://qualitat.solucions.gencat.cat/.