+++
date        = "2016-05-11"
title       = "Arquitectures tipus"
description = "Exemples d'arquitectures"
sections    = "Container Cloud"
weight      = 5
toc 	    = true
categories  = ["cloud","docker","container","paas"]
+++

## Introducció

### Docker-compose

Els diferents stacks tecnològics descrits en aquesta plana utilitzen [Docker Compose](https://docs.docker.com/compose/).

#### Desplegament en entorns de desenvolupament

Cal haver [instal·lat](https://docs.docker.com/compose/install/) prèviament Docker Compose.

#### Desplegament a Bluemix

- Bluemix suporta la creació d'aplicacions multicontainer mitjançant Docker Compose.
- A diferència que els grup de contenidors, si es vol escalar una de les capes (per exemple, la capa d'aplicació), cal aprovisionar un balancejador, en aquest cas es proposa HAProxy.
- A Bluemix, és necessari configurar un procés d'espera entre els contenidors que tinguin relacions entre ells (per exemple l'aplicació ha d'esperar que la bbdd estigui operativa per a funcionar). Per a realitzar aquesta espera s'utiliza el procés wait-for-it.sh. Un exemple del seu ús es pot veure al [Stack “arquitectura moderna” JEE]({{< relref "#stack-arquitectura-moderna-jee" >}})
- En un futur proper serà possible desplegar aplicacions en contenidors definides amb docker-compose a Bluemix mitjançant el [SIC](http://canigo.ctti.gencat.cat/sic/).

## Stack "tradicional" JEE

![Spring](/related/cloud/spring.png "Spring") ![JSF](/related/cloud/jsf.jpg "JSF")

Aplicació JSF (Java Server Faces) amb context "/AppJava" per separació contingut estàtic i dinàmic.

<div class="message warning">
<b>Avís</b>
<br>
Aquest és un stack que ja no s'hauria d'utilitzar per noves aplicacions.
</div>

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-AppJava).

Comandes per iniciar l'aplicació:

```
$ git clone https://github.com/gencatcloud/demo-JEE-AppJava.git demo-JEE-AppJava
$ cd demo-JEE-AppJava
$ mvn package
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d
```
Abans d'executar la última comanda és necessari modificar el fitxer "docker-compose.yml" ubicat al directori "demo-JEE-AppJava/src/main/docker":

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

<div class="message information">
<b>Informació</b>
<br>
El valor "nom del contenidor" i el "nom de domini" els tria l'usuari. Per exemple:<br><br>
<i>ContainerHostName</i>: dev<br>
<i>AGENTNAME</i>: a6-demoform, provademo.gencat.cat<br><br>
En cas de voler accedir per domini en comptes de localhost, s'ha de mappejar aquest domini/ip al fitxer host
(En linux /etc/host, en Windows C:\Windows\System32\drivers\etc\hosts)
</div>

En cas de voler reconstruir les imatges, cal afegir la opció "--build" a la comanda "docker-compose up":

```
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d --build
```

Accedir des d'un navegador web a http://localhost/canigoJSF i introduïr l'usuari "NIFDEMO" i contrasenya "12345678". Els contenidors triguen a aixecar-se entre 30s i 60s, i per tant, cal esperar a realitzar l'accés aquest temps ja que en cas contrari l'aplicació no respondrà.

## Stack "arquitectura moderna" JEE

![Spring](/related/cloud/springboot.png "Spring Boot") ![Resftul API](/related/cloud/resftulapi.jpg "Resftul API") ![HTML5 JS CSS](/related/cloud/htmljscss.png "HTML5 JS CSS")

Aplicació basada en serveis REST i presentació desacoblada

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-JEE-REST).

Comandes per iniciar l'aplicació:

```
$ git clone https://github.com/gencatcloud/demo-JEE-REST.git demo-JEE-REST
$ cd demo-JEE-REST
$ mvn package
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d
```

Abans d'executar la última comanda és necessari modificar el fitxer "docker-compose.yml" ubicat al directori "demo-JEE-REST/src/main/docker":

_docker-compose.yml_
```
lb:
 image: gencatcloud/haproxy:1.5.1
 links:
  - bookstore
 ports:
  - 80:80
db:
  image: gencatcloud/postgres:9.5.3
  ports:
    - 5432:5432
  environment:
    POSTGRES_USER: demospringboot
    POSTGRES_PASSWORD: password
  volumes:
    - /home/canigo/demo-JEE-REST/postgres-datadir:/var/lib/postgresql/data
bookstore:
  build: ./app/
  links:
    - db:postgres
  volumes:
   - /home/canigo/demo-JEE-REST/target/:/tmp
  ports:
    - 8080:8080
    - 8000:8000
  command: bash -c "/wait-for-it.sh postgres:5432 -t 240 && /entrypoint.sh"
```

El paths “/home/canigo/…” han d’adaptar-se als locals.

- /home/canigo/demo-JEE-REST/target/: directori on es troba el war de l'aplicació
- /home/canigo/demo-JEE-REST/postgres-datadir: directori amb les dades del Postgres. Es crearà amb tot el contingut en iniciar per primera vegada l'aplicació.

En cas de voler reconstruir les imatges, cal afegir la opció "--build" a la comanda "docker-compose up":

```
$ docker-compose -f ./src/main/docker/docker-compose.yml up -d --build
```

Accedir des d'un navegador web a http://localhost/ i introduïr l'usuari "admin" i contrasenya "admin". Els contenidors triguen a aixecar-se entre 30s i 60s, i per tant, cal esperar a realitzar l'accés aquest temps ja que en cas contrari s'obtindrà un error "503 Service Unavailable".

## Stack MEAN

![MEAN](/related/cloud/stack_mean.png "MEAN")

Aplicació basada en MongoDB+Express+AngularJS+NodeJS

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-MEAN).

Comandes per iniciar l'aplicació:

```
$ git clone https://github.com/gencatcloud/demo-MEAN.git demo-MEAN
$ cd demo-MEAN
$ docker-compose -f ./docker/docker-compose.yml up -d
```

Abans d'executar la última comanda és necessari modificar el fitxer "docker-compose.yml" ubicat al directori "demo-MEAN/docker":

_docker-compose.yml_
```
db:
  image: gencatcloud/mongodb:3.2
  ports:
    - 27017:27017
    - 28017:28017
  environment:
    MONGODB_USER : user
    MONGODB_PASS : password
    MONGODB_DATABASE : contactlist
  volumes:
    - /home/canigo/demo-MEAN/datadir:/data/db
demo:
  image: gencatcloud/nodejs:4.2.6
  links:
    - db:mybbdd
  volumes:
   - /home/canigo/demo-MEAN:/app
  ports:
   - 3000:3000
  command: bash -c "cd /app && npm install && node server"
```

El paths “/home/canigo/…” han d’adaptar-se als locals.

En cas de voler reconstruir les imatges, cal afegir la opció "--build" a la comanda "docker-compose up":

```
$ docker-compose -f ./docker/docker-compose.yml up -d --build
```

Accedir a http://localhost:3000/.

## Stack LAMP 

![LAMP](/related/cloud/lamp.gif "LAMP")

Aplicació basada en Linux+PHP+MySQL

Podeu trobar el codi font d'aquesta demo a [Github](https://github.com/gencatcloud/demo-LAMP).

Comandes per iniciar l'aplicació:

```
$ git clone https://github.com/gencatcloud/demo-LAMP.git demo-LAMP
$ cd demo-LAMP
$ docker-compose -f ./docker/docker-compose.yml up -d
```

Abans d'executar la última comanda és necessari modificar el fitxer "docker-compose.yml" ubicat al directori "demo-LAMP/docker":

_docker-compose.yml_
```
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
   - /home/canigo/demo-LAMP/mysql-datadir:/var/lib/mysql
demo:
  build: ./app/
  links:
    - db:mybbdd
  volumes:
   - /home/canigo/demo-LAMP:/var/www/html/demo-LAMP
  ports:
   - 80:80
```

El paths “/home/canigo/…” han d’adaptar-se als locals.

En cas de voler reconstruir les imatges, cal afegir la opció "--build" a la comanda "docker-compose up":

```
$ docker-compose -f ./docker/docker-compose.yml up -d --build
```

Accedir a http://localhost/demo-LAMP/.

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
