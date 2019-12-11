+++
date        = "2019-09-29"
title       = "Actualització mòduls Canigó amb Dependency Check"
description = "S'ha publicat una nova versió de Canigó amb les llibreries dependent passant l'escaneig de Dependency Check"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "DECEMBRE2019"
+++

## Introducció

Les aplicacions estan formades de diverses llibreries externes que donen suport per diferents aspectes de les aplicacions, com poden ser la interoperabilitat (WS, REST, etc.) o la seguretat (autenticació / autorització). Aquestes llibreries poden tenir forats de seguretat i poden comprometre la seguretat de l'aplicació. En aquest sentit, hi ha bases de dades públiques que tan bon punt es publiquen les vulnerabilitats, n'informen de les llibreries o aplicacions afectades, així com dels mètodes per identificar-ho i solucionar-ho.

S'ha alliberat la primera part de la **versió 3.4.1 del framework Canigó**, assolint un dels objectius que es persegueix des de CS Canigó, el qual consisteix en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes versions de les seves llibreries de les quals depèn i amb el màxim de garanties de resolució de vulnerabilitats conegudes. Podeu consultar l'abast complet de la nova versió a les [Release Notes apartat "Canigó 3.4.1"](/canigo-download-related/release-notes-canigo-34).

## Dependency Check

El Dependency Check és una utilitat d’anàlisi de la composició de programari que identifica les dependències del projecte i comprova si hi ha alguna vulnerabilitat coneguda i divulgada públicament. El motor principal, conté una sèrie d'analitzadors que inspeccionen les dependències del projecte i recopilen informació sobre les dependències. La prova s'utilitza llavors per identificar el [Common Platform Enumeration (CPE)](https://nvd.nist.gov/products/cpe) per a la dependència donada. Si s'identifica un CPE, es mostra una llista de les entrades associades de [Common Vulnerability and Exposure (CVE)](https://cve.mitre.org/) en un informe.

Per la versió 3.4.1 de Canigó, s'ha configurat el _goal_ de Maven en el mòdul _root_ de Canigó, així tots els mòduls generen l'informe de les seves vulnerabilitats. Un exemple d'informe amb vulnerabilitats podria ser:

![Exemple informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report.png)

On es pot observar que el mòdul "canigo.security" té les següents vulnerabilitats:

- spring-security-core-5.1.3-RELEASE
- spring-security-ldap-5.1.3-RELEASE

El detall d'una de la vulnerabilitats:
![Exemple detall informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report-detail.png)

Una vegada actualitzades les llibreries l'informe indica que no ha trobat vulnerabilitats:

![Exemple després actualització informe vulnerabilitats](/images/news/2019-09-12-Actualitzacio_moduls_Canigo_Dependency_check_vulnerabilities-report-after.png)

## Documentació addicional

Podeu trobar més informació sobre el Dependency Check a: https://www.owasp.org/index.php/OWASP_Dependency_Check.

Per a més informació sobre com configurar el Dependency Check en aplicacions Canigó podeu consultar el How to: [Comprovació automàtica de dependències vulnerables per aplicacions Canigó](/drafts/2019-08-13-Howto-Dependency-check/)

Al següent enllaç, hi trobareu disponible la matriu de versions actualitzada de cada mòdul de Canigó de la versió 3.4: 
[Matriu de Compatibilitat Canigo 3.4](/canigo-download-related/matrius-compatibilitats/)
