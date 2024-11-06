+++
date        = "2024-10-24T17:11:42+01:00"
title       = "Testing"
description = "Eines de testing"
sections    = "LowCode"
taxonomies  = []
weight 		= 4
toc			= true
+++

## Automatizació de proves a la plataforma Outsystems

L'ús de proves automàtiques en el desenvolupament de programari és essencial per garantir la qualitat i la fiabilitat de les aplicacions. En el context d'OutSystems, el BDD Test Manager proporciona un enfocament estructurat i eficaç per a la creació i execució de proves automàtiques, facilitant la integració de principis de desenvolupament orientats al comportament (BDD, per les seves sigles en anglès) en el cicle de vida del desenvolupament.

Per dur a terme proves de components de manera efectiva, és crucial gestionar adequadament les dades de prova. Aquestes dades poden residir tant en l'emmagatzematge persistent, com en bases de dades, o en variables en memòria. La complexitat de les proves està directament relacionada amb la quantitat i l'estructura d'aquestes dades. A mesura que el conjunt de proves creix en complexitat i escala, és fonamental tenir un enteniment clar i detallat de les dades de prova disponibles i assegurar-se que el seu manteniment sigui el més senzill possible.

Un enfocament eficaç per a la gestió de dades de prova inclou una vista centralitzada que permeti una presentació visual clara i fàcil de comprendre. Això no només facilita la construcció de relacions de dades més complexes, sinó que també permet editar les dades directament des de la interfície de Service Studio, adaptant-les a diferents escenaris de prova de manera ràpida i senzilla.

En aquesta documentació, s'abordarà com configurar i utilitzar el BDD Test Manager en OutSystems per implementar proves automàtiques, com gestionar de manera eficient les dades de prova i com maximitzar el valor d'aquest enfocament per millorar la qualitat del programari desenvolupat.

### Què és la Test Automation?
<br/>
L'automatització de proves en OutSystems permet executar casos de prova de manera automàtica en aplicacions desenvolupades amb aquesta plataforma. S'utilitzen eines com BDD Framework i Test Framework per crear i gestionar els casos de prova. Facilita la detecció d'errors i assegura la qualitat del programari amb més rapidesa i precisió. És especialment útil per a proves de regressió i validació de funcionalitats repetitives.

És una pràctica que valida automàticament que el programari funcioni com s'espera. Té un cost inicial, però l'hem de considerar com una inversió.

#### Per què automatitzar les proves?

A mesura que la base de codi creix en escala i complexitat, els esforços de prova augmenten exponencialment, especialment per mantenir sota control la regressió. L'automatització aportarà velocitat i reduirà costos a llarg termini.

<br/>

![Cost](/related/lowcode/BDDFramework1.png)

#### Dissenyant una Estratègia d'Automatització de Proves

Passos crucials per implementar una estratègia exitosa:

1. Definir objectius: Establir clarament el propòsit d'introduir l'automatització de proves, com millorar la qualitat del programari, accelerar el temps de lliurament o reduir costos.
2. Col·laboració amb equips: Involucrar els equips de desenvolupament i proves en la planificació i execució de l'estratègia, assegurant que tots estiguin alineats i formats en l'ús de les eines d'automatització.
3. Implementació tècnica: Seleccionar les eines adequades per a l'automatització i dissenyar els scripts de prova. Començar amb proves d'alta prioritat i després expandir a altres àrees a mesura que s'estableixin processos i es guanyi experiència.
4. Monitoratge i ajust: Avaluar regularment l'efectivitat de l'estratègia d'automatització, recollint mètriques i feedback per fer ajustos segons sigui necessari i assegurar millores contínues.

#### Estratègia Tradicional de Testing

Proves per Rols i Fases

- Proves de component: Realitzades per desenvolupadors o líders tècnics (TL) en la fase de desenvolupament (DEV).
- Proves d'integració: Executades pel TL en DEV o QA, especialment si s'utilitzen simulacions (mocks).
- Proves de regressió i acceptació: Realitzades per testers en l'entorn de QA.
- Validació de plans de desplegament: Realitzada en l'entorn de preproducció (PRE) abans de l'execució en producció (PRD).
- Proves de càrrega: Executades en PRE amb el suport del TL.
- Proves de fum: Realitzades pel equip d'operacions (Ops) després del desplegament en PRE o PRD.

