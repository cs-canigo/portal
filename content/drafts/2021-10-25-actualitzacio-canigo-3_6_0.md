+++
date        = "2021-10-25"
title       = "Canigó. Publicació versió 3.6.0"
description = "S'ha publicat una nova versió de Canigó donant suport a JDK 11"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "DECEMBRE2021"
+++

Amb l’alliberament de la **versió 3.6.0 del framework Canigó** s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes versions suportades de Java i Spring, a més de permetre nous paradigmes de programació.


## Actualització tecnologies base

### JDK 11

El Setembre de 2018, Oracle va publicar la versió 11 de Java, la primera versió LTS amb la nova política de sis mesos de cicle de suport. Podeu consultar la documentació d'aquesta versió, així com les seves release notes al següent [enllaç](https://www.oracle.com/technetwork/java/javase/11-relnotes-5012447.html).

Des del CS Canigó, s'ha evolucionat el Framework Canigó per ser compatible amb JDK 11.

### Spring 5.3

Spring Framework ofereix un model complet de programació i configuració per a aplicacions empresarials basades en Java. 

El principal objectiu de Spring 5 és proporcionar els nous paradigmes de programació amb programació funcional (webflux) i programació reactiva.

Podeu consultar el llistat de canvis relacionats amb la versió 5.3 de Spring a:

https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-53

### Srping Boot 2.5:

Spring Boot, al igual que Canigó, proporciona eines pel desenvolupament fàcil d'aplicacions empresarials amb el mínim possible de configuració.

Podeu consultar el llistat de canvis relacionats amb la versió 2.5 de Spring Boot a:

https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.5-Release-Notes

### Actualització clients dels mòduls d'integració a Serveis Web Soap

El llenguatge de marcat extensible (XML) ajuda als Serveis Web a intercanviar dades a través d’Internet. A la Generalitat s'utilitza aquest estàndard per intercanviar dades a través de Serveis Web Soap.

En llistat de mòduls d'integració de Canigó que utilitzen Serveis Web Soap són:

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

S'han actualitzat els clients d'aquests mòduls d'integració amb Web Service Soap, generant el client amb `CXF` i realitzant la transformació de objectes java a xml i al revés amb `JAXB`

Podeu trobar més informació sobre els mòduls d'integració de Canigó 3.6 a:

https://canigo.ctti.gencat.cat/canigo-documentacio-versions-36/integracio/

### Actualització Swagger

S'utilitza Swagger per a exposar i descriure les API RESTful expressades amb JSON. A Canigó es proporciona una preconfiguració per exposar aquests serveis amb Swagger.

S'ha actualitzat la versió de Swagger a l'última versió compatible amb Canigó 3.6, la 2.9.2

### Actualització dependències i plugins

S'han actualitzat les versions de les llibreries depenents de Canigó a l'última versió compatible

Podeu consultar el llistat de depenències i plugins actualitzats a:

https://canigo.ctti.gencat.cat/canigo/download/canigo-36/

## Com crear aplicacions amb Canigó 3.6.0

Per a crear aplicacions amb Canigó 3.6.0, CS Canigó proporciona el [plugin de Canigó per Eclipse](/canigo-download-related/plugin-canigo/) per a la creació d'aplicacions Canigó 3.6.0.

Podeu consultar la noticia de l'actualització del plugin a:

## Com passar a Canigó 3.6.0

Per poder passar una aplicació de Canigó 3.4 a Canigó 3.6 podeu seguir els passos descrits a [Actualització Canigó 3.4 a Canigó 3.6](/howtos/2021-10-Howto-Actualitzacio_Canigo3_4_Canigo3_6/).

<br/>
Per qualsevol dubte relatiu a aquesta nova versió de Canigó us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
