+++
date        = "2021-04-30"
title       = "SIC. Posada en servei SIC 3.0"
description = "El dia 01/04/2021 s'ha preparat el nou sistema d'integració contínua SIC 3.0 "
#sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "MAIG2021"
+++

Amb la visió de millorar el lliurament de solucions de TIC a la Generalitat emprant noves tecnologies, eines i processos dels quals permetin simplificar i lliurar solucions de més alt nivell amb una millor resilència i robustesa d'una manera més àgil, **a partir del 01 d'Abril del 2021 s'ha preparat el nou sistema d'integració contínua SIC 3.0**.

Els objectius d'aquest nous sistema són:

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

Basant-nos en els següents fonaments:

- Estandaritzar processos: En tenir processos estandarditzats i globals, es redueix el manteniment alhora que resulta més fàcil capacitar nous recursos
- Millorar el servei: Major robustesa, disponibilitat i resiliència resulten en una major qualitat i un menor temps de time-to-market
- Servei sostenible: Utilitzant el potencial de cloud s'aconsegueix que els costos operatius del servei siguin sostenibles
- Automatizació: Minimitzant recursos de servei i reemplaçant-los per automatització s'aconsegueix redireccionar els recursos cap a l'evolució constant

El resum de la solució del nou sistema seria:
- Nova plataforma CI/CD SIC 3.0 basada en contenidors en Openshift amb el stack:
  - Jenkins amb slaves dinàmics
  - Prometheus i Grafana pel monitoratge
  - EFK per la gestió de logs
  - Keycloak com a broker de seguretat amb integració amb Gicar
- Ampliació del cataleg d'imatges, tant per la construcció (pel patró builder), com pels desplegaments
- Nou autoservei de pipelines basats en fitxers de configuració YML
- Nou model de pipelines úniques per tipus d'operació 

Les etapes del job pel desplegament en el nou sistema seran les següents:

<CENTER>![Nou projecte](/related/sic/3.0/pipeline-stages-sense hook.png)</center>

<br/>

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [**Suport**] (/sic/suport)
o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
