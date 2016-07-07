+++
date        = "2016-05-11"
title       = "Arquitectures tipus"
description = "Exemples d'arquitectures"
weight      = 3
toc 		= true
categories  = ["cloud","docker","container","paas"]
+++

## Introducció

### Docker-compose

Els diferents stacks tecnològics descrits en aquesta plana utilitzen [docker-compose](https://docs.docker.com/compose/).

#### Desplegament en entorns de desenvolupament

Cal haver [instal·lat](https://docs.docker.com/compose/install/) prèviament docker-compose.

#### Desplegament a Bluemix

- Bluemix suporta la creació d'aplicacions multicontainer mitjançant [docker-compose](https://new-console.ng.bluemix.net/docs/containers/container_creating_ov.html#container_compose_ov)
- A diferència que els grup de contenidors, si es vol escalar una de les capes (per exemple, la capa d'aplicació), cal aprovisionar un balancejador, en aquest cas es proposa HAProxy.
- En un futur proper serà possible desplegar aplicacions en contenidors definides amb docker-compose a Bluemix mitjançant el [SIC](http://canigo.ctti.gencat.cat/sic/).

## Stack "tradicional" JEE (<span style='color:red;'>DRAFT</span>)

Aplicació JSF (Java Server Faces) amb context "/AppJava" per separació contingut estàtic i dinàmic.

<div class="message warning">
<b>Avís</b>
<br><br>
Aquest és un stack que ja no s'hauria d'utilitzar per noves aplicacions.
</div>

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-AppJava).

_docker-compose.yml_
```
gicar:
 build: ./gicarAppJava/
 links:
  - demo
 ports:
  - 80:80
 environment:
  PS_IP: 169.50.103.27
  AgentConfigDocker: a6-demoFORM
  ContainerHostName: [nom del contenidor]
  AGENTNAME: a6-demoform,[nom de domini.gencat.cat]
  HCOGICAR: a6
  GICARUSER: registre
  GICARPWD: registre
  APPSERVER_PORT_8080_TCP_ADDR: demo
  APPSERVER_PORT_8080_TCP_PORT: 8080 
  context: canigoJSF
 volumes:
  - /home/canigo/demo-JEE-AppJava/target/canigoJSF-static:/var/www/html/canigoJSF
db:
  build: ./bbdd/
  ports:
    - 3306:3306
  environment:
    MYSQL_USER : user
    MYSQL_PASSWORD : password
    MYSQL_ROOT_PASSWORD: root
    MYSQL_DATABASE: demo
  volumes:
   - /home/canigo/demo-JEE-AppJava/mysql-datadir:/var/lib/mysql
demo:
  build: ./app/
  links:
    - db:mybbdd
  volumes:
   - /home/canigo/demo-JEE-AppJava/target/canigoJSF-dynamic:/opt/tomcat/webapps/canigoJSF
  ports:
   - 8080:8080
   - 8000:8000
```
Els paths "/home/canigo/..." han d'adaptar-se als locals.

- _canigoJSF-static_: directori amb el contingut estàtic de l'aplicació
- _canigoJSF-dynamic_: directori amb el contingut dinàmic de l'aplicació
- _mysql-datadir_: directori amb les dades del MySQL. Es crearà amb tot el contingut en iniciar per primera vegada l'aplicació

_Nota: El valor nom del contenidor i el nom de domini els tria l'usuari

Comandes per iniciar l'aplicació:

```
$ git clone https://github.com/gencatcloud/demo-JEE-AppJava.git demo-JEE-AppJava
$ cd demo-JEE-AppJava
$ mvn package
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d

```

En cas de voler reconstruir les imatges cal afegir la opció "--build":

```
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d --build
```

Accedir a http://localhost/canigoJSF i introduïr l'usuari "[user]" i contrasenya "[password]".

_Nota: L'usuari i contrasenya per l'accés a l'aplicació es publicaran pròximament_

## Stack "arquitectura moderna" JEE (<span style="color:red;">DRAFT</span>)

Aplicació basada en serveis REST i presentació desacoblada

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-REST).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

## Stack MEAN (<span style="color:red;">DRAFT</span>)

Aplicació basada en MongoDB+Express+AngularJS+NodeJS

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-MEAN).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

## Stack LAMP (<span style="color:red;">DRAFT</span>)

Aplicació basada en Linux+PHP+MySQL

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-LAMP).

_docker-compose.yml_
```
PENDENT
```

Comandes per iniciar l'aplicació:

```
PENDENT
```

## Altres

A més de contenidors Docker, també és possible utilitzar xPaaS i DBaaS. Aquests són alguns casos d'èxit:

### xPaaS + DBaaS

- Exemple d'aplicació: http://serveisoberts.gencat.cat
- Desplegat a Bluemix
- Composat per:
	- Buildpack: NodeJS, amb **escalat automàtic**
	- DBaaS: MongoDB

### Docker aplicació + Docker base de dades

- Exemple d'aplicació: https://jocdelsdrets.gencat.cat
- Desplegat a Bluemix
- Composat per:
	- Grup de contenidors Docker per a la capa d'aplicació, amb **escalat automàtic**
	- Contenidor MySQL per a la capa de base de dades
