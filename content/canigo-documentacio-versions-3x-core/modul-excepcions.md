+++
date        = "2015-03-12T16:50:25+01:00"
title       = "Mòdul d'excepcions"
description = "Mòdul per a la gestió d'Errors"
sections    = "Canigó. Documentació versió 3.x"
weight      = 4
+++

## Propòsit

La gestió d'excepcions permet informar que s'ha produït un error al realitzar una petició. Aquest error podrà ser tractat adequadament i en cas necessari informar a l'usuari, llençar una traça, enviar un correu, etc.

La gestió correcta de les excepcions és molt important i crítica, però generalment la forma en la que es generen i gestionen les excepcions en les aplicacions és un dels aspectes més ignorats en el disseny de les mateixes. L'ús apropiat de les excepcions fa que els nostres aplicatius siguin més robusts, més fàcils de desenvolupar i mantenir, més lliures d'errors i més fàcils d'utilitzar. Per aquest motiu és important que donem el màxim de detall en les excepcions.

Per evitar l'ús innecessari de blocs 'try-catch' dins el codi dels nostres aplicatius Canigó proporciona un mecanisme d'intercepció, pel qual indicarem quines excepcions volem tractar i quins gestors les tractaran sense haver d'incorporar cap referència a cap classe de l'aplicació.

## Glossari

## Instal.lació i configuració

### Instal.lació

El mòdul de configuració s'inclou per defecte dins del core de Canigó 3. Durant el procés de creació de l'aplicació (Struts o JSF), l'eina de suport al desenvolupament inclourà la referència dins del pom.xml. En cas d'una instal- lació manual afegir les següents línies al pom.xml de l'aplicació:

```
<canigo.core.version>[3.1.0,3.2.0)</canigo.core.version>
<canigo.web.jsf.version>[1.2.0,1.3.0)</canigo.web.jsf.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>

<dependency>
	<groupId>cat.gencat.ctti</groupId>
	<artifactId>canigo.web.jsf</artifactId>
	<version>${canigo.web.jsf.version}</version>
</dependency>
```

### Configuració

La configuració del servei d'exepcions es configura mitjançant el fitxer de configuració web.xml:

Caldrà configurar el filtre que interceptarà les peticions:

```
<filter>
	<filter-name>ErrorHandler Filter</filter-name>
	<filter-class>cat.gencat.ctti.canigo.arch.web.jsf.filter.ErrorHandlerFilter</filter-class>
</filter>
<filter-mapping>
	<filter-name>ErrorHandler Filter</filter-name>
	<url-pattern>*.jsf</url-pattern>
</filter-mapping>

També es definirà la pantalla d'error genèrica:

<context-param>
	<param-name>errorPage</param-name>
	<param-value>/AppJava/views/error.jsf</param-value>
</context-param>
```

## Utilització del mòdul

El filtre, intercepta totes les peticions a les pàgines JSF. Per defecte el filtre ErrorHandlerFilter que ofereix el framework, el que fa es interceptar qualsevol petició que doni un error del tipus Exception i mostrar la pàgina d'error genèrica definida al web.xml amb la informació de la excepció.

El framework defineix una interfície IBaseException, la qual han d'implementar totes les excepcions que es creï la pròpia aplicació. Aquesta interfície simplement defineix que aquesta hagi de tenir un detall de l'error amb informació de l'excepció base, codis d'error i altres propietats.

El core de Canigó3 ja incorpora una sèrie d'excepcions definides:    
<br>

![Imatge de les Excepcions Definides](/related/canigo/documentacio/modul-excepcions/cat.gencat.ctti.canigo.arch.core.exceptions.jpg "Excepcions definides al mòdul")