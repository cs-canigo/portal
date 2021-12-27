+++
date        = "2021-12-27"
title       = "Canigó. Vulnerabilitat Log4j"
description = "Com resoldre les vulnerabilitats que afecten la biblioteca de registres basada en Java Log4j"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2022"
+++

**L'Apache Software Foundation ha detectat, des del 10 de desembre de 2021, diverses vulnerabilitats que afecten la
biblioteca de registres basada en Java Log4J**.

Les vulnerabilitats detectades són les següents:

- Log4Shell o LogJam [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228), considerada molt crítica permetent l'execució
de codi remot no autenticat de forma senzilla en qualsevol aplicació que utilitzi des de la versió Log4j 2.0-beta9 fins a la versió 2.14.0.

- [CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046), considerada crítica, encara que la seva explotació és més limitada,
permetent, com en la vulnerabilitat anterior, l'execució de codi remot no autenticat de forma senzilla en qualsevol aplicació que faci servir des de la
versió Log4j 2.0-beta9 fins a la versió 2.15.0.

- [CVE-2021-45105](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45105), considerada moderada, permet als atacants obtenir un "StackOverflowError"
per tancar el procés i generar una denegació de servei en qualsevol aplicació que faci servir des de la versió Log4j 2.0-beta9 fins a la versió 2.16.0.

S'ha publicat la **versió 2.17.0 de la llibreria Log4j per a mitigar aquestes vulnerabilitats**.

Per més informació podeu consultar [Apache Log4j Security Vulnerabilities](https://logging.apache.org/log4j/2.x/security.html).

Des de l'Agència de Ciberseguretat de la Generalitat s'han considerat aquestes vulnerabilitats com a crítiques i d'un potencial
gran impacte, recomanant als usuaris i administradors de sistemes que actualitzin el log4j de forma urgent.

<br/>
Altra informació de referència:

* <https://nvd.nist.gov/vuln/detail/CVE-2021-44228/> \
* <https://nvd.nist.gov/vuln/detail/CVE-2021-45046/> \
* <https://nvd.nist.gov/vuln/detail/CVE-2021-45105/> \
* <https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j/> \
* <https://snyk.io/wp-content/uploads/cheat-sheet-log4shell-remediation-v6.pdf> \

## Com solucionar la vulnerabilitat a les aplicacions

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

## Construcció i desplegament d'aplicacions via SIC

Totes les versions de la llibreria Log4j que mitiguen la vulnerabilitat es troben actualment disponibles al Repositori de Llibreries del SIC.

No obstant això, s'han publicat també al Repositori de Llibreries del SIC algunes llibreries parchejades que es detallen a continuació:

### Log4j v.1.2.17 sense la classe JMSAppender

Malgrat que el risc detectat és menor i únicament serien vulnerables les aplicacions que disposin d'una configuració de logging
amb configuracions JMSAppender, en la línia de les mesures mitigadores proposades s'ha acordat publicar al Repositori de
llibreries del SIC la llibreria Log4j v.1.2.17 parchejada havent eliminat la classe en qüestió.

Per a referenciar-la des de les aplicacions, cal definir la dependència com es mostra a continuació:

```xml
<dependency>
  <groupId>log4j-patched</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.17</version>
  <classifier>patched</classifier>
</dependency>
```

### Log4j v.2.12.3 sense les classes destinades a Jdk 1.9 (llibreria multi-release)

Arran d'haver detectat problemes en el desplegament a servidors WebLogic v.12.x d'aplicacions que corren amb Jdk 1.7 pel fet
que la llibreria Log4j v.2.12.3 incorpora una sèrie de classes específiques per a Jdk 1.9 en tractar-se d'una llibreria de
tipus multi-release, s'ha acordat publicar al Repositori de llibreries del SIC la llibreria Log4j v.2.12.3 parchejada havent
eliminat les classses en qüestió.

Per a referenciar-les des de les aplicacions, cal definir les dependències com es mostra a continuació:

```xml
<dependency>
  <groupId>org.apache.logging.log4j-patched</groupId>
  <artifactId>log4j-core</artifactId>
  <version>2.12.3</version>
  <classifier>patched</classifier>
</dependency>
```

```xml
<dependency>
  <groupId>org.apache.logging.log4j-patched</groupId>
  <artifactId>log4j-api</artifactId>
  <version>2.12.3</version>
  <classifier>patched</classifier>
</dependency>
```

## Noves versions de Canigó 3.4 i 3.6

S'han alliberat noves versions del Framework Canigó:

* Versions de Canigó 3.4.9 i 3.6.3 per a resoldre aquesta vulnerabilitat als mòduls de Canigó.
Podeu consultar: [Publicació nova versió 3.4.9 i 3.6.3](/noticies/2021-12-27-CAN-actualitzacio-canigo-3_4_9_3_6_3).

* Versió 1.6.10 de l'archetype de Canigó per a generar projectes amb Canigó 3.4.9.
Podeu consultar: [Actualització archetype 1.6.10](/noticies/2021-12-27-CAN-Actualitzacio_archetype_1_6_10/).

* Versió 1.7.3 de l'archetype de Canigó i la versió 1.8.3 del plugin del eclipse per a generar projectes amb Canigó 3.6.3.
Podeu consultar: [Actualització archetype 1.7.3 i plugin Eclipse 1.8.3](/noticies/2021-12-27-CAN-Actualitzacio_archetype_1_7_3_plugin_eclipse_1_8_3/).

Des de CS Canigó es recomana actualitzar a aquestes noves versions. Per a fer-ho, serà necessari revisar les dependències de l'aplicació
per a utilitzar els mòduls de les versions 3.4.9 i 3.6.3. Podeu consultar les matrius de compatibilitat de les versions:

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