![Estratègia Tradicional](/related/lowcode/BDDFramework2.png)

#### Estratègia Continua de Testing

Proves per Rols i Fases

- Proves de component: Realitzades per desenvolupadors o líders tècnics (TL) en la fase de desenvolupament (DEV).
- Proves automatitzades de component i regressió: Executades en la integració contínua (CI).
- Proves de regressió i acceptació: Realitzades tant de manera automatitzada com manual per testers en l'entorn de QA.
- Validació de plans de desplegament: Efectuada en l'entorn de preproducció (PRE) abans de l'execució en producció (PRD).
- Proves de càrrega: Realitzades en PRE amb el suport del TL.
- Proves de fum: Executades pel equip d'operacions (Ops) després del desplegament en PRE o PRD.

![Estratègia Contínua](/related/lowcode/BDDFramework3.png)

#### BDDFramework

BDDFramework és l'eina recomanada per implementar proves de component en OutSystems. Es troba disponible en la infraestructura de desenvolupament i integració. Les principals característiques són:

- Basat en sintaxi Gherkin: BDDFramework utilitza la sintaxi Gherkin, la qual cosa facilita l'escriptura de proves en un format comprensible.
- Documentació viva: Proporciona documentació que és llegible i comprensible per a tots els membres de l'equip, ajudant a mantenir una comunicació clara sobre el codi.
- Proves de Component Inclou 2 plantilles que creen automàticament una pantalla de suite (amb el bloc final) i un webblock de prova esquelet amb blocs de passos base i accions.
- Escenari de prova simple: Permet l'execució de proves bàsiques de funcionalitat.
- Escenari impulsat per dades: Facilita la realització de proves que utilitzen diferents conjunts de dades per validar comportaments variats.

<br/>

![BDD Framework](/related/lowcode/BDDFramework4.png)

<br/>

#### Bones pràctiques per a la creació de components de testing

- Regla #1: El codi de prova ha d'estar separat del codi de negoci.
- Regla #2: El codi de prova només pot fer referència al codi de negoci utilitzat en el context de l'aplicació que està provant.
- Regla #3: El codi de prova pot reflectir com a màxim les dependències existents entre el codi de negoci.
- Regla #4: El codi de negoci no ha de fer referència al codi de prova.

<br/>

![TestApplications](/related/lowcode/BDDFramework5.png)

- **Les pantalles són suites de prova:** Han de contenir múltiples proves en el seu interior.
- **Proves en webblocks aïllats:** Cada prova ha de ser creada en webblocks independents per assegurar el seu aïllament.
- **No utilitzar manejadors d'excepcions:** Quan sigui necessari, no aturar la transacció per evitar interferències en els resultats de les proves.

<br/>

![TestApplications](/related/lowcode/BDDFramework6.png)

<br/>

#### Nomenclatura del codi dels tests

![Nomenclatura](/related/lowcode/BDDFramework7.png)

**Premisses: Validacions només en les Accions de Pantalla (Nivell UI)**
<br/>
**Realitzar validacions d'entrada en l'acció de pantalla i validacions de negoci en l'acció central per mantenir la lògica separada i facilitar les proves.**
<br/>

![Logica](/related/lowcode/BDDFramework8.png)

Lògica de Negoci en Accions de Pantalla: Aïllar la lògica de negoci en una acció pública i utilitzar-la en l'acció de pantalla. D'aquesta manera, la lògica en l'acció pública serà provable sense necessitat de realitzar proves a nivell de UI.

![Logica](/related/lowcode/BDDFramework9.png)

Algorismes/Validacions Complexes amb Dependències de Base de Dades: Obtenir totes les dades necessàries de la base de dades primer i després passar-les com a variables d'entrada a l'acció on es troba l'algorisme. Això simplifica la implementació de proves i millora la velocitat d'execució.

