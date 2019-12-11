+++
date        = "2019-12-10"
title       = "Certificació Canigó 3.4.1 amb servidors full de ruta"
description = "Des de CS Canigó s'ha certificat el correcte funcionament d'una aplicació amb Canigó 3.4.1 amb els servidors d'aplicacions suportats en el full de ruta del CTTI actuals"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2019"
+++


## Introducció

El mes de Març es va publicar la nova versió 3.4.0 de Canigó, vegeu la notícia [Canigó. Publicació versió 3.4.0](/noticies/2019-03-29-actualitzacio-canigo-3_4_0/), aquesta versió incorpora una gran actualització de les llibreries utilitzades a Canigó, passant a utilitzar Spring 5 i Spring Boot 2.

El passat mes de setembre es va publicar la nova **versió 3.4.1 de Canigó** on s'ha realitzat l'actualització de les llibreries a versions sense vulnerabilitats públiques i amb l'actualització dels mòduls d'Antivirus i SSC. Des de CS Canigó s'ha certificat el correcte funcionament d'una aplicació amb aquesta nova versió del framework amb els servidors d'aplicacions suportats en el full de ruta del CTTI actuals. Aquesta aplicació contenia un _CRUD_ de serveis rest utilitzant una base de dades H2, el mòdul de seguretat amb _JWT_ i autenticació amb GICAR. S'ha generat amb el [Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/).

## Servidors full de ruta

Els servidors d'aplicacions suportats actualment en el [full de ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/)
 són:

|     	Servidor d'aplicacions				|      				Versió suportada     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0   	             			|
|  Weblogic				          	  	 	|         12.2.x               			|
|  WebSphere	  		        	  	 	|         9.0                 			|
|  JBoss EAP       									|         7.x        			          |

Per a la certificació dels diferents servidors d'aplicacions s'han modificat les propietats de la _jvm_ que inicien els servidors d'aplicacions incorporant:

```
-Dentorn=loc -Dapplication.defaultLanguage=ca_ES -Dspring.main.allow-bean-definition-overriding=true
```

### Tomcat

Per a la certificació s'ha utilitzat la versió 9.0.24 i no s'ha requerit cap altra modificació.

### Weblogic

Per a la certificació s'ha utilitzat la versió 12.2.1.3 i no s'ha requerit cap altra modificació.

### WebSphere

Per a la certificació s'ha utilitzat la versió 9.0.0.10 i ha estat necessari modificar el "Class loading and update detection" de l'aplicació en el WebSphere amb les opcions:

- Select Classes loaded with local class loader first (parent last).

- Single class loader for application.

Seguint la secció "Configuració a WebSphere" del how to [Desplegar una aplicació Canigó 3.2 a WebSphere 8.5.5](/howtos/2017-06-Howto-Desplegar_aplicacio_canigo32_websphere/#configuració-a-websphere)

![](/related/canigo/howto/imatges/20170501.jpg)

### JBoss

Per a la certificació s'ha utilitzat la versió EAP 7.1. Per un _bug_ en la versió del JBoss utilitzada, resolt a la versió JBoss EAP 7.9, https://issues.jboss.org/browse/JBPM-7454, ha estat necessari modificar l'arxiu /src/main/resources/config/persistence/persistence.xml amb el llistat d'entitats del nostre model.
