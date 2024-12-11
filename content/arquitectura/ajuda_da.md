+++
date        = "2024-09-17"
title       = "Guia d'ajuda a l'hora d'omplir un DA"
description = "Ajuda a l'emplenat de la plantilla DA"
sections    = "Document Arquitectura"
weight      = 3
categories  = ["Document Arquitectura","DA","Plantilla"]
+++

Plana web per ajudar a l'emplenat de la plantilla del document d'arquitectura, els següents apartats són accessibles des de la pròpia plantilla.

---

# **Taula de Continguts** {#TaulaContiguts}

1. [Introducció](#Introduccio)
   1. [Propòsit](#Proposit)
   2. [Abast](#Abast)
      1. [Necessitats fonamentals](#NecessitatsFonamentals)
      2. [Restriccions i Requisits no Funcionals](#RestriccionsRequisitsNoFuncionals)
   3. [Parts Interessades](#PartsInteressades)
2. [Vistes](#Vistes)
   1. [Vista de Context](#VistaContext)
      1. [Fluxos de Comunicacions](#FluxosComunicacions)
   2. [Vista Funcional](#VistaFuncional)
   3. [Vista d’Informació](#VistaInformacio)
   4. [Vista de Concurrència](#VistaConcurrencia)
   5. [Vista de Desenvolupament](#VistaDesenvolupament)
   6. [Vista de Desplegament](#VistaDesplegament)
   7. [Vista Operacional](#VistaOperacional)
3. [Perspectives Transversals](#PerspertivesTransversals)
   1. [Seguretat](#Seguretat)
   2. [Rendiment i escalabilitat](#RendimentEscalabilitat)
   3. [Disponibilitat](#Disponibilitat)
   4. [Internacionalització](#Internacionalitzacio)
4. [Informació Específica pel projecte d'aprovisionament](#InformacioEspecificaProjecteAprovisionament)
   1. [Informació relativa al context](#InformacióRelativaContext)
   2. [Informació relativa al SIC](#InformacioRelativaSIC)
   3. [Informació relativa a xarxes i dominis DNS](#InformacioRelativaXarxesDominis)
   4. [Informació relativa a l’aprovisionament d’Infraestructura](#InformacioRelativaAprovisionamentInfraestructura)
   5. [Estratègia de migració](#EstrategiaMigracio)

---

# **Disposicions prèvies** 
<br>
Enumerem a continuació diferents indicacions a tenir en compte a l'hora d'informar un DA:

* **Estructura del DA:** No està permès modificar l'estructura del DA. En cas de no informar un punt OPCIONAL, indicar _NO APLICA_ en comptes d'esborrar aquest punt. Si està permès, per contra, afegir punts per sota del segon nivell (per exemple a la vista de Desplegament -punt 2.6- afegir un nivell per sota seria "2.6.1").
* **Versió de la plantilla:** S'ha de fer servir la versió actual de la plantilla del DA, que podeu trobar al  [següent enllaç](https://canigo.ctti.gencat.cat/arquitectura/plantillada/).
* **Dades de l'aplicació (Codi de Diàleg i Nom):** S'han d'informar, com a mínim, aquestes dues dades. En el cas de sistemes d'informació nous, si encarà no se sap el codi de diàleg, es pot no informar, però cal indicar que aquesta dada no es coneix encara.
* **Dades de les revisions del document, l'autoria i el responsable del CTTI:** Les versions han de quadrar amb el quadre resum i el quadre de detall de canvis. A més es valida que el nom de l'Arquitecte estigui a la llista d'Arquitectes autoritzats pels lots.
* **Arquitecte que redacta i/o revisa el DA:** Al menys un d'ells (si no son el mateix) han d'estar a la llista d'Arquitectes autoritzats per els diferents lots.

---

# **Introducció** {#Introduccio}

## **Propòsit** {#Proposit}
Explicar quin es el propòsit del Servei o Sistema d'Informació definit al DA i quines necessitats cobreix/cobrirà l'aplicació dintre del Departament u Organisme responsable.

**Exemple**

_El propòsit, en el cas d'haver de redactar el DA de Microsoft Outlook, seria "Gestionar les bústies de correus dels usuaris"._

###### [Inici](#TaulaContiguts)
## **Abast** {#Abast}
Indicar, relacionat amb el punt anterior, com el Sistema d'informació donarà servei o cobrirà la necessitat indicada en el punt anterior. S'ha d'explicar, a grans trets, com serà aquest sistems d'informació e identificar els consumidors d'aquest Sistema.

**Directrius**

_En aquest punt ha de quedar clar que es fa per aconseguir l'objectiu i quins son els consumidors de l'aplicació o servei (Interns Gencat, Col·laboradors Externs  o Públics)._

###### [Inici](#TaulaContiguts)
## **Necessitats fonamentals** {#NecessitatsFonamentals}
Llistats dels requeriments/necessitats fonamentals que ha de cobrir l'arquitectura de la solució/servei. Son els punts que condicionaran tota l'arquitectura.

**Exemple**

* _Es necessari l'accés al servei des de Intranet i Internet._
* _Es requereix alta disponibilitat a totes les capes de la infraestrcutura._
* _Es necessari l'ús d'una base de dades relacional._
* _Es necessari l'ús del servei transversal de e-Formularis._

###### [Inici](#TaulaContiguts)
## **Restriccions i requisits no funcionals** {#RestriccionsRequisitsNoFuncionals}
Informar els requisits que tenen en compte aspectes de la solució fora de la seva funcionalitat i que son importants o rellevants per l'arquitectura.

###### [Inici](#TaulaContiguts)
## **Parts interessades** {#PartsInteressades}
Identificar i descriure les parts interessades per a l'arquitectura. S'han d'informar totes les parts que estan involucrades ja no en la confecció del document, si no amb el servei.

---

# **Vistes** 

## **Vista Context:** {#VistaContext}

### **Diagrama de Context** {#DiagramesContext}

**Exemple**

<div align="left">
<img src="/images/PlantillaDA/Exemple_Context.JPG" style="width:500px;" />
<br>
<img src="/images/PlantillaDA/Exemple_Context_2.JPG" style="width:500px;" />
</div>

**Directrius o requeriments a l'hora de realitzar el diagrama:**

* _Sistema._
* _Entitats externes al Sistema._
* _Interfícies (activitats que realitzen en la interacció amb les entitats externes)._
* _Localitzacions._

### **Entitats externes a nivell Funcional** {#EntitatsExternesNivellFuncional}
Definir les dependències del servei que es detallen al DA. Tant d'entrada com de sortida, tot explicant el tipus de comunicació entre aquestes dependències i el sistema d'informació. Caldrà tenir en compte sempre les eines transverals existents a la Generalitat. Si una solució transversal pot cobrir aquestes dependències, aquesta eina transversal haurà de ser l'escollida.

Caldrà també que aquestes dependències no siguin realment acoblaments entre aplicacions. Si fos així, aquestes dependències haurien de substituir-se per serveis. Cal que el CPD de cada sistema estigui informat.

### **Actors** {#Actors}
Enumerar els diferents actors que apareixen al diagrama de context i detarllar-ne la descripció d'aquests. A més, caldrà explicar com s'autentiquen al Sistema.

#### **Fluxos de Comunicacions** {#FluxosComunicacions}
Diagrama general dels diferents elements on s’identifiqui la Net0 i els diferents fluxos de comunicacions involucrats en la comunicació del servei/solució. Podeu fer servir el diagrama en blanc que teniu disponible a la pàgina d’ajuda a la redacció del DA (el teniu en aquests enllaç).

**Directrius**
_Aquest diagrama serà resultat de la taula inicial d’aquest punt a on s’identifiquen els fluxos. Es a dir, aquells fluxos identificats a la taula s’han de reflectir després al diagrama. podeu descarregar una plantilla buida d'aquest diagrama al [següent enllaç](/related/da/VistaContextNUSBase_v2.drawio)._

_Per fer servir el diagrama amb aprovisionament SaaS, podeu descarregar-lo d'aquest [altre enllaç](/related/da/VistaContextNUSBase_SaaS_v2.drawio)._

<div align="left">
   <img src="/images/PlantillaDA/VistaContextNUSBase_v2.jpg" style="width:500px;" />
</div>
<br>

<div align="left">
Alguns exemples d'adaptació del diagrama de fluxos segons la tipologia d'Arquitectura:
</div>
<br>

<table style="width:90%">
   <tr>
      <th style="width: 15%">Arquitectura</th>
      <th style="width: 45%">Descripció</th>
      <th style="width: 40%">Diagrama exemple</th>
   </tr>
   <tr>
      <td><b>Aplicacions auto-contingudes al CLOUD amb només publicació INTERNET</b></td>
      <td>L’accés als usuaris a l’aplicació Internet passa pels FW de Publicació de la NET0 on es pot aplicar seguretat i pels WAAP que protegeixen els frontals Web. Els DNS del NUS resolen la IP pública del Cloud per tant els usuaris de dins de la Generalitat accedeixen per navegació i els usuaris Internet per Internet. La navegació dels servidors Cloud es realitza pels Proxys de la Net0. No existeix aplicació només Intranet.</td>
      <td><img src="/images/PlantillaDA/VistaContextNUSBase_v2_01.jpg" style="width:500px;" /></td>
   </tr>
   <tr>
      <td><b>Aplicacions publicades a INTERNET amb connexió a NUS</b></td>
      <td>L’accés dels usuaris a l’aplicació Internet passa pels FW de Publicació de la NET0 on es pot aplicar seguretat i pels WAAP que protegeixen els frontals Web. La comunicació entre servidors CLOUD i ON-Premise està securitzada al FW Paloalto del NUS. Els DNS del NUS resolen la IP pública del Cloud per tant els usuaris de dins de la Generalitat accedeixen per navegació i els usuaris Internet per Internet. Els diferents recursos de les aplicacions de la NET0 poden accedir a recursos d’Internet mitjançant el Proxy de la NET0. No existeix aplicació només Intranet.</td>
      <td><img src="/images/PlantillaDA/VistaContextNUSBase_v2_02.jpg" style="width:500px;" /></td>
   </tr>
   <tr>
      <td><b>Aplicacions publicades a INTERNET i INTRANET amb connexió a NUS</b></td>
      <td>L’accés dels usuaris a l’aplicació Internet app.gencat.cat passa pels FW de Publicació de la NET0 on es pot aplicar seguretat i pels WAAP que protegeixen els frontals Web. L’accés a l’aplicació INTRANET es securitza al FW Paloalto del NUS i la comunicació entre servidors CLOUD i ON-Premise està securitzada al FW Paloalto del NUS. El DNS del NUS resolen la IP pública del Cloud per app.gencat.cat i resolen la IP privada del Cloud per app.intranet.gencat.cat (Aquest flux no passa per el firewall de publicació ni pels WAAP de la NET0 i només és accessible des de la Generalitat). Els diferents recursos de les aplicacions de la NET0 poden accedir a recursos d’Internet mitjançant el Proxy de la Net0.</td>
      <td><img src="/images/PlantillaDA/VistaContextNUSBase_v2_01.jpg" style="width:500px;" /></td>
   </tr>
   <tr>
      <td><b>Aplicació només INTRANET</b></td>
      <td>En aquest cas només existeix l’aplicació INTRANET (app.intranet.gencat.cat) que només és accessible des de la Generalitat amb connexió a NUS per servidors On-Premise i servidors Cloud (l’accés dels usuaris per la aplicació INTRANET no passa pel firewall de publicació ni pels WAAP de la NET0, es securitza al FW Paloalto del NUS i la comunicació entre servidors CLOUD i ON-Premise també està securitzada al FW Paloalto del NUS). El DNS d’Intranet del NUS resolen la IP privada del Cloud per app.intranet.gencat.cat. Els diferents recursos de les aplicacions de la NET0 poden accedir a recursos d’Internet mitjançant el Proxy de la NET0. No existeix una aplicació publicada a Internet.</td>
      <td><img src="/images/PlantillaDA/VistaContextNUSBase_v2_04.jpg" style="width:500px;" /></td>
   </tr>
   <tr>
      <td><b>Aplicació publicades a INTERNET i/o INTRANET connectada a serveis SaaS externs</b></td>
      <td>Per aplicacions que es connecten amb serveis SaaS externs podem fer servir qualsevol dels models anteriors afegint el flux entre l'aplicació a l'hiperescalar escollit i la solució SaaS aprovisionada via subscripció (ElasticSearch, MongoDB, etc.)</td>
      <td><img src="/images/PlantillaDA/VistaContextNUSBase_SaaS_v2.jpg" style="width:500px;" /></td>
   </tr>
</table>


###### [Inici](#TaulaContiguts)


## **Vista Funcional:** {#VistaFuncional}

### **Diagrama Funcional** {#DiagramaFuncional}

**Exemple**

<div align="left">
<img src="/images/PlantillaDA/Exemple_Diagrama_Funcional.JPG" style="width:500px;" />
</div>
<br>

**Directrius o requeriments a l'hora de realitzar el diagrama**
* _Sistema amb les seves funcionalitats segregades, sempre que no sigui una aplicació monolítica (cosa que aniría en contra del principi d'Arquitectura 1.1._
* _Entitats externes al Sistema._

### **Estructura funcional interna del sistema** {#EstructuraFuncionalInternaSistema}
Detallar quina es l'estrcutura interna de l'aplicació. Segons el principi d'arquitectura 1.1, les aplicacions han d'estar segregades per funcionalitat/responsabilitat per evitar monolits. Detallar en aquest punt quina es aquesta estructura interna de l'aplicació.

**Directrius**
* _Verificar que aquestes relacions no suposin acoblaments entre serveis. Ni que es tracti d'eines transversals del CTTI com GICAR o l'Antivirus corporatiu. Cal una breu descripció dels diferents mòduls e interfícies que el sistema fa servir._
* _Verificar que l'aplicació te mòduls separats per funcionalitat. Que es defineixen mòduls amb una petita descripció de cada mòdul (2-3 línies)._

###### [Inici](#TaulaContiguts)
## **Vista d'Informació:** {#VistaInformacio}

### **Dades de caràcter personal** {#DadesCaracterPersonal}
Ha d'estar contestat i que tingui sentit amb els punts "Finalitat i ús de les dades (RGPD)" i "Nivell de RGPD assignat al fitxer".

### **Finalitat i ús de les dades (RGPD)** {#DadesCaracterPersonal}
Ha d'estar contestat i que tingui sentit amb els punts "Dades de caràcter personal" i "Nivell de RGPD assignat al fitxer".

### **Nivell de RGPD assignat al fitxer** {#NivellRGPD}
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

### **Nivell de sensibilitat de les dades** {#NivellSensibilitatDades}

* **MOLT CRÍTIC:** La informació és altament confidencial, accessible per un nombre molt restringit d’individus, amb requeriments d’integritat, autenticitat i traçabilitat molt alts? (exemples: dades de Seguretat Pública, informació policial, gestió de claus criptogràfiques, etc.)

* **CRÍTIC:** La informació és confidencial, restringida a un cercle reduït d’individus, amb requeriments de xifrat i traçabilitat dels accessos?
  
	**Exemples**

	_Gestió de centres penitenciaris, eleccions, gabinets jurídics, subvencions, contractacions, plataformes transversals de suport a la tramitació, actuació de cossos d'emergències, inventari d'infraestructures crítiques, plans de protecció civil, etc._
	
* **SENSIBLE:** La informació és restringida a àrees o unitats amb requeriments avançats de control d'accés i garanties d'integritat i autenticitat? 
    
	**Exemples**

	_Registre de ciutadans amb dades acadèmiques, sistemes de gestió de personal, llistes de col·lectius, la divulgació de les quals podria tenir repercussió política, registres d'empreses amb informació reservada, gestió de dades pressupostàries i econòmic-financeres, gestió del deute, sistemes d’ anàlisi de dades: estadístiques de serveis/operativa i quadres de comandament, actuacions de cossos operatius de la Generalitat (exceptuant els d'emergències), gestió de flotes d'emergència, tràmits de pagament on-line, tràmits electrònics i portals de tràmits, auditories, gestió de riscos, plans de continuïtat de negoci, assistència jurídica, gestió de la publicació d’informació (previ a la publicació)._

* **INTERN:** Hi ha informació no crítica on es pot permetre una lleu pèrdua d'integritat e informació? 
	
	**Exemples**

	_Intranets departamentals, plataformes col·laboratives, fòrums, blogs, registres de professionals, convocatòries, concursos de personal, oposicions, usuaris d'aplicació, assistents a cursos, entrada/sortida de documents, gestió d'inventaris, qüestions parlamentàries, plecs, plans d'actuació, gestió de compres, consultes i suggeriments, queixes sense dades sensibles, infraestructures, expedients sense informació anterior, etc._
	
* **PUBLIC:** La informació és pública sense restriccions de difusió del contingut.

### **Requeriment legal de retenció de les dades** {#RequerimentLegalRetencióDades}
Indicar el temps requerit de retenció de la informació per motius legals o anàlisis històric. En el cas d'escollir l'opció "Altres" cal tenir en compte que s'haurà de pactar amb CPD.

### **Model d'emmagatzemat de la informació** {#ModelEmmagatzematInformació}
Identificar els tipus de bases de dades utilitzats. En cas d'escollir més d'un tipus de base de dades caldrà especificar per a que es fa servir cada tipus de base de dades. Les dades descrites en aquest punt han de quadrar amb la Vista de Desplegament (2.6)

### **Volumetries esperades d'informació** {#VolumetriesEsperadesInformació}
Permet justificar l'estimació de tamany a la vista de desplegament. Tot i tractar-se d'una valoració aproximada o estimativa, la resposta a aquest punt ha de ser resultat d'una reflexió prèvia. No es demana un número sense més, si no producte d'una estimació bassada en un anàlisi encara que sigui a alt nivell.

### **Diagrama Entitat/Relació** {#DiagramaEntitatRelació}
Diagrama de les principals entitats de dades del servei o solució.

### **Entitats de referència** {#EntitatsReferència}
En cas de fer servir entitats de referència, enumerar aquelles que en fa ús el servei/solució. [Llistat de les entitats identificades](https://canigo.ctti.gencat.cat/dadesref/dadesref/).

### **Diagrama de flux** {#DiagramaFlux}
Diagrama de Flux de la informació.

###### [Inici](#TaulaContiguts)
## **Vista de Concurrència:** {#VistaConcurrencia}

### **Usuaris Simultanis** {#UsuarisSimultanis}
Estimar quants usuaris poden accedir simultàniament al sistema d'informació

### **Identificació de processos** {#IdentificacióProcessos}
Validar que la proposta per administrat les tasques o procesos batch permeti monitoritzar la seva correcta execució. No serveix una execució amb Cron que no dona cap garantia d'execució.

**Directrius**

_Aquest es el punt per informar sobre aquests processos. No pot aparèixer a cap altre punt del DA. Si això passa, remetrem a que s'informi aquí._

###### [Inici](#TaulaContiguts)
## **Vista Desenvolupament:** {#VistaDesenvolupament}

### **Tecnologies de desenvolupament** {#TecnologiesDesenvolupament}
Detallar quines tecnologies s'utilitzen per cada una de les capes.

**Directrius**

* _En cas d'aplicacio JEE s'ha de fer ús del Framework Canigó_
* _En el cas de desenvolupament en .Net, i en cas de ser una app nova, s'ha de dur a terme amb .NetCore_
* _S'ha de respectar el principi d'Arquitectura 2.2 ([Estabilitat de les versions de programari](https://canigo.ctti.gencat.cat/arquitectura/principis_arq/))_
  
### **Identificar software/llibreries de tercers utilitzat** {#IdentificarSoftwareLlibreriesTercersUtilitzades}
Identificar aquelles llibreries que no estan en un repositori confiable.

### **Repositori de codi** {#RepositoriCodi}
Informació del repositori on es pujarà el codi font i detalls respecte als artefactes a desplegar al GitLab. Ha d'esser un (com a mínim) d'aquests. Es pot donar el cas que el codi estigui a un repositori general i que també estigui en un altre dels repositoris.

* Repositori Generals
* Repositoris particulars Departamentals
* Altres / Excepcions

**Directrius**

_S'ha de proporcionar tota la informació necessària per agilitzar al màxim la integració des de Suport SIC._

_La integració amb el SIC, si no es així caldrà donar d'alta una excepció d'arquitectura, excepte en el cas de tractar-se d'un producte comercial en comptes d'un desenvolupament a mida._

### **Identificar Jocs de caràcters** {#IdentificarJocsCaràcters}
S'ha d'informar obligatòriament.

### **Justificacions de la vista de desenvolupament** {#JustificacionsVistaDesenvolupament}
Cal que cadascuna de les tecnologíes estigui aquí enumerada i justificada la seva utilització.

### Diagrama Desenvolupament {#DiagramesDesenvolupament}

**Exemple**

<div align="left">
<img src="/images/PlantillaDA/Exemple_Diagrama_Desenvolupament.JPG" style="width:400px;" />
</div>
<br>

###### [Inici](#TaulaContiguts)
## Vista Desplegament: {#VistaDesplegament}

### **Diagrames de plataforma d'execució i de Xarxa** {#DiagramesPlataformaExecucioXarxa}
Afegir diagrames que ajudi a entendre quina es l'arquitectura de la infraestructura.

**Directrius**

_Cal que estigui informat i son clarament identificables tots els elements indicats a les taules d'aquesta mateixa vista. Si els esquemes de PRE i PRO son diferents, s'han de presentar dos diagrames._

### **Taula d'instàncies on-premise** {#TaulaCloudPrivat}
S'ha de crear una taula com la de la plantilla per cada un dels entorns que formen part del servei. Aquesta taula es farà servir per a les instàncies on-premise.

**Detall de cada un dels camps de la taula:**

| **Element** | **Descripció** |
| --- | --- |
| **Identificador d'instància** | Identificador únic que se li dona a aquella instancia dintre del document d'arquitectura, aquest identificador s'utilitzarà després per referenciar la instancia a la taula d'emmagatzematge i a l'apartat 4.4 on s'ha d'identificar quins servidors / instancies són noves, quines han tingut canvis o quines són compartides amb altres serveis / solucions del departament. |
| **Tipus de Servei** | <br>PaaS <br>IaaS <br>Hosting |
| **Programari i versió** | Nom del programari i versió que s'instal·la. Ha d'estar alineat amb el full de ruta del programari. En cas de sistemes/serveis nous, caldrà que les versions siguin les actuals segons el [Full de Ruta del CTTI](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#annex-a-normatiu-programari-estandarditzat:29540b9fba4cb00170570a076b9df531). |
| **Talla i recursos adicionals** | Indicar la talla de la instancia segons la següent taula i especificar si es necessari afegir algun recurs addicional com pot ser vCPUs o Gb de ram. <br><img src="/images/PlantillaDA/Talles.jpg" style="width:500px;" /> |
| **Nivell de Servei** | Continu - A - 2h 24x7 <br>Continu - STD - 1d <br>Laboral - B - 4s |

### **Taula d'emmagatzematge** {#TaulaDisc}

**Detall de cada un dels camps de la taula:**

| **Element** | **Descripció** |
| --- | --- |
| **Identificador d'Instància** | Per relacionar la taula d'elements de catàleg cloud amb el disc addicional es fa us d'aquest camp, ha de coincidir amb l'identificador de la instancia que se li ha donat a la taula anterior. |
| **Tipus de disc** {#TipusDisc} | **Blocs** - Aquest tipus d’emmagatzematge està especialment pensat per quan es necessita una capacitat de disc dur en brut, com per exemple, espai per a una BBDD Oracle. <br>**Fitxers** - Aquest tipus d’emmagatzematge està especialment pensat per quan l’usuari necessita accés a una carpeta compartida de fitxers.
| **Mida del disc** | Indicar la mida en GB del disc adicional necessari per la instancia indicada al camp "Identificador d'Instancia". |
| **Tier - Nivell de disc**  {#NivellDisc} | **Alt rendiment (TIER 1):** Dades d’alta criticitat, fitxers que s’accedeixen sovint, etc. <br>**Mig rendiment (TIER 2):** Fitxers que no s’accedeixen gaire sovint. <br>**Alta Capacitat (TIER 3):** Copies de seguretat. |
| **RTO i RPO** {#RTORPO} | **RTO:** 2 hores / 8  hores / 12 hores <br>**RPO:** RPO Zero (No pot perdre cap transacció) /  RPO Darrer Backup / |

### **Taula d'instancies cloud privat (CPD)** {#TaulaCloudPrivat}
Taula on es detalla la informació relativa als contenidors que formen part del servei.

**Detall de cada un dels camps de la taula:**

| **Element** | **Descripció** |
| --- | --- |
| **Identificador d'instància** | Identificador únic que se li dona a aquella instancia dintre del document d'arquitectura, aquest identificador s'utilitzarà després per referenciar la instancia a l'apartat 4.4 on s'ha d'identificar quins servidors / instancies són noves, quines han tingut canvis. |
| **Nombre de Pods / Contenidors** | Un POD es la unitat mes petita a crear a Kubernetes, en la majoria dels casos un POD equival a un contenidor, en aquest camp s'ha d'indicar el nombre de pods a crear del tipus que es detalla a la resta de camps de la taula. |
| **Programari i versió / Imatge Docker** | Nom del programari i versió que s'instal·la. Ha d'estar alineat amb el full de ruta del programari. Si es fa ú d'una imatge Docker ja existent al repositori oficial, indicar el seu nom. |
| **Memòria Ram  i/o recursos addicionals** | Memòria Ram assignada al Pod / Contenidor. <br>En algunes plataformes de cloud es requereix altre tipus de dades de recursos addicionals, per exemple CPU. |
| **Disc Persistent** | Indicar si es necessari o no disc persistent, en cas afirmatiu s'ha d'informar de la mida del disc en Gb. |
| **Administrat per CPD** | Indicar si el Pod / Contenidor es administrat per part del proveïdor de CPD o no disposa d'administració. |

En aquest cas, s'haurà d'informar també la taula amb el total de recursos (RAM i CPU) per al global del Namespace.

### **Taula d'instancies cloud públic (Azure, Bluemix, AWS)** {#TaulaCloudPublic}
Per remetre la informació relativa a instàncies aprovisionades en cloud públic, ja sigui en format Gestionat o No Gestionat, caldrà afegir l'export de la calculadora, no per cap control de tipus pressupostari, si no per tenir l'enumeració dels elements contractats.

### **Taula per arquitectures de la PowerPlatform Suite** {#TaulaCloudPublic}

| **Element** | **Descripció** |
| --- | --- |
| **Tipus de Producte de Power Platform** | Marcar aquells productes de la PowerPlatform Suite involucrats a l'Arquitectura de la solució  |
| **Nom dels entorns (SANDBOX, Production, etc.) i Grups de Seguretat** | Enumerar els entorns i els grups de seguretat associat a cada entorn. Indicar a més, només en el cas que no sigui West Europe, la regió i la finalitat de cadascuan dels entorns |
| **Administradors dels entorns (indicar adreça de correu gencat)** | Nom i correu electrònic dels administradors de cadascun dels entorns |
| **Requereix CDS** | Indicar si requereix o no base de dades |
| **Si requereix CDS** | Enumerar les característiques de la Base de Dades en cas d'haver contestat SI en el punt anterior |
| **Tipus d’aplicació de Power Platform** | **Model-driven** <br>**Canvas** <br>**Portals** |
| **Tipus de Connectors?** | Enumerar els connectors amb orígens de dades, tant si son Standard com si son Premium |

### **Altres dades rellevants pel desplegament:**

#### **Xarxes d'accés**
Informar de quines son les xarxes que s'utilitzen per l'acces a l'aplicació, protocol utilitzat i regles de firewall necessaries per connectar els diferents equips.

**Directrius**

_En el cas de fer crides a serveis REST, cal fer ús de ports segurs_

#### **Servei transversal SMTP**
Verificar si el servei necessita realitzar enviaments de correus electrònics

**Directrius**

_Principi d'Arquitectura 1.6.2 ([Servidors SMTP transversals](https://canigo.ctti.gencat.cat/arquitectura/principis_arq/))_

#### **ProxyPass (Sortida a Internet)**
Informar si el servei necessita sortida a internet. Fent crides altres serveis per executar processos o obtenir informació.

**Directrius**

_Principi d'Arquitectura 1.6.3 ([Accés a internet des de xCAT](https://canigo.ctti.gencat.cat/arquitectura/principis_arq/))_

#### **Altres serveis tècnics utilitzats**
Informar si es fan servir d'altres serveis tecnics com els protocols IMAP o POP3

### **Justificacions de les decisions de la Vista de Desplegament**
Cal que cadascuna de les tecnologíes estigui enumerada i justificada la seva utilització. A més, cal indicar quins entorns hi ha (INT, PRE, PRO, FOR)

###### [Inici](#TaulaContiguts)
## **Vista Operacional:** {#VistaOperacional}

### **Gestió de logs i monitorització** {#GestioLogsiMonitorització}

Detallar informació respecte als següents punts:

* Quina activitat ha de ser registrada per poder obtenir la informació crítica del servei.
* Gestió d'alertes.
* Monitoratge del rendiment.
* Rotació dels logs i polítiques de retenció.
* La ubicació del logs (ha de ser l'establerta als estàndard CTTI)"

### **Polítiques de rotació i retenció de logs** {#PolitiquesRetencio}

* **Estàndard:** Diària incremental amb 2 setmanes de retenció, setmanal completa amb 1 mes de retenció, mensual completa amb 3 mesos de retenció i anual completa amb 1 any de retenció (cobrint 1 any i 3 mesos de retenció de dades)

* **Avançada:** Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 6 mesos de retenció i anual completa amb 2 anys de retenció (cobrint 2 anys i 6 mesos de retenció de dades)

* **Especial:** Diària incremental amb 1 mes de retenció, setmanal completa amb 2 mesos de retenció, mensual completa amb 12 mesos de retenció i anual completa amb 5 anys de retenció. (cobrint 6 anys de retenció de dades)

### **Ubicació de logs** {#UbicacióLogs}
Indicar a on s'ubicarán els logs.

**Directrius**

_Principi d'Arquitectura 2.4.4 ([Nomenclatura de les infraestructures](https://canigo.ctti.gencat.cat/arquitectura/principis_arq/))_

_Cal respectar l'estandart CTTI de nomenclatura ([Estandard CTTI per a la nomenclatura de les infraestructures](https://qualitat.solucions.gencat.cat/estandards/estandard-nomenclatura-infraestructures/))_

### **Detall de les sondes** {#DetallSondes}
Definició, si es que hi ha sondes que verifiquen el correcte funcionament del servei, de que estan controlant i que resultat s'espera per validar que el servei està funcionant correctament.

---

# **Perspectives Transversals** # {#PerspertivesTransversals}

## **Seguretat** {#Seguretat}

### **Mesures de seguretat bàsiques de Cesicat** {#MesuresSeguretatBàsiquesCesicat}
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

### **Sistema d'autenticació** {#SistemaAutenticació}
Indicar el sistema d'autenticació que el servei fa servir per permetre l'accés a aquest

**Directrius**

_Principi d'Arquitectura 1.6.4 ([Gestió d'identitats](https://canigo.ctti.gencat.cat/arquitectura/principis_arq/))_

_En els nous serveis es obligatori la integració amb GICAR. En cas contrari caldrà excepció d'Arquitectura._

### **Modalitat d'integració amb GICAR** {#ModalitatIntegracióGICAR}
Definir quina modalitat d'integració amb GICAR s'està fent servir

**Directrius**

_Per més detall de cada una de les modalitats consultar el [Portal Canigó](https://canigo.ctti.gencat.cat/gicar/)_

###### [Inici](#TaulaContiguts)
## **Rendiment i escalabilitat** {#RendimentEscalabilitat}

### **Requeriments de rendiment continuar i davant pics** {#RequerimentsRendimentContinuarDavantPics}
Detallar en quin percentatge de consum de recursos es tenen que mantenir els servidors en un ús normal i quin es el máxim d'ús en una situació de pic.

### **Mesures adoptades per tal d'assolir el rendiment necessari** {#MesuresAdoptadesAssolirRendimentNecessari}
L’aplicació està preparada per l’escalabilitat horitzontal?

###### [Inici](#TaulaContiguts)
## **Disponibilitat** {#Disponibilitat}

**Directrius**

_La següent taula aclara el que impliquen els diferents nivells de servei._

| | **Horari de servei** | **RTO** | **Disponibilitat** | **Continuïtat** |
| --- | --- | --- | --- | --- |
| **Continu-A-2h** | 24x7 | 2h | 99'90% | 2 hores |
| **Continu-STD-1d** | 24x7 | 8h | 99'50% | 24 hores |
| **Laboral-B-4s** | 12x5 | 12h | 95'00% | 4 setmanes |

### **RTO del Sistema** {#RTO}
Temps que pot estar el negoci amb el servei aturat.

**Directrius**

_En cas d'escollir un RTO de 2 hores, totes les instàncies de l'arquitectura hauran d'estar en Alta Disponibilitat._

### **RPO (Punt de recuperació objectiu)** {#RPO}
En cas d’incidència quin es desitja que sigui el punt de recuperació.

### **Definir horari de servei habitual**  {#DefinirHorariServeiHabitual}
Laboral (12x5), Continu (24x7) o Altres (definir).

### **Afectació per la indisponibilitat d'entitats externes** {#AfectacióIndisponiblitatEntitatsExternes}
Presentar l'estudi de com afecta la indisponibilitat de les entitats externes al servei i proposar mesures per reduir o anular la seva afectació.

**Directrius**

_No s'ha d'informar la indisponibilitat en el cas d'eines transversals (GICAR, Ironports, antivirus, etc.) si no les entitats externes indicades a la Vista de Context._

###### [Inici](#TaulaContiguts)
## **Internacionalització** {#Internacionalitzacio}

### **Idiomes que suporta el sistema** {#IdiomesSuportaSistema}
Enumerar l'idioma o idiomes que el servei ofereix.

### **Definir com es resol l'ús multilingüe** {#DefinirResolUsMultilingüe}
En cas que el punt anterior sigui informat amb mes d'un idioma, explicar com es resol aquest ús.

---

# **Informació específica pel projecte d'aprovisionament** {# #InformacioEspecificaProjecteAprovisionament}
<br>

**Directrius**

_Aquest apartat del DA es l'únic que s'ha d'informar des del punt de vista del projecte i no des del punt de vista d'Arquitectura. Caldrà que sigui molt precís en els nous elements de la infraestructura del servei, en aquells que canvien de talla, o de versió de programari._

###### [Inici](#TaulaContiguts)
## **Informació relativa al context** {#InformacioRelativaContext}
### **Informació relativa al context**
En el cas de tractar-se de l'evolució d'un servei ja existent, en aquest apartat s'inclourà el detall de la integració amb serveis externs que en versions anteriors del DA no existien.

###### [Inici](#TaulaContiguts)
## **Informació relativa al SIC** {#InformacioRelativaSIC}
### **Informació relativa al SIC**
Dades específiques d'integració amb el SIC que no estiguessin fetes prèviament. Entorns a gestionar per el SIC, l'organització de les branques i el detall dels artefactes que el SIC desplegarà.

###### [Inici](#TaulaContiguts)
## **Informació relativa a xarxes i dominis DNS** {#InformacioRelativaXarxesDominis}
### **Informació relativa a xarxes i dominis DNS**
Definir aquelles regles de connectivitat que no estaven d'alta fins ara. Dominis DNS dels diferents entorns i aquelles pàgines que es volen protegir mitjançant GICAR.

###### [Inici](#TaulaContiguts)
## **Informació relativa a l'aprovisionament d'Infraestructura** {#InformacioRelativaAprovisionamentInfraestructura}
### **Informació relativa a l'aprovisionament d'Infraestructura**
Ha d'estar alineat amb la vista de Desplegament, tot indicant, mitjançant l'identificador d'instancies, quines es mantenen iguals, quines canvien en les seves característiques i quines son nous aprovisionaments, doncs abans no hi formaven part de la infraestructura.

###### [Inici](#TaulaContiguts)
## **Estrategia de Migració** {#EstrategiaMigracio}
### **Estrategia de Migració**
