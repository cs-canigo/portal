+++
date        = "2021-10-22"
title       = "Actualització Canigó 3.6 a Canigó 3.6"
description = "Com realitzar l'actualització d'una aplicació de Canigó 3.6 a Canigó 3.6"
section     = "howtos"
categories  = ["canigo"]
key         = "DECEMBRE2021"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells usuaris que vulguin fer l'actualització a Canigó 3.6 de la seva aplicació Canigó 3.6.

### Versió de Canigó

Els passos descrits en aquest document apliquen a la versió 3.6 del Framework Canigó.

### Introducció

El mes de Novembre del 2021 s'ha publicat la versió 3.6 del Framework Canigó. Aquesta versió és una [versió LTS](/canigo/roadmap), i es recomana actualitzar les aplicacions Canigó a aquesta versió per tal de tenir un suport continuat així com la màxima estabilitat que proporciona una versió LTS.

L'objectiu d'aquest Howto és mostrar els procediments necessaris per a realitzar l'actualització d'una aplicació realitzada amb Canigó 3.4. El punt de partida d'aquest Howto és una aplicació creada amb el plugin de Canigó per Eclipse.

### Configuració de dependències

A la [matriu de compatibilitats] (/canigo-download-related/matrius-compatibilitats) es poden veure les versions dels mòduls i components de Canigó de les versions 3.4.x i 3.6.x. S'han d'actualitzar els intervals dels mòduls utilitzats per a migrar a Canigó 3.6.

La versió parent de Spring boot és la 2.5.4, per tant, per una aplicació amb Spring boot el parent quedaria:

```	
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.5.4</version>
	</parent>
```

### Passos a realitzar 

Després de canviar les versions dels mòduls decrits a la secció anterior, és necessari realitzar els següents canvis:

1. 