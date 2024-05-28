
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
      | nombreRepo1  | backend | container |
      | nombreRepo2  | frontend | container |
      | nombreRepo3  | library | library |
      | nombreRepo4  | infra | infra |
      | nombreRepo5  | frontend | static |

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

      + **Configuració dels diferents WorkFlows de Continuous Deployment (CI + CD)**

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
        
        Aquests workFlows, **necessiten una parametrització bàsica i que només es realitzarà una vegada**. A l'enllaç anterior es detallen els workflows/fitxers i els inputs a actualitzar **en una branca feature que posteriorment s'anirà promocionant a les diferents branques**.


  
## Plataforma llesta, comencem a treballar

Una vegada fet el setup inicial a nivell d'accesos i workflow, cal recalcar que també **existirà una nova metodologia de treball**, la qual es detallarà en els següents punts i enllaços:

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

+ **Tags i versionat de components**. Dins d'aquest model de desenvolupament, el versionat i tags d'rtefactes estarà bloquejat al desenvolupador, de tal manera que seran els workflows automàtics de CI els que s'encarreguin d'aquesta tasca, permetent al desenvolupador **només el versionat del seu codi font**.

  S'ha instaurat el model Semantic Version 2.0. Tota la documentació relacionada es pot consultar en el següent link [Model de Tag i versionat](../gh-definicio-versionat).

+ **Configuració de notificacions**. Dins d'aquest model de desenvolupament, les notificacions de les execucions de workflows es mostraran a la safata de notificacions de GitHub, així com també es rebran via correu electrònic. Per al seu correcte funcionament els usuaris hauran de configurar-les.  

  Tota la documentació relacionada es pot consultar en el següent link [Configuració de notificacions](../configuracio-notificacions).

