+++
date        = "2020-10-07"
title       = "Mòdul d'excepcions"
description = "Mòdul per a la gestió d'Errors"
sections    = "Canigó. Documentació versió 3.x"
weight      = 4
+++

## Propòsit

La gestió d'excepcions permet informar que s'ha produït un error al realitzar una petició. Aquest error podrà ser tractat adequadament i en cas necessari informar a l'usuari, llençar una traça, enviar un correu, etc.

La gestió correcta de les excepcions és molt important i crítica, però generalment la forma en la que es generen i gestionen les excepcions en les aplicacions és un dels aspectes més ignorats en el disseny de les mateixes. L'ús apropiat de les excepcions fa que els nostres aplicatius siguin més robusts, més fàcils de desenvolupar i mantenir, més lliures d'errors i més fàcils d'utilitzar. Per aquest motiu és important que donem el màxim de detall en les excepcions.

Per evitar l'ús innecessari de blocs 'try-catch' dins el codi dels nostres aplicatius, Canigó proporciona un mecanisme d'intercepció, pel qual indicarem quines excepcions volem tractar i quins gestors les tractaran sense haver d'incorporar cap referència a cap classe de l'aplicació.

## Glossari

## Instal.lació

El mòdul de configuració s'inclou per defecte dins del core de Canigó 3. Durant el procés de creació de l'aplicació, l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```
<canigo.core.version>[4.0.0,4.4.0)</canigo.core.version>
<canigo.web.rs.version>[1.2.0,1.3.0)</canigo.web.rs.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.web.rs</artifactId>
	<version>${canigo.web.rs.version}</version>
</dependency>
```

## Classes d'exceptions disponibles

Les classes disponibles i la seva jerarquia són:

![Imatge de les Excepcions Definides](/related/canigo/documentacio/modul-excepcions/jerarquia_exception.png)

## Handlers disponibles
