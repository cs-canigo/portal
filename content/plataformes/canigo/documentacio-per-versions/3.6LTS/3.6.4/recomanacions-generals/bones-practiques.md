+++
date        = "2022-04-13"
title       = "Bones pràctiques"
description = "Bones pràctiques Canigó 3.6.4"
sections    = "canigo-fwk-docs"
weight      = 1
+++

## Bones pràctiques Canigó 3.6.4

### Resum i context

En el cicle de vida d’un projecte J2EE empresarial cal que tot l’equip estigui prou informat i tingui coneixement complet de quines són les bones pràctiques a seguir així com saber gestionar-les. Per tal efecte ha d’existir una consciència comuna que el compliment de les normes i la gestió de la qualitat han de ser una pràctica contínua.

### Objectiu

Recollir les millors pràctiques que apliquen al desenvolupament i desplegament d’aplicacions J2EE a la Generalitat de Catalunya.
Mitigar els riscos associats a un mal desenvolupament i l'ús de males pràctiques als projectes desenvolupats per o a la Generalitat de Catalunya en la tecnologia J2EE. 

### Àmbit i vigència

Aquestes bones pràctiques van dirigides a:

• Desenvolupadors, amb l’objectiu que coneguin com han de realitzar-se els desenvolupaments de les aplicacions segons les bones pràctiques del Centre de Telecomunicacions i Tecnologies de la Informació.

### Estàndards J2EE

Els desenvolupaments a la Generalitat es basen en les millors pràctiques acceptades per la comunitat i els diferents patrons de desenvolupament que milloren el manteniment i la traçabilitat del
desenvolupament.
La referència a les millors pràctiques en el desenvolupament d’aplicacions Java empresarials es pot trobar en el següent enllaç: 

• http://docs.oracle.com/javaee

• https://www.oracle.com/java/technologies/javase/codeconventions-programmingpractices.html

### Bones pràctiques

Un resum de les bones pràctiques a seguir al desenvolupar aplicacions J2EE es poden trobar a: 

• https://www.ibm.com/developerworks/websphere/techjournal/0701_botzum/0701_botzum.html

### Patrons de disseny J2EE

Es necessari seguir els patrons de disseny J2EE y Java a l'hora de desenvolupar aplicacions J2EE, podeu trobar diferents patrons de disseny a: 

• https://www.oracle.com/technetwork/java/javaee/downloads/patterns-138526.html

• https://www.journaldev.com/1827/java-design-patterns-example-tutorial

• https://refactoring.guru/design-patterns/java

### Patrons de disseny OO

Java és un llenguatge orientat a objecte (OO), per tant, és necessari seguir les recomenacions de disseny orientat a objecte:

• https://en.wikipedia.org/wiki/Object-oriented_design

• https://en.wikipedia.org/wiki/Class-responsibility-collaboration_card

• https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)

• https://en.wikipedia.org/wiki/SOLID

• https://en.wikipedia.org/wiki/IDEF4

### Bones pràctiques d’Accés a la Base de Dades

1. No construir sentències SQL mitjançant concatenació de variables

No es permet executar sentències SQL que han estat construïdes mitjançant la concatenació de variables. Aquestes crides s’han de fer mitjançant l’ús de PreparedStatements o bé altres solucions proporcionades pel servei de persistència del Framework Canigó. Al executar aquest tipus de sentències es poden produir atacs d’injecció de codi a la Base de dades (SQLInjection) i provocaria un greu problema de seguretat per a les aplicacions.

2. Independitzar el màxim possible les sentències d’accés a bbdd de la tecnologia subjacent

El llenguatge d'accés preferent per l'accés a bbdd ha de ser JPQL (JPA), HQL (Hibernate, però podria ser una altre ORM) i SQL per aquest ordre. Quan més independent de la tecnologia base utilitzada siguin els accessos, més fàcil serà en un futur poder canviar aquestes tecnologies. Per exemple canviar d'Oracle a MySQL o d'Hibernate a Toplink Essentials