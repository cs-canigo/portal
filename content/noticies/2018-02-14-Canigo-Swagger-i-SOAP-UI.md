+++
date        = "2018-02-14"
title       = "Canigó. Jocs de proves API REST"
description = "Des de Canigó 3.2 es dona suport a la implementació d'APIs REST. Poder generar un joc de proves automatitzat a partir del contracte de l'API REST és possible gràcies a eines com SOAP UI"
sections    = ["noticies"]
categories  = ["canigo"]
key         = "FEBRER2018"
draft =true
+++

Existeixen diferents estàndars per la definició del contracte d'una API REST. Els més populars són [WADL](http://www.w3.org/Submission/wadl/) i [Swagger](https://swagger.io/) (OpenAPI Specification).
Swagger és un framework molt útil, no només per a descriure una API REST sino també per produïr, consumir i poder visualitzar-la.

Des de Canigó 3.2 es dona suport a APIs REST gràcies a Spring 4 i el seu MVC (Model-View-Controller), i [Springfox](http://springfox.github.io/springfox/). Springfox és una implementació de la especificació Swagger 2.

Swagger proporciona una UI (User Interface) amb un format "human-readable" de les APIs REST. L'aspecte que té en una aplicació Canigó 3.2 és la següent:

*<base-url>/canigo-api.html*


Gràcies a aquesta UI els desenvolupadors poden conèixer i provar les APIs.

A més d'aquesta UI, és possible obtenir l'especificació de l'API en format JSON.

*<base-url>/api/v2/api-docs*



Aquesta definició de l'API en format JSON ens permetrà generar jocs de proves per la validació del seu funcionament. [SOAP UI](https://www.soapui.org/) és una eina molt popular per la realització de tests tant REST com SOAP, i és a partir de la versió [5.2.1+](https://www.soapui.org/news/soapui-5-2-1-released.html) que dona suport a la importació de definicions Swagger.
En aquest comunicat podeu trobar un [How-To]() amb el detall per la generació d'aquests jocs de proves SOAP UI a partir de l'especificació Swagger.
