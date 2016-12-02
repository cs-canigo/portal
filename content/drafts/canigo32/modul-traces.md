+++
date        = "2015-03-05T17:11:42+01:00"
title       = "Mòdul de traces"
description = "Mòdul de detecció d'errades."
sections    = "Canigó. Documentació versió 3.x"
weight      = 7
+++

## Introducció

### Propòsit

El mòdul de traces té com a missió:

-   Detectar i localitzar amb més facilitat errors de l'aplicació
-   Entrada de dades incorrectes segons la lògica del sistema
-   Seguiment per a auditoria

Per a què això pugui ser portat a terme, el servei ofereix la
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
Log4J2 Manual | http://logging.apache.org/log4j/2.x/

### Glossari

**Log4J2**

Evolució de Log4J. Un dels framework de traces més estès. Es basa en l'ús de Appenders,
Loggers i Layouts. Veure l'annex per a més informació.

## Descripció detallada

### Arquitectura i components

A més de les funcionalitats oferides per la pròpia API de Log4j2, Canigó
disposa d'un conjunt de components addicionals:

1.  Configuració de traces multientorn.
2.  Modificar el nivell de traces en calent d'una aplicació.
3.  Eina de consulta de logs en calent.
4.  Afegir informació contextual als logs.

### Instal·lació i configuració

#### Instal·lació

El mòdul de traces s'inclou per defecte dins del core de Canigó 3.
Durant el procés de creació de l'aplicació, l'eina de
suport al desenvolupament inclourà la referència dins del pom.xml. En
cas d'una instal·lació manual afegir les següents línies al pom.xml de
l'aplicació:

```java
<canigo.core.version>[3.2.0,3.3.0)</canigo.core.version>

<dependency>
          <groupId>cat.gencat.ctti</groupId>
          <artifactId>canigo.core</artifactId>
          <version>${canigo.core.version}</version>
</dependency>
```

#### Configuració

L'eina de desenvolupament de Canigó 3 genera de manera automàtica els
diferents arxius de configuració de traces per entorn:

-   log4j2.loc.xml Arxiu de configuració per a entorn locals.
-   log4j2.int.xml Arxiu de configuració per a l'entorn d'integració.
-   log4j2.pre.xml Arxiu de configuració per a l'entorn de preproducció.
-   log4j2.pro.xml Arxiu de configuració per a l'entorn de producció.
-   log4j2.xml Arxiu de configuració per defecte. En el cas de no trobar cap configuració específica per a l'entorn, aquesta pasarà a ser la de per defecte.

