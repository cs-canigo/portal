+++
date        = "2021-06-07"
title       = "SIC 3.0 i procés de transició"
description = "Nova Plataforma SIC 3.0 i procés de transició previst"
sections    = "SIC"
toc         = true
taxonomies  = []
weight      = 1
+++

## Introducció

**Al maig del 2021 es va posar en servei la Nova Plataforma del Sistema d'integració contínua v.3.0**.
L’objectiu perseguit ha estat millorar el lliurament de solucions de TIC a la Generalitat emprant noves tecnologies,
eines i processos els quals permetin simplificar i lliurar solucions de més alt nivell amb una millor resiliència i
robustesa d'una manera més àgil.

Durant una temporada, **aquest nou sistema conviurà amb l'actual SIC 2.0 de forma que, progressivament, s'aniran transferint les tasques
de construcció i desplegament de les aplicacions** cap al nou sistema. Aquest article pretén conèixer els principals canvis, com està prevista
la transició i quina és la documentació de referència a consultar en cada cas.


## Nova solució

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

La nova solució es compon dels següents components:

- **Nova plataforma CI/CD** basada en contenidors
- **Ampliació del catàleg d'imatges**, tant per a la construcció de les aplicacions com per als desplegaments
- **Nou Autoservei de Pipelines** basat en fitxers de configuració en format YML
- **Nou model de pipelines** úniques (dinàmiques) per tipus d'operació

## Procés de transició

Progressivament, i a mesura que la nova Plataforma SIC 3.0 doni cobertura a les necessitats, els usuaris passaran a fer ús de la nova
versió i el SIC 2.0 anirà caient en desús fins que es pugui donar de baixa definitivament.

En aquest sentit, la situació actual (que és viva i s’anirà actualitzant) i els calendaris provisionals són els següents:

|Data|Abast SIC 3.0|
|-------|-------|
|**05-2021**|**Noves** pipelines **cloud**|
|**07-2021**|**Totes** les pipelines **cloud**|
|**10-2021**|**Noves** pipelines **on-premise** amb desplegament delegat i semiautomàtic (**excepte .NET Framework**)|
|Pendent planificar|**Noves** pipelines **on-premise** amb desplegament delegat i semiautomàtic|
|Pendent planificar|**Totes** les pipelines **on-premise** amb desplegament delegat i semiautomàtic|
|Pendent planificar|**Baixa SIC 2.0**|

## Principals canvis en l'operativa

A continuació es descriuen els principals canvis que cal que l’usuari tingui presents de cara a la preparació dels projectes
i al funcionament de les noves pipelines de desplegament:

* El proveïdor d’aplicacions passa a disposar d’**autonomia en la configuració de les seves pipelines de construcció i
desplegament al cloud** mitjançant el `fitxer ACA` en format YML. Aquesta autonomia que s’adquireix implica també la responsabilitat
de fer una correcta configuració, incloent-hi l'assignació adequat de recursos, temps d'espera (*timeouts*) i altres aspectes.

* Ha canviat l'**estructura d'etapes** (o *stages*) de les pipelines de desplegament per a donar cobertura als requeriments presents i futurs, i
l'arquitectura que hi ha al darrere és completament diferent, per la qual cosa no són comparables les tasques que es realitzen ni els
temps que s'hi destinen.

* Les pipelines **no s'executen automàticament en fer un commit al repositori** de codi font. Cal, per tant, que l'usuari executi la pipeline de
desplegament mitjançant l'opció *Build with Parameters*.

* Les pipelines passen a **executar-se en contenidors** en lloc d'en una màquina virtual, per la qual cosa cal fer una correcta assignació
de recursos de màquina (cpu i memòria) perquè el contenidor pugui dur a terme la tasca requerida. Cal tenir present que cada etapa de la pipeline aixeca un contenidor,
cosa que implica que el temps destinat per les diferents etapes es vegi incrementat en aproximadament 1 minut.

* Relacionat amb el punt anterior, perquè es pugui realitzar la compilació amb la memòria assignada, és possible que en determinats casos
calgui **limitar el consum de memòria de la comanda de compilació de Node** mitjançant el flag --max-old-space-size adequat a la memòria màxima del contenidor.

* Es defineix el **temps d'espera** (DEPLOYMENT_WAIT/JOB_WAIT) aplicable al desplegament, que caldrà ajustar a les necessitats de l'aplicació.

* El **fitxer `sic/sic.yml`**, que fins ara proporcionava la versió de l’aplicació, ha quedat absorbit pel fitxer `sic/aca.yml`. No
obstant això, si aquest fitxer es trobava automatitzat per l'aplicació i, per tant, es generava en temps de construcció assignant-li la versió de
l’aplicació de forma automàtica, es podrà mantenir en el projecte evitant, simplement, indicar la propietat homòloga `info.version`.

* Les **llibreries es publiquen al repositori de llibreries segons la versió indicada al fitxer en format YML** (vegeu punt anterior),
per la qual cosa és important assegurar que la versió indicada estigui alineada amb la versió del component.

* El comportament de les pipelines es configura en fitxers YML, per la qual cosa hi ha informació que se sol·licitava com a paràmetres d'entrada
que **passa a sol·licitar-se en temps d'execució** mitjançant punts de parada a les pipelines (entorn, tag... segons pertoqui al tipus d'operació).

* La pipeline de desplegament **no realitza l’enviament del codi font del projecte a l'eina d'anàlisi estàtic de codi de l'Oficina de Qualitat** ni comprova
les corresponents [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/).

* La **pipeline DEPLOY-TAG** permetrà desplegar tags de la imatge de l'aplicació que hagin arribat a Producció amb èxit. Per tant, si no hi ha tags `v.x.y.z-PR` l'execució
retornarà un error del tipus "No hi ha tags de producció disponibles".

* Es proporciona una nova **pipeline DEPLOY-ALL** que permet fer un desplegament complet davant canvis en l’aplicació, orquestradors
i/o descriptors.

* El sistema genera noves **pipelines auxiliars DEPLOYER i CLEANER** que s’encarreguen del desplegament de les
aplicacions i l’esborrat final de l’espai de treball (respectivament). Es tracta de pipelines que són invocades internament des
de totes les pipelines per a dur a terme tasques comunes.

* Els **punts d’aprovació de desplegament expiren en 30 dies**.

* **No es permeten execucions concurrents** d’una mateixa pipeline. S'haurà, per tant, de finalitzar l'execució anterior abans d'iniciar-ne la nova.

## Documentació de referència

La documentació del Portal d'Arquitectura s'ha separat en **dos blocs diferenciats: SIC 2.0 i SIC 3.0**, amb la finalitat que
la documentació estigui ordenada, sigui clara, usable i no es perdi navegabilitat. No obstant això, cal tenir present que
la nova versió **no implica de moment canvis en el funcionament dels serveis de custòdia de codi, de custòdia de binaris ni
en l'autoservei d'usuaris**.

El plantejament és que els usuaris, segons la versió que estiguin utilitzant de la Plataforma CI/CD, puguin accedir
a tota la documentació relacionada.


<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
