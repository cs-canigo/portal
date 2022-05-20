+++
date        = "2022-05-20"
title       = "Canigó. Actualització driver mòdul Antivirus versions < 3.6.5"
description = "Howto per a mostrar com actualitzar el driver del mòdul de l'Antivirus per a versions inferiors a Canigó 3.6.5"
#section     = "howtos"
#categories  = ["canigo"]
#key         = "JUNY2022"
+++


## Introducció

L'objectiu d'aquest article és mostrar com **actualitzar el driver del
[Mòdul d'antivirus](/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/moduls/moduls-integracio/modul-antivirus/)
per a projectes generats amb una versió del Framework Canigó inferior a la v.3.6.5**.

## Justificació

El mòdul d’integració amb l’antivirus corporatiu és un dels més utilitzats i amb més demanda els últims mesos.
L’alineament de versions del driver i el servei permet assegurar un funcionament òptim de la integració tenint en
compte que **el servei d’antivirus només dona suport a l’última versió del connector**.

D'acord amb aquesta estratègia, s'ha generat una nova versió del
[Framework Canigó v.3.6.5](/canigo-fwk-docs/documentacio-per-versions/3.6LTS/3.6.5/llistat-de-canvis/)
per a, entre d'altres, passar a fer servir la nova versió del driver java del connector del servei d'antivirus.
Per tant, els projectes creats amb el [plugin de Canigó](/canigo-download-related/plugin-canigo/) ja vindran
amb una preconfiguració a tal efecte i, en cas de plantejar l'actualització del driver a projectes existents amb Canigó
3.4 o 3.6, serà necessari seguir els passos que s'indiquen a continuació.

## Passos a seguir

Modificar l'arxiu de l'aplicació `pom.xml` per a actualitzar el driver `scanengine-api` a la versió **8.2.0**:

```xml
...
  <properties>
    ...
    <scanengine-api.version>8.2.0</scanengine-api.version>
    ...
  </properties>
  <dependencies>
    ...
    <dependency>
      <groupId>com.symantec.scanengine.api</groupId>
      <artifactId>scanengine-api</artifactId>
      <version>${scanengine-api.version}</version>
    </dependency>
    ...
  </dependencies>
...
```

## Conclusió

És possible actualitzar el driver del connector de l'antivirus a projectes existents amb Canigó 3.4 o 3.6 per a
assegurar un funcionament òptim de la integració amb el servei.