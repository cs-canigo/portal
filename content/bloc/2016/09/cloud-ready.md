+++
date        = "2016-09-15"
title       = "Cloud-Ready"
description = "Aspectes a tenir en compte en la definició de l'arquitectura d'una aplicació per estar preprarada per anar al Cloud"
sections    = ["Bloc", "home"]
bloc_tags	= ["patrons de disseny", "microserveis", "api"]
imatge 		= "/images/bloc/cloud-ready.png"
key         = "OCTUBRE2016"
+++

Per tal que una aplicació pugui ser desplegada al **Cloud** i s'aprofiti dels beneficis que aquest aporta, cal que hagi estat dissenyada amb aquesta finalitat. Aquest disseny, normalment, és més complex que el disseny que es pugui realitzar per una aplicació destinada a ser desplegada en servidors "on-premise". Són molts els avantatges d'un entorn Cloud (flexibilitat, agilitat en aprovisionament, facilitat per desplegament continu,...) que fan que l'esforç en la **definició de l'arquitectura** valgui la pena.

A continuació s'enumeren diferents conceptes a tenir en compte en el disseny d'una aplicació que vulgui estar preparada per anar al Cloud:

## Cloud-ready concepts

### Micro-serveis <img src="/images/bloc/cloud-ready-microservices.png" alt="Microserveis" style="width: 80px;"/>

L'aplicació ha de ser concebuda com una **col·lecció de serveis**, no com a una única peça (monòlit). Més informació en aquesta [entrada](/bloc/2016/08/microserveis/) d'aquest mateix bloc.

### Escalabilitat <img src="/images/bloc/cloud-ready-scalability.png" alt="Escalabilitat" style="width: 80px;"/>

Una arquitectura orientada a micro-serveis permetrà l'**escalabilitat de cada servei per separat**. Els entorns Cloud estan dissenyats per aprovisionar molts entorns d'execució petits (contenidors, paas, ...). Per tant, les arquitectures orientades a micro-serveis són de forma natural fàcilment integrables en entorns Cloud.

L'escalabilitat permetrà canviar el nombre d'instàncies de l'aplicació segons les necessitats. És important que l'aplicació sigui el més "stateless" possible ja que d'aquesta manera serà molt més fàcil d'escalar.

L'aplicació ha d'estar preparada per aturar-se i reiniciar-se sempre que calgui, aturant nodes quan la càrrega sigui petita o incrementant-ne quan hi hagi un pic de consum.

### Agnòstic de la infraestructura <img src="/images/bloc/cloud-ready-infraestructure-agnostic.png" alt="Agnòstic de la infraestructura" style="width: 70px;"/>

L'aplicació **no ha d'estar lligada a cap element de la infraestructura** on hagi de ser desplegada. D'aquesta manera, si l'aplicació ha de traslladar-se d'una infraestructura a una altra de diferent, no es veurà afectada. Per exemple, no ha d'utilitzar IPs, o tenir en compte el número de instàncies de l'aplicació. Tampoc hauria de tenir funcionalitats dependents d'un sistema operatiu concret.

### Robustesa <img src="/images/bloc/cloud-ready-fault-tolerance.png" alt="Robustesa" style="width: 50px;"/>

Cada component ha de ser **el més autònom possible**, podent funcionar encara que la resta no estiguin disponibles. Aquesta tolerància a fallides és clau per a l'èxit d'una aplicació amb una arquitectura distribuïda. S'han d'evitar punts crítics que suposin la caiguda (downtime) de tota l'aplicació.

### Desacoblament de les dades <img src="/images/bloc/cloud-ready-decoupled.png" alt="Desacoblament" style="width: 60px;"/>

El **processament de les dades, i les mateixes dades, han d'estar en components separats**. Un cop desacoblats, és possible tenir les dades en un CPD privat i fer-ne el processament en un cloud públic o privat. Aquesta és una pràctica habitual en empreses i organitzacions que volen tenir les dades en els seus servidors però aprofitar els avantatges que proporciona el cloud.

### Emmagatzemament local <img src="/images/bloc/cloud-ready-storage.jpg" alt="Emmagatzemament" style="width: 80px;"/>

