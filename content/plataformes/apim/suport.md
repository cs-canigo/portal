+++
date = "2024-10-25"
title = "Canals de suport"
description = "Com obtenir suport per part de la oficina tècnica de l'API Manager Corporatiu"
sections = "APIM"
toc = true
taxonomies = []
weight = 3
+++

## Oficina tècnica d'API Manager

L’oficina tècnica d'API Manager es va crear amb la finalitat de donar el suport necessari als departaments que es volen adherir a la seva plataforma.

L’oficina tècnica està pensada per ajudar en tot el procés d’integració en els diferents entorns de la plataforma (PRE i PRO) i donar suport al llarg de tot el cicle de vida de les API d'un projecte.

L'oficina tècnica podrà realitzar durant l'acompanyament i suport d'un projecte alguna de les tasques següents, entre d'altres:
* Donar accés i configurar permisos d'usuaris
* Crear espais i assignar-los gateways
* Configurar certificats TLS
* Configurar proveïdors OAuth
* Coordinar la pujada de fitxers necessaris per a una API als Gateways
* Validació de la seguretat de les APIs i dels plans de consum del producte
* Ajuda amb dubtes i problemes a les definicions YAML de les APIs i productes o amb qualsevol altre problema relacionat amb l'API Manager sorgit durant l'acompanyament
* Gestionar subscripcions
* Bloquejar/desbloquejar una aplicació
* Consultar analítiques
* Consulteu IBM per problemes sorgits als quals no es trobe la solució
* Coordinar la resolució de les incidències del servei APIM, redirigint l' equip responsable en cada cas.

Per a més informació sobre operatives i configuracions que pot fer l'oficina a la plataforma, es recomana anar a l'apartat de [**Documentació**](/plataformes/apim/documentacio) i llegir el Manual d'operatives.