+ **Exemple de model de treball per a CI/CD d'una aplicació**

  Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
    + Gestió de branques amb un model Gitflow.
    + Integracions de branques basades en Pull Request.
    + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.

    En el següent exemple es mostra l'execució e2e d'un flux de treball, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció.  La infraestructura ha estat desplegada prèviament.  En el cas que l' aplicació no disposi d' entorn de desenvolupament, **l' estratègia seria la integració de feature en develop i d' aquesta a rellegeixi sense desplegar en l' entorn de development.**
    
    

    L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

  1. **Integració en branca develop des de feature**
      L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
         
      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_e2e_step1.png)

            
      Objectiu : Integració de feature a develop i generació d'artefacte per a desplegament en Desenvolupament.

      Actors:
      * Usuari amb Rol Write que realitza el desenvolupament.
      * Usuari amb Rol Maintain que aprova la Pull Request(PR).
            
      Execució de Workflows : Automàtic
      * Container CI on PR en realitzar la PR.  Genera l'artefacte, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Container CI on Commit to develop, en realitzar el Commit, empaquetant el codi en una imatge de contenidor i pujant-la al registre d'imatges GitHub Packages.
            
      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada de la imatge de contenidor a GitHub Packages.
      * Tag del repositori a 0.0.1-SNAPSHOT i Tag de la imatge a app.0.0.1-SNAPSHOT.

  2. **Validació funcional d'artefacte en desenvolupament.**
      L'usuari es disposa a realitzar el desplegament de l'artefacte generat en el pas 1 i desplegar-lo en l'entorn de desenvolupament per a la seva validació funcional.

      ![Validació funcional d'artefacte en desenvolupament](/images/GHEC/gh_ejemplo_e2e_step2.png)

      Objectiu : Desplegament en desenvolupament de l'artefacte generat anteriorment per a la seva validació.

      Actors:
        * Usuari amb Rol Write o Maintain.
            
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * Container CD, comprova que existeixi la imatge, que es pugui desplegar en l'entorn, i executa el desplegament.

          En aquest cas l'execució és manual i per a això l'usuari (independentment del seu rol, però s'aconsella que sigui el de maintain) tindrà que :

          1. Accedir als WorkFlows del repositori mitjançant l'opció "Actions", indicada en l'apartat **Configuració dels diferents WorkFlows de CI/CD**

          2. Seleccionar el workflow a executar, en aquest cas Container CD, i prèmer "Run Workflow", apareixent el formulari per introduir la informació necessària per l'execució: 

              ![Execució Manual Workflow CD](/images/GHEC/gh-ejecucion-manual-wf.png)
                
                
            * Branca o branch on es troba el workflow actualitzat: develop.
            * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-SNAPSHOT.
            * Environment : dev, per al desplegament a desenvolupament. 
                              
      Resultat de l'operació :
        * Codi desplegat a l'entorn de Desenvolupament per a la seva validació.

  3. **Integració en branca release des de develop**
     Un cop validat el codi en l'entorn de desenvolupament, el desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment al pas 4.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_e2e_step3.png)

      Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic.
      * Container CI on Commit en aprovar la Pull Request. L'artefacte ha estat creat a la fase anterior i només es realitza un "Re-Tag" amb el tag de release.
            
      Resultat de l'operació :
      * Branca develop integrada en release.
      * Re-Tag de la imatge de contenidor en GitHub Packages a app.0.0.1-RC (Release Candidate).
      * Re-Tag del repositori a 0.0.1-RC (Release Candidate).
            

  4. **Validació funcional d'artefacte en Preproducció**
      Estant disponible la imatge amb un tag vàlid, es realitza el desplegament per realitzar les validacions necessàries.

      ![Validació funcional d'artefacte en Preproducció](/images/GHEC/gh_ejemplo_e2e_step4.png)
                
      Objectiu : Desplegament en Preproducció de l'artefacte per a la seva validació funcional.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * Container CD, comprova que existeixi la imatge, que es pugui desplegar en l'entorn de Preproducció, i executa el desplegament informant en ITSM.

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):  
          * Branca o branch on es troba el workflow actualitzat: release.
          * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
          * Environment : pre, per al desplegament a Preproducció. 
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.

        Resultat de l'operació :
        * Codi desplegat a l'entorn de Preproducció per a la seva validació. [Pendent] Es realitzaran validacions mitjançant la integració amb el Marc d'Automatització de Testing (MAT) i MAM (Marc d'Automatització de Monitoratge).  

              
  5. **Integració en branca master des de release**
      Una vegada realitzara la validació funcional, l'usuari es disposa a integrar en master per a deixar un artefacte disponible per a desplegar en Producció.

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_e2e_step5.png)

      Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic
      * Container CI on Commit en aprovar la Pull Request. L'artefacte ha estat creat a la fase anterior i només es realitza un "Re-Tag" amb el tag de master.
            
      Resultat de l'operació :
      * Branca release integrada en master.
      * Imatge de contenidor, a GitHub Packages, amb nou Tag per desplegament en Producció app.0.0.1 (Final).
      * Re-Tag del repositori a 0.0.1.
      
          
  6. **Desplegament d'aplicació a Producció**
      Una vegada hi ha l'artefacte disponible a GitHub Packages amb un tag que habilita la seva promoció a pro, i totes les validacions realitzades en entorns Preproductius, l'artefacte es pot desplegar en Producció

      ![Desplegament d'aplicació a Producciò](/images/GHEC/gh_ejemplo_e2e_step6.png)
                
      Objectiu : Desplegament en Producció de l'aplicació.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * Container CD, comprova que existeixi la imatge, que es pugui desplegar en l'entorn de Producció, i executa el desplegament informant en ITSM.

        En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):

        * Branca o branch on es troba el workflow actualitzat: master.
        * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
        * Environment : pro, per al desplegament a Producció. 
        * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
        * ITSM Service : Servei associat al desplegament a registrar en ITSM.
        * Prioritat ITSM: Prioritat del Ticket a crear.

              
      Resultat de l'operació :
        * Codi desplegat a l'entorn de Producció.

      
+ **Exemple de model de treball per a CI/CD per a Infraestructura**

  En el següent exemple es mostra l'execució e2e d'un flux de treball d'implementació i desplegament d'Infraestructura, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament a Producció.  En el cas en el qual l’aplicació no dispose d’entorn de desenvolupament, **l’estratègia a seguir serà la d’integrar-se directament en release**.

  L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

  1. **Integració en branca develop des de feature.**
    L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop. 

      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_infra_e2e_step1.png)

            
      Objectiu : Integració de feature a develop i generació del Terraform Plan per a desplegament en Preproducció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament.
      * Usuari amb Rol Maintain aprova la Pull Request.
            
      Execució de Workflows : Automàtic.
      * Infra CI on PR, en realitzar la PR.  Aquest workflow genera el terraform plan i l'emmagatzema, havent prèviament executat scans de format, seguretat i cost.
      * Infra CI on Commit, en realitzar el Commit, afegint nou tag al repositori.
            
      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Generació del Terraform Plan i emmagatzematge d'aquest (internament a Storage Account d'Azure) per al seu posterior desplegament.
      * Codi validat per un Reviewer on podrà disposar de la informació de les revisions de format, de vulnerabilitats i de cost. 
      * Creació del tag 1.0.1-SNAPSHOT per al repositori i 1.0.1-SNAPSHOT.tfplan per al terraform plan.

  2. **Desplegament de la infra en l'entorn de Desenvolupament.**
    L'usuari ja té disponible el Terraform Plan, validat, i es disposa a desplegar-lo en l'entorn de Desenvolupament per a la seva validació.

      ![Desplegament de la infra en l'entorn de Desenvolupament](/images/GHEC/gh_ejemplo_infra_e2e_step2.png)

     Objectiu: Desplegament en desenvolupament de la infraestructura generada anteriorment. 

      Actors:
      * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
      * Infra CD Apply, descarrega el pla de l'Storage Account amb el tag específic i executa el pla. 

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):
                
          * Branca o branch on es troba el workflow actualitzat: development
          * Infra Version in semver format, i.e 1.0.1-SNAPSHOT : Versió del pla que es vol desplegar.
          * Env to apply the terraform plan : Entorn on desplegar el Terraform Plan, en aquest cas desenvolupament.
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.
                              
        Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de desenvolupament.  

  3. **Integració en branca release des de develop.**
    L' usuari, un cop validada la infraestructura en l' entorn de desenvolupament, es disposa a Integrar els seus canvis en release.
          
      ![Integració en branca release des de development](/images/GHEC/gh_ejemplo_infra_e2e_step3.png)
            
      Objectiu : Integració de development a release i generació del Terraform Plan per a desplegament en Preproducció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita PR.
      * Usuari amb Rol Maintain aprova la Pull Request.
            
      Execució de Workflows : Automàtic.
      * Infra CI on PR, en realitzar la PR.  Aquest workflow genera el terraform plan i l'emmagatzema, havent prèviament executat scans de format, seguretat i cost.
      * Infra CI on Commit, en realitzar el Commit, afegint nou tag al repositori.
            
      Resultat de l'operació :
      * Branca development integrada en release.
      * Generació del Terraform Plan i emmagatzematge d'aquest (internament a Storage Account d'Azure) per al seu posterior desplegament.
      * Codi validat per un Reviewer on podrà disposar de la informació de les revisions de format, de vulnerabilitats i de cost. 
      * Creació del tag 1.0.1-RC per al repositori i 1.0.1-RC.tfplan per al terraform plan.

  4. **Desplegament de la infra en l'entorn de Preproducció.**
    L'usuari ja té disponible el Terraform Plan, validat, i es disposa a desplegar-lo en l'entorn de pre per a la seva validació.

      ![Desplegament de la infra en l'entorn de Preproducció](/images/GHEC/gh_ejemplo_infra_e2e_step4.png)

     Objectiu: Desplegament en preproducció de la infraestructura generada anteriorment. 

      Actors:
      * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
      * Infra CD Apply, descarrega el pla de l'Storage Account amb el tag específic i executa el pla. Addicionalment, i de la mateixa forma que amb els components d'aplicació, es crea CRQ en ITSM.

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):
                
          * Branca o branch on es troba el workflow actualitzat: release
          * Infra Version in semver format, i.e 1.0.1-RC : Versió del pla que es vol desplegar.
          * Env to apply the terraform plan : Entorn on desplegar el Terraform Plan, en aquest cas Preproducció.
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.
                              
        Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de Preproducció.  

  5. **Integració en branca master des de release**
    L'usuari, un cop validat que els canvis han funcionat a l'entorn de Release, es disposa a promocionar els canvis a la branca master.
          
      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_infra_e2e_step5.png)

            
      Objectiu : Integració de la branca release en master i generació del Terraform Plan per a desplegament en Producció

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita PR.
      * Usuari amb Rol Maintain aprova la Pull Request.
            
      Execució de Workflows : Automàtic.
      * Infra CI on PR, en realitzar la PR. Aquest workflow genera el terraform plan i l'emmagatzema, havent prèviament executat scans de format, seguretat i cost.
      * Infra CI on Commit, en realitzar el Commit, afegint nou tag al repositori.
            
      Resultat de l'operació :
      * Branca release integrada en master.
      * Generació del Terraform Plan i emmagatzematge d'aquest a Storage Account d'Azure per al seu posterior desplegament.
      * Codi validat per un Reviewer on podrà disposar de la informació de les revisions de format, vulnerabilitats i cost. 
      * Creació del tag 1.0.1 per al repositori i 1.0.1.tfplan per al terraform plan

  6. **Desplegament de la infra en l'entorn de Producció.**
    L'usuari ja té disponible el Terraform Plan, validat, i es disposa a desplegar-lo en l'entorn de producció.

      ![Desplegament de la infra en l'entorn de Producció](/images/GHEC/gh_ejemplo_infra_e2e_step6.png)

      Objectiu : Desplegament en producció de la infraestructura generada anteriorment. 

      Actors:
      * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
      * Infra CD Apply, descarrega el pla de l'Storage Account amb el tag específic i l'executa.  Addicionalment i com ocorria amb les aplicacions, es crea CRQ en ITSM.

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):
              
          * Branca o branch on es troba el workflow actualitzat: master.
          * Infra Version in semver format, i.e 1.0.1 : Versió del pla que es vol desplegar.
          * Env to apply the terraform Pla : Entorn on desplegar el Terraform Plan, en aquest cas Producció.
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.
                              
      Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de Producció.  

