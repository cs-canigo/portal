+++
date = "2021-10-07"
title = "Automatitzar el descriptor sic.yml (Maven)"
description = "Howto per a mostrar com automatitzar el descriptor sic.yml en aplicacions Maven"
section = "howtos"
categories = ["sic"]
key = "NOVEMBRE2021"
+++

## Introducció

D’entre els requisits per a la integració al SIC de les aplicacions es demana indicar la **versió del component
en cada desplegament que serà utilitzada per a l'etiquetatge de codi font i la publicació de llibreries**.
Aquesta versió cal indicar-la de forma agnòstica a la tecnologia, per la qual cosa el SIC requereix haver
definit aquesta versió en un fitxer en format YML ubicat dins de la carpeta `/sic` a l’arrel del projecte.

En aquest sentit, cal destacar que al SIC 2.0 la versió calia indicar-la al fitxer descriptor `/sic/sic.yml` i,
en canvi, **al SIC 3.0 aquest fitxer deixa de ser un requisit permetent indicar la versió al mateix fitxer `/sic/aca.yml`**,
on es configura el funcionament complet de la pipeline. No obstant això, si es vol automatitzar aquest descriptor es pot
seguir fent ús del mateix per tal d’assegurar l’alineament de versions d’una forma automatitzada.

Aquest howto pretén explicar com automatitzar aquest fitxer `sic.yml` per a aplicacions Maven.

## Configuració

A `src/main/resources` cal crear el fitxer `sic.yml` amb el següent contingut:

```
version: ${project.version}
```

Al fitxer pom.xml de l'aplicació s'ha d'afegir el plugin **maven-resources-plugin** amb la següent configuració:

```
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-resources-plugin</artifactId>
  <version>3.2.0</version>
  <executions>
     <execution>
        <id>set-version</id>
        <phase>process-resources</phase>
        <goals>
           <goal>copy-resources</goal>
        </goals>
        <configuration>
           <useDefaultDelimiters>true</useDefaultDelimiters>
           <outputDirectory>sic</outputDirectory>
           <resources>
              <resource>
                 <directory>src/main/resources</directory>
                 <filtering>true</filtering>
                 <includes>
                    <include>sic.yml</include>
                 </includes>
              </resource>
           </resources>
        </configuration>
     </execution>
  </executions>
</plugin>
```

D'aquesta manera, quan es construeixi l'aplicació, automàticament s'establirà la versió al fitxer `/sic/sic.yml`. Per exemple:

```
version: 1.0.0
```

D'aquesta manera, al SIC 3.0 ja no serà necessari informar l'atribut [`info.version`](/sic30-guies/fitxer-aca/#info-version) en el fitxer `aca.yml`.

</br>
En el cas d’**aplicacions Canigó, a partir de la versió 3.2.3 aquest descriptor i la configuració Maven requerida, vindrà
preestablerta** per a nous projectes generats amb el [plugin de Canigó](https://canigo.ctti.gencat.cat/canigo-download-related/plugin-canigo/)
per a l’IDE de desenvolupament Eclipse.
