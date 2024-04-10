+++
date         = "2024-04-09"
title        = "Definició del model de versionat"
description  = "Definició del model de versionat."
weight      = "4"
sections    = ["GHEC"]
+++

# Definició del model de versionat.

## Objectiu 🚀

El present document descriu el model de versionat que s' implantarà dins de l' organització de CTTI sobre el codi dels diferents artefactes que es generaran, la qual cosa permetrà mantenir una traçabilitat exhaustiva d' aquests, gestió de dependències entre artefactes, així com implantar mesures de validació a l' hora de realitzar desplegaments en els diferents entorns.

**És important recalcar, que la informació que s'indica en el següent document està pendent de confirmar amb l'equip de Qualitat de CTTI.**

## Al detall 📋

El model de versionat que s'implantarà sobre el codi dels diferents artefactes que es generaran, es realitzarà a 3 nivells o capes :
1. Versionat a nivell de repositori al repositori Github.
2. Versionat a nivell de codi en els fitxers pom.xml de configuració de les llibreries (només aplica a llibreries ja que, a causa de polítiques de CTTI, les imatges són immutables, i aquesta gestió de traçabilitat requereix el compilat i reempaquetat de l'aplicació en cada branca).
3. Versionat a nivell d'artefacte (ja sigui llibreria o imatges) en els repositoris o registres d'artefactes corresponents.


![Cuadro Versionado](/images/GHEC/cuadro_versionado.png)

Per als tres tipus nivells de versionat, s'implantarà l'especificació Semantic Versioning 2.0 amb el següent format **MAJOR. MINOR. PATCH-Sufix** on:

+ MAJOR : S'augmenta la versió quan es fan canvis incompatibles. 
+ MINOR : S'augmenta la versió quan es fan canvis de funcionalitat compatibles amb versions anteriors. 
+ PATCH : S'augmenta la versió quan fas resolució d'incidències compatibles amb versions anteriors.
+ Sufix : Cadena de text opcional que completarà a la versió per indicar en quin entorn o stage del gitflow hi ha un artefacte.  **NOMÉS ES REALITZARÀ PER A ENTORN NO/FASES NO PRODUCTIVES (Development, Release)**.  

Es proposa la següent Nomenclatura :
- SNAPSHOT - Per a desplegaments en entorn de desenvolupament o commit de Feature a Development

- RC* - Release Candidate, versió X, per a desplegaments a entorns pre-productius o commit de Development a Release.

- En cas de no introduir cap sufix, indicarà que l' artefacte, llibreria o script està preparat per promocionar Màster o ser desplegat en producció.  De Release a Main/Master.

Exemple :


![Cuadro Versionado](/images/GHEC/ejemplo_semver.png)

## Wiki 📖

Es pot trobar més informació al següent enllaç :
[Semantic Versionning](https://semver.org/spec/v2.0.0.html)







