+++
date        = "2015-10-07"
title       = "SIC. Bones pràctiques per a no interferir en els mecanismes de SIC quan s’accedeix manualment a la consola d’administració del servidor d’aplicacions"
description = "Una de les funcionalitats més destacades del SIC és el desplegament automàtic d'aplicacions en entorns d'INT. Amb l'experiència adquirida fins ara en els nous CPDs, des de l'equip del SIC recomanem una sèrie de bones pràctiques per tal d'evitar que actuacions alienes al SIC puguin interferir en el correcte funcionament d'aquests desplegaments automatitzats."
section     = "Notícies"
categories  = ["sic"]
key 		= "OCTUBRE2015"
+++

Una de les funcionalitats més destacades del SIC és el desplegament automàtic d'aplicacions en entorns d'INT. Amb l'experiència adquirida fins ara en els nous CPDs, des de l'equip del SIC recomanem una sèrie de bones pràctiques per tal d'evitar que actuacions alienes al SIC puguin interferir en el correcte funcionament d'aquests desplegaments automatitzats.

Els jobs de desplegament a entorns d'INT de SIC (en endavant jobs d'INT) s'aprovisionen d'acord a la configuració de desplegament de l'aplicació al servidor d'aplicacions. Una vegada l'equip de SIC finalitza l'aprovisionament del job d'INT aquest queda lligat a aquesta configuració. Un canvi de configuració al servidor d'aplicacions pot provocar que el job deixi de funcionar correctament pel fet que no es podrà realitzar el desplegament.

Per tant, la recomanació és que un cop aprovisionat el job d'INT no es faci servir cap altre via de desplegament que no sigui el propi SIC. En cas contrari, és responsabilitat del proveïdor d'aplicacions conèixer si el desplegament pot implicar que el job d'INT del SIC deixi de funcionar.

Aquestes són les accions detectades que poden produir un problema al funcionament del job d'INT:

* _Canvi del nom de l'aplicació a la consola d'administració del servidor_: el job referenciarà a un nom d'aplicació inexistent
* _Canvi del path i/o nom de l'artefacte a desplegar_: el job no desplegarà la versió de l'artefacte que s'està promovent des del SIC
* _Canvi dels permisos de l'artefacte a desplegar_: el job podria tenir problemes de permisos per enviar l'artefacte o el servidor d'aplicacions per llegir-lo

En el següent diagrama s'il·lustra l'efecte que pot produir alguna d'aquestes accions:

<center>![deploy_INT.jpg](/images/news/deploy_INT.jpg)</center>


Per a qualsevol dubte relatiu a aquest tema, ens podeu obrir una consulta a Remedy al servei "FRAMEWORK SIC".