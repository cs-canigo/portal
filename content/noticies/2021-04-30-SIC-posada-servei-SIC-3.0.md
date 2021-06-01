+++
date        = "2021-05-20"
title       = "SIC. Posada en servei Plataforma SIC 3.0"
description = "El dia 01/05/2021 s'ha posat en servei la nova Plataforma del Sistema d'Integració Contínua 3.0 "
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "JUNY2021"
+++

**A partir del 01 de maig del 2021 s'ha posat en servei la nova Plataforma del
Sistema d'integració contínua v.3.0**.
L’objectiu perseguit ha estat millorar el lliurament de solucions de TIC a la Generalitat emprant noves tecnologies,
eines i processos els quals permetin simplificar i lliurar solucions de més alt nivell amb una millor resiliència i
robustesa d'una manera més àgil.

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

## Estratègia

Per a assolir els objectius, s’han aplicat les següents decisions estratègiques:

- **Estandarditzar processos**: en tenir processos estandarditzats i globals, es redueix el manteniment alhora
que resulta més fàcil capacitar nous recursos.
- **Millorar el servei**: major robustesa, disponibilitat i resiliència resulten en una major qualitat i un
menor temps de time-to-market.
- **Servei sostenible**: utilitzant el potencial de cloud s'aconsegueix que els costos operatius del servei siguin sostenibles.
- **Automatització**: minimitzant recursos de servei i reemplaçant-los per automatització s'aconsegueix redirigir
els recursos cap a l'evolució constant.

## Detall de la solució

La nova solució es compon dels següents components:

- **Nova plataforma CI/CD** basada en contenidors en Openshift amb el Stack:
  - Jenkins amb agents dinàmics
  - Prometheus i Grafana pel monitoratge
  - EFK per a la gestió de logs
  - Keycloak com a broker de seguretat amb integració amb Gicar
- **Ampliació del catàleg d'imatges**, tant per a la construcció de les aplicacions com per als desplegaments
- **Nou Autoservei de Pipelines** basat en fitxers de configuració en format YML
- **Nou model de pipelines** úniques (dinàmiques) per tipus d'operació

Les etapes previstes de desplegament són les següents:

<CENTER>![Nou projecte](/related/sic/3.0/pipeline-stages-sense hook.png)</center>

## Calendaris

En endavant, tota nova integració de projectes al SIC s’integrarà fent ús de la nova Plataforma si les necessitats
es troben cobertes pel sistema i el calendari provisional de migració cap al nou sistema és el següent:

- Al **juny del 2021 està previst iniciar la migració de les pipelines cloud**

- Al **setembre-octubre del 2021 està previst iniciar la migració de les pipelines on-premise**

<br/>
Per a més informació:

- [Integració Continua](/sic30-serveis/ci/)
- [Autoservei de pipelines](/sic30-serveis/autoservei-pipelines/)

<br/><br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).