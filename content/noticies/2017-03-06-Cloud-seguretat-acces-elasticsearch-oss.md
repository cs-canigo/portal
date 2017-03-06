+++
date = "2017-03-06"
title = "Accés a Elasticsearch a cloud públic"
description = "L'accés a un Elasticsearch a cloud públic té una sèrie de consideracions de seguretat a tenir en compte"
sections = ["cloud"]
blog_tags = ["dbaas", "seguretat"]
key = "MARC2017"
+++

L'accés a un Elasticsearch (ES) a cloud públic té una sèrie de consideracions de seguretat a tenir en compte. En el cas de [Compose](https://www.compose.com/), plataforma utilitzada a solucions de cloud públic per l'aprovisionament de DBaaS, els ES no incorporen el mòdul [X-Pack](https://www.elastic.co/products/x-pack/security) el qual permet securitzar-ne l'accés. Cal incloure doncs mecanismes que impedeixin accessos no autoritzats.

## Seguretat

És imprescindible que els accessos a l'ES només es realitzin des de servidors autoritzats. Serà necessari, per tant, que s'identifiquin les IPs d'accés per tal que es configurin a una whitelist a Compose.

Exemple:

![Whitelist Compose](/images/cloud/whitelist_compose.png)

### Accés des d'una aplicació a Bluemix

En el cas que l'aplicació origen que requereix accés a l'ES estigui a Bluemix, és necessari l'ús del servei [Statica](https://console.ng.bluemix.net/catalog/services/statica).

![Statica](/images/cloud/statica.png)

L'assignació d'una IP fixe de sortida permetrà la seva configuració a la whitelist de Compose.

### Accés des d'una aplicació a CPD corporatiu

Per les aplicacions desplegades a CPD corporatiu caldrà que CPD indiqui la IP de sortida de l'aplicació a Internet. Aquesta és la IP que s'haurà de configurar a la whitelist de Compose.

### Accés des d'una pàgina web

En alguns casos, com per exemple cercadors a portals web, és possible que l'accés a l'ES es realitzi des del navegador de l'usuari. Les planes web no haurien d'incorporar les credencials a l'ES donat que la sostracció d'aquestes podria derivar en un ús indegut. Pels ES que no incorporin el mòdul X-Pack és més important encara, ja que els usuaris tenen privilegis de lectura i escriptura.

#### Proxy

Per tal d'evitar el problema de sostracció de credencials, es recomana que l'accés a l'ES es realitzi via un proxy, per exemple, desplegat a Bluemix. Aquest proxy (Apache, Nginx, ...) serà qui tindrà les credencials d'accés a l'ES. L'accés al proxy només es podrà realitzar des del domini de l'aplicació.

Per els servidors web Nginx i Apache els mòduls que permeten aquesta configuració són [ngx_http_access_module](http://nginx.org/en/docs/http/ngx_http_access_module.html) i [mod_authz_host](https://httpd.apache.org/docs/2.4/mod/mod_authz_host.html) respectivament.

## Cas pràctic

Un escenari real seria el d'una aplicació amb un backend a CPD corporatiu el qual insereix dades a l'ES, i un cercador que les consulta des d'una plana web.

![Seguretat accés a ES a cloud públic](/images/cloud/seguretat_es_cloud_public.png)

- _Administrador_: responsable d'introduïr les dades a l'ES
- _Usuari_: cerca d'informació a l'ES

Existeix una altra opció que consistiria en que el backend també accedís a l'ES a través del Proxy. En aquest cas seria el Proxy quí tindria configurada a la seva whitelist la "ip_sortida_backend", en lloc del Compose.

## Referències

- [Static IPs with Bluemix and Statica](https://www.ibm.com/blogs/bluemix/2015/08/static-ips-with-bluemix-and-statica/)
- [Securing Elasticsearch and Kibana](https://www.elastic.co/guide/en/x-pack/current/xpack-security.html)
