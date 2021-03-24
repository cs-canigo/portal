+++
date        = "2021-03-19"
title       = "Guia d'ajuda a l'hora d'omplir un DA"
description = "Ajuda a l'emplenat de la plantilla DA"
sections    = "Document Arquitectura"
weight      = 3
categories  = ["Document Arquitectura","DA","Plantilla"]
+++

Plana web per ajudar a l'emplenat de la plantilla del document d'arquitectura, els següents apartats són accessibles des de la pròpia plantilla.

# Disposicions prèvies 

Enumerem a continuació diferents indicacions a tenir en compte a l'hora d'informar un DA:

* **Estructura del DA:** No està permès modificar l'estructura del DA. En el que un punt opcional no s'informi, indicar NO APLICA en comptes d'esborrar aquest punt. Si està permès, per contra, afegir punts per sota del segon nivell (per exemple a la vista de Desplegament -punt 2.6- afegir un nivell per sota seria "2.6.1").
* **Versió de la plantilla:** Com a mínim, la versió de la plantilla ha d'èsser la 2.0, però es desitjable fer servir la versió més actual.
* **Dades de l'aplicació (Codi de Diàleg i Nom):** S'han d'informar, com a mínim, aquestes dues dades. En el cas de sistemes d'informació nous, si encarà no se sap el codi de diàleg, es pot no informar, però cal indicar que aquesta dada no es coneix encara.
* **Dades de les revisions del document, l'autoria i el responsable del CTTI:** Les versions han de quadrar amb el quadre resum i el quadre de detall de canvis. A més es valida que el nom de l'Arquitecte estigui a la llista d'Arquitectes autoritzats pels lots.
* **Arquitecte que redacta i/o revisa el DA:** Al menys un d'ells (si no son el mateix) han d'estar a la llista d'Arquitectes autoritzats per els diferents lots.

# Introducció 

## Propòsit {#Proposit}
Explicar quin es el propòsit del Servei o Sistema d'Informació definit al DA i quines necessitats cobreix/cobrirà l'aplicació dintre del Departament u Organisme responsable.

**Exemple**
*El propòsit, en el cas d'haver de redactar el DA de Microsoft Outlook, seria "Gestionar les bústies de correus dels usuaris".*

## Abast {#Abast}
Indicar, relacionat amb el punt anterior, com el Sistema d'informació donarà servei o cobrirà la necessitat indicada en el punt anterior. S'ha d'explicar, a grans trets, com serà aquest sistems d'informació e identificar els consumidors d'aquest Sistema.

**Directrius**
*En aquest punt ha de quedar clar que es fa per aconseguir l'objectiu i quins son els consumidors de l'aplicació o servei (Interns Gencat, Col·laboradors Externs  o Públics).*

## Necessitats fonamentals {#NecessitatsFonamentals}
Llistats dels requeriments/necessitats fonamentals que ha de cobrir l'arquitectura de la solució/servei. Son els punts que condicionaran tota l'arquitectura.

**Exemple**

* *Es necessari l'accés al servei des de Intranet i Internet.*
* *Es requereix alta disponibilitat a totes les capes de la infraestrcutura.*
* *Es necessari l'ús d'una base de dades relacional.*
* *Es necessari l'ús del servei transversal de e-Formularis.*

## Restriccions i requisits no funcionals {#RestriccionsRequisitsNoFuncionals}
Informar els requisits que tenen en compte aspectes de la solució fora de la seva funcionalitat i que son importants o rellevants per l'arquitectura.

## Parts interessades {#PartsInteressades}
Identificar i descriure les parts interessades per a l'arquitectura. S'han d'informar totes les parts que estan involucrades ja no en la confecció del document, si no amb el servei.

# Vistes 

## Vista Context: {#VistaContext}

### Diagrama de Context {#DiagramesContext}

**Exemple**
![Exemple Diagrama Context 1](/images/PlantillaDA/Exemple_Context.JPG)

![Exemple Diagrama Context 2](/images/PlantillaDA/Exemple_Context_2.JPG)

