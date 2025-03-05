+++
date = "2024-03-15"
title = "Guia integració eina d’anàlisi de codi de Qualitat"
description = "Guia per a la integració amb eina d’anàlisi de codi de l'Oficina de Qualitat"
sections = "SIC"
toc = true
aliases = [
    "/sic30-guies/guia-integracio-sonarqube/",
    "/sic-welcome-pack/guia-integracio-sonarqube/",
    "/sic-guies/guia-integracio-sonarqube/"
]
taxonomies = []
weight = 5
+++

## Eina d’anàlisi

Al SIC s’ha dut a terme la integració de les aplicacions amb l’eina d’anàlisi estàtic de codi: [SonarQube CE](https://docs.sonarqube.org/9.2/).
Es tracta d’una eina que serveix per a **detectar issues crítiques i bloquejants així com duplicació de codi font** de les aplicacions.
Podeu accedir mitjançant el següent enllaç: https://codi.qualitat.solucions.gencat.cat.

L'Oficina de Qualitat recomana instal·lar SonarQube **a l’entorn de desenvolupament** per a facilitar una inspecció contínua.
Per tal d'unificar els criteris de l’anàlisi, l'Oficina de Qualitat ha definit les Quality Gates de codi.
Per a més informació: [Portal de Qualitat](https://qualitat.solucions.gencat.cat/eines/sonarqube/).

## Integració contínua

El SIC incorpora un ***Stage* a totes les pipelines de construcció i desplegament d’aplicacions** de forma que
aquest s’encarrega de, un cop finalitzada amb èxit la construcció del/s artefacte/s,
fer l’anàlisi i comprovació de les quality gates de codi, i realitzar l’enviament de l’informe a SonarQube.

![Stage AEC](/related/sic/3.0/aec_stage.png)
<br/>

Per tant, **cada pujada de codi font al sistema de custòdia del SIC implica la revisió automàtica de la qualitat del codi del
projecte** i, si no passa les Quality Gates, l'Oficina de Qualitat pot bloquejar l'execució del job, no permetent continuar amb el
desplegament de l’aplicació. A la pantalla principal de la pipeline es mostrarà el resultat de la comprovació, habilitant un
enllaç on podreu accedir al detall:

![Stage AEC](/related/sic/3.0/link_qualitygate.png)
<br/>

### Prerequisits

Cal assegurar-se de tenir el codi font actualitzat, amb el versionat adient, i tenir la construcció i desplegament de l'aplicació
automatitzada al SIC.

Solament es realitzarà l'anàlisi estàtica de codi quan es realitzin desplegaments sobre la branca **MÀSTER**. En els desplegaments de la branca **EVOLUTIUS** no s'analitzarà el codi.

### Client utilitzat segons tecnologia

El sistema s'encarrega de fer l’enviament amb el client SonarScanner més adequat per a cada tipus de tecnologia de construcció:

- `MAVEN`: per a projectes Maven
- `MSBUILD`: per a projectes que utilitzen MSBuild
- `GENERIC`: per a projectes que utilitzen NPM, projectes PHP, PL/SQL i d'altres

Per defecte, l'enviament es farà utilitzant el client de SonarScanner adequat i s'aplicaran paràmetres per defecte d'acord amb la configuració establerta en el [fitxer ACA](/sic30-guies/fitxer-aca/)

Per a més informació:
https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/jenkins-extension-sonarqube/

En qualsevol cas, el sistema ignorarà els arxius de [llenguatges no suportats](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/languages/overview/)
(veure Community Edition) per l’eina.

### Configuració a nivell de projecte

Tal com s'indica a la documentació de referència, cada tipus de client permet configurar els paràmetres aplicables a cada cas:
https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/jenkins-extension-sonarqube/

En el següent enllaç, podeu trobar alguns [exemples pràctics per a personalitzar exclusions](/howtos/2024-03-15-SIC-Howto-definir_exclusions_SonarQube).

## Canals de contacte
El canal de contacte dependrà de l'àmbit del dubte o problema:

- Si es localitza en la configuració i accessos a l’eina SonarQube o la configuració de les
Quality Gates, haureu de tractar-ho amb el responsable de qualitat del vostre lot d'aplicacions. Si el dubte o problema no s’ha resolt,
caldrà que el responsable de qualitat del vostre lot es posi en contacte amb l'Oficina de Qualitat mitjançant la
bústia [qualitat.solucions@gencat.cat](mailto:qualitat.solucions@gencat.cat).

- Si es localitza en el comportament de les pipelines de desplegament, configuració de projectes i altres
aspectes de la integració contínua, haureu de posar-vos en contracte a través dels
[Canals de suport](/sic/suport/#altres-dubtes-o-problem%C3%A0tiques) del SIC.