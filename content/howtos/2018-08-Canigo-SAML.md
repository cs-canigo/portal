+++
date = "2018-07-27"
title = "Configuració SAML per la integració amb GICAR en aplicació Canigó 3.2"
description = "En aquest HowTo s'explica pas a pas com configurar el mòdul de SAML de Canigó per la integració amb GICAR en una aplicació demo creada a l'entorn de desenvolupament"
section = "howtos"
categories = ["canigo", "gicar"]
key = "AGOST2018"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells desenvolupadors/arquitectes que desenvolupin una aplicació Canigó 3.2 i que vulguin integrar-se amb GICAR des del backend.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.2 del Framework Canigó.

### Introducció

Per a la integració amb GICAR existeixen diferentes possibilitats. En aquest howto s'explica com fer aquesta integració des del backend Canigó en una aplicació demo creada a l'entorn de desenvolupament.

### Aplicació demo GICAR-SAML

Primer de tot cal dispossar de l'entorn de desenvolupament en cas de no haver-lo instal·lat prèviament. Per a la creació de l'entorn de desenvolupament seguir les instruccions del següent [enllaç](https://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/).

Per aquesta demo cal que l'aplicació creada mitjançant el plugin d'Eclipse de Canigó incorpori el mòdul de seguretat de SAML.

_Eclipse_ &rarr; _New_ &rarr; _Other_ &rarr; _Create a Canigo Project_ &rarr; Valors per defecte i informar un nom de projecte (Ex. "samldemo")

_"samldemo"_ &rarr; _Canigó_ &rarr; _Add new module_ &rarr; _Security Module_ &rarr; _Do you want token based security? (yes)_ &rarr; _Select security provider/s (Arxiu)_ &rarr; _Desitja utilitzar SAML (Yes)_

Al fitxer samldemo/src/main/resources/config/props/security.users.properties afegir un usuari existent a GICAR PRE:

<DNI>=dummy,ROLE_USER,ROLE_ADMIN,enabled

Crear el fitxer samldemo/src/main/resources/application.properties i afegir l'entrada "server.port=9090"

En aquest punt, construïm l'aplicació _"samldemo" &rarr; _Run As_ &rarr; _Maven install_, i ja la tenim preparada pel seu funcionament.

### Aplicació bridge

L'autenticació amb GICAR no es farà directament des de l'aplicació Canigó (stateless per defecte), si no a través d'una aplicació bridge (stateful). Aquesta aplicació bridge s'ha de sol·licitar a l'equip del CS Canigó ja que conté dades sensibles.

Un cop importada al workspace de l'Eclipse, la construïm _"appBridge" &rarr; _Run As_ &rarr; _Maven install_

### Frontal Apache

Per aquest HowTo, per treballar amb dominis i SSL, s'utilitzarà un frontal Apache.

Primer de tot, afegim la següent entrada al fitxer "/etc/hosts":

127.0.0.1 vagrant.vm vagrant

TODO: Configuració Apache

### Proves

Per a provar el funcionament, accedir a https://vagrant.vm/bridge/app mitjançant un navegador web. Veurem que se'ns redirigeix al login de GICAR. Un cop introduïdes les credencials veurem que se'ns presenta la següent plana:

![samldemo-app.png](/related/canigo/howto/imatges/201808_01_samldemo-app.png)

Aquesta és una plana web per proves del funcionament del mòdul de SAML, i que evidenment haurà de ser substituïda per la SPA de l'aplicació.

(1) **Get SAML assertion and convert to JWT token**: amb aquesta acció s'obté l'asserció SAML de GICAR i es genera el token JWT per interactuar amb el backend stateless Canigó

(2) **Test API equipaments**: crida a la REST API d'equipaments que ofereix l'aplicació demo Canigó "samldemo" generada amb el plugin d'Eclipse. Aquesta crida incorpora el token JWT generat a partir de l'asserció SAML

