
+++
date         = "2024-04-19"
title        = "Exemple e2e Infra"
description  = "Exemple e2e Infra"
weight      =  "1"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-exemple-infra",
    "/ghec/gh-exemple-e2e-infra",
    "/plataformes/ghec/gh-exemple-e2e-infra"
]
+++


## Exemple de model de treball per a CI/CD per a Infraestructura

Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
   + Gestió de branques amb un model Gitflow.
   + Integracions de branques basades en Pull Request.
   + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.

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

                              
        Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de desenvolupament.  
        * Creació de TAG de repositori <<tag-repositori-actual>>-development per a propòsits de rollback automàtic. Exemple "0.0.1-SNAPSHOT-development".

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

                              
        Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de Preproducció.  
        * Creació de TAG de repositori <<tag-repositori-actual>>-preproduction per a propòsits de rollback automàtic. Exemple "0.0.1-RC-preproduction".

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

                              
      Resultat de l'operació :
        * Infraestructura desplegada a l'entorn de Producció.  
        * Creació de TAG de repositori <<tag-repositori-actual>>-production per a propòsits de rollback automàtic. Exemple "0.0.1-production".
