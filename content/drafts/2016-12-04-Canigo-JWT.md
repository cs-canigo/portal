+++
date        = "2016-12-04"
title       = "Canigó. Autenticació amb JWT (JSON Web Tokens)"
description = "Autenticació basada en JWT per a backends stateless en aplicacions Canigó 3.1.x "
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2016"
+++

El sistema d'autenticació tradicional utilitzat en aplicacions Canigó es basa en cookies. JSESSIONID és la cookie generada per contenidors de Servlets com Tomcat o Jetty, i s'utilitza per la gestió de la sessió en aplicacions web. Degut a que HTTP és un protocol sense estat (stateless) no és possible que el servidor web pugui relacionar dos peticions separades que arribin d'un mateix client. Si un servidor utilitza cookies per la gestió de la sessió, aquest crea i envia la cookie JSESSIONID al client, el qual l'envia al servidor per a cada petició HTTP posterior. Aquest sistema d'autenticació basat en cookies és *stateful*. Això significa que es manté sessió tant al costat servidor (sessió HTTP), com al client (Cookie).

Aquest sistema de gestió de la sessió mitjançant cookies té una sèrie d'inconvenients:

* _Sobrecàrrega_: la informació relativa als usuaris normalment s'emmagatzema en memòria. Quan hi ha molts usuaris connectats, aumenta el consum de memòria al servidor.

* _No escalable fàcilment_: degut a que s'emmagatzema informació en memòria, si necessitem balancejar la càrrega entre diferents servidors, l'usuari haurà de tornar a logar-se si les peticions no van sempre dirigides al mateix servidor. Gràcies a tècniques com sticky session o rèplica de sessió entre nodes es pot evitar. Tot i així, l'ús de cookies dificulta l'escalabilitat de les aplicacions, mentre que amb tokens el problema es soluciona de forma natural.

* _CORS (Cross-Origin Resource Sharing)_: cookies + CORS don't play well across different domains. 

* _CSRF (Cross-Site Request Forgery)_: 

JWT (JSON Web Tokens) està esdevenint un estàndard de-facto pel que fa a sistemes d'autenticació basats en tokens. La principal característica d'aquests sistemes d'autenticació és que són *stateless*. El servidor no emmagatzema informació dels usuaris logats a l'aplicació. Cada petició al servidor va acompanyada per un token el qual permet al servidor verificar la autenticitat de la petició.

El fet que el servidor no necessiti mantenir informació de sessió per autenticar els usuaris és la principal avantatge de JWT respecte a l'ús de cookies.

El workflow amb JWT és el següent:

- L'usuari realitza una petició al servei d'autenticació enviant usuari i contrasenya
- El servei d'autenticació respon amb un token JWT amb les dades identificatives de l'usuari
- L'usuari sol·licita accés a un servei segur enviant el token al servidor
- El capa de seguretat valida el token, i en cas satisfactori, es dona accés al recurs sol·licitat

En el següent diagrama observem de forma simplificada la diferència entre autenticació amb Cookies vs Tokens (JWT):

[Cookies vs JWT](/related/cs/2016/12/cookie-token-auth.png)

Gràcies a l'ús de JWT obtenim una sèrie de beneficis:

* Escalabilitat:

* Seguretat:

* Multiplataforma:

* CORS: A token-based approach allows you to make AJAX calls to any server, on any domain because you use an HTTP header to transmit the user information.

En cas de necessitar mantenir informació associada a la sessió de l'usuari la opció més natural amb JWT és emmagatzemar-la al costat client. Per exemple, en el cas de navegadors web es pot fer ús del sessionStorage o localStorage.

En aquest comunicat hem desenvolupat un [HowTo](howtos/2016-11-Howto-Canigo-JWT/) amb el detall de la configuració a un backend Canigó 3.1.x per habilitar autenticació amb JWT.

Per qualsevol dubte respecte a l'ús de JWT en aplicacions Canigó us podeu posar en contacte amb el CS Canigó obrint un tiquet de suport al servei CAN del JIRA CSTD o enviant un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
