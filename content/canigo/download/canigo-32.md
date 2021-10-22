+++
date        = "2021-08-16"
title       = "Canigó 3.2"
description = "Descàrrega de versió Canigó 3.2 i entorn de treball"
sections    = "Canigó"
weight     = 3
+++

## Canigó 3.2

- [Release notes Canigó 3.2](/canigo-download-related/release-notes-canigo-32)
- [Matriu de Compatibilitats Canigo 3.2](/canigo-download-related/matrius-compatibilitats/canigo-32)

|          Versió LTS Actual            |      Última versió disponible     |
|---------------------------------      |---------------------------------- |
|              3.2.0.1              |                3.2.7                 |

### Creació de l'entorn local de desenvolupament

<!--
- Descàrrega de l'[entorn base de treball](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/entorn-treball/canigo3.html) *És necessari actualitzar el plugin
de Canigó per Eclipse a la versió 1.2.0.
- [Guia d'inici] (/canigo-download-related/guia-inici) per a la configuració d'un entorn de desenvolupament
-->

Veure: [Entorn desenvolupament Canigó](http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)

Altra informació d'interès:

* [Plugin Canigó 3.2 per a Eclipse i creació d'aplicació](/canigo-download-related/plugin-canigo)
* [Codi plantilla Demo Canigó 3.2] (https://github.com/gencatcloud/plantilla-demo-canigo32)

### Configuració de Maven (manual)

Per a la resolució de dependències de Canigó i llibreries de tercers necessàries, fora de l'entorn de desenvolupament proporcionats pel CS Canigó on ja està pre-configurat,
cal configurar el següent repositori Maven:

```
    https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/
```

<br/>
Per a utilitzar aquest grup de repositoris s'ha d'afegir el certificat del domini *sic.ctti.extranet.gencat.ca* al *Cacerts* de Java des d'on s'executi el procés Maven que construeix l'aplicació Canigó.
Les passes a seguir serien les següents:

* Descarregar el certificat de la web mitjançant un navegador. Per exemple amb Google Chrome es pot fer de la següent manera:
```
    Chrome -> "Eines per a desenvolupadors" -> "Seguretat" -> "Veure certificat" -> "Detalls" -> "Exportar"
```
* Importar el certificat al magatzem *Cacerts* de Java amb l'eina keytool inclosa dins la JDK:
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
