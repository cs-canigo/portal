
+++
date         = "2024-04-09"
title        = "Model de Govern"
description  = "Model de Govern"
weight      = "5"
sections    = ["GHEC"]
+++

<img src="https://identitatcorporativa.gencat.cat/web/.content/Documentacio/descarregues/dpt/COLOR/Presidencia/ctti_h2.jpg">

# Model de Govern 

## Objectiu  🚀

El present document descriurà el resultat de l' anàlisi i definició realitzat per modelar Git Hub Enterprise Cloud en base al model de Govern de la Generalitat de Catalunya. 

## Al detall  📋

El model de GitHub Enterprise Cloud ofereix diferents entitats amb les quals es pot modelar l'organització en base al model de govern de GenCat:

* Enterprise Account.
* Organitzacions.
* Repositoris.
* Teams.

realitzant-se anàlisi de les següents distribucions:

* 1 Enterprise Account per a cada Departament
* 1 EA per a 1 Organització 1: 1 
* 1 EA per a N Organitzacions 1: N

Després d'analitzar els diferents models, amb les seves fortaleses, debilitats i similituds amb el model de Govern de GenCat, en les diferents sessions de treball realitzades amb CTTI on s'ha revisat el model de govern de la Generalitat de Catalunya, es proposa el següent: 

* 1 Enterprise Account global que representarà Generalitat Catalunya.
* 3 Organitzacions per als diferents tipus de repositoris, públics o d' administració, de laboratori i de desenvolupament.
* N Repositoris on s'albergarà els desenvolupaments, documentació, entregables, etc.
* Model de Teams per cada organització per gestionar rols i visibilitat dels diferents repositoris en base al model de la Generalitat.

![Logo de Markdown](/images/GHEC/modelo_Gobierno.png)

### Avantatges del model

* Github aconsella el menor nombre d'organitzacions ja que la gestió de múltiples organitzacions és més difícil de gestionar, per exemple, eliminar organitzacions és molt més difícil, i sovint requereix migracions i una reducció de la flexibilitat a la qual els equips s'han acostumat. 
* Sempre és més fàcil afegir organitzacions que eliminar-les, per la qual cosa recomanem començar amb un nombre reduït d'organitzacions, la qual cosa li donarà més flexibilitat en el futur.
* Facilitat per a la recerca de recursos.
Mantenim una configuració única per organització pel que configuracions, webhooks, permisos, equips etc, no s'han de duplicar en les diferents organitzacions.
* En tenir un nombre d'organitzacions es facilita alta col·laboració entre equips, la qual cosa genera un entorn de treball col·laboratiu i productiu evitant limitacions. Per exemple, el model @menciones està acotat a organitzacions. 
* Alta flexibilitat amb el model de Teams, ja que a més dels Teams jeràrquics que es crearan, es podran realitzar Teams AD-HOC per gestionar repositoris per un altre tipus d'organització funcional/negoci, per exemple: Teams per a Qualitat.
    + Teams per a Seguretat.
    + Teams per a Lots de Manteniment per Entitat, per exemple, AM22_23_CTT.
    + ......

* Alta flexibilitat a l'hora de migrar entitats/lots a altres departaments generant un impacte mínim en els repositoris/usuaris.

* Més avantatges: [enllaç a Github.](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-organizations-in-your-enterprise/best-practices-for-structuring-organizations-in-your-enterprise)


### Desavantatges 
Com a punt menys favorable d'aquest model, s'haurà d'implementar una automatització addicional programàtica amb el propòsit d'obtenir tota la informació de facturació i repercutir-la als diferents Departaments / Entitats o Codis de Diàleg.

## Nomenclatura de Teams

Atès que cal mantenir una jerarquia de rols i visibilitat per departaments, entitats, lots de manteniment, es proposa la següent nomenclatura per als Teams i repositoris que facilitarà la traçabilitat: 

* Nomenclatura Teams: **<CDGO_DPTO>-<CDGO_ENT>-<LOTE_MANT>-<_ROL_>** on:
    + <CDGO_DPTO>: Codi de departament.
    + <CDGO_ENT>: Codi d' entitat.
    + <LOTE_MANT>: Lot de Manteniment.
    + <_ROL_>: Role de Github.


![Exemple Team ](/images/GHEC/gh_Ejemplo_nomenclatura_team.png)

* Nomenclatura Repo: **<CDGO_DIALOGO>.<_COMP_>-<ACRONIMO_APP>-<COMPONENTE_TECNICO>-<TIPO_COMP>** on:
    + <CDGO_DIALOGO>: Codi de Diàleg de les aplicacions.
    + <_COMP_>: Component dins del codi de Diàleg.  En cas que l'aplicació tingui un únic component, s'indiqués "00".
    + <ACRONIMO_APP>: Acrònim del codi de diàleg.
    + <COMPONENTE_TECNICO>: Nom del repositori.
    + <TIPO_COMP>: Tipus component: frontend, backend, api, etc.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_nomenclatura_repo.png)


Addicionalment, es tindrà en compte les següents pautes: 
* Els noms dels Teams de crearan en minúscules.
* "-" per separar els diferents camps del Team.
* "_" per separar camps que tinguin noms complexos.

Aquesta nomenclatura ha estat confirmada amb l'equip de qualitat / Azure AD en sessions de treball realitzades amb ells.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_modelo_negocio.png)


El següent exemple mostra el model de negoci amb la nomenclatura definida a un grup de departaments/entitats/lots de manteniment/repos de GenCat.

![Exemple Nomenclatura Repo](/images/GHEC/gh_Ejemplo_modelo_negocio_ctti.png)


