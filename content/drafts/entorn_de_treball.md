+++
date        = "2021-03-26"
title       = "Principis d'arquitectura de l'entorn de treball"
description = "Arquitectura de l'entorn de treball"
sections    = ["drafts"] 
categories  = ["Data Architecture"]
weight= 5
+++


<style type="text/css">
img[alt="minipic"] { 
  max-width: 80px;
  float: left;
  padding-right: 15px;
}
img[alt="centrar"] { 
  margin: auto;
  max-width: 75%;
  display: block;
}
</style>


<img src="https://cburgales.github.io/CTTI/images/ET_Banner5.png" alt="centrar" usemap="#planetmap">


<map name="planetmap">
  <area shape="rect" coords="15,275,170,320" alt="Sun" href="#1-solucions-escriptori-del-lloc-de-treball">
  <area shape="rect" coords="195,275,350,320" alt="Sun" href="#2-arquitectura-de-l-entorn-de-treball">
  <area shape="rect" coords="390,275,550,320" alt="Sun" href="#3-arquitectura-de-connectivitat">
   <area shape="rect" coords="195,322,350,372" alt="Sun" href="#0-principis-globals">
</map>

### Índex dels principis de l'entorn de treball

- **[0. Principis globals](#0-principis-globals)**

- **[1. Solucions escriptori del Lloc de Treball](#1-solucions-escriptori-del-lloc-de-treball)**
  * 1.1 Disseny aplicacions escriptori
  * 1.2 Principis tecnològics

- **[2. Arquitectura de l'Entorn de Treball](#2-arquitectura-de-l-entorn-de-treball)**
  * 2.1 Dispositius
     + 2.1.1 Equips corporatius i Sistema Operatiu
  * 2.2 Virtualització d'aplicacions
     + 2.2.1 Execució local
     + 2.2.2 Execució remota

- **[3. Arquitectura de connectivitat](#3-arquitectura-de-connectivitat)**
  * 3.1 Principis de disseny
  * 3.2 Principis tecnològics

<!-- toc -->
&nbsp;
&nbsp;

# Introducció
&nbsp;
&nbsp;

Els principis d’arquitectura CTTI són les normes i directrius generals destinades a ser perdurables i rarament modificables. Aquests principis tenen com a objectiu informar i guiar en el desenvolupament de solucions, sota els criteris establerts pel CTTI. 

D’aquesta manera, els principis exposats en aquest apartat fan referencia a les diverses solucions dintre de l’entorn de treball. Així, els principis es dividiran en 4 blocs:

- **Bloc 0 – Principis Globals**: Principis transversals establerts com universals per qualsevol solució inclosa dins del perímetre del servei a l’entorn de treball. L’aplicació d’aquests principis serà obligatòria i s’adaptarà a cadascun dels 3 blocs específics que es llisten a continuació.

- **Bloc 1 – Principis de solucions escriptori de l'entorn de treball**: Principis establerts com específics pel desenvolupament de solucions escriptori de l’entorn de treball.

- **Bloc 2 – Principis d’arquitectura de l’entorn de treball**: Principis establerts com específics de l’arquitectura de lloc de treball, on es defineixen els dispositius, equipaments on premise, equipaments remots, sistemes operatius i aplicacions virtualitzades utilitzades dintre de l’entorn de treball.
- **Bloc 3 – Principis d'arquitectura de connectivitat**: Principis establerts com específics de l’arquitectura de comunicacions que donen servei dintre de l’entorn de treball.

&nbsp;
&nbsp;
&nbsp;

---

# 0. Principis globals
&nbsp;
&nbsp;

* **0.1. Aprofitar abans que comprar i construir **. Aprofitar si hi ha  solucions o estàndards ja definits que resolen una necessitat TIC i en aquest cas s’implantarà aquesta solució. Només seran construïdes de nou si realment hi ha un requeriment que ho necessiti. S’ha d’evitar solucions a mida. A tenir en compte que els estàndards aniran evolucionant.

* **0.2 Estandardització. Solucions en recerca d’un model Transversal**. Cal vetllar perquè els dissenys d’alt nivell de les solucions de l’entorn de treball esdevinguin un model estàndard de referència a nivell transversal que permeti implementar-ho a qualsevol escenari amb el mínim de canvis necessaris.

* **0.3 Neutralitat tecnològica**. Cal garantir la lliure adopció de tecnologies, tenint en compte recomanacions, conceptes i normatives dels organismes internacionals competents en la matèria. És a dir, s’ha d’escollir lliurement la tecnologia que més s’adapti a les necessitats.

* **0.4 Compliment**. Tota solució de l’entorn de treball, a més de seguir els principis anunciats en aquest espai, haurà de complir amb els requeriments tècnics, funcionals i de seguretat de la Generalitat de Catalunya per les diferents àrees TIC involucrades en el disseny.
  * [Principis arquitectura de sistemes d'informació](https://canigo.ctti.gencat.cat/arqctti/principis_arq/). Si un component o aplicació implementada al lloc de treball forma part d'un sistema de la informació, caldrà que segueixi aquests principis d'arquitectura.

* **0.5 Seguretat** *(obligatori)*.Tots els elements que formen part d’una arquitectura de l’entorn de treball hauran de seguir les normes i directrius establertes per l’Agència de Ciberseguretat en matèria de control, seguretat i privacitat. Les principals àrees on s’hauran d’aplicar aquestes premisses són:
  * **0.5.1 Traçabilitat**. Capacitat per identificar les diferents etapes per les quals travessa el consum d’un servei, permetent extreure la informació suficient per realitzar l’anàlisi d’un problema, d’aspectes legals i de seguretat.
  * **0.5.2 Control d’accés**. Mecanismes i capacitats per limitar l’accés en les diferents capes d’un servei amb l’objectiu d’assolir un perímetre de seguretat que compleixi amb els requeriments de seguretat establerts pels organismes competents.
  * **0.5.3 Auditoria**. Capacitat per registrar els accessos i l’ús de les solucions. Es valorarà si el sistema o solució disposa de diferents nivells de registre per capturar major o menor informació segons sigui necessari.
  * **0.5.4 Disponibilitat, confidencialitat i integritat de les dades**. D’acord amb els requeriments de l’Agència de Ciberseguretat.

* **0.6 Eficiència econòmica**. Les solucions de l'entorn de treball, a més d’aconseguir resoldre unes especificacions tècniques també hauran de cercar la màxima funcionalitat al menor cost possible, evitant sempre les duplicitats en els serveis. D’aquesta manera, malgrant l'enfoc estarà orientat a l'abaratiment dels costos, es garantiran els requeriments de negoci.
	En el cas d’optar per una solució Open Source per assolir aquesta eficiència, caldrà garantir que aquesta compleix amb la resta de principis anunciats, prestant especial atenció a aquells factors que acostumen a ser diferents respecte a les solucions propietàries: nivell de suport, maduresa, cicle de vida i l’acceptació en la industria. 
* **0.7 Evolució continua i mínim impacte** *(obligatori)*. Cal pensar en l’impacte que pugui generar una actualització i en conseqüència, sempre s’han de valorar quins seran els possibles canvis i evolucions que requerirà la solució, així com quins riscos i quines millores aportarà. Tanmateix és necessari avaluar l’impacte d’aquests canvis en el marc d’interdependències de les capes que formen el servei: connectivitat, dispositiu, sistema i d’aplicació. 
* **0.8 Automatització**. Tant la provisió com el manteniment haurà d’orientar-se cap a la màxima automatització dels seus processos, amb l'objectiu de l'estalvi de costos, temps, millora en l’eficiència, i aconseguir evitar els problemes esdevinguts d'una implementació manual, obtenint així una major productivitat de la solució. 
* **0.9 Gestió Centralitzada**. Cal garantir la lliure adopció de tecnologies, tenint en compte recomanacions, conceptes i normatives dels organismes internacionals competents en la matèria. És a dir, s'ha d'escollir lliurement la tecnologia que més s'adapti a les necessitats.
* **0.10 Rendiment i evolució**. L’entorn de treball està en constant evolució, així que caldrà supervisar que no hi ha una degradació important en el rendiment, mitjançant la monitorització per a identificar les necessitats de creixement o de canvi d’equipaments, per tal d’acollir les previsions i creixement, de noves necessitats i/o  l’obsolescència tecnològica. 
* **0.11 Arquitectura orientada a serveis**. Les arquitectures s’hauran de modelar com a serveis o microserveis i valorar el seu encaix  en un entorn cloud públic, híbrid o privat. Així doncs, serà necessari posar de manifest quins són els avantatges i inconvenients de solucions cloud i fer un balanç d’aquests factors amb els principis globals de l’entorn de treball. Malgrat que en termes tècnics l’ordre de preferència per seleccionar l’entorn on allotjar un servei o microservei és el que apareix a continuació, caldrà valorar-ho de forma general en el marc de la resta de principis.
  * **1. SAAS**. Per d’aplicacions o serveis específics aprovisionats amb un conjunt de funcions ben definides.
  * **2. PAAS**. Per plataformes on es necessiti desenvolupar, implementar i  gestionar aplicacions sense preocupar-se del servei, l’emmagatzematge i l’administració de la base de dades. 
  * **3. IAAS**. Per elements d’infraestructura com virtualització, emmagatzematge i xarxa amb la necessitat d’una infraestructura automatitzada i elàstica. 
  * **3. On-premise**. Per serveis on es necessiti un major control tant per seguretat com per les mateixes dades i per a solucions a mida. 
* **0.12 Experiència d’usuari**. Tota solució implementada a l’entorn de treball ha d’estar orientada a satisfer uns requeriments d’usuari, tanmateix la facilitat d’ús de la solució juntament amb un bon rendiment de la mateixa donaran com a resultat una experiència d’usuari satisfactòria. Amb aquesta motivació caldrà realitzar les proves de qualitat i rendiment pertinents. Els factors d’experiència d'usuari com la interfície, mobilitat i els aspectes de col·laboració en el lloc de treball són una prioritat clau en el disseny de la solució. 
* **0.13 Sostenibilitat**. Construir solucions més respectuoses amb el medi ambient  i més  sensibles amb l’impacte social, en el marc  de l’exhauriment de matèries primeres, els alts costos ambientals i energètics, l’obsolescència del maquinari i del programari, els impactes ambientals del reciclatge o de la fractura digital. Les propostes que tenen com a propòsit la sostenibilitat són les següents:
	**Eficiència energètica**  L’adquisició i la gestió de l’equipament es realitzarà amb un enfocament d’estalvi energètic, cuidant perquè els requeriments energètics siguin els mínims possibles i que les polítiques energètiques aplicades maximitzin la sostenibilitat sense impactar a la funcionalitat. 
	**Durabilitat i reaprofitament**  Cal procurar que l’equipament sigui operatiu durant el màxim temps possible, assolint les funcionalitats i nivell de qualitat establerts pel servei. Es valorarà l’adopció de solucions tecnològiques amb aquest propòsit. L’equipament serà reaprofitat si és possible i només comprats de nou si realment hi ha un requeriment que ho necessita.

&nbsp;
&nbsp;

---

# 1. Solucions escriptori del Lloc de Treball

&nbsp;
&nbsp;

Una solució d’escriptori significa qualsevol programari que s’instal·la en un terminal d’usuari (portàtil o sobretaula) per realitzar funcions específiques. Algunes solucions d’escriptori també poden ser utilitzades per diversos usuaris en un entorn en xarxa.

Els principals grups en els que podem classificar les solucions escriptori són: 

- Programari empresarial i departamental.
- Programari per a treballadors de les TIC.
- Programari d'accés a contingut.
- Programari educatiu.


## 1.1 Disseny aplicacions escriptori

* **1.1.1 Desacoblada i multi-plataforma** *(desitjable)*. Les aplicacions Web són la tipologia d’aplicacions prioritària per lliurar al lloc de treball pels múltiples beneficis que ofereixen: agnòstiques al SO, maximitzen la mobilitat de l’usuari, faciliten l’administració, etc. Si per motius funcionals, tecnològics o econòmics, es requereix implementar una aplicació escriptori al lloc de treball caldrà avaluar les tecnologies, APIs i Frameworks que millor encaixen per assolir aquests principis.

* **1.1.2 Modular i flexible** *(desitjable)*.  Cal potenciar l’ús de solucions transversals a qualsevol departament, les quals haurien de tenir la capacitat d’adaptar-se a requeriments funcionals i tècnics heterogenis, mitjançant una capa de personalització a nivell usuari i emprant components o microserveis que maximitzin la seva compatibilitat amb múltiples sistemes i tecnologies. A més, gràcies a una arquitectura de microserveis tindrem la capacitat d’aplicar canvis a certs components sense impactar a la resta de l’aplicació.

* **1.1.3 Interoperabilitat** *(obligatori)*. El context d’execució de les aplicacions està format pel Sistema Operatiu, les plataformes integrades (impressió, eines de gestió i administració, recursos locals i en xarxa, etc..), altres aplicacions i els perifèrics. La interoperabilitat entre tots aquests elements és una facultat que han de tenir les solucions del lloc de treball.

## 1.2 Principis tecnològics

* **1.2.1 Estabilitat** *(obligatori)*. Les solucions a implementar al lloc de treball han de tenir suficient experiència en entorns empresarials amb els mateixos condicionats d’interoperabilitat que els terminals de la Generalitat de Catalunya, encara que a vegades caldrà avaluar l’ús de solucions emergents per garantir l’aplicació de la resta de principis definits. 

* **1.2.2 Cicle de vida** *(obligatori)*. Tota solució haurà de comptar amb un cicle de vida actualitzat i consultable que garanteixi una evolució continua del programari de manera alineada amb la resta d’aplicacions i sistema operatiu amb els que necessita interactuar. Al [full de ruta de programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) es pot consultar el programari transversal de l'entorn de treball, així com el versionat suportat per CTTI. 

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

---

# 2. Arquitectura de l'Entorn de Treball
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 2.1 Dispositius

* **2.0.1 Simplicitat** *(obligatori)*. Tot dispositiu ha de tenir les característiques estrictament necessàries per donar el servei demandat. S’evitarà l’adquisició de dispositius sobredimensionats a nivell de recursos o funcionalitats amb l’objectiu de minimitzar el cost, problemes i esforços de manteniment associats.

* **2.0.2 Ampliable** *(desitjable)*. Tot dispositiu hauria de permetre la seva ampliació a nivell de recursos i funcionalitats, mitjançant l'ús de perifèrics d'entrada o sortida, la substitució o ampliació dels components que formen el propi dispositiu i la interconnexió amb altres dispositius.

* **2.0.3 Suportat** *(obligatori)*. El dispositiu ha de comptar amb suport vigent del fabricant i ha de ser compatible amb la versió CTTI del sistema operatiu o firmware corresponent per aquesta tipologia de dispositiu.

### 2.1.1 Equips corporatius i Sistema Operatiu

* **2.1.1.1 Maquetació** *(obligatori)*. Tot terminal corporatiu de la Generalitat de Catalunya s’ha de desplegar seguint les directrius de CTTI, gràcies a les quals s’assolirà una homogeneïtat en l’aparença, les funcionalitats transversals i l’operativitat del sistema.

* **2.1.1.2 Cicle de vida** *(obligatori)*. S’hauran de complir amb els terminis del cicle de vida del sistema operatiu establerts pel fabricant en el temps i forma definits pels organismes components de la Generalitat de Catalunya amb l’objectiu d’assolir el SLA del servei. Al [full de ruta de programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/) es poden consultar les versions dels sistemes operatius de l'entorn de treball suportades per CTTI.

&nbsp;
&nbsp;

## 2.2 Virtualització d'aplicacions

### 2.2.1. Execució local

La virtualització és l’acte d’aïllar o desacoblar un recurs informàtic dels altres, tanmateix mitjançant la virtualització d’aplicacions es generarà un paquet que inclou tots els objectes i fitxers que requereixi l’aplicació per funcionar i amb l’objectiu de poder-la executar sense necessitat d’instal·lació.

En aquells casos d’ús on la virtualització d’aplicacions esdevingui com el mètode d’implementació adient caldrà seguir els següents principis associats amb la creació, execució i manteniment del paquet. Els principals motius pels quals s’utilitzarà aquesta tecnologia són:

  * Execució de múltiples versions o instàncies de la mateixa aplicació en un mateix entorn.
  * Remeiar conflictes entre aplicacions.
  * Ritme d'actualitzacions de l'aplicació molt elevat.
  * Es requereixi un implementació o completa desimplementació de l'aplicació molt àgil.

&nbsp;
&nbsp;

* **2.2.1.1 Filosofia de “microserveis” o “components desacoblats”** *(desitjable)*, ), amb l’objectiu de maximitzar la reutilització dels mateixos alhora que es minimitzen els esforços i l’impacte al servei per mantenir el cicle de vida de les aplicacions. Entenem que se segueix aquesta filosofia quan s’assoleixen les següents premisses:
  * a)	Ús de dependències: es generarà un paquet independent per aquells components susceptibles de ser reutilitzats o que poden ser modificats i actualitzats sense afectar a la resta de components (p.ex.: frameworks, runtimes, visors o editors de documents, plugins, etc).

  * b) 	Els paquets principals no han d’incloure paràmetres de configuracions específics de l'aplicació o del sistema (p.ex.: strings de connexió, nom de BBDD, etc). Aquestes personalitzacions s'inclouran en un paquet diferent o s'implementaran mitjançant una eina de gestió de l'entorn d'usuari (UEM).

* **2.2.1.2 Simplicitat** del paquet i del perfil d’usuari. Els fitxers i claus de registre a mantenir seran els mínims necessaris perquè l’aplicació sigui completament funcional.

* **2.2.1.3 Auto-contingut i auto-configurat**. És necessari garantir que la combinació del paquet principal + paquets dependents incorporen el total de fitxers i claus de registre necessàries per treballar amb l’aplicació. Tanmateix, cal evitar la necessitat de configuracions manuals mitjançant una parametrització preestablerta.

* **2.2.1.4 L’entorn d’execució (bombolla) ha de ser segur,** aplicant les mesures restrictives necessàries per permetre només la interoperabilitat amb el sistema i aquells serveis completament imprescindibles pel bon funcionament de l’aplicació.

* **2.2.1.5 Cal vetllar per la compatibilitat del paquet,** , avaluant el correcte funcionament del mateix en les diverses versions de Windows suportades pel lloc de treball de la Generalitat de Catalunya, en aquelles arquitectures compatibles amb l’aplicació (32bit \ 64bit). Al full de ruta de programari, s’informa quines són aquestes versions i compilacions de SO.

* **2.2.1.6 L’experiència d’usuari persistent**, sense importar des de quin terminal -gestionat- s’executi, per tant, l’aplicació ha d’estar preparada per l’ús de perfils mòbils  i serà al perfil de l’usuari on es redirigiran tots els fitxers de treball i aquells fitxers destinats a personalitzar la configuració de l’aplicació.

* **2.2.1.7 Cicle de vida inalterable**. . La virtualització de l’aplicació no ha d’interferir en el cicle de vida d’aquesta, el qual haurà d’anar alineat amb la versió del SO i  programari present en els terminals client on es pretén executar.

### 2.2.2. Execució remota

* **2.2.2.1 Infraestructura eficient**. Malgrat que el gruix de la infraestructura està vinculada amb el model de lliurament més adient a cada cas (VDI o RDSH) i que vindrà definit per factors funcionals i de seguretat, tècnicament s’haurà de prioritzar l’ús d’aquell model que millor resolgui aquests factors, però amb un enfocament que maximitzi la densitat d’usuaris amb el mínim d’infraestructura. Amb aquest propòsit, es prioritzarà el desplegament d’entorns compartits i no persistents, tanmateix per assolir-ho es valorarà l’ús de la virtualització d’aplicacions (execució local) com a mètode d’implementació.
* **2.2.2.2 Estandarització**. Les imatges de referència utilitzades per aprovisionar els equips (VDI i RDSH) seran les mínimes necessàries i estaran alineades amb les versions de SO informades al full de ruta de programari. De la mateixa manera, hauran de seguir les directrius d’imatge corporativa i organització per capes lògiques informades per CTTI en el disseny de la maqueta Windows 10.
* **2.2.2.3 Elasticitat**. Tota plataforma de virtualització haurà de permetre un creixement àgil de les 3 capes que la constitueixin (accés, control i recursos) amb l’objectiu d’adaptar-se a la demanda d’escriptoris i aplicacions virtuals. Caldrà dimensionar la plataforma de forma proactiva, d’acord amb el volum d’usuaris previst i el seu perfil d’estrès (baix, mig i alt) En aquells casos que el creixement respon a una necessitat temporal, s’hauran d’estudiar les alternatives disponibles per decréixer de la mateixa manera.

&nbsp;
&nbsp;



---

# 3. Arquitectura de connectivitat
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 3.1 Principis de disseny

* **3.1.1 Adaptabilitat** *(obligatori)*. Capacitat per acollir noves funcionalitats i/o tecnologies minimitzant els canvis estructurals i els costos d'implementació.

* **3.1.2 Escalabilitat** *(obligatori)*. Totes les solucions de xarxes de telecomunicacions han de suportar sense dificultats el creixement, moltes vegades continu, i sense que s’hagi que redissenyar novament la solució.

* **3.1.3 Disponibilitat i rendiment** *(obligatori)*. S’ha d’establir el grau de disponibilitat per tota solució de xarxa de telecomunicacions. Aquest valor es mesurarà com el percentatge de temps de disponibilitat de la xarxa durant un temps indicat, o també es podrà valorar com el temps màxim permès que pugui estar caiguda la xarxa sense afectar els serveis principals de l’empresa.
	  Caldrà determinar les càrregues de treball màximes, per tal de poder-les absorbir. Els paràmetres fonamentals a tenir en compte pel correcte funcionament dels serveis dintre de la xarxa (Telefonia IP, Videoconferència, Correu Electrònic, Etc…) són l’amplada de banda (Bandwidth), la pèrdua de paquets (Packet loss), el retard (Latency) i la variació de retard (Jitter).
* **3.1.5 Administració** *(obligatori)*. Tota xarxa de telecomunicacions haurà de permetre de forma senzilla la seva administració, monitorització, control d’esdeveniment i incidències, amb enfocament cap a una gestió automatitzada.

* **3.1.6 Simplicitat** *(obligatori)*. Tot disseny està orientat a la senzillesa, evitant sempre desenvolupar solucions complicades, que acabin sent posteriorment ingovernables. 


## 3.2 Principis tecnològics

* **3.2.1 Estabilitat** *(obligatori)*. Les solucions a aplicar en les xarxes de telecomunicacions haurien de ser solucions amb un cert recorregut, no és recomanable utilitzar solucions poc madures a nivell de producció. Encara que, en certes situacions s’avaluarà implementar solucions emergents.

* **3.2.2 Minimitzar la dependència sobre els fabricants** *(obligatori)*. Cal evitar sempre que sigui possible les solucions propietàries, i maximitzar la compatibilitat amb la resta dels components i sistemes. Però, allunyant-nos de solucions massa heterogènies que puguin generar problemes de governança

