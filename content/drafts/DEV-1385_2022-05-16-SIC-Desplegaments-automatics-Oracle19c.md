+++
date        = "2022-05-16"
title       = "SIC. Desplegament de scripts a Oracle Database Server 19c al SIC 2.0"
description = "El SIC 2.0 permet el desplegament de scripts a Oracle Database Server 19c mitjançant la modalitat de desplegament automàtic."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "JUNY2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. Actualment, el SIC 2.0 permet el desplegament d'aplicacions on-premise als entorns d'Integració
mitjançant les següents [Modalitats de desplegament] (https://canigo.ctti.gencat.cat/sic20-serveis/ci/#modalitats-de-desplegament):

* **Automàtica**: es construeixen els artefactes i es despleguen al servidors web, servidors d'aplicacions i servidors
de bases de dades.

* **Delegada**: es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i posteriorment es
delega als CPD el desplegament automàtic dels artefactes.

* **Semiautomàtica**: es construeixen els artefactes i es lliuren a través del servei de gestió de binaris perquè
Cpd o el proveïdor d'aplicacions, segons apliqui, pugui dur a terme el desplegament.

L'objectiu és que la modalitat de desplegament delegat acabi substituint la modalitat automàtica, però aquest criteri varia
en funció del grau d'avançament del projecte amb cada proveïdor d'infraestructures.

## Novetats

Amb l'objectiu de **permetre el desplegament de scripts a Oracle Database Server 19c**, s'ha actualitzat el client encarregat
dels desplegaments en modalitat automàtica per a donar cobertura a aquesta versió prevista al
[Full de ruta de programari CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions).

Aquesta actualització permetrà mantenir automatitzats els desplegaments a mesura que les aplicacions es vagin migrant,
sense requerir cap canvi pel que fa a la configuració de les pipelines.

Per a més informació: [Integració contínua](/sic20-serveis/ci/).

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).