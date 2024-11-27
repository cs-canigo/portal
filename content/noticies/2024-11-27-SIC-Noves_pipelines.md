+++
date        = "2024-11-27"
title       = "SIC. Noves Pipelines deploy-tag i execute-command"
description = "Noves pipelines disponibles a SIC 3.0"
categories  = ["SIC"]
sections    = ["Notícies", "home"]
key         = "NOVEMBRE2024"
+++

## Introducció

En els pròxims dies s'aprovisionaran les següents noves tipologíes de pipelines: **Deploy tag on-premise** i **Execute command Openshift**.

Com el seu nom indica, aquestes noves pipelines estaran disponibles per a desplegaments d'aplicacions a on-premise i per desplegaments a Openshift respectivament.

## Descripció de les pipelines

- **Deploy tag on-premise**: de manera similar a les pipelines deploy-tag al cloud privat (Openshift), aquesta pipeline permetrà desplegar versions d'artefactes antics als entorns on-premise (servidors d'aplicacions, servidors web, ...). Els passos en aquesta pipeline seran els següents:

  1.- Seleccionar tag a desplegar. Aquests es recuperen del GitLab, sent mostrats amb el següent format `x.y.z-PR`, `x.y.z-production`
  2.- Es recupera l'enllaç del fitxer a Binaris
  3.- Es realitza el desplegament a on-premise amb l'artefacte recuperat de Binaris, pels entorns definits al fitxer ACA

- **Execute command Openshift**: aquesta pipeline permet executar comandes en els pods desplegats a Openshift. Els passos en aquesta pipeline seran els següents:

  1.- Selecció de l'entorn en el qual es troba el pod
  2.- Selecció de la comanda a executar en el pod
  3.- Execució de la comanda seleccionada en el pod de l'entorn


Si teniu qualsevol dubte o problema sobre els serveis del SIC, podeu revisar les [**Preguntes Freqüents**](/sic/faq)
o utilitzar els canals de [**Suport**](/sic/suport).
