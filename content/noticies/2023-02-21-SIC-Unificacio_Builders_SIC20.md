+++
date        = "2023-02-21"
title       = "SIC. Unificació de les eines de construcció"
description = "El SIC 2.0 passa a fer ús de les eines de construcció (builders) del catàleg del SIC 3.0, suposant un primer pas cap a l'objectiu de migració."
sections    = ["Notícies", "home"]
categories  = ["SIC"]
key         = "MARÇ2023"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. Actualment, es troben en servei dues plataformes CI/CD: [SIC 2.0](/sic20-serveis/) i [SIC 3.0](/sic30-serveis/),
les quals han estat fent ús de catàlegs d'eines de construcció propis implicant sobrecostos de manteniment i adaptació tecnològica,
a més de generar certa confusió als usuaris del servei.

## Novetats

Amb l'objectiu d'unificar criteris, reduir costos de manteniment i anar fent passes cap a l'objectiu de migració, **s'ha adaptat el
SIC 2.0 per a passar a fer ús de les imatges de construcció del [Catàleg corporatiu del SIC 3.0](/sic20-serveis/registre-imatges/)**.
Aquest catàleg únic d'imatges de construcció proporciona les imatges estrictament necessàries d'acord amb les compatibilitats
de les diferents versions de les tecnologies, tot i que, per raons de retrocompatibilitat de configuracions, en el cas de Maven,
es mantindrà la cobertura de configuració de tools/jdks referenciades actualment per les aplicacions.

### Impacte

S'ha aplicat una estratègia basada en el fet que el canvi sigui transparent per als usuaris, per la qual cosa, en general,
**no serà necessària cap adaptació a les configuracions de les aplicacions integrades** actualment al SIC.
No obstant això, hi ha determinats casos en els quals l'aplicació defineix la seva pròpia imatge de construcció
personalitzada, que acostuma a estendre d'una imatge del catàleg corporatiu del SIC. En aquests casos, sí que esdevindrà
necessari **modificar la imatge de la qual hereta perquè passi a ser una imatge del nou catàleg "gencat-sic-builders"**.

Per exemple:

```bash
FROM registreimatges.sic.intranet.gencat.cat/gencatsic/maven-builder:1.0-3.6-11-openjdk
```

Haurà de substituir-se per:

```bash
FROM registreimatges.sic.intranet.gencat.cat/gencat-sic-builders/mvn-builder:1.0-3.6-11-openjdk
```

### Data límit

**El dia 27/02/2023 es donarà de baixa el catàleg antic d'imatges builder "gencatsic"**. Per la qual cosa, a partir d'aquest moment
qualsevol referència a les imatges antigues implicarà incidències en els desplegaments. Preguem, per tant, dueu a terme les
adaptacions necessàries als aplicatius.

<br/><br/>
Per a més informació:

- [Integració contínua. Tecnologies de construcció](/sic20-serveis/ci/#matriu-de-tecnologies-de-construcció)

- [Registre corporatiu d'imatges de construcció](/sic20-serveis/registre-imatges/)

- [Com construir el fitxer ACA] (/sic20-guies/fitxer-aca/)

- [Utilitzar imatges Docker Builder] (/howtos/2023-02-21-SIC-Howto-utilitzar-imatges-docker-builder-SIC20/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).