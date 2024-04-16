+++
date        = "2024-01-15"

title       = "Guies d'ús per a la implantació i us del variable entorn"
description = "Guies d'ús entorn "
sections    = "canigo-fwk-docs"
weight        = 1
+++



## Introducció a la Configuració d'Entorns amb Spring i Variables d'Entorn a Windows

Benvingut/da a aquesta guia introductòria sobre la configuració d'entorns utilitzant l'entorn de desenvolupament Spring i variables d'entorn específiques a Windows. En aquest document, explorarem com definir i gestionar variables d'entorn per a la teva aplicació Spring, així com com configurar-les en un sistema operatiu Windows.

En la més recent actualització de l'arquetip Canigó 3.8, s'ha incorporat una novetat notable: la configuració de l'entorn ara es duu a terme a través d'un arxiu YAML. A continuació, els mostrarem com realitzar aquesta configuració.


Per a iniciar, dins de l'arxiu application.yml, procedirem a editar aquest camp i agregar el nom de la variable que s'utilitza dins del sistema, en aquest cas, "entorn"

```yaml
spring:
  profiles:
    active: ${entorn}
```
Con això, ja tenim configurat el projecte i no caldrà realitzar cap altra acció en el codi. Qualsevol restricció relacionada amb els entorns es farà dins del fitxer YAML dedicat a cada entorn.

A continuació, només caldrà crear la variable d'entorn a les variables del sistema de la màquina, en cas que no estigui creada. Per fer-ho, seguim aquests passos:

## Obrir el Menú d'Inici:
Fes clic al botó d'Inici a la cantonada inferior esquerra.

## Buscar "Variables d'entorn":
Escriu "Variables d'entorn" a la barra de cerca i selecciona l'opció que diu "Editar les variables d'entorn del sistema".

## Configurar una Nova Variable d'Entorn:
1. Fes clic al botó "Variables d'entorn...".
2. A la secció "Variables del sistema", fes clic a "Nou".
3. A "Nom de la variable", introdueix "entorn".
4. A "Valor de la variable", introdueix el nom de l'entorn desitjat, per exemple, "produccio".
5. Fes clic a "Acceptar" per tancar cada finestra.
