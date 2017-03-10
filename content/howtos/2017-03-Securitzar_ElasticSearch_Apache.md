+++
date        = "2017-03-01"
title       = "Securitzar accés a Elasticsearch des d'una pàgina web"
description = "Securitzar accés a Elasticsearch des d'una pàgina web"
section     = "howtos"
categories  = ["cloud"]
key         = "MARÇ2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells proveïdors d'aplicacions que utilitzin Elasticsearch (ES) i vulguin securitzar la connexió amb l'ES des de navegadors web.

### Introducció

En cas que l'accés a un ES es realitzi directament des del navegador de l'usuari, cal que el client disposi de les credencials d'accés a aquest ES, amb les vulnerabilitats de seguretat que això pot implicar.

Per evitar-ho es proposa aprovisionar un proxy intermig que sigui qui disposi d'aquestes credencials i així evitar-ne la potencial sostracció.

En aquest HowTo expliquem com configurar un Apache 2.4 per a que faci aquesta funció de proxy cap a l'ES.

### Elasticsearch

Per aquest howto hem instal·lat mitjançant Docker un [ES] (https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

Hem modificat el fitxer "elasticsearch.yml" per a configurar el CORS:

	http.host: 0.0.0.0

	http.cors.enabled : true
	 
	http.cors.allow-origin : "*"
	http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
	http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length

Una vegada desplegat al accedir a http://localhost:9200 el navegador ens ha de mostrar:

	{
		name: "OOHe2gg",
		cluster_name: "docker-cluster",
		cluster_uuid: "pzOqu-XkRvGMKM08gcCUVw",
		version: {
		number: "5.2.2",
		build_hash: "f9d9b74",
		build_date: "2017-02-24T17:26:45.835Z",
		build_snapshot: false,
		lucene_version: "6.4.1"
	},
		tagline: "You Know, for Search"
	}
	
### Exemple aplicació Angular

Hem utilitzat la [següent aplicació AngularJS] (https://github.com/spalger/elasticsearch-angular-example) per l'accés a l'ES.

Una vegada seguits els passos pel seu desplegament, accedim amb el navegador al fitxer index.html i ens trobem amb el següent error:

![](/related/canigo/howto/imatges/20170301.JPG)

Aquest error és degut al fet que tenim l'ES securitzat i no hem especificat les credencials al index.html. Com que precisament és això el que volem evitar, aprovisionem un Apache amb les credencials d'accés a l'ES.

### Configuració Apache

Per aquest Howto hem desplegat un Apache amb [Docker] (https://hub.docker.com/r/gencatcloud/httpd/) amb els següents canvis al fitxer httpd.conf:

Hem afegit els següents mòduls:
	
	LoadModule headers_module modules/mod_headers.so
	LoadModule proxy_http_module modules/mod_proxy_http.so
	
I realitzat la següent configuració per la funcionalitat de proxy cap a l'ES:

	<Location "/">
		RequestHeader set Authorization "Basic ZWxhc3RpYzpjaGFuZ2VtZQ=="
		Require ip 192.168.99.1
		ProxyPass        "http://127.0.0.1:9200/"
		ProxyPassReverse "http://127.0.0.1:9200/"
	</Location>

on
* http://127.0.0.1:9200/ és la URL d'accés a l'ES
* 192.168.99.1 és la IP de l'aplicació. En cas d'especificar un domini enlloc d'una IP s'haurà de fer de la següent manera "Require host <domini>"

Les credencials d'accés del nostre ES són (usuari=elastic, password=changeme).

Aquestes credencials s'han d'especificar codificades en BASE64 en la sentència RequestHeader en format "user:password":

	elastic:changeme ---> ZWxhc3RpYzpjaGFuZ2VtZQ==
	
En aquest exemple hem afegit per seguretat (whitelist) la sentència **Require ip**. Aquesta sentència permet indicar les IPs per les que el proxy accepta sol·licituds.
	
Modifiquem el index.html per a canviar la url d'accés per a que apunti al proxy:

	 host: 'http://192.168.99.100:9200' (ES) -->  host: 'http://192.168.99.100' (proxy),
	 
Ara al accedir a l'index.html el navegador ens mostrarà correctament l'estat de l'ES:

![](/related/canigo/howto/imatges/20170302.JPG)
