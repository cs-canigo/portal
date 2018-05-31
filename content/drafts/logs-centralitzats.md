+++
date        = "2018-05-31"
title       = "Logs centralitzats"
description = "Cada cop és més comú l'ús de solucions de logs centralitzats. En aquest article parlem d'aquestes solucions i les opcions d'integració per part de les aplicacions"
blog_tags   = ["logs","microserveis"]
categories  = ["logs-centralitzats"]
imatge      = "/images/bloc/2018/05/centralized_logging.png"
+++

### ELK

**ELK** (Elasticsearch, Logstash, Kibana) és una de les implantacions més adoptades per solucions de logs centralitzats. Filebeat i Logstash s'encarreguen de recol·lectar els logs (Filebeat) i transformar-los (Logstash) en cas que sigui necessari abans de ser enviats cap al repositori (Elasticsearch). El motor de cerca d'Elasticsearch permetrà des del visualitzador (Kibana) consultar els logs de les diferents aplicacions:

![ELK](/images/news/ELK.png)

### Integració d'aplicacions

Existeixen opcions més intrusives com definir appenders al sistema de logs de l'aplicació per tal que enviïn els logs a Filebeat o Logstash, però sempre que sigui possible es recomana que sigui l'agent de Filebeat o Logstash qui recol·lecti la informació.

En **plataformes de contenidors Docker** les mateixes plataformes ja incorporen una solució de logs centralitzat. Els logs dels contenidors (sortida estàndard) són recol·lectats sense necessitat de realitzar cap configuració a nivell de contenidor. És important que les aplicacions siguin conscients d'aquesta diferència vers CPD, escrivint els logs a la sortida estàndard en lloc de fer-ho a fitxer. També cal tenir-ho en compte també en aplicacions Canigó.


. Els logs de les aplicacions ubicats a filesystems seran recol·lecats i enviats cap aquest servei.

Referències:

* https://logz.io/learn/complete-guide-elk-stack/
* https://logz.io/blog/filebeat-vs-logstash/
* https://logz.io/blog/fluentd-logstash/
