+++
date        = "2018-05-31"
title       = "Logs centralitzats"
description = "Cada cop és més comú l'ús de solucions de logs centralitzats. En aquest article parlem d'aquestes solucions i les opcions d'integració per part de les aplicacions"
blog_tags   = ["logs","microserveis"]
categories  = ["logs-centralitzats"]
imatge      = "/images/bloc/2018/05/centralized_logging.png"
+++

### Avantatges

La gestió de logs de forma centralitzada té una sèrie d'avantatges:

* evidenment una de les principals és la posibilitat de **veure totes les dades** sense tenir que cercar a diferents fonts o eines. El volum de dades no hauria de ser un problema, ja que les eines de logs centralitzats estan optimitzades i tenen filtres per poder veure únicament el que es necessita
* visualització de dades en **temps real**
* capacitat per **identificar tendències i anomalíes** i correlacionar events en els sistemes
* **optimització del temps** dedicat a l'anàlisi de logs, no tenint que anar saltant entre diferents ubicacions de registres de dades i panells
* **generació d'alertes** en temps real en base a cerques, informes i quadres de comandament
* **resolució de problemes més àgil** i notificació a les persones adecuades

### ELK

**ELK** (Elasticsearch+Logstash+Kibana) és una de les implantacions més adoptades per solucions de logs centralitzats. Aquest és el rol de cadascun dels elements:

* _Elasticsearch_: motor de cerca i anàlisi on s'emmagatzemen les dades ja optimizades per a la indexació, distribuït, tolerant a fallades i alta disponibilitat
* _Logstash_: llegeix les dades de diferents fonts, fa les transformacions que siguin necessaries per finalment emmagatzemar-les en aquest cas a Elasticsearch. Normalment Logstash s'utilitza conjuntament amb Filebeat, el qual s'encarrega de recol·lectar els logs, i Logstash transformar-los
* _Kibana_: permet visualitzar les dades que es troben emmagatzemades a l'Elasticsearch, permetent presentar les dades de forma personalitzada. És l'eina de visualització i anàlisi de dades

![ELK](/images/news/ELK.png)

**EFK** (Elasticsearch+Fluentd+Kibana) TODO

### Integració d'aplicacions

Existeixen opcions més intrusives com definir appenders al sistema de logs de l'aplicació per tal que enviïn els logs a Filebeat o Logstash, però sempre que sigui possible es recomana que sigui l'agent de Filebeat o Logstash qui recol·lecti la informació.

En **plataformes de contenidors Docker** les mateixes plataformes ja incorporen una solució de logs centralitzat. Els logs dels contenidors (sortida estàndard) són recol·lectats sense necessitat de realitzar cap configuració a nivell de contenidor. És important que les aplicacions siguin conscients d'aquesta diferència vers CPD, escrivint els logs a la sortida estàndard en lloc de fer-ho a fitxer. També cal tenir-ho en compte també en aplicacions Canigó.


. Els logs de les aplicacions ubicats a filesystems seran recol·lecats i enviats cap aquest servei.

Referències:

* https://www.keycdn.com/blog/log-management/
* https://logz.io/learn/complete-guide-elk-stack/
* https://logz.io/blog/filebeat-vs-logstash/
* https://logz.io/blog/fluentd-logstash/
