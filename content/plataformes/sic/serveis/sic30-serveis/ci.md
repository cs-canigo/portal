---
toc: true
title: Integració contínua
description: Jenkins és l'eina implantada al SIC per la integració contínua
date: 2023-06-12
sections: SIC
taxonomies: []
aliases:
  - /sic30-serveis/ci/
weight: 2
---
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

### Modalitat automàtica al cloud

**Es construeixen els artefactes i es despleguen al cloud**. Aquesta modalitat s'aplica a desplegaments al cloud
als diferents entorns. En el cas dels entorns preproductius i productius, es requerirà conformitat prèvia on es
sol·licitarà informació per a generar automàticament un tiquet Remedy CRQ a mode d'auditoria del desplegament.

La sortida de logs per consola indicarà si el desplegament ha acabat bé o s'han produït incidències,
proporcionant tota la informació necessària per a identificar-ne el problema.
Tota la informació de desplegament serà configurada per l'equip de SIC en col·laboració amb el
proveïdor d'infraestructures (Suport Cloud/CPD) sense que sigui requerida cap acció específica per part del proveïdor d'aplicacions.

### Modalitat delegada

**Es construeixen els artefactes, es lliuren a través del servei de gestió de binaris i es
delega als CPD el desplegament automàtic als servidors web, servidors d'aplicacions i servidors
de bases de dades** dels artefactes mitjançant un sistema de llibreries compartides. Aquesta modalitat és
l'evolució de l'antiga modalitat automàtica aportant les següents millores:

* Abans del desplegament, es fa una còpia de l'artefacte desplegat (backup)
* Un cop finalitzat el desplegament, és duu a terme un reinici de totes les instàncies afectades, amb esborrat de caché i temporals (segons pertoqui)
* Es comprova si l'aplicació queda en estat activa per a identificar possibles problemes al desplegament
* En cas d'error, es realitza marxa enrere automàtica

Aquesta modalitat s'aplica a desplegaments on-premise als entorns d'integració o preproductius, si i només si, el
proveïdor d'infraestructures (CPD) dona cobertura a les tecnologies requerides. En el cas dels entorns preproductius,
es requerirà conformitat prèvia on es sol·licitarà informació per a generar automàticament un tiquet
Remedy CRQ a mode d'auditoria del desplegament.

La sortida de logs per consola indicarà si el desplegament ha acabat bé o s'han produït incidències,
proporcionant tota la informació necessària per a identificar-ne el problema i un codi d'error que indicarà qui és
el responsable de revisar la incidència:

| Codi d'error | Responsable                        |
| ------------ | ---------------------------------- |
| \-1xx        | Equip SIC                          |
| \-2xx        | Proveïdor d'infraestructures (Cpd) |
| \-3xx        | Proveïdor d'aplicacions (lot)      |

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

Podrà accedir a **Jenkins** mitjançant el següent enllaç: https://cicd.sic.intranet.gencat.cat <br/>
Per a poder accedir via VPN cal assegurar que es disposa de connectivitat pel port 443/TCP i, en cas de no disposar de
connectivitat, caldrà obrir una petició demanant l'obertura de Tallafocs dels seus entorns.

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
Al final d'aquest log es mostrarà el resultat general de l'execució: SUCCES, FAILED o ABORTED, que serà notificat per correu
electrònic als responsables assignats.<br/>

### Execució de tasques

Les tasques s'executaran a demanda quan l'usuari iniciï el desplegament mitjançant l'opció `BuildWithParameters`.

### Etapes de desplegament

Els jobs multi-etapa realitzen multitud d'accions organitzades en STAGES. En cas de produir-se incidències a qualsevol de les
seves etapes el job es cancel·larà i es notificarà per correu electrònic.

![Nou projecte](/related/sic/3.0/pipeline-stages.png)

<br/>
A continuació s'explica breument cadascuna de les etapes previstes per al desplegament de components i aplicacions:

