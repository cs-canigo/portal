+++
date        = "2024-07-01"
title       = "Fases d'implementació de la PTD"
description = "Fases a seguir per a l'implementació de la plataforma PTD"
sections    = "PTD"
toc         = false
taxonomies  = []
weight      = 1
+++

## Introducció

A continuació es presenten les diferents fases que cal seguir per implementar la Plataforma Transversal de Dades (PTD). Aquestes fases detallen els passos necessaris per garantir una integració eficient i adequada amb la plataforma, assegurant així que es maximitzen els beneficis de la seva utilització. Cada etapa inclou recomanacions i bones pràctiques per facilitar el procés i garantir-ne l'èxit.

**Important:** Aquest esquema serveix com a guia flexible que permet personalitzar el recorregut segons les característiques i requisits del projecte, assegurant així una integració eficaç i eficient. Per tant, el procés d’implementació a la PTD s’adaptarà a les necessitats específiques de cada proveïdor.

<br>

## Primers Passos: sol·licitud i sessió de benvinguda a la PTD

El primer pas a seguir per formar part de la infraestructura de la PTD és el de realitzar una petició formal d'acompanyament, després de la qual es realitzarà una sessió introductòria i es rebrà el **welcome pack**.

A continuació, mostrem en detall els passos a seguir en aquesta etapa.

<br>

| **1. Sol·licitud d'acompanyament** | **Informació proveïda per PTD** | **Informació entregada/accions requerides pel proveïdor** |
|------------|------|------------|
| El primer pas es realitza fet una sol·licitud de la petició a ACOPTD del servei per part de l'àmbit o proveïdor.| Informació general de com s'inicia el procés):<br><br> - Explicació de què és ACOPTD (en curs).<br>- Credencials per accedir a Jira CTTI (en revisió). | S'ha d'obrir petició a Jira demanant l'acompanyament.

<br>


| **2. Sessió de benvinguda a la PTD** | **Informació proveïda per PTD** | **Informació entregada/accions requerides pel proveïdor** |
|------------|------|------------|
| Es realitzarà una reunió (temps estimat 1h) de cara a tenir un primer contacte. Es podran tractar els següents temes:<br><br>● Arquitectura de la PTD (mòduls i serveis)<br>● Exemples de cas d'ús<br>● Cicle de vida d'acompanyament durant un projecte<br>● Dades que s'han de proporcionar per part del proveïdor (formulari)<br>● Perfils recomanats / coneixements necessaris (certificacions) | - Convocatòria amb contingut de la sessió.<br>-  Welcome pack<br>-  Formulari per a nous casos d'ús   | No és necessària cap informació per part del proveïdor en aquest pas.  |

<br>

| 3. Suport a la configuració de l'entorn DES | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| Es definiran els recursos a desplegar pel proveïdor en l’entorn DES segons la tipologia i abast del projecte:<br><br>● Els recursos es dotaran mitjançant plantilles IaC Terraform (Databricks, Azure, MongoBD, etc.)<br>● Es proporcionaran requisits de seguretat de l'entorn<br>● El repositori de Codi del proveïdor haurà d’utilitzar el mateix que el que determina CTTI en els entorns de PRE/PRO. Ara AzureDevops // futura migració Github | - Plantilles Infrastructure as Code (IaC) en Terraform en funció dels recursos que siguin necessaris <br>- Github / AzureDevops.<br>- Requisits en repositoris de codi. CI/CD. | <br>- Disposar de la subscripció al Tenant del CTTI. <br>- Ticket ISOL (per proveïdor) si hi ha infraestructures de solució. 

<br>

## Projecte: passos a seguir per a la implementació del projecte a PTD

Un cop realitzats els dos primers passos introductoris a la plataforma, ja es pot començar amb la implementació del projecte a la PTD. Per aconseguir aquest objectiu, serà necessari seguir aquestes fases d'acompanyament.

<br>

| 1. Reunió kick-off de projecte | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| Es realitzarà una sessió amb l'àmbit o proveïdor on es proporcionarà el detall del projecte. Es podran tractar els següents temes: <br><br>● Tipologia de projecte<br>● Serveis i funcionalitats que precisa el projecte<br>● Orígens, accessibilitat i tipologia de les dades (requereix ingesta o no, etc)<br>● Equips implicats (departament + PTD + proveïdor)<br>● Tasques que haurà d’assumir cadascun dels equips<br>● Requisits de seguretat, rendiment o especials a tenir en compte <br>● Criteris d’acceptació per a la productivització (que s'han de tenir i passar)<br>● Següents passes i procediments a seguir per a la implantació del projecte <br>● Explicar nivell de tallatge de còmput disponibles a la PTD (si és necessari)<br>● Explicar les tipologies de clústers proporcionats per la PTD (si és necessari)<br>● Tecnologia recomanada per la PTD segons el cas d'ús | - Formulari recollida de requisits (en curs) (https://forms.office.com/e/P94Wah89SK?origin=lprLink) perquè puguin preparar qualsevol pregunta sobre com omplir-lo<br>- Canal per dubtes de definició: bústia GENCAT (després de la reunió).<br>- Seguretat - Controls d'arquitectura_v1.pdf (després de la reunió).<br>- Qualitat_de_la_dada_v2.pptx (després de la reunió).<br>- Plantilla DA (PTD / CTTI) (Arquitectura_DT_DAQ_V2.7.docx) (després de la reunió). | - Dissenys funcionals o tècnics dels que es dispossi per part de l'àmbit o el proveïdor.<br>- Formulari de recollida de requisits emplenat (després de la reunió).

