+++
date        = "2024-01-15"
title       = "Documentació"
description = "Documentació arquetip maven nou- 1.0.1"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## Introducció

### Propòsit

L’arquetipus és una eina Maven que facilita la creació de projectes seguint una plantilla. Utilitzant l’arquetipus i executant un goal de maven obtenim un projecte Canigó amb una base pre-configurada preparada per a incorporar-li noves funcionalitats.

### Configuració de Maven (manual)

Per a la **resolució de dependències de Canigó i llibreries de tercers necessàries**, fora de l'entorn de desenvolupament proporcionats pel CS Canigó on ja està pre-configurat,
cal configurar el següent repositori Maven:

```
    https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```

<br/>
Per a utilitzar aquest grup de repositoris s'ha d'afegir el certificat del domini *sic.ctti.extranet.gencat.cat* al *Cacerts* de Java des d'on s'executi el procés Maven que construeix l'aplicació Canigó.
Les passes a seguir serien les següents:

* Descarregar el certificat de la web mitjançant un navegador. Per exemple amb Google Chrome es pot fer de la següent manera:
```
    Chrome -> "Eines per a desenvolupadors" -> "Seguretat" -> "Veure certificat" -> "Detalls" -> "Exportar"
```
* Importar el certificat al magatzem *Cacerts* de Java amb l'eina *Keytool* inclosa dins la JDK:
```
    $ keytool -keystore cacerts -importcert -alias canigo -file certificat.cer
```

Un cop importat el certificat, els processos Maven executats que utilitzin la JDK on s'ha importat el certificat seran capaços de descarregar dependències del grup de repositoris.
Al fitxer `settings.xml` del Maven caldrà configurar el repositori al profile per defecte:

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

## Crear Aplicació Canigó

Per a generar aplicacions Canigó amb l'arquetipus maven utilitzarem el goal *archetype:generate*:

```bash
mvn archetype:generate \
   -DarchetypeGroupId=cat.gencat.ctti \
   -DarchetypeArtifactId=canigo-archetype-rest \
   -DarchetypeVersion=1.0.1 \
   -DartifactId=Prova \
   -DgroupId=cat.gencat \
   -DappName=prova
   -Dversion=1.0.0
```
Si al posar el comandament anterior ens genera el següent error:

```shell
[ERROR] The goal you specified requires a project to execute but there is no POM in this directory 
```
Assegura't de col·locar cometes dobles al principi i al final de cada paràmetre de la següent manera:

```shell
mvn archetype:generate /  
		"-DarchetypeGroupId=cat.gencat.ctti" 
		"-DarchetypeArtifactId=canigo-archetype-rest" / 
		"-DarchetypeVersion=1.0.1" 
      "-DartifactId=Prova" / 
		"-DgroupId=cat.gencat" / 
		"-DappName=prova" / 
		"-Dversion=1.0.0"
```


_NOTA: En el camp **artifactId** es permeten únicament caràcters alfanumèrics, no sent vàlids els caràcters especials (**"-", "@", "ñ", etc**) o les paraules reservades com a **"final"**, **"public"**._


Quan executem aquest comandament, se'ns demanarà confirmar que totes les dades són correctes. 
En aquest cas, seleccionarem l'opció **'Y'** per a indicar afirmativament, i aquí et deixo un exemple.

```shell
[INFO] ------------------< org.apache.maven:standalone-pom >-------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] --------------------------------[ pom ]---------------------------------
[INFO] 
[INFO] >>> maven-archetype-plugin:3.2.1:generate (default-cli) > generate-sources @ standalone-pom >>>
[INFO] 
[INFO] <<< maven-archetype-plugin:3.2.1:generate (default-cli) < generate-sources @ standalone-pom <<<
[INFO] 
[INFO] 
[INFO] --- maven-archetype-plugin:3.2.1:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Interactive mode
[INFO] Archetype repository not defined. Using the one from [cat.gencat.ctti:canigo-archetype-rest:1.0.0] found in catalog remote
[INFO] Using property: groupId = cat.gencat
[INFO] Using property: artifactId = Prova
[INFO] Using property: version = 1.0.0
[INFO] Using property: package = cat.gencat
[INFO] Using property: appName = prova
Confirm properties configuration:
groupId: cat.gencat
artifactId: Prova
version: 1.0.0
package: cat.gencat
appName: prova
 Y: :  
```
En cas que no es desitgi confirmar cap acció, haurem d'agregar **"-B"** al final del comando perquè s'executi correctament.
  
On:

- archetype:generate: Goal de maven per generar el projecte amb l'arquetipus Canigó

- archetypeGroupId: Grup maven al que pertany el arquetipus Canigó

- archetypeArtifactId: Artifact maven al que pertany el arquetipus Canigó

- archetypeVersion: Versió del arquetipus Canigó

- artifactId: Artifact maven de l'aplicació que es crear

- groupId: Grup maven de l'aplicació que es crear

- version: Versió de l'aplicació que es crear

- appName: Nom descriptiu de l'aplicació o el projecte, el nom que tindrà les classes base


Després d'executar el comandament, en finalitzar, veuràs un missatge indicant que tot ha anat correctament i que s'ha generat l'artefacte.

```shell
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: canigo-archetype-rest:0.0.1
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: cat.gencat
[INFO] Parameter: artifactId, Value: Prova
[INFO] Parameter: version, Value: 1.0.0
[INFO] Parameter: package, Value: cat.gencat
[INFO] Parameter: packageInPathFormat, Value: cat/gencat
[INFO] Parameter: appName, Value: prova
[INFO] Parameter: groupId, Value: cat.gencat
[INFO] Parameter: artifactId, Value: Prova
[INFO] Parameter: version, Value: 1.0.0
[INFO] Project created from Archetype in dir: C:\proyectos\Prova
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.052 s
[INFO] Finished at: 2024-01-30T18:49:43+01:00
[INFO] ------------------------------------------------------------------------
```
