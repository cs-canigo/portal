+++
date        = "2017-12-04"
title       = "De monòlits a (micro)serveis - Part 1: Descomposició tècnica"
description = "Com trencar un monòlit des del punt de vista tècnic"
sections    = ["drafts"]
categories  = ["microserveis","monolits"]
+++

## Monòlits

*Un cop acabada la fase de transformació i posada al dia del maquinari i dels programaris base que suporten les aplicacions i sistemes de la Generalitat, comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos es posa damunt de la taula la conversió d'aplicacions monòlits cap a aplicacions basades en (micro)serveis. D'aquesta manera es pretén dotar de lleugeresa i adaptabilitat als canvis a aplicacions que acostumen a durar molts més anys que les infraestructures i programaris que les sustenten.*

Des d'arquitectura CTTI, hem decidit fer una sèrie de posts tractant els principis que han de governar el disseny i la implementació de les noves aplicacions basades en (micro)serveis així com tècniques per tractar el problema tant des del punt de vista tècnic com funcional.

Aquest post serà un hands on sobre el trencament del monòlits des d'una vessant tècnica.

### Monòlit i alternatives

Al post anterior hem parlat dels principis que han de governar el disseny dels serveis. Però, val sempre la pena trencar un monòlit? Són tan dolents? Quines alternatives n'hi ha?

Un dels principals problemes amb monòlits és que tot i que el disseny del monòlit sigui modular i en capes, les proteccions que ofereixen contra l'acoblament lògic són febles i la barrera per introduir codi acoblat és baixa. Tot i que és possible, amb bones pràctiques, testeig i rigor, evitar l'increment d'acoblament amb el curs del temps, és una cosa rarament vist a la pràctica.

Formes de modularització com ara la utilització de llibreries compartides ajuden a combatre els monòlits. Aquestes llibreries tenen sentit en cas de crear codi per tasques comunes que no són específiques al domini de negoci, és a dir, que poden ser reutilitzades a diferents parts de la organització. El problema amb codi compartit és que fàcilment es converteix en un punt d'acoblament. A més, l'adopció de llibreries compartides trenca la heterogeneïtat de llenguatges i la independència del desplegament.

El gruix d'aplicatius a la Generalitat tenen com a base Java donat que el framework Canigó està fet en Java. Al món Java, conscient de la problemàtica amb els monòlits han sortit alternatives com OSGI i més recentment amb Java 9, Jigsaw.

The Open Source Gateway Initiative (OSGI) va néixer com un framework que permet la creació i instal.lació de plugins per Eclipse de forma totalment desacoblada. Ara, vist l'èxit, s'utilitza per a modularitzar el disseny a aplicacions Java.
D'acord a Sam Newman, el problema amb OSGI és que intenta reforçar coses com la gestió del cicle de vida del mòdul sense suficient suport del propi llenguatge. A OSGI resulta senzill, tot i que sigui utiltzat per bons equips, que la complexitat introduïda per la seva gestió sigui major que els beneficis que aporta.
Java 9 ofereix de forma nativa suport per la modularització a través del projecte Jigsaw que s'ha provat de forma exitosa al refactoring del propi Java i la seva JDK. Tot i que encara està per veure si és realment una solució vàlida ja hi ha molt [criticisme al seu voltant.](#jigsaw)

Altra forma de modularització agnòstica del llenguatge és SOA (Service Oriented Architecture). Microserveis, de fet, comparteix moltes coses comuns a SOA, fins i tot hi ha la idea per molts que microserveis no és més que una implementació correcta de SOA. No entrarem al detall de les diferències però microserveis es beneficia de noves tecnologies com ara contenidors i l'adopció de DevOps per automatitzar el desplegament i gestió. [MSvsSOA](#msvssoa)

### Què és un microservei?

Al post anterior ja hem tractar sobre que és un microservei i quins són els seus principis.

Ara bé, quin seria l'abast d'un microservei? Com de gran ha de ser l'equip? Amazon recomana com tamany ideal d'un equip el seu famós "two-pizza team", on 2 pizzes haurien de ser prou per alimentar a tot l'equip. Respecte al tamany del (micro)servei, Jon Eaves de RealEstate.com.au caracteritza un microservei com allò que podria ser reescrit completament en 2 setmanes.

