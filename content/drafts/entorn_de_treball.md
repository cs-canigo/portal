+++
date        = "2020-03-18"
title       = "Principis d'arquitectura de l'entorn de treball"
description = "Arquitectura de l'entorn de treball"
sections    = ["drafts"] 
categories  = ["Data Architecture"]
weight= 5
+++

### Índex dels principis de l'entorn de treball

- **[0. Principis globals](#0-globals)**

- **[1. Solucions LLdT](#1-solucions-lldt)**
  * [1.1 Disseny aplicacions escriptori](#11-disseny-aplicacions-escriptori)
  * [1.2 Tecnologia](#12-tecnologia )   
    + [1.2.1 Virtualització d'aplicacions](#121-virtualització-d'aplicacions)
  * [1.3 Cost i mateniment](#13-cost-i-mateniment)
&nbsp;
- **[2. Arquitectura LLdT](#2-arquitectura-lldt)**
  * [2.1 Dispositius](#21-dispositius)
  * [2.2 Terminals corporatius i Sistema Operatiu](#22-terminals-corporatius-i-Sistema Operatiu)
&nbsp;  
- **[3. Arquitectura TELCO](#3-arquitectura-telco)**
  * [3.1 Principis de disseny](#31-principis-de-disseny)
  * [3.2 Principis tecnològics](#32-principis-tecnològics)   
  * [3.3 Principis de cost i mateniment](#33-principis-de-cost-i-mateniment)


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

* **0.1 Estandarització** *(obligatori)*. Cal vetllar perquè els dissenys d'alt nivell de les solucions de l'entorn de treball esdevinguin un model estàndar de referència que permeti implemantar-ho a qualsevol escenari amb el mínim de canvis necessaris. Tanmateix s'haurà de validar si cap dels estàndars ja definits resolen una necessitat TIC i en aquest cas s'implantarà aquesta solució amb el mínim d'adaptacions possible.
  * [Estàndards de l'entorn de treball](https://gencat.sharepoint.com/:x:/s/arquitecturasicpd/EZseBopn5rlNunUw11ODpqkB4GjH8Xq1MpPlkc0lpERamg?e=uENvXu): catàleg dels estàndards establerts en els diferents àrees de l'entorn de treball.

* **0.2 Compliment** *(obligatori)*. Tota solució de l'entorn de treball, a més de seguir els principis anunciats en aquest espai, haurà de complir amb els requeriments i directrius de les demés àrees TIC i de seguretat involucrades en el disseny. 
  * [Principis arquitectura de sistemes d'informació](https://canigo.ctti.gencat.cat/arqctti/principis_arq/). Si un component o aplicació implementada al lloc de treball forma part d'un sistema de la informació, caldrà que segueixi aquests principis d'arquitectura.
  
* **0.3 Neutralitat tecnològica** *(obligatori)*. Cal garantir la lliure adopció de tecnologies, tenint en compte recomanacions, conceptes i normatives dels organismes internacionals competents en la matèria. És a dir, s'ha d'escollir lliurement la tecnologia que més s'adapti a les necessitats i s'ha d'evitar la orientació a certes solucions per interessos particulars.

&nbsp;
&nbsp;
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

* **1.1.3 Modular i flexible** *(desitjable)*. Les aplicacions haurien de tenir la capacitat d'adaptar-se a requeriments funcionals i tècnics heterogenis, mitjançant una capa de personalització a nivell usuari i emprant components o micro-serveis que maximitzin la compatibilitat amb múltiples sistemes i tecnologies amb el mínim de canvis possible, d'aquesta manera es podran aplicar canvis sense impactar a la resta de l'aplicació.

* **1.1.4 Interoperabilitat** *(obligatori)*. El context d'execució de les aplicacions està format pel Sistema Operatiu, les plataformes integrades (impressió, eines de gestió i administració, recursos locals i en xarxa, etc), altres aplicacions i el perifèrics. La interoperabilitat amb aquests elements és una facultat necessària en les solucions del lloc de treball. Als següents enllaços es troba informació que permet conèixer aquest context d'execució al lloc de treball:

    * [Full de ruta de programari.](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/)
    * [Disseny de la maqueta W10.]()
    * [Catàleg de dispositius.]()

* **1.1.5 Centralització** *(desitjable)*. Si escau, les solucions han de permetre ajustar la parametrització de manera gestionada i remota, mitjançant consoles d'administració, polítiques de domini o altres tecnologies, amb l'objectiu de maximitzar la homogeneïtat en la configuració de tot el parc de terminals i alhora minimitzar les accions manuals en les instal·lacions i futurs canvis necessaris.  

* **1.1.6 Traçabilitat** *(obligatori)*. Les solucions han permetre enregistrar la informació necessària per realitzar un anàlisi de problemes, així com disposar de la capacitat per parametritzar el nivell de registre necessari (error, warning, info i debug).

## 1.2 Tecnologia

* **1.2.1 Automatització** *(obligatori)*. Tota aplicació escriptori ha de permetre la seva completa instal·lació i desinstal·lació del lloc de treball de manera administrada i desatessa. Es desitjable utilitzar tecnologies de generació de paquets que segueixin una filosofia out-of-the-box amb l'objectiu de facilitar el procés i minimitzar els problemes d'implementació.

* **1.2.2 Estabilitat** *(obligatori)*. Les solucions a implementar al lloc de treball han de tenir suficient experiència en entorns empresarials amb els mateixos condicionats de interoperabilitat que els terminals de la Generalitat de Catalunya, encara que en ocasions caldrà avaluar l'ús de solucions emergents per garantir l'aplicació de la resta de principis definits. 

### 1.2.1 Virtualització d'aplicacions

La virtualització és l'acte d'aïllar o desacoblar un recurs informàtic dels altres, tanmateix mitjançant la virtualització d'aplicacions es genararà un paquet que inclou tots els objectes i fitxers que requereixi l'aplicació per funcionar i amb l'objectiu de poder-la executar sense necessitat d'instal·lació. 

En aquells casos d'ús on la virtualització d'aplicacions esdevingui com el mètode d'implementació adient caldrà seguir els següents principis associats amb la creació, execució i manteniment del paquet. Els principals motius pels quals s'utilitzarà aquesta tecnologia són:

1. Execució de múltiples versions o instàncies de la mateixa aplicació en un mateix entorn.
2. Remeiar conflictes entre aplicacions.
3. Ritme d'actualitzacions de l'aplicació molt elevat.
4. Es requereixi un implementació o completa desimplementació de l'aplicació molt àgil.

##### Principis *(obligatoris)*:

* **1.2.1.1 Filosofia de “micro-serveis” o “components desacoblats”** *(desitjable)*, amb l’objectiu de maximitzar la reutilització dels mateixos alhora que es minimitzen els esforços i l’impacte al servei per mantenir el cicle de vida de les aplicacions. Entenem que es segueix aquesta filosofia quan s'assoleixen les següents premisses:
  * a)	Ús de dependències: es generarà un paquet independent per aquells components susceptibles de ser reutilitzats o que poden ser modificats i actualitzats sense afectar a la resta de components (p.e.: frameworks, runtimes, visors o editors de documents, plugins, etc).

  * b) 	Els paquets principals no han d’incloure paràmetres de configuracions específics de l'aplicació o del sistema (p.e.: strings de connexió, nom de BBDD, etc). Aquestes personalitzacions s'inclouran en un paquet diferent o s'implementaran mitjançant una eina de gestió de l'entorn d'usuari (UEM).

* **1.2.1.2 Simplicitat** del paquet i del perfil d'usuari. Els fitxers i claus de registre a mantenir seran els mínims necessaris perquè l'aplicació sigui completament funcional.

* **1.2.1.3 Auto-contingut i auto-configurat**. És necessari garantir que la combinació del paquet principal + paquets dependents incorporen el total de fitxers i claus de registre necessàries per treballar amb l'aplicació1. Tanmateix, cal evitar la necessitat de configuracions manuals mitjançant una parametrització pre-establerta. 

* **1.2.1.4 L’entorn d’execució (bombolla) ha de ser segur,** aplicant les mesures restrictives necessàries per permetre només la interoperabilitat amb el sistema i aquells serveis completament imprescindibles pel bon funcionament de l’aplicació.

* **1.2.1.5 Cal vetllar per la compatibilitat del paquet,** avaluant el correcte funcionament del mateix en les diverses versions de Windows suportades pel lloc de treball de la Generalitat de Catalunya, en aquelles arquitectures compatibles amb l'aplicació (32bit \ 64bit). Al [full de ruta de programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/), s’informa quines són aquestes versions i compilacions de SO.

* **1.2.1.6 L’experiència d’usuari persistent**, sense importar des de quin terminal -gestionat- s’executi, per tant, l’aplicació ha d’estar preparada per l’ús de perfils roaming i serà al perfil de l’usuari on es redirigiran tots els fitxers de treball i aquells fitxers destinats a personalitzar la configuració de l’aplicació. 

* **1.2.1.7	Automatització** . El paquet ha d'estar preparat per una completa desinstal·lació i una actualització automatitzada pels mecanismes establerts.

* **1.2.1.8	Cicle de vida inalterable**. La virtualització de l'aplicació no ha d'interferir en el cicle de vida de la mateixa, el qual haurà d'anar alineat amb la versió del SO i demés programari present en els terminals client on es pretén executar.


## 1.3 Cost i mateniment

* **1.3.2	Eficiència econòmica** *(obligatori)*. Cal revisar les sinèrgies funcionals amb els aplicatius disponibles a l'entorn de treball per garantir la necessitat del nou aplicatiu i per minimitzar els requeriments d'infraestructura (maquinari i llicenciament). 

* **1.3.1	Evolució continua** *(obligatori)*. Cal garantir la continuïnat del cicle de vida de tota aplicació implementada al lloc de treball mitjançant els mecanismes d'integració continua establerts per CTTI i que aquest estigui alineat amb el cicle de vida del sistema operatiu client on està implementada. 

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

* **2.1.2	Simplicitat** *(obligatori)*. Tot dispositiu ha de tenir les característiques extrictament necessàries per donar el servei demandat. S'evitarà l'adquisició de dispositius sobre-dimensionats a nivell de recursos o funcionalitats amb l'objectiu de minimitzar el cost, problemes i esforços de manteniment.

* **2.1.3	Durabilitat i reaprofitament** *(desitjable)*. Cal procuprar que el dispositiu sigui operatiu durant el màxim temps possible, assolint les funcionalitats i nivell de qualitat establerts pel servei. Es valorarà l'adopció de solucions tecnològiques amb aquest propòsit.

* **2.1.4	Ampliable** *(desitjable)*. Tot dispositiu hauria de permetre la seva ampliació a nivell de recursos i funcionalitats, mitjançant l'ús de perifèrics d'entrada o sortida, la substitució o ampliació dels components que formen el propi dispositiu i la interconnexió amb altres dispositius.

* **2.1.5	Gestió centralitzada** *(obligatori)*. Tot dispositiu ha de tenir la capacitat de ser gestionat de forma remota i centralitzada mitjançant les plataformes transversals de la Generalitat de Catalunya o, si no hi ha cap establerta, caldrà adoptar la plataforma corresponent a la tipologia de dispositiu per fer aquesta gestió.

* **2.1.6	Seguretat** *(obligatori)*. S'han d'aplicar les mesures restrictives i de control adients al servei que dona un dispositiu per assolir el nivell de seguretat establert per l'agència de ciberseguretat. 

* **2.1.7	Suportat** *(obligatori)*. El dispositiu ha de comptar amb suport vigent del fabricant i ha de ser compatible amb la versió CTTI del sistema operatiu o firmware corresponent per aquesta tipologia de dispositiu.

## 2.2 Terminals corporatius i sistema operatiu

* **2.2.1	Rendiment persistent**.

* **2.2.2	Inventari i control**.

* **2.2.3	Cicle de vida**.

* **2.2.4	Automatització i agilitat**.

&nbsp;
&nbsp;
&nbsp;
&nbsp;
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

* **3.1.7 Seguretat** *(obligatori)*. Tota xarxa de telecomunicacions haurà d’establir un nivell de seguretat mínim que permeti aplicar els següents punts:

  * **3.1.7.1 Traçabilitat**. Capacitat per identificar l’origen i les diferents etapes d’una connexió de xarxa.
  * **3.1.7.2 Control d’accés**. Capacitat per limitar l’accés a la xarxa.
  * **3.1.7.3 Auditoria**. Capacitat per enregistrar tots els accessos realitzats.

* **3.1.8 Simplicitat** *(obligatori)*. Tot disseny està orientat a la senzillesa, evitant sempre desenvolupar solucions complicades, que acabin sent posteriorment ingovernables. 

* **3.1.9 Provat** *(obligatori)*. Totes les noves solucions han de ser provades en un laboratori, per tal de revisar-les més enllà de la simulació i poder fer els ajustos necessaris. Obtenint així evidències de les proves efectuades, i conseqüentment del funcionament de la solució.


## 3.2 Principis tecnològics

* **3.2.1 Estabilitat** *(obligatori)*. Les solucions a aplicar en les xarxes de telecomunicacions haurien de ser solucions amb un cert recorregut, no es recomanable utilitzar solucions poc madures a nivell de producció. Encara que, en certes situacions s’avaluarà implementar solucions emergents.

* **3.2.2 Evolució** *(obligatori)*. Monitoritzar la xarxa i els seus components per a identificar les necessitats de creixement o de canvi dels equipaments de xarxa, per tal de acollir les previsions e creixement, noves necessitats i/o la obsolescència tecnològica.

* **3.2.3 Minimitzar la dependència sobre els fabricants** *(obligatori)*. Cal evitar sempre que sigui possible les solucions propietàries, i maximitzar la compatibilitat amb la resta dels components i sistemes. Però, allunyant-nos de solucions massa heterogènies que puguin generar problemes de governança. 


##  3.3 Principis de cost i manteniment

* **3.3.1 Arquitectura mínima** *(obligatori)*. Cal tenir sempre en compte l’escalabilitat de la xarxa, i caldrà minimitzar al màxim el marge de creixement del disseny. Basat en el principi de la automatització s’aconsegueix una reducció dels costos i temps dels processos d’instal·lació i manteniment, i una arquitectura sostenible en el temps, que doni una bona rendibilitat. 
 
* **3.3.2 Benefici màxim al menor cost i risc possible** *(obligatori)*. La solució de xarxa de telecomunicacions no només haurà d’aconseguir recollir unes especificacions tècniques, també haurà de valorar la rendibilitat tant del disseny com de la seva implementació, evitant sempre duplicitats en els serveis de xarxa. D’aquesta manera, haurà de prendre un enfoc per tal d’abaratir els costos, mentre es garanteixen els requeriments de la solució.

* **3.3.3 Impacte d’actualització** *(obligatori)*. Cal pensar en l’impacte que pugui generar una actualització a nivell de software, o equipament hardware de la xarxa de telecomunicacions. Cal sempre valorar quins seran els possibles canvis dintre de la xarxa, quins riscos i millores aportarà.
