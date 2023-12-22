+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis canigo.web.rs 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## canigo.web.rs 3.1.0

- [Actualització compatibilitat canigo.web.rs](/noticies/2023-01-15-CAN-actualitzacio-canigo-3_1_0/)
  - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `canigó.root` de 3.1.0 a 3.2.0
  - Actualització dels mòduls [Canigó-test](
       /plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0 i [Canigó-core](
       /plataformes/canigo/documentacio-llibreries/canigo.core/5.1.0/) de la versió 5.0.6 a 5.1.0
  -  Actualització de les següents llibreries: 

     - `org.springframework` de 5.3.18 a 6.1.1,
      
     - `spring-web` de 5.3.18 a 6.1.1 , 

      - `spring-webmvc` de 5.3.18 a 6.1.1 , 

      - `spring-security-core` de 5.6.2 a 6.1.3,

      - `spring-expression` de 5.3.18 a 6.1.1.

  -  S'actualiza la dependència`mockito-core` a la versió 4.3.1 a 5.7.0.
  -  Es manté la versió de les següents dependències: `spring-data-jpa` versió **2.6.3**,
    `hibernate.core`de la versió  **5.6.7 Final**,`h2`versió **2.1.210**,`commons.dbcp.version`versió **2.9.0**,
    `querydsl` versió **5.0.0**, `spring-expression`    spring-boot-autoconfigure
  -  A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17,
     s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**.
     Per tant, haurem d'afegir la dependència `jakarta.servlet-api` versió **`5.0.0`** que substitueix la dependència de
     `javax.servlet-api` versió **4.0.1**.
