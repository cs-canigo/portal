+++
date        = "2018-09-21T12:04:16+01:00"
title       = "Howto Canigó 3.2.5 a 3.2.6"
description = "Passos per passar una aplicació de Canigó 3.2.5 a 3.2.6"
sections    = "Canigó. Documentació versió 3.x"
weight      = 4
+++

## A qui va dirigit
Aquest how-to va dirigit a tots aquells usuaris que vulguin fer l’actualització a Canigó 3.2.5 de la seva aplicació a Canigó 3.2.6

## Versió de Canigó
Els passos descrits en aquest document apliquen a la versió 3.2.5 del Framework Canigó

## Introducció
El setembre del 2018 s’ha publicat la versió 3.2.6 del Framework Canigó. 

L’objectiu d’aquest Howto és mostrar els procediments necessaris per a realitzar l’actualització d’una aplicació realitzada amb Canigó 3.2.5. El punt de partida d’aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse.

## Configuració de dependències
Per passar de la versió 3.2.5 a la versió 3.2.6 de Canigó es necessari actualitzar la versió del mòdul de JPA.
Així si teniem la propietat de la dependència de JPA:
```
<canigo.persistence.jpa>[1.2.0,1.3.0)</canigo.persistence.jpa>
```
Es necessari canviar-ho per:
```
<canigo.persistence.jpa>[1.3.0,1.4.0)</canigo.persistence.jpa>
```

## Canvis de package
Una vegada modificada la dependència del mòdul JPA es necessari modificar, a totes les classes de l'aplicació, el package de la classe "GenericPredicateBuilder" de:
```
cat.gencat.ctti.canigo.arch.persistence.jpa.querydsl.GenericPredicateBuilder
```
Per:
```
cat.gencat.ctti.canigo.arch.persistence.core.querydsl.GenericPredicateBuilder
```

Una vegada fets aquests dos canvis només resta recompilar l'aplicació
