+++
date = "2019-01-04"
title = "Canals de suport"
description = "Com obtenir suport per part de l'equip del SIC"
sections = "SIC"
aliases = [
    "/sic/peticions/",
    "/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/"
]
toc = true
taxonomies = []
weight = 5
+++

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de suport o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.

## Obrir nova petició a SAU-Remedy

A continuació, descriurem el procediment a seguir per a **obrir noves peticions dirigides al servei de FRAMEWORK SIC a Remedy**. <br/>
Aquesta guia s’ha elaborat a partir de la "Guia d’usuari del Portal d’Autoservei" oficial de Remedy. <br/>

Cal tenir pressent:

* Respectar una determinada sintaxi a l’hora d’informar el camp "**descripció breu de la petició**" per tal de facilitar la identificació de tasques per part dels tècnics de SAU-Remedy.
* **Adjuntar qualsevol document que pugui ser útil** per a la resolució de la petició (formularis, captures de pantalla, exemples... etcètera).

### Accés al servei

Podrà accedir mitjançant el següent enllaç: https://pautic.gencat.cat. <br/>
Haurà d'autenticar-se amb de les seves credencials d'accés **GICAR** i dirigir-se al portal d'autoservei. <br/>
**OBSERVACIÓ**: El perfil de l'usuari pot condicionar les opcions habilitades en cada cas.
<CENTER>![Pàgina principal](/related/sic/Remedy1.png)</center>
<br/>

### Procediment

A Remedy no hi ha tipus de peticions específiques per als serveis SIC, totes les peticions s’han de demanar a partir de tres categories generals: 

* **Avaria o mal funcionament**: per a reportar incidències.
* **Necessito saber**: per a realitzar consultes.
* **Necessito demanar**: per a realitzar sol·licituds.

A continuació s'especifica l'aplicació de cada una d'elles i el procediment d'entrada aplicable en cada cas.

#### Avaria o mal funcionament (incidències)

Tipus de petició per reportar qualsevol tipus d'incidència relacionada amb els serveis del SIC: problemes d'accés als serveis, errors d'execució de jobs... etcètera.

Caldrà seleccionar la categoria: `Avaria o mal funcionament → Incidència en aplicacions` i prémer el botó "Sol·licitar ara".
El formulari d'entrada presenta el següent aspecte:
<CENTER>![Pàgina principal](/related/sic/Remedy2.png)</center>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
	- **Tipus de problema** : tipologia de la problemàtica (no puc accedir, va massa lent, funcionament incorrecte o altres)
	- **Nom de l'aplicació**: "FRAMEWORK SIC"
	- **Resum de la incidència o de l'error que es mostra a la pantalla**:
	  Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat:
	  "SIC - Incidència Usuaris [_codi diàleg_]" + breu descripció de la incidència
	  "SIC - Incidència Gitlab [_codi diàleg_, _projecte_]" + breu descripció de la incidència
	  "SIC - Incidència Jenkins [_codi diàleg_, _projecte_]" + breu descripció de la incidència
	  "SIC - Incidència Binaris [_codi diàleg_, _projecte_]" + breu descripció de la incidència
	  ...	
	- **Descripció dels passos que ha seguit per reproduir la incidència**: informació de la incidència al màxim nivell de detall possible i cas de reproducció.
	- **La incidència afecta a un usuari, un grup d'usuaris o tota la seu?**: tipus d'afectació d'usuaris (només a mi, un grup d'usuaris, tota la seu o no ho se).
	- **La incidència afecta a una o més aplicacions?**: tipus d'afectació d'aplicacions (una aplicació o més d'una aplicació).
	- **Des de quan té la incidència?**: moment a partir del qual ha començat a produir-se l'incidència.
	- **És un error recurrent o puntual?**: tipus de recurrència (recurrent o puntual).
	- **Observacions**: comentaris addicionals. 
	- **LOPD**: indicar si la incidència pot afectar o manté relació amb dades personals.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la incidència.

#### Necessito saber (consultes)

Tipus de petició per demanar qualsevol tipus d'informació relacionada amb els serveis del SIC.

Caldrà seleccionar la categoria: `Necessito saber → Consulta sobre aplicacions` i prémer el botó "Sol·licitar ara".
El formulari d'entrada presenta el següent aspecte:
<CENTER>![Pàgina principal](/related/sic/Remedy3.png)</center>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
	- **Tipus de consulta** : tipologia de la consulta (dubtes d'ús, consulta tècnica o altres).
	- **Nom de l'aplicació**: "FRAMEWORK SIC"
	- **Codi de l'etiqueta o el nom el seu ordinador**: aquesta dada no aporta valor a l'hora de resoldre una consulta relacionada amb el SIC, per tant, recomanem utilitzar-lo per indicar una descripció breu de la consulta. Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat:
	  "SIC - Consulta Usuaris" + breu descripció de la consulta
	  "SIC - Consulta Gitlab" + breu descripció de la consulta
	  "SIC - Consulta Jenkins" + breu descripció de la consulta
	  "SIC - Consulta Binaris" + breu descripció de la consulta
	  ...	
	- **Descripció de la consulta**: informació de la consulta al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil per a la resolució de la consulta.

#### Necessito demanar (sol·licituds)

Tipus de petició per demanar:

* Construcció o adaptació de jobs de construcció i desplegament a Jenkins.
* Publicació de noves llibreries al Nexus.

Caldrà seleccionar la categoria: `Necessito demanar → Suport funcional` i prémer el botó "Sol·licitar ara".
El formulari d'entrada presenta el següent aspecte:
<CENTER>![Pàgina principal](/related/sic/Remedy4.png)</center>
<br/>

Informació a emplenar:

* **Dades de contacte**: nom, telèfon de contacte i altres dades addicionals (correu electrònic o altres).
* Detall de la petició:
	- **Urgència**: tipus d'urgència.
	- **Nom de l'aplicació**: "FRAMEWORK SIC"
	- **Descripció breu del suport**:
	  Es recomana utilitzar una nomenclatura d'aquest estil en funció de la necessitat:
	  "SIC - Alta jobs aplicació [_codi diàleg_, _projecte_]"
	  "SIC - Adaptació jobs aplicacio [_codi diàleg_, _projecte_]" + breu descripció de la sol·licitud
	  "SIC - Publicació llibreries Nexus [_codi diàleg_]" + breu descripció de la sol·licitud
	  ...	
	- **Descripció detallada del suport**: informació de la sol·licitud al màxim nivell de detall possible.
* **Arxius adjunts**: qualsevol arxiu que pugui ser útil com, per exemple, el document de Disseny d'Arquitectura de l'aplicació per tal de disposar d'una primera aproximació sobre la tasca, la llibreria a publicar... etcètera.



















## Contactar amb bústia SAU

En cas que el **servei Remedy no es trobi disponible**, podrà optar per obrir una petició via bústia SAU: [sau.tic@gencat.cat](mailto:sau.tic@gencat.cat). <br/>
Per tal que aquesta petició pugui ser atesa pel personal de SAU-Remedy, cal indicar la mateixa informació que s'indicaria a la petició Remedy. El redactat ha de ser en text pla, sense incloure sintaxi HTML. <br/>
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
