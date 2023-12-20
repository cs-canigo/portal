+++
date        = "2023-01-15"
title       = "Llistat de canvis"
description = "Llistat de canvis arquetip maven (MS)nou- 1.0.0"
sections    = "canigo-fwk-docs"
weight		= 1
+++

## Arquetip Maven (MS) nou- 1.0.0

**15/01/2023**:
- S'ha concebut un nou arquetip amb el propòsit de ser **agnòstic perquè no depengui  de cap plugin** .
  A més fer-ho compatible compatible amb l'últim stack tecnològic disponible.
  Aquest innovador arquetip incorpora Spring Boot 3.1.4, Spring Framework 6, Spring Security 6 amb JDK 17, 
  Junit Jupiter i OpenAPI (Swagger 3). Amb aquesta moderna configuració, 
  es busca oferir una base sòlida i versàtil que s'alineï amb les últimes tendències i avanços tecnològics, 
  permetent així un desenvolupament àgil i eficient en entorns actualitzats.
- S'ha canviat els fitxers de configuració que han quedat obsolets els properties i ara s'usen yml ,ja que, actualment 
  són l'estàndard.
- S'ha afegit dues noves variables a l'hora de generar l'arquetip que són :

  - **appName** :    Nom del projecte.
                     Serveix per a personalitzar la creació de l'arquetip, si no s'informa ,per defecte és el **artifactId**
  - **dockerName** : Nom del contenidor docker.
                     Serveix per a personalitzar la creació de l'arquetip en un contenidor, si no s'informa ,per defecte 
                     és el **artifactId**
- S'ha actualitzat el Swagger a **OpenApi**(Swagger 3), en lloc de Swagger 2.
- És important saber que actualment l'arquetip és **agnòstic i no dependrà de cap plugin** .
- Es realitza una configuració per yml més clara per a les diferents les base de dades :
  - [Mysql](/howtos/2023-01-15-Guia-Actualitzacio-del-projecte-per-a-implantar-MYSQL/)
  - [PostgreSQL](/howtos/2023-01-15-Guia-Actualitzacio-del-projecte-per-a-implantar-POSTGRESQL/)
  - [MONGODB](/howtos/2023-01-15-Guia-Actualitzacio-del-projecte-per-a-implantar-MONGODB/)
  - [Oracle](/howtos/2023-01-15-Guia-Actualitzacio-del-projecte-per-a-implantar-ORACLE/)
- **Nota important** : s'ha de tenir en compte que la configuració per defecte de la base de dades de l'arquetip maven (MS) 
  nou versió 1.0.0 aquesta creada en **H2** .
