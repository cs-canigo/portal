+++
date        = "2020-12-12"
title       = "Documentació"
description = "Documentació arquetip maven 1.6.6"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## Introducció

### Propòsit

L’arquetipus és una eina Maven que facilita la creació de projectes seguint una plantilla. Utilitzant l’arquetipus i executant un goal de maven obtenim un projecte Canigó amb una base preconfigurada preparada per a incorporar-li noves funcionalitats.

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

Un cop importat el certificat els processos Maven executats que utilitzin la JDK on s'ha importat el certificat seran capaços de descarregar dependències del grup de repositoris.
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
   -DarchetypeArtifactId=plugin-canigo-archetype-rest \
   -DarchetypeVersion=1.6.6 \
   -DartifactId=Prova \
   -DgroupId=cat.gencat \
   -Dversion=1.0.0 -B
```

On:

- archetype:generate: Goal de maven per generar el projecte amb l'arquetipus Canigó

- archetypeGroupId: Grup maven al que pertany el arquetipus Canigó

- archetypeArtifactId: Artifact maven al que pertany el arquetipus Canigó

- archetypeVersion: Versió del arquetipus Canigó

- artifactId: Artifact maven de l'aplicació que volem crear

- groupId: Grup maven de l'aplicació que volem crear

- version: Verció de l'aplicació que volem crear

- -B: En mode batch perquè no ens realitzi les preguntes i crei l'aplicació directament