+++
date        = "2017-10-10"
title       = "DevOps"
description = "DevOps és un moviment que aplica pràctiques reconegudes i exitoses de la industria als sistemes d'informació"
sections    = ["", ""]
blog_tags   = ["Desenvolupament", "Operacions", "DevOps"]
categories  = ["Desenvolupament", "Operacions", "DevOps"]
imatge      = "/images/bloc/201710/devops-process.png"
key         = "OCTUBRE2017"
+++

# Introducció

Els sistemes de informació han de ser fiables i estar disponibles, per a que les organitzacions hi puguin dependre amb confiança. De fet, avui en dia gairebé tota iniciativa de qualsevol negoci depèn de la tecnologia en major o menor grau. Una aplicació creada per suportar un cas d'ús determinat no aporta valor si el departament de tecnologies de la informació no és capaç d'oferir una operació normal i mantenir les disrupcions a la mínima expressió. En aquest sentit, Arquitectura CTTI està introduint pràctiques bàsiques de DevOps, com són els desplegaments automàtics i l'aprovisionament d'infraestructures mitjançant codi. Ara és el moment de mirar més enllà i plantejar una estratègia de DevOps que permeti desplegar aquesta capacitat a tota la Generalitat. 

# Origen i Motivació

El terme "DevOps" va ser creat per Patrick Debois i Andrew Shafer el 2008, i va començar a ser d'ús comú el 2009 amb la presentació oferta per John Allspaw i Paul Hammond "10+ Deploy Per Day: Dev and Ops Cooperation at Flickr" a la O'Reilly Velocity Conference.

L'impacte que van produir Allspaw i Hammond va ser considerable. Presentaven una cosa mai vista abans com que Desenvolupament i Operacions col·laboraven junts per aconseguir fer més de 10 desplegaments al dia al portal Flickr. Durant mesos van analitzar conjuntament els fluxos de treball que compartien entre els dos equips, i amb confiança mútua i col·laboració, van aconseguir aquesta fita que encara avui en dia sembla impossible.

L'escenari que tenien era l'habitual en moltes organitzacions que es basen en les tecnologies d'informació. Desenvolupament rep l’encàrrec de materialitzar una idea de negoci en una aplicació que pugui ser consumida amb fluïdesa pels usuaris. Operacions és el responsable de mantenir les aplicacions en marxa. Per la divisió de responsabilitats i coneixements entre els dos departaments, la comunicació és difícil, normalment basada en correus electrònics, tiquets i escalats. Per tirar endavant els projectes i que acabin en dates, s'hi aboquen desenvolupadors i múltiples capes de gestors que fan servir gran part del temps i pressupost en desenvolupar les funcionalitats. Els departaments de Qualitat i d'Operacions reben una part insuficient d'aquest temps, sense tenir marge a fer proves ni rebre convenientment l'aplicació a Operacions. Per la raó que ningú es vol fer responsable d'un retard a la data, tant QA com Operacions rebaixen la dedicació possible i s'assumeix un deute tècnic, que s'intentarà eixugar un cop l'aplicació ja estigui en producció.

En aquest escenari, els resultats sovint no són satisfactoris. Normalment el producte és inestable i amb mancances d'usabilitat. A partir d'aquí és Operacions qui fa mans i mànigues en mantenir l'aplicació amunt, aplicant la força bruta, posant més servidors dels que estaven previstos en les estimacions, i havent de fer reinicis sovint, per culpa d'un codi que no ha passat un mínim control de qualitat ni és operat adequadament per manca d'instruccions fiables. 

El deute tècnic no és un concepte eteri i difícil d'observar. Es tota aquella feina no planificada que s'està obligat a tirar endavant per un mal desenvolupament i un desplegament inadequat. Malgrat aplicar rigor, disciplina, eficiències i processos, la feina no planificada passa per davant dels altres tipus de feina:
1) Projectes de negoci. Iniciatives de negoci que es materialitzen en aplicacions fetes per Desenvolupament.
1) Projectes interns d'Operacions. Generats per donar suport als projectes de negoci o per iniciatives de millora dins mateix del departament d'Operacions.
1) Canvis, normalment generats pels dos tipus anteriors i tractats en un sistema de ticketing com Remedy.

