+++
date = "2022-01-18"
title = "Integració contínua"
description = "Jenkins és l'eina implantada al SIC per la integració contínua"
sections = "SIC"
toc = true
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

* **Automàtica al cloud**: es construeixen els artefactes i es despleguen al cloud. Aquesta modalitat no
aplica als desplegaments on-premise.

* **Delegada**: es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i posteriorment es
delega als CPD el desplegament automàtic dels artefactes mitjançant un sistema de llibreries compartides. En aquest cas,
si es produeix un error en el desplegament, de cara a tractar-lo i reportar-lo, caldrà aplicar el següent criteri:

|Codi d'error|Responsable|
|-------|-------|
|-1xx|Equip SIC|
|-2xx|Proveïdor d'infraestructures (Cpd)|
|-3xx|Lot d'aplicacions|

* **Semiautomàtica**: es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i es genera
un tiquet Remedy CRQ en mode "Draft" (que cal acabar d'emplenar segons l'operativa establerta per gestio de canvis) per a
que CPD/LdT dugui a terme el procés de desplegament. Aquesta modalitat requerirà conformitat prèvia i les accions prèvies
davant una possible marxa enrere aniran a càrrec de CPD/LdT.

<!---* **Automàtica per CPD**: es similar a la automàtica però serà CPD/LdT qui s'encarregarà de donar conformitat i
continuïtat a les etapes de desplegament. Aquesta modalitat, per tant, requerirà conformitat prèvia i les accions prèvies
davant una possible marxa enrere aniran a càrrec de CPD/LdT. -->

Actualment, el sistema previst per entorn seria el següent:

* Entorn **INT**: modalitat semi-automàtica o automàtica, que anirà tendint cap a la modalitat delegada. **IMPORTANT: En cas d'aplicar la modalitat
semi-automàtica**, donat la majoria de proveïdors disposen d'accés als servidors per a fer els desplegaments, el sistema s'encarregarà
de lliurar els binaris però no generarà cap tiquet Remedy amb les instruccions de desplegament.
* Entorn **PRE/PRO**: modalitat semiautomàtica o, en el cas de desplegaments al cloud, la modalitat automàtica.
* **Altres** entorns: caldrà establir l'ordre d'execució d'etapes i la modalitat de desplegament aplicable.

## Funcionament

### Accés als serveis

Podrà accedir a **Jenkins** mitjançant el següent enllaç: https://icdc.sic.intranet.gencat.cat <br/>
Per a poder accedir via VPN cal assegurar que es disposa de connectivitat pel port 443/TCP i, en cas de no disposar de
connectivitat, caldrà obrir una petició demanant l'obertura de Firewalls dels seus entorns.

Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager, responsables de lot i tècnics
de CPD disposaran d'accés al servei. Si no disposa d'accés, haurà de sol·licitar-ho al seu responsable.

![Jenkins](/related/sic/3.0/jenkins-sic.png)
<br/>

<br/>
Podrà accedir a **Nexus** mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/nexus/

![Nexus](/related/sic/serveis/nexus-sic.png)
<br/>

### Relació de tasques i detalls de les execucions

Una vegada fet el login s'accedeix a la llista de jobs en execució i la relació de jobs disponibles per l'usuari
amb la informació més rellevant: **nom, estat del darrer muntatge (Status) i el nivell de salut general del projecte (Weather)**
basat en l'estabilitat, cobertura i tests realitzats. Aquest nivell de salut es pot definir per a cada projecte i es basa
en el número de construccions que han anat bé o malament, així com en el percentatge de proves i indicadors d'anàlisi.

De cadascuna de les tasques, es pot consultar la **configuració, historial, estadístiques, resultats i situació**
mitjançant l'enllaç habilitat. A més, es mostrarà una gràfica amb les darreres execucions i el resultat de cadascuna de les seves etapes.
Per tal de disposar de la informació detallada de passes realitzades i logs generats haurà de dirigir-se a l'opció "Console Output".
Al final d'aquest log es mostrarà el resultat general de l'execució: SUCCES, FAILED o ABORTED, que serà serà notificat per correu
electrònic als responsables assignats.<br/>

### Execució de tasques

Les tasques s'executaran a demanda quan l'usuari iniciï el desplegament mitjançant l'opció "BuildWithParameters"**.

