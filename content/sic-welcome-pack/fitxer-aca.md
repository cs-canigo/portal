+++
date = "2019-01-07"
title = "Com construir el fitxer ACA"
description = "Guia amb la informació de construcció del fitxer ACA per a l'Autoservei de Jobs"
aliases = [
    "/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA/"
]
sections = "SIC"
toc = true
taxonomies = []
weight = 3
+++

## Introducció

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual, amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC, es pot **construir un job d’automatització de la construcció i del desplegament** de forma automàtica.

## Requeriments generals

S'estableixen una sèrie de requeriments per a estar en disposició de preparar el fitxer:

* **Col·laboració**: el proveïdor d'aplicacions i el proveïdor d'infraestructures han d'estar disposats a col·laborar i mantenir una comunicació de cara a alinear la configuració.
* **L'aplicació ha de ser integrable amb l'automatització de la construcció i del desplegament**: el sistema ha de ser capaç de construir i desplegar l'aplicació, per lo que la seva tecnologia i especificitats han d'estar contemplades al sistema d'Integració Continua. 
* Tenir constància dels **entorns** on es desplegarà l'aplicació i les **modalitats de desplegament** aplicables en cada cas.
* Per als entorns amb modalitat de desplegament automàtic, disposar dels **identificadors d'infraestructures** de desplegament.

## Exemple: Aplicació d'equipaments

A mode d'exemple, mostrarem com s'integraria una aplicació Canigó 3.2.4 com la d'Equipaments a l'Autoservei de jobs del SIC a partir de les següents consideracions:

* **Codi d'aplicació: 9999**
* Proveïdor d'aplicacions: **lot A99**
* Proveïdor d'infraestructures: **CPD9**
* Entorns i modalitats de desplegament: **INT (automàtica), PRE i PRO (semiautomàtica)**.
* **Aplicació Canigó 3.2.4**.
* Backend que en construir-se genera un **artefacte estàtic i un artefacte dinàmic** que es despleguen en servidor web **Apache i Tomcat** (respectivament).
* **DB h2** embeguda.
* Projecte **repositat al GitLab**, incloent l'arxiu `sic.yml` que inclou la versió actual de l'aplicació.

### Acordar denominacions d'infraestructura

A l'**Arxiu de Configuració de l'Aplicació (ACA)**, els proveïdors d'aplicacions han de fer referència a les infraestructures on despleguen el seus artefactes. No cal que en coneixin els detalls, simplement cal que s'enumerin indicant en quins entorns estan habilitades. Aquesta informació l'ha de facilitar el proveïdor d'infraestructures i que es declararan a l'**Arxiu de Configuració d'Infraestructures (ACI)**. 

En el cas d'exemple, s'hi identifiquen les següents:

* **Apache** → `9999_equipaments_apaches`
* **Tomcat** → `9999_equipaments_tomcats`

### Construcció de l'ACA

El proveïdor d'aplicacions haurà de generar l'ACA al repositori del seu projecte, concretament: `/sic/aca.yml`. 

#### Versió

Caldrà indicar la versió de l'ACA, que segueix un versionatge diferent al de l'aplicació. En aquest cas, cada increment de versió es correspon amb **canvis en les especificacions de construcció i/o desplegament**.

```
version: X.Y.Z
```

#### Paràmetres

Caldrà indicar els paràmetres (són opcionals, per lo que pot tractar-se d'una llista de 0 elements). Els paràmetres s'utilitzen per aplicar substitucions, de forma que on aparegui `${nom_param}` s'aplicarà el valor `valor_param`.

```
parameters:
  - name: nom_param_1
    value: valor_param_1
  - name: nom_param_2
    value: valor_param_2
```

#### Recursos

Caldrà definir els recursos dins l'entitat `resources`. Hi ha tres tipus de recursos:

* Entorns (`environments`)
* Infraestructures (`infrastructures`)
* Artefactes (`artifacts`)

##### Entorns

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

##### Infraestructures

Caldrà relacionar les denominacions d'infraestructures indicades pel proveïdor: tipus `element`, entorns `environments` i identificador del proveïdor `provider`.
En aquest cas, no hi ha cap variable d'entorn requerida a nivell d’infraestructura, per tant quedaria buida la secció `vars`.

```
resources:
  (...)
  infrastructures:
    - id: 9999_equipaments_apaches
      element: apache
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
    - id: 9999_equipaments_tomcats
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

##### Artefactes

Els artefactes generats, en aquest cas, són dos: un artefacte dinàmic i un d'estàtic. Caldrà incloure la ruta corresponent de cada un d'ells:

```
resources:
  (...)
  artifacts:
    - id: artifact01
      artifactType: static
      path: target/equipaments-static.zip
    - id: artifact02
      artifactType: dynamic
      path: target/equipaments.war
```

#### Procés de construcció

Per a construir l'aplicació Equipaments, caldrà executar una comanda maven amb els goals `clean` i `package`. És pot realitzar en un únic pas, per tant, s'hauria d'incloure un únic **step**:

```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.2.2
      parameters: clean package -Dmaven.test.skip=true
      jdk: JDK 1.8 
      generates:
        - artifact01
        - artifact02
```

La secció `generates` inclou una relació d'artefactes generats. Aquests han de correspondre amb els declarats a la secció `resources.artifacts`.

#### Procés de desplegament

Per al procés de desplegament, caldrà definir el desplegament de l'artefacte estàtic als servidors Apaches i de l'artefacte dinàmic als servidors Tomcat:

```
deploy:
  steps:
    - id: dp001
      position: 1
      type: predefined
      destination: 9999_equipaments_apaches
      artifact: artifact01
    - id: dp002
      position: 2
      type: predefined
      destination: 9999_equipaments_tomcats
      artifact: artifact02
```

En aquest cas, hem optat per fer primer el desplegament de la capa web i a continuació el desplegament de la capa d'aplicació.

#### Notificacions

Finalment, caldrà indicar les adreces de correu electrònic on notificar accions manuals en espera i resultats de l’execució:


```
notificationRecipients:
    - usuari1@domini
    - usuari2@domini
```

#### Resultat final

D'aquesta manera, el fitxer resultant quedaria de la següent manera:

```
version: 1.2.2
parameters:
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
  infrastructures:
    - id: 9999_equipaments_apaches
      element: apache
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
    - id: 9999_equipaments_tomcats
      element: tomcat
      environments:
        - environment: int
          vars:
        - environment: pre
          vars:
        - environment: pro
          vars:
      provider: cpd9
  artifacts:
    - id: artifact01
      artifactType: static
      path: target/canigo324Armau-static.zip
    - id: artifact02
      artifactType: dynamic
      path: target/canigo324Armau.war.original
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
deploy:
  steps:
    - id: dp001
      position: 1
      type: predefined
      destination: 9999_equipaments_apaches
      artifact: artifact01
    - id: dp002
      position: 2
      type: predefined
      destination: 9999_equipaments_tomcats
      artifact: artifact02
notificationRecipients:
    - usuari1@domini
    - usuari2@domini
```


<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [Manuals](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
