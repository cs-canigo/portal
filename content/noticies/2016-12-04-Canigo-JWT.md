+++
date        = "2016-12-04"
title       = "Canigó. Autenticació amb JWT (JSON Web Tokens)"
description = "Autenticació amb JWT en aplicacions Canigó 3.1.x. Comparativa amb sistema tradicional basat en cookies"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DESEMBRE2016"
+++

El sistema d'autenticació tradicional utilitzat en aplicacions Canigó es basa en **cookies**. JSESSIONID és la cookie generada per contenidors de Servlets i servidors JEE, i s'utilitza per a la gestió de la sessió. El servidor crea i envia la cookie al client, el qual l'envia al servidor per a cada petició HTTP posterior. D'aquesta manera el servidor pot relacionar peticions separades que arribin d'un mateix client. Aquest sistema d'autenticació basat en cookies és **stateful**. Això significa que es manté sessió tant al costat servidor (sessió HTTP), com al client (Cookie).

Aquest sistema de gestió de la sessió mitjançant cookies té una sèrie d'inconvenients:

* _Sobrecàrrega_: la informació relativa als usuaris normalment s'emmagatzema en memòria. Quan hi ha molts usuaris connectats, augmenta el consum de memòria al servidor.

* _No escalable fàcilment_: com que s'emmagatzema informació en memòria, si necessitem balancejar la càrrega entre diferents servidors, l'usuari haurà de tornar a logar-se si les peticions no van sempre dirigides al mateix servidor. Gràcies a tècniques com sticky session o rèplica de sessió entre nodes es pot evitar. Tot i així, l'ús de cookies dificulta l'escalabilitat de les aplicacions, mentre que amb tokens el problema es soluciona de forma natural.

* _CORS (Cross-Origin Resource Sharing)_: cookies + CORS no funcionen bé amb diferents dominis. 

* _CSRF (Cross-Site Request Forgery)_: amb cookies estem exposats a aquesta vulnerabilitat, a no ser que utilitzem alguna tècnica per protegir-nos. Amb tokens, enviats a la capçalera HTTP, estem protegits d'aquest tipus de vulnerabilitat.

**[JWT (JSON Web Tokens)](https://jwt.io/)** està esdevenint un estàndard de-facto pel que fa a sistemes d'autenticació basats en tokens. La principal característica d'aquests sistemes d'autenticació és que són **stateless**. El servidor no emmagatzema informació dels usuaris logats a l'aplicació. Cada petició al servidor va acompanyada per un token el qual permet al servidor verificar l'autenticitat de la petició.

El fet que el servidor no necessiti mantenir informació de sessió per autenticar els usuaris és el principal avantatge de JWT respecte a l'ús de cookies.

El workflow amb JWT és el següent:

- L'usuari realitza una petició al servei d'autenticació enviant usuari i contrasenya
- El servei d'autenticació respon amb un token JWT amb les dades identificatives de l'usuari
- L'usuari sol·licita accés a un servei segur enviant el token al servidor
- La capa de seguretat valida el token, i en cas satisfactori, es dóna accés al recurs sol·licitat

En el següent diagrama observem de forma simplificada la diferència entre autenticació amb Cookies vs Tokens (JWT):

![Cookies vs Tokens](/related/cs/2016/12/cookie-token-auth.png)

Gràcies a l'ús de JWT obtenim una sèrie de beneficis:

* _Escalabilitat_: els tokens s'emmagatzemen a nivell de client, podent ser enviats a qualsevol dels nodes de l'aplicació sense que això suposi cap problema. El node servidor, sigui quin sigui, tindrà la lògica de validació del token.

* _Seguretat_: com que no s'utilitza sessió, aquesta no podrà ser suplantada (CSRF).

* _Multiplataforma_: no tindrem problemes en accedir des de diferents dispositius als recursos expossats per el backend de la nostra aplicació. Només cal que aquests dispositius entenguin el protocol HTTP.

* _CORS_: es poden fer peticions AJAX a qualsevol servidor a qualsevol domini, donat que s'utilitza una capçalera HTTP per a transmetre la informació de l'usuari.

En cas de necessitar mantenir informació associada a la sessió de l'usuari, l'opció més natural amb JWT és emmagatzemar-la al costat client en aplicacions SPA (Single Page Application). Per exemple, en el cas de navegadors web que donin suport a HTML5 es pot fer ús del Web Storage API (sessionStorage o localStorage). És possible codificar dins el token informació de l'usuari (email, privilegis, ...). Aquesta informació ha de ser mínima, mantenint el token molt lleuger. No es considera una bona pràctica utilitzar el token com a un símil de la sessió HTTP, i sobrecarregar-lo d'informació. El token viatja al servidor a cada petició, així que no és recomanable donar-li aquest ús.

En aquest comunicat hem desenvolupat un [HowTo](/howtos/2016-11-Howto-Canigo-JWT/) amb el detall de la configuració a un backend Canigó 3.1.x per habilitar autenticació amb JWT gràcies a [Java JWT](https://java.jsonwebtoken.io/). A la pròxima versió Canigó 3.2, aquest sistema d'autenticació es proporcionarà dins el servei de seguretat per a que sigui fàcilment configurable.

Per qualsevol dubte respecte a l'ús de JWT en aplicacions Canigó us podeu posar en contacte amb el CS Canigó obrint un tiquet de suport al [servei CAN del JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o enviant un correu a la bústia [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
