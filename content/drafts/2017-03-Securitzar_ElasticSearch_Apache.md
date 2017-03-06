+++
date        = "2017-03-01"
title       = "Securitzar l'accés a ElasticSearch des d'una pàgina web"
description = "Securitzar l'accés a ElasticSearch des d'una pàgina web"
section     = "howtos"
categories  = ["canigo"]
key         = "MARÇ2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells que utilitzin ElasticSearch i vulguin utilitzar Apache per a securitzar la connexió amb ElasticSearch.

### Introducció

En casos en que l'accés a l'ElasticSearch es realitzi directament des del navegador de l'usuari cal que el client disposi de les credencials d'accés a aquest ElasticSearch, amb les vulnerabilitats a la seguretat que això implica.

Per evitar-ho es proposa aprovisionar un Proxy intermedi que sigui qui disposi d'aquestes credencials i així evitar la potencial sostracció de credencials.

En aquest HowTo expliquem com configurar un Apache 2.4.

### ElasticSearch

Per aquest howto hem instal·lat mitjançant docker un [ElasticSearch] (https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

Hem modificat el fitxer elasticsearch.yml per a configurar el CORS:

	http.host: 0.0.0.0

	http.cors.enabled : true
	 
	http.cors.allow-origin : "*"
	http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
	http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length

Una vegada desplegat al accedir a localhost:9200 el navegador ens ha de mostrar:

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

Hem utilitzat la [següent aplicació angularJS] (https://github.com/spalger/elasticsearch-angular-example)

Una vegada seguits els passos accedim amb el navegador al fitxer index.html i ens trobem amb el següent error:

![](/related/canigo/howto/imatges/20170301.jpg)

Aquest error és degut al fet que tenim un ElasticSearch securitzat i no hem posat les credencials al index.html, com que precisament és això el que volem evitar aprovisionem un Apache amb les credencials

### Configuració Apache

Per aquest Howto hem desplegat un Apache a [docker] (https://hub.docker.com/r/gencatcloud/httpd/) amb els següents canvis al fitxer httpd.conf:

Hem afegit els següents mòduls:
	
	LoadModule headers_module modules/mod_headers.so
	LoadModule proxy_http_module modules/mod_proxy_http.so
	
I la configuració del proxy és la següent:

	<Location "/">
		RequestHeader set Authorization "Basic ZWxhc3RpYzpjaGFuZ2VtZQ=="
		Require ip 192.168.99.1
		ProxyPass        "http://127.0.0.1:9200/"
		ProxyPassReverse "http://127.0.0.1:9200/"
	</Location>
	
Les credencials d'accés del nostre ElasticSearch són (usuari=elastic, password=changeme).

Perquè Apache sigui conscient d'aquestes credencials les afegim codificades en BASE64 en la sentència RequestHeader (S'ha de codificar en format user:password)

	elastic:changeme ---> ZWxhc3RpYzpjaGFuZ2VtZQ==
	
En aquest exemple hem afegit com a seguretat extra la sentència **Require ip**, aquesta sentència permet indicar les IPs des d'on Apache accepta sol·licituds.
	
Modifiquem el index.html per a canviar la url d'accés a l'ElasticSearch

	 host: 'http://192.168.99.100:9200', -->  host: 'http://192.168.99.100:',
	 
I ara al accedir a l'index.html el navegador ens mostra el següent:

![](/related/canigo/howto/imatges/20170302.jpg)


