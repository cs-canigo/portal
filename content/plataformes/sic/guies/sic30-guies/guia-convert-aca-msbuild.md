+++
date = "2024-11-05"
title = "Guia de conversió de fitxer ACA de SIC 2.0 a SIC 3.0 per a aplicacions .Net Framework"
description = "Guia de conversió de fitxer ACA de SIC 2.0 a SIC 3.0 per a aplicacions .Net Framework"
sections = "SIC"
toc = true
aliases = [
    "/sic30-guies/guia-convert-aca-msbuild/"
]
taxonomies = []
weight = 7
+++

## Introducció

A partir d'ara SIC 3.0 ja suporta la inclusió de projectes que requereixen que la compilació es realitzi en servidors Windows perquè es recolzen en Visual Studio i tot el conjunt de llibreries i dependències de Microsoft .Net Framework.

Aquesta inclusió es deu a la necessitat de donar suport als projectes de SIC 2.0 d'aquestes característiques i l'objectiu d'aquesta guia és proporcionar la informació rellevant per a migrar els desplegaments d'aquests projectes a SIC 3.0

A continuació es detallaran algunes consideracions, canvis i correspondències rellevants per a transformar amb èxit un fitxer ACA des de SIC 2.0 a SIC 3.0 exclusivament per a aquesta mena d'aplicacions.

## Consideracions

Les consideracions per a compilacions en Windows es deuen al fet que s'executen, precisament, en servidors Windows i difereixen en el tractament que realitzen d'alguns caràcters especials o en com es representen determinades variables.

### Notació de carpetes i variables. Només aplica en el bloc "build"

En sistemes operatius Windows s'utilitza el caràcter "\" com a separador per a definir rutes de carpetes als arxius. No obstant això, aquest caràcter té un tractament especial en Jenkins ja que s'utilitza com a caràcter de "fuita", és a dir, ho anteposem a qualsevol altre caràcter especial que querramos representar de manera literal. Això significa que per a utilitzar "\" en les rutes als artefactes o fitxers de projecte o solució, haurem de "escapar-ho" anteposant un altre "\". 

Exemple:
```yaml
.\\carpeta\\subcarpeta\\otrasubcarpeta\\fitxer.sln
```

Respecte a les variables, la manera de representar una variable d'entorn en Windows varia respecte a Jenkins. Si volem accedir al valor acumulat en una variable, haurem d'utilitzar-la dins dels delimintadores %%. 

Exemple:
```yaml
  - msbuild.exe  .\\folder\\project.csproj /p:Configuration=Release /p:PackageVersion=%SIC_VERSION%
```

### Tractament de llibreries

En SIC 3.0, les llibreries que són per a compilar i desplegar en Nexus han d'estar en el seu propi repositori de Gitlab amb la seva carpeta SIC i el seu fitxer ACA.yml. No es pot generar en un mateix job l'artefacte per a publicar en Nexus i el que s'hagi de desplegar on-premise.

Si hi ha dificultats per a separar el codi de la llibreria de la resta, una possibilitat és duplicar el repositori i configurar un d'ells per a desplegar únicament la llibreria i l'altre amb la resta d'artefactes.


### Compilacions amb múltiples passos

Tots els passos de compilació del projecte han de ser possible ser executats en el mateix builder windows, no se suportaran jobs que requereixin compilar parts utilitzant altres tecnologies i que requereixin d'uns altres builder.

Cadascun dels passos de compilació es reflectirà com una línia de comando en el ACA podent concatenar l'execució de diversos comandos en la mateixa línia amb l'operador "&&". 

Els passos de compilació que hagin de ser executats en subcarpetas han d'anar obligatòriament concatenats al comando "cd" que situe l'execució en aquesta carpeta.

## Correspondència de configuracions

A continuació es detalla com transformar cadascuna de les seccions del fitxer ACA de SIC 2.0 i adaptar-la al fitxer ACA de SIC 3.0

### Bloc "build"

En aquest bloc sempre s'utilitzarà el nom de builder i configuració que apareix en l'exemple. 
```yaml
  - build:
      steps:
        - container:
            image:
              remote:
                name: registreimatges.sic.intranet.gencat.cat/gencat-sic-builders/windows-builder
            resources:
              limits:
                cpu: 1000m
                memory: 1024Mi
              requests:
                cpu: 100m
                memory: 128Mi
```
Solament es modificaran les línies de comando a executar tenint en compte la següent transformació:

