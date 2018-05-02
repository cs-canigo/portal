+++
date        = "2018-04-27"
title       = "SIC. Jobs pipeline: Estat de l'art."
description = "Fa gairebé un any que es van implantar els jobs de tipus pipeline al SIC. En aquest article s'analitza l'estat actual d'aquests tipus de jobs i s'expliquen els futurs canvis que experimentaran aquesta modalitat de jobs."
sections    = ["Notícies"]
categories  = ["sic"]
key         = "MAIG2018"
+++

Fa gairebé un any que es van implantar els jobs de tipus pipeline al SIC. En aquest article s'analitza l'estat actual d'aquests tipus de jobs i s'expliquen els futurs canvis que experimentaran aquesta modalitat de jobs.

## Introducció

Abans de Jenkins 2.0, els _jobs_ de tipus _pipeline_ ja existien mitjançant la instal·lació d'una sèrie de plugins que permetien fer ús d'aquesta modalitat de jobs. Per a la vesió 2.0 de Jenkins, els desenvolupadors de l'eina van realitar un esforç per madurar aquesta nova funcionalitat i integrar-la al seu nucli. D'aquesta manera, a partir d'aquesta versió, l'ús de pipelines amb Jenkins passava a ser una forma oficial i més estable de creació de _jobs_.

Amb la implantació l'any passat del SIC 2.0, es va incorporar al SIC la versió de Jenkins 2.7.4 que ja aportava aquesta funcionalitat.

## Què és una _pipeline_ de Jenkins?

Una _pipeline_ consisteix en un sistema en el que es transforma un flux de dades mitjançant un procés de fases seqüencials, sent l'entrada de cadascuna d'elles la sortida de l'anterior.

Els jobs de tipus _pipeline_ es caracteritzen per tenir la configuració de la construcció i del desplegament en una pipeline. Aquesta pipeline es representa amb un arxiu Groovy que disposa una estructura segmentada en _stages_. A les instruccions de cada _stage_ se les anomena _steps_.

## Avantatges en l'ús de _pipelines_

Els avantatges que ens proporciona aquesta nova forma de generar els jobs són els següents:

* Les _pipelines_ són un script Groovy amb una configuració especial. No cal crear el job mitjançant els formularis que s'empraven amb els jobs de tipus _freestyle_ que requerien plugins, més dedicació i més manteniment.
* Els jobs es tornen molt més versàtils. S'obre un ventall de possibilitats:
	* Continuen havent tasques predefinides que es poden enriquir amb plugins.
	* També hi ha la possibilitat d'incloure _Shared Libraries_ de Jenkins per poder programar customitzacions de qualsevol mena.
* Amb aquest increment d'alternatives, ja no cal dependre dels plugins per tal de disposar noves funcionalitats. Amb el desús dels plugins, la configuració i el manteniment de la plataforma Jenkins són més senzills, evitant l'aparició de _Snowflake servers_ amb configuracions excessivament complicades de reproduir.
* Permet realitzar la construcció i el desplegament en tots els entorns de l'aplicació amb un sol job. Facilitant el seguiment del cicle de vida de l'aplicació i garantint el principi de promoció d'artefactes entre entorns amb una única construcció.

## La _pipeline_ Jenkins al SIC

La _pipeline_ Jenkins que s'ha implementat al SIC és el resultat d'implementar jobs amb dos objectius concrets:

1. Aportar el valor de cada _commit_ amb la menor latència possible a Producció.
2. Permetre la introducció de controls de qualitat, de robustesa i de seguretat al codi.
3. Automatitzar el cicle de vida de l'aplicació el màxim possible per evitar errors humans i tenir traça de cada construcció i de cada desplegament.
4. Aportar totes les facilitats possibles als usuaris que en faran ús del SIC.

Amb aquests objectius, s'ha definit al SIC el següent model de _pipeline_:

![Pipeline del SIC](/images/news/introduccio-pipelines-sic.2.0.png)

## Futures passes

L'ús de _pipelines_ al SIC obre un nou món de possibilitats, com per exemple:

* Mitjançant projectes Groovy, permet implementar qualsevol tipus de funcionalitat a través de les _Shared libraries_. Aquestes llibreries exposen una API que es pot invocar des de la pròpia _pipeline_.
* Es pot automatitzar la creació de _jobs_ generant aquesta _pipeline_ a partir d'una sèrie de paràmetres de configuració.

Justament a finals d'abril s'ha finalitzat el projecte de l'**Autoservei de jobs pipeline**, amb el qual es podran crear _jobs_ de forma automàtica a partir de les configuracions introduïdes als repositoris GIT per part del proveïdor d'aplicacions i del proveïdor d'infraestructures. Teniu disponible tota la informació relativa al seu funcionament al [Manual d'Usuari del SIC](/related/sic/manual-usuari.pdf).