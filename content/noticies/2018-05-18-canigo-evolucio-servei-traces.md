+++
date        = "2018-05-18"
title       = "Canigó. Evolució Mòdul de Traces"
description = "Analitzem l'evolució realitzada en el mòdul de traces a Canigó 3.2, recomanacions pel que fa al seu ús, i l'evolució a futur prevista per aquest servei"
sections    = ["Notícies"]
categories  = ["canigo"]
key         = "JUNY2018"
+++

El [**Mòdul de Traces**](https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-traces/) va ser actualitzat de Log4j 1.x a Log4j 2.x a Canigó 3.2. Amb aquesta actualització es va voler dotar a les aplicacions Canigó de tots els avantatges que suposa l'ús d'aquesta nova versió de la llibreria. D'entre elles volem destacar la importància, pel que fa a aspectes de rendiment de les aplicacions, de l'ús de [**loggers asíncrons**] (https://logging.apache.org/log4j/2.x/manual/async.html). Aquests loggers representen una gran millora respecte els síncrons, sobretot si el registre de les traces s'ha de realitzar en un destí amb una latència considerable (Ex. filesystem en un NAS, socket a servei remot). S'ha de tenir en compte que per obtenir aquesta millora de rendiment, es perd en fiabilitat, ja que alguns events podrien arribar a perdre's. Per aquest motiu, no es recomana el seu ús en auditories.

Aquestes són les principals novetats que incorpora Log4j 2.x:

* Loggers asíncrons
* Nivells de log personalitzats
* Reconfiguracions en calent
* Suport a lambdas
* Filtres
* Plugins
* Suport a APIs
* Traces de missatges personalitzats
* Millores de concurrència
* Configuració en diferents formats (XML, JSON o YAML, a més de configuració programàtica)

### Solució de logs centralitzats

Les solucions de logs centralitzats són cada poc més comuns, sent **ELK** (Elasticsearch, Logstash, Kibana) una de les més adoptades. Filebeat i Logstash s'encarreguen de recol·lectar els logs (Filebeat) i transformar-los (Logstash) en cas que sigui necessari abans de ser enviats cap al repositori (Elasticsearch). El motor de cerca d'Elasticsearch permetrà des del visualitzador (Kibana) consultar els logs de les diferents aplicacions:

![ELK](/images/news/ELK.png)

Existeixen opcions més intrusives com definir appenders al sistema de logs de l'aplicació per tal que enviïn els logs a Filebeat o Logstash, però sempre que sigui possible es recomana que sigui l'agent de Filebeat o Logstash qui recol·lecti la informació.

En un futur es preveu disposar d'una solució de logs centralitzat a nivell de **CPDs corporatius**. Els logs de les aplicacions ubicats a filesystems seran recol·lecats i enviats cap aquest servei.

En **plataformes de contenidors Docker** com l'ICS (IBM Container Service) de Bluemix a cloud públic o AppAgile (CPD4-TSystems) i SwarmMe (CPD1-HP) a cloud privat, les mateixes plataformes ja incorporen una solució de logs centralitzat. Els logs dels contenidors (sortida estàndard) són recol·lectats sense necessitat de realitzar cap configuració a nivell de contenidor. És important que les aplicacions siguin conscients d'aquesta diferència vers CPD, escrivint els logs a la sortida estàndard en lloc de fer-ho a fitxer. També cal tenir-ho en compte també en aplicacions Canigó.

### Instrumentació

El [**Mòdul d'Instrumentació**](https://canigo.ctti.gencat.cat/canigo-documentacio-versions-3x-core/modul-instrumentacio/), el qual no ha de confondre's amb el de traces, s'evolucionarà per tal de facilitar l'anàlisi del rendiment de les aplicacions (ús de memòria a la JVM, consum de cpu, temps de resposta de les peticions, healthchecks, ...) i permetre la integració amb serveis externs de centralització de la informació (Ex. Prometheus). A l'actualitat, el mòdul d'instrumentació facilita principalment la monitorització de l'execució de mètodes de l'aplicació, obtenint informació com el temps de resposta i si el resultat és correcte o no.
<br><br>
Per qualsevol dubte respecte a l'ús d'aquests mòduls i la seva evolució prevista us podeu posar en contacte amb el CS Canigó preferiblement via [JIRA CSTD al servei CAN](https://cstd.ctti.gencat.cat/jiracstd/browse/CAN) o [bústia](mailto:oficina-tecnica.canigo.ctti@gencat.cat).
