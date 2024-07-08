
+++
date         = "2024-04-19"
title        = "Exemple e2e contingut estàtic"
description  = "Exemple e2e contingut estàtic"
weight      = "4"
sections    = ["GHEC"]
+++


## Exemple de model de treball per a CI/CD d'un contingut estàtic


Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
   + Gestió de branques amb un model Gitflow.
   + Integracions de branques basades en Pull Request.
   + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.
   
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
      * Static CI on Commit, en realitzar el Commit, empaquetant del contingut estàtic i pujant-la al GitHub Artifacts.
            
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
                                  
      Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Desenvolupament per a la seva validació.
        * Creació de TAG de repositori <<tag-repositori-actual>>-development per a propòsits de rollback automàtic. Exemple "0.0.1-SNAPSHOT-development".

  3. **Integració en branca release des de develop**
     Un cop validat el codi en l'entorn de desenvolupament, el desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment al pas 4.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_static_e2e_step3.png)

      Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic.
      * Static CI on PR en realitzar la PR.  Genera l'artefacte de contingut estàtic, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Static CI on Commit, en realitzar el Commit, empaquetant el contingut estàtic i pujant-la al GitHub Artifacts.
            
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


        Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Preproducció per a la seva validació. [Pendent] Es realitzaran validacions mitjançant la integració amb el Marc d'Automatització de Testing (MAT) i MAM (Marc d'Automatització de Monitoratge).  
        * Creació de TAG de repositori <<tag-repositori-actual>>-preproduction per a propòsits de rollback automàtic. Exemple "0.0.1-RC-preproduction".

              
  5. **Integració en branca master des de release**
      Una vegada realitzara la validació funcional, l'usuari es disposa a integrar en master per a deixar un artefacte disponible per a desplegar en Producció.

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_static_e2e_step5.png)

      Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic
      * Static CI on PR en realitzar la PR.  Genera l'artefacte contingut estàtic, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Static CI on Commit, en realitzar el Commit, empaquetant del contingut estàtic i pujant-la al GitHub Artifacts.
            
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


              
      Resultat de l'operació :
        * Contingut estàtic desplegat a l'entorn de Producció.
        * Creació de TAG de repositori <<tag-repositori-actual>>-production per a propòsits de rollback automàtic. Exemple "0.0.1-production".
