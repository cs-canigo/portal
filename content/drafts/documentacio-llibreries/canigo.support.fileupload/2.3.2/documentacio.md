+++
date        = "2021-12-17"
title       = "Documentació"
description = "Documentació canigo.support.fileupload 2.3.2"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet al servidor obtenir fitxers adjunts als formularis HTML de client. A més aquest mòdul permet llegir el fitxer de forma directa, desar-lo al sistema de fitxers, emmagatzemar-lo en una base de dades o enllaçar-ho amb altres mòduls com pot ser el servei d’antivirus.

## Funcionalitats

### Beans

Conté l'entitat que representa la informació del fitxer rebut des de la request a *cat.gencat.ctti.canigo.arch.support.fileupload.UploadedFile*

### Service

Per a obtenir la llista de fitxers de la request s'ofereix *cat.gencat.ctti.canigo.arch.support.fileupload.FileUploadService*

### Exception

Per identificar els errors produïts al mòdul s'ofereix l'exception *cat.gencat.ctti.canigo.arch.support.fileupload.exceptions.FileUploadServiceException*