Directori de configuració: <PROJECT_ROOT>/src/main/resources/log4j2/*.xml

Per cadascun dels entorns els nivells de logs varien.

Exemple de configuració log4j2.xml en local:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
	<Appenders>
	    <RollingFile name="DAILY_LOG" fileName="/tmp/log.log" filePattern="tmp/%d{ddMMyyyy}_log.log" append="true">
			<PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n"/>
		    <Policies>
		    	<TimeBasedTriggeringPolicy interval="1"/>
		    </Policies>                               
		</RollingFile>
		<Console name="STDOUT" target="SYSTEM_OUT">
			<PatternLayout
				pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />
		</Console>
	</Appenders>
	<Loggers>
		<Logger name="cat.gencat.ctti" level="debug" additivity="false">
			<AppenderRef ref="DAILY_LOG" />
			<AppenderRef ref="STDOUT" />
		</Logger>
		<Root level="info">
			<AppenderRef ref="DAILY_LOG" />
		</Root>
	</Loggers>
</Configuration>

```

D'aquesta configuració d'exemple destaquem:

-   Existeixen dos tipus d'appender, un que mostrarà la informació per
    la consola del servidor d'aplicacions, i un altre que inserirà les
    traces a un log que rotarà automàticament cada dia.
-   Les traces provinents del package "cat.gencat.ctti" es
    visualitzaran tant en la consola d'arranc del servidor com a un
    arxiu de logs.
-   Els packages restants (aplicació i llibreries de tercers) es
    mostraran només per consola i amb nivell de log INFO.

#### Appenders

Els appenders més comuns i utilitzat son Console i RollingFile.

El appender Console treu els missatges per consola
```
<Console name="STDOUT" target="SYSTEM_OUT">
	<PatternLayout
		pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />
</Console>
```

El appender RollingFile treu els missatges per un fitxer que es va rotant cada cert temps.
A filePattern s'indica un patró de data pel nom del fitxer que es rota. Al paràmetre TimeBaseTriggeringPolicy s'indica cada quan es rota el fitxer. Aquest número farà referència a la mínima unitat de temps del patró trobat a filePattern.

Per exemple si en indiquem 1, i el patró és ddMMyyyy, es rotarà cada dia. Si el patró fos MMyyyy, es rotaria cada mes
```
<RollingFile name="DAILY_LOG" fileName="/tmp/log.log" filePattern="tmp/%d{ddMMyyyy}_log.log" append="true">
	<PatternLayout pattern="canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n"/>
	<Policies>
		<TimeBasedTriggeringPolicy interval="1"/>
	</Policies>                               
</RollingFile>
```

Al següent enllaç es troba la informació de tots els appenders existents a Log4J2.

https://logging.apache.org/log4j/2.x/manual/appenders.html

#### PatternLayout

Permet especificar la sortida amb patrons de conversió. El seu ús és equivalent a la funció printf del llenguatje C.

Alguns dels caràcters de conversió més interessants són (per a més referència consultar la API de la classe):

**Caràcter** | **Descripció**
------------ | --------------
%c           | Nom del "logger"
%C           | Mostrar el nom qualificat de la classe que ha llençat el missatge.
%d           | Mostrar la data en què es va produir el missatge. A continuació opcionalment pot aparèixer el patró de conversió de data. Si no s'especifica s'utilitza per defecte **ISO 8601.** <br>Exemple: %d{dd MMM yyyy HH:mm:ss,SSS}.
%L           | Número de línia a on es va llençar el missatge (**no fer servir si es necessita un bon rendiment**).
%m           | Missatge
%p           | Prioritat/nivell del missatge (WARN,...).
%X{clau}     | Informació contextual "clau"
%n           | Separador de línia (un \n).

El resultat de l'aplicació d'aquests patrons són missatges de text pla
uniformement formatejats.

El patró per defecte a les aplicacions Canigó és el següent:

```
canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n

Que fa que els logs surten de la següent manera:

canigo Message: 10 11 2016 16:25:39,578 DEBUG [http-bio-8081-exec-1] DEBUG [http-bio-8081-exec-1] org.hibernate.hql.internal.ast.ErrorCounter - throwQueryException() : no errors
canigo Message: 10 11 2016 16:25:39,579 DEBUG [http-bio-8081-exec-1] DEBUG [http-bio-8081-exec-1] org.hibernate.hql.internal.ast.QueryTranslatorImpl - HQL: select equipament.nom from cat.gencat.test.model.Equipament equipament
```

Utilització del Servei
----------------------

### Generar Missatges

Per a generar les traces el framework utilitzat per les aplicacions Canigó és SLF4J
Per generar una traça en nivell debug tindríem el següent codi:

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExempleTrace{

   private static final Logger LOGGER = LoggerFactory.getLogger(ExempleTrace.class);

   public void execute(){
      if (LOGGER.isDebugEnabled()){
         LOGGER.debug("Traça d'exemple");
      }
   }
}
```

### Recomanacions

#### Recomanacions generals

-   Mai utilitzar System.out.println.
-   Instància de manera estàtica i final el log per evitar
    instanciacions innecessàries.
-   Sobreescriu sempre el mètode toString() per donar una representació
    de l'objecte. Obtenir una traça del tipus className@16cd7d5 no aporta
    res.
-   Valida el nivell de traces abans d'escriure.

#### Recomanacions davant excepcions

-   No utilitzar e.printStackTrace.

e.printStackTrace només imprimeix en consola. Només es podrà visualitzar
aquesta informació si s'ha definit un appender de consola.

```
try {
   ................
} catch ( unaException e) {
    e.printStackTrace();
}
```

Utilitzar LOGGER.error(message, t) on t és l'excepció capturada:

```
try {
    ................
} catch (MyException e) {
    LOGGER.error("S'ha produït un error: ", e);
    .........................
}
```

-   No utilitzar LOGGER.error i després rellançar l'excepció si no és
    estrictament necessari:

```
try {
    ................
} catch (MyException e) {
    LOGGER.error("S'ha produït un error: ", e);
    throw e;
}
```

Si en altres nivells es fa el mateix, s'imprimirà les excepcions
diverses vegades, portant a la confusió.

-   No eliminar el stacktrace

```
try{
    ......
}catch(MyException e){
    throw new RuntimeException("S'ha produït un error: " + e.getMessage());
}
```

Aquest codi elimina el stacktrace de MyException. Es perd informació
útil sobre l'excepció. L'alternativa correcta és:

```
try{
   ...
}catch(MyException e){
   throw new RuntimeException("S'ha produït un error: ", e);
}
```

#### Evitar càlculs innecessaris

Una de les qüestions més importants del sistema de traces és el cost de
computació. Si en un moment donat es desactiven determinats nivells de
traces, encara que aquesta traça no es generi a la sortida el missatge és
avaluat (ja que es troba com un paràmetre de la crida). Si l'avaluació
del missatge comporta càlculs estem afegint un cost innecessari.

Per evitar afegir costos addicionals de còmput innecessari es recomana
prèviament comprovar que es troba activat el nivell pel qual generarem
el missatge. Així, per exemple, enlloc de:

```
LOGGER.debug("....");
```

Haurem sempre de realitzar:

```
if (LOGGER.isDebugEnabled())
LOGGER.debug("....");
```

#### Programació de traces

Com a recomanació de traces i nivell d'aquestes dins d'un mètode podrien
ser les següents:

1.  Traça a nivell debug al començament del mètode, informant els
    paràmetres d'entrada que poden arribar a ser útils per a detectar
    l'operació realitzada.
2.  Traça a nivell info informant de l'operació realitzada, si
    escau.
3.  Traça a nivell error o warn per a blocs destinats a la captura
    d'excepcions.

```
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
```

### Generar Informació Contextual

Moltes vegades no és suficient amb la informació estàndard que es mostra
a les traces i és necessari complementar-la amb informació contextual
com: usuari que fa la petició, temps d'inici i final, etc. Per afegir
aquesta informació, és necessari inicialitzar-la en algun moment de la
petició perquè estigui disponible durant tot el processament d'aquesta. Per tant, el patró de treball a seguir és:

1.  Inicialització de la informació addicional abans de processar la
    petició.
2.  Processament de la petició (utilització de la informació addicional en
    el mòdul de traces).
3.  Finalització de la petició.

**Canigó** suporta la inserció d'aquesta informació mitjançant l'extensió del filtre
LoggingFilter.
Gràcies al mètode createCustomParameters, el desenvolupador pot afegir o
eliminar paràmetres de la Mapped Diagnostic Context (MDC) de SL4J que
posteriorment seran inserits a les traces de l'aplicació.

Un exemple de filtre que afegeix informació de l'usuari, adreça i host
remot a les traces podria ser:

```
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
```

Configuració del layout per a mostrar les dades:

```
<Console name="STDOUT" target="SYSTEM_OUT">
	<PatternLayout
		pattern="%X{USERNAME}%n - %X{REMOTEHOST} - %X{REMOTEADDR} canigo Message: %d{dd MM yyyy HH:mm:ss,SSS} %-5p [%t] %-5p [%t] %c - %m%n" />
</Console>
```

## Annexos

### Introducció a Log4J2

En aquest annex s'ofereix una breu introducció a conceptes de Log4J2 que
cal entendre per utilitzar el Servei de Traces.

A Log4J2, existeixen diversos elements clau:

1.  Prioritats o nivells de les traces. Log4J2 defineix per defecte 5
    nivells: DEBUG, INFO, WARN, ERROR i FATAL. Entre ells existeix una
    jerarquia (DEBUG<INFO<WARN<ERROR<FATAL), de forma que si en
    l'aplicació s'ha configurat que només es mostrin traces de nivell
    WARN, també es mostrarien els de nivell ERROR i FATAL.
    
    ![](/related/canigo/documentacio/modul-traces/ServeiTraces_img014.jpg)
    
2.  Loggers. Els loggers donen control al programador per a
    determinar quins events requereixen ser capturats i quins no. Dins
    de l'aplicació es poden definir diferents loggers organitzats
    per jerarquia que en la majoria dels casos es mapejen amb el nom
    qualificat de les classes java, a on cada classe tindria el seu logger. 
    
3.  Appenders. Els "appenders" especifiquen a on es desarà la traça
    definida per a la categoria. Un logger pot definir diferents
    sortides o "appenders" a la vegada (consola, fitxer, correu
    electrònic, base de dades,etc.)
    
4.  Layouts. Permeten especificar com es mostren els events. Per exemple
    podem especificar que ens aparegui l'hora en la què s'ha produït
    l'event, qui ho ha llençat, la línia en la què s'ha fet, etc.