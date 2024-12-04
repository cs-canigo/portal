
+++
date         = "2024-04-09"
title        = "Gestió de versions"
description  = "Definició del model de versionat"
weight      = "3"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-definicio-versionat",
    "/ghec/gh-definicio-versionat",
    "/plataformes/ghec/gh-definicio-versionat"
]
+++

## Objectiu 🚀

El present document descriu el model de versionat sobre el codi i els diferents artefactes que es generen dins GHEC, la qual cosa permet mantenir una traçabilitat exhaustiva d'aquests, gestió de dependències entre artefactes, així com implantar mesures de validació en base a aquestes versions a l'hora de realitzar desplegaments en els diferents entorns.

## Al detall 📋

El model de versionat que s'implanta sobre el codi dels diferents artefactes que es generen, es realitza a 3 nivells o capes :
1. Versionat a nivell de repositori de codi.
2. Versionat a nivell de codi en els fitxers pom.xml de configuració de les llibreries (només aplica a llibreries ja que, a causa de polítiques de CTTI, les imatges són immutables, i aquesta gestió de traçabilitat requereix el compilat i reempaquetat de l'aplicació en cada branca).
3. Versionat a nivell d'artefacte (ja sigui llibreria o imatge) en els repositoris o registres d'artefactes corresponents.


![Quadre Versionat](/images/GHEC/quadre_versionat.png)

Pels tres tipus nivells de versionat, s'implanta l'especificació Semantic Versioning 2.0 amb el següent format **MAJOR. MINOR. PATCH_BUILD-Sufix** on:

+ MAJOR : S'augmenta la versió quan es fan canvis incompatibles. 
+ MINOR : S'augmenta la versió quan es fan canvis de funcionalitat compatibles amb versions anteriors. 
+ PATCH : S'augmenta la versió quan fas resolució d'incidències compatibles amb versions anteriors.
+ BUILD : S'augmenta el build per cada binari que es generar. **Només per les aplicacions mòbils**
+ Sufix : Cadena de text opcional que completarà a la versió per indicar en quin entorn o stage del gitflow hi ha un artefacte.  **NOMÉS ES REALITZARÀ PER A ENTORN/FASES NO PRODUCTIVES (Development, Release)**.  

Es defineix la següent Nomenclatura :
- SNAPSHOT - Per a desplegaments en entorn de desenvolupament o commit de Feature a Development

- RC* - Release Candidate, versió X, per a desplegaments a entorns pre-productius o commit de Development a Release.

- En cas de no introduir cap sufix, indicarà que l'artefacte, llibreria o script està preparat per promocionar a Master o ser desplegat en producció.  De Release a Main/Master.

Exemple :


![Exemple SemVer](/images/GHEC/exemple_semver.png)

## Wiki 📖

Es pot trobar més informació al següent enllaç :
[Semantic Versioning](https://semver.org/spec/v2.0.0.html)