* **Init**: inicialitzacions internes.
* **Checkout**: descàrrega del codi font del projecte a l'espai de treball.
* **Prepare Builder**: construcció de la possible imatge Docker pròpia de Build que serà utilitzada, en la següent etapa, per a la compilació i construcció d'artefactes.
* **Build**: compilació i construcció d'artefactes en funció de la tecnologia i les eines emprades.
* **MultiStepBuild**: compilació i construcció d'artefactes que usen múltiples tecnologies.
* **Build Tag**: generació del tag de Build al repositori de codi. Aquest tag marca que es tracta d'una versió construïble. Per exemple: 1.0.0-B001.
* **Static Code Analysis**: enviament del codi font del projecte a l'eina d'anàlisi estàtic de codi de l'Oficina de Qualitat i comprovació de les corresponents [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/).
* **Security Test**: etapa prevista per a l'execució de tests de seguretat.
* **Unit Test**: etapa prevista per a l'execució de tests unitaris.
* **Release Tag**: generació del tag de Release Candidate al repositori de codi. Aquest tag marca que es tracta d'una versió desplegable. Per exemple: 1.0.0.
* **Artifact Archive**: etapa prevista per a l'arxivament dels artefactes generats.
* **Bake Validations**: per als desplegaments al cloud, validació prèvia de la imatge Docker de l'aplicació (DockerFile).
* **Image Bake**: per als desplegaments al cloud, construcció de la imatge Docker de l'aplicació (DockerFile).
* **Image Validations**: per als desplegaments al cloud, validació de vulnerabilitats de la imatge Docker de l'aplicació (DockerFile).
* Per a **entorns no productius** (Integració):

  * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn no productiu requereix conformitat prèvia, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn un cop verificades les etapes anteriors.
  * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn no productiu.
  * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn no productiu.
  * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn no productiu.
  * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn no productiu per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.
  * **Environment Tag**: generació del tag d'entorn al repositori de codi. Tag que marca que es tracta d'una versió desplegada a l'entorn corresponent. Per exemple: 1.0.0-integration.
* Per a l'**entorn de Staging** (Preproducció):

  * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn de Preproducció requereix conformitat prèvia o bé és necessari introduir informació per a la generació del tiquet Remedy CRQ, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn un cop verificades les etapes anteriors.
  * **ITSM Register**: generació automàtica d'un tiquet Remedy CRQ per a la traçabilitat dels desplegaments automàtics a l'entorn de Preproducció.
  * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn de Preproducció.
  * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn de Preproducció.
  * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn de Preproducció.
  * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn de Preproducció per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.
  * **Stress Test**: etapa prevista per a les proves de resistència a l'entorn de Preproducció per tal de verificar l'estabilitat i fiabilitat de l'aplicació.
  * **Acceptance Test**: etapa prevista per a les proves d'acceptació a l'entorn de Preproducció per tal de verificar que el sistema compleix les especificacions de negoci i és acceptable per al lliurament.
  * **Exploratory Test**: etapa prevista per a les proves exploratòries a l'entorn de Preproducció per tal de verificar els resultats obtinguts pels diferents casos de prova que es defineixin.
  * **Environment Tag**: generació del tag d'entorn al repositori de codi segons es tracta d'una versió desplegada a l'entorn corresponent. Per exemple: 1.0.0-preproduction.
  * **ITSM Close**: tancament automàtic del tiquet Remedy CRQ generat per a la traçabilitat dels desplegaments automàtics a l'entorn de Preproducció.
