
+++
date         = "2024-11-26"
title        = "Exemple e2e Mobile Apps"
description  = "Exemple e2e Mobile Apps"
weight      = "1"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-exemple-e2e-mobileapps",
    "/ghec/gh-exemple-e2e-mobileapps",
    "/plataformes/ghec/gh-exemple-e2e-mobileapps"
]
+++

## Exemple de model de treball per a CI/CD d'un mobile apps (Android i iOS)

Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
   + Gestió de branques amb un model Gitflow.
   + Integracions de branques basades en Pull Request.
   + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0 per aplicacions mòbils.

   En el següent exemple es mostra l'execució e2e d'un flux de treball, des que el desenvolupador realitza la seva implementació en una branca Feature, fins al desplegament en Producció. No cal infraestructura per aquest tipus de projectes.
      
   L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

  1. **Integració en branca develop des de feature**
      L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.

      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_e2e_step1.png)


      Objectiu : Integració de feature a develop i generació d'artefacte per a desplegament en Desenvolupament.

      Actors:
      * Usuari amb Rol Write que realitza el desenvolupament.
      * Usuari amb Rol Maintain que aprova la Pull Request(PR).

      Execució de Workflows : Automàtic
      * App iOS/Android CI on PR en realitzar la PR.  Compila i executa Unit Testing (si escau) i anàlisi de qualitat i seguretat.

      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Tag del repositori a 0.0.1_1-SNAPSHOT .

  2. **Validació funcional d'artefacte en desenvolupament.**
      L'usuari es disposa a realitzar el desplegament de l'artefacte generat en el pas 1 i desplegar-lo en l'entorn de desenvolupament per a la seva validació funcional.

      ![Validació funcional d'artefacte en desenvolupament](/images/GHEC/gh_ejemplo_e2e_step2.png)

      Objectiu : Desplegament en desenvolupament de l'artefacte per a la seva validació.

      Actors:
        * Usuari amb Rol Write o Maintain.
            
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * App iOS/Android CD, comprova que es pugui desplegar en l'entorn, i executa el desplegament.

          En aquest cas l'execució és manual i per a això l'usuari (independentment del seu rol, però s'aconsella que sigui el de maintain) tindrà que :

          1. Accedir als WorkFlows del repositori mitjançant l'opció "Actions", indicada en l'apartat **Configuració dels diferents WorkFlows de CI/CD**
          2. Seleccionar el workflow a executar, en aquest cas App iOS/Android CD, i prèmer "Run Workflow", apareixent el formulari per introduir la informació necessària per l'execució: 

              ![Execució Manual Workflow CD](/images/GHEC/gh-ejecucion-manual-wf.png)

            * Branca o branch on es troba el workflow actualitzat: develop.
            * Nom del projecte
            * Nom del scheme per iOS
            * Nom del target per iOS
            * Nom de la configuració per iOS
            * Flavour per Android: dev
            * Build type per Android: release

      Resultat de l'operació :
        * Codi desplegat a l'entorn de Desenvolupament per a la seva validació.
        * Creació de TAG de repositori seguint el model Semantic Version 2.0 per apps mòbils. Exemple "0.0.1_1-SNAPSHOT".

  3. **Integració en branca release des de develop**
     Un cop validat el codi en l'entorn de desenvolupament, el desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment al pas 4.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_e2e_step3.png)

      Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Sense execució

  4. **Validació funcional d'artefacte en Preproducció**
      L'usuari es disposa a realitzar el desplegament de l'artefacte generat en el pas 3 i desplegar-lo en l'entorn de preproducció per realitzar les validacions necessàries.

      ![Validació funcional d'artefacte en Preproducció](/images/GHEC/gh_ejemplo_e2e_step4.png)
                
      Objectiu : Desplegament en Preproducció de l'artefacte per a la seva validació funcional.

      Actors:
        * Usuari amb Rol Write o Maintain.
              
      Execució de Workflows : Sota Demanda per part de l'usuari.
        * App iOS/Android CD, comprova que es pugui desplegar en l'entorn, i executa el desplegament.

          En aquest cas l'execució és manual i per a això l'usuari (independentment del seu rol, però s'aconsella que sigui el de maintain) tindrà que :

          1. Accedir als WorkFlows del repositori mitjançant l'opció "Actions", indicada en l'apartat **Configuració dels diferents WorkFlows de CI/CD**
          2. Seleccionar el workflow a executar, en aquest cas App iOS/Android CD, i prèmer "Run Workflow", apareixent el formulari per introduir la informació necessària per l'execució: 

              ![Execució Manual Workflow CD](/images/GHEC/gh-ejecucion-manual-wf.png)

            * Branca o branch on es troba el workflow actualitzat: release.
            * Nom del projecte
            * Nom del scheme per iOS
            * Nom del target per iOS
            * Nom de la configuració per iOS
            * Flavour per Android: pre
            * Build type per Android: release

      Resultat de l'operació :
        * Codi desplegat a l'entorn de Preproducció per a la seva validació.
        * Creació de TAG de repositori seguint el model Semantic Version 2.0 per apps mòbils. Exemple "0.0.1_1-RC".

  5. **Integració en branca master des de release**
      Una vegada realitzada la validació funcional, l'usuari es disposa a integrar en master per a deixar un codi disponible per a desplegar en Producció.

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_e2e_step5.png)

      Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Sense execució

  6. **Desplegament d'aplicació a Producció**
      L'usuari es disposa a realitzar el desplegament de l'artefacte generat en el pas 5 i desplegar-lo en l'entorn de Producció

      ![Desplegament d'aplicació a Producciò](/images/GHEC/gh_ejemplo_e2e_step6.png)

      Objectiu : Desplegament en Producció de l'aplicació.

      Actors:
        * Usuari amb Rol Write o Maintain.

      Execució de Workflows : Sota Demanda per part de l'usuari.
        * App iOS/Android CD, comprova que es pugui desplegar en l'entorn, i executa el desplegament.

          En aquest cas l'execució és manual i per a això l'usuari (independentment del seu rol, però s'aconsella que sigui el de maintain) tindrà que :

          1. Accedir als WorkFlows del repositori mitjançant l'opció "Actions", indicada en l'apartat **Configuració dels diferents WorkFlows de CI/CD**
          2. Seleccionar el workflow a executar, en aquest cas App iOS/Android CD, i prèmer "Run Workflow", apareixent el formulari per introduir la informació necessària per l'execució: 

              ![Execució Manual Workflow CD](/images/GHEC/gh-ejecucion-manual-wf.png)

            * Branca o branch on es troba el workflow actualitzat: master.
            * Nom del projecte
            * Nom del scheme per iOS
            * Nom del target per iOS
            * Nom de la configuració per iOS
            * Flavour per Android: pro
            * Build type per Android: release

      Resultat de l'operació :
        * Codi desplegat a l'entorn de Producció per a la seva validació.
        * Creació de TAG de repositori seguint el model Semantic Version 2.0 per apps mòbils. Exemple "0.0.1_1".
