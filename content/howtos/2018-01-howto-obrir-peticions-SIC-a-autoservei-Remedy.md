+++
date = "2018-01-17"
title = "Obrir peticions SIC a autoservei Remedy"
description = "Com obrir peticions a l'autoservei Remedy per a SIC"
section = "howtos"
categories = ["sic"]
+++

### A qui va dirigit

Aquesta guia va dirigida a tots aquells usuaris que hagin d’obrir alguna petició a SAU-Remedy sobre serveis del SIC.

### Context de necessitat

S’ha preparat aquesta guia per a aquells usuaris que no estiguin massa familiaritzats amb els procediments de Remedy a l’hora d’obrir peticions o que pateixin dificultats a l’hora d’identificar el tipus de petició a obrir al servei de SIC a Remedy segons la seva necessitat.

La guia s’ha elaborat a partir de la “Guia d'usuari del Portal d'Autoservei” oficial de Remedy.

### Introducció

A Remedy no hi ha tipus de peticions específiques per als serveis SIC, totes les peticions s’han de demanar a partir de 3 tipus de peticions genèriques.

De cara a facilitar la feina d'identificar la tasca a realitzar als tècnics de SAU-Remedy, es demanarà que es respecti una determinada sintaxi a l'hora d'informar el camp de “descripció breu de la petició”.

A les peticions s’hi poden afegir adjunts. S’agrairà que a l’hora d’obrir les peticions s’adjunti qualsevol document que pugui ser útil per a la resolució de la tasca (formularis, captures de pantalla per a les incidències...).

### Accés a l'autoservei de Remedy

Cal entrar a l’eina Remedy mitjançant el seu portal: https://pautic.gencat.cat.

A l'accedir, demanarà realitzar login a GICAR si no s'ha logat prèviament en aquest sistema. Una vegada dins, apareixerà la consola d'Autoservei. Aquesta presenta el següent aspecte:

![](/related/sic/howto/imatges/Remedy1.png)

**OBSERVACIÓ**: Segons el perfil de l'usuari, es trobaran habilitades més o menys tipus de peticions per obrir.

### Operativa per obrir peticions

A continuació s'expliquen les 3 categories de peticions que contemplem i l'operativa a realitzar amb cadascuna d'elles per obrir les diferents peticions al SIC.

#### Obrir petició de suport funcional

Caldrà obrir aquest tipus de petició a Remedy per demanar:

