
+++
date         = "2024-04-09"
title        = "Rols"
description  = "Rols d'accés per a una organització"
weight      = "7"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-rols-repositori",
    "/ghec/gh-rols-repositori",
    "/plataformes/ghec/gh-rols-repositori"
]
+++

## Objectiu 🚀

L'objectiu de la següent documentació és descriure els diferents rols d'accés que GitHub Enterprise Cloud (GHEC) permet a nivell d'organització.

## Rols 📋

Aquests són els diferents rols disponibles:

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


## Wiki 📖

Més informació : 
 [Gestió d'accés dels usuaris als repositoris d'una organització](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
