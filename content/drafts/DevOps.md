+++
date        = "2018-07-23"
title       = "DevOps"
description = "DevOps és un moviment que aplica pràctiques reconegudes i exitoses de la industria als sistemes d'informació"
sections    = ["", ""]
blog_tags   = ["Desenvolupament", "Operacions", "DevOps"]
categories  = ["Desenvolupament", "Operacions", "DevOps"]
imatge      = "/images/bloc/201710/devopsprocess.png"
key         = "JULIOL2018"
+++


## Introducció

Els sistemes de informació han de ser fiables i estar disponibles, perquè les organitzacions en puguin dependre amb confiança. De fet, avui en dia gairebé tota iniciativa de qualsevol negoci depèn de la tecnologia en major o menor grau. Una aplicació creada per suportar un cas d’ús determinat no aporta valor si el departament de tecnologies de la informació no és capaç d’oferir una operació normal i mantenir les disrupcions a la mínima expressió. En aquest sentit, Arquitectura CTTI està introduint pràctiques bàsiques de DevOps, com són els desplegaments automàtics i l’aprovisionament d’infraestructures mitjançant codi. Ara és el moment de mirar més enllà i plantejar una estratègia de DevOps que permeti desplegar aquesta capacitat a tota la Generalitat. 


## Origen i Motivació

El terme “DevOps” va ser creat per Patrick Debois i Andrew Shafer el 2008, i va començar a ser d’ús comú el 2009 amb la ponència de John Allspaw i Paul Hammond “10+ Deploy Per Day: Dev and Ops Cooperation at Flickr” a la O’Reilly Velocity Conference.
L’impacte que van produir Allspaw i Hammond va ser considerable. Presentaven una cosa mai vista abans com que Desenvolupament i Operacions col·laboraven per aconseguir fer més de 10 desplegaments al dia al portal Flickr. 
L’escenari que tenien era l’habitual en moltes organitzacions que es basen en les tecnologies d’informació. Desenvolupament rep l’encàrrec de materialitzar una idea de negoci en una aplicació que pugui ser consumida amb fluïdesa pels usuaris. Operacions és el responsable de mantenir les aplicacions en marxa. Per la divisió de responsabilitats i coneixements entre els dos departaments, la comunicació és difícil, normalment basada en correus electrònics, tiquets i escalats. Per tirar endavant els projectes i que acabin en dates, s’hi aboquen desenvolupadors i múltiples capes de gestors que fan servir gran part del temps i pressupost en desenvolupar les funcionalitats. Els departaments de Qualitat i d’Operacions reben una part insuficient d’aquest temps, sense tenir marge a fer proves ni rebre convenientment l’aplicació a Operacions. Per la raó que ningú es vol fer responsable d’un retard a la data, tant QA com Operacions rebaixen la dedicació possible i s’assumeix un deute tècnic, que s’intentarà eixugar un cop l’aplicació ja estigui en producció.
En aquest escenari, els resultats sovint no són satisfactoris. Normalment el producte és inestable i amb mancances d’usabilitat. A partir d’aquí és Operacions qui fa mans i mànigues per mantenir l’aplicació amunt, aplicant la força bruta, posant més servidors dels que estaven previstos en les estimacions, i havent de fer reinicis sovint, per culpa d’un codi que no ha passat un mínim control de qualitat ni és operat adequadament per manca d’instruccions fiables.
El deute tècnic no és un concepte eteri ni difícil d’observar. Es tota aquella feina no planificada que s’està obligat a fer degut a un mal desenvolupament i un desplegament inadequat. Malgrat aplicar rigor, disciplina, eficiències i processos, la feina no planificada passa per davant dels altres tipus de feina; projectes de negoci, projectes d’operacions i canvis planificats.
La feina no planificada distorsiona qualsevol planificació ordenada de la feina d’Operacions i de Desenvolupament. Crema als equips, impedeix que l’organització avanci i mina la confiança del Negoci sobre les àrees TIC.
La feina no planificada resulta molt cara, doncs es realitza a canvi de feina planificada. Sense un control efectiu, el deute tècnic que comporta aquest fenomen provocarà que l’únic treball que es faci sigui la feina no planificada.
Allspaw i Hammond van demostrar que aquesta espiral es podia trencar i obtenir resultats inimaginables abans, mitjançant la col·laboració i la confiança entre els equips de Devs i Ops.


## Les Tres Vies de DevOps

Dins del moviment DevOps es coneixen les Tres Vies com un recull de principis, patrons, valors i filosofies que guien els processos i pràctiques de DevOps. Les Tres Vies van ser introduïdes per Gene Kim, Kevin Behr i George Spafford al seu llibre "The Phoenix Project, A Novel About IT, DevOps, and Helping Your Business Win", i ràpidament es van constituir en un recull fonamental per a qualsevol organització que es plantegi abordar un projecte d'implantació de DevOps.  


## La Primera Via

![La Primera Via](/images/bloc/201710/Dev-to-Ops-1-way-narrow.png)

La Primera Via es concentra en crear un **flux de treball ràpid per passar de desenvolupament (commit) a "corrent en producció satisfactòriament"**. Aquest temps és el que hi ha entre la idea de negoci i tenir-la disponible per al seu consum. Necessita d'un coneixement profund del sistema de negoci i del sistema d'informació que el suporta.

Es basa en els següents principis fonamentals:

1. Automatitzar els processos de construcció, integració i desplegament, via SIC

1. Eliminar totes les tasques manuals en els desplegaments, excepte les proves exploratòries d'usuari.

