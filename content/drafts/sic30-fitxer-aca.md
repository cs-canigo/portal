+++
date = "2021-04-13"
title = "SIC 3.0 - Com construir el fitxer ACA"
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
[**Autoservei de pipelines**](/sic30-serveis/autoservei-pipelines/) on s'explica de forma detallada.

## Configuració

El proveïdor d’aplicacions haurà de configurar l'arxiu `/sic/aca.yml` dins del repositori del projecte (a nivell de carpeta del projecte).
Es tracta d’un arxiu de text en **format YAML** en el que a continuació definirem la informació que cal emplenar.

## Estructura general

L'arxiu ACA es compondrà de la següent estructura:

```
version
info
global-env
components:
  - custom-builder
    build
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

#### info.version 

Caldrà indicar la versió funcional de l'aplicació seguint el format de:

https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari/

Per exemple:

```
info:
  version: 1.0.0
```

#### info.description

L'objectiu d'aquest element és contenir una descripció de l'aplicació. És un camp de lliure contingut.

Un exemple de contingut podria ser:

```
info:
  description: Backend per l'aplicació de la gestió de continguts al CTTI
```

### global-env

En aquest element hi contindrà el llistat de variables globals necessaris per l'execució del job de l'aplicació. Les variables dependrà de de les necessitats de cada projecte, segons:

- **Pel desplegament al Openshift de CPD2, CPD3 i CPD4**
   - **CONTAINER_DOCKERFILE_PATH**: Per indicar-li el nom del Dockerfile que utilitzarà per crear el contenidor que es desplegarà al Openshift
   - **CONTAINER_IMAGE_NAME**: Per indicar-li el nom de la imatge que li assignarà al contenidor que es desplegarà al Openshift
   - **DEPLOYMENT_TYPE**: Per indicar-li el tipus de desplegament al Openshift

- **Pel desplegament a Kubernetes IBMCloud i CaaS**
   - **CONTAINER_DOCKERFILE_PATH**: Per indicar-li el nom del Dockerfile que utilitzarà per crear el contenidor que es desplegarà a Kubernetes
   - **CONTAINER_IMAGE_NAME**: Per indicar-li el nom de la imatge que li assignarà al contenidor que es desplegarà a Kubernetes
   - **DEPLOYMENT_TYPE**: Per indicar-li el tipus de desplegament a Kubernetes

- **Pel desplegament a WebApp Azure**
   - **CONTAINER_DOCKERFILE_PATH**: Per indicar-li el nom del Dockerfile que utilitzarà per crear el contenidor que es desplegarà al WebApp Azure
   - **CONTAINER_IMAGE_NAME**: Per indicar-li el nom de la imatge que li assignarà al contenidor que es desplegarà al WebApp Azure

- **Pel desplegament a SwarmMe**
   - **CONTAINER_DOCKERFILE_PATH**: Per indicar-li el nom del Dockerfile que utilitzarà per crear el contenidor que es desplegarà al SwarmMe
   - **CONTAINER_IMAGE_NAME**: Per indicar-li el nom de la imatge que li assignarà al contenidor que es desplegarà al SwarmMe

- **Pel desplegament al Api Manager**
   - **APIC_PRODUCT_FILE**: Nom del fitxer descriptor pel desplegament de l'aplicació al Api Manager

- **Pel desplegament al CloudFoundry IBMCloud**
   - **CF_BUILDPACK**: BuildPack utilitzat per preparar l'aplicació per ser desplegada al CloudFoundry
   - **CF_PATH**: Ruta de l'entregable a desplegar al CloudFoundry
   
- **Per la publicació de l'artefacte al Nexus**
   - **Maven**
      - **ARTIFACT_PATH**: Ruta al pom amb la definició del artefacte maven a publicar al Nexus. Si es vol publicar l'artefacte del pom pare el valor de la variable és ''
   - **Node**
      - **ARTIFACT_PATH**: Ruta al contingut de l'artefacte node compilat a publicar al Nexus

Exemple de llistat de variables per Openshift:

```
global-env:
  - CONTAINER_DOCKERFILE_PATH: Dockerfile
  - CONTAINER_IMAGE_NAME: petclinic-test-os
  - DEPLOYMENT_TYPE: DeploymentConfig
