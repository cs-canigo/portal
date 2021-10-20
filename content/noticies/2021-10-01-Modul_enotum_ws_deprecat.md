+++
date        = "2021-10-01"
title       = "Canigó. Mòdul Enotum_WS deprecat"
description = "S'ha deprecat el mòdul Enotum_WS que ja no aplica a Canigó 3.4."
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "OCTUBRE2021"
+++

## Introducció

S'ha fet una anàlisi dels mòduls que apliquen a Canigó 3.4 per a preparar-los per a la següent versió de Canigó 3.6.
En aquest sentit, el [mòdul d'Enotum_WS](/canigo-documentacio-versions-34-integracio/modul-enotum-ws/) consistia en
la publicació dels serveis que ofereix el [mòdul Enotum](/canigo-documentacio-versions-34-integracio/modul-enotum/) de
Canigó. Aquest mòdul aplicava a aplicacions no basades en Spring exposant els *servlets* en el web.xml, per la qual
cosa aquesta estratègia ja no aplica per a Canigó 3.4.

## Novetats
Com a conclusió de l'anàlisi, el mòdul **canigo.integration.notificacions.electroniques.ws** passa a considerar-se
deprecat. La forma d'exposició dels serveis oferts pel mòdul **canigo.integration.notificacions.electroniques** es pot realitzar
a través de serveis exposats amb Spring.

## Documentació de Canigó

Per a obtenir més informació sobre els mòduls de Canigó podeu consultar la [documentació de Canigó](/canigo-documentacio/)
al Portal de Frameworks i Solucions d'Arquitectura.