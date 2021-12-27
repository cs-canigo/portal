+++
date        = "2021-12-27"
title       = "Canigó. Publicació nova versió 3.4.9 i 3.6.3"
description = "S'ha publicat una nova versió de Canigó 3.4.9 i 3.6.3 utilitzant log4j versió 2.17.0 per a corregir la vulnerabilitat detectada"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "GENER2022"
+++

S'han alliberat les **versions 3.4.9 i 3.6.3 del Framework Canigó**, corresponents a les versions Canigó 3.4 i Canigó 3.6, per a utilitzar
la llibreria log4j versió 2.17.0 amb l'objectiu de corregir la vulnerabilitat detectada en aquesta llibreria.

Podeu consultar l'abast complet de les noves versions a les [Release Notes 3.4](/canigo-download-related/release-notes-canigo-34) i
[Release Notes 3.6](/canigo-download-related/release-notes-canigo-36).

## Introducció log4j

**Log4j és una biblioteca de codi obert desenvolupada en Java per l'Apache Software Foundation que permet als desenvolupadors
de programari escriure missatges de registre**, amb l'objectiu de deixar constància d'una transacció determinada en un temps d'execució,
permetent filtrar els missatges en funció de la seva rellevància en cas necessari.

## Vulnerabilitat log4j

**L'Apache Software Foundation ha detectat, des del 10 de desembre de 2021, diverses vulnerabilitats que afecten la
biblioteca de registres basada en Java Log4J**.

Les vulnerabilitats detectades són les següents:

- Log4Shell o LogJam [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228), considerada molt crítica permetent l'execució
de codi remot no autenticat de forma senzilla en qualsevol aplicació que utilitzi des de la versió Log4j 2.0-beta9 fins a la versió 2.14.0.

- [CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046), considerada crítica, encara que la seva explotació és més limitada,
permetent, com en la vulnerabilitat anterior, l'execució de codi remot no autenticat de forma senzilla en qualsevol aplicació que faci servir des de la
versió Log4j 2.0-beta9 fins a la versió 2.15.0.

- [CVE-2021-45105](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45105), considerada moderada, permet als atacants obtenir un "StackOverflowError"
per tancar el procés i generar una denegació de servei en qualsevol aplicació que faci servir des de la versió Log4j 2.0-beta9 fins a la versió 2.16.0.

S'ha publicat la **versió 2.17.0 de la llibreria Log4j per a mitigar aquestes vulnerabilitats**.

Per més informació podeu consultar [Apache Log4j Security Vulnerabilities](https://logging.apache.org/log4j/2.x/security.html).

Des de l'Agència de Ciberseguretat de la Generalitat s'han considerat aquestes vulnerabilitats com a crítiques i d'un potencial
gran impacte, recomanant als usuaris i administradors de sistemes que actualitzin el log4j de forma urgent.

## Canigó 3.4.9 i 3.6.3

S'han publicat tots els mòduls del Framework Canigó 3.4 i Canigó 3.6 perquè passin a fer ús de la llibreria log4j versió 2.17.0,
alliberant les corresponents noves versions 3.4.9 i 3.6.3.

Podeu consultar la informació de les versions a:

- [Binaris Canigó 3.4](/canigo/download/canigo-34/)
- [Binaris Canigó 3.6](/canigo/download/canigo-36/)

Podeu consultar les matrius de compatibilitat de cada mòdul a:

- [Matriu compatibilitat Canigó 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)
- [Matriu compatibilitat Canigó 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Des de CS Canigó es recomana actualitzar-se de forma urgent a aquestes versions de Canigó i/o seguir les
indicacions del [Howto vulnerabilitat Log4j](/howtos/2021-12-13-Howto-canigo-log4jshell/)
per a resoldre aquestes vulnerabilitats.

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
