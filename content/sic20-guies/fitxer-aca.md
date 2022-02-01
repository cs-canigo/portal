+++
date = "2022-01-21"
title = "Com construir el fitxer ACA"
description = "Guia amb la informació de construcció del fitxer ACA per a l'Autoservei de pipelines"
sections = "SIC"
toc = true
aliases = [
       "/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA/",
       "/sic-welcome-pack/fitxer-aca/",
       "/sic-guies/fitxer-aca/"
   ]
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
les especificacions de construcció i/o desplegament**. El seu valor ha de seguir el format estàndard: `<versioMajor>.<versioMenor>.<pegat>`.

```
version: x.y.z
```

### Paràmetres

Opcionalment es poden definir paràmetres que permeten aplicar substitucions, de forma que allà on aparegui `${nom_param}` se substituirà pel valor `valor_param`.
Són útils per a dotar de més llegibilitat a l’arxiu de configuració i encapsular dades repetibles.

```
parameters:
  - name: nom_param1
    value: valor_param1
  - name: nom_param2
    value: valor_param2
```

```
build:
  steps:
    - id: step01
      position: 1
      tool: maven_3.6
      jdk: JDK 1.8
      parameters: ${nom_param1}
```

### Recursos

Caldrà definir els recursos dins l'entitat `resources`. Hi ha tres tipus de recursos:

* Entorns (`environments`)
* Infraestructures (`infrastructures`)
* Artefactes (`artifacts`)

#### Entorns

Es tracta de definir els entorns de desplegament, incloent el seu ordre i la modalitat de desplegament aplicada.

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
      deploymentType: DELEGATED
    - id: pro
      environment: pro
      position: 3
      deploymentType: SEMIAUTOMATIC
```

<div class="message information">
Recordem breument el funcionament de les diferents modalitats: </br>
- <b>Automàtica</b>: es construeixen els artefactes i es despleguen als servidors web, servidors d’aplicacions i servidors de bases de dades.</br>
- <b>Delegada</b>: es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i es delega als CPD el desplegament.</br>
- <b>Semiautomàtica</b>: es construeixen els artefactes, es lliuren a CPD/LdT a través del servei de gestió de binaris i es genera un tiquet Remedy en mode "Draft".</br>
<!--- - <b>Automàtica per CPD</b>: com l'automàtica però és CPD qui s’encarrega de donar conformitat i continuïtat a les etapes de desplegament.</br> -->
</div>

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
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
```

<div class="message information">
En el desplegament <b>AUTOMATIC</b> o <b>DELEGATED</b> cal indicar un atribut "id" que no és arbitrari, en aquest cas l’ha de facilitar el proveïdor d’infraestructures.
Aquest identificador definirà la infraestructura sobre la que desplegar. No és necessari que el proveïdor d’aplicacions conegui
el detall de les infraestructures, només cal que conegui aquest identificador. En el desplegament <b>SEMIAUTOMATIC</b> o <b>DELEGATED</b> no serà necessari preparar
l'arxiu ACI ni el detall d’infraestructures.
</div>

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

El darrer element de la secció es centra en la definició de quins artefactes genera el procés de construcció i on s'ubicaran aquests.

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


<div class="message information">
En el cas de desplegaments de bases de dades, caldrà fer referència a l’arxiu de plans en format XML.
En cas de pipelines generades per l’autoservei i desplegament automàtic, és important assegurar-se que l’identificador de BBDD definit dins l’arxiu XML de plans coincideix amb l’identificador de BBDD definit al fitxer ACI.
Caldrà coordinar-ho amb el proveïdor d’infraestructures i assignar l’identificador que apliqui en cada cas.
Per a més informació: <a href="https://canigo.ctti.gencat.cat/sic-welcome-pack/preparar-aplicacio/">Com preparar l'aplicació</a>. </div>

Exemple d'artefacte de BBDD:

```
resources:
  (...)
  artifacts:
    - id: artifact03
      artifactType: plans
      path: sql/plans.xml
```

