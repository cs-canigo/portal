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

El **Servei de Binaris del SIC** s'encarrega de centralitzar el lliurament d’artefactes a CPD/LldT per al desplegament d’aplicacions.

No està pensat per a la pujada de binaris i arxius pesats que no són permesos al GIT doncs amb aquest objectiu es va habilitar el servei [GIT-LFS](/ howtos/2019-10-09-sic-Howto-Git-lfs/).

<span style="color: #C00000;font-weight: bold">AVÍS:</span> <span style="color: #C00000">Només es conservaran les últimes 5 versions per codi d'apliació i projecte, així com versions anteriors amb menys d'un mes de vida (30 dies).</span>

## Funcionament

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://bin.sic.intranet.gencat.cat <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR**. Els Release Manager i responsables de lot disposaran d'accés al servei de pujada de binaris i podran operar amb els codis de diàleg assignats. Els tècnics de CPD només disposaran d’accés a la descàrrega de binaris.

<br/>
Si no disposa d’accés haurà de sol·licitar-ho al seu responsable. Recordeu que teniu a la vostra disposició l’[Autoservei d'usuaris] (/sic-serveis/autoservei-usuaris/).

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20.png)</center>
<br/>

### Dipositar artefactes al SIC

Aquest servei està destinat a aplicacions que, ja sigui per estar desenvolupades amb una tecnologia no suportada o per particularitats del procés de construcció, no es poden construir i desplegar mitjançant el Servei d'[Integració Contínua] (/sic-serveis/ci/). <br/>

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_2.png)</center>

Es realitzen les següents comprovacions:
* Dades obligatòries informades: codi de diàleg, projecte, versió i binari a pujar
* El codi de versió acompleix l’estàndard de versions: https://qualitat.solucions.gencat.cat/estandards/estandard-versions-programari
* El codi de projecte està composat de lletres i números permetent addicionalment els caràcters: ‘-’, ‘_’ i ‘.’
* Si l’aplicació no està exempta de la custodia de codi, es verificarà que s’hagi actualitzat el codi font en els últims 20 dies
* El fitxer té una mida màxima de 500MB

En finalitzar la pujada es mostra per pantalla la llista de binaris lliurats i la URL de descàrrega.

### Recuperar artefactes del SIC

Aquesta acció és accessible per Release Managers, responsables de lot i tècnics de CPD/LldT i serà utilitzada de cara al desplegament de les aplicacions. Aquests disposaran d’accés al servei en mode lectura.

<CENTER>![Binaris](/images/news/SIC-GestioBinarisPortal_20_3.png)</center>

La URL de descàrrega seguirà el patró:
URL de descàrrega = <URL_NEXUS>/repository/binaris/<codi_diàleg>/<projecte>/<versió>/<artefacte>

## Eliminació de binaris

S'executa un **procés diari nocturn** d'esborrat de binaris de forma que es respectaran únicament les últimes 5 versions repositades per codi d'aplicació i projecte; i, pel que fa a versions anteriors, es respectaran si aquestes han estat pujades durant l'últim mes (30 dies). No està concebut, per tant, com un servei de custodia permanent de binaris si no com un sistema d'intercanvi de binaris per al desplegament d'aplicacions.

<br/><br/><br/>
Si voleu més informació podeu consultar la secció de [Manuals](/sic/manuals/). <br/>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.