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

Un dels principals problemes amb monólits és que tot i que el diseny del monòlit sigui modular i en capes, les proteccions que ofereixen contra l'acoblament lògic són febles i la barrera per introduïr codi acoblat és baixa. Tot i que és posible, amb bones pràctiques, testeig i rigor, evitar l'increment d'acoblament amb el curs del temps, és rarament vist a la pràctica.

Formes de modularització com ara la utilització de llibreries compartides ajuden a combatre els monòlits. Tot i que llibreries compartides poden tenir sentit, en cas de crear codi per tasques comuns que no son especifiques al domini de negoci per ser reutilitzables sobre la organizació. El problema amb codi compartit és que fàcilment es converteix en un punt d'acoblament. A més, l'adopció de llibreries compartides trenca la heterogeneitat de llenguatges i la independencia del desplegament.

Al mon Java, conscient de la problemàtica amb els monolits han sortit alternatives com OSGI i més recentment amb Java 9, Jigsaw.

Sobre els anys han sortit alternatives per oferir una barrera menys feble al voltant dels monolits, com ara OSGI o SOA.

Ara bé SOA
Java 9 with Jigsaw, tècniques per modularitzar
When not microservices?
The less you know the domain, the harder will be to get proper bounded contexts -> moure a funcional
Getting service boundaries wrong results in making lots of changes to service2service collaboration (expensive operation) -> funcional
Understand domain prior to split into services -> funcional
Evolutionary architecture 


SOA i diferència amb microserveis

### Què és un microservei?

2 week work
2 pizza team
Owneership
graus de granularitat: foto

### Per on començar?


packages representing context and move code into them -> Test while moving code and refactoring
Analyze dependencies (structure 101) jdeps in JDK8. Largely improved in JDK9
No need to sort all code before splitting first service
We have the seams
Start pulling out the least tangled dependency
Dont use shared libraries -> favour copy & paste instead
Now, incremental approach using the algorithm Michael Feathers
legacy code change algorithm
http://agileinaflash.blogspot.com.es/2009/03/legacy-code-change-algorithm.html

### Testing
fd ??
Stub vs mock -> preferir stub
e2e regression test are expensive and slow and not symmetrical 
Pyramid of testing (picture)
Swagger and HAL for documenting API
CDC (consumer-driven-contract) -> pact or pacto

### Integració


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


### Evolució
CI/CD
Postel's law -> tolerant reader
Conway's law -> Millor part 3: funcional
Dont allow to coexist old and new endpoint for long time -> consider merging bot into same service them
REST best practices
