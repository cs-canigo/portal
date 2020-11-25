+++
date = "2020-11-23"
title = "Guia integració eina d’anàlisi de codi de Qualitat"
description = "Guia per a la integració amb eina d’anàlisi de codi de la Oficina de Qualitat"
sections = "SIC"
toc = true
taxonomies = []
weight = 4
+++

## Eina d’anàlisi

Al SIC s’ha dut a terme la integració de les aplicacions amb l’eina d’anàlisi estàtic de codi: [SonarQube CE](https://docs.sonarqube.org/latest/).
Es tracta d’una eina que servirà per a **detectar issues crítiques i bloquejants així com duplicació de codi font** de les aplicacions.
Podeu accedir mitjançant el següent enllaç: https://codi.qualitat.solucions.gencat.cat.

Es recomana instal·lar SonarQube **a l’entorn de desenvolupament** per a facilitar una inspecció contínua.
Per a unificar els criteris de l’anàlisi, Qualitat ha definit la Quality Gate de codi.

Per a més informació: [Portal de Qualitat](https://qualitat.solucions.gencat.cat/eines/sonarqube/).

## Integració contínua

El SIC implementarà un **nou *Stage* a totes les pipelines de construcció i desplegament d’aplicacions** de forma que
aquest s’encarregarà de, un cop finalitzada amb èxit la construcció del/s artefacte/s,
fer l’anàlisi i comprovació de la quality gate de codi, i realitzar l’enviament de l’informe a SonarQube.

![Stage AEC](/related/sic/2.0/aec_stage.png)
<br/>

Per tant, **cada pujada de codi font al sistema de custodia del SIC implicarà la revisió automàtica de la qualitat del codi del
projecte** i, si no passa les Quality Gates, no permetrà continuar amb el desplegament de l’aplicació. A la pantalla principal de la
pipeline es mostrarà el resultat de la comprovació, habilitant un enllaç on podreu accedir al detall:

![Stage AEC](/related/sic/2.0/link_qualitygate.png)
<br/>

### Prerequisits

Cal assegurar-se de tenir el codi font actualitzat, amb el versionat adient, i tenir la construcció i desplegament de l'aplicació automatitzada al SIC.

### Client utilitzat segons tecnologia

El sistema farà l’enviament amb el client SonarScanner més adequat per a cada tipus de tecnologia de construcció:

- `MAVEN`: per a projectes Maven.
- `MSBUILD`: per a projectes que utilitzen MSBuild.
- `GENERIC`: per a projectes que utilitzen NPM, projectes PHP, PL/SQL i d'altres.

Per a més informació:
https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/

<br/>
Per defecte, l’enviament es farà utilitzant el client de SonarScanner adient i s'aplicaran paràmetres per defecte en base a la classificació del
pas de construcció (*step*) configurat al [fitxer ACA](/sic-welcome-pack/fitxer-aca/)
repositat al codi font dels projectes i que origina la generació de les pipelines al SIC.
Podeu veure que, com a novetat, es permet incloure una secció *analysis* on es pot redefinir el sistema d’enviament
per a escollir una modalitat més adequada, per exemple, per a salvar limitacions conegudes com les següents:

- Els projectes mavenitzats han d'empaquetar-se amb una versió mínima de maven 3.
- Els projectes java han de poder-se compilar amb una jdk mínima 1.8
- Els projectes .Net han de compilar-se amb una versió mínima de MSBuild 14

En qualsevol cas, el sistema ignorarà els arxius de [llenguatges no suportats](https://docs.sonarqube.org/latest/analysis/languages/overview/)
(veure Community Edition) per l’eina.

### Configuració a nivell de projecte

Tal com indica a la documentació de referència, cada tipus de client permet configurar els paràmetres aplicables a cada cas:
https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/.

En el següent enllaç, podeu trobar alguns [exemples pràctics per a personalitzar exclusions]
(/howtos/2020-10-26-SIC-Howto-definir_exclusions_SonarQube/).

## Canals de contacte
El canal de contacte dependrà de l'àmbit del dubte o problema:

- Si es localitza en la configuració i accessos a l’eina SonarQube o la configuració de les
Quality Gates, ho deriveu al responsable de qualitat del vostre lot. Si el dubte o problema no s’ha resolt,
el responsable de qualitat del vostre lot es posarà en contacte amb l'Oficina de Qualitat mitjançant la
bústia qualitat.solucions@gencat.cat.

- Si es localitza en el comportament de les pipelines de desplegament, configuració de projectes i altres
aspectes de la integració contínua, haureu de posar-vos en contracte a través dels
[Canals de suport](/sic/suport/#altres-dubtes-o-problem%C3%A0tiques) del SIC.