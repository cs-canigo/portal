+++
date        = "2020-06-25"
title       = "Documentació"
description = "Documentació canigo.support.mailing 2.2.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul té com a objectiu permetre l’enviament de correus electrònics a una o diverses adreces especificades a qualsevol dels següents recipients:

* Destinataris principals
* Destinataris secundaris
* Destinataris ocults

Permet diferents modes d’enviament, tant en text pla, com en mode HTML, i en tots 2 casos oferint la possibilitat d’adjuntar un o més fitxers en mode adjunt o inline.

## Funcionalitats

### Beans

Conté l'entitat que representa la informació de l'emissor del mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentFrom*

Conté l'entitat que representa la informació del receptor del mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentTo*

Conté l'entitat que representa la informació dels destinataris del mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentRecipients*

Conté l'entitat que representa la informació del títol del mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentSubject*

Conté l'entitat que representa la informació del missatge del mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentMessage*

Conté l'entitat que representa la informació dels adjunts al mail a *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService.FluentAttachment*


### Service

Per a l'enviament l'enviament de mails s'ofereix *cat.gencat.ctti.canigo.arch.support.mailing.FluentMailService*

### Excepción

Per identificar els errors produïts al mòdul s'ofereix *cat.gencat.ctti.canigo.arch.support.mailing.exception.MailModuleException*