<br>

| 2. Resum projecte i aprovació del CTTI | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| En aquest consisteix en l'aprovació del projecte per part del CTTI. Per aconseguir-ho, es tractaran els següents temes en una sessió amb el CTTI:<br><br>● Seguretat (dades i plataforma)<br>● Criteris d'acceptació funcional (abast del projecte i validadors)<br>● Domini al qual pertanyen les dades del projecte | - Resum del cas a partir de les respostes del formulari | - Document d'arquitectura<br>- Criteris d'acceptació funcional

<br>

| 3. Directrius d'integració | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| S'entregaran les directrius d'integració de la plataforma. Per exemple:<br><br>● Directrius i criteris d’integració continua seguint la recomanació de Databricks (estructura Bundle) <br>● Directrius i criteris dels dominis d’informació del projecte<br>● Directrius i criteris d’aprovació dels fluxos de CI/CD per a l’alliberament de Releases <br>● Directrius i controls de qualitat del codi, seguint les polítiques del CTTI<br>● Directrius i criteris  de seguretat tant de plataforma, com de Dades<br>● Directrius i criteris de la política de FinOps i etiquetatge | - Directrius d'integració que apliquen al projecte | No és necessària cap informació per part del proveïdor en aquest pas.  |


<br>

| 4. Coordinació del Govern de la dada | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| Es realitza una revisió dels estàndards tècnics:<br><br>● Dades del cas d'ús específic<br>● Plantilles de govern de la dada - eines corporatives CTTIe | - Estàndards tècnics de govern de la dada. Document de context i requisits inicials (document estandarditzat amb instruccions sobre ordenació de dades, nomenclatura i aspectes tècnics del govern de la dada.)<br>- Plantilles eines corporatives <br>- Regles de validació implementades <br>- Regles de reparació implementades  | Es necessitarà informació que expliqui els següents punts o donin resposta als següents ítems:<br><br>- Glossari de negoci (termes de negoci i mètriques)<br>- Metadades (identifica sistemes, dades, atributs)<br>- Regles de qualitat (regles a aplicar per al cas d'ús en concret)

<br>

| 5. Validació dels criteris d'acceptació per a desplegament a entorn  pre-productiu | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| Es podran revisar els següents punts per permetre l'accés a l'entorn pre-productiu (PRE):<br><br>● Lliurement per part del proveïdor del DA, DF, DT disponibles<br>● Validació del compliment de les directrius d’integració establertes <br>● Aportar evidències positives de les proves de qualitat de codi <br>● Aportar evidències positives de les proves d’integració i UAT <br>● Validar que el projecte s’ajusta als requisits d’eficiència i FinOps <br>● Validació dels criteris de Seguretat<br>● Validació del govern de la Dada | - Criteris de validació i acceptació | Es necessitarà informació que expliqui els següents punts o donin resposta als següents ítems:<br><br>- Lliurement per part del proveïdor del DA, DF, DT disponibles<br>- Validació del compliment de les directrius d’integració establertes <br>- Aportar evidències positives de les proves de qualitat de codi (sonar + quality gates)<br>- Validar que el projecte s’ajusta als requisits d’eficiència i FinOps <br>- Validació dels criteris de Seguretat<br>- Validació del govern de la Dada

<br>

| 6. Productivització del cas d'ús | Informació proveïda per PTD | Informació entregada/accions requerides pel proveïdor |
|------------|------|------------|
| Es realitzarà la promoció a l'entorn productiu (PRO). Serà necessari:<br><br>● Aportar evidències positives de les proves a pre-producció.<br>● Realitzar la validació funcional per als usuaris finals.| No s'entregarà cap informació per part de PTD en aquest pas. | <br>- Lliurement per part del proveïdor del DA, DF, DT definitius<br>- Aportar evidències positives de les proves a pre-producció (integració i/o UAT)<br>- Aportar conformitat amb la solució per part d'usuaris finals (si aplica)

<br>


## Final: Repàs del projecte, tancament formal

Finalment, es realitzarà un repàs global del projecte per avaluar si s'han complert els objectius i les expectatives definides a l'inici d'aquest. Aquest exercici permetrà consolidar els resultats obtinguts i recollir informació valuosa per a futurs projectes. 

A més, es procedirà al tancament formal del projecte, incloent-hi la documentació final, l’entrega d’informes pertinents i una reunió de tancament amb totes les parts implicades per validar els resultats assolits i reforçar el compromís de continuïtat i col·laboració.

**Important:** Un cop finalitzat el projecte, es sol·licitarà al client final un document, esquema o Excel amb una llista de contactes per a casos d'incidència. Aquest document serà necessari per gestionar situacions com, per exemple, un error en les dades d'origen, on serà imprescindible disposar d'una persona de contacte a qui comunicar l'error i que pugui prendre les mesures corresponents. El document haurà d'incloure una persona responsable per a cada funcionalitat, o bé una persona a qui es pugui notificar aquestes incidències perquè les gestioni.




















































