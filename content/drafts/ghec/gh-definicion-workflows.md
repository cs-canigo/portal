
+++
date         = "2024-04-09"
title        = "Definició de Workflows a alt nivell"
description  = "Definició de Workflows a alt nivell"
weight      = "2"
sections    = ["GHEC"]
+++

## Objectiu 🚀
El present document descriurà el resultat de la definició a alt nivell dels Workflows de CI/CD per a GitHub Enterprise Cloud en el projecte en curs per al Centre de Telecomunicacions i Tecnologies de la Informació de la Generalitat de Catalunya.

## Al detall 📋

Es proposen diferents definicions de workflows a alt nivell. S'ha considerat separar o aïllar els workflows en uns més específics i evitar així la creació d'un workflow amb massa lògica que integri tant el CI com el CD. Aquests workflows llançaran triggers o faran trucades a d'altres per fer una cadena i que cada procés es trobi ben definit.


Es detallarà tant per a fluxos d'aplicació com fluxos per a infraestructura.

## Workflow de Continuous Integration (CI) per a aplicacions
Amb el workflow de CI proposat es força l'usuari a treballar i realitzar canvis a través de Pull Requests com s'ha definit en el model de GitFlow en [Models de GitFlow i GitOps.](../model-gitflow-gitops)

S'ha diferenciat en el workflow entre:
+ Canvis en temps de Pull Request, que equivaldria al procés pel qual un usuari crea la PR, i encara no és validada per un moderador o usuari del repositori.
+ Canvis en temps de Commit, que equivaldria al procés després d'haver-se acceptat la Pull Request, i integrar ambdues branques involucrades. 

Depenent d'aquestes branques que es vulguin "mergear", provocarà que s'executin diferents steps amb diferents jobs com s'observa en el següent diagrama.

![Definició a alt nivell de les workflows de CI](/images/GHEC/ci-workflow-definition.png)

Si es crea una Pull Request d'una branca feature a la branca develop, en temps d'execució es llançarà el workflow de CI que executarà els steps de compilació, tests unitaris, inspecció de codi, eines de seguretat SAST i SCA. 

Nom del Workflow en GitHub : **APP CI on PR**.

En canvi, si la PR es fes entre les branques develop-release, release-master, hotfix-master, s'ometrien aquests steps i es realitzaria un fast-forward, ja que tots ells haurien estat executats i validats prèviament, ja que teòricament el codi no rep més canvis des que entra en la branca develop en endavant.




![Definició a alt nivell de les workflows de CI](/images/GHEC/ci-workflow-definition_PR.png)


D'altra banda, si estem en temps de commit, existiran dos tipus de fluxos depenent del tipus de si es vol treballar amb una Aplicació o amb una Llibreria.  

+ En el cas d'una **aplicació** i partint de la base que **la imatge que es genera i es puja al registre d'imatges ha de ser immutable** en les següents fases, s'executaran els steps de compilació, empaquetat, dockerització, push, CI/SAST/SCA (si no s'ha executat prèviament en temps de pull request),  assignació de tags d'imatges i assignació de tag de repositori.   
Els diferents steps es llançaran en funció de les branques involucrades en el procés com s'observa en el diagrama.  
**En cap moment es permetrà modificar la imatge registrada en branca Development en treballar a Release o Master.**

    El nom del workflow en el repositori dependrà de la branca a la qual es faci la integració : 

    * Nom del WorkFlow si el Commit és a development : **APP CI on Commit to develop**.

    * Nom del Workflow si el Commit és a release o master :  **APP CI on Commit to release o master**.


![Definició a alt nivell de les workflows de CI](/images/GHEC/ci-workflow-definition_CM_app.png)

+ En el cas que l'artefacte sigui una Llibreria, el flux de commit serà diferent, ja que l'objectiu del pipeline de llibreries és ser desplegada en un repositori de llibreries, tipus Artifactory, Nexus o Git Hub Packages i no el desplegament en cap infraestructura amb servidors d'aplicacions. 
En aquest cas, a diferència del workflow d'aplicacions, la llibreria que es genera en els diferents entorns no ha de ser immutable pel que:
    + En fase **Commit Development** , només cal realitzar el compilat, empaquetat, pujada de l'artefacte al repositori de llibreries i l'etiquetatge en aquest repositori.

    + En les fases de **Commit per a Release i Master**, a més dels steps de Commit Development, s'afegiran steps de "Promoció" que actualitzaran la versió de l'artefacte internament en el fitxer pom.xml.
    
    Diagrama per a CI de llibreries.

![Definició a alt nivell de les workflows de CI](/images/GHEC/ci-workflow-definition_CM_lib.png)

Addicionalment, cal destacar que no es permetrà a l'usuari o desenvolupador d'aplicacions, la creació manual de tags, ja sigui en repositori o registre d'imatges, ja que aquest procés serà automatitzat en els workflows i serà gestionat pel propi workflow.  

A més, hi haurà diferents steps miscel·lanis com el de creació d'una branca, l'esborrat d'una branca, el "next major/minor version", el "bolets", "pre commit" i "post commit".

Conforme s'avanci en el projecte, es proposa la creació de workflows "llançadors" que serveixin d'orquestradors dels diferents workflows de CI/CD, podent triar a través de manifestos en format .yaml la configuració a executar i el flux a seguir, podent controlar-se la paral·lelització o seqüencialitat dels processos.

## Worfklows de Continuous Deployment (CD) per a aplicacions

