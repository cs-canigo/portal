+++
date = "2021-09-09"
title = "Com construir el fitxer ACA"
description = "Guia per a la preparació del fitxer ACA del projecte per a l’ús de l'Autoservei de Pipelines"
sections = "SIC"
toc = true
taxonomies = []
weight = 3
+++

## Introducció

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual es poden **generar automàticament
pipelines de construcció i desplegament d'aplicacions**,
amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC.

En aquest article **ens centrarem exclusivament en explicar com preparar l’arxiu ACA (Arxiu de Configuració d'Aplicacions)**.
Si voleu més informació sobre el funcionament d'aquest servei, els requeriments que cal acomplir i altres, podeu consultar
la secció
[**Autoservei de pipelines**](/sic30-serveis/autoservei-pipelines/) on s'explica de forma detallada.

## Format i ubicació

El proveïdor d’aplicacions haurà de configurar l'arxiu `/sic/aca.yml` dins del repositori del projecte (al primer nivell
de carpeta).
Es tracta d’un arxiu de text en **format YAML** en el que cal indicar tota la informació necessària per a la construcció i
desplegament de l’aplicació o component.

## Configuració

L'arxiu ha de tenir la següent **estructura general**:

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

### version

Caldrà indicar la versió de l’arxiu ACA. Aquesta versió segueix un versionat diferent del de l’aplicació o component, ja que
cada increment de versió es correspondrà amb canvis en les especificacions de construcció i/o desplegament. El seu valor ha
de seguir el format estàndard: `<versioMajor>.<versioMenor>.<pegat>`. La versió actual és:

```
version: 2.0.0
```

### info

Aquest element contindrà informació general del component:

```
info:
  version
  description
```

#### info.version

Versió funcional de l’aplicació o component que ha d’acomplir l’[Estàndard de versions](https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari).
Per exemple:

```
info:
  version: 1.0.0
```

#### info.description

Descripció de l'aplicació o component. Es tracta d’un camp de lliure contingut. Per exemple:

```
info:
  description: Backend de l'aplicació de Gestió de Continguts CTTI
```

### global-env

Relació de variables globals necessàries per a l’execució de la pipeline. Les variables requerides en cada cas
dependran de les necessitats de desplegament aplicant els següents criteris:

#### Per al **desplegament a l'Openshift**:

|Variable|Valor|
|-------|-------|
|CONTAINER_DOCKERFILE_PATH|Ruta i nom del Dockerfile que s’utilitzarà per a crear el contenidor de l'aplicació a desplegar a Openshift|
|CONTAINER_IMAGE_NAME|Nom de la imatge que se li assignarà al contenidor que es desplegarà a Openshift|
|DEPLOYMENT_TYPE|Tipus de desplegament a Openshift. Possibles valors: **DeploymentConfig**, **Deployment** i **StatefulSet**|


#### Per al **desplegament a Kubernetes IBMCloud i CaaS**:

|Variable|Valor|
|-------|-------|
|CONTAINER_DOCKERFILE_PATH|Ruta i nom del Dockerfile que s’utilitzarà per a crear el contenidor de l'aplicació a desplegar a Kubernetes|
|CONTAINER_IMAGE_NAME|Nom de la imatge que se li assignarà al contenidor que es desplegarà a Kubernetes|
|DEPLOYMENT_TYPE|Tipus de desplegament a Kubernetes. Possibles valors: **Deployment** i **StatefulSet**|


#### Per al **desplegament a WebApp Azure**:

|Variable|Valor|
|-------|-------|
|CONTAINER_DOCKERFILE_PATH|Ruta i nom del Dockerfile que s’utilitzarà per a crear el contenidor de l'aplicació a desplegar a WebApp Azure|
|CONTAINER_IMAGE_NAME|Nom de la imatge que se li assignarà al contenidor que es desplegarà a WebApp Azure|


#### Per al **desplegament a SwarmMe**:

|Variable|Valor|
|-------|-------|
|CONTAINER_DOCKERFILE_PATH|Ruta i nom del Dockerfile que s’utilitzarà per a crear el contenidor de l'aplicació a desplegar a SwarmMe|
|CONTAINER_IMAGE_NAME|Nom de la imatge que se li assignarà al contenidor que es desplegarà a SwarmMe|


