+++
date        = "2022-02-23"
title       = "SGDE. Migració AEM Forms 6.3.8 a AEM Forms 6.5"
description = "A partir del febrer de 2022 s'inicia el projecte de migració de AEM Forms que dóna servei a les funcionalitats del SGDE"
sections    = ["Notícies", "home"]
categories  = ["SGDE"]
key         = "MARÇ2022"
+++

## Introducció

Les administracions públiques han de ser un dels motors de la transformació digital del país, per mantenir el seu compromís permanent amb la ciutadania i les empreses.

En aquest context d'innovació i modernització dels processos i sistemes digitals dins de l'administració, emmarquem el **projecte de migració d'Adobe Experience Manager Forms (AEM Forms)**.


## Objectiu de la migració

AEM Forms és un producte core del "Servei de Gestió del Document Electrònic", responsable de la creació de prop de 3 milions de documents per mes, ja sigui mitjançant la renderització de formularis HTML, ja sigui pel suport que ofereix a l'API del Sistema de Transformació de documents (STD). 

Amb l'objectiu de modernitzar la plataforma, donar suport a nous requisits funcionals i no funcionals, i estar preparats per a una possible migració futura al núvol, es fa indispensable la migració de la versió actual d'AEM Forms 6.3.8 On Premise a la nova versió d'AEM Forms 6.5 On Premise, sent aquesta darrera versió un requisit indispensable per posteriorment poder fer la migració del servei al Cloud.


## Estratègia de migració

Per tal que la migració sigui el menys intrusiu possible amb el servei actual, la migració tecnològica del producte es realitzarà en un entorn paral·lel a l'entorn actual.

Aquesta aproximació basada en la coexistència de dos entorns:
* Permetrà evitar una parada de les funcions de l'entorn actua
* facilitarà el test de les funcionalitats al tenir un entorn amb què comparar les proves
* Brinda la possibilitat que les aplicacions que fan ús del sistema s'adaptin de manera més o menys progressiva a la nova versió del producte (tenint sempre aquesta dualitat d'entrada).


## Calendari i aplicacions

La migració de l'aplicació s'inicia aquest febrer del 2022 amb l'objectiu de tenir la plataforma funcionant l'octubre del 2022.

Durant el procés de migració es contactarà amb els referents de les diferents aplicacions integrades amb la plataforma, per tal de donar un major detall del calendari de migració i informar de les possibles afectacions que pot suposar la migració per cadascuna de les aplicacions integrades.
