+++
date = "2021-09-09"
title = "Servei de Binaris"
description = "Eina SIC per al lliurament d'artefactes a CPD/LldT"
sections = "SIC"
aliases = [
  "/sic30-serveis/binaris/",
  "/noticies/2017-07-05-SIC-Gestio-binaris/"
]
toc = true
taxonomies = []
weight = 3
+++

## Introducció

El **Servei de Binaris del SIC** és un servei a disposició dels proveïdors de lots d’aplicacions i CPD per al lliurament i descarrega d’artefactes de cara al desplegament d’aplicacions.

<br/>
Cobreix les següents funcions i requeriments del servei SIC:

* **Unificar** el sistema d'intercanvi d’artefactes entre lots d'aplicacions i CPD/LldT
* **Potenciar la custòdia de codi font** al SIC de les aplicacions
* Fer ús d'un **únic repositori d’artefactes**, tant per llibreries com per artefactes desplegables
* Reforçar el **compliment normatiu** en el versionat de les aplicacions
* Possibilitat de tenir un servei a usar com a **procediment de contingència** en el desplegament d’aplicacions

## Accés al servei

Podrà accedir mitjançant el següent enllaç: https://bin.sic.intranet.gencat.cat <br/>

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20.png)</center>
<br/>

Haurà d'autenticar-se amb les seves credencials d'accés GICAR, de forma que:

* Els **Release Manager i responsables de lot** disposaran d'accés al servei de pujada de binaris i també a la descàrrega dels mateixos.
* Els **tècnics de CPD i llocs de treball** només disposaran d’accés a la descàrrega de binaris.

En cas de no disposar d’accés haureu de fer ús de l'[Autoservei d'usuaris](/plataformes/sic/serveis/sic30-serveis/autoservei-usuaris/) i/o sol·licitar-ho al seu responsable.

## Dipositar artefactes al SIC

Permet fer el **lliurament d'artefactes** mitjançant l'aplicació web. En la següent imatge s'explica el seu funcionament:

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_2.png)</center>

<br/>
Aquest servei està destinat a aplicacions que, ja sigui per estar desenvolupades amb una tecnologia no suportada o per particularitats del
procés de construcció, no es poden construir i desplegar mitjançant [Integració Contínua](/plataformes/sic/serveis/sic30-serveis/ci/). No obstant, també està pensat
per a fer-ne ús com a **procediment de contingència** en el desplegament d’aplicacions.

<br/>
Es realitzen les següents comprovacions:

* Dades obligatòries informades: **codi de diàleg, projecte, versió i binari a pujar**
* El codi de **versió** acompleix l’estàndard de versions: https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari/
* El codi de **projecte** està composat de lletres i números permetent addicionalment els caràcters: ‘-’, ‘_’ i ‘.’
* Si l’aplicació no està exempta de la custòdia de codi, es verificarà que s’hagi **actualitzat el codi font en els últims 20 dies**
* El fitxer té una **mida màxima de 500MB**. No es tracta d'un servei pensat per a la pujada de binaris i arxius pesats que no siguin permesos al GIT
doncs, amb aquest finalitat, s'ha habilitat el servei [GIT-LFS (Large File Storage)](/howtos/2019-10-09-sic-Howto-Git-lfs/).

<br/>
En finalitzar la pujada es mostrarà per pantalla la llista de binaris lliurats i la URL de descàrrega associada. Aquesta llista mostrada es podrà utilitzar
per tal d’emplenar la petició de desplegament.

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_3.png)</center>

<br/>

<div class="message information">
Els artefactes pujats al repositori de binaris <b>podran ser sobreescrits</b> sempre i quan es proporcioni la mateixa
informació al formulari de pujada (codi de diàleg, projecte, versió, nom fitxer). Per tant, en cas d'haver sol·licitat ja el desplegament del binari i haver
emplenat la petició de desplegament, no serà necessari fer cap canvi doncs les URL's es mantenen operatives.
</div>

## Recuperar artefactes del SIC

Permet la **descàrrega d'artefactes lliurats** pels responsables de l'aplicació per a procedir a fer el desplegament.
Aquesta opció el dirigirà cap al repositori de binaris (al que també pot accedir mitjançant l'enllaç https://bin.sic.intranet.gencat.cat/browse) on
podrà cercar l'entrada i l'artefacte que vol descarregar.
O simplement pot fer ús de la **URL que el proveïdor d'aplicacions ha indicat a la petició** de desplegament per accedir a la descàrrega directa.

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_6.png)</center>

<!-- Aquest servei és accessible per **Release Managers, responsables de lot i tècnics de CPD/LldT** en mode lectura.
S'ofereixen diverses opcions de cerca i visualització.
-->

Aquest servei és accessible per **Release Managers, responsables de lot i tècnics de CPD/LldT** en mode lectura.
S'ofereixen diverses opcions de cerca i visualització.

La **URL de descàrrega** seguirà el següent patró:
```
https://bin.sic.intranet.gencat.cat/api/binaris/file?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiaW5hcmlzLWJhY2tlbmQtcHJvIiwiaWF0IjoxNzMwMzY2NTExLCJleHAiOjE3MzU1NTA1MTEsImZpbGUiOiIyOTQ1L3Rlc3Rzb25kZXMvMS4xLjEvYmluLzI5NDUtdGVzdG5vZGVzLnppcCJ9.0cUl0t1YjKiPPHhJmFBi2w19Dmv95-IW9IHy8UWKGFM
```

Contenint aquest un token jwt amb el següent payload
```
{
  "iss": "binaris-backend-pro", <-- Issuer, que ha generat el token
  "iat": 1730366511, <-- Issued at, data de creació del token
  "exp": 1735550511, <-- Expiration time, data de caducitat del token
  "file": "2945/testsondes/1.1.1/bin/2945-testnodes.zip" <-- Fitxer, ruta del fitxer a descarregar
}
```

El sistema permet la consulta i descàrrega remota d’artefactes:

```
curl -O -J "https://bin.sic.intranet.gencat.cat/api/binaris/file?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiaW5hcmlzLWJhY2tlbmQtcHJvIiwiaWF0IjoxNzMwMzY2NTExLCJleHAiOjE3MzU1NTA1MTEsImZpbGUiOiIyOTQ1L3Rlc3Rzb25kZXMvMS4xLjEvYmluLzI5NDUtdGVzdG5vZGVzLnppcCJ9.0cUl0t1YjKiPPHhJmFBi2w19Dmv95-IW9IHy8UWKGFM"
```

<br/><br/>
<div class="message information">
<b>L'anterior sistema de descàrrega d'artefactes romandrà actiu i es podrà continuar accedint mitjançant el següent 
enllaç: https://hudson.intranet.gencat.cat/nexus/#browse/browse:binaris

Tot i que tots els artefactes existents han estat migrats al nou sistema.
</div>

## Eliminació de binaris

**Periòdicament s'executa un procés d'esborrament de binaris;** els artefactes més antics de 180 dies s'esborraran mantenint solament les últimes 5 versions. A partir d'1 any d'antiguitat solament es mantindrà l'última versió.
El Servei de Binaris no està concebut, per tant, com un servei de custòdia permanent sinó com un sistema d'intercanvi
d'artefactes per al desplegament d'aplicacions.


<br/><br/><br/>
Podeu accedir al [**Material formatiu**](/related/sic/2.0/formacio-binaris-20.pdf). <br/>
Si voleu més informació podeu consultar la secció de [**Guies**](/plataformes/sic/guies/sic30-guies/). <br/>
Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).
