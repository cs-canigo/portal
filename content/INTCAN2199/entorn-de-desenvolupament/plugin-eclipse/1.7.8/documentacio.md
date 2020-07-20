+++
date        = "2020-06-19"
title       = "Documentació"
description = "Documentació plugin eclipse 1.7.8"
sections    = "Canigó"
weight		= 3
+++

## Introducció

### Propòsit

El plugin de Canigó per a Eclipse permet crear de forma automàtica l'esquelet d'una aplicació Canigó. L'aplicació que es crea està orientada a servir com a punt de partida per a la creació d'una aplicació més complex, però des del moment de la seva creació ja és desplegable i funcional.

*NOTA*: Tot i que les passes d'instal·lació i configuració del plugin són senzilles, [l'entorn de desenvolupament de Canigó](/canigo/entorn-desenvolupament/) conté un Eclipse amb aquest plugin configurat i llest per ser emprat.

#### Eclipse 2019-03

L'última versió del plugin està certificada amb la versió d'Eclipse 2019-03, que podeu trobar al següent enllaç: https://www.eclipse.org/downloads/packages/release/2019-03/r/eclipse-ide-enterprise-java-developers

### Prerequisit

Abans de realitzar la instal·lació del plugin Canigó s'ha de configurar el settings.xml del Maven per a tenir referenciats el [repositori de Canigó] (/canigo/download)

### Instal·lació

A la pestanya Help de l'Eclipse seleccionar "Install New Software..."

![](/related/canigo/documentacio/plugin-canigo/img1.jpg)

Prémer sobre el botó Add i afegir el respository de Canigó:
http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/

![](/related/canigo/documentacio/plugin-canigo/img2.jpg)

Seleccionar **Plug-in 1.7.8 - Canigo 3.4.4**

![](/related/canigo/documentacio/plugin-canigo/Plugin_eclipse_1_7_8.png)

## Crear Aplicació Canigó

A la vista Package Explorer de l'Eclipse fer botó dret: New -> Other

![](/related/canigo/documentacio/plugin-canigo/img4.jpg)

Seleccionar Assistent Projectes Canigó -> Crear un Projecte Canigó

![](/related/canigo/documentacio/plugin-canigo/Plugin_eclipse_1_7_4_new_project.png)

El plugin genera una aplicació REST amb un CRUD de demo .

Es dóna llibertat per triar la tecnologia per a realitzar el front-end (AngularJS, Bootstrap, EmberJS...) sempre que es compleixi el PIV de Gencat.

L'aplicació inicial que es crea amb el plugin inclou d'inici:

* mòdul de persistència (Base de dades a memòria H2)
* mòdul d'administració de logs

Per a desplegar l'aplicació només s'ha de compilar "mvn install" i arrencar l'aplicació utilitzant Spring Boot.

![](/related/canigo/documentacio/plugin-canigo/img11.jpg)

L'aplicació demo porta incorporat Swagger i és aquesta la pantalla que es carrega quan s'accedeix a http://localhost:8080/canigo-api.html

Per defecte, les APIs REST es publiquen a http://localhost:8080/api/*:

Exemples:

* http://localhost:8080/api/equipaments/
* http://localhost:8080/api/equipaments/1

La url per accedir al mòdul d'administració de logs és http://localhost:8080/loggingAdministration.html

Per a més informació sobre aquest mòdul consultar la [documentació](/canigo-documentacio-versions-3x-core/modul-logging-admin/)

## Afegir/Esborrar nous mòduls

Per afegir o treure mòduls de Canigó el plugin proporciona la possibilitat de fer-ho de forma automàtica.

S'ha de prémer sobre el projecte, botó dret -> Canigó

![](/related/canigo/documentacio/plugin-canigo/img9.jpg)

Per exemple, per a afegir el mòdul de seguretat el plugins ens donarà l'opció a triar si es desitja utilitzar JWT, el provider de seguretat a utilitzar (Arxiu, BBDD o Gicar) i si es desitja utilitzar SAML

![](/related/canigo/documentacio/plugin-canigo/Plugin_eclipse_1_7_4_add_modules_security.png)

## Solució problemes coneguts

### Problema "Possiblement els Archetypes no s'han instal·lat correctament"

### Detall problema

Una vegada instal·lat el plugin del eclipse, al intentar crear un projecte de tipus Canigó s'obté l'error "Error al executar maven. Possiblement els Archetypes no s'han instal·lat correctament"

![](/related/canigo/documentacio/plugin-canigo/Error_archetypes_no_installat_correctament.png)

Aquest error es produeix quan l'instal·lació del maven o la seva configuració no està a la ruta habitual, < home_del_usuari >/.m2/

El plugin de Canigó utilitza una llibreria per executar maven per a construir els projectes, i aquesta llibreria agafa com a ruta per trobar el settings.xml i el repository la variable "user.home" de la màquina virtual Java. Si s'utilitza l'entorn de desenvolupament aquesta variable ja apunta correctament a la ubicació del settings.xml i del repository maven

### Solució

Per a solucionar aquest problema es necessari cambiar la variable "user.home" de la JVM dintre de l'Eclipse. 

* Per això accedirem a Windows -> Preferences -> Java -> Installed JREs 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_jre.png)

* Seleccionarem la JRE en ús i editarem: 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_jre_utilitzada.png)

* Agregarem el següent argument a la JRE: -Duser.home=/path-maven: 

![](/related/canigo/documentacio/plugin-canigo/Solucio_error_archetypes_no_installat_correctament_afegir_variable.png)

ON /path-maven és el path és la ruta base on está la configuració (settings.xml) i repositori (repository) de maven amb la següent estructura:

```
/path-maven
    /-- .m2
        /-- settings.xml (amb el nexus del sic)
        /-- repository
            /-- ...
```

Encara que les imatges són d'una màquina amb Linux, també aplica per a màquines Windows
