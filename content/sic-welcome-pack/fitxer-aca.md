+++
date = "2020-03-02"
title = "Com construir el fitxer ACA"
description = "Guia amb la informació de construcció del fitxer ACA per a l'Autoservei de pipelines"
aliases = [
    "/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA/"
]
sections = "SIC"
toc = true
taxonomies = []
weight = 3
+++

## Introducció

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual, amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i
sense la intervenció de l'equip del SIC, es poden **construir automàticament pipelines de construcció i desplegament d'aplicacions**.

Si vol més informació sobre el funcionament d'aquest servei, els requeriments que cal acomplir i altres, podeu consultar la secció
[Autoservei de pipelines](/sic-serveis/autoservei-pipelines/) on s'explica de forma detallada.

En aquest article ens centrarem en explicar com preparar l’arxiu ACA (Arxiu de Configuració d'Aplicacions).

## Configuració de l'Arxiu de Configuració d'Aplicació (ACA)

El proveïdor d’aplicacions haurà de configurar aquest arxiu `/sic/aca.yml` dins del repositori del projecte.
Es tracta d’un arxiu de text en format YAML en el que a continuació definirem la informació que cal configurar.

### Versió

Caldrà indicar la versió de l'ACA, que segueix un versionatge diferent al de l'aplicació. En aquest cas, cada increment de versió es correspon amb **canvis en les especificacions de construcció i/o desplegament**. El seu valor ha de seguir el format `<versioMajor>.<versioMenor>.<pegat>`.

```
version: X.Y.Z
```

### Paràmetres

Caldrà indicar els paràmetres (són opcionals, per lo que pot tractar-se d'una llista de 0 elements). Els paràmetres s'utilitzen per aplicar substitucions, de forma que on aparegui `${nom_param}` s'aplicarà el valor `valor_param`. Són útils per dotar de més llegibilitat a l’arxiu de configuració.

```
parameters:
  - name: nom_param1
    value: valor_param1
  - name: nom_param2
    value: valor_param2
```

Exemple d’utilització:

```
build:
  steps:
    - id: step01
      position: 1
      tool: maven_3.2.2
	jdk: JDK 1.8
      parameters: ${nom_param1}
```

### Recursos

Caldrà definir els recursos dins l'entitat `resources`. Hi ha tres tipus de recursos:

* Entorns (`environments`)
* Infraestructures (`infrastructures`)
* Artefactes (`artifacts`)

#### Entorns

Es tracta de definir els entorns de desplegament, incloent el seu ordre i la modalitat de desplegament aplicada:

```
resources:
  environments:
    - id: int
      environment: int
      position: 1
      deploymentType: AUTOMATIC
    - id: pre
      environment: pre
      position: 2
      deploymentType: SEMIAUTOMATIC
    - id: pro
      environment: pro
      position: 3
      deploymentType: SEMIAUTOMATIC
```

#### Infraestructures

Caldrà relacionar les denominacions d'infraestructures indicades pel proveïdor: tipus `element`, entorns `environments` i identificador del proveïdor `provider`.

<div class="message information">
La modalitat de desplegament SEMIAUTOMATIC realitza el lliurament d’artefactes mitjançant el Servei de Binaris. Per tant, <b>no serà necessari preparar l’arxiu ACI ni definir el detall d’infraestructures</b> a no ser que es defineixi un desplegament AUTOMATIC o AUTOMATIC_CPD.</div>


```
resources:
  (...)
  infrastructures:
    - id: 9999_apache
      element: apache
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
    - id: 9999_tomcat
      element: tomcat
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
```

Si cal definir variables d’entorn requerides a nivell d’infraestructures, caldrà emplenar la secció `vars`:

```
resources:
  (...)
  infrastructures:
    - id: 9999_tomcat
      element: tomcat
      environments:
        - environment: int
          vars:
            - name: ironportURL
            - value: integracio.stmp.intranet.gencat.cat
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
```


<div class="message information">
En cas de desplegament AUTOMATIC, l’<b>identificador a indicar NO és arbitrari</b>, l’ha de facilitar el proveïdor d’infraestructures ja que, com es veurà més endavant, aquest identificador definirà la infraestructura definida a l’arxiu ACI sobre la que desplegar. No és necessari que el proveïdor d’aplicacions conegui el detall de les infraestructures de la seva aplicació. Només cal que li assigni l’identificador que se li indiqui, juntament amb el tipus de plataforma i els entorns. </div>


La propietat `element` suporta el següent conjunt de valors:
|Servidors web|
|-------|
|apache|
|nginx|

|Servidors d’aplicacions|
|-------|
|tomcat|
|weblogic|
|websphere|
|jboss|
|iis|

|Servidors de fitxers|
|-------|
|sftp|

|Servidors de base de dades|
|-------|
|oracle|
|mysql|
|sqlserver|
|mongodb|
|postgresql|

De igual manera, la propietat `provider` suporta el següent conjunt de valors:

|Proveïdor|
|-------|
|cpd1|
|cpd2|
|cpd3-nex|
|cpd3-mc|
|cpd4|

Recordem que la llista d’infraestructures pot estar buida si tots els entorns són de tipus SEMIAUTOMATIC.

#### Artefactes

L’últim element de la secció és la definició de quins artefactes genera el procés de construcció i on es troben ubicats.

```
resources:
  (...)
  artifacts:
    - id: artifact01
      artifactType: static
      path: target/nom_artefacte01.zip
    - id: artifact02
      artifactType: dynamic
      path: target/nom_artefacte02.war
```

En aquest cas l’**identificador sí que és arbitrari però és el literal que s’haurà d’utilitzar per a referenciar l’artefacte** en la definició del procés de desplegament.

la propietat `artifactType` suporta el següent conjunt de valors:

|Tipus d’artefacte|
|-------|
|static|
|dynamic|
|plans|


En el cas de desplegaments de bases de dades, cal fer referència a l’ **arxiu de plans en format XML**.

```
resources:
  (...)
  artifacts:
    - id: artifact03
      artyfactType: plans
      path: sql/plans.xml

```

<div class="message information">
En aquest cas, serà necessari que l’<b>identificador de BBDD definit dins l’arxiu XML de plans coincideixi amb l’identificador de BBDD definit al fitxer ACI</b>. Per lo que caldrà coordinar-ho amb el proveïdor d’infraestructures i assignar l’identificador acordat. </div>

### Procés de construcció

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `steps de build`. La definició es basa en una sèrie d’eines anomenades `tools` predefinides. A més, els atributs dels passos de construcció varien en funció del seu tipus.

Es contemplen els següents tipus de construcció:

* Node (npm, gulp, bower i grunt)
* Java (maven i ant)
* .Net (msbuild)
* Hugo
* Altres comandes (zip, unzip)

Cada pas de construcció té un identificador, una posició (odre), una eina de construcció i la llista d’artefactes que genera. Aquesta secció `generates` inclou la relació d'artefactes generats i han de correspondre’s amb els declarats a la secció `resources.artifacts`.

<div class="message information">
En cas de requerir executar les passes de construcció des d’un directori específic caldrà definir la ubicació mitjançant la propietat `executionDir`.</div>


```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.2.2
      Jdk_ JDK 1.8
      parameters: clean package -Dmaven.test.skip=true
      jdk: JDK 1.8
      executionDir: dir_n1/dir_n2
      generates:
        - artifact01
```


A continuació s’explica l’ús dels diferents tipus d’eines previstes.


#### Node
Caldrà seleccionar la versió a utilitzar de l’eina i, opcionalment, l’eina a utilitzar (per defecte `npm`). No caldrà indicar la comanda `npm ` en els paràmetres d’execució.

|Eines predefinides|
|-------|
|nodejs_6_LTS|
|nodejs_8_LTS|
|nodejs_10_LTS|

```
build:
  steps:
    - id: bs001
      position: 1
      tool: nodejs_10_LTS
      parameters: install --scripts-prepend-node-path true
    - id: bs002
      position: 2
      tool: nodejs_10_LTS
      parameters: run-script build --scripts-prepend-node-path true
      generates:
        - artifact01
```

Dins d’aquesta tecnologia, les altres eines suportades són:
|Mòduls|
|-------|
|npm|
|gulp|
|grunt|
|bower|


En cal de requerir fer ús d’aquestes eines, caldrà especificar la propietat `module`:
```
build:
  steps:
    - id: bs001
      position: 1
      tool: nodejs_10_LTS
 	module: npm
      parameters: install --scripts-prepend-node-path true
    - id: bs002
      position: 2
      tool: nodejs_10_LTS
	module: bower
      parameters: install
    - id: bs003
      position: 3
      tool: nodejs_10_LTS
	module: gulp
      parameters: build
      generates:
        - artifact01
```

#### Java
Caldrà seleccionar la versió a utilitzar de l’eina i la versió de Java. No caldrà indicar la comanda `maven` o `ant` en els paràmetres d’execució.


|Eines predefinides|
|-------|
|ant_1.8.2|
|ant_1.9.6|
|maven_2.0.10|
|maven_2.2.1|
|maven_3.2.2|
|maven_3.3.9|


|Versions JDK|
|-------|
|JDK 1.5|
|JDK 1.6|
|JDK 1.7|
|JDK 1.8|


```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.2.2
      jdk: JDK 1.8
      parameters: clean package -Dmaven.test.skip=true
      generates:
        - artifact01
        - artifact02
```

#### .Net
Caldrà seleccionar la versió a utilitzar de l’eina i definir i no caldrà indicar la comanda `msbuild` en els paràmetres d’execució.


|Eines predefinides|
|-------|
|MSBuild_4|
|MSBuild_14|
|MSBuild_15|

```
build:
  steps:
    - id: bs001
      position: 1
      tool: MSBuild_15
      slnPath: app.sln
      buildTargetName: Build
      buildParameters: app.proj
      generates:
        - artifact01
```

#### Hugo (sites estàtiques)
Caldrà seleccionar el `pathOrig` i `pathDesti`, que es correspondran amb els directoris on es troben els components i on es deixarà l’artefacte comprimit generat (respectivament).


```
build:
  steps:
    - id: bs001
      position: 1
      tool: hugo
      pathOrig: .
      pathDest: ./hugoGeneratedSite
      parameters: "’’"
      generates:
        - artifact01
```

#### Altres comandes (zip, unzip)

Es dona la opció d’executar certes comandes, principalment per a empaquetar (zip) o desempaquetar (unzip) informació.

```
build:
  steps:
    - id: bs001
      position: 1
      tool: command
      executionDir: dist
      parameters: zip -r artefacte.zip
      generates:
        - artifact01
```


#### Procés de desplegament

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `steps de deploy`. La definició es basa en una sèrie de tipologies anomenades `type` predefinides.

Es contemplen els següents tipus de desplegament:

* Predefinit (`predefined`): pas de desplegament en el que se li indica l’artefacte a desplegar i la infraestructura destí.

```
- id: dp001
  position: 1
  type: predefined
  destination: 9999_tomcat
  artifact: artifact01
```

* Manual (`manual`): pas de desplegament pensat per a quan dins el procés de desplegament es requereixen accions manuals per part dels tècnics de CPD. Es tradueix, per tant, en una pausa a la pipeline, que es quedarà a l’espera de confirmació per a continuar endavant.

```
- id: dp001
  position: 1
  type: manual
```

* Personalitzat (`custom`): pas de desplegament a utilitzar quan es necessita executar comandes no contemplades en els tipus predefinits. Permet doncs l’execució de comandes Bourne Shell (sh) per tal que es pugui realitzar qualsevol tipus d’operació.

```
- id: dp001
  position: 1
  type: custom
  command: zip -r app.zip dist/

```

#### Notificacions

Finalment, caldrà indicar les adreces de correu electrònic on notificar accions manuals en espera i els resultats de l’execució:

```
notificationRecipients:
    - usuari1@domini
    - usuari2@domini
```

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [**Suport**] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.