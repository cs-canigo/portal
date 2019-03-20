+++
date          = "2018-06-06"
title         = "Registre docker privat"
description   = "Descripció i ús del registre docker privat"
sections      = "Container Cloud"
weight        = 2
categories    = ["cloud","docker","container","openshift","swarm"]
+++

## Introducció

Docker per defecte està configurat per utilitzar el registre públic [Docker Hub](https://hub.docker.com/) com a repositori d'imatges.

Per persistir i gestionar les imatges docker privades és important disposar un registre docker privat:

* Cal garantir que les imatges docker quedin persistides en algun repositori.
* Cal garantir que les imatges docker dels diferents projectes no siguin públiques.

**Important: Les imatges base presents al dockerHub de gencatcloud deixaran de ser mantingudes i pròximament esborrades. D'ara endavant, cal utilitzar les imatges base del registre privat.**

## Descripció del registre privat

El registre privat escollit a la Generalitat de Catalunya és [Harbor](https://vmware.github.io/harbor/).

Destaquen les següents característiques:

* **Gestió d'usuaris RBAC:** Els repositoris docker estan organitzats en Projectes. Permet assignar permisos i rols als diferents usuaris a cada projecte.
* **Portal web:** Permet navegar per les imatges dels diferents projectes, veure vulnerabilitats, ...
* **API REST:** La majoria d'operacions efectuades des del portal web, es poden fer via API.
* **Auditoria:** Totes les acciones que es facin sobre el registre queden registrades per poder ser analitzades en auditories.
* **Anàlisi de vulnerabilitats:** Totes les imatges repositades al Registre són analitzades amb l'eina [Clair](https://github.com/coreos/clair) per identificar les diferents vulnerabilitats.
* **Signatura d'Imatges:** Les imatges repositades al registre poden ser signades digitalment de cara a garantir la seva procedència i integritat. Actualment encara no implementat.

## Ús del registre privat
### Accés
El registre docker privat de la Generalitat de Catalunya, està disponible a l'URL pública **https://docker-registry.ctti.extranet.gencat.cat**

És un registre privat sense cap repositori públic.

### Permisos
L'equip de suport cloud subministrarà al proveïdor d'aplicacions un usuari amb els següents permisos:

* Permís de lectura del projecte associat a l'aplicació del projecte.
* Permís de lectura del projecte **gencatcloud** amb les imatges base mantingudes per l'equip de Suport Cloud.

### Consola web
Es pot accedir a la consola web introduint a un navegador la url d'accés.

* Des de la consola web es pot navegar pels projectes.
* Es pot accedir als repositoris d'un projecte fent clic al **projecte**.
* Es pot accedir a les diferents versions de les imatges d'un repositori fent clic al **repositori**.
* Per cada imatge, es poden observar les vulnerabilitats fent clic al **tag** de la imatge.
* Per cada vulnerabilitat es pot observar la descripció de la mateixa fent clic a la **vulnerabilitat**.

### Docker
#### Descarrega d'una imatge
Per accedir a les imatges del registre des de docker, cal seguir els següents passos:

* Connectar-se al registre:
```
docker login https://docker-registry.ctti.extranet.gencat.cat
```
* Introduir les credencials proporcionades per l'equip de SuportCloud.
* Fer un pull de la imatge desitjada
```
docker pull docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8
```
* Desconnectar-se del registre:
```
docker logout https://docker-registry.ctti.extranet.gencat.cat
```

#### Construir una imatge depenent d'una imatge repositada al registre privat
Per exemple si tenim un dockerfile del tipus:

```
FROM docker-registry.ctti.extranet.gencat.cat/gencatcloud/java:8

MAINTAINER xxxx

ENV APP_DIR=/app

COPY xxxx.jar ${APP_DIR}
COPY run.sh /
```

**Important notar que el FROM ha d'incloure el registre privat**

* Cal primer connectar-se al registre:
```
docker login https://docker-registry.ctti.extranet.gencat.cat
```
* Construir la imatge
```
docker build -t XXXX .
```
* Desconnectar-se del registre:
```
docker logout https://docker-registry.ctti.extranet.gencat.cat
```

## Integració amb SIC
Totes les aplicacions basades en contenidors desplegades via SIC, estan integrades amb el Registre Docker privat.
Cada imatge que es desplegui a les diferents plataformes docker (AppAgile, Kubernetes o SwarmMe), quedarà repositada al registre privat.
