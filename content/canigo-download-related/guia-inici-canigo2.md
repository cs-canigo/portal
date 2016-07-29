+++
date        = "2015-03-31"
title       = "Configuració Entorn Desenvolupament"
description = ""
section     = "Canigó"
weight      = 1
no_index    = true
+++

### Software recomanat pel Centre de Suport

Es recomana utilitzar un entorn de desenvolupament basat en Eclipse i Maven. Per construir aquest entorn cal descarregar i instal- lar un conjunt d'eines:

- JDK 1.5: http://java.sun.com/javase/downloads/index_jdk5.jsp; (en el moment d'escriure aquest document, la versió utilitzada és la JDK 5 update 22).
- Eclipse Galileo: http://www.eclipse.org/downloads/; (concretament, el paquet Eclipse IDE for Java EE Developers)
- Apache Tomcat 5.5: http://tomcat.apache.org/download-55.cgi; (en el moment d'escriure aquest document, la darrera versió disponible és la 5.5.28)
- Apache Maven 2: http://maven.apache.org/download.html; (en el moment d'escriure aquest document, la darrera versió disponible és la 2.0.11).
- Base de Dades. Pot utilitzar-se una base de dades ja existent o instal?lar-ne una de nova. Si s'opta per instal- lar-ne una de nova, es presenta el procediment per instal- lar i configurar un Oracle XE.

### Instal- lació JDK

Descarregar la JDK 1.5 de http://java.sun.com/javase/downloads/index_jdk5.jsp<br>
![instalacio_entorn_local01](/images/canigo-guia-inici/canigo2/instalacio_entorn_local01.PNG)

La instal- lació de la JDK és un wizard:<br>
![instalacio_entorn_local02](/images/canigo-guia-inici/canigo2/instalacio_entorn_local02.PNG)
![instalacio_entorn_local03](/images/canigo-guia-inici/canigo2/instalacio_entorn_local03.PNG)<br>
![instalacio_entorn_local04](/images/canigo-guia-inici/canigo2/instalacio_entorn_local04.PNG)
![instalacio_entorn_local05](/images/canigo-guia-inici/canigo2/instalacio_entorn_local05.PNG)

Un cop instal- lada la JDK, s'haurà de validar que tenim creades les següents variables d'entorn, si no estan creades s'hauran de crear amb els següents valors:<br>
![instalacio_entorn_local06](/images/canigo-guia-inici/canigo2/instalacio_entorn_local06.PNG)

