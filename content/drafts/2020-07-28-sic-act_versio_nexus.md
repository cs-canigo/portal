+++
date        = "2020-07-28"
title       = "SIC. Actualització de versió Nexus"
description = "Durant el mes de Juliol s'ha dut a terme l'actualització del Servei de Repositori d'Artefactes (Nexus)"
categories  = ["SIC"]
sections    = ["Notícies", "home"]
+++

## Servei de Repositori d'Artefactes

**Durant el mes de Juliol s’ha dut a terme l’actualització del Servei de Repositori d’Artefactes a la versió 3.22.1 de Nexus.**.
<br>
<br>
Les principals novetats d'aquesta actualització són les següents:

* Millores **generals**:

|Issue|Descripció|
|[NEXUS-16009](https://issues.sonatype.org/browse/NEXUS-16009)|Evitar que al navegar per l'arbre d'un repositori Nuget Proxy es mostrin paquets que no estan a la caché local pel fet de disposar de metadades.|
|[NEXUS-18546](https://issues.sonatype.org/browse/NEXUS-18546)|Afegir suport per imatges Docker de multi-arquitectura.|
|[NEXUS-18905](https://issues.sonatype.org/browse/NEXUS-18905)|Error a la tasca Cleanup amb el missatge "No search context found for id".|
|[NEXUS-22896](https://issues.sonatype.org/browse/NEXUS-22896)|Regressió al temps de resposta a les cerques amb la REST API.|
|[NEXUS-23399](https://issues.sonatype.org/browse/NEXUS-23399)|NuGet v3 proxy repository no serveix contingut a la caché si el remot està bloquejat.|

* **Novetats**:

|Issue|Descripció|
|[NEXUS-20939](https://issues.sonatype.org/browse/NEXUS-20939)|Integració amb SAML --Nexus Repository Manager allows users to authenticate with SAML identity providers.|

* Millores de **rendiment i control d’errors**.
* Correccions de **seguretat** importants.

Per a més informació de les novetats de la versió podeu consultar:

- [Release notes 2020] (https://help.sonatype.com/repomanager3/release-notes)
- [Release notes 2019] (https://help.sonatype.com/repomanager3/release-notes/2019-release-notes)
- [104 issues tancades des de la versió 3.19.1] (https://issues.sonatype.org/browse/NEXUS-23556?jql=project%20%3D%20NEXUS%20AND%20fixVersion%20in%20(3.20.0%2C%203.20.1%2C%203.21.0%2C%203.21.1%2C%203.21.2%2C%203.22.0%2C%203.22.1)

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