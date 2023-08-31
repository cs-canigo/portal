+++
date        = "2022-10-19"
title       = "SIC. Validació de fitxers YML de configuració al SIC 3.0"
description = "El SIC 3.0 incorpora la validació de format i contingut dels fitxers YML de configuració per a assegurar que acompleixen l'especificació."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
key         = "NOVEMBRE2022"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. Amb l'objectiu de dotar d'autonomia als proveïdors d'aplicacions per a configurar el comportament de
les seves pipelines de construcció i desplegament, es configuren sèrie de fitxers en format YML, entre el que es troba el fitxer
`sic\aca.yml` que cal afegir al repositori de codi font del projecte i que és responsabilitat dels proveïdors d'aplicacions.

En cas que algun d'aquests fitxers YML de configuració sigui incorrecte, sigui pel que fa a format o contingut, les
pipelines poden arribar a acabar amb error sense indicar d'una forma clara on està exactament el problema de configuració.

## Novetats

Amb l'objectiu d'alertar sobre problemes de configuració i poder orientar als usuaris per a resoldre'ls, **l'etapa d'inicialització
de les pipelines del SIC 3.0 (`Init Stage`) incorpora una validació prèvia de format i contingut dels fitxers YML de configuració**
per a assegurar que aquests acompleixen l'especificació. En cas de detectar un error, aquest es mostrarà a la sortida per
consola de l'execució.

Per a més informació: [Autoservei de pipelines](/plataformes/sic/serveis/sic30-serveis/autoservei-pipelines/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).