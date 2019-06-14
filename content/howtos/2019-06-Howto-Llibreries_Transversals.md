+++
date        = "2019-06-14"
title       = "Howto Procediments de manteniment llibreries transversals"
description = "Definició del procediment per mantenir les llibreries transversals en mode col·laboratiu"
section = "howtos"
categories = ["llibreria", "transversal", "procediment"]
key = "JUNY2019"
+++

# Howto Procediments de manteniment llibreries transversals

L'objectiu d'aquest article és mirar d'explicar els procediments a seguir per al manteniment de les llibreries transversals en mode col·laboratiu, des d'un punt de vista de gestió dels repositoris de codi.

El públic a qui va dirigit aquest document és principalment tècnic i de gestió, enfocant els procediments a donar resposta a casos concrets.


## Introducció

Les llibreries transversals són un conjunt de funcionalitats agrupades (normalment) en un únic artefacte (llibreria), i que a més a més són utilitzades a dos o més codis de diàleg.
Un exemple seria la llibreria XXX, que proporciona funcionalitats als codis de diàleg AAA, BBB.

Aquest tipus d'artefactes presenten una problemàtica inherent a la seva transversalitat, com per exemple les següents:
* Quin equip/proveïdor ha de fer el manteniment i suport?
* Què passa amb les personalitzacions pròpies d'un equip? S'han d'integrar o mantenir per separat?
* Quan hi ha canvi de proveïdors, cóm s'ha d'actuar?

## Procediments de manteniment

Els diferents procediments treballen amb els següents actors:

* Equip de manteniment del SIC (EMSIC) - Equip amb permisos generals per operar al GitLab.
* Equip de manteniment de llibreria transversal (EMLT) - Equip encarregat del manteniment d'una llibreria transversal.
* Col·laborador de llibreria transversal (CLT) - Equip que consumeix i que alhora pot col·laborar en desenvolupaments d'una llibreria transversal.

Els diferents procediments de manteniment treballen a més a més amb un conjunt de supòsits que s'han de tenir presents en tot moment, i de manera ordenada són els següents:

1. L'equip de manteniment del SIC (EMSIC) tindrà permisos generals en tot moment del codi i les operacions tècniques (clone, commit, push, merge, revert, fork, pull-request, CI/CD, etc.). En aquest cas, serà el responsable de fer els forks, donat que té els permisos necessaris: per una banda de lectura al codi de dialeg orígen, i d'escriptura al codi de diàleg destí.
1. L'equip de manteniment de llibreria transversal (EMLT) serà el responsable del manteniment de la llibreria transversal, i de garantir el seu bon funcionament. També serà responsable d'integrar els merge-requests.


### Cas 1. Nova col·laboració a la llibreria transversal

En el cas que es vulgui fer una col·laboració a la llibreria transversal s'ha de fer un fork del projecte per després integrar els canvis mitjançant un *merge-request*. Concretament:

1. Fase de creació (*fork*)
    1. El CLT ha de demanar i notificar la col·laboració al CTTI, EMLT i EMSIC.
    1. Un cop aprovada la col·laboració el EMSIC ha de crear la branca *develop*, en el cas que no existeixi, que servirà per fer les integracions dels canvis (veure **Nota 1**].
    1. El EMSIC ha de fer un *fork* de la branca *develop* del projecte mantingut pel EMLT cap al grup/subgrup indicat per CLT.
2. Fase de d'integració (*merge request*)
    1. Un cop el CLT ha finalitzat els canvis, ha de crear un *merge request* per integrar els seus canvis al projecte original (mantingut per EMLT).
    1. El EMLT haurà de planficar la revisió i possible integració del *merge request*.
    1. Un cop integrat el *merge request* el EMLT informarà d'aquest fet al CTTI i CLT.
    1. El CLT haurà d'eliminar el *fork* en el cas que no hagi previst cap més desenvolupament. En cas necessari es podrà demanar un nou *fork* tornant al punt 1 de la fase de creació.

### Cas 2. Canvi del codi de diàleg de la llibreria transversal

En el cas que s'hagi de fer un canvi del codi de diàleg de la llibreria transversal, s'ha de tractar com si fós una *transferència de projecte* (en terminlogia GitLab). Concretament:

1. Un cop el CTTI hagi notificat als diferents departaments implicats, haurà de notificar i coordinar-ho amb el/s EMLT/s i el EMSIC.
1. El EMSIC haurà d'executar la *transferència de projecte* (*transfer project*), i notificar-ho al CTTI i al/s EMLT/s.
1. El/s EMLT/s haurà "d'actualitzar-se" amb el nou codi de diàleg.

S'especifica un o diversos EMLT/s perquè el canvi de codi de diàleg pot comportar un canvi de EMLT.

### Cas 3. Canvi de EMLT

En el cas que s'hagi de fer un canvi del EMLT, s'ha de tractar com si fós un canvi en els permisos del projecte. Concretament:

1. Un cop el CTTI hagi notificat als diferents departaments implicats, haurà de notificar i coordinar-ho amb el/s EMLT actual i futur, i el EMSIC.
1. El EMSIC haurà d'efecutar el canvi de permisos, i notificar-ho al CTTI i al/s EMLT/s.

## Informació addicional

Enllaços d'interès:
* https://github.community/t5/Support-Protips/The-difference-between-forking-and-cloning-a-repository/ba-p/1372
* https://github.community/t5/Support-Protips/What-the-fork/bc-p/1625
* https://git.intranet.gencat.cat/help/public_access/public_access
* https://docs.gitlab.com/ee/user/project/merge_requests/

### Nota 1. Significat i funcionament de les branques MASTER i DEVELOP

**TODO**