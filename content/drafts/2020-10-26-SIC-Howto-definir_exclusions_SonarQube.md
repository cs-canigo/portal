+++
date        = "2020-10-27"
title       = "Definir exclusions projecte SonarQube"
description = "Howto per a mostrar com definir exclusions a un projecte de cara a l'enviament del codi font al SonarQube"
section     = "howtos"
categories  = ["SIC"]
#key        = "NOVEMBRE2020"
+++

## Introducció

El SIC actualment **utilitza el SonarQube de Oficina de Qualitat per a l'anàlisi estàtic del codi font dels projectes**.
Aquests projectes poden utilitzar llibreries externes o components auto-generats, per lo que el projecte no disposa de control sobre el seu contingut.
Aquest fet pot provocar que el SonarQube detecti vulnerabilitats o codi duplicat a les llibreries o al codi auto-generat, fent que fins i tot
no s'acompleixin les [Quality Gates](https://qualitat.solucions.gencat.cat/eines/sonarqube/) establertes.

Es contemplen tres tipus d'exclusions:

- **Exclusió global de l'anàlisi** mitjançant la propietat `sonar.exclusions`
- **Exclusió de la cobertura** mitjançant la propietat `sonar.coverage.exclusions`
- **Exclusió dels tests** mitjançant la propietat `sonar.test.exclusions`

Per a cada tipus d'exclusions, es poden indicar fitxers i carpetes en concret, i/o fitxers i carpetes que segueixin una determinada expressió regular.

En aquest how-to explicarem com indicar-li al SonarQube que no tingui en compte aquests fitxers mitjançant la definició d'exclusions del primer tipus
i utilitzarem una expressió regular per a excloure determinades carpetes.

### Exclusions projectes Maven

En cas de tractar-se d'un projecte de tipus Maven, per a definir una exclusió cal definir la propietat *sonar.exclusions* al fitxer `pom.xml`.

Per tant, si, per exemple, tenim un projecte que genera codi a partir d'un plugin de Maven per a generar les classes per a un client de Soap Web Services de forma que, a partir d'un Wsdl,
es generen les classes del client, es podria obtenir un resultat no satisfactori a la comprovació de regles del SonarQube com es pot veure a la imatge següent:

![Informe projecte](/images/howtos/SonarPropertiesMaven_inicial.png)

On podem comprovar que el codi duplicat i les vulnerabilitats provenen d'aquest codi auto-generat:

![Duplicat inicial](/images/howtos/SonarPropertiesMaven_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarPropertiesMaven_vulnerabilitats_inicial.png)

Hauríem d'optar per excloure les carpetes (*packages*) per tal d'eliminar aquestes anomalies. Per a fer-ho, haurem d'afegir la propietat *sonar.exclusions*
al fitxer `pom.xml` amb les corresponents expressions regulars per a indicar que quedin excloses de l'anàlisi.

```
   <properties>
      <sonar.exclusions>**/ws/**/*, **/w3/**/*</sonar.exclusions>
   </properties>
```

Un cop fet aquest canvi, l'informe resultant del projecte quedaria de la següent manera:

![Informe projecte exclusions](/images/howtos/SonarPropertiesMaven_exclusions.png)

### Exclusions projectes Gradle i .Net

En cas de tractar-se d'un projecte de Gradle o .Net, aplicaria homòlogament lo descrit per al cas de projectes Maven però fent ús dels fitxers `build.gradle` i `.csproj respectivament`.

### Exclusions al fitxer `sonar-project.properties`

En els casos que no es tracti d'un projecte de tipus Maven, Gradle o .Net, on es poden utilitzar els fitxers propis de definició del projecte,
s'hauria d'optar per definir les propietats pel client de SonarScanner mitjançant el fitxer `sonar-project.properties`.

Per tant, si, per exemple, tenim un projecte amb una carpeta *lib* que conté llibreries externes i aquest fet genera resultats no satisfactoris a la comprovació
de regles del SonarQube com es pot veure a la imatge següent:

![Informe projecte](/images/howtos/SonarProperties_inicial.png)

On podem comprovar que el codi duplicat i les vulnerabilitats provenen d'aquestes llibreries:

![Duplicat inicial](/images/howtos/SonarProperties_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarProperties_vulnerabilitats_inicial.png)

Hauríem d'optar per excloure la carpeta *lib* per tal d'eliminar aquestes anomalies. Per a fer-ho, haurem de crear un fitxer de propietats a l'arrel del projecte anomenat
`sonar-project.properties` i afegir la propietat *sonar.exclusions* amb l’expressió regular /lib/**, de forma que  tota la carpeta *lib* i subcarpetes quedin excloses de l'anàlisi.

```
sonar.exclusions=/lib/**
```

Un cop fet aquest canvi, l'informe resultant del projecte quedaria de la següent manera:

![Informe projecte exclusions](/images/howtos/SonarProperties_exclusions.png)