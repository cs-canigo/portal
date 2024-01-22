+++
date = "2023-01-15"
title = "Canigó. Publicació nova versió de canigo.support.mailing 3.1.0"
description = "S'ha publicat una nova versió 3.1.0 del mòdul canigo.support.mailing que permet configurar paràmetres dinàmics"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "GENER2023"
+++

S'ha actualitzat la **versió 3.1.0 del [Mòdul d'enviament de correus]
(/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-suport/modul-correu/)
de Canigó** per a permetre la configuració de paràmetres dinàmics.

Podeu consultar l'abast complet de la nova versió en [canigo.support.mailing:3.1.0](/plataformes/canigo/documentacio-llibreries/canigo.support.mailing/3.1.0/).

## Canigó  Support Mailing 3.1.0

Els canvis principals són els següents:

- [Actualització de canigo.support.mailing](/noticies/2023-01-15-CAN-actualitzacio-canigo-mailing-3_1_0/)
- Dins del mòdul següent s'ha actualitzat a JDK 17 en el directori `Canigó-root` de 3.1.0 a 3.2.0
- S'actualitzen els mòduls  [Canigó-test](
  /plataformes/canigo/documentacio-llibreries/canigo.test/3.1.0/) de la versió 3.0.4 a 3.1.0
  i [Canigó-core](/plataformes/canigo/documentacio-llibreries/canigo.core/5.1.0/)
  de la versió 5.0.6 a 5.1.0.
- Així mateix , a causa de la incompatibilitat i obsolescència amb el JDK 17 , s'esborren les dependències
  associades a la llibreria **JAVAX** ,sent reemplaçades per les dependències de **JAKARTA**.
  Les dependències reemplaçades són:`jakarta.activation` versió **`2.1.2`** que substitueix la dependència de
  `javax.activation` versió **1.1.1** i la dependència `jakarta.mail` versió**`2.0.1`**
  que substitueixla dependència de`javax.mail` versió **1.6.2**
- Es manté la versió de les següents dependències: `mock.java.mail` versió **1.9**,
  `awaitility`de la versió  **4.2.0**,`javamail-file-transport`versió **1.5.5**,`license-maven-plugin.version`
  versió **2.0.0**.
- S'actualitza`commons.io` de la 2.11.0 a la versió **2.15.0**.

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).