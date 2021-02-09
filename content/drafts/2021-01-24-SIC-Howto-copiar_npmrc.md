+++
date        = "2021-01-24"
title       = "SIC. Copiar l'arxiu de configuració .npmrc"
description = "Howto per a mostrar com copiar l'arxiu de configuració .npmrc a la ruta on es troba el fitxer package.json per a una correcta resolució de les dependències del projecte"
section     = "howtos"
categories  = ["SIC"]
key         = "FEBRER2021"
+++

## Introducció

Per a realitzar el procés de construcció d'artefactes via pipeline, **el SIC injecta els arxius de configuració de
Maven `settings.xml` i Npm `.npmrc` dins els contenidors**:
- **Imatges Maven**: l'arxiu `settings.xml` s'injecta al directori `.m²` del `home` de l'usuari.
- **imatges Maven i Npm**: l'arxiu `.npmrc` s'injecta a l'arrel del directori de treball.
Per defecte, a l'arrel del projecte, o a la ruta indicada mitjançant la propietat `executionDir`
del [fitxer ACA](/sic-welcome-pack/fitxer-aca/).

Per tant, en el segon cas, si l'arxiu de configuració `.npmrc` no es troba ubicat al mateix directori que el fitxer `package.json`
que conté les comandes de construcció, el procés de construcció no serà capaç d'establir la comunicació amb Nexus i no es podran
descarregar les dependències necessàries, la qual cosa ocasionarà errors de compilació.

## Solució

En general, el problema es podrà resoldre simplement especificant la propietat `executionDir` del [fitxer ACA](/sic-welcome-pack/fitxer-aca/).
No obstant això, en el cas d'utilitzar plugins de Maven per a instal·lar i compilar Npm, es pot fer ús del plugin `maven-resources-plugin`
per a copiar l'arxiu `.npmrc` a la ruta on es trobi l'arxiu `package.json`.

> Exemple d'arxiu `pom.xml`

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.2.0</version>
    <executions>
        <execution>
            <id>set-npmrc</id>
            <phase>validate</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <useDefaultDelimiters>true</useDefaultDelimiters>
                <outputDirectory>./src/main/angular</outputDirectory>
                <resources>
                    <resource>
                        <directory>./</directory>
                        <filtering>true</filtering>
                        <includes>
                            <include>.npmrc</include>
                        </includes>
                    </resource>
                </resources>
            </configuration>
       </execution>
    </executions>
    ...
```

Per a més informació: https://maven.apache.org/plugins/maven-resources-plugin/.