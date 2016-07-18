+++
date        = "2015-03-27T11:59:40+01:00"
title       = "Monitorització"
description = "Monitorització de l'aplicació."
section     = "Canigó. Documentació versió 3.x"
weight      = 8
+++

## Introducció

Un dels aspectes més innovadors de la nova versió 3 del Framework Canigó és la possibilitat de disposar inicialment d'un component de monitorització de l'aplicació sense haver de fer cap desenvolupament addicional per part dels desenvolupadors de les aplicacions. Aquest component permet:

* Fer un seguiment de les peticions que rep l'aplicació.
* Comprovar l'estat del sistema.
* Administració dels paràmetres de configuració d'aquesta monitorització.

### SEGUIMENT DE LES PETICIONS

Respecte al tipus de peticions, l'eina visualitza:

* Número de peticions.
* Temps mitjà de les peticions.
* Peticions errònies.

Les peticions que es mostren són les efectuades contra el servidor d'aplicació des de que l'aplicació rep una petició fins que aquesta finalitza i la retorna al client.

![Peticions per minut](/related/canigo/documentacio/modul-monitoritzacio/Peticions.jpg "Peticions rebudes per minut")  
Figura 1 Nombre de peticions rebudes per minut

![Temps de procés](/related/canigo/documentacio/modul-monitoritzacio/Temps.jpg "Temps promig de procés")  
Figura 2 Temps promig en processar les peticions

![Peticions errònies](/related/canigo/documentacio/modul-monitoritzacio/Error.jpg "Nombre de peticions errònies")  
Figura 3 Nombre de peticions que han finalitzat amb error (no controlat)

### COMPROVACIÓ DE L'ESTAT DEL SISTEMA

En aquesta part de la monitorització es podrà visualitzar l'estat de les diferents parts del sistema configurades (per configurar aquesta part de la monitorització mirar el mòdul d'instrumentació), com podria ser la comprovació de la connectivitat contra base de dades o contra un servei web.

La informació d'aquesta funcionalitat es mostrarà en una taula amb la següent informació:

* Mètode
* Temps transcorregut (ms)
* Estat

![Estat del sistema](/related/canigo/documentacio/modul-monitoritzacio/Estat.jpg "Estat del sistema")  
Figura 4 Taula d'informació de l'estat del sistema

### ADMINISTRACIÓ DELS PARÀMETRES DE CONFIGURACIÓ

Per últim l'eina també ofereix la possibilitat de configurar la longitud de les mostres que apareixen en les gràfiques i l'interval de mostreig entre mostres. Per defecte ofereix una visualització de l'evolució de les peticions de 8 hores amb intervals de 1 minut.

![Configuració gràfiques](/related/canigo/documentacio/modul-monitoritzacio/Config.jpg "Configuració gràfiques")  
Figura 5 Pantalla de configuració per a les gràfiques de monitorització