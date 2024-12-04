
+++
date         = "2024-04-09"
title        = "Workflows"
description  = "Definició workflows de CI/CD"
weight      = "1"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-definicio-workflows",
    "/ghec/gh-definicio-workflows",
    "/plataformes/ghec/gh-definicio-workflows"
]
+++

## Objectiu 🚀
El present document descriu la definició a alt nivell dels Workflows de CI/CD per a GitHub Enterprise Cloud (GHEC) .

## Introducció 📋

S'ha considerat separar o aïllar els workflows en uns més específics i evitar així la creació d'un únic workflow amb massa lògica que integri tant el CI com el CD. Aquests workflows llançaran triggers o faran invocacions a d'altres per fer una cadena i que cada procés es trobi ben definit.


S'han definit tant workflows per components tècnics d'aplicació com worfklows per a infraestructura (IaC).

## Definició workflows - Components tècnics d'aplicació 📝


### Workflow de Continuous Integration (CI) per a components tècnics d'aplicació
Amb el workflow de CI proposat es força l'usuari a treballar i realitzar canvis a través de Pull Requests, tal i com s'ha definit en el [Model de GitFlow i GitOps.](../../modelTreball/model-gitflow-gitops)

S'ha diferenciat en el workflow entre:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la PR, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition.png)

Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi, eines de seguretat SAST i SCA. 

Nom del Workflow en GitHub : **Container CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.




![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition_PR.png)


D'altra banda, si estem en temps de commit, existiran dos tipus de workflows depenent de la tipologia del component: Aplicació o Llibreria.  

+ En el cas d'una **aplicació**, i partint de la base que **la imatge que es genera i es puja al registre d'imatges ha de ser immutable** en les següents fases, s'executaran els steps de compilació, empaquetat, creació de imatge de contenidor, push al registre, CI/SAST/SCA (si no s'ha executat prèviament en temps de pull request), assignació de tag a l'imatge i al repositori.
 
 **IMPORTANT** : En el cas d'imatges de contenidors Docker, en la definició del fitxer Dockerfile, és estrictament necessari realitzar aquesta operativa **copiant** l'artefacte generat en els steps anteriors del workflow de CI i **mai** tornant a compilar i generar l'artefacte de nou en la creació de la imatge Docker. 

Per exemple : 
* En el cas d'aplicacions JAVA Maven, aquest artefacte estarà en la carpeta **./target/**

 Cas correcte de DockerFile, on es genera la imatge Docker amb l'artefacte generat en els passos previs del Workflow.

![Dockerfile amb definició correcta](/images/GHEC/dockerfile_OK.png)

Cas incorrecte de DockerFile on es copia tot el repositori i es torna a realitzar el compilat i la instal·lació abans de generar la imatge.
 
 ![Dockerfile amb definició incorrecta](/images/GHEC/dockerfile_KO.png)




Els diferents steps es llançaran en funció de les branques involucrades en el procés tal i com s'observa en el diagrama.  
**En cap moment es permetrà modificar la imatge generada en branca Development en treballar a Release o Master.**

El nom del workflow en el repositori dependrà de la branca a la qual es faci la integració : 

* Nom del WorkFlow si el Commit és a development : **Container CI on Commit to develop**.

* Nom del Workflow si el Commit és a release o master :  **Container CI on Commit to release o master**.


![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition_CM_app.png)

+ En el cas que l'artefacte sigui una Llibreria, el flux de commit serà diferent, ja que l'objectiu del workflow de llibreries és desplegar en un repositori de llibreries, tipus Artifactory, Nexus o GitHub Packages, i no el desplegament en cap infraestructura per a que sigui executat (runtime). 
En aquest cas, a diferència del workflow d'aplicacions, la llibreria que es genera en els diferents entorns no ha de ser immutable pel que:
    + En fase **Commit Development** , només cal realitzar el compilat, empaquetat, pujada de l'artefacte al repositori de llibreries i l'etiquetatge en aquest repositori.

    + En les fases de **Commit per a Release i Master**, a més dels steps de Commit Development, s'afegiran steps de "Promoció" que actualitzaran la versió de l'artefacte internament en el fitxer pom.xml.
    
    Diagrama per a CI de llibreries.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition_CM_lib.png)

Addicionalment, cal destacar que no es permetrà a l'usuari o desenvolupador d'aplicacions, la creació manual de tags, ja sigui en repositori d'artefactes o registre d'imatges, ja que aquest procés serà automatitzat en els workflows i serà gestionat pel propi workflow.  