### Procés de construcció

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `build steps`. La definició es basa en una sèrie de `tools` predefinides. A més,
els atributs dels passos de construcció varien en funció del seu tipus.

Es contemplen les següents tecnologies:

* **Node**
* **Java**
* **.NET**
* **Hugo**
* **Compressió** (zip, unzip)
* **BBDD**
* **Docker Image**

<div class="message information">
El SIC actualment utilitza la <a href="https://www.docker.com/">tecnologia Docker</a> per a disposar d'un entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors.
Addicionalment, es contempla l'ús d'entorns propis de construcció proporcionats pels proveïdors (DockerFile) que opcionalment podran estendre del catàleg d'imatges corporatiu.<br/>
<a href="https://canigo.ctti.gencat.cat/howtos/2020-06-26-SIC-Howto-utilitzar-imatges-docker-builder/">Howto utilitzar imatges Docker Builder</a>
</div>

</br>
Cada pas de construcció disposa d'un identificador, una posició, l'eina de construcció i l'artefacte o llista d’artefactes que genera.
Aquesta secció `generates` amb la llista d'artefactes generats ha de correspondre's amb els declarats a la secció `resources.artifacts`.

```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.6
      jdk: JDK 1.8
      parameters: clean package -Dmaven.test.skip=true
      generates:
        - artifact01
```

</br>
A continuació s’explica l’ús dels diferents tipus d’eines previstes de construcció.

</br>
#### Node
Caldrà seleccionar com a `tool` la versió a utilitzar de les disponibles a continuació:

|Versions suportades|
|-------|
|nodejs_4_4_3|
|nodejs_6_LTS|
|nodejs_8_LTS|
|nodejs_10_LTS|
|nodejs_12_LTS|
|nodejs_14_LTS|

```
build:
  steps:
    - id: bs001
      position: 1
      tool: nodejs_14_LTS
      parameters: install --scripts-prepend-node-path true
    - id: bs002
      position: 2
      tool: nodejs_14_LTS
      parameters: run-script build --scripts-prepend-node-path true
      generates:
        - artifact01
```

