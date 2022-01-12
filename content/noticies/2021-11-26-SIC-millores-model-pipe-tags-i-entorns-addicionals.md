+++
date        = "2021-11-26"
title       = "SIC. Revisió model de tags i versions pipelines SIC 3.0"
description = "A partir del 24/01/2022 es posa en servei el nou model de tags i gestió de versions de les pipelines del SIC 3.0 per a donar cobertura al desplegament a entorns addicionals."
#sections    = ["Notícies", "home"]
#categories  = ["sic"]
#key         = "GENER2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. En aquest sentit, les pipelines de desplegament incorporen una determinada gestió de tags i versions
dels diferents components de les aplicacions i permeten el desplegament consecutiu als diferents entorns de rebuda,
habitualment: Integració, Preproducció i Producció.

## Novetats

Amb l'objectiu de donar cobertura al desplegament en entorns addicionals com, per exemple, entorns d'Evolutius, Proves,
Manteniment, Formació i altres; **a partir del 24/01/2022 s'aplica un nou model de tags i gestió de versions de les pipelines**
implicant els següents canvis:

1. Les pipelines passen a generar el **tag de Release (Stage `Release Tag`) immediatament després de l'execució de testos de seguretat i testos unitaris**.
És a dir, cada versió del codi que hagi pogut ser construïda i hagi passat els testos de forma satisfactòria serà etiquetada, per la qual cosa,
la incorporació de canvis al codi implicarà necessàriament un increment de versió del component.

2. Les pipelines passen a generar un **tag per entorn (Stage `Environment Tag`) tan bon punt s'ha realitzat el desplegament a l'entorn
pertinent i s'han passat els testos de forma satisfactòria**. Aquest tag permetrà conèixer, pel que fa al repositori de codi, en quins entorns
ha estat desplegada cada una de les versions del component.

3. La **pipeline DEPLOY-TAG**, que permet redesplegar un determinat tag de la imatge de l'aplicació que s'hagi desplegat amb èxit a producció,
**únicament permetrà seleccionar tags de tipus `x.y.z-PR`** (per retrocompatibilitat) **i `x.y.z-production`**.

<br/>
El model d'etapes de la pipeline de desplegament queda de la següent manera:
<CENTER>![Nou projecte](/related/sic/3.0/pipeline-stages.png)</center>

<br/>
Per a més informació:

- [Servei d'Integració Contínua](https://canigo.ctti.gencat.cat/sic30-serveis/ci/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).