1. Crear pipelines de desplegament que s'adaptin als requeriments del negoci i a l'estructura interna de l'aplicació.

1. Tractar la infraestructura com a codi, aconseguint un aprovisionament automàtic d'infraestructures, via els serveis de contenidors a cloud públic i privat: contenidors, balancejadors i dns.

1. Tenir tot sota control de versions: codi, infraestructura, fitxers de configuració, scripts de desplegament i jocs de proves automàtiques.

1. Reduir els temps de cicle per a que el volum i temps de resolució d'incidències es redueixin al mínim possible.

1. Per fer sostenible el servei, potenciar l'autoservei de repositoris, usuaris, i pipelines. Aquest últim via plantilles o via un llenguatge específic de domini que pugui incorporar pipelines creades en entorns de desenvolupament.

1. Disposar d'una gestió visual de les tasques. Recopilar tota la feina pendent, penjar-la en un taulell comú, prioritzar les tasques i abordar-les d'una en una. 

1. Limitar el nombre de tasques en vol, per evitar la multitasca.

La gestió visual de les tasques amb una eina com podria Kanban fa que les tasques es facin més ràpidament perquè:

1.	Es més fàcil prioritzar perquè totes les tasques estan inventariades i són visibles per tothom.
1.	Reduint les tasques en vol per recurs disminueix dràsticament els canvis de context i les interrupcions, el que accelera el seu acompliment.



## La Segona Via

![La Segona Via](/images/bloc/201710/Dev-to-Ops-2-way.png)

La Segona Via tracta de tenir un flux constant de **feedback ràpid** sobre el funcionament de l’aplicació. Llavors es poden resoldre problemes de qualitat ja en el moment de pujar una nova versió i així estalviar retreball en moments més avançats del projecte. Es busca que el sistema reporti errors el més aviat possible perquè la seva resolució sigui també molt més ràpida i menys costosa. El feedback ha d’arribar no només a Desenvolupament, sinó també a la definició de les aplicacions-productes, al disseny d’aquestes i a la seva arquitectura.

Per això s’incorporen al flux de desplegament tota una sèrie de proves automàtiques i validacions de qualitat i seguretat. Quan alguna d’aquestes validacions falla, el flux s’atura i cal corregir els errors i tornar a iniciar el flux de desplegament. També s’afegeixen al codi font mecanismes de telemetria i avaluació contínua del rendiment, per poder assegurar en tot moment que l’aplicació està funcionant com s’ha dissenyat i com esperen els seus promotors i usuaris.

Quan l’aplicació s’està executant és important que se’n realitzin mesures. Les mesures poden generar-se de dues maneres:

1. agregant informació de logs que proporcionen les màquines i components.
1. afegint informació de telemetria a les aplicacions, per a donar indicacions del rendiment i volum de les peticions que gestionen.

Les mesures no només serveixen per a prendre accions reactives, sinó que s'ha d'establir un procés d'anàlisi preventiu del rendiment i així poder-lo resoldre abans que es converteixi en un foc que cal apagar fora d'horari laboral. Un exemple de CTTI és el seguiment del nombre de receptes electròniques que es realitzen: una desviació en la gràfica normal indica que alguna cosa està passant. Una correlació efectiva de diferents indicadors pot ajudar a prevenir problemes que s'esdevindran amb greus conseqüències.


## La Tercera Via

![La Tercera Via](/images/bloc/201710/Dev-to-Ops-3-way.png)

La Tercera Via consisteix a crear una **cultura de col·laboració** que fomenti dues coses: 

1. l'experimentació contínua, que requereix assumir riscos i aprendre dels èxits i dels fracassos, i 
1. entendre que la repetició i la pràctica són prerequisits per al mestratge.

L'experimentació i l'assumpció de riscos permeten millorar contínuament el sistema de treball, que sovint exigeix fer coses de manera molt diferent de com s'ha fet durant dècades. I si les coses van mal dades, la constant repetició i pràctica diària és el que permet assolir les habilitats i hàbits que permeten tornar a la zona de confort i reactivar les operacions normals, en un temps cada cop menor.

Les pràctiques necessàries en aquesta via, inclouen:

- la creació d'una cultura d'innovació i presa de riscos (a diferència de la por a prendre decisions),

- d'alta confiança (a diferència de la de baixa confiança, basada en comandament i control), 

- assignant un percentatge del temps de cicle de Desenvolupament i Operacions cap a la millora dels requisits no funcionals i la reducció de deute tècnic,

- i un reforç constant en que es fomentin i celebrin les millores aconseguides.


## Valor de Negoci obtingut adoptant pràctiques DevOps

Si s'observen els resultats obtinguts per empreses que han adoptat pràctiques DevOps, destaquen els següents efectes:

- Els desplegaments de noves versions de codi són més freqüents

- El temps de lliurament de codi és més ràpid

- El percentatge de canvis amb èxit és superior

- El temps mig de recuperació d'un sistema és menor

En comptes de parlar de setmanes o mesos per disposar d'un desplegament, es passa a parlar d'hores o minuts. Els desplegaments que acaben amb èxit són la norma i en cas que vagin malament, la resolució de la incidència és molt més ràpida. En comptes de parlar de desplegaments en cap de setmana amb tall de servei, es gaudeix de desplegaments sense tall en horari laboral. Aquesta és la potència observada a moltes organitzacions que ja tenen experiència en aquesta disciplina. Despleguen noves funcionalitats més ràpidament i obtenint ratis molt alts de fiabilitat, estabilitat i seguretat.


## Referències:

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
