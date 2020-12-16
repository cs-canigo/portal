+++
date        = "2020-06-26"
title       = "Utilitzar imatges Docker Builder"
description = "Howto per mostrar com utilitzar les imatges Docker per a aplicar el patró Builder"
section     = "howtos"
categories  = ["SIC"]
#key        = "JUNY2019"
+++

## Introducció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable
de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors**. Aquest how-to va dirigit a tots aquells
perfils tècnics que tinguin la necessitat de simular i executar les imatges Docker en un entorn local tal i com ho realitza el SIC.

## Harbor

Docker per defecte està configurat per a utilitzar el registre públic [Docker Hub](https://hub.docker.com/) com a repositori d’imatges.
No obstant, **les imatges que utilitzarà SIC per a la construcció es troben allotjades un registre docker privat**
escollit per la Generalitat de Catalunya: [Harbor](https://goharbor.io/).

![Pipeline del SIC](/related/sic/harbor_docker_images.png)
</br>

Podeu accedir al codi font del catàleg d'imatges del SIC, i a la documentació associada, mitjançant el següent enllaç: </br>
https://git.intranet.gencat.cat/0192-intern/docker-images.

![Pipeline del SIC](/related/sic/docker_images_project.png)
</br>

## Ús del registre privat

### Accés
El registre Docker privat de la Generalitat de Catalunya, està disponible a: https://docker-registry.ctti.extranet.gencat.cat.
Es tracta d’un registre privat sense cap repositori d'accés públic.

### Permisos
Per a disposar d'accés a les imatges Docker utilitzades al SIC és necessari contactar amb l'Oficina Tècnica de Canigó a través dels
canals establerts: https://canigo.ctti.gencat.cat/sic/suport/. L'Oficina subministrarà al proveïdor d’aplicacions un usuari
amb permís de lectura al projecte **gencatsic** que conté les imatges Docker utilitzades pel SIC.

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

---
### Extender imágenes Docker del SIC

Es posible generar una imagen Docker tomando como base una imagen del SIC. Para extender de una imagen del SIC, se debe colocar en el Dockerfile la instrucción [FROM](https://docs.docker.com/engine/reference/builder/#from) seguido del nombre de la imagen de base a utilizar.

Ejemplo de FROM:
```bash
FROM docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-2.2-8
```

Para evitar errores en la construcción de la imagen/contenedor extendido, es necesario tener en cuenta algunas recomendaciones:

* Los usuarios se heredan de la imagen base y por defecto, los usuarios de las imagenes del SIC tienen permisos limitados, destinados a la construcción de artefactos; es decir, que sí se requiere instalar o ejecutar algún programa extra, se debera invocar la instrucción [USER](https://docs.docker.com/engine/reference/builder/#user) para cambiar el usuario a root.

* Sí se quiere mantener el comportamiento predeterminado de las imagenes SIC, es necesario agregar al final del Dockerfile la instrucción [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) tal como este configurada en la imagen base, y asegurarse que el usuario de ejecución del contenedor, sea el que indica la imagen base.

* Debe revisarse el Dockerfile de la imagen base del SIC a utilizar, para asegurarse que las instrucciones que contiene aplican para la nueva imagen, por ejemplo, en una imagen extendida, el equipo que da soporte varia, por lo que deberia cambiarse el [MAINTAINER](https://docs.docker.com/engine/reference/builder/#maintainer-deprecated) y/o [LABEL](https://docs.docker.com/engine/reference/builder/#label) que contiene la dirección de correo de los responsables de la imagen.


Ejemplo de extensión de una imagen del SIC:

```bash
# Se uitliza una imagen base del SIC.
FROM docker-registry.ctti.extranet.gencat.cat/gencatsic/maven-builder:1.0-2.2-8

# Se cambia el autor de la imagen
LABEL maintainer="change.me@gencat.cat"

# Se cambia el usuario a root para crear una variable de entorno, instalar un programa adicional, dar permisos y remover archivos innecesarios.
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

# Se asegura que el usuario de ejecución de los contenedores asociados a la imagen de este Dockerfile sea el configurado en la imagen base, y que sí la imagen base tiene un ENTRYPOINT, sea invocado como la ultima instrucción del Dockerfile.
USER maven
ENTRYPOINT ["/usr/local/bin/mvn-entrypoint.sh"]
```

---

### Logout

Si volem desconnectar-nos del Harbor serà necessari realitzar un logout mitjançant:
```
docker logout https://docker-registry.ctti.extranet.gencat.cat
```
