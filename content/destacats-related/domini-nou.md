+++
date        = "2015-04-27"
title       = "Nou domini per repositoris Maven"
description = ""
section     = "Canigó"
+++

Es recomana que les aplicacions Caniǵo accedeixin als repositoris Maven de Canigó utilitzant el nou domini "repos.canigo.ctti.gencat.cat".

La manera més fàcil de fer-ho sense modificar codi de l'aplicació és mitjançant el fitxer de configuració "settings.xml" de la instal·lació de Maven. S'ha d'afegir un mirror al nou domini:

```
<mirrors>
    <mirror>
      <id>repocanigo</id>
      <name>Repositori Canigo</name>
      <url>http://repos.canigo.ctti.gencat.cat/repository/maven2</url>
      <!-- id del repositori Canigo definit a l'aplicació: http://canigo.ctti.gencat.cat/repository/maven2 -->
      <mirrorOf>canigo</mirrorOf>
    </mirror>
  </mirrors>

```