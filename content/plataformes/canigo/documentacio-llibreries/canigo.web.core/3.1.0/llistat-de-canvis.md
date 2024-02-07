+++
date        = "2024-01-15"

title       = "Llistat de canvis"
description = "Llistat de canvis canigo.web.core 3.1.0"
sections    = "canigo-fwk-docs"
weight		= 2
+++

## canigo.web.core 3.1.0

- Actualització de canigo.web.core
  - Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `canigó.root` de 3.1.0 a 3.2.0
  - Actualització del mòdul [Canigó-test](/content/plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0
  - A més, pel fet que s'ha eliminat javax , a causa de la incompatibilitat amb JDK 17,
    s'ha de reemplaçar totes les dependències associades a aquesta libreria,javax, per les corresponents de Jakarta.
    
    Per tant, haurem d'afegir la dependència `jakarta servelet api` versió 6.0.0 que substitueix la 
    dependència de `javax.servelet api`.
  
