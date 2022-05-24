+++
date        = "2022-05-24"
title       = "SIC. Desplegament de scripts a Oracle Database Server 19c al SIC 2.0"
description = "El SIC 2.0 permet el desplegament de scripts a Oracle Database Server 19c mitjançant la modalitat de desplegament automàtic."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
key         = "JUNY2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**, contemplant actualment al SIC 2.0, el desplegament d'aplicacions on-premise als entorns d'Integració
mitjançant les següents modalitats:

* **Automàtica**: els artefactes generats es despleguen als servidors web, servidors d'aplicacions i servidors de bases de dades.

* **Delegada**: els artefactes generats es lliuren a través del servei de binaris i es delega als CPD el seu desplegament automàtic.

* **Semiautomàtica**: els artefactes generats es lliuren a través del servei de binaris perquè, Cpd o el proveïdor d'aplicacions
segons pertoqui, dugui a terme el desplegament.

**La modalitat de desplegament delegat acabarà substituint la modalitat automàtica**, però aquesta possibilitat varia en
funció del grau d'avançament del projecte amb cada proveïdor d'infraestructures.

Per a més informació: [Modalitats de desplegament] (https://canigo.ctti.gencat.cat/sic20-serveis/ci/#modalitats-de-desplegament)

## Novetats

Amb l'objectiu de **permetre el desplegament de scripts a Oracle Database Server 19c**, s'ha actualitzat el client encarregat
dels desplegaments en modalitat automàtica per a donar cobertura a la versió prevista al
[Full de ruta de programari CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions).
Aquesta actualització permetrà mantenir automatitzats els desplegaments a mesura que les aplicacions vagin migrant,
sense requerir canvis pel que fa a la configuració de les pipelines.

Per a més informació: [Integració contínua](/sic20-serveis/ci/).

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).