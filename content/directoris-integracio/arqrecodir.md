+++
date        = "2017-09-08T17:11:42+01:00"
title       = "Arquitectures d'autenticació recomanades per aplicacions que requereixen de Windows Authentication"
description = ""
section     = "Documentació"
taxonomies  = []
toc 		= false
weight 		= 5
+++


## Arquitectures d'autenticació recomanades per aplicacions que requereixen de Windows Authentication

Normalment la infraestructura de les aplicacions de la Generalitat de Catalunya, segueix una arquitectura de tres capes, on tenim un Apache + Servidor d’aplicacions + Base de dades.

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - 3capes.PNG)

En cas que es necessiti que l’aplicació faci servir Windows Authentication, cal revisar bé com resoldre-la, de cara a que els tokens d’autenticació facin “pass-through” dels frontals i arribin als servidors d’aplicacions que és on es processa aquest token.
 
La implementació de Windows Authentication (Kerberos, Negotiate, o NTLM) es pot dur a terme segons la seva compatibilitat amb “Basic Authentication”.

### Producte compatible amb “Basic Authentication”.

Activant “Basic Authentication” les peticions d’autenticació passen a fer-se via HTTP, i com a resultat d’això, les peticions flueixen a través de l’Apache.

![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - 3capesBasicAuth.PNG)

•	Aquesta és una solució senzilla, i és la recomanada en cas que el producte o aplicació ho suporti. 
•	Té, com a contrapartida, la pèrdua del Single Sign On amb l’estació de treball de l’usuari, tot i que l’usuari de la màquina i el que es faci servir per a accedir a l’aplicació sigui el mateix.
•	Aquesta opció obliga a instal·lar un certificat digital de servidor a la màquina de l’Apache, per a assegurar que el pas de credencials des del navegador de l’usuari cap al servidor Web de la Generalitat es fa de forma xifrada.
•	El proveïdor d’aplicacions ha de validar:
o	Que el producte a integrar sigui compatible amb aquest esquema d’autenticació, i en cas que no, buscar altres maneres de realitzar l’autenticació.
o	Que encara que el producte sigui compatible amb aquest esquema d’autenticació, quan es necessita que diversos servidors recullin els tokens d’autenticació, no sigui un problema el fet de passar els tokens d’autenticació a través d’aquest protocol per a mantenir el Single Sign on entre capes.


### Producte no compatible amb “Basic Authentication”.
 
Depenent de la tipologia d’autenticació de l’aplicació, es defineixen les següents alternatives: 


![Integració amb els Directoris de la Generalitat](/related/directoris-integracio/dir - 3capeskerbAuth.PNG)


- **Vàlid per Kerberos, Negotiate o NTLM:**

S’utilitzarà el  IIS com a frontal. Els IIS de forma nativa ja gestionen i recullen la Windows Authentication, aprofitant aquesta funcionalitat per a posar un IIS de frontal, i recollir el testimoni d’autenticació de les aplicacions.

•	Nativament el IIS pot fer proxy invers dels tokens d’autenticació.
•	El proveïdor de l’aplicació ha de validar la solució en entorns de desenvolupament, per tal d’assegurar que l’aplicació és compatible amb aquesta arquitectura.


- **Vàlid per Kerberos o Negotiate:**

S’utilitzarà un Apache com a frontal. L’Apache recull els tiquets Kerberos i els passa a les capes inferiors.
•	L’Apache ha de fer servir el mòdul que permet autenticació via Kerberos / Negotiate Authentication .
•	Utilitzant aquest mòdul, l’Apache recull el tiquet Kerberos que s’ha generat en el PC de l’usuari per passar-lo a capes inferiors.
•	El proveïdors d’aplicacions ha de 
	o	Validar com l’aplicació a través del seu IIS pot recollir el tiquet de Kerberos i utilitzar-lo per a autenticar. 
	o	Validar la solució en entorns de desenvolupament, per tal d’assegurar que l’aplicació és compatible amb aquesta arquitectura.

En cas que cap de les anteriors opcions d’arquitectura pugui ser implantada, l’Àrea d’Arquitectura del CTTI validarà si és possible que l’aplicació pugui funcionar sense frontal, fent que l’IIS jugui el rol de frontal i de servidor d’aplicacions alhora.
