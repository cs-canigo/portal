+++
date        = "2017-12-04"
title       = "De monolits a (micro)serveis - Part 1: Descomposició tècnica"
description = "Com trencar un monòlit des del punt de vista tècnic"
sections    = ["drafts"]
categories  = ["microserveis","monolits"]
+++

## Monòlits

*Un cop acabada la fase de transformació i posada al dia del maquinari i dels programaris base que suporten les aplicacions i sistemes de la Generalitat, comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos es posa damunt de la taula la conversió d'aplicacions monòlits cap a aplicacions basades en (micro)serveis. D'aquesta manera es pretén dotar de lleugeresa i adaptabilitat als canvis a aplicacions que acostumen a durar molts més anys que les infraestructures i programaris que les sustenten.*

Des d'arquitectura CTTI, hem decidit fer una sèrie de posts tractant els principis que han de governar el disseny i la implementació de les noves aplicacions basades en (micro)serveis així com tècniques per tractar el problema tant des del punt de vista tècnic com funcional.

Aquest post serà un hands sobre el trencament del monòlits des d'una vessant tècnica.

### Monòlit i alternatives

Al post anterior hem parlat dels principis que han de governar el disseny dels serveis. Però, val sempre la pena trencar un monòlit? Són tan dolents? Quines alternatives n'hi ha?

Un dels principals problemes amb monólits és que tot i que el diseny del monòlit sigui modular i en capes, les proteccions que ofereixen contra l'acoblament lògic són febles i la barrera per introduïr codi acoblat és baixa. Tot i que és posible, amb bones pràctiques, testeig i rigor, evitar l'increment d'acoblament amb el curs del temps, és una cosa rarament vist a la pràctica.

Formes de modularització com ara la utilització de llibreries compartides ajuden a combatre els monòlits. Tot i que llibreries compartides poden tenir sentit, en cas de crear codi per tasques comuns que no son especifiques al domini de negoci per ser reutilitzables sobre la organizació. El problema amb codi compartit és que fàcilment es converteix en un punt d'acoblament. A més, l'adopció de llibreries compartides trenca la heterogeneitat de llenguatges i la independencia del desplegament.

El gruix d'aplicatius a la generalitat tenen com a base Java donat que Canigó és en Java. Al mon Java, conscient de la problemàtica amb els monolits han sortit alternatives com OSGI i més recentment amb Java 9, Jigsaw.

The Open source Gateway Initiative (OSGI) va néixer com un framework per permetre plugins ser instal.lats a Eclipse de forma desacoblada. Ara, vist l'éxit, s'utilitza per a modularitzar el diseny a aplicacions Java.
D'acord a Sam Newman, el problema amb OSGI és que intenta enforçar coses com la gestió del cicle de vida del modul sense suficient suport al propi llenguage. Això resulta en més treball fet pels autors del modul per oferir aillament adequat a nivell de modul. OSGI, encara que sigui utiltzat per bons equips és senzill que es converteixi a una forma de complexitat major que els beneficis que dona.
Java 9 ofereix de forma nadiva suport per la modularització a través del projecte Jigsaw que s'ha provat de forma exitosa al propi Java. Tot i que encara està per veure si realment és una solució vàlida ja hi ha molt criticisme al seu voltant. (referencia)

Altra forma de modularització agnòstica del llenguatge és SOA (Service Oriented Architecture). Microserveis, de fet, comparteix moltes coses comuns a SOA, fins i tot hi ha la idea per molts que microserveis no és més que una aplicació correcta de SOA. No entrarem al detall de les diferències però microserveis es beneficia de noves tecnologies com ara contenidors i l'adopció de DevOps per automatizar el desplegament i gestió. (referència)

### Què és un microservei?

Al post anterior ja hem tractar sobre que és un microservei i quins són els seus principis (referència). 
Ara bé, quin seria l'abast d'un microservei? Com de gran ha de ser l'equip? Amazon recomana com tamany ideal d'un equip el seu famós "two-pizza team", on 2 pizzes haurien de ser prou per alimentar a tot l'equip. Respecte al tamany del (micro)servei, Jon Eaves de RealEstate.com.au caracteritza un microservei com allò que podria ser reescrit completament en 2 setmanes.

Com veurem al darrer post, més orientat a la part funcional, un dels principals problemes amb microserveis és que el disseny dels servies ha de ser orientat a domnini de negoci (DDD). Així doncs, quant menys es coneix el domini a modelar, més difici será aconseguir delimitar les fronteres entre els diferents serveis. Si les fronteres entre serveis no es capturen bé d'inici implicarà refer molts canvis a la col.laboració entre serveis.
Per això, de vegades, convé més començar per una solució més monolitica i només plantejar-se el canvi a microserveis quant la part funcional estigui més madura.

### Per on començar?

Hem decidit transformar el monòlit en (micro)serveis. Perfecte, però per on començar? 
Michael Feathers al seu llibre "Working effectively with legacy code" defineix el concepte de costura "seam", això és una porció de codi que pot ser tractat en aïllament i treballar en ell sense impactar la resta del codi base. 

Però que serien bones costures? Els (sub)dominis de negoci o "bounded contexts" són els millors candidats a ser costures.

Llavors, el primer pas seria identificar aquests límits a nivell de codi.
La majoria dels llenguatges de programació proporcionen conceptes de namespace que ens permet agrupar codi similar tot junt. Tomant com referència Java, el concepte de package seria similar.

Si el monòlit es troba dividit en múltiples repositoris, es pot agrupar temporalment tot el codi sobre el mateix repositori per fer la nova partició més àgilment. 

Un cop fet això, es pot moure tot el codi i agrupar-ho en base a packages en el cas de Java.
El codi hauria de representar la nostra organització, i per tant els packages representant els subdominis de la organització haurien d'interactuar de la mateixa forma que els grups organizatius del domini. 

