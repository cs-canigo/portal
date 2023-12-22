+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis canigo.support.mailing 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## canigo.support.mailing 3.1.0

  - [Actualització de canigo.support.mailing](/noticies/2023-01-15-CAN-actualitzacio-canigo-mailing-3_1_0/)
      - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `Canigó-root` de 3.1.0 a 3.2.0
      - S'actualitzen els mòduls  [Canigó-test](
         /plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0 
         i [Canigó-core](/plataformes/canigo/documentacio-llibreries/canigo.core/5.1.0/) 
         de la versió 5.0.6 a 5.1.0.
      - Així mateix , a causa de la incompatibilitat i obsolescència amb el JDK 17 , s'esborren les dependències 
      associades a la llibreria **JAVAX** ,sent reemplaçades per les dependències de **JAKARTA**.
      Les dependències reemplaçades són:`jakarta.activation` versió **`2.1.2`** que substitueix la dependència de
      `javax.activation` versió **1.1.1** i la dependència `jakarta.mail` versió**`2.0.1`**
      que substitueixla dependència de`javax.mail` versió **1.6.2** 
      - Es manté la versió de les següents dependències: `mock.java.mail` versió **1.9**,
         `awaitility`de la versió  **4.2.0**,`javamail-file-transport`versió **1.5.5**,`license-maven-plugin.version`
         versió **2.0.0**.
      - S'actualitza`commons.io` de la 2.11.0 a la versió **2.15.0**.
      