### Etapes de desplegament

Els jobs multi-etapa realitzen multitud d'accions organitzades en STAGES. En cas de produir-se incidències a qualsevol de les
seves etapes el job es cancel·larà i es notificarà per correu electrònic.

<CENTER>![Nou projecte](/related/sic/3.0/pipeline-stages-sense hook.png)</center>
<br/>
A continuació s'explica breument cadascuna de les etapes de desplegament previstes:

* **Init**: inicialitzacions internes.

* **Checkout**: descàrrega del codi font del projecte a l'espai de treball.

* **Prepare Builder**: construcció de la possible imatge Docker pròpia de Build que serà utilitzada, en la següent etapa, per a la compilació i construcció d'artefactes.

* **Build**: compilació i construcció d'artefactes en funció de la tecnologia i les eines emprades.

* **Build Tag**: generació del tag de Build al repositori de codi segons es tracta d'una versió construïble. Per exemple: 1.0.0-B001.

* **Static Code Analysis**: etapa prevista per a l’enviament del codi font del projecte a l'eina d'anàlisi estàtic de codi de l'Oficina de Qualitat i comprovació de les corresponents [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/).

* **Security Test**: etapa prevista per a l'execució de tests de seguretat.

* **Unit Test**: etapa prevista per a l'execució de tests unitaris.

* **Artifact Archive**: etapa prevista per a l'arxivament dels artefactes generats.

* **Bake Validations**: per als desplegaments al cloud, validació prèvia de la imatge Docker de l'aplicació (DockerFile).

* **Image Bake**: per als desplegaments al cloud, construcció de la imatge Docker de l'aplicació (DockerFile).

* **Image Validations**: per als desplegaments al cloud, validació de vulnerabilitats de la imatge Docker de l'aplicació (DockerFile).

* **Snapshot Tag**: generació del tag de Snapshot al repositori de codi segons es tracta d'una versió desplegable. Per exemple: 1.0.0-SNAPSHOT001.

* Per a **entorns no productius** (Integració):

    * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn no productiu requereix conformitat prèvia, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn no productiu un cop verificades les etapes anteriors.

    * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn no productiu.

    * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn no productiu.

    * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn no productiu.

    * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn no productiu per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.

    * **Release Tag**: generació del tag de Release Candidate al repositori de codi segons es tracta d'una versió desplegada a un entorn no productiu. Per exemple: 1.0.0-RC001.

* Per a l'**entorn de Staging** (Preproducció):

    * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn requereix conformitat prèvia, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn Staging un cop verificades les etapes anteriors.

    * **ITSM Register**: etapa prevista per a la generació automàtica d'un tiquet Remedy CRQ per a la traçabilitat dels desplegaments automàtics a l'entorn de Staging.

    * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn de Staging.

    * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn de Staging.

    * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn de Staging.

    * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn de Staging per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.

    * **Stress Test**: etapa prevista per a les proves de resistència a l'entorn de Staging per tal de verificar l'estabilitat i fiabilitat de l'aplicació.

    * **Acceptance Test**: etapa prevista per a les proves d'acceptació a l'entorn de Staging per tal de verificar que el sistema compleix les especificacions de negoci i és acceptable per al lliurament.

    * **Exploratory Test**: etapa prevista per a les proves exploratòries a l'entorn de Staging per tal de verificar els resultats obtinguts pels diferents casos de prova que es defineixin.

    * **ITSM Close**: etapa prevista per al tancament automàtic del tiquet Remedy CRQ generat per a la traçabilitat dels desplegaments automàtics a l'entorn de Staging.

* Per a l'**entorn de Production** (Producció):

    * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn requereix conformitat prèvia, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn Producció un cop verificades les etapes anteriors.

    * **ITSM Register**: etapa prevista per a la generació automàtica d'un tiquet Remedy CRQ per a la traçabilitat dels desplegaments automàtics a l'entorn de Producció.

    * **Production Release Tag**: generació del tag de Release (versió definitiva) al repositori de codi segons es tracta d'una versió desplegada a un entorn de Staging. Per exemple: 1.0.0.

    * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn de Producció.

    * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn de Producció.

    * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn de Producció.

    * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn de Producció per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.

    * **Probe Test**: etapa prevista per a la verificació de sondes a l'entorn de Producció per tal d'assegurar que l'aplicació funciona correctament.

    * **Release Tag**: generació del tag de Release al repositori de codi segons es tracta d'una versió desplegada a un entorn de Producció. Per exemple: 1.0.0-PR.

    * **ITSM Close**: etapa prevista per al tancament automàtic del tiquet Remedy CRQ generat per a la traçabilitat dels desplegaments automàtics a l'entorn de Producció.


