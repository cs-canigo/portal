+++
date        = "2024-03-04"
title       = "Procediment per gestió d'iniciatives CS Cloud"
description = "Procediment per gestió d'iniciatives CS Cloud"
sections    = "Cloud"
categories  = ["cloud"]
aliases     = ["/cloud/gestio-iniciatives-cloud/"]
weight      = 7
+++

Des de CS Cloud es coordinaran una sèrie d’iniciatives que poden requerir la realització d’accions per part dels lots AM. Aquestes iniciatives tindran com a objectiu fomentar l’ús d’eines corporatives, estendre i millorar el model d’adopció Cloud, i assegurar el compliment de les polítiques de seguretat, entre d’altres.

<br/>

Es proposa el següent procediment de comunicació entre CS Cloud i els Lots AM per tal de coordinar l’execució d’aquestes iniciatives:

* CS Cloud enviarà un comunicat des de la bústia “suport.cloud@gencat.cat” a tots els GESIN descrivint la iniciativa, els seus objectius i el procediment a fer servir per a la seva execució.

* CS Cloud obrirà un ticket en el projecte Jira corresponent a la plataforma Cloud de l’aplicació (Azure o AWS) incorporant la iniciativa a la descripció i al títol [codi aplicació] + [nomenclatura departament] + nom curt iniciativa. El ticket Jira s’assignarà al GESIN del departament al qual pertany l’aplicació i tindrà una sèrie de subtasques per a cada una de les accions a realitzar i descrites a la descripció. Les subtasques s’assignaran al responsable de la resolució de cada una d’elles, CS Cloud o el GESIN del departament. El GESIN podrà assignar les subtasques corresponents al tècnic del Lot d’Aplicació requerit.

* Per a algunes iniciatives, es convocarà una sessió de kickoff en la que CS Cloud explicarà en detall la iniciativa i les accions requerides per part del Lot AM. A aquesta sessió de kickoff hauran assistir el GESIN del departament, l’arquitecte del Departament i els tècnics del Lot AM que siguin necessaris.

* El seguiment de l’execució de la iniciativa per a cada aplicació es realitzarà mitjançant el tiquet Jira i les seves subtasques.
