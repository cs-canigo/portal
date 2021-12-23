+++
date        = "2021-12-22"
title       = "Canigó. Vulnerabilitat CVE-2021-44228 (Log4Shell)"
description = "Com resoldre la vulnerabilitat crítica detectada CVE-2021-44228 (Log4Shell) a les aplicacions"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2022"
+++

**L'Apache Software Foundation ha detectat, des del 10 de desembre de 2021, diverses vulnerabilitats que afecten la
biblioteca de registres basada en Java Log4J**. Les vulnerabilitats detectades són les següents:

- Log4Shell o LogJam [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228), considerada molt crítica permetent l'execució
de codi remot no autenticat de forma senzilla en qualsevol aplicació que utilitzi des de la versió Log4j 2.0-beta9 fins a la versió 2.14.0.

- [CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046), considerada crítica, encara que la seva explotació és més limitada,
permetent, com en la vulnerabilitat anterior, l'execució de codi remot no autenticat de forma senzilla en qualsevol aplicació que faci servir des de la
versió Log4j 2.0-beta9 fins a la versió 2.15.0.

- [CVE-2021-45105](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45105), considerada moderada, permet als atacants obtenir un "StackOverflowError"
per tancar el procés i generar una denegació de servei en qualsevol aplicació que faci servir des de la versió Log4j 2.0-beta9 fins a la versió 2.16.0.

Per més informació podeu consultar [Apache Log4j Security Vulnerabilities](https://logging.apache.org/log4j/2.x/security.html).

<br/>
Altra informació de referència:

* <https://nvd.nist.gov/vuln/detail/CVE-2021-44228/> \
* <https://securelist.com/cve-2021-44228-vulnerability-in-apache-log4j-library/105210/> \
* <https://snyk.io/wp-content/uploads/cheat-sheet-log4shell-remediation-v6.pdf> \
* <https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j/> \

## Com solucionar la vulnerabilitat a les aplicacions

---

**Actualització a 16/12/2021**:

L'Apache Software Foundation ha publicat el 13/12/2021 que les mesures mitigadores han quedat desacreditades donat s'ha descobert
que aquestes només limiten l'exposició mentre deixen oberts alguns vectors d'atac.
La raó per la qual aquestes mesures són insuficients és que, a més del vector d'atac Thread Context, encara hi ha rutes de
codi a Log4j on es poden produir cerques de missatges.
Es conclou, per tant, que la mesura més segura és actualitzar Log4j a una versió segura quedant desacreditades
les següents mesures prèvies comunicades: setting de la propietat log4j2.formatMsgNoLookups o la variable d'entorn
LOG4J_FORMAT_MSG_NO_LOOKUPS a true per a versions >= 2.10, o modificant la configuració de registre per desactivar
les cerques de missatges amb %m{nolookups}, %msg{nolookups} o %message{nolookups per a versions >= 2.7 i <= 2.14.1.

Per a més informació: https://logging.apache.org/log4j/2.x/security.html#CVE-2021-45046

---

Cal substituir la versió de la dependència de la libreria `log4j` en temps de compilació.

### Aplicacions Canigó (Spring Boot)

* Opció 1) Modificar el fitxer `pom.xml` - **opció recomanada** -, compilar i desplegar l'aplicació:

    > * Sí el JDK és igual o superior a `1.8`:
```xml
<properties>
<log4j2.version>2.17.0</log4j2.version>
</properties>
```

    > * Sí el JDK és `1.7`:
```xml
<properties>
<log4j2.version>2.12.3</log4j2.version>
</properties>
```

    > * Sí el JDK és `1.6`:
```xml
<properties>
<log4j2.version>2.3.1</log4j2.version>
</properties>
```

* Opció 2) Injectar la variable durant la construcció de l'aplicació, compilar i desplegar l'aplicació. Per exemple:
```sh
mvn -Dlog4j2.version=2.17.0 clean package && java -jar ./target/CanigoLog4jShellTest.war
```

### Aplicacions que facin ús dels mòduls de Canigó (sense Spring Boot)

Si no és possible actualitzar a l'última versió dels mòduls - **opció recomanada** -, caldrà excloure la dependència de Log4j
dels mòduls de Canigó i afegir la dependència correcta a nivell global; recomanant fer ús de la comanda Maven `mvn dependency:tree | grep log4j`
per a identificar a quin nivell està Log4j associada com a dependència. Un cop revisat, caldrà compilar i desplegar l'aplicació.
Per exemple:

```xml
<dependency>
  <groupId>cat.gencat.ctti</groupId>
  <artifactId>canigo.core</artifactId>
  <version>${canigo.core.version}</version>
  <exclusions>
	<exclusion>
	  <groupId>org.apache.logging.log4j</groupId>
	  <artifactId>log4j-core</artifactId>
	</exclusion>
	...
  </exclusions>
</dependency>
<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-core</artifactId>
  <version>2.17.0</version>
</dependency>
...
```

## Noves versions de Canigó 3.4 i 3.6

S'han alliberat noves versions del Framework Canigó:

* Versions de Canigó 3.4.8 i 3.6.2 per a resoldre aquesta vulnerabilitat als mòduls de Canigó.
Podeu consultar: [Publicació nova versió 3.4.8 i 3.6.2](/noticies/2021-12-17-CAN-actualitzacio-canigo-3_4_8_3_6_2).

* Versió 1.6.9 de l'archetype de Canigó per a generar projectes amb Canigó 3.4.8.
Podeu consultar: [Actualització archetype 1.6.9](/noticies/2021-12-17-CAN-Actualitzacio_archetype_1_6_9/).

* Versió 1.7.2 de l'archetype de Canigó i la versió 1.8.2 del plugin del eclipse per a generar projectes amb Canigó 3.6.2.
Podeu consultar: [Actualització archetype 1.7.2 i plugin Eclipse 1.8.2](/noticies/2021-12-17-CAN-Actualitzacio_archetype_1_7_2_plugin_eclipse_1_8_2/).

Des de CS Canigó es recomana actualitzar a aquestes noves versions. Per a fer-ho, serà necessari revisar les dependències de l'aplicació
per a utilitzar els mòduls de les versions 3.4.8 i 3.6.2. Podeu consultar les matrius de compatibilitat de les versions:

- [Matrius de Compatibilitats 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- [Matrius de Compatibilitats 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Un cop es comprovi que s'utilitzen les últimes versions dels mòduls, caldrà modificar el fitxer `pom.xml` per a assegurar l'ús
de la versió 2.17.0 de log4j:

```xml
<properties>
<log4j2.version>2.17.0</log4j2.version>
</properties>
```

Un cop realitzades les adaptacions descrites, comprovar que només s'utilitza la versió 2.17.0 del log4j a l'aplicació mitjançant:

```
mvn dependency:tree | grep log4j
```

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).