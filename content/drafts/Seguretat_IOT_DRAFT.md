+++
date        = "2023-03-23"
title       = "Seguretat IoT"
description = "Seguretat IoT"
sections    = ["Blog"]
categories  = ["seguretat", "iot"]
+++

---

# **Seguretat IoT**

---

## **Taula de Continguts** {#TaulaContiguts}
1. [Introducció] (#Introduccio)
2. [Reptes de ciberseguretat en IoT] (#Reptes)
3. [Millors pràctiques en seguretat IoT] (#MillorsPractiques)
4. [Conclusions] (#Conclusions)
5. [Referències] (#Referencies)
6. [Glossari] (#Glossari)

---

## **Introducció** {#Introduccio}

L'era d'Internet s'ha traslladat de la Internet del contingut (www) a la Internet de les coses (IoT), connectant milers de milions de dispositius a Internet. I la seguretat del IoT, s'està convertint en un aspecte cada vegada més important del desenvolupament dels dispositius de IoT. <br>

A mesura que els fabricants incorporen les Tecnologies de la Informació (TI)  per obtenir avantatges competitius, els ciberdelinqüents també aprofiten la tecnologia emergent per augmentar els seus atacs. <br>

La major integració de TI i  IoT provocada per aquestes tecnologies transformadores es converteix en una arma de doble tall per a les empreses, especialment aquelles que mantenen separades les estratègies de seguretat per a les seves infraestructures de TI i IoT. Si bé, aquesta convergència permet monitorar les operacions de prop, també exposen a les organitzacions a amenaces imprevistes. Això fa que els sistemes IoT es puguin convertir en un vector d'atac a través del qual, els cibercriminals  puguin moure's lateralment entre els entorns de IoT i TI. <br>

Per entendre millor la seguretat, definim un dispositiu IoT,  com una peça de maquinari que inclou sensors, programari, actuadors i dispositius informàtics, que transmeten dades d’un lloc a un altre a través d’Internet. <br>

<br>
<div align="center">
  <img src="/images/bloc/2023/03/Imatge2.jpg" text="Font: www.rohm.com"/>
</div>
<br>

Els dispositius IoT incorporen elements que els permeten interactuar amb l'entorn, com és el cas d'un termòstat intel·ligent, que pot realitzar mesuraments de la temperatura ambiental.  Aquests elements els confereixen la capacitat d'interacció amb el món físic. <br>

A continuació es detallen algun dels elements:
* **Sensors:** són capaços de realitzar mesuraments del món físic que seran processats, transformats i analitzats al món digital, entre d’altres com: temperatura, pressió, qualitat en l'aire, humitat, so, lluminositat, radiació de llum infraroja o velocitat. <br>
* **Actuadors:** tenen la capacitat de modificar elements del món físic sobre la base dels mesuraments realitzats pels sensors o per ordres rebudes de qualsevol altre element com un ordinador remot. Algunes de les accions que poden fer són: obrir o tancar una vàlvula o un interruptor; actuar sobre un motor, per exemple, per a pujar o baixar una persiana o obrir o bloquejar una porta, posar una cançó. <br>

També es disposa de diverses categories de dispositius IoT:
**Dispositius de consum**
* Dispositius de llar intel·ligents: càmeres de videovigilància, sensors de finestres, obertura de portes, control de temperatura, sistemes de seguretat, etc. <br>
* Televisions, ràdios i descodificadors. <br>
* Assistents Personals: Alexa, Google Home o Apple Siri.<br> 
* Sistemes personals: rellotges, comptadors de passos, localitzadors, elements de benestar, etc. <br>

**Dispositius empresarials/professionals**
* Dispositius d’edificis intel·ligents (smart Building). <br>
* Dispositius industrials: àmpliament utilitzats en transport, energia i indústria. <br>
* Elements de ciutats intel·ligents (smart cities).<br>

**Dispositius híbrids (components empresarials amb ús particular)**
* Cotxes intel·ligents.<br>
* Drons d'ús professional o semi professional. <br>
* Dispositius mèdics personals certificats. <br>

En aquest article s’explora els nous reptes en l'àrea de la ciberseguretat que sorgeixen del IoT.<br>


## **Reptes de ciberseguretat en IoT** {#Reptes}

En general, l’arquitectura IoT es pot dividir en quatre capes: la capa d'aplicació, la capa de gestió (middle-ware), la capa de xarxa i la capa de detecció (física). 
Segons aquesta arquitectura, cada capa opera sota diferents tecnologies, per tant, han sorgit i existeixen diversos desafiaments i vulnerabilitats relacionades amb la seguretat a cada capa. <br>

<br>
<div align="center">
  <img src="/images/bloc/2023/03/Imatge3.jpg" text="Font: www.researchgate.net"/>
</div>
<br>

### **Capa d'aplicació** 

És la responsable d'entregar els serveis d'aplicació. En general, aquesta capa consta d'aplicació web, servei d'API, anàlisi de dades, procés empresarial i aplicació mòbil. Els usuaris interaccionen principalment amb aquesta capa a través de l'aplicació web i l'aplicació mòbil. Aquesta també gestiona tot el processament de dades d'aplicació, anàlisi i emmagatzematge. Algunes solucions IoT també poden integrar-se amb la seva infraestructura de TI corporativa per altres processos de flux de treball de negoci, big data i modelatge d'IA. <br>
Els problemes de seguretat que s’hi poden trobar estan relacionats amb que els usuaris finals, estan directament interactuant amb aquesta capa, per exemple: <br>

* **Atacs d'interrupció de servei (DDoS):** aquí l'atacant inunda deliberadament la xarxa o els servidors amb moltes peticions malicioses. Com a resultat, és produeix una indisponiblitat total o parcial dels serveis atacats. <br>
* **Robatori de dades:** els sistemes IoT sovint gestionen una quantitat massiva de dades. Hi ha una alta possibilitat que els intrusos busquin accés a aquestes dades (informació personal dels usuaris, coordenades d'ubicació, lectures del sensor, adreça IP, correu electrònic, mòbil, etc). Els telèfons i les dades de les càmeres CCTV també són vulnerables per aquestes dades. <br>
* **Atacs Sniffing (detecció):** si no hi ha mecanismes de protecció adequats, els atacants podrien utilitzar programes «sniffer» per a analitzar  el trànsit de xarxa en aplicacions IoT. <br>
* **Utilitzar credencials predeterminades:** els nous dispositius generalment venen amb un usuari i contrasenya configurada de forma predeterminada pels fabricants. Recerques recents mostren que les contrasenyes per defecte s’estan utilitzant  en un 15% dels dispositius IoT. <br>
* **Baix nivell d’encriptació a la capa de transport:** de vegades, dispositius IoT connectats a Internet utilitzen protocols HTTP no xifrats per la intercomunicació. En aquests casos, el dispositiu comparteix les seves credencials amb altres dispositius com a text pla en una connexió HTTP, on els atacants poden arribar a  veure fàcilment aquestes dades. <br>

### **Capa de gestió** 

Aquesta capa serveix com a intermèdia entre la capa d'aplicació i la capa de xarxa dins els sistemes IoT. La capa de gestió s'utilitza per administrar els serveis IoT. En general, aquesta capa consisteix en una plataforma de gestió, sistema de monitoratge i plataforma d'actualització de programari. <br>
Els proveïdors de solucions IoT interactuen amb aquesta capa a través de la interfície de gestió per gestionar el cicle de vida dels dispositius IoT. Per exemple, aquesta capa gestiona la provisió, el desplegament, el seguiment, l'actualització de programari i l'eliminació de dispositius IoT. <br>

Els riscos de seguretat  que s’hi poden trobar son: 
* **Injecció de programari maliciós al núvol:** injectant malware a la màquina virtual al núvol, l'atacant pot prendre el control d’aquesta i podria accedir a les peticions de servei i a la captura dades. <br>
* **Atac d’Injecció SQL:** un atacant pot injectar peticions SQL malicioses i obtenir informació confidencial des de la base de dades i fins i tot, inserir dades a entrades de la base de dades. <br>
* **Atac DDoS al núvol:** els atacants envien regularment moltes peticions, estenent la càrrega dels servidors i pot provocar un efecte important sobre la disponibilitat dels servidors. <br>
* **Actualització de manera regular:** és possible que els dispositius no s’actualitzin i que les versions antigues encara estiguin en ús, per tant, durant el cicle de vida dels dispositius IoT, les vulnerabilitats de seguretat s’han de reparar i corregir de manera regular. <br>

### **Capa de xarxa**

La funció principal de la capa de xarxa es transferir dades de la capa de detecció a la capa de gestió. <br>

Les tecnologies de connectivitat aplicables per aquesta capa podrien ser: <br>
* Connectivitat de xarxa cel·lular (3G, 4G, 5G, etc.), 
* Connectivitat a Internet sense fil (WiFi, etc.), 
* Connectivitat sense fil de dispositiu de llarg abast a passarel·la d'operador (LoRa, NB-IoT, Sigfox, etc.) 
* Connectivitat sense fil de curt abast (Bluetooth, Zigbee, NFC, RFID, etc.)

Les principals preocupacions de seguretat en aquesta capa, és que els atacants cerquin qualsevol servei de xarxa susceptible i puguin provocar: 
* **Atac de Denegació de Servei (DDoS):** és vulnerable als atacs de denegació de servei a causa de l'heterogeneïtat i complexitat de la infraestructura de les xarxes IoT.<br>
* **Atacs d'encaminament:** l’atacant mostra una ruta d'encaminament més curta e incorpora nodes de xarxa per encaminar el trànsit a través d'ell. <br>
* **Atac de força bruta:** l'atacant intenta accedir a un dispositiu a través de ports SSH o Telnet aplicant el mètode de prova i error de forma massiva amb una llista de credencials d'ús comú o recollides de credencials de compte de filtracions de dades. <br>
* **Intercepció de xarxa mòbil:** a mesura que les plataformes IoT es connecten a Internet, treballen en connexions mòbils en lloc de Wi-Fi, el que pot comportar que aquest tipus de  connexió no sigui la opció més segura, ja que  els atacants  poden crear un lloc de cel·la fals i escoltar les comunicacions. Els atacants poden interceptar el trànsit de la xarxa, mitjançant l'ús de l’atac “man-in-the-middle” entre els punts finals de la comunicació. <br>

### **Capa de detecció / Capa física**

En aquesta capa s’han de valorar els següents punts: <br>
* En primer lloc: on es troben físicament els dispositius IoT. 
* En segon lloc: els diferents sensors dels dispositius IoT que interactuen amb l'entorn físic per adquirir diverses mètriques físiques (electricitat, moviment, cabal, pressió, humitat, velocitat, qualitat de l'aire, temperatura, etc.). 
* En tercer lloc: la robòtica, els motors, els actuadors i altres dispositius IoT que tenen algun tipus d'interacció cinètica amb l'entorn físic. 
* En quart lloc: és possible que alguns dispositius IoT no es puguin connectar a Internet directament mitjançant el protocol d'Internet (IP), en aquest casos, les passarel·les IoT s'utilitzen en aquest escenari per funcionar com a pont de xarxa entre els dispositius IoT i Internet. <br>

Alguns del atacs que s’hi poden trobar son: 
* **Booting atacs:** el temps d'arrencada és el període més vulnerable en qualsevol dispositiu IoT, ja que encara poden no estar actives les capacitats de seguretat i quan es reinicien els dispositius, els atacants poden explotar aquesta vulnerabilitat comprometent la seva seguretat. <br>
* **Sleep deprivation attack:** aquest atac afecta al dispositius IoT amb recursos limitats d’energia (bateries petites) centrant-se en una denegació de servei, esgotant els recursos energètics del dispositiu.  <br>
* **Injecció de codi maliciós:** l'atacant utilitza codis maliciosos per executar atacs a través dels ports físics d’accés . El codi maliciós s'insereix a la memòria dels nodes físics i com a resultat, els atacants poden forçar a realitzar operacions innecessàries o intentar accedir al dispositiu. <br>

Riscos de seguretat: <br>
* Els atacants poden utilitzar interfícies o ports externs per explotar vulnerabilitats.
* La manipulació física és  més probable als dispositius IoT.
* És possible extreure físicament l'emmagatzematge d'un dispositiu.
* Reciclar o reutilitzar els dispositius sense revisió i comprovacions.
* Components no verificats de tercers utilitzats a dispositius IoT. Els dispositius IoT solen utilitzar microprogramari de tercers, com biblioteques de codi obert o components de xip. Característiques de seguretat integrades i vulnerabilitats d'aquests components de tercers també serien heretats per IoT. 

En general  **l'incompliment de les normes de privadesa de dades** personals aplicables pot comportar una responsabilitat legal.


## **Millors pràctiques en Seguretat IoT** {#MillorsPractiques}

Per explicar les millors pràctiques per reduir els riscos en Seguretat IoT, s’ha dividit en les quatre capes abans esmentades: <br>

### **Capa d'aplicació** 

* Sempre que es requereixi autenticació, s'han d'utilitzar contrasenyes fortes i/o autentificació de doble factor. 
* Pels sistemes multiusuari, s'ha d'incloure el control d'accés basat en rols.
* S’hauria de tenir procediments de recuperació de contrasenyes segurs.
* S’ha d’admetre la caducitat de la contrasenya i una política de canvi de contrasenyes de manera regular.
* En el primer pas de configuració, s’ha de fer obligatori modificar la contrasenya predeterminada.
* S’ha de bloquejar el compte per protegir-se dels atacs de força bruta amb accions posteriors automàtiques o manuals.
* Per evitar atacs DoS  de bloqueig del compte, caldria utilitzar CAPTCHA.
* Els clients de l'API haurien de poder verificar l'autenticitat del servei d'API mitjançant un certificat de servidor TLS vàlid verificat per una autoritat de certificació de confiança.
* Per frenar els intents d'atac volumètric, s’hauria d’utilitzar la limitació el número de sol·licituds que es poden acceptar en una finestra de temps.
* Amb aplicacions al núvol, caldria utilitzar comunicacions xifrades.
* Per gestionar tot el cicle de vida de les activitats de clau de xifratge (generació de claus, emmagatzematge de claus, ús de claus, rotació de claus, revocació de claus i destrucció de claus) mentre s'utilitza el xifratge de dades al núvol, la solució hauria d'utilitzar la gestió de claus de xifratge.

### **Capa de gestió**

* És necessària la validació i compliment dels requisits de servei i seguretat dels productes subministrats.
* Els dispositius IoT no vàlids o il·legítims, es poden evitar gestionant dispositius amb identificadors únics.
* El seguiment continu de la seguretat manté els sistemes IoT segurs, és a dir, monitorar els sistemes d'emmagatzematge, serveis de xarxa o de telemetria, serveis mòbils, serveis al núvol, qualsevol dispositiu, etc. i enviar les notificacions perquè els problemes de seguretat es puguin solucionar més ràpidament. 
* Establir llindars per cada tipus d'incident de seguretat per rebre les notificacions quan se superin aquests llindars, permetent una investigació addicional.
* Els fabricants o desenvolupadors haurien d'elaborar les polítiques de gestió de vulnerabilitats i divulgació dels productes IoT.
* En un termini raonable, els fabricants o desenvolupadors haurien de lliurar actualitzacions de seguretat per solucionar les vulnerabilitats del dispositiu.
* Si hi ha alguna anomalia en la integritat del dispositiu IoT, com un  comportament anòmal del dispositiu, caldria posar-lo en quarantena.
* És important vigilar els registres d'auditoria i els registres d'esdeveniments de seguretat.

### **Capa de xarxa**

* Per protegir el contingut dels fluxos de dades sense fil, s'hauria d'utilitzar un xifratge lleuger o una tokenització.
* Les passarel·les IoT poden funcionar com a tallafocs, xifrant les comunicacions amb TLS i augmentant l'aïllament de la xarxa a Internet.
* En el transcurs de les connexions a Internet, el xifratge TLS (Transport Layer Security) proporciona confidencialitat, autenticació i integritat de les dades d'extrem a extrem.
* Per a les solucions IoT que requereixen un nivell més gran de garantia sobre la validesa de cada punt final del dispositiu, la solució IoT hauria d'utilitzar un testimoni API únic o un certificat digital TLS únic signat per una autoritat de certificació de confiança per confirmar l'autenticitat de cada punt final del dispositiu.

### **Capa de detecció / Capa física**

* El risc de seguretat d'obtenir el control del dispositiu localment es redueix bloquejant o restringint la capacitat d'interfícies o ports externs físics.
* Per mantenir la confidencialitat de les dades, les dades sensibles s'han de xifrar.
* Quan un dispositiu ja no s'utilitza o s’elimina, s’ hauria de realitzar l'esborrat de dades.
Comprovar cada cert temps la visibilitat dels dispositius IoT en Internet amb eines específiques com Shodan. (https://www.shodan.io/)
* Els dispositius IoT haurien de poder recuperar-se i reprendre el funcionament habitual automàticament.
* Cada dispositiu hauria de tenir els 3 elements següents: en primer lloc, un parell de claus asimètrics únics de manera segura, en segon lloc, la clau privada està protegida dins d'un element segur i finalment, un certificat digital PKI.

En general cal tenir en compte que les quatre capes es veuen afectades per la **Privadesa de les dades personals**, ja que la recol·lecció massiva, en alguns casos, de dades de caràcter personal podria implicar riscos per a les empreses i usuaris.<br>

* S'ha seguir la normativa de dades personals (privadesa) en l'ús, retenció, recollida i seguretat de les dades personals.
* Proporcionar als usuaris finals una descripció clara de la política i el procediment de l'empresa per gestionar totes les dades personals.
* Prendre totes les precaucions raonables per garantir la seguretat (xifratge, gestió de claus, etc.).
* La recollida i conservació de dades personals s'ha de reduir al mínim (només s'ha de processar i emmagatzemar sense identificar).
* S’hauria d'obtenir el permís dels usuaris finals abans de recollir dades que no siguin absolutament necessàries.
* Si les dades personals s'han d'utilitzar per a finalitats diferents de la funcionalitat principal prevista del dispositiu, s'ha de demanar l'acord dels usuaris finals. 



## **Conclusions** {#Conclusions}

En l'accés a sistemes IoT i especialment en sistemes crítics, és clau seguir unes certes pràctiques de seguretat i tenir en compte alguns factors clau: <br>

* **Autenticació robusta:** és necessari comptar amb un mètode d'autenticació segur i de confiança per a accedir als sistemes. Això pot incloure contrasenyes segures i autenticació de doble factors, com l'ús de codis d'un sol ús o la verificació mitjançant una aplicació mòbil. <br>
* **Accés restringit:** l'accés als sistemes ha de restringir-se només a les persones autoritzades. És important establir un procés de sol·licitud d'accés i autorització clar i documentat. <br>
* **Registre d’activitat:** és important portar un registre de qui té accés als sistemes en producció i quines accions realitzen. Això pot ajudar a detectar i solucionar problemes o detectar possibles bretxes de seguretat. <br>
* **Política d’actualització:** les actualitzacions no sols permeten afegir millores o noves funcionalitats, sinó que un dels seus principals propòsits és solucionar  vulnerabilitats de seguretat que es puguin presentar. <br>
* **Gestió de vulnerabilitats:** conèixer els principals problemes de seguretat i les vulnerabilitats que puguin afectar als dispositius IoT per prendre les mesures que mitiguin el risc.<br> 
* **Assegurar l'autenticitat, integritat i confidencialitat** de les comunicacions i les dades.<br> 
* **Seguretat perimetral i segmentació:** utilitzar dispositius de seguretat perimetral per protegir únicament les connexions dels dispositiu IoT als serveis necessaris i segmentació per delimitar els atacs horitzontals.<br>

Més enllà dels  punts anteriors, és essencial conscienciar als usuaris sobre la importància de la ciberseguretat en el dia a dia del seu treball i en l'administració i ús d'aquesta mena de dispositius. <br>

Per tant, les aplicacions de IoT existents i futures han de complir amb les guies i regulacions estàndard de seguretat cibernètica per garantir la seguretat.  En aquest sentit hi ha dos marcs de treball que poden ajudar a l’hora de crear, desenvolupar i configurar un dispositiu IoT: <br>

* **NIST CyberSecurity Framework** per a la gestió de la seguretat digital i la guia 800-82 del NIST ( https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-82r2.pdf ) <br>
El Marc de Seguretat de la Informació de NIST (NIST) és un marc de referència per la gestió de la seguretat cibernètica als Estats Units. Va ser desenvolupat per l'Institut Nacional de Normes i Tecnologia (NIST) i s'utilitza àmpliament per empreses i organitzacions governamentals per protegir-se contra amenaces cibernètiques. Està basat en un conjunt de cinc categories: identificar, protegir, detectar, respondre i recuperar. Cadascuna d'aquestes categories inclou un conjunt de subcategories i objectius específics que han de complir-se per garantir una adequada gestió de la seguretat cibernètica. <br>
La Publicació Especial 800-82 de l'Institut Nacional de Normes i Tecnologia (NIST), és una guia de referència per la gestió de la seguretat de la informació en xarxes industrials. Aquesta publicació proporciona recomanacions i directrius per la protecció de les xarxes industrials i la informació que circula per elles contra possibles amenaces i vulnerabilitats. Aquesta inclou informació sobre com dissenyar, implementar i mantenir una xarxa segura, així com protegir la informació que es transmet a través d'ella. També inclou recomanacions sobre com gestionar la seguretat de la informació en entorns industrials i sobre com respondre a possibles incidents de seguretat. <br>

* **ISO 62443.  Normes i directrius de la seguretat dels sistemes de control industrials (ICS)** (https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) <br>
La norma ISO 62443 és un conjunt de normes i directrius que s'utilitzen per a garantir la seguretat dels sistemes de control industrials. ICS es refereix als sistemes que s'empren en la indústria per a controlar processos industrials, com la producció d'energia, la fabricació i el transport. Aquests sistemes són especialment importants pel fet que la seva fallada o manipulació pot tenir conseqüències greus, com a interrupcions en la producció o fins i tot danys a la propietat. La norma ISO 62443 proporciona un marc per a la protecció dels sistemes ICS contra amenaces cibernètiques i garanteix la confidencialitat, integritat i disponibilitat de les dades i sistemes. <br>


## **Referències** {#Referencies}
https://www.iotsworldcongress.com/a-view-into-ot-cybersecurity-predictions-for-2023/ <br>
https://www.helpnetsecurity.com/2022/11/03/iot-devices-cybersecurity/ <br>
https://www.trendmicro.com/vinfo/us/security/research-and-analysis/predictions/2023 <br>
https://www.innovacion-tecnologia.com/iot/dispositivos-iot/ <br>
https://securityboulevard.com/2021/12/security-standards-in-iot/ <br>
https://www.hkcert.org/f/blog/262194/cc040767-fa07-4c87-aaa9-cdf46d4b92c6-DLFE-14203.pdf <br>
https://www.incibe.es/sites/default/files/contenidos/guias/doc/guia-de-seguridad-iot.pdf <br>
https://www.helpnetsecurity.cveom/2022/11/03/iot-devices-cybersecurity/ <br>


## **Glossari** {#Glossari}
* **TLS (Transport Layer Security):** És una versió millorada de SSL. Utilitza xifrat per protegir la transferència de dades i informació.
* **CAPCHA (Completely Automated Public Turing test to tell Computers and Humans Apart):** Test de Turing públic i automàtic per distingir als ordinadors dels humans. Es un tipus de mesura de seguretat conegut com autenticació pregunta-resposta.
* **Man-in-the-Middle:** És un tipus d'atac destinat a interceptar, sense autorització, la comunicació entre dos dispositius (hosts) connectats a una xarxa.
* **ICS:** Sistemes de Control Industrial.
* **Atacs snnifing:** És un tipus de ciberatac utilitzat per a poder capturar  tot el tràfic d’una connexió. 
* **Sleep deprivation attack o denial-of-sleep attack:** Un atacant envia senyals repetits a un dispositiu IoT per evitar que entri en mode de son o mode de baixa potència. Això pot drenar la bateria del dispositiu i causar que funcioni malament, fent-lo vulnerable a nous atacs o comprometent les seves dades.


<br>
<br>
###### **Unitat Arquitectura d'Entorn Digital de Treball** <br>
###### **Direcció Arquitectura i Components Transversals**
