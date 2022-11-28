+++
date = "2022-10-06"
title = "Integració contínua"
description = "Jenkins és l'eina implantada al SIC per la integració contínua"
sections = "SIC"
toc = true
aliases = [
    "/sic/integracions-dev/",
    "/sic/clau/",
    "/sic-documentacio",
    "/sic-serveis/ci/"
]
taxonomies = []
weight = 2
+++

![Jenkins](/related/sic/serveis/jenkins-logo.png "Jenkins")

## Introducció

**Jenkins** és l'eina implantada al SIC per a la integració contínua en el desenvolupament de software.
Es tracta d'un servei en el que, a partir de la definició previa de tasques (jobs), es construeixen les aplicacions,
es versionen, es realitzen anàlisis de qualitat, s'executen tests i inclús es despleguen als entorns preproductius i productius.
Està basat en el projecte Hudson.
<br>
Jenkins proporciona un entorn de treball i desplegament automatitzat estalviant temps i diners durant la vida d'un projecte.

<br/>
**Nexus** és l'eina implantada al SIC com a administrador central de biblioteques que facilita la col·laboració eficient
entre els diferents col·laboradors i equips implicats. Permet crear servidors proxy, recopilar i administrar les dependències externes,
ja siguin de tercers o pròpies. És compatible amb llibreries de diferents tecnologies: llibreries Java, paquets NuGet, paquets NPM i
paquets bower. <br/>
Actualment aquest servei és administrat per l'equip del SIC i només permet consultar la informació de repositoris públics.

## Beneficis de la integració continua

Un resum dels beneficis de la integració continua seria el següent:

* **Millora la qualitat del codi**: la integració continua contribueix en minimitzar els problemes en els sistemes per
errors de codi. Proveeix un codi més robust millorant la qualitat del programari.
* **Detecció d'errors més ràpida i fàcil**: al poder realitzar construccions contínuament, de forma periòdica,
és més fàcil detectar errors i poder donar-hi solució el més aviat possible.
* **Redueix tasques repetitives i manuals**: amb processos automàtics es garanteix que els processos es realitzen
sempre aplicant els mateixos estàndards.
* **Visibilitat de l'evolució del projecte**: es pot tenir una visió de l'evolució de la qualitat del codi i un
registre de l'evolució i publicació de les versions del codi.
* **Millora de la confiança del treball realitzat**: al garantir una qualitat del codi i poder realitzar entregues
de forma més periòdica, els responsables poden tenir major confiança del treball realitzat i entregat.


## Modalitats de desplegament

Es contemplen diverses modalitats de desplegament:

### Modalitat automàtica

**Es construeixen els artefactes i es despleguen als servidors web, servidors d'aplicacions i servidors
de bases de dades**. Aquesta modalitat s'aplica a desplegaments on-premise als entorns d'integració,
que anirà tendint cap a la modalitat delegada a mesura que els diferents CPDs vagin donant cobertura a les tecnologies requerides.

La sortida de logs per consola indicarà si el desplegament ha acabat bé o s'han produït incidències,
proporcionant tota la informació necessària per a identificar-ne el problema.
Tota la informació de desplegament serà configurada per l'equip de SIC en col·laboració amb el
proveïdor d'infraestructures (CPD) sense que sigui requerida cap acció específica per part del proveïdor d'aplicacions.

### Modalitat delegada

**Es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i es
delega als CPD el desplegament automàtic als servidors web, servidors d'aplicacions i servidors
de bases de dades** dels artefactes mitjançant un sistema de llibreries compartides. Aquesta modalitat és
l'evolució de l'antiga modalitat automàtica aportant les següents millores:

- Abans del desplegament, es fa una còpia de l'artefacte desplegat (backup)
- Un cop finalitzat el desplegament, és duu a terme un reinici de totes les instàncies afectades, amb esborrat de caché i temporals (segons pertoqui)
- Es comprova si l'aplicació queda en estat activa per a identificar possibles problemes al desplegament
- En cas d'error, es realitza marxa enrere automàtica

Aquesta modalitat s'aplica a desplegaments on-premise als entorns d'integració o preproductius, si i només si, el
proveïdor d'infraestructures (CPD) dona cobertura a les tecnologies requerides.

La sortida de logs per consola indicarà si el desplegament ha acabat bé o s'han produït incidències,
proporcionant tota la informació necessària per a identificar-ne el problema i un codi d'error que indicarà qui és
el responsable de revisar la incidència:

