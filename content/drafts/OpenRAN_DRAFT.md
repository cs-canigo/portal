+++
date        = "2023-05-26"
title       = "Open RAN"
description = "Open RAN"
sections    = ["Blog"]
categories  = ["comunicacions"]
+++

---

# **Open RAN**

---

## **Taula de Continguts** {#TaulaContiguts}
1. [Introducció](#Introduccio)
2. [Components de l'Arquitectura Open RAN](#ComponentsArquitectura)
3. [Avantatges i reptes Open RAN](#AvantatgesReptes)
4. [Conclusions](#Conclusions)
5. [Referències](#Referencies)
6. [Glossari](#Glossari)

---

## **Introducció** {#Introduccio}

Tradicionalment, en l'àmbit de les xarxes d'accés per ràdio (RAN), els operadors de telecomunicacions adquirien equips d'un únic proveïdor. Això significava que, si un operador desitjava desplegar una xarxa, es veia limitat en quant a les tecnologies i equips que podia utilitzar, ja que estava restringit a un sol proveïdor. Aquest és un dels principals motius pels quals neix el concepte de xarxes obertes Open RAN, amb la finalitat de poder desplegar xarxes utilitzant components de diferents proveïdors. <br>

<br>
<div align="center">
  <img src="/images/bloc/2023/05/Imatge2.jpg" text="Font: www.mathworks.com"/>
</div>
<br>

**Open RAN (Open Radi Access Network)** és un concepte basat en la interoperabilitat i la normalització dels elements de les xarxes d'accés per ràdio (RAN) de les xarxes mòbils, la qual cosa inclou un estàndard d'interconnexió unificat per elements de maquinari i elements de programari de codi obert de diversos proveïdors. <br>

El Open RAN és una tecnologia que es pot aplicar a qualsevol generació de xarxes mòbils (encara que hagi sorgit principalment per al seu ús, en les xarxes de 5G).<br>

Està basada en 5 principis:

* Interfícies obertes<br>
* COTS com a maquinari<br>
* Virtualització i funcionalitats definides per programari<br>
* Interoperabilitat<br>
* Multi proveïdor<br> 


### **Importància de l'estàndard** 

L'arquitectura Open RAN és important perquè proporciona un enfocament més obert, flexible e innovador per la construcció de xarxes sense fils que poden oferir un millor rendiment, costos més baixos, i una millor seguretat i resiliència.<br>

A més, l'augment del trànsit de les xarxes mòbils i dels equips que la formen, han d'evolucionar cap a solucions de programari virtualitzades, flexibles, intel·ligents i eficients energèticament. <br>

Open RAN  és particularment rellevant per la construcció de la infraestructura 5G.<br>

<br>
<div align="center">
  <img src="/images/bloc/2023/05/Imatge3.png" text="Font:Viavisolutions"/>
</div>
<br>

### **Aliança O-RAN** 

L’Aliança O-RAN  és una comunitat mundial d'operadors mòbils, venedors i institucions acadèmiques i de recerca amb la missió de remodelar les xarxes d'accés de ràdio.  Es va fundar el febrer de 2018 amb la intenció de promoure una RAN intel·ligent, oberta, virtualitzada i totalment interoperable.<br>

L’Aliança O-RAN desenvolupa, impulsa i fa complir estàndards per garantir que els equips de diversos proveïdors interaccionin entre ells.<br> 



## **Components de l’Arquitectura Open RAN** {#ComponentsArquitectura}

L'arquitectura O-RAN es compon de diversos components que treballen junts per proporcionar connectivitat sense fil entre dispositius mòbils i la xarxa central. Aquesta és una explicació de cada component en termes senzills:<br>

<br>
<div align="center">
  <img src="/images/bloc/2023/05/Imatge4.png" text="Font:5gworldpro"/>
</div>
<br>

* **Radio Access Network (RAN):** és responsable de connectar dispositius mòbils a la xarxa sense fil. Inclou maquinari i programari que transmeten i reben senyals de ràdio, així com antenes que es troben en torres cel·lulars o altres estructures.<br> 
* **Unitat de Ràdio (RU):** és el maquinari físic que transmet i rep senyals de ràdio. Inclou l'antena i el transceptor de ràdio, que converteix els senyals de ràdio en senyals digitals que poden ser processats per la RAN.<br> 
* **Unitat Centralitzada (CU):** és responsable de coordinar la comunicació entre el RAN i la xarxa central. Processa els senyals rebuts de la RAN i els envia a la xarxa central. La CU es pot localitzar al núvol, i es pot virtualitzar per funcionar en maquinari estàndard.<br>
* **Unitat Distribuïda (DU):** és responsable del processament de senyals de ràdio i la seva transmissió a la CU. Normalment es troba més a prop de la RAN que de la CU, i també es pot virtualitzar per funcionar en maquinari estàndard.<br>

Aquests components inclouen interfícies obertes, virtualització i control intel·ligent tal com es mostra en  la imatge anterior:<br>

* (1) Les interfícies obertes permeten la combinació d'equips RAN de diferents proveïdors, proporcionant als operadors de telecomunicacions, la possibilitat d'evitar el bloqueig del proveïdor i seleccionar una configuració d'equip optimitzada.<br>
* (2) La virtualització, o RAN virtualitzada (vRAN), separa els components de maquinari i programari dins de l'equip RAN, donant lloc a reducció de costos mitjançant l'ús de maquinari d'ús general. A més, la flexibilitat i l'escalabilitat es poden augmentar mitjançant la vRAN.<br>
* (3) El control intel·ligent (RIC) és un element especialitzat de l'arquitectura Open RAN que realitza funcions de gestió de serveis i polítiques, anàlisis RAN i Intel·ligència Artificial (IA) / Aprenentatge Automàtic (ML) per proporcionar una gestió automatitzada i intel·ligent, alhora que optimitza els recursos de radi en xarxes complexes.<br>


L'aliança O-RAN pretén definir l'arquitectura RAN de referència per la nova generació de xarxes mòbils. Es per això, que aquesta nova arquitectura haurà de seguir els principis d'intel·ligència i obertura, permetent la implementació d'una RAN virtualizada desplegada sobre maquinari genèric.<br>

<br>
<div align="center">
  <img src="/images/bloc/2023/05/Imatge5.jpg" text="L'arquitectura d'alt nivell d'Open RAN proposada per l'aliança O-RAN"/>
</div>
<br>

L'arquitectura proposada segueix un disseny modular, dividit en capes. Cal destacar d'una banda les capes de gestió i administració de xarxa, i per un altre, les capes inferiors amb la
funcionalitat de RRU, DU i CU i per descomptat les interfícies que les connecten. A continuació una explicació de cada capa:<br>

* **SMO (Service Management & Orchestrator):** aquesta entitat és l'encarregada de supervisar els aspectes d'orquestració, gestió i automatització de la RAN.<br> 
* **Non-Realtime (RT) RAN Intelligent Controller (RIC):** aquest controlador és l'encarregat de la gestió i optimització en temps no real dels recursos de la RAN, a més és responsable de controlar el flux de treball de la IA i l'aprenentatge automàtic, inclosa la formació i la creació de models per a la correcta funcionalitat del controlador intel·ligent de RAN,  Near-Realtime (RT)  RAN Intelligent Controller (RIC).) Tot això de manera estandarditzada.<br>
* **Near-Realtime (RT) RAN Intelligent Controller (RIC):** està situat en les capes inferiors. Aquest controlador és l'encarregat del control i l'optimització gairebé en temps real dels elements i recursos de la xarxa d'accés radio. A més, té la funció d'interpretar i aplicar les polítiques definides pel Non-RT RIC.<br>
* Near-RT RIC està format per una plataforma en la qual s'alberguen diferents aplicacions conegudes com xApps. Les xApps tenen la funcionalitat d'habilitar aquest controlador per a gestionar les funcions RRM (Radi Resource Management), això és possible gràcies a la interfície E2, que connecta aquest controlador amb la resta dels elements. El Near-RT RIC és capaç de controlar la mobilitat i equilibrar la càrrega per mitjà de l'intercanvi de missatges entre les xApps i les CU per mitjà de la interfície E2.<br> 
* Seguint amb la resta dels elements de les capes inferiors, trobem els
tres elements fonamentals abans esmentats: RU, DU i CU, tots ells adaptats a la nova arquitectura.<br>


## **Avantatges i reptes Open RAN** {#AvantatgesReptes}

L'arquitectura Open RAN proporciona un enfocament més obert, flexible e innovador per  la construcció de xarxes sense fils que poden oferir un millor rendiment, costos més baixos, i una millor seguretat i resiliència.<br>

Els **principals avantatges** són:<br> 

* **Augmenta la flexibilitat i l'agilitat:** Les xarxes sense fils tradicionals es construeixen utilitzant components propietaris que estan estretament integrats i poden ser difícils d'actualitzar o modificar. L'arquitectura Open RAN permet una major flexibilitat en la selecció i integració de components de diferents proveïdors, facilitant la personalització i optimització de la xarxa per complir requisits específics.<br> 
* **Millora de la diversitat del proveïdor i la innovació:** L'arquitectura Open RAN crea un mercat més competitiu i divers pels components de la xarxa, que pot conduir a més innovació i costos més baixos. També permet als proveïdors més petits entrar al mercat i competir en igualtat de condicions amb els proveïdors més grans.<br>
* **Interoperabilitat millorada:** L'arquitectura Open RAN utilitza interfícies estandarditzades entre components, facilitant la integració de diferents components i reduint el risc de bloqueig del proveïdor, permetent millorar la interoperabilitat amb altres xarxes i reduir el cost i la complexitat de la gestió de xarxes.<br>
* **Millorar la seguretat i la resiliència:** També permet als operadors implementar mesures de seguretat a diferents nivells de la xarxa, facilitant la identificació i l'aïllament de les amenaces de seguretat. També pot proporcionar una major resistència a les aturades i interrupcions de la xarxa.<br>

S’estan identificant **alguns problemes** que s’han d'abordar a mesura que s’avança:<br>

* **Superació de la complexitat d'integrar solucions de diversos proveïdors:** L'obertura i la interoperabilitat requereixen col·laboració per establir estàndards i per garantir que les tecnologies i les solucions de diversos proveïdors, puguin treballar juntes.<br> Els proveïdors d'Open RAN poden desenvolupar i perfeccionar les seves solucions, però els operadors han de proporcionar oportunitats per integrar aquestes solucions a les seves xarxes per demostrar-les sobre el terreny. Això requereix inversió. Posar capital al mercat permetrà que tant els operadors com els venedors treballin junts per desenvolupar una major experiència en Open RAN.<br> També cal tenir en compte que la complexitat d'integrar ecosistemes fets a partir de components construïts per diversos proveïdors, serà més fàcil a mesura que la indústria adquireixi experiència.<br>
* **Introduir l'eficiència energètica a l'ecosistema:** El consum d'energia i l'eficiència energètica general són consideracions importants pels operadors de xarxa, no només per fer el que és responsable amb el medi ambient, sinó també per consideracions de fons òbvies, com ara el **cost total de propietat (TCO)**.<br> L'eficiència energètica també continuarà millorant a mesura que les empreses treballin juntes per perfeccionar l'Open RAN en les seves tecnologies relacionades.<br>
* **Abordar problemes de seguretat:** En permetre la integració de components de múltiples proveïdors, és necessari garantir la seguretat d'extrem a extrem en la xarxa, ja que s’augmenta la superfície d'atac potencial i la complexitat d'assegurar la integritat i confidencialitat de la xarxa.<br> Això implica que els operadors i els proveïdors es comprometin a treballar entre ells i amb les autoritats reguladores nacionals i els organismes d'estàndards de la indústria, per garantir que les solucions Open RAN es despleguin i es gestionin de manera segura.<br>
* **Rendiment:** A mesura que es desagreguen les funcions de la xarxa en components virtuals, és essencial garantir que el rendiment de la xarxa no es degradi. Això inclou l'optimització de latència, capacitat d'amplada de banda i la qualitat de servei en tota la xarxa d'accés de ràdio.<br> També és important abordar els desafiaments de coordinació i sincronització entre els diferents components per a aconseguir un rendiment òptim.<br>
* **Deficiència energètica:** El creixement de la IA i l'ús intensiu de recursos computacionals, poden plantejar desafiaments en termes de consum d'energia. A mesura que s'apliquen tècniques de IA/ML en Open RAN, és important trobar maneres d'optimitzar el rendiment energètic i reduir el consum d'energia. Això implica la implementació d'algorismes eficients, el disseny de maquinari energèticament eficient i l'adopció de polítiques de gestió d'energia adequades.<br>
* **Costos i retorn d'inversió:** Si bé Open RAN té el potencial de reduir costos i augmentar la competència en permetre l'elecció de proveïdors, també pot generar desafiaments en termes de costos d'implementació i manteniment. Els operadors de xarxes han d'avaluar acuradament els costos associats cap a la transició a Open RAN i garantir un retorn d'inversió adequat.<br>

### **La importància de l'Open RAN pel 5G** 

El desenvolupament del 5G és un problema per les companyies de telecomunicacions. Els costos de la infraestructura de les xarxes anteriors ja eren elevats, i amb el 5G s'han disparat. Atès que el rang d'abast és molt més curt que el de les generacions anteriors i que les xarxes 5G necessiten més estacions base per a aconseguir donar la mateixa cobertura que amb altres xarxes, s’ ha d'invertir més en equipament. I si es segueix amb la dependència d'un fabricant pel seu desenvolupament i manteniment, els costos generals es disparen. D'aquí ve l’interès d’Open RAN, ja que augmenta l'oferta de components que es poden utilitzar, i per tant, la competència de preus.<br>

Encara es més rellevant en el cas de les empreses que vulguin desplegar xarxes privades 5G, i també 4G. Un dels principals obstacles per la seva adopció, malgrat la seva popularitat entre les companyies pel que pot oferir-los quant a connectivitat, és el seu elevat cost. Open RAN canvia això, la qual cosa fa que més empreses puguin accedir als elements que necessiten per desplegar la seva xarxa privada.<br>


## **Conclusions** {#Conclusions}

En resum, l'arquitectura Open RAN és una xarxa d'accés de ràdio (RAN) que connecta dispositius mòbils a la xarxa sense fils.<br>

Mitjançant l'ús d'interfícies obertes i maquinari desagregat, l'arquitectura Open RAN promou la diversitat del proveïdor i l'estalvi de costos alhora que proporciona la flexibilitat necessària per satisfer les necessitats canviants de la indústria sense fils.<br>

L'arquitectura O-RAN està guanyant interès dels operadors de xarxa sense fil per implementar xarxes 5G. Conduïda per l'aliança O-RAN amb més de 230 operadors i proveïdors, l'arquitectura es defineix com una estructura RAN desagregada amb plena interoperabilitat, utilitzant la infraestructura de núvol com a plataforma de xarxa comuna.<br>

Open RAN ofereix totes les possibilitats per permetre un gran avenç en el panorama tecnològic de xarxa i és capaç d'abordar la majoria de les mancances actuals de les RAN gràcies a l'obertura i la intel·ligència afegida. No obstant això, a causa d'aquest enfocament totalment nou, on ara diversos proveïdors podien integrar la seva tecnologia simultàniament, existeix un ecosistema més complex, que genera una multitud de nous riscos i oportunitats.<br>

L'Open RAN  jugarà un paper important a les xarxes de demà. No només per implementar xarxes 5G, on els operadors i els proveïdors de solucions treballen junts per desenvolupar solucions per un sistema creixent de casos d'ús, també és fonamental per l'evolució cap al 6G.<br>


## **Referències** {#Referencies}
https://www.o-ran.org/ <br>
https://www.computerworld.es/tecnologia/que-es-open-ran <br>
https://recursos.bps.com.es/files/1193/58.pdf <br>
https://docs.aws.amazon.com/whitepapers/latest/open-radio-access-network-architecture-on-aws/conclusion.html <br>
https://www.zoostock.com/tecnologia/la-tecnologia-ran-y-las-redes-5g <br>
https://arxiv.org/pdf/2202.01032.pdf <br>
https://www.spirent.com/blogs/recognizing-the-challenges-of-making-open-ran-work <br>
https://www.techplayon.com/open-ran-o-ran-reference-architecture/#O-RAN_Reference_Architecture <br>



## **Glossari** {#Glossari}

* **COTS (Commercial Off-The-Shelf):** Es refereix a productes o solucions que estan disponibles al mercat i que no requereixen desenvolupament o personalització addicional. L'ús de solucions COTS permet a les organitzacions estalviar temps i recursos en utilitzar productes ja existents en lloc de desenvolupar-los des de zero.
* **RRU (Remote Radio Unit):** És una unitat compacta que conté els components de radi necessaris per transmetre i rebre senyals sense fils. Les RRU s'instal·len en torres de telecomunicacions o pals, generalment prop de les antenes, i es connecten a través de fibra òptica o cables coaxials a unitats de processament centralitzades.
* **DU (Distributed Unit):** Es la unitat de processament i control de la xarxa mòbil, com la programació i la gestió de radis. 
* **CU (Control Unit):** És l’encarregada de les funcions de processament i control més tradicionals. Proporciona suport per a capes superiors de la pila de protocols.
* **TCO (Total Cost of Ownership):** El cost total associat a l’adquisició, implementació, operació i manteniment d’un actiu. 
* **Transceptor de ràdio:**  Equip electrònic que combina un receptor i un transmissor. Permeten una comunicació bidireccional a través de les ones.


<br>
<br>
###### **Unitat Arquitectura d'Entorn Digital de Treball i Comunicacions** <br>
###### **Direcció Infraestructures**