**Directrius o requeriments a l'hora de realitzar el diagrama**
* *Sistema.*
* *Entitats externes al Sistema.*
* *Interfícies (activitats que realitzen en la interacció amb les entitats externes).*
* *Localitzacions.*

### Entitats externes a nivell Funcional {#EntitatsExternesNivellFuncional}
Definir les dependències del servei que es detallen al DA. Tant d'entrada com de sortida, tot explicant el tipus de comunicació entre aquestes dependències i el sistema d'informació. Caldrà tenir en compte sempre les eines transverals existents a la Generalitat. Si una solució transversal pot cobrir aquestes dependències, aquesta eina transversal haurà de ser l'escollida.

Caldrà també que aquestes dependències no siguin realment acoblaments entre aplicacions. Si fos així, aquestes dependències haurien de substituir-se per serveis. Cal que el CPD de cada sistema estigui informat.



### Actors {#Actors}
Enumerar els diferents actors que apareixen al diagrama de context i detarllar-ne la descripció d'aquests. A més, caldrà explicar com s'autentiquen al Sistema.

## Vista Funcional: {#VistaFuncional}

### Diagrama Funcional {#DiagramaFuncional}

**Exemple**
![Exemple Diagrama Funcional 1](/images/PlantillaDA/Exemple_Diagrama_Funcional.JPG)

**Directrius o requeriments a l'hora de realitzar el diagrama**
* *Sistema amb les seves funcionalitats segregades, sempre que no sigui una aplicació monolítica (cosa que aniría en contra del principi d'Arquitectura 1.1.*
* *Entitats externes al Sistema.*

### Estructura funcional interna del sistema {#EstructuraFuncionalInternaSistema}
Detallar quina es l'estrcutura interna de l'aplicació. Segons el principi d'arquitectura 1.1, les aplicacions han d'estar segregades per funcionalitat/responsabilitat per evitar monolits. Detallar en aquest punt quina es aquesta estructura interna de l'aplicació.

**Directrius**
* Verificar que aquestes relacions no suposin acoblaments entre serveis. Ni que es tracti d'eines transversals del CTTI com GICAR o l'Antivirus corporatiu. Cal una breu descripció dels diferents mòduls e interfícies que el sistema fa servir.
* Verificar que l'aplicació te mòduls separats per funcionalitat. Que es defineixen mòduls amb una petita descripció de cada mòdul (2-3 línies).

[comment]: <### Justificacions de les decisions del model Funcional {#JustificacionsDecisionsModelFuncional}>

## Vista d'Informació: {#VistaInformacio}

### Dades de caràcter personal {#DadesCaracterPersonal}
Ha d'estar contestat i que tingui sentit amb els punts "Finalitat i ús de les dades (RGPD)" i "Nivell de RGPD assignat al fitxer".

### Finalitat i ús de les dades (RGPD) {#DadesCaracterPersonal}
Ha d'estar contestat i que tingui sentit amb els punts "Dades de caràcter personal" i "Nivell de RGPD assignat al fitxer".

### Nivell de RGPD assignat al fitxer {#NivellRGPD}
Ha d'estar contestat i que tingui sentit amb els punts "Dades de caràcter personal" i "Finalitat i ús de les dades (RGPD)".

**Quines dades es consideren Bàsiques:**

* Dades identificatives (nom, cognoms, DNI, correu electrònic, adreça, telèfon, IP)
* Dades econòmiques (comptes bancaris, targetes de crèdit, nòmines,...)
* Característiques físiques
* Característiques personals (estat civil, edat, sexe, nacionalitat,...)
* Dades acadèmiques o professionals

**Quines dades es consideren Especialment protegides:**

* Origen ètnic o racial
* Opinions polítiques
* Conviccions religioses o filosòfiques
* Afiliació sindical
* Dades biomètriques
* Dades relatives a la salut
* Dades relatives a la vida sexual o orientacions sexuals
* Dades relatives a condemnes i infraccions penals
* Dades de geolocalització
* Dades financeres

### Nivell de sensibilitat de les dades {#NivellSensibilitatDades}

* **MOLT CRÍTIC:** La informació és altament confidencial, accessible per un nombre molt restringit d’individus, amb requeriments d’integritat, autenticitat i traçabilitat molt alts? (exemples: dades de Seguretat Pública, informació policial, gestió de claus criptogràfiques, etc.)

* **CRÍTIC:** La informació és confidencial, restringida a un cercle reduït d’individus, amb requeriments de xifrat i traçabilitat dels accessos?
  
	**Exemples**
	*Gestió de centres penitenciaris, eleccions, gabinets jurídics, subvencions, contractacions, plataformes transversals de suport a la tramitació, actuació de cossos d'emergències, inventari d'infraestructures crítiques, plans de protecció civil, etc.*
	
* **SENSIBLE:** La informació és restringida a àrees o unitats amb requeriments avançats de control d'accés i garanties d'integritat i autenticitat? 
    
	**Exemples** 
	*Registre de ciutadans amb dades acadèmiques, sistemes de gestió de personal, llistes de col·lectius, la divulgació de les quals podria tenir repercussió política, registres d'empreses amb informació reservada, gestió de dades pressupostàries i econòmic-financeres, gestió del deute, sistemes d’ anàlisi de dades: estadístiques de serveis/operativa i quadres de comandament, actuacions de cossos operatius de la Generalitat (exceptuant els d'emergències), gestió de flotes d'emergència, tràmits de pagament on-line, tràmits electrònics i portals de tràmits, auditories, gestió de riscos, plans de continuïtat de negoci, assistència jurídica, gestió de la publicació d’informació (previ a la publicació)*

