---
title: 5G Standalone
description: Desvetllant el futur i explorant el poder del 5G Standalone. En
  aquest article, es mostra una visió general d’aquesta nova tecnologia.
date: 2023-09-28
sections:
  - Blog
  - home
categories:
  - comunicacions
  - iot
  - arquitectura
imatge: /images/bloc/2023/09/Entrada.jpg
key: OCTUBRE2023
toc: true
blog_tags:
  - comunicacions
  - iot
  - arquitectura
---

## **Introducció** {#Introduccio}

### **Què és 5G Standalone?** 

El **5G SA** és una variant de la tecnologia 5G, que pertany a la cinquena generació de xarxes mòbils. El que fa que sigui especial e innovador és que és una xarxa totalment independent, dissenyada des de zero per operar exclusivament amb tecnologia 5G.  És una evolució en les comunicacions sense fils que transforma la manera en com les persones, empreses i les màquines es connecten i interactuen en la xarxa.<br>

A nivell mundial, hi ha més de mil milions de connexions 5G a través de la cinquena generació d'estàndards de comunicació sense fil, inclosa la versió 5G Standalone (5G SA). Tot i que la majoria són compatibles amb xarxes 5G no autònomes (NSA) que depenen de xarxes 4G LTE per funcionar, els operadors sense fil, estan desplegant cada cop més la tecnologia 5G autònoma (SA), que es considera la tecnologia 5G autèntica.<br>

Les xarxes 5G SA es construeixen amb una infraestructura tant a la xarxa d'accés de ràdio (RAN) com a la xarxa bàsica, juntament amb principis nadius del núvol, com ara la virtualització, els contenidors i els microserveis. Són més flexibles, escalables i eficients en l'ús dels recursos de la xarxa, cosa que produeix una millor experiència d'usuari final per als consumidors, i costos més baixos pels operadors sense fil.<br><br>


### **Característiques del 5G SA** 

Les  principals característiques del 5G Standalone (5G SA) milloren significativament la connectivitat e impulsen la innovació a través de diverses industries.<br>

Com a pilars fonamentals es poden destacar les següents característiques:<br>

* **Velocitats Ultra-ràpides:** ofereix velocitats de dades significativament més ràpides que els seus predecessors. Pot proporcionar transferències  de dades màximes de fins a 20 Gbps, la qual cosa és ideal per aplicacions que requereixen transferències massives de dades, com la transmissió de vídeo 4K/8K i experiències d'augment de la realitat/virtuals.<br>

* **Latència Ultra-baixa:** Sovint son de tan sols 1 mil·lisegon (ms). Aquesta baixa latència permet la comunicació quasi en temps real.<br>

* **Amplada de Banda elevat:** Amb una amplada de banda significativament major que les generacions anteriors, el 5G SA pot oferir connexions d'alta velocitat i suportar una gran quantitat de dispositius connectats al mateix temps.<br>

* **Expansió de l'Internet de les Coses (IoT):** Suporta un nombre massiu de dispositius connectats per quilòmetre quadrat (fins a 1 milió de dispositius). El fa ideal per aplicacions de l'Internet de les Coses (IoT), facilitant ciutats intel·ligents, agricultura intel·ligent i tot l’IoT industrial.<br>

* **Serveis de Xarxa Personalitzats:** El Network Slicing permet als operadors de xarxa crear trossos virtuals dedicats de la xarxa adaptats a aplicacions específiques. Aquesta personalització optimitza el rendiment i la fiabilitat per diferents casos d'ús, incloent-hi comunicacions crítiques i IoT.<br>

* **Mesures de Seguretat Millorades:** Incorpora protocols i funcions de seguretat millorades, com ara el xifrat i l'autenticació per protegir les dades i les comunicacions. Es essencial en un món on les amenaces de seguretat evolucionen constantment.<br>

* **Eficiència Energètica:** Està dissenyat per ser més eficient des del punt de vista energètic que els seus predecessors, reduint el consum d'energia per bit transmès. Es fonamental per la sostenibilitat i per reduir l'empremta de carboni de les xarxes de telecomunicacions.<br>

* **Transformació de les Industries:** Pot revolucionar industries com la sanitat, la manufactura, l'educació i l'entreteniment. Permet la cirurgia remota, les fàbriques intel·ligents, l'educació en realitat augmentada i la transmissió de gran qualitat en dispositius mòbils.<br>

