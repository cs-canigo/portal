+++
date        = "2020-01-28"
title       = "Cloud Native"
description = "Natiu en núvol (de l’anglès “Cloud Native”) esdevé un patró d'arquitectura de programari per al desenvolupament d'aplicacions tot atenent a tres principis essencials: escalabilitat, elasticitat i agilitat."
responsable = "Unitat d'arquitectura"
sections    = ["Blog", "home"]
blog_tags   = ["cloud","nuvol","Native","DevOps"]
categories  = ["Cloud Services"]
imatge      = "/images/bloc/2020/01/CloudNative1.png"
key         = "GENER2020"
+++

## Natiu en núvol (Cloud Native)

![CloudNative1](/images/bloc/2020/01/CloudNative1.png)
 
Natiu en núvol (de l’anglès “Cloud Native”) esdevé un patró d'arquitectura de programari per al desenvolupament d'aplicacions tot atenent a tres principis essencials: escalabilitat, elasticitat i agilitat.

-	**Escalabilitat i elasticitat:** permetre el creixement vertical o horitzontal de forma ràpida i dinàmica, sense restriccions en termes del maquinari en el que s’executen, ja sigui pel creixement natural de l’aplicació o per necessitats extraordinàries derivades de pics en la demanda.
-	**Agilitat:** com que s’augmenta la flexibilitat dels usuaris al subministrar, afegir o expandir els recursos d’IT, les organitzacions en  surten beneficiades en esdevenir més àgils.

La Cloud Native Computing Foundation (CNCF) defineix natiu en núvol de la següent forma:
 
*"Les tecnologies natiu en núvol permeten a les organitzacions construir i executar aplicacions escalables en entorns moderns i dinàmics, com ara els núvols públics, privats i híbrids. Els contenidors, les malles de serveis, els microserveis, la infraestructura immutable i les API declaratives exemplifiquen aquest enfocament.*

*Aquestes tècniques permeten sistemes connectats lliurement que són resilients, lleugers i observables. Combinat amb una automatització robusta, permeten als enginyers fer canvis d'alt impacte amb freqüència i predicibilitat amb un mínim treball."*


Tot i que natiu en núvol explota els principis essencials de la computació en núvol, no hem de confondre l'un amb l'altre, doncs aquest patró determina com les aplicacions són desenvolupades i desplegades, no a on.

Per fer-ho, natiu en núvol es basa en quatre eixos o pilars:
 
## 1.	[DevOps](https://canigo.ctti.gencat.cat/blog/2018/07/DevOps/): 

![CloudNative2](/images/bloc/2020/01/CloudNative2.png)

Són un conjunt de pràctiques implementades en base a una sèrie de principis fonamentals que tenen per objectiu reduir el temps destinat a lliurar noves versions d’un programari a entorns productius, en base a l’automatització de tasques, a la detecció precoç d’errors abans d’entrar a producció i a la millora de la col·laboració i confiança entre el equips de desenvolupament (Dev) i d’operacions, qualitat i seguretat (Ops). 

Alguna de les pràctiques més destacades són: 
-	L’automatització dels processos de construcció, integració i desplegament, eliminar totes les tasques manuals dels desplegaments (excepte les proves exploratòries), incloent el codi font, la definició de la infraestructura, els fitxers de configuració, els scripts de desplegament i els jocs de proves automatitzades. 
-	Disposar d’una gestió visual de les tasques en curs a més a més de limitar el nombre de tasques en vol.
-	Disposar d’eines d’observabilitat del funcionament de les aplicacions, que incloguin logs, telemetria i monitorització
-	Potenciar la col·laboració entre equips de desenvolupament i operacions.
-	Reduir el risc de nous desplegaments en base a l’ús de la pràctica del lliurament continu.
 
## 2.	Lliurament continu (Continuous Delivery):

![CloudNative3](/images/bloc/2020/01/CloudNative3.png)
 