#### CAS D'ÚS DE PROVA:
**Passos del BDD (Given-When-Then):**
1.	**a_Setup:**
Aquest pas inicial és on es configuren les condicions necessàries per a la prova. Es preparen les dades i l'entorn perquè la prova pugui executar-se correctament.
2.	**b_Given:**
Defineix el context o les condicions inicials de la prova. Per exemple, pot establir que un correu electrònic específic està preparat per enviar-se.
3.	**c_When:**
Aquí és on ocorre l'acció que s'està provant. En aquest cas, podria ser l'enviament d'un correu electrònic (MailMessage s'envia).
4.	**d_Then:**
Verifica el resultat esperat. Aquest pas compara els resultats obtinguts amb els resultats esperats, com assegurar-se que el MessageId i el LogId són correctes i que el correu va ser enviat amb èxit.
5.	**e_Teardown:**
L'últim pas, utilitzat per netejar l'entorn de proves o realitzar accions post-prova, com alliberar recursos, desfer configuracions, etc.

![CasUs](/related/lowcode/BDDFramework10.png)

<br/>

**Exemple Pas a Pas per a la prova "Enviar email":**
1.	**Escenari:** L'escenari que estàs provant és l'enviament d'un correu electrònic amb una configuració específica.
2.	**Estructura General del Test:** El test es divideix en les fases de BDD: Given, When, i Then.

**Pas 1: Setup i Teardown de Dades**
- Descripció: Abans d'executar la prova, es realitza la configuració de l'entorn, i al final s'assegura que tots els dades utilitzades en la prova siguin netejades.
- Acció: Verifica que les dades necessàries per a la prova, com la configuració de credencials o l'autenticació, estiguin disponibles i correctes.
- Resultat esperat: La configuració de prova (credencials) està correctament carregada, i després de la prova, tot torna a l'estat original.

<br/>

**Pas 2: Given**
- Descripció: En aquest pas, defines les condicions inicials. En aquest cas, es tracta d'assegurar-te que les credencials estan llestes i la configuració de correu està disponible.
- Acció en l'aplicació:<br/>
-- "Vull enviar un mail amb la configuració auth_tes_low_int i existeix la configuració."<br/>
-- Això significa que estàs verificant si les credencials per enviar correus (auth_tes_low_int) estan correctament configurades i existeixen en el sistema.<br/>
- Resultat esperat: La configuració de credencials (auth_tes_low_int) existeix i està disponible per ser utilitzada.

<br/>

**Pas 3: When***
- Descripció: Aquest és el pas on ocorre l'acció que estàs provant. Aquí, proves l'enviament d'un correu electrònic utilitzant les credencials carregades en el pas anterior.
- Acció en l'aplicació:<br/>
-- "Fem servir la configuració Name per enviar un mail amb adjunt." <br/>
-- Aquí estàs simulant l'enviament d'un correu usant la configuració carregada anteriorment (auth_tes_low_int), i verificant si pots enviar un correu amb adjunt correctament.<br/>
- Resultat esperat: El sistema utilitza la configuració de credencials i el correu és enviat amb èxit.

<br/>

**Pas 4: Then**
- Descripció: Aquí verifiques els resultats. Si l'enviament del correu va ser exitos, llavors tot funciona correctament.
- Acció en l'aplicació:<br/>
-- "L'email ha estat enviat."<br/>
-- Estàs verificant que el correu electrònic va ser enviat utilitzant les credencials correctes.<br/>
- Resultat esperat: La prova ha de confirmar que el correu va ser enviat amb èxit, el que indica que les credencials eren vàlides.

<br/>

**Pas 5: Teardown**
- Descripció: Al final de la prova, es neteja qualsevol dada que va ser creada o modificada durant la prova.
- Acció: Es restableix l'estat del sistema i s'elimina qualsevol dada de prova.
- Resultat esperat: El sistema torna al seu estat inicial sense dades residuals de la prova.

<br/>

**Flux Complet de la Prova**
1.	Setup: Preparares la configuració del test i verifiques que les credencials necessàries estan disponibles.
2.	Given: Verifiques que la configuració de credencials (auth_tes_low_int) existeix.
3.	When: Intentes enviar un correu utilitzant aquesta configuració amb un adjunt.
4.	Then: Confirmes que el correu ha estat enviat amb èxit.
5.	Teardown: Netejes les dades utilitzades en la prova i restauras l'estat del sistema.

Aquest flux assegura que les credencials per enviar correus siguin correctes i que el sistema de correu electrònic funcioni com s'espera.

<br/>

[Exercicis de proves](/related/lowcode/API_Testing-Exercises.pdf)

## BDDFramework Test Manager Tool

El **BDDFramework Test Manager Tool** és una eina dissenyada per permetre als equips executar automàticament una col·lecció de tests amb gran flexibilitat.<br/><br/>
Els tests s' han de realitzar utilitzant el component OutSystems BDDFramework.<br/><br/>
Per iniciar sessió a l'eina es requereix un usuari d'OutSystems Users, ja que no admet autenticació externa.<br/>

### Quina és la teva tàctica d'automatització de tests?

<br/>

- Executar només sota demanda<br/>
-- Es recomana la instal·lació en el teu entorn de DESENVOLUPAMENT (DEV).<br/>
- Executar sota demanda i tenir execucions nocturnes<br/>
-- Es recomana la instal·lació en el teu entorn de DESENVOLUPAMENT (DEV) o en l'entorn d'INTEGRACIO (INT)), sent aquest últim preferible per a execucions nocturnes ja que té mòduls més estables.<br/>
- Executar sota demanda i execucions de CI a través de crides externes
-- Es recomana la instal·lació en el teu entorn de DESENVOLUPAMENT (DEV).<br/>
- Només execucions de CI a través de trucades externes<br/>
-- Es recomana la instal·lació en el teu entorn de DESENVOLUPAMENT (DEV).<br/>

