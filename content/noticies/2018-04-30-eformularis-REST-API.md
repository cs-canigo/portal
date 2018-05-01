+++
date        = "2018-04-30"
title       = "eFormularis. Nova REST API"
description = "En el projecte d'actualització tecnològica que s'està duent a terme a la plataforma d'eFormularis, s'introdueix una novetat que és la publicació d'una REST API per l'accés als Serveis d'Invocació de Formularis PDF"
sections    = ["Notícies"]
categories  = ["sgde"]
key         = "MAIG2018"
+++

En el projecte d'actualització tecnològica que s'està duent a terme a la plataforma d'eFormularis, s'introdueix una novetat que és la publicació d'una **REST API** per l'accés als Serveis d'Invocació de Formularis PDF:

* Renderització de formularis PDF
* Extracció de dades de formularis PDF
* Aplanat de formularis PDF
* Signatura de documents PDF amb certificat genèric de la Generalitat de Catalunya

L'accés a aquesta REST API, a diferència de les versions precedessores basades en SOAP, ja es pot realitzar mitjançant **HTTPS**. L'especificació Swagger de la REST API es pot obtenir de la següent URL:

**Producció**
https://eformularis.intranet.gencat.cat/ServeisInvocacioApi/api/v2/api-docs (*No operativa fins a la posada en servei de la nova plataforma a Producció*)

**Preproducció**
https://preproduccio.eformularis.intranet.gencat.cat/ServeisInvocacioApi/api/v2/api-docs (*Operativa*)

![eforms-swagger-specification](/images/news/serveis-invocacio-rest-api.png)

Les noves funcionalitats que s'afegeixin als Serveis d'Invocació de Formularis PDF està previst que només s'incorporin a aquesta REST API, i no a les versions predecessores basades en SOAP. Pel versionat de la REST API es seguiran les [bones pràctiques](http://canigo.ctti.gencat.cat/blog/2016/01/api/#versionat) definides en el blog d'arquitectura de CTTI.

Properament a Canigó es proporcionarà una nova versió del connector amb el SGDE per incorporar un client que permeti el consum d'aquesta REST API de forma fàcil.

Com a afegit a aquesta notícia, enumerem alguns dels avantatges que suposa l'ús de REST APIs en lloc de WS SOAP, i que han influït en la decisió d'implementar aquesta REST API pels Serveis d'Invocació de Formularis PDF:

* *Rendiment*: permet format JSON per les dades, més lleuger que XML tant pel seu pes com pel seu processament
* *Flexibilitat*: mentre que pels WS SOAP el codi dels clients ha de ser compilat amb el nou WSDL (Web Services Description Language), les REST API poden ser "backward compatible"
* *Stateless*: les REST API estan concebudes per definició per a no mantenir estat, i en el cas d'operacions atòmiques, independents, com són les que formen part dels Serveis d'Invocació de Formularis PDF, encaixa perfectament
* *Facilitat d'ús*: poden ser consumides per qualsevol client que suporti el protocol HTTP

Per a qualsevol dubte respecte a l'ús d'aquesta REST API us podeu posar en contacte amb el CS Canigó preferiblement mitjançant el [servei STF del CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/STF) o bé enviant un correu a la [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).