* Per a l'**entorn de Production** (Producció):

  * **<Environment>Deploy Confirmation**: si el desplegament a l'entorn de Producció requereix conformitat prèvia o bé és necessari introduir informació per a la generació del tiquet Remedy CRQ, l'usuari haurà d'aprovar manualment l'inici del desplegament a l'entorn un cop verificades les etapes anteriors.
  * **ITSM Register**: generació automàtica d'un tiquet Remedy CRQ per a la traçabilitat dels desplegaments automàtics a l'entorn de Producció.
  * **Prev-Deploy**: execució de possibles tasques prèvies al desplegament de l'aplicació a l'entorn de Producció.
  * **Deploy**: desplegament de l'aplicació segons la modalitat de desplegament aplicable a l'entorn de Producció.
  * **Post-Deploy**: execució de possibles tasques posteriors al desplegament de l'aplicació a l'entorn de Producció.
  * **Smoke Test**: etapa prevista per a la verificació ràpida a l'entorn de Producció per tal d'assegurar que l'aplicació funciona correctament i no té defectes evidents.
  * **Probe Test**: etapa prevista per a la verificació de sondes a l'entorn de Producció per tal d'assegurar que l'aplicació funciona correctament.
  * **Environment Tag**: generació del tag d'entorn al repositori de codi. Tag que marca que es tracta d'una versió desplegada a l'entorn corresponent. Per exemple: 1.0.0-production.
  * **Registry Label**: generació d'etiqueta "production" a la imatge del registre corporatiu d'imaatges. Etiqueta que marca que es tracta d'una versió desplegada amb èxit a producció.
  * **ITSM Close**: tancament automàtic del tiquet Remedy CRQ generat per a la traçabilitat dels desplegaments automàtics a l'entorn de Producció.

<div class="message information">
Les pipelines generades <b>no permetran execucions concurrents i els punts d'aprovació manual expiraran en 30 dies</b>.
<br></br>
</div>

### Versionat

La versió dels projectes ha de ser sempre **incremental**, és a dir, qualsevol nova actualització de codi lliurat al SIC ha
d'anar acompanyat d'un increment de la versió. Per tant, no es permetrà que el projecte desplegui una versió igual o inferior
a una versió prèviament desplegada. En cas contrari, es podria induir a error o confusió en els futurs desplegaments de
preproducció i producció. Per exemple, no se sabria quina versió d'integració està desplegada a l'entorn de preproducció.

### Artefactes generats i gestió de possibles marxes enrere

Com a resultat de la construcció es generarà un conjunt d'artefactes, bàsicament components estàtics i dinàmics.
Els artefactes no queden emmagatzemats a l'espai de treball pel que la marxa enrere passaria per
**recuperar la versió anterior del codi** del projecte per a que es tornin a construir i desplegar els artefactes anteriors.
Pel que fa als entorns de preproducció i producció, la marxa enrere es delegarà als procediments de desplegament realitzats per CPD.

### Integració amb ITSM

Es contemplen dues modalitats d'integració amb ITSM per a generar tiquet Remedy CRQ dels desplegaments als entorns de Preproducció i Producció:

* **Automàtica**: en el cas de modalitat de desplegament automàtic al cloud o delegat, i amb la informació proporcionada per l'usuari,
  el sistema s'encarrega de generar, actualitzar i tancar automàticament els tiquets Remedy CRQ associats a cada desplegament permetent
  la traçabilitat dels desplegaments sense que es requereixi cap intervenció manual per part de l'usuari.
* Mode **Draft**: en cas de modalitat de desplegament semiautomàtica, el sistema s'encarrega de generar una plantilla de petició de canvi
  que el proveïdor ha d'acabar de complimentar per a poder sol·licitar a Cpd el corresponent desplegament.

Amb aquestes dues modalitats d'integració, s'assoleix l'**objectiu de disposar de tota la informació necessària per a realitzar
l'auditoria de l'activitat dels desplegaments als entorns de Preproducció i Producció** de les aplicacions.

## Autoservei de pipelines

L'Autoservei de pipelines permet als usuaris la **generació de pipelines per a l'automatització de la construcció i el desplegament
de les aplicacions** a partir de la configuració d'una sèrie de fitxers en format YML. D'aquesta manera, els proveïdors d'aplicacions
disposen d'autonomia per a configurar el seu comportament.
Per a més informació: [Autoservei de pipelines](/plataformes/sic/serveis/sic30-serveis/autoservei-pipelines/)

## Matriu de tecnologies de construcció

Les tecnologies de construcció d'aplicacions serveixen per gestionar el cicle de vida d'una aplicació o algunes de les seves fases.
Aquesta normativa del SIC no invalida
l'[Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions),
ans al contrari, l'estén per a acabar de concretar els requeriments propis del SIC.

