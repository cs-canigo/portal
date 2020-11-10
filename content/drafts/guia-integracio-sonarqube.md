+++
date = "2020-11-10"
title = "Guia integració eina d’anàlisi de codi de la OQUAL"
description = "Guia per a la integració amb eina d’anàlisi de codi de la Oficina de Qualitat"
sections = "SIC"
toc = true
taxonomies = []
weight = 2
+++

## Eina d’anàlisi

Al SIC s’ha dut a terme la integració de les aplicacions amb l’eina d’anàlisi estàtic de codi
escollida per la Oficina de Qualitat: [SonarQube](https://docs.sonarqube.org/latest/).
Es tracta d’una eina que servirà per a detectar bugs, vulnerabilitats i defectes en el codi font de les aplicacions.


Podeu accedir mitjançant el següent enllaç: https://codi.qualitat.solucions.gencat.cat.

Es recomana instal·lar SonarQube **a l’entorn de desenvolupament** per a facilitar una inspecció contínua.
Per a unificar els criteris de l’anàlisi, s’han definit unes [Quality Gates](https://qualitat.solucions.gencat.cat/manuals/SonarQubeQualityGate.pptx)
que els proveïdors hauran de configurar a les seves màquines. Altres eines actualment emprades per a l’anàlisi de codi (per exemple, **Kiwuan**) no seran objecte d’aquest
article donat no es contempla la seva integració al SIC.

Per a més informació: [Portal de la Oficina de Qualitat](https://qualitat.solucions.gencat.cat/eines/sonarqube/).

## Integració contínua

El SIC implementarà un **nou *Stage* a totes les pipelines de construcció i desplegament d’aplicacions** de forma que
aquest s’encarregarà de, un cop finalitzada amb èxit la construcció del/s artefacte/s, realitzar l’enviament del codi font al SonarQube.

![Stage AEC](/related/sic/2.0/aec_stage.png)
<br/>

Per tant, cada pujada de codi font al sistema de custodia del SIC implicarà la revisió automàtica de la qualitat del codi del
projecte i, si no passa les Quality Gates, no permetrà continuar amb el desplegament de l’aplicació. A la pantalla principal de la
pipeline es mostrarà el resultat de la comprovació, habilitant un enllaç on podreu consultar el detall:

![Stage AEC](/related/sic/2.0/link_qualitygate.png)
<br/>

### Prerequisits

Cal assegurar-se de tenir el codi font actualitzat, amb el versionat adient, i tenir integrada la aplicació al SIC i,
per tant, disposar de pipelines de desplegament automàtic.

### Client utilitzat segons tecnologia

El sistema farà l’enviament amb el client SonarScanner més adequat per a cada tipus de tecnologia de construcció:

- `MAVEN`: per a projectes Maven.
- `MSBUILD`: per a projectes que utilitzen MSBuild.
- `GENERIC`: per a projectes que utilitzen NPM, projectes PHP, PL/SQL i d'altres.

Per a més informació:
https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/

<br/>
Per defecte, l’enviament es farà aplicant els clients SonarScanner i paràmetres extrets en base a la classificació del
pas de construcció (*step*) configurat al fitxer descriptor [ACA](https://canigo.ctti.gencat.cat/sic-welcome-pack/fitxer-aca/)
repositat al codi font dels projectes i que origina la generació de les pipelines.
Podeu veure que, com a novetat, es permet incloure una secció *analysis* on es pot redefinir el sistema d’enviament
per a escollir una modalitat més adequada, per exemple, per a salvar limitacions conegudes com les següents:

- Els projectes mavenitzats han d'empaquetar-se amb una versió mínima de maven 3.
- Els projectes java han de poder-se compilar amb una jdk mínima 1.8
- Els projectes .Net han de compilar-se amb una versió mínima de MSBuild 14

En qualsevol cas, el sistema ignorarà els arxius de [llenguatges no suportats](https://docs.sonarqube.org/latest/analysis/languages/overview/)
per l’eina.

### Configuració a nivell de projecte

Tal com indica a la documentació de referència, cada tipus de client permet configurar els paràmetres aplicables en cada cas:
https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/

En el següent enllaç, podeu trobar alguns [exemples pràctics per a personalitzar exclusions]
(https://canigo.ctti.gencat.cat/drafts/2020-10-26-SIC-Howto-definir_exclusions_SonarQube/index.html).

## Possibles problemàtiques

En cas de detectar problemes com els següents:

-	Hi ha una incompatibilitat tècnica que impedeix l’enviament del codi font
-	Les Quality Gates son fallides però es necessita continuar amb el desplegament de l’aplicació perquè és urgent
-	Les Quality Gates son fallides perquè les regles aplicades no son les esperades
-	..

Fins a resoldre-ho, si és possible, podeu optar per inhibir aquests passos mitjançant la mateixa secció *analysis” del fitxer ACA:
https://canigo.ctti.gencat.cat/sic-welcome-pack/fitxer-aca/

Podent optar per inhibir tot l’stage si hi ha un problema a l’enviament, o només la comprovació de les Quality Gates
per a que només eviti que la pipeline s’aturi en cas de no acompliment de les mateixes.

En qualsevol cas, en cada desplegament **s’enviarà automàticament una notificació a la Oficina de Qualitat**
per a que aquesta sigui coneixedora del cas i pugui fer seguiment.

## Canals de contacte
Davant possibles dubtes o problemes en la configuració i accessos a l’eina SonarQube o la configuració de les
Quality Gates, haureu de posar-vos en contacte amb la Oficina de Qualitat a través del vostre responsable de qualitat a nivell de lot:
https://qualitat.solucions.gencat.cat/.

Si teniu dubtes o problemes amb el comportament de les pipelines de desplegament, configuració de projectes i altres
aspectes de la integració contínua; poseu-vos en contracte a través dels [Canals de suport](https://canigo.ctti.gencat.cat/sic/suport/#altres-dubtes-o-problem%C3%A0tiques) del SIC.