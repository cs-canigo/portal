+++
date = "2019-12-04"
title = "Integració contínua"
description = "Jenkins és l'eina implantada al SIC per la integració contínua"
sections = "SIC"
toc = true
aliases = [
    "/noticies/2018-05-16-SIC-Autoservei-pipelines/",
    "/sic/integracions-dev/",
    "/sic/clau/"
]
taxonomies = []
weight = 2
+++


## Introducció

![Jenkins](/related/sic/serveis/jenkins-logo.png "Jenkins")

**Jenkins** és l'eina implantada al SIC per a la integració contínua en el desenvolupament de software. Es tracta d'un servei en el que, a partir de la definició previa de tasques (jobs), es construeixen les aplicacions, es versionen, es realitzen anàlisis de qualitat, s'executen tests i inclús es despleguen als entorns preproductius i productius. Està basat en el projecte Hudson.
<br>
Jenkins proporciona un entorn de treball i desplegament automatitzat estalviant temps i diners durant la vida d'un projecte.

<br/>
**Nexus** és l'eina implantada al SIC com a administrador central de biblioteques que facilita la col·laboració eficient entre els diferents col·laboradors i equips implicats. Permet crear servidors proxy, recopilar i administrar les dependències externes, ja siguin de tercers o pròpies. És compatible amb llibreries de diferents tecnologies: llibreries Java, paquets NuGet, paquets NPM i paquets bower. <br/>
Actualment aquest servei és administrat per l'equip del SIC i només permet consultar-lo en mode lectura.

## Beneficis de la integració continua

Un resum dels beneficis de la integració continua seria el següent:

* **Millora la qualitat del codi**: la integració continua contribueix en minimitzar els problemes en els sistemes per errors de codi. Proveeix un codi més robust millorant la qualitat del programari
* **Detecció d'errors més ràpida i fàcil**: al poder realitzar construccions contínuament, de forma periòdica, és més fàcil detectar errors i poder donar-hi solució el més aviat possible.
* **Redueix tasques repetitives i manuals**: amb processos automàtics es garanteix que els processos es realitzen sempre aplicant els mateixos estàndards.
* **Visibilitat de l'evolució del projecte**: es pot tenir una visió de l'evolució de la qualitat del codi i un registre de l'evolució i publicació de les versions del codi
* **Millora de la confiança del treball realitzat**: al garantir una qualitat del codi i poder realitzar entregues de forma més periòdica, els responsables poden tenir major confiança del treball realitzat i entregat.


## Modalitats de desplegament

Es contemplen diverses modalitats de desplegament:

* **Semiautomàtica**: es construeixen els artefactes i es lliuren a través del servei de gestió de binaris per a que CPD/LdT dugui a terme el procés de desplegament. Aquesta modalitat requerirà conformitat prèvia i les accions prèvies davant una possible marxa enrere aniran a càrrec de CPD/LdT.
* **Automàtica**: es construeixen els artefactes i es despleguen al servidors web, servidors d'aplicacions i servidors de bases de dades. Aquesta modalitat no requerirà cap tipus de conformitat prèvia.
* **Automàtica per CPD**: es similar a la automàtica però serà CPD/LdT qui s'encarregarà de donar conformitat i continuïtat a les etapes de desplegament. Aquesta modalitat, per tant, requerirà conformitat prèvia i les accions prèvies davant una possible marxa enrere aniran a càrrec de CPD/LdT. 

Actualment, el sistema previst seria el següent:

* Entorn **INT**: modalitat automàtica.
* Entorn **PRE/PRO**: modalitat semiautomàtica (per defecte) o automàtica per CPD si així s'acorda. Només s'aplica la modalitat automàtica en aplicacions desplegades al Cloud Públic.
* **Altres** entorns: caldrà establir l'ordre d'execució d'etapes i la modalitat de desplegament aplicable.

## Funcionament

### Accés als serveis

Podrà accedir a **Jenkins** mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/hudson/ <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics de CPD disposaran d'accés al servei. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable.

![Jenkins](/related/sic/serveis/jenkins-sic.png)
<br/>

<br/>
Podrà accedir a **Nexus** mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/nexus/

![Nexus](/related/sic/serveis/nexus-sic.png)
<br/>

### Relació de tasques disponibles (jobs)

Una vegada fet el login s'accedeix a la llista de jobs en execució i la relació de jobs disponibles per l'usuari amb la informació més rellevant: **nom, estat del darrer muntatge (Status) i el nivell de salut general del projecte (Weather)** basat en l'estabilitat, cobertura i tests realitzats. Aquest nivell de salut es pot definir per a cada projecte i es basa en el número de construccions que han anat bé /malament, així com en el percentatge de proves i indicadors d'anàlisi.