Durant aquest procés podem utilitzar eines per analitzar les dependències entre aquests packages. Hi ha eines com Structure 101 o jdeps, que vé amb Java 8, que permeten veure dependències entre packages gràficament.

Aquest procés pot trigar una tarda a un petit projecte o fins mesos quan parlem de milions de llínies de codi. Fins i tot podem plantejar extreure el primer (micro)servei ben abans d'ordenar tot el codi en packages orientats a dominis.

Un cop organitzat el codi en base a aquestes costures, què fem desprès? Quina costura/servei podem treure primer?
Hi ha varis indicadors en base a que podem fer la decisió, ja siguin econòmics o estructurals. En cas de no tenir indicador clar un factor força indicatiu és treure la costura que sigui menys enredada al reste.

Aquest treball de refactorització hauria d'estar molt lligat a la introducció de tests, sobretot unitaris al codi a refactoritzar. Michael Feathers al seu llibre parla del "Legacy Code Change Algorithm" que consta dels següents pasos: 

1. Identificar punts de canvi
2. Trobar punts de test
3. Trencar dependències
4. Escriure tests
5. Fer canvis i refactoritzar

El com executar un refactoring efectiu i les seves diverses tècniques s'escapen de l'abast d'aquest post. Sandro Mancuso ofereix moltes recetes en diferents llenguatges per tractar el refactoring https://github.com/sandromancuso/trip-service-kata

Un darrer punt a tenir en compte és la utilització de llibreries compartides. Pot semblar una bona idea promoure el codi compartit en llibreries compartides però aquestes llibreries presenten massa sovint un grau d'acoblament entre diferents serveis. Si una llibreria compartida canvia sovint en el temps o conté parts funcionals o entre serveis es preferible fer copiar-pegar en els diferents serveis. És a dir, aplicar DRY dins d'un mateix servei però permetre-ho entre diferents serveis. 
Si s'utilitzen llibreries compartides, evitar l'ús de noms com ara common.jar que no indica si s'ha d'incorporar codi compartit ni quan. Millor utilitzar nom de llibreries en base al contexte com ara security.jar o dateutils.jar 

### Testeig

Abans hem parlat del "Legacy code change algorithm" i la importància del testing a l'hora de fer refactoring. Però què testejar exactament? A quin nivell? End-to-end tests? Regressió? Unitaris?
De fet necessitarem de tot tipus per assegurar que la integració és coherent a tots els nivells. 
Al llibre Agile Testing Lisa Crispin i Janet Gregory presenten el quadrant de testeig i què cobreix cada tipus de test 
 (AFEGIR QUADRANT PAG 232 LLIBRE)
 
La part d'adalt del quadrant està orientada a gent més funcional i de negoci mentre que la part de sota és més orientada a tecnologia i com ajuda als desenvolupadors a crear el sistema.
S'ha d'entendre que no hi ha un únic tipus de test que cobreix totes les necessitats i que tots tenen trade-offs. 

Sam Newman proposa per descomposició de monòlits una estructura de tests sent el 90% unitaris, 9% de servei i 1% de end-to-end o potser menys del darrer. El testeig d'aplicacions ha de ser una cosa dinàmica i ràpida, la introducció de molts end-to-end tests a més de ampliar l'abast i fragilitat del sistema tendeix a espaiar en el temps la execució dels tests donada la seva lentitut. 
Un dels principals problemes amb tests d'integració, ja siguin end-to-end o servei, és que el número d'escenaris creix exponencialment per cada nou servei. "Consumer-driven test" és un nou concepte molt orientat a (micro)serveis que testeja que canvis a un servei existent o un nou servei no trenca els seus consumidors. Això s'aconsegueix definint les expectatives dels consumidors als serveis. Les expectatives  Hi ha eines disponibles com ara pact o pacto de thoughtworks 





fd ??
Stub vs mock -> preferir stub
e2e regression test are expensive and slow and not symmetrical 
Pyramid of testing (picture)
Swagger and HAL for documenting API
CDC (consumer-driven-contract) -> pact or pacto

### Trencant el monolit de la base de dades

Database refactoring -> No single database. Avoid database integration ever.
Find seams in the databases -> Difficult process!
SchemaSpy -> tool to graphically represent relationship between tables
Break foreign key -> Expose info via API -> will be slower but is it acceptable?
Shared static data -> Duplicate in each service, treat it as code -> application.properties or move it to own service
Shared data -> Usually create missing domain concept, exist
Pag 166 -> staging the break
First make sure DB separation makes sense, then think splitting out application code into services
Transactional boundaries: 
Accept eventual consistency as part of the solution for transactions -> Try again later
Another option is abort operation
Distributed transactions -> two-phase commit -> catches most failure cases but not foolproof

### Orquestració o coreografia?

fdfdkla. 

graus de granularitat: foto
Heroku 12 factor



### Evolució
CI/CD
Postel's law -> tolerant reader (maybe functional too)
Conway's law -> Millor part 3: funcional
Dont allow to coexist old and new endpoint for long time -> consider merging bot into same service them
REST best practices

Referències:

Sam Newman - Building Microservices - O'reilly Media (2015)
Jigsaw: https://developer.jboss.org/blogs/scott.stark/2017/04/14/critical-deficiencies-in-jigsawjsr-376-java-platform-module-system-ec-member-concerns
Marcuso refactoring: https://github.com/sandromancuso/trip-service-kata
Michael Feathers - Working effectively with legacy code
Mark Richards - Microservices vs. Service-Oriented Architecture
Definició microserveis: https://martinfowler.com/articles/microservices.html
Mark Richards - Microservices AntiPatterns and Pitfalls
Scott J. Ambler - Refactoring Databases