Si teniu qualsevol dubte o problema d'API Manager, podeu revisar les [**Preguntes Freqüents**](/plataformes/apim/faq) i utilitzeu els canals de comunicació que s'estableixen:
[**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd-ctti.atlassian.net/) i [**Remedy**](https://pautic.gencat.cat/).
A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells.

## Aplicacions en fase de projecte

Per les aplicacions en fase de projecte que s’integraran amb l'API Manager Corporatiu, la comunicació s'ha de fer via **CSTD** al servei [**Servei Acompanyament APIM**](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOAPIM/issues). El proveïdor d’aplicacions ha de crear una petició en aquest servei. Mentre l’aplicació estigui en fase de projecte tot el suport (Ex. configuració dels espais, publicació de l'API, consum API, …) es canalitzarà en aquesta petició.

Si no disposeu d’accés al JIRA, l'alta a JIRA es demana manant el **portal PAUTIC de Remedy** a la secció de **Gestió accés d’usuaris**, sol·licitant accés a peticionar a **ACOAPIM** per poder obrir tiquets d'acompanyament de tot allò relacionat amb API Manager. També caldrà demanar accés per al projecte **ACOCLDSIC** per poder sol·licitar al SIC la configuració de les pipelins: 
El **GDI** podrà sol·licitar l'alta, la baixa i la modificació d'usuaris en l'aplicació. En el cas que se sol·liciti una petició relacionada amb un projecte JIRA serà necessari adjuntar un correu o document amb la validació del responsable del projecte. Qualsevol dubte que es tingui, es recomana contactar amb l'equip responsable via portal PAUTIC o via correu cstd.ctti@gencat.cat.

Un cop es té accés, caldrà fer el següent per sol·licitar un tiquet JIRA ACOAPIM:

* Accedir a la següent url: https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOAPIM/issues 
* Demanarà logejar-se primer, de manera que has d'introduir les credencials del teu usuari **GICAR**
* Es crea una petició nova sol·licitant l'acompanyament corresponent. S'haurien d'emplenar com a mínim els següents camps recomanats:
    * **Organisme/Projecte Afectat:** Indicar el nom del projecte/organisme.
    * **Si no localitzes el projecte en el desplegable, introdueix-lo aquí:** Indicar el nom del projecte a desplegar, si no es troba en el desplegable.
    * **Resum:** Concepte de la petició, per exemple: "Sol·licitud d'accés a IBM API Connect".
    * **Descripció:** Descripció detallada de la sol·licitud.
    * **Codi de servei:** codi del servei per al qual es demana l' acompanyament.
<p align="center">
  <img src="/related/apim/ACOAPIM.png" width="500" height="400"/>
</p>


## Aplicacions en servei

Per les aplicacions que estiguin en servei:

### Obrir nova petició a SAU-Remedy

Aquesta guia s’ha elaborat a partir de la "Guia d’usuari del Portal d’Autoservei" oficial de Remedy per a que serveixi de guia per a aquells usuaris que no estiguin
massa familiaritzat amb els procediments de Remedy a l’hora d’obrir peticions o que pateixin dificultats a l’hora d’identificar el tipus
de petició a obrir al servei de SIC a Remedy segons la seva necessitat. <br/>

Cal tenir pressent:

* Respectar una determinada sintaxi a l’hora d’informar el camp "**descripció breu de la petició**" per tal de facilitar la identificació de tasques per part dels tècnics de SAU-Remedy.
* **Adjuntar qualsevol document que pugui ser útil** per a la resolució de la petició (formularis, captures de pantalla, exemples... etcètera).

#### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://pautic.gencat.cat. <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR** i dirigir-se al portal d'autoservei. <br/>
**OBSERVACIÓ**: El perfil de l'usuari pot condicionar les opcions habilitades en cada cas.
<p align="center">
  <img src="/related/apim/Remedy1.png" width="500" height="400"/>
</p>

### Procediment

A Remedy no hi ha tipus de peticions específiques per als serveis SIC, totes les peticions s’han de demanar a partir de la categoria d'Aplicacions:

* **Incidència en aplicació**: per a reportar incidències.
* **Consulta sobre aplicacions**: per a realitzar consultes.
* **Necessito demanar**: per a realitzar sol·licituds.


#### Incidència en aplicació (incidències)

Tipus de petició per reportar qualsevol tipus d'incidència relacionada amb els serveis del SIC: problemes d'accés als serveis, errors d'execució de jobs... etcètera.

Caldrà seleccionar la categoria: `Aplicacions → Incidència en aplicació` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:
<p align="center">
  <img src="/related/apim/Remedy2.png" width="500" height="400"/>
</p>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Tipus problema** : tipologia de la problemàtica (no puc accedir, va massa lent, funcionament incorrecte o altres)
   - **Nom de l'aplicació**: "API MANAGER TRANSVERSAL"
   - **Resum de la incidència o de l'error que es mostra a la pantalla**: <br/>
     Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat: <br/>
     "APIM - Incidència publicació API [_codi diàleg_]" + breu descripció de la incidència <br/>
     "APIM - Incidència consum API [_codi diàleg_, _projecte_]" + breu descripció de la incidència <br/>
     "APIM - Incidència accés API Connect [_codi diàleg_, _projecte_]" + breu descripció de la incidència <br/>
     ...
   - **Descripció dels passos que ha seguit per reproduir la incidència**: informació de la incidència al màxim nivell de detall possible i cas de reproducció.
   - **La incidència afecta a un usuari, un grup d'usuaris o tota la seu?**: tipus d'afectació d'usuaris (només a mi, un grup d'usuaris, tota la seu o no ho se).
   - **Des de quan té la incidència?**: moment a partir del qual ha començat a produir-se l'incidència.
   - **És un error recurrent o puntual?**: tipus de recurrència (recurrent o puntual).
   - **Observacions**: comentaris addicionals.
   - **LOPD**: indicar si la incidència pot afectar o manté relació amb dades personals.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la incidència.


#### Consulta sobre aplicacions (consultes)

Tipus de petició per a demanar qualsevol tipus d'informació relacionada amb els serveis del SIC.

Caldrà seleccionar la categoria: `Aplicacions → Consulta sobre aplicacions` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:
<p align="center">
  <img src="/related/apim/Remedy3.png" width="500" height="400"/>
</p>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Tipus de consulta** : tipologia de la consulta (dubtes d'ús, consulta tècnica o altres).
   - **Nom de l'aplicació**: "API Manager Transversal"
   - **Descripció de la consulta**: informació de la consulta al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la consulta.


#### Aplicacions (sol·licituds)

Caldrà seleccionar la categoria: `Aplicacions → Suport funcional` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:
<p align="center">
  <img src="/related/apim/Remedy4.png" width="500" height="400"/>
</p>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Urgència**: tipus d'urgència.
   - **Nom de l'aplicació**: "API Manager Transversal"
   - **Descripció breu del suport**:
     Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat: <br/>
     "APIM - Petició [_codi diàleg_, _projecte_]" + breu descripció de la sol·licitud <br/>
     ...
   - **Descripció detallada del suport**: informació de la sol·licitud al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil com, per exemple, el document de Disseny d'Arquitectura de l'aplicació per tal de disposar d'una primera
aproximació sobre la tasca, la llibreria a publicar... etcètera.

### Contactar amb bústia SAU

En cas que el **servei Remedy no es trobi disponible**, podrà optar per obrir una petició via bústia SAU: [sau.tic@gencat.cat](mailto:sau.tic@gencat.cat). <br/>
Per tal que aquesta petició pugui ser atesa pel personal de SAU-Remedy, cal indicar la mateixa informació que s'indicaria a la petició Remedy. El redactat ha de
ser en text pla, sense incloure sintaxi HTML. <br/>
Es proposa seguir les següents plantilles a l'hora del redactat del correu de petició:

[**Per a consultes:**](mailto:sau.tic@gencat.cat?subject=Consulta%20sobre%20aplicaci%C3%B3%20API%20MANAGER%20TRANSVERSAL&body=-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20API%20MANAGER%20TRANSVERSAL%0A-%20Codi%20de%20la%20etiqueta%20o%20el%20nom%20del%20seu%20ordinador%3A%20APIM-Consulta%0A-%20Tel%C3%A8fon%20de%20contacte%3A%0A%0A-%20Descripci%C3%B3%20de%20la%20consulta%3A)

Assumpte: "Consulta sobre aplicació API MANAGER TRANSVERSAL"  <br/>
Contingut:

   - Nom de l'aplicació: API MANAGER TRANSVERSAL
   - Codi de la etiqueta o el nom del seu ordinador: APIM-Consulta
   - Telèfon de contacte
   - Descripció de la consulta

[**Per a reportar una incidència:**](mailto:sau.tic@gencat.cat?subject=Incid%C3%A8ncia%20sobre%20aplicaci%C3%B3%20API%20MANAGER%20TRANSVERSAL&body=-%20Codi%20de%20la%20etiqueta%20o%20el%20nom%20del%20seu%20ordinador%3A%20APIM-Incid%C3%A8ncia%0A-%20Tel%C3%A8fon%20de%20contacte%3A%0A-%20Problema%3A%0A-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20API%20MANAGER%20TRANSVERSAL%0A%0A-%20Descripci%C3%B3%20de%20l%27error%20o%20problema%20que%20es%20mostra%20a%20la%20pantalla%3A)

Assumpte: "Incidència sobre aplicació API MANAGER TRANSVERSAL"  <br/>
Contingut:

   - Codi de la etiqueta o el nom del seu ordinador: APIM-Incidència
   - Telèfon de contacte
   - Problema
   - Nom de l'aplicació: API MANAGER TRANSVERSAL
   - Descripció de l'error o problema que es mostra a la pantalla


[**Petició de suport:**](mailto:sau.tic@gencat.cat?subject=Petici%C3%B3%20de%20suport%20funcional%20per%20a%20l%27aplicaci%C3%B3%20API%20MANAGER%20TRANSVERSAL&body=-%20Urg%C3%A8ncia%3A%20Alta%2C%20Mitjana%20o%20Baixa%0A-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20API%20MANAGER%20TRANSVERSAL%0A-%20Descripci%C3%B3%20breu%20del%20suport%3A%0A%0A-%20Descripci%C3%B3%20detallada%20del%20suport%3A%0A)

Assumpte: "Petició de suport funcional per a l'aplicació API MANAGER TRANSVERSAL" <br/>
Contingut:

   - Urgència: (Alta, Mitjana o Baixa)
   - Nom de l'aplicació: API MANAGER TRANSVERSAL
   - Descripció breu del suport
   - Descripció detallada del suport


<br/><br/><br/>
