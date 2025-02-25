
+++
date         = "2024-04-19"
title        = "Exemple e2e Llibreria"
description  = "Exemple e2e Llibrería"
weight      = "2"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-exemple-library",
    "/ghec/gh-exemple-e2e-library",
    "/plataformes/ghec/gh-exemple-e2e-library",
    "/plataformes/ghec/workflows/exemples/gh-exemple-e2e-library"
]
+++

## Exemple de model de treball per a CI per a Llibreria.

Com ja s'ha comentat anteriorment, el nou model de treball es basarà en :
   + Gestió de branques amb un model Gitflow.
   + Integracions de branques basades en Pull Request.
   + Tagging d'artefactes i repositoris amb el model Semantic Version 2.0.

   En el següent exemple es mostra l'execució e2e d'un flux de treball per a llibreria, des que el desenvolupador realitza la seva implementació en una branca Feature, fins a la pujada de la llibreria amb version final al repositori d'artefactes.
      
   L'accés a GHEC es realitzarà des de la URL:  [https://github.com/enterprises/gencat/](https://github.com/enterprises/gencat/).

   
  1. **Integració en branca develop des de feature**
      L'usuari ja ha realitzat el seu desenvolupament en la branca feature i es disposa a Integrar els seus canvis a develop.
         
      ![Integració en branca develop des de feature](/images/GHEC/gh_ejemplo_llibreria_e2e_step1.png)

            
      Objectiu : Integració de feature a develop i generació d'artefacte per pujar-lo al repositori de Llibreries (en aquest cas GHPackages).

      Actors:
      * Usuari amb Rol Write que realitza el desenvolupament.
      * Usuari amb Rol Maintain que aprova la Pull Request(PR).
            
      Execució de Workflows : Automàtic
      * Library CI on PR en realitzar la PR.  Genera l'artefacte, havent realitzat prèviament anàlisi de qualitat i seguretat.
      * Library CI on Commit, en realitzar el Commit, promoció de l'artefacte, compilat, empaquetat, pujada de l'artefacte al repositori de llibreries i l'etiquetatge en aquest repositori i de l' artefacte.
            
      Resultat de l'operació :
      * Branca feature integrada en develop.
      * Codi validat per un Reviewer i per eines de qualitat i seguretat.
      * Generació i pujada de la llibreria a GitHub Packages.
      * Tag del repositori a 0.0.1-SNAPSHOT i Tag de la llibreria a lib.0.0.1-SNAPSHOT.

  2. **Integració en branca release des de develop**
      El desenvolupador promociona el codi a la Release i torna a pujar-se l'artefacte al repositori de llibreries.

      ![Integració en branca release des de develop](/images/GHEC/gh_ejemplo_llibreria_e2e_step2.png)

      Objectiu : Integrar el codi a Release i generació d'artefacte per pujar-lo al repositori de Llibreries (en aquest cas GHPackages).

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic.
      * Library CI on Commit en aprovar la Pull Request. Promoció de l'artefacte, compilat, empaquetat, pujada de l'artefacte al repositori de llibreries i l'etiquetatge en aquest repositori i de l' artefacte.
            
      Resultat de l'operació :
      * Branca develop integrada en release.
      * Tag de la llibreria en GitHub Packages a lib.0.0.1-RC (Release Candidate).
      * Tag del repositori a 0.0.1-RC (Release Candidate).
            
 5. **Integració en branca master des de release**
      El desenvolupador promociona el codi a la Master i torna a pujar-se l'artefacte al repositori de llibreries

      ![Integració en branca master des de release](/images/GHEC/gh_ejemplo_llibreria_e2e_step3.png)

      Objectiu : Integració de release a master i generació d'artefacte per pujar-lo al repositori de Llibreries (en aquest cas GHPackages).

      Actors:
      * Usuari amb Rol Write realitza el desenvolupament i sol·licita la Pull Request a màster.
      * Usuari amb Rol Maintain aprova la Pull Request.

      Execució de Workflows : Automàtic
      * Library CI on Commit en aprovar la Pull Request. Promoció de l'artefacte, compilat, empaquetat, pujada de l'artefacte al repositori de llibreries i l'etiquetatge en aquest repositori i de l' artefacte.
            
      Resultat de l'operació :
      * Branca release integrada en master.
      * Llibreria pujada a GitHub Packages, amb nou Tag per desplegament en Producció lib.0.0.1 (Final).
      * Tag del repositori a 0.0.1.
      