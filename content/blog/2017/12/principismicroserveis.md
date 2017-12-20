+++
date        = "2017-12-16"
title       = "Principis de Microserveis"
description = "Un cop acabada la transformació del maquinari i dels programaris que suporten les aplicacions, comencem a observar una certa tracció en les necessitats de posar al dia també les aplicacions. En la majoria de casos són plantejables la conversió de monòlits en aplicacions basades en microserveis. En aquest post, continuem la sèrie d'articles sobre els microserveis i presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis."
sections    = ["Blog", "home"]
blog_tags   = ["patrons de disseny","microserveis","automatitzacio"]
categories  = ["microserveis"]
imatge      = "/images/bloc/Services4.png"
key         = "DESEMBRE2017"
+++




## Principis de Microserveis

Un cop acabada la fase de transformació i posada al dia del maquinari i dels programaris base que suporten les aplicacions de la Generalitat, a Arquitectura CTTI comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos es posa damunt de la taula la conversió d'aplicacions monòlits cap a aplicacions basades en microserveis. D'aquesta manera es pretén dotar de lleugeresa i adaptabilitat als canvis a les aplicacions. Aquestes acostumen a durar molts més anys que les infraestructures i programaris que les sustenten. Per tant, gaudir d'aplicacions basades en arquitectures flexibles i que facilitin els canvis esdevé un factor d'èxit decisiu. 

En aquest post, continuem la sèrie d'articles sobre els [microserveis](http://canigo.ctti.gencat.cat/blog/2016/08/microserveis/) i presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis. En properes entrades continuarem aprofundint en les arquitectures de microserveis i iniciarem una nova sèrie sobre la Refactorització d'aplicacions.

