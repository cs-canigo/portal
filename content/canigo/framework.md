+++
date        = "2016-05-12"
title       = "Framework Canigó"
description = "Descripció del Framework de desenvolupament corporatiu JEE de la Generalitat de Catalunya"
sections    = "Canigó"
taxonomies  = []
toc 		= true
weight 		= 1
+++


## Descripció del framework

Canigó es defineix com un "Espai de treball tecnològic comú per al desenvolupament i execució d'aplicacions en l'àmbit dels sistemes corporatius i departamentals de la Generalitat de Catalunya", i es els seus objectius són: 

- Oferir una arquitectura comuna de construcció d'aplicacions JEE.
- Proporcionar un entorn de treball, documentacó, suport i manteniment dels seus components.
- Simplificar la complexitat inherent a JEE, oferint un marc de referència de treball.
- Oferir una solució aliniada amb els estàndars i solucions més utilitzades per la comunitat OpenSource.
- Oferir una solució oberta que permeti afegir i intercanviar qualsevol peça amb un cost reduït.
- Oferir una solució d'interconnectivitat amb els serveis corporatius.
- Oferir patrons de desenvolupament àmpliament acceptats.

L'arquitectura de Canigó es basa en l'arquitectura MVC (Model-Vista-Controlador), on existeix un procés d'abstracció que permet dividir una aplicació en components lògics amb responsabilitats diferenciades i que poden ser desenvolupats fins i tot per diferents rols de l'equip.

Tanmateix, a més de l'estructura lògica dels components segons el patró MVC, Canigó defineix la seva ubicació segons una arquitectura en 3 capes i 4 mòduls transversals:

**Capes**

- **Capa de Presentació**: els patrons de desenvolupament actuals fomenten la separació de la capa de presentació en dues parts diferenciades:
	- **Servidor**: la "vista" serà una resposta format JSON, mitjançant serveis (microserveis) HTTP/REST
	- **Client**: client lleuger estàtic que consumirà el serveis del punt anterior.

- **Capa de Lògica de Negoci**
- **Capa de Dades/Integració**


**Mòduls**

- **Nucli del Framework**
- **Mòdul de Seguretat**
- **Mòdul de Suport**
- **Mòdul d'Operació**


![Arquitectura Canigó](/related/canigo/arquitectura.png)

Com es mostra en el gràfic anterior, Canigó esta estructurat modularment donant així la opció de només utlitzar el mòdul del framework que es requereixi. Tots aquests mòduls es troben definits mitjançant interfícies, aïllant-los així de la implementació concreta escollida.

Canigó es basa en la utilització de interfícies i en la integració existent entre diferents APIs (JPA,...) i paquets oberts (Spring, Hibernate, ...). També ofereix extensions als paquets oberts, afegint un ampli ventall de components reutilitzables.

El framework base es pot classificar en els següents blocs:

## Components Base

Canigó3 és un framework de codi obert per a la plataforma Java. Està basat en Spring, la primera versió del qual va ser creada per Rod Johnson a l'octubre de 2002. Està pensat per donar suport a:

- la configuració d'aplicacións 
- facilitar el muntatge d'un sistema per parts fàcilment intercanviables i visibles entre elles
- la integració de serveis
- serveis de seguretat
- connexió a base de dades, transaccionalitat, ... 
- la realització de proves, a través de Spring, que permet realitzar tests unitaris desacoblant els objectes del seu context fent més senzill realitzar proves dels components per separat
- l'accés a dades externes, mitjantçant Spring, gestionant els recursos, proporcionant APIs d'ajuda i suportant la majoria de les tecnologies d'accés a dades com: JDBC, JPA (Hibernate com a proveïdor), MongoDB. 

Es pot considerar que la base principal de l'arquitectura de Canigó és un conjunt totalment integrat, i a la vegada modular, de les millors pràctiques tecnològiques existent actualment en aquest entorn, formada pels següents components:

- **Spring 4 Framework** com a contenidor centralitzat d'objectes i serveis, totalment configurable mitjançant fitxers XML. La injecció de dependències permet la configuració d'objectes fora del codi de l'aplicació (i de manera no intrusiva). Redueix el codi d'aplicació dedicat a configurar i localitzar recursos. Facilita millors pràctiques com programar contra interfícies enlloc de contra classes, permetent el desacoblament de serveis i el canvi ràpid d'una implementació concreta per una altra. Permet també la gestió de transaccions sense la utilització de APIs específiques mitjançant l'ús de Aspect Oriented Programming (AOP)
- **Spring Data JPA** proporciona un model de persistència basat en POJO's (Plain Old Java Objects) per mapejar bases de dades relacionals en Java.
- **Spring Data MongoDB** proporciona un model de persistència també basat en POJO's per la integració amb la base de dades orientada a documents MongoDB. La capa d'accés a dades es composa de repositoris
- **AOP (Aspect Oriented Programming)** per intercepció d'events a l'aplicació sense necessitat de modificar el codi

## Nucli del Framework

Aquest mòdul és el <i>core</i> del framework on es troben les principals caracteristiquest:

