+++
date        = "2019-09-17"
title       = "Actualització mòdul Antivirus Canigó"
description = "S'ha publicat una nova versió del mòdul de l'Antivirus de Canigó utilitzant l'última versió de l'engine de l'antivirus"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
key         = "NOVEMBRE2019"
+++

Dins de l'abast de la **versió 3.4.1 del framework Canigó** s'ha allibrerat una nova versió del mòdul de l'Antivirus de Canigó utilitzant l'última versió de l'engine de l'antivirus.

Amb aquesta actualització s'aconsegueix un dels objectius prioritaris de CS Canigó consistent en proporcionar els connectors d'integració actualitzats utilitzant les últimes versions disponibles de les seves llibreries depenent. 

Amb aquest objectiu s'aconsegueix proporcionar un framework en tendència i sense desvalorització. 

Podeu consultar l'abast complet de la versió 3.4.1 a:

[Abast Canigó 3.4.1](https://cstd.ctti.gencat.cat/jiracstd/issues/?jql=project%20%3D%20CAN%20AND%20fixVersion%20%3D%203.4.1)

## Introducció

El mòdul de l'Antivirus permet l’escaneig d’arxius mitjançant el Servei d’Antivirus Centrals del CTTI.

Per a accedir a aquest servei s'utilitza l'API de Symantec.

La versió actual del engine de l'API de Symantec és la 7.9.2, les versions posteriors, encara que continuen actives, estan deprecades

## Novetats

A partir de la versió 2.2.0 del mòdul de l'Antivirus de Canigó s'utilitza la versió 7.9.2 de l'API de Symantec.

Per a poder utilitzar aquesta API s’ha de sol·licitar el jar "scanengine-api-7.9.2.jar" a la bústia de canigó <oficina-tecnica.canigo.ctti@gencat.cat> al no estar disponible a cap repositori públic Maven.

Recordem que els dominis d'accés al Servei d'Antivirus són:

Entorn         | Domini 										| port
-------------- | ----------------------------------------------	| -----
preproducció   | preproduccio.antivirus.intranet.gencat.cat     | 1344
producció      | antivirus.intranet.gencat.cat       			| 1344


## Documentació mòdul

Per a obtenir més informació del Mòdul d’Antivirus podeu consultar la documentació del [Connector d’Antivirus](/canigo-documentacio-versions-3x-integracio/modul-antivirus/) al Portal de Frameworks i Solucions d’Arquitectura.

