+++
date        = "2020-10-26"
title       = "Afegir exclusions projecte SonarQube"
description = "Howto per mostrar com afegir exclusions a un projecte a enviar al SonarQube"
section     = "howtos"
categories  = ["SIC"]
#key        = "JUNY2019"
+++

## Introducció

El SIC actualment utilitza el SonarQube de OQUAL per a l'anàlisis estàtic de codi d'un projecte. Aquest projecte pot utilitzar llibrerires externes o components autogenerats els quals no es té control del seu contingut des del projecte. Així, es pot donar el cas que el SonarQube detecti vulnerabilitats o codi duplicat a les llibreries o al codi autogenerat, fent que fins i tot no es passi la quality gate definida a OQUAL. Per a indicar-li al SonarQube que no tingui en compte aquests fitxers és necessari definir exclusions.

## Exclusions

En un projecte a enviar al SonarQube hi ha 3 tipus d'exclusions:

- Exclusió global de l'anàlisis (propietat sonar.exclusions)
- Exclusió de la cobertura (propietat sonar.coverage.exclusions)
- Exclusió dels tests (propietat sonar.test.exclusions)

Podent definir per cada una de les exclusions, fitxers en concrets, fitxers que segueixin una expresió regular, carpetes en concret i/o carpetes que segueixin una expresió regular.

En aquest howto ens centrarem amb el tipus exclusió de l'anàlisis i utilitzarem una expresió regular per excloure una carpeta que segueixi una expresió regular determinada

### Exclusions al sonar.properties

Si un projecte no és de tipus maven, gradle o .Net on es poden utilitzar els propis fitxers de definició del projecte (pom.xml, build.gradle, .csproj), es poden definir les propietats pel client de SonarQube al fitxer **sonar-project.properties**

Així si per exemple tenim un projecte amb una carpeta *lib* on hi conté llibreries externes i genera soroll al informe del projecte en el SonarQube:

![Informe projecte](/images/howtos/SonarProperties_inicial.png)

On veiem que del codi duplicat i de les vulerabilitats venen de les llibreries externes de la carpeta *lib*:

![Duplicat inicial](/images/howtos/SonarProperties_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarProperties_vulnerabilitats_inicial.png)

Podriem excloure la carpeta *lib* per eliminar aquest soroll, per això afegirem un fitxer de propietats a l'arrel del projecte anomenat *sonar-project.properties* i afegirem la propietat *sonar.exclusions* amb l'expresió regular * /lib/** *, així tota la carpeta *lib* i subcarpetes quedaran excloses de l'informe al SonarQube:
```
sonar.exclusions=/lib/**
```

L'informe del projecte quedaria:

![Informe projecte exclusions](/images/howtos/SonarProperties_exclusions.png)


### Exclusions al pom.xml

Si un projecte és de tipus maven (aquest exemple aplicaria homòlogament per casos amb gradle i .net amb els fitxers build.gradle i .csproj), per a afegir una exclusió, és necessari definir la propietat *sonar.exclusions* en el fitxer pom.xml

Així, si tenim un projecte que genera codi a partir d'un plugin de maven, per, per exemple, generar les classes per un client de web service soap, on, a partir d'un wsdl, generem les classes del client, podria obtenir un informe com:

![Informe projecte](/images/howtos/SonarPropertiesMaven_inicial.png)

On veiem que l'informe de codi duplicat i de les vulerabilitats venen del codi autogenerat:

![Duplicat inicial](/images/howtos/SonarPropertiesMaven_duplicitat_inicial.png)
![Vulnerabilitats inicial](/images/howtos/SonarPropertiesMaven_vulnerabilitats_inicial.png)

Afegint la propietat *sonar.exclusions* en el fitxer pom.xml, indicant expresions regulars per indicar que les carpetes (package) s'excloguin del informe del SonarQube:

```
	<properties>
		<sonar.exclusions>**/ws/**/*, **/w3/**/*</sonar.exclusions>
	</properties>
```

L'informe del projecte quedaria:

![Informe projecte exclusions](/images/howtos/SonarPropertiesMaven_exclusions.png)
