+++
date        = "2021-12-27"
title       = "Documentació"
description = "Documentació canigo.persistence.mongodb 2.3.3"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

El mòdul de MongoDB té com a propòsit general gestionar l’accés i l’execució d’operacions a una base de dades MongoDB. Aquest mòdul utilitza Spring Data MongoDB i QueryDSL. A partir de la versió 3.4 de Canigó, es proporcionen les funcionalitats de reactiu per MongoDB.

## Funcionalitats

### Configuració

Conté les configuracions de repositoris de MongoDB amb Spring

### Repositori

S’ofereix la interficie *cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.MongoGenericRepository* i la implementació *cat.gencat.ctti.canigo.arch.persistence.mongodb.repository.impl.MongoGenericRepositoryImpl* que estén les funcionalitats de *org.springframework.data.mongodb.repository.support.SimpleMongoRepository* per a l’accés a les dades d’un domini de l’aplicació. Així si un repositori de l’aplicació estén de *MongoGenericRepository*, ja incorpora les accions comunes que es poden realitzar en un domini de l’aplicació: consulta, guardat, modificació i eliminació.

### Support

Conté la classe *CanigoDBObjectMongodbQuery* que implementa QueryDSL sobre MongoDB.
