+++
date        = "2020-06-09"
title       = "Canigó. Revisió regles SonarQube mòduls core"
description = "S'han revisat i resolt els problemes detectats per SonarQube als mòduls core de Canigó"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "JUNY2020"
+++

## Introducció

Dins de l'abast de la **versió 3.4.4 del Framework Canigó s'ha realitzat la revisió del codi font a través de les regles de SonarQube als mòduls core de Canigó**.

Podeu consultar l'abast complet de la versió 3.4.4 a les [Release Notes, apartat Canigó 3.4.4](/canigo-download-related/release-notes-canigo-34).

## Novetats

Des de l'Oficina de Qualitat del Ctti es defineix el SonarQube com una eina que serveix per a detectar bugs, vulnerabilitats i defectes en el codi. Pot ser integrat a l’entorn de desenvolupament, el que facilitat l’inspecció continua i pot ser pujat a un servidor.

Des de l'Oficina de Qualitat del ctti s'han definit unes portes o Quality Gates amb unes mesures mínimes que han de cumplir els entregables del Ctti.

S'han revisat i sol·lucionat els problemes detectats pel SonarQube per complir les Quality Gates defninides per l'Oficina de Qualitat als següents mòduls:

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

Podeu consutlar el detall de la versió de cada mòdul a la [Matrius de Compatibilitats](/canigo-download-related/matrius-compatibilitats/) al Portal de Frameworks i Solucions d’Arquitectura.

Per a més informació sobre l'eina de revisió de codi font especificada per l'Oficina de Qualitat podeu consultar [Eina de revisió del codi font (Sonarqube)](https://qualitat.solucions.gencat.cat/procediments/construccio/sonarqube/)
