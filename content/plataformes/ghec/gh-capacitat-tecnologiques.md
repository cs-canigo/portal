
+++
date         = "2024-11-20"
title        = "Tecnologies suportades i Requisits"
description  = "Capacitats tecnològiques de la plataforma GitHub Enterprise Cloud (GHEC)"
weight      = "4"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-capacitat-tecnologiques",
    "/ghec/gh-capacitat-tecnologiques",
    "/plataformes/ghec/gh-capacitat-tecnologiques"
]
+++

## Objectiu  🚀

El present document descriu les diferents capacitats tecnològiques que suporta actualment la plataforma GHEC.


## Llenguates i tipus d'artefactes

A la següent matriu es poden observar els llenguatges i tipus d'artefactes suportats:

![Capacitat Tecnológiques](/images/GHEC/gh_capacidades_tecnologicas.png)


## Desplegament a hiperescalars 

Actualment, estan certificats els desplegaments als següents hiperescalars, sempre acotat als llenguatges i tipus d'artefactes indicats en la secció anterior:

![Capacitat Tecnológiques](/images/GHEC/gh-hyperescalares_cloud.png)                                        


## Altres capacitats

Addicionalment, la plataforma suporta les següents capacitats :

### Desplegaments a [API Manager corporatiu (APIM)](https://canigo.ctti.gencat.cat/plataformes/apim/)

Suport a les següents accions i operatives:

* **PUBLISH**: publicació d’una nova versió d’un producte i APIs associades. El sistema permet redesplegar versions als catàlegs preproductius sempre que no hagin arribat a producció.

* **INFO**: obtenció d’informació del producte dins d’un catàleg (versions, subscripcions i altres). Caldrà seleccionar el catàleg del qual es desitja informació.

* Operatives:
    * **DELETE**: eliminació del producte. Caldrà seleccionar el catàleg sobre el qual es desitja esborrar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **DEPRECATE**: deprecació d’una versió del producte sense deixar cap versió vigent. Caldrà seleccionar el catàleg sobre el qual es desitja deprecar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **REPLACE**: retirada d’una de les versions vigents del producte i migració de subscripcions. Caldrà seleccionar el catàleg sobre el qual es desitja reemplaçar, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **RETIRE**: retirada d’una versió del producte sense deixar cap versió vigent (les subscripcions es perden). Caldrà seleccionar el catàleg sobre el qual es desitja retirar i indicar la versió del producte (CURRENT_PRODUCT_VERSION). Per exemple: 1.1.0.
    * **SUPERSEDE**: deprecació d’una de les versions vigents del producte i marcat de subscripcions “migrated”. Caldrà seleccionar el catàleg sobre el qual es desitja fer el supersede, indicar la versió actual del producte (CURRENT_PRODUCT_VERSION) i la nova versió del producte (NEW_PRODUCT_VERSION). Per exemple: 1.1.0.


    En el següent enllaç, es pot revisar la definició de workflows per a totes les tecnologies incloent API's: [Workflows Reutilitzables](../gh-definicio-workflows/).


### Desplegaments estesos

El model de GHEC està enfocat a noves aplicacions o migració d'aplicacions cap a arquitectures cloud-native desplegades a Cloud Públic, però també s'ha volgut donar cabuda a aplicacions amb tecnologies menys estratègiques dins del CTTI com puguin ser **clusters de Kubernetes** o **màquines virtuals**. També els desplegaments de canvis en **bases de dades** poden fer ús d'aquest model de desplegament ja sigui utilitzant frameworks com Liquibase o Flyway, o bé executant directament scripts mitjançant les CLIs de PostgreSQL, MySQL o altres motors de bases de dades.

Les tecnlogies certificades actualment són les següents:

* Desplegaments a AWS de:
    * Scripts BBDD
    * Kubernetes amb Helm
    * Màquines Virtuals (En roadmap)

* Desplegaments a Azure de:
    * Scripts BBDD (En preparació)
    * Kubernetes amb Helm (En preparació)
    * Màquines Virtuals (En roadmap)


