+++
date        = "2017-02-14"
title       = "Plugin Canigó per a Eclipse"
description = "Plugin d'eclipse per a generar una aplicació Canigó."
sections    = "Canigó."
weight      = 1
+++

## Introducció

### Propòsit

El plugin de Canigó per a Eclipse permet crear de forma automàtica l'esquelet d'una aplicació Canigó. L'aplicació que es crea està orientada a servir com a punt de partida per a la creació d'una aplicació més complexe, però des del moment de la seva creació ja es desplegable i funcional.

#### Eclipse Mars

La última versió del plugin està certificada amb la versió d'Eclipse Mars, que podeu trobar al següent enllaç: https://eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/marsr

### Instal·lació

A la pestanya Help de l'Eclipse seleccionar "Install New Software..."

![](/related/canigo/documentacio/plugin-canigo/img1.jpg)

Prèmer sobre el botó Add i afegir el respository de Canigó:
http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/

![](/related/canigo/documentacio/plugin-canigo/img2.jpg)

Seleccionar *Plug-in Canigo 3.2*

![](/related/canigo/documentacio/plugin-canigo/img3.jpg)

## Crear Aplicació Canigó

A la vista Package Explorer de l'Eclipse fer botó dret: New -> Other

![](/related/canigo/documentacio/plugin-canigo/img4.jpg)

Seleccionar Assistent Projectes Canigó -> Crear un Projecte Canigó

![](/related/canigo/documentacio/plugin-canigo/img10.jpg)

El plugin genera una aplicació REST amb un CRUD de demo implementat amb HTML5/Javascript. 

Es dóna llibertat per triar la tecnologia per a realitzar el front-end (AngularJS, Bootstrap, EmberJS...) sempre que es compleixi el PIV de Gencat.

L'aplicació inicial que es crea amb el plugin inclou d'inici:

* mòdul de persistència (Base de dades a memòria H2)
* mòdul d'administració de logs

Per a desplegar l'aplicació només s'ha de compilar i arrencar l'aplicació utilitzant Spring Boot.

![](/related/canigo/documentacio/plugin-canigo/img11.jpg)

L'aplicació demo porta incorporat Swagger i és aquesta la pantalla que es carrega quan s'accedeix a localhost:8080

## Afegir/Esborrar nous mòduls

Per afegir o treure mòduls de Canigó el plugin proporciona la possibilitat de fer-ho de forma automàtica.

S'ha de prèmer sobre el projecte, botó dret -> Canigó

![](/related/canigo/documentacio/plugin-canigo/img9.jpg)

Per exemple, per a afegir el mòdul de seguretat el plugins ens donarà la opció a triar si es desitja utilitzar JWT i el provider de seguretat a utilitzar (Arxiu, BBDD, Gicar o LDAP)

![](/related/canigo/documentacio/plugin-canigo/img12.jpg)