Es tracta d’un enfocament en enginyeria de programari basat en la producció de noves versions en cicles curts per part dels equips, assegurant que el codi es pugui entregar de forma confiable en qualsevol moment, tot rebent retroacció en un temps menor. Sol basar-se en 3 etapes: automatització de la construcció dels artefactes i integració contínua, automatització de les proves i automatització de la implementació. 
 
## 3.	[Microserveis:](https://canigo.ctti.gencat.cat/blog/2016/08/microserveis/): 

![CloudNative4](/images/bloc/2020/01/CloudNative4.png)

Pot ser el pilar que aporta més al principi d'escalabilitat. Bàsicament tenim, en comptes de la clàssica aplicació monolítica, un conjunt de serveis (un per cada element o funcionalitat) per a ésser distribuïts i desplegats de forma desacoblada. Per tant, el que  es fa és passar d'una gran aplicació a un conjunt de petites funcionalitats molt més senzilles i àgils: serveis que a més son accessibles des de diversos sistemes tot proporcionant escalabilitat, reutilització de codi, simplificació de manteniment i configuració, etc.
 
## 4.	[Contenidors:](https://canigo.ctti.gencat.cat/blog/2015/12/contenidors/): 

![CloudNative5](/images/bloc/2020/01/CloudNative5.png)

Un contenidor es podria definir com una màquina virtual portable que integra les llibreries, dependències i fins i tot el sistema operatiu que el servei empaquetat en el contenidor necessita. Aquesta agrupació de programari (que tant pot executar microserveis com una aplicació monolítica) té els avantatges de treballar com una màquina virtual dedicada, sense les necessitats pel que fa a recursos de les màquines virtuals, fent, a més a més, accessible el codi des de diversos sistemes.

Coneguts els pilars en què  es basa natiu en núvol i els principis que atén, podríem fer un esbós de com hauria de ser una aplicació basada en aquest patró:

![CloudNative6](/images/bloc/2020/01/CloudNative6.png)

Com afegit a tenir en compte, comentar que la CNCF, per ajudar a la implantació de natiu en núvol, recomana seguir el [**“Cloud Native Trail Map”**](https://raw.githubusercontent.com/cncf/trailmap/master/CNCF_TrailMap_latest.png), que és un itinerari recomanat de fins a deu etapes per aprofitar les tecnologies natives de codi obert. A cada etapa ens ofereix una sèrie de productes de programari especialitzats per cobrir les necessitats de la mateixa. Les etapes són (citant al propi document):

* 1.	*Containerization*
* 2.	*CI/CD (Continuous Integration/Continuous Delivery)*
* 3.	*Orchestration & Application Definition*
* 4.	*Observability & Analysis*
* 5.	*Service Proxy, Discovery & Mesh*
* 6.	*Networking & Policy*
* 7.	*Distributed Database & Storage*
* 8.	*Streaming & Messaging*
* 9.	*Container registry & Runtime*
* 10.	*Software Distribution”*

Cal aclarir que només les tres primeres etapes son obligatòries, mentre que la resta són opcionals en funció de les circumstàncies.

El “Cloud Native Trail Map” ens porta al [**Cloud Native Interactive Landscape**](https://landscape.cncf.io/), a on es presenten totes les opcions per a cadascuna de les etapes:

![CloudNative7](/images/bloc/2020/01/CloudNative7.png)

Finalment, la CNCF també ofereix el [**“Cloud Native Serveless Landscape”**](https://landscape.cncf.io/format=serverless) per aquelles arquitectures que no requereixen gestió de servidors per generar i fer funcionar les aplicacions.

![CloudNative8](/images/bloc/2020/01/CloudNative8.png)


## Referències:
 
- [**Cloud Native – principios, aplicaciones y desafíos**]()
- [**Cloud Native Computing Foundation**]()
- [**What are Cloud-Native Applications?**]()
- [**10 Key Attributes of Cloud-Native Applications**]()
- [**Cloud Computing vs. Cloud Native: The Difference Revealed!**]()
- [**Blog d’arquitectura CTTI: DevOps**]()
- [**El legendario origen del movimiento DevOps**]()
- [**Qué es DevOps (y sobre todo qué no es DevOps)**]()
- [**DevOps, vampiros y licántropos**]()


