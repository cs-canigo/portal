+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis canigo.persistence.mongodb 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++
## canigo.persistence.mongodb 3.1.0

  - [Actualització compatibilitat canigo.persistence.mongodb](/noticies/2023-01-15-CAN-actualitzacio-canigo-3_1_0/)
      - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `canigó.root` de 3.1.0 a 3.2.0
      - Actualització dels mòduls [Canigó-test](
            /plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0 i [Canigó-core](
            /plataformes/canigo/documentacio-llibreries/canigo.core/5.1.0/) de la versió 5.0.6 a 5.1.0
      -  A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17,
         s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**.
         Per tant, haurem d'afegir la dependència `jakarta.annotation-api` versió **1.3.5** que substitueix la dependència de
         `javax.annotation-api` versió **1.3.2**. També s'ha de canviar la dependència `javax.annotation-api` versió
         **1.3.2** per la dependència `jakarta.annotation-api`versiò **1.3.5**.
      -  Es manté la versió de les següents dependències: `spring.data.mongodb` versió **3.3.4**,
         `commons.dbcp`de la versió  **2.9.0**,`h2`versió **2.1.210**,`mongodb.driver`versió **4.6.0**,
         `mongodb-driver-reactivestreams` versió **4.6.0**,`querydsl` versió **5.0.0**,`validation-api` versió **2.0.1**,
         `commons-lang3` versió **3.12.0**, `reactor-core` versió **3.4.17**, `de.flapdoodle.embed.mongo` versió **3.4.5**,
         `embedmongo-spring` versió **1.3.1**,`testcontainers` versió **1.17.1**,`reactor-test`versió **3.4.17**,
         `com.google.guava` versió **31.1-jre** , `mockito`versió **4.5.1**,`hamcrest`versió **2.2**
  
