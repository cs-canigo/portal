+++
date        = "2016-05-11"
title       = "Arquitectures tipus"
description = "Exemples d'arquitectures"
weight      = 3
toc 		= true
categories  = ["cloud","docker","container","paas"]
+++

## xPaaS + DBaaS

- Exemple d'aplicació: http://serveisoberts.gencat.cat
- Desplegat a Bluemix
- Composat per:
	- Buildpack: NodeJS, amb **escalat automàtic**
	- DBaaS: MongoDB

## Docker aplicació + Docker base de dades

- Exemple d'aplicació: https://jocdelsdrets.gencat.cat
- Desplegat a Bluemix
- Composat per:
	- Grup de contenidors Docker per a la capa d'aplicació, amb **escalat automàtic**
	- Contenidor MySQL per a la capa de base de dades

## Docker-compose a Bluemix

- Bluemix suporta la creació d'aplicacions multicontainer mitjançant docker-compose
- https://new-console.ng.bluemix.net/docs/containers/container_creating_ov.html#container_compose_ov
- A diferència que els grup de contenidors, si es vol escalar una de les capes (per exemple, la capa d'aplicació), cal aprovisionar un balancejador, en aquest cas es proposa NGinx o HAProxy.

A continuació es descriuen diferents exemples arquitectures d'aplicació desplegades amb Docker-compose a Bluemix:

* **Stack "tradicional" JEE**: JSF amb context "/AppJava" per separació contingut estàtic i dinàmic

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-AppJava).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

Aquest és un stack que ja no s'hauria d'utilitzar per noves aplicacions.

* **Stack "arquitectura moderna" JEE**: serveis REST i presentació desacoblada

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-REST).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

* **Stack MEAN (MongoDB+Express+AngularJS+NodeJS)**

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-MEAN).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

* **Stack LAMP (Linux+PHP+MySQL)**

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-LAMP).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```
