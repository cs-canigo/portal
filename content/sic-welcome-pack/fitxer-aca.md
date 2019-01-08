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

Dins el sistema d'Integració Contínua, el SIC proporciona un servei mitjançant el qual, amb el treball col·laboratiu dels proveïdors d'aplicacions i d'infraestructures i sense la intervenció de l'equip del SIC, es pot construir un job d’automatització de la construcció i del desplegament de forma automàtica.

## Requeriments generals

* **Col·laboració**: 
El requeriment més important és que tant el proveïdor d'aplicacions com el proveïdor d'infraestructures han d'estar disposats a col·laborar i mantenir una comunicació fluida. Per a aplicacions noves, un bon punt de trobada sol ser les reunions de **Fase 0** i el seu posterior seguiment.
* **L'aplicació ha de ser integrable amb l'automatització de la construcció i del desplegament**: 
Si l'aplicació empra tecnologies no compatibles amb el SIC, òbviament no es podrà generar un job que pugui realitzar les tasques necessàries per a la construcció i/o el desplegament de l'aplicació.

## Requeriments per omplir l'ACA

Els requeriments per poder omplir l'ACA adequadament són:

* Tenir coneixement dels entorns que disposarà l'aplicació a CTTI.
* Disposar dels identificadors d'infraestructures on es desplegarà l'aplicació.

## Cas d'exemple: Aplicació d'equipaments

A mode d'exemple, mostrarem com s'integraria una aplicació Canigó 3.2.4 com la d'Equipaments a l'Autoservei de jobs del SIC.

### Detalls de l'aplicació

L'aplicació d'Equipaments és una aplicació Canigó 3.2.4 que està basada en un backend que al fer el build genera un petit artefacte estàtic i un artefacte dinàmic. A nivell de base de dades, disposa d'una h2 embeguda.

Imaginarem que es tracta d'una aplicació amb codi d'aplicació 9999, el proveïdor de l'aplicació és lot A99 i el proveïdor d'infraestructures és CPD9.

### Punt d'inici

Partim de l'escenari en que tenim un repositori al Gitlab amb aquesta aplicació. A més, disposem ja de la carpeta `/sic` amb l'arxiu `sic.yml` que inclou la seva versió.

### Pactar noms d'infraestructura

A l'**Arxiu de Configuració de l'Aplicació (ACA)**, els proveïdors d'aplicacions han de fer referència a les infraestructures on despleguen el seus artefactes. No cal que en coneixin els detalls, simplement cal que s'enumerin indicant-ne en quins entorns estan habilitades.

L'identificador d'aquestes infraestructures l'ha de facilitar el seu proveïdor d'infraestructures, que pel seu compte ja haurà declarat el detall d'aquestes infraestructures en el seu propi repositori a l'**Arxiu de Configuració d'Infraestructures (ACI)**. Aquest identificador correspon al nom de l'ACI (sense l'extensió yml) on es recull el detall de la infraestructura en qüestió.

En el cas de l'aplicació d'Equipaments, s'hi identifiquen les següents infraestructures:

* Apache
* Tomcat

El proveïdor d'infraestructures proposa els següents noms d'infraestructura:

* **Apache** → `9999_equipaments_apaches`
* **Tomcat** → `9999_equipaments_tomcats`

### Generació de l'ACA

El proveïdor d'aplicacions haurà de generar l'ACA al repositori del seu projecte, a l'arxiu `/sic/aca.yml`.

En aquest arxiu haurà d'informar la versió de l'ACA, que segueix un versionatge diferent del de l'aplicació. Cada increment de versió ha de ser degut per un canvi en el propi arxiu. Exemple:

```
version: X.Y.Z
```

A continuació, s'han d'informar els paràmetres (són opcionals, pot ser una llista de 0 elements). Els paràmetres s'utilitzen per aplicar substitucions allà on aparegui `${nom_param}` s'aplicarà el valor `valor_param`.

```
parameters:
  - name: nom_param_1
    value: valor_param_1
  - name: nom_param_2
    value: valor_param_2
```

Tot seguit, cal definir els recursos dins de l'entitat `resources`. Hi ha 3 tipus de recursos:

* entorns (`environments`)
* infraestructures (`infrastructures`)
* artefactes (`artifacts`)

#### Entorns

En aquest exemple, proposem tres entorns (INT → PRE → PRO):

```
resources:
  environments:
    - id: int
      environment: int
      position: 1
    - id: pre
      environment: pre
      position: 2
    - id: pro
      environment: pro
      position: 3
```

#### Infraestructures

Tal i com s'ha comentat anteriorment, hi ha dues infraestructures:

* **Apache**: Amb l'identificador `9999_equipaments_apaches`.
* **Tomcat**: Amb l'identificador `9999_equipaments_tomcats`.

No hi ha cap variable d'entorn que calgui informar a la infraestructura, per tant quedaria buida la secció `vars`.

Cal informar el proveïdor de cada infraestructura, en aquest cas `cpd9`.

Aquesta secció s'ha de generar de la següent manera:

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

#### Artefactes

Els artefactes generats, en aquest cas, són dos, un artefacte dinàmic i un d'estàtic. Cal incloure el path corresponent a cada artefacte:

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

Per a construir l'aplicació Equipaments cal executar una comanda maven amb els gols `clean` i `package`. És un únic pas. Per tant, s'hauria d'incloure un únic *step*:

```
build:
  steps:
    - id: bs001
      position: 1
      tool: maven_3.2.2
      parameters: clean package -Dmaven.test.skip=true
      generates:
        - artifact01
        - artifact02
```

La secció `generates` inclou un llistat dels identificadors dels artefactes generats. Aquest han de correspondre amb els que hi hagi declarats a la secció `resources.artifacts`.

#### Procés de desplegament

Per al procés de desplegament, cal definir el desplegament de l'artefacte estàtic als servidors Apache i de l'artefacte binari als servidors Tomcat. El resultat el mostrem a continuació:

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

Encara que l'ordre sigui indiferent, cal imposar un ordre en els passos. En aquest cas, hem optat fer el desplegament de la capa web primer i després el desplegament de la capa d'aplicació.

#### Resultat final

D'aquesta manera, l'ACA resultant quedaria de la següent manera:

```
version: 1.2.2
parameters:
resources:
  environments:
    - id: int
      environment: int
      position: 1
    - id: pre
      environment: pre
      position: 2
    - id: pro
      environment: pro
      position: 3
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
```


<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [Manuals](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.