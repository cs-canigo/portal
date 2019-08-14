+++
date        = "2019-08-13"
title       = "Comprovació automàtica de dependències vulnerables per aplicacions Canigó"
description = "Howto per configurar i fer-ne ús del plugin dependency-check per trobar dependències vulnerables"
section     = "howtos"
categories  = ["canigo"]
key         = "AGOST2019"
+++

## A qui va dirigit

Aquest how-to va dirigit a tots aquells perfils tècnics que hagin d'automatitzar les comprovacions de dependències vulnerables a les aplicacions amb Canigó.

## Introducció

Les aplicacions estan composades de divereses llibreries que donen suport per diferents aspectes de les aplicacions, com poden ser la interoperabilitat (WS, REST, etc.) o la seguretat (autenticació / autorització), però si aquestes llibreries tenen forats de seguretat, es pot comprometre llavors la seguretat de l'aplicació, i segons l'àmbit i abast pot haver des d'una fuga d'informació a la caiguda de infraestructures.

En aquest sentit hi ha bases de dades públiques que tan bon punt es publiquen les vulnerabilitats, n'informen de les llibreries o aplicacions afectades, així com dels mètodes per identificar i sol·lucionar-ho.

El plugin `org.owasp:dependency-check-maven` per Maven automatiza aquesta comprovació de dependències, i en fa un report amb els resultats. A continuació s'adjunta una captura d'exemple:

![exemple de report HTML](/images/2019-08-Howto-Dependency-check_01.png)

## Configuració i execució

El plugin permet diferents modes d'execució (actualment CLI, Maven, Jenkins, ant, Gradle i SBT), tot i que aquest how-to es centrarà només en el *mode d'execució amb Maven*.

Per poder executar el plugin s'ha de tenir present que **es requereix que hi hagi connectivitat a Internet** en el moment d'execució, car que necessita accés a les BBDD de vulnerabilitats.


### Maven

S'ha d'afegir el següent codi a la secció de `<plugins>` del fitxer `pom.xml`:

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

Un cop afegida la secció prèvia, cada cop que es faci una compilació es comprovarà les dependències de manera automàtica, generant-se el report a la següent ruta: `target/dependency-check-report.html`.

S'ha de tenir en compte que, en el cas que es llenci el Maven en *mode offline (-o)* el plugin no farà cap validació i llençarà un WARNING als logs indicant-ho.

### CLI

Per llençar directament la comprovació de les vulnerabilitats des de la línia de comandes, es pot fer de la següent manera:

```
mvn org.owasp:dependency-check-maven:5.2.1:check
```

### failBuildOnAnyVulnerability

Tot i que el plugin funciona per defecte per a reportar vulnerabilitats, es pot configurar per cancel·lar la construcció en el cas que en trobi alguna vulnerabilitat, de la següent manera:

```xml
...
    </executions>
    <configuration>
        <failBuildOnAnyVulnerability>true</failBuildOnAnyVulnerability>
    </configuration>
</plugin>
```


## Informació addicional

Enllaços d'interès:
* https://jeremylong.github.io/DependencyCheck/
* https://jeremylong.github.io/DependencyCheck/dependency-check-maven/configuration.html
* https://jeremylong.github.io/DependencyCheck/data/index.html
* https://www.owasp.org/index.php/OWASP_Dependency_Check
* https://nvd.nist.gov/
