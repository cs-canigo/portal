+++
date        = "2016-12-04"
title       = "Canigó. Autenticació amb JWT (JSON Web Tokens)"
description = "Autenticació basada en JWT per a backends stateless en aplicacions Canigó 3.1.x "
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2016"
+++

El sistema d'autenticació tradicional utilitzat en aplicacions Canigó es basa en cookies. JSESSIONID és la cookie generada per contenidors de Servlets i servidors JEE, i s'utilitza per la gestió de la sessió. El servidor crea i envia la cookie al client, el qual l'envia al servidor per a cada petició HTTP posterior. D'aquesta manera el servidor pot relacionar peticions separades que arribin d'un mateix client. Aquest sistema d'autenticació basat en cookies és *stateful*. Això significa que es manté sessió tant al costat servidor (sessió HTTP), com al client (Cookie).

Aquest sistema de gestió de la sessió mitjançant cookies té una sèrie d'inconvenients:

* _Sobrecàrrega_: la informació relativa als usuaris normalment s'emmagatzema en memòria. Quan hi ha molts usuaris connectats, aumenta el consum de memòria al servidor.

* _No escalable fàcilment_: degut a que s'emmagatzema informació en memòria, si necessitem balancejar la càrrega entre diferents servidors, l'usuari haurà de tornar a logar-se si les peticions no van sempre dirigides al mateix servidor. Gràcies a tècniques com sticky session o rèplica de sessió entre nodes es pot evitar. Tot i així, l'ús de cookies dificulta l'escalabilitat de les aplicacions, mentre que amb tokens el problema es soluciona de forma natural.

* _CORS (Cross-Origin Resource Sharing)_: cookies + CORS no funcionen bé amb diferents dominis. 

* _CSRF (Cross-Site Request Forgery)_: amb cookies estem expossats a aquesta vulnerabilitat, a no ser que utilitzem alguna tècnica per protegir-nos. Amb tokens, enviats a la capçalera HTTP, estem protegits d'aquest tipus de vulnerabilitat.

JWT (JSON Web Tokens) està esdevenint un estàndard de-facto pel que fa a sistemes d'autenticació basats en tokens. La principal característica d'aquests sistemes d'autenticació és que són *stateless*. El servidor no emmagatzema informació dels usuaris logats a l'aplicació. Cada petició al servidor va acompanyada per un token el qual permet al servidor verificar la autenticitat de la petició.

El fet que el servidor no necessiti mantenir informació de sessió per autenticar els usuaris és la principal avantatge de JWT respecte a l'ús de cookies.

El workflow amb JWT és el següent:

- L'usuari realitza una petició al servei d'autenticació enviant usuari i contrasenya
- El servei d'autenticació respon amb un token JWT amb les dades identificatives de l'usuari
- L'usuari sol·licita accés a un servei segur enviant el token al servidor
- La capa de seguretat valida el token, i en cas satisfactori, es dona accés al recurs sol·licitat

En el següent diagrama observem de forma simplificada la diferència entre autenticació amb Cookies vs Tokens (JWT):

[Cookies vs JWT](/related/cs/2016/12/cookie-token-auth.png)

Gràcies a l'ús de JWT obtenim una sèrie de beneficis:

* _Escalabilitat_:

* _Seguretat_:

* _Multiplataforma_:

* _CORS_: A token-based approach allows you to make AJAX calls to any server, on any domain because you use an HTTP header to transmit the user information.

En cas de necessitar mantenir informació associada a la sessió de l'usuari la opció més natural amb JWT és emmagatzemar-la al costat client. Per exemple, en el cas de navegadors web es pot fer ús del sessionStorage o localStorage. És possible codificar dins el token informació identificativa de l'usuari (email, privilegis, ...). Aquesta informació ha de ser mínima, mantenint el token molt lleuger. No es considera una bona pràctica utilitzar el token com a un símil de la sessió HTTP, i sobrecarregar-lo d'informació. El token viatja al servidor a cada petició, així que no és recomanable donar-li aquest ús. En cas de voler mantenir informació associada a l'usuari en el costat servidor, [Redis](https://redis.io/) pot ajudar a emmagatzemar i compartir aquesta informació entre els diferents nodes de l'aplicació.

En aquest comunicat hem desenvolupat un [HowTo](howtos/2016-11-Howto-Canigo-JWT/) amb el detall de la configuració a un backend Canigó 3.1.x per habilitar autenticació amb JWT. A la propera versió de Canigó 3.2.0, aquest sistema d'autenticació es proporcionarà dins el servei de seguretat "out-of-the-box".

Per qualsevol dubte respecte a l'ús de JWT en aplicacions Canigó us podeu posar en contacte amb el CS Canigó obrint un tiquet de suport al servei CAN del JIRA CSTD o enviant un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
