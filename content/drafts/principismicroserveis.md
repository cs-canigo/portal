+++
date        = "2017-10-07"
title       = "Principis de Microserveis"
description = "Un cop acabada la transformació del maquinari i dels programaris que suporten les aplicacions, comencem a observar una certa tracció en les necessitats de posar al dia també les aplicacions. En la majoria de casos són plantejables la conversió de monòlits en aplicacions basades en microserveis. En aquest post, presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis."
sections    = ["drafts"]
blog_tags   = ["microserveis"]
categories  = ["microserveis"]
imatge      = "/related/gicar/adfs-index.PNG"
key         = "OCTUBRE2017"
+++

<div id="google_translate_element">
</div>

<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'ca', includedLanguages: 'es,en,ca', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>




## Principis de Microserveis

Un cop acabada la fase de transformació i posada al dia del maquinari i dels programaris base que suporten les aplicacions i sistemes de la Generalitat, comencem a observar interès en posar al dia també les aplicacions. En la majoria de casos es posa damunt de la taula la conversió d'aplicacions monòlits cap a aplicacions basades en microserveis. D'aquesta manera es pretén dotar de lleugeresa i adaptabilitat als canvis a aplicacions que acostumen a durar molts més anys que les infraestructures i programaris que les sustenten. En aquest post, presentem els principis que han de governar el disseny i la implementació de les aplicacions basades en microserveis.

