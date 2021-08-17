+++
date        = "2021-08-16"
title       = "Canigó. Certificació versió 3.4.x amb servidors WLS full de ruta"
description = "Des CS Canigó s'ha certificat el correcte funcionament d'una aplicació amb Canigó 3.4.x amb el servidor Weblogic 14.1.x suportat en el full de ruta del CTTI actual."
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "SEPTEMBRE2021"
+++


## Introducció

Com a part del procés de certificació de Canigó 3.4.x sobre els servidors del full de ruta del CTTI, s'ha certificat el correcte funcionament de Canigó 3.4.x sobre Weblogic Server 14.1.x

Els servidors d'aplicacions suportats actualment en el [full de ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/)
 són:

| Servidor d'aplicacions | Versió suportada |
|--------------------------------- |--------------------------------- |
|  Tomcat | 9.0 |
|  _Weblogic_ | _14.1.x_ |
|  WebSphere | 9.0 |
|  JBoss EAP | 7.x |

Per a la certificació s'ha utilitzat la versió _14.1.1.0_ de Weblogic Server i no s'ha requerit cap altra modificació.

Per a la certificació s'ha modificat les propietats de la _jvm_ que inicien el servidor d'aplicacions incorporant:

```sh
-Dentorn=loc -Dapplication.defaultLanguage=ca_ES -Dspring.main.allow-bean-definition-overriding=true
```
