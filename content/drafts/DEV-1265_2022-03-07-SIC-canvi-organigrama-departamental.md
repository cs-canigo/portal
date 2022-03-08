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
de grups Ldap d'usuaris responsables a nivell d'àmbit.

**El SIC habilita l'accés per part de responsables d'àmbit als següents serveis**, d'acord amb la informació de
l'inventari d'aplicacions i la corresponent estructura departamental:

- [Servei de Custòdia de codi font](/sic30-serveis/scm/)
- [Servei d'Integració Contínua - SIC 2.0](/sic20-serveis/ci/)
- [Servei d'Integració Contínua - SIC 3.0](/sic30-serveis/ci/)

## Novetats

Amb l'objectiu d'adaptar el sistema d'accessos als serveis del SIC, s'han dut a terme diferents accions que es detallen
a continuació.

### Reconfiguració de grups d'àmbit

S'ha mantingut l'actual estructura de grups Gicar Ldap de responsables d'àmbit, definint i aplicant les corresponents
equivalències d'acrònims de departaments i unitats d'acord amb el nou organigrama departamental i havent realitzat les altes
necessàries per a nous departaments i unitats amb entitat pròpia. La **relació de grups d'àmbit** queda de la següent manera:

|Grups d'àmbit|
|-------|
|DEPARTAMENT D'ACCIÓ CLIMÀTICA, ALIMENTACIÓ I AGENDA RURAL|
|AGÈNCIA CATALANA DE CONSUM (ACC)|
|AGÈNCIA PER A LA COMPETITIVITAT DE L'EMPRESA (ACCIO)|
|AGÈNCIA CATALANA DE TURISME (ACT)|
|AUTORITAT CATALANA DE PROTECCIÓ DE DADES (APDCAT)|
|AGÈNCIA TRIBUTÀRIA DE CATALUNYA|
|DEPARTAMENT DE DRETS SOCIALS|
|CONSORCI ADMINISTRACIÓ OBERTA DE CATALUNYA|
|D.G. D'ATENCIÓ CIUTADANA|
|CONSELL CATALA DE L'ESPORT|
|FUNDACIÓ CENTRE DE LA SEGURETAT DE LA INFORM. CAT.|
|DEPARTAMENT DE CULTURA|
|CENTRE DE TELECOMUNICACIONS I TECNOLOGIES DE LA INFORMACIO|
|DIRECCIÓ GENERAL DE LA POLICIA|
|ENT.AUTONOMA DIARI OFICIAL I PUBLICACIONS DE LA GENERALITAT|
|ESCOLA D'ADMINISTRACIÓ PÚBLICA DE CATALUNYA (EAPC)|
|DEPARTAMENT D'ECONOMIA I HISENDA|
|DEPARTAMENT D'EMPRESA I TREBALL|
|DEPARTAMENT D'EDUCACIÓ|
|DEPARTAMENT D'ACCIÓ EXTERIOR I GOVERN OBERT|
|INSTITUT CATALÀ D'ENERGIA (ICAEN)|
|INSTITUT CATALÀ DE LA SALUT|
|DEPARTAMENT D'IGUALTAT I FEMINISMES|
|DEPARTAMENT D'INTERIOR|
|DEPARTAMENT DE JUSTÍCIA|
|OFICINA ANTIFRAU DE CATALUNYA|
|DEPT. PDA -CONNECTIVITAT CENTRALITZADA|
|DEPARTAMENT DE POLÍTIQUES DIGITALS I ADMINISTRACIÓ PÚBLICA|
|DEPARTAMENT DE LA PRESIDÈNCIA|
|SINDICATURA DE COMPTES DE CATALUNYA|
|SERVEI CATALA DE TRANSIT|
|SISTEMA D'EMERGÈNCIES MÈDIQUES, SA (SEMSA)|
|SERVEI CATALÀ DE LA SALUT|
|SERVEI D'OCUPACIÓ DE CATALUNYA|
|DEPARTAMENT DE RECERCA I UNIVERSITATS|
|DEPARTAMENT DE VICEPRESIDÈNCIA I DE POLÍTIQUES DIGITALS I TERRITORI|

Aquests grups estaran gestionats per l’aplicació de [Control d’Accés de Recursos de GICAR]
(https://gicar.intranet.gencat.cat/gdi/controlaccesrecursos/) en mode autoservei per l’aplicació “SIC”.

### Incorporació de l'inventari d'aplicacions actualitzat

S'ha carregat l**'última versió de l'inventari d'aplicacions per a fer efectiva la nova estructura organitzativa** en els
accessos als serveis del SIC per part dels responsables d'àmbit de les aplicacions, així com pel que fa a la generació
mensual d'indicadors CS-Canigó per a fer seguiment de la situació del parc d'aplicacions de la Generalitat.

### Regularització d'accessos

S'han **regularitzat els accessos als serveis del SIC** perquè els responsables d'àmbit, d'acord amb el nou organigrama
departamental, disposin d'accés:

- Al codi font de les aplicacions de l'àmbit,
- A les pipelines de construcció i desplegament de les aplicacions de l'àmbit al SIC 2.0 i
- A les pipelines de construcció i desplegament de les aplicacions de l'àmbit al SIC 3.0.


<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).