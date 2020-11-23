+++
date        = "2020-11-23"
title       = "SIC. Actualització de versió Jenkins"
description = "El dia 09/12/2020 està previst dur a terme l'actualització del Servei d'Integració Continua (Jenkins)"
categories  = ["SIC"]
#sections    = ["Notícies", "home"]
key         = "DESEMBRE2020"
+++

**El proper dia 09/12/2020 està previst dur a terme l’actualització del Servei d’Integració Continua a la versió 2.235.5 de Jenkins.**.
<br>
<br>
Les principals novetats d'aquesta actualització són les següents:

* Millores en les eines d'**administració i configuració del sistema**.
* Millores de **funcionalitats i disseny**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[JENKINS-59107](https://issues.jenkins.io/browse/JENKINS-59107)|L'usuari roman registrat en cas d'autenticar-se amb un altre usuari.|
|[JENKINS-60920](https://issues.jenkins.io/browse/JENKINS-60920)|Es renova el disseny i les icones de la barra d'encapçalat i les rutes de navegació.|
|[JENKINS-61284](https://issues.jenkins.io/browse/JENKINS-61284)|S'elimina la barra de color gris sota els elements del formulari de l'àrea de text per a usuaris de lectura.|
|[JENKINS-61840](https://issues.jenkins.io/browse/JENKINS-61840)|Es canvia l'estil dels botons i es dona suport a botons grans, enllaços o només icones.|
|[JENKINS-61478](https://issues.jenkins.io/browse/JENKINS-61478)|Es millora l'estil dels *banners* d'alerta per a que siguin més atractius visualment i l'adaptin millor als components de la UI.|
|[pull-4503](https://github.com/jenkinsci/jenkins/pull/4503)|S'elimina l'opció de refresc automàtic.|
|[pull-4663](https://github.com/jenkinsci/jenkins/pull/4663)|Es redissenya la icona d'ajuda.|

* Millores de **rendiment i control d’errors**.
* Correccions de **seguretat** importants, entre d’altres:

|Issue|Descripció|
|-----------|----------|
|[pull-4509](https://github.com/jenkinsci/jenkins/pull/4509)|Protecció CSRF establerta per defecte sense possibilitat de desactivar: els clients del API han fer servir API Tokens enlloc de paraules de pas.|


<br>
<br>
Per a més informació de les novetats de la versió podeu consultar [Jenkins LTS Changelog](https://jenkins.io/changelog-stable/).
<br>
<br>
Amb aquesta actualització, s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als
proveïdors d’aplicacions un sistema de integració continua actualitzats i estables amb la finalitat d’estalviar temps i diners.
Es preveu seguir duent a terme una actualització tecnològica programada de forma trimestral i anual per a anar incorporant
millores i nova funcionalitat.
<br>
<br>

Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [**FAQ**] (/sic/faq) i utilitzeu el canal
de [**Suport**] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.