+++
date = "2020-02-28"
title = "Canals de suport"
description = "Com obtenir suport per part de l'equip del SIC"
sections = "SIC"
aliases = [
   "/sic/suport/",
   "/sic/peticions/",
   "/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/"
]
toc = true
taxonomies = []
weight = 4
+++

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) i utilitzeu els canals de comunicació que s'estableixen:
[**CSTD (Centre de Suport Tecnològic al Desenvolupament)**](https://cstd-ctti.atlassian.net/) i [**Remedy**](https://pautic.gencat.cat/).
A continuació es descriu quin és l'ús que s'ha de fer de cadascun d'ells.

## Integració al SIC del desplegament d’aplicacions en fase de projecte

Per les aplicacions en fase de projecte que s’integraran amb SIC, la comunicació s'ha de fer via **CSTD** al servei [**Servei Acompanyament SIC**](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOSIC/boards/167).
Si no disposeu d’accés ho podeu demanar mitjançant una petició [**REMEDY**](https://pautic.gencat.cat/) de tipus “Gestió accés d'usuaris”, seleccionant “Alta” i l’aplicació “JIRA CSTD”, indicant DNI i el servei d’acompanyament que es vol sol·licitar l’accés.

**Un cop finalitzada la reunió de Fase 0, l’equip de SIC prepararà les peticions, adjuntarà les plantilles a emplenar i assignarà els tiquets** de lot d’aplicacions i CPD a l’integrador de solucions per a que
aquest coordini l’acompliment de requisits per a poder iniciar el projecte d’integració al SIC. En endavant, tota la comunicació es farà per aquest canal recordant
assignar el tiquet a la persona que ha de donar resposta en cada cas.

<br/>

S’ha creat un nou projecte per l’acompanyament Cloud i SIC que pròximament es posarà en servei.

Per a les aplicacions en fase de projecte la comunicació s’ha de fer via CSTD al servei [**Servei Acompanyament Suport Cloud i SIC**](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOCLDSIC/boards/43). El procediment que ha de seguir el lot d'aplicació per a sol·licitar un acompanyament per part de SIC en fase de projecte mitjançant el projecte de Jira ACOCLDSIC és el següent:

* El lot d' aplicació obrirà un nou tiquet ACOCLDSIC a l' inici de la fase d' acompanyament de SIC. En la creació del tiquet s' hauran d' informar com a servei SIC, així com altres camps obligatoris. El tiquet ACOCLDSIC s' assignarà automàticament al responsable del servei d' acompanyament de SIC. En el tiquet ha d' informar els camps següents:
   - Tipus d' Incidència: Acompanyament SIC
   - Organisme
   - Projecte
   - Resum
   - Codi ISOL
   - Descripció
   - CPD
   - Plataforma
   - Codi Servei
   - Codi Aplicació

* En els tiquets d' acompanyament SIC, el tècnic de SIC crearà una o diverses subtasques per als treballs requerits.

* El lot d' aplicació podrà crear noves subtasques de suport que seran assignades al responsable del servei d' acompanyament de SIC i executades per SIC. A la subtasca ha d' informar els camps següents:
   - Tasca: tipus de tasca demanada a SIC
   - Entorn
   - Resum
   - Descripció

  En cas que les subtasques creades pel lot no entrin en l' abast del servei, SIC les tancarà informant del motiu No Aplica.

* Quan els tècnics de SIC comencin a treballar amb una de les subtasques, passaran la mateixa a l'estat In Progress.

* Si l' equip de SIC requereix informació addicional del lot d' aplicació posarà la subtasca en estat Pendent i l' assignarà a l' informador del tiquet ACOCLDSIC.

* Quan l' informador proporcioni la informació requerida pel tècnic de SIC assassinarà de nou la subtasca al tècnic i aquest la passarà a l' estat In Progress. L'informador assignarà la subtasca de nou al tècnic i detallarà en el camp Comentari la informació requerida o acció realitzada mitjançant l'opció Assignar, i la posarà en estat En Progrés mitjançant l'opció Usuari Afegeix.
  
* Un cop finalitzats els treballs requerits a la subtasca, el tècnic de SIC la passarà a l' estat Tancada pel motiu Finalitzada.

* Un cop es finalitzin la fase d' acompanyament i entri en servei el projecte, no es podran crear subtasques addicionals i es tancarà el tiquet ACOCLDSIC amb el motiu Finalitzada.

## Comunicació CPDs amb Suport SIC

El procediment que ha de seguir el CPD en els acompanyaments per part de SIC en fase de projecte mitjançant el projecte de Jira ACOCLDSIC és el següent:

* Si l' equip de SIC requereix informació addicional o treballs per part de CPD posarà la subtasca en estat Pendent i l' assignarà al tècnic de CPD.
  
* Quan el tècnic de CPD proporcioni la informació o realitzi les tasques requerides pel tècnic de SIC assignarà de nou la subtasca al tècnic i aquest la passarà a l' estat In Progress. Una vegada completat el treball, el tècnic de CPD l'assignarà de nou al tècnic de Suport Cloud i detallarà en el camp Comentari la informació requerida o el treball realitzat mitjançant l'opció Assignar, i la posarà en estat En Progrés mitjançant l'opció Usuari Afegeix.



## Integració al SIC del desplegament d’aplicacions en servei

Per les aplicacions en servei que s’integraran amb SIC, la comunicació també s'ha de fer via **CSTD** al servei [**Servei Acompanyament SIC**](https://cstd-ctti.atlassian.net/jira/software/c/projects/ACOSIC/boards/167).
Si no disposeu d’accés ho podeu demanar mitjançant una petició [**REMEDY**](https://pautic.gencat.cat/) de tipus “Gestió accés d'usuaris”, seleccionant “Alta” i l’aplicació “JIRA CSTD”, indicant DNI i el servei d’acompanyament que es vol sol·licitar l’accés.

En aquest cas **serà el proveïdor d’aplicacions qui farà ús de l'[Autoservei de pipelines](/sic-serveis/autoservei-pipelines/) i, només si requereix suport per part de l'equip de SIC, serà
qui crearà la petició en aquest servei** indicant el motiu. Caldrà indicar com a mínim el **codi de diàleg** i la
descripció el més detallada possible del **motiu de la petició**. L’equip de SIC donarà resposta tant aviat com sigui possible i, en endavant, tota la comunicació
es farà per aquest canal recordant assignar el tiquet a la persona que ha de donar resposta en cada cas.


## Altres dubtes o problemàtiques

Per dubtes o incidències en l’ús dels serveis del SIC, incloent aspectes relacionats amb les tasques d’automatització del desplegament de les aplicacions,
caldrà comunicar-ho via [**Remedy**](https://pautic.gencat.cat/).
A continuació, descriurem el procediment a seguir per a **obrir noves peticions dirigides al servei de FRAMEWORK SIC a Remedy**. <br/>

<br/>

#### Obrir nova petició a SAU-Remedy

Aquesta guia s’ha elaborat a partir de la "Guia d’usuari del Portal d’Autoservei" oficial de Remedy per a que serveixi de guia per a aquells usuaris que no estiguin
massa familiaritzat amb els procediments de Remedy a l’hora d’obrir peticions o que pateixin dificultats a l’hora d’identificar el tipus
de petició a obrir al servei de SIC a Remedy segons la seva necessitat. <br/>

Cal tenir pressent:

* Respectar una determinada sintaxi a l’hora d’informar el camp "**descripció breu de la petició**" per tal de facilitar la identificació de tasques per part dels tècnics de SAU-Remedy.
* **Adjuntar qualsevol document que pugui ser útil** per a la resolució de la petició (formularis, captures de pantalla, exemples... etcètera).

<br/>

##### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://pautic.gencat.cat. <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR** i dirigir-se al portal d'autoservei. <br/>
**OBSERVACIÓ**: El perfil de l'usuari pot condicionar les opcions habilitades en cada cas.

<CENTER>

![Pàgina principal](/related/sic/Remedy1.png)

</center>

<br/>

<br/>

##### Procediment

A Remedy no hi ha tipus de peticions específiques per als serveis SIC, totes les peticions s’han de demanar a partir de tres categories generals:

* **Avaria o mal funcionament**: per a reportar incidències.
* **Necessito saber**: per a realitzar consultes.
* **Necessito demanar**: per a realitzar sol·licituds.

<br/>

###### Avaria o mal funcionament (incidències)

Tipus de petició per reportar qualsevol tipus d'incidència relacionada amb els serveis del SIC: problemes d'accés als serveis, errors d'execució de jobs... etcètera.

Caldrà seleccionar la categoria: `Avaria o mal funcionament → Incidència en aplicacions` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:

<CENTER>

![Pàgina principal](/related/sic/Remedy2.png)

</center>

<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Tipus de problema** : tipologia de la problemàtica (no puc accedir, va massa lent, funcionament incorrecte o altres)
   - **Nom de l'aplicació**: "FRAMEWORK SIC"
   - **Resum de la incidència o de l'error que es mostra a la pantalla**: <br/>
     Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat: <br/>
     "SIC - Incidència Usuaris [_codi diàleg_]" + breu descripció de la incidència <br/>
     "SIC - Incidència Gitlab [_codi diàleg_, _projecte_]" + breu descripció de la incidència <br/>
     "SIC - Incidència Jenkins [_codi diàleg_, _projecte_]" + breu descripció de la incidència <br/>
     "SIC - Incidència Binaris [_codi diàleg_, _projecte_]" + breu descripció de la incidència <br/>
     ...
   - **Descripció dels passos que ha seguit per reproduir la incidència**: informació de la incidència al màxim nivell de detall possible i cas de reproducció.
   - **La incidència afecta a un usuari, un grup d'usuaris o tota la seu?**: tipus d'afectació d'usuaris (només a mi, un grup d'usuaris, tota la seu o no ho se).
   - **La incidència afecta a una o més aplicacions?**: tipus d'afectació d'aplicacions (una aplicació o més d'una aplicació).
   - **Des de quan té la incidència?**: moment a partir del qual ha començat a produir-se l'incidència.
   - **És un error recurrent o puntual?**: tipus de recurrència (recurrent o puntual).
   - **Observacions**: comentaris addicionals.
   - **LOPD**: indicar si la incidència pot afectar o manté relació amb dades personals.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la incidència.

<br/>

###### Necessito saber (consultes)

Tipus de petició per a demanar qualsevol tipus d'informació relacionada amb els serveis del SIC.

Caldrà seleccionar la categoria: `Necessito saber → Consulta sobre aplicacions` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:

<CENTER>

![Pàgina principal](/related/sic/Remedy3.png)

</center>

<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Tipus de consulta** : tipologia de la consulta (dubtes d'ús, consulta tècnica o altres).
   - **Nom de l'aplicació**: "FRAMEWORK SIC"
   - **Codi de l'etiqueta o el nom el seu ordinador**: aquesta dada no aporta valor a l'hora de resoldre una consulta relacionada amb el SIC, per tant, recomanem
   utilitzar-lo per indicar una descripció breu de la consulta. <br/>
   Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat: <br/>
     "SIC - Consulta Usuaris" + breu descripció de la consulta <br/>
     "SIC - Consulta Gitlab" + breu descripció de la consulta <br/>
     "SIC - Consulta Jenkins" + breu descripció de la consulta <br/>
     "SIC - Consulta Binaris" + breu descripció de la consulta <br/>
     ...
   - **Descripció de la consulta**: informació de la consulta al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la consulta.

<br/>

###### Necessito demanar (sol·licituds)

Tipus de petició per a demanar:

* Construcció o adaptació de jobs de construcció i desplegament a Jenkins.
* Publicació de noves llibreries al Nexus.
* Creació d'usuaris de grups especials (administradors, oficines de qualitat... etcètera).
* Esborrat de binaris i projectes al servei de custòdia de codi.

Caldrà seleccionar la categoria: `Necessito demanar → Suport funcional` i prémer el botó "Sol·licitar ara". <br/>
El formulari d'entrada presenta el següent aspecte:

<CENTER>

![Pàgina principal](/related/sic/Remedy4.png)

</center>

<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
   - **Urgència**: tipus d'urgència.
   - **Nom de l'aplicació**: "FRAMEWORK SIC"
   - **Descripció breu del suport**:
     Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat: <br/>
     "SIC - Adaptació jobs aplicacio [_codi diàleg_, _projecte_]" + breu descripció de la sol·licitud <br/>
     "SIC - Publicació llibreries Nexus [_codi diàleg_]" + breu descripció de la sol·licitud <br/>
     "SIC - Creació d'usuaris" + breu descripció de la sol·licitud <br/>
     "SIC - Esborrat de projecte [_codi diàleg_, _projecte_]" + breu descripció de la sol·licitud <br/>
     ...
   - **Descripció detallada del suport**: informació de la sol·licitud al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil com, per exemple, el document de Disseny d'Arquitectura de l'aplicació per tal de disposar d'una primera
aproximació sobre la tasca, la llibreria a publicar... etcètera.

<br/>

#### Contactar amb bústia SAU

En cas que el **servei Remedy no es trobi disponible**, podrà optar per obrir una petició via bústia SAU: [sau.tic@gencat.cat](mailto:sau.tic@gencat.cat). <br/>
Per tal que aquesta petició pugui ser atesa pel personal de SAU-Remedy, cal indicar la mateixa informació que s'indicaria a la petició Remedy. El redactat ha de
ser en text pla, sense incloure sintaxi HTML. <br/>
Es proposa seguir les següents plantilles a l'hora del redactat del correu de petició:

[**Per a consultes:**](mailto:sau.tic@gencat.cat?subject=Consulta%20sobre%20aplicaci%C3%B3%20FRAMEWORK%20SIC&body=-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20FRAMEWORK%20SIC%0A-%20Codi%20de%20la%20etiqueta%20o%20el%20nom%20del%20seu%20ordinador%3A%20SIC-Consulta%0A-%20Tel%C3%A8fon%20de%20contacte%0A%0A-%20Descripci%C3%B3%20de%20la%20consulta)

Assumpte: "Consulta sobre aplicació FRAMEWORK SIC"  <br/>
Contingut:

   - Nom de l'aplicació: FRAMEWORK SIC
   - Codi de la etiqueta o el nom del seu ordinador: SIC-Consulta
   - Telèfon de contacte
   - Descripció de la consulta

<br/>

[**Per a reportar una incidència:**](mailto:sau.tic@gencat.cat?subject=Incid%C3%A8ncia%20sobre%20aplicaci%C3%B3%20FRAMEWORK%20SIC&body=-%20Codi%20de%20la%20etiqueta%20o%20el%20nom%20del%20seu%20ordinador%3A%20SIC-Incid%C3%A8ncia%0A-%20Tel%C3%A8fon%20de%20contacte%0A-%20Problema%0A-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20FRAMEWORK%20SIC%0A%0A-%20Descripci%C3%B3%20de%20l%27error%20o%20problema%20que%20es%20mostra%20a%20la%20pantalla)

Assumpte: "Incidència sobre aplicació FRAMEWORK SIC"  <br/>
Contingut:

   - Codi de la etiqueta o el nom del seu ordinador: SIC-Incidència
   - Telèfon de contacte
   - Problema
   - Nom de l'aplicació: FRAMEWORK SIC
   - Descripció de l'error o problema que es mostra a la pantalla

<br/>

[**Petició de suport:**](mailto:sau.tic@gencat.cat?subject=Petici%C3%B3%20de%20suport%20funcional%20per%20a%20l%27aplicaci%C3%B3%20FRAMEWORK%20SIC&body=-%20Urg%C3%A8ncia%3A%20Alta%2C%20Mitjana%20o%20Baixa%0A-%20Nom%20de%20l%27aplicaci%C3%B3%3A%20FRAMEWORK%20SIC%0A-%20Descripci%C3%B3%20breu%20del%20suport%0A%0A-%20Descripci%C3%B3%20detallada%20del%20suport%0A)

Assumpte: "Petició de suport funcional per a l'aplicació FRAMEWORK SIC" <br/>
Contingut:

   - Urgència: (Alta, Mitjana o Baixa)
   - Nom de l'aplicació: FRAMEWORK SIC
   - Descripció breu del suport
   - Descripció detallada del suport


<br/><br/><br/>
Si teniu qualsevol dubte o problema i no podeu utilitzar els canals de suport establerts, podeu contactar amb l'Oficina Tècnica Canigó CTTI a través
del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
