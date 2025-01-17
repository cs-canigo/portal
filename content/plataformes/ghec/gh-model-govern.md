
+++
date         = "2024-04-09"
title        = "Model organitzatiu"
description  = "Descripció del model organitzatiu definit per GHEC"
sections    = ["GHEC"]
weight      = "2"
toc         = true
aliases = [
    "/drafts/ghec/gh-model-govern",
    "/ghec/gh-model-govern"
]
+++

## Objectiu  🚀

El present document descriu el model organitzatiu definit per GitHub Enterprise Cloud (GHEC). 

## Model definit  📋

GHEC ofereix diferents entitats amb les quals es poden organitzar els recursos dins la enterprise: **organitzacions**, **repositoris** i **teams**

El model dissenyat és el següent:

* Enterprise account **gencat**
* Organitzacions per als diferents entorns i àmbits de treball: 
    * **ctti-dev**: organització més important on resideixen els repositoris de desenvolupament de les aplicacions.
    * **ctti-lab**: organització on resideixen els repositoris de laboratori. Equivalent a un entorn preproductiu d'ús intern de l'equip que gestiona la plataforma GHEC i equips col·laboradors en la implementació d'automatitzacions.
    * **ctti-arq**: organització on es poden trobar repositoris interns de l'equip d'arquitectura CTTI, Suport Cloud i CPD, així com plantilles compartides amb els lots de manteniment d'aplicacions per al seu ús en mode col·laboratiu (InnerSource).
    * **ctti-actions**: per a les actions de Github utilitzades pels [workflows reutilitzables](https://docs.github.com/en/actions/using-workflows/reusing-workflows) que es posen a disposició de les aplicacions. D'ús intern per l'equip que gestiona la plataforma GHEC i equips col·laboradors en la implementació d'automatitzacions.
* Model de **teams** dins cada organització per gestionar rols i visibilitat dels diferents repositoris en base al model organitzatiu de la Generalitat.

![Logo de Markdown](/images/GHEC/modelo_Gobierno.png)

### Avantatges del model

* GitHub aconsella el menor nombre d'organitzacions ja que la gestió de múltiples organitzacions és més difícil de gestionar. Per exemple, eliminar organitzacions és molt més difícil, i sovint requereix migracions i una reducció de la flexibilitat a la qual els equips s'han acostumat. 
* Sempre és més fàcil afegir organitzacions que eliminar-les, per la qual cosa recomanem començar amb un nombre reduït d'organitzacions, la qual cosa li donarà més flexibilitat en el futur.
* Facilitat per a la recerca de recursos.
Mantenim una configuració única per organització pel que configuracions, webhooks, permisos, equips etc, no s'han de replicar en les diferents organitzacions.
* En tenir un nombre d'organitzacions reduït es facilita alta col·laboració entre equips, la qual cosa genera un entorn de treball col·laboratiu i productiu evitant limitacions. Per exemple, el model @mencions està acotat a organitzacions. 
* Alta flexibilitat amb el model de Teams, ja que a més dels Teams jeràrquics que es crearan, es podran realitzar Teams AD-HOC per gestionar repositoris per un altre tipus d'organització funcional/negoci, per exemple:
    + Teams per a Qualitat.
    + Teams per a Seguretat.
    + Teams per a Lots de Manteniment per Entitat, per exemple, AM22_23_CTT.
    + ......

* Alta flexibilitat a l'hora de migrar entitats/lots a altres departaments generant un impacte mínim en els repositoris/usuaris.

* Més avantatges: [enllaç a Github.](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-organizations-in-your-enterprise/best-practices-for-structuring-organizations-in-your-enterprise)


### Desavantatges 

Com a punt menys favorable d'aquest model, no es pot aprofitar la informació que s'ofereix a nivell d'organització per mapejar-la directament a un àmbit, pel que cal implementar mecanismes ad-hoc per extreure aquesta informació.

## Nomenclatura de Teams

Atès que cal mantenir una jerarquia de rols i visibilitat per departaments, entitats, lots de manteniment, es defineix la següent nomenclatura pels Teams i repositoris, la qual facilitarà la traçabilitat: 

* Nomenclatura Teams: **<CDGO_DPTO>-<CDGO_ENT>-<LOTE_MANT>-<_ROL_>** on:
    + <CDGO_DPTO>: Codi de departament.
    + <CDGO_ENT>: Codi d'entitat.
    + <LOTE_MANT>: Lot de manteniment.
    + <_ROL_>: Role de GitHub.


![Exemple Team ](/images/GHEC/gh_Ejemplo_nomenclatura_team.png)

* Nomenclatura Repo: **<CDGO_DIALOGO>.<_COMP_>-<ACRONIMO_APP>-<COMPONENTE_TECNICO>-<TIPO_COMP>** on:
    + <CDGO_DIALOGO>: Codi de Diàleg de l'aplicació definit a l'Inventari d'aplicacions de CTTI.
    + <_COMP_>: Component dins del codi de Diàleg definit a l'Inventari d'aplicacions de CTTI.  En cas que l'aplicació tingui un únic component, s'indica "00".
    + <ACRONIMO_APP>: Acrònim de l'aplicació definit a l'Inventari d'aplicacions de CTTI.
    + <COMPONENTE_TECNICO>: Nom del component tècnic.
    + <TIPO_COMP>: Tipus component: frontend, backend, api, etc.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_nomenclatura_repo.png)