* **Alta Fiabilitat:** Ofereix una millora en la fiabilitat de la xarxa, assegurant una connectivitat consistent per aplicacions crítiques com els serveis d'emergència i la seguretat pública.<br>

* **Escalabilitat Flexible:** Està dissenyat per ser escalable, permetent als operadors de xarxa expandir i adaptar-les per acomodar el creixement futur de dades i dispositius.<br>

* **Interoperabilitat:** Com a estàndard reconegut a nivell mundial, es promou la interoperabilitat i la compatibilitat entre diferents proveïdors de xarxa i dispositius, fomentant un ecosistema global de xarxa cohesionat.<br>

* **Base pel 6G:** Posa les bases per les futures tecnologies de comunicació sense fils, proporcionant una base sòlida per la transició eventual al 6G i més enllà.<br>


## **Components de 5G SA** {#Components}

Els components del 5G Standalone (5G SA) són l'essència de la seva arquitectura, i és fonamental per comprendre com aquesta tecnologia revolucionària opera de manera eficient i pot habilitar una àmplia gamma d'aplicacions i serveis. A continuació, s’examinaran alguns dels components clau que en formen part.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/09/foto1.JPG" /></div>
<div align="center">Font: https://dgtlinfra.com/</div>
<br>


### **Elements de la Xarxa Central**

El elements essencials de la xarxa central són:

* **Xarxa Central (CN):** La xarxa central és on es realitza gran part de la intel·ligència i el processament al 5G. És totalment nativa de 5G, el que significa que no depèn de la infraestructura 4G. Inclou els següents components:<br>

  * Funció del Pla d'Usuari (UPF): Responsable del reenviament i encaminament de paquets de dades.
  * Funció del Pla de Control (CPF): Gestiona missatges de senyalització i de control.
  * Funció de Gestió de Sessions (SMF): Gestiona l'establiment i el manteniment de les sessions d'usuari.
  * Funció de Gestió d'Accés i Mobilitat (AMF): Gestiona el control d'accés, la gestió de la mobilitat i la seguretat.
  * Funció Servidor d'Autenticació (AUSF): Gestionar l'autenticació de l'usuari i la generació de claus de seguretat.

* **Estacions Base 5G (gNB):** Les estacions base 5G, també conegudes com gNB (gNodeB), són els punts d'accés de ràdio de 5G que connecten els dispositius mòbils a la xarxa. Aquestes estacions base són responsables de l'enviament i la recepció de senyals.<br>

* **Antenes Intel·ligents (MIMO Massive):** Les antenes MIMO (Multiple-Input, Multiple-Output) són un component clau de la RA. Aquestes antenes permeten diverses transmissions simultànies d'informació i milloren la capacitat i la fiabilitat de la connexió sense fil.<br>

* **Infraestructura de Computació (Edge):** La computació Edge es col·loca  estratègicament més a prop dels usuaris finals, reduint la latència i permetent el processament en temps real per aplicacions com la realitat augmentada, els vehicles autònoms i l'IoT.<br><br>


### **Xarxa d'Accés per Ràdio (RAN)**

* **Núvol de Control (Control Plane):** Aquesta part de la xarxa és responsable de gestionar i controlar les comunicacions entre els dispositius i els elements de la xarxa. Coordina les connexions, el manteniment de la connexió i la gestió de la mobilitat dels dispositius.<br>
* **Núvol de Dades (Data Plane):** Aquesta part de la xarxa és on es transmeten les dades entre els dispositius i altres components de la xarxa. Proporciona una connexió d'alta velocitat i baixa latència per garantir que les aplicacions i els serveis funcionin amb eficàcia.<br><br>


### **Network Slicing**

El tall de xarxa és un component crític al 5G SA, permetent que la xarxa es divideixi virtualment en múltiples segments. Aquest component gestiona la creació i la gestió dels  diferents segments. Cada segment és una xarxa virtual independent que pot estar optimitzat per un cas d'ús específic com aplicacions d'Internet de les Coses (IoT), realitat augmentada (AR) o vehicles autònoms. Aquesta capacitat permet una personalització de la xarxa segons les necessitats.<br><br>


### **Funcions virtualitzades i components d’orquestració**

* **Funcions Virtualitzades de la Xarxa (VNFs):** Són components de xarxa que poden ser virtualitzats i executats en servidors virtuals. Això permet una flexibilitat i escalabilitat més gran de la xarxa.<br>
* **Orquestrador de Xarxa:** Aquest component és responsable de coordinar i gestionar les VNFs i altres recursos de la xarxa per proporcionar els serveis requerits de manera eficient.<br>


