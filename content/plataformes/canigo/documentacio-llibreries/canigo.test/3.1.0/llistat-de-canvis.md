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
  - Actualització de tots els mòduls de Canigó per a actualitzar `org.springframework` de 5.3.18 a 6.1.1,
    `spring-core` de 5.3.18 a 6.1.1 , `spring-web` de 5.3.18 a 6.1.1 i `spring-context` de 5.3.18 a 6.1.1
    
  - Una altra de les actualitzacions de dependències que s'ha de realitzar és afegir la dependència de
    `mockito-core` a la versió **5.7.0**, `spring-test` **6.1.1** i `testng` a la versió **7.8.0** .
    Així mateix modificar la dependència de `junit` de la version 4.13.2 a `junit-jupiter` 5.10.1 i 
    finalment `jackson-databind` de la 2.13.2.2 a la versió **2.15.3**.


## canigo.test 3.0.4

- [Resolució de vulnerabilitat Spring4Shell](/noticies/2022-04-13-CAN-actualitzacio-canigo-3_6_4/)
   - Actualització de tots els mòduls de Canigó per a actualitzar `org.springframework` de 5.3.9 a 5.3.18,
   `org.springframework.boot` de 2.5.4 a 2.5.12 i `spring.security` de 5.5.2 a 5.6.2

## canigo.test 3.0.3

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-27-CAN-actualitzacio-canigo-3_4_9_3_6_3/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.17.0 de log4j

## canigo.test 3.0.2

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-17-CAN-actualitzacio-canigo-3_4_8_3_6_2/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.16.0 de log4j

## canigo.test 3.0.1

- [Resolució de vulnerabilitat Log4Shell](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1/)
   - Actualització de tots els mòduls de Canigó per a utilitzar la versió 2.15.0 de log4j

## canigo.test 3.0.0

- [Actualització de tecnologies base](/noticies/2021-10-25-CAN-actualitzacio-canigo-3_6_0/)
   - Actualització a Java 11, Spring 5.3, Spring Boot 2.5
   - Actualització dels clients dels mòduls d'integració amb Serveis Web Soap
   - Actualització versió Swagger
   - Actualització versió dependències
   - Actualització versió plugins


#REVISAR_LISTA