#### Orquestració de workflows

A futur, es preveu la creació de workflows "llançadors" que serveixin d'orquestradors dels diferents workflows de CI/CD, podent triar a través de manifestos en format .yaml la configuració a executar i el flux a seguir. Mitjançant aquest pla de desplegament es vol controlar la paral·lelització i/o seqüencialitat dels processos involucrats en el desplegament d'una aplicació.

### Worfklows de Continuous Deployment (CD) per a aplicacions

El workflow de Desplegament Continu (CD) s'ha aïllat del workflow de CI per desvincular els entorns de desplegament de les diferents branques d'un repositori, així com desacoblar la generació d'un artefacte "deliverable" del propi workflow de desplegament. D'aquesta manera, es defineix un workflow de CD que pot rebre qualsevol artefacte generat prèviament en el workflow de CI i desplegar-lo en l'entorn que es desitgi, ja sigui en producció o en un entorn previ.

Els diferents steps que es defineixen a alt nivell són els que es mostren en el diagrama següent:

![Definició a alt nivell dels workflows de CD](/images/GHEC/cd-workflow-definition.png)
* **Flux de Deploy CD**: Realitzarà el desplegament d'un artefacte en l'entorn indicat.  Tindrà com a Steps:
    1. Check Artifacts, realitzarà revisions sobre l'artefacte abans del desplegament.
    2. Env. Matrix, validarà si l'artefacte pot ser desplegat en l'entorn indicat.
    3. PRE-AUDIT : Crea un CRQ en ITSM indicant l'inici de desplegament.
    4. Deploy: desplegament de l'artefacte en l'entorn indicat.
    5. Health Check : Comprova l'accés tècnic al recurs.
    6. Functional Tests: Executa proves de funcionals amb Selenium invocant a M.A.T.
    7. POST-AUDIT: Completa la CRQ amb el resultat del desplegament.
    8. EMAIL COMM : Enviament del resultat del desplegament als afectats.
    
    Nom del Workflow en GitHub : **Container CD**

* **Flux Rollback**: Realitzarà un rollback d'un artefacte en l'entorn indicat.  Aquest artefacte ja va ser analitzat quan va ser desplegat per primera vegada, per la qual cosa no és necessari realitzar una anàlisi de qualitat sobre aquest i el seu desplegament serà directe.
 
    Nom del Workflow en GitHub : **Container CD**

* **Flux Validate**: Flux que, una vegada desplegat l'artefacte en l'entorn demanat, realitza totes les proves necessàries que verifiquin que aquest lliurament és apte per pujar a producció.  Aquestes proves s'executaran en els següents steps: 
    
   1. Functional Tests: on es realitzaran proves funcionals de l'increment de producte.
   2. Regression Tests: on es realitzaran proves de regressió de tota l'aplicació.
   3. Security Tests: on es realitzaran totes les proves de seguretat per certificar que el producte no té vulnerabilitats.
   4. Performance Test: on es realitzaran proves de rendiment per assegurar que el producte serà capaç de tenir un performance optim davant d'una alta càrrega de peticions.

    Nom del Workflow en GitHub : **Validation Workflow**

    Per a aquestes 4 fases de validació del producte, el workflow s'integrarà amb la nova eina de Qualitat de CTTI anomenada **Marc d'Automatització de Testing (MAT)** la qual disposarà de les eines necessàries **as a Service** per a realitzar les proves indicades.

    Aquesta integració es realitzarà mitjançant invocacions al action de M.A.T **ctti-actions/trigger-actions-to-mat@v1** els paràmetres d'entrada dels quals són :

    + urljenkins: URL de la feina de Jenkins.
    + token: Token d'accés al repositori de Github per obtenir els tests 
    + user: El nom d'usuari per a l'autenticació bàsica HTTP al orquestador MAT
    + password: La contrasenya (o testimoni) per a l'autenticació bàsica HTTP al orquestador MAT.
    + job: El nom de la feina cuyos els valors actuals dels quals són (actualment) :  
        + MAT-PROVES-FUNCIONAL-SELENIUM : Per realitzar proves funcionals.
        + MAT-PROVES-RENDIMENT-JMETER : Per a l'execució de proves de Rendiment.
    	+ MAT-PROVES-SEGURETAT-ZAP : Per a l'execució de proves de seguretat.
        
    + params: Paràmetres de la feina en format Json depenent de la prova :
        + repositori : repositori on hi haurà els tests de l'aplicació
        + entorn : Entorn on s'executaran els tests 
            + Desenvolupament
            + Integracio
            + Preproduccio
            + Produccio
        + rama: Branch d' on obtenir els tests
        + urlApp : URL de l'aplicació
        + umbraldev : Llindar de proves
        + jiraproject : Projecte Jira
        + jiratestplan: Pla de proves d'emissió Jira

        exemple :         
        '{"repositorio":"http://gitea.gitea/devsecops/functional-test.git", "entorno":"Integracio", "urlapp":"https://qualitat.solucions.gencat.cat/","rama":"master"}'

    
