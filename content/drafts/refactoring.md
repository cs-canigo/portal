+++ date = "2018-12-04" lastmod = "2018-12-05" title = "Què és la Refactorització" description = "Refactorització és el procés de canviar un sistema de programari d'una manera que no alteri el comportament extern del codi, però millora la seva estructura interna" sections = ["drafts"] blog_tags = ["microserveis","monolits","refactorització"] categories = ["microserveis","monolits","refactorització"] +++



## Què és la refactorització?

Refactorització és el procés de canviar un sistema de programari d'una manera que no alteri el comportament extern del codi, però millora la seva estructura interna. És una forma disciplinada de netejar el codi que minimitza les possibilitats d'introduir errors. En essència, quan es refactoritza, s'està millorant el disseny del codi després d'haver estat escrit.

"Millora del disseny després d'haver estat escrit". Això és un estrany gir de frase. Durant gran part de la història del desenvolupament de programari, la majoria de la gent creia que es dissenyava primer, i només quan el disseny està aprovat, s'ha de codificar. Amb el temps, el codi es modificarà i la integritat del sistema -la seva estructura segons aquest disseny- es va degradant gradualment. El codi s'enfonsa lentament de l'enginyeria al hacking.

La refactorització és el contrari d'aquesta pràctica. Amb la refactorització, podem agafar un disseny dolent, fins i tot caòtic, i tornar-lo a treballar com un codi ben estructurat. Cada pas és senzill, fins i tot simplista. Mou un camp d'una classe a una altra, treu un codi d'un mètode per convertir-lo en el seu propi mètode, o empènyer un codi amunt o avall per una jerarquia. Tot i així, l'efecte acumulatiu d'aquests petits canvis pot millorar radicalment el disseny. És la inversa exacta de la noció de decadència del programari.

Amb la refactorització, la distribució de treball canvia. El disseny, en comptes de fer-ho tot per davant, es produeix de manera contínua durant el desenvolupament. A mesura que es construeix el sistema, s'aprèn a millorar el disseny. El resultat d'aquesta interacció és un programa on el disseny es manté bé mentre el desenvolupament continua.

Tot i que la necessitat fonamental de la transformació de les aplicacions és adaptar-les al nou software base especificat pel full de ruta del programari (Link), automatitzar la seva construcció/desplegament en entorns CTTI (link SIC), i seguir els principis d'arquitectura (link).

Paral·lelament a la modernització tecnològica, un dels objectius principals és l'obtenció d'un sistema amb una estructura molt més modular i propera a les arquitectures basades en microserveis.

La definició del pla de refactorització permetrà guiar aquest procés de transformació de la tecnologia i estructura del nou sistema.

### Estructura d'un sistema típic.

Habitualment ens trobem amb la necessitat d'adaptar una aplicació als nous requeriments del full de ruta per evitar la seva obsolescència, i unes funcionalitats que han d'evolucionar seguint els principis d'arquitectura. Tanmateix es disposa d'una base de dades monolítica i es planteja una convivència temporal de tots dos sistemes. Com a conseqüència s'estableix com a objectiu una estructura de codi que asseguri almenys les següents característiques:

-	Una visió clara dels diferents mòduls funcionals que componen el sistema.
-	Una estructura homogènia pel que fa a nomenclatura de les diferents capes i artefactes.
-	Capacitat per separar la configuració dels diferents mòduls, facilitant una possible independització a futur.
-	Assegurament dels camins permesos per establir dependències entre mòduls.
-   Ús del framework Canigó

Tots els artefactes del projecte seguiran la nomenclatura de directoris estàndard definida per maven a nivell de codi font, arxius de configuració, proves unitàries i configuració de proves.

### Configuració Comuna i Empaquetat.

El directori app correspon a l'artefacte de desplegament (war), i contindrà la configuració comuna a tots el mòduls. Permetrà tant l'arrencada com a aplicació Spring Boot com el desplegament en contenidor web o servidor d'aplicacions.
Addicionalment, contindrà el codi de la interfície d'usuari desenvolupada amb el framework Angular.
El procés d'empaquetatge generarà els arxius de distribució de l'aplicació Angular com un element separat per al seu desplegament en un servidor web.

### Components comuns

Inclourà aquelles utilitats que es determinin d'ús comú a diferents mòduls funcionals. Es desenvoluparan com a artefactes separats (llibreries jar). La estructura de la part de components comuns, inicialment, consistirà en tenir tants artefactes com sigui necessari, per posteriorment agrupar utilitats segons la capa tecnològica a la que s'apliquin, de manera que no s’arrastrin components que no s’utilitzaran en les diferents parts en què es divideix un mòdul funcional:
- core-web: Utilitats comunes a la part "front" dels diferents mòduls funcionals
- core-back: Utilitats comunes per a la implementació de la part "back" dels mòduls funcionals.
- core-security: Utilitats comunes per a la gestió de la seguretat.
- core-commons: Utilitats comunes aplicables a les diferents capes (tractament de dates, per exemple)


### Estructura de mòdul funcional
Cada mòdul funcional estarà compost de tres artefactes separats (llibreries jar):
-	Part services: Contindrà únicament definicions d'interfícies de servei i paràmetres d'entrada / sortida. Defineixen el contracte a nivell de serveis que proporciona el mòdul funcional de cara a altres mòduls.
-	Part back: Contindrà la capa d'implementació dels serveis i d'accés a dades, així com la configuració necessària per a la seva arrencada dins del sistema.
-	Part front: Contindrà la capa d'exposició de serveis REST, així com la configuració necessària per a la seva arrencada en el sistema.

