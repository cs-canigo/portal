+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis Canigó 3.8.0"
sections    = "canigo-fwk-docs"
weight      = 1
+++

#### Canigó 3.8.0 (15/01/2023)

## Introducció

L'objectiu principal d'aquesta actualització és fer compatible Canigó amb el **Java 17**. 
Això comporta que haguem d'actualitzar **Spring** i eliminar certes llibreries com Javax, 
que queda obsoleta per **Jakarta**.
Tot això ens permetrà crear una versió de Canigó més sostenible, 
a més d'aconseguir un arquetip més agnòstic,és a dir, obtenir un mòdel de referència que no 
depengui de l'execució externa de cap plugin.

## Llistat d' actualitzacions
Les principals actualitzacions realitzades s'han centrat a adaptar la versió de Java 
a l'actual i modificar el framework de Spring per aconseguir la compatibilització. 
A continuació es detallen les actualitzacions principals realitzades:

- [Actualització de tecnologies base](/noticies/2023-01-15-CAN-actualitzacio-canigo-3_8_0/)
    - Actualització a Java **17**, Spring **6.1.1**, Spring Boot **3.1.4**
    - Actualització versió Swagger  **OpenApi**(Swagger 3), en lloc de Swagger 2.
    - Actualització versió dependències(Javax a Jakarta,JUnit4 a JUnit Jupiter)
    
- [Creació d' un nou arquetip per evitar usar plugins](/noticies/2023-01-15-CAN-Creacio-nou-arquetip-versio-1.0.0-per-a-no-dependre-de-cap-plugin)
    - Es crea un nou arquetip Maven més agnòstic perquè no calgui dependre de cap plugin extern.

