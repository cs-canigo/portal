+++
date        = "2021-10-25"
title       = "Canigó 3.6"
description = "Descàrrega de versió Canigó 3.6 i entorn de treball"
sections    = "Canigó"
weight     = 1
+++

## Canigó 3.6

- [Release notes Canigó 3.6](/canigo-download-related/release-notes-canigo-36)
- [Matriu de Compatibilitats Canigó 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36)

|          Versió Canigó LTS Actual  |      Última versió disponible     |
|---------------------------------      |---------------------------------- |
|              3.6 LTS                 |                3.6.0                 |



|          Dependències externes       |      Canigó 3.6.0     |
|---------------------------------     |---------------------- |
| springframework                      |  5.3.9                |
| spring.security                      |  5.5.2                |
| spring.data                          |  2.5.4                |
| springframework.boot                 |  2.5.4                |
| log4j                                |  2.14.1               |
| slf4j                                |  1.7.32               |
| junit                                |  4.13.2               |
| hamcrest                             |  2.2                  |
| mockito-core                         |  3.9.0                |
| jsonassert                           |  1.5.0                |
| jackson                              |  2.12.4               |
| springfox-swagger2                   |  2.9.2                |
| querydsl                             |  4.4.0                |
| hibernate                            |  5.4.32.Final         |
| mongo-java-driver                    |  3.12.10              |
| mongodb-driver-sync                  |  4.2.3                |
| mongodb-driver-reactivestreams       |  4.2.3                |


Podeu consultar el [llistat complet de dependències externes de Spring Boot 2.5.4]
(https://docs.spring.io/spring-boot/docs/2.5.4/reference/htmlsingle/#appendix-dependency-versions).

<br/>
S'ha certificat la **compatibilitat de Canigó 3.6.0 amb els següents servidors embeguts**:

|      Servidor incrustat             |                   Versió                    |
|---------------------------------     |---------------------------------     |
|  Tomcat                               |         9.0.52                        |
|  Undertow                              |         2.2.10.Final                   |
|  Jetty                                |         9.4.43.v20210629           |
|  Netty (webflux)                         |         4.1.67.Final               |
|  Reactor Netty (reactor webflux)  |         1.0.10              |

S'ha certificat la **compatibilitat de Canigó 3.6.0 amb els servidors suportats al**
[**Full de ruta del CTTI**](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/):

|     	Servidor d'aplicacions				|      				Versió suportada     	|
|--------------------------------- 	|--------------------------------- 	|
|  Tomcat					          	  	 	|         9.0   	             			|
|  Weblogic				          	  	 	|         14.1.x               			|
|  JBoss EAP       									|         7.x        			          |

La **versió de Java mínima per a utilitzar Canigó 3.6 és la versió 11**.

No s'ha certificat la compatibilitat amb Webshpere donat les versions actuals del full de ruta no suporten Java 11.

Lliurables associats a Canigó 3.6:

|          Entregable  |     Versió      |
|---------------------------------      |---------------------------------- |
|              Entorn de desenvolupament   |                3.0.5              |
|              Plugin eclipse        |                1.8.0              |
|              Archetype         |                1.7.0              |
|              AppBridge         |                1.2.0              |

### Entorn de desenvolupament

Podeu consultar la següent documentació:

- [Entorn desenvolupament Canigó](/canigo/entorn-desenvolupament/)

- [Plugin Canigó 3.6 per a Eclipse i creació d'aplicació](/canigo-download-related/plugin-canigo)

#### Configuració de Maven (manual)

Per a la **resolució de dependències de Canigó i llibreries de tercers necessàries**, fora de l'entorn de desenvolupament
proporcionat pel CS Canigó on la configuració ja ve prestablerta, cal configurar el següent repositori Maven:

```
https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```

Per a utilitzar aquest grup de repositoris caldrà afegir el certificat del domini `sic.ctti.extranet.gencat.cat`
al *Cacerts* de Java on s'executi el procés Maven que construeix l'aplicació Canigó.
Les passes a seguir serien les següents:

* Descarregar el certificat de la web mitjançant un navegador. Per exemple, amb Google Chrome es pot fer de la següent manera:
```
    Chrome -> "Eines per a desenvolupadors" -> "Seguretat" -> "Veure certificat" -> "Detalls" -> "Exportar"
```
* Importar el certificat al magatzem *Cacerts* de Java usant l'eina *Keytool* inclosa dins la JDK. Per exemple:
```
    $ keytool -keystore cacerts -importcert -alias canigo -file certificat.cer
```

Al fitxer `settings.xml` del Maven caldrà configurar el repositori al _profile_ per defecte:

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