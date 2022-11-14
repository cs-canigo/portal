+++
date        = "2022-11-09"
title       = "SIC. Actualització de versió Nexus"
description = "El dia 19/11/2022 es durà a terme l'actualització del Servei de Repositori d'Artefactes (Nexus)"
#categories  = ["SIC"]
#sections    = ["Notícies", "home"]
#key         = "DESEMBRE2022"
+++

**El dia 19/11/2022 es durà a terme l’actualització del Servei de Repositori d’Artefactes a la versió 3.41.1 de Nexus**.
<br/><br/>

Les principals novetats d'aquesta actualització són les següents:
<br/>

* Millores **generals**, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[Audit and Task Logs](https://help.sonatype.com/repomanager3/product-information/release-notes/2022-release-notes/nexus-repository-3.39.0-release-notes#NexusRepository3.39.0ReleaseNotes-ViewAudit,Cluster,andTaskLogsinUserInterfacelogs)|Posibilitat de veure els logs de les tasques a la UI|
|[NEXUS-29558](https://issues.sonatype.org/browse/NEXUS-29558)|Resolució error que permetia seleccionar una versió RELEASE a la tasca d'eliminació de versions SNAPSHOT no utilitzades|
|[NEXUS-30694](https://issues.sonatype.org/browse/NEXUS-30694)|Ordenació de components de Maven per versió en ordre alfanumèric|
|[NEXUS-31305](https://issues.sonatype.org/browse/NEXUS-31305)|Incorporació de l'atribut *lastDownloaded* a l'API REST|
|[NEXUS-31410](https://issues.sonatype.org/browse/NEXUS-31410)|L'API REST de cerca ja no retorna un valor nul per a l'atribut *lastModified*||

* Millores de **rendiment i control d’errors**.
<br/>

* Correccions de **seguretat** importants, entre d'altres:

|Issue|Descripció|
|-----------|----------|
|[Spring 5.3.18](https://tanzu.vmware.com/security/cve-2022-22965)|Actualització Database Migrator a Spring 5.3.18|
|[NEXUS-30443](https://issues.sonatype.org/browse/NEXUS-30443)|Resolució vulnerabilitat d'injecció HTML: CVE-2021-43961|
|[NEXUS-31630](https://issues.sonatype.org/browse/NEXUS-31630)|Resolució falsificació de sol·licituds del costat del servidor (SSRF): CVE-2022-27907|

<br/>
Per a més informació de les novetats de la versió podeu consultar:

- [Release notes 2022] (https://help.sonatype.com/repomanager3/product-information/release-notes/2022-release-notes)
- [136 issues tancades des de la versió 3.37.3 fins la versió 3.41.1] (https://issues.sonatype.org/browse/NEXUS-34642?jql=project%20%3D%20NEXUS%20AND%20fixVersion%20in%20(3.38.0%2C%203.38.1%2C%203.39.0%2C%203.40.0%2C%203.40.1%2C%203.41.0%2C%203.41.1))

<br/>
<br/>
Amb aquesta actualització, s’assoleix un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als
proveïdors d’aplicacions un sistema d'integració continua actualitzats i estables amb la finalitat d’estalviar temps de desplegament.
Es preveu seguir duent a terme una actualització tecnològica programada de forma bianual per a anar incorporant
millores i nova funcionalitat.
<br/>
<br/>

Si teniu qualsevol dubte o problema podeu revisar les [**Preguntes Freqüents**] (/sic/faq) o utilitzar els canals de [**Suport**] (/sic/suport).