## Definició workflows - Infraestructura 📝

### Worfklows de Continuous Integration (CI) per a infraestructura (IaC).

Es torna a apostar (depenent de la branca) per l'ús de Pull Request per realitzar un commit a branques (develop, release, master/main).

Per això, es diferenciaran els workflows depenent de l'acció que es realitzi, pull request o commit.

En el següent diagrama s'observa el flux definit:

![Definició a alt nivell dels workflows de CD per a Infraestructura](/images/GHEC/ci-workflow-infra-definition.png)

on:
* Checkout: Descarrega el codi del repositori.
* Format Check: Realitza validacions de format al codi.
* Scan Check: Realitza validacions estàtiques (SCA) al codi.
* Cost Check: Validació del cost de la infraestructura. 
* Terraform Plan & Store : Generació del Terraform Plan i emmagatzematge en el Storage Account de l'aplicació.
* Tag: Etiquetat del codi al repositori.


Per a PR, el nom del workflow en GHEC és **Infra CI on PR** 

Per a Commit, el nom del workflow en GHEC és **Infra CI on Commit**

Una vegada realitzat el Terraform Plan, s'adjunta tota la informació en la Pull Request perquè el approver (rol maintainer) pugui disposar de tota la informació necessària per a realitzar l'aprovació.



### Worfklows de Continuous Deployment (CD) per a infraestructura.

Es detalla a continuació el flux de treball dels desplegaments d'Infraestructura.

![Definició a alt nivell dels workflows de CD per a Infraestructura](/images/GHEC/cd-workflow-infra-definition.png)


on:
* Download Plan : Selecció del codi a desplegar a l'entorn (env).
* PRE Audit ITSM : Crea un tiquet a ITSM indicant el començament del desplegament
* Health Check : Comprova l'accés tècnic al recurs.
* Functional Tests: Executa proves de funcionals amb Selenium invocant a M.A.T.
* Deploy (env): Desplegament o Apply de la infraestructura.
* POST Audit ITSM : Actualitza el tiquet ITSM indicant el final del desplegament i el seu estat.

* Deploy Validation (env): Validació del desplegament a l'entorn env.
* Email Comm : Enviament del resultat del desplegament per correu als afectats.
    
El nom Workflow en GHEC és **Infra CD Apply**

## Definició workflows - Functions 📝

### Workflow de Continuous Integration (CI) per a Function

Igual que passa amb el workflow d'aplicacions, s'ha diferenciat en el workflow entre:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la PR, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI per a Function](/images/GHEC/ci-workflow-definition-function.png)

Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi, eines de seguretat SAST i SCA. 

Nom del Workflow en GitHub : **FUNC CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.


![Definició a alt nivell dels workflows de CI per a Function](/images/GHEC/ci-workflow-definition-function-PR.png)


D'altra banda, si estem en temps de commit, i partint de la base que el paquet no ha de ser immutable entre els diferents entorns, en totes les fases es realitzaran els steps de Promoció (que actualitza la versió de l'artefacte en el còidg font) compilat, empaquetat, publicació de la funció a GitHub Packages, versionat de l'artefacte i versionat del repositori.

Nom del Workflow en GitHub : **FUNC CI on Commit**.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-function-CM.png)


### Worfklows de Continuous Deployment (CD) per a Function.

Es detalla a continuació el flux de treball dels desplegaments de Funciones.

![Definició a alt nivell dels Worfklows de CD per a Function](/images/GHEC/cd-workflow-function-definition.png)

on:
* Check Artifacts, realitzarà revisions sobre l’artefacte abans del desplegament.
* Env. Matrix, validarà si l’artefacte pot ser desplegat en l’entorn indicat.
* PRE-AUDIT : Crea un CRQ en ITSM indicant l’inici de desplegament.
* Deploy: desplegament de l’artefacte en l’entorn indicat.
* Health Check : Comprova l'accés tècnic al recurs.
* Functional Tests: Executa proves de funcionals amb Selenium invocant a M.A.T.
* POST-AUDIT: Completa la CRQ amb el resultat del desplegament.
* EMAIL COMM : Enviament del resultat del desplegament als afectats.
    
