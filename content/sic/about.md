+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Què és el Servei d'Integració Continua (SIC)"
description = "Conceptes, motivació i funcionalitat del servei"
sections    = "SIC"
taxonomies  = []
weight 		= 1
+++

## Conceptes i motivació

La integració de les diferents peces de programari que componen una aplicació és un repte present en tot projecte de desenvolupament. Sovint apareixen problemes com els següents:

- Proves d'integració ajornades fins moments massa propers al desplegament
- Alt cost de correcció dels errors
- Visibilitat baixa de l'estat de construcció dels projectes
- Manca d'homogeneïtat en les eines utilitzades

L'existència d'un servei que gestioni el cicle de vida d'aquestes peces i permeti automatitzar certes tasques i donar visió global proporciona molts beneficis, entre els quals podem citar:

- Reducció en els costos de manteniment de les aplicacions
- Augment de la qualitat i fiabilitat de les aplicacions
- Donar visibilitat de les activitats, lliurables i estat del desenvolupament dels projectes
- Disposar d'un conjunt d'eines comunes en la construcció de les aplicacions
- Establir un repositori comú on ubicar el codi font de les aplicacions
- Simplificar i reduïr el temps de desplegament als diferents entorns

A més, el concepte d'integració continua permet disposar permanentment d'una versió del codi provinent d'un repositori controlat i amb uns paràmetres de qualitat mesurables.

El Servei d'Integració Continua (SIC) neix amb l'objectiu de donar aquest suport al cicle de vida de manera centralitzada i amb un cost reduït, ja que està basat en tecnologies de programari lliure.

<p>&nbsp;</p>

## Funcionalitat del Servei

### Lliurament del codi

Quan l'equip de desenvolupament té una nova versió llesta per lliurar es connecta al repositori del SIC (veure detalls al Manual d'Usuari) i efectua el commit de la nova versió. Aquest commit estarà marcat amb un tag de versió que haurà de coincidir amb la versió de l'aplicació.

La persona del l'equip de desenvolupament que efectua aquesta acció és la que té el rol de Release Manager o Gestor de Lliuraments. No és la idea del Servei que tots els membres de l'equip de desenvolupament estiguin utilitzant contínuament el repositori del SIC. Se suposa que l'equip de desenvolupament ja té el seu propi repositori de codi a les seves instal·lacions i que allà és on es fan les proves pertinents fins que es considera el codi llest per lliurar.

### Construcció de l'aplicació

El Gestor de Lliuraments es connecta al portal del SIC i inicia la construcció del projecte corresponent. Com a resultat de la construcció es generarà un conjunt d'artefactes, bàsicament components estàtics i dinàmics. S'executaran les proves unitàries i s'efectuaran les tasques d'anàlisi de codi. El resultat de tot això es podrà veure a la pantalla de resultats, des d'on podrà ser consultable permanentment.

La construcció del codi pot donar errors, i el procés de lliurar codi / construir serà iteratiu en el cas més general.

### Versionat del codi

El el codi emmagatzemat en el repositori de codi ha d'estar marcat amb un tag de versió. La versió de les aplicacions ha de sempre incremental, és a dir, qualsevol nou actualització de códi en el subversion del SIC ha d'anar acompanyat amb un increment de la versió.

No es permetrà que una aplicació desplegui una versió d'una aplicació igual o inferior a una versió prèviament desplegada. Si no es fes així, es podria induir a confusió en els futurs desplegaments de pre-producció i producció. Per exemple, no se sabria quina versió d'integració està desplegada en l'entorn de pre-producció.

### Execució de proves unitàries

Dins del procés de construcció dels executables s'executen les proves unitàries, que es troben definides tal com es pot veure al Normatiu J2EE.

Com a resultat de l'execució de les proves unitàries s'obtenen 2 tipus d'informes:

* Número total de proves i percentatge de proves passades i fallades
* Percentatge de cobertura de les proves respecte del codi font

### Anàlisi del codi

L'anàlisi de codi és un altre dels processos que es passen dins de la tasca de construcció. A partir d'unes regles predefinides, s'analitza el codi per tal d'obtenir mètriques d'adherència a estàndards i bones pràctiques.

En el SIC utilitzem tres eines de codi obert que s'integren amb el motor Maven de construcció, anomenades Checkstyle, PMD i Findbugs. Tot i que aquestes eines ja donen un conjunt de regles predefinides a partir dels estàndards Java i els Blueprints de Sun, en el SIC utilitzem unes regles que extenen i adapten les anteriors per tal d'ajustar-se al Llibre Normatiu del Servei J2EE Central.

### Visualització d'informes i gràfics

Es poden visualitzar els informes i gràfics tant d'execució i cobertura de proves unitàries com d'anàlisi de codi, per cadascuna de les tasques de construcció que s'hagin iniciat històricament.

Així mateix, a la pantalla principal del portal es pot veure, per cada projecte, unes icones que indiquen el "nivell de salut" del projecte. Aquest nivell de salut es pot definir per cada projecte i es basa en el número de construccions que han anat bé /malament, així com del percentatge de proves i indicadors d'anàlisi.

### Desplegament automatitzat a l'entorn d'Integració

Un cop es té al SIC un codi versionat es pot passar a desplegar-lo a l'entorn d'Integració de Serveis Centrals.

El SIC utilitza les APIs del servidor d'aplicacions per tal d'efectuar el desplegament. L'usuari pot veure immediatament el resultat del desplegament a la consola de la tasca.

El procediment per desplegar passa per una pantalla on es tria la versió del codi a desplegar. Si el desplegament de la darrera versió va malament, es pot desplegar la versió anterior.

Els desplegaments suportats són els que consten d'una part dinàmica (WAR, EAR) i opcionalment d'una part estàtica (ZIP). També es poden executar per cada desplegament scripts de bbdd (SQL, PL/SQL). En cas de que el desplegament requereixi altres accions en el entorn caldrà sol- licitar-les mitjançant una petició al SAU.

### Desplegaments a PRE i PRO

El SIC no automatitza els desplegaments a PRE i PRO, però sí que automatitza la generació dels artefactes (part estàtica i dinàmica de l'aplicació), el seu enviament als entorns mitjançant SFTP, i l'enviament del correu al SAU per la petició de desplegament.

En aquests entorns tant sols es pot desplegar una aplicació que previament ja s'hagi deplegat a l'entorn d'integració satisfactoriament.

### Accés per a CPD

No totes les aplicacions poden construïr els seus artefactes a desplegar mitjançant el SIC, ja sigui per que no són aplicacions Java o bé perquè no utilitzen Maven com a motor de construcció. Per a més detall dels requeriments per la integració amb el SIC per part de les aplicacions veure el [Manual Integració](/related/sic/manual-integracio.pdf). En aquests casos es permet que les aplicacions puguin lliurar els artefactes (.war, .ear, .jar, .zip, etc.) al repositori de codi del SIC, i que els administradors de CPD hi puguin accedir per a fer el desplegament de forma manual.

El procediment per sol- licitar l'accés per a CPD al SIC es troba descrit en la següent [pàgina](/sic-related/acces-cpd).