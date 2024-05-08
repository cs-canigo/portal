+++
date        = "2024-01-15"

title       = "Documentació"
description = "Documentació canigo.support.mailing 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El propòsit de l'actualització del mòdul canigó support mailing a la versió 3.1.0 per a JDK 17,
és aportar major seguretat, major funcionalitat de actualizació 
per a adaptar-lo al stack tecnològic de manera més ràpida i efectiva, 
que millorarà la seva conservació i ús.

## Funcionalitats

- Tots els paquets que anteriorment usaven la dependències associades a la libreria Javax, a causa de la seva obsolescència 
  amb el JDK 17 ,són modificades a la libreria Jakarta.
- També s'actualitza les dependències corresponents a JUnit4 a Junit Jupiter perquè siguin compatibles amb el citat , JDK 17.
### Propietats

Les propietats configurables es troben en l'arxiu *application.yml*

|Propietat              |Requerit   | Valor Defecte |Descripció                                     |
|-----------------------|-----------|---------------|-----------------------------------------------|
|host              | No        |localhost      |Nom del servidor de correu sortint (smtp)      |
|port              | No        |25             |Port del servidor de correu sortint (smtp)     |
|protocol          | No        |smtp           |Protocol del servidor de correu sortint (smtp) |
|defaultEncoding   | No        |UTF-8          |Default encoding                               |
|smtp - timeout    | No        |10000          |Timeout (smtp) mili segons                     |
|smtp - Auth       | No        |false          |Intent d'autenticar l'usuari utilitzant l'ordre AUTH |
|debug             | No        |false          |Debug mode                                     |
|username          | No        |               |Usuari de connexió al servidor de correu sorting (smtp) |
|password          | No        |               |Password de l'usuari de connexió               |
|timeout           | No        |     8500      | Timeout pel servidor de correu(ms).           |



