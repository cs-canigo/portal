+++
date        = "2019-05-14"
title       = "Exemples i ajuda Plantilla DA"
description = "Ajuda a l'emplenat de la plantilla DA"
sections    = "Document Arquitectura"
weight      = 3
categories  = ["Document Arquitectura","DA","Plantilla"]
+++

Plana web per ajudar a l'emplenat de la plantilla del document d'arquitectura, els següents apartats són accessibles des de la pròpia plantilla.

## Vista Context: {#DiagramesContext}

![Exemple Diagrama Context 1](/images/PlantillaDA/Exemple_Context.JPG)

![Exemple Diagrama Context 2](/images/PlantillaDA/Exemple_Context_2.JPG)

## Vista Funcional: {#DiagramaFuncional}

![Exemple Diagrama Funcional 1](/images/PlantillaDA/Exemple_Diagrama_Funcional.JPG)

## Vista d'Informació: {#VistaInformacio}

### Nivell de RGPD assignat al fitxer {#NivellRGPD}

**Quines dades es consideren Bàsiques:**

- Dades identificatives (nom, cognoms, DNI, correu electrònic, adreça, telèfon, IP)

- Dades econòmiques (comptes bancaris, targetes de crèdit, nòmines,...)

- Característiques físiques

- Característiques personals (estat civil, edat, sexe, nacionalitat,...)

- Dades acadèmiques o professionals


**Quines dades es consideren Especialment protegides:**

- Origen ètnic o racial

- Opinions polítiques

- Conviccions religioses o filosòfiques

- Afiliació sindical

- Dades biomètriques 

- Dades relatives a la salut

- Dades relatives a la vida sexual o orientacions sexuals

- Dades relatives a condemnes i infraccions penals

- Dades de geolocalització

- Dades financeres


### Nivell de sensibilitat de les dades {#NivellDades}

- **MOLT CRÍTIC**	La informació és altament confidencial, accessible per un nombre molt restringit d’individus, amb requeriments d’integritat, autenticitat i traçabilitat molt alts? (exemples: dades de Seguretat Pública, informació policial, gestió de claus criptogràfiques, etc.)

- **CRÍTIC**	La informació és confidencial, restringida a un cercle reduït d’individus, amb requeriments de xifrat i traçabilitat dels accessos?
	(Exemples: gestió de centres penitenciaris, eleccions, gabinets jurídics, subvencions, contractacions, plataformes transversals de suport a la tramitació, actuació de cossos d'emergències, inventari d'infraestructures crítiques, plans de protecció civil, etc.))
	
- **SENSIBLE**	La informació és restringida a àrees o unitats amb requeriments avançats de control d'accés i garanties d'integritat i autenticitat? (Exemples: registre de ciutadans amb dades acadèmiques, sistemes de gestió de personal, llistes de col·lectius, la divulgació de les quals podria tenir repercussió política, registres d'empreses amb informació reservada, gestió de dades pressupostàries i econòmic-financeres, gestió del deute, sistemes d’ anàlisi de dades: estadístiques de serveis/operativa i quadres de comandament, actuacions de cossos operatius de la Generalitat (exceptuant els d'emergències), gestió de flotes d'emergència, tràmits de pagament on-line, tràmits electrònics i portals de tràmits, auditories, gestió de riscos, plans de continuïtat de negoci, assistència jurídica, gestió de la publicació d’informació (previ a la publicació))

