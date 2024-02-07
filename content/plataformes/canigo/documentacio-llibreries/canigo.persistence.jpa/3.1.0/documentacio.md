+++
date        = "2024-01-15"

title       = "Documentació"
description = "Documentació canigo.persistence.jpa 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Ofereix funcionalitats per a l'accés a les dades de l'aplicació utilitzant la capa JPA.

## Funcionalitats

### DAO

S'ofereix la interficie `cat.gencat.ctti.canigo.arch.persistence.jpa.dao.GenericDAO` i la implementació `cat.gencat.ctti.canigo.arch.persistence.jpa.dao.impl.JPAGenericDaoImpl` per a oferir les funcionalitats d'accés a les dades d'un objecte del domini de l'aplicació. S'ofereixen les accions comunes que es poden realitzar en un domini de l'aplicació: consulta, guardat, modificació i eliminació.

### JSON

En el paquet `cat.gencat.ctti.canigo.arch.persistence.jpa.hibernate.type.json` s'ofereixen diferents objectes pel tractament i maneig d'objectes JSON a la capa d'accés a les dades.

### Repositori

S'ofereix la interficie `cat.gencat.ctti.canigo.arch.persistence.jpa.repository.GenericRepository` i la implementació `cat.gencat.ctti.canigo.arch.persistence.jpa.repository.impl.JPAGenericRepositoryImpl` que estén les funcionalitats de `org.springframework.data.jpa.repository.JpaRepository` per a l'accés a les dades d'un domini de l'aplicació. Així si un repositori de l'aplicació estén de *GenericRepository*, ja incorpora les accions comunes que es poden realitzar en un domini de l'aplicació: consulta, guardat, modificació i eliminació.


