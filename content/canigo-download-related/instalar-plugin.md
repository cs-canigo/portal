+++
date        = "2015-03-31"
title       = "Instal·lar només el plug-in per Eclipse"
description = ""
section     = "Canigó"
weight      = 1
+++

<b><font color=red>IMPORTANT!</FONT></b>  és necessari tenir prèviament instal.lat apache-maven-2.2.1, apache-tomcat-6.0.28, eclipse galileo amb el plug-ing de maven i la jdk1.5.0_22. Cal tenir configurades les variables de entorn i també cal tenir instal.lat el plug-in de Maven 2 per Eclipse.

Si el nostre Eclipse no té instal.lat el plug-in de Maven 2 primerament haurem d'instal.lar aquest plug-in. Si per el contrari ja el tenim instal.lat podem pasar al segon punt del manual i instal.lar el plugin de Canigo 3.0.

#### Per instal.lar el plug-in de Maven 2 per Eclipse cal seguir els següents punts:

- En el menú d'Eclipse anant a "Help -> Install New Software".
 
- Afegint un nou "site" polsant a "Available Software Sites".
![addNewSiteMaven2](/images/canigo-guia-inici/instalar-plugin/addNewSiteMaven2.PNG)

- Crear un de nou amb el "Name" de "Maven 2"" i la "Location" de <a href="http://m2eclipse.sonatype.org/sites/m2e">http://m2eclipse.sonatype.org/sites/m2e</a>.
 
- Al polsar "Ok" i tornar a la finestra principal nomes cal seleccionar el "site" i posteriorment ens apareixerà els "Plug-ins Canigo 3.0" per poder instal.lar-ho.<br>
![addMaven2Plugin](/images/canigo-guia-inici/instalar-plugin/addMaven2Plugin.PNG)

#### Per instal.lar el plug-in de Canigo 3.0 per Eclipse cal seguir els següents punts:

- En el menú d'Eclipse anant a "Help -> Install New Software".
 
- Afegint un nou "site" polsant a "Available Software Sites".
![addNewSite](/images/canigo-guia-inici/instalar-plugin/addNewSite.PNG)

- Crear un de nou amb el "Name" de "Canigó 3 Update Site" i la "Location" de "http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/".
 
- Al polsar "Ok" i tornar a la finestra principal nomes cal seleccionar el "site" i posteriorment ens apareixerà els "Plug-ins Canigo 3.0" per poder instal.lar-ho.<br>
![addCanigoPlugin](/images/canigo-guia-inici/instalar-plugin/addCanigoPlugin.PNG)

- Al començar la instal.lació del plug-in, Eclipse ens demana que acceptem el certificat del CTTI.
![certificat](/images/canigo-guia-inici/instalar-plugin/certificat.PNG)

- L'últim punt és dir-li a "Maven 2" on està el repositori de Canigó 3.0 per tal de poder descarregar-se els "arquetypes" necessaris per l'execució del plug-in.
Anem a la següent ruta: DIRECTORI_MAVEN/conf/settings.xml. Dins afegim el següent codi:

```xml
<profile>
  <id>defaultProfile</id>
  <activation>
    <activeByDefault>true</activeByDefault>
  </activation>
  <repositories>
    <repository>
      <id>canigo</id>
      <url>http://repos.canigo.ctti.gencat.cat/repository/maven2</url>
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
    <downloadSources>false</downloadSources>
    <downloadJavadocs>false</downloadJavadocs>
  </properties>
</profile

```
