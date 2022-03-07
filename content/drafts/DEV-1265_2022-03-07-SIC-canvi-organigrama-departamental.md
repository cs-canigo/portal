+++
date        = "2022-03-07"
title       = "SIC. Revisió de l'organigrama departamental CTTI"
description = "A partir del xx/xx/2022 es posa en servei al SIC el nou organigrama departamental 2022 implicant la revisió del sistema d'accessos als serveis per part dels responsables d'àmbit."
#sections    = ["Notícies", "home"]
#categories  = ["sic"]
#key         = "ABRIL2022"
+++

## Introducció

Recentment **s'ha publicat el nou organigrama departamental que s'ha d'aplicar el 2022 amb el canvi de govern**.
Aquesta nova estructura organitzativa implica una nova versió de l'inventari d'aplicacions (acrònims i noms de
departaments/unitats, canvis d'aplicacions entre departaments i altres) i la corresponent revisió de l'estructura
de grups Ldap d'usuaris responsables d'àmbit.

Els serveis del SIC permeten l'accés per part de responsables d'àmbit d'acord amb la informació de l'inventari
d'aplicacions i la corresponent estructura organitzativa:

- [Servei de Custòdia de codi font](/sic30-serveis/scm/)
- [Servei d'Integració Contínua - SIC 2.0](/sic20-serveis/ci/)
- [Servei d'Integració Contínua - SIC 3.0](/sic30-serveis/ci/)

## Novetats

Amb l'objectiu d'adaptar el sistema d'accessos als serveis del SIC, s'han dut a terme diferents accions que es detallen
a continuació.

### Reconfiguració de grups Ldap d'àmbit

S'ha mantingut l'actual estructura de grups Gicar Ldap de responsables d'àmbit definint i aplicant les corresponents
equivalències d'acrònims de departaments i unitats d'acord amb el nou organigrama departamental, havent realitzat les altes
necessàries per a nous departaments i unitats amb entitat pròpia.

La relació de grups queda de la següent manera:

|Grup LDAP|Descripció|
|0192_RSPL_AAM|DEPARTAMENT D'ACCIÓ CLIMÀTICA, ALIMENTACIÓ I AGENDA RURAL|
|0192_RSPL_ACC|AGÈNCIA CATALANA DE CONSUM (ACC)|
|0192_RSPL_ACC10|AGÈNCIA PER A LA COMPETITIVITAT DE L'EMPRESA (ACCIO)|
|0192_RSPL_ACT|AGÈNCIA CATALANA DE TURISME (ACT)|
|0192_RSPL_APDCAT|AUTORITAT CATALANA DE PROTECCIÓ DE DADES (APDCAT)|
|0192_RSPL_ATC|AGÈNCIA TRIBUTÀRIA DE CATALUNYA|
|0192_RSPL_BSF|DEPARTAMENT DE DRETS SOCIALS|
|0192_RSPL_CAOC|CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA|
|0192_RSPL_CCAC|D.G. D'ATENCIÓ CIUTADANA|
|0192_RSPL_CCE|CONSELL CATALA DE L'ESPORT|
|0192_RSPL_CESICAT|FUNDACIÓ CENTRE DE LA SEGURETAT DE LA INFORM. CAT.|
|0192_RSPL_CLT|DEPARTAMENT DE CULTURA|
|0192_RSPL_CTT|CENTRE DE TELECOMUNICACIONS I TECNOLOGIES DE LA INFORMACIO|
|0192_RSPL_DGP|DIRECCIÓ GENERAL DE LA POLICIA|
|0192_RSPL_EAD|ENT.AUTONOMA DIARI OFICIAL I PUBLICACIONS DE LA GENERALITAT|
|0192_RSPL_EAPC|ESCOLA D'ADMINISTRACIÓ PÚBLICA DE CATALUNYA (EAPC)|
|0192_RSPL_ECO|DEPARTAMENT D'ECONOMIA I HISENDA|
|0192_RSPL_EMO|DEPARTAMENT D'EMPRESA I TREBALL|
|0192_RSPL_ENS|DEPARTAMENT D'EDUCACIÓ|
|0192_RSPL_GRI|DEPARTAMENT D'ACCIÓ EXTERIOR I GOVERN OBERT|
|0192_RSPL_ICA|INSTITUT CATALÀ D'ENERGIA (ICAEN)|
|0192_RSPL_ICS|INSTITUT CATALÀ DE LA SALUT|
|0192_RSPL_IFE|DEPARTAMENT D'IGUALTAT I FEMINISMES|
|0192_RSPL_INT|DEPARTAMENT D'INTERIOR|
|0192_RSPL_JUS|DEPARTAMENT DE JUSTÍCIA|
|0192_RSPL_OAC|OFICINA ANTIFRAU DE CATALUNYA|
|0192_RSPL_PCC|DEPT. PDA -CONNECTIVITAT CENTRALITZADA|
|0192_RSPL_PDA|DEPARTAMENT DE POLÍTIQUES DIGITALS I ADMINISTRACIÓ PÚBLICA|
|0192_RSPL_PRE|DEPARTAMENT DE LA PRESIDÈNCIA|
|0192_RSPL_SCC|SINDICATURA DE COMPTES DE CATALUNYA|
|0192_RSPL_SCT|SERVEI CATALA DE TRANSIT|
|0192_RSPL_SEM|SISTEMA D'EMERGÈNCIES MÈDIQUES, SA (SEMSA)|
|0192_RSPL_SLT|SERVEI CATALÀ DE LA SALUT|
|0192_RSPL_SOC|SERVEI D'OCUPACIÓ DE CATALUNYA|
|0192_RSPL_SUR|DEPARTAMENT DE RECERCA I UNIVERSITATS|
|0192_RSPL_TES|DEPARTAMENT DE VICEPRESIDÈNCIA I DE POLÍTIQUES DIGITALS I TERRITORI|

### Incorporació de l'inventari d'aplicacions actualitzat

Es carrega l'última versió de l'inventari d'aplicacions per a fer efectiva la nova estructura organitzativa en els
accessos als serveis del SIC per part dels responsables d'àmbit de les aplicacions, així com pel que fa a la generació
mensual d'indicadors CS-Canigó relatius a la situació del parc d'aplicacions de la Generalitat.

### Regularització d'accessos

S'han regulartizat els accessos als serveis del SIC perquè els responsables d'àmbit, d'acord amb el nou organigrama
departamental, disposin d'accés:

- Al codi font de les aplicacions de l'àmbit,
- A les pipelines de construcció i desplegament de les seves aplicacions al SIC 2.0 i
- A les pipelines de construcció i desplegament de les seves aplicacions al SIC 3.0.


<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).