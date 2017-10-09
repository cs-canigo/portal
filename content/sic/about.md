+++
date        = "2017-06-08"
title       = "Què és el Servei d'Integració Continua (SIC 2.0)"
description = "Conceptes, motivació i funcionalitat del servei"
sections    = "SIC"
taxonomies  = []
weight 		= 1
+++


## Conceptes i motivació
La integració de les diferents peces de programari que componen una aplicació és un repte present en tot projecte de desenvolupament. Sovint apareixen problemes com els següents:

- Proves d'integració ajornades fins moments massa propers al desplegament.
- Alt cost de correcció dels errors.
- Visibilitat baixa de l'estat de construcció dels projectes.
- Manca d'homogeneïtat en les eines utilitzades.

L'existència d'un servei que gestioni el cicle de vida d'aquestes peces i permeti automatitzar certes tasques i donar visió global proporciona molts beneficis, entre els quals podem citar:

- Reducció en els costos de manteniment de les aplicacions.
- Augment de la qualitat i fiabilitat de les aplicacions.
- Donar visibilitat de les activitats, lliurables i estat del desenvolupament dels projectes.
- Disposar d'un conjunt d'eines comunes en la construcció de les aplicacions.
- Establir un repositori comú on ubicar el codi font de les aplicacions.
- Simplificar i reduir el temps de desplegament als diferents entorns.

A més, el concepte d'integració continua permet disposar permanentment d'una versió del codi provinent d'un repositori controlat i amb uns paràmetres de qualitat mesurables.

El Servei d'Integració Continua (SIC) neix amb l'objectiu de donar aquest suport al cicle de vida de manera centralitzada i amb un cost reduït, ja que està basat en tecnologies de programari lliure.

<br/>
## Serveis

### Lliurament del codi
Quan l'equip de desenvolupament té una nova versió del codi font llesta per lliurar, es connecta al SCM de SIC i efectua la pujada de la nova versió. 
La persona de l'equip que efectua aquesta acció és la que té el rol de Release Manager o Gestor de Lliuraments. 

Tot i que qualsevol usuari de l'equip de desenvolupament podría accedir al SCM de SIC, es recomana que l'accés sigui efectuat només per les figures dels Release Manager. Se suposa que l'equip de desenvolupament ja té el seu propi repositori de codi a les seves instal·lacions i que allà és on es fan les proves pertinents fins que es considera el codi llest per lliurar.



### Construcció de l'aplicació

La construcció dels projectes serà efectuada automàticament a l'eina d'Integració Contínua de SIC (Jenkins) en realitzar-se una pujada de codi al SCM de SIC.
Com a resultat de la construcció es generarà un conjunt d'artefactes, bàsicament components estàtics i dinàmics. S'executaran les proves unitàries i s'efectuaran les tasques d'anàlisi de codi si l'aplicació ho requereix.

La construcció del codi pot generar errors, i el procés de lliurar codi / construir serà iteratiu en el cas més general.

### Versionat del codi

La versió de les aplicacions ha de ser sempre incremental, és a dir, qualsevol nova actualització de codi al SCM del SIC ha d'anar acompanyat amb un increment de la versió.

No es permetrà que una aplicació desplegui una versió d'una aplicació igual o inferior a una versió prèviament desplegada. Si no es fes així, es podria induir a confusió en els futurs desplegaments de pre-producció i producció. Per exemple, no se sabria quina versió d'integració està desplegada en l'entorn de pre-producció.

### Execució de proves unitàries

Dins del procés de construcció dels executables (i sempre que l'aplicació ho requereixi) s'executen les proves unitàries.

Com a resultat de l'execució de les proves unitàries s'obtenen 2 tipus d'informes:

* Nombre total de proves i percentatge de proves passades i fallades
* Percentatge de cobertura de les proves respecte del codi font

### Anàlisi del codi

L'anàlisi de codi és un altre dels processos que es passen dins de la tasca de construcció. A partir d'unes regles predefinides, s'analitza el codi per tal d'obtenir mètriques d'adherència a estàndards i bones pràctiques.

### Visualització del nivell de Salut del projecte

A la pantalla principal del portal es pot veure, per cada projecte, unes icones que indiquen el "nivell de salut" del projecte. Aquest nivell de salut es pot definir per cada projecte i es basa en el número de construccions que han anat bé /malament, així com del percentatge de proves i indicadors d'anàlisi.

### Desplegaments automatitzats

El SIC té capacitat per a poder realitzar el desplegament automàtic d'un gran nombre d'aplicacions de diferents tecnologies a diferents entorns. 

Aquests es realticen mitjançant l'eina d'Integració Contínua de SIC: Jenkins. Es configurarà una única tasca per projecte que s'executarà automàticament amb cada pujada de codi al SCM. 
La tasca inclourà accions de construcció d'artefacte, execució de test i desplegaments a entorns no-productius i productius. En aquells entorns on no es pugui desplegar automàticament, el flux d'execució de la tasca s'aturarà esperant una resposta manual d'acceptació.


### Accés per a CPD al SCM

No totes les aplicacions poden construir els seus artefactes a desplegar mitjançant el SIC, ja sigui per estar desenvolupades amb una tecnologia no suportada per SIC o per particularitats del procés de construcció (veure el [Manual Integració](/related/sic/manual-integracio.pdf)). 
En aquests casos, es permet que les aplicacions puguin lliurar els artefactes (.war, .ear, .jar, .zip, etc.) a CPD mitjançant el sistema de gestió de binaris de SIC. Aquest estarà disponible a partir de Juliol 2017, conjuntament amb les instruccions de la seva operativa.