* **INTERN:** Hi ha informació no crítica on es pot permetre una lleu pèrdua d'integritat e informació? 
	
	**Exemples** 
	*Intranets departamentals, plataformes col·laboratives, fòrums, blogs, registres de professionals, convocatòries, concursos de personal, oposicions, usuaris d'aplicació, assistents a cursos, entrada/sortida de documents, gestió d'inventaris, qüestions parlamentàries, plecs, plans d'actuació, gestió de compres, consultes i suggeriments, queixes sense dades sensibles, infraestructures, expedients sense informació anterior, etc.*
	
* **PUBLIC:** La informació és pública sense restriccions de difusió del contingut.

### Requeriment legal de retenció de les dades {#RequerimentLegalRetencióDades}
Indicar el temps requerit de retenció de la informació per motius legals o anàlisis històric. En el cas d'escollir l'opció "Altres" cal tenir en compte que s'haurà de pactar amb CPD.

### Model d'emmagatzemat de la informació {#ModelEmmagatzematInformació}
Identificar els tipus de bases de dades utilitzats. En cas d'escollir més d'un tipus de base de dades caldrà especificar per a que es fa servir cada tipus de base de dades. Les dades descrites en aquest punt han de quadrar amb la Vista de Desplegament (2.6)

### Volumetries esperades d'informació {#VolumetriesEsperadesInformació}
Permet justificar l'estimació de tamany a la vista de desplegament. Tot i tractar-se d'una valoració aproximada o estimativa, la resposta a aquest punt ha de ser resultat d'una reflexió prèvia. No es demana un número sense més, si no producte d'una estimació bassada en un anàlisi encara que sigui a alt nivell.

### Diagrama Entitat/Relació {#DiagramaEntitatRelació}
Diagrama de les principals entitats de dades del servei o solució.

