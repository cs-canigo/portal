+++
date        = "2022-09-28"
title       = "Internet de les coses de banda estreta (NB-IoT)"
description = "El nombre de dispositius que formen Internet de les coses (IoT) segueix creixent de forma exponencial i comencen a sorgir noves tecnologies per donar solució a aquesta necessitat com ara el Narrowband IoT conegut també com a NB-IoT."
responsable = "Unitat d'arquitectura"
sections    = ["Blog", "home"]
blog_tags   = ["IoT"]
categories  = ["IoT"]
imatge      = "/images/bloc/2022/09/Imatge1.jpg"
key         = "SETEMBRE2022"
+++

---

# **Internet de les coses de banda estreta (NB-IoT)**

---

## **Taula de Continguts** {#TaulaContiguts}
1. [Introducció] (#Introduccio)
2. [Característiques i funcionalitats] (#Caracteristiques)
3. [Principals Pros i Contres] (#ProsContres)
4. [Arquitectura i Implementació] (#Arquitectura)
5. [Casos d'ús] (#CasosUs)
6. [Referències] (#Referencies)
7. [Glossari] (#Glossari)

---

## **Introducció** {#Introduccio}

**Internet de les Coses** o més conegut com **IoT**,  permet que molts  objectes passin a estar “connectats” amb tots els beneficis que això comporta. <br>

Es poden tenir sensors en qualsevol part que registrin dades constantment, permetent així recopilar informació que posteriorment s'utilitzarà per la “intel·ligència del negoci”. En altres paraules, totes aquestes dades ajudaran a prendre decisions, fer canvis, optimitzar processos ... etc. <br>

IoT ja fa anys que està disponible però mica en mica van apareixent tecnologies que el milloren o el complementen. Aquest és el cas de **Narrowband IoT (NB-IoT)**, que popularment es coneix com a **“Internet de les coses de banda estreta”**. <br>

Aquesta tecnologia s'orienta sobretot a objectes quotidians que necessiten enviar en intervals, petites quantitats de dades que es dilaten molt en el temps. És a dir, està centrada principalment en dispositius distribuïts massivament, que no generen un trànsit de dades massa alt i el cicle de vida és més llarg. <br>


## **Característiques i funcionalitats** {#Caracteristiques}

NB-IoT és un estàndard de tecnologia de transmissió de dades de xarxa d’àrea estesa de baixa potència (LPWAN) que es basa en LTE i que permet connectar una àmplia varietat de nous dispositius i serveis. <br>

Va ser desenvolupat per 3GPP, l'Organització que administra les xarxes mòbils globals per la comunicació de ràdio, i que connecta els dispositius que necessiten transmetre amb poca freqüència petites quantitats de dades, de forma més senzilla i eficaç utilitzant les xarxes mòbils ja establertes. <br>

Les principals característiques del conjunt de xips NB-IoT d’aquesta tecnologia son:

* Tecnologia de baix cost.
* Baix consum d'energia.
* Llarga durada de les bateries de l'equip (fins a 10 anys).
* Connexió d'un nombre massiu de dispositius IoT, fins a 50.000 per cel·la de xarxa.
* Cobertura de llarg abast i entorns interiors.
* Amplada   de banda: 180 Khz.
* Latència: de 1,5 a 10 segons.
* Funcionament half-dúplex.
* Transmissió de dades sobre els 100 Kbps. 
* Connectivitat fiable i segura.

Si es compara amb altres tecnologies similars com la LTE-M, NT-IoT té una major cobertura i millor posicionament en interiors, en canvi LTE-M, permet veu i una amplada de banda major, la qual cosa afavoreix a tenir més velocitat de dades, menor latència i està més preparada per aplicacions de mobilitat. <br>

En aquesta taula s’hi poden apreciar les diferencies entre ambdues: <br>

<div align="center">
<table border="0" align="center">
  <tr>
    <td><strong>Característica</strong></td>
    <td><strong>NB-IoT</strong></td>
    <td><strong>LTE-M</strong></td>
  </tr>  
  <tr valign = "top">
    <td>Amplada de banda</td>
    <td>180KHZ-3GPP Llicència</td>
    <td>1,4MHZ-3GPP Llicència</td>
  </tr>  
  <tr valign = "top">
    <td>Velocitat de baixada </td>
    <td>120Kbit/s</td>
    <td>1Mbit/s</td>
  </tr>  
  <tr valign = "top">
    <td>Velocitat de pujada </td>
    <td>160Kbit/s</td>
    <td>1Mbit/s</td>
  </tr>  
   <tr valign = "top">
    <td>Latència</td>
    <td>1-10s</td>
    <td>50-100ms</td>
  </tr>  
   <tr valign = "top">
    <td>Duració bateria </td>
    <td>10 anys(segons dispositiu)</td>
    <td>10 anys(segons dispositiu)</td>
  </tr>  
  <tr valign = "top">
    <td>Posicionament en interiors</td>
    <td>Excel·lent</td>
    <td>Bona</td>
  </tr>  
   <tr valign = "top">
    <td>Tipus de transmissió</td>
    <td>Dades</td>
    <td>Dades, veu i SMS</td>
  </tr>  
   <tr valign = "top">
    <td>Desplegament de freqüència</td>
    <td>Flexible</td>
    <td>Banda LTE</td>
  </tr>  
  <tr valign = "top">
    <td>Mobilitat</td>
    <td>No</td>
    <td>Sí</td>
  </tr>
  <tr valign = "top">
    <td>Cost dels mòduls </td>
    <td>10% menys que LTE-M</td>
    <td>< 10$</td>
  </tr>
</table>
</div>

<br>
<div align="center">
  <img src="/images/bloc/2022/09/Imatge2.jpg" />
  <span>Font: Sierra Wireless</span>
</div>
<br>


## **Principals Pros i Contres** {#ProsContres}

**Quins són els principals avantatges de NB-IoT?**

* **Seguretat:** NB-IoT és un estàndard cel·lular i a l’igual que altres estàndards d’aquest tipus, utilitza l’espectre amb llicència adaptat amb la seguretat proporcionada pels Operadors de Xarxes Mòbils (MNO), brindant als usuaris, una capa addicional de garantia de servei. 
NB-IoT es va convertir en un estàndard amb llicència oficial per a comunicacions sense fils al 2016. 
* **Fiabilitat:** Es garanteix l’entrega de les dades.
* **Cobertura en interiors i subterranis:** NB-IoT utilitza una amplada de banda estreta, això permet una major densitat de potència de transmissió i juntament amb altres capacitats, fa que la cobertura en interiors i l’abast en general, siguin millors.  
Generalment s’aconsegueix un 20% més que la cobertura de xarxa mòbil existent per a telèfons mòbils. Fet que per exemple, NB-IoT pugui traspassar de dues a tres parets de maó dobles, la qual cosa permet la connectivitat en soterranis.
* **Ús d’energia:** La tecnologia NB-IoT és de baix consum i, per tant, de baixa potència. Els dispositius sovint romanen adormits o en diferents nivells de suspensió/estalvi d'energia, i només s'activen quan és necessari. 
NB-IoT utilitza procediments d'estalvi d'energia especificats per 3GPP, com la recepció Discontínua Estesa (eDRX, per les seves sigles en anglès). eDRX permet un temps més prolongat  perquè el dispositiu no escolti la xarxa durant la fase de temps actiu. El Mode d'Estalvi d'Energia (PSM, per les seves sigles en anglès) permet que s’estableixin temporitzadors d'apagat i d'activació que es reenvien a la xarxa per a minimitzar el consum d'energia del dispositiu.
* **Desplegament NB-IoT:** Es va implementar inicialment a Europa i Àsia, i ara continua desplegant-se a tot el món. Als EUA i a Amèrica del Nord, els operadors van estendre xarxes LTE-M primer i després NB-IoT. També hi ha acords de roaming entre operadors, per permetre major cobertura.
A finals del 2026, s’espera que NB-IoT representi el 45% de tots els dispositius   amb connexions de IoT. NB-IoT segueix un camí d'evolució cap a les xarxes mòbils d’avui en dia implementant-se en les mateixes bandes de les xarxes mòbils, fins i tot, quan s'introdueixi el  5G.
<br>

**Quin són els principals desavantatges?**

* **Dependència de l’operador:** El fet d'usar una banda llicenciada, té implicacions com el fet de dependre d'un operador i per tant, estar subjectes a un model de servei i cobertura fora del control de l'aplicació. Això també té implicacions en el consum energètic del dispositiu. 
Els nodes amb pitjor cobertura gastaran més energia, perquè hauran de repetir més les trames i hauran de transmetre a una potència major. Això pot tenir implicacions en aplicacions com els pàrquing intel·ligents, on s'ha de garantir una durada mínima de bateria.
* **Retards en la comunicació:** Pot haver-hi grans retards en la comunicació quan s'utilitzen els modes d'estalvi d'energia. El fet és que el dispositiu terminal, mentre està en mode d'estalvi d'energia, no està disponible des del costat de la xarxa (servidor d'aplicacions). El retard màxim en utilitzar la manera eDRX ve determinat pel període màxim de eDRX, que és de gairebé 3 hores. 
La latència màxima quan s'utilitza en mode  PSM està determinada pel temps màxim que el dispositiu ha estat en mode  PSM, que és més d'1 any.
* **Falta de suport a la mobilitat.**
* **Baixa velocitat de recepció i transmissió de dades.**


## **Arquitectura i Implementació** {#Arquitectura}

Bàsicament, NB-IoT és un estàndard de transmissió de dades dissenyat per a permetre que els dispositius funcionin en xarxes d'operadors mòbils.
Aquesta tecnologia utilitza senyals de baixa amplada de banda per a comunicar-se amb les tecnologies GSM i LTE existents. <br>

<br>
<div align="center">
  <img src="/images/bloc/2022/09/Imatge3.jpg" />
    <span>Font: Telecapp</span>
</div>
<br>

NB-IoT és una tecnologia de tipus half-duplex que habilita de manera eficient la comunicació uplink, és a dir, que permet un establiment de connexió a la xarxa cel·lular, l'assignació de recursos de xarxa al node (conegut com User Equipment o UE) i la transmissió de les dades. <br>

El més típic és que un UE romangui desconnectada de la xarxa i quan tingui dades a transmetre, per exemple, la lectura d'un comptador, estableixi la connexió, transmeti les dades i es desconnecti. <br>

Un UE, una vegada establerta la connexió, la manté durant un temps fins que passa a inactiu i s'acaba desconnectant. Durant el mode connectat, la UE pot demanar més recursos i transmetre més dades, clarament com a reflex de l'arquitectura LTE. <br>

NB-IoT també permet una desconnexió immediata una vegada rebuda la confirmació de les dades, però això implica no tenir una finestra de **downlink**. <br>

Fruit de la seva estructura basada en LTE, on el disseny inicial assumia connexions sempre actives (ex. els dispositius mòbils sempre estan connectats a la xarxa) el major esforç s'ha fet per habilitar el downlink sense que això, impliqui un consum energètic molt elevat. <br>

Els components bàsics dels sistemes NB-IoT són dispositius i sensors, que recopilen informació del seu entorn i transmeten a estacions base o nodes de transmissió NB-IoT. Les estacions base estan connectades a portes d'enllaç IoT i servidors al núvol per monitoritzar i analitzar les dades centralitzades. <br>

NB-IoT utilitza una nova capa física de senyals i canals per complir amb els requisits de cobertura d'àrees de difícil accés, com per exemple zones rurals o interiors, al mateix temps que permet que els dispositius siguin senzills. A més, amb el suport dels principals fabricants d'equips mòbils, conjunts de xips i mòduls, NB-IoT compleix  amb estàndards de les xarxes mòbils 2G, 3G, 4G i 5G. <br>

<br>
<div align="center">
  <img src="/images/bloc/2022/09/Imatge4.jpg" />
   <span>Font: GSMA</span>
</div>
<br>

## **Casos d'ús** {#CasosUs}

Els mercats i sectors que poden beneficiar-se d'aquesta tecnologia actualment són: cases i edificis intel·ligents, les ciutats intel·ligents, la sanitat, l'agricultura i ramaderia, la fabricació, la logística i fins i tot, pel seguiment de persones i animals. <br>

<br>
<div align="center">
  <img src="/images/bloc/2022/07/Imatge5.jpg" />
  <span>Font: Telefònica</span>
</div>
<br>

* **Mesuradors   intel·ligents:** La cobertura de la xarxa és un problema important perquè, en general, els mesuradors s'instal·len en llocs de difícil accés com ara soterranis o zones rurals remotes. No obstant això, gràcies a la seva excel·lent capacitat de cobertura i abast, NB-IoT funciona molt bé per monitorar mesuradors a través de petites transmissions de dades regulars, com per exemple: aigua, gas, electricitat, calefacció, extintors intel·ligents entre d’altres.
* **Serveis de gestió d'instal·lacions:** Els sensors NB-IoT són capaços d'enviar alertes sobre problemes de manteniment de l'edifici on estan instal·lats i fer tasques automatitzades. També serveixen per recolzar la connexió de banda ampla de l'edifici.
* **Alarmes d'intrusió i incendi per habitatges i propietats comercials.**
* **Mesurament de paràmetres de salut:** Monitoratge de telemedicina, mesurador de pressió arterial, mesurador de glucosa en sang... etc
* **Seguiment de persones, animals o objectes.**
* **Infraestructures de ciutat intel·ligent:** Controls d'il·luminació LED, sensors ambientals, cobertura Wi-Fi, càmeres de vigilància, tanques publicitàries electròniques, aplicacions de trànsit, monitoratge de l'estat de les carreteres, aplicacions mediambientals (contaminació de l'aigua, soroll i qualitat de l'aire), gestió d'aigües residuals, transport públic, seguretat pública. <br>
Aquesta tecnologia també pot proporcionar informació en temps real sobre els nivells d'ompliment dels contenidors d’escombraries perquè es buidin solament quan estiguin en la seva màxima capacitat, millorant significativament l'eficiència de la recol·lecció d'escombraries. A més, pot proporcionar informació sobre la ubicació de cada contenidor per evitar robatoris.
* **Electrodomèstics industrials:**  Màquines de soldadura o compressors d'aire.
* **Agricultura intel·ligent:** Sembra   de precisió (paràmetres mediambientals: aigua, temperatura, llum, fertilitzant). <br>
Els productors d'aliments utilitzen petits sensors de sòl subterranis que monitoritzen i informen sobre factors com la humitat i salinitat, i moltes vegades, han d'instal·lar aquests sensors en zones que no tenen un accés regular a l'energia.
En aquestes situacions, els dispositius NB-IoT poden operar de manera efectiva mentre estan enterrats al sòl, i gràcies a les bateries amb gran autonomia, poden passar llargs períodes de temps sense que sigui necessari canviar-los, la qual cosa permet que es necessitin menys manteniment, i com a resultat, els costos siguin més baixos.
<br>
<br>


## **Referències** {#Referencies}
https://igorochoa.net/2019/01/06/nb-iot-que-es-narrowband-iot/ <br>
https://nctech.com.mx/blog/iot-industrial/nb-iot/ <br>
https://keyalike.com/es/blog/what-is-nb-iot <br>
https://www.gsma.com/iot/wp-content/uploads/2019/09/Security-Features-of-LTE-M-and-NB-IoT-Networks.pdf <br>
https://www.gsma.com/iot/narrow-band-internet-of-things-nb-iot/ <br>
https://www.youtube.com/watch?v=qDHjx7RdoLY&t=691s <br>


## **Glossari** {#Glossari}
* **3GPP (Generation Partnership Project Projecte):** Organització que administra les xarxes mòbils globals.
* **LTE (Long Term Evolution):** És un estàndard per a comunicacions sense fils de transmissió de dades d'alta velocitat per telèfons mòbils i terminals de dades. El 3GPP està definida com una evolució de la norma 3GPP UMTS (3G).
* **LPWAN (Low Power Wide Area Networks):** Xarxa d'àrea àmplia de baixa potència. És un tipus de xarxa de telecomunicacions sense fils dissenyada per permetre comunicacions de llarg abast amb una taxa de bits baixa.
* **DRX (Mecanisme de recepció discontínua):** És especificat per 3GPP com a mètode d'estalvi de potència per estendre la durada de la bateria de l'equip de l'usuari (UE) en les xarxes LTE/LTE-A, però desafortunadament aquest tendeix a afectar negativament la qualitat de servei (QoS).
* **Uplink (enllaç o connexió de ascendent):** És un terme utilitzat en les comunicacions de ràdio. En les xarxes cel·lulars, un enllaç ascendent es veu des de la perspectiva de l'usuari pel que fa a l'enllaç de comunicació de qualsevol dispositiu cel·lular per a enviament de dades cap a l'estació base cel·lular
* **Downlink (enllaç o connexió descendent):** En les xarxes cel·lulars, un enllaç descendent es veu des de la perspectiva de l’estació base, és a dir,  l’enviament de dades cap al dispositiu cel·lular.

<br>
<br>
###### **Unitat Arquitectura d'Entorn Digital de Treball** <br>
###### **Direcció Arquitectura i Components Transversals**
