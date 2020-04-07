+++
date        = "2020-03-18"
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
  <area shape="rect" coords="15,275,170,320" alt="Sun" href="#1-solucions-lldt">
  <area shape="rect" coords="195,275,350,320" alt="Sun" href="#2-arquitectura-lldt">
  <area shape="rect" coords="390,275,550,320" alt="Sun" href="#3-arquitectura-telco">
   <area shape="rect" coords="195,322,350,372" alt="Sun" href="#0-principis-globals">
</map>

### Índex dels principis de l'entorn de treball

- **[0. Principis globals](#0-globals)**
  * [0.1 Generals](#01-generals)
  * [0.2 Principis de cost i mateniment](#02-principis-de-cost-i-mateniment)

- **[1. Solucions LLdT](#1-solucions-lldt)**
  * [1.1 Disseny aplicacions escriptori](#11-disseny-aplicacions-escriptori)
  * [1.2 Principis tecnològics](#12-principis-tecnològics)

- **[2. Arquitectura LLdT](#2-arquitectura-lldt)**
  * [2.1 Dispositius](#21-dispositius)
     + [2.1.1 Equips corporatius i Sistema Operatiu](#211-equips-corporatius-i-sistema-operatiu)
  * [2.2 Virtualització d'aplicacions](#22-virtualització-d'aplicacions)
     + [2.2.1 Execució local](#221-execució-local)
     + [2.2.2 Execució remota](#222-execució-remota)

- **[3. Arquitectura TELCO](#3-arquitectura-telco)**
  * [3.1 Principis de disseny](#31-principis-de-disseny)
  * [3.2 Principis tecnològics](#32-principis-tecnològics)   

<!-- toc -->
&nbsp;
&nbsp;

# Introducció
&nbsp;
&nbsp;

*Els principis d’arquitectura CTTI són les normes i directrius generals destinades a ser perdurables i rarament modificables i tenen com a objectiu informar i recolzar la forma en què CTTI vol que s’implementin les solucions i la infraestructura de l'entorn de treball.*

&nbsp;
&nbsp;
&nbsp;

---

# 0. Principis globals
&nbsp;
&nbsp;
##  0.1 Generals

* **0.1.1 Estandarització** *(obligatori)*. Cal vetllar perquè els dissenys d'alt nivell de les solucions de l'entorn de treball esdevinguin un model estàndar de referència que permeti implemantar-ho a qualsevol escenari amb el mínim de canvis necessaris. Tanmateix s'haurà de validar si cap dels estàndars ja definits resolen una necessitat TIC i en aquest cas s'implantarà aquesta solució.
  * [Estàndards de l'entorn de treball](https://gencat.sharepoint.com/:x:/s/arquitecturasicpd/EZseBopn5rlNunUw11ODpqkB4GjH8Xq1MpPlkc0lpERamg?e=uENvXu): catàleg dels estàndards establerts a les diferents àrees de l'entorn de treball.

* **0.1.2 Neutralitat tecnològica** *(obligatori)*. Cal garantir la lliure adopció de tecnologies, tenint en compte recomanacions, conceptes i normatives dels organismes internacionals competents en la matèria. És a dir, s'ha d'escollir lliurement la tecnologia que més s'adapti a les necessitats.

* **0.1.3 Compliment** *(obligatori)*. Tota solució de l'entorn de treball, a més de seguir els principis anunciats en aquest espai, haurà de complir amb els requeriments i directrius de les demés àrees TIC involucrades en el disseny. 
  * [Principis arquitectura de sistemes d'informació](https://canigo.ctti.gencat.cat/arqctti/principis_arq/). Si un component o aplicació implementada al lloc de treball forma part d'un sistema de la informació, caldrà que segueixi aquests principis d'arquitectura.

* **0.1.4 Seguretat** *(obligatori)*.Tots els elements que formen part d’una arquitectura de l’entorn de treball hauran de seguir les normes i directrius establertes per l’agència de ciberseguretat en matèria de control, seguretat i privacitat. Les principals àrees on s’hauran d’aplicar aquestes premisses són:
  * **0.1.4.1 Traçabilitat** Capacitat per identificar les diferents etapes per les que travessa el consum d’un servei, permeten extreure la informació suficient per realitzar l’anàlisi d’un problema.
  * **0.1.4.2 Control d’accés** Mecanismes i capacitats per limitar l’accés en les diferents capes d’un servei amb l’objectiu d’assolir un perímetre de seguretat que compleixi amb els requeriments de seguretat establerts pels organismes competents.
  * **0.1.4.3 Auditoria** Capacitat per registrar els accessos i l’ús de les solucions. Es valorarà si el sistema o solució disposa de diferents nivells de registre per capturar major o menor informació segons sigui necessari.
  
&nbsp;
&nbsp;

##  0.2 Principis de cost i mateniment

* **0.2.1 Eficiència econòmica** *(obligatori)*. Les solucions de l'entorn de treball, a més d’aconseguir resoldre unes especificacions tècniques també hauran de cercar la rendibilitat, tant en el disseny com en la seva implementació, evitant sempre les duplicitats en els serveis. D’aquesta manera, malgrant l'enfoc estarà orientat a l'abaratiment dels costos, es garantiran els requeriments de la solució.

* **0.2.2 Evolució continua i mínim impacte** *(obligatori)*. Cal pensar en l’impacte que pugui generar una actualització i en conseqüència, sempre s'han de valorar quins seran els possibles canvis i evolucions que requerirà la solució, així com quins riscos i quines millores aportarà. Tanmateix és necessari avaluar l'impacte d'aquests canvis en el marc d'interdependències de les capes que formen el servei: connectivitat, dispositiu, sistema i aplicatiu. 

&nbsp;
&nbsp;

---

# 1. Solucions LLdT

&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 1.1 Disseny aplicacions escriptori

* **1.1.1 Usabilitat** *(obligatori)*. Tota aplicació implementada al lloc de treball ha d'estar orientada a l'usuari, tanmateix la facilitat d'ús de la solució juntament amb un bon rendiment de la mateixa donaran com a resultat una experiència d'usuari satisfactòria. Amb aquesta motivació caldrà realitzar les proves de qualitat i rendiment pertinents.

* **1.1.2 Desacoblada i multi-plataforma** *(desitjable)*. Les aplicacions Web són la tipologia d'aplicacions prioritària per lliurar al lloc de treball pels múltiples beneficis que ofereixen: agnòstiques al SO, maximitzen la mobilitat de l'usuari, faciliten l'administració, etc. Si per motius funcionals, tecnològics o econòmics, es requereix implementar una aplicació escriptori al lloc de treball caldrà avaluar les tecnologies, APIs i Frameworks que millor encaixen per assolir aquests principis.

* **1.1.3 Modular i flexible** *(desitjable)*. Les aplicacions haurien de tenir la capacitat d'adaptar-se a requeriments funcionals i tècnics heterogenis, mitjançant una capa de personalització a nivell usuari i emprant components o micro-serveis que maximitzin la seva compatibilitat amb múltiples sistemes i tecnologies. A més, gràcies a una arquitectura de micro-serveis tindrem la capacitat d'aplicar canvis a certs components sense impactar a la resta de l'aplicació.

* **1.1.4 Interoperabilitat** *(obligatori)*. El context d'execució de les aplicacions està format pel Sistema Operatiu, les plataformes integrades (impressió, eines de gestió i administració, recursos locals i en xarxa, etc), altres aplicacions i el perifèrics. La interoperabilitat entre tots aquests elements és una facultat que han de tenir les solucions del lloc de treball. Als següents enllaços es troba informació que permet conèixer aquest context d'execució al lloc de treball:

* **1.1.5 Centralització** *(desitjable)*. Si escau, les solucions han de permetre ajustar la parametrització de manera centralitzada, mitjançant consoles d'administració, polítiques de domini o altres tecnologies, amb l'objectiu de maximitzar la homogeneïtat en la configuració de tot el parc de terminals i alhora minimitzar les accions manuals en les instal·lacions i futurs canvis necessaris.  

## 1.2 Principis tecnològics

* **1.2.1 Automatització** *(obligatori)*. Tota aplicació escriptori ha de permetre la seva completa instal·lació i desinstal·lació del lloc de treball de manera administrada i desatessa. Es desitjable utilitzar tecnologies de generació de paquets que segueixin una filosofia out-of-the-box amb l'objectiu de facilitar el procés i minimitzar els problemes d'implementació.

* **1.2.2 Estabilitat** *(obligatori)*. Les solucions a implementar al lloc de treball han de tenir suficient experiència en entorns empresarials amb els mateixos condicionats de interoperabilitat que els terminals de la Generalitat de Catalunya, encara que en ocasions caldrà avaluar l'ús de solucions emergents per garantir l'aplicació de la resta de principis definits. 

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

---

# 2. Arquitectura LLdT
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 2.1 Dispositius

* **2.1.1	Eficiència energètica** *(obligatori)*. L'adquisició i la gestió dels dispositius es realitzarà amb un enfoc d'estalvi energètic, cuidant perquè els requeriments energètics siguin els mínims possibles i que les polítiques energètiques aplicades maximitzin la sostenibilitat sense impactar a la funcionalitat. 

* **2.1.2	Simplicitat** *(obligatori)*. Tot dispositiu ha de tenir les característiques extrictament necessàries per donar el servei demandat. S'evitarà l'adquisició de dispositius sobre-dimensionats a nivell de recursos o funcionalitats amb l'objectiu de minimitzar el cost, problemes i esforços de manteniment associats.

* **2.1.3	Durabilitat i reaprofitament** *(desitjable)*. Cal procuprar que el dispositiu sigui operatiu durant el màxim temps possible, assolint les funcionalitats i nivell de qualitat establerts pel servei. Es valorarà l'adopció de solucions tecnològiques amb aquest propòsit.

* **2.1.4	Ampliable** *(desitjable)*. Tot dispositiu hauria de permetre la seva ampliació a nivell de recursos i funcionalitats, mitjançant l'ús de perifèrics d'entrada o sortida, la substitució o ampliació dels components que formen el propi dispositiu i la interconnexió amb altres dispositius.

* **2.1.5	Gestió centralitzada** *(obligatori)*. Tot dispositiu ha de tenir la capacitat de ser gestionat de forma remota i centralitzada mitjançant les plataformes transversals de la Generalitat de Catalunya o, si no hi ha cap establerta, caldrà adoptar la plataforma corresponent a la tipologia de dispositiu per fer aquesta gestió.

* **2.1.6	Suportat** *(obligatori)*. El dispositiu ha de comptar amb suport vigent del fabricant i ha de ser compatible amb la versió CTTI del sistema operatiu o firmware corresponent per aquesta tipologia de dispositiu.

### 2.1.1 Equips corporatius i Sistema Operatiu

* **2.1.1.1	Rendiment i funcionalitat persistent** *(obligatori)*. El lloc de treball està en constant evolució, així que caldrà supervisar que no hi ha una degradació important en el rendiment de les aplicacions i del sistema operatiu, així com que la funcionalitat perduri al llarg del temps gràcies a una correcte operativitat de tots els serveis i aplicacions implementades. Amb aquest propòsit es farà una monitorització continua dels recursos i una execució periòdica de proves de capacitat i d'estrès.

* **2.1.1.2	Maquetació** *(obligatori)*. Tot terminal corporatiu de la Generalitat de Catalunya s'ha de desplegar seguint les directrius de CTTI, gràcies a les quals s'assolirà una homogenitat en l'aparença, les funcionalitats transversals i la operativitat del sistema.

* **2.1.1.3	Cicle de vida** *(obligatori)*. S'hauran de cumplir amb els terminis del cicle de vida del sistema operatiu establerts pel fabricant en el temps i forma definits pels organismes compotents de la Generalitat de Catalunya amb l'ojbectiu d'assolir el SLA del servei. 

* **2.1.1.4	Automatització i agilitat** *(obligatori)*. Cal disposar de les plataformes, eines i automatismes nessaris per fer un desplegament àgil del terminal, així com la distribució del programari i polítiques corporatives corresponents amb l'objectiu de lliurar un terminal preparat pel negoci. 

* **2.1.1.X.X.X.X	Inventari i control** *(obligatori)*. Cal disposar dels mecanismes d'inventari i control pertinents que garanteixin una correcte gestió dels equips i del llicenciament.

&nbsp;
&nbsp;

## 2.2 Virtualització d'aplicacions

### 2.2.1. Execució local

La virtualització és l'acte d'aïllar o desacoblar un recurs informàtic dels altres, tanmateix mitjançant la virtualització d'aplicacions es genararà un paquet que inclou tots els objectes i fitxers que requereixi l'aplicació per funcionar i amb l'objectiu de poder-la executar sense necessitat d'instal·lació. 

En aquells casos d'ús on la virtualització d'aplicacions esdevingui com el mètode d'implementació adient caldrà seguir els següents principis associats amb la creació, execució i manteniment del paquet. Els principals motius pels quals s'utilitzarà aquesta tecnologia són:

+ Execució de múltiples versions o instàncies de la mateixa aplicació en un mateix entorn.
+ Remeiar conflictes entre aplicacions.
+ Ritme d'actualitzacions de l'aplicació molt elevat.
+ Es requereixi un implementació o completa desimplementació de l'aplicació molt àgil.


* **2.2.1.1 Filosofia de “micro-serveis” o “components desacoblats”** *(desitjable)*, amb l’objectiu de maximitzar la reutilització dels mateixos alhora que es minimitzen els esforços i l’impacte al servei per mantenir el cicle de vida de les aplicacions. Entenem que es segueix aquesta filosofia quan s'assoleixen les següents premisses:
  * a)	Ús de dependències: es generarà un paquet independent per aquells components susceptibles de ser reutilitzats o que poden ser modificats i actualitzats sense afectar a la resta de components (p.e.: frameworks, runtimes, visors o editors de documents, plugins, etc).

  * b) 	Els paquets principals no han d’incloure paràmetres de configuracions específics de l'aplicació o del sistema (p.e.: strings de connexió, nom de BBDD, etc). Aquestes personalitzacions s'inclouran en un paquet diferent o s'implementaran mitjançant una eina de gestió de l'entorn d'usuari (UEM).

* **2.2.1.2 Simplicitat** del paquet i del perfil d'usuari. Els fitxers i claus de registre a mantenir seran els mínims necessaris perquè l'aplicació sigui completament funcional.

* **2.2.1.3 Auto-contingut i auto-configurat**. És necessari garantir que la combinació del paquet principal + paquets dependents incorporen el total de fitxers i claus de registre necessàries per treballar amb l'aplicació1. Tanmateix, cal evitar la necessitat de configuracions manuals mitjançant una parametrització pre-establerta. 

* **2.2.1.4 L’entorn d’execució (bombolla) ha de ser segur,** aplicant les mesures restrictives necessàries per permetre només la interoperabilitat amb el sistema i aquells serveis completament imprescindibles pel bon funcionament de l’aplicació.

* **2.2.1.5 Cal vetllar per la compatibilitat del paquet,** avaluant el correcte funcionament del mateix en les diverses versions de Windows suportades pel lloc de treball de la Generalitat de Catalunya, en aquelles arquitectures compatibles amb l'aplicació (32bit \ 64bit). Al [full de ruta de programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/), s’informa quines són aquestes versions i compilacions de SO.

* **2.2.1.6 L’experiència d’usuari persistent**, sense importar des de quin terminal -gestionat- s’executi, per tant, l’aplicació ha d’estar preparada per l’ús de perfils roaming i serà al perfil de l’usuari on es redirigiran tots els fitxers de treball i aquells fitxers destinats a personalitzar la configuració de l’aplicació. 

* **2.2.1.7	Automatització** . El paquet ha d'estar preparat per una completa desinstal·lació i una actualització automatitzada pels mecanismes establerts.

* **2.2.1.8	Cicle de vida inalterable**. La virtualització de l'aplicació no ha d'interferir en el cicle de vida de la mateixa, el qual haurà d'anar alineat amb la versió del SO i demés programari present en els terminals client on es pretén executar.

### 2.2.2. Execució remota

&nbsp;
&nbsp;



---

# 3. Arquitectura TELCO
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 3.1 Principis de disseny

* **3.1.1 Adaptabilitat** *(obligatori)*. Capacitat per acollir noves funcionalitats i/o tecnologies minimitzant els canvis estructurals i els costos d'implementació.

* **3.1.2 Escalabilitat** *(obligatori)*. Totes les solucions de xarxes de telecomunicacions han de suportar sense dificultats el creixement, moltes vegades continu, i sense que es tingui que redissenyar novament la solució. 

* **3.1.3 Disponibilitat** *(obligatori)*. S’ha d’establir el grau de disponibilitat per tota solució de xarxa de telecomunicacions. Aquest valor es mesurarà com el percentatge de temps de disponibilitat de la xarxa durant un temps indicat, o també es podrà valorar com el temps màxim permès que pugui estar caiguda la xarxa sense afectar als serveis principals de l’empresa. 

* **3.1.4 Rendiment** *(obligatori)*. Per tota solució de xarxes de telecomunicacions cal determinar les càrregues de treball màximes, per tal de poder-les absorbir. Els paràmetres fonamentals a tenir en compte pel correcte funcionament dels serveis dintre de la xarxa (Telefonia IP, Videoconferència, Correu Electrònic, Etc...) són l’amplada de banda (Bandwidth), la pèrdua de paquets (Packet loss), el retard (Latency) i la variació de retard (Jitter). 

* **3.1.5 Administració** *(obligatori)*. Tota xarxa de telecomunicacions haurà de permetre de forma senzilla la seva administració, monitorització, control d'esdeveniment i incidències, amb enfocament cap una gestió automatitzada. 

* **3.1.6 Automatització** *(desitjable)*. Tant la provisió com el manteniment de la xarxa de telecomunicacions haurà d’orientar-se cap a la màxima automatització dels seus processos.

* **3.1.7 Simplicitat** *(obligatori)*. Tot disseny està orientat a la senzillesa, evitant sempre desenvolupar solucions complicades, que acabin sent posteriorment ingovernables. 

* **3.1.8.X.X.X.X Provat** *(obligatori)*. Totes les noves solucions han de ser provades en un laboratori, per tal de revisar-les més enllà de la simulació i poder fer els ajustos necessaris. Obtenint així evidències de les proves efectuades, i conseqüentment del funcionament de la solució.


## 3.2 Principis tecnològics

* **3.2.1 Estabilitat** *(obligatori)*. Les solucions a aplicar en les xarxes de telecomunicacions haurien de ser solucions amb un cert recorregut, no es recomanable utilitzar solucions poc madures a nivell de producció. Encara que, en certes situacions s’avaluarà implementar solucions emergents.

* **3.2.2 Evolució** *(obligatori)*. Monitoritzar la xarxa i els seus components per a identificar les necessitats de creixement o de canvi dels equipaments de xarxa, per tal de acollir les previsions e creixement, noves necessitats i/o la obsolescència tecnològica.

* **3.2.3 Minimitzar la dependència sobre els fabricants** *(obligatori)*. Cal evitar sempre que sigui possible les solucions propietàries, i maximitzar la compatibilitat amb la resta dels components i sistemes. Però, allunyant-nos de solucions massa heterogènies que puguin generar problemes de governança. 

