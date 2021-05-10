+++
date        = "2020-12-29"
title       = "Utilitzar imatges Docker Builder"
description = "Howto per mostrar com utilitzar les imatges Docker del catàleg d'imatges de construcció del SIC"
section     = "howtos"
categories  = ["SIC"]
#key        = "JUNY2019"
+++

## Introducció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable
de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors**. Aquest how-to va dirigit a tots aquells
perfils tècnics que tinguin la necessitat de simular i executar les imatges Docker en un entorn local tal i com ho realitza el SIC.

## Ús del registre privat

En el [Catàleg d'imatges corporatiu](/sic30-serveis/cataleg-imatges/) podreu trobar informació sobre el registre
d'imatges, el codi font, la documentació associada i el procediment per a disposar d'accés.

### Accés via consola web
Es pot accedir al Harbor a través de la seva consola web mitjançant: https://docker-registry.ctti.extranet.gencat.cat.
Un cop dins es pot navegar a través de les carpetes de les imatges del projecte **gencatsic**.

### Login
Per a poder descarregar les imatges en local primer ens hem de autenticar de la següent manera:
```
docker login https://docker-registry.ctti.extranet.gencat.cat
```

Cal introduir l'usuari i paraula de pas proporcionats per l'Oficina Tècnica de Canigó.

### Descàrrega d'imatges

Un cop realitzada l’autenticació per linea de comandes, podem baixar-nos la imatge escollida mitjançant:
```
docker pull docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-3.6-8
```

On, en el cas d'exemple, estem descarregant-nos la imatge *maven-builder* versió 1.0-3.6-8.

### Execució de les imatges

Un cop descarregada la imatge Docker, la podem executar en el nostre entorn local mitjançant:
```
docker run -it --rm \
 --name gencatsic-maven-builder \
 -v $HOME/.m2/repository:/repository \
 -v $HOME/.m2/settings.xml:/settings/settings.xml \
 -v $PWD:/app -w "/app" \
 docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-3.6-8 \
 mvn --version
```

En aquest cas estem indicant que volem:

- Que el nom de la imatge executant-se tingui el nom *gencatsic-maven-builder*.

- Compartir el nostre repository maven, ubicat a *$HOME/.m2/repository*, amb el repository maven de la imatge Docker .

- Compartir el nostre settings.xml, ubicat a $HOME/.m2/settings.xml, amb el settings.xml de la imatge Docker.

- Compartir el codi font de la nostre aplicació, ubicat a *$PWD*, amb el directori de treball de la imatge Docker.

- Executar el goal de maven *mvn --version*.

### Logout

Si volem desconnectar-nos del Harbor serà necessari realitzar un logout mitjançant:
```
docker logout https://docker-registry.ctti.extranet.gencat.cat
```

## Estendre d’imatges Docker de SIC

És possible generar una imatge Docker heretant d'una imatge del catàleg de SIC.
Per a fer-ho, s'ha d’incloure al fitxer `Dockerfile` la instrucció [FROM](https://docs.docker.com/engine/reference/builder/#from)
seguit del nom de la imatge base a utilitzar.
Per exemple:

```bash
FROM docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-2.2-8
```
</br>


Per tal d’evitar errors en la construcció de la imatge estesa, cal tenir en compte algunes recomanacions:

* Els usuaris s'hereten de la imatge base i, per defecte, els usuaris de les imatges del SIC disposen de permisos limitats i
destinats exclusivament a la construcció d'artefactes. És a dir, si es necessita instal·lar o executar algun programa addicional serà
necessari invocar la instrucció [USER](https://docs.docker.com/engine/reference/builder/#user) per a canviar l'usuari a *root*.

* Si es vol mantenir el comportament predeterminat de les imatges del SIC serà necessari agregar al final
la instrucció [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) amb la mateixa instrucció que està
configurada a la imatge base i assegurar-se que l'usuari d'execució del contenidor es correspon amb el que s'utilitza a la imatge base.

* Cal revisar el fitxer `Dockerfile` de la imatge base del SIC a utilitzar per a assegurar-se que les instruccions que conté
apliquen per a la nova imatge. Per exemple, en una imatge estesa l'equip responsable del manteniment i suport és diferent, per lo que cal
canviar el [MAINTAINER](https://docs.docker.com/engine/reference/builder/#maintainer-deprecated) i/o
[LABEL](https://docs.docker.com/engine/reference/builder/#label) per a indicar l’adreça de correu adient.
</br>

Exemple:

```bash
# S'utilitza una imatge base del SIC.
FROM docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-2.2-8

# Es modifica el responsable de la imatge.
LABEL maintainer="change.me@gencat.cat"

# Es modifica l'usuari a root per a crear una variable d'entorn, instal·lar un programa addicional, donar permisos i
eliminar fitxers innecessaris.
USER root
ENV FLEX_HOME='/flex-sdk'

RUN apk --update add --no-cache --quiet --virtual .build-deps curl unzip \
&& curl -fsSL -o /tmp/flex-sdk.zip http://download.macromedia.com/pub/flex/sdk/builds/flex3/flex_sdk_3.4.1.10084A.zip \
&& curl -fsSL -o /tmp/flex-sdk-libs.zip http://download.macromedia.com/pub/flex/sdk/datavisualization_sdk3.4.zip \
&& unzip /tmp/flex-sdk.zip -d "${FLEX_HOME}" \
&& unzip /tmp/flex-sdk-libs.zip -d "${FLEX_HOME}" \
&& chown -R maven:maven ${FLEX_HOME} \
&& chmod -R a+rx ${FLEX_HOME} \
&& apk del .build-deps \
&& rm -rf /tmp/*

# S'assegura que l'usuari d'execució dels contenidors associats a la imatge es correspongui amb l'utilitzat a la imatge
base i que, si la imatge base té un ENTRYPOINT, aquest sigui invocat.
USER maven
ENTRYPOINT ["/usr/local/bin/mvn-entrypoint.sh"]
```