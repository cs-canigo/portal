+++
date = "2023-03-23"
title = "Com preparar una aplicació per desplegar-la automàticament"
description = "Guia amb la informació més rellevant a tenir en compte per la integració al SIC del desplegament d'una aplicació"
sections = "SIC"
toc = true
aliases = [
    "/sic30-guies/preparar-aplicacio/",
    "/sic-welcome-pack/preparar-aplicacio/",
    "/sic-guies/preparar-aplicacio/"
]
taxonomies = []
weight = 2
+++

## Introducció

En el cas que l’aplicació utilitzi el servei de custòdia de codi i la seva tecnologia permeti la construcció i desplegament automatitzat d’artefactes,
s’hauran d’acomplir una sèrie de **requeriments per a que es pugui dur a terme la construcció de les corresponents pipelines de desplegament**.

Es tracta d’una guia ràpida per a informar dels aspectes més rellevants a tenir en compte quan una aplicació es vol integrar amb el SIC.

## Lliurament de codi font

Cal que es pugi el codi font de l’aplicació al sistema de gestió de codi font (SCM - Source Code Management) del SIC:

* Els projectes han de crear-se dins el **codi de diàleg** adient, de forma que tota la gestió posterior de jobs
i creació de peticions Remedy s'associïn a l'aplicació corresponent. Per aquest mateix motiu, **no està contemplat la creació
de subgrups de projectes**, tot i que l'eina ho permeti.

* Aquest repositori **no és un entorn de desenvolupament**, per la qual cosa només les persones assignades com a Release
Managers seran les encarregades de consolidar el codi i
lliurar-lo. Aquest codi font ja haurà d'estar validat en entorns de desenvolupament i es lliurarà quan es decideixi
distribuir als entorns dels serveis TIC centrals.

* Els repositoris poden tenir tantes branques com siguin necessàries, però sempre s’haurà d’incloure la **branca MASTER**
i el contingut d’aquesta branca serà amb el que
treballaran les pipelines de construcció i desplegament per defecte. No obstant això, el sistema permetrà opcionalment
desplegar el codi font associat a la **branca EVOLUTIUS**.

* Les **pipelines seran les encarregades de generar els TAGS** corresponents: tag de Build, tag de Release i tag per entorn.

A continuació es detallen les restriccions aplicades a l'hora de fer el lliurament de codi:

* **No es poden incloure binaris** de llibreries ni d’altres mòduls ni executables (JAR, WAR, EAR, DLL, EXE...) i la
mida màxima dels arxius serà de 25MB. A tal efecte,
s’ha habilitat un sistema de gestió de [Binaris](bin.sic.intranet.gencat.cat).

* No es permet l'ús de versions **snapshot**, per lo que s'impedirà la pujada del fitxer `pom.xml` si aquest les referencia.

* No es permet incloure fitxers de configuració de les eines de construcció: `settings.xml` (Maven), `.npmrc` (Npm) o
`nuget.config` (.NET Framework). Aquestes configuracions seran injectades per SIC amb tota la configuració necessària.

## Estructura de projectes
L'estructura de projectes i el seu contingut ha de ser compatible amb el sistema establert d'Integració Contínua:

* Dins del grup del codi de diàleg, es tindran **tant projectes com a conjunts de codi font susceptibles de ser versionats** de forma independent a la resta de projectes.
Pot tractar-se d’una llibreria, un microservei, un mòdul, un conjunt d'scripts o un programa sense fragments independents.

* Cal proporcionar **procesos de construcció** d'artefactes independents de les màquines i plataformes on s'executen, de forma que siguin aplicables tant en els entorns de
desenvolupament com en els entorns del SIC.

<div class="message information">
El SIC actualment utilitza la <a href="https://www.docker.com/">tecnologia Docker</a> per a disposar d'un entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors.
Addicionalment, es contempla l'ús d'entorns propis de construcció proporcionats pels proveïdors (DockerFile) que opcionalment podran estendre del catàleg d'imatges corporatiu.<br/>
Veure: <a href="https://canigo.ctti.gencat.cat/plataformes/sic/serveis/sic30-serveis/registre-imatges/">Registre d'imatges corporatiu</a>.
</div>

