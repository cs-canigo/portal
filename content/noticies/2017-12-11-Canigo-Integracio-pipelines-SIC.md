+++
date        = "2017-12-11"
title       = "Canigó. Integració amb SIC 2.0"
description = "Les aplicacions Canigó poden ser fàcilment integrables al SIC 2.0, tant per la seva custodia de codi al Git, com per la seva construcció i desplegament amb Jenkins"
sections    = ["noticies"]
categories  = ["canigo"]
key         = "DESEMBRE2017"
+++

Les aplicacions Canigó poden ser fàcilment integrables al [*SIC (Servei d'Integració Continua)*](http://canigo.ctti.gencat.cat/sic/), tant per la seva custodia de codi al Git, com per la seva construcció i desplegament amb Jenkins.
En aquest comunicat, a la secció de HowTo's Frameworks i Solucions d'Arquitectura, podeu trobar un enllaç a un HowTo on s'explica pas a pas com fer aquesta integració.

A mode de resum, els principals aspectes a tenir en compte són els següents:

* Per la custodia de codi al *Git*...

** Cal dispossar de permissos en el projecte per el qual es vol custodiar el codi. Més informació respecte a l'Autoservei d'usuaris al Gitlab al següent [enllaç](http://canigo.ctti.gencat.cat/noticies/2017-07-18-SIC-Autoservei-usuaris-SIC2.0/)
** Cal connectar l'aplicació Canigó local amb el projecte del Gitlab i pujar els canvis sempre a la branca master. Recordar que el Git del SIC no és un repositori de desenvolupament. Només s'hauran de pujar els canvis quan es tingui una versió "releaseable" de l'aplicació
** Cal configurar l'aplicació per a que ignori la carpeta amb el resultat de la construcció (Ex. /target), meta-dades de l'Eclipse o IDE utilitzat, i d'altres binaris que puguin haver-hi en el codi del projecte. Aquests binaris que formen part de l'aplicació han d'ubicar-se al [Repositori de Binaris del SIC](http://canigo.ctti.gencat.cat/noticies/2017-07-05-SIC-Gestio-binaris/)

* Per la construcció i desplegament amb una pipeline al *Jenkins*: .

** Cal configurar el procés de construcció Maven per a que auto-configuri la versió de l'aplicació al descriptor "sic.yml" que ha d'ubicar-se a "<app_canigo>/sic/sic.yml" (Més detall en el HowTo). A la propera versió de Canigó que s'alliberi, aquesta configuració ja vindrà establerta
** Cal especificar a l'equip del SIC les passes per la construcció i desplegament de l'aplicació per a que configurin la pipeline al Jenkins. En el cas del backend Canigó, normalment l'empaquetat estàndard Maven, i per la part de frontend dependrà molt de la tecnologia utilitzada (Angular, React, ...) les quals utilitzaran gestors de paquets com [npm](https://www.npmjs.com/)

Per qualsevol dubte relatiu a la integració al SIC d'aplicacions Canigó us podeu possar en contacte amb el CS Canigó enviant un correu a [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat) o bé fent-nos arribar una petició de consulta/suport al [CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN/).
