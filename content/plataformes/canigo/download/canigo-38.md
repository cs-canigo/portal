+++
date        = "2024-01-15"

title       = "Canigó 3.8"
description = "Descàrrega de versió Canigó 3.8 i entorn de treball"
sections    = "Canigó"
weight     = 1
+++

## Canigó 3.8

- [Matriu de Compatibilitats](/content/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul.md)

| Versió Canigó LTS Actual | Última versió disponible |
|--------------------------|--------------------------|
| 3.8.0 LTS                | 3.8.0                    |




| Dependències externes          | Canigó 3.8.0 |
|--------------------------------|--------------|
| springframework                | 6.1.1        |
| spring.security                | 6.1.3        | 
| spring.data                    |              | 
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


Podeu consultar el llistat complet de dependències externes de Spring Boot 3.1.4 a:
https://docs.spring.io/spring-boot/docs/3.1.4/reference/htmlsingle/#appendix-dependency-versions.

<br/>
La **versió de Java mínima per a utilitzar Canigó 3.8 és la versió 17**.

S'ha certificat la **compatibilitat de Canigó 3.8.0 amb els següents servidors embeguts**:

|      Servidor incrustat             | Versió  |
|---------------------------------    |---------|
|  Tomcat                             | 10.1.15 |


S'ha certificat la **compatibilitat de Canigó 3.8.0 amb els servidors suportats al**
[**Full de ruta del CTTI**](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/):


| 	Servidor d'aplicacions		 | 		Versió suportada     	  |
|--------------------|---------------------------|
| Tomcat					     | 10.1.15   	             	 |
| Weblogic				        | 14.1.x               		   |
| JBoss EAP       				| 7.x        			            |

No s'ha certificat la compatibilitat amb Webshpere donat les versions actuals del full de ruta no suporten Java 17.

<br/>
**Lliurables** associats a Canigó 3.8:

|          Entregable         | Versió |
|-------------------          |--------|
| Archetype                   | 1.0.0  |


### Entorn de desenvolupament

Podeu consultar la següent documentació:

- [Entorn desenvolupament Canigó](/content/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/entorn-de-desenvolupament/)


#### Configuració de Maven (manual)

Per a la **resolució de dependències de Canigó i llibreries de tercers necessàries**, fora de l'entorn de desenvolupament
proporcionat pel CS Canigó on la configuració ja ve prestablerta, cal configurar el següent repositori Maven:

```
https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```

<br/>
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
