+++
date        = "2023-03-17"
title       = "SIC. Migració SIC 3.0 a nova Plataforma Openshift de Cpd3"
description = "El SIC 3.0 ha estat migrat a la nova Plataforma Openshift de Cpd3 amb l'objectiu de millorar el rendiment, el monitoratge i, en general, l'experiència d'usuari."
#sections    = ["Notícies", "home"]
#categories  = ["SIC"]
#key         = "ABRIL2023"
+++

## Introducció

El **Servei d'Integració Contínua és un servei a disposició dels proveïdors d'aplicacions per a automatitzar el desplegament
de les aplicacions**. Dins de les [plataformes cloud](/cloud/plataformes-cloud/) que ofereix la Generalitat de Catalunya,
**Cpd3 passa a proporcionar una nova plataforma CaaS Openshift amb entorns Pre i Pro diferenciats i amb una millora
de rendiment significativa**. Aquesta nova plataforma a Cloud Privat va ser certificada per l'equip de Suport
Cloud per a poder començar a desplegar-hi serveis.

## Novetats

Amb l'objectiu principal de millorar l'experiència d'usuari, s'ha dut a terme la migració del SIC 3.0 als nous clústers
Openshift de Cpd3, que permetrà, entra d'altres:
- Disposar d'entorns PRE i PRO aïllats.
- Millorar el rendiment general del servei.
- Millorar el monitoratge del servei.

Un cop realitzada la posada en servei i posades a disposició les pipelines de construcció i desplegament de les
aplicacions, el servei ha estat certificat des del passat dia 08/03/2023 per part d'un conjunt acotat d'aplicacions
que han ajudat a validar el correcte funcionament dels diferents casos d'ús.

Podeu accedir al servei mitjançant el següent enllaç: https://cicd.sic.intranet.gencat.cat.

### Dates límit

**El dia 06/04/2023 la plataforma actual (https://icdc.sic.intranet.gencat.cat/) deixarà de donar servei** i
tots els desplegaments es faran pel nou sistema. Per la qual cosa, **és important que a aquesta data no hi hagi
cap desplegament en curs** a la plataforma antiga donat ja no serà possible finalitzar-lo.

<br/><br/>
Per a més informació:

- [Integració contínua](/sic30-serveis/ci/)

- [Serveis del SIC i com fer-ne ús](/sic30-guies/eines_sic/)

- [Com construir el fitxer ACA] (/sic30-guies/fitxer-aca/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).