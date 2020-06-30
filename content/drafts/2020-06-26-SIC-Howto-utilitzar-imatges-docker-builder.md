+++
date        = "2020-06-26"
title       = "Utilitzar imatges Docker Builder"
description = "Howto per mostrar com utilitzar les imatges Docker per a aplicar el patró Builder"
section     = "howtos"
categories  = ["SIC"]
#key        = "JUNY2019"
+++

## Introducció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors**. Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de simular i executar les imatges Docker en un entorn local tal i com ho realitza el SIC.

## Harbor

Docker per defecte està configurat per a utilitzar el registre públic [Docker Hub](https://hub.docker.com/) com a repositori d’imatges. **Les imatges que utilitzarà SIC per a la construcció es troben allotjades un registre docker privat** escollit per la Generalitat de Catalunya: [Harbor](https://goharbor.io/).

## Ús del registre privat

### Accés
El registre Docker privat de la Generalitat de Catalunya, està disponible a l’URL pública https://docker-registry.ctti.extranet.gencat.cat. Es tracta d’un registre privat sense cap repositori públic.

### Permisos
Per a tenir accés a les imatges Docker utilitzades al SIC és necessari contactar amb l'Oficina Tècnica de Canigó a través dels canals indicats a https://canigo.ctti.gencat.cat/sic/suport/. L'Oficina subministrarà al proveïdor d’aplicacions un usuari amb permís de lectura al projecte **gencatsic** que conté les imatges Docker utilitzades pel SIC.

### Accés via consola web
Es pot accedir al Harbor a través de la seva consola web mitjançant la URL: https://docker-registry.ctti.extranet.gencat.cat. Un cop dins es pot navegar a través de les carpetes de les imatges del projecte **gencatsic**.

### Login
Per a poder descarregar les imatges en local primer ens hem de autenticar mitjançant:
```
docker login https://docker-registry.ctti.extranet.gencat.cat
```

Introduint l'usuari i paraula de pas proporcionats per l'Oficina Tècnica de Canigó.

### Descàrrega de imatges

Una cop realitzada l’autenticació per comandes, podem baixar-nos la imatge escollida mitjançant:
```
docker pull docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-3.6-8
```

On, en aquest cas, estem descarregant-nos la imatge *maven-builder* versió 1.0-3.6-8.

### Execució de les imatges

Una vegada baixada la imatge Docker, la podem executar en el nostre entorn local mitjançant:
```
docker run -it --rm \
 --name gencatsic-maven-builder \
 -v $HOME/.m2/repository:/repository \
 -v $HOME/.m2/settings.xml:/settings/settings.xml \
 -v $PWD:/app -w "/app" \
 docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-3.6-8 \
 mvn --version
```

En aquest cas estem indicant que:

- Volem que el nom de la imatge executant-se tingui el nom *gencatsic-maven-builder*.

- Volem compartir el nostre repository maven, ubicat a *$HOME/.m2/repository*, amb el repository maven de la imatge Docker .

- Volem compartir el nostre settings.xml, ubicat a $HOME/.m2/settings.xml, amb el settings.xml de la imatge Docker.

- Volem compartir el codi font de la nostre aplicació, ubicat a *$PWD*, amb el directori de treball de la imatge Docker.

- Volem executar el goal de maven *mvn --version*.

### Logout

Si volem desconnectar-nos del Harbor serà necessari realitzar un logout mitjançant:
```
docker logout https://docker-registry.ctti.extranet.gencat.cat
```