Aquesta divisió impedirà els accessos a la part interna del mòdul, tant des de la part frontal com des d'altres mòduls. L'única part visible d'un mòdul seran les seves interfícies de servei.


### Passos del pla de refactorització.
El procés de transformació del sistema es realitzarà seguint un pla de refactorització que ordeni els passos a realitzar i permeti alliberar petits increments de la funcionalitat durant el desenvolupament.

1.	Divisió funcional del sistema.
El primer pas del procés de transformació serà una anàlisi inicial de les funcionalitats del sistema actual que permeti agrupar-les en diferents mòduls funcionals. D'aquesta divisió inicial quedaran definides les responsabilitats de cada mòdul, amb una descripció d'alt nivell del que ofereixen a nivell de serveis i de funcionalitat a nivell d'interfície d'usuari.

2.	Anàlisi de dependències.
La divisió funcional del sistema proposat haurà de validar pel que fa a les dependències que introdueix entre els diferents mòduls. Una excessiva inter-dependència o la presència de cicles seran senyals de que cal replantejar la divisió inicial o la generació d'un artefacte comú de forma separada.
Si representem la dependència d'un mòdul M1 amb un mòdul M2 com M1 ==> M2, els senyals que indicaran la necessitat de revisió seran d'aquest tipus:
o	M1 ==> M2 ==> M1: Inter-dependència entre móduls. 
o	M1 ==> M2 ==> M3 ==> M1: Cicle de dependència.
Haurà d'analitzar-se quins elements provoquen aquests cicles, i determinar si poden eliminar-se redistribuint les responsabilitats o generant nous artefactes independents (bé un nou mòdul o component comú).


Si bé els dos passos inicials del procés han de ser suficients per generar una divisió el més propera al resultat final, durant el desenvolupament de projecte podran detectar-se noves necessitats a nivell de components comuns per evitar la introducció de nous cicles de dependència.

A nivell tècnic, es pot aplicar una eina de visualització de dependències com JDeps per tenir una primera aproximació de les dependències entre els diferents paquets de codi font.
A partir d'aquí, el criteri de divisió en mòduls que es vol aplicar és purament funcional. Aquesta divisió segons funcionalitat ha de definir quines responsabilitats té cada mòdul, quines entitats està gestionant, quins serveis ha d'oferir i quins mòduls poden dependre d'aquests serveis. Aquest criteri és el que es farà servir després per moure classes o reimplementar canviant a la nova tenologia, des del sistema actual al nou.


3.	Estructura inicial de mòduls funcionals.
A nivell de codi es crearà l'estructura inicial del projecte amb el conjunt mòduls funcionals i components comuns detectats en els passos anteriors. L'anàlisi realitzada permetrà establir un ordre en el procés de refactorització. Aquells mòduls o components amb dependències d'entrada s'hauran d'abordar en primer lloc.

4.	Estructura inicial de frontal.
Es crearà l'estructura inicial de l'aplicació front-end al directori de l'artefacte app. Utilitzant les característiques de modularitat que proporciona el framework de front-end utilitzat, l'estructura de l'aplicació frontal haurà de correspondre amb els diferents mòduls funcionals detectats.

5.	Fases de la integració.
La primera fase correspondria a un pilot desenvolupat amb un framework de front-end a nivell de frontal. En aquesta fase no es farà la divisió complerta en mòduls funcionals. 
A la part Java s'ha seguit l'especificació base per al desenvolupament d'aplicacions rest amb el framework Canigó 3.
En aquest pas del pla de refactorització s'adaptarà el desenvolupament del pilot de la fase 1 en els següents nivells:
o	Interfície d'usuari: Integració del desenvolupament del pilot dins de l'aplicació front-end. Inicialment es mantindrà el codi integrat a la nova aplicació.
o	Backend Java: Divisió de codi i configuració en els diferents artefactes que composen un mòdul funcional, així com separació de components comuns empresos en la primera fase en artefactes independents.
Respecte a l’impacte, a nivell java en la fase 1 ja hi ha una separació a nivell de nomenclatura de paquets, una primera divisió en mòduls per a la funcionalitat del pilot, i el desenvolupament ja s'ha fet amb les noves tecnologies de Canigó 3. Per tant, l'esforç que es requereix és menor, ja que en aquest aspecte només és necessari moure els paquets a la nova estructura.
En la part de la interfície d'usuari serà necessari crear una nova aplicació front-end que integri el desenvolupament realitzat en el pilot de fronatl esmentat anteriorment. Tècnicament, els frameworks de frontal ofereixen la solució per fer-ho (convivència de versions). Per tant, l'impacte no ha de ser gran, però pot donar més problemes que el canvi en la part Java.


6.	Refactorització per mòdul.
La refactorització per mòdul funcional serà un procés iteratiu que s'aplicarà a totes les capes de forma simultània. L'ordre en la refactorització de codi no vindrà determinat per la divisió de capes de l'arquitectura, sinó per increments de funcionalitat en el sistema que puguin validar-se durant el desenvolupament del projecte. L'ordre en el qual es desenvoluparan vindrà determinat per les necessitats detectades en els dos primers passos, donant prioritat a aquelles funcionalitats que formin la base per increments de funcionalitat posteriors.