<b>JAVA_HOME</b> -> C:\Archivos de programa\Java\jdk1.5.0_22 (path per defecte de l'instal- lador)<br>
<b>CLASSPATH</b> -> %JAVA_HOME%\lib<br>
<b>Path</b> -> S'ha d'afegir el directori %JAVA_HOME%\bin al path ja existent.<br>

<font color=red>Alerta!</font> Cal anar en compte que no hi ha cap fitxer ja existent al sistema operatiu java.exe ni javaw.exe en el directori c:\windows\system32. Ja que si existeix algun d'aquests fitxers, tindrà preferència sobre les variables d'entorn, i podria ser que estigués utilitzant una màquina virtual que no és la que dessitgem. 

### Instal·lació Apache Tomcat

Descarregar l'Apache Tomcat de http://tomcat.apache.org/download-55.cgi<br>
![instalacio_entorn_local07](/images/canigo-guia-inici/canigo2/instalacio_entorn_local07.PNG)

Recomanem descarregar el core i l'aplicació d'administració.<br>
Un cop descarregat el core, descomprimir-lo en el directori c:\canigo\<br>
I afegir una nova variable d'entorn:<br>

<b>CATALINA_HOME</b> -> C:\canigo\apache-tomcat-5.5.28

### Instal- lació Apache Maven 2

Descarregar Apache Maven 2 de http://maven.apache.org/download.html<br>
![instalacio_entorn_local08](/images/canigo-guia-inici/canigo2/instalacio_entorn_local08.PNG)

Un cop descarregat, descomprimir-lo en el directori c:\canigo\ <br>
I afegir una nova variable d'entorn:<br>
<b>M2_HOME</b>  -> C:\canigo\apache-maven-2.0.11<br>

També caldrà modificar la variable d'entorn PATH afegint -> %M2_HOME%\bin

### Instal·lació Oracle XE

Descarregar Oracle XE de http://www.oracle.com/technology/products/database/xe/index.html<br>
![instalacio_entorn_local09](/images/canigo-guia-inici/canigo2/instalacio_entorn_local09.PNG)

S'instal- la mitjançant un wizard:<br>
![instalacio_entorn_local10](/images/canigo-guia-inici/canigo2/instalacio_entorn_local10.PNG)
![instalacio_entorn_local11](/images/canigo-guia-inici/canigo2/instalacio_entorn_local11.PNG)<br>
![instalacio_entorn_local12](/images/canigo-guia-inici/canigo2/instalacio_entorn_local12.PNG)
![instalacio_entorn_local13](/images/canigo-guia-inici/canigo2/instalacio_entorn_local13.PNG)<br>
![instalacio_entorn_local14](/images/canigo-guia-inici/canigo2/instalacio_entorn_local14.PNG)
![instalacio_entorn_local15](/images/canigo-guia-inici/canigo2/instalacio_entorn_local15.PNG)<br>

<b>Atenció</b>: la instal- lació per defecte d'Oracle XE utilitza el port 8080 de la màquina, que també és el port per defecte de la instal- lació de Tomcat. Cal canviar-ne un dels dos:

per canviar el port per defecte del Tomcat, un cop tinguem definit el servidor d'aplicacions caldrà modificar l'arxiu server.xml:

```
<Connector acceptCount="100" connectionTimeout="20000"  disableUploadTimeout="true" enableLookups="false"  maxHttpHeaderSize="8192" maxSpareThreads="75" maxThreads="150"  minSpareThreads="25" port="8080" redirectPort="8443" />
```
per canviar el port per defecte del Oracle XE cal executar en la consola de comandes d'oracle xe, connectat com a usuari SYS, la instrucció<br>

<i>
BEGIN<br>
xdb.dbms_xdb.sethttpport(8080);<br>
END;<br>
/<br>
</i>

### Instal- lació Eclipse

Descarregar l'eclipse de http://www.eclipse.org/downloads/ <br>
![instalacio_entorn_local16](/images/canigo-guia-inici/canigo2/instalacio_entorn_local16.PNG)

Descomprimir el zip descarregat en el directori c:\canigo\ <br>
Obrir l'eclipse i indicar un workspace:<br>
![instalacio_entorn_local17](/images/canigo-guia-inici/canigo2/instalacio_entorn_local17.PNG)

Un cop obert l'eclipse recomanem instal- lar el plugin de maven per eclipse.

### Instal·lació Maven plugin to eclipse

Help -> Install new software

Location -> http://m2eclipse.sonatype.org/sites/m2e <br>
![instalacio_entorn_eclipse02](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse01.PNG)
![instalacio_entorn_eclipse02](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse02.PNG)<br>
![instalacio_entorn_eclipse02](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse03.PNG)
![instalacio_entorn_eclipse02](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse04.PNG)<br>

Caldrà indicar el motor del maven a utilitzar:<br>
![instalacio_entorn_eclipse05](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse05.PNG)


### Configuració Plantilla Canigó

Descarregar la plantilla del [portal](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/plantilla-canigo-2.3.20.zip)

Un cop descarregat el zip, descomprimir-lo en el workspace de l'eclipse.<br>
![instalacio_entorn_eclipse_A01](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse_A01.PNG)

Importem la plantilla: File -> Import.<br>
Seleccionem: General -> Existing Projects into Workspace<br>
![instalacio_entorn_eclipse_A02](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse_A02.PNG)<br>
Finalment indicar el path del workspace i seleccionar el projecte a importar.<br>
![instalacio_entorn_eclipse_A03](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse_A03.PNG)<br>
Un cop importada la plantilla, prémer el botó dret del ratolí sobre el projecte o el pom.xml i Run As -> Maven Install.<br>
![instalacio_entorn_eclipse_A04](/images/canigo-guia-inici/canigo2/instalacio_entorn_eclipse_A04.PNG)

Podria ser que al realitzar el Maven Install, hagi dependències que no pugui resoldre, com per exemple:

<font color=red>Missing artifact org.hibernate:hibernate-validator:jar:3.0.0.GA:compile</font>

En aquest cas, es pot descarregar la llibreria de:<br>
http://mirrors.ibiblio.org/pub/mirrors/maven/org.hibernate/jars/hibernate-validator-3.0.0.ga.jar

Un cop descarregada, per instal- lar-la en el repositori local, desde la consola de sistema, s'executarà la següent comanda:

<i>mvn install:install-file -DgroupId=org.hibernate -DartifactId=hibernate-validator -Dversion=3.0.0.GA -Dpackaging=jar -Dfile=c:\ hibernate-validator-3.0.0.ga.jar</i>

Tornar a realitzar un Maven Install, però aquest cop, per a accelerar el procés, com que totes les llibreries estan baixades, es pot indicar que el maven estarà Offline. Window -> Preferences -> Maven. El mode offline no es descarrega cada cop les llibreries de dependències dels repositoris maven remots pel que el temps d'espera en la compilació és menor.<br>
![configuracio_eclipse01](/images/canigo-guia-inici/canigo2/configuracio_eclipse01.PNG)<br>
Un cop realitzat l'install, per tal de publicar l'aplicació en el servidor s'afegirà una vista de servidor:<br>
![configuracio_eclipse02](/images/canigo-guia-inici/canigo2/configuracio_eclipse02.PNG)<br>
S'afegeix un nou servidor tomcat:<br>
![configuracio_eclipse03](/images/canigo-guia-inici/canigo2/configuracio_eclipse03.PNG)<br>
S'indica el directori del servidor:<br>
![configuracio_eclipse04](/images/canigo-guia-inici/canigo2/configuracio_eclipse04.PNG)<br>
Finalment, s'incorpora la plantilla al servidor:<br>
![configuracio_eclipse05](/images/canigo-guia-inici/canigo2/configuracio_eclipse05.PNG)<br>

Un cop realitzats aquests passos, la plantilla ja està preparada per a poder funcionar. Només cal iniciar el servidor i executar la següent URL en un navegador:

http://localhost:8080/plantilla-canigo

Hi ha una altra manera de publicar l'aplicació, fent servir el plugin de tomcat per eclipse:

Aquest plugin es pot descarregar de: http://www.eclipsetotale.com/tomcatPlugin.html

Un cop descarregat, descomprimir-ho dintre de la carpeta plugins que es troba en el directori de l'eclipse.<br>
Configurem el plugin des de Window -> Preferences -> Tomcat.<br>
![configuracio_eclipse06](/images/canigo-guia-inici/canigo2/configuracio_eclipse06.PNG)<br>
Sobre el projecte, Preferences -> Tomcat s'ha d'indicar que es un projecte tomcat.<br>
![configuracio_eclipse07](/images/canigo-guia-inici/canigo2/configuracio_eclipse07.PNG)<br>
 Un cop realitzat aquest canvi, només cal arrencar el servidor mitjançant les icones que apareixen a l'instal- lar el plugin:<br>
![configuracio_tomcat01](/images/canigo-guia-inici/canigo2/configuracio_tomcat01.PNG)<br>
Aquest tomcat sempre arrenca en mode debug.

### Configuració Datasource

Per a configurar el datasource, en tomcat, caldrà tenir un fitxer xml amb el nom de l'aplicació que tingui un contingut similar a aquest en el directori C:\canigo\apache-tomcat-5.5.28\conf\Catalina\localhost:

```
<Context path="plantilla-canigo" reloadable="true" docBase="C:\canigo\eclipse\workspace\plantilla-canigo-2010\target\plantilla-canigo-2.3.8" workDir="C:\canigo\eclipse\workspace\plantilla-canigo-2010\work" >
    <Logger className="org.apache.catalina.logger.SystemOutLogger" verbosity="4" timestamp="true"/>
    <Resource   name="formacioDS"    type="javax.sql.DataSource"
            driverClassName="oracle.jdbc.driver.OracleDriver"
            password="password"
            maxIdle="2"
            maxWait="5000"
            username="system"
            url="jdbc:oracle:thin:@localhost:1521:XE"
            maxActive="4"/>
</Context>
```

### Revisió dels repositoris Maven

Segons quines funcionalitats del framework vulgueu utilitzar, cal importar sobre el repositori local de Maven un conjunt de dependències que, per problemes amb les llicències, no son als repositoris públics. Cal descarregar cada una de les llibreries del lloc web que li correspon i instal.lar-les manualment:

<b>Transaction API</b>:  Aquesta dependència es pot solucionar per dos camins:

1.    afegir un nou repositori al pom.xml del projecte

	```
	<repository>
		<id>java.net</id>
		<url>http://download.java.net/maven/2/</url>
	</repository>
	```

2.    descarregar la versió 1.0.1.B de http://java.sun.com/products/jta/index.html; i instal·lar-lo amb la comana<br>
```
mvn install:install-file
    -DgroupId=javax.transaction
    -DartifactId=jta
    -Dversion=1.0.1B
    -Dpackaging=jar
    -Dfile=jta-1_0_1B-classes.zip
```
<br>
<br>
Connector API: descarregar la versió 1.5 de http://java.sun.com/j2ee/connector/download.html; i instal- lar-lo amb la comanda
```
mvn install:install-file
    -DgroupId=javax.resource
    -DartifactId=connector-api
    -Dversion=1.5
    -Dpackaging=jar
    -Dfile=connector-api.jar
 ```
<br>
<br>
JAX-RPC: descarregar la versió 1.1 (és la única disponible, tot i que la dependència és amb la versió 1.0) de http://java.sun.com/xml/downloads/jaxrpc.html; i instal- lar-lo amb la comana
```
mvn install:install-file
    -DgroupId=jaxrpc
    -DartifactId=jaxrpc
    -Dversion=1.0
    -Dpackaging=jar
     -Dfile=jaxrpc-1_1-fr-spec-api.jar
```