*Aquest post està basat en una sèrie de ponències i material videogràfic creat per [Sam Newman](http://samnewman.io/)*

![Microservices logo](/images/bloc/Services4.png)

### Què són els microserveis?

Els microserveis són serveis petits i autònoms que treballen plegats. Cadascun d'aquests serveis té una funció determinada, i la fa bé. Una aplicació està composada per uns quants d'aquests serveis, que poden ser propis o creats per altres equips de dins o de fora de l'organització. En ser molts i petits, l'arquitectura, el disseny, el desenvolupament i les operacions dels microserveis són substancialment diferents dels sistemes monolítics. En aquests principis es mostren directrius per a crear una bona arquitectura de microserveis:

### 1. Han de ser modelats sobre el domini de negoci que volem cobrir.

Sembla un principi trivial i simple, però trenca d'arrel el model que s'ha anat seguint els darrers anys: els serveis es creaven per capes tecnològiques; presentació, dades, totes les funcionalitats agrupades en una única capa de negoci, interoperabilitat, etc. En canvi, els microserveis es dissenyen per a cobrir funcionalitats senceres, de dalt a baix. Les capes tecnològiques s'utilitzen només dins del propi àmbit funcional del microservei. El **disseny basat en el domini de negoci** ajuda a trobar **límits estables** (un pagament de nòmines sempre serà això mentre hi hagi treballadors a qui pagar una nòmina!), i preparats per a ser **reutilitzables**  en l'aplicació que l'ha creat, o en altres (es poden pagar n varietats de nòmines, independentment dels tipus de contracte que estigui vigent segons la llei).

### 2. Es basen en l'automatització.

Aquest és un principi crucial. Quan hi ha més parts a controlar, l'automatització és clau per a poder construir i desplegar l'aplicació. Les dependències, que són difícils de gestionar en qualsevol producte de programari, esdevenen un maldecap encara major si no **s'automatitzen els canals de construcció i desplegament** dels microserveis. Deixar clar per escrit (en un script o fitxer de configuració) quines són les dependències i com s'han d'executar la construcció i el desplegament dels microserveis és la clau per a no fracassar. L'**aprovisionament de plataformes per codi**, assegura que els microserveis es comporten sempre de la mateixa manera, doncs els entorns d'execució són exactament iguals a com s'han definit cada cop. D'aquesta manera s'evita que cada entorn es comporti de manera diferent perquè s'ha creat manualment. L'**automatització de les proves** assegura que els resultats són coherents de versió en versió, detectant fàcilment si les funcionalitats no es cobreixen en qüestió de minuts.

Si no es té prou clar aquest principi, millor no posar-s'hi.

### 3. Ocultar els detalls de la implementació.

Un dels errors que sovint cometen els sistemes distribuïts és el d'acoblar excessivament els seus serveis entre ells. Dissenyar i crear **contextos limitats**, amb abast determinat i sense interseccions amb altres serveis. Com està fet el servei per dins, no ha d'afectar a com els seus clients el consumeixen. De la mateixa manera, com més clients de diferents tecnologies pugui tenir un servei, més èxit tindrà i més podrà evolucionar. Per tant cal **evitar a tota costa**: 

* **accessos directes a la base de dades** del nostre servei, 

* fer servir **protocols propietaris** a una tecnologia concreta (RMI només funciona amb java), o

* utilitzar la distribució de **clients o agents** com a mitjà de connexió als nostres serveis. En aquest cas la distribució de clients i el seu manteniment és un maldecap addicional. 

**Com més universals siguin els protocols i la forma de cridar als nostres serveis, millor**. **REST** és potser el paradigma d'aquest principi.

### 4. Descentralitzar-ho tot.

Com ja s'hi introduïa en la definició, els microserveis han de ser **autosuficients** en recursos i en decissions de disseny. Cada equip que crea microserveis ha d'actuar com un **operador autònom** en les decisions que afecten a la funcionalitat que pretenen cobrir. Una dependència d'altres elements, com una capa única de presentació, una base de dades centralitzada, o un bus de serveis, trenquen aquest principi de disseny. El microservei necessitaria doncs d'altres equips i recursos i en dependria de llurs decisions i de la seva disponibilitat. 

En el cas de processos de llarga durada que requereixen la participació de varis microserveis, considerar tècniques com l'**orquestració** o la **coreografia** de serveis, implementades com un agregat de microserveis.

### 5. Desplegar-los independentment.

És la característica més important que necessiten els microserveis. **Cada servei ha de desplegar-se en un sistema operatiu** per a poder gaudir d'independència d'altres components; la utilització de contenidors permet crear màquines mínimes per a un sol servei, sense haver de pagar els peatges de la sobrecapacitat dels servidors físics o dels recursos dedicats pels hipervisors en el cas de la virtualització. 

Els serveis han de poder variar sense afectar als seus consumidors. Per això és convenient establir **contractes dirigits pels consumidors**. En aquests, els consumidors estableixen les seves expectatives de funcionament en base a uns tests que faciliten als propietaris del microservei. Si la nova versió del servei falla en executar aquests tests, aquesta no pot pujar a producció doncs faria fallar l'execució a aquest consumidor. 

Els serveis s'han de poder versionar independentment de les necessitats i els calendaris dels consumidors. Mitjançant la **Coexistència de versions** els serveis poden anar publicant noves versions sense afectar als consumidors de versions antigues. Aquesta pràctica ha de tenir un compromís per anar eliminant versions obsoletes, sinó, el manteniment dels serveis requeriria de múltiples branques actives. Aquesta és una pràctica altament desaconsellada per la complexitat que afegeix al desenvolupament en cas d'haver d'aplicar correccions a vàries versions vives. 

Una altra tècnica que es pot utilitzar és la de **punts finals múltiples** en què el servei desplega noves APIs en ports o camins diferents de l'aplicació, deixant el codi antic donant servei a les APIs originals. Aquest és un mètode útil en la majoria de casos, especialment quan no es pot controlar el calendari de canvis dels consumidors, com en el cas d'APIs públiques. 

### 6. Donar preferència als consumidors dels serveis.

Dissenyar serveis perquè siguin usats posa als consumidors d'aquests en primera línia de les preocupacions dels desenvolupadors. **Conèixer els teus consumidors** i que aquests et coneguin és primordial perquè els serveis facin bé la feina per la que han estat creats. Els **contractes creats pels consumidors** són una bona eina per a conèixer les expectatives dels consumidors respecte als serveis que es publiquen. Uns **estàndards d'ús clars** i que s'entenguin ajuden a que els consumidors entenguin la seva funció sense dubtes. Per això resulten útils eines com els **documentadors d'APIs**, els **programaris de descoberta de serveis** o els **registres llegibles per humans**.

### 7. Aïllar les caigudes.

En una arquitectura basada en microserveis, el fet que un microservei falli no ha de comportar que tot el sistema caigui. L'arquitectura ha de dissenyar-se tenint en compte aquesta eventualitat, i que l'error d'un servei no bloquegi l'execució d'altres serveis en la mesura del possible. Hi ha tres tècniques que poden ajudar a mantenir viva l'aplicació malgrat que un o varis serveis caiguin:

* **Timeouts**. Posant timeouts adequats a la durada esperada de l'execució d'una crida a un servei pot donar més temps a resoldre el problema i fer el sistema més resilient. Un microservei que ha de tenir un temps de resposta sub-segon, no cal que tingui un timeout de 10 minuts.

* **Mampares**. En un ús semblant a les mampares dels vaixells, separar els fils d'execució en pools de connexions dedicats en exclusiva a serveis diferents. Per tant si un servei cau no afecta a altres serveis que estan funcionant.

* **Tallacircuits**. Com els que tenim a les entrades de les cases per evitar mals majors amb l'electricitat, els tallacircuits en microserveis donen una resposta alternativa als consumidors quan el servei no pot funcionar de la manera que s'espera.

### 8. Altament observables.

En sistemes tradicionals, la **monitorització estàndard** basada en logs, temps de resposta i codis d'error a més a més del seguiment de les variables de CPU, espai en disc, memòria i I/O poden ser suficients. Però en el cas dels microserveis, amb múltiples parts mòbils i donant aquesta informació, pot ser inviable fer un seguiment a la manera clàssica. L'automatització i l'**agregació de logs i d'estadístiques** són claus per a donar una visió holística del sistema. 

Els microserveis poden fallar malgrat que estiguin aixecats i reportant bon funcionament de forma individual. La **monitorització de corrent** captura disfuncions de l'orquestració dels microserveis provocades per la xarxa o per altres sistemes de suport a l'execució. La **monitorització semàntica**, en què s'executa un circuit funcional complet, com "Crear un Expedient", és útil per avaluar les funcionalitats més crítiques d'un sistema. Cal notar que aquestes transaccions són falses i que no han d'introduir soroll al sistema. La introducció de rastres o **IDs de correlació** pot donar idea de per on ha anat passant l'execució d'una funcionalitat. Aquesta tècnica és especialment útil en sistemes dirigits per esdeveniments. És una eina molt potent a l'hora de realitzar investigacions d'informàtica forense. Finalment, la creació de **panells** on es mostri tota la informació en temps real del comportament del sistema i dels microserveis que el composen ajuden a la comprensió i al seguiment del seu funcionament.


## Referències:

Sam Newman: "Principles of Microservices"
[http://samnewman.io/talks/principles-of-microservices/](http://samnewman.io/talks/principles-of-microservices/)

Sam Newman: "The Principles of Microservices. Embrace Autonomy to Optimize Performance" [http://shop.oreilly.com/product/0636920043935.do#](http://shop.oreilly.com/product/0636920043935.do#)

Sam Newman: "Building Microservices"
[http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078](http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078)