### Detall de les tasques (jobs)

Es pot consultar la **configuració, historial, estadístiques, resultats i situació** de cadascuna dels jobs mitjançant l'enllaç habilitat. En cas de tractar-se de jobs de tipus "pipeline" (tipologia multi-etapa implementat al SIC 2.0) es mostrarà una gràfica amb les darreres execucions i el resultat de cadascuna de les seves etapes. <br/>
Per tal de disposar de la informació detallada de passes realitzades i logs generats haurà de dirigir-se a la opció "Console Output". Al final d'aquest log es mostrarà el resultat general de l'execució: SUCCES, FAILED o ABORTED. Aquest resultat serà notificat per correu electrònic als responsables assignats.

### Execució de tasques (jobs)

Els jobs de tipus "pipeline" no es podran iniciar directament des del portal ni es podrà sol·licitar la seva execució. Les tasques **s'executaran quan es produeixi una pujada d'una nova versió del codi font del projecte** per part del lot d'aplicacions, per lo que caldrà limitar la quantitat d'usuaris que utilitzen el servei de custodia de codi i fer una única pujada amb èxit per versió, moment en el que es realitzarà l'etiquetat definitiu.

### Etapes de desplegament

Els jobs multi-etapa realitzen multitud d'accions organitzades en STAGES. En cas de produir-se incidències a qualsevol de les seves etapes el job es cancel·larà i es notificarà per correu electrònic.

<CENTER>![Nou projecte](/related/sic/serveis/jobs_stages.png)</center>
<br/>

A continuació s'explica breument cadascuna de les etapes de desplegament previstes:

* **Init**: inicialitzacions internes.
* **Checkout**: descàrrega del codi font del projecte a l'espai de treball.
* **Build**: compilació i construcció d'artefactes en funció de la tecnologia i eines emprades.
* **Commit test**: etapa prevista per a l'execució de tests de commit, si escau.
* **Unit test**: etapa prevista per a l'execució de tests unitaris, si escau.
* **Anàlisi estàtic de codi**: etapa prevista per a l'execució d'anàlisi de codi estàtic a partir d'unes regles predefinides.
* **Generació tag de build**: generació del tag de Build al repositori de codi conforme es tracta d'una versió construïble.
* **Desplegament a INT**: desplegament automàtic a l'entorn d'integració, si escau, incloent possibles processos d'actualització de l'estat de la base de dades.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn d'integració per tal d'assegurar que el projecte s'ha publicat correctament, si escau.
* **Desplegament a PRE**: lliurament d'artefactes per al desplegament manual a l'entorn de preproducció i creació de ticket Remedy en mode "Draft". En aquest punt el sistema demanarà conformitat manual per tal de procedir al desplegament un cop verificades les etapes anteriors.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn de preproducció per tal d'assegurar que el projecte s'ha desplegat correctament, si escau. En aquest punt el sistema demanarà conformitat manual per tal de procedir a la verificació un cop finalitzat el procés de desplegament a preproducció.
* **Acceptancy test**: etapa prevista per a l'execució de tests automàtics d'acceptació, si escau.
* **Exploratory test**: etapa prevista per a l'execució de tests manuals d'acceptació, si escau.
* **Generació tag definitiu**: generació del tag definitiu al repositori de codi conforme es tracta d'una versió desplegable a producció.
* **Desplegament a PRO**: lliurament d'artefactes per al desplegament manual a l'entorn de producció i creació de ticket Remedy en mode "Draft". En aquest punt el sistema demanarà conformitat manual per tal de procedir al desplegament un cop verificades les etapes anteriors.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn de producció per tal d'assegurar que el projecte s'ha desplegat correctament, si escau. En aquest punt el sistema demanarà conformitat manual per tal de procedir a la verificació un cop finalitzat el procés de desplegament a producció.

### Versionat

La versió dels projectes ha de ser sempre **incremental**, és a dir, qualsevol nova actualització de codi lliurat al SIC ha d'anar acompanyat d'un increment de la versió. Per tant, no es permetrà que el projecte desplegui una versió igual o inferior a una versió prèviament desplegada. En cas contrari, es podria induir a error o confusió en els futurs desplegaments de preproducció i producció. Per exemple, no se sabria quina versió d'integració està desplegada a l'entorn de preproducció.

### Execució de proves unitàries

