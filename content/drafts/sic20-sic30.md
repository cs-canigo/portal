+++
date        = "2021-06-07"
title       = "Quina versió del SIC consultar"
description = "Indicacions per a saber amb quina versió del SIC es treballa i, per tant, quina és la documentació de referència en cada cas"
sections    = "SIC"
toc         = true
taxonomies  = []
weight      = 1
+++

**S'ha posat en servei la nova Plataforma del
Sistema d'integració contínua v.3.0**.
L’objectiu perseguit ha estat millorar el lliurament de solucions de TIC a la Generalitat emprant noves tecnologies,
eines i processos els quals permetin simplificar i lliurar solucions de més alt nivell amb una millor resiliència i
robustesa d'una manera més àgil.

## SIC 3.0

Els requeriments que ha pretès cobrir d'aquest nou sistema són:

- Maximitzar l'autoservei d'infraestructures
- Maximitzar l'autonomia del lot d'aplicacions
- Maximitzar la mantenibilitat i escalabilitat de les pipelines
- Maximitzar la mantenibilitat i robustesa de la Plataforma SIC
- Maximitzar la visibilitat de l'entorn per part de lot d'aplicacions
- Maximitzar l'automatització de tasques
- Desfer colls d’ampolla
- Minimitzar els temps necessaris per posar una solució en servei
- Minorar el cost dels futurs evolutius
- Convergència desplegaments on-premise i cloud

Per a assolir els objectius, s’han aplicat les següents decisions estratègiques:

- **Estandarditzar processos**: en tenir processos estandarditzats i globals, es redueix el manteniment alhora
que resulta més fàcil capacitar nous recursos.
- **Millorar el servei**: major robustesa, disponibilitat i resiliència resulten en una major qualitat i un
menor temps de time-to-market.
- **Servei sostenible**: utilitzant el potencial de cloud s'aconsegueix que els costos operatius del servei siguin sostenibles.
- **Automatització**: minimitzant recursos de servei i reemplaçant-los per automatització s'aconsegueix redirigir
els recursos cap a l'evolució constant.

### Detall de la solució

La nova solució es compon dels següents components:

- **Nova plataforma CI/CD** basada en contenidors en Openshift amb el Stack:
  - Jenkins amb agents dinàmics
  - Prometheus i Grafana pel monitoratge
  - EFK per a la gestió de logs
  - Keycloak com a broker de seguretat amb integració amb Gicar
- **Ampliació del catàleg d'imatges**, tant per a la construcció de les aplicacions com per als desplegaments
- **Nou Autoservei de Pipelines** basat en fitxers de configuració en format YML
- **Nou model de pipelines** úniques (dinàmiques) per tipus d'operació


### Principals canvis per l’usuari

A continuació es descriuen els principals canvis que cal que l’usuari tingui pressents de cara a la preparació dels projectes i al funcionament de les pipelines de desplegament:

* El proveïdor d’aplicacions passa a disposar d’**autonomia en la configuració de les seves pipelines de construcció i desplegament al cloud** mitjançant el `fitxer ACA` en format YML. Aquesta autonomia que s’adquireix implica també la responsabilitat de fer una correcta configuració d’assignació de recursos, timeouts i altres aspectes.

* El **fitxer `sic/sic.yml`**, que fins ara proporcionava la versió de l’aplicació, ha quedat absorbit pel fitxer `sic/aca.yml`. No obstant això, si aquest fitxer es trobava automatitzat i, per tant, es generava en temps de construcció assignant-li la versió de l’aplicació de forma automàtica, es podrà mantenir en el projecte evitant, simplement, indicar la propietat homologa `info.version`.

* Nova **pipeline DEPLOY-ALL** que permet fer un desplegament complet davant canvis en l’aplicació, orquestradors i/o descriptors.

* Noves **pipelines auxiliars DEPLOYER i CLEANER** ubicades a una nova carpeta `/Aux` que s’encarreguen del desplegament de les aplicacions i l’esborrat final de l’espai de treball (respectivament). Es tracta de pipelines secundàries que són utilitzades des de totes les pipelines per a dur a terme tasques comunes.

* Les pipelines passen a executar-se en contenidors per la qual cosa cal fer una correcta assignació de recursos de màquina (cpu i memòria) perquè el contenidor pugui dur a terme la tasca requerida.

* Els **punts d’aprovació expiren en 30 dies*.

* **No es permeten execucions concurrents** d’una mateixa pipeline.


## Calendaris

Progressivament, i a mesura que la nova Plataforma SIC 3.0 doni cobertura a les necessitats, els usuaris passaran a fer ús de la nova versió i el SIC 2.0 anirà caient en desús fins que es pugui donar de baixa definitivament.

En aquest sentit, la situació actual (que és viva i s’anirà actualitzant) i els calendaris provisionals són els següents:

|Data|Abast SIC 3.0|
|-------|-------|
|05/2021|Noves pipelines cloud|
|07/2021|Totes les pipelines cloud|
|08/2021|Noves pipelines on-premise amb desplegament delegat i semiautomàtic (excepte .NET Framework)|
|09/2021|Noves pipelines on-premise amb desplegament delegat i semiautomàtic|
|11/2021|Totes les pipelines on-premise amb desplegament delegat i semiautomàtic|

## Documentació segons versió

La documentació del Portal d'Arquitectura s'ha separat en **dos blocs diferenciats: SIC 2.0 i SIC 3.0**, amb la finalitat que
la documentació estigui ordenada, sigui clara, usable i no es perdi navegabilitat. No obstant això, cal tenir present que la nova versió no implica de moment canvis en el funcionament dels serveis de custòdia de codi, de custòdia de binaris ni en l'autoservei d'usuaris.

El plantejament és, per tant, que els usuaris, segons la versió que estiguin utilitzant de la Plataforma CI/CD, puguin accedir a tota la documentació relacionada:

* SIC 2.0:
	* [Serveis](/sic20-serveis/)
	* [Guies](/sic20-guies/)
* SIC 3.0:
	* [Serveis](/sic30-serveis/)
	* [Guies](/sic30-guies/)


<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).