+++
date        = "2024-01-15"
draft       = true
title       = "Documentació"
description = "Documentació arquetip maven nou- 1.0.0"
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
   -DarchetypeArtifactId=canigo-archetype-rest-ms \
   -DarchetypeVersion=1.0.0 \
   -DartifactId=Prova \
   -DgroupId=cat.gencat \
   -Dpackage=cat.gencat \
   -DdockerName=provaDocker
   -Dversion=1.0.0
```
Si al posar el comandament anterior ens genera el següent error:

```shell
[ERROR] The goal you specified requires a project to execute but there is no POM in this directory 
```
Assegura't de col·locar cometes dobles al principi i al final de cada paràmetre de la següent manera:

```shell
mvn archetype:generate / 
		"-DarchetypeGroupId=cat.gencat.ctti"/ 
		"-DarchetypeArtifactId=canigo-archetype-rest" / 
		"-DarchetypeVersion=0.0.1" ......
```

On:

- archetype:generate: Goal de maven per generar el projecte amb l'arquetipus Canigó

- archetypeGroupId: Grup maven al que pertany el arquetipus Canigó

- archetypeArtifactId: Artifact maven al que pertany el arquetipus Canigó

- archetypeVersion: Versió del arquetipus Canigó

- artifactId: Artifact maven de l'aplicació que volem crear

- groupId: Grup maven de l'aplicació que volem crear

- version: Versió de l'aplicació que volem crear

- appName: Nom descriptiu de l'aplicació o el projecte, el nom que tindrà les classes base

- package: Nom del paquet de projecte

- dockerName: Nom de la imatge del docker, informar aquest valor és opcional, si no s'informa per defecte s'assigna el valor del artifactId

- B: En mode batch perquè no ens realitzi les preguntes i cre-hi l'aplicació directament
