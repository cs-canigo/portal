+++
date = "2024-06-11"
title = "Canigó. Publicació nova versió de canigo.persistence.jpa 3.1.1"
description = "S'ha publicat una nova versió 3.1.1 del mòdul canigo.persistence.jpa amb correccions relacionades amb javax"
sections = ["Notícies", "home"]
categories = ["canigo"]
key = "JUNY2024"
+++

S'ha actualitzat la **versió 3.1.1 del [Mòdul de JPA] (/plataformes/canigo/documentacio-per-versions/3.8LTS/3.8.0/moduls/moduls-generals/modul-jpa/) de Canigó** amb correccions relacionades amb javax.

## Canigó JPA 3.1.1

Les correccions realitzades són les següents:
	- Modificades referències en la classe JPAGenericRepositoryImpl.java per a apuntar a jakarta.persistence.EntityManager en lloc de javax.persistence.EntityManager.
	- Modificats enllaços en el fitxer canigo-persistence-jpa.xml per a apuntar als xsd correctes.

Aquestes correccions són transparents per a l'ús del mòdul de JPA de Canigó. Només és necessari apuntar a aquesta nova versió o que el rang de versions del mòdul JPA indicat en el pom.xml inclogui aquesta versió 3.1.1.

<br/><br/>
Per qualsevol dubte relatiu a aquesta nova versió del Framework Canigó us podeu posar en contacte amb el CS Canigó
al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/projects/CAN) del JIRA CSTD o enviant-nos un correu electrònic
a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
