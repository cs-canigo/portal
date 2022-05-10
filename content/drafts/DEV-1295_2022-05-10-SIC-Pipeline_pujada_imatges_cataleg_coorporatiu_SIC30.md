+++
date        = "2022-05-10"
title       = "SIC. Nova pipeline de pujada d'imatges pròpies al registre corporatiu al SIC 3.0"
description = "El SIC 3.0 proporciona un nou model de pipeline per a la pujada d'imatges pròpies al Registre d'Imatges corporatiu (BAKE)."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "JUNY2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions** proporcionant diferents models de pipeline segons les necessitats:

- Desplegament d'aplicacions o productes

- Publicació de llibreries

En aquest escenari, en cas de requerir la pujada d'una imatge pròpia al Registre d'Imatges corporatiu, el procediment
implicava fer una petició a l'equip de Suport Cloud.

## Novetats

Amb l'objectiu de dotar d'una major autonomia als lots d'aplicacions, el **SIC 3.0 passa a permetre la construcció i
publicació d'imatges pròpies al Registre d'Imatges corporatiu** (Harbor). Aquesta funcionalitat està principalment
concebuda per a permetre disposar d'imatges pròpies de productes de tercers i que permetrà estendre, tant d’imatges
del Repositori Corporatiu com d'altres repositoris públics.

Per a la publicació d'imatges pròpies, a més de la versió, únicament serà necessari configurar la ruta i nom del
`Dockerfile` i el nom de la imatge a generar. Amb l’objectiu que els usuaris sàpiguen com s’ha de configurar i
quin serà el funcionament, s’ha adaptat la documentació i s’han incorporat exemples:

- [Autoservei de pipelines](/sic30-serveis/autoservei-pipelines/)
- [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/)
- [Exemple fitxer ACA](/related/sic/3.0/aca_const_publi_harbor_image.yml)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).