| ACA SIC 2.0                                                                      | ACA SIC 3.0 |
| -------------------------------------------------------------------------------- | ---------- |
| slnPath: solution-file.sln                                                       | nuget.exe restore solution-file.sln          |
| executionDir: folder                                                             | cd folder && [next command]          |
| buildParameters: folder1/project1.csproj /p:Configuration=PRE /p:Platform=AnyCPU | msbuild.exe folder1\\project1.csproj /p:Configuration=PRE /p:Platform=AnyCPU|
| restoreParameters: solution-file.sln                                              | nuget.exe restore solution-file.sln          |
| targetParameters: './folder/project.csproj -Prop Configuration=Release'           | PACK_OPTIONS: '.\\folder\\project.csproj -Prop Configuration=Release'|
| parameters: zip -r ..\\..\\..\\..\\..\\target\\carrega-getty.zip *                | zip -r ..\\..\\..\\..\\..\\target\\carrega-getty.zip *

Exemple:
```yaml
#SIC 2.0
build:    
  steps:
    - id: bs001
      position: 1
      tool: MSBuild_4.0
      executionDir: src-folder
      restoreParameters: solution-file.sln
      buildParameters: project.proj
      generates: 
        - artifact01
        - artifact02
    - id: bs002
      position: 2
      tool: command
      executionDir: src-folder
      parameters: zip -r ..\\..\\target\\artifact03.zip *
      generates: 
        - artifact03
```
Es transformaria d'aquesta manera:
```yaml
         execution:
            commands:
              - cd src-folder && nuget.exe restore solution-file.sln
              - cd src-folder && msbuild.exe project1.csproj
              - mkdir target
              - cd src-folder\\output-folder && zip -r ..\\..\\target\\artifact03.zip *
```

### Bloc artifacts

El bloc "artifacts" de SIC 2.0 és que servirà per a generar el bloc deployment en SIC 3.0. En SIC 2.0 solament necessitem el path de l'artefacte i el tipus d'artefacte.
El tipus d'artefacte de SIC 2.0 es trasllada tal qual.
El path de l'artefacte de SIC 2.0 servirà per a posar el nom de l'arxiu generat en el camp "name" i la resta de la ruta en el camp "path". En aquest bloc usarem com a separador de directoris en el sistema d'arxius "/" i no precisa de posar per davant cap caràcter de fuita.
Exemple:
```yaml
  artifacts:
    - id: artifact01
      artifactType: static
      path: folder1/subfolder1/output-file1.zip
```
Es transformaria d'aquesta manera:
```yaml
          artifacts:
            - name: output-file1.zip
              path: folder1/subfolder1
              type: static
```
### Blocs infrastructures i environments

Utilitzarem la informació d'aquests blocs del ACA de SIC 2.0 per a extreure el tipus de desplegament a utilitzar en cada entorn i, en cas de ser un desplegament delegat, l'identificador d'infraestructura per a utilitzar. 
Exemple:

```yaml
  environments:
    - id: pre
      environment: pre
      deploymentType: SEMIAUTOMATIC
      position: 1
    - id: pro
      environment: pro
      deploymentType: SEMIAUTOMATIC
      position: 2
  infrastructures: 
    - id: cpdx.apache.xxxx
      element: apache
      environments:
        - environment: pre
        - environment: pro
      provider: cpdx
```
Es transformaria d'aquesta manera:
```yaml
    deployment:
      environments:
        - name: preproduction
          deployment-type: SEMIAUTOMATIC
          artifacts:
            - name: output-file1.zip
              path: folder1/subfolder1
              type: static
              infrastructure-id: cpdx.apache.xxxx
        - name: production
          deployment-type: SEMIAUTOMATIC
          artifacts:
            - name: output-file1.zip
              path: folder1/subfolder1
              type: static
              infrastructure-id: cpdx.apache.xxxx

```

## Eines

Per a la compilació dels projectes desenvolupats per a .Net Framework, s'ha integrat en SIC 3.0 un nou builder amb les següents característiques i eines:

- Sistema Operatiu: **Windows Server 2022**
- Versió de Nuget.exe: **5.0.2**
- Versió de Visual Studio: **Visual Studio 2019**

La versió de Visual Studio instal·lada disposa de la integració amb totes les versions de .Net Framework suportades per Microsoft a data d'elaboració d'aquest document, que són de la 4.6.2 d'ara endavant.

## Exemples

A continuació els enllaços als exemples de fitxer ACA per a aquesta mena de projectes.

- [Construcció aplicació MSBuild (Windows) i desplegament On Premise](/related/sic/3.0/aca_const_despl_msbuild_onpremise.yml)

- [Construcció i publicació de llibreria .NET Framework (MSBuild) al Nexus](/related/sic/3.0/aca_const_publi_nexus_msbuild_lib.yml)


Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/).

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).