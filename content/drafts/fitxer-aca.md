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

Element per definir l'informació de com construir el contenidor que serà l'encarregat de construir l'aplicació si l'aplicació no utilitza per a la construcció els contenidors dels builders oferts per SIC ja que té necessitats pròpies.

En aquest element hi contindrà el llistat dels diferents passos (steps) per a contruir el contenidor encarregat de construir l'aplicació.

Per cada step es podrà definir informació del contenidor (container) i informació de les accions a executar (execution) si és necessari

### components custom-builder steps container

A aquest element hi contindrà informació de com construir la imatge del contenidor que realtizarà la construcció de l'aplicació (custom builder). 

Per cada step, a l'entorn local d'excució (local) informarem:

- path: ruta a la definició de la imatge del contenidor 

- name: nom que li volem donar a la imatge del contenidor

```
components:
  - custom-builder:
      steps:
        - container:
            image:
              local:
                name: nom-contenidor
                path: path/Dockerfile
```

Així per exemple podriem tenir:

```
components:
  - custom-builder:
      steps:
        - container:
            image:
              local:
                name: 7-768-arp-api-builder
                path: builds/Dockerfile
```

On estem definint que la definició per la contrucció de la imatge del contenidor per a la construcció (custom builder) del projecte es troba al fitxer *builds/Dockerfile* i se li vol donar a aquesta imatge de construcció el nom *7-768-arp-api-builder* que posteriorment al build s'utilitzarà. 

### components build

A aquest element hi contindrà el llistat de passos (steps) amb informació de com realitzar la construcció del projecte. Per cada step definirem:

- container: Informació del contenidor encarregat de realtizar la construcció del projecte

- execution: Informació de les comandes que s'han d'executar per la construcció del projecte

L'estructura serà:

```
components:
  - build:
      steps:
        - container
          execution
```

#### components build steps container

En aquest element hi definirem informació del contenidor encarregat de realitzar la contrucció del projecte amb els elements:

- image: informació de la imatge encarregada de realitzar la construcció del projecte

- resources: recursos necessaris per a que la imatge contrueixi correctament el projecte

- volumes: recursos que es necessiten mapejar a la imatge per a la contrucció del projecte

L'estructura serà:

```
components:
  - build:
      steps:
        - container:
            image
            resources
            volumes
```

##### components build steps container image

En aquest element hi definirem informació de la imatge a utilitzar per la construcció del projecte amb els elements:

- remote: Utilitzarem remote si la imatge del contenidor constructor (builder) és un dels oferts pel SIC per la construcció 

- local: Utilitzarem local si es vol utilitzar la imatge del contenidor constructor pròpia (custom builder) creada en el element [custom-builder](components-custom-builder-steps-container)

L'estructura per remote seria:

```
components:
  - build:
      steps:
        - container:
            image:
              remote
```

L'estructura per local seria:

```
components:
  - build:
      steps:
        - container:
            image:
              local
```

###### components build steps container image remote

En aquest element especificarem quina imatge del contenidor constructor (builder) oferts pel SIC per la construcció disponibles a:

**TODOD**

L'element a definir serà el nom (name), tenint l'estructura:

```
components:
  - build:
      steps:
        - container:
            image:
              remote:
                name
```

###### components build steps container image local

En aquest element especificarem el nom (name) de la imatge del contenidor constructor pròpia (custom builder) creada en el element [custom-builder](components-custom-builder-steps-container)

L'estructura seria:

```
components:
    build:
      steps:
        - container:
            image:
              local:
                name
```

##### components build steps container resources

En aquest element detallarem els recursos de màquina necessaris per a que el contenidor realitzi la construcció del projecte. Es definiran els recursos de cpu i memòria del contenidor de límit i per request

Així pels elements limits i request tindrem els elements:

- cpu: Recursos de CPU mesurats en *cpu unitats*. 1 CPU equival a 1 vCPU/Core per a plataformes cloud i 1 hiperthread a plataformes on premise. Es permeten sol·licituds fraccionades, per tant, si especifiquem 0.5 equival a la meitat de CPU que un que demana 1. L'expressió 0.1 equival a l'expressió 100m, que es pot llegir com "cent milicpu". Recomenem utilitzar l'unitat "milicpu"

- memory: Recursos de memòria mesurats en bytes. Podeu expressar la memòria com un enter pla o com un número de punt fix mitjançant els sufixos: E, P, T, G, M, K. També podeu utilitzar la potència de dos equivalents: Ei, Pi, Ti , Gi, Mi, Ki. Per exemple, els següents representen aproximadament el mateix valor: 128974848, 129e6, 129M, 123Mi. Recomenem utilitzar l'unitat "Mi"

L'estructura seria:

```
components:
    build:
      steps:
        - container:
            resources:
              limits:
                cpu
                memory
              requests:
                cpu
                memory
```

##### components build steps container volumes

** TODO **

#### components build steps execution

#### Exemple

Per exemple, per la construcció d'una aplicació maven 3.6 i jdk 1.8 podriem tenir:

```
components:
  - build:
      steps:
        - container:
            image:
              remote:
                name: docker-registry.ctti.extranet.gencat.cat/gencat-sic/mvn-builder:1.0-3.6-8
            resources:
              limits: { cpu: 1000m, memory: 1024Mi }
              requests: { cpu: 100m, memory: 128Mi }
            volumes:
              - "nexus-maven-config": "/home/maven/.m2"
          execution:
            commands:
              - mvn clean package -Dmaven.test.skip=true
```

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