*Aquest post està basat en una sèrie de ponències i material videogràfic creat per [Sam Newman](http://samnewman.io/)*

### Què són els microserveis?

Els microserveis són serveis petits i autònoms que treballen plegats. Cadascun d'aquests serveis té una funció determinada, i la fa bé.

### 1. Han d'estar modelats sobre el domini de negoci que volem cobrir.

Sembla un principi trivial i simple, però trenca d'arrel el model que s'ha anat seguint els darrers anys, en que els serveis es creaven per capes tecnològiques: presentació, dades, totes les funcionalitats agrupades en una capa de negoci, interoperabilitat, etc. En aquest sentit els microserveis es dissenyen per a cobrir funcionalitats senceres, de dalt a baix, utilitzant les capes tecnològiques però només dins del propi àmbit funcional del microservei. El **disseny basat en el domini de negoci** ajuda a trobar **límits estables** (un pagament de nòmines sempre serà això mentre hi hagi treballadors a qui pagar una nòmina!) i seran **reutilitzables** (es poden pagar n varietats de nòmines, independentment dels tipus de contracte que estigui vigent segons la llei).

### 2. Es basen en l'automatització.

Aques és un principi crucial. Quan hi ha més parts a control·lar, l'automatització és clau per a poder construir i desplegar l'aplicació. Les dependències, que són dificils de controlar en qualsevol projecte de programari, esdevenen un maldecap encara major si no s'automatitzen els fluxes de construcció i desplegament dels microserveis. Deixar clar per escrit (en un script o fitxer de configuració) quines són les dependències i com s'han d'executar la construcció i el desplegament dels microserveis és la clau per no fracassar. Si no es té prou clar aquest principi, millor no posar-s'hi.

### 3. Ocultar els detalls de la implementació.

Un dels errors que sovint cometen els sistemes distribuïts és el d'acoplar excessivament els seus serveis entre ells. Com està fet el servei per dins no ha d'afectar a com els seus clients el consumeixen. De la mateixa manera, com més clients de diferents tecnologies pugui tenir un servei, més èxit tindrà i més podrà evolucionar. Per tant cal evitar a tota costa accessos directes a la base de dades del nostre servei, fer servir protocols propietaris a una tecnologia concreta, o utilitzar la distribució de clients o agents com a mitjà de connexió als nostres serveis. Com més universals siguin els protocols i la forma de cridar als nostres serveis, millor. REST és potser el paradigma d'aquest principi.

### 4. Descentralitzar totes les coses.

Com ja s'hi introduia en la definició, els microserveis han de ser autònoms. El microservei ha de ser autosuficient en recursos i en decissions de disseny. Una dependència d'altres elements, com una base de dades centralitzada o un bus de serveis trenquen aquest patró de disseny, donada la dependència d'altres equips i decisions. A nivell de codi es pot aplicar el paradigma de programari lliure internament a l'organització, on altres equips proposen millores i canvis al microservei afegint noves característiques a la base del codi i promovent aquests canvis a la consideració de l'equip propietari del microservei per a ser acceptats finalment com a part d'una nova versió. En el cas de processos de llarga durada, considerar tècniques com l'orquestració o la coreografia de serveis, implementades com un agregat de microserveis.

### 5. Desplegar-los independentment.

És la característica més important que necessiten els microserveis. **Cada servei ha de desplegar-se en un sistema operatiu** per a poder gaudir d'independència d'altres components; la utilització de contenidors permet crear màquines mínimes per a un sol servei, sense haver de pagar els peatges de la sobrecapacitat dels servidors físics o dels recursos dedicats pels hipervisors en el cas de la virtualització. 
Els serveis han de poder variar sense afectar als seus consumidors. Per això és convenient establir **Contractes Dirigits pels Consumidors**. En aquests, els consumidors estableixen les seves expectatives de funcionament en base a uns tests. Si la nova versió del servei falla en executar aquests tests, aquesta no pot pujar a producció doncs faria fallar l'execució a aquest consumidor. 
Els serveis s'han de poder versionar independentment de les necessitats i els calendaris dels consumidors. Mitjançant la **Coexistència de versions** els serveis poden anar publicant noves versions sense afectar als consumidors de versions antigues. Aquesta pràctica ha de tenir un compromís per anar eliminant versions obsoletes, sinó, el manteniment dels serveis requeriria de múltiples branques actives, que és una pràctica altament desaconsellada per la complexitat que afegeix al desenvolupament en cas d'haver d'aplicar correccions a vàries versions. 
Altra tècnica és la de **punts finals múltiples** en que el servei es desplega noves APIs en ports o camins diferents de l'aplicació, deixant el codi antic donant servei a les APIs originals. Aquest és un mètode útil en la majoria de casos, especialment quan no es pot controlar el calendari de canvis dels consumidors, com en el cas d'APIs públiques.Potser la característica més important que necessiten els microserveis

### 6. Donar preferència als consumidors dels serveis.

Dissenyar serveis per a que siguin usats posa als consumidors d'aquests en primera línia de les preocupacions dels desenvolupadors. **Conèixer els teus consumidors** i que aquests et coneguin és primordial per a que els serveis facin bé la feina per la que han estat creats. Els **contractes creats pels consumidors** són una bona eina per a conèixer les expectatives dels consumidors respecte als serveis que es publiquen. Uns **estàndards d'ús clars** i que s'entenguin ajuden a que els consumidors entenguin la seva funció sense dubtes. Per això resulten útils eines com els **documentadors d'APIs**, els **programaris de descoberta de serveis** o els **registres llegibles per humans**.

### 7. Aïllar les fallades.

Una arquitectura de microserveis no fa que els sistemes siguin més estables. Els altres microserveis han de poder seguir funcionant malgrat la caiguda o la lentitud d'un.

### 8. Altament observables.

Amb moltes parts mòbils, pot ser un desafiament comprendre el que està passant en el sistema

## Referències:

Sam Newman: "Principles of Microservices"
[http://samnewman.io/talks/principles-of-microservices/](http://samnewman.io/talks/principles-of-microservices/)

Sam Newman: "The Principles of Microservices. Embrace Autonomy to Optimize Performance" [http://shop.oreilly.com/product/0636920043935.do#](http://shop.oreilly.com/product/0636920043935.do#)

Sam Newman: "Building Microservices"
[http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078](http://shop.oreilly.com/product/0636920033158.do?cmp=af-code-books-video-product_cj_0636920033158_7739078)
