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

### Accés des d'una aplicació a Bluemix

En el cas que l'aplicació origen que requereix accés a l'ES estigui a Bluemix és necessari l'ús del servei [Statica](https://console.ng.bluemix.net/catalog/services/statica).

![Statica](/images/bloc/statica.png)

L'assignació d'una IP fixe de sortida és necessària per ser configurada a la whitelist de Compose.

### Accés des d'una aplicació a CPD corporatiu



### Accés des d'una pàgina web

#### Proxy


## Cas pràctic

DIAGRAMA

## Referències

