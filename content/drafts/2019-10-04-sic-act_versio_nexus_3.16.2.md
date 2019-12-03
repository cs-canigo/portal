+++
date        = "2019-11-29"
title       = "SIC. Actualització de versió Nexus"
description = "Durant el mes d'Octubre s'han dut a terme actualització del repositori d'artefactes (Nexus)"
#categories  = ["SIC"]
#sections    = ["Notícies", "home"]
+++

## Actualització del servei repositori d'artefactes

Durant el mes d'Octubre s'ha dut a terme l'actualització del repositori d'artefactes a la **versió 3.16.2 del Nexus**, en els següents apartats, es detallen les principals novetats i millores que s'incorporen amb aquesta versió.

### Novetats

#### Endpoint de salut per node

Amb la versió 3.16 del Nexus s'ha proporcionat un EndPoint per a consultar la salut d'un node del Nexus, d'aquesta manera es permet consultar quan un node està disponible.

Per a més informació: [NEXUS-18949](https://issues.sonatype.org/browse/NEXUS-18949)


#### Creació de fitxer temporal a la càrrega d'artefactes per la interfície d'usuari

Si s'utilitza la interfície d'usuari per a pujar un artefacte, aquest es crearà físicament de forma temporal a java.io.tmpdir.

Per a més informació: [NEXUS-18277](https://issues.sonatype.org/browse/NEXUS-18277)


#### Verificat amb OpenJDK 8

S'ha certificat el correcte funcionament si s'inicia el Nexus amb OpenJDK 8.

Per a més informació: [NEXUS-6300](https://issues.sonatype.org/browse/NEXUS-6300)

### Millores en les cerques

Les principals millores en les cerques són:

- [Cerques parcials](https://issues.sonatype.org/browse/NEXUS-8884)

- [Llistats tots els snapshots i no només l'últim](https://issues.sonatype.org/browse/NEXUS-8798)

### Resolució d'incidències en la interfície d'usuari

Els principals aspectes resolts són els següents:

- [Errors no tractats de "Uncaught TypeError"](https://issues.sonatype.org/browse/NEXUS-13057)

- [Errors en Internet explorer](https://issues.sonatype.org/browse/NEXUS-19051)

- [Ordenació incorrecte per versió](https://issues.sonatype.org/browse/NEXUS-12253)

- [Cerques sense resultats erròniament](https://issues.sonatype.org/browse/NEXUS-18909)

- [Error en pujar fitxers si el procés consumia més de 60 segons](https://issues.sonatype.org/browse/NEXUS-18494)

- [Obtenció de NullPointerException si no s'envia la capçalera user-agent](https://issues.sonatype.org/browse/NEXUS-13136)

- [Error de time out navegant per repositoris grans](https://issues.sonatype.org/browse/NEXUS-13095)

### Resolució d'incidències

#### Correcció de _bug_ amb NPM

Correcció d'un _bug_ registrat en el filtre de sol·licitud anti-csrf per evitar la falsificació de petició en llocs creuats, que bloquejava peticions de NPM correctes.

Per a més informació: [NEXUS-18850](https://issues.sonatype.org/browse/NEXUS-18850)
<br><br>

#### Correcció de bug amb POMs llargs

S'ha resolt un _bug_ que no permetia pujar POMs llargs obtenint l'error "ArrayIndexOutOfBoundsException".

Per a més informació: [NEXUS-18196](https://issues.sonatype.org/browse/NEXUS-18196)

### Correccions de seguretat

S'han corregit principalment els següents forats de seguretat:

- [CVE-2018-16619](https://support.sonatype.com/hc/en-us/articles/360010789893-CVE-2018-16619-Nexus-Repository-Manager-XSS-October-17-2018?_ga=2.101227976.817663482.1570188895-1181263505.1548239726)

- [CVE-2018-16620](https://support.sonatype.com/hc/en-us/articles/360010789453-CVE-2018-16620-Nexus-Repository-Manager-Missing-Access-Controls-October-17-2018?_ga=2.192442851.817663482.1570188895-1181263505.1548239726)

- [CVE-2018-16621](https://support.sonatype.com/hc/en-us/articles/360010789153-CVE-2018-16621-Nexus-Repository-Manager-Java-Injection-October-17-2018?_ga=2.192442851.817663482.1570188895-1181263505.1548239726)

- [CVE-2018-5306](https://support.sonatype.com/hc/en-us/articles/360000134968?_ga=2.126472772.817663482.1570188895-1181263505.1548239726)

<br><br>
Per a més informació de les funcionalitats que es proporcionen des de la versió 3.2.1 a la 3.16.2 podeu consultar:

- [Release notes del 2019](https://help.sonatype.com/repomanager3/release-notes/2019-release-notes)

- [Release notes del 2018](https://help.sonatype.com/repomanager3/release-notes/2018-release-notes)

- [Release notes del 2017](https://help.sonatype.com/repomanager3/release-notes/2017-release-notes)

- [615 issues tancades des de la versió 3.2.1 a la 3.16.1](https://issues.sonatype.org/browse/NEXUS-20170?jql=project%20%3D%20NEXUS%20AND%20fixVersion%20in%20(3.10.0%2C%203.11.0%2C%203.12.0%2C%203.12.1%2C%203.13.0%2C%203.14.0%2C%203.15.0%2C%203.15.1%2C%203.15.2%2C%203.16.0%2C%203.16.1%2C%203.16.2%2C%203.2.0%2C%203.2.1%2C%203.3.0%2C%203.3.1%2C%203.3.2%2C%203.4.0%2C%203.5.0%2C%203.5.1%2C%203.5.2%2C%203.6.0%2C%203.6.1%2C%203.6.2%2C%203.7.0%2C%203.7.1%2C%203.8.0%2C%203.9.0))

<br><br>
Si teniu qualsevol dubte o problema assegureu-vos de no trobar resposta a les [FAQ] (/sic/faq) i utilitzeu el canal de [Suport] (/sic/suport) o contacteu amb l'Oficina Tècnica Canigó CTTI a través del correu electrònic: **oficina-tecnica.canigo.ctti@gencat.cat**.
