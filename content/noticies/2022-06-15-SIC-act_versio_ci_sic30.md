+++
date        = "2022-06-07"
title       = "SIC. Actualització de versió Jenkins del SIC 3.0"
description = "El dia 15/06/2022 s'ha dut a terme l'actualització del Servei d'Integració Contínua (Jenkins) del SIC 3.0"
categories  = ["SIC"]
sections    = ["Notícies", "home"]
key         = "JULIOL2022"
+++

**El dia 15/06/2022 s'ha dut a terme l’actualització del Servei d’Integració Continua SIC 3.0 a la versió 2.319.3 de Jenkins**.
<br>
<br>
<br>
Les principals novetats d'aquesta actualització són les següents:

* Millores en les eines d'**administració i configuració del sistema**.
* Millores de **funcionalitats i disseny**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[pull-5692](https://github.com/jenkinsci/jenkins/pull/5692), [JENKINS-66659](https://issues.jenkins.io/browse/JENKINS-66659)|Modernització d'icones i millores cerques historials d'execucions.|
|[pull-5664](https://github.com/jenkinsci/jenkins/pull/5664)|Modernització del botó per a editar/afegir una descripció.|
|[pull-5507](https://github.com/jenkinsci/jenkins/pull/5507), [pull-5871](https://github.com/jenkinsci/jenkins/pull/5871)|Millora en el disseny de logs i progrés consola.|
|[pull-5763](https://github.com/jenkinsci/jenkins/pull/5763)|Actualització d'ajudes en línia.|
|[JENKINS-65928](https://issues.jenkins.io/browse/JENKINS-65928), [JENKINS-65928](https://issues.jenkins.io/browse/JENKINS-65928)|Modernització d'icones i escalat de gràfics de tendències de jobs.|

* Millores de **rendiment i control d’errors**.
* Correccions de **seguretat** importants, entre d’altres:

|Issue|Descripció|
|-----------|----------|
|[SECURITY-2602](https://www.jenkins.io/security/advisory/2022-02-09/)|Vulnerabilitat DoS a la llibreria XStream (CVE-2021-43859).|
|[SECURITY-2455](https://www.jenkins.io/security/advisory/2021-11-04/)|Múltiples vulnerabilitats al control d'accès d'agent a controlador.|

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

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**](/sic/faq) o utilitzar els canals de [**Suport**](/sic/suport).