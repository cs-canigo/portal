+++
date        = "2016-04-18"
title       = "SIC. Polítiques d'integració respecte a noves aplicacions"
description = "Des de SIC es pretén recuperar la funcionalitat original dels repositoris SVN (custòdia del codi font) i promocionar l'us de la Plataforma d'Integració Contínua per a construïr i desplegar els binaris de les aplicacions."
section     = "Notícies"
Draft		= true
categories  = ["sic"]
key         = "MAIG2016"
+++

Als seus inicis, els repositoris SVN de CTTI es van concebir per a la custòdia i versionat de codi font de les aplicacions i la Plataforma d'Integració Contínua (jobs Jenkins) per construir els binaris a partir d'aquest codi font i desplegar-los als servidors d'aplicacions.

Amb el pas del temps i de manera involuntària, s'ha permés l'ús dels repositoris SVN com a font d'intercanvi de binaris de les aplicacions amb CPD per tal que aquests darrers els puguin recollir i desplegar als seus entorns. Com a conseqüència d'aquest mode de treball, l'ús de la Plataforma d'Integració Contínua per construir i desplegar aplicacions ha quedat força desplaçat.


Des de SIC es pretén recuperar la funcionalitat original dels repositoris SVN (custòdia del codi font) i promocionar l'ús de la Plataforma d'Integració Contínua per a construïr i desplegar els binaris de les aplicacions.

Per a tal efecte i amb l'acord de CTTI, com a part de la preparació del servei totes les noves aplicacions hauràn de fer servir els repositoris SVN per a la custòdia de codi i la Plataforma d'Integració Contínua per a construïr els binaris i desplegar l'aplicació (les que es trobin suportades).

Per a les aplicacions ja existents que facin servir els repositoris SVN per a compartir els binaris amb CPD, per el moment no s'obligarà però sí s'aconsella que s'addereixin al sistema de construcció i desplegament d'aplicacions de la Plataforma d'Integració Contínua (jobs Jenkins).

S'ha elaborat el següent díptic que ha de servir com a carta de presentació de SIC i sumaritza els pasos necessaris per integrar-se.

<center>![descarregaLogs.PNG](/images/news/descarregaLogs.png)</center>

Per a qualsevol dubte relatiu a aquest tema, ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy .
