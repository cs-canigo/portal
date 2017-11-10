+++
date        = "2017-05-05"
title       = "Ús de JWT (JSON Web Token) amb GICAR"
description = "Funcionament del servei de seguretat de Canigó amb tokens JWT i GICAR"
sections    = ["drafts"]
categories  = ["canigo"]
key         = "MAIG2010"
+++

La versió de Canigó 3.2 permet treballar amb [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) (JSON Web Tokens). Concretament Canigó utilitza la llibreria [Java JWT] (https://java.jsonwebtoken.io/). Aquesta llibreria permet, un cop realitzada l'autenticació de l'usuari, generar un token amb les dades bàsiques d'aquest usuari que serà enviat pel navegador web a la capçalera HTTP per cada petició. El backend Canigó 3.2 sap que les peticions rebudes amb aquest token són d'un usuari correctament autenticat, ja que aquest backend és l'únic que el pot haver generat.

En el cas que es vulgui integrar una aplicació Canigó 3.2 que utilitza JWT amb GICAR com a mètode d'autenticació, s'ha de tenir en compte que no és necessari (i no és recomanable) que GICAR intercepti totes les peticions a cada servei REST que exposi l'aplicació. En cas contrari, se sobrecarregarà GICAR amb moltes peticions el que pot afectar també al rendiment de l'aplicació. GICAR només hauria d'interceptar l'accés a la SPA (Single Page Application), punt d'entrada a l'aplicació, mentre que els serveis REST queden protegits amb el token JWT. Només en cas que aquest token expiri, caldrà tornar a autenticar amb GICAR. L'aplicació Canigó 3.2, un cop rebi la capçalera HTTP de GICAR amb un usuari vàlid, generarà un nou token.

El funcionament del sistema és el següent:

<div style="width:90%;margin:0 auto;"><img style="width: 70%; height: auto" src="/images/news/diagrama_sequencia_gicar_jwt.png" alt="Diagrama seqüencia GICAR-JWT" title="Diagrama seqüencia GICAR-JWT"></img></div>

- L'usuari accedeix a la SPA. GICAR intercepta la petició i redirigeix a l'usuari a la pantalla de login.
- L'usuari realitza el login, i l'aplicació, una vegada autenticat a GICAR, genera un token JWT amb les dades de l'usuari logat que proporciona al client.
- Cada cop que es realitza una petició a un servei REST s'ha de proporcionar aquest token.
- Si el servidor rep una petició REST sense tenir un token vàlid, aquest retorna un error de "no autenticat" (Error HTTP 401).
- El client quan rep un error HTTP 401 ha de redirigir a l'usuari a la pantalla de login de GICAR.

Al següent [enllaç](/canigo-documentacio-versions-3x-core/modul-seguretat/) es pot consultar més informació sobre el funcionament del servei de Seguretat de Canigó.