## **5G SA vs 5G NSA** {#Comparativa}

L'elecció entre 5G Standalone (5G SA) i 5G Non-Standalone (5G NSA) és una decisió crucial en el desplegament de les xarxes 5G, ja que afecta directament la forma en què les xarxes són construïdes i les capacitats que ofereixen. En aquesta comparació detallada, s’explorarà les diferències entre aquestes dues variants de 5G.<br><br>


### **Diferències**

Es destaquen les diferencies principals en tres blocs:<br><br>

**Independència de la Xarxa 4G:**
* **5G SA:** És una xarxa completament autònoma que no requereix la presència d'una xarxa 4G. Tots els components i funcions estan dissenyats per a 5G des de zero.<br>
* **5G NSA:** Utilitza la xarxa 4G existent com a base per l'establiment de connexions inicials i la gestió de dades. Aquesta dependència pot limitar-ne les capacitats.<br>

**Latència:**
* **5G SA:** Ofereix una latència més baixa, ja que no necessita comunicar-se amb la xarxa 4G per cap funció crítica.<br>
* **5G NSA:** Pot tenir una latència lleugerament més alta degut a la necessitat de comunicar-se amb la xarxa 4G en certs escenaris.<br>

**Flexibilitat i Personalització de la Xarxa:**
* **5G SA:** Permet una major flexibilitat i personalització de la xarxa mitjançant el segments de xarxa (network slicing). Aquest fet possibilita la creació de xarxes virtuals independents adaptades a casos d'ús específics.<br>
* **5G NSA:** Té limitacions en la flexibilitat de la xarxa, ja que encara depèn de la xarxa 4G per algunes funcions, la qual cosa pot restringir les opcions de personalització.<br><br>


### **Quan triar 5G SA, en comptes de 5G NSA**

Principalment els criteris que permetran escollir la xarxa,  anirà en certa mesura en funció de la tipologia del cas d’us.<br>

* **Aplicacions crítiques de baixa latència:** Operacions que requereixen una baixíssima latència, com per exemple la cirurgia remota, els vehicles autònoms o les aplicacions de realitat augmentada, el 5G SA és la millor opció, ja que ofereix latències més baixes i predictibles.<br>
* **Flexibilitat per casos d'ús específics:** Quan es necessita adaptar la xarxa a diferents casos d'ús, com aplicacions d'Internet de les Coses (IoT), la indústria 4.0 o l'automatització industrial, el 5G SA amb segment de xarxa permet crear xarxes virtuals personalitzades per a cada situació.<br>
* **Seguretat i preparació pel futur:** Si la seguretat és una prioritat i es planteja una implementació a llarg termini, el 5G SA és una millor opció ja que està dissenyat per l'evolució futura de les xarxes sense fil més enllà del 5G.<br>



## **Usos del 5G SA** {#Usos}

El 5G Standalone (5G SA) està obrint la porta a una àmplia gamma de casos d'ús innovadors i per aplicacions que poden transformar diverses industries i facilitar noves maneres d'interactuar amb la tecnologia. A continuació, es detallen alguns dels casos d'ús més prometedors del 5G SA:<br><br>


**Automoció Intel·ligent:**
* **Vehicles Autònoms:** El baixíssim temps de latència de 5G SA permet la comunicació en temps real entre vehicles autònoms i la infraestructura viària, millorant la seguretat i la coordinació en el trànsit.<br>

**Sanitat Avançada:**
* **Cirurgia Remota:** Amb una baixa latència, els cirurgians poden realitzar cirurgies a distància amb precisió mil·limètrica utilitzant robots quirúrgics connectats a través de xarxes 5G.<br>

**Realitat Augmentada (RA) i Realitat Virtual (RV):**
* **Jocs Immersius:** Permet jocs en línia més rics i immersius amb gràfics d'alta qualitat i respostes instantànies.<br>
* **Formació i Educació:** L'educació basada en RA i RV es beneficia de la connexió de baixa latència del 5G SA, permetent experiències d'aprenentatge més interactives.<br>

**Indústria 4.0:**
* **Automatització Intel·ligent:** Les fàbriques i les plantes poden optimitzar les operacions mitjançant la connectivitat 5G SA pel control de màquines i sensors en temps real.<br>

**Internet de les Coses (IoT):**
* **Monitoratge Intel·ligent:** Es facilita la supervisió i la gestió de milers de dispositius IoT, com sensors de qualitat de l'aire, lluminària intel·ligent i sistemes de seguretat.<br>

