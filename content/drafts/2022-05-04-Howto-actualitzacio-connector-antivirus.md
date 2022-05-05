+++
date        = "2022-05-01"
title       = "Canigó. Actualització driver del mòdul Antivirus per a versions < 3.6.5"
description = "Howto per a mostrar com actualitzar el driver del mòdul de l'Antivirus per a versions anteriors a Canigó 3.6.5"
section     = "howtos"
categories  = ["canigo"]
key         = "MAIG2022"
+++


## Introducció

L'objectiu d'aquest article és mostrar com actualitzar el driver del mòdul de l'Antivirus per a projectes que utilitzen Canigó < 3.6.5

## Justificació

S'ha actualitzat el Framework Canigó per fer servir la nova versió del driver java del connector del servei d'antivirus.

Els projectes creats amb el Plugin Canigó des de la versió 3.6.5 ja estaran configurats a tal efecte.

Per a fer servir aquesta última versió del driver de l'Antivirus sense actualitzar la versió de Canigó, és necessari cambiar la configuració al fitxer pom.xml

Aquest canvi és aplicable a versions Canigó anteriors a 3.6.5, és a dir, 3.6.x i 3.4.x


## Passos a seguir

### Modificar l'arxiu: `pom.xml`

Es requereix configurar scanengine-api a la versió **8.2.0**.

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

És possible actualitzar el driver del connector de l'antivirus sense actualitzar la versió del Framework Canigó, inclús sense actualitzar la versió del Mòdul d'Antivius.
