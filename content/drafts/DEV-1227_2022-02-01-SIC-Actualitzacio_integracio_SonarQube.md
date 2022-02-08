+++
date        = "2022-02-01"
title       = "SIC. Actualització integració SonarQube"
description = "A partir del XX/XX/2022 s'ha actualitzat la integració del Jenkins del SIC 2.0 amb el SonarQube de Qualitat."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
#key         = "MARÇ2022"
+++

## Introducció

El SonarQube és una eina que serveix per a detectar bugs, vulnerabilitats i defectes en el codi. És l'eina utilitzada pel departament de Qualitat del CTTI per analitzar el codi de les aplicacions i definir quines són les condicions mínimes perquè una aplicació es consideri vàlida (Quality gates). 

Aquesta eina està integrada al SIC 2.0 dins del *Stage* d'`Anàlisis estàtic de codi` a totes les pipelines de construcció i desplegmanet d'aplicacions, de forma que, un cop finalitzada amb èxit la construcció del/s arteface/s, fer l'anàlisis, realitzar l'enviament de l'informe al SonarQube de Qualitat i comprovar les Quality Gates.

## Novetats

**A partir del XX/XX/2022 s'ha actualitzat la versió del SonarQube de Qualitat a la versió 9.2.4**. Aquest fet ha comportat l'adaptació tecnològica de la integració al SonarQube que es realitza al SIC.

Aquesta adaptació s'ha realitzat transparentment als proveïdors d'aplicacions i només en petits casos ha estat necessari adaptar el fitxer aca per la nova integració. Pels casos que ha estat necessari adaptar el fitxer aca s'ha realitzat una merge request als responsables de les aplicacions i se'ls hi ha notificat perquè l'acceptin. L'acceptació de la merge request és necessaria per a que el *Stage* d'`Anàlisis estàtic de codi` a les pipelines de les aplicacions continuï funcionant correctament.

## Documentació

Podeu consultar la [Guia integració eina d’anàlisi de codi de Qualitat](/sic20-guies/guia-integracio-sonarqube/) per més informació sobre l'integració del SonarQube al SIC

Per a més informació sobre el aca del SIC 2.0 teniu disponible [Com construir el fitxer ACA](/sic20-guies/fitxer-aca/)

Per més informació sobre el SonarQube de Qualitat podeu consultar [Portal de Qualitat](https://qualitat.solucions.gencat.cat/eines/sonarqube/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
