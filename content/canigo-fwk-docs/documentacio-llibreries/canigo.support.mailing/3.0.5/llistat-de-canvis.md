+++
date        = "2022-06-13"
title       = "Llistat de canvis"
description = "Llistat de canvis canigo.support.mailing 3.0.5"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## canigo.support.mailing 3.0.5

- [Actualització de canigo.support.mailing](/noticies/2022-06-13-CAN-actualitzacio-canigo-mailing-3_0_5/)
   - S'actualitza la configuració del projecte per a permetre variables dinàmiques associades a *mailSender*: `mail.extraProperties`
   - Es remou la configuració via XML i es genera configuració via java config i anotacions
   - Es canvia la dependència de mail de `javax.mail:1.4.7` (Març 2013) a `com.sun.mail.javax.mail1:1.6.2` (Agost 2018)
   - S'ha remogut la classe *MailServiceImpl.java* que aquesta deprecada des de 7 versions anteriors
   - S'ha remogut l'arxiu *canigo-support-mailing.xml* que està en desús

## canigo.support.mailing 3.0.4

- [Resolució de vulnerabilitat Spring4Shell](/noticies/2022-04-13-CAN-actualitzacio-canigo-3_6_4/)
   - Actualització de tots els mòduls de Canigó per a actualitzar `org.springframework` de 5.3.9 a 5.3.18,
   `org.springframework.boot` de 2.5.4 a 2.5.12 i `spring.security` de 5.5.2 a 5.6.2

## canigo.support.mailing 3.0.3

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-27-CAN-actualitzacio-canigo-3_4_9_3_6_3/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.17.0 de log4j

## canigo.support.mailing 3.0.2

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-17-CAN-actualitzacio-canigo-3_4_8_3_6_2/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.16.0 de log4j

## canigo.support.mailing 3.0.1

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.15.0 de log4j

## canigo.support.mailing 3.0.0

- [Actualització de tecnologies base](/noticies/2021-10-25-CAN-actualitzacio-canigo-3_6_0/)
   - Actualització a Java 11, Spring 5.3, Spring Boot 2.5
   - Actualització dels clients dels mòduls d'integració amb Serveis Web Soap
   - Actualització versió Swagger
   - Actualització versió dependències
   - Actualització versió plugins