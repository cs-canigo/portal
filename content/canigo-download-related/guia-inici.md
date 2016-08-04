+++
date        = "2015-03-31"
title       = "Guia d'inici per a Canigó 3.x"
description = ""
sections    = "Canigó"
weight      = 1
no_index    = true
+++

### Introducció

Aquest document pretén oferir al desenvolupador d'aplicacions Canigó 3.0 un entorn de treball preconfigurat que permeti començar a treballar amb el framework en pocs minuts. Aquest entorn de treball consta d'un IDE de desenvolupament (Eclipse), un servidor d'aplicacions (Apache Tomcat), una màquina virtual (JDK 1.6), eina de gestió de repositoris i construcció de projectes (Maven) i una eina per la configuració de les variables d'entorn.

### Software recomenat pel centre de Suport

Es recomana utilitzar l'entorn de desenvolupament basat en Eclipse i Maven que us donem al centre de Suport de Canigó. Per construir aquest entorn cal descarregar el següent arxiu:

- [InstallCanigo3.exe]: inclou (apache-maven-2.2.1, apache-tomcat-6.0.28, eclipse helios, jdk1.6.0_18, workspace). Descarregar [aquí] (http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/entorn-treball/canigo3.html).
- [Entorn de treball propi]: en el cas que es tingui un entorn de treball propi prèviament instal.lat amb els components anomenats al punt anterior i vulguem seguir fent-lo servir podem optar només per instal.lar els "Plug-ins de Canigó 3.0" a través d'Eclipse seguint els passos del següent enllaç: [Instal.lar només el plug-in] (/canigo-download-related/instalar-plugin)

### Passos a seguir

- Cal descarregar l'entorn de treball en el següent [enllaç] (http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/entorn-treball/canigo3.html)
- <b><font color=red>IMPORTANT!</font>Aquest instal·lable reemplaça el settings.xml dintre del repositori maven per defecte</b> (C:\Documents and Settings{usuari}\.m2\settings.xml),<b> el procés d'instal·lació deixa una còpia del fitxer a $DIRECTORI_INSTALACIO/nsi-backup</b>
- Un cop instal·lat amb el directori per defecte es crearà una carpeta anomenada "canigo3" que conté totes les eines necessàries per començar a treballar amb Canigó 3.0.
<br>
<br>
- Aquest entorn configura les eines necessàries per a utilitzar-les des de l'eclipse, si es volen utilitzar des de línia de comandes caldrà afegir les següents variables d'entorn:
<br>
<br>
    CANIGO3_HOME -> c:\canigo3 per defecte<br>
    CATALINA_HOME -> %CANIGO3_HOME%\apache-tomcat-6.0.28<br>
    JAVA_HOME -> %CANIGO3_HOME%\jdk160_18<br>
    M2_HOME -> %CANIGO3_HOME%\apache-maven-2.2.1<br>
    CLASSPATH -> %JAVA_HOME%\lib<br>
    PATH -> ...;%M2_HOME\bin;%JAVA_HOME%\bin <br>
<br>
<br>
- Ja podem executar l'entorn de treball "Eclipse" seleccionant l'arxiu amb el mateix nom que hi ha a la carpeta "C:\canigo3\eclipse" i seleccionant el "workspace" que apareix
per defecte de la ruta "\canigo3\workspace".
![selectWorkspace](/images/canigo-guia-inici/selectWorkspace.PNG)

- Es recomanable anar al "Help -> Check for Updates" i comprovar que tenim instal.lada l'ultima versió del "Plug-in" de Canigo 3.0
- <b>Cal verificar que la versió de Maven que utilitza l'eclipse és la 2.2.1</b> i no la 3.0.1-SNAPSHOT que porta per defecte el plugin de maven de l'eclipse. Per fer-ho cal anar a Window --> Preferences --> Maven --> Installations i seleccionar la versió del maven que ve per defecte amb l'entorn de treball.
- <b>Cal indicar el directori del tomcat que es vol utilitzar a l'entorn de treball.</b> Per fer-ho cal anar a Window --> Preferences --> Tomcat i seleccionar la versió del tomcat que ve per defecte amb l'entorn de treball.
- Un cop obert l'entorn de treball seleccionem "File -> New -> Other..." per obrir la finestra de "Select a wizard". Dins busquem la carpeta "Assistent Projectes Canigó" i seleccionem "Crear un Projecte Canigó" i polsem el botó de "Next >".
![createCanigoProject](/images/canigo-guia-inici/createCanigoProject.PNG)

