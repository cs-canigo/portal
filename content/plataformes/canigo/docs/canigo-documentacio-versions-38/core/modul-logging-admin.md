+++
date        = "2024-01-15"

title       = "Administració de logs"
description = "Mòdul per administrar els logs de l'aplicació"
sections    = "Canigó. Documentació Versió 3.8"
weight      = 11
+++

## Propòsit

Aquest mòdul permet administrar els logs de l'aplicació proporcionant les següents funcionalitats:

* Canviar en calent el nivell de log dels diferents paquets de l'aplicació
* Visualització de fitxers de logs en temps real mitjançant streaming amb WebSockets
* Descarregar els fitxers de logs

## Instal·lació i Configuració

### Instal·lació

Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. 
En cas d'una instal·lació manual afegir les següents línies al pom.xml de l'aplicació:


```
<dependency>
    <groupId>cat.gencat.ctti</groupId>
    <artifactId>canigo.operation.logging</artifactId>
    <version>${canigo.operation.logging.version}</version>
</dependency>
```

A la [Matriu de Compatibilitats 3.8](/content/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/compatibilitat-per-modul.md)  es pot comprovar la versió del mòdul compatible amb la versió de Canigó utilitzada.

### Configuració

#### Client

Si s'utilitza el Plugin de Canigó per a Eclipse s'instal·la automàticament una plana "loggingAdministration.html" dins l'aplicació.  En cas de realitzar la instal·lació de forma manual s'ha de descarregar la [part estàtica](/related/canigo/documentacio/modul-logging/canigo.operation.logging_static.zip).

<div class="message warning">
Des del CS Canigó no es realitzen adaptacions al <a href="http://www.gencat.cat/web/guies/estil/">PIV de la Generalitat de Catalunya</a>. És responsabilitat del proveïdor d'aplicacions fer les adaptacions necessàries segons els requeriments que tingui l'aplicació.
</div>

El contingut estàtic està preparat per a ser ubicat al directori `<aplicacio>\src\main\webapp\`. Si es vol canviar aquesta ubicació s'han de modificar les URLs existents en aquests fitxers.

##### Keep Alive

El client implementa un procés de "keep alive" que s'executa cada 30 minuts. D'aquesta manera el servidor el considerarà com a actiu mentre no es tanqui aquesta plana "loggingAdministration.html".

#### Servidor

Aquesta és l'API REST que publica el Mòdul d'Administració de Logs:

 * `<appContext>/api/logs/list` (GET): mostra la llista de loggers i els nivells (DEBUG, INFO, ERROR, FATAL, WARN)
 * `<appContext>/api/logs/appenders` (GET): mostra la llista d'appenders de tipus file
 * `<appContext>/api/logs/change` (PUT): canvia el nivell d'un logger
 * `<appContext>/api/logs/startwatch` (PUT): comença a monitorizar un fitxer de log
 * `<appContext>/api/logs/stopwatch`(PUT): deixa de monitorizar un fitxer de log
 * `<appContext>/api/logs/keepwatch`(PUT): missatge de monitorització activa (keep alive) per un fitxer de log
 * `<appContext>/api/logs/downloadLog/{index}` (GET): descarrega d'un fitxer de log

SpringBoot per defecte no permeteix peticions PUT, per a que es puguin realitzar al fitxer WebSecurityConfig, mètode configure s'ha d'afegir:

```
	http.csrf().ignoringAntMatchers("/api/logs/**");
```

Per tal d'evitar un deadlock en l'escriptura de logs a fitxer i el corresponent enviament de missatge a client, cal realitzar la següent configuració en el fitxer de configuració log4j.xml:

```
<category name="org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler">
  <level value="off" />
</category>
```
Aquesta configuració només serà necessària en cas que els logs de Spring s'escriguin en un appender de tipus file.

##### Alliberament de recursos

El mòdul executa un procés cada 45 minuts que valida si s'ha rebut algun missatge de "keep alive" d'algun client per els fitxers de log configurats en l'aplicació. En cas que no haver rebut cap missatge per un fitxer de log concret en aquest periode de 45 minuts s'alliberaran els recursos associats per a la monitorització d'aquell fitxer (watcher thread).

### Utilització del Mòdul

Per a utilitzar el mòdul s'ha de desplegar l'aplicació i accedir-hi a `http://<host>:<port>/<appContext>/loggingAdministration.html`. Per exemple: `http:\\localhost:8080\aplicacioProva\loggingAdministration.html`

![Pantalla Configuració nivells de log](/related/canigo/documentacio/modul-logging/configuracio_nivell_logs.png "Configuració nivells de log")

La pantalla inicial mostra els paquets de l'aplicació. Amb els botons DEBUG - INFO - ERROR - FATAL - WARN es pot modificar els nivell de log de cada paquet.


![Pantalla Visualització fitxers de log](/related/canigo/documentacio/modul-logging/visualitzacio_fitxers_log.png "Visualització fitxers de log")

En aquesta segona pestanya es pot seleccionar el fitxer de log que es desitgi monitoritzar, prement el botó Connectar, o descarregar amb el botó Descarregar.

Amb el cercador es pot resaltar en groc el text que es desitgi trobar.

### Consideracions de seguretat

Es recomana que aquest mòdul es securitzi per a que només els usuaris amb rol Administrador puguin accedir-hi, tant a la plana html, com als serveis REST del backend proporcionats al mòdul.

