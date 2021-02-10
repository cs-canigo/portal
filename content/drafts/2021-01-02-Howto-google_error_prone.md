+++
date        = "2021-01-02"
title       = "Canigó. Com utilitzar Google Error-Prone"
description = "Howto per a mostrar com utilitzar Google Error-Prone per a l'avaluació estàtica de codi en temps de compilació"
section     = "howtos"
categories  = ["canigo"]
#key         = "FEBRER2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar l'**ús d'un complement al compilador Java (_javac_) anomenat [Google Error-Prone](https://errorprone.info/)
que permet l'avaluació estàtica de codi en temps de compilació** per tal de detectar errors i evitar que aquests es traslladin a un entorn productiu.
Aquest complement té el seu [repositori de codi font](https://github.com/google/error-prone).

## Justificació

_Error Prone_ permet que el compilador de Java sigui més poderós en analitzar el codi font durant la compilació.
Alguns avantatges que aporta són els següents:

* Mostra els **errors que es detecten al principi del cicle de vida del desenvolupament** de software (_Shift left testing_).
En lloc de detectar-se durant la revisió del codi o en producció, ara es detectaran en el moment de la compilació.
* Google Error Prone és un processador d'anotacions Java que està connectat al compilador, per la qual cosa
**es pot utilitzar per a diferents sistemes de construcció: Bazel, Maven, Ant i Gradle**.
* **La solució del problema generalment se suggereix** en el moment d'identificar l'error.

## Configuració

Per a poder utilitzar el complement a Canigó, serà necessari modificar el fitxer `pom.xml` que conté la configuració maven del projecte.
**Es recomana utilitzar Google Error Prone amb JDK 8 o superior**, encara que també és possible configurar-ho per a JDK 6 o 7.

### Configuració del _plugin

Dins del _plugin_ `maven-compiler-plugin`, que ja es troba configurat en els projectes generats amb [Canigó plugin](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/),
s'han d'agregar les etiquetes `<compilerArgs>` i `<annotationProcessorPaths>` indicant que es vol utilitzar el complement.

Exemple:

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

### Canviar el compilador de Java per un d'Error Prone

Si s'utilitza JDK 8, també serà necessari canviar el compilador de Java per a utilitzar una versió específica
del compilador d'[Error Prone javac](https://github.com/google/error-prone-javac).
Per a fer-ho, serà necessari agregar la versió del compilador a la secció de propietats:

```xml
<properties>
  <javac.version>9+181-r4173-1</javac.version>
</properties>
```

A més, serà necessari canviar el compilador modificant el *maven-compiler-plugin*. Per a fer-ho, utilitzarem un perfil per
a poder diferenciar el compilador de desenvolupament del compilador d'entorns productius:

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

<br/>
Per a més informació: https://errorprone.info/docs/installation.

## Ús del complement

En compilar amb maven (`mvn compile`), sigui a través de CLI o d'un entorn de desenvolupament integrat com Eclipse o IntelliJ IDEA,
el complement **error-prone** farà un anàlisi estàtic del projecte com a part del procés de compilació de forma que:

- En cas de detectar _bugs_ classificats com _Error per Defecte_, s'aturarà la compilació.
- En cas de detectar _bugs_ classificats com _Warning per defecte_, no s'aturarà la compilació.
- En qualsevol cas, es mostrarà el detall de l'error i alguns suggeriments de solució.

El detall dels patrons d'errors que es validaran en la compilació es troben descrits a: https://errorprone.info/bugpatterns.

### Exemple amb CLI

Per exemple, si tinguéssim el següent _bug_ al projecte:

```java
System.out.println(String.class.getClass().toString())
```

En executar la compilació:

```sh
mvn clean compile
```

Obtindríem un resultat similar al que es mostra a continuació:

![CLI Ejemplo](/images/howtos/2021-01-02_error_prone_cli_example1.gif)

### Exemple amb Eclipse

Per utilitzar-ho a l'Eclipse, serà necessari instal·lar el següent _plugin_:

![Eclipse Configuración](/images/howtos/2021-01-02_error_prone_ide_conf.gif)

<br/>
Un cop configurat, en executar la compilació obtindríem un resultat similar al que es mostra a continuació:

![Eclipse Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example.gif)

### Exemple amb IntelliJ IDEA

Per a utilitzar-ho a l'IntelliJ IDEA, serà necessari donar d'alta la nova configuració _Run/Debug_:

![Intellij Configuración](/images/howtos/2021-01-02_error_prone_ide_conf2.gif)

<br/>
Un cop configurat, en executar la compilació obtindríem un resultat similar al que es mostra a continuació:

![Intellij Ejemplo](/images/howtos/2021-01-02_error_prone_ide_example2.gif)

## Exclusió de patrons d'error

És possible **excloure algunes de les advertències dels patrons d'error** per a evitar que es pari la compilació.
Per exemple, per a excloure l'error _GetClassOnClass_ de la validació hauríem de configurar al fitxer `pom.xml` el següent:

```xml
  <arg>-Xplugin:ErrorProne -Xep:GetClassOnClass:OFF</arg>
```

<br/>
De forma que, en executar la compilació obtindríem un resultat similar al que es mostra a continuació:

![CLI Exclusion](/images/howtos/2021-01-02_error_prone_cli_exclusion.gif)

## Conclusió

L'ús d'aquest complement permet millorar la qualitat del software permetent trobar errors com més aviat
millor dins el cicle de vida del desenvolupament d'aplicacions.