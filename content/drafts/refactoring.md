+++ 
date        = "2018-12-04" 
title       = "Què és la Refacció" 
description = "Refacció és el procés de canviar un sistema de programari d'una manera que no alteri el comportament extern del codi, però millora la seva estructura interna" 
responsable = "Unitat d'arquitectura"
sections    = ["drafts"] 
blog_tags   = ["microserveis","monolits","refacció","refactoring"] 
categories  = ["microserveis","monolits","refacció","refactoring"] 
key         = "DESEMBRE2018"
+++

# Què és la refacció?


Segons el Termcat, la refacció és defineix com: "Acció de reestructurar el codi font d'una aplicació informàtica amb l'objectiu de millorar el disseny intern de l'aplicació sense que en resultin modificats el comportament extern ni la funcionalitat." És una disciplina que introdueix pràctiques d'enginyeria per netejar el codi sense alterar-ne el comportament visible pels usuaris i altres sistemes que interaccionen. Aquesta disciplina es dona normalment amb sistemes d'informació obsolets o al llindar de l'obsolescència.

Hom considera que una bona pràctica d'enginyeria del programari, primer es dissenya - en els seus diferents tipus i  circuits d'aprovació - i després es programa. Amb el temps, el codi es modificarà però totes les activitats de disseny són obviades per les presses o per la manca de pressupost i la coherència del sistema -la seva estructura segons aquest disseny- es va degradant gradualment. De les pràctiques d'enginyeria es passa a una activitat cada cop més artesanal, feixuga i dificil de gestionar.

La refacció és el contrari d'aquesta pràctica. Amb la refacció, s'agafa un disseny desballestat durant el temps, i es ressuscita en un codi ben estructurat. Són petits canvis que, acumulats, milloren la capacitat del sistema de substituir-se a si mateix, mantenint les seves funcionalitat al temps que permet evolucionar i incorporant els canvis i millores que proposa el CTTI: transformar les aplicacions per adaptar-les a les versions especificades pel full de ruta del programari (Link), automatitzar la seva construcció/desplegament en entorns CTTI (link SIC) i seguir els principis d'arquitectura (link). Aleshores es pot obtenir un sistema amb una estructura molt més modular i propera a les arquitectures basades en microserveis.

Com qualsevol disciplina d'enginyeria, ha d'haver-hi un pla al darrera que ajudi a guiar aquest procés de transformació de la tecnologia i estructura del vell sistema i millorar el seu disseny intern.


## Estructura d'un sistema típic.


Habitualment ens trobem amb la necessitat d'adaptar una aplicació als requeriments del full de ruta per evitar la seva obsolescència, i unes funcionalitats que han d'evolucionar seguint els principis d'arquitectura. Tanmateix es disposa d'una base de dades monolítica i es planteja una convivència temporal de tots dos enfocs. Com a conseqüència s'estableix com a objectiu una estructura de codi que asseguri almenys les següents característiques:

-	Una visió clara dels diferents mòduls funcionals que componen el sistema.
-	Una estructura homogènia pel que fa a nomenclatura de les diferents capes i artefactes.
-	Capacitat per separar la configuració dels diferents mòduls, facilitant una possible independització a futur.
-	Assegurament dels camins permesos per establir dependències entre mòduls.
-   Ús del framework Canigó.

Tots els artefactes del projecte seguiran la nomenclatura de directoris estàndard definida per maven a nivell de codi font, arxius de configuració, proves unitàries i configuració de proves.


## Configuració comuna i empaquetat.


El directori app correspon a l'artefacte de desplegament (war), i contindrà la configuració comuna a tots el mòduls. Permetrà tant l'arrencada com a aplicació Spring Boot com el desplegament en contenidor web o servidor d'aplicacions.
Addicionalment, contindrà el codi de la interfície d'usuari desenvolupada amb el framework Angular.
El procés d'empaquetatge generarà els arxius de distribució de l'aplicació Angular com un element separat per al seu desplegament en un servidor web.


## Components comuns


Inclourà aquelles utilitats que es determinin d'ús comú a diferents mòduls funcionals. Es desenvoluparan com a artefactes separats (llibreries jar). La estructura de la part de components comuns, inicialment, consistirà en tenir tants artefactes com sigui necessari, per posteriorment agrupar utilitats segons la capa tecnològica a la que s'apliquin, de manera que no s’arrastrin components que no s’utilitzaran en les diferents parts en què es divideix un mòdul funcional:
- core-web: Utilitats comunes a la part "front" dels diferents mòduls funcionals
- core-back: Utilitats comunes per a la implementació de la part "back" dels mòduls funcionals.
- core-security: Utilitats comunes per a la gestió de la seguretat.
- core-commons: Utilitats comunes aplicables a les diferents capes (tractament de dates, per exemple)


## Estructura de mòdul funcional