+ **Exemple de model de treball per a CI/CD d'una Function**

  
    En el següent exemple es mostra l'execució e2e d'un flux de treball, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció.  La infraestructura ha estat desplegada prèviament.    
    

    L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

  1. **Integració en branca develop des de feature**
      L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
         
      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_function_e2e_step1.png)

            
      Objectiu : Integració de feature a develop i generació d'artefacte Function per a desplegament en Desenvolupament.

      Actors:
      * Usuari amb Rol Write que realitza el desenvolupament.
      * Usuari amb Rol Maintain que aprova la Pull Request(PR).
            
      Execució de Workflows : Automàtic
      * FUNCTION CI on PR en realitzar la PR.  Genera l'artefacte Function, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * FUNCTION CI on Commit, en realitzar el Commit, empaquetant la function i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada de la function a GitHub Packages.
      * Tag del repositori a 0.0.1-SNAPSHOT i Tag de la function a func.0.0.1-SNAPSHOT.
      * Artefacte promocionat en el codi font a 0.0.1-SNAPSHOT.

  2. **Validació funcional d'artefacte en desenvolupament.**
      L'usuari es disposa a realitzar el desplegament de l'artefacte Function generat en el pas 1 i desplegar-lo en l'entorn de desenvolupament per a la seva validació funcional.

      ![Validació funcional d'artefacte en desenvolupament](/images/GHEC/gh_ejemplo_function_e2e_step2.png)

      Objectiu : Desplegament en desenvolupament de l'artefacte function generat anteriorment per a la seva validació.

      Actors:
        * Usuari amb Rol Write o Maintain.
            
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * FUNCTION CD, comprova que existeixi la function, que es pugui desplegar en l'entorn, i executa el desplegament.
            * Branca o branch on es troba el workflow actualitzat: develop.
            * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-SNAPSHOT.
            * Function Name List : Requerit. llistat, separat per comes i sense espais, dels noms de les funcions a desplegar en el cloud.
            * Folder Name List :  Opcional. listado, separado por comas y sin espacios, de los nombres de las carpetas de cada función en el repositorio. Si solo existe una función y está en la raiz del repositorio, dejar el valor en blanco.
            * Environment : dev, per al desplegament a desenvolupament. 
                              
      Resultat de l'operació :
        * Function desplegat a l'entorn de Desenvolupament per a la seva validació.

  3. **Integració en branca release des de develop**
     Un cop validat el codi en l'entorn de desenvolupament, el desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment al pas 4.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_function_e2e_step3.png)

      Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic.
      * FUNCTION CI on PR en realitzar la PR.  Genera l'artefacte Function, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * FUNCTION CI on Commit, en realitzar el Commit, empaquetant la function i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca develop integrada en release.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada de la function a GitHub Packages.
      * Tag del repositori a 0.0.1-RC i Tag de la function a func.0.0.1-RC.
      * Artefacte promocionat en el codi font a 0.0.1-RC.
            

  4. **Validació funcional d'artefacte en Preproducció**
      Estant disponible la imatge amb un tag vàlid, es realitza el desplegament per realitzar les validacions necessàries.

      ![Validació funcional d'artefacte en Preproducció](/images/GHEC/gh_ejemplo_function_e2e_step4.png)
                
      Objectiu : Desplegament en Preproducció de l'artefacte function per a la seva validació funcional.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * FUNCTION CD, comprova que existeixi la function, que es pugui desplegar en l'entorn de Preproducció, i executa el desplegament informant en ITSM.

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):  
          * Branca o branch on es troba el workflow actualitzat: release.
          * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
          * Function Name List : Requerit. llistat, separat per comes i sense espais, dels noms de les funcions a desplegar en el cloud.
          * Folder Name List :  Opcional. listado, separado por comas y sin espacios, de los nombres de las carpetas de cada función en el repositorio. Si solo existe una función y está en la raiz del repositorio, dejar el valor en blanco.
          * Environment : Pre, per al desplegament a preproducció. 
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.

        Resultat de l'operació :
        * Function desplegat a l'entorn de Preproducció per a la seva validació. [Pendent] Es realitzaran validacions mitjançant la integració amb el Marc d'Automatització de Testing (MAT) i MAM (Marc d'Automatització de Monitoratge).  

              
  5. **Integració en branca master des de release**
      Una vegada realitzara la validació funcional, l'usuari es disposa a integrar en master per a deixar un artefacte disponible per a desplegar en Producció.

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_function_e2e_step5.png)

      Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic
      * FUNCTION CI on PR en realitzar la PR.  Genera l'artefacte Function, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * FUNCTION CI on Commit, en realitzar el Commit, empaquetant la function i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca release integrada en master.
      * Generació i pujada de la function a GitHub Packages.
      * Tag del repositori a 0.0.1 i Tag de la function a func.0.0.1.
      * Artefacte promocionat en el codi font a 0.0.1
          
  6. **Desplegament d'aplicació a Producció**
      Una vegada hi ha l'artefacte disponible a GitHub Packages amb un tag que habilita la seva promoció a pro, i totes les validacions realitzades en entorns Preproductius, l'artefacte es pot desplegar en Producció

      ![Desplegament d'aplicació a Producciò](/images/GHEC/gh_ejemplo_function_e2e_step6.png)

      Objectiu : Desplegament en Producció de l'aplicació.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * FUNCTION CD, comprova que existeixi la function, que es pugui desplegar en l'entorn de Producció, i executa el desplegament informant en ITSM.

        En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):

        * Branca o branch on es troba el workflow actualitzat: master.
        * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
        * Function Name List : Requerit. llistat, separat per comes i sense espais, dels noms de les funcions a desplegar en el cloud.
        * Folder Name List :  Opcional. listado, separado por comas y sin espacios, de los nombres de las carpetas de cada función en el repositorio. Si solo existe una función y está en la raiz del repositorio, dejar el valor en blanco.
        * Environment : Pre, per al desplegament a producció.
        * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
        * ITSM Service : Servei associat al desplegament a registrar en ITSM.
        * Prioritat ITSM: Prioritat del Ticket a crear.

              
      Resultat de l'operació :
        * Function desplegat a l'entorn de Producció.

+ **Exemple de model de treball per a CI/CD d'un contingut estàtic**

   En el següent exemple es mostra l'execució e2e d'un flux de treball, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció.  La infraestructura ha estat desplegada prèviament.    
    

    L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

  1. **Integració en branca develop des de feature**
      L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
         
      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_static_e2e_step1.png)

            
      Objectiu : Integració de feature a develop i generació d'artefacte de contingut estàtic per a desplegament en Desenvolupament.

      Actors:
      * Usuari amb Rol Write que realitza el desenvolupament.
      * Usuari amb Rol Maintain que aprova la Pull Request(PR).
            
      Execució de Workflows : Automàtic
      * Static CI on PR en realitzar la PR.  Genera l'artefacte de contingut estàtic, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Static CI on Commit, en realitzar el Commit, empaquetant del contingut estàtic i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada del contingut estàtic a GitHub Packages.
      * Tag del repositori a 0.0.1-SNAPSHOT i Tag del contingut estàtic a static.0.0.1-SNAPSHOT.
      * Artefacte promocionat en el codi font a 0.0.1-SNAPSHOT.

  2. **Validació funcional d'artefacte en desenvolupament.**
      L'usuari es disposa a realitzar el desplegament de l'artefacte de contingut estàtic generat en el pas 1 i desplegar-lo en l'entorn de desenvolupament per a la seva validació funcional.

      ![Validació funcional d'artefacte en desenvolupament](/images/GHEC/gh_ejemplo_static_e2e_step2.png)

      Objectiu : Desplegament en desenvolupament de l'artefacte de contingut estàtic generat anteriorment per a la seva validació.

      Actors:
        * Usuari amb Rol Write o Maintain.
            
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * Static CD, comprova que existeixi l'artefacte, que es pugui desplegar en l'entorn, i executa el desplegament.
            * Branca o branch on es troba el workflow actualitzat: develop.
            * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-SNAPSHOT.
            * Environment : dev, per al desplegament a desenvolupament. 
            * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
            * ITSM Service : Servei associat al desplegament a registrar en ITSM.
            * Prioritat ITSM: Prioritat del Ticket a crear.
                              
      Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Desenvolupament per a la seva validació.

  3. **Integració en branca release des de develop**
     Un cop validat el codi en l'entorn de desenvolupament, el desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment al pas 4.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_static_e2e_step3.png)

      Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic.
      * Static CI on PR en realitzar la PR.  Genera l'artefacte de contingut estàtic, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Static CI on Commit, en realitzar el Commit, empaquetant el contingut estàtic i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca develop integrada en release.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada del contingut estàtic a GitHub Packages.
      * Tag del repositori a 0.0.1-RC i Tag del contingut estàtic a static.0.0.1-RC.
      * Artefacte promocionat en el codi font a 0.0.1-RC.
            

  4. **Validació funcional d'artefacte en Preproducció**
      Estant disponible el contingut estàtic amb un tag vàlid, es realitza el desplegament per realitzar les validacions necessàries.

      ![Validació funcional d'artefacte en Preproducció](/images/GHEC/gh_ejemplo_static_e2e_step4.png)
                
      Objectiu : Desplegament en Preproducció de l'artefacte contingut estàtic per a la seva validació funcional.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * STATIC CD, comprova que existeixi la function, que es pugui desplegar en l'entorn de Preproducció, i executa el desplegament informant en ITSM.

          En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):  
          * Branca o branch on es troba el workflow actualitzat: release.
          * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
          * Environment : Pre, per al desplegament a preproducció. 
          * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
          * ITSM Service : Servei associat al desplegament a registrar en ITSM.
          * Prioritat ITSM: Prioritat del Ticket a crear.

        Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Preproducció per a la seva validació. [Pendent] Es realitzaran validacions mitjançant la integració amb el Marc d'Automatització de Testing (MAT) i MAM (Marc d'Automatització de Monitoratge).  

              
  5. **Integració en branca master des de release**
      Una vegada realitzara la validació funcional, l'usuari es disposa a integrar en master per a deixar un artefacte disponible per a desplegar en Producció.

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_static_e2e_step5.png)

      Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic
      * Static CI on PR en realitzar la PR.  Genera l'artefacte contingut estàtic, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Static CI on Commit, en realitzar el Commit, empaquetant del contingut estàtic i pujant-la al GitHub Packages.
            
      Resultat de l'operació :
      * Branca release integrada en master.
      * Generació i pujada del contingut estàtic a GitHub Packages.
      * Tag del repositori a 0.0.1 i Tag del contingut estàtic a static.0.0.1.
      * Artefacte promocionat en el codi font a 0.0.1.
          
  6. **Desplegament d'aplicació a Producció**
      Una vegada hi ha l'artefacte disponible a GitHub Packages amb un tag que habilita la seva promoció a pro, i totes les validacions realitzades en entorns Preproductius, l'artefacte es pot desplegar en Producció

      ![Desplegament d'aplicació a Producciò](/images/GHEC/gh_ejemplo_static_e2e_step6.png)

      Objectiu : Desplegament en Producció de l'aplicació.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * Static CD, comprova que existeixi del contingut estàtic, que es pugui desplegar en l'entorn de Producció, i executa el desplegament informant en ITSM.

        En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):

        * Branca o branch on es troba el workflow actualitzat: master.
        * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
        * Environment : Pre, per al desplegament a producció.
        * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
        * ITSM Service : Servei associat al desplegament a registrar en ITSM.
        * Prioritat ITSM: Prioritat del Ticket a crear.

              
      Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Producció.
