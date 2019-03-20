+++
date        = "2019-02-22"
title       = "Integració de contenidors a SIC"
description = "Informació respecte a la integració d'aplicacions basades en contenidors amb el SIC."
sections    = "Container Cloud"
weight      = 12
categories  = ["cloud","docker","container","kubernetes","openshift","Swarm","sic"]
+++

## Informació necessària per la integració amb SIC

### Kubernetes/Openshift

- Nom del repositori git del codi font.
- En cas de necessitats de compilació, requeriments i instruccions al respecte.
- Nom de la imatge docker (la versió s'agafa del fitxer sic.yml)
- Path del fitxer Dockerfile.
- Nom del repositori git dels descriptors.
- Nom del descriptor de desplegament de Kubernetes/Openshift.
- Llista de correus electrònics en cas de notificacions de Jenkins.

### Swarm

- Nom del repositori git del codi font.
- En cas de necessitats de compilació, requeriments i instruccions al respecte.
- Nom de la imatge docker (la versió s'agafa del fitxer sic.yml)
- Path del fitxer Dockerfile.
- Llista de correus electrònics en cas de notificacions de Jenkins.
- Com que swarm no disposa de descriptors, cal proporcionar addicionalment la següent informació:
  - namespace
  - xarxa
  - mida del contenidor
  - domini
  - port
  - rèpliques
  - paràmetres d'entorn
  - ...

## Tasques disponibles al SIC per projectes basats en contenidors

### Kubernetes i Openshift

Per plataformes basades en Kubernetes (Kubernetes/Openshift), al SIC estan disponibles les següents tasques:

- Desplegament
- Desplegament de tags
- Reinici
- Parada
- Arrancada
- Desplegament de ConfigMaps
- Actualització d'algunes propietats dels descriptors de deployment/deploymentConfig:
  - Variables d'entorn
  - Quotes
  - Punts de muntatge

### Swarm

Per plataformes basades en Swarm (SwarmMe), al SIC estan disponibles les següents tasques:

- Desplegament

Està previst en un futur crear les tasques:

- Desplegament de tags
- Reinici
- Parada
- Arrancada

Podeu trobar més informació del SIC a [Servei d'Integració Contínua.](https://canigo.ctti.gencat.cat/sic/)