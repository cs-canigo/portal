+++
date        = "2018-01-10"
title       = "Canigó. Tests unitaris integrats als binaris de Canigó"
description = "Amb l'objectiu que els proveïdors d'aplicacions puguin provar el funcionament dels mòduls de Canigó, podent sobreescriure versions de llibreries, es proporcionen binaris amb els tests unitaris integrats. A aquests binaris els coneixem com a test-jars"
sections    = ["Canigó"]
categories  = ["canigo"]
key         = "GENER2018"
+++

Amb l'objectiu que els proveïdors d'aplicacions puguin provar el funcionament dels mòduls de Canigó, podent sobreescriure versions de llibreries, es proporcionen binaris amb els tests unitaris integrats. A aquests binaris els coneixem com a **test-jars**.

En ocasions, pot sorgir la necessitat per part del proveïdor d'aplicacions d'utilitzar una versió més recent d'alguna llibreria respecte a la que incorpora Canigó, sense poder esperar a una nova versió del framework que la incorpori. Exemples de llibreries poden ser Spring Framework o Hibernate. Els motius poden ser diversos, principalment:

- Actualització a una fix version que soluciona algun **bug** que afecta a alguna funcionalitat de l'aplicació
- Actualització a una minor o major version que incorpora alguna **nova funcionalitat** requerida per l'aplicació

Això pot presentar un problema si el proveïdor d'aplicacions reemplaça la llibreria sense garanties que els serveis de Canigó afectats continuin funcionant de forma satisfactòria. És per aquest motiu que des del CS Canigó es proporcionen els test-jars i es defineix com utilitzar-los. Un exemple d'ús pràctic el podeu trobar en el [how-to](http://canigo.ctti.gencat.cat/drafts/2018-01-howto-test_jars_canigo/) publicat aquest mes.

D'inici, no es proporcionen test-jars per a tots els serveis Canigó, sino només pels considerats com a principals:

- *Servei Core*: "canigo.core" versió 3.2.3 o superior
- *Servei Web REST*: "canigo.web.rs" versió 1.1.1 o superior
- *Servei de Persistència*: "canigo.persistence.jpa" versió 1.2.2 o superior
- *Servei de Seguretat*: "canigo.security" versió 1.2.3 o superior

Aquests binaris estan publicats al Nexus del SIC. Els podeu trobar al [repositori Maven públic](https://hudson.intranet.gencat.cat/nexus/#browse/search/maven) cercant pel groupId "cat.gencat.ctti", i "artifactId" i "version" especificats al llistat anterior.

Per qualsevol dubte relatiu a l'ús dels test-jars a Canigó 3.2, us podeu posar en contacte amb el CS Canigó enviant un correu a [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat) o bé fent-nos arribar una petició de consulta/suport al [CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/).