**Ciutats Intel·ligents:**
* **Gestió del Trànsit i de la Mobilitat:** La implementació de sistemes de transport públic més eficients permet que es pugui millorar la gestió del trànsit amb semàfors intel·ligents per posar un exemple.<br>

**Entreteniment i Mitjans de Comunicació:**
* **Streaming i contingut en directe:** Les transmissions en directe de vídeo amb qualitat 4K i 8K es beneficien de la baixa latència i l'amplada de banda de 5G SA.<br>

**Ciència i Investigació:**
* **Investigació Científica en Temps Real:** Les institucions científiques poden realitzar experiments i recopilar dades en temps real amb la velocitat i la fiabilitat de 5G SA.<br>

**Comunicacions Empresarials:**
* **Conferències i Col·laboració en Línia:** Les empreses poden millorar les seves comunicacions i col·laboració amb conferències de vídeo i eines de comunicació en línia de qualitat superior.<br>

**Serveis d'Emergència Millorats:**
* **Resposta Ràpida:** Permet una millora significativa en les comunicacions d'emergència, reduint el temps de resposta en situacions crítiques.<br><br>

Aquests són alguns dels exemples on el 5G SA pot habilitar. La baixa latència, l'amplada de banda, la seguretat millorada i la flexibilitat de les xarxes 5G SA obren la porta a la innovació i la millora en una àmplia gamma d'indústries i àmbits d'aplicació. A mesura que aquesta tecnologia es desplegui i es desenvolupin més casos d'ús, es poden esperar canvis significatius en la forma en què vivim i treballem.<br>


## **Seguretat** {#Seguretat}

La seguretat és una preocupació fonamental en les xarxes 5G SA ja que aquesta tecnologia introdueix noves dimensions i desafiaments en la protecció de dades i comunicacions. <br>

Algunes d’aquestes característiques son:<br>

* **Xifrat Fort:** S’utilitzen mètodes de xifrat forts per protegir les dades en trànsit permetent que les comunicacions entre els dispositius i la xarxa siguin segures i pràcticament impossibles de ser interceptades per atacants.<br>
* **Autenticació i identificació fortes:** S’implementa l’autenticació i identificació de forma rigorosa per garantir que els dispositius i els usuaris estiguin autoritzats a accedir a la xarxa, prevenint l'accés no autoritzat.<br>
* **Gestió de polítiques de seguretat:** Els segments de xarxa poden tenir les seves pròpies polítiques de seguretat personalitzades. Aquesta granularitat permet adaptar les mesures de seguretat a les necessitats específiques de cada aplicació o servei.<br>
* **Segmentació de la xarxa:** Es  pot segmentar la xarxa en múltiples dominis virtuals, reduint la superfície d'atac i aïllant els problemes de seguretat en àrees específiques sense afectar tota la xarxa.<br>
* **Actualitzacions Remotes i Gestió de Vulnerabilitats:** Es permeten les actualitzacions remotes de seguretat, la qual cosa facilita la correcció de vulnerabilitats i l'actualització dels dispositius i la xarxa per mantenir-los segurs.<br>
* **Col·laboració entre Llindars i Estàndards de Seguretat:** L’industria treballa estretament en definir estàndards de seguretat que assegurin la protecció de les xarxes 5G SA i la interoperabilitat entre dispositius i solucions de diferents proveïdors.<br>


En resum, el 5G SA adopta una sèrie de mesures de seguretat per abordar els desafiaments plantejats per la seva pròpia complexitat i les noves capacitats que ofereix. Aquest enfocament busca garantir que les xarxes d’aquest tipus, siguin segures i confiables per a una àmplia gamma de casos d'ús, des de la conducció autònoma fins a la telemedicina i més enllà.<br>


## **Network Slicing** {#NetworkSlicing}

### **Què és el Network Slicing?**

És una característica arquitectònica central de la tecnologia 5G Standalone (5G SA) que permet als operadors de xarxes crear múltiples xarxes virtuals, cadascuna adaptada a casos d'ús o serveis específics. Permet compartir eficientment una única infraestructura física de xarxa 5G mentre proporciona recursos de xarxa aïllats i dedicats per a diferents aplicacions.<br><br>


### **Implementació i Desafiaments**

Implementar el tall de xarxa requereix canvis significatius a l'arquitectura de la xarxa, incloent funcions de nucli, accés de ràdio i funcions de gestió. Aquests canvis poden ser complexos i consumir temps. Per a dur el canvi a terme, són necessaris sistemes d'orquestració i gestió eficaços per crear, assignar i gestionar dinàmicament els segments de xarxa que permetin definir i fer complir polítiques específiques per cada segment.<br>

