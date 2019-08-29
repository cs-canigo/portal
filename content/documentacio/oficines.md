+++
date        = "2019-08-29"
title       = "Integració d'oficines al SIC"
description = ""
sections    = ""
taxonomies  = []
toc             = false
weight          = 1
no_index        = true
+++

## Introducció

Les oficines CTTI que requereixin intervenir a les pipelines de construcció i desplegament per a accions de la seva responsabilitat tenen la possibilitat de sol·licitar la seva integració al SIC. Aquest procés d'integració permet establir en quins punts de la pipeline es requereix l'execució de stages (fases) delegades a aquesta Oficina. L'oficina s'encarregarà d'implementar els controls, les validacions i altres tasques que recaiguin a la seva responsabilitat i àmbit i seran invocats en les fases acordades.

A tal efecte, es proporciona accés a l'entorn de PRE del SIC per tal que sigui el seu entorn de proves i validació. Les oficines disposaran a l'entorn de PRE del SIC:

* D'un grup de GitLab on crear els seus projectes que seran invocats des de la pipeline.
* D'accés a un projecte al GitLab d'utilitats proporcionat pel SIC.
* D'un projecte d'exemple d'una aplicació Canigó.
* D'una pipeline d'exemple de construcció i desplegament del projecte anterior.
* D'una pipeline de promoció del seu codi de PRE a PRO.

A més, es proporcionarà accés a PRO a les oficines:

* Accés en mode lectura al projecte equivalent de PRO que s'ha promocionat amb la seva pipeline de promoció.
* Accés en mode lectura a tots els projectes integrats a CTTI.

## Procediment

La integració d'oficines al SIC és un procés que requereix les següents passes:

1. **Sol·licitud d'integració d'oficines**: el responsable de l'oficina ha d'obrir una WORK ORDER a SAU Remedy al servei *Framework SIC*, tot indicant:
	* El nom de l'oficina
	* Usuari gestor (sol ser el responsable de l'oficina CTTI que es pretén integrar)
	* Usuaris que desenvoluparan les seccions de la pipeline on intervé l'oficina (es requereix que estiguin donats d'alta a GICAR).

2. **Gestió de la petició per part del SIC**: quan el SIC rep la petició anterior, realitza les següents accions:
	* Creació dels grups de seguretat a PRE i a PRO al LDAP del SIC.
	* Creació dels grups de gitlab corresponents a l'Oficina. A PRE els usuaris es comportaran com a Release Managers i podran pujar codi. A PRO tindran només permisos de lectura. El codi de PRO es promocionat des del de PRE amb una pipeline pròpia.
	* Creació de la pipeline amb un projecte Canigó d'exemple.
	* Creació de la pipeline de promoció del seu propi codi de PRE a PRO.

3. **Fase de servei**: Un cop finalitza la integració, es pasa en mode servei:
	1. L'oficina va generant versions a PRE on pot provar-les amb el projecte Canigo dedicat que se li ha proporcionat des del SIC.
	2. Quan s'obté una versió vàlida per a pujar a PRO, l'oficina executa la seva pipeline de promoció que puja el codi de PRE a PRO. Automàticament, el Jenkins de PRO adquireix els canvis realitzats.

## Ús del projecte d'utilitats proporcionat pel SIC

El SIC ofereix una sèrie d'utilitats comunes a totes les oficines recollides en un projecte. Aquest [projecte](https://preproduccio.git.intranet.gencat.cat/0192/SIC-oficines-utils-library) és accessible en mode lectura per als membres de l'oficina i pot ser descarregat per al seu ús en els projectes.

S'incorporen utilitats de gestió de fitxers i directoris, instal·lació de tools de Jenkins, registre d'execucions d'un producte de l'oficina i mètodes relatius a stages i internals de Jenkins.

El seu ús és directe (no cal incloure el projecte dins del projecte de l'oficina ja que Jenkins l'inclou a mode de Shared Library). Exemple:

```
String arxiuOrigen = "${WORKSPACE}/treball/arxiuOrig.txt"
String arxiuDesti = "${WORKSPACE}/treball/arxiuDest.txt"
cat.gencat.ctti.sic.oficines.utils.FileUtils.copyFile(arxiuOrigen, arxiuDesti)
```

<br/>
Si teniu qualsevol dubte utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.

