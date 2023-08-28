+++
date        = "2021-12-17"
title       = "Canigó. Com crear manualment projectes amb Canigó 3.4"
description = "Com crear projectes amb Canigó 3.4 de forma manual sense fer ús del Plugin de Canigó"
section     = "howtos"
categories  = ["canigo"]
#key         = "NOVEMBRE2021"
+++

## Introducció

L'objectiu d'aquest article és mostrar **com generar projectes amb Canigó 3.4 de forma manual** sense fes ús del
[plugin de Canigó](/canigo-download-related/plugin-canigo/).

## Justificació

Pròximament Canigó 3.4 deixarà de tenir suport i la versió amb suport serà Canigó 3.6. **Un cop publicada
l’actualització del *plugin*, únicament es podrà generar projectes Canigó 3.6 mitjançant aquesta eina**.
No obstant això, si es necessita crear projectes amb Canigó 3.4, podeu utilitzar aquesta guia per a generar
projectes de forma manual i incorporar-ne els mòduls necessaris.

Podeu consultar les versions amb suport al [Roadmap de Canigó](/canigo/roadmap/).

## Creació de projectes

El *plugin* de Canigó de l’Eclipse utilitza l'*archetype* Maven per a generar els projectes amb el Framework
Canigó. Per la qual cosa, per a crear projectes amb Canigó 3.4 caldrà utilitzar l'*archetype* Maven del
plugin directament, mitjançant una instrucció Maven com es mostra a continuació:

```bash
mvn archetype:generate \
   -DarchetypeGroupId=cat.gencat.ctti \
   -DarchetypeArtifactId=plugin-canigo-archetype-rest \
   -DarchetypeVersion=1.6.10 \
   -DartifactId=Prova \
   -DgroupId=cat.gencat \
   -Dversion=1.0.0 -B
```

On caldrà indicar:

- -DarchetypeVersion: versió de l'archetype per Canigó 3.4, consultar la versió als entregables de [Canigó 3.4](/canigo/download/canigo-34/)

- -DartifactId: nom del projecte

- -DgroupId: nom del grup del projecte

- -Dversion: versió del projecte

- -B: permet especificar que es vol generar el projecte amb batch, és a dir, que s’encarregui de crear el projecte
sense preguntar

## Incorporació de mòduls

Un cop creat el projecte, podeu incorporar els mòduls de Canigó manualment tal com es detalla a
cada mòdul a la [documentació de Canigó](/plataformes/canigo/documentacio-per-versions/3.4LTS/3.4.9/) tenint present
el rang de versions dels mòduls per a Canigó 3.4. Podeu consultar la
[matriu de compatibilitats 3.4](/canigo-download-related/matrius-compatibilitats/canigo-34/).

## Referències

Per a més informació sobre el *archetype* de Maven podeu consultar:
https://maven.apache.org/guides/introduction/introduction-to-archetypes.html.
