+++
date        = "2018-02-14"
title       = "Canigó. Jocs de proves API REST"
description = "Des de Canigó 3.2 es dona suport a la implementació d'APIs REST. Poder generar un joc de proves automatitzat a partir del contracte de l'API REST és possible gràcies a eines com SOAP UI"
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "FEBRER2018"
+++

Existeixen diferents estàndards per la definició del contracte d'una API REST. Els més populars són [WADL](http://www.w3.org/Submission/wadl/) i [Swagger](https://swagger.io/) (OpenAPI Specification).
**Swagger** és un framework molt útil, no només per a descriure una API REST sinó també per produir, consumir i poder visualitzar-la.

Des de Canigó 3.2 es dóna suport a APIs REST gràcies a Spring 4 i el seu MVC (Model-View-Controller), i [Springfox](http://springfox.github.io/springfox/). Springfox és una implementació de l'especificació Swagger2.

Swagger proporciona una UI (User Interface) amb un format "human-readable" de les APIs REST. L'aspecte que té en una aplicació Canigó 3.2 és la següent:

*\<base-url\>/canigo-api.html*

![canigo-api](/images/news/canigo-api.png)

Gràcies a aquesta UI els desenvolupadors poden conèixer i provar les APIs.

A més d'aquesta UI, és possible obtenir l'especificació de l'API en format JSON.

*\<base-url\>/api/v2/api-docs*

![swagger-json](/images/news/swagger-json.png)

Aquesta definició de l'API en format JSON ens permet generar jocs de proves per la validació del seu funcionament. 

[SOAP UI](https://www.soapui.org/) és una eina molt popular per la realització de tests tant REST com SOAP, i és a partir de la versió [5.2.1+](https://www.soapui.org/news/soapui-5-2-1-released.html) que dona suport a la importació de definicions Swagger.

En aquest comunicat podeu trobar un [How-To](/howtos/2018-02-howto-swagger_soapui/) amb el detall per la generació d'aquests jocs de proves SOAP UI a partir de l'especificació Swagger.

Amb el joc de proves generat, és possible l'automatització de la seva execució mitjançant la utilitat [TestRunner](https://www.soapui.org/test-automation/running-functional-tests.html) que incorpora SOAP UI. Això pot permetre, en entorns d'integració continua dels proveïdors d'aplicacions, automatitzar aquestes proves en pipelines de Jenkins. D'aquesta manera, canvis continus en el codi de les APIS poder ser validats de forma ràpida abans d'alliberar una versió estable de l'aplicació al SIC.
