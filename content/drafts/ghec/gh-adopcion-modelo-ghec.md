+++
date         = "2024-04-09"
title        = "Integració al nou model Cloud gestionat per a DevOps amb GitHub Enterprise Cloud"
description  = "El present document descriu les guies necessàries per a l' adopció, per part dels projectes, al nou model gestionat Cloud per a DevOps amb GitHub Enterprise Cloud."
weight      = "1"
sections    = ["GHEC"]
+++


<img src="https://identitatcorporativa.gencat.cat/web/.content/Documentacio/descarregues/dpt/COLOR/Presidencia/ctti_h2.jpg">

# Integració al nou model Cloud gestionat per a DevOps amb GitHub Enterprise Cloud

## Objectiu 🚀
El present document descriu les guies necessàries per a l' adopció, per part dels projectes, al nou model gestionat Cloud per a DevOps amb GitHub Enterprise Cloud.

A continuació, es descriuen els principals objectius que es busquen en implantar aquest model i que impacta en la gestió i automatització del cicle de vida de les 
aplicacions, construcció, qualitat i desplegaments.

+ **Eficiència i millora de l' operació** : L'adopció a escala d'una plataforma gestionada implica grans avantatges pel que fa a l'operació davant una plataforma 'custom', ja que l'evolució i operació dels components de la plataforma, així com de la infraestructura que la suporta, són responsabilitat del proveïdor Cloud (GitHub en aquest cas), incloent seguretat física i d'accessos,  disponibilitat, escalabilitat i rendiment, dimensionament de la infraestructura en base a demanda, actualitzacions requerides derivades de possibles vulnerabilitats o millores, etc.

+ **Foment de la Innovació** : El proveïdor de la plataforma facilita l'accés a la innovació, ja que les últimes novetats estaran disponibles per a CTTI sense requerir una inversió específica per a això. A més, sent una plataforma nativa per al núvol, facilita l'adopció d'aquestes pràctiques d'enginyeria, en particular l'adopció d'arquitectures **'Serverless' o basades en contenidors** sense que això impliqui gestionar recursos d'infraestructura o plataforma (p.ex. ús de Lambda o Fargate enfront de la gestió de clúster Kubernetes a escala).

+ **Balancejar la capacitat de control i prescripció d'estàndards enfront de la flexibilitat en els projectes** : El model d'operació sobre una plataforma Cloud gestionada i centralitzada proveeix facilitats per tenir alts nivells d'estandardització i control de les càrregues de treball mitjançant la prescripció d'estàndards i bones pràctiques la qual cosa deriva en millores de productivitat. Simultàniament, aporta flexibilitat, la qual cosa permet als equips que tenen necessitats especials ser independents i que l' equip central d' arquitectura i operació no sigui coll d' ampolla en el funcionament dels projectes.

+ **Primer pas cap a un model self-service i el paradigma DevEx** , el qual introdueix grans millores en l'experiència dels desenvolupadors.

És important recalcar com a prerequisit que aquest model de GHEC es recolzarà en el proveïdor Cloud AZURE per:
  + Autorització i gestió d' usuaris i rols amb Azure Entra ID.
  + Infraestructura per a emmagatzematge d'informació (Storage Accounts) i secrets (KeyVaults)
  + Uso de Self-hosted Runners en AZURE.
  
## Integració d' aplicacions al nou Model GHEC

-Bé, interessant, m'agrada el que he llegit- Què he de fer per migrar o arrencar el meu nou projecte en aquest nou model?.

Com s'ha comentat en el punt anterior, aquest és el primer pas cap a un model self-service on els equips de desenvolupament podran, **automàticament** adherir-se al nou model GHEC.

El procés d'integració actualment és el següent :

  ![Procés de creació de Model GHEC](
    gh_proceso_automatico_pub.png) 

