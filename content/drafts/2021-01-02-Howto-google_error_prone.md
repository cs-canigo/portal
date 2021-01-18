+++
date        = "2021-01-02"
title       = "Canigó. Com utilitzar Google error-prone"
description = "Howto per com utilitzar Google error-prone per avaluació estàtica de codi en temps de compilació"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar l'ús d'un complement al compilador Java (javac) que permet l'avaluació estàtica de codi en temps de compilació. Aquest complement és el projecte: [Google error-prone](https://errorprone.info/) que té el seu repositori: [GIT](https://github.com/google/error-prone)

---
## Justificació

_Error Prone_ permet que el compilador de Java sigui més poderós al analizar el codi font durant la compilació. 

Alguns avantatges d'utilitzar aquest complement:

 * _Shift left testing_: Mostra els errors que es descubreixen al principi del cicle de vida del desenvolupament de software. En lloc d'identificar-se durant la revisió del codi o en producció, ara s'identificaran en el moment de la compilació.
 * _Neutral al sistema de construcció_: Google Error Prone és un procesador d'anotacions Java que està connectat al compilador. Per tant, es pot utilitzar a qualsevol sistema de construcció, per exemple, Bazel, Maven, Gradle, Ant.
 * _Sugerencies de solució_: La solució del problema generalment es suggereix al mateix temps que s'identifica l'error.

---
## Configuració

Per poder utilitzar el complement a Canigó, és necesari modificar l'archivo `pom.xml` que conté la configuració maven del proyecte. 

> Es recomana utilitzar error prone amb JDK 8 o superior encara que és possible configurar-ho per JDK 6 o 7.

### Canvis en el fitxer `pom.xml`

> Dins del plugin `maven-compiler-plugin` que ja està configurat en els projectes generats amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/) s'ha d'agregar les etiquetes: `<compilerArgs>` i `<annotationProcessorPaths>` indicant que es vol utilitzar el error prone

 * Exemple de configuració del plugin

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

> Si s'utilitza JDK 8, també és necessari canviar el compilador de Java per utilitzar una versió específica del compilador d'error prone: [javac](github.com/google/error-prone-javac)

 * Canviar el compilador de Java per un d'error prone
 
 Per a canviar el compilador de Java per utilitzar un d'error prone és necessari agregar la versió del compilador a la secció de propiedades del pom.xml:

```xml
<properties>
  <javac.version>9+181-r4173-1</javac.version>
</properties>
```

 A més és necessari canviar el compiler, modificant el *maven-compiler-plugin*. Per a fer-ho, ho farem amb un perfil per així distinguir el compilador de desenvolupament del compilador d'entorns productius:

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

> Per a més informació sobre [Instal·lació Google error-prone](https://errorprone.info/docs/installation)

---
## Ús

Al compilar amb maven: `mvn compile`, a través de CLI o d'un entorn de desenvolupament, el complement **errror-prone** realitzarà un anàlisis estàtic del projecte com a part del procés de compilació. En el cas de trobar bugs classificats com _Error per Defecte_ se pararà la compilació. En el cas de bugs classificats com _Warning per defecte_ no es pararà la compilació. En qualsevol dels casos es mostrarà el detall del error i alguna proposta de solució.

El detall dels patrons d'errors que se validaran al compilar es descriuen aquí: [Patrons d'errors](https://errorprone.info/bugpatterns)

### Exemple amb CLI

Si per exemple tinguessim el següent bug al projecte:

```java
  System.out.println(String.class.getClass().toString())
```

Al executar:

```sh
mvn clean compile
```

Obtindriem un resultat semblant a:

![CLI Ejemplo](/images/howtos/2021-01-02_error_prone_cli_example1.gif)

### Exemple amb Eclipse

Error prone pot utilitzar-se amb plugins de Intellij i Eclipse. 

Per utilitzar-ho al Eclipse és necessari tenir el plugin: 

![Eclipse Configuración](/images/howtos/2021-01-02_error_prone_ide_conf.gif)

Una vegada configurat el plugin obtindriem:

![Eclipse Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example.gif)


### Exemple d'exclusió

Es possible excloure algunes de les advertencies dels patrons d'error per evitar que es pari la compilació.

Per exemple, per excloure l'error _GetClassOnClass_ de la validació:

```xml
  <arg>-Xplugin:ErrorProne -Xep:GetClassOnClass:OFF</arg>
```
Obtindriem com a resultat:

![CLI Exclusion](/images/howtos/2021-01-02_error_prone_cli_exclusion.gif)

### Exemple amb Intellij Idea

Necessitariem la configuració:

![Intellij Configuración](/images/howtos/2021-01-02_error_prone_ide_conf2.gif)

Obtenint el resultat:

![Intellij Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example2.gif)


---
## Conclusió

 * L'ús d'aquest complement permet millorar la qualitat del software permetent trobar errors el més ràpid possible en el cicle de vida del desenvolupament. 
