+++
date = "2020-02-25"
title = "Servei de Binaris"
description = "Eina SIC per al lliurament d'artefactes a CPD/LldT"
sections = "SIC"
aliases = [
  "/noticies/2017-07-05-SIC-Gestio-binaris/"
]
toc = true
taxonomies = []
weight = 3
+++

## Introducció

El **Servei de Binaris del SIC** és un servei a disposició dels proveïdors per al lliurament d'artefactes de cara al desplegament d'aplicacions.

<br/>
Els objectius que es persegueixen són:

* **Unificar** el sistema d'intercanvi d’artefactes entre lots d'aplicacions i CPD/LldT
* **Potenciar la custodia de codi font** al SIC de les aplicacions
* Fer ús d'un **únic repositori d’artefactes**, tant per llibreries com per artefactes desplegables
* Reforçar el **compliment normatiu** de nomenclatura de versions
* Possibilitat de tenir un servei a usar com a **procediment de contingència** en el desplegaments d’aplicacions

No es tracta d'un servei pensat per a la pujada de binaris i arxius pesats que no siguin permesos al GIT doncs, amb aquest finalitat, s'ha habilitat
el servei [GIT-LFS (Large File Storage)](/howtos/2019-10-09-sic-Howto-Git-lfs/).


## Accés al servei

Podrà accedir mitjançant el següent enllaç: https://bin.sic.intranet.gencat.cat <br/>

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20.png)</center>
<br/>

Haurà d'autenticar-se amb de les seves credencials d'accés GICAR. Els **Release Manager i responsables de lot** disposaran
d'accés al servei de pujada de binaris i podran operar amb els codis de diàleg assignats. Els **tècnics de CPD i llocs de treball** només disposaran d’accés a la descàrrega de binaris.
En cas de no disposar d’accés haureu de fer ús de l'[Autoservei d'usuaris] (/sic-serveis/autoservei-usuaris/) i/o sol·licitar-ho al seu responsable.

## Dipositar artefactes al SIC

Permet fer el **lliurament d'artefactes** mitjançant l'aplicació web.

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_2.png)</center>

Aquest servei està destinat a aplicacions que, ja sigui per estar desenvolupades amb una tecnologia no suportada o per particularitats del
procés de construcció, no es poden construir i desplegar mitjançant [Integració Contínua] (/sic-serveis/ci/).

<br/>
Es realitzen les següents comprovacions:

* Dades obligatòries informades: **codi de diàleg, projecte, versió i binari a pujar**
* El codi de **versió** acompleix l’estàndard de versions
* El codi de **projecte** està composat de lletres i números permetent addicionalment els caràcters: ‘-’, ‘_’ i ‘.’
* Si l’aplicació no està exempta de la custodia de codi, es verificarà que s’hagi **actualitzat el codi font en els últims 20 dies**
* El fitxer té una **mida màxima de 500MB**


En finalitzar la pujada es mostrarà per pantalla la llista de binaris lliurats i la URL de descàrrega associada:

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_3.png)</center>

<br/>
Els artefactes pujats al repositori de binaris **podran ser sobreescrits** sempre i quan es proporcioni la mateixa
informació al formulari de pujada (codi de diàleg, projecte, versió, nom fitxer).

## Recuperar artefactes del SIC

Permet la **descàrrega d'artefactes lliurats** pels responsables de l'aplicació per al seu desplegament. Pot optar per accedir
directament al repositori de binaris mitjançant el següent enllaç: https://hudson.intranet.gencat.cat/nexus/#browse/browse:binaris

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_4.png)</center>

Aquest servei és accessible per **Release Managers, responsables de lot i tècnics de CPD/LldT** en mode lectura, no permetent la seva edició
o eliminació. S'ofereixen diverses opcions de visualització.

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_5.png)</center>


La **URL de descàrrega** seguirà el següent patró:
```
https://hudson.intranet.gencat.cat/nexus/repository/binaris/_codi_diàleg_/_projecte_/_versió_/_artefacte_
```


El sistema permet la consulta i descàrrega remota d’artefactes:

```
curl
X GET [ u user:pwd ]
"https://hudson.pre.intranet.gencat.cat/nexus/binaris/projecte/1.0.0/bin/DesktopOK.zip" O
curl
X GET [ u user:pwd ]
"https://hudson.pre.intranet.gencat.cat/nexus/service/rest/v1/assets?q=projecte/1.0.0/*& binaris
```

<br/><br/><br/>
**NOTA: L'anterior sistema de descàrrega d'artefactes romandrà actiu fins el 30/04/2020** i, durant aquest període, es podrà accedir mitjançant
el següent enllaç: https://bin.sic.intranet.gencat.cat/binaris/ <br/>

<!---
## Eliminació de binaris
S'executa un procés diari nocturn d'esborrat de binaris de forma que **únicament es respectaran les últimes 5 versions** repositades per codi
d'aplicació i projecte; i, pel que fa a versions anteriors, es respectaran si aquestes han estat pujades durant l'últim mes (30 dies). No està concebut, per tant, com un servei de custodia permanent de binaris si no com un sistema d'intercanvi de binaris per al desplegament d'aplicacions.
--->

<br/><br/><br/>
Podeu accedir al [**Material formatiu**](/related/sic/2.0/formacio-binaris-20.pdf). <br/>
Si voleu més informació podeu consultar la secció de [**Manuals**](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o
contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
