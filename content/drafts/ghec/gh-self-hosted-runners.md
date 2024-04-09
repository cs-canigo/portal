
+++
date         = "2024-04-09"
title        = "Execusiò de Actions con Self-Hosted Runners"
description  = "Execusiò de Actions con Self-Hosted Runners"
weight      = "8"
sections    = ["GHEC"]
+++

<img src="https://identitatcorporativa.gencat.cat/web/.content/Documentacio/descarregues/dpt/COLOR/Presidencia/ctti_h2.jpg">

# Execusiò de Actions con Self-Hosted Runners

## Objectiu 🚀

GHEC Actions, permet l'execució de Workflows amb els runners propis de GHEC o Runners AD-HOC coneguts com a Self Hosted Runners que s'executen des d'altres proveïdors Cloud. En l'actual model, s'han generat sota el proveïdor públic de Cloud AZURE.


![Diagrama Runners](/images/GHEC/gh_self_hosted_runner.png)

Per fer ús d' aquest tipus de Runners cal indicar-ho en els workflows de la manera següent:

1. Invocant un Job previ que comprova si hi ha runners disponibles i garanteix que almenys un runner està sempre disponible.


      ![](/images/GHEC/gh-containers-running.png)

2. Indicar que s' utilitza un runner Self-hosted mitjançant:
  
        + Comandament: runs-on:
        + Group: java
        + labels: medium

      ![](/images/GHEC/ghp-run-selfhostedrunners.png)

D' altra banda, actualment el model només disposa de Self-Hosted runners amb les característiques següents:

+ JAVA i "tallatge" medium

Segons necessitats, s'ampliarà el ventall de Self-Hosted Runners a la disposició dels desenvolupadors.