La feina no planificada inclou incidents i problemes causats pels tipus anteriors i que sovint tenen una precedència superior donat els escalats que porten afegits, i que afecten a sistemes en producció. 
Distorsiona qualsevol planificació ordenada de la feina d'Operacions i de Desenvolupament. Crema als equips, impedeix que l'organització avanci i mina la confiança que pot tenir el negoci sobre els departaments de Tecnologies de la Informació.
La feina no planificada no és gratis. Ans al contrari, és molt cara, doncs es realitza a canvi de feina planificada. Sense un control efectiu, el deute tècnic que comporta aquest fenomen garantirà que l'únic treball que es faci sigui la feina no planificada.
La feina no planificada te un altre dany colateral. Quan es gasta tot el temps fent de bomber, no queda massa energia per a planificar. Quan tot el que es fa es reaccionar, no es te la força mental com per a discernir quines feines cal abordar en aquell moment. Els equips es van saturant amb més projectes, amb menys temps disponible per cadascun, el que significa més multitasca improductiva, més escalats per demores, i més dreceres i favors que s'han de prestar per acabar fent la feina. Per aquest motiu, els equips d'Operacions cada cop ofereixen temps d'espera més llargs.

Allspaw i Hammond van demostrar que aquesta espiral es podia trencar i obtenir resultats inimaginables abans, mitjançant la col·laboració i la confiança entre els equips de Devs i Ops.

# Les Tres Vies de DevOps

Dins del moviment DevOps es coneixen les Tres Vies com un recull de principis, patrons, valors i filosofies que guien els processos i pràctiques de DevOps.

## La Primera Via

![La Primera Via](/images/bloc/201710/Dev-to-Ops-1-way.png)

La Primera Via es concentra en crear un flux de treball ràpid per passar de desenvolupament (commit) a "corrent en producció satisfactòriament". Aquest temps és el que hi ha entre la idea de negoci i tenir-la disponible per al seu consum. Necessita d'un coneixement profund del sistema de negoci i del sistema d'informació que el suporta.
Es basa en els següents principis fonamentals:
1) Automatitzar els processos de construcció, integració i desplegament, via SIC
1) Eliminar totes les tasques manuals en els desplegaments, excepte les proves exploratòries d'usuari.
1) Crear pipelines de desplegament que s'adaptin als requeriments del negoci i a l'estructura interna de l'aplicació.
1) Tractar la infraestructura com a codi, aconseguint un aprovisionament automàtic d'infraestructures, via els serveis de contenidors a cloud públic i privat: contenidors, balancejadors i dns.
1) Tenir tot sota control de versions: codi, infraestructura, fitxers de configuració, scripts de desplegament i jocs de proves automàtiques.
1) Reduir els temps de cicle per a que el volum i temps de resolució d'incidències es redueixin al mínim possible.
1) Per fer sostenible el servei, potenciar l'autoservei de repositoris, usuaris, i pipelines. Aquest últim via plantilles o via un llenguatge específic de domini que pugui incorporar pipelines creades en entorns de desenvolupament.
1) Disposar d'una gestió visual de les tasques. Recopilar tota la feina pendent, penjar-la en un taulell comú, prioritzar les tasques i abordar-les d'una en una. 
1) Limitar el nombre de tasques en vol, per evitar la multitasca.

