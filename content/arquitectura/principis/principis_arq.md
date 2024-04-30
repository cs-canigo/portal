---
langs:
  - ca
  - es
title: Principis d'arquitectura de sistemes d'informació
title_breadcrumbs: "Versió vigent"
description: Normes i directrius generals destinades a informar i recolzar la forma en què CTTI vol que s'implementin els Sistemes d'Informació.
sections:
  - principis
imatge: /images/bloc/principis.png
valid_to: Versió actual
blog_tags:
  - directrius
aliases:
  - /principis
  - /principis/
  - /bloc/principis
  - /bloc/2015/11/principis
  - /blog/principis
  - /blog/2015/11/principis
  - /arquitectura/principis
  - /arquitectura/2015/11/principis
weight: "1"
---
## Introducció

Els principis d'arquitectura CTTI són les normes i directrius generals que guien l'estratègia tecnològica i estan destinades a ser perdurables i rarament modificables i tenen com a objectiu informar i recolzar la forma en què CTTI vol que es realitzi la selecció tecnològica així com la implementació de Sistemes d'Informació.

A continuació detallem quins són aquests principis:

## 0. Principis estratègics

Des d'un punt de vista d'arquitectura empresarial, l'arbre de decisió que guiarà la selecció de tecnologia per a noves solucions es basarà en el següent:
<br /><br />

### <center>SaaS > LowCode > Cloud Native</center>

<br />

* **Ús de SaaS preferentment**: per a solucions d'ús habitual a diferents indústries o casos de negoci concrets, on existeixen productes madurs i consolidats, seleccionarem productes SaaS, que extendrem amb els mecanismes que ofereixi el mateix producte per adaptar-lo a les necessitats dels processos de la Generalitat.
* Construcció mitjançant **plataformes LowCode**: en cas que un SaaS no cobreixi un percentatge important del procés de negoci, la següent preferència serà la construcció amb les [plataformes LowCode corporatives](/plataformes/lowcode/) o bé extendre alguna funcionalitat del SaaS amb aquesta tecnologia si els mecanismes del SaaS no ho permeten.
* Per últim, si no es pot cobrir amb SaaS ni LowCode, optarem per **desenvolupament Cloud Native**, això és, aprofitant els avantatges que ens proporciona el cloud: tecnologies serverless, serveis quant més administrats millor, ..., de manera que podrem utilitzar la tecnologia que millor s'adapta a la funcionalitat i a més, utilitzant només aquells recursos que són necessaris.

 I des de la mateixa perspectiva d'arquitectura empresarial, s'optarà sempre pel reaprofitament de **solucions i plataformes existents**.

## 1. Principis sobre el disseny d’aplicacions

**1.1 Segregació de funcions/responsabilitats**. Les aplicacions han d’estar estructuralment dividides en blocs independents per funcionalitats, processos de negoci o serveis, per tal d’evitar els monòlits. <span class="collapseMD" data-collapse-next="p ul"></span>

Aquest principi és d’aplicació a totes les capes. Una aplicació tipus pot dividir-se fàcilment, per exemple, en els següents mòduls:

* Públic general (internet)
* Col·laboradors externs (extranet)
* BackOffice (intranet)
* Processos batch
* Extraccions (ETL)

**1.2 Des del moment del disseny l'Arquitectura ha de ser desacoblada** per permetre als components i aplicacions mantenir-se completament autònoms i independents. <span class="collapseMD" data-collapse-next="ul"></span>

* 1.2.1 Components autònoms (separació de la frontend/presentació i el backend/negoci), es desenvolupen i es despleguen independentment.
* 1.2.2 Components independents, poden ser reemplaçats o actualitzats sense afectar a la resta de components, només mantenint la seva interfície de comunicació, la seva signatura.
* 1.2.3 Desacoblament entre aplicacions: cal evitar les relacions entre aplicacions que impedeixin el seu desacoblament. Per exemple, evitar relacions en l'àmbit de base de dades (utilitzar una base de dades per servei), evitar ús de llibreries i fitxers de configuració compartits, etc. En aquest sentit, el cloud ens ajuda a tenir elements dedicats per sistema d'informació, ja que la granularitat (potència, recursos, ...) dels components es pot ajustar al consum i no cal compartir entre sistemes.
* 1.2.4 Alta disponibilitat dels components: utilitzar els mecanismes d'alta disponibilitat que ofereixen els diferents serveis (p.e. balanceig per a la capa d'aplicacions, preferentment *stateless, o* bases de dades amb rèpliques de lectura o altres mecanismes de HA). 

