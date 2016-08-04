+++
date        = "2015-09-01"
title       = "Canigó. Plantilla aplicació REST+HTML5/Js"
description = "Des de CS Canigó es proporciona una plantilla d'aplicació amb arquitectura REST+HTML5/Js. Aquesta és pot generar amb el plugin de Canigó per Eclipse versió 1.2.1 o superior"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "SEPTEMBRE2015"
+++

Des del CS Canigó es recomana utilitzar arquitectures client/servidor desacoblades basades en serveis REST i HTML5/JS [(comunicat Agost 2015)] (/noticies/2015-07-24-Canigo-Arquitectura-aplicacio-recomanada). Per el frontend es dóna llibertat a utilitzar la tecnologia desitjada sempre que compleixi el PIV de Gencat. 

A partir de la versió 1.2.1** del Plugin de Canigó per Eclipse es pot generar l'esquelet d'una aplicació Canigó 3.1 amb arquitectura REST+HTML5/Javascript.A la plantilla que es crea amb el plugin, la part frontend corrersponent a un CRUD (Create-Read-Update-Delete) molt bàsic es troba realitzada amb HTML5/Javascript. No s'ha utilitzat cap llibreria de frontend (AngularJS, Bootstrap, EmberJS...), ja que és decisió de l'usuari triar la tecnologia més adient per la seva aplicació.

Al HowTo publicat [aquest mes] (/related/canigo/howto/Canigo - HowTo - Generacio aplicacio Canigo 3.1 amb plugin Eclipse.pdf) es descriu com fer la instal·lació de l'última versió del plugin (1.4.0) i la creació de l'esquelet d'una aplicació Canigó.

Respecte a les tecnologies emprades a Canigó 3.1 per al backend les més rellevants són les següents:

* *Spring MVC 4.1.0.RELEASE* : Framework Web basat en el patró Model-View-Controller.
* *Spring Security 4.0.0.M2*: Framework que té la funció de proporcionar tant funcions d'autenticació com d'autorització a aplicacions Java.
* *JPA (Java Persistence API) 2.1*: Busca la manera d'unificar les utilitats que proporcionen un mapeig objecte-relacional. La implementació de JPA per defecte a Canigó 3.1 és Hibernate versió 4.3.6.

Recordar la Taula de compatibilitat de versions del plugin segons la versió d'Eclipse:

|Versió Plugin|Versió Eclipse|
|-----|--------------|
|**1.2.1**|Helios (3.6.1)|
|**1.3.1**|Luna (4.4)|
|**1.4.0**|Mars (4.5)|