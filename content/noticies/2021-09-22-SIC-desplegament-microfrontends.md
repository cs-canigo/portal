+++
date        = "2021-09-22"
title       = "Nou model de pipeline per al desplegament de micro frontends"
description = "Adaptació del SIC 3.0 per a donar cobertura al desplegament de micro frontends independents dins un servidor compartit amb un volum persistent en plataformes Openshift i Kubernetes."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "OCTUBRE2021"
+++

## Introducció

El terme [Micro Frontends](https://micro-frontends.org/) estén els conceptes de micro serveis al món dels frontals.
La idea que hi ha al darrere és pensar en un lloc web o una aplicació web com una composició de funcions propietat
d'equips independents, de forma que cada equip s'especialitza sobre una àrea de negoci i la desenvolupa
de forma transversal, des de la base de dades fins a la interfície d'usuari.


## Novetats

El **SIC 3.0 permet el desplegament de micro frontends independents dins un servidor compartit amb un volum persistent en
plataformes Openshift i Kubernetes**, generant les pipelines necessàries. Amb l’objectiu que els usuaris sàpiguen
com s’ha de configurar i quin serà el funcionament, s’ha adaptat la documentació i s’han incorporat exemples:

- [Autoservei de pipelines](/sic30-serveis/autoservei-pipelines/)
- [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)
- [Exemple fitxer ACA](/related/sic/3.0/aca_const_despl_microfrontend_openshift.yml)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).