**1.3 Arquitectura orientada a serveis**. Les aplicacions poden ser consumides externament (exposant la seva funcionalitat) o bé han d’integrar-se amb aplicacions de tercers. Les relacions s'han de dur a terme mitjançant patrons síncrons o asíncrons segons el cas (APIs REST, Event Driven, ...).

**1.4 Model de qualitat**, a l'hora de dissenyar un sistema cal incorporar aspectes qualitatius al cicle de vida, per més informació visitar el [Portal de Qualitat](https://qualitat.solucions.gencat.cat/).

**1.5 El cicle de vida serà automàtic**, tant de les aplicacions (Integració contínua - CI/CD) com de la infraestructura (Infraestructura com a Codi - IaC), així com la custòdia de codi que es farà als repositoris de la Generalitat. <span class="collapseMD" data-collapse-next="ul"></span>

* 1.5.1 Totes les aplicacions han de tenir custodiat el codi font a algun dels repositoris oficials de la Generalitat.
* 1.5.2 Totes les aplicacions han d'estar preparades per ser desplegades de forma automàtica utilitzant les eines proporcionades pel [Sistema d'Integració Continua](/plataformes/sic/about/).
* 1.5.3 Els components a desplegar han de ser els mateixos per tots els entorns. Per tant, el que s'hagi desplegat a Integració o Preproducció s'ha de poder desplegar a Producció sense necessitat de fer-hi canvis. Això implica que les configuracions depenents de l'entorn han d'injectar-se en temps de desplegament com a variables d'entorn i no en temps de construcció.	
* 1.5.4 Les aplicacions que es depleguin a cloud públic es faran sota el paradigma d'Infraestructura com a Codi (IaC)
* 1.5.5 Les aplicacions han de ser concebudes des del seu disseny per no requerir operació (NoOps). Totes les accions que pugui requerir l'aplicació per la seva evolució (desplegaments) i manteniment (tasques operacionals) han d'estar degudament automatitzades.

**1.6** **[Solucions transversals](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/)**. Es prioritzarà la utilització de solucions transversals en lloc de fer solucions a mida. S'ha d'evitar desenvolupar les funcionalitats que ja estan disponibles. <span class="collapseMD" data-collapse-next="p ul"></span>

A continuació es detallen algunes de les solucions transversals més esteses:

