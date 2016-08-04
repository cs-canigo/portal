+++
date = "2015-04-02T12:49:43+02:00"
title       = "Planificador de tasques"
description = "Planificador de tasques"
sections    = "Canigó. Documentació versió 3.x"
weight      = 1
+++

## Propòsit

El propòsit d'aquest apartat es introduir al desenvolupador a la planificació de tasques mitjançant Quartz.

Quartz permet l'execució de tasques de forma diferida:

* en qualsevol moment del dia (precisió de milisegons)
* en alguns dies de la setmana
* en alguns dies del mes
* en alguns dies de l'any
* un número específic de repeticions
* repetidament fins a una data/instant determinat
* repetida e indefinidament
* repetidament en un determinat interval de temps

Documents i Fonts de Referència

Referència                       | URL
-------------------------------- | ----
Quartz                           | http://www.quartz-scheduler.org/
Spring 4 + Quartz                | http://static.springsource.org/spring/docs/4.1.0.RELEASE/spring-framework-reference/html/scheduling.html#scheduling-quartz
Guia migració Quartz 1.8.x a 2.0 | http://www.quartz-scheduler.org/documentation/quartz-2.x/migration-guide

## Glossari

**Job**

Un Job o tasca és simplement la referència a la classe que conté el mètode que volem executar de forma diferida.

**Trigger**