<div class="message information">
El SIC actualment utilitza la <a href="https://www.docker.com/">tecnologia Docker</a> per a disposar d'un entorn aïllat i immutable de construcció que, a més pugui ser utilitzat i testejat pels propis proveïdors.
Addicionalment, es contempla l'ús d'entorns propis de construcció proporcionats pels proveïdors (DockerFile) que opcionalment podran estendre del catàleg d'imatges corporatiu.<br/>
Veure: <a href="https://canigo.ctti.gencat.cat/plataformes/sic/serveis/sic30-serveis/registre-imatges/">Registre d'imatges corporatiu</a>.
</div>

<br/>
A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible d'entrada.

### Microsoft

| Versió .NET Core | Versió MSBuild |
| ---------------- | -------------- |
| 3.1              | 16.7           |
| 6.0              | 17.1           |
| 8.0              | 17.8           |


### Maven/JDK

| Versió Maven | Versió JDK               |
| ------------ | ------------------------ |
| 3.6          | 7<br />8<br />11-openjdk<br />17-openjdk |
| 3.9          | 17-openjdk<br />21-openjdk |


### Ant/JDK

| Versió Ant | Versió JDK |
| ---------- | ---------- |
| 1.8        | 8          |
| 1.10       | 8          |

### Node/npm

| Versió Node | Versió Npm |
| ----------- | ---------- |
| 4           | 2.15       |
| 6           | 3.10       |
| 8           | 6.4        |
| 10          | 6.11       |
| 12          | 6.12       |
| 14          | 6.14       |
| 16          | 8.19       |
| 18          | 8.19       |
| 20          | 10.1       |

L'única eina que va lligada en certa manera amb la versió de Node és **npm**. La resta d'eines de cicle de vida,
tals com **ng** de **[Angular](https://angular.io/)** (framework de frontend recomanat per Arquitectura CTTI i el CS Canigó),
**bower**, **gulp** i **grunt**, s'han de definir com a dependències a l'aplicació (fitxer `package.json`) i instal·lar-los
a la construcció de l'aplicació via **npm install**.

### Node/pnpm

| Versió Node | Versió pnpm |
| ----------- | ---------- |
| 20           | 8.15       |

Com a alternativa a Npm, per a Node 20 s'ofereix també la possibilitat d'utilitzar pnpm, [informació aquí](https://pnpm.io/), un gestor de paquets més lleuger.

### Hugo (Webs estàtiques)

| Versió |
| ------ |
| 0.27   |
| 0.49   |

## Matriu de desplegament en servidors (IAAS)

Si es volen fer servir les tasques de desplegaments automatitzats des de SIC, caldrà escollir la
modalitat de desplegament **[DELEGADA](/plataformes/sic/serveis/sic30-serveis/ci/#modalitats-de-desplegament)** per a que l’aplicació
es desplegui sobre un dels següents proveïdors d'infraestructures i tipus de servidor:

| Proveïdor | Tipus de servidor                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Cpd1      | \-                                                                                                                           |
| Cpd2      | \-                                                                                                                           |
| Cpd3      | Tomcat<br/>Apache<br/>Oracle                                                                                                 |
| Cpd4      | Tomcat<br/>Weblogic<br/>Java stand-alone<br/>JBoss<br/>Apache<br/>IIS.NET<br/>Oracle<br/>MySQL<br/>SQL Server<br/>PostgreSQL |

Les tasques d’execució de desplegament automatitzat fan un redesplegament de l’aplicació i no pas
un desplegament. Per tant, cal que l’aplicació ja es trobi desplegada prèviament.
La petició per a fer aquest primer desplegament de l’aplicació va a càrrec dels proveïdors de l’aplicació.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de **[Guies](/plataformes/sic/guies/sic30-guies/)**. <br/>
Si teniu qualsevol dubte o problema podeu revisar les **[Preguntes Freqüents](/sic/faq)** o utilitzar els canals de **[Suport](/sic/suport)**.