En un entorn Cloud **els fitxers que escriu l'aplicació al sistema de fitxers local són volàtics**. Per exemple, suposant que l'aplicació utilitza el sistema de fitxers local com a caché, en aturar-se un node i aixecar-se posteriorment en una altra ubicació (màquina física, VM, ...), aquesta caché desapareixerà, el que suposarà que el temps de resposta serà diferent dels altres nodes on si existeix aquesta caché. El que es recomana és utilitzar un repositori extern com pugui ser una base de dades SQL o NoSQL.

Un altre aspecte a tenir en compte és la lectura de fitxers de configuració de l'aplicació. Aquests han de ser idèntics en tots els nodes, ja que en cas contrari el resultat pot ser inesperat.

### Seguretat <img src="/images/bloc/cloud-ready-security.png" alt="Seguretat" style="width: 80px;"/>

#### Stateless

Per tal que una aplicació no es vegi afectada per un escalat dinàmic (canvi del nombre d'instàncies en calent) cal que sigui "stateless", és a dir, **no mantingui l'estat en la mateixa aplicació**. Una possibilitat és emmagatzemar part de l'estat en el navegador en aplicacions web modernes utilitzant funcionalitats d'HTML5, encara que el més habitual és utilitzar un repositori centralitzat en el servidor (REDIS, per exemple). No ha d'utilitzar-se l'HTTPSession en Java, o session[] hash a Ruby on Rails, donat que llavors estem emmagatzemant l'estat dins la pròpia aplicació, fet que volem evitar. La solució implica utilitzar un repositori amb alta disponibilitat extern a l'aplicació com pugui ser Redis o Memcached. 

### Interoperabilitat  <img src="/images/bloc/cloud-ready-interoperability.png" alt="Interoperability" style="width: 60px;"/>

#### Protocols moderns i estàndards

L'aplicació ha d'utilitzar protocols moderns, preferiblement **REST sobre HTTP(s)**, o inclús SOAP i WS-* estàndards. Per tant, cal evitar l'ús de protocols com per exemple RMI-IIOP ja en desús des de fa força temps.

#### Optimització de la comunicació entre components

Per tal que una aplicació tingui un bon rendiment, cal pensar molt bé quina és la manera més òptima per a comunicar els diferents components que en formen part. Per exemple, agrupant missatges en lloc d'estar contínuament fent intercanvi d'informació.

### DevOps <img src="/images/bloc/cloud-ready-devops.jpg" alt="DevOps" style="width: 60px;"/>

#### Configuració/Automatització

És molt important que els equips de desenvolupament i operacions es posin d'acord en com ha de ser la configuració de l'aplicació per a poder ser desplegada en els diferents entorns i aquest procés de desplegament pugui automatitzar-se (DevOps). Per assolir aquest objectiu cal definir **convencions** i documentar com han de ser aquestes configuracions per tal que no hi hagi divergències que puguin dificultar la tasca.

#### Monitorització

L'aplicació ha de poder ser monitoritzada. No ha de ser necessari tenir coneixements (interpretar logs) de l'aplicació per a poder determinar si aquesta està funcionant correctament o no. Per tant, han d'existir **mètriques i sondes (health check URL) tècniques**, no funcionals, que permetin saber si l'estat de l'aplicació és correcte. Per exemple, una URL que retorni el codi HTTP 200 en cas satisfactori o un codi diferent altrament.

#### Traçabilitat

L'aplicació no ha d'escriure els logs a un fitxer local. Cal recordar que els nodes han de poder aturar-se i reiniciar-se sense que l'aplicació es vegi afectada. En cas que els logs s'escriguin en el sistema de fitxers local aquesta informació es perdrà.

En entorns cloud s'acostuma a utilitzar un servei extern que funciona com a **agregador de logs**. D'aquesta manera els logs persistiran encara que els nodes de l'aplicació s'eliminin. Donat que la transmissió de logs es fa per la xarxa, cal anar amb compte amb el nivell de log (error, warn, info, debug, trace) configurat en entorns productius, ja que pot produïr un problema de saturació en cas que estigui configurat a un nivell de detall molt alt. El volum de logs ha de ser manegable.

## Canigó

Es preveu una evolució del framework Canigó durant finals d'aquest any i 2017 en aquesta línia, per tal de facilitar el màxim possible el seu desplegament en entorns Cloud.

<br />

**Referències**:

- http://blog.octo.com/en/cloud-ready-applications/
- http://www.ibm.com/developerworks/websphere/techjournal/1404_brown/1404_brown.html
- http://techbeacon.com/5-steps-building-cloud-ready-application-architecture