Un objecte de tipus Trigger s'utilitza per llençar l'execució dels Jobs o tasques. Quan es vol programar una tasca, s'intancia un Trigger i configures les seves propietats per tal de proporcionar la programació d'execució (interval d'execució, número de repeticions, timeout, etc..).

**SchedulerFactory**

Objecte que s'encarrega d'instanciar el programador o scheduler que s'encarregarà de gestionar l'execució de les tasques.

## Instal.lació i Configuració

### Instal.lació

Per tal d'instal-lar Quartz es necessari afegir manualment en el pom.xml de l'aplicació la següent dependència:

```
<org.opensymphony.quartz.version>2.2.1</org.opensymphony.quartz.version>
<commons.collections.version>4.0</commons.collections.version>
<org.springframework.versionn>4.1.0.RELEASE</org.springframework.version>

<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz</artifactId>
    <version>${org.opensymphony.quartz.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context-support</artifactId>
    <version>${org.springframework.version}</version>
</dependency><!-- Només per clustering Oracle -->
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz-oracle</artifactId>
    <version>${org.opensymphony.quartz.version}</version>
</dependency>
<!-- Només per a Weblogic -->
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz-weblogic</artifactId>
    <version>${org.opensymphony.quartz.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-collections4</artifactId>
	<version>${commons.collections.version}</version>
</dependency>
<dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>${org.springframework.version}</version>
</dependency>
```

### Configuració

La configuració del servei de planificació de tasques es pot dividir en dos punts:

* Definició dels xmls (o anotacions) de Spring que s'encarregen de la inicialització dels beans de Quartz.
* Externalització de les propietats d'aquest beans.
    	
<div class="message information">
IMPORTANT: <br>
Per a entorns clusteritzats revisar l'apartat de Preguntes freqüents.
</div>

#### Definició dels xmls de Spring

Ubicació: <PROJECT_ROOT>/src/main/resources/spring/quartz-config.xml

La configuració del planificador de tasques Quartz implica 3 pasos:

* Definir les tasques que volem executar de forma diferida
* Definir els triggers que defineixen en quin moment s'executaran les tasques
* Definir la factoria per executar les tasques amb els triggers

#### Configuració dels arxius de propietats

Ubicació: <PROJECT_ROOT>/src/main/resources/config/props/planificador.properties

Dins d'aquest arxiu romandrien les propietats dels Jobs, Triggers, Scheduler, etc.

Exemple d'arxiu de propietats:

```
*.quartz.repeatInterval=2000
*.quartz.autoStartup=false
*.quartz.concurrent=true
```

## Utilització del Mòdul


En aquest exemple es configura una tasca que es repeteix cada dos segons amb el work manager per defecte de Quartz.

**quartz-config.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.1.xsd">

	<bean id="salutacio" class="springapp.web.vo.Salutacio"/>

        <bean id="unaTasca"
             class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
		<property name="targetObject" 	ref="salutacio" />
		<property name="targetMethod" 	value="saludar" />
		<property name="concurrent" 	value="${quartz.concurrent}" />
	</bean>

	<bean id="simpleTrigger" class="org.springframework.scheduling.quartz.SimpleTriggerBean">
		<property name="jobDetail" ref="unaTasca" />
		<property name="repeatInterval" value="${quartz.repeatInterval}" />
	</bean>

	<bean id="schedulerFactoryBean"
             class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
		<property name="autoStartup" value="${quartz.autoStartup}" />
		<property name="triggers">
			<list>
				<ref bean="simpleTrigger" />
			</list>
		</property>
	</bean>

</beans>
```

<div class="message warning">
Workmanager per defecte

Per defecte de Quartz gestiona l'execució de les tasques amb el seu pròpi workmanager. Aquest motor per defecte s'encarrega de gestionar els diferents "threads" o fils d'execució de les tasques planificades de manera autònoma sense que el servidor d'aplicacions tingui constància d'aquests "threads" oberts.
En entorns productius s'ha pogut observar com en algunes situacions el motor no allibera correctament aquests "threads" de la VM, lo que pot provocar la degradació del sistema o en el pitjor dels casos, la seva indisponibilitat.

Per evitar aquest tipus de situacions es recomenable que llegiu l'apartat de Recomanacions.
</div>

## Recomanacions

Com a alternativa al workmanager per defecte de "Quartz", i amb la idea de que sigui el servidor d'aplicacions qui gestioni els threads de Quartz, a continuació es descriu un exemple de configuració per a utilitzar la implementació de "Commonj".

### Configuració per a servidors d'aplicacions Weblogic

Per canviar el WorkManager per defecte per el de "Commonj" a servidors d'aplicacions Weblogic, es necessari realitzar les següents accions:

* Modificar el taskexecutor del SchedulerFactoryBean.
* Modificar web.xml per afegir una referència local al "WorkManager".
* Modificar weblogic.xml per crear un "WorkManager".

### Modificar el taskexecutor del SchedulerFactoryBean

Per sobrescriure el "taskexecutor" per defecte de "Quartz", s'ha de modificar el SchedulerFactoryBean per instanciar el nou "TaskExecutor", aquest informarà les següents propietats:

* workManagerName: Nom JNDI del WorkManager JCA.
* resourceRef: Indica si la cerca del nom JNDI es realitza en un contenidor J2EE.

```
<!-- Planificador amb l'engine de commonj -->
<bean id="schedulerFactoryBeanCommonj"
      class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
    <property name="autoStartup" value="false" />
    <property name="triggers">
        <list>
            <ref bean="simpleTrigger" />
        </list>
    </property>
    <property name="taskExecutor" ref="taskExecutor"/>
</bean>
<bean id="taskExecutor"
      class="org.springframework.scheduling.commonj.WorkManagerTaskExecutor">
    <property name="workManagerName" value="appWorkManager" />
    <property name="resourceRef" value="true" />
</bean>
```

### Modificar web.xml per afegir una referència local al "WorkManager"

Modificar l'arxiu "web.xml" per afegir una referència local al "WorkManager" que posteriorment es definirà al "weblogic.xml":

```
...
<resource-ref>
	<res-ref-name>appWorkManager</res-ref-name>
	<res-type>commonj.work.WorkManager</res-type>
	<res-auth>Container</res-auth>
	<res-sharing-scope>Shareable</res-sharing-scope>
</resource-ref>
...
```

### Modificar weblogic.xml per crear un "WorkManager"

Finalment cal registrar un "WorkManager" aplicatiu al servidor d'aplicacions mitjançant l'arxiu "weblogic.xml". En l'exemple es registra un "WorkManager" que com a màxim pot executar 3 "threads" concurrents.

```
<?xml version="1.0" encoding="UTF-8"?>
<weblogic-web-app xmlns="http://www.bea.com/ns/weblogic/90"
	xmlns:j2ee="http://java.sun.com/xml/ns/j2ee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.bea.com/ns/weblogic/90
                           http://www.bea.com/ns/weblogic/90/weblogic-web-app.xsd">

	<work-manager>
		<name>appWorkManager</name>
		<max-threads-constraint>
			<name>appWorkManager</name>
			<count>3</count>
		</max-threads-constraint>
	</work-manager>
</weblogic-web-app>
```

### Configuració per a servidors d'aplicacions Tomcat

Per canviar el WorkManager per defecte per el de "Commonj" per a servidors d'aplicacions Tomcat es necessari realitzar les següents accions:

* Afegir les llibreries de Commonj.
* Modificar el taskexecutor del SchedulerFactoryBean.
* Modificar web.xml per afegir una referència local al "WorkManager".
* Crear el "WorkManager" al context.xml de Tomcat.

### Afegir les llibreries de Commonj

Cal verificar que les llibreries de Commonj estiguin incloses dins la carpeta de llibreries compartides de Tomcat o bé dins l'aplicació que les farà servir:

* Si es volen afegir directament com a llibreries compartides de Tomcat, cal afegir a $TOMCAT_HOME/lib les llibreries commonj-twm.jar i foo-commonj-1.1.0.jar . Aquestes es poden trobar dins la carpeta \foo-commonj-1.1.0\lib del zip que es pot descarregar de la web oficial
* Si es volen afegir al projecte Canigó3, cal afegir les següents dependències Maven al pom.xml:

```
<dependency>
    <groupId>com.bea.wlplatform</groupId>
    <artifactId>commonj-twm</artifactId>
    <version>1.1</version>
</dependency>
<dependency>
    <groupId>com.bea.wlplatform</groupId>
    <artifactId>foo-commonj</artifactId>
    <version>1.1.0</version>
</dependency>
```

### Modificar el taskexecutor del SchedulerFactoryBean

Per sobrescriure el "taskexecutor" per defecte de "Quartz", s'ha de modificar el SchedulerFactoryBean per instanciar el nou "TaskExecutor", aquest informarà les següents propietats:

* workManagerName: Nom JNDI del WorkManager JCA.
* resourceRef: Indica si la cerca del nom JNDI es realitza en un contenidor J2EE.

```
<!-- Planificador amb l'engine de commonj -->
<bean id="schedulerFactoryBeanCommonj"
      class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
    <property name="autoStartup" value="false" />
    <property name="triggers">
        <list>
            <ref bean="simpleTrigger" />
        </list>
    </property>
    <property name="taskExecutor" ref="taskExecutor"/>
</bean>
<bean id="taskExecutor"
      class="org.springframework.scheduling.commonj.WorkManagerTaskExecutor">
    <property name="workManagerName" value="wm/appWorkManager" />
    <property name="resourceRef" value="true" />
</bean>
```

### Modificar web.xml per afegir una referència local al "WorkManager"

Modificar l'arxiu "web.xml" per afegir una referència local al "WorkManager" que posteriorment es definirà al "weblogic.xml":

```
...
<resource-ref>
	<res-ref-name>wm/appWorkManager</res-ref-name>
	<res-type>commonj.work.WorkManager</res-type>
	<res-auth>Container</res-auth>
	<res-sharing-scope>Shareable</res-sharing-scope>
</resource-ref>
...
```

### Crear el "WorkManager" al context.xml de Tomcat

Finalment cal registrar un "WorkManager" aplicatiu al servidor d'aplicacions. En aquest cas caldría afegir-ho al fitxer $TOMCAT_HOME/conf/context.xml. En l'exemple es registra un "WorkManager" que com a màxim pot executar 3 "threads" concurrents.

```
...
<Resource name="wm/appWorkManager"
	auth="Container"
	factory="de.myfoo.commonj.work.FooWorkManagerFactory" 
	type="commonj.work.WorkManager"
	maxThreads="3"/>
...
```

Alguns dels paràmetres de configuració i tunning del "WorkManager" es poden trobar a la següent adreça:
http://download.oracle.com/docs/cd/E11035_01/wls100/config_wls/self_tuned.html

## Preguntes freqüents

### Utilització de Quartz en un cluster

La principal problemàtica del planificador de tasques en un cluster és l'execució del planificador en cadascuna de les màquines de forma independent. Si l'aplicació es troba en un cluster i no es gestiona aquesta problemàtica, la tasca s'executarà tants cops com nodes al cluster tinguessim.

Per solventar aquest problema, Quartz proporciona una solució basada en una base de dades centralitzada que funciona com a semàfor d'execució dels diferents Jobs.

### Configuració

La configuració consta de dos passos:

1. Crear les taules a partir dels scripts proporcionats per Quartz. Els pots trobar al directori: quartz\docs\dbTables directory.
2. Crear el arxiu de propietats quartz.properties a l'arrel de l'aplicació. src/main/resources/quartz.properties

```
#============================================================================
# Configure Main Scheduler Properties
#============================================================================
org.quartz.scheduler.instanceName = MyClusteredScheduler
org.quartz.scheduler.instanceId = AUTO
#============================================================================
# Configure ThreadPool
#============================================================================
org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool
org.quartz.threadPool.threadCount = 25
org.quartz.threadPool.threadPriority = 5
#============================================================================
# Configure JobStore
#============================================================================
org.quartz.jobStore.misfireThreshold = 60000
org.quartz.jobStore.class = org.quartz.impl.jdbcjobstore.JobStoreTX
org.quartz.jobStore.driverDelegateClass = org.quartz.impl.jdbcjobstore.oracle.OracleDelegate
org.quartz.jobStore.useProperties = false
org.quartz.jobStore.dataSource = myDS
org.quartz.jobStore.tablePrefix = QRTZ_

org.quartz.jobStore.isClustered = true
org.quartz.jobStore.clusterCheckinInterval = 20000
#============================================================================
# Configure Datasources
#============================================================================
#org.quartz.dataSource.myDS.driver = oracle.jdbc.driver.OracleDriver
#org.quartz.dataSource.myDS.URL = jdbc:oracle:thin:@localhost:1521:orcl
#org.quartz.dataSource.myDS.user = scott
#org.quartz.dataSource.myDS.password = tiger
#org.quartz.dataSource.myDS.maxConnections = 5
#org.quartz.dataSource.myDS.validationQuery=select 0 from dual
#============================================================================
# Configure Datasources JNDI
#============================================================================
org.quartz.dataSource.myDS.jndiURL=jdbc/myDataSource
org.quartz.dataSource.myDS.java.naming.factory.initial=com.evermind.server.rmi.RMIInitialContextFactory
org.quartz.dataSource.myDS.java.naming.provider.url=ormi://localhost
org.quartz.dataSource.myDS.java.naming.security.principal=admin
org.quartz.dataSource.myDS.java.naming.security.credentials=123
```

Més informació a:

http://www.quartz-scheduler.org/documentation/quartz-2.x/configuration/ConfigJDBCJobStoreClustering
