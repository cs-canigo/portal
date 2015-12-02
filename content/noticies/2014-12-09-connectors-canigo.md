+++
date        = "2014-12-09"
title       = "Canigó. Publicació serveis i connectors Canigó 3.1"
description = "Al mes de Novembre s'han alliberat noves versions dels serveis i connectors que formen part de Canigó 3.1. Aquesta és la referència a la Matriu de compatibilitats de Canigó 3.1. En ella s'especifica el detall de totes les versions dels serveis de Canigó 3.1 i les compatibilitats/dependències entre cadascun d'ells. "
section     = "Notícies"
categories  = ["desenvolupament", "canigó"]
+++


En aquestes noves versions de serveis i connectors s'han eliminat dependències nnecessàries així com unificat les existents. Per exemple, tots els connectors que utilitzen Axis2 han estat unificats a la versió 1.5.3. Moltes altres com Aspectj, JAX-WS, Bouncy Castle Crypto API, etc. han estat actualitzades.

També s'ha alliberat la versió 1.2.0 del Plugin d'Eclipse per donar suport al desenvolupament d'aplicacions Canigó 3.1. Aquest plugin permet la creació de dos tipus de plantilles d'aplicació:

- Plantilla HTML/JS i REST: backend basat en serveis REST utilitzant Spring MVC. Presentació desacoblada. (Recomanació CS Canigó)
- Plantilla JSF 2.2 (Primefaces): backend basat en la JSF 2.2 i Primefaces 5.0 com a llibreria de components al frontend.

Al Portal de Frameworks i Solucions d'Arquitectura podeu trobar la Documentació de Referència de Canigó 3 actualitzada i els binaris de Canigó 3.1 disponibles a la secció de Descàrregues. Per aquest comunicat també s'ha redactat un HowTo destinat a totes aquelles aplicacions desenvolupades amb Canigó 3.0 que vulguin migrar a Canigó 3.1.