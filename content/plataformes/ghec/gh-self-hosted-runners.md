
+++
date         = "2024-04-09"
title        = "Self-hosted runners"
description  = "Execució de workflows amb self-hosted runners"
weight      = "8"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-self-hosted-runners",
    "/ghec/gh-self-hosted-runners"
]
+++

## Objectiu 🚀

GitHub Actions permet l'execució de workflows amb els runners propis de GHEC o runners AD-HOC coneguts com a self-hosted runners, els quals es poden executar des d'altres proveïdors Cloud o inclús On-prem. En l'actual model, s'han generat sota el proveïdor públic de cloud Azure.


![Diagrama Runners](/images/GHEC/gh_self_hosted_runner.png)

Per fer ús d'aquest tipus de runners cal indicar-ho en els workflows de la manera següent:

1. Invocant un job previ que comprova si hi ha runners disponibles i garanteix que almenys sempre un runner està aixecat. S'especificarà si s'ha de realitzar aquest job solament quan sigui necessari executar-se en un self-hosted-runner mitjançant la condició 

            if: ${{ contains(inputs.runner_type, 'self-hosted') }}

      ![](/images/GHEC/gh-containers-running.png)

2. Indicar que s'utilitza un runner auto-hospedat mitjançant:

      Al formulari del workflow cridant (CD): S'indicarà com un choice en format JSON, i després es processarà aquesta elecció en la condició 
      
            runs-on: ${{ fromJSON(inputs.runner_type) }}.

      ![](/images/GHEC/gh-self-hosted-CD.png)

      Al workflow cridant de CI on PR: S'indicarà amb el mateix format JSON el runner a triar.

      ![](/images/GHEC/gh-self-hosted-CI-on-PR.png)

D'altra banda, actualment el model només disposa de self-hosted runners amb les característiques següents:

+ Java i "tallatge" medium
+ Databricks i "tallatge" medium

Segons necessitats, s'ampliarà el catàleg de self-hosted runners que es posen a disposició dels desenvolupadors.
