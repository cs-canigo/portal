+++
date        = "2024-01-15"
draft        = true
title       = "Documentació"
description = "Documentació canigo.support.mailing 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El propòsit de l'actualització del mòdul canigó support mailing a la versió 3.1.0 per a JDK 17,
és aportar major seguretat, major funcionalitat de actualizació 
per a adaptar-lo al stack tecnològic de manera més ràpida i efectiva, 
que millorarà la seva conservació i ús.

## Funcionalitats

- Tots els paquets que anteriorment usaven la dependències associades a la libreria Javax, a causa de la seva obsolescència 
  amb el JDK 17 ,són modificades a la libreria Jakarta.
- També s'actualitza les dependències corresponents a JUnit4 a Junit Jupiter perquè siguin compatibles amb el citat , JDK 17.
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