#### Per al **desplegament a l’Api Manager**:

|Variable|Valor|
|-------|-------|
|APIC_PRODUCT_FILE|Ruta i nom del fitxer descriptor per al desplegament de l'aplicació a l’Api Manager|


#### Per al **desplegament al CloudFoundry IBMCloud**:

|Variable|Valor|
|-------|-------|
|CF_BUILDPACK|BuildPack utilitzat per a preparar l'aplicació per a ser desplegada al CloudFoundry. Consultar a Suport Cloud els buildpacks disponibles a la llista d'elements del [Catàleg xPaaS](https://canigo.ctti.gencat.cat/cloud-xpaas/cataleg-xpaas/)|
|CF_PATH|Path de l'artefacte a desplegar al CloudFoundry|


#### Per a la **publicació de llibreries** al repositori:

|Variable|Valor|
|-------|-------|
|PUBLISH_PARAMS|Paràmetres necessaris per a la publicació de llibreries. El valor dependrà de la tecnologia de construcció|

On:

- En el cas de **Maven** s’executarà la comanda ```mvn deploy ${PUBLISH_PARAMS}``` per la qual cosa haurem d’indicar la ruta
del fitxer `pom.xml`. Per exemple: ```PUBLISH_PARAMS: -f ./pom.xml```.

- En el cas de **Npm** s’executarà la comanda ```npm publish ${PUBLISH_PARAMS}``` per la qual cosa haurem d’indicar la ruta
de la llibreria. Per exemple: ```PUBLISH_PARAMS: dist/lib```.


En qualsevol dels casos, es podran indicar paràmetres addicionals per a cada cas particular. La informació interna s’afegirà
automàticament a la comanda.

#### Exemple

Exemple de definició de variables per al desplegament a Openshift:

```
global-env:
  - CONTAINER_DOCKERFILE_PATH: Dockerfile
  - CONTAINER_IMAGE_NAME: petclinic-test-os
  - DEPLOYMENT_TYPE: DeploymentConfig
```

### components[].custom-builder

Informació per a generar el contenidor que serà l'encarregat de construir l'aplicació o component. **Només caldrà indicar
aquesta secció en cas que l’aplicació o component no pugui fer ús del** [**Catàleg d’imatges**](/sic30-serveis/cataleg-imatges/)
perquè disposa de requeriments propis.
En aquest cas, l’element indicarà els diferents passos (`steps`) per a generar el contenidor, proporcionant informació sobre
aquest (`container`) i les accions a executar (`execution`). Les imatges podran estendre del Catàleg d’imatges corporatiu.

#### components[].custom-builder.steps[].container

Informació per a construir la imatge del contenidor que s’encarregarà de la construcció de l'aplicació o component (`custom builder`).
Caldrà afegir l’element local (`local`) indicant:

- `name`: nom que es desitja assignar a la imatge del contenidor

- `path`: ruta del Dockerfile de la imatge del contenidor

Per exemple:
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

El nom de la imatge (`name`) serà referenciada des de la secció de construcció (`build`).

### components[].build

Relació de passes (`steps`) per a la construcció del projecte segons la següent estructura:

```
components:
  - build:
      steps:
        - container
          execution
```

On:

- `container`: informació del contenidor encarregat de realitzar la construcció del projecte

- `execution`: informació de les comandes que cal executar per a la construcció del projecte


#### components[].build.steps[].container

Informació del contenidor encarregat de realitzar la construcció del projecte segons la següent estructura:

```
components:
  - build:
      steps:
        - container:
            image
            resources
```

On:

- `image`: informació de la imatge encarregada de realitzar la construcció del projecte

- `resources`: recursos a assignar per a la correcta construcció del projecte (CPU i memòria)


##### components[].build.steps[].container.image
Informació de la imatge a utilitzar per a la construcció del projecte segons la següent estructura.

```
components:
  - build:
      steps:
        - container:
            image:
              remote/local
```

La imatge pot ser de dos tipus:

- `remote`: si la imatge del contenidor constructor (`builder`) és una de les imatges proporcionades al
[Catàleg d’imatges corporatiu](/sic30-serveis/cataleg-imatges/).

- `local`: si la imatge del contenidor constructor és pròpia (`custom builder`) creada en l’element
[`components[].custom-builder`](#components-custom-builder).


**components[].build.steps[].container.image.remote**

Imatge i versió del contenidor constructor (`builder`) que cal utilitzar d’entre les disponibles al
[**Catàleg d’imatges corporatiu**](/sic30-serveis/cataleg-imatges/).

Caldrà definir el nom de la imatge (`name`) segons la següent estructura:

```
components:
  - build:
      steps:
        - container:
            image:
              remote:
                name
```

**components[].build.steps[].container.image.local**

Imatge del contenidor constructor pròpia (custom builder) creada en l’element [components[].custom-builder](#components-custom-builder).
Caldrà definir el nom de la imatge (`name`) segons la següent estructura:

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

Recursos de màquina necessaris per a que el contenidor pugui dur a terme la construcció del projecte. Es definiran els
recursos de CPU i memòria del contenidor, tant de `limits` (recursos màxims) com de `request` (recursos mínims), segons
la següent estructura:

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

On:

- `cpu`: recursos de CPU mesurats en *unitats de CPU*. 1 CPU equival a 1 vCPU/Core per a plataformes cloud i 1 hyperthread
a plataformes on premise. Es permeten sol·licituds fraccionades, per tant, si especifiquem 0.5 equival a la meitat de CPU que un que demana 1 CPU. L'expressió 0.1 equival a l'expressió 100m, que es pot llegir com "cent milicpus" o com a “cent milicores”. Es recomana utilitzar la unitat "milicore" tenint en compte que no es permet una precisió major que 1m.

- `memory`: recursos de memòria mesurats en bytes. Podeu expressar la memòria amb un nombre sencer o com un nombre decimal
fent ús d’aquests prefixos: G o M, o també podeu usar els equivalents en potencia de dos: Gi o Mi. Es recomana utilitzar la unitat "Mi".

<div class="message information">
Cal tenir present que hi ha un màxim de recursos permesos, de tal manera que si se superen es produiran erros en l’execució.
Els valors màxims establerts són: <b>3072Mi</b> de memòria i <b>3000m</b> de CPU.
</div>

Per a més informació sobre l’administració de recursos: https://kubernetes.io/es/docs/concepts/configuration/manage-resources-containers/.
</br></br>


#### components[].build.steps[].execution

Relació de comandes (`commands`) que s'han d'executar al contenidor per a la construcció del projecte segons la següent estructura:

```
components:
    build:
      steps:
        - execution:
            commands
```

#### Exemple

Exemple de construcció d'una aplicació Maven 3.6 i Jdk 1.8:

```
components:
  - build:
      steps:
        - container:
            image:
              remote:
                name: docker-registry.ctti.extranet.gencat.cat/gencat-sic-builders/mvn-builder:1.0-3.6-8
            resources:
              limits:
                cpu: 1000m
                memory: 1024Mi
              requests:
                cpu: 100m
                memory: 128Mi
          execution:
            commands:
              - mvn clean package -Dmaven.test.skip=true
```

### components[].deployment

Informació sobre el repositori de codi font que conté els descriptors en format YML per al desplegament de l'aplicació a
l'OpenShift i Kubernetes, així com la relació d’entorns on es desplegarà l’aplicació (`enviroments`) segons la següent estructura:

```
components:
  - deployment:
      scm
      environments
```

On `scm` indica el repositori on es troben ubicats els orquestradors per a dur a terme el desplegament de l'aplicació.

#### components[].deployment.enviroments[]

Informació sobre els entorns (`name`) i de quina manera es desplegarà l’aplicació (`actions`) segons la següent estructura:

```
components:
  - deployment:
      environments:
        - name
          actions
```

On:

- `name`: nom de l'entorn on es desplegarà l'aplicació

- `actions`: accions a realitzar per al desplegament de l'aplicació diferenciant entre: `before-deploy`, `deploy` i `after-deploy`

##### components[].deployment.enviroments[].actions.before-deploy

Informació sobre el possible pas previ al desplegament `before-deploy` concebut per a poder dur a terme tasques que
calgui executar abans del desplegament com, per exemple, modificar l'estat d'un API Gateway. Aquest pas és **compatible
únicament amb plataformes Openshift i Kubernetes** segons la següent estructura:

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

On caldrà indicar el detall de les execucions (`execution`) de cada pas (`steps`) a realitzar indicant les següents
variables d’entorn:

|Variable|Valor|
|-------|-------|
|JOB_NAME_PREFIX|Prefix que se li assignarà a la tasca|
|JOB_IMAGE|Nom de la imatge a utilitzar|
|JOB_WAIT|Temps d'espera de la tasca|
|JOB_ENVS|Variables d’entorn necessàries|

Per exemple:

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

Informació sobre el desplegament de l’aplicació `deploy` segons la següent estructura:

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

On caldrà indicar el detall de les execucions (`execution`) de cada pas (`steps`) a realitzar indicant les variables
requerides en cada cas i que dependran de les necessitats de desplegament aplicant els següents criteris:


###### Per al **desplegament a l’Openshift i Kubernetes IBMCloud i CaaS**

|Variable|Valor|
|-------|-------|
|DESCRIPTORS_PATH|Ruta amb els descriptors en format YML dins el repositori definit a l’element *scm* de [components[].deployment](#components-deployment) per a desplegar l'aplicació a l’Openshift o Kubernetes|
|DEPLOYMENT_NAME|Nom de l'aplicació a l’Openshift o Kubernetes|
|DEPLOYMENT_WAIT|Temps d'espera per al desplegament de l'aplicació a l’Openshift o Kubernetes|


###### Per al **desplegament a WebApp Azure**

|Variable|Valor|
|-------|-------|
|WEBAPP_NAME|Nom de l'aplicació al WebApp Azure|


###### Per al **desplegament a SwarmMe**

|Variable|Valor|
|-------|-------|
|SWARMME_SERVICE_NAME|Nom del servei al SwarmMe|
|SWARMME_SERVICE_DOMAIN|Domini del servei al SwarmMe|
|SWARMME_SERVICE_PATH|Ruta del servei al SwarmMe|
|SWARMME_SERVICE_PORT|Port del servei al SwarmMe|
|SWARMME_REPLICAS|Nombre d’instàncies del servei al SwarmMe|
|EXTRA_PARAMS|Paràmetres addicionals associats al desplegament. Consultar a Suport Cloud|


###### Per al **desplegament a l’Api Manager**

|Variable|Valor|
|-------|-------|
|APIC_PLAN_MAP|Descripció del pla a utilitzar per al desplegament a l’Api Manager. Consultar a Suport Cloud|


###### Per al **desplegament al CloudFoundry IBMCloud**

|Variable|Valor|
|-------|-------|
|CF_NAME|Nom al CloudFoundry|
|CF_COMMAND|Comanda a executar al CloudFoundry|
|CF_ENV|Variables necessàries per a la correcta execució de l'aplicació, separades per "|". Consultar a Suport Cloud|


###### Per al **desplegament On Premise**

|Variable|Requerit|Descripció|Exemple|
|--------|--------|----------|-------|
|ARTIFACT_PATH|Sí|Rutes dels artefactes a desplegar separats per ","|tmpBBDD,target|
|ARTIFACT_NAME|Sí|Noms dels artefactes a desplegar separats per ","|bbdd_PRO.zip,app-dynamic.ear|
|ARTIFACT_TYPE|Únicament per al **desplegament delegat**|Tipus dels artefactes a desplegar separats per ",". Possibles valors: **ddbb**, **dynamic** o **static**|ddbb,dynamic|
|INFRASTRUCTURE_ID|Únicament per al **desplegament delegat**|Identificadors d’infraestructura proporcionats per Cpd separats per ","|id_cpdx_ddbb,id_cpdx_dynamic|
|PLANS_PATH|Únicament per al **desplegament d'scripts de Base de dades**|Ruta del fitxer de plans d'execució d'scripts de Base de Dades|sql_scripts|
|PLANS_NAME|Únicament per al **desplegament d'scripts de Base de dades**|Nom del fitxer de plans d'execució d'scripts de Base de Dades|plans.xml|

###### Per exemple, per al desplegament a l'entorn de Preproducció a l’Openshift:

```
components:
  - deployment:
      scm: git.intranet.gencat.cat/0192/orchestrators.git
      environments:
        - name: preproduction
          actions:
            deploy:
              steps:
                - execution:
                    env:
                      - DESCRIPTORS_PATH: deploys/PRE
                      - DEPLOYMENT_NAME: backend-deployment
                      - DEPLOYMENT_WAIT: 60
```

##### components[].deployment.enviroments[].actions.after-deploy

Informació sobre el possible pas posterior al desplegament `after-deploy` concebut per a poder dur a terme tasques que
calgui executar després del desplegament com, per exemple, modificar l'estat d'un API Gateway. Aquest pas és **compatible
únicament amb plataformes Openshift i Kubernetes** segons la següent estructura:

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

On caldrà indicar el detall de les execucions (`execution`) de cada pas (`steps`) a realitzar indicant les següents
variables d’entorn:

|Variable|Valor|
|-------|-------|
|JOB_NAME_PREFIX|Prefix que se li assignarà a la tasca|
|JOB_IMAGE|Nom de la imatge a utilitzar|
|JOB_WAIT|Temps d'espera de la tasca|
|JOB_ENVS|Variables d’entorn necessàries|


Per exemple:

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

Informació sobre el canal de notificació i destinataris davant accions manuals en espera i informació sobre resultats
de les execucions. Actualment, el canal de notificació és mitjançant el correu electrònic, essent necessari indicar la
relació de destinataris segons la següent estructura:

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

## Validació
Està previst implementar un sistema de validació que comprovi el format, el contingut i les referències del fitxer
en fer la pujada al Sistema de Custòdia de Codi.
Fins aleshores, recomanem fer una validació mínima del fitxer utilitzant eines online de validació disponibles
com [**YAML Validator**](http://www.yamllint.com/).


## Exemples

A continuació s'adjunten exemples dels diferents casos d’ús:

- [Construcció aplicació Maven i desplegament al Kubernetes CaaS](/related/sic/3.0/aca_const_despl_maven_kubernetes_caas.yml)

- [Construcció aplicació Maven i desplegament al SwarmMe](/related/sic/3.0/aca_const_despl_maven_swarmme.yml)

- [Construcció aplicació Maven i desplegament al CloudFoundry IBMCloud](/related/sic/3.0/aca_const_despl_maven_cloudfoundry_ibmcloud.yml)

- [Construcció aplicació Node i desplegament a l’Openshift de Cpd4 o Cpd2](/related/sic/3.0/aca_const_despl_node_openshift_cpd4_cpd2.yml)

- [Construcció aplicació Maven amb passes before/post-deploy i desplegament a l’Openshift de Cpd3](/related/sic/3.0/aca_const_despl_before_after_deploy_maven_openshift_cpd3.yml)

- [Desplegament aplicació mitjançant contenidor creat a partir de DockerFile i desplegament a l’Openshift de Cpd2](/related/sic/3.0/aca_const_dockerfile_despl_openshift_cpd2.yml)

- [Desplegament aplicació mitjançant contenidor creat a partir de Dockerfile i desplegament al WebApp Azure](/related/sic/3.0/aca_const_dockerfile_despl_webapp_azure.yml)

- [Construcció aplicació PHP utilitzant imatge “custom Builder” i desplegament a l’Openshift Cpd4](/related/sic/3.0/aca_const_custom_builder_despl_php_openshift_cpd4.yml)

- [Construcció aplicació Maven utilitzant imatge “custom Builder” i desplegament al Kubernetes IBMCloud](/related/sic/3.0/aca_const_custom_builder_despl_maven_kubernetes_ibmcloud.yml)

- [Construcció aplicació bbdd/Maven i desplegament On Premise](/related/sic/3.0/aca_const_despl_bbdd_maven_onpremise.yml)

- [Aplicació a desplegar a l’Api Manager](/related/sic/3.0/aca_despl_api_manager.yml)

- [Construcció i publicació de llibreria Maven al Nexus](/related/sic/3.0/aca_const_publi_nexus_maven_lib.yml)

- [Construcció i publicació de llibreria Node al Nexus](/related/sic/3.0/aca_const_publi_nexus_node_lib.yml)


<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/sic30-guies/).

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).