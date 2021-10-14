+++
date        = "2021-10-14"
title       = "Canigó. Com crear projectes amb Canigó 3.4 manualment"
description = "Com crear projectes amb Canigó 3.4 manualment sense el plugin del eclipse de Canigó"
section     = "howtos"
categories  = ["canigo"]
#key         = "NOVEMBRE2021"
+++


## Introducció

L'objectiu d'aquest article és mostrar com genrar projectes amb Canigó 3.4 manualment sense la utilització del [plugin del eclipse de Canigó](/canigo-download-related/plugin-canigo/).

## Justificació

Properament Canigó 3.4 deixarà de tenir suport, podeu consultar el [Roadmap de Canigo](/canigo/roadmap/), i la versió amb suport serà la Canigó 3.6, però un projecte pot tenir la necessitat de crear un projecte amb Canigó 3.4 i no amb Canigó 3.6. UNa vegada publicat el Canigó 3.6, el plugin del eclipse només generarà projecte per aquesta versió, per tant, si algun projecte té la necessitat de crear projecte amb Canigó 3.4 podrà utilitzar aquesta guia per a generar projectes amb Canigó 3.4 manualment sense el plugin de l'eclipse de Canigó.

## Creació de projecte

El plugin del eclipse utilitza l'archetype maven per generar els projectes amb canigó. Per a crear el projecte amb Canigó 3.4 sense utilitzar el plugin del eclipse de Canigó utilitzarem l'archetype maven.

La versió de l'archetype maven de Canigó per generar projectes amb Canigó 3.4 és `1.6.7`, així si utilitzem l'execució de maven:

```
mvn archetype:generate -DarchetypeGroupId=cat.gencat.ctti -DarchetypeArtifactId=plugin-canigo-archetype-rest -DarchetypeVersion=1.6.7 -DartifactId=NomProjecte -DgroupId=cat.gencat.ctti -Dversion=1.0.0 -B
```

On els paràmetres:

- -DartifactId: indica el nom del artifact del projecte que volem crear

- -DgroupId: indica el nom del group del projecte que volem crear

- -Dversion: indica la versió del projecte que volem crear

- -B: indica que volem generar el projecte amb batch, és a dir, que no ens pregunti i crei el projecte directament

Crearà un projecte amb Canigó 3.4

Una vegada creat el projecte, podeu incorporar els mòduls de Canigó manualment tal i com es detalla a cada mòdul en la [documentació de Canigó](/canigo-documentacio-versions-3x/), tenint en compte el rang de versions dels mòduls per a Canigó 3.4, consultant la [matriu de compatibilitats](/canigo-download-related/matrius-compatibilitats/)

## Documentació

- Per a més informació sobre el archetype de maven podeu consultar: https://maven.apache.org/guides/introduction/introduction-to-archetypes.html
