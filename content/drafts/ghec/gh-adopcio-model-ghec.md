
+++
date         = "2024-04-19"
title        = "Nou model de CI/CD a cloud públic"
description  = "Guies necessàries per la integració al nou model de CI/CD a cloud públic"
weight      = "1"
sections    = ["GHEC"]
+++

## Objectiu 🚀
El present document descriu les guies necessàries per la integració d'aplicacions al nou model de CI/CD a cloud públic.

A continuació, es descriuen els principals objectius que es busquen en implantar aquest model i que impacta en la gestió i automatització del cicle de vida de les aplicacions, construcció, qualitat i desplegaments.

+ **Eficiència i millora de l'operació** : L'adopció a escala d'una plataforma com a servei (SaaS) implica grans avantatges pel que fa a l'operació davant una plataforma 'custom', ja que l'evolució i operació dels components de la plataforma, així com, de la infraestructura que la suporta, són responsabilitat del proveïdor del SaaS (GitHub en aquest cas), incloent seguretat física i d'accessos,  disponibilitat, escalabilitat i rendiment, dimensionament de la infraestructura en base a demanda, actualitzacions requerides derivades de possibles vulnerabilitats o millores, etc.

+ **Foment de la Innovació** : El proveïdor de la plataforma facilita l'accés a la innovació, ja que les últimes novetats estaran disponibles per a CTTI sense requerir una inversió específica per a això. A més, sent una plataforma nativa per al núvol, facilita l'adopció d'aquestes pràctiques d'enginyeria, en particular l'adopció d'arquitectures **'Serverless'o basades en contenidors** sense que això impliqui gestionar recursos d'infraestructura o plataforma (p.ex. ús de Lambda o Fargate enfront de la gestió de clúster Kubernetes a escala).

+ **Balancejar la capacitat de control i prescripció d'estàndards enfront de la flexibilitat en els projectes** : El model d'operació sobre una plataforma Cloud gestionada i centralitzada proveeix facilitats per tenir alts nivells d'estandardització i control de les càrregues de treball mitjançant la prescripció d'estàndards i bones pràctiques la qual cosa deriva en millores de productivitat. Simultàniament, aporta flexibilitat, la qual cosa permet als equips que tenen necessitats especials de ser independents i que l'equip central d'arquitectura i operació no sigui coll d'ampolla en el funcionament dels projectes.

+ **Primer pas cap a un model self-service i el paradigma DevEx** , el qual introdueix grans millores en l'experiència dels desenvolupadors.

És important comentar que aquest nou model de CI/CD basat en GitHub Enterprise Cloud, d'aquí en endavant GHEC, es recolzarà en el serveis del proveïdor Cloud AZURE per:
  + Gestió de grups i usuaris amb Azure Entra ID
  + Emagatzematge d'informació (Storage Accounts) i secrets (KeyVaults)
  + Ús de Self-hosted Runners
  
## Integració d'aplicacions

Com s'ha comentat en el punt anterior, aquest és el primer pas cap a un model self-service on els equips de desenvolupament podran, **automàticament** adherir-se al nou model GHEC.

El procés d'integració actualment és el següent :

  ![Procés de creació de Model GHEC](/images/GHEC/gh_proceso_automatico_pub.png) 