L’assignació eficient de recursos és crucial per assegurar que els segments rebin els recursos necessaris sense cap impediment utilitzant algoritmes avançats i mecanismes de monitoratge.<br>

Addicionalment, també s’hauran de garantir els següents tres desafiaments:<br>

* **Interoperabilitat:** Garantir la interoperabilitat entre l'equip i els sistemes de diferents proveïdors és un desafiament en la implementació del tall de xarxa. Els esforços d'estandardització busquen abordar aquesta qüestió.<br>
* **Seguretat i Privadesa:** Cada segment de xarxa ha de mantenir mesures estrictes de seguretat i privadesa per prevenir l'accés no autoritzat o les violacions de dades. Els mecanismes d'aïllament són essencials per aconseguir-ho.<br>
* **Escalabilitat:** A mesura que el nombre de segments de xarxa augmenta, la escalabilitat esdevé una preocupació. Els operadors han de garantir que la seva infraestructura pugui suportar eficientment un nombre creixent de segments.<br>

De forma resumida, és una capacitat potent que permet als operadors de xarxes proporcionar serveis personalitzats i dedicats per una àmplia gamma d'aplicacions. Tot i que ofereix nombrosos avantatges, la seva implementació implica abordar desafiaments complexos relacionats amb l'arquitectura, la gestió de recursos, la seguretat i la interoperabilitat. <br>



## **Desplegament i llançament de 5G SA** {#Desplegament}

La implementació i desplegament de les xarxes 5G Standalone han guanyat impuls a tot el món, obrint una nova era de connectivitat. En aquest apartat es tractarà l'adopció global, els reptes, les consideracions i els plans de futur per l'expansió.<br><br>


### **Adopció a Nivell Mundial**

* **Amèrica del Nord:** Els Estats Units i el Canadà han vist extenses implementacions de 5G SA, amb grans operadors que ofereixen cobertura generalitzada a les àrees urbanes.<br>
* **Àsia-Pacífic:** Països com Corea del Sud i el Japó han emergit com a líders en l'adopció de 5G SA, mostrant el potencial de la tecnologia.<br>
* **Europa:** Diversos països europeus han fet passos significatius en la implementació de 5G SA, amb un enfocament en aplicacions industrials i d'Internet de les Coses (IoT).<br>
* **Orient Mitjà i Àfrica:** Algunes nacions de l'Orient Mitjà estan invertint activament en infraestructures 5G SA per suportar ciutats intel·ligents i la transformació digital.<br>
* **Amèrica Llatina:** Vàries nacions d'Amèrica Llatina estan en les primeres etapes del desplegament de 5G SA, amb l'objectiu de reduir la bretxa digital.<br>

<br>
<div align="center"> <img src="/images/bloc/2023/09/foto2.JPG" /></div>
<div align="center">Font: https://es.statista.com/</div>
<br>

### **Consideracions**

Es destaca els següents punts a nivell general  a tenir en compte:<br>

* **Inversió en infraestructura:** Desplegar xarxes 5G SA requereix d’una inversió substancial en infraestructura, incloent l'actualització de les xarxes de nucli i la implementació de noves estacions base.<br>
* **Assignació de l'espectre:** Adquirir i assignar l'espectre necessari per a serveis 5G pot ser un procés llarg i regulat.<br>
* **Preocupacions de seguretat:** Les xarxes 5G SA introdueixen nous reptes de seguretat que requereixen mesures sòlides per protegir-se contra amenaces cibernètiques.<br>
* **Ecosistema de dispositius:** La disponibilitat de dispositius compatibles amb 5G SA és crucial per l'adopció massiva, i la seva assequibilitat és una consideració important.<br>
* **Compliment regulatori:** El compliment de les normatives i regulacions internacionals i nacionals és obligatori pels operadors de xarxes.<br>
* **Educació de l'usuari:** Educar els clients sobre els beneficis i capacitats dels serveis 5G SA és essencial per l'adopció.<br>


## **5G SA i més enllà** {#MesEnlla}

L'evolució de les tecnologies de comunicació sense fils és un viatge en curs, i el 5G Standalone (5G SA) representa una fita significativa. En aquest apartat es tractarà el potencial evolutiu del 5G SA, el camí cap al 6G i les tecnologies i tendències emergents.<br><br>


