+++
date        = "2017-02-06"
title       = "Canigó. Novetats a propera versió Canigó 3.2"
description = "Des de l'equip de Canigó s'està treballant en la versió 3.2 de Canigó, la qual incorporarà novetats importants com el suport a serveis REST i autenticació amb JWT (JSON Web Token)."
sections    = ["Notícies", "home"]
categories  = ["canigo"]
key         = "FEBRER2017"
+++

Des de l'equip de Canigó s'està treballant en la versió 3.2 de Canigó, la qual incorporarà novetats importants com el suport a serveis REST i autenticació amb JWT (JSON Web Token) entre d'altres. Fa temps que tant des d'Arquitectura CTTI com des del CS Canigó s'està promovent l'ús d'arquitectures basades en servei REST al backend i consum de dades via Javascript en frontals web HTML5, i és en aquesta nova versió que s'incorporaran classes i configuracions de suport per facilitar el desenvolupament d'aplicacions que segueixin aquesta arquitectura.

La introducció de [Swagger](http://swagger.io/), framework pel disseny, construcció, documentació i consum d'APIs REST, és clau per disposar d'un ecosistema que permeti treballar amb APIs REST de forma fàcil i intuïtiva.

<center>![Swagger a Canigó 3.2](/images/news/swagger-canigo.png)</center>

La integració realitzada amb Swagger i [JWT](https://jwt.io/) (JSON Web Token) permet validar la seguretat de les nostres APIs. Un cop obtingut el token (/api/auth) és possible fer crides a altres APIs REST de l'aplicació sempre que l'usuari hi estigui autoritzat. En cas contrari obtindrem un error "HTTP 401 - Unauthorized".

Comentar que JSF (JavaServer Faces) passa a ser una tecnologia deprecada en aquesta versió de Canigó. En cap cas s'evolucionarà més enllà d'actualització de llibreries per tal de garantir la compatibilitat amb contenidors de servlets i servidors d'aplicacions del [Full de Ruta del Programari](https://portic.ctti.gencat.cat/les_TIC/Normativa/arquitectura/Documents/Full%20de%20Ruta%20del%20Programari.pdf).

La data d'alliberament de Canigó 3.2 està prevista per finals d'aquest mes de Febrer de 2017. Una nova notícia o destacat serà publicada en aquest portal per tal de donar més detalls d'aquesta nova versió de Canigó: documentació, binaris i aplicació plantilla.

Per qualsevol dubte us podeu posar en contacte amb el CS Canigó al [servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) del JIRA CSTD o enviant-nos un mail a la [bústia](oficina-tecnica.canigo.ctti@gencat.cat) del CS Canigó.