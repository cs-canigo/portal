+++
date        = "2022-02-01"
title       = "SIC. Adaptació integració SonarQube"
description = "A partir del XX/XX/2022 es posa en servei l'adaptació tecnològica de la integració de les pipelines SIC 2.0 amb el SonarQube de l'Oficina de Qualitat."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
#key         = "MARÇ2022"
+++

## Introducció

[**SonarQube**](https://docs.sonarqube.org/9.2/) **és una eina que serveix per a detectar bugs, vulnerabilitats i defectes en el codi**,
i ha estat l'eina escollida per l'Oficina de Qualitat de CTTI per a analitzar el codi de les aplicacions i definir quines són les
condicions mínimes perquè una aplicació es consideri vàlida, és a dir, les Quality gates de codi.

Aquesta eina es troba **actualment integrada al SIC 2.0** dins de l'etapa d' `Anàlisi estàtic de codi` a totes les pipelines de construcció i
desplegament d'aplicacions, de forma que, un cop finalitzada amb èxit la construcció del/s arteface/s, es fa l'anàlisi de codi,
l'enviament de l'informe i es comproven les corresponents Quality Gates de codi.

## Novetats

Darrerament **s'ha actualitzat la versió del SonarQube a la versió 9.2.4**, la qual estableix una sèrie
de prerequisits que han comportat l'**adaptació tecnològica de la integració de les pipelines SIC 2.0 que es posa en servei
a partir del XX/XX/2022**. Per a més informació: https://docs.sonarqube.org/9.2/requirements/requirements/.

Aquesta adaptació s'ha realitzat de forma transparent als proveïdors d'aplicacions i **únicament en certs casos ha estat necessari
adaptar el fitxer `aca.yml`** per a revisar la configuració de la integració. Per a aquests casos, les adaptacions a
dur a terme per part dels responsables de les aplicacions es proposen des de SIC mitjançant una *merge request* al repositori de codi i
se'ls ha notificat perquè aquests l'acceptin. **És necessari acceptar els canvis sol·licitats perquè l'etapa d'`Anàlisi
estàtic de codi` continuï funcionant correctament**.

## Documentació

Per a més informació, podeu consultar els següents articles:

- [Com construir el fitxer ACA](/sic20-guies/fitxer-aca/)
- [Guia integració eina d’anàlisi de codi de Qualitat](/sic20-guies/guia-integracio-sonarqube/)
- [Portal de Qualitat - Eina SonarQube](https://qualitat.solucions.gencat.cat/eines/sonarqube/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).