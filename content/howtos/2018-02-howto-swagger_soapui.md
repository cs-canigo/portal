+++
date = "2018-02-13"
title = "Generació de joc de proves per a peticions REST a SOAP-UI amb Swagger"
description = "En aquest HowTo s'explica com generar un joc de proves per a peticions REST a SOAP-UI amb Swagger"
section = "howtos"
categories = ["canigo"]
key = "FEBRER2018"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2.x.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2.x del Framework Canigó.

### Prerequisits

Es necessita la versió 5.4.0 de [SOAP-UI] (https://www.soapui.org/downloads/soapui.html)

### Introducció

Les aplicacions Canigó amb versió 3.2.x incorporen Swagger a la seva plantilla que permet realitzar proves a les crides de l'aplicació de forma intuïtiva i senzilla, però que no permet realitzar un joc de proves automàtic, com executar totes les crides o realitzar més d'una a la vegada.

Aquestes proves es poden realitzar amb un programa com el SOAP-UI que permet la importació de les metadades generades per swagger. Amb aquestes dades es pot generar un projecte amb totes les crides i poder realitzar proves de forma més exhaustiva i còmode.

### Obtenció swagger.json

Per a importar les metadades del nostre projecte a SOAP-UI es necessita obtenir el fitxer json que genera Swagger.

- Accedir a la plana de Swagger de la nostra aplicació (http://localhost:8080/canigo-api.html)
- Obrir les eines de desenvolupador que proporciona el navegador. A Chrome es pot accedir mitjançant F12 o "Més eines - Eines per a desenvolupadors"
- Anar a la pestanya Network i fer F5 per refrescar la pàgina
- Seleccionar el filtre XHR
- Apareixerà una petició "api-docs" que conté el json. Aquest json s'ha de guardar en un fitxer, per exemple swagger.json
	
![Obtenir swagger.json](/related/canigo/howto/imatges/201802_01.jpg)

### Importar a SOAP-UI

Obrim l'aplicació SOAP-UI i es crea un nou projecte (File - Create Empty Project)

Botó dret sobre el projecte creat, Import Swagger i seleccionar el fitxer que hem desat abans (swagger.json)

Es crea una crida a cada endpoint publicat de l'aplicació:

![Import swagger.json](/related/canigo/howto/imatges/201802_02.jpg)

