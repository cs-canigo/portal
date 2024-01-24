+++
date        = "2024-01-15"
draft        = true
title       = "Canigó. Publicació nova versió 3.8.0"
description = "S'ha publicat una nova versió de Canigó donant suport a Jdk 17"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "GENER2023"
+++

Amb l’alliberament de la **versió 3.8.0 del Framework Canigó** s’assoleix un dels objectius que es persegueix
des de CS Canigó consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes
versions suportades de Java i Spring, a més de permetre nous paradigmes de programació.


## Actualització de tecnologies base

### JDK 17

Al setembre de 2021 Oracle va publicar la versió 17 de Java, la primera versió LTS amb la nova política de sis
mesos de cicle de suport. Podeu consultar la documentació d'aquesta versió, així com les Release Notes, mitjançant el següent enllaç:
https://www.oracle.com/java/technologies/javase/17-relnotes.html

Des de CS Canigó, **s'ha evolucionat el Framework Canigó perquè passi a treballar amb JDK 17 nativament**.

### Spring 6.1.1

Spring Framework ofereix un model complet de programació i configuració per a solucions empresarials basades en Java.
El principal objectiu de Spring 6 és proporcionar els nous paradigmes de programació funcional (webflux) i programació reactiva.
Podeu consultar el llistat de canvis relacionats amb la versió 6.1 de Spring mitjançant el següent enllaç:
https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-61.

### Spring Boot 3.1.4

Spring Boot, igual que Canigó, proporciona eines pel desenvolupament fàcil d'aplicacions empresarials minimitzant la
configuració necessària. Podeu consultar el llistat de canvis relacionats amb la versió 3.1.4 de Spring Boot mitjançant
el següent enllaç: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes

### Swagger

Swagger és utilitzat per a exposar i documentar les API RESTful expressades en format JSON i el Framework
Canigó proporciona una pre-configuració per a exposar aquests serveis fent ús d'aquesta eina.
S'ha actualitzat la versió de Swagger a l'última versió compatible amb Canigó 3.8.0 (la versió 3.0.0)
de OpenApi eliminant la pàgina personalitzada de Canigó i usant tots els seus components de forma nativa.

### Dependències i plugins
Es crea un nou arquetip Maven més agnòstic perquè no calgui dependre de cap plugin extern.
Es poden veure totes les dependències i canvis en el següent enllaç:[CANIGÓ 3.8.0](/content/canigo/download/canigo-38/).

## Com crear aplicacions amb Canigó 3.8

Per a crear aplicacions amb Canigó 3.8 (CS Canigó) no cal fer servir cap plugin extern,ja que,
l'arquetip està creat d'una manera agnòstica, és a dir, no depèn de cap plugin per a la seva
creació d'aplicacions Canigó atès que ja conté les bases necessàries.


## Com migrar a Canigó 3.8

Per a poder passar una aplicació de Canigó 3.6 a Canigó 3.8 podeu seguir els passos descrits a
[Actualització Canigó 3.6 a Canigó 3.8](/content/howtos/2024-01-15-Howto-Actualitzacio_Canigo3_6_Canigo3_8/).

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu adreçar a
CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant un
correu electrònic a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