El workflow de Desplegament Continu (CD) s'ha aïllat del workflow de CI per desvincular els entorns de desplegament de les diferents branques d'un repositori. Això és, es proposa la creació d'un workflow de CD que pugui rebre qualsevol artefacte generat prèviament en el workflow de CI i desplegar-lo en l'entorn que es desitgi, ja sigui en producció o en un entorn efímer de proves.

Els diferents steps que es defineixen a alt nivell són els que es mostren en el diagrama següent:

![Definició a alt nivell de les workflows de CD](/images/GHEC/cd-workflow-definition.png)
* **Flux de Deploy CD**: Realitzarà desplegament d'un artefacte en l'entorn indicat.  Tindrà com a Steps:
    1. Check Artifacts, realitzarà revisions sobre l'artefacte abans del desplegament.
    2. Env. Matrix, validarà si l'artefacte pot ser desplegat en l'entorn indicat.
    3. PRE-AUDIT : Crea un CRQ en ITSM amb la indicant inici de desplegament.
    4. Deploy: desplegament de l'artefacte en l'entorn indicat.
    5. POST-AUDIT: Completa CRQ amb el resultat del desplegament.
    6. EMAIL COMM : Enviament del resultat del desplegament per correu al owner de l'execució del workflow.
    
    Nom del Workflow en GitHub : **APP CD**

* **Flux Rollback**: Realitzarà un rollback d'un artefacte en l'entorn indicat.  Aquest artefacte ja va ser analitzat quan va ser desplegat per primera vegada, per la qual cosa no és necessari realitzar una anàlisi de qualitat sobre aquest i el seu desplegament serà directe.
 
    Nom del Workflow en GitHub : **APP CD**

* **Flux Validate**: Flux que, una vegada desplegat l'artefacte en l'entorn demanat, realitza totes les proves necessàries que verifiquin que aquest lliurament és apte per pujar a producció.  Aquestes proves s'executaran en els següents steps: 
    
   1. Functional Tests: on es realitzaran proves funcionals de l'increment de producte.
   2. Regression Tests: on es realitzaran proves de regressió de tota l'aplicació.
   3. Security Tests: on es realitzaran totes les proves de seguretat per certificar que el producte no té vulnerabilitats.
   4. Performance Test: on es realitzaran proves de rendiment per assegurar que el producte serà capaç de tenir un performance optim davant d'una alta càrrega de peticions.

    Nom del Workflow en GitHub : **Validation Workflow**

    Per a aquestes 4 fases de validació del producte, el workflow s'integrarà amb la nova eina de Qualitat de CTTI anomenada **MAT** la qual disposarà de les eines necessàries **as a Service** per a realitzar les proves indicades.

    Aquesta integració es realitzarà mitjançant invocacions a l'API de Jenkins que orquestra els diferents pipelins de proves que proveeix MAT amb les següents eines:

    * Interfície proposat d'integració:
        * IN
            + URL MAT
            + NOM DEL COMPONENT
            + USUARI
            + TOKEN
            + URL REPOSITORI COMPONENT
            + ENTORN
            + BRANCA
            + URLAPP
            
        * OUT
            + EXIT CODE : 0 - SUCCESS; 1 - FAILURE
            + LOG

Aquesta interfície ha sigut realitzada després de 
diverses reunions amb l'equip Qualitat encarregat d'implementar l'eina **MAT**.  A futur, la coordinació d'aquest equip i el de GitHub acabarà de definir eines, interfícies que aportin la màxima qualitat al producte a desplegar.


## Worfklows de Continuous Integration (CI) per a infraestructura.

Es torna a apostar (depenent de la branca) per l'ús de Pull Request per realitzar un commit a branques (develop, release, màster/main).

Per això, es diferenciaran els workflows depenent de l'acció que es realitzi, pull request o commit.

En el següent diagrama s'observa el flux definit:

![Definició a alt nivell de les workflows de CD per a Infraestructura](/images/GHEC/ci-workflow-infra-definition.png)

on:
* Checkout: Descarregarà el codi del repositori.
* Format Check: Realitzarà validacions de format als scripts.
* Scan Check: Realitzarà validacions estàtiques dels scripts con CHECKOV.
* Cost Check: Validació del cost d'infraestructura 
* Terraform Plan & Store : Generació del terraform Pla i emmagatzematge en el Storage Account de l'aplicació.

* Github Tag: Etiquetat de l'scripts a Github.
* Archive (opcional): Registre en repositoris d'artefactes.


Per a PR, el nom Workflow en GHEC és **Infra CI on PR** 

Per a PR, el nom Workflow en GHEC és **Infra CI on Commit**

Una vegada realitzat Terraform Pla, tota la informació s'adjunta en la Pull Request perquè el approver d'aquesta pugui disposar de tota la informació suficient per a realitzar l'aprovació.

## Worfklows de Continuous Integration (CD) per a infraestructura.

Es detalla a continuació el flux de treball en el cas dels desplegaments d'Infraestructura.

![Definició a alt nivell de les workflows de CI per a Infraestructura](/images/GHEC/cd-workflow-infra-definition.png)



on:
* Download Plan : Selecció de l'script a desplegar per a l'entorn (env).
* PRE Audit ITSM : Crea un tiquet a ITSM indicant el començament del desplegament

* Deploy (env): Desplegament o Apply de la infraestructura.
* POST Audit ITSM : Actualitza el tiquet ITSM indicant el final del desplegament i el seu estatus.

* Deploy Validation (env): Validació del desplegament a l'entorn env.
* Email Comm : Enviament del resultat del desplegament per correu al owner de l'execució del workflow.
    
El nom Workflow en GHEC és **Infra CD Apply**
