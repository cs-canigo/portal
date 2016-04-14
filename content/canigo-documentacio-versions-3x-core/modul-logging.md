+++
date        = "2015-03-27T10:44:27+01:00"
title       = "Administració de logs"
description = "Mòdul per administrar els logs de l'aplicació"
section     = "Documentació versió 3.x"
weight      = 10
draft		= true
+++

## Propòsit

Aquest mòdul permet administrar els logs de l'aplicació proporcionant les següents funcionalitats:

* Canviar en calent el nivell de log dels diferents paquets de l'aplicació
* Visualització de fitxers de logs en calent mitjançant streaming amb WebSockets
* Descarregar els fitxers de logs

## Instal·lació i Configuració

### Instal·lació

La instal·lació del Mòdul d'Administració de Logs es pot incloure automàticament a través del [Plugin de Canigó per a Eclipse](/related/canigo/howto/Canigo - HowTo - Generacio aplicacio Canigo 3.1 amb plugin Eclipse.pdf), o bé afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<canigo.operation.logging.version>[1.0.0,1.1.0)</canigo.operation.logging.version>

<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.operation.logging</artifactId>
    <version>${canigo.operation.logging.version}</version>
</dependency>
```

### Configuració

Si s'utilitza el Plugin de Canigó per a Eclipse s'instal·la automàticament una plana "loggingAdministration.html" dins l'aplicació. Aquesta plana web es proporciona a mode d'exemple. Des del CS Canigó no es realitzen adaptacions al [PIV de la Generalitat de Catalunya](http://www.gencat.cat/web/guies/estil/). És responsabilitat del proveïdor d'aplicacions fer les adaptacions necessàries segons els requeriments que tingui l'aplicació.

En cas de realitzar la instal·lació de forma manual s'ha de descarregar la [part estàtica](/related/canigo/documentacio/modul-logging-admin/canigo.operation.logging_static.zip)

El contingut estàtic està preparat per a ser desat a src\main\webapp\. Si es vol modificar la ubicació s'ha de modificar els enllaços existents en aquests fitxers.

Els enllaços per accedir-hi al serveis que ofereix el mòdul estan realitzats tenint en compte que al web.xml es tingui configurat el servlet dispatcher amb el següent patró **/api/***. En cas que no sigui així també caldrà adaptar els enllaços.


### Utilització del Mòdul

Per a utilitzar el mòdul s'ha de desplegar l'aplicació i accedir-hi a \loggingAdministration.html, un exemple seria : http:\\localhost:8080\aplicacioProva\loggingAdministration.html.

El path correcte depèn de l'aplicació.

![Pantalla Registres](/related/canigo/documentacio/modul-logging/image001.JPG "Pantalla Registres")

La pantalla inicial mostra els registres de l'aplicació. Amb els botons DEBUG - INFO - ERROR - FATAL - WARN es pot modificar els nivell de log de cada registre


Prement a la pestanya **Fitxers de Log** s'accedeix a la segona pestanya:

![Pantalla Fitxers de Log](/related/canigo/documentacio/modul-logging/image002.JPG "Fitxers de Log")

En aquesta segona pestanya es pot seleccionar el fitxer de log que es desitgi monitoritzar, prement el botó Connectar, o descarregar amb el botó Descarregar.

Amb el cercador es pot ressaltar el groc el text que es desitgi trobar.

### Seguretat

Es recomana que aquest mòdul es securitzi per a que només els usuaris amb rol Administrador puguin accedir tant a la plana html, com als serveis proporcionats.

La plana HTML no està preparada per a ser publicada i no compleix el PIV de la Generalitat.
