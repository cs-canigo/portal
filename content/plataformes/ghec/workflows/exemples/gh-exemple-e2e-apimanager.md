
+++
date         = "2024-11-18"
title        = "Exemple e2e API MANAGER"
description  = "Exemple e2e API MANAGER"
weight      = "5"
sections    = ["GHEC"]
+++

## Exemple de model de treball per a CI/CD d'API Manager

Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
   + Gestió de branques amb un model Gitflow.
   + Integracions de branques basades en Pull Request.
   + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.

   En el següent exemple es mostra l'execució e2e d'un flux de treball, des que el desenvolupador realitza la seva implementació de una API en una branca Feature, fins al desplegament en el catàleg Producció.  En aquest cas, l'aplicació no disposa d'entorn de desenvolupament, **l' estratègia seria la integració de feature en develop i d' aquesta a rellegeixi sense desplegar en l' entorn de development.**
      
   L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

   A diferència d'altres tipus de lliurables a desplegar, el desplegament o publicació de Productes (API), es pot realitzar en dos entorns (PRE i PRO) i dins d'aquests en dos àmbits distints, Públic i Privat.


   Addicionalment en l'exemple s'han diferenciats dos tipus de casos d'ús :
    + Publicació d'una producte en un catàleg.
    + Execució d'una Operativa sobre un producte que ja està en un catàleg. Les distintes operatives a realitzar, i que disposaran del mateix Workflow són INFO, DELETE, DEPRECATE, RETIRE, REPLACE, SUPERSEDE.

  **1.Integració en branca develop des de feature**

  L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
         
  ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_apim_e2e_step1.png)

            
  Objectiu : Integració de feature a develop i generació d'artefacte.

  Actors:
  * Usuari amb Rol Write que realitza el desenvolupament.
  * Usuari amb Rol Maintain que aprova la Pull Request(PR).
          
  Execució de Workflows : Automàtic
  * APIM CI on PR en realitzar la PR. Realitza les validacions definides sobre el producte
  * APIM CI on Commit, en realitzar el Commit, Genera l'artefacte (zip), el publica i crea el tag de repositori.
            
  Resultat de l'operació :
  * Branca feature integrada en develop.
  * Codi validat per un Reviewer i per l'eina que proporciona API Connect per validar el producte.
  * Generacion i pujada de l'artefacte a github artifacts.
  * Tag del repositori i l' artefacte a 0.0.1-SNAPSHOT.

  **2. Integració en branca release des de develop**
  El desenvolupador pot promocionar-lo a la branca Release i així poder desplegar-lo posteriorment.

  ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_apim_e2e_step2.png)

  Objectiu : Integrar el codi a Release per posteriorment desplegar en entorns Preproductius un artefacte Release Candidate.

  Actors:
  * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
  * Usuari amb Rol Maintain aprova la Pull Request.

  Execució de Workflows : Automàtic.
  * APIM CI on Commit en aprovar la Pull Request. L'artefacte es torna a empaquetar i a pujar en Github Artifacts amb un Re-Tag.
            
  Resultat de l'operació :
  * Branca develop integrada en release.
  * Empaquetat i pujada del producte en zip a GitHub Artifacts amb la versió producte.0.0.1-RC (Release Candidate).
  * Re-Tag del repositori a 0.0.1-RC (Release Candidate).
            

  **3a. Publicació d'un producte en el catàleg de PRE (Público o Privat)**
  Estant disponible l'artefacte amb un tag vàlid, es realitza el desplegament per realitzar les validacions necessàries.

  ![3a.- Publicació d'un producte en el catàleg de PRE (Público o Privat)](/images/GHEC/gh_ejemplo_apim_e2e_step3a.png)
                
  Objectiu : Publicació d'un producte en el catàleg de PRE (Público o Privat).

  Actors:
  * Usuari amb Rol Write o Maintain.
              
  Execució de Workflows : Sota Demanda per part de l'usuari.
  * APIM CD Publish, comprova que existeixi l'artefacte, que es pugui publicar en l'entorn de Preproducció, i executa la publicació del producte en el catàleg seleccionat, informant en ITSM.

  Si vol fer una publicació de producte ha de triar el CD Publish, amb els següents inputs:  
  * Branca o branch on es troba el workflow actualitzat: release.
  * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
  * API Manager catalog: privat-pre o public-pre, per publicar a Preproducció.
  * Name of the product yaml file.
  * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.

  Resultat de l'operació Publish:
  * Producte publicat IBM Cloud en l'entorn de preproducció seleccionat. 
  * Creació del bitllet ITSM.


  **3b. Execució d'operatives sobre un Producte en el catàleg de PRE (Público o Privat)**
  Execució d'operatives sobre un Producte en el catàleg de PRE (Público o Privat)

  ![3b.- Execució d'operatives sobre un Producte en el catàleg de PRE (Público o Privat)](/images/GHEC/gh_ejemplo_apim_e2e_step3b.png)
                
  Objectiu : Execució d'operatives sobre un producte en el catàleg de PRE (Público o Privat).

  Actors:
  * Usuari amb Rol Write o Maintain.
              
  Execució de Workflows : Sota Demanda per part de l'usuari.
  * APIM CD Operativa, comprova que existeixi l'artefacte, amb el qual es realitzaran les operatives l'entorn de Preproducció, informant en ITSM.

  Si es vol realitzar una execució d'operativa sobre un producte, s'haurà d'informar els següents paràmetres del formulari
  * Branca o branch on es troba el workflow actualitzat: release.
  * Operation to Perform with the product.
  * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1-RC.
  * API Manager catalog: privat-pre o public-pre, per publicar a Preproducció.
  * Name of the product yaml file.
  * Product New Version. Requerit en les operacions de REPLACE o SUPERSEDE
  * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.

  Resultat de l'operació Publish:
  * Operació executada sobre el producte en el catàleg de preproducció seleccionat. 
  * Creació del bitllet ITSM.


  Segons l'operació seleccionada el resultat és diferent:
  + INFO: 
    * Llista totes les versions del producte indicat i les seves subscripcions en el catàleg seleccionat. 
  + DELETE: 
    * Esborra la version del producte i els drafts en el catàleg seleccionat. 
  + DEPRECATE: 
    * Canvia l'estat de la version d'un producte a deprecated en el catàleg seleccionat. 
  + RETIRE: 
    * Canvia l'estat de la version d'un producte a retired. 
  + REPLACE: 
    * Reemplaça una version de producte per la indicada i canvia l'estat de la version reemplaçada a retired en el catàleg seleccionat. 
  + SUPERSEDE: 
    * Reemplaça una version de producte per la indicada i canvia l'estat de la version reemplaçada a deprecated en el catàleg seleccionat. 
        
  **4. Integració en branca master des de release**
  El desenvolupador pot promocionar-lo a la branca Master i així poder desplegar-lo posteriorment.

  ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_apim_e2e_step4.png)

  Objectiu : Integrar el codi a branca master i generar artefacte final per al desplegament en Producció.

  Actors:
  * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
  * Usuari amb Rol Maintain aprova la Pull Request.

  Execució de Workflows : Automàtic
  * APIM CI on Commit en aprovar la Pull Request. L'artefacte es torna a empaquetar i a pujar en Github Artifacts amb un Re-Tag.
            
  Resultat de l'operació :
  * Branca release integrada en master.
  * Empaquetat i pujada del producte en zip a GitHub Artifacts amb la versió producte.0.0.1 (Final).
  * Re-Tag del repositori a 0.0.1.
      
  **5a. Publicació d'un producte en el catàleg de PRO (Público o Privat)**

  Estant disponible l'artefacte amb un tag vàlid, es realitza el desplegament per realitzar les validacions necessàries.

  ![5a.- Publicació d'un producte en el catàleg de PRO (Público o Privat)](/images/GHEC/gh_ejemplo_apim_e2e_step5a.png)
                
  Objectiu : Publicació d'un producte en el catàleg de PRO (Público o Privat).

  Actors:
  * Usuari amb Rol Write o Maintain.
              
  Execució de Workflows : Sota Demanda per part de l'usuari.
  * APIM CD Publish, comprova que existeixi l'artefacte, que es pugui publicar en l'entorn de Producció, i executa la publicació del producte en el catàleg seleccionat, informant en ITSM.

  Si vol fer una publicació de producte ha de triar el CD Publish, amb els següents inputs:  
  * Branca o branch on es troba el workflow actualitzat: master.
  * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
  * API Manager catalog: privat-pre o public-pre, per publicar a Producció.
  * Name of the product yaml file.
  * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.
   
  Resultat de l'operació Publish:
  * Producte publicat IBM Cloud en l'entorn de Producció seleccionat. 
  * Creació del bitllet ITSM.


  **5b. Execució d'operatives sobre un Producte en el catàleg de PRO (Público o Privat)**
  Execució d'operatives sobre un Producte en el catàleg de PRO (Público o Privat)

  ![5b.- Execució d'operatives sobre un Producte en el catàleg de PRO (Público o Privat)](/images/GHEC/gh_ejemplo_apim_e2e_step5b.png)
                
  Objectiu : Execució d'operatives sobre un producte en el catàleg de PRO (Público o Privat).

  Actors:
  * Usuari amb Rol Write o Maintain.
              
  Execució de Workflows : Sota Demanda per part de l'usuari.
  * APIM CD Operativa, comprova que existeixi l'artefacte, amb el qual es realitzaran les operatives l'entorn de Producció, informant en ITSM.

  Si es vol realitzar una execució d'operativa sobre un producte, s'haurà d'informar els següents paràmetres del formulari
  * Branca o branch on es troba el workflow actualitzat: master.
  * Operation to Perform with the product.
  * Artifact Version : Versió de l'artefacte, en aquest cas 0.0.1.
  * API Manager catalog: privat-pre o public-pre, per publicar a Producció.
  * Name of the product yaml file.
  * Product New Version. Requerit en les operacions de REPLACE o SUPERSEDE
  * ITSM ID Change Coordinator: ID de l'usuari per crear la CRQ en ITSM amb l'objectiu d'informar sobre el desplegament.

  Resultat de l'operació Publish:
  * Operació executada sobre el producte en el catàleg de Producció seleccionat. 
  * Creació del bitllet ITSM.

  Segons l'operació seleccionada el resultat és diferent:
  + INFO: 
    * Llista totes les versions del producte indicat i les seves subscripcions en el catàleg seleccionat. 
  + DELETE: 
    * Esborra la version del producte i els drafts en el catàleg seleccionat. 
  + DEPRECATE: 
    * Canvia l'estat de la version d'un producte a deprecated en el catàleg seleccionat. 
  + RETIRE: 
    * Canvia l'estat de la version d'un producte a retired. 
  + REPLACE: 
    * Reemplaça una version de producte per la indicada i canvia l'estat de la version reemplaçada a retired en el catàleg seleccionat. 
  + SUPERSEDE: 
    * Reemplaça una version de producte per la indicada i canvia l'estat de la version reemplaçada a deprecated en el catàleg seleccionat. 