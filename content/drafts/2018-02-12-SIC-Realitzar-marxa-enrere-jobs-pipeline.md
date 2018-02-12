+++
date        = "2018-02-12"
title       = "SIC. Gestionar marxes enrere amb jobs pipeline"
description = "En aquest article mostrem com redesplegar una versió anterior de l'aplicació al SIC després d'un desplegament fallit."
sections    = ["drafts"]
categories  = ["sic"]
key         = "FEBRER2018"
draft =true
+++

Amb la posada en marxa del SIC 2.0, el procés d'execució de jobs i de gestió de la marxa enrere ha canviat substancialment. A continuació us en fem un resum de les novetats més importants que aporta el SIC 2.0:

* **Els jobs són de tipus pipeline**: Ja no es creen més jobs de tipus BLD, LIB, INT, PRE ni PRO. Amb el SIC 2.0 existeix un sol job s'encarrega de construir i desplegar a tots els entorns (si s'escau).
* **No s'ha de crear cap tag**: Si es disposa de jobs pipeline per a l'aplicació, amb el SIC 2.0, és la pròpia pipeline la que crea els tags en els repositoris de l'aplicació.
* **Canvia la gestió de permisos**: Tal i com us ja hem comentat en altres articles, la gestió dels permisos és automàtica per a CPD i LDT i en format d'autoservei per a proveïdors d'aplicació.
* **Integració amb GICAR**: Tot usuari del SIC, cal que tingui un usuari vàlid GICAR amb el camp del mail informat.

## Implicacions d'aquests canvis en la gestió de la marxa enrere

Actualment, els jobs del SIC no realitzen cap marxa enrere de forma automàtica (a excepció dels desplegaments en servidors d'aplicacions). Per tant, la gestió de la marxa enrere correspon a l'usuari desplegant una versió anterior.

Amb els antics jobs freestyle del SIC 1.0, es podia executar el job de l'entorn corresponent sel·leccionant el tag desitjat i es desplegava la versió de marxa enrere desitjada.

Amb el SIC 2.0, cal fer un push al repositori d'una versió o d'un tag anteriors. A continuació, s'explica com fer-ho.

## Realitzar un push d'una versió o d'un tag anterior

A mode d'exemple, partirem de la següent seqüència de versions d'un projecte qualsevol:

<div style="width:90%;margin:5px auto;"><img style="width: 90%; height: auto" src="/images/news/commitGIT1.png" alt="Versions al GIT" title="Versions al GIT"></img></div>

Volem fer marxa enrere, fins la versió A, generant una nova versió que anomenarem A':

<div style="width:90%;margin:5px auto;"><img style="width: 90%; height: auto" src="/images/news/commitGIT2.png" alt="Versions al GIT" title="Versions al GIT"></img></div>

Proposem tres estratègies per aconseguir-ho:

### Fent "git revert" versió a versió

Partint de l'última versió creada, el primer mètode és anar fent "git revert" cap endarrere, versió per versió, fins la que es desitja reinstaurar.

`A ← B ← C ← D`

El que farem serà executar les següents comandes:

```
$ git revert --no-commit D
$ git revert --no-commit C
$ git revert --no-commit B
$ git commit -m "el missatge del commit"
```

### Fent "git revert" optimitzat

La segona forma és semblant a l'anterior, però indicant en el "git revert" el nombre de versions que es vol anar cap endarere.

Assumint que es tracta de la branca master, en el nostre cas són 3 versions, per tant la comanda a executar és:

```
git revert master~3..master --no-commit
$ git commit -m "el missatge del commit"
```

### Fent "checkout" directe

Una altra forma de realitzar aquesta marxa enrere és fer directament un checkout de la versió a reinstaurar.

Per a fer marxa enrere a la versió A, executaríem les següents comandes:

```
$ git checkout -f A -- .
$ git commit -m "el missatge del commit"
```

### Aspectes a tenir en compte

En el cas d'haver de realitzar alguna de les estratègies anteriors, es recomana:

* Assegurar-se que no hi hagi modificacions en curs (la comanda `git status` no ha de retornar cap arxiu staged).
* Caldrà modificar el nom del tag. Una vegada generat el tag amb èxit, al SIC no es permet reutiltizar-lo en altres commits.