```

### components[].custom-builder

Element per definir l'informació de com construir el contenidor que serà l'encarregat de construir l'aplicació si l'aplicació no utilitza per a la construcció els contenidors dels builders oferts per SIC ja que té necessitats pròpies.

En aquest element hi contindrà el llistat dels diferents passos (steps) per a contruir el contenidor encarregat de construir l'aplicació.

Per cada pas es podrà definir informació del contenidor (container) i informació de les accions a executar (execution) si és necessari

#### components[].custom-builder.steps[].container

A aquest element hi contindrà informació de com construir la imatge del contenidor que realtizarà la construcció de l'aplicació (custom builder). 

A l'entorn local d'excució (local) informarem:

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

#### Exemple

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

### components[].build

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

#### components[].build.steps[].container

En aquest element hi definirem informació del contenidor encarregat de realitzar la contrucció del projecte amb els elements:

- image: informació de la imatge encarregada de realitzar la construcció del projecte

- resources: recursos necessaris per a que la imatge contrueixi correctament el projecte

L'estructura serà:

```
components:
  - build:
      steps:
        - container:
            image
            resources
```

##### components[].build.steps[].container.image

En aquest element hi definirem informació de la imatge a utilitzar per la construcció del projecte amb els elements:

- remote: Utilitzarem remote si la imatge del contenidor constructor (builder) és un dels oferts pel SIC per la construcció 

- local: Utilitzarem local si es vol utilitzar la imatge del contenidor constructor pròpia (custom builder) creada en el element [components[].custom-builder](#components-custom-builder)

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

###### **components[].build.steps[].container.image.remote**

En aquest element especificarem quina imatge del contenidor constructor (builder) i amb quina versió ofertes pel SIC per la construcció es vol utilitzar. Les imatges ofertes pel SIC estan disponibles al projecte *gencat-sic* del registre Docker privat de la Generalitat de Catalunya:

https://docker-registry.ctti.extranet.gencat.cat/harbor/projects/125/repositories

Per a disposar d’accés a les imatges Docker utilitzades al SIC és necessari contactar amb l’Oficina Tècnica de Canigó a través dels canals establerts: https://canigo.ctti.gencat.cat/sic/suport/. L’Oficina subministrarà al proveïdor d’aplicacions un usuari amb permís de lectura al projecte *gencat-sic* que conté les imatges Docker utilitzades pel SIC.

Podeu accedir al codi font del catàleg d’imatges del SIC, i a la documentació associada, mitjançant el següent enllaç:

https://git.intranet.gencat.cat/0192-intern/docker-images

**TODO**

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

###### **components[].build.steps[].container.image.local**

En aquest element especificarem el nom (name) de la imatge del contenidor constructor pròpia (custom builder) creada en el element [components[].custom-builder](#components-custom-builder)

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

##### components[].build.steps[].container.resources

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

#### components[].build.steps[].execution

En aquest element detallarem el llistat de comandes (commands) que s'han d'executar al contenidor per a construir el projecte. 

Així tindrem l'estructura:

```
components:
    build:
      steps:
        - execution:
            commands
```

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
              limits:
                cpu: 1000m
                memory: 1024Mi
              requests:
                cpu: 100m
                memory: 128Mi
            volumes:
              - "nexus-maven-config": "/home/maven/.m2"
          execution:
            commands:
              - mvn clean package -Dmaven.test.skip=true
```

### components[].deployment

A aquest element hi contindrà informació sobre amb quin repositori de codi font (scm) hi contindrà els descriptors pel desplegament de l'aplicació (yml) al OpenShift i Kubernetes i també hi contindrà el llistat d'entorns a on desplegar l'aplicació (enviroments)

Així tindrem:

```
components:
  - deployment:
      scm
      environments
```     

#### components[].deployment.enviroments[]

Per cada element de la llista hi contindrà informació sobre on (name) i com (actions) es desplegarà l'aplicació. Aquest element es composarà dels elements:

- name: nom de l'entorn a on es desplegarà l'aplicació

- actions: accions a realitzar en el desplegament de l'aplicació: before-deploy, deploy i after-deploy

Tenint l'estructura:

