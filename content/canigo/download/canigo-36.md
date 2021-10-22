+++
date        = "2021-08-16"
title       = "Canigó 3.6"
description = "Descàrrega de versió Canigó 3.6, entorn de treball i plugin d'eclipse"
sections    = "Canigó"
weight     = 1
+++

## Canigó 3.6

- [Release notes Canigó 3.6](/canigo-download-related/release-notes-canigo-36)
- [Matriu de Compatibilitat Canigo 3](/canigo-download-related/matrius-compatibilitats)

|          Versió Canigó LTS Actual  |      Última versió disponible     |
|---------------------------------      |---------------------------------- |
|              3.6 LTS                 |                3.6.0                 |



|          Dependències externes       |      Canigó 3.4.0     |      Canigó 3.4.1     |      Canigó 3.4.2     |      Canigó 3.4.3     |      Canigó 3.4.4     |      Canigó 3.4.5     |      Canigó 3.4.6     |
|---------------------------------     |---------------------- |---------------------- |---------------------- |---------------------- |---------------------- |---------------------- |---------------------- |
| springframework                      |  5.1.5.RELEASE        |  5.1.5.RELEASE        |  5.1.9.RELEASE        |  5.1.9.RELEASE        |  5.1.9.RELEASE        |  5.1.9.RELEASE        |  5.1.9.RELEASE        |
| spring.security                      |  5.1.4.RELEASE        |  5.1.5.RELEASE        |  5.1.6.RELEASE        |  5.1.6.RELEASE        |  5.1.6.RELEASE        |  5.1.6.RELEASE        |  5.1.6.RELEASE        |
| spring.data                          |  2.1.5.RELEASE        |  2.1.5.RELEASE        |  2.1.10.RELEASE       |  2.1.10.RELEASE       |  2.1.10.RELEASE       |  2.1.10.RELEASE       |  2.1.10.RELEASE       |
| springframework.boot                 |  2.1.3.RELEASE        |  2.1.8.RELEASE        |  2.1.8.RELEASE        |  2.1.8.RELEASE        |  2.1.8.RELEASE        |  2.1.8.RELEASE        |  2.1.8.RELEASE        |
| log4j                                |  2.11.0               |  2.11.0               |  2.11.2               |  2.11.2               |  2.11.2               |  2.11.2               |  2.11.2               |
| slf4j                                |  1.7.25               |  1.7.25               |  1.7.28               |  1.7.28               |  1.7.28               |  1.7.28               |  1.7.28               |
| junit                                |  4.12                 |  4.12                 |  4.12                 |  4.12                 |  4.12                 |  4.12                 |  4.12                 |
| hamcrest                             |  1.3                  |  1.3                  |  1.3                  |  1.3                  |  1.3                  |  1.3                  |  1.3                  |
| mockito-core                         |  2.23.4               |  2.23.4               |  2.23.4               |  2.23.4               |  2.23.4               |  2.23.4               |  2.23.4               |
| json.path.assert                     |  2.4.0                |  2.4.0                |  2.4.0                |  2.4.0                |  2.4.0                |  2.4.0                |  2.4.0                |
| jsonassert                           |  1.5.0                |  1.5.0                |  1.5.0                |  1.5.0                |  1.5.0                |  1.5.0                |  1.5.0                |
| jackson                              |  2.9.5                |  2.9.9                |  2.9.9                |  2.9.9                |  2.9.9                |  2.9.9                |  2.9.9                |
| springfox-swagger2                   |  2.7.0                |  2.7.0                |  2.7.0                |  2.7.0                |  2.7.0                |  2.7.0                |  2.7.0                |
| querydsl                             |  4.2.1                |  4.2.1                |  4.2.1                |  4.2.1                |  4.2.1                |  4.2.1                |  4.2.1                |
| hibernate                            |  5.3.7.Final          |  5.3.7.Final          |  5.3.11.Final         |  5.3.11.Final         |  5.3.11.Final         |  5.3.11.Final         |  5.3.11.Final         |
| mongodb.driver                       |  3.10.1               |  3.10.1               |  3.10.1               |  3.10.1               |  -               		 |  -               		 |  -               		 |
| mongodb-driver-legacy                |  -			               |  -			               |  -			               |  -			               |  3.12.3           		 |  3.12.3           		 |  3.12.3           		 |
| mongodb-driver-reactivestreams       |  1.9.2                |  1.9.2                |  1.9.2                |  1.9.2                |  1.13.1               |  1.13.1               |  1.13.1               |