1. **Onboarding del projecte**

    Per tal d'integrar una nova aplicació al nou model de CI/CD a cloud públic, hi hauran dues modalitats:

    **Migració del CI/CD nadiu d'AWS o Azure a GHEC**

    Per sol·licitar la migració del CI/CD nadiu d'AWS o Azure a GHEC cal realitzar una petició JIRA al següent projecte [ACOCLDSIC - Servei Acompanyament Suport Cloud i SIC](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLDSIC) amb l'assumpte "Migració CI/CD aplicació XXX d'Azure DevOps / AWS Codepipeline a GitHub Enterprise Cloud (GHEC)" especificant la següent informació:

      + Codi de Diàleg, exemple "0189".
      + Codi de Component, per exemple "00", "01".
      + Taula de components tècnics a crear amb el següent detall:

          | Nom tècnic component      | Funció           | Tipus  |
          | ------------- |:-------------:| -----:|
          | NomTecComponent1  | backend | container |
          | NomTecComponent2  | frontend | container |
          | NomTecComponent3  | library | library |
          | NomTecComponent4  | infra | infra |
          | NomTecComponent5  | frontend | static |

          + Nom component
          + Funció del component tècnic amb els següents valors disponibles :
            + infra
            + backend
            + frontend
            + library
          + Tipus de component tècnic: On s'identificarà si el component tècnic d'aplicació a crear és una Llibreria, una Funció (lambda, azure functions, etc), Infraestructura o una imatge de contenidor.  Els possibles valors són :
            + function : Per crear una repositori que desplegui una funció Lambda, Azure Funcions, etc.
            + library : Per demanar la creació d'un repositori que desplegui una llibreria.
            + infra : Per demanar la creació d'un repositori que desplegui infraestructura..
            + container : Per sol·licitar la creació d'un repositori que desplegarà una imatge de contenidors.
            + static : Per sol·licitar la creació d'un repositori que desplegarà Un contingut estàtic.

      Addicionalment als repositoris pels components que es demanen, se'n crearà un automàticament per a propòsits de **Testing**. 

      + Entorns a crear:
        + dev,pre,pro
        + pre,pro


    **Integració de nova aplicació**

    L'alta d'una nova aplicació seguirà el flux normal d'Integració de Solucions (ISOL), a partir de la qual arribarà el tiquet pertinent a l'equip de Suport Cloud/SIC. Més detall a https://canigo.ctti.gencat.cat/plataformes/cloud/comunicacio-suport-cloud#aplicacions-en-fase-de-projecte. És important que la taula de components vingui especificada en el Document d'Arquitectura (DA) de la solució a integrar.

    Un cop rebuda la petició, es processarà per part dels equips pertinents, i mitjançant un procés **automàtic**, es crearan els components i/o recursos necessaris a GitHub Enterprise Cloud i a Azure. 
  
  2. **Configuració del model GHEC**
  Un cop ha finalitzat el procés automàtic que crea tots els recursos necessaris per donar suport al model, s'han de realitzar les següents configuracions bàsiques : 

         
      + **Alta d'usuaris en grups depenent del Rol** 

        El procés automàtic de creació del model crea automàticament un conjunt de grups d'Azure Entra ID que s'utilitzaran per assignar rols a usuaris.

        Els grups que es creen depenen del departament, entitat i lot de manteniment de l'aplicació (exceptuant els transversals).
        Si el team ja existeix prèviament, no es tornarà a crear :
        + sec-read: Equip transversal de Seguretat (ACC).
        + qa-read: Equip transversal de Qualitat (CTTI).
        + srv-read: Equip transversal de Servei (CTTI).
        + arq-read: Equip transversal d'Arquitectura (CTTI).
        + </departament/>-</entitat/>-</lot_manteniment/>-maintain: Leaders tècnics del lot de manteniment.
        + </departament/>-</entitat/>-</lot_manteniment/>-write: Desenvolupadors del lot de manteniment.
        + </departament/>-</entitat/>-read: Per a Gestors de Solucions / Entrega de l'àmbit.

        Una vegada creats els grups, cal que l'owner o owners identificats donin d'alta els diferents usuaris en els grups pertinents depenent del rol que han de realitzar (Maintain o Write).
        
      
        Només cal actualitzar els grups de Maintain i Write, donat que la resta seran informats automàticament pel procés automàtic.
                
        Per executar aquesta tasca, l'owner disposarà de l'aplicació **myaccount** de Microsoft on haurà de: 

          1. Accedir a MyGroups per a l'organització de la Generalitat de Catalunya.
            [https://myaccount.microsoft.com/groups](https://myaccount.microsoft.com/groups)
            
              Les credencials d'accés són les de Generalitat de Catalunya, introduint l'usuari @gencat.cat.
          
              ![Grups credencials ](/images/GHEC/gh-mygroups-credenciales.png)
            
          2. Un cop ha iniciat sessió, l'owner disposarà d'una opció de menú per veure tots els grups dels quals té el rol d'Owner i que podrà gestionar afegint o eliminant usuaris des de l'opció "Groups I Own".

              ![Grups](/images/GHEC/gh-mygroups.png)

          3. Seleccionant el grup que vulgui modificar, tindrà la possibilitat d'afegir/eliminar usuaris. Per a això existeixen dues opcions de menú "Members" i "Owner" on, clicant en el botó "Add" podrà buscar els usuaris i afegir-los amb diferents permisos "Members" i "Owners" :

                ![Grups](/images/GHEC/gh-mygroups-add.png)

                + Permisos d'Owner : El nou usuari podrà ser Owner del grup i li permetrà poder afegir a altres usuaris.
                + Permisos de Member : El nou usuari serà Member del grup.  NO podrà afegir altres usuaris.
                + Permisos d'Owner i Member : El nou usuari serà Membre i Owner del grup.
              
                  ![Grups](/images/GHEC/gh-mygroups-addinguser.png)

               **Els usuaris a afegir són els pertanyents al domini @gencat.cat**

          4. Una vegada sincronitzat Azure Entra ID amb GHEC, els usuaris inserits/eliminats es veuran reflectits en GHEC en els Teams vinculats als grups d'Entra ID i automàticament se li assignaran permiSsos depenent del Team.
      
          Per a més informació, es pot consultar [Jerarquia i nomenclatura de Teams i nomenclatura de Repositoris ](../gh-model-govern) amb informació addicional de la creació de teams.

          Addicionalment, en el següent Link, es podran consultar els permisos de cada rol [Roles y permisos de Repositoris ](../gh-rols-repositori).


      + **Configuració Inicial per a invocacions ITSM**

        Dins dels diferents workflows de CD, existiran steps encarregats de realitzar invocacions a ITSM (Remedy) en les quals es crearan WorkOrders on s'indicarà que el sistema està realitzant un desplegament d'una aplicació i l'estat final d'aquest desplegament.
        
        Per comunicar-nos amb la plataforma ITSM serà necessari configurar el fitxer **itsm-input.json**, disponible al repositori, on s'indicaran les característiques del tiquet que es crearà en base a la naturalesa del desplegament.

        + "ITSM_SERVICE" : Servei Remedy que realitza el desplegament.  És important **afegir exactament el valor donat d'alta en Remedy**. 
       
        + "ITSM_CLASS" :  Podrà tenir els següents valors, depenent del tipus de desplegament :
          + Normal
          + Emergency
        
        + "TYPE_AFFECTATION" : Podrà tenir els següents valors :
           + DEGRADACIO
           + SENSE TALL DE SERVEI
           + TALL DE SERVEI

        + ITSM_AFFECTATION : Text lliure per indicar el motiu del desplegament

        + "ITSM_IMPACT" : Per indicar l'impacte que pot tenir el desplegament, amb els possibles valors :
           + 4-Minor/Localized
           + 3-Moderate/Limited 
           + 2-Significant/Large
           + 1-Extensive/Widespread

        + "ITSM_TIER3" : Nivell 3 de categorització Remedy d'un tiquet que podrà tenir els següents valors :

          + ADAPTATIU
          + CORRECTIU
          + EVOLUTIU
          + PREVENTIU
          + VERSIO
          + VULNERABILITAT

        + "ITSM_PRIORITY" : Prioritat del desplegament amb els següents valors :

          + 4-Low
          + 3-Medium
          + 2-High
          + 1-Critical

      
## Plataforma llesta, comencem a treballar

Una vegada fet el setup inicial, cal recalcar que també **existirà una nova metodologia de treball**, la qual es detallarà en els següents punts i enllaços:

+ **Gestió i ús de branques**: El model de gestió i ús de branques que s'ha implantat és el basat en el model estàndard de GitFlow. 

  ![Model GitFlow simplificat](/images/GHEC/gitflow-recommended-model.png)  

  En el següent link [Model GitFlow](../model-gitflow-gitops), es mostra l'article amb els models a seguir, juntament amb les branques que entren en joc.

  En cas que el projecte no pugui adaptar-se a aquest model, caldrà realitzar una petició a perquè sigui estudiada la nova variant i veure'n la viabilitat.
  Addicionalment, i encara que s'han desvinculat les branques proposades amb els entorns disponibles per al desplegament, els workflows de CD disposen d'un pas anomenat **"Env Matrix"** que realitza validacions per discernir si un artefacte pot ser desplegat en un entorn en base al seu etiquetat (generat en el workflow de CI).  

  La política actual, es mostra en el diagrama següent:

  ![Model gitflow simplificat](/images/GHEC/gh_env_matrix.png)  

  Aquesta matriu pot ser modificada en base a les decisions que es prenguin segons les experiències o necessitats que vagin sorgint.

+ **Implantació de model de Merge amb Pull Request**.  El model de treball amb Pull Request a GitHub descriu una metodologia en la integració de branques en GHEC en la qual intervenen dos actors.
  
  Aquest procés permet la revisió del contingut d'una branca Feature a integrar en una principal abans de realitzar el Merge. Si el contingut d'aquesta branca no és apte pels criteris de la persona que tingui el rol de revisor, aquesta branca no s'integrarà i se li demanarà al desenvolupador que solucioni els problemes trobats.

  Aquest model aposta per la qualitat i la detecció d'errors quan abans millor (shift-left).

  1. Sol·licitud de Pull Request i aprovació pel Reviewer.

  ![Pull Request](/images/GHEC/pullrequestOK.png)

  2. Sol·licitud de Pull Request, sol·licitud de més informació per part del Reviewer i nova sol·licitud de Pull Request després d'afegir els canvis sol·licitats.

  ![Pull Request demanant més informació ](/images/GHEC/pullrequestKO.png)

  En el següent enllaç [Model de Pull Request](../gh-model-pull-requests) es pot observar en detall les característiques i operativa del model, així com els seus principals avantatges.

  Aquest model de treball és de caràcter obligatori, i prova d'això és que les branques principals Develop, Release i Master estaran bloquejades per realitzar integracions directes sense l'ús de Pull Request.


+ **Model GitOps per diferents WorkFlows de Continuous Deployment (CI + CD)**

  Per a cadascun dels repositoris creats, exceptuant *-test, es creen un conjunt de workflows que seran els que executin les tasques de CI/CD d'infraestructura (*-infra) i d'aplicació (tota la resta).
        
  Pels workflows d'aplicació, existeixen diferents modalitats depenent del tipus de component que contindrà el repositori sol·licitat: 
    + function: Workflows per desplegar Functions.
    + library: Workflows per desplegar Llibreries.
    + static: WorkFlows per desplegar Contingut Estàtic.
    + container: Repositoris per desplegar Contenidors.
    + infra: Repositoris per desplegar Infraestructura.


  L'accés a aquests workflows es realitzarà a través de l'opció "Actions" de cada repositori a GHEC. 
                
  Accés a GHEC : [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/)
        
  En aquest cas, es mostra un exemple de creació de Workflows per a repositoris el tipus de funció dels quals és una imatge de contenidors.

  ![Accés a Workflows Imatge Contenidors](/images/GHEC/gh-imagen-acceso-action.png)


  L'execució dels workflows, dependran de la seva tipologia i del model definit, essent :
    - Workflows de CI (app i infra) : Executats **automàticament** en la sol·licitud d'un Pull Request o en l'execució d'un Merge de dita Pull Request.
    - Workflows de CD (app i infra) : Executats **sota demanda** a través de la interfície web de GHEC.

          
  Dins del repositori, el codi dels workflows estarà disponible en la següent ruta: \<repositori\>/.github/workflows

  Exemple :

    ![Ruta de Workflows](/images/GHEC/gh-ruta-workflows.png)
         
  En el següent enllaç està tota la informació dels Workflows disponibles així com el detall necessari pel seu ús: [Definició de Workflows d'aplicatiu i d'Infraestructura](../gh-definicio-workflows).


+ **Tags i versionat de components**. Dins d'aquest model de desenvolupament, el versionat i tags d'rtefactes estarà bloquejat al desenvolupador, de tal manera que seran els workflows automàtics de CI els que s'encarreguin d'aquesta tasca, permetent al desenvolupador **només el versionat del seu codi font**.

  S'ha instaurat el model Semantic Version 2.0. Tota la documentació relacionada es pot consultar en el següent link [Model de Tag i versionat](../gh-definicio-versionat).

+ **Configuració de notificacions**. Dins d'aquest model de desenvolupament, les notificacions de les execucions de workflows es mostraran a la safata de notificacions de GitHub, així com també es rebran via correu electrònic. Per al seu correcte funcionament els usuaris hauran de configurar-les.  

  Tota la documentació relacionada es pot consultar en el següent link [Configuració de notificacions](../configuracio-notificacions).

## Exemples de model de treball per a CI/CD

  Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
  + Gestió de branques amb un model Gitflow.
  + Integracions de branques basades en Pull Request.
  + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.


 | Exemples   ||||
|--------------|-|-|-|
|[e2e Container](../exemples/gh-exemple-e2e-container) | [e2e Infraestructura](../exemples/gh-exemple-e2e-infra) | [e2e Contingut estàtic ](../exemples/gh-exemple-e2e-cs) | [e2e Function ](../exemples/gh-exemple-e2e-function) |