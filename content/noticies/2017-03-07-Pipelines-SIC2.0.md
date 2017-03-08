+++
date        = "2017-03-07"
title       = "SIC. Introducció Pipelines a SIC 2.0"
description = "El passat mes es van comentar algunes de les millores que incorporarà SIC 2.0 pel que fa al SCM (s'afegeix Gitlab). L'altre gran peça de SIC, el Jenkins, també patirà un gran canvi amb l'evolució a SIC 2.0. S'incorpora el model de treball amb jobs de tipus Pipeline, job que engloba tots els estats del cicle d'Integració Contínua."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "MARC2017"
+++


El passat mes es van comentar algunes de les millores que incorporarà SIC 2.0 pel que fa al SCM (s'afegeix Gitlab). L'altre gran peça de SIC, el Jenkins, també patirà un gran canvi amb l'evolució a SIC 2.0. S'incorpora el model de treball amb jobs de tipus Pipeline, job que engloba tots els estats del cicle d'Integració Contínua.

Fins el moment, es contempla el següent escenari:

- Existeixen els següents tipus de jobs: d'instal·lació de llibreries, de construcció + validació codi, de desplegament automàtic a INT i de petició desplegament a PRE/PRO. 
- Tots ells s'executen per separat
- Només es contempla el desplegament automàtic a entorns INT.

La versió actual de Jenkins, la 2.7.4, incorpora un nou tipus de job, el de Pipeline. Aquest tipus de jobs faciliten la inclusió del cicle complet d'Integració Contínua en un únic Job. S'està treballant en l'adaptació a aquest model de treball. Les característiques d'aquest seran:

- El job ja no serà executat directament pel desenvolupador sinó que s'iniciarà automàticament en fer la pujada de codi al GitLab (un hook configurat al GitLab farà de llançadora).
- El job descarregarà la darrera versió de codi font i construirà el/s binaris. Per a considerar el codi com a vàlid, s'efectuaran validacions de qualitat i test automàtics.
- Prèviament al desplegament automàtic a entorns PRE i PRO, el job Pipeline contemplarà l'autorització per part dels responsables i validarà que el desplegament s'efectua dins la finestra d'execució de l'aplicació.
- El flux del job Pipeline podrà ser aturat també de manera manual en cas de considerar una versió com a no apta per a desplegar.


A continuació es mostra un esquema simplificat del funcionament del nou tipus de Job Pipeline en contrapartida al sistema actual de jobs.

![SIC 1.0 vs SIC 2.0](/images/news/introduccio-pipelines-sic.2.0.png)

Durant els pròxims mesos s'alliberarà informació més detallada sobre el funcionament d'aquest tipus de Jobs.