Dins del procés de construcció dels executables (i sempre que l'aplicació ho requereixi) s'executen les proves unitàries. Com a resultat de l'execució de les proves unitàries s'obtenen dos tipus d'informes:

* Nombre total de **proves i percentatge** de proves passades i fallides.
* Percentatge de **cobertura** de les proves respecte al codi font.

### Anàlisi del codi

L'anàlisi de codi és un altre dels processos que es passen dins la tasca de construcció. A partir d'unes regles predefinides, s'analitza el codi per tal d'obtenir mètriques d'adherència a estàndards i bones pràctiques. L'Oficina de Qualitat és qui escull l'eina a utilitzar per a aquest anàlisi.

### Artefactes generats i gestió de possibles marxes enrere

Com a resultat de la construcció es generarà un conjunt d'artefactes, bàsicament components estàtics i dinàmics.
Els artefactes no queden emmagatzemats a l'espai de treball per lo que la marxa enrere passaria per **recuperar la versió anterior del codi** del projecte per a que es tornin a construir i desplegar els artefactes anteriors. Pel que fa als entorns de preproducció i producció, la marxa enrere es delegarà als procediments de desplegament realitzats per CPD. 

### Publicació de llibreries

Totes les dependències de l’aplicació han de ser accessibles en els repositoris públics configurats al Nexus del SIC. Es pot validar la seva existència accedint a la següent URL: https://hudson.intranet.gencat.cat/nexus. <br/>

En cas de tractar-se d'una llibreria pròpia amb codi repositat al SIC, caldrà construir un job d'instal·lació de dependències. En aquest cas, les etapes es simplificaran considerablement de forma que bàsicament **es construeixi l'artefacte i es publiqui al Nexus del SIC**.

## Autoservei de jobs pipeline

L'Autoservei de jobs pipeline permet als usuaris del SIC la **generació al vol de pipelines d'automatització de la construcció i del desplegament de l'aplicació** sense la intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per preparar la construcció del job corresponent per a cada projecte de GitLab.

Aquest autoservei de pipelines es basa en la generació de jobs a partir d'arxius de configuració que els equips que en són responsables informen i publiquen al Git. La pipeline de generació identifica si hi ha hagut canvis en aquests arxius al fer un push i s'encarrega de generar una nova versió de la pipeline de desplegament. Finalment, l'executa.

A continuació, entrarem en més detall sobre com funciona aquest nou servei que ofereix el SIC.

### Motivació

Els objectius que vol assolir aquesta nova funcionalitat són:

* La línia estratègica de DevOps que està marcant CTTI requereix **flexibilitat i independència** en els principals actors que intervenen en la construcció i els desplegaments de les aplicacions.
* A tal efecte, una necessitat clau és anular la dependència existent cap a l'equip del SIC, que fins ara implementava els automatismes de construcció i desplegament. Amb aquest nou model **els usuaris del SIC són autosuficients per generar-se ells mateixos les seves pròpies pipelines**.
* Com a conseqüència del punt anterior, **no cal ajustar-se al calendari de l'equip SIC per obtenir les pipelines de construcció i desplegament**. Els propis usuaris poden implementar-les en el moment que els hi sigui més adient.
* **Augmenta l'eficiència en les integracions d'aplicacions al SIC**, ja que s'eliminen del procés traspassos innecessaris d'informació i de responsabilitats a l'equip SIC.
* De retruc, el fet d'afegir un sistema de configuració amb arxius YML independents de la plataforma d'Integració Contínua Jenkins **proporciona al SIC un nivell d'abstracció addicional amb el que es podria disposar d'altres eines d'automatització sense afectar als usuaris**.

### Funcionament

Generalment, a cada codi d'aplicació li correspon un proveïdor d'aplicacions i un proveïdor d'infraestructures. Aquests dos equips **han de participar i col·laborar** per tal d'utilitzar l'autoservei de jobs pipeline del SIC aportant la informació necessària de la que cadascun és responsable.

![Pipeline del SIC](/images/news/AutoserveiJobs-Funcionament.png)

El funcionament previst és el següent:

1. Els **proveïdors d'aplicacions i els proveïdors d'infraestructures aportaran cadascun d'ells el seu propi arxiu de configuració**.
2. Si es fa algun canvi en la configuració de l'autoservei corresponent a l'aplicació s'invocarà a la pipeline generadora de jobs. Aquesta pipeline recupera els arxius de configuració necessaris per a la **generació de la pipeline** de l'aplicació i la dispara.
3. En posteriors execucions, sempre que no es canviï l'arxiu de configuració, **no es tornarà a regenerar** i s'invocarà directament la darrera pipeline generada.

D'aquesta manera, mitjançant els arxius de configuració proporcionats per cada proveïdor, s'invoca a una **pipeline generadora de pipelines** que construeix la pipeline encarregada de la construcció i del desplegament de l'aplicació.
Finalment, un cop generada la nova pipeline, aquesta serà invocada per realitzar la construcció i el desplegament automatitzats definits als arxius de configuració.

### Configuració

Caldrà realitzar les tasques prèvies de configuració per a que el sistema sigui capaç de generar una tasca de desplegament operativa.

<br/>
#### Arxiu de Configuració de l'Aplicació (ACA)

La informació que aporta el proveïdor d'aplicacions quedarà recollida en l'arxiu `/sic/aca.yml` dins del repositori del projecte. La seva existència és la que determina si l'aplicació té actiu el mode Autoservei de Pipelines. Es tracta d'un arxiu de text en format YAML, que serà responsabilitat del proveïdor d'aplicacions de mantenir-lo actualitzat, en el que s'ha d'aportar la següent configuració:

* **Versió**: versió (independent de la versió de l'aplicació) que s'utilitza per fer seguiment de l'arxiu de configuració.
* **Paràmetres**: parells clau-valor en els que es farà substitució dins de la pipeline.
* **Recursos**: diferents tipus de recursos als que es fa referència en la pipeline.
    - **Entorns**: entorns als que es desplega l'aplicació, així com el seu ordre i la modalitat de desplegament desitjada.
    - **Infraestructures**: denominació d'infraestructures destí (cal demanar al proveïdor d'infraestructures la denominació de la infraestructura).
    - **Artefactes**: artefactes a generar durant el procés de construcció que s'han de desplegar en el procés de desplegament.
* **Procés de construcció**: definició del procés de construcció amb l'ús de passes (*steps*) de construcció.
* **Procés de desplegament**: definició del procés de desplegament amb l'ús de passes (*steps*) de desplegament.
* **Notificacions**: definició d'adreces de correu electrònic on notificar accions manuals en espera i resultats de l'execució.

Es proporciona una [Guia de construcció del fitxer ACA](/howtos/2018-05-SIC-Autoservei-jobs-pipeline-ACA) amb un exemple de cas d'ús.

<br/>
#### Arxiu de Configuració d'Infraestructures (ACI)

D'altra banda, la informació que aporta el proveïdor d'infraestructures queda recollida en el seu repositori del SIC. En aquest repositori hi dipositarà els arxius de configuració d'infraestructures (en pot tenir més d'un per aplicació o projecte), el nom dels quals -sense l'extensió- és l'identificador que ha de facilitar al proveïdor d'aplicacions.

