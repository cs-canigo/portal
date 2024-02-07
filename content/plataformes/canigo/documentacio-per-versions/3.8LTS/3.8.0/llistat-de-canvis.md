+++
date        = "2024-01-15"

title       = "Llistat de canvis"
description = "Llistat de canvis Canigó 3.8.0"
sections    = "canigo-fwk-docs"
weight      = 1
+++

#### Canigó 3.8.0 (15/01/2024)

## Introducció

L'objectiu principal d'aquesta actualització és fer compatible Canigó amb el **Java 17**. 
Això comporta actualitzar **Spring** i eliminar certes llibreries com **Javax**, que queda obsoleta per **Jakarta**. 
Tot això permetrà crear una versió de Canigó més sostenible, 
a més d'aconseguir un arquetip més agnòstic, és a dir, obtenir un model de referència que no depengui de l'execució externa de cap plugin.

## Llistat d' actualitzacions
Les principals actualitzacions realitzades s'han centrat a adaptar la versió de Java a l'actual i a modificar el framework de Spring per a aconseguir la compatibilització. 
A continuació, es detallen les actualitzacions principals realitzades:

**15/01/2024:**
- [Actualització de tecnologies base](/noticies/2024-01-15-CAN-actualitzacio-canigo-3_8_0/)
    - Actualització a **Java 17**, **Spring 6.1.1**, **Spring Boot 3.1.4**
    - Actualització versió Swagger  OpenApi (**Swagger 3**), en lloc de **Swagger 2**.
    - Actualització versió dependències (**Javax** a **Jakarta**, **JUnit4** a **JUnit Jupiter**)
    
- [Creació de projecte amb el nou arquetip](/noticies/2024-01-15-CAN-Creacio-nou-arquetip-versio-1_0/)
    - Es crea un nou arquetip Maven més agnòstic, de manera que no cal dependre de cap plugin extern.
    - La nova versió de Canigó 3.8 també permet la generació d'artefactes