- **INTERN**	Hi ha informació no crítica on es pot permetre una lleu pèrdua d'integritat e informació? 
	(Exemples: intranets departamentals, plataformes col·laboratives, fòrums, blogs, registres de professionals, convocatòries, concursos de personal, oposicions, usuaris d'aplicació, assistents a cursos, entrada/sortida de documents, gestió d'inventaris, qüestions parlamentàries, plecs, plans d'actuació, gestió de compres, consultes i suggeriments, queixes sense dades sensibles, infraestructures, expedients sense informació anterior, etc.)
	
- **PUBLIC**	La informació és pública sense restriccions de difusió del contingut.

### Mesures de seguretat bàsiques {#MesuresSeguretat}

- Els entorns de Producció han d’estar separats de forma física i lògica dels entorns no productius.
- La solució ha de tenir les diferents capes de la infraestructura (Publicació, Aplicació, BBDD) segregades tant a nivell físic com lògic.
- La publicació de qualsevol aplicació oberta a internet s’ha de realitzar des d’una DMZ.
- L’aplicació no ha de ser accessibles des de Internet en entorns no productius.
- Les transmissions de dades en xarxes públiques han d’anar xifrades.
- Els servidors i middlewares han de complir amb les guies de bastionat del CESICAT o, en el seu defecte, amb les guies de bastionat del fabricat.
- Només s’han d’obrir aquells ports que siguin estrictament necessaris per l’ús del sistema d’informació.
- Cal realitzar una anàlisi tècnica de vulnerabilitats de la infraestructura dels diferents entorns abans de la seva posada en producció.
- S’ ha de realitzar una anàlisi tècnica de vulnerabilitats dels frontals web abans de la posada en producció.
- Cal disposar de traçabilitat (traces d’aplicació i d’administració) de les accions que es realitzen en l’aplicació.
- Cal definir la matriu d’escalat per la gestió dels incidents de seguretat.
- L’autenticació a l’aplicació s’ha de realitzar utilitzant mecanismes corporatius (GICAR, VALID, ...).
- Els entorns no Productius no poden contenir dades reals o aquestes han d’estar anonimitzades.
- Si l’aplicació només és utilitzada pels empleats de la Generalitat, aquesta no hauria d’estar publicada fora de la xarxa corporativa.

## Vista Desenvolupament: {#DiagramesDesenvolupament}

![Exemple Diagrama Desenvolupament 1](/images/PlantillaDA/Exemple_Diagrama_Desenvolupament.JPG)

## Vista Desplegament:

### Taula de Cloud Privat {#TaulaCloudPrivat}
S'ha de crear una taula com la de la plantilla per cada un dels entorns que formen part del servei.
Detall de cada un dels camps de la taula:
#### Identificador d'instància
 Identificador únic que se li dona a aquella instancia dintre del document d'arquitectura, aquest identificador s'utilitzarà després per referenciar la instancia a la taula d'emmagatzematge i a l'apartat 4.4 on s'ha d'identificar quins servidors / instancies són noves, quines han tingut canvis o quines són compartides amb altres serveis / solucions del departament.

#### *1 Tipus de Servei {#TipusServei}
- PaaS
- IaaS
- Hosting

#### Programari i versió
 Nom del programari i versió que s'instal·la. Ha d'estar alineat amb el full de ruta del programari.
 
#### Talla i recursos adicionals
 Indicar la talla de la instancia segons la següent taula i especificar si es necessari afegir algun recurs addicional com pot ser vCPUs o Gb de ram.
 
 ![Taula de talles](/images/PlantillaDA/Talles.JPG)

#### *2 Possibles opcions de Nivell de Servei {#NivellServei}
- Continu - AD	24x7   
- Continu	24x7
- Laboral - AD	12x5
- Laboral	12x5
- No productiu	12x5

### Taula d'emmagatzematge {#TaulaDisc}

#### Identificador d'Instància
 Per relacionar la taula d'elements de catàleg cloud amb el disc addicional es fa us d'aquest camp, ha de coincidir amb l'identificador de la instancia que se li ha donat a la taula anterior.

#### *3 Tipus de disc {#TipusDisc}
- Blocs: Aquest tipus d’emmagatzematge està especialment pensat per quan es necessita una capacitat de disc dur en brut, com per exemple, espai per a una BBDD Oracle.
- Fitxers: Aquest tipus d’emmagatzematge està especialment pensat per quan l’usuari necessita accés a una carpeta compartida de fitxers.

#### Mida del disc
 Indicar la mida en Gb del disc adicional necessari per la instancia indicada al camp "Identificador d'Instancia"
 
#### *4 Tier - Nivell de disc  {#NivellDisc}
- Alt rendiment (TIER 1). Dades d’alta criticitat, fitxers que s’accedeixen sovint, etc.
- Mig rendiment (TIER 2). Fitxers que no s’accedeixen gaire sovint. 
- Alta Capacitat (TIER 3). Copies de seguretat.

#### *5 RTO i RPO {#RTORPO}
- RTO: 2 hores / 8  hores / 12 hores
- RPO: RPO Zero (No pot perdre cap transacció) /  RPO Darrer Backup

### Taula de Cloud Públic {#TaulaCloudPublic}
 Taula on es detalla la informació relativa als contenidors que formen part del servei.

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

## Vista Operacional:

### Polítiques de retenció {#PolitiquesRetencio}

- **Estàndard** - Diària incremental amb 2 setmanes de retenció, setmanal completa amb 1 mes de retenció, mensual completa amb 3 mesos de retenció i anual completa amb 1 any de retenció (cobrint 1 any i 3 mesos de retenció de dades)

- **Avançada** - Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 6 mesos de retenció i anual completa amb 2 anys de retenció (cobrint 2 anys i 6 mesos de retenció de dades)

- **Especial** - Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 12 mesos de retenció i anual completa amb 5 anys de retenció. (cobrint 6 anys de retenció de dades)