L'eina que s'utilizarà per a la construcció serà `Npm` i no caldrà que s'indiqui en els `parameters` d’execució doncs aquesta vindrà donada.
Opcionalment, es podrà indicar la propietat `executionDir` per a indicar que la construcció cal executar-la en una ruta específica (per defecte, a l'arrel del projecte).
La resta d’eines de cicle de vida (tals com bower, gulp i grunt) s’han d’incloure amb l’aplicació per a què el SIC les utilitzi per a la seva construcció.
Pel que fa a Angular, framework de frontend recomanat per Arquitectura CTTI i el CS Canigó, l’aplicació haurà de definir la versió de ng (Angular-cli) a utilitzar per a la seva construcció.

</br>
#### Java
Caldrà seleccionar com a `tool` la versió a utilitzar de Maven i com a `jdk` la versió de Java. Les combinacions previstes són les següents:

|Versions Maven|Versions JDK|
|-------|-------|
|maven_2.2.1|JDK 1.7|
|maven_3.2.2|JDK 1.6|
|maven_3.2.2|JDK 1.7|
|maven_3.2.2|JDK 1.8 (per defecte)|
|maven_3.3.9|JDK 1.6|
|maven_3.3.9|JDK 1.7|
|maven_3.3.9|JDK 1.8 (per defecte)|
|maven_3.5|JDK 1.7|
|maven_3.5|JDK 1.8 (per defecte)|
|maven_3.6|JDK 1.7|
|maven_3.6|JDK 1.8 (per defecte)|
|maven_3.6|JDK 11-openjdk|

```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.6
      jdk: JDK 1.8
      parameters: clean package -Dmaven.test.skip=true
      generates:
        - artifact01
        - artifact02
```

No caldrà que s'indiqui la comanda `mvn` en els `parameters` d’execució doncs aquesta vindrà donada per l'eina.
Opcionalment, es podrà indicar la propietat `executionDir` per a indicar que la construcció cal executar-la en una ruta específica (per defecte, a l'arrel del projecte).

</br>
#### .NET
Caldrà seleccionar com a `tool` la versió a utilitzar de les disponibles a continuació:

|Eines predefinides|
|-------|
|MSBuild_4.0|
|MSBuild_14|
|MSBuild_15|

```
build:
  steps:
    - id: bs001
      position: 1
      tool: MSBuild_15
      executionDir: src
      restoreParameters: app.sln /// .<path>packages.config -PackagesDirectory ./packages
      buildParameters:
         - msbuild_parameter_1
         - msbuild_parameter_2
         - msbuild_parameter_3
      generates:
        - artifact01
```

No caldrà que s'indiqui la comanda en el `restore/build_parameters` d’execució doncs aquesta vindrà donada per l'eina de _restore_ (Nuget) i _build_ (MSBuild) respectivament.
Opcionalment, es podrà indicar la propietat `executionDir` per a indicar que la construcció cal executar-la en una ruta específica (per defecte, a l'arrel del projecte).

</br>
#### Hugo (sites estàtiques)
Caldrà seleccionar el literal "hugo" com a `tool` i, addicionalment, indicar el `pathOrig` i `pathDesti`, que es correspondran respectivament amb el
directori on es troben els components i on es deixarà l’artefacte comprimit generat.

```
build:
  steps:
    - id: bs001
      position: 1
      tool: hugo
      pathDest: ./hugoGeneratedSite
      generates:
        - artifact01
```

</br>
#### Compressió (zip, unzip)
Caldrà seleccionar el literal "command" com a `tool` per tal d'executar les eines d'empaquetat (zip) i desempaquetat de la informació (unzip).

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

Caldrà que s'indiqui la comanda `zip` o `unzip` en els `parameters` d’execució per a especificar el tipus d'acció a realitzar.

</br>
#### BBDD
Caldrà seleccionar el literal "bbdd" com a `tool` per tal d'executar l'eina de desplegament de base de dades.

```
build:
 steps:
    - id: bs001
      position: 1
      tool: bbdd
      generates:
        - artifact01
```

</br>
#### Docker Image
Caldrà seleccionar el literal "docker" com a `tool` per tal de fer la construcció mitjançant una imatge docker. </br>
Veure: [**Com utilitzar imatges Docker Builder**](/howtos/2020-06-26-SIC-Howto-utilitzar-imatges-docker-builder).

</br>
Exemple d'ús d'imatge del catàleg:

```
build:
 steps:
    - id: bs001
      position: 1
      tool: docker
      dockerImageName: repo/image:tag
      parameters: mvn clean package -Dmaven.test.skip=true
      generates:
        - artifact01
```

On:

* `dockerImageName`: nom de la imatge al catàleg d'imatges del SIC. Es composa pel repositori, el nom de la imatge i l'etiqueta de versió (tag). Per exemple: gencatsic/maven-builder:1.0-3.6-8.
* `parameters`: comanda específica a executar dins de la imatge per a la construcció de l'artefacte. En aquest cas no vindrà donada.

</br>
Exemple d'ús d'imatge pròpia (custom):

```
build:
 steps:
    - id: bs001
      position: 1
      tool: docker
      dockerfilePath: /app/docker
      dockerfileName: DockerFile
      parameters: mvn clean package -Dmaven.test.skip=true
      generates:
        - artifact01
```

On:

* `dockerfilePath`: ruta del fitxer _DockerFile_ al codi font del projecte per a la construcció de la imatge.
* `dockerfileName`: ficher _DockerFile_ al codi font del projecte per a la construcció de la imatge.
* `parameters`: comanda específica a executar dins de la imatge per a la construcció de l'artefacte. En aquest cas no vindrà donada.

<div class="message information">
En aquest cas, es generarà una etapa addicional a la pipeline anomenada <b>build Image</b> que s'encarregarà
de construir i fer un anàlisi de vulnerabilitats de la imatge Docker d'usuari abans de procedir a la construcció de l'aplicació.
</div>

### Anàlisi estàtic de codi

Aquesta secció és opcional doncs, per defecte, tots els passos del procés i la seva ordenació vindrà determinada per la definició del
procés de construcció. Així doncs, cada pas de construcció que impliqui l'enviament de codi font per al seu anàlisi esdevindrà
automàticament en un pas d'enviament de codi i comprovació de les [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/) corresponents.
No obstant, es permet redefinir el seu comportament tal com es descriu a continuació.
</br></br>

#### Activar o desactivar l'enviament de codi font i/o la comprovació de les regles establertes

Es proporcionen unes propietats que permeten a l'usuari desactivar l'enviament de codi font i/o la comprovació de les regles establertes a l'eina davant urgències
que pugui tenir per a desplegar o altres problemàtiques que es necessiti temps per a acabar de resoldre. Són les següents:

- `evalStaticCode`: permet activar o desactivar l'etapa completa d'anàlisi estàtic de codi, per lo que no es realitzarà l'enviament del codi font ni, òbviament,
es comprovarà l'acompliment de les regles establertes.

- `checkQualityGates`: permet activar o desactivar la comprovació de les [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/), per lo que
el sistema no aturarà la pipeline en detectar un error en l'acompliment de les regles establertes.

```
analysis:
  evalStaticCode: true
  checkQualityGates: false
```

<div class="message information">
En cas de <b>desactivar aquests indicadors el sistema automàticament enviarà una notificació a l'Oficina de Qualitat</b> per a que sigui coneixedora de l'operativa realitzada en el projecte.
</div>

Per defecte, aquests indicadors es consideren actius.
</br></br>

#### Redefinir el timeout aplicat

L'Oficina de Qualitat defineix un timeout estàndard per a tots els projectes però, en cas que aquest esdevingui excessiu o insuficient per a la finalització de la tasca
d'anàlisi del codi font, l'usuari pot optar per redefinir-lo a nivell de projecte mitjançant la propietat `aecStageTimeout` indicada en unitats de segon.

```
analysis:
  aecStageTimeout: 20
```
</br>

#### Redefinir el sistema d'enviament de codi font

Es permet redefinir el comportament per defecte d'aquest procés en el que s'anomenen `analysis steps` quan es detecta la necessitat de fer ús d'una imatge Docker
diferent a la de construcció, es necessita editar la comanda a executar o el directori d'execució. Cal, però, tenir present que només cal redefinir-ho per al pas de build en
qüestió i la resta (si hi ha) seguiran comportant-se de forma estàndard.

El sistema es basa en una sèrie de `tools` predefinides que es descriuen a continuació:

- `maven`: pas d'anàlisi estàtic de codi mitjançant el SonarScanner per a projectes Maven.

- `msbuild`: pas d'anàlisi estàtic de codi mitjançant el SonarScanner per a projectes que utilitzen MSBuild.

- `generic`: pas d'anàlisi estàtic de codi mitjançant el client genèric de SonarScanner. Es tracta del client utilitzat per a projectes que utilitzen NPM, projectes PHP, PL/SQL i d'altres.

Per a més informació: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/.
</br></br>

Caldrà definir la propietat `target` indicant l'identificador del step de build associat que es vol sobreescriure, que obligatòriament ha de coincidir amb un identificador de `build step`
que hem definit més amunt i que s'afegirà com a sufix en l'enviament del projecte al SonarQube.

Opcionalment es podran indicar les propietats:

- `imageName`: només per a fer ús d'una imatge Docker diferent a la imatge de construcció de l'artefacte i que ha d'estar disponible
al [Catàleg d'imatges] (https://git.intranet.gencat.cat/0192-intern/docker-images)

- `commands`: per a especificar la comanda que cal executar només si s'especifica una `imageName`. Per a tools de `maven`, és necessari indicar els següents paràmetres necessaris per a que no realitzi de nou la construcció i l'execució del goal es centri només en la generació i enviament del informe al SonarQube: `-Dmaven.main.skip=true -Dmaven.install.skip=true -Dmaven.test.skip=true -Dmaven.antrun.skip=true --no-transfer-progress --batch-mode`

- `executionDir`: per a indicar que l'enviament cal executar-lo sobre una ruta específica (per defecte, a l'arrel del projecte)

Exemple:

```
analysis:
  evalStaticCode: true
  checkQualityGates: true
  steps:
    - id: an001
      tool: maven
      target: bs001
      imageName: gencatsic/maven-builder:1.0-3.6-11-openjdk
      commands: mvn -f app1/pom.xml sonar:sonar -Dmaven.main.skip=true -Dmaven.install.skip=true -Dmaven.test.skip=true -Dmaven.antrun.skip=true --no-transfer-progress --batch-mode  
      executionDir: dir1
    - id: an002
      tool: maven
      target: bs002
      imageName: gencatsic/maven-builder:1.0-3.6-11-openjdk
      commands: mvn -f app2/pom.xml sonar:sonar -Dmaven.main.skip=true -Dmaven.install.skip=true -Dmaven.test.skip=true -Dmaven.antrun.skip=true --no-transfer-progress --batch-mode
      executionDir: dir2
    - id: an003
      tool: maven
      target: bs003
      imageName: gencatsic/maven-builder:1.0-3.6-11-openjdk
      commands: mvn -f app3/pom.xml sonar:sonar -Dmaven.main.skip=true -Dmaven.install.skip=true -Dmaven.test.skip=true -Dmaven.antrun.skip=true --no-transfer-progress --batch-mode
      executionDir: dir3
```
</br>

### Procés de desplegament

Caldrà definir tots els passos del procés i la seva ordenació en el que s’anomenen `deploy steps`. La definició es basa en una sèrie de tipologies predefinides anomenades `type`.
A continuació es descriuen els diferents tipus de desplegament que es poden configurar.
</br></br></br>

#### Estàndard (`predefined`)

Pas de desplegament en el que se li indica l’artefacte a desplegar i l'identificador d'**infraestructura destí** (cas estàndard).
Exemple:

```
deploy:
  steps:
    - id: dp001
      position: 1
      type: predefined
      destination: 9999_tomcat
      artifact: artifact01
```
</br>

#### Llibreria (`library`)

Pas de publicació de llibreries al Nexus, en el que se li indica l'eina de desplegament `tool` seguint el mateix patró que el [**Procés de construcció**](/sic-welcome-pack/fitxer-aca/#procés-de-construcció).
No obstant això, en aquest cas, aquesta propietat només serà requerida si cal fer ús d'una imatge docker del catàleg diferent de la utilitzada en la construcció. En cas de no ser necessari,
serà suficient fer referència a l'`artifact` en qüestió i el sistema aprofitarà la mateixa imatge de la construcció.
</br></br>

Exemple especificant la `tool` i la `jdk`:
```
deploy:
  steps:
    - id: ds001
      position: 1
      type: library
      tool: maven_3.6
      jdk: JDK 1.8
      parameters: deploy -f pom.xml
```

Exemple sense indicar la `tool` i referenciant a un `artifact` per a fer ús de la mateixa imatge de construcció
(en cas d'indicar simultàniament l'eina i l'artefacte, el sistema utilitzarà la imatge associada a l'eina indicada ignorant la propietat `artifact`):
```
deploy:
  steps:
    - id: ds001
      position: 1
      type: library
      parameters: deploy -f pom.xml
      artifact: artifact1
```

Exemple utilitzant imatge docker específica del catàleg:
```
deploy: 
  steps:  
    - id: ds001 
      position: 1 
      type: library 
      tool: docker 
      dockerImageName: gencatsic/maven-builder:1.0-3.2-7 
      parameters: mvn deploy -f pom.xml 
```

Exemple amb diversos `parameters`:
```
deploy: 
  steps:
    - id: ds001 
      position: 1
      type: library 
      tool: docker 
      dockerImageName: gencatsic/maven-builder:1.0-3.2-7 
      parameters: 
       -  mvn deploy -f app1/pom.xml 
       -  mvn deploy -f app2/pom.xml 
       -  mvn deploy -f app3/pom.xml
```

Exemple mitjançant MSBuild (en aquest cas sí serà necessari indicar la `destination` per a extreure el node `provider` en el que cal realitzar el pas):
```
deploy:
  steps:
    - id: ds001
      position: 1
      type: library
      tool: MSBuild_15
      parameters: push .\\app.nupkg
      destination: cpdx_nexus_xxxx
```

En qualsevol cas, opcionalment es podrà indicar la propietat `executionDir` per a indicar que la construcció cal executar-la en una ruta específica (per defecte, a l'arrel del projecte).
</br>

<!---
NRS: es comenta aquesta part perque no ha estat prou verificada i, de moment, no es considera que apliqui.
- Manual (`manual`): pas de desplegament pensat per a quan dins el procés de desplegament es requereixen accions manuals per part dels tècnics de CPD. Es tradueix, per tant, en una
**pausa a la pipeline**, que es quedarà a l’espera de confirmació per a continuar endavant.
```
deploy:
  steps:
    - id: dp001
      position: 1
      type: manual
```
</br>

- Personalitzat (`custom`): pas de desplegament pensat per quan es necessita executar comandes no contemplades en els tipus predefinits. Permet l’execució de comandes Bourne
Shell (sh) per tal que es pugui realitzar qualsevol tipus d’operació.
```
deploy:
  steps:
    - id: dp001
      position: 1
      type: custom
      command: zip -r app.zip dist/
```
-->

</br>
### Notificacions

Finalment, caldrà indicar les **adreces de correu electrònic on es notificarà** d'accions manuals en espera i resultats de l’execució:

```
notificationRecipients:
    - usuari1@domini
    - usuari2@domini
```

## Validació
Està previst implementar un sistema de validació que comprovi el format, el contingut i les referències del fitxer ACA en fer la pujada al Sistema de Custòdia de Codi.
Fins aleshores, recomanem fer una validació mínima del fitxer utilitzant eines online de validació disponibles com [**YAML Validator**](http://www.yamllint.com/).


## Exemples
A continuació s'adjunten exemples de casos d'ús:

- [Maven - Nexus](/related/sic/2.0/autoservei_mvn_nexus.yml) (llibreria)
- [Maven - Weblogic](/related/sic/2.0/autoservei_mvn_weblogic.yml) <br/>
- [Maven - Nexus & Weblogic](/related/sic/2.0/autoservei_mvn_hibrid.yml) <br/>
- [Npm - Nexus](/related/sic/2.0/autoservei_npm_nexus.yml) (llibreria)
- [Npm - Apache](/related/sic/2.0/autoservei_npm_apache.yml)
- [.NET - Nexus](/related/sic/2.0/autoservei_net_nexus.yml) (llibreria)
- [.NET](/related/sic/2.0/autoservei_net.yml)
- [PHP](/related/sic/2.0/autoservei_php.yml)
- [Oracle Apex o migracions de BBDD](/related/sic/2.0/autoservei_apex.yml)
- [Docker Image](/related/sic/2.0/autoservei_docker.yml)
- [Docker Custom Image](/related/sic/2.0/autoservei_custom_docker.yml)
- [Docker Custom Image - Nexus](/related/sic/2.0/autoservei_custom_docker_nexus.yml) (llibreria)
- [Maven Code Analysis Redefined](/related/sic/2.0/autoservei_mvn_aec.yml)

<br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/sic20-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
