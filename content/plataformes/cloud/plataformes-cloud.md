+++
date        = "2024-1-11"
title       = "Plataformes Cloud"
description = "Plataformes cloud disponibles a la Generalitat de catalunya"
sections    = "Cloud"
weight      = 2
categories  = ["cloud","caas","xpaas","dbaas","iaas"]
aliases     = ["/cloud/plataformes-cloud/"]
+++

Les plataformes cloud que ofereix la Generalitat de Catalunya, són les seguents:

* Cloud Privat:

    - Openshift <br/><br/>

* Cloud Públic:

    - Azure
    - AWS
    - Google Cloud Platform
    - IBM Cloud

Com a regla general, utilitzarem els elements més administrats dels núvols públics, això és, que:

- evitarem l'ús de màquines virtuals (la capa IaaS de l'oferta dels clouds).
- l'estàndard d'empaquetat serà el contenidor.
- evitarem orquestradors de contenidors (diferents sabors de kubernetes) quan no siguin necessaris i optarem per contenidors "serverless".
- en el cas de base de dades també optarem per opcions "serverless" quan sigui possible i en el seu defecte, per bases de dades gestionades.
- es poden utilitzar altres serveis gestionats dels clouds que donin suport a les nostres aplicacions.
