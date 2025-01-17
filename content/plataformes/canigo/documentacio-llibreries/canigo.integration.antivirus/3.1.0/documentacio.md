+++
date        = "2024-12-11"
title       = "Documentació"
description = "Documentació canigo.integration.antivirus 3.1.0"
sections    = "canigo-fwk-docs"
weight      = 3
+++

## Propòsit

Aquest mòdul permet l’escaneig d’arxius mitjançant el servei d’antivirus Centrals del CTTI.

## Funcionalitats

### Beans

Conté l’entitat que s’ofereix per representar la informació on s'emmagatzemaran les dades relacionades
amb les amenaces detectades en un fitxer a *cat.gencat.ctti.canigo.arch.integration.antivirus.beans.InfectionInfo*.

Conté l’entitat que s’ofereix per representar la informació de les dades relacionades amb l'estat de l'escaneix
a *cat.gencat.ctti.canigo.arch.integration.antivirus.ResultatEscaneig*.

### Service

S'ofereix el servei *cat.gencat.ctti.canigo.arch.integration.antivirus.Antivirus* per a realitzar
l'escaneig del fitxer en el servei de l'antivirus del CTTI.

### Exception

S’ofereix la exception *cat.gencat.ctti.canigo.arch.integration.antivirus.exceptions.AntivirusException*
per a identificar els errors produïts al mòdul.