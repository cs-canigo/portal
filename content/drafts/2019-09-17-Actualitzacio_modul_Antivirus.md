+++
date        = "2019-12-09"
title       = "Actualització mòdul Antivirus Canigó"
description = "S'ha publicat una nova versió del mòdul de l'Antivirus de Canigó utilitzant l'última versió del client de l'antivirus"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
key         = "NOVEMBRE2019"
+++

## Introducció

Dins de l'abast de la **[versió 3.4.1 del framework Canigó](/canigo-download-related/release-notes-canigo-34)** s'ha alliberat una nova versió del mòdul de l'Antivirus de Canigó utilitzant l'última versió del client de l'antivirus. Amb aquesta actualització, s'aconsegueix un dels objectius prioritaris de CS Canigó, el qual consisteix en proporcionar els connectors d'integració actualitzats utilitzant les últimes versions disponibles de les seves llibreries associades. 

El mòdul de l'Antivirus permet l’escaneig d’arxius mitjançant el Servei d’Antivirus Central del CTTI, per a accedir a aquest servei s'utilitza l'API de Symantec. La versió actual del client de l'API de Symantec és la 7.9.2, les versions anteriors, encara que continuen actives, estan deprecades.

## Novetats

A partir de la versió 2.2.0 del mòdul de l'Antivirus de Canigó s'utilitza la versió 7.9.2 de l'API de Symantec. Per a poder utilitzar aquesta API, al no estar disponible a cap repositori públic Maven, s’ha de sol·licitar el jar "scanengine-api-7.9.2.jar" a la bústia de Canigó <oficina-tecnica.canigo.ctti@gencat.cat>.

Recordem que els dominis d'accés al Servei d'Antivirus són:

Entorn         | Domini 										| port
-------------- | ----------------------------------------------	| -----
Preproducció   | preproduccio.antivirus.intranet.gencat.cat     | 1344
Producció      | antivirus.intranet.gencat.cat       			| 1344


## Documentació mòdul

Per a obtenir més informació del Mòdul d’Antivirus podeu consultar la documentació del [Connector d’Antivirus](/canigo-documentacio-versions-3x-integracio/modul-antivirus/) al Portal de Frameworks i Solucions d’Arquitectura.