### Entitats de referència {#EntitatsReferència}
En cas de fer servir entitats de referència, enumerar aquelles que en fa ús el servei/solució. [Llistat de les entitats identificades](https://canigo.ctti.gencat.cat/dadesref/dadesref/).

### Diagrama de flux {#DiagramaFlux}
Diagrama de Flux de la informació.

## Vista de Concurrència: {#VistaConcurrencia}

### Usuaris Simultanis {#UsuarisSimultanis}
Estimar quants usuaris poden accedir simultàniament al sistema d'informació

### Identificació de processos {#IdentificacióProcessos}
Validar que la proposta per administrat les tasques o procesos batch permeti monitoritzar la seva correcta execució. No serveix una execució amb Cron que no dona cap garantia d'execució.

**Directrius**
*Aquest es el punt per informar sobre aquests processos. No pot aparèixer a cap altre punt del DA. Si això passa, remetrem a que s'informi aquí.*

[comment]: <### Relacio/Comunicació entre processos {#RelacioComunicacióEntreProcessos}>

## Vista Desenvolupament: {#VistaDesenvolupament}

### Tecnologies de desenvolupament {#TecnologiesDesenvolupament}
Detallar quines tecnologies s'utilitzen per cada una de les capes.

**Directrius**
* *En cas d'aplicacio JEE s'ha de fer ús del Framework Canigó*
* *En el cas de desenvolupament en .Net, i en cas de ser una app nova, s'ha de dur a terme amb .NetCore*
* *S'ha de respectar el principi d'Arquitectura 2.2 ([Estabilitat de les versions de programari](https://canigo.ctti.gencat.cat/principis/arq-si/))
  
### Identificar software/llibreries de tercers utilitzat {#IdentificarSoftwareLlibreriesTercersUtilitzades}
Identificar aquelles llibreries que no estan en un repositori confiable.

[comment]: <### Principis i estàndards seguits en el disseny i desenvolupament del codi {#PrincipisEstandardsSeguitsDissenyDesenvolupamentCodi}>

### Repositori de codi {#RepositoriCodi}
Informació del repositori on es pujarà el codi font i detalls respecte als artefactes a desplegar al GitLab. Ha d'esser un (com a mínim) d'aquests. Es pot donar el cas que el codi estigui a un repositori general i que també estigui en un altre dels repositoris.
* Repositori Generals
* Repositoris particulars Departamentals
* Altres / Excepcions

**Directrius**
*S'ha de proporcionar tota la informació necessària per agilitzar al màxim la integració des de Suport SIC.*

*La integració amb el SIC, si no es així caldrà donar d'alta una excepció d'arquitectura, excepte en el cas de tractar-se d'un producte comercial en comptes d'un desenvolupament a mida.*

### Identificar Jocs de caràcters {#IdentificarJocsCaràcters}
S'ha d'informar obligatòriament.

### Justificacions de la vista de desenvolupament {#JustificacionsVistaDesenvolupament}
Cal que cadascuna de les tecnologíes estigui aquí enumerada i justificada la seva utilització.

### Diagrama Desenvolupament {#DiagramesDesenvolupament}

**Exemple**
![Exemple Diagrama Desenvolupament 1](/images/PlantillaDA/Exemple_Diagrama_Desenvolupament.JPG)

## Vista Desplegament: {#VistaDesplegament}

### Diagrames de plataforma d'execució i de Xarxa {#DiagramesPlataformaExecucioXarxa}
Afegir diagrames que ajudi a entendre quina es l'arquitectura de la infraestructura.

**Directrius**
*Cal que estigui informat i son clarament identificables tots els elements indicats a les taules d'aquesta mateixa vista. Si els esquemes de PRE i PRO son diferents, s'han de presentar dos diagrames.*

### Taula de Cloud Privat {#TaulaCloudPrivat}
S'ha de crear una taula com la de la plantilla per cada un dels entorns que formen part del servei. Aquesta taula es farà servir per a les instàncies on-premise.

**Detall de cada un dels camps de la taula:**
#### Identificador d'instància
Identificador únic que se li dona a aquella instancia dintre del document d'arquitectura, aquest identificador s'utilitzarà després per referenciar la instancia a la taula d'emmagatzematge i a l'apartat 4.4 on s'ha d'identificar quins servidors / instancies són noves, quines han tingut canvis o quines són compartides amb altres serveis / solucions del departament.

#### *1 Tipus de Servei {#TipusServei}
* PaaS
* IaaS
* Hosting

#### Programari i versió
Nom del programari i versió que s'instal·la. Ha d'estar alineat amb el full de ruta del programari. En cas de sistemes/serveis nous, caldrà que les versions siguin les actuals segons el [Full de Ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#annex-a-normatiu-programari-estandarditzat:29540b9fba4cb00170570a076b9df531).
 
#### Talla i recursos adicionals
Indicar la talla de la instancia segons la següent taula i especificar si es necessari afegir algun recurs addicional com pot ser vCPUs o Gb de ram.
![Taula de talles](/images/PlantillaDA/Talles.JPG)

#### *2 Possibles opcions de Nivell de Servei {#NivellServei}
* Continu - AD	24x7   
* Continu	24x7
* Laboral - AD	12x5
* Laboral	12x5
* No productiu	12x5

### Taula d'emmagatzematge {#TaulaDisc}

**Detall de cada un dels camps de la taula:**
#### Identificador d'Instància
Per relacionar la taula d'elements de catàleg cloud amb el disc addicional es fa us d'aquest camp, ha de coincidir amb l'identificador de la instancia que se li ha donat a la taula anterior.

#### *3 Tipus de disc {#TipusDisc}
* Blocs: Aquest tipus d’emmagatzematge està especialment pensat per quan es necessita una capacitat de disc dur en brut, com per exemple, espai per a una BBDD Oracle.
* Fitxers: Aquest tipus d’emmagatzematge està especialment pensat per quan l’usuari necessita accés a una carpeta compartida de fitxers.

#### Mida del disc
Indicar la mida en Gb del disc adicional necessari per la instancia indicada al camp "Identificador d'Instancia"
 
#### *4 Tier - Nivell de disc  {#NivellDisc}
* Alt rendiment (TIER 1). Dades d’alta criticitat, fitxers que s’accedeixen sovint, etc.
* Mig rendiment (TIER 2). Fitxers que no s’accedeixen gaire sovint. 
* Alta Capacitat (TIER 3). Copies de seguretat.

#### *5 RTO i RPO {#RTORPO}
* RTO: 2 hores / 8  hores / 12 hores
* RPO: RPO Zero (No pot perdre cap transacció) /  RPO Darrer Backup

### Taula de Cloud Públic {#TaulaCloudPublic}
Taula on es detalla la informació relativa als contenidors que formen part del servei.

**Detall de cada un dels camps de la taula:**
#### Identificador d'instància
Identificador únic que se li dona a aquella instancia dintre del document d'arquitectura, aquest identificador s'utilitzarà després per referenciar la instancia a l'apartat 4.4 on s'ha d'identificar quins servidors / instancies són noves, quines han tingut canvis.

#### Nombre de Pods / Contenidors
Un POD es la unitat mes petita a crear a Kubernetes, en la majoria dels casos un POD equival a un contenidor, en aquest camp s'ha d'indicar el nombre de pods a crear del tipus que es detalla a la resta de camps de la taula.

#### Programari i versió / Imatge Docker
Nom del programari i versió que s'instal·la. Ha d'estar alineat amb el full de ruta del programari. Si es fa ú d'una imatge Docker ja existent al repositori oficial, indicar el seu nom.

#### Memòria Ram  i/o recursos addicionals
Memòria Ram assignada al Pod / Contenidor.
En algunes plataformes de cloud es requereix altre tipus de dades de recursos addicionals, per exemple CPU.

#### Disc Persistent
Indicar si es necessari o no disc persistent, en cas afirmatiu s'ha d'informar de la mida del disc en Gb.

#### Administrat per CPD
Indicar si el Pod / Contenidor es administrat per part del proveïdor de CPD o no disposa d'administració.

### Altres dades rellevants pel desplegament:

#### Xarxes d'accés
Informar de quines son les xarxes que s'utilitzen per l'acces a l'aplicació, protocol utilitzat i regles de firewall necessaries per connectar els diferents equips.

**Directrius**
*En el cas de fer crides a serveis REST, cal fer ús de ports segurs*

#### Servei transversal SMTP
Verificar si el servei necessita realitzar enviaments de correus electrònics

**Directrius**
*Principi d'Arquitectura 1.6.2 (Servidors SMTP transversals - https://canigo.ctti.gencat.cat/principis/arq-si/)*

#### ProxyPass (Sortida a Internet)
Informar si el servei necessita sortida a internet. Fent crides altres serveis per executar processos o obtenir informació.

**Directrius**
*Principi d'Arquitectura 1.6.3 (Accés a internet des de xCAT - https://canigo.ctti.gencat.cat/principis/arq-si/)*

#### Altres serveis tècnics utilitzats
Informar si es fan servir d'altres serveis tecnics com els protocols IMAP o POP3

### Justificacions de les decisions de la Vista de Desplegament
Cal que cadascuna de les tecnologíes estigui enumerada i justificada la seva utilització. A més, cal indicar quins entorns hi ha (INT, PRE, PRO, FOR)

## Vista Operacional: {#VistaOperacional}

### Gestió de logs i monitorització {#GestióLogsiMonitorització}
Detallar informació respecte als següents punts:
* Quina activitat ha de ser registrada per poder obtenir la informació crítica del servei.
* Gestió d'alertes.
* Monitoratge del rendiment.
* Rotació dels logs i polítiques de retenció.
* La ubicació del logs (ha de ser l'establerta als estàndard CTTI)"

### Polítiques de rotació i retenció de logs {#PolitiquesRetencio}

* **Estàndard:** Diària incremental amb 2 setmanes de retenció, setmanal completa amb 1 mes de retenció, mensual completa amb 3 mesos de retenció i anual completa amb 1 any de retenció (cobrint 1 any i 3 mesos de retenció de dades)

* **Avançada:** Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 6 mesos de retenció i anual completa amb 2 anys de retenció (cobrint 2 anys i 6 mesos de retenció de dades)

* **Especial:** Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 12 mesos de retenció i anual completa amb 5 anys de retenció. (cobrint 6 anys de retenció de dades)

### Ubicació de logs {#UbicacióLogs}
Indicar a on s'ubicarán els logs.

**Directrius**
*Principi d'Arquitectura 2.4.4 ([Nomenclatura de les infraestructures](https://canigo.ctti.gencat.cat/principis/arq-si/))*

*Cal respectar l'estandart CTTI de nomenclatura ([Estandard CTTI per a la nomenclatura de les infraestructures](https://qualitat.solucions.gencat.cat/estandards/estandard-nomenclatura-infraestructures/))*

### Detall de les sondes {#DetallSondes}
Definició, si es que hi ha sondes que verifiquen el correcte funcionament del servei, de que estan controlant i que resultat s'espera per validar que el servei està funcionant correctament.

# Perspectives Transversals #

## Seguretat

### Mesures de seguretat bàsiques de Cesicat {#MesuresSeguretatBàsiquesCesicat}
Indicar que s'han llegit i es tindran en compte les mesures de seguretat vigents a l'hora d'implementar l'arquitectura del servei/solució.

**Mesures de seguretat vigents a l'hora d'implementar l'arquitectura del servei/solució:**
* Els entorns de Producció han d'estar separats de forma física i lògica dels entorns no productius.
* La solució ha de tenir les diferents capes de la infraestructura (Publicació, Aplicació, BBDD) segregades tant a nivell físic com lògic.
* La publicació de qualsevol aplicació oberta a internet s'ha de realitzar des d'una DMZ.
* L'aplicació no ha de ser accessibles des de Internet en entorns no productius.
* Les transmissions de dades en xarxes públiques han d'anar xifrades.
* Els servidors i middlewares han de complir amb les guies de versionat del CESICAT o, en el seu defecte, amb les guies de versionat del fabricant.
* Només s'han d'obrir aquells ports que siguin estrictament necessaris per l'ús del sistema d'informació.
* Cal realitzar una anàlisi tècnica de vulnerabilitats de la infraestructura dels diferents entorns abans de la seva posada en producció.
* S'ha de realitzar una anàlisi tècnica de vulnerabilitats dels frontals web abans de la posada en producció.
* Cal disposar de traçabilitat (traces d'aplicació i d'administració) de les accions que es realitzen en l'aplicació.
* Cal definir la matriu d'escalat per la gestió dels incidents de seguretat.
* L'autenticació a l'aplicació s'ha de realitzar utilitzant mecanismes corporatius (GICAR, VALID, ...).
* Els entorns no Productius no poden contenir dades reals o aquestes han d'estar anonimitzades.
* Si l'aplicació només és utilitzada pels empleats de la Generalitat, aquesta no hauria d'estar publicada fora de la xarxa corporativa.

### Sistema d'autenticació {#SistemaAutenticació}
Indicar el sistema d'autenticació que el servei fa servir per permetre l'accés a aquest

**Directrius**
*Principi d'Arquitectura 1.6.4 ([Gestió d'identitats](https://canigo.ctti.gencat.cat/principis/arq-si/))*

*En els nous serveis es obligatori la integració amb GICAR. En cas contrari caldrà excepció d'Arquitectura."*

### Modalitat d'integració amb GICAR {#ModalitatIntegracióGICAR}
Definir quina modalitat d'integració amb GICAR s'està fent servir

**Directrius**
*Per més detall de cada una de les modalitats consultar el [Portal Canigó](https://canigo.ctti.gencat.cat/gicar/)*

## Rendiment i escalabilitat

### Requeriments de rendiment continuar i davant pics {#RequerimentsRendimentContinuarDavantPics}
Detallar en quin percentatge de consum de recursos es tenen que mantenir els servidors en un ús normal i quin es el máxim d'ús en una situació de pic.

### Mesures adoptades per tal d'assolir el rendiment necessari {#MesuresAdoptadesAssolirRendimentNecessari}
L’aplicació està preparada per l’escalabilitat horitzontal?

## Disponibilitat

### RTO del Sistema {#RTO}
Temps que pot estar el negoci amb el servei aturat.

**Directrius**
*En cas d'escollir un RTO de 2 hores, totes les instàncies de l'arquitectura hauran d'estar en Alta Disponibilitat.*

### RPO (Punt de recuperació objectiu) {#RPO}
En cas d’incidència quin es desitja que sigui el punt de recuperació.

### Definir horari de servei habitual  {#DefinirHorariServeiHabitual}
Laboral (12x5), Continu (24x7) o Altres (definir).

### Afectació per la indisponibilitat d'entitats externes {#AfectacióIndisponiblitatEntitatsExternes}
Presentar l'estudi de com afecta la indisponibilitat de les entitats externes al servei i proposar mesures per reduir o anular la seva afectació.

**Directrius**
*No s'ha d'informar la indisponibilitat en el cas d'eines transversals (GICAR, Ironports, antivirus, etc.) si no les entitats externes indicades a la Vista de Context.*

## Internacionalització

### Idiomes que suporta el sistema {#IdiomesSuportaSistema}
Enumerar l'idioma o idiomes que el servei ofereix.

### Definir com es resol l'ús multilingüe {#DefinirResolUsMultilingüe}
En cas que el punt anterior sigui informat amb mes d'un idioma, explicar com es resol aquest ús.

# Informació específica pel projecte d'aprovisionament #

**Directrius**
*Aquest punt del DA es l'únic que s'ha d'informar des del punt de vista del projecte i no des del punt de vista d'Arquitectura. Caldrà que sigui molt precís en els nous elements de la infraestructura del servei, en aquells que canvien de talla, o de versió de programari.*

## Informació relativa al context
### Informació relativa al context
En el cas de tractar-se de l'evolució d'un servei ja existent, en aquest apartat s'inclourà el detall de la integració amb serveis externs que en versions anteriors del DA no existien.

## Informació relaitva al SIC
### Informació relaitva al SIC
Dades específiques d'integració amb el SIC que no estiguessin fetes prèviament. Entorns a gestionar per el SIC, l'organització de les branques i el detall dels artefactes que el SIC desplegarà.

## Informació relativa a xarxes i dominis DNS
### Informació relativa a xarxes i dominis DNS
Definir aquelles regles de connectivitat que no estaven d'alta fins ara. Dominis DNS dels diferents entorns i aquelles pàgines que es volen protegir mitjançant GICAR.

## Informació relativa a l'aprovisionament d'Infraestructura
### Informació relativa a l'aprovisionament d'Infraestructura
Ha d'estar alineat amb la vista de Desplegament, tot indicant, mitjançant l'identificador d'instancies, quines es mantenen iguals, quines canvien en les seves característiques i quines son nous aprovisionaments, doncs abans no hi formaven part de la infraestructura.