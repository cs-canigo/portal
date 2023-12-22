+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis canigo.test 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++
## canigo.test 3.1.0

- [Actualització de canigo.test](/noticies/2023-01-15-CAN-actualitzacio-canigo-3_1_0/)
   - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `canigó.root` de 3.1.0 a 3.2.0
   - A més, pel fet que s'ha eliminat **javax** , a causa de la incompatibilitat amb JDK 17,
      s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de **jakarta**.
      Per tant, haurem d'afegir la dependència `jakarta.servlet-api` versió **`6.0.0`** que substitueix la dependència de
      `javax.servlet-api` versió 3.0.0.
  -  Actualització de les següents llibreries: 

     - `org.springframework` de 5.3.18 a 6.1.1,
      
     - `spring-web` de 5.3.18 a 6.1.1 , 

      - `spring-webmvc` de 5.3.18 a 6.1.1 , 

      - `spring-security-core` de 5.6.2 a 6.1.3,

      - `spring-expression` de 5.3.18 a 6.1.1.
   - Una altra de les actualitzacions de dependències que s'ha de realitzar és afegir la dependència de
      `mockito-core` a la versió **5.7.0**, `spring-test` **6.1.1** i `testng` a la versió **7.8.0** .
      Així mateix modificar la dependència de `junit` de la version 4.13.2 a `junit-jupiter` 5.10.1 i 
      finalment `jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.