* Creació de jobs d'aplicació a Jenkins.
* Afegir llibreria al Nexus del SIC (necessàries per a la construcció d'artefactes en jobs del SIC).

Dins de la consola d'Autoservei, aquest tipus de petició es pot trobar sota la categoria: `Necessito demanar → Suport funcional`:

![](/related/sic/howto/imatges/Remedy2.png)
El formulari de petició de Suport funcional presenta el següent aspecte:

![](/related/sic/howto/imatges/Remedy3.png)
Es detalla la informació a omplir en cada camp:

![](/related/sic/howto/imatges/Remedy4.png)
Les peticions de suport funcional poden tenir adjunts. Es recomana adjuntar qualsevol arxiu que sigui útil per completar el suport.

![](/related/sic/howto/imatges/Remedy5.png)
En aquesta petició Remedy no figura cap camp específic per identificar el tipus de petició a obrir a SIC. Per tal de facilitar la tasca d’identificació es recomana que s’indiqui el tipus de petició al camp `Descripció breu del suport`.

Per a tal efecte, es recomana seguir la següent nomenclatura a l’hora d’obrir peticions:

* **Altes/Modificacions dades Jobs d’aplicacions a Jenkins**: Per a peticions de creació de jobs d’aplicació a Jenkins:
	* Descripció breu del suport: “SIC – Alta Jobs aplicació \[CODI DIÀLEG\] \[NOM PROJECTE\]”
	O bé
	* Descripció breu del suport: “SIC – Modificació dades Job aplicació \[CODI DIÀLEG\] \[NOM PROJECTE\] :”+ breu descripció del canvi

**Cal adjuntar del document del Disseny d’Arquitectura de l’aplicació**, de cara a que l’equip de SIC pugui extreure informació per a la configuració dels jobs.

![](/related/sic/howto/imatges/Remedy6.png)
Al desplegable de d’aplicació cal escollir la opció ‘FRAMEWORK SIC’.

**NOTA IMPORTANT**: Aquest desplegable no s’omplirà d’opcions fins no haver començat a escriure al camp “Descripció breu de suport”.

![](/related/sic/howto/imatges/Remedy7.png)
En aquest camp es pot detallar més informació sobre la petició.

![](/related/sic/howto/imatges/Remedy8.png)
Indicar un o d’altre valor segons la urgència de la petició (seguir les instruccions per informar-ho).

#### Obrir consulta

Caldrà obrir aquest tipus de petició a Remedy per demanar qualsevol tipus d’informació relacionada amb els serveis de SIC.

Dins de la consola d'Autoservei, aquest tipus de petició es pot trobar sota la categoria: `Necessito saber → Consulta sobre aplicacions corporatives`:

![](/related/sic/howto/imatges/Remedy9.png)

El formulari de consulta presenta el següent aspecte:

![](/related/sic/howto/imatges/Remedy10.png)

Es detalla la informació a omplir a cada camp:

![](/related/sic/howto/imatges/Remedy11.png)

Al primer camp de Nom de l’aplicació (desplegable), cal seleccionar `FRAMEWORK SIC`.

![](/related/sic/howto/imatges/Remedy12.png)

El segon camp de Nom de l’aplicació (text), serveix per informar el nom de l’aplicació per als casos d’aplicacions que no figurin al sistema Remedy i no apareguin al desplegable. “FRAMEWORK SIC” ja es troba donada d’alta a Remedy i per tant es podrà escollir al desplegable. **S’ha de deixar en blanc**.

![](/related/sic/howto/imatges/Remedy13.png)

La informació sobre el PC de l’usuari que obre la consulta no aportarà valor a l’hora de resoldre una consulta relacionada amb SIC.
Donat que és un camp obligatori i cal informar-ho, s’aconsella informar-ho com si es tractés del camp de “breu descripció” i seguir la següent nomenclatura en omplir-lo:

Per a consultes generals sobre serveis SIC:
“SIC – Consulta:” + breu descripció de la consulta

Per a consulta específiques sobre repositori Git de SIC:
 “SIC – Consulta Git:” + breu descripció de la consulta

Per a consulta específiques sobre Jobs de Jenkins de SIC:
 “SIC – Consulta Jobs Jenkins:” + breu descripció de la consulta

![](/related/sic/howto/imatges/Remedy14.png)

Informar algun telèfon de contacte per tal que  en cas de necessitat l’equip de SIC pugui contactar amb el peticionari. També es pot afegir informació sobre l’horari de contacte o bústia.

![](/related/sic/howto/imatges/Remedy15.png)

Descripció detallada sobre la consulta a realitzar. Cas que fos necessari complementar la consulta amb algun/s document/s, caldria annexar-ho/los també.

#### Reportar incidències

Caldrà obrir aquest tipus de petició a Remedy per reportar qualsevol tipus d’incidència relacionada amb els serveis de SIC, com ara:

* Problemes d’accés a repositoris Git/Jobs de Jenkins
* Errors d’execució als jobs de Jenkins

Dins la consola d’Autoservei, aquest tipus de petició es pot trobar navegant per: `Avaria o mal funcionament → Incidència en aplicacions corporatives`:

![](/related/sic/howto/imatges/Remedy16.png)

El formulari de reportar incidència presenta el següent aspecte:

![](/related/sic/howto/imatges/Remedy17.png)

Es detalla la informació a omplir a cada camp:

![](/related/sic/howto/imatges/Remedy18.png)

La informació sobre el PC de l’usuari que obre la consulta no aportarà valor a l’hora de resoldre una consulta relacionada amb SIC.
Donat que és un camp obligatori i cal informar-ho, s’aconsella informar-ho com si es tractés del camp de “breu descripció” i seguir la següent nomenclatura en omplir-lo:

Per a incidències relacionades amb el repositori Git de SIC:
Descripció breu del suport: “SIC – Incidència Git:” + breu descripció de la incidència

Per a incidències relacionades amb el  Jobs Jenkins de SIC:
Descripció breu del suport: “SIC – Incidència Job Jenkins :” + breu descripció de la incidència

![](/related/sic/howto/imatges/Remedy19.png)

Informar algun telèfon de contacte per tal que  en cas de necessitat l’equip de SIC pugui contactar amb el peticionari. També es pot afegir informació sobre l’horari de contacte o bústia.

![](/related/sic/howto/imatges/Remedy20.png)


Al desplegable de Problema, cal escollir la tipologia de incidència:

* `No puc accedir`: Per a problemes relacionats amb l’accés a repositoris Git o Jobs a Jenkins.
* `Va massa lent`: Per a problemes relacionats amb temps d’espera a l’hora d’accedir a repositori Git o execució de jobs a Jenkins.
* `Funcionament incorrecte`: Per a qualsevol altre tipus de problema no relacionat amb els anteriors.

![](/related/sic/howto/imatges/Remedy21.png)

Al primer camp de Nom de l’aplicació (desplegable), cal seleccionar `FRAMEWORK SIC`.

![](/related/sic/howto/imatges/Remedy22.png)

El segon camp de Nom de l’aplicació (text), serveix per informar el nom de l’aplicació per als casos d’aplicacions que no figurin al sistema Remedy i no apareguin al desplegable. “FRAMEWORK SIC” ja es troba donada d’alta a Remedy i per tant es podrà escollir al desplegable. S’ha de deixar en blanc.

![](/related/sic/howto/imatges/Remedy23.png)

Amb aquest desplegable es pot indicar si la incidència afecta a un sol repositori Git o job a Jenkins. 
En cas de que l’afectació sigui per més d’un repositori Git o job a Jenkins, caldrà enumerar-los mitjançant el camp `Indiqui el nom de les aplicacions afectades`.

![](/related/sic/howto/imatges/Remedy24.png)

El camp ubicació no aportarà valor a l’hora de tractar la incidència, però donat que és un camp obligatori, caldrà informar-ho.

![](/related/sic/howto/imatges/Remedy25.png)

En aquest camp cal descriure la incidència. Es recomana adjuntar captures de pantalla o qualsevol altre document que pugui servir d’ajut per a entendre el problema.

