+++
date        = "2022-06-13"
title       = "Documentació"
description = "Documentació canigo.support.mailing 3.0.5"
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

### Propietats

Les propietats configurables es troben en l'arxiu: *mail.properties* o *application.yml*

|Propietat              |Requerit   | Valor Defecte |Descripció                                     |
|-----------------------|-----------|---------------|-----------------------------------------------|
|mail.host              | No        |localhost      |Nom del servidor de correu sortint (smtp)      |
|mail.port              | No        |25             |Port del servidor de correu sortint (smtp)     |
|mail.protocol          | No        |smtp           |Protocol del servidor de correu sortint (smtp) |
|mail.maxAttachmentSize | No        |1048576        |Mida màxima permesa dels fitxers adjunts       |
|mail.defaultEncoding   | No        |UTF-8          |Default encoding                               |
|mail.smtpTimeout       | No        |10000          |Timeout (smtp) mili segons                     |
|mail.smtpAuth          | No        |false          |Intent d'autenticar l'usuari utilitzant l'ordre AUTH |
|mail.isSmtpSSLEnabled  | No        |false          |Habilita l'ús de l'ordre STARTTLS per a canviar la connexió a una connexió protegida TLS |
|mail.debug             | No        |false          |Debug mode                                     |
|mail.username          | No        |               |Usuari de connexió al servidor de correu sorting (smtp) |
|mail.password          | No        |               |Password de l'usuari de connexió               |
|mail.encoded.password  | No        |               |Encoded password de l'usuari de connexió       |
|mail.extraProperties   | No        |{}             |Array extra de propietats. Valor d'exemple: {'mail.smtp.ssl.protocols':'TLSv1.2'} |

### Beans

El mòdul conté els següents beans injectats automàticament en el context d'aplicacions (Spring):

  - mailSender: client que encapsula tota la configuració de la connexió del servidor de correu

  - fluentMailService: bean que referència al servei

  - encodedPasswordJavaMailSender: client que encapsula la configuració de la connexió del servidor de correu amb el password encriptat en base64

  - encodedPasswordFluentMailService: bean que referència al servei amb el password encriptat en base64

### Entitats

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
