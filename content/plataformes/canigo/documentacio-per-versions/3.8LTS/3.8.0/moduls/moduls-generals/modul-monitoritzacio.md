+++
date        = "2024-01-15"

title       = "Monitoritzaci�"
description = "Monitoritzaci� de l'aplicaci�."
sections    = "Canig�. Documentaci� Versi� 3.8"
weight      = 8
+++

## Introducci�

A la versi� 3.8 del Framework Canig� disposa d'un component de monitoritzaci� de l'aplicaci� sense haver de fer cap desenvolupament addicional per part dels desenvolupadors de les aplicacions. Aquest component permet:

* Fer un seguiment de les peticions que rep l'aplicaci�.
* Comprovar l'estat del sistema.
* Administraci� dels par�metres de configuraci� d'aquesta monitoritzaci�.

### SEGUIMENT DE LES PETICIONS

Respecte al tipus de peticions, l'eina visualitza:

* N�mero de peticions.
* Temps mitj� de les peticions.
* Peticions err�nies.

Les peticions que es mostren s�n les efectuades contra el servidor d'aplicaci� des de que l'aplicaci� rep una petici� fins que aquesta finalitza i la retorna al client.

![Peticions per minut](/related/canigo/documentacio/modul-monitoritzacio/Peticions.jpg "Peticions rebudes per minut")  
Figura 1 Nombre de peticions rebudes per minut

![Temps de proc�s](/related/canigo/documentacio/modul-monitoritzacio/Temps.jpg "Temps promig de proc�s")  
Figura 2 Temps promig en processar les peticions

![Peticions err�nies](/related/canigo/documentacio/modul-monitoritzacio/Error.jpg "Nombre de peticions err�nies")  
Figura 3 Nombre de peticions que han finalitzat amb error (no controlat)

### COMPROVACI� DE L'ESTAT DEL SISTEMA

En aquesta part de la monitoritzaci� es podr� visualitzar l'estat de les diferents parts del sistema configurades (per configurar aquesta part de la monitoritzaci� mirar el m�dul d'instrumentaci�), com podria ser la comprovaci� de la connectivitat contra base de dades o contra un servei web.

La informaci� d'aquesta funcionalitat es mostrar� en una taula amb la seg�ent informaci�:

* M�tode
* Temps transcorregut (ms)
* Estat

![Estat del sistema](/related/canigo/documentacio/modul-monitoritzacio/Estat.jpg "Estat del sistema")  
Figura 4 Taula d'informaci� de l'estat del sistema

### ADMINISTRACI� DELS PAR�METRES DE CONFIGURACI�

Per �ltim l'eina tamb� ofereix la possibilitat de configurar la longitud de les mostres que apareixen en les gr�fiques i l'interval de mostreig entre mostres. Per defecte ofereix una visualitzaci� de l'evoluci� de les peticions de 8 hores amb intervals de 1 minut.

![Configuraci� gr�fiques](/related/canigo/documentacio/modul-monitoritzacio/Config.jpg "Configuraci� gr�fiques")  
Figura 5 Pantalla de configuraci� per a les gr�fiques de monitoritzaci