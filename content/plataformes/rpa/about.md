+++
date        = "2022-03-25T17:11:42+01:00"
title       = "Què és la Plataforma Corporativa de RPA"
description = "Plataforma, funcionalitats i ús del servei"
sections    = "RPA"
toc 		= false
taxonomies  = []
weight 		= 1
+++

La **Plataforma Corporativa de RPA** proporciona als àmbits de la Generalitat de Catalunya la infraestructura i el suport funcional i tècnic pel desenvolupament i implantació de processos robotitzats.

## Plataforma

La plataforma es basa en el producte UiPath, sent els components desplegats:

- **UiPath Studio** pel disseny i implementació dels processos
- **UiPath Robot** per l'execució dels processos definits
- **UiPath Orchestrator** pel desplegament, planificació i monitorització de robots i processos

![Components UiPath](/related/rpa/uipath.png)

La versió de UiPath desplegada a la plataforma corporativa és la **2023.10.7**

## Entorns de la plataforma

La plataforma disposa de dos entorns:

- L'entorn de **Preproducció**, és l'entorn que es posa a disposició dels àmbits per realitzar el desenvolupament i les proves dels processos robotitzats. Durant aquesta fase, es dóna accés a l'eina **Studio** per la implementació del procés, i s'assigna un **Robot no productiu** per poder realitzar les proves
- L'entorn de **Producció**, és l'entorn on l'Oficina Tècnica desplegarà els processos implementats, un cop validades totes les fases prévies d'implementació i proves

La infraestructura de la Plataforma Corporativa de RPA és multiclient (multitenant). Cada àmbit disposa d'un entorn virtual per garantir l'aïllament en la definició de processos entre els diferents òrgans.

## Ús del Servei

El desplegament de processos robotitzats dins la plataforma es defineix al procediment de gestió de la demanda, el qual identifica les diferents fases en el qual s'estructura, així com les interactuacions previstes amb l'Oficina Tècnica i la documentació mínima que serà requerida per aquesta:

![Gestio Demanda](/related/rpa/demanda.png)

La interacció amb l'Oficina Tècnica es realitzarà a través de PAUTIC. Més informació a [Centres de Suport](/cs)
