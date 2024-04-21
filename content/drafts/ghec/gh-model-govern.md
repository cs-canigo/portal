
+++
date         = "2024-04-09"
title        = "Model de Govern"
description  = "Model de Govern"
weight      = "5"
sections    = ["GHEC"]
+++

## Objectiu  🚀

El present document descriu el resultat de l'anàlisi i definició del model organitzatiu per GitHub Enterprise Cloud (GHEC). 

## Model definit  📋

GHEC ofereix diferents entitats amb les quals es poden organitzar els recursos dins la enterprise:

* Organitzacions.
* Repositoris.
* Teams.

El model dissenyat és el següent:

* 1 Enterprise Account global.
* 3 Organitzacions per als diferents tipus de repositoris
    * ctti-dev: organització més important on resideixen els repositoris de desenvolupament de les aplicacions.
    * ctti-lab: organització on resideixen els repositoris de laboratori. Equivalent a un entorn preproductiu d'ús intern de l'equip que gestiona la plataforma GHEC.
    * ctti-arq: organització on es poden trobar repositoris interns de l'equip d'arquitectura CTTI, Suport Cloud i CPD, així com plantilles compartides amb els lots de manteniment d'aplicacions per al seu ús en mode col·laboratiu (InnerSource).
    * ctti-actions: per a les actions de Github utilitzades pels [workflows reutilitzables](https://docs.github.com/en/actions/using-workflows/reusing-workflows) que es posen a disposició de les aplicacions. D'ús intern per l'equip que gestiona la plataforma GHEC.
* Model de Teams per cada organització per gestionar rols i visibilitat dels diferents repositoris en base al model organitzatiu de la Generalitat.

![Logo de Markdown](/images/GHEC/modelo_Gobierno.png)

### Avantatges del model

* GitHub aconsella el menor nombre d'organitzacions ja que la gestió de múltiples organitzacions és més difícil de gestionar. Per exemple, eliminar organitzacions és molt més difícil, i sovint requereix migracions i una reducció de la flexibilitat a la qual els equips s'han acostumat. 
* Sempre és més fàcil afegir organitzacions que eliminar-les, per la qual cosa recomanem començar amb un nombre reduït d'organitzacions, la qual cosa li donarà més flexibilitat en el futur.
* Facilitat per a la recerca de recursos.
Mantenim una configuració única per organització pel que configuracions, webhooks, permisos, equips etc, no s'han de replicar en les diferents organitzacions.
* En tenir un nombre d'organitzacions reduït es facilita alta col·laboració entre equips, la qual cosa genera un entorn de treball col·laboratiu i productiu evitant limitacions. Per exemple, el model @mencions està acotat a organitzacions. 
* Alta flexibilitat amb el model de Teams, ja que a més dels Teams jeràrquics que es crearan, es podran realitzar Teams AD-HOC per gestionar repositoris per un altre tipus d'organització funcional/negoci, per exemple: Teams per a Qualitat.
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