Serà responsabilitat del proveïdor d'infraestructures tenir actualitzada aquesta informació i de notificar al proveïdor d'aplicacions quan hagi realitzat algun canvi. El proveïdor d'aplicacions haurà de fer com a mínim un increment de versió a l'ACA per tal de provocar la regeneració de la pipeline incorporant els canvis realitzats pel proveïdor d'infraestructures a la nova pipeline generada.

El proveïdor d'infraestructures haurà d'informar als seus arxius de configuració:

* **Versió**: versió de l'arxiu de configuració.
* **Recursos**: secció que recull tots els recursos de la part d'infraestructures. Actualment, només hi ha el detall de cada infraestructura.
* **Infraestructures**: detall de les infraestructures incloses en aquest arxiu de configuració.

S'han d'incloure tots els entorns de les capes/stacks definides en l'arxiu pertinent.

##### Clau pública

La infraestructura de clau pública (PKI en anglès) permet establir un sistema de xifrat en el que es permet l'execució amb garanties operacionals criptogràfiques, tals com el xifrat, la firma digital i el no repudi de transaccions electròniques.

El SIC aprofita els avantatges d'aquest sistema oferint aquesta clau pública als seus usuaris per tal que aquests puguin fer-ne ús en els procediments operatius que la requereixin. Es tracta d’un arxiu `.pem` amb la clau pública del SIC. Aquesta clau consisteix en una RSA de 4096 bits.

