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

* **veure totes les dades** sense tenir que cercar a diferents fonts o eines. El volum de dades no hauria de ser un problema, ja que les eines de gestió de logs centralitzats estan optimitzades i tenen filtres per poder veure únicament el que es necessita
* alta capacitat de **filtratge i cerca** als logs
* visualització de dades en **temps real**
* capacitat per **identificar tendències i anomalies** i correlacionar esdeveniments en els sistemes
* **optimització del temps** dedicat a l'anàlisi de logs, no havent d'anar saltant entre diferents ubicacions de registres de dades i panells
* **generació d'alertes** en temps real basant-se en cerques, informes i quadres de comandament
* **resolució de problemes més àgil** i notificació a les persones adecuades

### ELK

**ELK** (Elasticsearch+Logstash+Kibana) és una de les implantacions més adoptades per solucions de logs centralitzats.

![ELK](/images/bloc/2018/05/ELK.png)

Aquest és el rol de cadascun dels elements:

* _Elasticsearch_: motor de cerca i anàlisi on s'emmagatzemen les dades ja optimitzades per a la indexació, distribuït, tolerant a fallades i alta disponibilitat
* _Logstash_: llegeix les dades de diferents fonts, i fa les transformacions que siguin necessàries per finalment emmagatzemar-les a l'Elasticsearch. Normalment Logstash s'utilitza conjuntament amb Filebeat, el qual s'encarrega de recol·lectar els logs i Logstash de transformar-los
* _Kibana_: permet visualitzar les dades que es troben emmagatzemades a l'Elasticsearch, permetent presentar les dades de forma personalitzada. És l'eina de visualització i anàlisi de dades

![Kibana](/images/bloc/2018/05/kibana.png)

**EFK** (Elasticsearch+Fluentd+Kibana) és una alternativa al stack ELK. Logstash es substitueix per Fluentd, el qual té certs avantatges com menys consum de memòria o suport enterprise.

### Integració d'aplicacions

L´ús de solucions de logs centralitzats ha de ser força transparent a les aplicacions. A continuació distingirem, depenent si l'aplicació està desplegada en una plataforma de contenidors Docker o bé en un CPD virtualitzat tradicional, com s'acostuma a fer aquesta integració:

- En **plataformes de contenidors Docker** les mateixes plataformes ja incorporen una solució de logs centralitzat. Els logs dels contenidors (sortida estàndard) són recol·lectats sense necessitat de realitzar cap configuració a nivell de contenidor. És important que les aplicacions siguin conscients d'aquesta diferència vers CPD, escrivint els logs a la sortida estàndard en lloc de fer-ho a fitxer.

- A **CPD virtualitzat** les aplicacions acostumen a escriure els logs a filesystem. Aquests logs seran recol·lectats per un agent (Filebeat) i enviats cap al repositori de logs centralitzat. Existeixen opcions més intrusives com definir appenders al sistema de logs de l'aplicació per tal que enviïn els logs, però sempre que sigui possible es recomana que sigui un agent el que faci aquesta tasca.

### Referències:

* https://www.elastic.co/elk-stack
* https://logz.io/learn/complete-guide-elk-stack/
* https://logz.io/blog/filebeat-vs-logstash/
* https://logz.io/blog/fluentd-logstash/
* https://www.keycdn.com/blog/log-management/
* https://www.loomsystems.com/blog/single-post/2017/01/30/a-comparison-of-fluentd-vs-logstash-log-collector