- **Configuració Multientorn**: basat en el PropertyPlaceHolder ofert per Spring. Amb la diferència que aquest mòdul permet disposar de propietats depenents de l'entorn sense necessitat de cap configuració extra a nivell de beans o propietats.
- **Internacionalització (i18n)**: té com a objectiu facilitar el desenvolupament a l'hora d'oferir una aplicació en múltiples llenguatges.
- **Servei de Traces**: basat en Log4j. Permet definir el nivell de traces, sortides, nivell mínim de traces, format de sortida, informació de context, ...
- **Servei d'Excepcions**: permet informar que s'ha produït un error al realitzar una petició. Canigó ofereix una sèrie d'excepcions per defecte (BaseException, CoreException, ...). També proporciona un mecanisme d'intercepció d'Excepcions per a evitar "try-catch".

## Mòdul de Seguretat

Té com a propòsit gestionar l'autenticació i autorització dels usuaris que accedeixen a les aplicacions.

- **Mòdul de Seguretat**: basat en Spring Security 3.0. Permet gestionar l'autenticació i l'autorització dels usuaris de les aplicacions.
- **Backends Seguretat**: El servei de seguretat s'integra amb GICAR, SACE, LDAP, Base de dades i Inmemory.

## Mòdul d'Integració

La finalitat d'aquests mòduls és facilitar l'accés a diferents serveis que ofereix la Generalitat.

- **PICA**: proporciona una interfície Java per accedir a la Plataforma d'Integració i Col·laboració Administrativa. Aquest mòdul permet realitzar comunicacions síncrones i asíncrones.
- **GECAT**: proporciona funcionalitat d'alta de factures, consultes i reserves online que ofereix el servei SAP de GECAT.
- **PSIS**: permet la validació de signatures i certificats mitjançant el servei de PSIS ofert per Catcert.
- **SARCAT**: permet consumir els diferents serveis que ofereix Sarcat, via Webservices o FTP/SFTP per a peticions planificades.
- **Documentum**: permet consumir funcionalitats de Documentum com l'emmagatzematge i recuperació de documents, a més de crear carpetes i associar propietats.
- **Notificacions Telemàtiques**: és un connector funcional cap a la PICA que simplifica l'utilització de Notificacions Telemàtiques de la Generalitat.
- **Antivirus**: permet l'escaneig d'arxius mitjançant la Plataforma d'Antivirus Corporatiu de la Generalitat.
- **SAP**: proporciona una interfície simplificada per a accedir a backends SAP de la Generalitat.
- **Webservices**: Canigó 3 no disposa d'un mòdul de Webservices. S'ha realitzat una guia on s'explica com realitzar l'exportació de serveis Java mitjançant Webservices, l'importació de webservices externs i generació de les classes Java d'invocació. Proposa l'utilització d'Spring WS, Jaxb i OXM
- **Cues**: Canigó 3 no disposa d'un mòdul de Gestió de Cues. S'ha realitzat una guia on s'explica com produir i consumir missatges d'una cua. Proposa l'utilització d'Spring JMS (Java Message Service).

## Mòdul de Persistència

Aquest mòdul permet persistir i recuperar dades entre l'aplicació i el motor de base de dades.

- **JPA**: Java Persistence API busca la manera d'unificar les utilitats que proporcionen un mapeig objecte-relacional. La implementació de JPA per defecte a Canigó 3 és Hibernate. Spring Data JPA permet implementar fàcilment repositoris per l'accés a dades amb JPA.
- **MongoDB**: facilitat d'integració amb MongoDB gràcies a Spring Data MongoDB.

## Mòdul de Suport

Aquest mòdul facilita l'ús d'un conjunt addicional de funcionalitats mitjançant el framework.

- **Transferència Fitxers**: permet al servidor obtenir fitxers adjunts provinents d'una petició d'un formulari HTML. A més, aquest mòdul s'integra amb d'altres com el d'Antivirus.
- **Enviament de correu**: permet l'enviament de correus electrònics a una o diverses adreces. També permet enviar en format de text pla o html i en tots dos casos ofereix la possibilitat d'adjuntar un o més fitxers en mode adjunt o inline.
- **Planificador Tasques**: basat en Spring i Quartz. Ofereix la possibilitat d'executar tasques de forma diferida. En qualsevol moment del dia, algun dia de la setmana, ...
- **OLE**: permet la manipulació d'objectes OLE (Excel i Word: crear, llegir, modificar documents de Microsoft en format OLE). Basat en POI.
- **Merging**: permet realitzar la fusió de documents en format WordML, partint d'un document amb uns marcadors que seran substituïts per un conjunt de valors indicats en un diccionari.
- **SFTP**: Permet enviar i rebre arxius entre el servidor on s'executa l'aplicació i altres servidors de forma segura mitjançant un intercanvi de claus. Basat en llibreries JSCH i Commons-VFS.

## Mòdul d'Operació

- **Instrumentació**: permet a l'aplicació generar dades d'instrumentació (nombre de peticions, nombre d'errors, ...) de la seva execució i posteriorment ser explotades amb eines de monitorització.
- **Monitorització**: permet a l'aplicació mostrar una pantalla on es mostren dades guardades pel mòdul d'instrumentació.
- **Logging**: permet a l'aplicació mostrar una pantalla on canviar el nivell dels logs, monitoritzar el diferents fitxers de logs i descarregar-los.

La informació detallada sobre els diferents components del Framework Canigó, la seva arquitectura i components, es pot trobar a l'apartat de <a href="/canigo-documentacio">documentació del portal web</a>.