La gestió visual fa que les tasques es facin més ràpidament per que:
1) és més fàcil prioritzar per que totes les tasques estan inventariades i són visibles per tothom.
1) Reduint les tasques en vol per recurs disminueix dràsticament els canvis de context i les interrupcions, el que accelera el seu acompliment.
Una bona eina de gestió visual és el Kanban. En el Kanban s'implementa el flux de treball (p.ex.: "backlog", "tasques preparades", "en curs", "fetes") i sobre ell es van reflectint totes les tasques en forma de targetes. No es fa cap tasca que no hi sigui al Kanban, el que promou que totes les tasques apareguin i es visualitzin, i per tant la seva priorització sigui més simple. Accelera i assegura la consecució de tasques, millorant els temps d'execució i podent predir quan es podrà tenir una tasca, sols pel fet de limitar les tasques en vol, reduir les interrupcions, i els temps d'espera.

### Composició dels Fluxos de Treball

Qualsevol flux de treball està composat per quatre parts: la màquina, l'home, el mètode i les mesures. Fer servir només les tres primeres no dona opció a la millora. Calen mesures per saber quines limitacions es troba el flux i poder establir punts de millora.
Les mesures poden ser de dos tipus:
* agregant informació de logs que proporcionen les màquines i components
* afegint informació de telemetria a les aplicacions, per a donar indicacions del rendiment i volum de les peticions que gestionen
Les mesures no només serveixen per a prendre accions reactives, sinó que s'ha d'establir un procés d'anàlisi preventiu del rendiment i així poder-lo resoldre abans que es converteixi en un foc que cal apagar fora d'horari laboral. Un exemple de CTTI és el seguiment del nombre de receptes electròniques que es realitzen: una desviació en la gràfica normal indica que alguna cosa està passant. Una correlació efectiva de diferents indicadors pot ajudar a prevenir problemes que s'esdevindran amb greus conseqüències.

Els fluxos de treball poden ser diversos segons el tipus d'aplicació o fins i tot d'artefacte que es vulgui desplegar. No és el mateix el desplegament d'una llibreria, una aplicació o una sonda. Tots es poden tractar com a codi font i ser guardats en control de versions, però el flux de treball és particular a cada tipus.

Dins d'aquesta part es contempla el manteniment preventiu de les aplicacions, com la gestió de pegats de seguretat, incorporació de noves funcionalitats, i de l'obsolescència dels components. Els sistemes d'informació no són gaire diferents als vehicles, la prevenció allarga la seva vida útil i evita disrupcions en el servei que donen. 

### Identificar els colls d'ampolla

Un altre punt a treballar en aquesta part és localitzar les limitacions que te el flux de treball. Cal identificar-les per a focalitzar sobre elles les millores al procés. Qualsevol millora feta després del coll d'ampolla, no te cap impacte sobre la productivitat. De la mateixa manera, qualsevol millora feta abans del coll d'ampolla enviarà més eficientment feina cap al coll d'ampolla, que tampoc serà capaç d'absorbir doncs ja està al seu límit de capacitat.

## La Segona Via

![La Segona Via](/images/bloc/201710/Dev-to-Ops-2-way.png)

La Segona Via tracta de tenir un flux constant de feedback ràpid sobre el funcionament de l'aplicació. Llavors es poden resoldre problemes de qualitat ja en el moment de pujar una nova versió i així estalviar retreball en moments més avançats del projecte. Es busca que el sistema reporti errors el més aviat possible per a que la seva resolució sigui també molt més ràpida i menys costosa. El feedback ha d'arribar no només a Desenvolupament, sinó també a la definició de les aplicacions-productes i al disseny d'aquestes.

Per això s'incorporen al flux de desplegament tota una sèrie de proves automàtiques i validacions de qualitat i seguretat. Quan alguna d'aquestes validacions falla, el flux s'atura i cal corregir els errors i tornar a iniciar el flux de desplegament. També s'afegeixen al codi font mecanismes de telemetria i avaluació continua del rendiment, per poder assegurar en tot moment que l'aplicació està funcionant com s'ha dissenyat i com esperen els seus promotors i usuaris.