Addicionalment, es tindrà en compte les següents pautes: 
* Els noms dels Teams es crearan en minúscules.
* "-" per separar els diferents camps del Team.
* "_" per separar camps que tinguin noms complexos.

Aquesta nomenclatura ha estat confirmada amb l'equip de qualitat / identitat.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_modelo_negocio.png)


El següent exemple mostra el model definit per a un grup de departaments/entitats/lots de manteniment/aplicacions/components.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_modelo_negocio_ctti.png)


## Rols

A continuació es descriuen els diferents rols d'accés que GitHub Enterprise Cloud (GHEC) permet a nivell d'organització:

- **READ**: Recomanat per als qui no contribueixen aL codi i desitgen veure o interactuar dins l'àmbit d'un projecte.
- **TRIAGE**: Recomanat per a col·laboradors que necessiten gestionar proactivament problemes, discussions i pull requests sense accés d'escriptura.
- **WRITE**: Recomanat per a col·laboradors que aporten activament al projecte.
- **MAINTAIN**: Recomanat per a gestors de projectes que necessiten gestionar el repositori sense accés a accions sensibles o destructives.
- **ADMIN**: Recomanat per a persones que necessiten accés complet al projecte, incloent accions sensibles i destructives com gestionar la seguretat o esborrar un repositori.


### Rol de READ --> UTILITZAT PER TEAMS TRANSVERSALS

No pot crear branques feature per desenvolupar, encara que sí pugui fer pull requests, però no aprovar-les:

- No pot crear noves branques ni pot fer commits.
- Pot crear pull requests però no acceptar-les ni mergear-les.


### Rol de TRIAGE

No pot crear branques feature per desenvolupar, encara que sí pugui fer pull requests, però no aprovar-les:

- No pot crear noves branques ni pot fer commits.
- Pot crear pull requests però no acceptar-les ni mergear-les.

Però si podrà...

- Aplicar/desestimar etiquetes.
- Tancar, reobrir i assignar totes issues i pull requests.
- Aplicar fites.
- Marcar issues i pull requests duplicades.
- Sol·licitar revisions de pull requests.
- Ocultar els comentaris de qualsevol persona.
- Moure un debat a una altra categoria.
- Bloquejar i desbloquejar discussions.
- Conversió individual d'issues en discussions.
- Eliminar un debat.


### Rol de WRITER --> UTILITZAT PER TEAMS DE DEVELOPERS

És el rol que, seguint la premissa de "least privilege", es podrà assignar als desenvolupadors els quals podran:

- Crear branques per a les "features".
- Crear i acceptar pull requests però només en branques no protegides.
- Per evitar el control gairebé absolut sobre el repositori, sense incloure l'apartat de gestió, es crearan les branques pertinents del model Gitflow triat en mode "protected", amb la qual cosa es pot configurar el següent:

![Branques protegides](/images/GHEC/protected-branches.png)



### Rol de MAINTAIN --> UTILITZAT PER TEAMS DE TECH LEADS

- A més dels permissos del rol writer, pot gestionar alguna configuració del repositori excepte les de naturalessa destructiva.



### Rol d'ADMIN --> UTILITZAT PER L'EQUIP QUE ADMINISTRA LA PLATAFORMA

- Disposa d'accés complet als "settings", i a:

![Admin Settings](/images/GHEC/admin-danger-zone-settings.png)




Més informació : 
 [Gestió d'accés dels usuaris als repositoris d'una organització](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)