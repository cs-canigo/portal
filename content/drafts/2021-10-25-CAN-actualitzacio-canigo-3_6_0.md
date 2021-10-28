+++
date        = "2021-10-25"
title       = "Canigó. Publicació nova versió 3.6.0"
description = "S'ha publicat una nova versió de Canigó donant suport a Jdk 11"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "DESEMBRE2021"
+++

Amb l’alliberament de la **versió 3.6.0 del Framework Canigó** s’assoleix un dels objectius que es persegueix
des de CS Canigó consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes
versions suportades de Java i Spring, a més de permetre nous paradigmes de programació.


## Actualització de tecnologies base

### Jdk 11

El setembre de 2018 Oracle va publicar la versió 11 de Java, la primera versió LTS amb la nova política de sis
mesos de cicle de suport. Podeu consultar la documentació d'aquesta versió, així com les Release Notes, mitjançant el següent enllaç:
https://www.oracle.com/technetwork/java/javase/11-relnotes-5012447.html

Des de CS Canigó, **s'ha evolucionat el Framework Canigó perquè passi a treballar amb Jdk 11 nativament**.

### Spring 5.3

Spring Framework ofereix un model complet de programació i configuració per a solucions empresarials basades en Java.
El principal objectiu de Spring 5 és proporcionar els nous paradigmes de programació funcional (webflux) i programació reactiva.

Podeu consultar el llistat de canvis relacionats amb la versió 5.3 de Spring mitjançant el següent enllaç:
https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-53.

### Spring Boot 2.5

Spring Boot, igual que Canigó, proporciona eines pel desenvolupament fàcil d'aplicacions empresarials minimitzant la
configuració necessària. Podeu consultar el llistat de canvis relacionats amb la versió 2.5 de Spring Boot mitjançant
el següent enllaç: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.5-Release-Notes.

### Integració amb Serveis Web Soap

El llenguatge de marcat extensible (XML) ajuda als Serveis Web a intercanviar dades a través d'Internet i a la
Generalitat s'utilitza aquest estàndard d'intercanvi de dades. A continuació adjuntem el llistat de mòduls d'integració
del Framework Canigó que fan servir Serveis Web Soap:

- Avisos i alertes
- DNI
- Enotum
- ICC
- Padró
- Pica
- Aresta (PSGD)
- PSIS
- Sarcat Pica
- Sarcat
- SSC
- Tributs

En aquest sentit, s'han actualitzat els clients dels mòduls indicats generant el client amb 'Apache CXF'
realitzant la transformació d'objectes Java a XML i d'XML a Java mitjançant 'JAXB'. Apache CXF és un framework complet
de codi obert per a Serveis Web i els valors més rellevants són:

- Simplicitat en la creació de clients de Serveis Web

- Alt rendiment amb un mínim d'overhead computacional

- Incrustable amb Spring

Java Architecture for XML Binding (JAXB) permet assignar classes Java a representacions XML. JAXB és una part
de la plataforma Java SE, una de les APIs de la plataforma Java EE i és part de la Java Web Services
Development Pack (JWSDP).

Podeu trobar més informació sobre els mòduls d'integració de Canigó 3.6 mitjançant el següent enllaç:
https://canigo.ctti.gencat.cat/canigo-documentacio-versions-36/integracio/.

### Swagger

Swagger és utilitzat per a exposar i documentar les API RESTful expressades en format JSON i el Framework
Canigó proporciona una preconfiguració per a exposar aquests serveis fent ús d'aquesta eina.

En aquest sentit, s'ha actualitzat la versió de Swagger a l'última versió compatible amb Canigó 3.6.0 (la versió 2.9.2)
eliminant la pàgina personalitzada de Canigó i usant tots els seus components de forma nativa.

### Dependències i plugins

S'han actualitzat les versions de les llibreries dependents de Canigó a l'última versió compatible. Podeu consultar
el llistat de dependències i plugins actualitzats mitjançant el següent enllaç: https://canigo.ctti.gencat.cat/canigo/download/canigo-36/.

## Com crear aplicacions amb Canigó 3.6

Per a crear aplicacions amb Canigó 3.6, CS Canigó proporciona el [Plugin de Canigó per l’Eclipse]
(/canigo-download-related/plugin-canigo/) que permet la creació d'aplicacions Canigó amb les bases necessàries.
Podeu consultar la noticia de l'actualització del plugin mitjançant el següent enllaç:
https://canigo.ctti.gencat.cat/noticies/2021-10-25-Actualitzacio_archetype_1_7_0_plugin_eclipse_1_8_0/.

## Com migrar a Canigó 3.6

Per a poder passar una aplicació de Canigó 3.4 a Canigó 3.6 podeu seguir els passos descrits a
[Actualització Canigó 3.4 a Canigó 3.6](/howtos/2021-10-Howto-Actualitzacio_Canigo3_4_Canigo3_6/).

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el
CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un
correu electrònic a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).