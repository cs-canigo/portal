+++
date        = "2021-08-16"
title       = "Canigó. Certificació versió 3.4.x amb WLS 14.1.x"
description = "Des de CS Canigó s'ha certificat el correcte funcionament d'una aplicació Canigó v.3.4.x amb el servidor Weblogic v.14.1.x indicada al full de ruta de programari actual del CTTI."
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "SETEMBRE2021"
+++


## Introducció

Els servidors d'aplicacions suportats actualment en el [full de ruta de programari del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) són els següents:

| Servidor d'aplicacions | Versió suportada |
|--------------------------------- |--------------------------------- |
|  Tomcat | 9.0 |
|  _Weblogic_ | _14.1.x_ |
|  WebSphere | 9.0 |
|  JBoss EAP | 7.x |

## Novetats

Com a part del procés de certificació de Canigó 3.4.x sobre els servidors del full de ruta de programari del CTTI, s'ha certificat el correcte funcionament de Canigó 3.4.6 sobre Weblogic Server 14.1.x.

Per a la certificació s'ha utilitzat concretament la versió _14.1.1.0_ de Weblogic Server i no s'ha requerit cap altra modificació a banda de modificar les propietats de la _jvm_ que inicien el servidor d'aplicacions com es mostra a continuació:

```sh
-Dentorn=loc -Dapplication.defaultLanguage=ca_ES -Dspring.main.allow-bean-definition-overriding=true
```

## Documentació

Per a més informació:

- [Certificació versió 3.4.1 amb servidors full de ruta](/noticies/2019-09-27-Certificacio_Canigo_3_4_1_servidors_full_ruta/)
- [Binaris de Canigó](/canigo/download/)
- [Release Notes Canigó 3.4](/canigo-download-related/release-notes-canigo-34/)