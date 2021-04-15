+++
date = "2021-01-20"
title = "Com construir el fitxer ACA"
description = "Guia amb la informació de construcció del fitxer ACA per a l'Autoservei de pipelines"
sections = "SIC"
toc = true
taxonomies = []
weight = 3
+++

## Introducció

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual es poden **generar automàticament pipelines de construcció i desplegament d'aplicacions**,
amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC.

En aquest article **ens centrarem exclusivament en explicar com preparar l’arxiu ACA (Arxiu de Configuració d'Aplicacions)**.
Si voleu més informació sobre el funcionament d'aquest servei, els requeriments que cal acomplir i altres, podeu consultar la secció
[**Autoservei de pipelines**](/sic-serveis/autoservei-pipelines/) on s'explica de forma detallada.

## Configuració

El proveïdor d’aplicacions haurà de configurar l'arxiu `/sic/aca.yml` dins del repositori del projecte (a nivell de carpeta del projecte).
Es tracta d’un arxiu de text en **format YAML** en el que a continuació definirem la informació que cal emplenar.

## Estructura general

L'arxiu ACA es compondrà de la següent estructrua:

```
version
info
global-env
components:
  - custom-builder
    build
    publish
    bake
    deployment
notifications    
```

## Detall dels elements de l'estructura

### version

Caldrà indicar la versió de l’arxiu ACA que, per tant, segueix un versionatge diferent al de l’aplicació ja que cada increment de versió es correspondrà amb canvis en les especificacions de construcció i/o desplegament. El seu valor ha de seguir el format estàndard: <versioMajor>.<versioMenor>.<pegat>.

El valor actual és:

```
version: 2.0.0
```

### info

En aquest element hi contindrà informació sobre l'aplicació, l'element *info* i els subelements seran:

```
info:
  version
  description
```

#### info version 

Caldrà indicar la versió funcional de l'aplicació seguint el format de:

https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari/

Per exemple:

```
info:
  version: 1.0.0
```

#### info description

L'objectiu d'aquest element és contenir una descripció de l'aplicació. És un camp de lliure contingut.

Un exemple de contingut podria ser:

```
info:
  description: Backend per l'aplicació de la gestió de continguts al CTTI
```

### global-env

Llistat de variables globals necessaris per l'execució del job de l'aplicació. Les variables actuals són:

- CONTAINER_DOCKERFILE_PATH: per indicar-li el nom del Dockerfile que utilitzarà per crear el contenidor que es desplegarà al Cloud
- CONTAINER_IMAGE_NAME: per indicar-li el nom de la imatge que li assignarà al contenidor que es desplegarà al Cloud
- DEPLOYMENT_TYPE: per indicar-li el tipus de desplegament, per exemple, per indicar el tipus de desplegament al Openshift
- APIC_PRODUCT_FILE
- CF_BUILDPACK
- CF_PATH

Exemple de llistat de variables:

```
global-env:
  - CONTAINER_DOCKERFILE_PATH: Dockerfile
  - CONTAINER_IMAGE_NAME: petclinic-test-os
  - DEPLOYMENT_TYPE: DeploymentConfig
```

### components custom-builder

### components build

### components publish

### components bake

### components deployment

### notifications

## Exemples

A continuació s'adjunten exemples de casos d'ús:

- 

<br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [**Suport**] (/sic/suport) o
contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