En el casos en els que el proveïdor d'infraestructures necessita introduir paraules de pas als descriptors ACI, per encriptar-les pot utilitzar la següent comanda:

    ```
    $ echo '<password_a_encriptar>' | openssl rsautl -encrypt -pubin -inkey sic_id_rsa.pub.pem | base64
	K0zcD3BuLKN55XVjqpovmwbJDEVehnEN7pz06ytPMlBowuc2IATSyH/c/zN5EmLE5DFoJcRLFA9B
	Nmf0rh0yzUDb3kS+jXUuFhx+N35N2ScbemiZL3sjji3icXqgWmiQTmfp1hCAZgq5oMfMJzpwjWlq
	ubT15lXq/6jgkj0hS9pYUpZBz0rH6IX0q81xRvsnQteMyrtQik/p/2ZaTbj0ciiLG61kkVcGSZLo
	sr9iOVdFh3q8Ok7+CAPhKaa/maGn0LEeaafj+5pBLE9AWcOy98imBRUzr4C8bi9ydMjuRdvd12XT
	1JdcHer/G1ZWBx9yEIYQEGgG/eFR4njNBjtjH/A53YBcbLIH2ZzHI3v33PCE5W3aVoK5qVqdVf64
	GlicdVQ2VSm7ROE4bfcUu4BzVw1em6hUw6LSXxH6GrKVxFe0JVWbrIlOyDL1nGu3Yu6zdplayK+q
	anqNjSRixyLOjoKon2g80dHGd12S7j1av3oyhPz/1KlqMt71YgTrZG3GxeW7NB356V/18bY/PwCn
	UcNttMs3oOvt+6d4UgeqqesA1fgDx92X+zIoyOTh2rnkfWo554cwqg+w3JaB5Kp30vGJNXwrvR+W
	+x4v2PLCO1D2b59Bb3n9/rFENXHE8wYLPAecPoSNjB6dB2/JdZibUwDJz+T98nOlcgJ7FcBBQ4s=
	$
    ```

<a href="/related/sic/key/sic_id_rsa.pub.pem" download target="_blank" style="display: block; margin: 25px auto; border-radius: 5px; width: 200px; padding: 10px; color: white !important; text-decoration: none !important;background-color: #CC0000;text-align: center;font-weight:bold;">
Descarregar la clau
</a>

### Què es pot realitzar amb l'Autoservei de jobs pipeline?

Amb l'autoservei de jobs pipeline es poden definir tants entorns i infraestructures com siguin necessaris per a la construcció i el desplegament d'una aplicació.

#### Tecnologies integrades a l'Autoservei de jobs

Hi ha les següents tecnologies de construcció suportades:

* Maven (Java)
* Ant (Java)
* MS Build (.NET)
* Npm (NodeJS)
* Hugo (Webs estàtiques)

Finalment, també s'integren els desplegaments a:

- Servidor web Apache
- Servidors d'aplicacions
    - Tomcat (Java)
    - Weblogic (Java)
    - Websphere (Java)
    - JBoss (Java)
    - IIS (.NET)
- Servidors de Bases de Dades
  - MySQL
  - MongoDB
  - PostgreSQL
  - Oracle
  - SQL Server

Per a més detall del que es pot fer amb l'Autoservei de Jobs pipeline, us recomanem que consulteu l'apartat 7 del [manual d'usuari.](/related/sic/manual-usuari.pdf).

## Matriu de tecnologies compatibles

Les tecnologies de construcció d'aplicacions serveixen per gestionar el cicle de vida d'una aplicació o algunes de les seves fases. <br/>
A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible.

|Tecnologia|Versions|
|-------|-------|
|Ant|1.8.2<br />1.9.6|
|Maven|2.0.10<br />2.2.1<br />3.2.2<br />3.3.9|
|MS_Build|4.0|
|MS_Deploy|7.1|

Cas particular de tecnologies front-end:

|Versió node|Versió npm|
|-----------|----------|
|0.12.3|2.15.0|
|4.4.3|2.15.1|
|5.10.1|3.8.3|
|8.12.0 (LTS)|6.4.1|

L'única eina que va lligada en certa manera amb la versió de node és **npm**. La resta d'eines de cicle de vida (tals com **bower**, **gulp** i **grunt**) s'han d'incloure amb l'aplicació per a què el SIC les utilitzi per a la seva construcció. Pel que fa a [Angular](https://angular.io/), framework de frontend recomanat per Arquitectura CTTI i el CS Canigó, l'aplicació definirà la versió de **ng** (Angular-cli) a utilitzar per a la seva construcció.

**<span style="color: #C00000;">AVÍS:</span>** Aquesta normativa del SIC no invalida l'[Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions), ans al contrari, l'estén per acabar de concretar els requeriments propis del SIC.

### Properes passes

Es preveu l'ús del patró builder amb Docker. En aquest model, es disposa d'un contenidor de construcció que genera l'artefacte desitjat, podent-ne instal·lar en el seu interior les tecnologies i eines necessàries que siguin requerides.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [Manuals](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
