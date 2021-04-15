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

#### segon nivell

##### tercer nivell

### info

### global-env

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
