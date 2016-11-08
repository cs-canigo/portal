+++
date        = "2016-11-08"
title       = "SIC. Actualització de versions d'eines al SIC"
description = "El 28 d'Octubre es va portar a terme una actualització de versions d'alguns components de software al SIC per tal d'acomplir el full de ruta del CTTI"
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "NOVEMBRE2016"

+++

El 28 d'Octubre es va portar a terme una actualització de versions d'alguns components de software al SIC per tal d'acomplir el full de ruta del CTTI.

A continuació s'exposa una taula amb el detall del programari i les versions que s'han actualitzat / afegit.


|Tipus programari| Producte|Versió/ns anterio/rs|Versió/ns actual/s|
|-----------|------------|-------------|-------------|
|Producte Base|Jenkins|1.609.3|**2.7.4**|
|Tecnologia| JDK|1.5, 1.6, 1.7|1.5, 1.6, 1.7, **1.8**|
|Tecnologia| Oracle DB|10.2.0.5.0|10.2.0.5.0, **12.1**|
|Tecnologia| Maven|2.0.9, 2.0.10, 2.2.1, 3.2.2|2.0.9, 2.0.10, 2.2.1, 3.2.2, **3.3.9**|

L'actualització a [Jenkins 2.7.4](https://jenkins.io/2.0/) permetrà poder fer ús de [Pipelines](https://jenkins.io/doc/book/pipeline/). Les pipelines suposaran una millora substancial respecte al control del flux d'execució dels jobs, oferint més possibilitats i permetent controlar totes les fases del procés de CD (Continuous Delivery).

Per altra banda, amb l'afegit de la versió de JDK 1.8, del connector d'Oracle DB 12.1 i de la versió de Maven 3.3.9 el Jenkins de SIC es troba preparat per poder construir i desplegar les aplicacions que facin ús d'algunes de les tecnologies més recents.

\
\


S'aprofita aquest article per informar les versions de software (llenguatges, servidors JEE/contenidors de servlets, bases de dades) suportats pel SIC:

|Tipus programari|Producte|Versió|
|----------------------|-----------|-------------|
|Producte Base|SVN|1.8.14|
|Producte Base|Nexus|2.11|
|Tecnologia|.NET|4.5.2|
|Tecnologia|ANT|1.8.2, 1.9.6|
|Tecnologia|IBM WAS|8.5.5|
|Tecnologia|node.js|0.12.13, 4.4.3, 5.10.1|
|Tecnologia|MongoDB|3.2.5|
|Tecnologia|MS SQLServer|2014|
|Tecnologia|MySQL|5.7.9|