1. **Onboarding del projecte**
Per sol·licitar l'alta del projecte en el nou model cal realitzar una petició JIRA al següent projecte : [ACOCLDSIC - Servei Acompanyament Suport Cloud i SIC](https://cstd.ctti.gencat.cat/jiracstd/browse/ACOCLDSIC) on s'indicarà la següent informació :

      + Codi de Departament, exemple "PRE".
      + Codi d'Entitat, exemple "CCT".
      + Lot de Manteniment, exemple "AM22_23".
      + Codi de Diàleg, exemple "0189".
      + Codi de Component, per exemple "00", "01".
      + Acrònim de Component, per exemple "GEFACT".
      + Email dels owners dels grups (separats per ,) d'Azure o Gestor de solucions.
      + Array de components tècnics, tipus de repositori on el tipus de repositori pot ser backend, frontend o infra, (separats per "||") per exemple :
        [component,backend||component,frontend||component, infra].

        Addicionalment als repositoris que es demanen, se'n crearà un automàticament per a propòsits de Testing. 

      + Array d'entorns a crear per a l'aplicació, separats per "||".  Exemple :
        + [dev||pre||pro]
        + [int||pre||pro]
        + [pre||pro]
    
    Un cop rebuda la petició, es processarà per part dels equips pertinents, i mitjançant un procés **automàtic**, es crearan els components i/o recursos necessaris a GitHub Enterprise Cloud i a Azure Cloud per a funcionament correcte del model.

  
  2. **Configuració del model GHEC**
  Un cop ha finalitzat el procés automàtic que crea tota la infraestructura i recursos necessaris per donar suport al model, s' han de realitzar les següents configuracions bàsiques : 

         
      + **Alta d'usuaris en grups depenent del Rol** 

        El procés automàtic de creació del model crea automàticament un conjunt de grups d'Azure Entra ID que s'utilitzaran per assignar rols a usuaris.

        Els grups que es creen depenen del departament, entitat i lot de manteniment de l'aplicació (exceptuant els transversals).
        Si el team ja existeix prèviament, no es tornarà a crear :
        + sec-read.
        + qa-read.
        + srv-read.
        + arq-read.
        + </departament/>-</entitat/>-</lote_mantenimiento/>-maintain.
        + </departament/>-</entitat/>-</lote_mantenimiento/>-write.
        + </departament/>-</entitat/>-read: Per a gestors de Solucions / Integracions.

        Una vegada creats els grups, cal que l'owner o owners identificats donin d'alta els diferents usuaris en els diferents grups depenent dels rols que van a realitzar (Maintain o Write).
        
        Només cal actualitzar els grups de Maintain i Write, sent la resta informats automàticament pel procés automatitzat.
                
        Per executar aquesta tasca, l' owner disposarà de l' aplicació myAccounts de Microsoft on haurà d' haver de : 

          1. Accedir a MyGroups per a l' organització de la Generalitat de Catalunya.
            [https://myaccount.microsoft.com/groups](https://myaccount.microsoft.com/groups)
            
              Les credencials d'accés són les de Generalitat de Catalunya, introduint l'usuari @gencat.cat.
          
              ![Grups credencials ](/images/GHEC/gh-mygroups-credenciales.png)
            
          2. Un cop llogat, l'owner disposarà d'una opció de menú per veure tots els grups dels quals té el rol d'Owner i que podrà gestionar afegint o eliminant usuaris des de l'opció "Groups I Own".

              ![Grups](/images/GHEC/gh-mygroups.png)

          3. Seleccionant el grup que vulgui modificar, tindrà la possibilitat d'afegir/eliminar usuaris.  Per a això existeixen dues opcions de menú "Members" i "Owner" on, pitjant en el botó "Add" podrà buscar els usuaris i afegir-los amb diferents permisos "Members" i "Owners" :

                ![Grups](/images/GHEC/gh-mygroups-add.png)

                + Permisos d'Owner : El nou usuari podrà ser Owner del grup i li permetrà poder afegir a altres usuaris.
                + Permisos de Member : El nou usuari serà Member del grup.  NO podrà afegir altres usuaris.
                + Permisos d'Owner i Member : El nou usuari serà Membre i Owner del grup.
              
                  ![Grups](/images/GHEC/gh-mygroups-addinguser.png)

               **Els usuaris a afegir són els pertanyents al domini @gencat.cat**

          4. Una vegada sincronitzat Azure Entra ID amb GitHub EC, els usuaris inserits/eliminats es veuran reflectits en GHEC en els Teams vinculats als grups d'Entra ID i automàticament se li assignaran permisos depenent del Team.
      
          Per a més informació, es pot consultar [Jerarquia i nomenclatura de Teams i nomenclatura de Repositoris ](./gh-model-govern.md) amb informació addicional de la creació de teams.

          Addicionalment, en el següent Link, es podran consultar els permisos de cada rol [Roles y permisos de Repositoris ](./gh-rols-repositori.md).

      + **Configuració dels diferents WorkFlows de Continuous Deployment (CI + CD)**

        Per cadascun dels repositoris creats (exceptuant Test), es creen un conjunt de workflows que seran els que executin les tasques de descàrrega de codi, compilació, empaquetat, testing, qualitat de codi i desplegament.
        
        L'accés a aquests workflows es realitzarà a través de l'opció "Actions" de cada repositori a GHEC. 
        
        Accés a GHEC : [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/)

        ![Accés a Workflows](/images/GHEC/gh-imagen-acceso-action.png)
    
        L' execució dels workflows, dependran de la seva tipologia i del model definit, essent :
          - Workflows de CI (app i infra) : Executats **automàticament** en la sol·licitud d'un Pull Request o en l'execució d'un Merge de dita Pull Request.
          - Workflows de CD (app i infra) : Executats sota demanda a través de la consola de GHEC.

          Aquests WorkFlows, **necessiten una parametrització bàsica i que només es realitzarà al principi, per poder executar-se correctament**.  A continuació, es detallen els workflows/fitxers i els inputs a actualitzar, **en una branca feature que posteriorment s'anirà promocionant a les diferents branques**

          Dins del repositori, el codi dels workflows estarà disponible en la següent ruta : 

          repositori/.github/workflows

          Exemple :

          ![Ruta de Workflows](/images/GHEC/gh-ruta-workflows.png)

        **Workflows CI/CD per a tecnologies JAVA**
          + Maven APP CI on PR (maven-app-ci-on-pr.yaml): 
            * java_version:  Versió de JDK, exemple: 17.
            * java_distribution : Distribució JAVA, exemple : temurin.
            * maven_version: Versió de Maven utilitzada.

          + Maven APP CI on Commit to develop (maven-app-ci-on-commit-develop.yaml): 
            * java_version:  Versió de JDK, exemple: 17.
            * java_distribution : Distribució JAVA, exemple : temurin.
            * maven_version: Versió de Maven utilitzada.

          + Maven APP CI on Commit to release or màster (maven-app-ci-on-commit.yaml).
            * No necessita configuració inicial.

          + Maven APP CD (maven-app-cd.yaml).
            * Comentar l' entorn retorn si no hi ha entorn de desenvolupament.
            * cluster_name: Nom del Clúster on es desplegarà l' aplicació.
            * cluster_service : Servei del Clúster on es desplegarà l'aplicació.
            * ecr_name : Nom de l'Elastic Container Registry d'AWS.

            
              Si els paràmetres "cluster_name", "cluster_service" i "ecr_name" segueixen la nomenclatura indicada en els comentaris del workflow, s'hauran de comentar els inputs d'aquests paràmetres, i es definiran tal qual s'indica en els comentaris, de manera que es construeixi i es passi el nom com a variable que depèn de l'entorn que si es rep com a paràmetre. Es mostra un exemple avall:


              ![Exemple de variables canviades si segueixen la nomenclatura especificada](/images/GHEC/vars-to-change-example.png)


        **Workflows CI/CD para tecnologías node**  
          + Node APP CI on PR (node-app-ci-on-pr.yaml): 
            * node_version:  Versió de Node.
            * sonar_exclusions : llistat de directoris a excloure a l' scanner de SonarQube, separats per "," (no afegir espais).
            
          + Node APP CI on Commit to develop (node-app-ci-on-commit-develop.yaml): 
            * node_version:  Versió de Node.
            * sonar_exclusions : llistat de directoris a excloure a l'scanner de SonarQube, separats per "," (no afegir espais).
            
          + Node APP CI on Commit to release or master (node-app-ci-on-commit.yaml)
            * No necessita configuració inicial.

          + Node APP CD (node-app-cd.yaml)
            * Comentar el entorno dev si no existe entorno de desarrollo.
            * cluster_name: Nombre del Clúster dónde se desplegará la aplicación.
            * cluster_service : Servicio del Clúster dónde se desplegará la aplicación.
            * ecr_name : Nombre del Elastic Container Registry de AWS.

              Si els paràmetres "cluster_name", "cluster_service" i "ecr_name" segueixen la nomenclatura indicada en els comentaris del workflow, s'hauran de comentar els inputs d'aquests paràmetres, i es definiran tal qual s'indica en els comentaris, de manera que es construeixi i es passi el nom com a variable que depèn de l'entorn que si es rep com a paràmetre. Es mostra un exemple avall:


              ![Exemple de variables canviades si segueixen la nomenclatura especificada](/images/GHEC/vars-to-change-example.png)


        **Workflows CI/CD per a Infraestructura**  
          + Infra CI on PR  (infra-ci-on-pr.yaml): 
            * terraform_version: Versió de Terraform que s' utilitzarà per gestionar el cicle de vida.
            * Branques disponibles (branches), si no hi ha entorn de desenvolupament cal comentar la branca develop.
            
          +  Infra CI on Commit  (infra-ci-on-commit.yaml): 
              * terraform_version: Versió de Terraform que s' utilitzarà per gestionar el cicle de vida.
              * Branques disponibles (branches), si no hi ha entorn de desenvolupament cal comentar la branca develop.
                                   
          + Infra CD Apply (infra-cd-apply.yaml):
            * Comentar l' entorn retorn si no hi ha entorn de desenvolupament.
            * terraform_version: Versió de Terraform que s' utilitzarà per gestionar el cicle de vida.

        Per a tots els repositoris és necessari modificar també el fitxer CODEOWNERS on es descomentarà l'última línia i se substituirà el label <TEAM_NAME> pel nom del grup **</departament/>-</entitat/>-</lote_mantenimiento/>-maintain**, on estaran els membres que podran executar aprovacions de Pull Request.

        En el següent enllaç, està disponible tota la informació de Workflows definits en el projecte [Definició de Workflows d' aplicatiu i d' Infraestructura](./gh-definicion-workflows.md). 

        Sempre seguint la filosofia GitOps on es desacoblen els workflows de CI amb els de CD. 

  
  3. **Plataforma llesta, comencem a treballar**

      Creada i configurada tota la plataforma per al nostre model de treball, cal recalcar que també **existirà una nova metodologia de treball**, la qual es detallarà en els següents punts i enllaços:

      + **Gestió i ús de branques**: El model de gestió i ús de branques que s' ha implantat és el basat en el model estàndard de GitFlow. 

        ![Model gitflow simplificat](/images/GHEC/gitflow-recommended-model.png)  

        En el següent link [Modelo Gitflow](./model-gitflow-gitops.md), es mostra l'article amb els models a seguir, juntament amb les branques que entren en joc.

        En cas que el projecte no pugui adaptar-se a aquest model, caldrà realitzar una petició a perquè sigui estudiada la nova variant i veure' n la viabilitat.

        Addicionalment, i encara que s'han desvinculat les branques proposades amb els entorns disponibles per al desplegament, els pipelins de desplegament disposen d'un Step anomenat **"Env Matrix"** que realitza validacions per discernir si una imatge pot ser desplegada en un entorn en base als tags d'aquesta imatge.  

        La política actual, es mostra en el diagrama següent:
        

        ![Model gitflow simplificat](/images/GHEC/gh_env_matrix.png)  

        Aquesta matriu pot ser modificada en base a les decisions que es prenguin segons les experiències o necessitats que vagin sorgint.

      + **Implantació de model de Merge amb Pull Request**.  El model de desenvolupament amb Pull Request a GitHub descriu un mètode de treball que afecta les integracions entre dues branques, normalment una branca de features cap a una branca principal, per exemple, development, rellegir-se o màster.
  
        Aquest procés permet la revisió del contingut d' una branca Feature a integrar en una principal abans de realitzar el Merge. Si el contingut d' aquesta branca no és apte als criteris de la persona que tingui el rol de revisor, aquesta branca no s' integrarà i se li demanarà al desenvolupador que solucioni els problemes trobats.

        Aquest model aposta per la qualitat i la detecció primerenca d' errors.

        1. Sol·licitud de Pull Request i aprovació directa pel reviewer als canvis, després de la seva revisió.

        ![Pull Request](/images/GHEC/pullrequestOK.png)

        2. Sol·licitud de Pull Request, sol·licitud de més informació per part del Reviewer i re-sol·licitud de Pull Request després d'afegir canvis sol·licitats.

        ![Pull Request demanant més informació ](/images/GHEC/pullrequestKO.png)

        En el següent enllaç [Modelo de Pull Request](./gh-model-pull-requests.md) es pot observar en detall les característiques i operativa del model, així com els seus principals avantatges.

        Aquest model de treball té caràcter obligatori, i prova d'això és que les branques principals Develop, Release i Master estaran bloquejades per realitzar integracions directes sense l'ús de Pull Request.

      + **Tags i versionat de components**. Dins d' aquest model de desenvolupament, el versionat i tags de llibreries i artefactes, estarà bloquejat al desenvolupador, de tal manera que seran els workflows automàtics de CI els que s' encarreguin d' aquesta tasca, permetent al desenvolupador, ** només el versionat del seu codi font**.

        S'ha instaurat el model Semantic Version 2.0. Tota la documentació relacionada es pot consultar en el següent link [Model de Tag i versionat](./gh-definicion-versionado.md).

      + **Configuració de notificacions**. Dins d'aquest model de desenvolupament, les notificacions de les execucions de workflows es mostraran a la safata de notificacions de GitHub, així com també rebre mitjançant correu electrònic. Per al seu correcte funcionament els usuaris hauran de configurar-les.  

        Tota la documentació relacionada es pot consultar en el següent link [Configuració de notificacions](./configuracio-notificacions.md).

      + **Exemple de model de treball per a CI/CD d'una aplicació**

        Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
          + Gestió de branques amb un model Gitflow.
          + Integracions de branques basades en Pull Request.
          + Tagging d' artefactes i repositoris amb el model Semantic Version 2.0.

          En el següent exemple es mostra l' execució e2e d' un flux de treball, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció.  La infraestructura està desplegada prèviament.

          L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

        1. **Integració en branca development des de features.**
            L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
          
            ![Integració en branca development des de features](/images/GHEC/gh_ejemplo_e2e_step1.png)

            
            Objectiu : Integració de feature a develop i generació d'artefacte per a desplegament en Desenvolupament.

            Actors:
            * Usuari amb Rol Write que realitza el desenvolupament.
            * Usuari amb Rol Maintain que aprova la Pull Request.
            
            Execució de Workflows : Automàtic
            * APP CI on PR en realitzar la PR.  Genera l' artefacte, havent realitzat prèviament scans de qualitat.
            * APP CI on Commit to develop, en realitzar el Commit, empaquetant el codi en una imatge Docker i pujant-la al registre d'imatges GHEC Packages.
            
            Resultat de l'operació :
            * Branca feature integrada en develop.
            * Codi validat per un Reviewer i per eines de qualitat i seguretat.
            * Generació i pujada de la imatge Docker a Github Packages.
            * Tag tant del repo com de la imatge a app.0.0.1-SNAPSHOT.

        2. **Validació funcional d' artefacte en desenvolupament.**
            L' usuari es disposa a realitzar el desplegament de l' artefacte generat en el pas 1 i desplegar-lo en l' entorn de desenvolupament per a la seva validació funcional.

            ![Validació funcional d' artefacte en desenvolupament](/images/GHEC/gh_ejemplo_e2e_step2.png)

            Objectiu : Desplegament en desenvolupament de l'artefacte generat anteriorment per a la seva validació.

            Actors:
              * Usuari amb Rol Write o Maintain.
              
            Execució de Workflows : Baix Demanda per part de l'usuari.
              * APP CD que, que existeixi la imatge, comprova que es pugui desplegar i desplegar la imatge en l'entorn i informa del desplegament en ITSM.

                En aquest cas l' execució és manual i per a això l'usuari (independentment del seu rol, però s'aconsella un rol amb experiència, maintain) tindrà :

                1. Accedir als WorkFlows del repositori mitjançant l'opció "Actions", indicada en l'apartat **Configuració dels diferents WorkFlows de Continuous Deployment (CI + CD)**

                2. Seleccionar el workflow que va a executar.  En aquest cas APP CD, i polsar a "Run Workflow", apareixent el formulari per introduir la informació necessària de l'execució: 

                    ![Execució Manual Workflow](/images/GHEC/gh-ejecucion-manual-wf.png)
                
                
                  * Branca o branch on es troba el workflow actualitzat: develop.
                  * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-SNAPSHOT.
                  * Environment : dev, per al desplegament a desenvolupament. 
                              
            Resultat de l'operació :
              * Codi desplegat a l' entorn de Desenvolupament per a la seva validació.

        3. **Integració en branca release des de development**
           Un cop validat el codi en desenvolupament, el desenvolupador es disposa a promocionar-lo a la branca PRE per generar un artefacte Release i així poder desplegar-lo posteriorment al pas 4.

            ![Integració en branca release des de development](/images/GHEC/gh_ejemplo_e2e_step3.png)

            Objectiu : Integrar el codi a rellegir-se per posteriorment desplegar en entorns Preproductius amb un artefacte Release Candidate.

            Actors:
            * Usuari amb Rol Write que realitza el desenvolupament i sol·licita la Pull Request.
            * Usuari amb Rol Maintain que aprova la Pull Request.

            Execució de Workflows : Automàtic.
            * APP CI on Commit en aprovar la Pull Request.  En aquest, l'artefacte està creat de la fase anterior i només realitza un "Re-Tag" amb el tag de release.
            
            Resultat de l'operació :
            * Branca develop integrada en release.
            * Re-Tag de la imatge Docker en GitHub Packages a app.0.0.1-RC (Release Candidate).
            

        4. **Validació funcional d' artefacte en Preproducció**
            Estant disponible la imatge amb un tag valgut, es realitza el desplegament per realitzar les validacions necessàries.

            ![Validació funcional d' artefacte en Preproducció](/images/GHEC/gh_ejemplo_e2e_step4.png)
                
            Objectiu : Desplegament en Preproducció de l'artefacte per a la seva validació funcional.

            Actors:
              * Usuari amb Rol Write o Maintain.
              
            Execució de Workflows : Baix Demanda per part de l'usuari.
              * APP CD que, xec que existeixi la imatge, comprova que es pugui desplegar, desplegar la imatge en l'entorn de Preproducció i informa del desplegament en ITSM.

                En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):  
                * Branca o branch on es troba el workflow actualitzat: release.
                * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
                * Environment : pre, per al desplegament a Preproducció. 
                * ITSM ID Change Coordinator: ID de l' usuari per crear la CRQ en ITSM amb l' objectiu d' informar sobre el desplegament.
                * ITSM Service : Servei associat al desplegament per emmagatzemar en ITSM.
                * Prioritat ITSM: Prioritat del Ticket a crear.

              Resultat de l'operació :
              * Codi desplegat a l' entorn de Preproducció per a la seva validació.  En aquest cas, i a futur, s' hauran de realitzar validacions amb proves automatitzades realitzant invocacions al Framework de Testing MAT.  

              
        5. **Integració en branca master des de release**
            Una vegada realitzara la validació funcional, l'usuari es disposa a integrar en màster per a deixar un artefacte disponible per a desplegar en Producció.

            ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_e2e_step5.png)

            Objectiu : Integrar el codi a branca màster i generar artefacte final per al desplegament en Producció.

            Actors:
            * Usuari amb Rol Write que realitza el desenvolupament i sol·licita la Pull Request a màster.
            * Usuari amb Rol Maintain que aprova la Pull Request.

            Execució de Workflows : Automàtic
            * APP CI on Commit en aprovar la Pull Request.  En aquest l'artefacte està creat de la fase anterior i realitzarà un "Re-Tag" amb el tag de màster.
            
            Resultat de l'operació :
            * Branca rellegeixi integrada en màster.
            * Imatge Docker, a GH Packages, amb nou Tag per desplegament en Producció app.0.0.1 (Final).
          
        6. **Desplegament d' aplicació a Producciò**
            Una vegada hi ha l'artefacte disponible a GH Packages amb un tag que habilita la seva promoció a pro i totes les validacions realitzades i executades correctament en entorns Preproductius, l'artefacte de pot desplegar en Producció

            ![Desplegament d' aplicació a Producciò](/images/GHEC/gh_ejemplo_e2e_step6.png)
                
            Objectiu : Desplegament en Producció de l'aplicació.

            Actors:
              * Usuari amb Rol Write o Maintain.
              
            Execució de Workflows : Baix Demanda per part de l'usuari.
              * APP CD que, xec que existeixi la imatge, comprova que es pugui desplegar, desplegar la imatge en l'entorn de Producció i informa del desplegament en ITSM.

              En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):

              * Branca o branch on es troba el workflow actualitzat: màster.
              * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
              * Environment : pro, per al desplegament a Producció. 
              * ITSM ID Change Coordinator: ID de l' usuari per crear la CRQ en ITSM amb l' objectiu d' informar sobre el desplegament.
              * ITSM Service : Servei associat al desplegament per emmagatzemar en ITSM.
              * Prioritat ITSM: Prioritat del Ticket a crear.

              
            Resultat de l'operació :
              * Codi desplegat a l' entorn de Producció.

      
      + **Exemple de model de treball per a CI/CD per a Infraestructura**

        En el següent exemple es mostra l' execució e2e d' un flux de treball d' implementació i desplegament d' Infraestructura, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció.  En aquest cas i atès que, actualment, no existeix l' entorn de Desenvolupament, s' integrarà directament a Release. 

        L' accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

        1. **Integració en branca release des de features.**
          L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a rellegir-se.  En aquests casos, es passa de feature a release ja que en els projectes d' infra no sol existir branca ni entorn de desenvolupament.
          
            ![Integració en branca release des de features](/images/GHEC/gh_ejemplo_infra_e2e_step1.png)

            
            Objectiu : Integració de feature a release i generació del Terraform Pla per a desplegament en Preproducció.

            Actors:
            * Usuari amb Rol Write que realitza el desenvolupament.
            * Usuari amb Rol Maintain que aprova la Pull Request.
            
            Execució de Workflows : Automàtic.
            * Infra CI on PR, en realitzar la PR.  Aquest workflow genera el terraform pla i l'emmagatzema, havent prèviament executat scans de format, seguretat i cost sobre aquest.
            * Infra CI on Commit, en realitzar el Commit, afegint nou tag al repositori.
            
            Resultat de l'operació :
            * Funció Rama integrada en llançament.
            * Generació del Terraform Pla i emmagatzematge d' aquest a Storage Account d' Azure per al seu posterior desplegament.
            * Codi validat per un Reviewer on podrà disposar de la informació de les revisions de format, de vulnerabilitats i de cost. 
            * Creació del tag 1.0.1-RC per al REPO i 1.0.1-RC.tfplan per al terraform pla

        2. **Desplegament de la infra en l' entorn de Preproducció.**
          L'usuari ja té disponible el Terraform Pla, validat, i es disposa a desplegar-lo en l'entorn de pre per a la seva validació.

            ![Desplegament de la infra en l' entorn de Preproducció](/images/GHEC/gh_ejemplo_infra_e2e_step2.png)

           Objectiu: Desplegament en desenvolupament de la infraestructura generada anteriorment. 

            Actors:
              * Usuari amb Rol Write o Maintain.
              
            Execució de Workflows : Baix Demanda per part de l'usuari.
              * Infra CD Apply que, descarrega el pla de l'Storage Account amb el tag específic i executa el pla.  Addicionalment i com ocorria amb les aplicacions, es crea CRQ en ITSM per conèixer l' estat del desplegament.

                En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):
                
                * Branca o branch on es troba el workflow actualitzat: release
                * Infra Version in semver format, i.e 1.0.1-RC : Versió del pla que es vol desplegar.
                * Env to apply the terraform Pla : Entorn on desplegar el Terraform Pla, en aquest cas Preproducció.
                * ITSM ID Change Coordinator: ID de l' usuari per crear la CRQ en ITSM amb l' objectiu d' informar sobre el desplegament.
                * ITSM Service : Servei associat al desplegament per emmagatzemar en ITSM.
                * Prioritat ITSM: Prioritat del Ticket a crear.
                              
              Resultat de l'operació :
              * Infraestructura desplegada a l' entorn de Preproducció.  
              
        3. **Integració en branca master des de release**
          L'usuari, un cop validat que els canvis han funcionat a l'entorn de Release, es disposa a promocionar els canvis a la branca màster .
          
            ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_infra_e2e_step3.png)

            
            Objectiu : Integració de la branca rellegi en màster i generació del Terraform Pla per a desplegament en Producció

            Actors:
            * Usuari amb Rol Write que realitza el desenvolupament i sol·licita PR.
            * Usuari amb Rol Maintain que aprova la Pull Request.
            
            Execució de Workflows : Automàtic.
            * Infra CI on PR, en realitzar la PR.  Aquest workflow genera el terraform pla i l'emmagatzema, havent prèviament executat scans de format, seguretat i cost sobre aquest.
            * Infra CI on Commit, en realitzar el Commit, afegint nou tag al repositori.
            
            Resultat de l'operació :
            * Branca rellegeixi integrada en màster.
            * Generació del Terraform Pla i emmagatzematge d' aquest a Storage Account d' Azure per al seu posterior desplegament.
            * Codi validat per un Reviewer on podrà disposar de la informació de les revisions de format, de vulnerabilitats i de cost. 
            * Creació del tag 1.0.1 per al REPO i 1.0.1.tfplan per al terraform plan

        4. **Desplegament de la infra en l' entorn de Producció.**
          L'usuari ja té disponible el Terraform Pla, validat, i es disposa a desplegar-lo en l'entorn de producció per a la seva validació.

            ![Desplegament de la infra en l' entorn de Producció](/images/GHEC/gh_ejemplo_infra_e2e_step4.png)

            Objectiu : Desplegament en producció de la infraestructura generada anteriorment. 

            Actors:
              * Usuari amb Rol Write o Maintain.
              
            Execució de Workflows : Baix Demanda per part de l'usuari.
              * Infra CD Apply que, descarrega el pla de l'Storage Account amb el tag específic i executa el pla.  Addicionalment i com ocorria amb les aplicacions, es crea CRQ en ITSM per conèixer l' estat del desplegament.

                En aquest cas l'execució és manual i l'usuari haurà d'omplir un formulari amb la informació del desplegament (revisar com executar workflow manualment descrit en l'apartat **Validació funcional d'artefacte en desenvolupament**):
                
                * Branca o branch on es troba el workflow actualitzat: màster
                * Infra Version in semver format, i.e 1.0.1 : Versió del pla que es vol desplegar.
                * Env to apply the terraform Pla : Entorn on desplegar el Terraform Pla, en aquest cas Producció.
                * ITSM ID Change Coordinator: ID de l' usuari per crear la CRQ en ITSM amb l' objectiu d' informar sobre el desplegament.
                * ITSM Service : Servei associat al desplegament per emmagatzemar en ITSM.
                * Prioritat ITSM: Prioritat del Ticket a crear.
                              
            Resultat de l'operació :
              * Infraestructura desplegada a l' entorn de Producció.  

## Wiki 📖

Més informació rellevant :

### Execució d' Actions amb Self-Hosted Runners

GHEC Actions, permet l'execució de Workflows amb els runners propis de GHEC o Runners AD-HOC coneguts com a Self-Hosted Runners que s'executen des d'altres proveïdors Cloud. En l'actual model, s'han generat sota el proveïdor públic de Cloud AZURE.

 Més informació [Self Hosted Runners](./gh-self-hosted-runners.md)