|Codi d'error|Responsable|
|-------|-------|
|-1xx|Equip SIC|
|-2xx|Proveïdor d'infraestructures (Cpd)|
|-3xx|Proveïdor d'aplicacions (lot)|

En aquest cas, **el proveïdor d'aplicacions ha de fer la sol·licitud d'integració al proveïdor d'infraestructures (Cpd)
remetent tota la informació que sigui requerida** per a habilitar aquesta modalitat de desplegament sobre les seves
infraestructures. Un cop finalitzat aquest tràmit, ja podrà fer ús d'aquesta modalitat per a dur a terme les corresponents
validacions.

### Modalitat semiautomàtica

**Es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i es genera
un tiquet Remedy en mode "Draft"** (que cal acabar d'emplenar segons l'operativa establerta per gestio de canvis) per a
que CPD/LdT dugui a terme el procés de desplegament. Aquesta modalitat requerirà conformitat prèvia i les accions prèvies
davant una possible marxa enrere aniran a càrrec de CPD/LdT. Aquesta modalitat s'aplica a desplegaments on-premise als
entorns preproductius i productius, tot i que està previst que, a futur, acabi sent substituïda per la modalitat delegada.

La sortida de logs per consola indicarà si el procés ha acabat bé o s'han produït incidències,
proporcionant tota la informació necessària per a identificar-ne el problema.

## Funcionament

### Accés als serveis

Podrà accedir a **Jenkins** mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/hudson/ <br/>
Per a poder accedir via VPN cal assegurar que es disposa de connectivitat pel port 443/TCP i, en cas de no disposar de
connectivitat, caldrà obrir una petició demanant l'obertura de Firewalls dels seus entorns.

Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics
de CPD disposaran d'accés al servei. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable.

![Jenkins](/related/sic/serveis/jenkins-sic.png)
<br/>

<br/>
Podrà accedir a **Nexus** mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/nexus/

![Nexus](/related/sic/serveis/nexus-sic.png)
<br/>

### Relació de tasques i la seva execució (jobs)

Una vegada fet el login s'accedeix a la llista de jobs en execució i la relació de jobs disponibles per l'usuari
amb la informació més rellevant: **nom, estat del darrer muntatge (Status) i el nivell de salut general del projecte (Weather)**
basat en l'estabilitat, cobertura i tests realitzats. Aquest nivell de salut es pot definir per a cada projecte i es basa
en el número de construccions que han anat bé o malament, així com en el percentatge de proves i indicadors d'anàlisi.

De cadascuna de les tasques, es pot consultar la **configuració, historial, estadístiques, resultats i situació**
mitjançant l'enllaç habilitat. En cas de tractar-se de jobs de tipus "pipeline"
es mostrarà una gràfica amb les darreres execucions i el resultat de cadascuna de les seves etapes.
Per tal de disposar de la informació detallada de passes realitzades i logs generats haurà de dirigir-se a l'opció "Console Output".
Al final d'aquest log es mostrarà el resultat general de l'execució: SUCCES, FAILED o ABORTED.
Aquest resultat serà notificat per correu electrònic als responsables assignats.<br/>

Els jobs de tipus "pipeline" **s'executaran quan es produeixi una pujada d'una nova versió del codi font del projecte**
per part del lot d'aplicacions, per lo que caldrà limitar la quantitat d'usuaris que utilitzen el servei de custòdia de codi
i fer una única pujada amb èxit per versió, moment en el que es realitzarà l'etiquetat definitiu.
No obstant, en cas d'error o necessitat de redesplegar, les taques també **es podran executar directament mitjançant l'opció "BuildWithParameters"**.

### Etapes de desplegament

Els jobs multi-etapa realitzen multitud d'accions organitzades en STAGES. En cas de produir-se incidències a qualsevol de les seves etapes el job es cancel·larà i es notificarà per correu electrònic.

<CENTER>![Nou projecte](/related/sic/serveis/jobs_stages.png)</center>
<br/>

A continuació s'explica breument cadascuna de les etapes de desplegament previstes:

