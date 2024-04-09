
+++
date         = "2024-04-09"
title        = "Rols de repositori per a una organització"
description  = "Rols de repositori per a una organització"
weight      = "7"
sections    = ["GHEC"]
+++


<img src="https://identitatcorporativa.gencat.cat/web/.content/Documentacio/descarregues/dpt/COLOR/Presidencia/ctti_h2.jpg">

# Rols de repositori per a una organització

Github documentació --> [Funcions del repositori per a una organització](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)

## ROLS SOBRE REPOSITORIS

- **READ**: Recomanat per als qui no contribueixen amb el codi i desitgen veure o discutir el seu projecte.
- **TRIAGE**: Recomanat per a col·laboradors que necessiten gestionar proactivament problemes, discussions i pull requests sense accés d'escriptura.
- **WRITE**: Recomanat per a col·laboradors que aporten activament al teu projecte.
- **MAINTAIN**: Recomanat per a gestors de projectes que necessiten gestionar el repositori sense accés a accions sensibles o destructives.
- **ADMIN**: Recomanat per a persones que necessiten accés complet al projecte, incloent accions sensibles i destructives com gestionar la seguretat o esborrar un repositori.

---

### EL ROL DE READ

En principi no ens serviria perquè no pot crear branques feature per desenvolupar, encara que si pugui fer pull request, però no aprovar-les:

- No pot crear noves branques ni pot fer commits.
- Pot crear pull requests però no acceptar-les ni mergear-les.

---

### EL ROL DE TRIAGE

En principi no ens serviria perquè no pot crear branques feature per desenvolupar, encara que si pugui fer pull request, però no aprovar-les:

- No pot crear noves branques ni pot fer commits.
- Pot crear pull requests però no acceptar-les ni mergear-les.

Però si podrà...

- Aplicar/desestimar etiquetes.
- Tancar, reobrir i assignar totes les incidències i pull requests.
- Aplicar fites.
- Marcar incidències i pull requests duplicades.
- Sol·licitar revisions de pull requests.
- Ocultar els comentaris de qualsevol persona.
- Moure un debat a una altra categoria.
- Bloquejar i desbloquejar discussions.
- Conversió individual d' incidències en discussions.
- Eliminar un debat.

---

### EL ROL DE WRITER

És el rol que, seguint la premissa de "least privilege", es podrà assignar als desenvolupadors els qui podran:

- Crear branques per a les "features".
- Crear i acceptar pull requests però només en branques no protegides.
- Per evitar el control gairebé absolut sobre el repositori, sense incloure l'apartat de gestió, es crearan les branques pertinents del model GitFlow triat en mode "protected", amb la qual cosa es pot configurar el següent:

![Branques protegides](/images/GHEC/protected-branches.png)

---

### EL ROL DE MAINTAIN

- Pot a més gestionar alguna configuració del repositori, a excepció de la configuració destructiva.

---

### EL ROL D'ADMIN

- Tens accés complet als "settings", i a:

![Admin Settings](/images/GHEC/admin-danger-zone-settings.png)