<div class="message information">
Les pipelines generades <b>no permetran execucions concurrents i els punts de conformitat prèvia expiraran en 30 dies</b>.
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

## Autoservei de pipelines

L'Autoservei de pipelines permet als usuaris del SIC la **generació al vol de pipelines d'automatització de la construcció i del desplegament de l'aplicació** sense la
intervenció de l'equip del SIC. D'aquesta manera, els equips de cada codi d'aplicació són independents per a preparar la construcció del job corresponent per a cada projecte de GitLab.
Per a més informació: [Autoservei de pipelines] (/sic30-serveis/autoservei-pipelines/)

## Matriu de tecnologies de construcció

Les tecnologies de construcció d'aplicacions serveixen per gestionar el cicle de vida d'una aplicació o algunes de les seves fases.
Aquesta normativa del SIC no invalida
l'[Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions),
ans al contrari, l'estén per a acabar de concretar els requeriments propis del SIC.

<div class="message information">
El SIC actualment utilitza la <a href="https://www.docker.com/">tecnologia Docker</a> per a disposar d'un entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors.
Addicionalment, es contempla l'ús d'entorns propis de construcció proporcionats pels proveïdors (DockerFile) que opcionalment podran estendre del catàleg d'imatges corporatiu.<br/>
Veure: <a href="https://canigo.ctti.gencat.cat/sic30-serveis/cataleg-imatges/">Catàleg d'imatges corporatiu</a>.
</div>

<br/>
A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible d'entrada.

### Microsoft
|Versió .NET Core|Versió MSBuild|
|-------|-------|
|3.1|16.7|
|5.0|16.11|

<!---
### Maven/JDK
|Versió Maven|Versió JDK|
|-------|-------|
|2.2|7|
|3.2|6<br/>7<br/>8|
|3.5|7<br/>8|
|3.6 \*|7<br/>8<br/>11-openjdk|

(\*) Versió amb suport i manteniment.
-->

### Maven/JDK
|Versió Maven|Versió JDK|
|-------|-------|
|2.2|7<br />8|
|3.6|7<br />8<br />11-openjdk|

### Ant/JDK
|Versió Ant|Versió JDK|
|-------|-------|
|1.8|8|
|1.10|8|

### Node/npm
|Versió Node|Versió Npm|
|-----------|----------|
|4|2.15|
|6|3.10|
|8|6.4|
|10|6.11|
|12|6.12|
|14|6.14|

L'única eina que va lligada en certa manera amb la versió de Node és **npm**. La resta d'eines de cicle de vida,
tals com **ng** de **[Angular](https://angular.io/)** (framework de frontend recomanat per Arquitectura CTTI i el CS Canigó),
**bower**, **gulp** i **grunt**, s'han de definir com a dependències a l'aplicació (fitxer `package.json`) i instal·lar-los
a la construcció de l'aplicació via **npm install**.

### Hugo (Webs estàtiques)
|Versió|
|-------|
|0.27|

## Matriu de desplegament en servidors (IAAS)

Si es volen fer servir les tasques de desplegaments automatitzats des de SIC, caldrà escollir la
modalitat de desplegament [**DELEGADA**](/sic30-serveis/ci/#modalitats-de-desplegament) per a que l’aplicació
es desplegui sobre un dels següents proveïdors d'infraestructures i tipus de servidor:

|Proveïdor|Tipus de servidor|
|-------|-------|
|Cpd1|-|
|Cpd2|-|
|Cpd3|Tomcat<br/>Apache<br/>Oracle|
|Cpd4|Weblogic<br/>Apache<br/>Oracle|

Les tasques d’execució de desplegament automatitzat fan un redesplegament de l’aplicació i no pas
un desplegament. Per tant, cal que l’aplicació ja es trobi desplegada prèviament.
La petició per a fer aquest primer desplegament de l’aplicació va a càrrec dels proveïdors de l’aplicació.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).