* **Init**: inicialitzacions internes.
* **Checkout**: descàrrega del codi font del projecte a l'espai de treball.
* **Build image**: (opcional) construcció i anàlisi de vulnerabilitats de la possible imatge Docker d'usuari que serà utilitzada, en la següent etapa, per a la compilació i construcció d'artefactes. Es tracta d'una etapa addicional que s'afegirà només si es requereix.
* **Build**: compilació i construcció d'artefactes en funció de la tecnologia i les eines emprades.
* **Commit test**: etapa prevista per a l'execució de tests de commit, si escau.
* **Unit test**: etapa prevista per a l'execució de tests unitaris, si escau.
* **Anàlisi estàtic de codi**: enviament del codi font del projecte a l'eina d'anàlisi estàtic de codi de l'Oficina de Qualitat i comprovació de les [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/) corresponents.
* **Generació tag de build**: generació del tag de Build al repositori de codi conforme es tracta d'una versió construïble.
* **Desplegament a INT**: desplegament a l'entorn d'integració, si escau, d'acord amb la [modalitat de desplegament](#modalitats-de-desplegament) aplicable.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn d'integració per tal d'assegurar que el projecte s'ha publicat correctament, si escau.
* **Desplegament a PRE**: desplegament a l'entorn de preproducció d'acord amb la [modalitat de desplegament](#modalitats-de-desplegament) aplicable. En aquest punt el sistema demanarà conformitat manual per tal de procedir al desplegament.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn de preproducció per tal d'assegurar que el projecte s'ha desplegat correctament, si escau. En aquest punt el sistema demanarà conformitat manual per tal de continuar amb les següents etapes.
* **Acceptancy test**: etapa prevista per a l'execució de tests automàtics d'acceptació, si escau.
* **Exploratory test**: etapa prevista per a l'execució de tests manuals d'acceptació, si escau.
* **Generació tag definitiu**: generació del tag definitiu al repositori de codi conforme es tracta d'una versió desplegable a producció.
* **Desplegament a PRO**: desplegament a l'entorn de producció d'acord amb la [modalitat de desplegament](#modalitats-de-desplegament) aplicable. En aquest punt el sistema demanarà conformitat manual per tal de procedir al desplegament.
* **Smoke test**: etapa prevista per a la verificació bàsica a l'entorn de producció per tal d'assegurar que el projecte s'ha desplegat correctament, si escau. En aquest punt el sistema demanarà conformitat manual per tal de finalitzar l'execució.

<div class="message information">
Els punts d'aprovació manual de les pipelines expiraran en un termini màxim de 30 dies</b>.
</div>

### Versionat

La versió dels projectes ha de ser sempre **incremental**, és a dir, qualsevol nova actualització de codi lliurat al SIC ha
d'anar acompanyat d'un increment de la versió. Per tant, no es permetrà que el projecte desplegui una versió igual o inferior
a una versió prèviament desplegada. En cas contrari, es podria induir a error o confusió en els futurs desplegaments de
preproducció i producció. Per exemple, no se sabria quina versió d'integració està desplegada a l'entorn de preproducció.

### Anàlisi del codi

L'anàlisi de codi és un altre dels processos que es passen dins la tasca de construcció. A partir d'unes regles predefinides,
s'analitza el codi per tal d'obtenir mètriques d'adherència a estàndards i bones pràctiques. L'Oficina de Qualitat és qui
escull l'eina a utilitzar per a aquesta revisió de codi.

### Artefactes generats i gestió de possibles marxes enrere

Com a resultat de la construcció es generarà un conjunt d'artefactes, bàsicament components estàtics i dinàmics.
Els artefactes no queden emmagatzemats a l'espai de treball per lo que la marxa enrere passaria per
**recuperar la versió anterior del codi** del projecte per a que es tornin a construir i desplegar els artefactes anteriors.
Pel que fa als entorns de preproducció i producció, la marxa enrere es delegarà als procediments de desplegament realitzats per CPD.

### Publicació de llibreries

Totes les dependències de l’aplicació han de ser accessibles en els repositoris públics configurats al Nexus del SIC.
Es pot validar la seva existència accedint a la següent URL: https://hudson.intranet.gencat.cat/nexus. <br/>

En cas de tractar-se d'una **llibreria pròpia amb codi repositat al SIC**, caldrà construir un job d'instal·lació de dependències.
En aquest cas, les etapes es simplificaran considerablement de forma que bàsicament **es construeixi l'artefacte i es publiqui al Nexus del SIC**.

En cas de tractar-se d'una **llibreria de tercers no disponible públicament** caldrà obrir una petició de suport
funcional de l’aplicació indicant la següent informació:

- Nom i versió de la llibreria
- URL on obtenir la llibreria (o adjuntar-la a la pròpia petició Remedy)
- Característiques i funcionalitat de la llibreria
- Raons per l'ús de la llibreria

Per a més informació: [Canals de suport](/sic/suport/#altres-dubtes-o-problem%C3%A0tiques).

## Autoservei de jobs pipeline

L'Autoservei de pipelines permet als usuaris del SIC la **generació al vol de pipelines d'automatització de la construcció i del desplegament de l'aplicació** sense la
intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per a preparar la construcció del job corresponent per a cada projecte de GitLab.
Per a més informació: [Autoservei de pipelines] (/sic-serveis/autoservei-pipelines/)

## Matriu de tecnologies de construcció

Les tecnologies de construcció d'aplicacions serveixen per gestionar el cicle de vida d'una aplicació o algunes de les seves fases. <br/>
A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible d'entrada.

<div class="message information">
El SIC actualment utilitza la <a href="https://www.docker.com/">tecnologia Docker</a> per a disposar d'un entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors.
Addicionalment, es contempla l'ús d'entorns propis de construcció proporcionats pels proveïdors (DockerFile) que opcionalment podran estendre del catàleg d'imatges corporatiu.<br/>
<a href="https://canigo.ctti.gencat.cat/howtos/2020-06-26-SIC-Howto-utilitzar-imatges-docker-builder/">Howto utilitzar imatges Docker Builder</a>
</div>
<br/>

**<span style="color: #C00000;">AVÍS:</span>** Aquesta normativa del SIC no invalida
l'[Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions),
ans al contrari, l'estén per a acabar de concretar els requeriments propis del SIC.
<br/>

### Microsoft
|Tecnologia|Versions|
|-------|-------|
|MS_Build|4.0<br />14<br />15|
|MS_Deploy|7.1|

### Maven/JDK
|Versió Maven|Versió JDK|
|-------|-------|
|2.2|7|
|3.2|6<br />7<br />8|
|3.5|7<br />8|
|3.6 \*|7<br />8<br />11-openjdk|

(\*) Versió amb suport i manteniment.

### Node/npm
|Versió Node|Versió Npm|
|-----------|----------|
|4|2.15|
|6|3.10|
|8|6.4|
|10|6.11|
|12|6.12|
|14|6.14|
|16|8.3|

L'única eina que va lligada en certa manera amb la versió de Node és **npm**. La resta d'eines de cicle de vida,
tals com **ng** de **[Angular](https://angular.io/)** (framework de frontend recomanat per Arquitectura CTTI i el CS Canigó),
**bower**, **gulp** i **grunt**, s'han de definir com a dependències a l'aplicació (fitxer `package.json`) i instal·lar-los
a la construcció de l'aplicació via **npm install**.

### Hugo (Webs estàtiques)
|Versió|
|-------|
|0.27|
|0.73|


## Matriu de desplegament en servidors (IAAS)

Si es volen fer servir les tasques de desplegaments automatitzat des de SIC, cal que l’aplicació pugui
ser desplegada sobre un dels següents servidors:

### Microsoft
|Tecnologia|Versions|
|-------|-------|
|MS Web Deploy|3.6|

### JEE
|Tecnologia|Versions|
|-------|-------|
|Weblogic|9.2, 10.3.x, 11g, 12c|
|Websphere|6.1, 8.5|
|Tomcat|5.5, 6, 7, 8, 8.5|
|JBoss|EAP 6.4, EAP 7.1|

Les tasques d’execució de desplegament automatitzat fan un re-desplegament de l’aplicació i no pas
un desplegament. Per tant, cal que l’aplicació ja es trobi desplegada (en format empaquetat
WAR/EAR). La petició per a fer aquest primer desplegament de l’aplicació corre a càrrec dels
proveïdors de l’aplicació i en ella s’ha d’indicar a SAU de forma explicita que l’aplicació ha de
desplegar-se en format empaquetat (WAR/EAR).
Un cop integrada al SIC, qualsevol canvi que es faci en la referència a l'artefacte a desplegar
o canvi en el nom de l’aplicació dins el servidor d’aplicacions,
ha de ser notificat a l’equip del SIC, ja que en cas contrari el job de desplegament deixarà de
funcionar.

### BBDD
|Tecnologia|Versions|
|-------|-------|
|Oracle|19c, i anteriors|
|SQL Server|2014, edició standard i express|
|PostgreSQL|14.5, i anteriors|
|MongoDB|3.2.5, i anteriors|
|MySQL|5.7.12, i anteriors|

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/sic20-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).