+++
date        = "2021-12-14"
title       = "Canigó. Publicació nova versió 3.4.7 i 3.6.1"
description = "S'ha publicat una nova versió de Canigó 3.4.7 i 3.6.1 utilitzant log4j versió 2.15"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "GENER2022"
+++

S'ha alliberat la **versió 3.4.7 i 3.6.1 del Framework Canigó**, corresponents a les versions Canigó 3.4 i Canigó 3.6, per a utilitzar la llibreria log4j versió 2.15 per a corregir la vulnerabilitat trobada en aquesta llibreria.

Podeu consultar l'abast complet de les noves versions a les [Release Notes 3.4](/canigo-download-related/release-notes-canigo-34) i [Release Notes 3.6](/canigo-download-related/release-notes-canigo-36).

## Introducció log4j

Log4j és una biblioteca de codi obert desenvolupada en Java per l'Apache Software Foundation que permet als desenvolupadors de programari escriure missatges de registre, amb l’objectiu de deixar
constància d'una transacció determinada en un temps d'execució, permetin filtrar els missatges en funció de la seva rellevància en cas necessari.


## Vulnerabilitat log4j

L'Apache Software Foundation va publicar el 10 de desembre de 2021, el descobriment d’una nova vulnerabilitat crítica zero day explotada activament que afecta la biblioteca de registres basada en Java Log4J 2, descoberta per l’engynier de seguretat p0rz9, i les seves correccions per contenir-la. La vulnerabilitat, anomenada Log4Shell o LogJam [CVE-2021-44228]((https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228)), és considerada molt crítica, permetent l’execució de codi remot no autenticat de forma senzilla en qualsevol aplicació que utilitzi l’aplicació de la versió Log4j 2.0-beta9 fins a la 2.14.

Els atacants tan sols aconsegueixen que es guardi en el log certa cadena de caràcters o controlar els paràmetres d'entrada de l'aplicatiu Log4j per poder vulnerar la màquina. L'explotació es pot aconseguir mitjançant una única cadena de text, que pot provocar que una aplicació arribi a un host extern maliciós si es registra mitjançant la instància vulnerable de Log4j, otorgant de
manera efectiva a l'adversari la capacitat de recuperar una càrrega útil d'un servidor remot i executar-lo localment, comprometent el sistema. Aquest comportament és possible degut certes configuracions de JNDI (Java Naming and Directory Interface) que no protegeixen contra LDAP controlat per l’atacant, a on es pot executar codi arbitrari carregat des dels servidors LDAP quan la substitució de cerca de missatges està habilitada.

A partir de log4j 2.15.0, aquest comportament s'ha desactivat per defecte.

Des de l'agencia de ciberseguretat de la Generalitat es considera aquesta vulnerabilitat com a crítica i es considera d'un potencial gran impacte i recomana als usuaris i administradors de sistemes actualitzin el log4j de forma urgent.

## Canigó 3.4.7 i 3.6.1

S'han publicat tots els mòduls de Canigó 3.4 i Canigó 3.6 per a que facin ús de la llibreria log4j versió 2.15, publicant les noves versions 3.4.7 i 3.6.1.

Podeu consultar la informació de les versions a:

- [Binaris Canigó 3.4](/canigo/download/canigo-34/)

- [Binaris Canigó 3.6](/canigo/download/canigo-36/)

Podeu consultar les matrius de compatibilitat de cada mòdul a:

- [Matriu compatibilitat Canigó 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- [Matriu compatibilitat Canigó 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Des de CS Canigó es recomana de forma urgent actualitzar-se a aquestes versions de Canigó i seguir les indicacions del howto [Vulnerabilidad: CVE-2021-44228 (log4jshell)](/drafts/2021-12-13-Howto-canigo-log4jshell/) per a resoldre aquesta vulnerabilitat.

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