* **1.6.1 Ús del framework Canigo**. Per aplicacions JEE s'ha de fer ús del [Framework Canigó](/plataformes/canigo/framework/).
* **1.6.2 Servidors SMTP transversals**, utilitzar els servidors SMTP transversals (IronPort) com servidor SMTP per enviar correus des de les aplicacions. [Manual per a la integració SMTP](https://portic.ctti.gencat.cat/solucions/soltecnologiques/_layouts/15/WopiFrame.aspx?sourcedoc=%2Fsolucions%2Fsoltecnologiques%2FDocuments%2FLloc%20de%20Treball%2F10%2D02%2FCTTI%5F9%2E61%5FIntegraci%C3%B3%5FSMTP%5FIronPort%2Epdf&action=view)
* **1.6.3 Accés a internet des de xCAT**, per accedir a recursos internet des de servidors ubicats a la xarxa XCAT, és necessari utilitzar el ProxyPass, mai accedir directament a internet.
* **1.6.4 Gestió d'identitats**, les aplicacions han d’autentificar els usuaris tenint en compte els següents models: 	

  * 1.6.4.1 Col·lectiu Gencat: autentificació mitjançant ["GICAR"](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/gestio-didentitats/).
  * 1.6.4.2 Col·lectiu Híbrid (Gencat/Empreses): autentificació mitjançant ["GICAR"](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/gestio-didentitats/).
  * 1.6.4.3 Ciutadans: autentificació mitjançant ["VÀlid"](https://www.aoc.cat/serveis-aoc/valid/) d'AOC.	
* **1.6.5 Sistema de gestió del document electrònic** (**[SGDE](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/solucions-de-suport/sistema-de-gestio-del-document-electronic-sgde/)**), proporciona als Sistemes d’Informació, les principals funcions necessàries per al tractament i transformació del document electrònic, per tal de donar suport a l’intercanvi fiable i segur de documents i informació entre els ciutadans i la Generalitat de Catalunya.	
* **1.6.6 Gestor de continguts web** (**[GECO+](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/comunicacio-i-relacio/webs/geco/)**), permet crear i mantenir continguts i portals d'internet mitjançant un conjunt de peces i serveis comuns (framework).	
* **1.6.7 PICA - Plataforma d'interoperabilitat** (**[PICA](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/administracio-electronica/serveis-dintegracio-i-interoperabilitat/)**). Plataforma que permet l'accés a informació dels organismes de la Generalitat i altres administracions públiques i institucions, el consum de serveis comuns de tramitació, la integració entre els Sistemes d'Informació departamentals i la plataforma de tramitació corporativa. Tot sota criteris d'estandardització, rapidesa, senzillesa, seguretat i legalitat.
* **1.6.8 Tramitador d'ajuts i subvencions** (**[TAIS](http://ctti.gencat.cat/ca/ctti/solucions-corporatives/tramitacio-i-gestio-de-serveis/tais/)**). Sistema d'informació per a la gestió electrònica d'expedients de gestió de subvencions.

**1.7 Historificació de dades i fitxers**: des del punt de vista de FinOps i sobretot quan parlem de núvol públic, és obligatori plantejar mecanismes d’historificació de les dades (registres de base de dades, fitxers, objectes). Només s’ha de mantenir en emmagatzemaments “calents” allò que sigui necessari pel funcionament del procés de negoci o per aspectes normatius, la resta s’ha de passar a emmagatzematges “freds”.
asdadsa
## 2. Principis sobre la Tecnologia

**2.1 Continuïtat tecnològica**. Per a facilitar la segregació de responsabilitats i mantenibilitat de les aplicacions es proposa desacoblar frontend i backend, així com exposar la lògica necessària mitjançant serveis (REST principalment) <span class="collapseMD" data-collapse-next="ul"></span>

* 2.1.1 Per a la creació d’aplicacions orientades a serveis, els serveis (backend) exposaran el seu negoci mitjançant REST i en format JSON (REST permet ser consumit per qualsevol tecnologia que interpreti HTTP).
* 2.1.2 En el cas d’aplicacions web, la presentació estarà construïda amb tecnologies estàtiques  (html5/javascript/css) i consumirà els serveis que li proporcioni el backend. 

**2.2 Estabilitat de les versions de programari**. Les versions de les diferents peces (productes, llibreries...) que composen un sistema han de ser el més estables possible. S'ha de fer ús de versions LTS (Long-Term Support) o bé, o en la seva mancança, la GA (General Availability) o la nomenclatura que hagi donat el fabricant com a estable. Un sistema productiu no pot incorporar versions no consolidades (snapshot, alpha, beta, release candidate, milestone...) dels components que en formin part. 

**2.3 Interoperabilitat**. S'ha de garantir l'intercanvi d'informació i dades entre sistemes, amb patrons síncrons o asínrons, i aquest es farà preferentment amb les plataformes corporatives orientades a aquest ús: [API Manager](/plataformes/apim/) i [EventHub/Kafka](/related/eventhub/WelcomePackKafka_latest.pdf).

**2.4 [Els estàndards de qualitat](https://qualitat.solucions.gencat.cat/estandards/)** definits pel CTTI són aplicables al desenvolupament, manteniment i ús de les solucions TI de la Generalitat de Catalunya. <span class="collapseMD" data-collapse-next="p ul"></span>

A continuació es llisten els relacionats amb els principis d'arquitectura:

* **2.4.1 Full de ruta**. Davant solucions estàndard s’utilitzaran preferentment els components que es troben al [Full de Ruta](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) en la versió "versió actual CTTI". Aquest fet no exclou que per a noves solucions es puguin proposar altres tecnologies que, eventualment, podran passar a formar-ne part. La reutilització d'infraestructura ja existent no eximeix del requeriment d'actualitzar el programari en cas que aquest ja no estigui suportat pel fabricant.
* **2.4.2 Principis de la guia Web Gencat**, són d'aplicació els principis detallats a la [Guia Web Gencat per aplicacions orientades a la ciutadania.](http://guiaweb.gencat.cat/ca/inici/). 
* **2.4.3 Nomenclatura de dominis**, respectar les nomenclatures de noms de dominis del document [Estàndards Dominis DNS](https://qualitat.solucions.gencat.cat/estandards/estandard-dominis-dns/).
* **2.4.4 Nomenclatura de les infraestructures**, s'ha de complir l'estàndard pel que fa al nom de les infraestructures detallat al document [Estàndard nomenclatura infraestructures](https://qualitat.solucions.gencat.cat/estandards/estandard-nomenclatura-infraestructures/).

**2.5 Ús de Cloud Públic**. S'ha de plantejar l'ús de cloud públic preferentment vs l'ús d'entorns d'execució onpremise. <span class="collapseMD" data-collapse-next="ul"></span>

* La comunicació entre sistemes desplegats a núvol públic amb sistemes desplegats on-premise només es pot fer via les interfícies de servei que el sistema exposi (APIs).

**2.6 Ús de protocols segurs** per a les aplicacions publicades, així com d'altres mecanismes per a evitar atacs de DDoS, SQL Injection, Cross Site Scripting i d'altres. També s'ha de valorar per a aplicacions crítiques l'encriptat de dades en repòs.	

**2.7 Mateixa arquitectura per Preproducció i Producció**. Per a què les proves fetes a preproducció tinguin validesa, és necessari que els entorns de preproducció i producció siguin idèntics pel que fa al disseny, encara que els recursos assignats a preproducció siguin inferiors. En aquest cas, l'ús de cloud públic i infraestructura com a codi facilitarà la replicabilitat i equivalència d'entorns.

## 3. Principis sobre el cost i manteniment de les solucions

**3.1 Optimització de costos**, pensar en els costos i en la seva optimització, sobretot ajustant el recursos necessaris, establint polítiques d'escalat i utilitzar serveis que es puguin apagar quan no s'usen. <span class="collapseMD" data-collapse-next="ul"></span>

* 3.1.1 Monitoritzar els serveis per a identificar necessitats d’ampliació o reducció de recursos i poder ajustar els costos en conseqüència.
* 3.1.2 Dissenyar l’arquitectura amb una planificació de les càrregues de treball òptima en costos, de forma que s’equilibrin quan sigui possible les finestres d’execució dels components (online, extraccions, analítica, processos batch ...), per evitar els pics de càrrega i que es reparteixi de forma balancejada segons les necessitats del negoci.
* 3.1.3 Arquitectura mínima. Cal tenir en compte l’escalabilitat i fer una previsió (mínim 1 any) amb l’objectiu d’aconseguir una arquitectura sostenible en el temps.

**3.2 Benefici màxim al menor cost i risc possible**. Cal tenir presents els costos d’infraestructura i el model de llicenciament requerits per a posar en marxa una solució, ja que representen un cost recurrent. A l'hora de concebre una solució s’ha d’identificar quin tipus de llicenciament serà el millor per la solució desitjada. Quan s’escull un producte (opensource o comercial) en modalitat SaaS, es tria construir amb plataformes LowCode, o bé s'acaba decidint fer un desenvolupament a mida, cal fer una avaluació del cost vs. benefici de l’opció triada respecte a les altres: 

* 3.2.1 Per a problemes comuns, utilitzar solucions basades en productes "Opensource", preferentment en modalitat SaaS. 
* 3.2.2 Per a problemes poc comuns, comprar, preferentment en modalitat SaaS. 
* 3.2.3 Per a problemes únics, construir amb LowCode o desenvolupar a mida, en modalitat cloud native preferentment.

**3.3 Impacte d’actualització**, pensar en l’impacte d’actualització que pugui tenir un canvi de sistema operatiu, middleware o producte allà on s'executa l’aplicació: quant menys acoblament amb el sistema de base i més utilització d’estàndards existeix, més senzilla serà l’actualització o l’ampliació de funcionalitats de l’aplicació. 
Per exemple, containeritzar les aplicacions per a aïllar-les de l'entorn d'execució i incloure-hi les seves dependències a l'artefacte.
