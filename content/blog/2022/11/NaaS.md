+++
date        = "2022-11-21"
title       = "NaaS. Visió General"
description = "Les fórmules de pagament per ús estan a l'ordre del dia. Les alternatives com SaaS (Software com a Servei), IaaS (Infraestructura com a Servei) o PaaS (Plataforma com a Servei) són cada vegada més conegudes i sol·licitades pel mercat i no és d'estranyar que la xarxa també segueixi aquesta tendència. D’aquí apareix NaaS (Network as a Sevice)."
responsable = "Unitat d'arquitectura"
sections    = ["Blog", "home"]
blog_tags   = ["comunicacions", "cloud", "sd wan", "sdn"]
categories  = ["comunicacions", "cloud", "sd wan", "sdn"]
imatge      = "/images/bloc/2022/11/NaaS.png"
key         = "NOVEMBRE2022"
+++

---

# **NaaS. Visió General**

---

## **Taula de Continguts** {#TaulaContiguts}
1. [Introducció] (#Introduccio)
2. [Què és NaaS] (#QueEsNaaS)
3. [Característiques de la tecnologia] (#Caracteristiques)
4. [Principals avantatges i inconvenients] (#AvantatgesInconvenients)
5. [Models de Servei] (#ModelServei)
6. [Principals proveïdors de NaaS] (#Proveidors)
7. [Referències] (#Referencies)
8. [Glossari] (#Glossari)

---

## **Introducció** {#Introduccio}

Els servidors van ser el primer  objectiu de virtualització, després es van virtualitzar  les aplicacions a través de Software-as-a-service (SaaS), i l'emmagatzematge i la computació es van fer disponibles virtualment. Té sentit, per tant,  que la xarxa segueixi finalment aquesta tendència. Però la xarxa com a servei (NaaS) planteja problemes que els altres mai van afrontar. <br>

És impossible substituir el cablejat i les connexions de xarxa per serveis al núvol. Independentment de la solució de NaaS, l'empresa que consumeix encara requereix connexions físiques a Internet i telefonia per contactar amb el núvol. <br>

Hi ha moltes variants de NaaS que van des d'operadors de xarxes virtuals mòbils (MVNO), connectivitat de xarxa multiprotocol (MPLS), connectivitat de xarxa d’àrea amplia (WAN) connectivitat de centre de dades a través de xarxes definides per programari, amplada de banda a la demanda, diversos serveis de seguretat de xarxa, xarxes de lliurament de continguts, xarxes privades virtuals (VPNs), SD-WAN, SASE (Secure Access Service Edge), WAN Optimization-as-a-Service, i moltes altres aplicacions relacionades amb la xarxa. <br>

Els que ofereixen aquests serveis, van des de la multitud de núvols (Amazon, Rackspace, etc.), els principals proveïdors de telefonia (AT.T, Level 3 Communications, Telefònica, Verizon), així com empreses nínxols. <br>

<br>
<div align="center">
  <img src="/images/bloc/2022/11/Imatge2.jpg" text="Font: cloudflare.com"/>
</div>
<br>

## **Què és NaaS?** {#QueEsNaaS}

NaaS és un terme general per descriure un tipus de model de consum de xarxa, on el servei és gestionat per un proveïdor de serveis administrats (MSP). <br>

NaaS (Network-as-a Service) es pot entendre com un model de servei de xarxa que es basa en pagament per ús, en el qual el client sol·licita la infraestructura de xarxa incloent-hi: maquinari, programari, eines de gestió, llicències i serveis de cicle de vida. <br>

## **Característiques de la tecnologia** {#Caracteristiques}

La virtualització de diversos actius de xarxa i infraestructura, ha permès un model de lliurament al núvol. Actualment, a través de desenvolupaments de xarxes definides per programari (SDN) i virtualització de funcions de xarxa (NFV), l'aprovisionament de xarxes és possible sota demanda i en temps real, a través de plataformes d'interconnexió especialitzades. <br>

NFV permet redissenyar xarxes tancades amb diverses funcions de programari que s'executen en servidors bàsics, mentre que SDN separa i centralitza el programari de control de xarxa de la funció de reexpedició de trànsit de xarxa mitjançant el protocol OpenFlow, la qual cosa permet un nou model d'orquestració: aprovisionament i optimització de serveis de xarxa en temps real a través de la programació del software. <br>

Aquesta funció de control definida per software centralitzat, permet la creació i el consum de serveis de xarxa al núvol. <br>

NaaS proporciona una infraestructura de xarxa virtualizada que ofereix connectivitat de centre de dades, connectivitat de xarxa d'àrea àmplia, demanda d'amplada de banda i altres aplicacions. <br>

Els clients poden implementar protocols d'encaminament i aplicar polítiques de seguretat personalitzades. <br>

<br>
<div align="center">
  <img src="/images/bloc/2022/11/Imatge3.jpg" text="Font: slideteam.net"/>
</div>
<br>

## **Principals avantatges i inconvenients** {#AvantatgesInconvenients}

Els principals avantatges del NaaS són: <br>

* **Agilitat, flexibilitat i escalabilitat.** L'ús creixent d'aplicacions basades al núvol i el pas a un entorn de treball híbrid han augmentat la complexitat i les demandes de l'arquitectura de xarxa. En conseqüència, ha augmentat l'atractiu de l'enfocament àgil que proporciona NaaS. L'adaptabilitat de la xarxa pot ajudar a afrontar una necessitat inesperada i sense precedents de canvi ràpid. <br>
La flexibilitat de NaaS es pot aplicar a serveis com ara WAN (SD-WAN), serveis de comunicacions unificats i moltes altres aplicacions. Els canvis s'implementen mitjançant programari, no maquinari, creant una xarxa més flexible i programable. Per exemple, les xarxes es poden reconfigurar sota demanda, i les noves ubicacions d'oficina es poden afegir en menys temps.
* **Accessibilitat.** En funció de com estigui configurada la xarxa al núvol, es pot accedir a l'aplicació des de qualsevol lloc i en qualsevol moment sense una VPN i independentment de la plataforma o dispositiu utilitzat per l'accés. 
NaaS pot proporcionar a les empreses cobertura global, connectivitat de baixa latència habilitada per una xarxa troncal POP i una pèrdua de paquets insignificant en connectar-se a aplicacions SaaS, plataforma com a servei (PaaS), infraestructura com a servei (IaaS).
* **Sense manteniment.**  El manteniment de la infraestructura depèn del proveïdor del servei, per la qual cosa el client no ha de preocupar-se de les actualitzacions.
* **Seguretat.** Els proveïdors de NaaS  proporcionen serveis de xarxes i seguretat. Això ofereix als clients una estreta integració entre la xarxa i la seguretat de la mateixa.
* **Costos.** S’eliminen els costos inicials del maquinari i fa que el cost continu d'administrar i mantenir la xarxa sigui més transparent. NaaS permet disposar d'una previsió dels costos, ja que transforma les despeses d'inversió (CapEx) en despeses d'explotació (OpEx). Amb el model NaaS, una empresa paga només pel que consumeix i pot augmentar o disminuir la capacitat de la seva xarxa en qualsevol moment. <br>

Els principals inconvenients del NaaS són: <br>

* **Compatibilitat.** Podria ser que el proveïdor de serveis de NaaS no sigui compatible amb el sistema heretat, com a maquinari antic, aplicacions locals, etc.
* **Vinculació amb el  proveïdor.** Una vegada que els clients prenen els serveis d'un proveïdor de serveis, canviar a un altre proveïdor és complicat. A més, si la infraestructura del proveïdor falla o el proveïdor augmenta el cost, l'empresa pot veure's afectada.
* **Centre de dades heretat.** Per una organització que encara executa aplicacions i processos al seu centre de dades intern, no al núvol, serà difícil moure grans aplicacions i processos al NaaS. <br>

## **Models de Servei** {#ModelServei}

NaaS engloba una àmplia gamma de serveis: com l'accés remot, la connectivitat privada L2 o L3 sota demanda (inclosa la VPN), SD-WAN segura, SASE, eines de seguretat, Wi-Fi gestionat en el núvol, serveis LTE privats, serveis empresarials 5G i serveis d’Ethernet metropolitana. <br>

Alguns models de servei inclouen: <br>

* **Amplada de banda a demanda**
És una tècnica mitjançant la qual es pot assignar la capacitat segons la demanda, que depèn totalment del requeriment entre diferents nodes i usuaris. Les tarifes es poden adaptar a les demandes de trànsit dels nodes que estan connectats a l'enllaç. <br>
* **Xarxa privada virtual (VPN)**
S'integra amb la xarxa privada i els recursos continguts a la xarxa a través de xarxes com la Internet pública. VPN permet a l'ordinador transmetre i rebre dades, a través de la xarxa compartida i privada amb funcions i polítiques de la xarxa privada. <br>
* **Virtualització de la xarxa**
Un operador crea i gestiona una xarxa i ven les seves capacitats d’accés  a un tercer. 
Com a exemple, un operador de xarxa virtual mòbil (MVNO), és un proveïdor de serveis de comunicacions mòbils que no és propietari de l'espectre de ràdio o la infraestructura de xarxa sense fil sobre la qual proporciona serveis. <br>

La xarxa com a servei inclou: escalabilitat, protocols multicast, tallafoc de seguretat, detecció i prevenció d'intrusions, Xarxa d'Àrea Ample (WAN), Xarxa Privada Virtual (VPN), amplada de banda a demanda, monitoratge personalitzat de contingut d'encaminament i filtratge. <br>

Els proveïdors de la NaaS es centren en algunes àrees específiques com la connectivitat amb seguretat, la configuració simple, o la prestació de serveis mòbils i seus temporals. El petit i mitjà negoci gaudeix dels avantatges de la xarxa com a servei. <br>

## **Principals proveïdors de NaaS** {#Proveidors}

Enterprise Networking Planet ha elaborat  una llista dels principals proveïdors de NaaS del 2022.<br>

<br>
<div align="center">
  <img src="/images/bloc/2022/11/Imatge4.jpg" text="Font: Enterprise Networking Planet"/>
</div>
<br>

**Aryaka SmartService** <br>
Aryaka ofereix un servei de xarxa i seguretat administrat basat en arquitectures SD-WAN i SASE per implementacions globals i regionals. El servei es basa en un model de consum de xarxa basat en OpEx que escala bé. L'oferta SD-WAN com a servei de Aryaka permet a les empreses consumir serveis de xarxa a través de la seva infraestructura de xarxa basada al núvol. <br>

**Perimeter 81** <br>
El servei NaaS de Perimeter 81 integra la gestió de la xarxa i la seguretat en recursos locals i basats en núvol com AWS, Salesforce, Azure i Google Cloud. Aquest NaaS natiu del núvol inclou una sèrie d'eines de seguretat per a l'autenticació, seguretat Wi-Fi, Zero trust, filtratge DNS i prevenció de filtracions. Ajuda a reduir la latència de la xarxa col·locant els recursos de xarxa més a prop d'on són necessaris. <br>

**Cloudflare Magic WAN** <br>
Cloudflare Magic WAN pot substituir les arquitectures antigues de WAN per la xarxa de Cloudflare, proporcionant connectivitat global, seguretat basada en el núvol, rendiment i control a través d'una interfície. Connecta de manera segura qualsevol connectivitat que inclogui centres de dades, oficines, dispositius i el núvol a la xarxa de Cloudflare. Els usuaris poden configurar les polítiques d'encaminament públic i privat que necessiten. <br>

**Cisco Plus NaaS** <br>
Cisco Plus inclou una varietat de solucions d'arquitectura creuada dissenyades per ser lliurades com a servei. L'arquitectura SASE de Cisco convergeix xarxes i seguretat en el núvol. <br>
Cisco Plus Naas inclou la intel·ligència a partir de coneixements  i automatització impulsades per la IA per conduir el rendiment i l'optimització de costos. Cisco Plus Hybrid Cloud, per exemple, ofereix xarxes de centres de dades, computa i tecnologies d'emmagatzematge en un model de consum. <br>

**Akamai Aura Managed CDN** <br>
Akamai es centra en les xarxes de lliurament de continguts (CDN) que s'utilitzen àmpliament per millorar el lliurament del trànsit d'Internet a tot el món. Akamai ofereix una plataforma altament distribuïda de servidors que respon directament a les sol·licituds d'usuari final de contingut web. Funciona com a intermediari entre un servidor de contingut i usuaris finals o clients. Aquests serveis de CDN gestionats inclouen la capacitat de proporcionar serveis de transmissió de vídeo i optimitzar la xarxa pel lliurament de contingut, alhora que es redueix el temps de desplegament i els costos inicials. <br>

**Megaport MCR** <br>
Megaport Cloud Router (MCR) proporciona capacitats d'encaminament virtual per la connectivitat privada sota demanda de la Capa 3. Està preconfigurat en centres de dades en zones d'encaminament clau arreu del món, permetent la transferència de dades. Sense la necessitat d'infraestructura física, els usuaris poden aprofitar la xarxa de núvol a núvol i la connexió privada entre proveïdors de núvol. <br>

**Amdocs NaaS** <br>
El NaaS programable d'Amdocs automatitza i organitza el disseny, les peticions i la gestió dels serveis de xarxa. El seu paquet  SD-WAN de virtualització de funcions de xarxa (NFV)  permet als MSP lliurar serveis gestionats SD-WAN, així com l’encaminament de serveis  VNF i altres recursos de xarxa necessaris per operar el servei. <br>

**Palo Alto Prisma** <br>
Palo Alto Networks Prisma ajuda a simplificar la gestió, habilitar polítiques SD-WAN definides per l'aplicació i lliurar un SD-WAN segura a les seus a través del núvol. Combina la tecnologia SD-WAN adquirida per CloudGenix amb l'experiència de Palo Alto en xarxes i seguretat. Els casos d'ús inclouen la modernització de l'encaminador, la migració al núvol i l'automatització de les operacions de xarxa. <br>


## **Referències** {#Referencies}
https://softtek.eu/tech-magazine/digital-transformation/naas-como-solucion-al-cuello-de-botella-de-la-digitalizacion/ <br>
https://www.cloudflare.com/es-es/learning/network-layer/network-as-a-service-naas/ <br>
https://www.mygreatlearning.com/cloud-computing/tutorials/network-as-a-service-naas <br>
https://ciberseguridad.com/guias/recursos/naas-network-as-a-service/#%C2%BFComo_se_entrega <br>
https://www.computertechreviews.com/definition/network-as-a-service-naas/ <br>
https://packetfabric.com/blog/what-is-naas <br>
https://www.computerweekly.com/es/cronica/Las-opciones-del-modelo-de-negocio-de-red-como-servicio-NaaS-toman-forma <br>
https://uploads-ssl.webflow.com/606e2eaa45ec23f2d44596eb/6310f44f665f7a816a8d9f1d_Red%20Como%20Servicio%20NaaS.pdf <br>
https://data-flair.training/blogs/network-as-a-service-naas/ <br>
https://en.wikipedia.org/wiki/Network_as_a_service#cite_note-10 <br>
https://www.enterprisenetworkingplanet.com/data-center/top-naas-providers/ <br>


## **Glossari** {#Glossari}
* **NFV (Network Function Virtualization):** Virtualització de funcions de xarxa. Substitueix els dispositius de maquinari de xarxa com enrutadors o tallafocs, per màquines virtuals que executen programari i processos, i que es controlen mitjançant un hipervisor. 
* **VNF (Virtual Network Function):** Una funció de xarxa virtual és una tasca virtualitzada realitzada anteriorment per maquinari propietari i dedicat. VNF mou les funcions de xarxa fora dels dispositius de maquinari dedicat i cap al programari.
* **OpenFlow:** És un protocol que permet a un servidor dir-li als commutadors de xarxa on enviar els paquets.
* **SD-WAN:** Una xarxa d'àrea extensa definida per programari (SD-WAN). És una arquitectura de WAN virtual que permet a les empreses aprofitar qualsevol combinació de serveis de transport, inclosos MPLS, LTE i serveis d'Internet de banda ampla, per a connectar de manera segura els usuaris amb les aplicacions.
* **POP:** El punt d'accés local o demarcació entre diferents xarxes. Sol ser el lloc en el qual es produeix el lliurament entre la xarxa local (proporcionada pel proveïdor de serveis d'Internet o ISP) i la resta d'Internet.
* **SASE (Secure Access Service Edge):** És una arquitectura basada en el núvol que ofereix serveis de xarxa i seguretat destinats a protegir els usuaris, les aplicacions i les dades.
* **LTE (Long Term Evolution):** És un estàndard per a comunicacions sense fils de transmissió de dades d'alta velocitat per a telèfons mòbils i terminals de dades.
* **MSP (Managed Service Provider).**
* **CDN (Content Delivery Network):** Una xarxa de lliurament de contingut és una xarxa de servidors interconnectats que accelera la càrrega de les pàgines web per a les aplicacions que tenen un ús intensiu de dades. 


<br>
<br>
###### **Unitat Arquitectura d'Entorn Digital de Treball** <br>
###### **Direcció Arquitectura i Components Transversals**
