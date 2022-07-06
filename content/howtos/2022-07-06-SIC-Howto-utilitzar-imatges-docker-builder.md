+++
date        = "2022-07-06"
title       = "SIC 3.0 - Utilitzar imatges Docker Builder"
description = "SIC 3.0 - Howto per mostrar com utilitzar les imatges Docker del catàleg d'imatges de construcció"
#section     = "howtos"
#categories  = ["SIC"]
#key        = "AGOST2022"
+++

## Introducció

El SIC actualment utilitza la [tecnologia Docker](https://www.docker.com/) per a disposar d’un **entorn aïllat i immutable
de construcció que, a més pugui ser utilitzat i testejat pels mateixos proveïdors en condicions equiparables a
l’entorn d’execució del SIC**.

Aquest how-to va dirigit a tots aquells perfils tècnics que tinguin la necessitat de simular i executar les
imatges dels builders del SIC en un entorn local, sent possible ajustar les limitacions en recursos de memòria
RAM que permetin comprovar que els processos de compilació podran ser executats sense sobrepassar els límits
disponibles i alhora permeti monitorar en temps real el consum de recursos.

## Instal·lació del motor de contenidors

Cal instal·lar l’eina de gestió de contenidors Podman seguint la següent guia:
https://podman.io/getting-started/installation.

Si es vol monitorar l’ús de memòria i cpu en temps real amb Podman stats, cal activar *Control Group v2*:
https://sleeplessbeastie.eu/2021/09/10/how-to-enable-control-group-v2/

Altres referències:

- https://www.cyberithub.com/how-to-install-podman-on-ubuntu-20-04-lts-step-by-step/

- https://phoenixnap.com/kb/podman-tutorial

## Ús del registre privat

En el [Catàleg d'imatges corporatiu](/sic30-serveis/cataleg-imatges/) podreu trobar informació sobre el registre
d'imatges, el codi font, la documentació associada i el procediment per a disposar d'accés.

### Accés via consola web

Es pot accedir al catàleg a través de la seva consola web mitjançant: <https://docker-registry.ctti.extranet.gencat.cat>.
Un cop dins es pot navegar a través de les carpetes de les imatges del projecte
[**gencat-sic-builders**](https://docker-registry.ctti.extranet.gencat.cat/harbor/projects/129/repositories).

### Login

Per a poder descarregar les imatges en local primer ens hem d'autenticar de la següent manera:

```bash
podman login https://docker-registry.ctti.extranet.gencat.cat
```

Cal introduir l'usuari i paraula de pas proporcionats per l'Oficina Tècnica de Canigó.

### Descàrrega d'imatges

Un cop realitzada l’autenticació per línia de comandes, podem baixar-nos la imatge escollida mitjançant:

```bash
podman pull docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/node-builder:1.0-16
```

On, en el cas d'exemple, estem descarregant-nos la imatge *node-builder* versió 1.0-16.

### Execució de les imatges

Un cop descarregada la imatge del builder, la podem executar en el nostre entorn local mitjançant:

```bash
podman run -it \
--memory=3072m \
--memory-reservation=3072m \
--memory-swap=3072m \
--rm \
--net=host \
--name gencat-sic-builder \
-v $HOME/.m2/settings.xml:/mnt/nexus/settings.xml \
-v $HOME/.npmrc:/app/.npmrc \
-v $PWD:/app:U -w "/app" \
docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/node-builder:1.0-16 \
/bin/sh
```

En aquest cas estem indicant què volem:

- Que s'assignin 3GB de memòria al procès. **Els valors de –memory, –memory-reservation i –memory-swap han de coincidir
amb el límit màxim especificat al fitxer `aca.yml`**, i concretament a la secció
`components[].build.steps[].container.resources.limits.memory`.

- Que s'utilitzi el controlador `Host` de Podman per a compartir la xarxa del host.

- Que el nom de la imatge executant-se tingui el nom `gencat-sic-builder`.

- Que s'injectin com a volums els fitxers de configuració de maven i npm si són necessaris a la imatge.

En aquest punt, s’obrirà un shell des d’on executar manualment les comandes del builder especificades al fitxer `aca.yml`.

<div class="message warning">
Podman gestionarà els permisos i propietat del volum compartit, que és la carpeta on resideix el codi de l’aplicacíó (/app dins el contenidor),
per tant, en acabar l’execució del contenidor, haureu de restablir els permisos.
</div>

Podeu finalitzar l’execució del contenidor mitjançant la següent comanda:
```bash
$ exit
```

### Monitoratge del consum de recursos

Per tal de monitorar el consum de recursos en temps real, es pot executar la següent comanda en un terminal addicional:

```bash
podman stats
```

![Podman stats](/related/sic/3.0/podman-stats-monitoring.png)
</br>

### Generar fitxer de log

En cas que s’hagi de reportar un problema, es recomana executar les comandes de compilació activant un nivell de
verbositat adient i generar un fitxer de log. Per exemple:

```bash
podman logs -t -l > ~/log-builder-sic.log
```

Per a més informació: https://docs.podman.io/en/latest/markdown/podman-logs.1.html

### Logout

Si volem desconnectar-nos, serà necessari realitzar un logout mitjançant:

```bash
podman logout https://docker-registry.ctti.extranet.gencat.cat
```

## Estendre d’imatges Docker de SIC

És possible generar una imatge Docker heretant d'una imatge del catàleg de SIC.
Per a fer-ho, s'ha d’incloure al fitxer `Dockerfile` la instrucció [FROM](https://docs.docker.com/engine/reference/builder/#from)
seguit del nom de la imatge base a utilitzar.
Per exemple:

```bash
FROM docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/mvn-builder:1.0-3.6-8
```

</br>

Per tal d’evitar errors en la construcció de la imatge estesa, cal tenir en compte algunes recomanacions:

- Els usuaris s'hereten de la imatge base i, per defecte, els usuaris de les imatges del SIC disposen de permisos limitats i
destinats exclusivament a la construcció d'artefactes. És a dir, si es necessita instal·lar o executar algun programa addicional serà
necessari invocar la instrucció [USER](https://docs.docker.com/engine/reference/builder/#user) per a canviar l'usuari a *root*.

- Si es vol mantenir el comportament predeterminat de les imatges del SIC, serà necessari agregar al final
la instrucció [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) amb la mateixa instrucció que està
configurada a la imatge base i assegurar-se que l'usuari d'execució del contenidor es correspon amb el que s'utilitza a la imatge base.

- Cal revisar el fitxer `Dockerfile` de la imatge base del SIC a utilitzar per a assegurar-se que les instruccions que conté
apliquen per a la nova imatge. Per exemple, en una imatge estesa l'equip responsable del manteniment i suport és diferent, per tant, cal
canviar el [MAINTAINER](https://docs.docker.com/engine/reference/builder/#maintainer-deprecated) i/o
[LABEL](https://docs.docker.com/engine/reference/builder/#label) per a indicar l’adreça de correu adient.

- Altres criteris i recomanacions: [Criteris creació contenidors docker](/cloud-caas/dockerImages).

</br>

Exemple:

```bash
# S'utilitza una imatge base del SIC.
FROM docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/mvn-builder:1.0-3.6-8

# Es modifica el responsable de la imatge.
LABEL maintainer="change.me@gencat.cat"

# Es modifica l'usuari a root per a crear una variable d'entorn, instal·lar un programa addicional, donar permisos i eliminar fitxers innecessaris.
USER root
ENV FLEX_HOME='/flex-sdk'
RUN apk add --no-cache --virtual .build-deps curl tar unzip procps \
  && curl -fsSL -o /tmp/flex-sdk.zip http://download.macromedia.com/pub/flex/sdk/builds/flex3/flex_sdk_3.4.1.10084A.zip \
  && curl -fsSL -o /tmp/flex-sdk-libs.zip http://download.macromedia.com/pub/flex/sdk/datavisualization_sdk3.4.zip \
  && unzip /tmp/flex-sdk.zip -d "${FLEX_HOME}" \
  && unzip /tmp/flex-sdk-libs.zip -d "${FLEX_HOME}" \
  && chown -R 1000:1000 ${FLEX_HOME} \
  && chmod -R a+rx ${FLEX_HOME} \
  && apk del .build-deps \
  && rm -rf /tmp/* \
  && java -version \
  && mvn --version

# S'assegura que l'usuari d'execució dels contenidors associats a la imatge es correspongui amb l'utilitzat a la imatge base
USER 1000
CMD ["mvn", "-version"]
```