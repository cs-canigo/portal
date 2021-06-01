+++
date        = "2021-04-07"
title       = "SIC. Actualització de versió Nexus"
description = "El dia 07/04/2021 s'ha dut a terme l'actualització del Servei de Repositori d'Artefactes (Nexus)"
categories  = ["SIC"]
#sections    = ["Notícies", "home"]
key         = "ABRIL2021"
+++

**El dia 07/04/2021 s'ha dut a terme l’actualització del Servei de Repositori d’Artefactes a la versió 3.29.2 de Nexus**.
<br/><br/>

Les principals novetats d'aquesta actualització són les següents:
<br/>

* Novetats **generals**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|-|Suport per Maven i Gradle SHA256/SHA512 Hashing.|
|-|Filtratge per Root Metadata dels npm Package.|
|[NEXUS-25506](https://issues.sonatype.org/browse/NEXUS-25506)|Ús de la V3 per defecte als nous repositoris nuget.org-proxy.|

* Millores **generals**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[NEXUS-14631](https://issues.sonatype.org/browse/NEXUS-14631)|Increment dels atributs dels assets retornats via REST.|
|[NEXUS-18283](https://issues.sonatype.org/browse/NEXUS-18283)|Afegida la capacitat de configurar AWS S3 Regions als Blobstore.|
|[NEXUS-19572](https://issues.sonatype.org/browse/NEXUS-19572)|Cerca formatada d'aplicacions Go.|
|[NEXUS-20267](https://issues.sonatype.org/browse/NEXUS-20267),[NEXUS-25786](https://issues.sonatype.org/browse/NEXUS-25786)|Millores de xifrat i del protocl TLS a les peticions via HTTPS.|
|[NEXUS-25307](https://issues.sonatype.org/browse/NEXUS-25307)|Protegir l'eliminació de Blob Stores mentre s'estan fent canvis al blob store.|
|[NEXUS-25774](https://issues.sonatype.org/browse/NEXUS-25774)|Upgrade de l'Eclipse Jetty a la versió 9.4.33.v20201020.|

* Millores de **rendiment i control d’errors**.
<br/>

* Correccions de **seguretat** importants.

<br/>
Per a més informació de les novetats de la versió podeu consultar:

- [Release notes 2020] (https://help.sonatype.com/repomanager3/release-notes/2020-release-notes)
- [87 issues tancades des de la versió 3.27.0] (https://issues.sonatype.org/browse/NEXUS-26251?jql=project%20%3D%20NEXUS%20AND%20fixVersion%20in%20(3.28.0%2C%203.28.1%2C%203.29.0%2C%203.29.1%2C%203.29.2))

<br/>
<br/>
Amb aquesta actualització, s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als
proveïdors d’aplicacions un sistema d'integració continua actualitzats i estables amb la finalitat d’estalviar temps de desplegament.
Es preveu seguir duent a terme una actualització tecnològica programada de forma bianual per a anar incorporant
millores i nova funcionalitat.
<br/>
<br/>

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).