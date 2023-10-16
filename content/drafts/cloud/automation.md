+++
date        = "2019-02-25"
title       = "Automatització: CI/CD, IaC"
description = "Model d'automatització del cicle de vida d'aplicacions i infraestructura \"DevOps\""
sections    = "Cloud"
categories  = ["cloud","docker","container","paas","openshift","kubernetes","aws","azure", "devops"]
aliases     = ["/cloud/devops-cloud/"]
weight = 3
+++

![Devops](/related/cloud/devops.png)

Quan parlem de Devops ens referim a la cultura que vol eliminar les barreres entre desenvolupadors i operacions, centrant-se en el lliurament ràpid de solucions TIC a través de l'adopció de pràctiques àgils i gestió Lean orientades a sistemes d'informació.

La implantació de DevOps en el CTTI es recolza sobretot en les eines d'automatització i gestió del codi actualment existents, i que progressivament es van dotant de més funcionalitats per disposar d'una infraestructura cada vegada més programable i dinàmica des d'una perspectiva de cicle de vida de les solucions. 

Aquestes eines d'automatització cobreixen en dues grans disciplines:

- El desenvolupament i desplegament, per tal de permetre dotar de la màxima velocitat des de que es concep una idea fins que aquesta es troba en producció, minimitzant la intervenció manual però mantenint alhora les garanties de qualitat requerides. En el cas de cloud públic, el desplegament inclou tant la part de infraestructura (IaC, infraestructura com a codi) com la de codi.

- El monitoratge i diagnòstic, per tal de donar visibilitat als responsables de les aplicacions de tots aquells indicadors que permetin avançar-se a qualsevol problema que afecti l'aplicació i a poder-ne diagnosticar les causes.

És d'**obligatori compliment** tant la construcció dels scripts d'**infraestructura com a codi** (no es desplegarà res a cloud públic que no sigui automatitzat) així com utilitzar les ***pipelines* de construcció i desplegament**, tant de la infra com de l'aplicació.


## Objectius del model DEVOPS

- El responsable i primer contacte de l'aplicació és el Lot d'Aplicacions.
- Maximitzar l'autoservei d'infraestructures.
- Maximitzar l'autonomia del lot d'aplicacions.
- Maximitzar la visibilitat de l'entorn al lot d'aplicacions.
- Maximitzar l'automatització de tasques.
- Minimitzar el temps necessari per a posar una solució en servei.
- Minimitzar la intervenció humana en el tiqueting.
- Eliminar la compartició de recursos entre aplicacions.

Podeu veure les tasques que són responsabilitat de l'equip de desenvolupament a [Tasques OPS del desenvolupament al Cloud.](../cloud-ops)