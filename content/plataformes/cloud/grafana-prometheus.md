+++
date = "2024-05-06"
title = "Grafana i Prometheus"
description = "Procediment de Desplegament de Grafana i Prometheus"
sections    = "Cloud"
weight      = 15
toc = true
categories  = ["cloud","grafana","prometheus"]
aliases     = ["/cloud/grafana-prometheus/"]
key = "JUNY2018"
+++


## Desplegament de Grafana i Prometheus 
 
En els següents apartats es descriu el procediment per realitzar el desplegament dels serveis Grafana i Prometheus per a una aplicació desplegada a OpenShift.

En primer lloc, s’ha de sol·licitar a Suport Cloud, pels canals oficials de comunicació ([Comunicació proveïdors d'aplicacions amb Suport Cloud (gencat.cat)](https://canigo.ctti.gencat.cat/plataformes/cloud/comunicacio-suport-cloud/)), la creació de dos Service Account pels serveis de grafana i prometheus en el namespace en què s'efectuarà el desplegament dels serveis. El nom de les service account a crear són "grafana" i "prometheus" respectivament.
 
L' estructura del repositori ha de ser similar al d'altres aplicacions. Els fitxers s'han de situar en la branca màster per a que es pugui desplegar mitjançant SIC i ha d' existir un directori anomenat sic en el qual es trobarà el fitxer aca.yaml. S' enllacen els fitxers aca.yaml que poden ser utilitzats com a referència per al desplegament dels serveis: 

* [Fitxer aca.yaml per a Grafana](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/aca-grafana.yaml)
* [Fitxer aca.yaml per a Prometheus](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/aca-prometheus.yaml)

Al fitxer aca.yaml s'enllaça la url del repositori dels orquestradors a desplegar, com es pot veure a la línia 11 dels fitxers aca.yaml enllaçats. S'adjunta una imatge d'un repositori a mode d' exemple.

![Repo-Grafana-Prometheus](/related/cloud/repo-grafana-prometheus.png)

Depenent del CPD i cluster d'Openshift en el qual es trobi el namespace en què es vagin a desplegar aquests serveis, hi pot haver lleugeres modificacions en els orquestradors. En els següents punts s'inclouen exemples i instruccions de parametrització d'orquestradors per a cadascun dels Cluster d'Openshift i CPD.

## CPD2 i CPD3

Per realitzar el desplegament de tots els components requerits pels serveis de grafana i prometheus al namespace on està desplegada l' aplicació cal incloure els següents descriptors: 

* Grafana

S'han de desplegar els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmaps i secret. Les següents plantilles es poden utilitzar com a referència substituint els paràmetres segons s'indica a continuació:

* [Grafana Configmap 1](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-configmap1.yaml)
* [Grafana Configmap 2](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-configmap2.yaml)
* [Grafana Configmap 3](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-configmap3.yaml)
* [Grafana Configmap 4](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-configmap4.yaml)
* [Grafana Configmap 5](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-configmap5.yaml)
* [Grafana PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-pvc-cpd2-cpd3.yaml)
* [Grafana Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-role.yaml)
* [Grafana Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-ingress.yaml)
* [Grafana Secret](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-secret.yaml)
* [Grafana Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-service.yaml)
* [Grafana Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd2-cpd3/grafana-statefulset.yaml)

En tots els fitxers, substituir l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer grafana-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei.

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per:
* Si es tracta de CPD2, "external-001" o "internal-001" segons si el domini és d'internet o intranet respectivament.
* Si es tracta de CPD3, "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.grafana.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-grafana-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer grafana-pvc-cpd2-cpd3.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

Finalment, en el fitxer grafana-secret.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64.

* Prometheus

S' han de desplegar els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmap i secret.  Les següents plantilles es poden utilitzar com a referència substituint els paràmetres segons s'indica a continuació:

* [Prometheus Configmap](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/configmap-prometheus-comun.yaml)
* [Prometheus PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/prometheus-pvc-cpd2-cpd3.yaml)
* [Prometheus Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/prometheus-role.yaml)
* [Prometheus Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/prometheus-ingress.yaml)
* [Prometheus Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/prometheus-service.yaml)
* [Prometheus Secret](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/secret-prometheus-comun.yaml)
* [Prometheus Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd2-cpd3/statefulset-prometheus-basic.yaml)

En tots els fitxers han de ser parametritzats substituint en l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer prometheus-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei.

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per:
* Si es tracta de CPD2, "external-001" o "internal-001" segons si el domini és d'internet o intranet respectivament.
* Si es tracta de CPD3, "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.prometheus.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-prometheus-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer prometheus-pvc-cpd2-cpd3.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

Finalment, en el fitxer secret-prometheus.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64.

## CPD4 Transversal

Per realitzar el desplegament de tots els components requerits pels serveis de grafana i prometheus al namespace on està desplegada l'aplicació cal incloure els següents descriptors:

* Grafana

S'han de desplegar els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmaps i secret. Les següents plantilles es poden utilitzar com a referència substituint els paràmetres segons s'indica a continuació:

* [Grafana Configmap 1](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap1.yaml)
* [Grafana Configmap 2](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap2.yaml)
* [Grafana Configmap 3](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap3.yaml)
* [Grafana Configmap 4](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap4.yaml)
* [Grafana Configmap 5](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap5.yaml)
* [Grafana PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-pvc-cpd4-salut.yaml)
* [Grafana Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-role.yaml)
* [Grafana Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-ingress.yaml)
* [Grafana Secret](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-secret.yaml)
* [Grafana Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-service.yaml)
* [Grafana Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-statefulset.yaml)


En tots els fitxers, substituir l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer grafana-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei. 

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.grafana.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-grafana-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer grafana-pvc-cpd4-salut.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

Finalment, en el fitxer grafana-secret.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64.

* Prometheus

S'han de desplegar els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmap i secret.  Les següents plantilles es poden utilitzar com a referència substituint els paràmetres segons s'indica a continuació:

* [Prometheus Configmap](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/configmap-prometheus-comun.yaml)
* [Prometheus PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/prometheus-pvc-cpd4-salut.yaml)
* [Prometheus Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/prometheus-role.yaml)
* [Prometheus Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/prometheus-route.yaml)
* [Prometheus Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/prometheus-service.yaml)
* [Prometheus Secret](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/secret-prometheus-comun.yaml)
* [Prometheus Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/statefulset-prometheus-basic.yaml)

En tots els fitxers han de ser parametritzats substituint en l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer prometheus-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei. 

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.prometheus.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-prometheus-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer prometheus-pvc-cpd4.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

Finalment, en el fitxer secret-prometheus.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64. 

## CPD4 Salut

Per realitzar el desplegament de tots els components requerits pels serveis de grafana i prometheus al namespace on està desplegada l' aplicació cal incloure els següents descriptors:

* Grafana

Es necessiten els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmaps i secret. S'adjunten els descriptors que poden ser utilitzats com a referència:

* [Grafana Configmap 1](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap1.yaml)
* [Grafana Configmap 2](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap2.yaml)
* [Grafana Configmap 3](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap3.yaml)
* [Grafana Configmap 4](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap4.yaml)
* [Grafana Configmap 5](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-configmap5.yaml)
* [Grafana PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-pvc-cpd4-salut.yaml)
* [Grafana Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-role.yaml)
* [Grafana Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-ingress.yaml)
* [Grafana Secret](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-secret.yaml)
* [Grafana Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-service.yaml)
* [Grafana Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/grafana/cpd4-salut/grafana-statefulset.yaml)

En tots els fitxers, substituir l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer grafana-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei. 

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.grafana.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-grafana-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer grafana-pvc-cpd4-salut.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

Finalment, en el fitxer grafana-secret.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64. 

* Prometheus

S' han de desplegar els següents components: Ingress (Que generarà una ruta de manera automàtica), role, servei, statefulset, configmap i secret.  Les següents plantilles es poden utilitzar com a referència substituint els paràmetres segons s'indica a continuació:

* [Prometheus Configmap](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/configmap-prometheus-comun.yaml)
* [Prometheus PVC](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/prometheus-pvc-cpd4-salut.yaml)
* [Prometheus Role](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/prometheus-role.yaml)
* [Prometheus Ingress](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/prometheus-ingress.yaml)
* [Prometheus Service](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/prometheus-service.yaml)
* [Prometheus Secret 1](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/secret-prometheus-basic-salut.yaml)
* [Prometheus Secret 2](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/secret-prometheus-comun.yaml)
* [Prometheus Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/cpd4/statefulset-prometheus-basic.yaml)

En cas d'haver consensuat amb Arquitectura del Departament de Salut l'ús de l'autorització delegada per l'Identity Provider de Salut, s'han d'utilitzar les plantilles següents per a l'Stateful Set:
* [Prometheus Stateful Set](https://git.intranet.gencat.cat/3048-intern/documentacio/-/blob/master/public/prometheus/salut/statefulset-prometheus-basic-salut.yaml)

En aquest cas, al fitxer statefulset-prometheus-basic-salut.yaml s'ha de substituir l'expressió "${IDENTITY_PROVIDER_URL}" per l'OIDC Issuer URL de l'Identity Provider a utilitzar.

En tots els fitxers han de ser parametritzats substituint en l'expressió "${NAMESPACE}" pel nom del namespace de l'aplicació.

En el fitxer prometheus-ingress.yaml s'ha de substituir l'expressió "${ROUTE_URL}" pel domini sol·licitat per al servei. 

En el mateix fitxer, l'expressió "${ROUTER_LABEL}" es substituirà per "internet" o "intranet" segons si el domini és d'internet o intranet respectivament.

En el mateix fitxer, l'expressió "${SECRET_NAME}" se substituirà pel nom del secret de Openshift, del mateix namespace, que contingui el certificat. El nom d'aquest secret es compon de la manera següent:

Si el domini utilitzat és el següent:
**preproduccio.prometheus.intranet.gencat.cat**

El nom del secret serà:
**preproduccio-prometheus-intranet-secret-certificate**

És a dir, es reemplacen els punts per guions, i "gencat.cat" per "secret-certificate".

(Encara que sapiguem el nom del secret per endavant, no es generarà un objecto de tipus Route automàticament si no existeix el secret en el namespace)

En el fitxer prometheus-pvc-cpd4.yaml es substituirà l'etiqueta "${PVC_SIZE}" per la mida de pvc assignat en l'aprovisionament.

En el fitxer secret-prometheus.yaml s'ha de substituir l'expressió "${SESSION_SECRET}" per qualsevol combinació de 43 caràcters de longitud compresos en el següent interval [a-zA-Z0-9] i codificat en base64. 

En el fitxer statefulset-prometheus-basic-salut.yaml s'han de parametrar els valors tant de cpu com de memòria que volem que rebin tant el contenidor prom-proxy com el contenidor prometheus. Per a això cal substituir les expressions ${CPU_PROXY} i ${MEM_PROXY} per al contenidor prom-proxy i ${CPU_PROMETHEUS} i ${MEM_PROMETHEUS} per al contenidor prometheus amb els valors de CPU i memòria desitjats.

