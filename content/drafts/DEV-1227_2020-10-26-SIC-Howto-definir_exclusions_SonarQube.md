+++
date        = "2022-02-01"
title       = "SIC. Com definir exclusions enviament SonarQube"
description = "Howto per a mostrar com definir exclusions a un projecte de cara a l'enviament del codi font al SonarQube"
section     = "howtos"
categories  = ["SIC"]
key         = "GENER2021"
+++

## Introducció

El SIC actualment **utilitza l'eina SonarQube de Oficina de Qualitat per a l'anàlisi estàtic del codi font dels projectes**.
Aquests projectes poden utilitzar llibreries externes o components auto-generats, per lo que el projecte no disposa de control sobre el seu contingut.
Aquest fet pot provocar que el SonarQube detecti vulnerabilitats o codi duplicat a les llibreries o al codi auto-generat, fent que fins i tot
no s'acompleixin les [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/) que s'estableixen.
Es contemplen tres tipus d'exclusions:

- **Exclusió global de l'anàlisi**, mitjançant la propietat `sonar.exclusions`,
- **Exclusió de la cobertura**, mitjançant la propietat `sonar.coverage.exclusions` i
- **Exclusió dels tests**, mitjançant la propietat `sonar.test.exclusions`

Per a cada tipus d'exclusions, es poden indicar fitxers i carpetes concrets y/o fitxers i carpetes que segueixin una determinada expressió regular.
En aquest how-to explicarem com indicar al SonarQube que no tingui en compte aquests fitxers mitjançant la definició d'exclusions del primer tipus
i utilitzarem una expressió regular per a inhibir determinades carpetes.

Per a més informació: https://docs.sonarqube.org/9.2/analysis/scan/sonarscanner-for-jenkins/.

### Exclusions projectes Maven

Per a definir una exclusió en un projecte de tipus Maven cal definir la propietat *sonar.exclusions* al fitxer `pom.xml`. Per tant, si per exemple
tenim un projecte que genera codi a partir d'un plugin de Maven que genera les classes per a un determinat client de Soap Web Services
a partir d'un Wsdl, es podria obtenir un resultat no satisfactori a la comprovació de regles del SonarQube com es pot veure a la següent imatge:

![Informe projecte](/images/howtos/SonarPropertiesMaven_inicial.png)

On podem comprovar que el codi duplicat i les vulnerabilitats provenen d'aquest codi auto-generat:

![Duplicat inicial](/images/howtos/SonarPropertiesMaven_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarPropertiesMaven_vulnerabilitats_inicial.png)

En aquest cas, hauríem d'optar per excloure les carpetes (*packages*) per tal d'eliminar aquestes anomalies. Per a fer-ho, haurem d'afegir la propietat *sonar.exclusions*
al fitxer `pom.xml` amb les corresponents expressions regulars per a indicar que aquestes quedin excloses de l'anàlisi:

```
   <properties>
      <sonar.exclusions>**/ws/**/*, **/w3/**/*</sonar.exclusions>
   </properties>
```

Un cop fet aquest canvi, l'informe resultant del projecte quedaria de la següent manera:

![Informe projecte exclusions](/images/howtos/SonarPropertiesMaven_exclusions.png)

Per a més informació: https://docs.sonarqube.org/9.2/analysis/scan/sonarscanner-for-maven/.

### Exclusions projectes Gradle i MSBuild

En cas de tractar-se d'un projecte de Gradle o MSBuild, aplicaria homòlogament lo descrit per al cas de projectes Maven però fent ús dels fitxers `build.gradle` i `.csproj` respectivament.

Per a més informació:

- https://docs.sonarqube.org/9.2/analysis/scan/sonarscanner-for-gradle/
- https://docs.sonarqube.org/9.2/analysis/scan/sonarscanner-for-msbuild/

### Exclusions per la resta de projectes

En els casos que no es tracti d'un projecte de tipus Maven, Gradle o .Net (on es poden utilitzar els fitxers propis de definició del projecte)
s'hauria d'optar per definir les propietats pel client de SonarScanner mitjançant el fitxer `sonar-project.properties`.
Per tant, si per exemple tenim un projecte amb una carpeta *lib* que conté llibreries externes, es podria obtenir
un resultat no satisfactori a la comprovació de regles del SonarQube com es pot veure a la següent imatge:

![Informe projecte](/images/howtos/SonarProperties_inicial.png)

On podem comprovar que el codi duplicat i les vulnerabilitats provenen d'aquestes llibreries:

![Duplicat inicial](/images/howtos/SonarProperties_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarProperties_vulnerabilitats_inicial.png)

En aquest cas, hauríem d'optar per excloure la carpeta *lib* per tal d'eliminar aquestes anomalies. Per a fer-ho, haurem de crear un fitxer de propietats a l'arrel del projecte anomenat
`sonar-project.properties` i afegirem la propietat *sonar.exclusions* amb l’expressió regular /lib/**, de forma que  tota la carpeta *lib* i subcarpetes quedin excloses de l'anàlisi:

```
sonar.exclusions=/lib/**
```

Un cop fet aquest canvi, l'informe resultant del projecte quedaria de la següent manera:

![Informe projecte exclusions](/images/howtos/SonarProperties_exclusions.png)

Per a més informació: https://docs.sonarqube.org/9.2/analysis/scan/sonarscanner/