* Els artefactes es construiran una sola vegada i seran els que es desplegaran als diferents entorns. No es contempla, per tant, condicionar la construcció d’artefactes a l’entorn
on es desplegaran (ús profiles maven o similar).

* Si el projecte és multimòdul maven, és necessari que el fitxer `pom.xml` pare i els submòduls estiguin correctament configurats per a poder fer la construcció a partir d'un goal
en el fitxer `pom.xml` pare i no un goal per cada submòdul.

* Per tal d’automatitzar la creació de pipelines, tots els projectes hauran de disposar de la carpeta `/sic` al primer nivell de carpeta i, dins d’aquesta
carpeta, caldrà crear l’arxiu de configuració `aca.yml` que proporcionarà la configuració necessària.
Veure [Com construir el fitxer ACA](/sic30-guies/fitxer-aca/).

* Si es tracta d'un component a desplegar en una plataforma de contenidors mitjançant una imatge pròpia que caldrà construir, és necessari preparar el corresponent
fitxer Dockerfile, així com els corresponents descriptors (orchestrators). Aquests components seran referenciats des del fitxer ACA indicat al punt anterior.

* Si es contempla l'execució de scripts de desplegament/migració de BBDD on-premise, cal preparar el fitxer de `plans` i els corresponents scripts a una carpeta independent.
Veure [Aplicacions APEX i PL/SQL, i migracions de BBDD on-premise](/sic30-guies/preparar-aplicacio/#Aplicacions APEX i PL/SQL, i migracions de BBDD on-premise).

* Si es contempla l'execució de scripts de desplegament/migració de BBDD en plataforma de contenidors, cal preparar els corresponents scripts a una carpeta per versió.
Aquesta versió es correspondrà amb la versió del component indicat al fitxer ACA indicat anteriorment.
Veure [Migracions de BBDD en contenidors](/sic30-guies/preparar-aplicacio/#Migracions de BBDD en contenidors).

## Llibreries

Respecte a les llibreries requerides pels projectes, en funció del seu tipus, cal tenir en compte les següents premisses:

* **Llibreries de tercers públiques**: el repositori de llibreries té configurats una sèrie de repositoris remots oficials per a
la baixada massiva de dependències.
* **Llibreries de tercers no públiques**: caldrà publicar-les manualment al repositori, per lo que haureu d'indicar al SIC d'on
baixar-les per tal d'enregistrar les llibreries oficials mitjançant els [Canals de suport](/sic/suport/#altres-dubtes-o-problem%C3%A0tiques) establerts.
* **Llibreries pròpies**: el seu codi font haurà d'estar en projectes diferenciats al grup corresponent al codi de diàleg.
Aquestes es generaran i es publicaran al repositori mitjançant pipelines dedicades. En cas que no es disposi del codi font per una raó justificada,
caldrà sol·licitar al SIC la seva publicació manual mitjançant els [Canals de suport](/sic/suport/#altres-dubtes-o-problem%C3%A0tiques) establerts.

Es pot validar la existència o no de la llibreria pública accedint al [Repositori de llibreries](https://hudson.intranet.gencat.cat/nexus).
En el cas de llibreries no públiques o pròpies publicades a repositoris privats, caldrà validar la resolució de les dependències del projecte dins l'entorn SIC.

## Aplicacions APEX i PL/SQL, i migracions de BBDD on-premise

El desplegament d'aplicacions de certes tecnologies es fonamenta en l'execució de scripts a base de dades, tot i que els criteris apliquen a qualsevol migració de base de dades.
En general s'aconsella disposar d'un projecte específic de desplegament/migració de BBDD, tot i que també es pot optar per integrar-lo al desplegament d'un altre artefacte, habitualment
el backend de l'aplicació.

<br/>
En qualsevol cas, caldrà preparar:

* **sql_scripts**: directori per a emmagatzemar tots els scripts SQL/PL-SQL, que podran estar organitzat en subcarpetes si es considera convenient.
* **plans.xml**: fitxer on es defineix el pla d'execució dels scripts SQL/PL-SQL. Aquest fitxer **haurà d'estar ubicat a la mateixa carpeta `sql_scripts`, o a un nivell de carpeta superior**, i caldrà indicar:

|Paràmetre|Tipus|Descripció|
|-----------|----------|----------|
|entorn|Opcional|Entorn per al qual s'ha d'executar o empaquetar (segons la modalitat de desplegament) el fitxer. Per defecte, aplica a tots els entorns.|
|failure|Obligatori|Indica la forma en la que s'ha de comportar el sistema en cas d'error: parar o continuar.|
|idBBDD|Obligatori|Identificador únic de la connexió amb la bbdd. En cas de pipelines generades per l’autoservei i desplegament automàtic, s’haurà de correspondre amb l’identificador del fitxer d’infraestructures que determina la cadena de connexió podent referenciar-ne diferents.|
|file|Obligatori|Fitxer que cal executar o empaquetar (segons la modalitat de desplegament).|
|execute|Opcional|Indica, en cas de modalitat de desplegament automàtic o delegat, si a més d'empaquetar el fitxer aquest s'ha d'executar. Útil pel cas de scripts anidats. Per defecte, s'executarà.|

Exemple:
```
<llista-scripts>
<script entorn="INT" failure="stop"     idBBDD="BD_INT" file="script_INT.sql"/>
<script entorn="INT" failure="continue" idBBDD="BD_INT" file="script_INT1.sql" execute="false"/>
<script entorn="INT" failure="continue" idBBDD="BD_INT" file="script_INT2.sql" execute="false"/>

<script entorn="PRE" failure="continue" idBBDD="BD_PRE" file="script_PRE.sql"/>
<script entorn="PRE" failure="continue" idBBDD="BD_PRE" file="script_PRE1.sql" execute="false"/>
<script entorn="PRE" failure="continue" idBBDD="BD_PRE" file="script_PRE2.sql" execute="false"/>

<script entorn="PRO" failure="continue" idBBDD="BD_PRO" file="script_PRO.sql"/>
<script entorn="PRO" failure="continue" idBBDD="BD_PRO" file="script_PRO1.sql" execute="false"/>
<script entorn="PRO" failure="continue" idBBDD="BD_PRO" file="script_PRO2.sql" execute="false"/>
</llista-scripts>
```

<br/>
El projecte ha de contenir tot el codi de l'aplicació i el sistema de custòdia de codi permetrà gestionar diferències, versions i altres. D'acord amb aquesta filosofia,
el criteri és que cada objecte de base de dades ha de tenir el seu propi fitxer associat, especialment si sempre s'executa la mateixa instrucció (create or replace, drop + create...).

## Migracions de BBDD en contenidors

Cal disposar d'un projecte específic de desplegament/migració de BBDD i preparar el directori "scripts" (al primer nivell de carpeta) amb un subdirectori
amb la versió associada a cada desplegament. Aquesta versió es correspondrà amb la versió del component indicat al fitxer ACA de configuració, de forma que
s'executaran els scripts associats a la versió que es desplega en cada moment en ordre alfabètic.

## Funcionament de les pipelines de construcció i desplegament
En realitzar una pujada de codi font, caldrà executar la corresponent pipeline de desplegament associada:

* Les pipelines realitzen multitud de tasques encadenades mitjançant **STAGES**. En cas de produir-se alguna incidència, l'execució
es cancel·larà i notificarà del que ha passat.
* Caldrà limitar la quantitat d’usuaris que realitzen aquesta acció i tenir en compte que el sistema només permetrà fer una única
pujada exitosa per versió del projecte ja que, un cop desplegat, es generarà el **TAG de versió definitiva** (o Release Tag).
* Durant el desplegament es requeriran **accions d’usuari** destinades a autoritzar l’evolució de les etapes de desplegament.
* Els jobs **notificaran** dels resultats a les adreces de correu assignades.

Per a poder efectuar certes tasques caldrà accedir a la plataforma mitjançat el formulari d’autenticació de [Jenkins](https://cicd.sic.intranet.gencat.cat).

Per a més informació: [Integració Continua](/plataformes/sic/serveis/sic30-serveis/ci/).

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).