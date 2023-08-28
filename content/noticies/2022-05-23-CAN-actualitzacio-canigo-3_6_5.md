+++
date = "2022-05-23"
title = "Canigó. Publicació nova versió 3.6.5"
description = "S'ha publicat la nova versió de Canigó 3.6.5 "
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "JUNY2022"
+++

Amb l’alliberament de la **versió 3.6.5 del Framework Canigó** s’assoleix un dels objectius que es persegueix
des de CS Canigó consistent en proporcionar als desenvolupadors d'aplicacions un framework actualitzat per al
funcionament òptim de les diferents integracions amb serveis externs i la compatibilitat amb MongoDB 4.4.

Des de CS Canigó es recomana actualitzar-se a aquesta versió de Canigó.

## Novetats

### Actualització del driver del mòdul d'antivirus

El mòdul d’integració amb l’antivirus corporatiu és un dels més utilitzats i amb més demanda els últims mesos.
L’alineament de versions del driver i el servei permet assegurar un funcionament òptim de la integració
tenint en compte que **el servei d’antivirus només dona suport a l’última versió del connector**.
S'ha **actualitzat el driver del mòdul d'antivirus a la versió 8.2.0**.

### Actualització del client de la PICA

Els mòduls d’integració amb la PICA són dels més usats pels proveïdors i l’actualització del client permet
resoldre el problema detectat en el desplegament d’aplicacions en contenidors per la propietat “pica.axisdefinition.location”
i mitigar les vulnerabilitats detectades amb un nivell alt de severitat.
S'han **actualitzat els mòduls d'integració amb la [PICA](http://transversals.ctti.intranet.gencat.cat/sol-pica/integracio/)
per a fer ús de la versió 1.10.0 del client**.

### MongoDB 4.4

La compatibilitat amb MongoDB v.4.4 permet donar suport a la versió actual prevista al  full de ruta de programari
CTTI i que ja està essent demandada pels proveïdors d’aplicacions.
Es **dóna suport a MongoDB v.4.4 d’acord amb el [Full de ruta de programari CTTI]
(https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari)**.

## Documentació

Podeu consultar l'abast complet de la nova versió al
[Llistat de canvis](/plataformes/canigo/documentacio-per-versions/3.6LTS/3.6.5/llistat-de-canvis/).

Podeu consultar la [Matriu de Compatibilitats] (/plataformes/canigo/documentacio-per-versions/3.6LTS/3.6.5/moduls/compatibilitat-per-modul/).

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).