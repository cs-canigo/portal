+++
date        = "2016-12-04"
title       = "Canigó. Autenticació amb JWT (JSON Web Tokens)"
description = "Autenticació basada en JWT per a backends stateless en aplicacions Canigó 3.1.x "
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2016"
+++

El sistema d'autenticació tradicional utilitzat en aplicacions JEE/Canigó es basa en cookies. JSESSIONID és la cookie generada per contenidors de Servlets com Tomcat o Jetty, i s'utilitza per la gestió de la sessió en aplicacions web JEE pel protocol HTTP. Degut a que HTTP és un protocol sense estat (stateless) no hi ha manera que el servidor web pugui relacionar dos peticions separades que arribin d'un mateix client. Gràcies a la gestió de la sessió (Session management) es pot mantenir una sessió d'usuari utilitzant diferents tècniques com Cookies o URL Rewriting. Si un servidor utilitza cookies per la gestió de la sessió, aquest crea i envia la cookie JSESSIONID al client i aquest l'envia al servidor per a cada petició HTTP.

Aquest sistema de gestió de la sessió mitjançant cookies té una sèrie d'inconvenients:

* Sobrecàrrega:

* No escalable fàcilment:

* CORS (Cross-Origin Resource Sharing): 

* CSRF (Cross-Site Request Forgery): 

JWT...

DIAGRAMA

Gràcies a l'ús de JWT obtenim una sèrie de beneficis:

* Escalabilitat:

* Seguretat:

* Multiplataforma:

* CORS

En aquest comunicat hem desenvolupat un [HowTo](howtos/2016-11-Howto-Canigo-JWT/) amb el detall de la configuració a un backend Canigó 3.1.x per habilitar autenticació amb JWT.

Per qualsevol dubte respecte a l'ús de JWT en aplicacions Canigó us podeu posar en contacte amb el CS Canigó obrint un tiquet de suport al servei CAN del JIRA CSTD o enviant un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
