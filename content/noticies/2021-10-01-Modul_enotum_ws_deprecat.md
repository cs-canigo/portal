+++
date        = "2021-10-01"
title       = "Canigó. Mòdul Enotum_WS deprecat"
description = "S'ha deprecat el mòdul Enotum_WS que ja no aplica a Canigó 3.4"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "OCTUBRE2021"
+++

## Introducció

S'ha realitzat un anàlisis dels mòduls que apliquen a Canigó 3.4 per preparar-los per la següent versió de Canigó, Canigó 3.6. El [mòdul de Enotum_WS](/canigo-documentacio-versions-3x-integracio/modul-enotum-ws/) consistia en la publicació dels serveis en servlets que ofereix el [mòdul Enotum](/canigo-documentacio-versions-3x-integracio/modul-enotum/) de Canigó

Aquest mòdul aplicava a aplicacions que no tinguéssin Spring, exposant els servlets en el web.xml. Aquesta estratègia ja no aplica per Canigó 3.4

## Novetats
A partir de l'anàlisi realitzat, s'han fet les següents revisions:

- El mòdul **canigo.integration.notificacions.electroniques.ws** passa a estar deprecat.

La forma d'exposició dels serveis oferts pel mòdul **canigo.integration.notificacions.electroniques** es pot realitzar a través de serveis exposats amb Spring

## Documentació de Canigó

Per a obtenir més informació sobre els mòduls de Canigó podeu consultar la [documentació de Canigó](/canigo-documentacio/) al Portal de Frameworks i Solucions d’Arquitectura.