Per executar-les a través de DESENVOLUPAMENT assegura't que els noms dels mòduls i pantalles de tests suites coincideixin amb els de l'entorn objectiu que és cridat per l'orquestrador extern.
La configuració d'entorns en l'eina és crucial perquè els orquestradors externs puguin trucar a l'API del BDD Framework Test Manager Tool i perquè puguis decidir el context de l'entorn per executar els tests sota demanda.

### Agrupació de Tests Suites 
<br/>
L'eina organitza les Tests suites en la següent jerarquia:

- Project: Correspon a l'aplicació de negoci o l'àmbit del domini de l'equip de l'aplicació que s'està provant.
- Test Job: És el conjunt de tests de característiques que s'executaran. Es pot configurar com la teva col·lecció de tests de regressió o acceptació, o fins i tot com una col·lecció relacionada amb desplegaments de tests a executar.
- Feature: Es refereix a les característiques específiques de la teva aplicació, les quals tenen diverses Tests suites per avaluar-les.

IMPORTANT: Els mòduls de prova han d'estar actualitzats per executar la versió més recent de les tests.

### Capacitats de l'Eina 
<br/>
L'eina té les capacitats següents:

- Dashboards amb informació com:<br/>
-- Resum de l' estat d' execució dels tests project, tendències de tests fallides versus aprovades.<br/>
-- Resum de l' últim estat d' execució dels tests jobs, tendències i proporcions d' èxit enfront de fallades.<br/>
-- Resum del darrer estat d' execució de les features, tendències d' execució de tests i historial de registres de cada execució.<br/>
- Executar tests sota demanda en els entorns configurats, podent córrer els tests per:<br/>
-- Tests jobs, executant totes les Tests suites de feautres.<br/>
-- Features, executant totes les Tests suites relacionades.<br/>
- Executar tests mitjançant programació, configurant cada treball de tests perquè s'executi automàticament tots els dies mitjançant un procés asíncron (temporitzador).<br/>
-- Per defecte, el temporitzador està programat per executar-se a les 00:15 hora del servidor.<br/>
- Enviar correus electrònics amb els resultats de les execucions programades després de cada execució.<br/>
- Proporcionar una API per donar suport a l'execució de tests mitjançant un orquestrador extern (per exemple, Jenkins, Azure DevOps, etc.) que també genera resultats de tests en format JUnit i NUnit.<br/>
-- Aquesta API utilitza autenticació amb token de portador, que pot activar-se o desactivar-se mitjançant una site.<br/>
-- L'API es troba al mòdul "TestManagement_CS".<br/>
-- API: **https:///TestManagement_CS/rest/v1/TriggerTestRun?JobKey={JobKey}&version={version}&ReportType={ReportType}&Env={Env};**<br/>
ReportType: "junit" o "nunit"<br/>
-- L'API permet executar tests de diferents entorns (relacionats amb els entorns configurats en l'eina). Si l'eina està instal·lada en un entorn diferent al que es configura en l'anomenada API anterior, assegura't que els noms dels mòduls i pantalles dels tests suites, en aquests entorns coincideixin amb els de l'entorn on està instal·lada l'eina.<br/>