Cada mòdul funcional estarà compost de tres artefactes separats (llibreries jar):
-	Part services: Contindrà únicament definicions d'interfícies de servei i paràmetres d'entrada / sortida. Defineixen el contracte a nivell de serveis que proporciona el mòdul funcional de cara a altres mòduls.
-	Part back: Contindrà la capa d'implementació dels serveis i d'accés a dades, així com la configuració necessària per a la seva arrencada dins del sistema.
-	Part front: Contindrà la capa d'exposició de serveis REST, així com la configuració necessària per a la seva arrencada en el sistema.

Aquesta divisió impedirà els accessos a la part interna del mòdul, tant des de la part frontal com des d'altres mòduls. L'única part visible d'un mòdul seran les seves interfícies de servei.


## Passos del pla de refacció.


El procés de transformació del sistema es realitzarà seguint un pla de refacció que ordeni els passos a realitzar i permeti alliberar petits increments de la funcionalitat durant el desenvolupament.

1.	Divisió funcional del sistema.

El primer pas del procés de transformació serà una anàlisi inicial de les funcionalitats del sistema actual que permeti agrupar-les en diferents mòduls funcionals. D'aquesta divisió inicial quedaran definides les responsabilitats de cada mòdul, amb una descripció d'alt nivell del que ofereixen a nivell de serveis i de funcionalitat a nivell d'interfície d'usuari.

2.	Anàlisi de dependències.

La divisió funcional del sistema proposat haurà de validar pel que fa a les dependències que introdueix entre els diferents mòduls. Una excessiva inter-dependència o la presència de cicles seran senyals de que cal replantejar la divisió inicial o la generació d'un artefacte comú de forma separada.
Si representem la dependència d'un mòdul M1 amb un mòdul M2 com M1 ==> M2, els senyals que indicaran la necessitat de revisió seran d'aquest tipus:

** M1 ==> M2 ==> M1: Inter-dependència entre móduls. 

** M1 ==> M2 ==> M3 ==> M1: Cicle de dependència.

Haurà d'analitzar-se quins elements provoquen aquests cicles, i determinar si poden eliminar-se redistribuint les responsabilitats o generant nous artefactes independents (bé un nou mòdul o component comú).

Si bé els dos passos inicials del procés han de ser suficients per generar una divisió el més propera al resultat final, durant el desenvolupament de projecte podran detectar-se noves necessitats a nivell de components comuns per evitar la introducció de nous cicles de dependència.

A nivell tècnic, es pot aplicar una eina de visualització de dependències com JDeps per tenir una primera aproximació de les dependències entre els diferents paquets de codi font. A partir d'aquí, el criteri de divisió en mòduls que es vol aplicar és purament funcional. Aquesta divisió segons funcionalitat ha de definir quines responsabilitats té cada mòdul, quines entitats està gestionant, quins serveis ha d'oferir i quins mòduls poden dependre d'aquests serveis. Aquest criteri és el que es farà servir després per moure classes o reimplementar canviant a la nova tenologia, des del sistema actual al nou.

3.	Estructura inicial de mòduls funcionals.

A nivell de codi es crearà l'estructura inicial del projecte amb el conjunt de mòduls funcionals i components comuns detectats en els passos anteriors. L'anàlisi realitzada permetrà establir un ordre en el procés de refacció. Aquells mòduls o components amb dependències d'entrada s'hauran d'abordar en primer lloc.

4.	Estructura inicial de frontal.

Es crearà l'estructura inicial de l'aplicació front-end al directori de l'artefacte app. Utilitzant les característiques de modularitat que proporciona el framework de front-end utilitzat, l'estructura de l'aplicació frontal haurà de correspondre amb els diferents mòduls funcionals detectats.

5.	Fases de la integració.

La primera fase correspondria a un pilot desenvolupat amb un framework de front-end a nivell de frontal. En aquesta fase no es farà la divisió complerta en mòduls funcionals. 
A la part Java s'ha seguit l'especificació base per al desenvolupament d'aplicacions rest amb el framework Canigó 3.
En aquest pas del pla de refacció s'adaptarà el desenvolupament en els següents nivells:
o	Interfície d'usuari: Integració del desenvolupament del pilot dins de l'aplicació front-end. Inicialment es mantindrà el codi integrat a la nova aplicació.
o	Backend Java: Divisió de codi i configuració en els diferents artefactes que composen un mòdul funcional, així com separació de components comuns empresos en la primera fase en artefactes independents.

6.	Refacció per mòdul.

La refacció per mòdul funcional serà un procés iteratiu que s'aplicarà a totes les capes de forma simultània. L'ordre en la refacció de codi no vindrà determinat per la divisió de capes de l'arquitectura, sinó per increments de funcionalitat en el sistema que puguin validar-se durant el desenvolupament del projecte. L'ordre en el qual es desenvoluparan vindrà determinat per les necessitats detectades en els dos primers passos, donant prioritat a aquelles funcionalitats que formin la base per increments de funcionalitat posteriors.