Podeu consultar el llistat complet de dependències externes de Spring Boot 2.1.x a:
https://docs.spring.io/spring-boot/docs/2.1.x/reference/htmlsingle/#appendix-dependency-versions.

S'ha certificat la compatibilitat de Canigó 3.4.6 amb els següents servidors embeguts:

|      Servidor incrustat             |                   Versió                    |
|---------------------------------     |---------------------------------     |
|  Tomcat                               |         9.0.16                        |
|  Undertow                              |         2.0.17.Final                   |
|  Jetty                                |         9.4.14.v20181114           |
|  Netty (webflux)                         |         4.1.33.Final               |
|  Reactor Netty (reactor webflux)  |         0.8.5.RELEASE              |

S'ha certificat la versió de Canigó 3.4.6 amb els servidors suportats al [Full de ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/):

|     	Servidor d'aplicacions				|      				Versió suportada     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0   	             			|
|  Weblogic				          	  	 	|         14.1.x               			|
|  WebSphere	  		        	  	 	|         9.0                 			|
|  JBoss EAP       									|         7.x        			          |

La versió de Java mínima per utilitzar Canigó 3.6 és 11

Entregables associats a Canigó 3.6:

|          Entregable  |     Versió      |
|---------------------------------      |---------------------------------- |
|              Entorn de desenvolupament   |                3.0.5              |
|              Plugin eclipse        |                1.7.9              |
|              Archetype         |                1.6.7              |
|              AppBridge         |                1.1.0              |

### Creació de l'entorn local de desenvolupament

Veure: [Entorn desenvolupament Canigó](/canigo/entorn-desenvolupament/).

Altra informació d’interès: [Plugin Canigó 3.6 per a Eclipse i creació d'aplicació](/canigo-download-related/plugin-canigo)

### Configuració de Maven (manual)

Per a la **resolució de dependències de Canigó i llibreries de tercers necessàries**, fora de l'entorn de desenvolupament proporcionats pel CS Canigó on ja està pre-configurat,
cal configurar el següent repositori Maven:

```
    https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```

<br/>
Per a utilitzar aquest grup de repositoris s'ha d'afegir el certificat del domini *sic.ctti.extranet.gencat.cat* al *Cacerts* de Java des d'on s'executi el procés Maven que construeix l'aplicació Canigó.
Les passes a seguir serien les següents:

* Descarregar el certificat de la web mitjançant un navegador. Per exemple amb Google Chrome es pot fer de la següent manera:
```
    Chrome -> "Eines per a desenvolupadors" -> "Seguretat" -> "Veure certificat" -> "Detalls" -> "Exportar"
```
* Importar el certificat al magatzem *Cacerts* de Java amb l'eina *Keytool* inclosa dins la JDK:
```
    $ keytool -keystore cacerts -importcert -alias canigo -file certificat.cer
```

Un cop importat el certificat els processos Maven executats que utilitzin la JDK on s'ha importat el certificat seran capaços de descarregar dependències del grup de repositoris.
Al fitxer `settings.xml` del Maven caldrà configurar el repositori al profile per defecte:

```
   <profile>
      <id>defaultProfile</id>
      <activation>
         <activeByDefault>true</activeByDefault>
      </activation>
      <repositories>
         <repository>
            <id>canigo</id>
            <url>https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/</url>
            <snapshots>
               <enabled>true</enabled>
               <updatePolicy>always</updatePolicy>
            </snapshots>
            <releases>
               <enabled>true</enabled>
            </releases>
         </repository>
      </repositories>
      <properties>
         <downloadSources>true</downloadSources>
         <downloadJavadocs>false</downloadJavadocs>
      </properties>
   </profile>

```