```
components:
  - deployment:
      environments:
        - name
          actions
```

##### components[].deployment.enviroments[].actions.before-deploy

A aquest element hi contindrà informació de les execucions (execution) de cada pas (steps) a realitzar abans de realitzar l'acció de desplegament de l'aplicació. Per cada execució de cada pas hi contindrà les variables d'entorn. Actualment està disponible la possibilitat de cridar a un job d'administració del Openshift de CPD3 abans de realitzar el deploy, informant les següents variables d'entorn:

- **JOB_NAME_PREFIX**: Prefix de l'ubicació del job
- **JOB_IMAGE**: Nom de la imatge a executar al job
- **JOB_WAIT**: Temps d'espera del job
- **JOB_ENVS**: Variables necessaris per l'execució del job

Per aquest element tindrem l'estructura:

```
components:
  - deployment:
      environments:
        - name
          actions:
            before-deploy:
              steps:
                - execution:
                    env
```                    

Un exemple d'utilització d'aquest element seria:

```
components:
  - deployment:
      environments:
        - name: preproduction
          actions:
            before-deploy:
              steps:
                - execution:
                    env:
                      - JOB_NAME_PREFIX: admin
                      - JOB_IMAGE: test-runjob:1.0
                      - JOB_WAIT: 60
                      - JOB_ENVS: TYPE=PREDEPLOY|KONG_ADMIN_URL=http://api-admin|ENDPOINTS=$(cat deploy.json)
```

##### components[].deployment.enviroments[].actions.deploy

A aquest element hi contindrà informació de les execucions (execution) de cada pas (steps) a realitzar pel desplegament de l'aplicació. Per cada execució de cada pas hi contindrà les variables d'entorn, segons:

