+++
date        = "2019-10-25"
title       = "Actualització plugin eclipse"
description = "S'ha publicat una nova versió del plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.2"
#sections    = ["Notícies", "home"]
#categories  = ["canigo"]
#key         = "NOVEMBRE2019"
+++

Seguint l'objeciu de CS Canigó de proporcionar als desenvolupadors d'aplicacions les màximes eines útils per a la creació de projectes amb Canigó, s'ha actualitzat el plugin del eclipse de Canigó per generar projectes amb Canigó 3.4.2.

Aquesta actualització s'enmarca dins de l'abast de la **versió 3.4.2 del framework Canigó**.

Podeu consultar l'abast complet de la versió 3.4.2 a:

[Abast Canigó 3.4.2](https://cstd.ctti.gencat.cat/jiracstd/issues/?jql=project%20%3D%20CAN%20AND%20fixVersion%20%3D%203.4.2)

## Introducció

El plugin del eclipse és una plugin desenvolupat pel IDE eclipse per afegir menús contextuals per a la creació de projectes Canigó utilitzant el archetype i per afegir mòduls, a un projecte creat, amb una preconfiguració ja donada. Així utilitzant eclipse podem crear un projecte i afegir-li els mòduls necessaris, obtenint un projecte preconfigurat, estalviant temps als desenvolupadors.

Dins dels canvis de Canigó 3.4.2 hi costa l'evolució del mòdul de Seguretat de Canigó per permetre l'autenticació i l'autorització a Gicar, vegeu el tiquet [Autorització GICAR a Canigó](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN-2383)

Per a facilitar l'utilització d'aquesta nova funcionalitat del mòdul de Seguretat, s'ha modificar el plugin de Canigó per l'eclipse.

## Novetats plugin eclipse

La nova versió 1.7.6 del plugin incorpora una nova pregunta al mòdul de seguretat

Si s'ha seleccionat l'opció "GICAR" com a proveidor de seguretat

![](/images/news/Security_module_configuration_1_7_6.png)

És necessari seleccionar una opció, BBDD o GICAR, a la pregunta "Tipus d'autorització Gicar?"

![](/images/news/Gicar_athorization_type.png)

Si es selecciona BBDD, el plugin modificarà els fitxers del projecte amb l'autenticació per Gicar i autorització per BBDD com fins ara.

Si es selecciona GICAR, el plugin modificarà els fitxers del projecte amb l'autenticació i l'autorització per Gicar incorporats a la versió 3.4.2 de Canigó.

Per instal·lar o actualitzar la versió del plugin és necessari seguir els passos descrits a la secció "Instal·lació" del [Plugin Canigó per a Eclipse # Instal·lació](/canigo-download-related/plugin-canigo/#instal-lació)

## Documentació plugin eclipse

La documentació del plugin del eclipse està disponible a:

[Plugin Canigó per a Eclipse](/canigo-download-related/plugin-canigo/)

La documentació del mòdul de seguretat està disponible a:

[Mòdul de Seguretat](/canigo-documentacio-versions-3x-core/modul-seguretat/)
