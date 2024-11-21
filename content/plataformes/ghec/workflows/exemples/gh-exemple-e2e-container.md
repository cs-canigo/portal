
+++
date         = "2024-04-19"
title        = "Exemple e2e Container"
description  = "Exemple e2e Container"
weight      = "1"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-exemple-container",
    "/ghec/gh-exemple-e2e-container",
    "/plataformes/ghec/gh-exemple-e2e-container"
]
+++

## Exemple de model de treball per a CI/CD d'un container

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
            * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
                              
      Resultat de l'operació :
        * Codi desplegat a l'entorn de Desenvolupament per a la seva validació.
        * Creació de TAG de repositori <<tag-repositori-actual>>-development per a propòsits de rollback automàtic. Exemple "0.0.1-SNAPSHOT-development".

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


        Resultat de l'operació :
        * Codi desplegat a l'entorn de Preproducció per a la seva validació. [Pendent] Es realitzaran validacions mitjançant la integració amb el Marc d'Automatització de Testing (MAT) i MAM (Marc d'Automatització de Monitoratge).  
        * Creació de TAG de repositori <<tag-repositori-actual>>-preproduction per a propòsits de rollback automàtic. Exemple "0.0.1-RC-preproduction".

              
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


              
      Resultat de l'operació :
        * Codi desplegat a l'entorn de Producció.
        * Creació de TAG de repositori <<tag-repositori-actual>>-production per a propòsits de rollback automàtic. Exemple "0.0.1-production".

      
