+++
date        = "2024-01-15"

title       = "Llistat de canvis"
description = "Llistat de canvis canigo.operation.logging 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## canigo.operation.logging 3.1.0

  - Actualització de canigo.operation.logging
    - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `canigó.root` de 3.1.0 a 3.2.0
    - Actualització del mòdul [Canigó-test](/content/plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0
    - S'ha d'afegir la dependència [Canigó-web-core](/content/plataformes/canigo/documentacio-llibreries/canigo.web.core/3.1.0/) de la versió 3.1.0.
    - És necessari, canviar la versió 3.0.4 del propi mòdul canigó per la versió del mòdul canigó a 3.1.0. És a dir ,
      canigó operation logging 3.0.4 a versió 3.1.0.
    - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17,
      s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**.
      Per tant, haurem d'afegir la dependència `jakarta.websocket-api` versió **`2.1.1`** que substitueix la dependència de
      `javax.websocket-api` versió 1.1 ,`jakarta.servlet-api` versió **`6.0.0`** que substitueix la dependència de
      `javax.servlet-api` versió 3.0.0.
    - S'ha d'actualitzar`tomcat-embed-websocket` de la 10.0.18 a la versió **10.1.16**,`jackson-core` versió **2.13.2** 
      a la versió **2.15.3** i `mockito-core` de la 4.3.1 a la versió **5.7.0**
    - Actualització de tots els mòduls de Canigó per a actualitzar `org.springframework` de 5.3.18 a 6.1.1,
      `spring-core` de 5.3.18 a 6.1.1,`spring-websocket` de 5.3.18 a 6.1.1, `spring-context-support` de 5.3.18 a 6.1.1,
      `spring-webmvc`de 5.3.18 a 6.1.1 i `spring-messaging` de 5.3.18 a 6.1.1.
    - Es manté la versió de les següents dependències: 
        `jackson-annotations`de la versió  **2.13.2 Final**,`h2`versió **2.1.210**,`commons.dbcp.version`versió **2.9.0**,
        `querydsl` versió **5.0.0**
    - Finalment s'ha d'actualitzar`jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.
