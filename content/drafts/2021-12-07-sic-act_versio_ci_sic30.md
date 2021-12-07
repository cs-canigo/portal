+++
date        = "2021-12-07"
title       = "SIC. Actualització de versió Jenkins del SIC 3.0"
description = "El dia 14/12/2021 s'ha dut a terme l'actualització del Servei d'Integració Contínua (Jenkins) del SIC 3.0"
#categories  = ["SIC"]
#sections    = ["Notícies", "home"]
#key         = "GENER2021"
+++

**El dia 14/12/2021 s'ha dut a terme l’actualització del Servei d’Integració Continua SIC 3.0 a la versió 2.303.3 de Jenkins**.
<br>
<br>
<br>
Les principals novetats d'aquesta actualització són les següents:

* Millores en les eines d'**administració i configuració del sistema**.
* Millores de **funcionalitats i disseny**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[pull-5065](https://github.com/jenkinsci/jenkins/pull/5065),[pull-5392](https://github.com/jenkinsci/jenkins/pull/5392)|Modernització de les icones d'estat d'execucions, salut i logs.|
|[JENKINS-65577](https://issues.jenkins.io/browse/JENKINS-65577)|Execució del controlador sobre Java 11.|

* Millores de **rendiment i control d’errors**.
* Correccions de **seguretat** importants, entre d’altres:

|Issue|Descripció|
|-----------|----------|
|[SECURITY-2278](https://www.jenkins.io/security/advisory/2021-06-30/)|S'invalida la sessió existent en iniciar una nova sessió d'usuari.|
|[SECURITY-2475](https://www.jenkins.io/security/advisory/2021-10-06/)|Correcció de la verificació de certificats SSL/TLS a la llibreria "commons-httpclient" utilitzada àmpliament pels connectors de Jenkins.|
|[SECURITY-2455](https://www.jenkins.io/security/advisory/2021-11-04/)|Resolució de vulnerabilitats en el control d'accés d'agent a controlador.|


<br>
<br>
Per a més informació de les novetats de la versió podeu consultar [Jenkins LTS Changelog](https://www.jenkins.io/changelog-stable/).
<br>
<br>
Amb aquesta actualització, s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als
proveïdors d’aplicacions un sistema de integració continua actualitzat i estable amb la finalitat d’estalviar temps de desplegament.
Es preveu seguir duent a terme una actualització tecnològica programada de forma trimestral per a anar incorporant
millores i nova funcionalitat.
<br>
<br>

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).