+++
date = "2022-06-13"
title = "Canigó. Publicació nova versió de canigo.support.mailing 3.0.5"
description = "S'ha publicat una nova versió 3.0.5 de canigo.support.mailing que permet configurar paràmetres dinàmics"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "JULIOL2022"
+++

S'ha actualitzat la **versió 3.0.5 del [Mòdul d'enviament de correus]
(/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/moduls/moduls-suport/modul-correu/)
de Canigó** per a permetre la configuració de paràmetres dinàmics.

Podeu consultar l'abast complet de la nova versió en [canigo.support.mailing:3.0.5](/canigo-fwk-docs/documentacio-llibreries/canigo.support.mailing/3.0.5/).

## Canigó Mailing 3.0.5

Els canvis principals són els següents:

   - S'actualitza la configuració del projecte per a permetre variables dinàmiques associades a *mailSender*: `mail.extraProperties`
   - S'elimina la configuració via XML i es genera configuració via java config i anotacions
   - S'actualitza la dependència de mail de `javax.mail:1.4.7` (Març 2013) a `com.sun.mail.javax.mail1:1.6.2` (Agost 2018)
   - S'elimina la classe *MailServiceImpl.java* que es trobava deprecada des de 7 versions anteriors
   - S'elimina l'arxiu *canigo-support-mailing.xml* actualment en desús


També s'ha actualitzat el plugin de Canigó per a **generar projectes amb Canigó 3.6.5 amb el template corresponent
a la última versió del mòdul _canigo.support.mailing_**. Podeu consultar la notícia de la
[Actualització del _plugin_ Eclipse 1.8.6](/noticies/2022-06-13-CAN-Actualitzacio_plugin_eclipse_1_8_6/).

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).