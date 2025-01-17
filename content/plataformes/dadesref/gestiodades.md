+++
date        = "2024-09-10"
title       = "Gestió Tècnica de Dades"
description = "Gestió Tècnica de Dades"
sections    = ["Data Architecture"]
categories  = ["Data Architecture"]
weight= 1
aliases = [
    "/dadesref/gestiodades"
]
+++

### Gestió Tècnica de Dades

En els darrers anys la tendència empresarial, ja sigui en l’àmbit públic o privat, s’està orientant cap a satisfer la necessitat d’una correcta gestió de les dades. Aquest fet inclou millorar la qualitat i la seguretat de les mateixes, entendre el seu significat i emprar-les com un actiu clau que permeti generar avantatges competitius en l’àmbit empresarial. Les organitzacions, doncs, depenem cada cop més de les dades per prendre decisions més efectives. 

En l’àmbit públic es fa palesa la necessitat de disposar de dades d’alta qualitat que permetin potenciar serveis proactius i facilitar la presa de decisions en les seves activitats operacionals, tàctiques i estratègiques proporcionant un millor servei a la ciutadania.

L’ecosistema de les dades és molt ampli. La **Gestió Tècnica de les Dades** cerca establir un model per a la gestió tècnica i control de totes elles. Establim tres grans grups de dades:

1.	**Dada Mestra:** representen objectes de forma acordada que serveixen de referència transversal per a tota o part de la Generalitat. Poden ser:

   - **Dada Mestra Corporativa:** representen aquells atributs comuns i implementats arreu de la Generalitat de la mateixa manera, garantint la interoperabilitat, el tractament homogeni i la identificació unívoca (exemple: ciutadà, empresa).
   - **Dada Mestra Departamental:** proporcionen atributs particulars que estenen la dada mestra corporativa per especificitat dins d’un àmbit o departament concret (exemple: atribut de la targeta sanitària d’un ciutadà).
    
2.	**[Dades de Referència](/plataformes/dadesref/dadesref/)**: orientades a propòsits de classificació (codificacions i estàndards) o de suport a la gestió. Són dades bàsiques amb valors sobre dominis, termes estandarditzats, codificacions, identificadors únics de conceptes i, en general, qualsevol element orientat a la classificació consistent i exacta de les dades i la informació (per exemple, estat de tramitació, codis de comunitats, codis de països, etc.).

3.	**Dades de negoci:** les vinculades directament a qualsevol de les diferents activitats que realitza la Generalitat (per exemple, prestacions sanitàries).

### Quins són els objectius que es persegueixen amb la Gestió Tècnica de les Dades ?

La gestió tècnica de dades ha de permetre a la Generalitat de Catalunya:

- Disposar d’una **visió única**, consistent, transversal i confiable de les unitats bàsiques d’informació.
- Generar **proactivament** dades **d’alta qualitat** que garanteixin tant l’operativa diària com la capacitat d’anàlisi de la informació.
- Facilitar la **presa de decisions** sobre la base d’una informació consistent, completa i actualitzada, independentment de la seva tipologia o origen.
- Generar **nova informació de valor** a partir de l’encreuament de les dades disponibles a l’organització, tot garantint el seguiment dels requisits legals que la normativa vigent estableixi.
- Posar a disposició de la Generalitat de Catalunya el catàleg de dades que permeti publicar al seu torn la informació a consumir en els diferents àmbits de negoci.

### Quins són les línies de treball iniciades en la Gestió Tècnica de les Dades ?

Des de l’Àrea d’Arquitectura Corporativa s’ha plantejat un projecte iteratiu amb diferents línies de treball:

![Taula Dades de referencia](/images/dadesref/ImgDadesReferencia.PNG)


#### Les següents actuacions planificades són:

- Incrementar el nombre d’entitats de referència del catàleg.
- Millorar la presentació de les entitats. A causa dels canvis que poden tenir les entitats al llarg del temps, tant en l’àmbit estructural com en el contingut, està previst crear i gestionar diferents versions vàlides sobre una mateixa entitat.
- Definir procediments de gestió que permetin tenir constància de quines aplicacions fan ús de les entitats i amb quin perfil (propietari o de consum) així com poder gestionar peticions de noves entitats de referència o canvis sobre les entitats ja existents. Qualsevol canvi haurà de passar per un control de qualitat i validació per part del propietari.
- Facilitar un procediment que permeti a les aplicacions definir una conversió de valors sobre una entitat per tal d’adaptar els valors al seu propi sistema.
- Comunicar a les aplicacions que fan ús d’una entitat qualsevol canvi que es faci sobre aquesta entitat per tal que, si és necessari, actualitzin la conversió de valors i les dades del seu propi sistema.
