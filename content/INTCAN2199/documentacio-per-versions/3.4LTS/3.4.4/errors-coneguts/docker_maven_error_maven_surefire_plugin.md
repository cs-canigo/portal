+++
date        = "2020-02-10"
title       = "Error al construir amb docker maven si s'utilitza plugin maven surfire"
description = "Error al realitzar la construcció d'una aplicació amb el docker maven si aquesta utilitza el plugin maven surfire"
sections    = "Canigó. Documentació versió 3.x"
weight      = 2
+++

## Introducció al problema

Per a la construcció d'una aplicació, i sobretot amb estratègies DevOps, si l'aplicació és de tipus Maven amb Java, s'utilitzen les imatges docker amb Maven i JDK. Aquestes et permeten construir el projecte i empaquetar-lo sense haver de tenir configurat el maven i la JDK. Les imatges maven oficials es poden trobar a:

https://docs.docker.com/docker-hub/official_images/

Les aplicacions Canigó utilitzen el [plugin de maven surfire](http://maven.apache.org/surefire/maven-surefire-plugin/). Amb aquest plugin ens permet indicar quins tests volem que s'executin i incorporar tests de mòduls depenents. Aquest plugin ve incorporat dins de canigo.root, per tant, si l'aplicació hereta de canigo.root, utilitza aquest plugin per passar els tests.

S'ha comprovat que amb la versió de la imatge de docker 3.5.4-jdk-8, 3.5.4-jdk-9 i 3.5.4-jdk-10 de maven i la versió 2.19.1 del plugin de maven surefire, s'obté un error al executar els tests


## Detall del problema

Partim d'una aplicació amb Canigó, que hereta de canigo.root i per tant incorpora el plugin de maven surefire versió 2.19.1. Si en aquesta aplicació li incorporem tests i construïm l’aplicació amb la imatge de docker de maven versió 3.5.4-jdk-8, 3.5.4-jdk-9 i 3.5.4-jdk-10, executant per exemple en el cas de 3.5.4-jdk-8:

 ```
 docker run -v $PWD:/src -w "/src" maven:3.5.4-jdk-8 mvn clean package
 ```

Al intentar executar els tests de l'aplicació dona un error del tipus:
 
 ```
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ BinarisApp ---
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 9.013 s
[INFO] Finished at: 2020-02-10T12:21:12Z
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:2.19.1:test (default-test) on project BinarisApp: There are test failures.
[ERROR] 
[ERROR] Please refer to /src/target/surefire-reports for the individual test results.
[ERROR] Please refer to dump files (if any exist) [date].dump, [date]-jvmRun[N].dump and [date].dumpstream.
[ERROR] The forked VM terminated without properly saying goodbye. VM crash or System.exit called?
[ERROR] Command was /bin/sh -c cd /src && /usr/lib/jvm/java-10-openjdk-amd64/bin/java -jar /src/target/surefire/surefirebooter12081133764758686654.jar /src/target/surefire 2020-02-10T12-21-12_164-jvmRun1 surefire3487392638308646192tmp surefire_0301742977522178285tmp
[ERROR] Error occurred in starting fork, check output in log
[ERROR] Process Exit Code: 1
[ERROR] org.apache.maven.surefire.booter.SurefireBooterForkException: The forked VM terminated without properly saying goodbye. VM crash or System.exit called?
[ERROR] Command was /bin/sh -c cd /src && /usr/lib/jvm/java-10-openjdk-amd64/bin/java -jar /src/target/surefire/surefirebooter12081133764758686654.jar /src/target/surefire 2020-02-10T12-21-12_164-jvmRun1 surefire3487392638308646192tmp surefire_0301742977522178285tmp
[ERROR] Error occurred in starting fork, check output in log
[ERROR] Process Exit Code: 1
[ERROR] 	at org.apache.maven.plugin.surefire.booterclient.ForkStarter.fork(ForkStarter.java:669)
[ERROR] 	at org.apache.maven.plugin.surefire.booterclient.ForkStarter.run(ForkStarter.java:282)
[ERROR] 	at org.apache.maven.plugin.surefire.booterclient.ForkStarter.run(ForkStarter.java:245)
[ERROR] 	at org.apache.maven.plugin.surefire.AbstractSurefireMojo.executeProvider(AbstractSurefireMojo.java:1183)
[ERROR] 	at org.apache.maven.plugin.surefire.AbstractSurefireMojo.executeAfterPreconditionsChecked(AbstractSurefireMojo.java:1011)
[ERROR] 	at org.apache.maven.plugin.surefire.AbstractSurefireMojo.execute(AbstractSurefireMojo.java:857)
[ERROR] 	at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo(DefaultBuildPluginManager.java:137)
[ERROR] 	at org.apache.maven.lifecycle.internal.MojoExecutor.execute(MojoExecutor.java:208)
[ERROR] 	at org.apache.maven.lifecycle.internal.MojoExecutor.execute(MojoExecutor.java:154)
[ERROR] 	at org.apache.maven.lifecycle.internal.MojoExecutor.execute(MojoExecutor.java:146)
[ERROR] 	at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject(LifecycleModuleBuilder.java:117)
[ERROR] 	at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject(LifecycleModuleBuilder.java:81)
[ERROR] 	at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build(SingleThreadedBuilder.java:56)
[ERROR] 	at org.apache.maven.lifecycle.internal.LifecycleStarter.execute(LifecycleStarter.java:128)
[ERROR] 	at org.apache.maven.DefaultMaven.doExecute(DefaultMaven.java:305)
[ERROR] 	at org.apache.maven.DefaultMaven.doExecute(DefaultMaven.java:192)
[ERROR] 	at org.apache.maven.DefaultMaven.execute(DefaultMaven.java:105)
[ERROR] 	at org.apache.maven.cli.MavenCli.execute(MavenCli.java:954)
[ERROR] 	at org.apache.maven.cli.MavenCli.doMain(MavenCli.java:288)
[ERROR] 	at org.apache.maven.cli.MavenCli.main(MavenCli.java:192)
[ERROR] 	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
[ERROR] 	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
[ERROR] 	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
[ERROR] 	at java.base/java.lang.reflect.Method.invoke(Method.java:564)
[ERROR] 	at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced(Launcher.java:289)
[ERROR] 	at org.codehaus.plexus.classworlds.launcher.Launcher.launch(Launcher.java:229)
[ERROR] 	at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode(Launcher.java:415)
[ERROR] 	at org.codehaus.plexus.classworlds.launcher.Launcher.main(Launcher.java:356)
[ERROR] 
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
 ```

## Solució al problema

### Solució 1 

Si és possible, utilitzar una versió de JDK superior. A partir de la versió 11 de la JDK de la imatge docker Maven, el problema no es produeix, així per exemple:

Enlloc de:
 ```
 docker run -v $PWD:/src -w "/src" maven:3.5.4-jdk-8 mvn clean package
 ```
 
Utilitzem:
 ```
 docker run -v $PWD:/src -w "/src" maven:3.5.4-jdk-11 mvn clean package
 ```

### Solució 2

Deshabilitar el class loader de sistema del maven surefire, per això afegirem dins de la secció plugins del pom.xml del projecte:

 ```xml
<plugin>
		<artifactId>maven-surefire-plugin</artifactId>
		<configuration>
			<useSystemClassLoader>false</useSystemClassLoader>
		</configuration>
</plugin>
```

Amb aquesta solució utilitzarem un class loader aïllat, enlloc d'executar l'aplicació directament. Aquesta solució pot ser un problema si s'utilitzen propietats com *java.class.path*

### Solució 3

Deshabiltiar la creació de l'aplicació en paral·lel, per això afegirem dins de la secció plugins del pom.xml del projecte:
 
 ```xml
<plugin>
		<artifactId>maven-surefire-plugin</artifactId>
		<configuration>
			<forkCount>0</forkCount>
		</configuration>
</plugin>
```

Amb aquesta solució estem indicant que no executi els tests en màquines virtuals concurrents, amb la penalització de temps que això pot suposar

## Conclusió

Si no estem utilitzant propietats de sistema o càrrega de classes de diferents class loaders, la millor solució és la solució 2

Si no ens interessa l'execució de test en paral·lel, la millor solució és la solució 3

Si necessitem utilitzar propietats de sistema o càrrega de classes de diferents class loaders i volem executar els tests en paral·lel l'única solució que tenim és utilitzar una versió de JDK superior. Així podríem tenir la JDK del projecte per compilar, per exemple la JDK8 i utilitzar una JDK superior per passar els test, per exemple utilitzar la JDK 11

## Referència

- [Bug registrat a les imatges docker Maven](https://github.com/carlossg/docker-maven/issues/90)
- [Bug registrat al Maven Surefire](https://issues.apache.org/jira/browse/SUREFIRE-1588)

Si necessiteu més informació, podeu obrir tiquet via [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) o, en cas de no disposar de permisos d’accés, enviar un correu a la bústia del CS Canigó (oficina-tecnica.canigo.ctti@gencat.cat).