L'eina permet:<br/>
- Gestionar entorns amb tests.
- Crear, actualizar o eliminar Tests projects.
- Monitorar els resultats d' execució dels Tests Projects.
- Crear, actualitzar o eliminar Test Jobs dins dels Tests Projects.
- Treballs de proves versionals.
- Monitorar els resultats i tendències de les execucions dels Test Jobs.
- Crear, actualitzar o eliminar Tests Features dins dels Test Jobs.
- Supervisar els resultats i tendències de les execucions de les Tests Features i alternar el context de l'entorn per visualitzar mètriques i executar tests en aquest entorn específic.
- Configurar ajustaments de correu electrònic per reportar resultats d'execucions programades.
- Configuracions generals relacionades amb els dies per mantenir historial o el sufix per localitzar els mòduls de test.
- Cobertura de codi de les aplicacions.
- Percepció de qualitat de les Features de l'aplicació basada en els resultats dels tests.

### Afegir nous tests
<br/>
Per agregar una nova prova, hi ha una forma ràpida de fer-ho. A la pàgina tests projects, fes clic al botó Agregar nova prova <br/>
<br/>

![AfegirCas](/related/lowcode/BDDFramework11.jpg)

<br/>

Després de fer clic, serà redirigit a un assistent per guiar-lo a través del procés d'afegir un nou test amb la possibilitat de crear un nou project, col·lecció de treballs i característica amb la qual s'associarà el conjunt de tests.

![NouCas](/related/lowcode/BDDFramework12.jpg)

<br/>
L'organització dels tests es pot realitzar mitjançant l'agregació de tests en 3 nivells: <br/>
<br/>

- Equips de Projects/Domain: Aquest és l'abast de treball d'una aplicació comercial o part d'ella que un equip és responsable. Aquí és on s'han d'associar primer tots els tests suites relacionats.

![Projecte](/related/lowcode/BDDFramework13.jpg)

<br/>

- Job Collections: Aquí és on pots configurar col·leccions de tsets per a tests de regressió, o per a un flux específic de l'aplicació o per a sprints en curs.

![Col·leccions](/related/lowcode/BDDFramework14.jpg)

<br/>

- Features: Aquí has de mapejar les característiques de la teva aplicació per comprendre els resultats dels tests en relació amb aquestes Features específiques. 

<br/>

### Execució de tests
<br/>
L'eina ens dóna la possibilitat d'executar els tests de 3 formes:<br/>
<br/>

- Sota demanda: Aquesta opció és un disparador manual dels tests en l'eina i hi ha 2 formes de fer-ho. La primera és a nivell d'una col·lecció de treballs, que són un grup de diversos tests de característiques que es poden activar. 

![Demanda](/related/lowcode/BDDFramework15.jpg)

<br/>

Després, també hi ha una opció per executar els tests a nivell de Features, cosa que fa que sigui una execució més granular per veure els resultats dels tests d'una Feature específica: <br/>
<br/>

![Feature](/related/lowcode/BDDFramework16.jpg)

<br/>