Més informació sobre desplegaments estesos : [Desplegaments Estesos](../gh-desplegaments-estesos/)

## Requisits

Addicionalment, dins la política de versions implantada, es detallen els requisits necessaris de configuració, depenent de la tecnologia.
Respecte al versionat de l' artefacte, el nom del lliurable i la seva version s' obté automàticament dels fitxers de configuració del projecte.  Aquest dependrà del tipus de tecnologia.


### JAVA (Maven)

* **Versionat**
   * Fitxer : pom.xml
   * Nom Lliurable : Tag artifactid
   * Versió Lliurable : Tag version

* **Requisists**
   Per a projectes Maven cal definir en el `pom.xml` la següent dependència per fer l'escaneig amb SonarQube:
   ```
   <plugin>
    <groupId>org.sonarsource.scanner.maven</groupId>
    <artifactId>sonar-maven-plugin</artifactId>
    <version>3.4.0.905</version>
    </plugin>
   ```
    
### JAVA (Gradle)
* **Versionat**
   * Fitxer / Nom Lliurable : settings.gradle / Camp -  rootProject.name 
   * Fitxer / Versió Lliurable :  build.gradle / Camp -  version i Camp -  group

* **Requisits**
   Per a projectes Maven cal definir en el `build.gradle` la següent dependència per fer l'escaneig amb SonarQube:
   ```
   plugins {
    id 'org.sonarqube' version '5.1.0.4882'
   }
   ```
   I per publicar una biblioteca:
   ```
   plugins {
    id 'maven-publish'
   }
   ```
    
### NODE
* **Versionat**
   * Fitxer : package.json
   * Nom Lliurable :  name
   * Versió Lliurable : version

### .NET
* **Versionat**
En aquest cas hi ha dues casuistiques :        
       
   * Nom Lliurable :
        1. Si només hi ha un unic projecte, només hi ha un **.csproj** i s'obtindra del camp **name** d'aquest fitxer.
        2. Si tenim en el repo més d'un projecte, hi ha diferents .csproj, s'obté de la variable **Project_Name** el valor del qual s'introdueix en el setup del projecte.


   * Versió Lliurable : 
        1. Si només hi ha un unic projecte, només hi ha un **.csproj** i s'obtindra del camp **version** d'aquest fitxer 
        2. Si tenim en el repo més d'un projecte, hi ha diferents .csproj, després hi hauria d'haver un fitxer centralitzat de versions anomenat **Directory.Build.props** i d'aquí s'obtindre del camp **VERSION**.

* **Requisits**
    Per a projectes on la tecnologia sigui dotnet és necessària l'existència de l'arxiu `*.csproj` a l'arrel. Si existeixen dos arxius `*.csproj` serà obligatori especificar el `Project_Name`.

### APIM
* **Versionat**
   * Fitxer : product.yaml
   * Nom Lliurable : title
   * Versió Lliurable : version

* **Requisits**
   Els fitxers de producte i d'APIs han d'estar a l'arrel del repositori i no poden incloure la versió en el nom.

### PYTHON
* **Versionat** 
   * Fitxer : setup.py
   * Nom Lliurable : name
   * Versió Lliurable : version

* **Requisits**
   Per a projectes Python és necessari que a l'arrel del repositori existeixin els fitxers de configuració `setup.py` i `requirements.txt`.

### Android (Gradle):
* **Versionat**
   * Fitxer / Nom Lliurable : app/build.gradle / Task - packageName
   * Fitxer / Versió Lliurable : app/build.gradle / Task - versionName
   * Fitxer / Build Lliurable : app/build.gradle / Task - versionCode

### iOS

   * Fitxer / Nom Lliurable : Build Settings / Camp - PRODUCT_BUNDLE_IDENTIFIER
   * Fitxer / Versió Lliurable : Build Settings / Camp - MARKETING_VERSION
   * Fitxer / Build Lliurable : Build Settings / Camp - CURRENT_PROJECT_VERSION