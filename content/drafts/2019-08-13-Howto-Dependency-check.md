+++
date        = "2019-11-28"
title       = "Comprovació automàtica de dependències vulnerables per aplicacions Canigó"
description = "Howto per configurar i fer-ne ús del plugin dependency-check per trobar dependències vulnerables"
section     = "howtos"
categories  = ["canigo"]
key         = "OCTUBRE2019"
+++

## Introducció

En una aplicació és important identificar i solucionar vulnerabilitats conegudes i una aplicació Canigó, utilitza llibreries externes i aquestes poden tenir vulnerabilitats. Amb aquest how-to, es preten explicar als perfils tècnics, com automatitzar les comprovacions de dependències vulnerables per aplicacions amb Canigó.

Hi ha diversos _plugins_, però per una aplicació Canigó, utilitzarem Dependency Check la qual és una eina per analitzar i identificar vulnerabilitats conegudes de les llibreries utilitzades en un projecte. El _plugin_ `org.owasp:dependency-check-maven` per Maven, permet  automatitzar la comprovació de dependències vulnerables i obtenir un report amb els resultats.

## Configuració i execució

Per poder executar el _plugin_ s'ha de tenir present que **es requereix que hi hagi connectivitat a Internet** en el moment d'execució, ja que necessita accés a les bases de dades de vulnerabilitats.

### Maven

Per la versió 3.4.1 s'ha configurat el _goal_ de Maven en el mòdul _root_ de Canigó, així tots els mòduls o aplicacions que heretin del mòdul _root_ de Canigó generaran l'informe de les seves vulnerabilitats.

Si no s'hereta del mòdul _root_ de Canigó, s'ha d'afegir el següent codi a la secció de `<plugins>` del fitxer `pom.xml`:

```xml
<plugin>
    <groupId>org.owasp</groupId>
    <artifactId>dependency-check-maven</artifactId>
    <version>${dependency-check-maven.version}</version> <!-- 5.2.1 o posterior -->
    <executions>
        <execution>
            <id>compile/check</id>
            <phase>compile</phase>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

Un cop afegit el _plugin_, cada cop que es faci una compilació es comprovarà les dependències de manera automàtica, generant-se el report a la següent ruta: `target/dependency-check-report.html`.

S'ha de tenir en compte que, en el cas que es llenci el Maven en *mode offline (-o)* el _plugin_ no farà cap validació i llençarà un WARNING als logs indicant-ho.

### CLI

Per llençar directament la comprovació de les vulnerabilitats des de la línia de comandes, es pot fer de la següent manera:

```
mvn org.owasp:dependency-check-maven:5.2.1:check
```

### failBuildOnAnyVulnerability

Per defecte, el _plugin_ està preparat per reportar vulnerabilitats, tot i això, es pot configurar per cancel·lar la construcció en el cas que en trobi alguna vulnerabilitat de la següent manera:

```xml
...
    </executions>
    <configuration>
        <failBuildOnAnyVulnerability>true</failBuildOnAnyVulnerability>
    </configuration>
</plugin>
```

## Informe de vulnerabilitats

L'informe es genera per defecte a la ruta: `target/dependency-check-report.html`.

Un exemple d'informe amb vulnerabilitats podria ser:

![Exemple informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report.png)

On es pot observar que el mòdul "canigo.security" té les següents vulnerabilitats:

- spring-security-core-5.1.3-RELEASE
- spring-security-ldap-5.1.3-RELEASE

El detall d'una de les vulnerabilitats:
![Exemple detall informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report-detail.png)

Una vegada actualitzades les llibreries l'informe indica que no ha trobat vulnerabilitats:

![Exemple després actualització informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report-after.png)

### Jenkins

Es pot obtenir un report generat d'una execució del jenkins entrant dins del número de l'execució:
![Exemple build jenkins](/images/news/2019-08-13-Dependency_check_jenkins_build_11_security.png)

Secció `workspaces`, seleccionem l'últim workspace
![Exemple workspace jenkins](/images/news/2019-08-13-Dependency_check_jenkins_workspace.png)

Entrem a `treball/target/` trobem l'informe `dependency-check-report.html`
![Exemple execució jenkins informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report-after.png)


## Informació addicional
Per a més informació sobre Dependency Check podeu consultar:

https://jeremylong.github.io/DependencyCheck/

https://jeremylong.github.io/DependencyCheck/dependency-check-maven/configuration.html

https://jeremylong.github.io/DependencyCheck/data/index.html

https://www.owasp.org/index.php/OWASP_Dependency_Check

https://nvd.nist.gov/
