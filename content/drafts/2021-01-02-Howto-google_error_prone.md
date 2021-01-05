+++
date        = "2021-01-02"
title       = "Canigó. Como utilizar Google error-prone"
description = "Como utilizar Google error-prone para evaluación estática de código en tiempo de compilación"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2021"
+++


## Introducción

El objetivo de este artículo es mostrar el uso de un complemento al compilador Java (javac) que permite la evaluación estática de código en tiempo de compilación. Este complemento es el proyecto: [Google error-prone](https://errorprone.info/) que tiene su repositorio: [GIT](https://github.com/google/error-prone)

---
## Justificación

_Error Prone_ permite que el compilador de Java sea más poderoso al analizar el código fuente durante la compilación. 

Algunas de las ventajas de utilizar este complemento:

 * _Shift left testing_: Muestra los errores que se descubren al principio del ciclo de vida del desarrollo de software. En lugar de identificarse durante la revisión del código o en la producción, ahora se identifican en el momento de la compilación. Se capturan antes de que le cuesten su tiempo.
 * _Neutral al sistema de construcción_: Google Error Prone es un procesador de anotaciones Java que está conectado al compilador. Por tanto, se puede utilizar en cualquier sistema de construcción, por ejemplo, Bazel, Maven, Gradle, Ant.
 * _Sugerencias de solución_: La solución del problema generalmente se sugiere al mismo tiempo que se identifica el error.

---
## Configuración

Para poder utilizar el complemento en Canigó, es necesario modificar el archivo `pom.xml` que contiene la configuración maven del proyecto. 

> Se recomienda utilizar JDK 8 o superior aunque es posible configurarlos para JDK 6 o 7.

### Cambios en el archivo `pom.xml`

> Dentro del plugin `maven-compiler-plugin` que ya está configurado en los proyectos generados con [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) se deben agregar las etiquetas: `<compilerArgs>` y `<annotationProcessorPaths>`

 * Modificar plugin

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <configuration>
    <source>${maven.compiler.plugin.source}</source>
    <target>${maven.compiler.plugin.target}</target>
    <compilerArgs>
      <arg>-XDcompilePolicy=simple</arg>
      <arg>-Xplugin:ErrorProne</arg>
    </compilerArgs>
    <annotationProcessorPaths>
      <path>
        <groupId>com.google.errorprone</groupId>
        <artifactId>error_prone_core</artifactId>
        <version>2.4.0</version>
      </path>>
    </annotationProcessorPaths>
  </configuration>
</plugin>
```

> Sí se utiliza JDK 8, tambien es necesario cambiar el compilador de Java para utilizar una versión específica: [javac](github.com/google/error-prone-javac)

 * Agregar la versión del compilador en la sección de propiedades ya existente.

```xml
<properties>
  <javac.version>9+181-r4173-1</javac.version>
</properties>
```

 * Agregar un perfil

```xml
  <profiles>
    <profile>
      <id>jdk8</id>
      <activation>
        <jdk>1.8</jdk>
      </activation>
      <build>
        <plugins>
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
              <fork>true</fork>
              <compilerArgs combine.children="append">
                <arg>-J-Xbootclasspath/p:${settings.localRepository}/com/google/errorprone/javac/${javac.version}/javac-${javac.version}.jar</arg>
              </compilerArgs>
            </configuration>
          </plugin>
        </plugins>
      </build>
    </profile>
  </profiles>
```

> Mas información: [Instalación Google error-prone](https://errorprone.info/docs/installation)

---
## Uso

Al compilar con maven: `mvn compile`, a través de CLI o de un entorno de desarrollo, el complemento **errror-prone** va a realizar un análisis estático del proyecto como parte del proceso. En el caso de encontrar bugs clasificados como _Error por Defecto_ se detendrá la compilación. En el caso de bugs clasificados como _Warning por defecto_ no se detendrá la compilación. En ambos casos se mostrará el detalle del error y alguna propuesta de solución.

El detalle de los patrones de errores que se validarán al compilar se describen aqui: [Patrones de errores](https://errorprone.info/bugpatterns)

### Ejemplo con CLI

Se agrega un código con bug

```java
  System.out.println(String.class.getClass().toString())
```

#### Ejecución:

```sh
mvn clean compile
```

#### Resultado:

![CLI Ejemplo](/images/howtos/2021-01-02_error_prone_cli_example1.gif)

### Ejemplo con Eclipse

error-prone puede utilizarse con plugins de Intellij y Eclipse. 

Para utilizar en Eclipse es necesario tener el plugin: `` configurado

####  Configuración:

![Eclipse Configuración](/images/howtos/2021-01-02_error_prone_ide_conf.gif)

#### Resultado:

![Eclipse Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example.gif)


Es posible excluir algunas de las advertencias de los patrones de errores para evitar que se detenga la compilación.

### Ejemplo de exclusión

Se excluye el error _GetClassOnClass_ de la validación.

```xml
  <arg>-Xplugin:ErrorProne -Xep:GetClassOnClass:OFF</arg>
```

#### Resultado:

![CLI Exclusion](/images/howtos/2021-01-02_error_prone_cli_exclusion.gif)

### Ejemplo con Intellij Idea

####  Configuración:

![Intellij Configuración](/images/howtos/2021-01-02_error_prone_ide_conf2.gif)

#### Resultado:

![Intellij Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example2.gif)


---
## Conclusión

 * El uso de este complemento permite mejorar la calidad del software bajo la premisa de encontrar errores lo mas rápido posible en el ciclo de vida del desarrollo. 