El nom Workflow en GHEC és **FUNC CD**


## Definició workflows - Contingut Estátic 📝

### Workflow de Continuous Integration (CI) per a Contingut Estátic

Igual que passa amb el workflow d'aplicacions, s'ha diferenciat en el workflow entre:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la PR, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI per a contingut estàtic](/images/GHEC/ci-workflow-definition-static.png)

Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi, eines de seguretat SAST i SCA. 

Nom del Workflow en GitHub : **Static CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.


![Definició a alt nivell dels workflows de CI per a Function](/images/GHEC/ci-workflow-definition-static-PR.png)


D'altra banda, si estem en temps de commit, i partint de la base que el paquet no ha de ser immutable entre els diferents entorns, en totes les fases es realitzaran els steps de Promoció (que actualitza la versió de l'artefacte en el còidg font) compilat, empaquetat, publicació del contingut estàtic a GitHub Packages, versionat de l'artefacte i versionat del repositori.

Nom del Workflow en GitHub : **Static CI on Commit**.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-static-CM.png)


### Worfklows de Continuous Deployment (CD) per a contingut estàtic.

Es detalla a continuació el flux de treball dels desplegaments de contingut estàtic.

![Definició a alt nivell dels Worfklows de CD per a Function](/images/GHEC/cd-workflow-static-definition.png)

on:
* Check Artifacts, realitzarà revisions sobre l’artefacte abans del desplegament.
* Env. Matrix, validarà si l’artefacte pot ser desplegat en l’entorn indicat.
* PRE-AUDIT : Crea un CRQ en ITSM indicant l’inici de desplegament.
* Deploy: desplegament de l’artefacte en l’entorn indicat.
* Health Check : Comprova l'accés tècnic al recurs.
* Functional Tests: Executa proves de funcionals amb Selenium invocant a M.A.T.
* POST-AUDIT: Completa la CRQ amb el resultat del desplegament.
* EMAIL COMM : Enviament del resultat del desplegament als afectats.
    
El nom Workflow en GHEC és **Static CD**


## Definició workflows - API's  📝

### Workflow de Continuous Integration (CI) per API Manager.

Igual que passa amb el workflow d'aplicacions, s'ha diferenciat en el workflow entre:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la PR, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI per API Manager](/images/GHEC/ci-workflow-definition-apimanager.png)


Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de validació de codi mitjançant el comandament validate de l'eina apic i aquest resultat es comenta en la PR. 


En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.

Nom del Workflow en GitHub : **APIM CI on PR**.

![Definició a alt nivell dels workflows de CI per per API Manager](/images/GHEC/ci-workflow-definition-API-Manager-PR.png)



D'altra banda, si estem en temps de commit, i partint de la base que el paquet no ha de ser mutable entre els diferents entorns, es comprova el tag generat en temps de PR, es publica l'artefacte a Github Artifacts i es torna a fer el tag del repositori.

Nom del Workflow en GitHub : **APIM CI on Commit**.

![Definició a alt nivell dels workflows de CI per API Manager](/images/GHEC/ci-workflow-definition-API-Manager-CM.png)


### Worfklows de Continuous Deployment (CD) Publish per API Manager.

Es detalla a continuació el flux de treball dels desplegaments de APIM Publish.

![Definició a alt nivell dels Worfklows de CD per per API Manager](/images/GHEC/cd-workflow-apimanager-publish-definition.png)


on:
* CHECK ARTIFACTS: Comprova l'existència i validesa de l'artefacte en el repositori.
* ENVIROMENT MATRIX: Valida si l'artefacte pot ser desplegat en l'entorn especificat.
* ITSM PRE AUDIT: Realitza una auditoria prèvia en ITSM creant una CRQ per a la preparació del desplegament (només en entorns diferents de dev).
* PUBLISH PRODUCT TO IBM API MANAGER (Deploy): Publica el producte a IBM API Manager segons els paràmetres configurats.
* ITSM POST AUDIT: Completa l'auditoria en ITSM després del desplegament, registrant l'estat final i completant la CRQ.
    
El nom Workflow en GHEC és **APIM CD PUBLISH**

### Worfklows de Continuous Deployment (CD) Operatives per API Manager.

Es detalla a continuació el flux de treball dels desplegaments de APIM Operativa.

![Definició a alt nivell dels Worfklows de CD per per API Manager](/images/GHEC/cd-workflow-apimanager-operativa-definition.png)

