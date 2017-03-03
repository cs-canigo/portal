+++
date = "2017-03-02"
title = "Elasticsearch, open source en cloud públic amb orientació empresarial"
description = "L'accés a un Elasticsearch a cloud públic té una sèrie de consideracions de seguretat a tenir en compte"
sections = ["Blog", "home"]
blog_tags = ["dbaas", "seguretat"]
imatge = "/images/bloc/elastic-search.png"
aliases = [
"/bloc/2017/03/acces-elasticsearch-dbaas/"
]
key = "MARC2017"
+++

La base de dades Elasticsearch (ES) en la seva versió de programari lliure no incorpora el mòdul de seguretat [X-Pack](https://www.elastic.co/products/x-pack/security) que permet gestionar-ne els permisos de connexió per prevenir accessos no autoritzats.

La gestió de la seguretat de la base de dades dedicada a cerques esdevé encara més crítica quan es tracta de solucions hostatjades en clouds públics i per a solucions amb visibilitat en portals web de lliure accés.

## Accés des d’una pàgina web

En alguns casos, com per exemple cercadors a portals web, és possible que l’accés a l’ES es realitzi directament des del navegador de l’usuari. Per fer-ho, cal que el client disposi de les credencials d’accés a l’ES. No entrarem en detall sobre millors pràctiques de seguretat al respecte, però ho deixarem en què és una pràctica clarament insegura. Pels ES que no incorporin el mòdul X-Pack és més important encara, ja que els usuaris tenen privilegis de lectura i escriptura.

Una opció que nosaltres hem implementat amb èxit per evitar aquesta problemàtica és aprovisionar un Proxy intermig que evita la potencial sostracció de credencials.

Les planes web no haurien d’incorporar les credencials a l’ES donat que la sostracció d’aquestes podria derivar en un ús indegut. Pels ES que no incorporin el mòdul X-Pack és més important encara, ja que els usuaris tenen privilegis de lectura i escriptura.

Tenir en compte que el tràfic entre el Proxy i l’ElasticSearch ha d’estar encriptat per a evitar que es pugui interceptar les credencials.

## Accés per la indexació de contingut

Addicionalment a la mesura anterior, és molt recomanable també implementar un control sobre les IP que podran accedir a l’ES per fer les gravacions d’informació que conformen l’índex.

En el nostre cas, també s’ha posat en pràctica aquest filtratge i l’ES disposa d’una whitelist que només permet l’accés des del backend per poder administar-ne el contingut. 

Malgrat tot, si per algun motiu això no fos possible, alternativament també es podria utilitzar el Proxy que desacobla els accessos de les aplicacions per habilitar-hi el mecanisme de filtratge d’IPs en mode whitelist.

![Seguretat accés a ES a cloud públic](/images/bloc/seguretat_es_cloud_public_generic.png)

## Referències

- [Securing Elasticsearch and Kibana](https://www.elastic.co/guide/en/x-pack/current/xpack-security.html)
