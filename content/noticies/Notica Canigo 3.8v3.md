+++
date = "2024-01-15"
title = "Canigó 3.8"
description = "Publicació nova versió Canigó 3.8"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "FEBRER2024"
+++

# Publicació nova versió Canigó 3.8

## Novetats de la nova versió

### Suport per JDK 17

Canigó 3.8.0 incorpora el suport complet per JDK 17, proporcionant les últimes funcionalitats i millores de Java.

### Actualització de Spring Boot i Spring Framework

Aquesta versió inclou les versions més recents de Spring Boot 3.1.4 i Spring Framework 6.0. Això garanteix que els desenvolupadors puguin aprofitar les últimes característiques i optimitzacions d'aquestes tecnologies.

##### Els enllaços oficials de Spring.
[Spring framework](https://docs.spring.io/spring-framework/reference/index.html)


S'informa a continuació sobre l'actualització de mòduls externs

| Dependències externes          | Canigó 3.8.0 |
|--------------------------------|--------------|
| springframework                | 6.1.1        |
| spring.security                | 6.1.3        | 
| spring.data                    | 3.1.4        | 
| springframework.boot           | 3.1.4        |
| log4j                          | 2.22.0       | 
| slf4j                          | 2.0.9        | 
| junit.jupiter                  | 5.10.1       | 
| hamcrest                       | 2.2          | 
| mockito-core                   | 5.7.0        | 
| jsonassert                     | 1.5.0        |
| jackson                        | 2.13.2       |
| querydsl                       | 5.0.0        |
| hibernate                      | 5.6.7.Final  |
| mongo-java-driver              | 4.6.0        |
| mongodb-driver-sync            | 4.6.0        |
| mongodb-driver-reactivestreams | 4.6.0        |


### Mòduls actualitzats

## Canigó 3.8.0

|                                                   		| 15/01/2024 (3.8.0)																														|
|---------------------------------------------------		|------------------																														                 |
| **canigo.core**                                   		| [5.1.0](/plataformes/canigo/documentacio-llibreries/canigo.core/5.1.0/)  	                |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
| **canigo.operation.logging**                              | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.operation.logging/3.1.0/)  	|
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
|   canigo.web.core                                   		| [3.1.0, 3.2.0)                                                                            |
| **canigo.persistence.core**                               | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.persistence.core/3.1.0/)  	    |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
| **canigo.persistence.jpa**                                | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.persistence.jpa/3.1.0/)  	    |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.persistence.core                                 | [3.1.0, 3.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
| **canigo.persistence.mongodb**                            | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.persistence.mongodb/3.1.0/)  	|
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.persistence.core                                 | [3.1.0, 3.2.0)                                                                            |
| **canigo.security**                                       | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.security/3.1.0/)  	            |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
|   canigo.persistence.jpa                                  | [3.1.0, 3.2.0)                                                                            |
| **canigo.support.mailing**                                | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.support.mailing/3.1.0/)  	    |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
| **canigo.support.sftp**                                   | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.support.sftp/3.1.0/)  	        |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
| **canigo.test**                                           | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/)  	                |
| **canigo.web.core**                                       | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.web.core/3.1.0/)  	            |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |
| **canigo.web.rs**                                         | [3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.web.rs/3.1.0/)  	            |
|   canigo.core                                   		    | [5.1.0, 5.2.0)                                                                            |
|   canigo.test                                   		    | [3.1.0, 3.2.0)                                                                            |




### Certificació en tecnologíes Full de Ruta

S'ha certificat la **compatibilitat de Canigó 3.8.0 amb els següents servidors embeguts**:

|      Servidor incrustat             | Versió  |
|---------------------------------    |---------|
|  Tomcat                             | 10.1.15 |


S'ha certificat la **compatibilitat de Canigó 3.8.0 amb els servidors suportats al**
[**Full de ruta del CTTI**](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) (A data d'octubre 2023): 


| 	Servidor d'aplicacions		 | 		Versió suportada     	  |
|--------------------|---------------------------|
| Tomcat					     | 10.1.15   	             	 |
| JBoss EAP       				| 7.x        			            |

S'ha certificat la **compatibilitat de Canigó 3.8.0 amb les següents base de dades**

| 	Servidor de base de dades		 | 		Versió suportada     	  |
|--------------------|---------------------------|
| MongoDB					     | 5  	             	 |
| Oracle				        | 19C               		   |
| MySQL       				| 8.x        			            |
| PostgreSQL       				| 14        			            |


### Arquetip maven agnòstic del IDE

A partir d'ara, l'arquetip Maven de Canigó es converteix en un arquetip agnòstic, eliminant la dependència amb el plugin d'Eclipse pel seu funcionament i permetent importar l'artefacte generat en el IDE desitjat. Això facilita la flexibilitat i l'adaptabilitat del framework als diferents entorns i necessitats dels desenvolupadors.

_Documentació del nou arquetip_: [Arquetip maven 0.0.1](https://canigo.ctti.gencat.cat/plataformes/canigo/entorn-de-desenvolupament/arquetip-maven/nova-versio/0.0.1/documentacio/)

_AVÍS: En aquesta versió, el plugin de Canigó i la màquina virtual amb Vagrant queden obsolets_

_[Màquina virtual (Deprecat)](/plataformes/canigo/entorn-de-desenvolupament/maquina-virtual/)_

_[Plugin eclipse (Deprecat)](/plataformes/canigo/entorn-de-desenvolupament/plugin-eclipse/)_


### Configuració en Fitxers YML

Amb la versió 3.8.0, totes les configuracions de Canigó han estat traslladades a fitxers YML. Aquest format proporciona una estructura més clara i llegible, i permet utilitzar les propietats més actuals de cada tecnologia integrada.


## Documentació addicional

Podeu consultar el [llistat de canvis](/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/llistat-de-canvis/) d'aquesta nova versió, i la [documentació oficial](/plataformes/canigo/documentacio-per-versions/3.8LTS) per obtenir més detalls.