### **Potencial Evolutiu**

* **Avenços en el Tall de Xarxa:** El refinament continu del tall de xarxa permetrà la creació de serveis de xarxa cada cop més personalitzats i especialitzats per diferents sectors i aplicacions.<br>
* **Integració d'Internet de les Coses (IoT):** El 5G SA continuarà jugant un paper fonamental en la connexió de milers de milions d'aparells IoT.<br>
* **Computació Edge (Edge Computing):** La integració de la computació edge amb el 5G SA reduirà la latència i millorarà el processament en temps real per aplicacions com vehicles autònoms i realitat augmentada.<br>
* **Intel·ligència Artificial (IA) i Aprenentatge Automàtic (ML):** La sinergia entre el 5G SA i la IA/ML portarà a xarxes més intel·ligents, manteniment predictiu i millores en les experiències d'usuari.<br>
* **Connectivitat Massiva:** La capacitat del 5G SA per a la connectivitat massiva fomentarà innovacions en la monitorització remota, les xarxes elèctriques intel·ligents i la detecció ambiental.<br><br>


### **El Camí a 6G**

Mentre el 5G SA encara es troba en les primeres etapes de desplegament global, les discussions sobre el futur, específicament el 6G, ja han començat. A continuació es mostra com podria ser el camí cap al 6G:<br>

* **Freqüències Més Altes:** S'espera que el 6G explori freqüències encara més altes, potser fins al rang de terahertz, per proporcionar velocitats de dades ultra altes.<br>
* **Integració d'IA:** L'IA serà part integral del 6G, permetent xarxes autònomes i aplicacions més sofisticades.<br>
* **Comunicació Quàntica:** Les tecnologies quàntiques podrien oferir comunicació segura i instantània.<br>
* **Comunicació Hologràfica:** El 6G podria introduir la comunicació hologràfica, proporcionant interaccions immersives i realistes.<br>
* **Metamaterials:** Els metamaterials amb propietats electromagnètiques úniques podrien revolucionar el disseny d'antenes i el processament de senyals.<br>
* **Xarxes Basades en l'Espai:** La implementació de constel·lacions de satèl·lits per la connectivitat global és una tendència emergent amb implicacions per les futures xarxes sense fils.<br>
* **Tecnologies Integrades en el Cos:** La integració de la tecnologia sense fils amb el cos humà per la monitorització de la salut i la millora.<br>



## **Referències** {#Referencies}
https://www.ericsson.com/en/ran/5g-sa <br>
https://www.qualcomm.com/research/5g <br>
https://ieeexplore.ieee.org/ <br>
https://dgtlinfra.com/5g-standalone-sa/ <br>
https://www.statista.com/chart/23194/5g-networks-deployment-world-map/ <br>
https://www.itu.int/en/mediacentre/backgrounders/Pages/5G-fifth-generation-of-mobile-technologies.aspx <br>



## **Glossari** {#Glossari}

* **5G Standalone (5G SA):** Una arquitectura de xarxa 5G autònoma que no depèn de la infraestructura 4G.<br>
* **Network Slicing:** Una tecnologia que permet dividir una única xarxa física en múltiples xarxes virtuals (VNF), cada una adaptada a aplicacions específiques.<br>
* **Latència de transmissió:** El retard en la transmissió de dades entre dispositius en una xarxa, mesurat en mil·lisegons (ms).<br>
* **Internet de les Coses (IoT):** Una xarxa de dispositius físics i objectes interconnectats que comuniquen i intercanvien dades a través d'Internet.<br>
* **Edge Computing:** Processar les dades més a prop de la font (a la vora de la xarxa) per reduir la latència i millorar els temps de resposta.<br>
* **Intel·ligència Artificial (IA):** La simulació de la intel·ligència humana en màquines, permetent-les realitzar tasques que normalment requereixen intel·ligència humana.<br>
* **Terahertz:** Una unitat de mesura de freqüència a la gamma de terahertz (THz), 1000 vegades més elevada que gigahertz (GHz), sovint utilitzada per a comunicacions sense fils d'altíssima freqüència.<br>
* **Metamaterials:** Materials artificials dissenyats per tenir propietats electromagnètiques úniques no trobades a la naturalesa.<br>
* **Orquestració de Xarxa:** L'automatització i gestió dels recursos de la xarxa per optimitzar el rendiment.<br>



<br>

#### Àrea d'Arquitectura d'Entorn Digital de Treball i Comunicacions
#### Direcció Infraestructures