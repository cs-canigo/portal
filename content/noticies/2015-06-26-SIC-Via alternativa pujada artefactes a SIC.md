+++
date        = "2015-06-26"
title       = "SIC. Via alternativa pujada artefactes a SIC"
description = "S'ha creat una via alternativa per al traspàs d'artefactes entre proveïdors d'aplicacions i CPD quan la via habitual de traspàs d'aquests artefactes, repositori SVN del SIC, no es trobi accessible."
sections    = ["Notícies", "home"]
draft		= true
categories  = ["sic"]
key 		= "JULIOL2015"
+++

S'ha creat una via alternativa per al traspàs d'artefactes entre proveïdors d'aplicacions i CPD quan la via habitual de traspàs d'aquests artefactes, el repositori SVN del SIC, no es trobi accessible.

Aquesta via alternativa consisteix a fer servir un job de la Plataforma d'Integració Contínua de SIC, Jenkins. Mitjançant aquest job, els responsables de Lot (Qualitat i Arquitectura) podran pujar l'artefacte/s al propi Jenkins, sota un path determinat per l'àmbit, codi diàleg, nom aplicació i versió de l'artefacte. Els tècnics de CPD podran recuperar els artefactes accedint a una determinada URL relativa al job.

Aquest job s'habilitarà només quan existeixi una degradació o caiguda total del servei SVN del SIC, i només es donarà accés als Responsables de Lot + tècnics de CPD.
El següent diagrama il·lustra les 2 vies per al traspàs d'artefactes (la via alternativa figura en línia discontínua):

<CENTER>![SIC-via-Alternativa-Traspas-Artefactes.png](/images/news/SIC-via-Alternativa-Traspas-Artefactes.png)</center>

Per a més informació s'ha elaborat un howTo on s'explica com interactuar amb el job, tant per la part proveïdor com per la part CPD. Podeu trobar aquest [SIC - Howto - Via alternativa traspàs artefactes](/related/sic/howto/SIC%20-%20Howto%20-%20Via%20alternativa%20traspas%20artefactes%20v1.0.pdf) a la secció de [HowTos de SIC](/sic-documentacio/how-tos/).
