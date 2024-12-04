
+++
date         = "2024-04-19"
title        = "Gestió d'usuaris i llicències"
description  = "Guia per a la gestió d'usuaris i llicències"
weight      = "6"
sections    = ["GHEC"]
aliases = [
    "/drafts/ghec/gh-gestio-usuaris-llicencies",
    "/ghec/gh-gestio-usuaris-llicencies"
]
+++

## **Alta d'usuaris en grups depenent del Rol** 

El procés automàtic de creació del model crea automàticament un conjunt de grups d'Azure Entra ID que s'utilitzaran per assignar rols a usuaris.

Els grups que es creen depenen del departament, entitat i lot de manteniment de l'aplicació (exceptuant els transversals).
Si el team ja existeix prèviament, no es tornarà a crear :

+ sec-read: Equip transversal de Seguretat (ACC).
+ qa-read: Equip transversal de Qualitat (CTTI).
+ srv-read: Equip transversal de Servei (CTTI).
+ arq-read: Equip transversal d'Arquitectura (CTTI).
+ </departament/>-</entitat/>-</lot_manteniment/>-maintain: Leaders tècnics del lot de manteniment.
+ </departament/>-</entitat/>-</lot_manteniment/>-write: Desenvolupadors del lot de manteniment.
+ </departament/>-</entitat/>-read: Per a Gestors de Solucions / Entrega de l'àmbit.

Una vegada creats els grups, cal que l'owner o owners identificats (responsables d'arquitectura i identitat en el cas dels lots d'aplicacions) donin d'alta com a membres als diferents usuaris en els grups pertinents depenent del rol que han de realitzar (Maintain o Write).

Només cal actualitzar els grups de Maintain i Write, donat que la resta seran informats automàticament pel procés automàtic.
        
Per executar aquesta tasca, l'owner disposarà de l'aplicació **myaccount** de Microsoft on haurà de: 

  1. Accedir a MyGroups per a l'organització de la Generalitat de Catalunya.
    [https://myaccount.microsoft.com/groups](https://myaccount.microsoft.com/groups)
    
      Les credencials d'accés són les de Generalitat de Catalunya, introduint l'usuari @gencat.cat.
  
      ![Grups credencials ](/images/GHEC/gh-mygroups-credenciales.png)
    
  2. Un cop ha iniciat sessió, l'owner disposarà d'una opció de menú per veure tots els grups dels quals té el rol d'Owner i que podrà gestionar afegint o eliminant usuaris des de l'opció "Groups I Own".

      ![Grups](/images/GHEC/gh-mygroups.png)

  3. Seleccionant el grup que vulgui modificar, tindrà la possibilitat d'afegir/eliminar usuaris. Per a això existeixen dues opcions de menú "Members" i "Owner" on, clicant en el botó "Add" podrà buscar els usuaris i afegir-los amb diferents permisos "Members" i "Owners" :

      ![Grups](/images/GHEC/gh-mygroups-add.png)

      + Permisos d'Owner : El nou usuari podrà ser Owner del grup i li permetrà poder afegir a altres usuaris.
      + Permisos de Member : El nou usuari serà Member del grup.  NO podrà afegir altres usuaris.
      + Permisos d'Owner i Member : El nou usuari serà Membre i Owner del grup.
    
        ![Grups](/images/GHEC/gh-mygroups-addinguser.png)

      **Els usuaris a afegir són els pertanyents al domini @gencat.cat**

  4. Una vegada sincronitzat Azure Entra ID amb GHEC, els usuaris inserits/eliminats es veuran reflectits en GHEC en els Teams vinculats als grups d'Entra ID i automàticament se li assignaran permiSsos depenent del Team.

  Per a més informació, es pot consultar [Jerarquia i nomenclatura de Teams i nomenclatura de Repositoris ](../gh-model-govern) amb informació addicional de la creació de teams.

  Addicionalment, en el següent Link, es podran consultar els permisos de cada rol [Roles y permisos de Repositoris ](../gh-rols-repositori).


## **Desactivació d'usuaris a GitHub Enterprise Cloud (GHEC)**

A GHEC, si un usuari no realitza cap acció durant un periode de temps, queda en estat "dormant" però segueix consumint una llicència. És per aquest motiu que periòdicament s'executarà un procés que a nivell d'Azure Entra ID desactivarà l'usuari (no la pertinença als grups) per tal d'alliberar aquestes llicències d'usuaris inactius.

Informació relacionada amb la gestió d'usuaris inactius a GHEC:

* [Comptes que consumeixen llicències a GHEC](https://docs.github.com/en/enterprise-cloud@latest/billing/managing-the-plan-for-your-github-account/about-per-user-pricing#accounts-that-consume-a-license-on-github-enterprise-cloud)

* [Gestió d'usuaris inactius](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/managing-dormant-users)

Per la reactivació d'un usuari, caldrà que l'usuari obri un tiquet de suport a l'equip del SIC+ pels canals oficials.


## Baixa d'usuaris a GitHub Enterprise Cloud (GHEC)

Els owners han de treure dels diferents grups els usuaris que ja no pertanyin a l'equip o que hagin deixat de treballar a l'organització. En el cas dels lots d'aplicacions poden filtrar els grups per **amXX_23** i treure l'usuari de tots els grups resultants de la cerca.