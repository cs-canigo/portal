+++
date        = "2021-01-24"
title       = "SIC. Como mover el archivo de configuración NPM"
description = "Howto para mostrar como mover el archivo de configuración NPM"
section     = "howtos"
categories  = ["SIC"]
key         = "GENER2021"
+++

## Introducción

Como parte del proceso de construcción de artefactos en el Autoservei, se inyectan los archivos de configuración de maven `settings.xml` y `.npmrc` dentro de los contenedores. En el caso de contenedores con imágenes maven, el archivo `settings.xml` se inyecta en la carpeta `.m2` del home del usuario. En el caso de contenedores con imágenes maven y NPM, el archivo `.npmrc` se inyecta en la raiz del espacio de trabajo, es decir, en el primer nivel del proyecto Git descargado.

Sí en el primer nivel del proyecto no se encuentra el `package.json` que contiene los comandos de construcción, entonces al construir, no se va a establecer la comunicación con Nexus y no se podrán descargar las dependencias, lo que puede generar que falle la pipeline asociada al proyecto.

## Solución

Por ejemplo: en el caso de maven, sí se está utilizando algún plugin de maven para instalar y compilar NPM, entonces, se puede utilizar el plugin `maven-resources-plugin` para copiar el archivo `.npmrc` en la ruta donde está el archivo `package.json`

> Ejemplo de pom.xml

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

Para mas información: https://maven.apache.org/plugins/maven-resources-plugin/.