Una altra part crítica d'aquesta via és fer visibles els temps d'espera dels recursos, tant humans com materials. Tant important és accelerar l'alliberament de tasques com gestionar els temps d'espera entre tasques. El temps d'espera d'un recurs és el percentatge en que està ocupat, dividit pel temps en què està lliure. Per exemple, si un recurs està ocupat al 50%, el temps d'espera és 50/50, o una unitat de temps. Si el recurs està ocupat al 90%, el temps d'espera és 90/10, és a dir, 9 vegades més gran. Explicita que malgrat una tasca tingui una durada prevista de 30', aquesta pot trigar setmanes a completar-se segons la quantitat de colls d'ampolla que ha de travessar.

![Temps d'Espera](/images/bloc/201710/Wait-Time.png)

## La Tercera Via

![La Tercera Via](/images/bloc/201710/Dev-to-Ops-3-way.png)

La Tercera Via consisteix a crear una cultura que fomenti dues coses: 
* l'experimentació contínua, que requereix assumir riscos i aprendre dels èxits i dels fracassos, i 
* entendre que la repetició i la pràctica són prerequisits per al mestratge.

L'experimentació i l'assumpció de riscos ens permeten millorar contínuament el sistema de treball, que sovint ens exigeix fer coses de manera molt diferent de com s'ha fet durant dècades. I quan les coses van malament, la constant repetició i pràctica diària és el que permet assolir les habilitats i hàbits que permeten tornar a la zona de confort i reactivar les operacions normals.

Les pràctiques necessàries en aquesta via, inclouen la creació d'una cultura d'innovació i presa de riscos (a diferència de la por a prendre decisions sense sentit), d'alta confiança (a diferència de la de baixa confiança, basada en comandament i control), assignant un percentatge del temps de cicle de Desenvolupament i Operacions cap a la millora dels requisits no funcionals, la reducció de deute tècnic, i un reforç constant en que es fomentin i celebrin les millores aconseguides.

# Valor de Negoci obtingut adoptant pràctiques DevOps

Si s'observen els resultats obtinguts per empreses que han adoptat pràctiques DevOps, destaquen els següents efectes:
* Els desplegaments de noves versions de codi són més freqüents
* El temps de lliurament de codi és més ràpid
* El percentatge de canvis amb èxit és superior
* El temps mig de recuperació d'un sistema és menor
En comptes de parlar de setmanes o mesos per disposar d'un desplegament, es passa a parlar d'hores o minuts. Els desplegaments que acaben amb èxit són la norma i en cas que vagin malament, la resolució de la incidència és molt més ràpida. En comptes de parlar de desplegaments en cap de setmana amb tall de servei, es gaudeix de desplegaments sense tall en horari laboral. Aquesta és la potència observada a moltes organitzacions que ja tenen experiència en aquesta disciplina. Despleguen noves funcionalitats més ràpidament i obtenint ratis molt alts de fiabilitat, estabilitat i seguretat.

# Referències:

John Allspaw i Paul Hammond "10+ Deploys Per Day: Dev and Ops Cooperation at Flickr":
[https://www.youtube.com/watch?v=LdOe18KhtT4](https://www.youtube.com/watch?v=LdOe18KhtT4)

Gene Kim, Kevin Behr i George Spafford "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win":
[https://www.amazon.es/Phoenix-Project-DevOps-Helping-Business/dp/0988262509](https://www.amazon.es/Phoenix-Project-DevOps-Helping-Business/dp/0988262509)

Gene Kim, John Willis, Patrick Debois i Jez Humble: "The DevOPS Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations":
[https://www.amazon.es/DevOPS-Handbook-World-Class-Reliability-Organizations/dp/1942788002](https://www.amazon.es/DevOPS-Handbook-World-Class-Reliability-Organizations/dp/1942788002)

Jez Humble, David Farley: "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation (Addison Wesley Signature Series)":
[https://www.amazon.es/dp/0321601912](https://www.amazon.es/dp/0321601912)

Nicole Forsgren, Jez Humble, Gene Kim, Alanna Brown, Nigel Kersten: "2017 State of DevOps Report":
[https://puppet.com/resources/whitepaper/state-of-devops-report](https://puppet.com/resources/whitepaper/state-of-devops-report)