- Programades: Les execucions programades es defineixen en el nivell de recopilació de treballs. S'executen a través d'un temporitzador que es troba al mòdul TestManagement_CS, que té un horari predeterminat a les 0:15 hores del servidor, tots els dies. Aquesta programació es pot ajustar en el centre de servei i dins de l'eina permet configurar els entorns on s'executaran els tests:

![Programat](/related/lowcode/BDDFramework17.jpg)

<br/>

- API: Les execucions desencadenades per l'API també es troben en el nivell de job collections. Quan les job collections es creen automàticament, es genera una clau API i amb aquesta clau es poden realitzar les sol·licituds a través d'una eina externa:

![API](/related/lowcode/BDDFramework18.jpg)

<br/>

### Configuracions
<br/>
L'eina té una pantalla de configuracions a la qual es pot accedir a través del menú, però només per als usuaris amb el rol "Administrador". Aquí pots fer el següent: <br/>
<br/>

- Administrar entorns
 
<br/>

![Entorns](/related/lowcode/BDDFramework19.jpg)

<br/>

- Definir l'historial, la durada dels resultats i el sufix dels mòduls de prova perquè l'eina pugui trobar els tests: <br/>
<br/>

![Config](/related/lowcode/BDDFramework20.jpg)

<br/>

- Configurar els correus electrònics per rebre els resultats dels tests de les execucions programades: <br/>
<br/>

### Qualitat
<br/>
L'eina proporciona una característica que d'una manera fàcil pot visualitzar la qualitat de les Features amb tests basats en els darrers resultats d'execució i també mostra la cobertura d'execució d'aquests tests: <br/>
<br/>

![Qualitat](/related/lowcode/BDDFramework21.jpg)

### Cobertura d'aplicacions
<br/>

Aquesta funcionalitat li permet veure la cobertura de codi en les seves aplicacions. Pot classificar els falsos positius per ajustar la cobertura: <br/>
<br/>

![Cobertura](/related/lowcode/BDDFramework22.jpg)

<br/>

Dins d'aquesta funcionalitat també existeix la possibilitat de comprovar les accions a la seva fàbrica que no estan sent cobertes pels tests i que poden representar riscos per al seu sistema, ja que tenen un alt impacte en el negoci a causa del fet que estan sent consumits per diversos mòduls. <br/>
<br/>

![Cobertura](/related/lowcode/BDDFramework23.jpg)

<br/>

La següent pantalla mostra les accions i els seus impactes comercials en funció dels mòduls de consum. Això pot ser útil per prendre decisions sobre la posada de tests automatics en algunes accions que tenen un alt impacte. <br/>
<br/>

![Impacte](/related/lowcode/BDDFramework24.jpg)

<br/>

### Control d'accés
<br/>

Aquí és on els administradors poden definir el control d'accés dels projects configurats en l'eina, de manera que cada equip pugui veure només els resultats dels seus propis tests: <br/>
<br/>

![Control](/related/lowcode/BDDFramework25.jpg)

<br/>

### Arxiu
<br/>

En aquesta pantalla l'Administrador (només l'usuari amb aquest rol hi té accés) té la possibilitat de veure els Projects/Colections de Treballs/Característiques inactius, i per a cadascun d'aquests elements pot tornar a activar-los, els que no puguin estar actius de nou, no seran visibles: <br/>
<br/>

![Arxiu](/related/lowcode/BDDFramework26.jpg)

<br/>

### Com fer-ho
<br/>

Aquí, els desenvolupadors i avaluadors poden veure alguns temes amb orientació sobre com realitzar una tasca en particular: <br/>
<br/>

![HowTo](/related/lowcode/BDDFramework27.jpg)

<br/>

### Context de l'entorn
<br/>

El context de l'entorn dóna la possibilitat d'executar els tests en altres entorns. Això només funcionarà per a execucions sota demanda i activades per API. Per a això és necessari agregar els entorns addicionals, sent el local de l'entorn on està instal·lada l'eina. Perquè els tests s'executin en aquests entorns, el marc BDD i les aplicacions de test s'han d'implementar en aquests entorns. La següent imatge mostra com pot canviar el context de l'entorn: <br/>
<br/>

![Context](/related/lowcode/BDDFramework28.jpg)





