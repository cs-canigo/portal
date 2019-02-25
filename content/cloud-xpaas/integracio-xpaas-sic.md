+++
date        = "2019-02-22"
title       = "Integració d'aplicacions xPaaS a SIC"
description = "Informació respecte a la integració d'aplicacions basades en xPaaS amb el SIC."
sections    = "xPaaS Cloud"
weight      = 2
categories  = ["cloud","IBMCloud","cloudfoundry","sic"]
+++

## Informació necessària per la integració amb SIC

### IBMCloud BuildPacks

- Nom del repositori git del codi font.
- En cas de necessitats de compilació, requeriments i instruccions al respecte.
- Llista de correus electrònics en cas de notificacions de Jenkins.
- Informació relativa a la construcció de les metadades de desplegament:
  - Buildpack que s'utilitzarà al xPaaS.
  - Nom de l'aplicació
  - Memòria necessària
  - Disc necessari
  - Nombre d'instàncies
  - Path de l'artefacte
  - Serveis que s'utilitzaran
  - Variables d'entorn
  - Domini

### Altres xPaaS

Pendent de definir.

## Tasques disponibles al SIC per projectes xPaaS

### IBMCloud BuildPacks

Per plataformes basades en BuildPacks d'IBMCloud, al SIC estan disponibles les següents tasques:

- Desplegament
- Reinici
- Parada
- Arrancada

### Altres xPaaS

La integració amb SIC no està disponible.

Podeu trobar més informació del SIC a [Servei d'Integració Contínua.](https://canigo.ctti.gencat.cat/sic/)