on:
* CHECKOUT: Realitza la verificació de codi en el repositori.
* CHECK ARTIFACTS: Verifica l'existència i validesa de l'artefacte al repositori.
* ENVIROMENT MATRIX: Valida si l'artefacte pot ser desplegat en l'entorn especificat.
* VALIDATIONS : Step preparat per a inserir les futures validacions a realitzar prèvies a l'execució de les operatives.
* ITSM PRE AUDIT: Realitza una auditoria prèvia a ITSM, creant una CRQ per al desplegament (només en entorns diferents de dev).
* PRODUCT OPERATION INTO IBM API MANAGER (Deploy): Executa operacions a IBM API Manager segons l'operació especificada.
* ITSM POST AUDIT: Completa l'auditoria a ITSM després del desplegament, registrant l'estat final i completant la CRQ.
    
El nom Workflow en GHEC és **APIM CD OPERATIVA**


## Definició workflows - Components tècnics d'aplicació mòbils (Android i iOS) 📝

### Workflow de Continuous Integration (CI) per a components tècnics d'aplicació mòbils (Android i iOS)

Amb el workflow de CI proposat es força l'usuari a treballar i realitzar canvis a través de Pull Requests, tal i com s'ha definit en el [Model de GitFlow i GitOps.](../../modelTreball/model-gitflow-gitops)

S'ha definit l'execució del workflow, quan:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-mobileapps.png)

Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi. 

Nom del Workflow en GitHub : **App iOS CI on PR / App Android CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-mobileapps_PR.png)

### Worfklows de Continuous Deployment (CD) per a aplicacions mòbils (Android i iOS)

El workflow de Desplegament Continu (CD) s'ha aïllat del workflow de CI per desvincular els entorns de desplegament de les diferents branques d'un repositori, així com desacoblar la generació d'un artefacte "deliverable" del propi workflow de desplegament. D'aquesta manera, es defineix un workflow de CD que pot generar un artefacte i desplegar-lo en l'entorn que es desitgi, ja sigui en producció o en un entorn previ. **Actualment només per producció**

Els diferents steps que es defineixen a alt nivell són els que es mostren en el diagrama següent:

![Definició a alt nivell dels workflows de CD](/images/GHEC/cd-workflow-mobileapps-definition.png)

* **Flux de Deploy CD**: Realitzarà el desplegament d'un artefacte en l'entorn indicat. Tindrà com a Steps:
    1. Fetch variables: farà la captura de les dades de la app per l'entorn indicat.
    2. Check tag: validarà que l'artefacte pot ser generat per l'entorn indicat.
    3. Build: compilar l'aplicació.
    4. Sign: firmar l'aplicació.
    5. Deploy: desplegament de l'artefacte en l'entorn indicat.
    6. Create tag: realitzà el tag al repo segons l'entorn indicat.

    Nom del Workflow en GitHub : **App iOS CD / App Android CD**

## Definició workflows - Components tècnics de llibreries mòbils (iOS) 📝

**Per la naturalesa de les llibreries mòbils d'iOS, no es genera cap artefacte i per tant el workflow de CD no existeix.**

### Workflow de Continuous Integration (CI) per a components tècnics de llibreries mòbils (iOS)

Amb el workflow de CI proposat es força l'usuari a treballar i realitzar canvis a través de Pull Requests, tal i com s'ha definit en el [Model de GitFlow i GitOps.](../../modelTreball/model-gitflow-gitops)

S'ha definit l'execució del workflow, quan:
+ Canvis en temps de Pull Request (PR), que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la PR, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", es provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama:

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-mobilelibrary-ios.png)

Si es crea una PR d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi. 

Nom del Workflow en GitHub : **Library iOS CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, donat que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-mobilelibrary-ios_PR.png)

D'altra banda, si estem en temps de commit, el workflow dependrà de la branca a la qual es faci l'integració:

* Nom del WorkFlow si el Commit és a development : **Library iOS CI on Commit to develop**.
* Nom del Workflow si el Commit és a release o master :  **Library iOS CI on Commit to release o master**.

![Definició a alt nivell dels workflows de CI](/images/GHEC/ci-workflow-definition-mobilelibrary-ios_CM.png)

Addicionalment, cal destacar que no es permetrà a l'usuari o desenvolupador d'aplicacions, la creació manual de tags, ja sigui en repositori d'artefactes o registre d'imatges, ja que aquest procés serà automatitzat en els workflows i serà gestionat pel propi workflow.  