- **Pel desplegament al Openshift de CPD2, CPD3, CPD4 i Kubernetes IBMCloud i CaaS**
   - **DESCRIPTORS_PATH**: Ruta amb els descriptors (yml) dins del repositori definit al element *scm* de [components[].deployment](#components-deployment) per desplegar l'aplicació al Openshift o a Kubernates
   - **DEPLOYMENT_NAME**: Nom de l'aplicació al Openshift o a Kubernates
   - **DEPLOYMENT_WAIT**: Temps d'espera pel desplegament de l'aplicació al Openshift o a Kubernates

- **Pel desplegament a WebApp Azure**
   - **WEBAPP_NAME**: Nom de l'aplicació al WebApp Azure

- **Pel desplegament a SwarmMe**
   - **SWARMME_SERVICE_NAME**: Nom del servei al SwarmMe
   - **SWARMME_SERVICE_DOMAIN**: Domini del servei al SwarmMe 
   - **SWARMME_SERVICE_PATH**: Path del servei al SwarmMe 
   - **SWARMME_SERVICE_PORT**: Port del servei al SwarmMe 
   - **SWARMME_REPLICAS**: Número de instàncies del servei al SwarmMe 

- **Pel desplegament al Api Manager**
   - **APIC_PLAN_MAP**: Descripció de quin plan utilitzar per desplegar al Api Manager

- **Pel desplegament al CloudFoundry IBMCloud**
   - **CF_NAME**: Nom al CloudFoundry
   - **CF_COMMAND**: Comanda a executar al CloudFoundry
   - **CF_ENV**: Variables necessaris pel desplegament al CloudFoundry
   
 Així tindrem l'estructura:
 
```
components:
  - deployment:
      environments:
        - name: preproduction
          actions:
            deploy:
              steps:
                - execution:
                    env
 ```

Un exemple pel desplegament a l'entorn de Preproducció al Openshift seria:

```
components:
  - deployment:
      scm: git.intranet.gencat.cat/0005/pppAPI.git
      environments:
        - name: preproduction
          actions:
            deploy:
              steps:
                - execution:
                    env:
                      - DESCRIPTORS_PATH: deploys/PRE
                      - DEPLOYMENT_NAME: 7-768-arp-ppp-server-deployment
                      - DEPLOYMENT_WAIT: 60
```

##### components[].deployment.enviroments[].actions.after-deploy

A aquest element hi contindrà informació de les execucions (execution) de cada pas (steps) a realitzar després de realitzar l'acció de desplegament de l'aplicació. Per cada execució de cada pas hi contindrà les variables d'entorn. Actualment està disponible la possibilitat de cridar a un job d'administració del Openshift de CPD3 després de realitzar el deploy, informant les següents variables d'entorn:

- **JOB_NAME_PREFIX**: Prefix de l'ubicació del job
- **JOB_IMAGE**: Nom de la imatge a executar al job
- **JOB_WAIT**: Temps d'espera del job
- **JOB_ENVS**: Variables necessaris per l'execució del job

Per aquest element tindrem l'estructura:

```
components:
  - deployment:
      environments:
        - name
          actions:
            after-deploy:
              steps:
                - execution:
                    env
```                    

Un exemple d'utilització d'aquest element seria:

```
components:
  - deployment:
      environments:
        - name: preproduction
          actions:
            after-deploy:
              steps:
                - execution:
                    env:
                      - JOB_NAME_PREFIX: admin
                      - JOB_IMAGE: test-runjob:1.0
                      - JOB_WAIT: 60
                      - JOB_ENVS: TYPE=POSTDEPLOY|KONG_ADMIN_URL=http://api-admin
```

### notifications

A aquest element contindrà informació de la forma de notificació i on es notificarà les accions manuals en espera i els resultats de les execucions dels jobs de l'aplicació. Actualment la forma de notificació proporcionada és per email. Per la notiticació per email és necessari informar del llistat de destinataris amb l'estructura:

```
notifications:
  email:
    recipients:
      - 
```

Per exemple:

```
notifications:
  email:
    recipients:
      - correu@domini.cat
```

## Exemples

A continuació s'adjunten exemples de casos d'ús:

- [Exemple de fitxer ACA de construcció i desplegament d'aplicació maven al Kubernetes CaaS](/related/sic/3.0/aca_const_despl_maven_kubernetes_caas.yml)
- [Exemple de fitxer ACA de construcció i desplegament d'aplicació maven al SwarmMe](/related/sic/3.0/aca_const_despl_maven_swarmme.yml)
- [Exemple de fitxer ACA de construcció i desplegament d'aplicació maven al CloudFoundry IBMCloud](/related/sic/3.0/aca_const_despl_maven_cloudfoundry_ibmcloud.yml)
- [Exemple de fitxer ACA de construcció i desplegament d'aplicació node al Openshift CPD4](/related/sic/3.0/aca_const_despl_node_openshift_cpd4.yml)
- [Exemple de fitxer ACA de construcció i desplegament d'aplicació maven amb before-deploy i post-deploy al Openshift CPD3](/related/sic/3.0/aca_const_despl_before_after_deploy_maven_openshift_cpd3.yml)
- [Exemple de fitxer ACA de desplegament d'aplicació a partir d'un contenidor creada la imatge des de Dockerfile al Openshift CPD2](/related/sic/3.0/aca_const_dockerfile_despl_openshift_cpd2.yml)
- [Exemple de fitxer ACA de desplegament d'aplicació a partir d'un contenidor creada la imatge des de Dockerfile al WebApp Azure](/related/sic/3.0/aca_const_dockerfile_despl_webapp_azure.yml)
- [Exemple de fitxer ACA de construcció utilitzant un custom builder i desplegament d'aplicació PHP al Openshift CPD4](/related/sic/3.0/aca_const_custom_builder_despl_php_openshift_cpd4.yml)
- [Exemple de fitxer ACA de construcció utilitzant un custom builder i desplegament d'aplicació maven al Kubernetes IBMCloud](/related/sic/3.0/aca_const_custom_builder_despl_maven_kubernetes_ibmcloud.yml)
- [Exemple de fitxer ACA de desplegament d'aplicació al Api Manager](/related/sic/3.0/aca_despl_api_manager.yml)
- [Exemple de fitxer ACA de construcció i publicació al Nexus de llibreria maven](/related/sic/3.0/aca_const_publi_nexus_maven_lib.yml)
- [Exemple de fitxer ACA de construcció i publicació al Nexus de llibreria node](/related/sic/3.0/aca_const_publi_nexus_node_lib.yml)

<br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/sic30-faq) i utilitzeu el canal de [**Suport**] (/sic/sic30-suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.