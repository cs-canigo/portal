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

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual es poden **generar automàticament pipelines de construcció i desplegament d'aplicacions**,
amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC.

En aquest article **ens centrarem exclusivament en explicar com preparar l’arxiu ACA (Arxiu de Configuració d'Aplicacions)**.
Si voleu més informació sobre el funcionament d'aquest servei, els requeriments que cal acomplir i altres, podeu consultar la secció
[**Autoservei de pipelines**](/sic-serveis/autoservei-pipelines/) on s'explica de forma detallada.

## Configuració

El proveïdor d’aplicacions haurà de configurar l'arxiu `/sic/aca.yml` dins del repositori del projecte (a nivell de carpeta del projecte).
Es tracta d’un arxiu de text en **format YAML** en el que a continuació definirem la informació que cal emplenar.

### Versió

Caldrà indicar la versió de l'arxiu que, per tant, segueix un versionatge diferent al de l'aplicació ja que cada increment de versió es correspondrà amb **canvis en
les especificacions de construcció i/o desplegament**. El seu valor ha de seguir el format estàndar: `<versioMajor>.<versioMenor>.<pegat>`.

```
version: x.y.z
```

### Paràmetres

Opcionalment es poden definir paràmetres que permeten aplicar substitucions, de forma que allà on aparegui `${nom_param}` se substituirà pel valor `valor_param`.
Són útils per a dotar de més llegibilitat a l’arxiu de configuració i encapçular dades repetibles.

```
parameters:
  - name: nom_param1
    value: valor_param1
  - name: nom_param2
    value: valor_param2
```

Exemple per a fer-ne referència:

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

<div class="message information">
Recordem breument el funcionament de les diferents modalitats: </br>
- <b>Semiautomàtica</b>: es construeixen els artefactes i es lliuren a través del servei de gestió de binaris per a que CPD/LdT.</br>
- <b>Automàtica</b>: es construeixen els artefactes i es despleguen al servidors web, servidors d’aplicacions i servidors de bases de dades.</br>
- <b>Automàtica per CPD</b>: com l'automàtica però és CPD qui s’encarrega de donar conformitat i continuïtat a les etapes de desplegament. </div>

</br>
#### Infraestructures

Es relacionaran les denominacions d'infraestructures indicades pel proveïdor:

* Element o tipologia (`element`)
* Entorns (`environments`)
* Identificador del proveïdor (`provider`)

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

Només si cal enviar **variables d’entorn requerides per al desplegament** a les infraestructures, s'haurà d'emplenar la secció `vars`:

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
En el desplegament <b>AUTOMATIC</b> cal indicar un atribut "id" que no és arbitrari, en aquest cas, doncs l’ha de facilitar el proveïdor d’infraestructures. Com es veurà més
endavant, aquest identificador definirà la infraestructura definida a l’arxiu ACI sobre la que desplegar. No és necessari que el proveïdor d’aplicacions conegui
el detall de les infraestructures, només cal conegui aquest identificador.
Per la modalitat de desplegament <b>SEMIAUTOMATIC</b> no serà necessari preparar l’arxiu ACI ni definir el detall d’infraestructures.</div>

La propietat `element` suporta el següent conjunt de tipus de servidors:

|Servidors web|Servidors d’aplicacions|Servidors de fitxers|Servidors de base de dades|Repositori de llibreries|
|-------|-------|-------|-------|-------|
|apache|tomcat|sftp|oracle|nexus|
|nginx|weblogic||mysql||
||websphere||sqlserver||
||jboss||mongodb||
||iis||postgresql||

La propietat `provider` suporta el següent conjunt de valors:

|Proveïdor|
|-------|
|cpd1|
|cpd2|
|cpd3-nex|
|cpd3-mc|
|cpd4|

</br>
#### Artefactes

El darrer element de la secció és centra en la definició de quins artefactes genera el procés de construcció i on s'ubicaran aquests.

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

En aquest cas, la propietat `id` simplement s'utilitzarà **per a referenciar l’artefacte** en la definició dels passos de desplegament.
La propietat `artifactType` suporta el següent conjunt de valors:

|Tipus d’artefacte|
|-------|
|static|
|dynamic|
|plans|


En el cas de desplegaments de bases de dades, caldrà fer referència a l’ **arxiu de plans en format XML**.

```
resources:
  (...)
  artifacts:
    - id: artifact03
      artyfactType: plans
      path: sql/plans.xml
```

<div class="message information">
En aquest cas, és important assegurar-se que l’<b>identificador de BBDD definit dins l’arxiu XML de plans coincideix amb l’identificador de BBDD definit al fitxer ACI</b>.
Caldrà coordinar-ho amb el proveïdor d’infraestructures i assignar l’identificador que apliqui en cada cas. </div>

### Procés de construcció

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `steps de build`. La definició es basa en una sèrie de `tools` predefinides. A més,
els atributs dels passos de construcció varien en funció del seu tipus.


Es contemplen les següents tecnologies de construcció:

* **Node** (npm, gulp, bower i grunt)
* **Java** (maven i ant)
* **.Net** (msbuild)
* **Hugo**
* **Altres comandes** (zip, unzip)

Cada pas de construcció disposa d'un identificador, una posició, l'eina de construcció i l'artefacte o llista d’artefactes que genera.
Aquesta secció `generates` amb la llista d'artefactes generats ha de correspondre's amb els declarats a la secció `resources.artifacts`.

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

<div class="message information">
Com es pot veure a l'exemple, en cas de requerir executar les passes de <b>construcció des d’un directori específic</b> caldrà definir la ubicació mitjançant
la propietat "executionDir".  </div>
</br>

A continuació s’explica l’ús dels diferents tipus d’eines previstes.

</br>
#### Node
Caldrà seleccionar la versió a utilitzar de l’eina i, només si es tracta d'una eina complementària, l’eina a utilitzar (per defecte `npm`).
No caldrà que s'indiqui la comanda específica en els paràmetres d’execució doncs es deduirà a partir de l'eina seleccionada.

|Versions suportades|
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

Dins d’aquesta tecnologia, es dóna cobertura a altres eines complementàries que caldrà especificar mitjançant la propietat `module`:

|Eines complementàries|
|-------|
|npm (per defecte)|
|gulp|
|grunt|
|bower|

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

</br>
#### Java
Caldrà seleccionar la versió a utilitzar de l’eina i la versió de Java.
No caldrà que s'indiqui la comanda específica en els paràmetres d’execució doncs es deduirà a partir de l'eina seleccionada


|Eines suportades|Versions JDK|
|-------|-------|
|ant_1.8.2|JDK 1.5|
|ant_1.9.6|JDK 1.6|
|maven_2.0.10|JDK 1.7|
|maven_2.2.1|JDK 1.8|
|maven_3.2.2|
|maven_3.3.9|


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

</br>
#### .Net
Caldrà seleccionar la versió a utilitzar de l’eina i no caldrà que s'indiqui la comanda específica en els paràmetres d’execució doncs es deduirà a partir de l'eina seleccionada


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

</br>
#### Hugo (sites estàtiques)
Caldrà seleccionar el `pathOrig` i `pathDesti`, que es correspondran respectivament amb el directori on es troben els components i on es deixarà l’artefacte
comprimit generat.


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

</br>
#### Altres comandes (zip, unzip)

Es dona la opció d’executar certes comandes, principalment per passos en els que s'ha d'empaquetar o desempaquetar la informació.

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


### Procés de desplegament

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `steps de deploy`. La definició es basa en una sèrie de tipologies predefinides anomenades `type`.
Es contemplen els següents tipus de desplegament:
- Predefinit (`predefined`): pas de desplegament en el que se li indica l’artefacte a desplegar i l'identificador d'**infraestructura destí** (cas estàndard)

```
- id: dp001
  position: 1
  type: predefined
  destination: 9999_tomcat
  artifact: artifact01
```

</br>
- Llibreria (`library`): pas de publicació de llibreries al Nexus, en el que se li indica l'eina de publicació que segueix el mateix patró que les eines de construcció (steps de build)

```
- id: ds001
  position: 1
  type: library
  tool: maven_3.3.9
  parameters: deploy -f ./pom.xml
  destination: 9999_nexus
```

</br>
- Manual (`manual`): pas de desplegament pensat per a quan dins el procés de desplegament es requereixen accions manuals per part dels tècnics de CPD. Es tradueix, per tant, en una
**pausa a la pipeline**, que es quedarà a l’espera de confirmació per a continuar endavant

```
- id: dp001
  position: 1
  type: manual
```

</br>
- Personalitzat (`custom`): pas de desplegament pensat per quan es necessita executar comandes no contemplades en els tipus predefinits. Permet l’execució de comandes Bourne
Shell (sh) per tal que es pugui realitzar qualsevol tipus d’operació

```
- id: dp001
  position: 1
  type: custom
  command: zip -r app.zip dist/
```

### Notificacions

Finalment, caldrà indicar les **adreces de correu electrònic on notificar** accions manuals en espera i els resultats de l’execució:

```
notificationRecipients:
    - usuari1@domini
    - usuari2@domini
```

## Exemples
A continuació s'adjunten exemples de casos d'ús:

1. [Llibreria Maven-Nexus](/related/sic/2.0/autoservei_mvn_nexus.yml)
2. [Aplicació Maven-Weblogic](/related/sic/2.0/autoservei_mvn_weblogic.yml) <br/>
3. [Llibreria Npm-Nexus](/related/sic/2.0/autoservei_npm_nexus.yml)
4. [Aplicació Npm-Apache](/related/sic/2.0/autoservei_npm_apache.yml)
5. [Llibreria .Net-Nexus](/related/sic/2.0/autoservei_net_nexus.yml)
6. [Aplicació .Net desplegament semi-automàtic](/related/sic/2.0/autoservei_net.yml)
7. [Aplicació Oracle Apex](/related/sic/2.0/autoservei_apex.yml)

<br/><br/>
Si voleu més informació podeu consultar la secció de [**HOWTOs i manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [**Suport**] (/sic/suport) o
contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.