+++
date        = "2019-09-12"
title       = "Actualització mòduls Canigó amb Dependency check"
description = "S'ha publicat una nova versió de Canigó amb les llibreries dependent passant l'escaneig de Dependency check"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "SETEMBRE2019"
+++

S'ha allibrerat la primera part de la **versió 3.4.1 del framework Canigó**, assolint un dels objectius que es persegueix des de CS Canigó, consistent en proporcionar als desenvolupadors d'aplicacions un framework amb les últimes versions de les seves llibreries depenent i amb el màxim de garanties de resolució de vulnerabilitats conegudes.

Podeu consultar l'abast complet de la versió 3.4.1 a:

https://cstd.ctti.gencat.cat/jiracstd/issues/?jql=project%20%3D%20CAN%20AND%20fixVersion%20%3D%203.4.1

## Dependency check

El Dependency check és una utilitat d’anàlisi de la composició de programari que identifica les dependències del projecte i comprova si hi ha alguna vulnerabilitat coneguda i divulgada públicament.

El motor principal conté una sèrie d'analitzadors que inspeccionen les dependències del projecte i recopilen informació sobre les dependències. La prova s'utilitza llavors per identificar el [Common Platform Enumeration (CPE)](https://nvd.nist.gov/products/cpe) per a la dependència donada. Si s'identifica un CPE, es mostra una llista de les entrades associades de [Common Vulnerability and Exposure (CVE)](https://cve.mitre.org/) en un informe.

S'ha configurat el goal de maven en el mòdul root de Canigó, així tots els mòduls de Canigó generen l'informe de les seves vulnerabilitats.

Un exemple d'informe de vulnerabilitats podria ser:

![Exemple informe vulnerabilitats](https://www.hascode.com/wp-content/uploads/2017/10/vulnerabilities-report.png)

On es pot observar que el projecte "owsap-dendency-check-sample" té les següents vulnerabilitats:

- commons-beanutils-1.7.0
- commons-collections-2.1
- commons-fileupload-1.0
- struts-1.2.9

Podeu trobar més informació sobre el Dependency Check a:

https://www.owasp.org/index.php/OWASP_Dependency_Check

## Matriu de versions dels mòduls

Teniu disponible la matriu de versions actualitzada de cada mòduls de Canigó de la versió 3.4 a:

[Matriu de Compatibilitat Canigo 3.4](/canigo-download-related/matrius-compatibilitats/)
