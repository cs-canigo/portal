+++
date        = "2020-06-16"
title       = "Convencions"
description = "Convencions Canigó 3.4.3"
sections    = "canigo-fwk-docs"
weight      = 1
+++

## Convencions Canigó 3.4.3

### Resum i context

En el cicle de vida d’un projecte J2EE empresarial cal que tot l’equip estigui prou informat i tingui coneixement complet de quines són les convencions a seguir així com saber gestionar-les. Per tal efecte ha d’existir una consciència comuna que el compliment de les normes i la gestió de la qualitat han de ser una pràctica contínua.

### Objectiu

Recollir les convencions que apliquen al desenvolupament i desplegament d’aplicacions J2EE a la Generalitat de Catalunya.
Les convencions són universals i tenen com a objectiu garantir que el codi és de fàcil llegir i de fàcil mantenir.


### Àmbit i vigència

Aquestes convencions van dirigides a:

• Desenvolupadors, amb l’objectiu que coneguin com han de realitzar-se els desenvolupaments de les aplicacions segons les convencions del Centre de Telecomunicacions i Tecnologies de la Informació.

### Convencions J2EE

Les convencions de J2EE o Java que s'han de seguir les podeu trobar a:

• https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html

• https://www.oracle.com/technetwork/java/codeconventions-150003.pdf

Google ha generat una convenció de guia d'estils de programació amb Java que també s'hauria de tenir en compte:

• https://google.github.io/styleguide/javaguide.html


### Convencions Canigó

#### Convencions de les Classes

En cas de que l'aplicació sigui d'ús corporatiu, el nom dels packages ha de seguir la notació:

```
cat.gencat.<ambit>.<nomaplicacio>.nomsubpackage...
```

o

```
cat.gencat.<nomaplicacio>.nomsubpackage...
```

A continuació de 'nomaplicacio' es poden aniuar nous subpackages per estructurar les classes segons la seva responsabilitat, funcionalitat, etc.
Exemples:

```
cat.gencat.ctti.facturacio.model
cat.gencat.ptop.pipex.control
```
