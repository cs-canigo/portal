+++
date        = "2015-07-24"
title       = "Canigó. Arquitectura aplicació recomanada"
description = "Des del CS Canigó es segueix treballant per potenciar el desenvolupament d'aplicacions amb arquitectures client/servidor desacoblades basades en serveis Rest i HTML5/JS. Aquest tipus d'arquitectura facilita el desenvolupament de la part client i servidor de forma independent."
section     = "Notícies"
key			= "AGOST2015"
categories  = ["desenvolupament", "canigó"]
+++

Des del CS Canigó es segueix treballant per potenciar el desenvolupament d'aplicacions amb arquitectures client/servidor desacoblades basades en serveis REST i HTML5/JS. Aquest tipus d'arquitectura facilita el desenvolupament de la part client i servidor de forma independent el que suposa una sèrie d'avantatges entre els quals destaquem:

* *Diferents equips de desenvolupament*: permet tenir equips especialitzats en maquetació per la capa de presentació i tècnics JEE per el backend.
* *Múltiples clients*: disposar de diferents clients (Ex. web, aplicacions natives a dispositius mòbils) que consumeixen uns mateixos serveis.
* *Modularització*: backend modularitzat, és a dir, diferents aplicacions  fins i tot implementades amb diferents tecnologies. Per a l’usuari seria transparent en tenir un client web únic.
* *Rendiment*: és possible desplegar les planes HTML en un servidor web (Apache, Nginx) amb la resta del contingut estàtic i els serveis en un contenidor de servlets (Ex. Tomcat) o servidor d'aplicacions  (Ex. Weblogic). El fet que les planes HTML puguin ser servides directament per un servidor web sense necessitat d'arribar al servidor d'aplicacions fa que es pugui tenir un millor rendiment.

L'aplicació SICJA (Sistema d'Informació de la Comissió Jurídica Assessora) del Departament de Presidència està sent desenvolupada amb aquesta arquitectura  i les impressions rebudes tant per l'usuari com per l'equip tècnic estan sent molt positives.

El desenvolupament d'aplicacions JEE amb aquesta arquitectura en detriment de JSF (JavaServer Faces) és una tendència global i que es pot visualitzar a Google Trends:

<CENTER>![canigo-tendencia-tecnologies](/images/news/canigo-tendencia-tecnologies.png)</center>

*Termes comparats*: Primefaces, Richfaces, JavaServer Faces (JSF), Representational state transfer (REST) i AngularJS (JavaScript MVW Framework)

Qualsevol proveïdor d'aplicacions de la Generalitat que vulgui desenvolupar aplicacions Canigó amb aquesta arquitectura pot utilitzar el plugin d'Eclipse (versió >= 1.2.0) que proporciona el CS Canigó per crear la base de l'aplicació. Més informació del plugin a la següent [plana](http://canigo.ctti.gencat.cat/canigo-download-related/plugin-canigo/)).