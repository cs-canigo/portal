+++
date        = "2015-03-05T17:11:42+01:00"
title       = "Mòdul de traces"
description = "Mòdul de detecció d'errades."
section     = "Documentació versió 3.x"
weight      = 7
+++

## Introducció

### Propósit

El mòdul de traces té com a missió:

-   Detectar i localitzar amb més facilitat errors de l'aplicació
-   Entrada de dades incorrectes segons la lògica del sistema
-   Seguiment per a auditoria

Per a que això pugui ser portat a terme, el servei ofereix la
possibilitat de:

1.  Definir nivells de traces (d'informació, fatals, errors, etc.)
2.  Definir en quines sortides es generarà la traça: consola, fitxers,
    base de dades, correu electrònic, etc.
3.  Canviar en qualsevol moment quin és el mínim nivell de traces que
    volem mostrar, sense haver d'afectar a les classes que generen les
    traces
4.  Definir el format de sortida de les nostres traces: incorporar
    l'hora, el número de línia del codi on s'ha produït i la seva
    classe, etc.
5.  Incorporar informació de context a la traça: usuari, IP del client,
    etc.

### Documents i Fonts de Referència

Nom          | Adreça
------------ | ------------
Log4J Manual | https://logging.apache.org/log4j/1.2/manual.html
JMX i Mbeans | http://download.oracle.com/javase/6/docs/technotes/guides/jmx/tutorial/tutorialTOC.html

### Glossari

**Log4J**

Un dels framework de traces més extés. Es basa en l'ús de Appenders,
Categories i Layouts. Veure l'annex per a més informació.

**JMX**

Del acrònim Java Management eXtensions, JMX és la tecnologia que
defineix una arquitectura de gestió, la API, els patrons de disseny, i
els serveis de monitorització/administració d'aplicacions Java.

**Mbean**

Similar al model JavaBeans i amb una interfície estàtica, els Mbeans
exposen mètodes per obtenir i assignar valors remotament i en temps
d'execució, ideal per a gestionar modificacions/administració de
propietats en calent.

## Descripció detallada

### Arquitectura i components

A més de les funcionalitats oferides per la pròpia API de Log4j, Canigó
disposa d'un conjunt de components addicionals:

1.  Configuració de traces multientorn.
2.  MBean per a modificar el nivell de traces en calent d'una aplicació.
3.  Layout per a traces amb format XML.
4.  Eina de consulta de logs en calent.
5.  Afegir informació contextual als logs.

### Instal- lació i configuració

#### Instal- lació

El mòdul de traces s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació (Struts o JSF), l'eina de
suport al desenvolupament inclourà la referència dins del pom.xml. En
cas d'una instal- lació manual afegir les següents línies al pom.xml de
l'aplicació:

```java
<canigo.core.version>[3.1.0,3.2.0)</canigo.core.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
```

#### Configuració

L'eina de desenvolupament de Canigó 3 genera de manera automàtica els
diferents arxius de configuració de traces per entorn:

-   log4j.int.xml Arxiu de configuració per al entorn d'integració.
-   log4j.pre.xml Arxiu de configuració per al entorn de preproducció.
-   log4j.pro.xml Arxiu de configuració per al entorn de producció.
-   log4j.xml Arxiu de configuració per defecte. En el cas de no trobar
    cap configuració específica per al entorn, aquesta pasarà a ser la
    per defecte.

Directori de configuració: <PROJECT_ROOT>/src/main/resources/log4j/*.xml

Per cadascun dels entorns els nivells de logs varien.

Exemple de configuració log4j.xml en local:

```xml
<log4j:configuration xmlns:log4j='http://jakarta.apache.org/log4j/'
 debug="true">

    <!-- Architecture appender -->
    <appender name="file" class="org.apache.log4j.DailyRollingFileAppender">
        <param name="DatePattern" value="'.'yyyyMMdd" />
        <param name="File"
            value="/export/AppJavaDades/AppExemple-${weblogic.Name}.log" />
        <param name="Append" value="true" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern"
                value="canigo Message: %d{dd MMM yyyy HH:mm:ss,SSS} %-5p [%t] %c - %m%n - %X{APPID}" />
        </layout>
    </appender>
    <appender name="console" class="org.apache.log4j.ConsoleAppender">
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern"
                value="canigo Message: %d{dd MMM yyyy HH:mm:ss,SSS} %-5p [%t] %c - %m%n - %X{APPID}" />
        </layout>
    </appender>
    <category name="cat.gencat.ctti.canigo.arch">
        <level value="debug" />
        <appender-ref ref="console" />
        <appender-ref ref="file" />
    </category>
    <root>
                <appender-ref ref="console" />
        <level value="info" />
    </root>
</log4j:configuration>
```

D'aquesta configuració d'exemple destaquem:

-   Existeixen dos tipus d'appender, un que mostrarà la informació per
    la consola del servidor d'aplicacions, i un altre que inserirà les
    traces a un log que rotarà automàticament cada dia.
-   Les traces provinents del package "cat.gencat.ctti.canigo.arch" es
    visualitzaran tant en la consola d'arranc del servidor com a un
    arxiu de logs.
-   Els packages restants (aplicació i llibreries de tercers) es
    mostraran només per consola i amb nivell de log INFO.

A continuació es mostren les configuracions més comuns de Log4J
(mitjançant appenders) i algunes de més específiques que per la seva
complexitat són necessàries d'explicar. En alguns casos, es tracten
d'implementacions disponibles en la comunitat, en d'altres desenvolupats
específicament per Canigó. Es recomana una lectura prèvia del manual de
log4j per conèixer en detall la configuració de log4j.  

#### Appenders

##### Configuració de l'ús de appender per consola

Classe: org.apache.log4j.ConsoleAppender

S'afegeixen les traces traces al "System.out" o "System.err". Per a
informació detallada sobre les propietats de l'appender consultar el
manual de Log4J.

Exemple:

```xml
<appender name="console"  class="org.apache.log4j.ConsoleAppender">
    <layout  class="org.apache.log4j.PatternLayout">
       <param name="ConversionPattern"  value="canigo Message: %-5p [%t] %c -  %m%n"/>
    </layout>
</appender>
```

##### **Configuració de l'ús de appender per fitxer rotatiu**

Classe: org.apache.log4j.DailyRollingFileAppender

Permet establir un tamany màxim de fitxer i cada vegada que el fitxer de
log supera aquest tamany es crea un fitxer de traces nou. Aquest procés
es fa diàriament o segons la freqüència especificada. Per a informació
detallada sobre la forma d'especificar les diferents freqüències i
propietats de l'appender consultar el manual de Log4J.

El format del fitxer (texte pla o XML) el defineix el *layout* associat
a l'*appender* com veurem posteriorment.

##### **Configuració de l'ús de Appender per Correu Electrònic**

Classe: org.apache.log4j.SMTPAppender

Envia les traces per correu electrònic. Per a informació detallada sobre
les propietats de l'appender consultar el manual de Log4J.

##### **Configuració de l'ús de Appender per SNMP**

Classe: org.apache.log4j.ext.SNMPTrapAppender

Envia les traces com a missatges TRAP pel protocol de control de xarxa
SNMP a un administrador de xarxa. El manual de Log4J és molt reticent en
definir el seu ús. Degut a la seva complexitat es fa esmena en aquest
apartat de cóm utilitzar-lo.

Es poden especificar els següents paràmetres:

**Paràmetre** | **Requerit** | **Descripció**
------------- | ------------ | --------------
ImplementationClassName | Sí | Implementació del protocol snmp. Podem escollir entre dos valors en funció de la versió del protocol que vulguem fer servir: *org.apache.log4j.ext.WengsoftSNMPTrapSender* (v1,v2 ó v3) ó *org.apache.log4j.ext.JoeSNMPTrapSender* (v1 ó v2)
ManagementHost | Sí | Direcció IP del host a on està l'administrador de xarxa a on s'enviaran els missatges SNMP
ManagementHostTrapListenPort | Sí | Port a on està l'administrador de xarxa a on s'enviaran els missatges SNMP
EnterpriseOID | Sí | paràmetre propi del protocol SNMP
LocalIPAddress | Sí | IP des d'on s'envien els missatges
LocalTrapSendPort | Sí | Port des d'on s'envien els missatges
GenericTrapType | Sí | Paràmetre propi del protocol SNMP
SpecificTrapType | Sí | Paràmetre propi del protocol SNMP
CommunityString | Sí | Paràmetre propi del protocol SNMP
Threshold |  Sí | Nivell més baix pel que es generaran els missatges TRAP

Exemple:

```xml
<appender name="snmp" class="org.apache.log4j.ext.SNMPTrapAppender">
    <param name="ImplementationClassName" value="org.apache.
    log4j.ext.WengsoftSNMPTrapSender"/>
    <param name="ManagementHost" value="127.0.0.1"/>
    <param name="ManagementHostTrapListenPort" value="8001"/>
    <param name="EnterpriseOID" value="1.3.6.1.4.1.24.0"/>
    <param name="LocalIPAddress" value="127.0.0.1"/>
    <param name="LocalTrapSendPort" value="161"/>
    <param name="GenericTrapType" value="6"/>
    <param name="SpecificTrapType" value="12345678"/>
    <param name="CommunityString" value="public"/>
    <param name="ForwardStackTraceWithTrap" value="true"/>
    <param name="Threshold" value="DEBUG"/>
    <param name="ApplicationTrapOID" value="1.3.6.1.4.1.24.12.10.22.64"/>
    <layout class="org.apache.log4j.ext.SnmpDelimitedConversionPatternLayout">
    <param name="ValuePairDelim" value="/"/>
    <param name="VarDelim" value=";"/>
    <param name="ConversionPattern" value="%-5p;1.3.6.1.4.1.24.100.1/%t;1.
    3.6.1.4.1.24.100.2/%c;1.3.6.1.4.1.24.100.3/%m;1.3.6.1.4.1.24.100.4" />
</layout>
</appender>
```

##### Configuració de l'ús de Appender per Base de Dades

Classe: org.apache.log4j.jdbcplus.JDBCAppender

Instal- lació: Per a poder fer ús d'aquest appender cal descarregar una
llibreria, disponible a la url
http://www.dankomannhaupt.de/projects/index.html

Es poden definir els paràmetres:

**Paràmetre** | **Requerit** | **Descripció** |
------------- | ------------ | -------------- |
url | Sí | Url de connexió a la base de dades | 
username | Sí | Nom usuari connexió a la base de dades | 
password | Sí | Password connexió a la base de dades | 
conector | Sí | Connector a la base de dades. Els valors disponibles són:  1.  org.apache.log4j.jdbcplus.examples.MySqlConnectionHandler  2. org.apache.log4j.jdbcplus.examples.OracleConnectionHandler  En cas de que no es disposi de connector per la base de dades seleccionada es pot realitzar una implementació de la interfície '*org.apache.log4j.jdbcplus.JDBCConnectionHandler'*  |
sqlHandler | Sí | Adaptador que proporciona la cadena per fer la inserció d'un registre.  Usar: ' org.apache.log4j.jdbcplus.examples.SqlHandler '
sql |  Sí | Patró d'inserció dels valors en la base de dades  (Veure patrons a continuació) | 
table | Sí | Taula en la que s'emmagatzemaran les traces | 
column | Sí | Crear un paràmetre amb nom 'column' per cada columna a inserir. Indicar com a valor:  nom_de_columna~patró~valor  On patró correspon a un dels possibles patrons de la sql | 
buffer | No | Nombre d'insercions a la base de dades que es fan a la vegada  Valor per defecte:1 | 
commit | No | Especificar si es vol autocommit en cada inserció.  Valor per defecte:true | 
dbclass | Sí | Driver utilitzat (específic de la BD) | 
quoteReplace | No | Indicar 'true' si es volen reemplaçar les cometes simples (') per poder inserir a la base de dades | 
layoutPartsDelimiter | No | Delimitador dels patrons de layout.  És la cadena que utilitzarem per separar els diferents patrons definits dins del tag ConversionPattern del tag Layout.  Podrem escollir el patró que volem usar en cada columna indicant @LAYOUT:num_del_patro@  Ex: <param name="ConversionPattern" value="patro1#~~#patro2#~~#patro3"/>  On layoutPartsDelimiter="#-#" | 

Patrons del paràmetre sql:

**Patró**           | **Descripció**
------------------- | --------------
(INC)               | Comptador incremental per cada traça
(PRIO)              | Prioritat de la traça (DEBUG, INFO,...)
(ID)                | Classe que implementa JDBCIDHandler i que proporciona el valor per aquesta columna.
(IPRIO)             | **Prioritat de la traça en format numèric** 
(DYNAMIC)           | Valor dinàmic que proporciona una classe que implementa JDBCColumnHandler
(STATIC)            | Valor estàtic
(CAT)               | Nom de la categoria
(THREAD)            | Nom del thread
(MSG)               | Missatge de la traça sense format
(LAYOUT)            | Missatge de la traça formatejat amb el patró especificat en el param ConversionPattern.
@LAYOUT:num_patró@ | Missatge de la traça formatejat amb el patró especificat en el param ConversionPattern, en la posició indicada per num_patró
(TIMESTAMP)         | Moment en que es llença de la traça
(THROWABLE)         | Error associat a la traça
(NDC)               | Informació contextual de la traça *(nested diagnostic context)*
@MDC:key@           | Informació contextual de la traça sota una clau predeterminada *(mapped diagnostic context)*

Exemple:

~~~~ {.code-java}
<appender name="JDBCPooled" class="org.apache.log4j.jdbcplus.JDBCAppender">
    <param name="url" value="jdbc:mysql://localhost/test" />
    <param name="username" value="eulo" />
    <param name="password" value="eulo" />
    <param name="sql" value="INSERT INTO TEST (prio, cat, thread,
    msg, layout_msg, throwable, ndc, mdc, mdc2, info, addon, created_by)
    VALUES (' (PRIO)', ' (CAT)', ' (THREAD)', ' (MSG)', '@LAYOUT:1@',
    ' (THROWABLE)', ' (NDC)', '@MDC:MyMDC@', '@MDC:MyMDC2@', 'info timestamp:
    (TIMESTAMP)', 'addon', 'me')"/>
    <param name="buffer" value="1"/>
    <param name="commit" value="true"/>
    <param name="dbclass" value="com.mysql.jdbc.Driver"/>
    <param name="quoteReplace" value="true"/>
    <param name="throwableMaxChars" value="3000"/>
    <param name="layoutPartsDelimiter" value="#-#"/>
    <layout class="org.apache.log4j.PatternLayout">
    <param name="ConversionPattern" value="[%t] %m####%d\{dd.MM.yyyy\}
    #-#%d\{HH:mm:ss\}"/>
</layout>
</appender>
~~~~

També podem indicar el nom de les columnes i el seu valor amb param name="column" i posant a value:

nom_de_columna~patró~valor

On patró correspon a un dels possibles patrons. D'aquesta manera no fa falta el paràmetre sql.

~~~~ {.code-java}
<param name="table" value="logtest" />
<param name="column" value="id~ID~org.apache.log4j.jdbcplus.
examples.MyIDHandler" />
<param name="column" value="prio~PRIO" />
<param name="column" value="cat~CAT" />
<param name="column" value="thread~THREAD" />
<param name="column" value="msg~MSG" />
<param name="column" value="layout_msg~LAYOUT" />
<param name="column" value="info~DYNAMIC~org.apache.log4j.jdbcplus.
examples.MyColumnHandler" />
<param name="column" value="mdc~MDC~MyMDC" />
<param name="column" value="created_on~TIMESTAMP" />
<param name="column" value="created_by~STATIC~me" />
<param name="usePreparedStatements" value="true"/>

<param name="layoutPartsDelimiter" value="#-#"/>
<!- layout with conversion pattern ->
<layout class="org.apache.log4j.PatternLayout">
<!- conversion pattern with 4 parts separated by ##, second part is empty -->
<param name="ConversionPattern" value="[%t] %m####%d\{dd.MM.yyyy\}#-#%
d\{HH:mm:ss\}"/>
</layout>
~~~~

#### Layouts

##### PatternLayout

Classe:
[org.apache.log4j.PatternLayout](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/PatternLayout.html)

Permet especificar la sortida amb patrons de conversió. El seu ús és equivalent a la funció printf del llenguatje C.

Alguns dels caràcters de conversió més interessants són (per a més referènciaconsultar la API de la classe):

**Caràcter** | **Descripció**
------------ | --------------
%c           | Nom del "logger"
%C           | Mostrar el nom qualificat de la classe que ha llençat el missatge.
%d           | Mostrar la data en la que es va produir el missatge. A continuació opcionalment pot aparèixer el patró de conversió de data. Si no s'especifica s'utilitza per defecte **ISO 8601.** <br>Exemple: %d{dd MMM yyyy HH:mm:ss,SSS}.
%L           | Número de línia a on es va llençar el missatge (**no fer servir si es necessita un bon rendiment**).
%m           | Missatge
%p           | Prioritat/nivell del missatge (WARN,...).
%X{clau}     | Informació contextual "clau"
%n           | Separador de línia (un \n).

El resultat de l'aplicació d'aquests patrons són missatges de text pla
uniformement formatejats.

##### XMLLayout

Classe:
[org.apache.log4j.XMLLayout](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/xml/XMLLayout.html)

La sortida d'aquest "layout" consisteix en una sèrie de "log4j:event"
nodes XML. Aquest "layout" no deixa un fitxer XML ben format, sinó que
està pensat per a ser inclòs com a entitat externa a un altre fitxer per
a formar un fitxer XML correcte.

 Per exemple, si abc és el nom del fitxer a on van les traces, el fitxer
XML correcte seria:

~~~~ {.code-java}
<?xml version=1.0"?>
<!DOCTYPE log4j*:*eventSet **
    <!ENTITY* data SYSTEM  "*file:///abc">]>
          <log4j:eventSet version="1.2"  xmlns:log4j="http://jakarta.apache.org/log4j/">
              &data;
          </log4j:eventSet>
~~~~

Qualsevol informació de tipus contextual (com ara l'userId) s'ha
d'incloure dins la informació contextual del log i automàticament
s'inclourà en la traça:

~~~~ {.code-java}
<log4j:event logger="net.gencat.ctti.canigo.services.logging.test.
LoggingClient" timestamp="1127746730256" level="DEBUG" thread="main">
<log4j:message><![CDATA[Log property file: log4j-test.xml.es-c7pym1j]]></log4j:message>
<log4j:NDC><![CDATA[userId: me]]></log4j:NDC>
</log4j:event>
~~~~

##### PatternXMLLayout

Classe:
[org.apache.log4j.XMLLayout](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/xml/XMLLayout.html)

La sortida d'aquest "layout" és una combinació de PatternLayout i
XMLLayout.

A l'igual que l'XMLLayout, aquest "layout" no deixa un fitxer XML ben
format, si no que també està pensat per a ser inclòs com a entitat
externa a un altre fitxer per a formar un fitxer XML correcte.\
 El fitxer xml resultant tindrà una estructura semblant a XMLLayout, amb
la diferència que el atributs no seran els de l'XMLLayout(*loggin,
timestamp, level i thread*), sinó que els podrem definir nosaltres
mateixos, seguint els patrons de PatternLayout.

Es permet definir els següents paràmetres:

**Paràmetre**          | **Requerit** | **Descripció**
---------------------- | ------------ | --------------
NameSpace              | Sí           | Indica el namespace que l'xml mostrarà en els tags (<name_space:event>). Si no es defineix, mostrarà únicament el nom del tag (<event>)
NodeName               | Sí           | Indica el nom del node principal(<registre>). Per defecte és "event" (<event>)
AttrValuePairDelim     | Sí           | Indica quin caràcter servei de separador entre un atribut i el seu valor (usar '=' per defecte).
AttrVarDelim           | Sí           | Indica quin caràcter serveix de separador entre els diferents atributs
AttrConversionPattern  | Sí           | Defineix els diferents atributs dels events del log. El valor dels atributs pot seguir els mateixos patrons que en *PatternLayout.*
NodesValuePairDelim    | Sí           | Indica quin caràcter serveix de separador entre els noms dels nodes i el seu valor
NodesVarDelim          | Sí           | Indica __quin caràcter serveix de separador entre els diferents nodes
NodesConversionPattern | Sí           | Defineix els diferents nodes dels events del log. El valor dels nodes també pot seguir els mateixos patrons que en PatternLayout.
Throwable              | Sí           | Indica que es mostraran les excepcions llançades. A value definirem el nom del tag que inclourà l'excepció.
ExceptionMaxLength     | No           | Indica el nombre màxim de caràcters que mostrarem de l'excepció. Per defecte són 256 caràcters.

Exemple:

~~~~ {.code-java}
<appender name="file" class="org.apache.log4j.RollingFileAppender">
<param name="File" value="D:/logs/logging4.log.xml"/>
<param name="Append" value="true"/>
<param name="MaxFileSize" value="50KB"/>
<param name="maxBackupIndex" value="3"/>
<layout class="net.gencat.ctti.canigo.services.logging.log4j.xml.PatternXMLLayout">
<param name="NameSpace" value="log4j"/>
<param name="NodeName" value="registre"/>
<param name="AttrValuePairDelim" value="="/>
<param name="AttrVarDelim" value=";"/>
<param name="AttrConversionPattern" value="attr1=%-5p;attr2=%t;attr3=%c" />
<param name="NodesValuePairDelim" value="="/>
<param name="NodesVarDelim" value=";"/>
<param name="NodesConversionPattern" value="data=%d\{yyyy MM dd HH:mm:ss\};
errorType=0;aplicacio=%c;logger=%F;nivell=%p;classe=%c;metode=metode; pid=%t;
missatge=%m;user_id=%X\{userId\};pagOrigen=%X\{pagOrigen\};" />
<param name="Throwable" value="textException"/>
<param name="ExceptionMaxLength" value="256"/>
</layout>
</appender>

Un exemple de sortida amb aquesta configuració és:

<log4j:registre
attr1="ERROR"
attr2="SNMP Server"
attr3="net.gencat.ctti.canigo.services.logging.snmp.test.TestListener">
<log4j: Data>2005 10 13 13:29:21</log4j: Data>
<log4j:errorType>0</log4j:errorType>
<log4j:aplicacio>net.gencat.ctti.canigo.services.logging.snmp.test.TestListener</log4j:aplicacio>
<log4j:logger>Log4JLog.java</log4j:logger>
<log4j:nivell>ERROR</log4j:nivell>
<log4j:classe>net.gencat.ctti.canigo.services.logging.snmp.test.TestListener</log4j:classe>
<log4j:metode>metode</log4j:metode>
<log4j: Pid>SNMP Server</log4j: Pid>
<log4j:textException><![CDATA[java.lang.Exception: Exception Message
at net.gencat.ctti.canigo.services.logging.snmp.test.TestListener.snmpRequest(TestListener.java:38)
at ca.wengsoft.snmp.Core.SnmpDispatcher.notifyEvent(SnmpDispatcher.java:164)
at ca.wengsoft.snmp.Core....]]>
</log4j:textException>
</log4j:registre>

En cas que no s'hagués definit el paràmetre NameSpace obtindrem aquest altre format:

<registre
attr1="ERROR"
attr2="SNMP Server"
attr3="net.gencat.ctti.canigo.services.logging.snmp.test.TestListener">

<data>2005 10 13 13:30:40</data>
<errorType>0</errorType>
<aplicacio>net.gencat.ctti.canigo.services.logging.snmp.test.TestListener</aplicacio>
<logger>Log4JLog.java</logger>
<nivell>ERROR</nivell>
<classe>net.gencat.ctti.canigo.services.logging.snmp.test.TestListener</classe>
<metode>metode</metode>
<pid>SNMP Server</pid>
<textException><![CDATA[java.lang.Exception: Exception Message
at net.gencat.ctti.canigo.services.logging.snmp.test.TestListener.snmpRequest(TestListener.java:38)
at ca.wengsoft.snmp.Core.SnmpDispatcher.notifyEvent(SnmpDispatcher.java:164)
at ca.wengsoft.snmp.Core....]]>
</textException>

</registre>
~~~~

**Incorporació de valors comuns a l'aplicació**

Utilitzant aquest layout podem crear logs amb valors provinents de
variables ja especificades en qualsevol punt de l'aplicació.
 Exemple: Imaginem que el filtre d'autentificació obté l'usuari i volem
mostrar l'usuari connectat a les nostres traces.
 Una possible opció és que la classe que generés la traça accedís
prèviament a l'obtenció de l'usuari connectat (a la sessió, cridant a la
classe d'autentificació, etc.) i afegís aquesta informació a la traça.
Aquesta opció és costosa i poc mantenible. Si volem mostrar a totes les
traces de la nostra aplicació l'usuari connectat haurem de realitzar
aquest procediment. I si després ens demanen que s'afegeixi altra
informació contextual a totes les traces de l'aplicació?
 Per evitar aquestes problemàtiques canigo proporciona la classe '
net.gencat.ctti.canigo.core.threadlocal.ThreadLocalProperties'.
 ThreadLocalProperties.put("userId","Usuari1");
 Una vegada introduït en qualsevol punt de l'aplicació aquest atribut,
podem configurar al layout que es mostri aquesta informació utilitzant
el caràcter '$' seguit del nom del atribut.
 Exemple:

~~~~ {.code-java}
<param name="NodesConversionPattern" value="data=%d\{yyyy MM dd  HH:mm:ss\};user_id=$userId;" />
~~~~

Aquest paràmetre crearia un tag amb un node '*data'* obtingut amb el
patró de conversió indicat i un tag '*user_id'* amb el valor del
paràmetre *userId* obtingut de l'objecte 'ThreadLocalProperties':

~~~~ {.code-java}
<log4j:registre>
    <log4j: Data>2005 10 19 11:29:40</log4j:  Data>
    <log4j:user_id>Usuari1</log4j:user_id>
</log4j:registre>
~~~~

-   Incorporació de missatges estructurats a la traça*

Per lo general els missatges de traces són cadenes. Si volem generar
informació adicional estructurada farem ús de l'objecte
BaseLoggingObject per afegir la informació (veure apartat 'Utilització -
Generar logs amb paràmetres adicionals a un missatge').

Per mostrar els atributs de l'objecte BaseLoggingObject s'usarà la
sintaxi '**@**' seguida del nom del paràmetre.

<param name="NodesConversionPattern" value="idTramit=@idTramit;" />

Utilització del Servei
----------------------

### Generar Missatges

Per generar una traça en nivell debug tindriem el següent codi:

~~~~ {.code-java}
public class ExempleTrace{

   private static final Log LOGGER = LogFactory.getLog(ExempleTrace.class);

   public void execute(){
      if (LOGGER.isDebugEnabled()){
         LOGGER.debug("Traça d'exemple");
      }
   }

}
~~~~

### Recomanacions

#### Recomanacions generals

-   Mai utilitzar System.out.println.
-   Instancia de manera estàtica i final el log per evitar
    instanciacions innecessàries.
-   Sobreescriu sempre el mètode toString() per donar una representació
    del objecte. Obtenir una traça del tipus className@16cd7d5 no aporta
    res.
-   Valida el nivell de traces abans d'escriure.

#### Recomanacions davant excepcions

-   No utilitzar e.printStackTrace.

e.printStackTrace només imprimeix en consola. Només es podrà visualitzar
aquesta informació si s'ha definit un appender de consola.

~~~~ {.code-java}
try {
   ................
} catch ( unaException e) {
    e.printStackTrace();
}
~~~~

Utilitzar LOGGER.error(message, t) on t es la excepció capturada:

~~~~ {.code-java}
try {
    ................
} catch (MyException e) {
    LOGGER.error("S'ha produït un error: ", e);
    .........................
}
~~~~

-   No utilitzar LOGGER.error i després rellançar l'excepció si no és
    estrictament necessari:

~~~~ {.code-java}
try {
    ................
} catch (MyException e) {
    LOGGER.error("S'ha produït un error: ", e);
    throw e;
}
~~~~

Si en altres nivells es fa el mateix, s'imprimirà les excepcions
diverses vegades, portant a la confusió.

-   No eliminar el stacktrace

~~~~ {.code-java}
try{
    ......
}catch(MyException e){
    throw new RuntimeException("S'ha produït un error: " + e.getMessage());
}
~~~~

Aquest codi elimina el stacktrace de MyException. Es perd informació
útil sobre la excepció. La alternativa correcta és:

~~~~ {.code-java}
try{
   ...
}catch(MyException e){
   throw new RuntimeException("S'ha produït un error: ", e);
}
~~~~

#### Evitar càlculs innecessaris

Una de les qüestions més importants del sistema de traces és el cost de
computació. Si en un moment donat es desactiven determinats nivells de
traces, tot i que aquesta traça no es generi a la sortida el missatge és
avaluat (ja que es troba com un paràmetre de la crida). Si l'avaluació
del missatge comporta càlculs estem afegint un cost innecessari.

Per evitar afegir costos addicionals de còmput innecessari es recomana
prèviament comprovar que es troba activat el nivell pel qual generarem
el missatge. Així, per exemple, enlloc de:

~~~~ {.code-java}
LOGGER.debug("....");
~~~~

Haurem sempre de realitzar:

~~~~ {.code-java}
if (LOGGER.isDebugEnabled())
LOGGER.debug("....");
~~~~

#### Programació de traces

Com a recomanació de traces i nivell d'aquestes dins d'un mètode podrien
ser les següents:

1.  Traça a nivell debug al començament del mètode, informant els
    paràmetres d'entrada que poden arribar a ser útils per a detectar
    l'operació realitzada.
2.  Traça a nivell info informant de l'operació realitzada, si
    procedeix.
3.  Traça a nivell error o warn per a blocs destinats a la captura
    d'excepcions.

~~~~ {.code-java}
public void inserirUsuari(String nom){
try {
      if (LOGGER.isDebugEnabled()) {
    LOGGER.debug("UsuarioDAOImpl:eliminarUsuario ...identificador del usuario:" + identificadorUsuario);
      }

      User user = new User();
      user.setName(nom);
      getUserDAO().insert(user);

      if (LOGGER.isInfoEnabled()) {
     LOGGER.info("Usuari " + user + " inserit a la BD");
      }

 }
 catch (Exception e) {
    LOGGER.error("S'ha produït un error, e);
    ........
 }
}
~~~~

### Generar Informació Contextual

Moltes vegades no és suficient amb la informació estàndard que es mostra
a les traces i és necessari complementar-la amb informació contextual
cóm: usuari que fa la petició, temps d'inici i final, etc. Per afegir
aquesta informació, és necessari inicialitzar-la en algun moment de la
petició per què estigui disponible durant tot el processat de la
mateixa. Per tant, el patró de treball a seguir és:

1.  Inicialització de l'informació addicional abans de processar la
    petició.
2.  Processat de la petició (utilització de l'informació addicional en
    el mòdul de traces).
3.  Finalització de la petició.

**Canigó** suporta la inserció d'aquesta informació mitjançant la
extensió del filtre
LoggingFilter.
Gracies al mètode createCustomParameters, el desenvolupador pot afegir o
eliminar paràmetres de la Mapped Diagnostic Context (MDC) de Log4j que
posteriorment seran inserits a les traces de l'aplicació.

Un exemple de filtre que afegeix informació de l'usuari, adreça i host
remot a les traces podria ser:

~~~~ {.code-java}
...
public class ExtendedLoggingFilter extends LoggingFilter {

     private final static String USERNAME = "USERNAME";
     private final static String REMOTEHOST = "REMOTEHOST";
     private final static String REMOTEADDR = "REMOTEADDR";

     @Override
     protected Map<String, Object> createCustomParameters( ServletRequest request, ServletResponse response) {

           Map<String,Object> custom = new HashMap<String, Object>();
       custom.put(REMOTEHOST, request.getRemoteHost());
           custom.put(REMOTEADDR, request.getRemoteAddr());

       HttpServletRequest httprequest = (HttpServletRequest) request;
           String userLogin = (String)httprequest .getSession().getAttribute("userLogin");

            if (userLogin!=null) {
                custom.put(USERNAME, userLoginId);
            }

           return custom;
     }
}
~~~~

Configuració del layout per a mostrar les dades:

~~~~ {.code-java}
<appender name="console" class="org.apache.log4j.ConsoleAppender">
    <layout class="org.apache.log4j.PatternLayout">
        <param name="ConversionPattern" value="%-4r [%t] %5p %c %x - %m - %X{USERNAME}%n - %X{REMOTEHOST} - %X{REMOTEADDR}"/>
    </layout>
</appender>
~~~~

Eines de Suport
---------------

### Java Templates per a Eclipse

Eclipse ofereix unes eines que faciliten o agilitzen la creació de codi
repetitiu.

Dins d'Eclipse:
 **Window -> Preferences -> Java -> Editor -> Templates.**

Creem un nou template amb el nom **log**:

~~~~ {.code-java}
private static final ${loggerType:newType(org.apache.commons.logging.Log)} logger =
   ${logFactoryType:newType(org.apache.commons.logging.LogFactory)}
   .getLog(${enclosing_type}.class);
~~~~

Un cop ja a la classe, si escrivim **log** seguit de CTRL + BARRA ESPAI.
Eclipse ens crearà el següent codi automàticament:

~~~~ {.code-java}
private static final Log LOGGER= LogFactory.getLog(NomClasse.class);
~~~~

Un altre template interessant és el següent:

~~~~ {.code-java}
if (LOGGER.isDebugEnabled()) {
   LOGGER.debug(${msg});
}
~~~~

Que generaria el codi recomanat per a traces de nivell DEBUG.

### Visualització de Logs

#### Visualització amb chainsaw:

Per visualitzar els logs provinents de la nostra aplicació podem
utilitzar una eina anomenada **chainsaw**, que trobem dins del paquet de
**log4j** (*org.apache.log4j.chainsaw*). Aquesta eina ens permet
visualitzar tant els events generats per l'aplicació com els provinents
d'un fitxer xml generat per *XMLLayout*.

Per visualitzar un fitxer xml només caldrà executar l'eina **chainsaw**
i obrir el fitxer. Aquest fitxer no ha d'ésser un fitxer xml ben format.
Ha de tenir l'estructura que presenta quan és generat per XMLLayout, és
a dir, només haurà de tenir els nodes dels events, sense la capçalera
xml, ja que chainsaw ja la introdueix abans de parsejar el fitxer.

Així, aquest fitxer no podrà ser visualitzat pel chainsaw:

~~~~ {.code-java}
<?xml version=1.0"?>
<!DOCTYPE log4j:eventSet
<!ENTITY data SYSTEM "file:///abc">
]>
<log4j:eventSet version="1.2" xmlns:log4j="http://jakarta.apache.org/log4j/">

<log4j:event logger="net.gencat.ctti.canigo.services.logging.test.LoggingClient"
timestamp="1127746730256" level="DEBUG" thread="main">
<log4j:message><![CDATA[Log property file: log4j-test.xml.es-c7pym1j]]></log4j:message>
<log4j:NDC><![CDATA[userId: me]]></log4j:NDC>
</log4j:event>

</log4j:eventSet>
~~~~

Però sí podrà visualitzar fitxers amb aquest format:

~~~~ {.code-java}
<log4j:event logger="net.gencat.ctti.canigo.services.logging.test.LoggingClient" timestamp="1127746730256" level="DEBUG" thread="main">
    <log4j:message><![CDATA[Log property file: log4j-test.xml.es-c7pym1j]]></log4j:message>
    <log4j:NDC><![CDATA[userId: me]]></log4j:NDC>
</log4j:event>
~~~~

Per visualitzar els events provinents d'una aplicació haurem de
configurar l'arxiu **log4j.nom_del_host.xml** de la següent manera:

~~~~ {.code-java}
<appender name="chainsaw"  class="org.apache.log4j.net.SocketAppender">
    <param name="remoteHost"  value="localhost"/>
    <param name="port" value="4445"/>
    <param  name="locationInfo" value="true"/>
</appender>
~~~~

Aquí creem un appender amb el nom **chainsaw** i amb els següents
paràmetres:

-   **remoteHost** = nom del host on executem el chainsaw

-   **port** = port per on establim la connexió

-   **localinfo** = true

 Seguidament hem d'especificar quines classes enviaran els seus events
cap a **chainsaw**, com fem amb els altres appenders:

~~~~ {.code-java}
<category name="cat.gencat.ctti">
     <appender-ref  ref="chainsaw"/>
     <appender-ref ref="console"/>
     <appender-ref  ref="file"/>
     <appender-ref ref="snmp"/>
</category>
~~~~

Un cop configurat el fitxer tots els events que produeixin aquestes
classes seran automàticament enviats cap al **chainsaw**.

##### Visualització amb ValueList (STRUTS):

Una segona manera de veure les traces és a través d'una *ValueList* dins
d'una pàgina *jsp*.

Per a poder usar aquest mètode el primer que s'ha de fer és generar una
nova entrada al fitxer *canigo-services-web-lists.xml*, concretament a
dins del *<map>* de la propietat *<config.adapters>*.

~~~~ {.code-java}
<entry key="tracesList">
    <bean name="tracesListAdapter"
        class="cat.gencat.ctti.canigo.arch.web.struts.vlh.tag.support.DailyRollingFileLogFinderAdapter">
        <property name="logBuilder">
            <bean
                class="cat.gencat.ctti.canigo.arch.core.logging.reader.DailyRollingFileLogBuilder">
                <property name="maxLogs" value="${tracesList.maxLogs}" />
                <property name="fileDatePattern" value="${tracesList.fileDatePattern}" />
                <property name="filterDatePattern" value="${tracesList.filterDatePattern}" />
                <property name="logItemDatePattern" value="${tracesList.logItemDatePattern}" />
                <property name="fileSystemService" ref="fileSystemService" />
                <property name="filtersConfig">
                    <map>
                        <entry key="userId" value="EQUALS" />
                        <entry key="nivell" value="EQUALS" />
                        <entry key="missatge" value="LIKE" />
                    </map>
                </property>
            </bean>
        </property>
        <property name="defaultNumberPerPage" value="${tracesList.defaultNumberPerPage}" />
    </bean>
</entry>
~~~~

I afegir la següent definició de bean al mateix fitxer:

~~~~ {.code-java}
<bean name="extendedValueListActionHelper"
        class="cat.gencat.ctti.canigo.arch.web.struts.lists.impl.ExtendedValueListActionHelper">
        <property name="valueListHelper">
            <ref bean="valueListHelper" />
        </property>
        <property name="maxExportRows" value="10000"/></bean>
~~~~

Un cop ja es té la llista definida, el següent pas es generar una
estructura amb una *acció*, unes pàgines *jsp* i els seus corresponents
arxius de configuració i propietats (a la plantilla se'n pot veure un
exemple). El més normal seria seguir una estructura de cerca, és a dir
una pantalla amb les condicions de cerca i posteriorment una pantalla
amb la *ValueList* mostrant els resultats de la cerca.

Cal destacar que a l'*acció* que realitza la cerca hi ha d'haver el codi
següent, que és el que permet fer la cerca correctament:

~~~~ {.code-java}
//Posem la localització del fitxer de traces XMLtraza.setRuta(confService.getProperty("ruta.fitxerLogXml"));

//Es fa la cerca i es carrega a la valueList
this.valueListActionHelper.search(mapping,form,request,response);
~~~~

L'arxiu de configuració de l'*acció* tindrà una aparença com el que es
mostra a continuació:

~~~~ {.code-java}
<bean lazy-init="true" name="/llistaTraces"
        class="cat.gencat.ctti.democanigo.struts.action.TracesAction">
        <property name="pojoClass" value="cat.gencat.ctti.canigo.arch.core.logging.reader.TraceUnit" />
        <property name="valueListActionHelper">
            <bean parent="extendedValueListActionHelper">
                <property name="exposedProperties">
                    <list>
                        <value>ruta</value>
                    </list>
                </property>
                <property name="listName"><value>tracesList</value></property>
                <property name="tableId" value="LOGS"/>
            </bean>
        </property>
        <property name="levels">
            <list>
                <value>DEBUG</value>
                <value>INFO</value>
                <value>WARN</value>
                <value>ERROR</value>
                <value>FATAL</value>
            </list>
        </property>
 ...
~~~~

En aquesta configuració es mostra com s'ha d'indicar el nom de la llista
definida a l'arxiu *canigo-services-web-lists.xml*, el nom de l'atribut
de la classe *TraceUnit* que conté el nom del fitxer de traces, etc. 
 I amb aquestes indicacions i l'exemple de la *plantilla* ja n'hi hauria
d'haver prou  per fer una petita *acció* amb una *ValueList* de les
traces XML.

 ![](/related/canigo/documentacio/modul-traces/llistatTraces.jpg)

##### Altres visualitzacions:

Per visualitzar fitxers xml que no segueixin l'estructura dels que
genera *XMLLayout*, com els de *PatternLayout* o *PatternXMLLayout*, no
podran ser visualitzats pel ***chainsaw***. Haurem d'utilitzar editors
de text o bé d'xml, pel cas dels generats per _*PatternXMLLayout*_.

## Annexos

### Introducció a Log4J

En aquest annex s'ofereix una breu introducció a conceptes de Log4J que
cal entendre per utilitzar el Servei de Traces.

A Log4J, existeixen varis elements clau:

1.  Prioritats o nivells de les traces. Log4J defineix per defecte 5
    nivells: DEBUG, INFO, WARN, ERROR i FATAL. Entre ells existeix una
    jerarquia (DEBUG<INFO<WARN<ERROR<FATAL), de forma que si en
    l'aplicació s'ha configurat que només es mostrin traces de nivell
    WARN, també es mostrarien els de nivell ERROR i FATAL.
    
    ![](/related/canigo/documentacio/modul-traces/ServeiTraces_img014.jpg)
    
2.  Categories. Les categories donen control al programador per a
    determinar quins events requereixen ser capturats i quins no. Dins
    de l'aplicació es poden definir diferents categories organitzades
    per jerarquia que en la majoria dels casos es mapejen amb el nom
    qualificat de les classes java, a on cada classe tindria la seva
    categoria. També poden crear-se categories per nom, de manera que
    podria definir-se una categoria que fes traces de les conexions RMI
    de l'aplicació, o de totes les operacions del usuari, etc.
    
3.  Appenders. Els "appenders" especifiquen a on es desarà la traça
    definida per a la categoria. Una categoria pot definir diferents
    sortides o "appenders" a la vegada (consola, fitxer, correu
    electrònic, base de dades,etc.)
    
4.  Layouts. Permeten especificar com es mostren els events. Per exemple
    podem especificar que ens aparegui l'hora en la que s'ha produït
    l'event, qui ho ha llençat, la línia en la que s'ha fet, etc.