Com veurem al darrer post, més orientat a la part funcional, un dels principals problemes amb microserveis és que el disseny dels serveis ha de ser orientat a domini de negoci (DDD). Així doncs, quant menys es coneix el domini a modelar, més difícil serà aconseguir delimitar les fronteres entre els diferents serveis. Si les fronteres entre serveis no es capturen bé d'inici implicarà refer molts canvis a la col·laboració entre serveis.

Per això, de vegades, convé més començar per una solució més monolítica i només plantejar-se el canvi a microserveis quant la part funcional estigui més madura.

### Per on començar?

Hem decidit transformar el monòlit en (micro)serveis. Perfecte, però per on començar? 
Michael Feathers al seu llibre ["Working effectively with legacy code"](#legacycode) defineix el concepte de costura __"seam"__, una porció de codi que pot ser tractada en aïllament sense impactar la resta del codi base. 

Però què serien bones costures? Els (sub)dominis de negoci o "bounded contexts" són els millors candidats a ser costures.

Llavors, el primer pas seria identificar aquests límits a nivell de codi.
La majoria dels llenguatges de programació proporcionen conceptes de namespace que ens permet agrupar codi similar tot junt. Agafant com a referència Java, el concepte de package seria similar.

Si el monòlit es troba dividit en múltiples repositoris, es pot agrupar temporalment tot el codi sobre el mateix repositori per fer la nova partició més àgilment. 

Un cop fet això, es pot moure tot el codi i agrupar-ho en base a packages en el cas de Java.
El codi hauria de representar la nostra organització, i per tant els packages representant els subdominis de la organització haurien d'interactuar de la mateixa forma que els grups organitzatius del domini. 

Durant aquest procés podem utilitzar eines per analitzar les dependències entre aquests packages. Hi ha eines com **Structure 101** o **jdeps**, que vé amb Java 8, que permeten veure dependències entre packages gràficament.

Aquest procés pot trigar des d'una tarda a un petit projecte fins a mesos quan parlem de milions de línies de codi. Els primers (micro)serveis es poden extreure abans de que la ordenació del codi sigui complerta.

Un cop organitzat el codi en base a aquestes costures, què fem desprès? Quina costura/servei podem treure primer?
Hi ha varis indicadors en base a que podem fer la decisió, ja siguin econòmics o estructurals. Un factor força representatiu, en cas de no tenir indicador clar, és treure la costura que sigui menys enredada a la resta.

Aquest treball de refactorització hauria d'estar molt lligat a la introducció de tests, sobretot unitaris al codi a refactoritzar. Michael Feathers al seu llibre parla del ["Legacy Code Change Algorithm"](#legacycode) que consta dels següents passos: 

>1. Identificar punts de canvi
>2. Trobar punts de test
>3. Trencar dependències
>4. Escriure tests
>5. Fer canvis i refactoritzar

El com executar un refactoring efectiu, i les seves diverses tècniques, s'escapen de l'abast d'aquest post. Sandro Mancuso ofereix moltes receptes en diferents llenguatges per tractar el [refactoring.](#refactoring)

Un darrer punt a tenir en compte és la utilització de llibreries compartides. Pot semblar una bona idea promoure el codi compartit en llibreries compartides però aquestes llibreries presenten massa sovint un grau d'acoblament entre diferents serveis. Si una llibreria compartida canvia sovint en el temps, o conté parts funcionals o entre serveis, és preferible fer copiar-pegar en els diferents serveis. És a dir, aplicar DRY dins d'un mateix servei però permetre-ho entre diferents serveis. 
Si s'utilitzen llibreries compartides, evitar l'ús de noms com ara common.jar que no indica si s'ha d'incorporar codi compartit ni quan. Millor utilitzar nom de llibreries en base al context com ara **security.jar** o **dateutils.jar**. Per facilitar la gestió i entendre implicacions entre canvis s'ha d'adoptar [polítiques de versionat semàntic](#semver). 

### Testing

Abans hem parlat del "Legacy code change algorithm" i la importància del testing a l'hora de fer refactoring. Però què testejar exactament? A quin nivell? End-to-end tests? Regressió? Unitaris?
De fet necessitarem de tot tipus per assegurar que la integració és coherent a tots els nivells. 
Al llibre Agile Testing Lisa Crispin i Janet Gregory presenten el quadrant de testeig definint què cobreix cada tipus de test.

![Quadrants de tests](/images/bloc/201801/tipustests.png)
 
La part d'a dalt del quadrant està orientada a gent més funcional i de negoci mentre que la part de sota és més orientada a tecnologia i com ajuda als desenvolupadors a crear el sistema.
S'ha d'entendre que no hi ha un únic tipus de test que cobreix totes les necessitats i que tots presenten avantatges i inconvenients. 

Sam Newman proposa per la descomposició de monòlits una estructura de tests del 90% unitaris, 9% de servei i 1% o inclús menys de end-to-end. El testeig d'aplicacions ha de ser una cosa dinàmica i ràpida, la introducció de molts end-to-end tests a més de ampliar l'abast i fragilitat del sistema tendeix a espaiar en el temps la execució dels tests donada la seva lentitut. 

Un dels principals problemes amb tests d'integració, ja siguin end-to-end o servei, és que el número d'escenaris a testejar creix exponencialment per cada nou servei. 

["Consumer-driven test"](#consumerdriventest) és un nou concepte molt orientat a (micro)serveis que testeja si canvis a un servei existent o un nou servei fa malbé la comunicació entre el servei i els seus consumidors. Això s'aconsegueix definint les expectatives dels consumidors als serveis en un contracte que les 2 parts han de complir. Per interaccions amb serveis transitius s'utilitzen mocks o stubs. Hi ha eines disponibles com ara **Pact** de RealEstate.com.au o **Pacto** de Thoughtworks. Pacto confia que les expectatives siguin més o menys fixes durant tot el cicle del projecte mentre que Pact recrea les expectatives al consumidor per cada canvi al codi font.


### Trencant el monòlit de la base de dades

Quan parlem del trencament de monòlits sovint ens oblidem de tractar el major monòlit de tots: la base de dades. 
Un dels antipatrons més vists a l'hora de tractar monòlits és trencar la base de dades en paral.lel amb els serveis. Això té varis problemes. Per començar, és molt difícil encertar amb la correcta granularitat del servei d'inici. Serveis molt granulars afavoreixen el ràpid desenvolupament i evolució del servei però poden introduir problemes com ara transaccionalitat,  latència elevada o governança més complicada. Trobar el correcte grau de granularitat és més un art que una ciència i de segur tindrà múltiples iteracions. A la figura de a sota es mostra diferents graus de granularitat de serveis, el verd seria el nivell de granularitat desitjat mentre que als extrems ens trobem amb problemes com monòlits o nanoserveis.

![Granularitats de serveis](/images/bloc/201801/granularitatserveis.png)

Mark Richards al seu llibre ["Microservices Antipatterns and pitfalls"](#msantipatterns) proposa atacar el problema des del punt de vista funcional. Un cop es tingui la granularitat desitjada als serveis es pot començar a dividir la base de dades per servei.

El trencament de monòlits de base de dades és conceptualment molt similar al de codi. El primer pas es identificar les costures "seams". El trobar-les a nivell de base de dades és un procés més difícil encara que amb codi. Tenim eines, com ara **SchemaSpy**, que ens poden ajudar en el procés representant gràficament relacions entre taules.

Sam Newman utilitzant com a referència el llibre de [Scott Ambler "Refactoring Databases"](#dbrefactoring) on introdueix diverses tècniques per tractar amb els diferents escenaris que puguin sortir. En base al problema, les dades extretes del monòlit poden ser externalitzades a fitxers, duplicades, mogudes a un nou esquema o fins i tot la solució podria passar per unificar 2 serveis per evitar problemes transaccionals. 

Al separar la base de dades, s'ha d'acceptar com a solució la consistència eventual. Segons el [teorema del CAP](#teoremacap) mai podrem tenir consistència, disponibilitat i partició a l'hora. Sam Newman recomana sacrificar consistència sobre disponibilitat. El sistema s'ha de dissenyar o bé tenint en compte la consistència eventual o agrupar serveis on hi apareguin problemes amb transaccions. De totes formes, més que plantejar-se una arquitectura CP o AP, té més sentit parlar de serveis individuals CP o AP.

### Orquestració o coreografia?

Al trencar el monòlit segurament hi surtiràn processos de negoci que necessiten de la interacció de multiples serveis.
Per implementar el fluxe d'interacció entre serveis es pot optar per orquestració (un servei pren la responsabilitat de gestionar i guiar el procés, com un director d'orquestra) o bé per coreografia, on els serveis reaccionen i s'autogestionen en base a accions dels altres serveis.
L'arquitectura de microserveis ha de tendir a ser molt desacoblada i això s'aconsegueix millor amb coreografia. La següent imatge mostra gràficament com canvia l'acoblament entre serveis si s'utilitza orquestració o coreografia:

![Orquestració vs coreografia](/images/bloc/201801/oc.png)

La comunicació entre serveis hauria de ser preferentment orientada a events i asíncrona. El middleware per gestionar els events s'hauria de mantenir simple i ficar tota la "intel.ligència" als endpoints del serveis. S'ha d'evitar afegir funcionalitat extra al middleware, per molt temptador que resulti. Les APIs del serveis han de ser el producte final i s'ha d'escapar de [plantejaments que adoptin ESB](#msvssoa) (Enterprise Service Bus). Llibreries com Akka que implementa el paradigma de ["actor model"](#akka) poden ser un ajut molt important a l'hora d'implementar solucions asíncrones basades en events.

### Més enllà

Hi ha molt temes encara no tractats sobre la conversió de monòlits a serveis. Al següent post veurem com tractar la partició des d'un punt de vista funcional. Introduirem tècniques per descompondre el negoci en serveis així com tractar com es pot gestionar i evolucionar una arquitectura basada en (micro)serveis.

Referències:

**Sam Newman: "Building Microservices (2015)"**
[http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078]
(http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078)

<a name="legacycode"></a>**Michael Feathers: "Working effectively with legacy code (2002)"**
[https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code]
(https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code)

<a name="msvssoa"></a>**Mark Richards:  "Microservices vs. Service-Oriented Architecture (2017)"**
[https://www.goodreads.com/book/show/28241543-microservices-vs-service-oriented-architecture]
(https://www.goodreads.com/book/show/28241543-microservices-vs-service-oriented-architecture)

<a name="msantipatterns"></a>**Mark Richards: "Microservices AntiPatterns and Pitfalls (2017)"**
[http://www.oreilly.com/programming/free/files/microservices-antipatterns-and-pitfalls.pdf]
(http://www.oreilly.com/programming/free/files/microservices-antipatterns-and-pitfalls.pdf)

<a name="dbrefactoring"></a>**Scott J. Ambler:  "Refactoring Databases (2006)"**
[https://www.goodreads.com/book/show/161302.Refactoring_Databases]
(https://www.goodreads.com/book/show/161302.Refactoring_Databases)

<a name="jigsaw"></a>**Crítiques sobre Jigsaw**
[https://developer.jboss.org/blogs/scott.stark/2017/04/14/critical-deficiencies-in-jigsawjsr-376-java-platform-module-system-ec-member-concerns]
(https://developer.jboss.org/blogs/scott.stark/2017/04/14/critical-deficiencies-in-jigsawjsr-376-java-platform-module-system-ec-member-concerns)

<a name="refactoring"></a>**Sandro Marcuso: "Refactoring"**
[https://github.com/sandromancuso/trip-service-kata]
(https://github.com/sandromancuso/trip-service-kata)

<a name="consumerdriventest"></a>**Consumer-driven test**
[https://martinfowler.com/articles/consumerDrivenContracts.html]
(https://martinfowler.com/articles/consumerDrivenContracts.html)

<a name="semver"></a>**Explicació del versionat semàntic**
[https://semver.org/]
(https://semver.org/)

<a name="teoremacap"></a>**Teorema del cap**
[https://es.wikipedia.org/wiki/Teorema_CAP]
(https://es.wikipedia.org/wiki/Teorema_CAP)

<a name="akka"></a>**Paradigma "actor model"**
[https://doc.akka.io/docs/akka/2.5.5/scala/guide/actors-motivation.html]
(https://doc.akka.io/docs/akka/2.5.5/scala/guide/actors-motivation.html)