- Ara tenim obert el wizard "Crear un projecte Canigó" amb una configuració per defecte on només caldrà que escrivim el nom del projecte, per exemple "ProvaJsf". Si volguéssim crear una aplicació de tipus "Struts" o "d'Escriptori" només caldria seleccionar-la. Actualment només està disponible la versió 3.0 de Canigó, però podem seleccionar el idioma per defecte de l'aplicació i la versió asignada amb que es crearà l'aplicació. Finalment polsem el botó de "Finish".
<br>
<b><font color=red>IMPORTANT!</font></b>: la primera vegada "maven" s'ha de descarregar les dependències des d'un repositori remot a un de local i pot trigar una estona.
- Un cop creat el projecte hem d'activar el gestor de dependències, per fer-ho cal seleccionar el projecte amb el botó secundari, anar a la pestanya de "Maven" i seleccionar "Enable Dependency Management". Al finalitzar aquest procés el projecte ja compilarà.
![enableDependencyManagement](/images/canigo-guia-inici/enableDependencyManagement.PNG)

- Per desplegar aquest projecte en un servidor, primer cal configurar-lo per a que el servidor d'aplicacions "Tomcat" proporcionat amb aquest entorn el pugui desplegar. Per realitzar aquesta tascar cal seleccionar el projecte amb el botó secundari, anar a "Properties -> Tomcat", seleccionar el checkbox "Is a Tomcat Project", posar al "ContextName" el nom del projecte (en el nostre cas ProvaJsf) i per últim posar al "Subdirectory to set as web application root" la ruta "/target/" amb el nom del projecte seguit de la versió de maven, en el nostre cas "/target/ProvaJsf-1.0.0".
![propertiesProject](/images/canigo-guia-inici/propertiesProject.PNG)

- Ara hem de generar el fitxer que desplegarà "Tomcat" a la ruta del "/target". Per fer això seleccionem el projecte amb el botó secundari, anem a "Run As -> Maven package".<br>
![runAsPackage](/images/canigo-guia-inici/runAsPackage.PNG)

- Finalment podem aixecar "Tomcat" polsant la icona de "Start Tomcat" de la barra que hi ha sobre el "Project Explorer".
![startTomcat](/images/canigo-guia-inici/startTomcat.PNG)

- Per últim obrim el navegador i escrivim la següent url: http://localhost:8080/ProvaJsf/. El projecte s'obrirà i ja podrem navegar per ell.
![projectView](/images/canigo-guia-inici/projectView.PNG)

### Afegir Mòduls al plugin

- Prement el botó secundari del ratolí sobre el projecte i anant a la pestanya de "Canigó" sens obrirà un submenú amb els següents tres apartats:

	- Afegir nous Mòduls
	- Reinstal·lar Mòduls
    - Eliminar Mòduls
<Br><br>
Si encara no hem afegit cap mòdul seleccionarem l'opció "Afegir nous Mòduls".<br>
![addNewModule](/images/canigo-guia-inici/addNewModule.PNG)

- Ens apareix un assistent amb tots els mòduls disponibles agrupats per tipus de mòduls. Aquí podem seleccionar els mòduls que vulguem, per exemple el "Mòdul d'Antivirus" del grup d'Integració i el "Mòdul de Merging" del grup de Suport.
 
- Al prémer "Finish" l'aplicació demana confirmació i si seleccionem el botó d'OK instal.larà els mòduls seleccionats. Un cop instal.lats mostrarà un avis de finalització i seguidament obrirà els fitxers de configuració dels mòduls instal-lats on en el mateix arxiu apareix una explicació de com configurar-lo.
 
- Per eliminar o reinstal.lar mòduls cal seleccionar les altres opcions de la pestanya de Canigó. Apareixerà una finestra únicament amb els mòduls prèviament instal-lats.