+++
date        = "2017-03-02"
title       = "Accés a Elastic Search a cloud públic (Compose)"
description = "L'accés a un Elastic Search a cloud públic (Compose) té una sèrie de consideracions de seguretat a tenir en compte"
sections    = ["Blog", "home"]
blog_tags	= ["dbaas", "seguretat"]
imatge 		= "/images/bloc/elastic-search.png"
aliases       = [
"/bloc/2017/03/acces-elasticsearch-dbaas/"
]
key         = "MARC2017"
+++

L'accés a un Elastic Search (ES) a cloud públic té una sèrie de consideracions de seguretat a tenir en compte. En el cas de [Compose](https://www.compose.com/), plataforma utilitzada a solucions de cloud públic per l'aprovisionament de DBaaS, els ES no incorporen el mòdul [X-Pack|https://www.elastic.co/products/x-pack/security] el qual permet securitzar-ne l'accés. Cal incloure doncs mecanismes que impedeixin accessos no autoritzats. 

## Whitelist a Compose

És imprescindible que els accessos a l'ES només es realitzin des de servidors autoritzats. Serà necessari, per tant, que s'identifiquin les IPs d'accés per tal que es configurin a Compose.

### Accés des d'una aplicació a CPD corporatiu

Per les aplicacions desplegades a CPD corporatiu caldrà que CPD indiqui la IP de sortida de l'aplicació a Internet. Aquesta és la IP que s'haurà de configurar a la whitelist de Compose.

### Accés des d'una aplicació a Bluemix

En el cas que l'aplicació origen que requereix accés a l'ES estigui a Bluemix, és necessari l'ús del servei [Statica](https://console.ng.bluemix.net/catalog/services/statica).

![Statica](/images/bloc/statica.png)

L'assignació d'una IP fixe de sortida és necessària per ser configurada a la whitelist de Compose.

### Accés des d'una pàgina web

En alguns casos, com per exemple cercadors a portals web, és possible que l'accés a l'ES es realitzi des del navegador de l'usuari. Les planes web no haurien d'incorporar les credencials a l'ES donat que la sostracció d'aquestes podria derivar en un ús indegut.

#### Proxy

Per tal d'evitar el problema de sostracció de credencials, es recomana que l'accés a l'ES es realitzi via proxy. Aquest proxy (Apache, Nginx, ...) serà qui tindrà les credencials d'accés a l'ES. L'accés a aquest proxy només es podrà realitzar des del domini de l'aplicació.

Nginx: http://nginx.org/en/docs/http/ngx_http_access_module.html
Apache: https://httpd.apache.org/docs/2.4/howto/access.html

## Cas pràctic

Un escenari real seria el d'un backend a CPD corporatiu el qual insereix dades a l'ES, i un cercador que les consulta.

DIAGRAMA

## Referències

- Compose
- 



