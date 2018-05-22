+++
date        = "2018-05-18"
title       = "Canigó. Evolució Mòdul de Traces"
description = "Analitzem l'evolució realitzada en el mòdul de traces a Canigó 3.2, recomanacions en quan al seu ús, i l'evolució a futur prevista per aquest servei"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "JUNY2018"
+++

El [**Mòdul de Traces**](https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-traces/) va ser actualitzat de Log4j 1.x a Log4j 2.x a Canigó 3.2. Amb aquesta actualització es va pretendre dotar a les aplicacions Canigó de totes les avantatges que suposa l'ús d'aquesta nova versió de la llibreria:

* Loggers asíncrons:
* Nivells de log personalitzats:
* Reconfiguracions en calent:
* Suport a lambdas:
* Filtres
* Plugins
* Suport a APIs:
* Traces de misatges personalitzats:
* Millores de concurrència:
* Configuració en diferents formats: fitxer XML, JSON o YAML, a més de configuració programàtica

Volem destacar la importància, pel que fa a aspectes de rendiment de les aplicacions, l'ús de **loggers asíncrons** (Ref: https://logging.apache.org/log4j/2.x/manual/async.html). Aquests representen una gran millora respecte els síncrons, sobretot si el registre de les traces s'ha de realitzar en un destí amb una latència considerable (Ex. filesystem en un NAS). S'ha de tenir en compte que per obtenir aquest rendiment, es perd en fiabilitat ja que alguns events podríen arribar a perdres. Per aquest motiu, no es recomana el seu ús en auditoríes.

### Solució de logs centralitzats

Les solucions de logs centralitzats són cada poc més comuns, sent ELK (Elasticsearch, Logstash, Kibana) una de les més adoptades. Filebeat i Logstash s'encarreguen de recol·lectar els logs (Filebeat) i transformar-los (Logstash) en cas que sigui necessari abans de ser enviats cap al repositori (Elasticsearch). El motor de cerca d'Elasticsearch permetrà des del visualitzador (Kibana) consultar els logs de les diferents aplicacions:

TODO: ELK.png

Existeixen opcions més intrusives com definir appenders al sistema de logs de l'aplicació per tal que enviïn els logs a Filebeat o Logstash, però sempre que sigui possible es recomana que sigui l'agent de Filebeat o Logstash qui recol·lecti la informació.

En un futur es preveu dispossar d'una solució de logs centralitzat a nivell de **CPDs corporatius**.

En **plataformes de contenidors Docker** com l'ICS (IBM Container Service) de Bluemix a cloud públic o AppAgile (T-Systems) i SwarmMe (T-Systems) a cloud privat, les pròpies plataformes ja incorporen una solució de logs centralitzat. Els logs dels contenidors (sortida estàndard) són recol·lectats sense necessitat de realitzar cap configuració a nivell de contenidor. És important que les aplicacions siguin conscients d'aquesta diferència vers CPD, escrivint els logs a la sortida estàndard enlloc de fer-ho a fitxer. CANVI A LA PLANTILLA

### Instrumentació

TODO: Explicar evolució prevista pel mòdul d'instrumentació, i no confondre el concepte respecte a logging
