+++
date        = "2020-12-12"
title       = "Llistat de canvis"
description = "Llistat de canvis plugin eclipse 1.7.9"
sections    = "canigo-fwk-docs"
weight		= 1
+++

## Llistat de canvis versió 1.7.9

- Utilització de la versió 1.6.7 de l’arquetipus de Canigó per a generar projectes amb Canigó 3.4.4
- Modificació dels següents rangs de versions dels mòduls:

  - Integració:
    - canigo.integration.antivirus: [2.0.0,2.5.0)
    - canigo.integration.dni.pica: [2.0.0,2.4.0)
    - canigo.integration.icc: [2.0.0,2.4.0)
    - canigo.integration.notificacions.electroniques: [2.0.0,2.4.0)
    - canigo.integration.tributs.pica: [2.0.0,2.4.0)
 
  - Operació
    - canigo.operation.instrumentation: [2.0.0,2.4.0)
    - canigo.operation.logging: [2.0.0,2.4.0)
 
  - Persistència:
    - canigo.persistence.jpa: [2.0.0,2.4.0)
 
  - Seguretat:
    - canigo.security: [2.0.0,2.5.0)
    - canigo.security.saml: [2.0.0, 2.4.0)
 
  - Suport:
    - canigo.support.fileupload: [2.0.0,2.4.0)
    - canigo.support.lopd: [2.0.0,2.4.0)
    - canigo.support.mailing: [2.0.0,2.4.0)
    - canigo.support.merging: [2.0.0,2.4.0)
    - canigo.support.ole: [2.0.0,2.4.0)
    - canigo.support.resizeimg: [2.0.0,2.5.0)
    - canigo.support.sftp: [2.0.0,2.4.0)

## Llistat de canvis versió 1.7.8

En seleccionar l'opció mòdul de persistència anomenada **Mongodb module** s'actualitzarà automàticament el projecte
per a que utilitzi la nova versió del mòdul de **Mongodb versió 2.3.0** per a utilitzar el **driver de Mongo 2.13.3** compatible amb **Mongodb 4.2**:

![](/images/news/Plugin_1.7.8_add_mongodb_module.png)

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