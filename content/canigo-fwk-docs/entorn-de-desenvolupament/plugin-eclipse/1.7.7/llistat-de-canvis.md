+++
date        = "2020-12-12"
title       = "Llistat de canvis"
description = "Llistat de canvis plugin eclipse 1.7.7"
sections    = "canigo-fwk-docs"
weight		= 1
+++

## Llistat de canvis versió 1.7.7

La nova versió 1.7.7 del plugin utilitza la versió 1.6.5 de l’arquetipus de Canigó per a generar projectes amb Canigó 3.4.3 i s'han modificat les opcions en afegir el mòdul de seguretat.
A continuació s'explica el seu funcionament.

Es proporcionen tres opcions:

* **Si es vol token**, amb les possibles respostes: Si/No

![](/images/news/Plugin_1.7.7_add_security_token.png)

* El **proveïdor que volem fer servir**, amb les possibles respostes: Arxiu/BBDD/Gicar/Saml (si es vol seguretat amb token) o Arxiu/BBDD/Gicar (si no es vol amb token)

![](/images/news/Plugin_1.7.7_add_security_provider.png)

* La **forma d'autorització**, amb les possibles respostes: BBDD/Gicar, només si el proveïdor es Gicar o Saml

![](/images/news/Plugin_1.7.7_add_security_gicar.png)

<br/>
A la versió 1.7.7 del plugin s'ha afegit l'opció d’autorització per Saml i per Gicar de forma que, segons l'opció seleccionada, el plugin modificarà els fitxers del
projecte `WebSecurityConfig.java` i `app-custom-security.xml` per a configurar la seguretat del projecte segons les opcions seleccionades.