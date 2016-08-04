+++
date        = "2016-01-12"
title       = "APIs RESTful: millors pràctiques"
description = "Millors pràctiques per a la construcció d'APIs REST"
toc 		= true
sections    = ["Bloc", "home"]
bloc_tags	= ["bones pràctiques", "api", "desenvolupament"]
imatge 		= "/images/bloc/json-api.png"
+++

Aquest document pretèn unificar la manera d'interaccionar amb les APIs que ofereixin els diferents sistemes de la Generalitat, ja siguin públics o d'ús intern.

## Acords generals

- Utilitzarem estàndards HTTP: verbs, http codes, headers, ...
- Els recursos exposats a través de la API seran en plural ("aplicacions" enlloc d' "aplicacio")
- El format per defecte serà JSON. No es contemplaran altres formats, en general.
- Si exposem dades d'accés públic, inclourem un paràmetre "callback" per a poder fer peticions JSONP
- Paràmetres del querystring reservats explicats més endavant:
	
	- fields
	- sort
	- q
	- limit
	- offset
	- v

- La nostra API es publicarà en el path /api del nostre domini:
	
		http://subdomini.gencat.cat/api

## Verbs HTTP
 
- GET = select
- POST = insert
- PATCH = update
- DELETE

###	 Exemple

L'esquema general de la nostra uri serà el següent:

		http://subdomini.gencat.cat/api/{recurs}/{id}

Imaginem que la nostra API gestiona el recurs "Aplicació". La notra API exposarà aquests recursos amb el verbs http de la manera següent:

- GET **/aplicacions** - obté el llistat de totes les aplicacions
- GET **/aplicacions/{id}** - obté la informació de l'aplicació amb l'id corresponent passat a l'URI
- POST **/aplicacions** - crea una nova aplicació
- PATCH **/aplicacions/{id}** - actualitza l'aplicació amb l'id corresponent passat a l'URI
- DELETE **/aplicacions/{id}** - elimina l'aplicació amb l'id corresponent passat a l'URI	

## Esquemes JSON

- GET

			{
				data : {

					total : 976,  //nombre total dels resultats de la petició
					limit : 100,  //màxim nombre de resultats a retornar per a cada petició
					offset : 200, //en quin resultat del total comença aquesta petició 
					
					included : [  //array de resultats
						{
							id : 1,
							attributes : {
								camp1 : "A",
								camp2 : "B"
							}
						},
						{
							id : 2,
							attributes : {
								camp1 : "C",
								camp2 : "D"
							}
						},
						...
					]
				} 
			}

- GET/POST/PATCH/DELETE

			{
				errors : [
					{
						code : 401,
						desc : "l'usuari proporcionat no té permisos d'accés"
					}
				]
			}

- GET/POST/PATCH - Elements individuals


			{
				id : 1, // en el cas del POST no enviarem el id, normalment
				attributes : {
					camp1 : "A",
					camp2 : "B"
				}
			}


## GET - Filtrat de resultats

- Els recursos es filtraran mitjançant paràmetres al querystring.

- S'utilitzarà un sol cop cada paràmetre que permeti filtratge:

	- si s'han de realitzar operacions més complexes, s'hauria d'establir el mecanisme amb un sol paràmetre

- Exemple

		GET /aplicacions?estat=evolutiu&lang=nodejs

	Retornarà totes les aplicacions que en aquell moment estiguin en evolució i el llenguatge de desenvolupament sigui Node.js.

## GET - Paginació

- En una petició sense cap filtre, mai no es retornaran tots els elements del recurs consultat.

- La nostra API implementarà paginació, indicant els resultats de la següent manera:


			data : {
				total : 976,
				limit : 100, 
				offset : 200,
				included : [
					...
				]
			} 


	- el camp "**total**" indicarà el número de resultats d'una request
	- el camp "**limit**" indicarà el número de resultats per pàgina. S'inclourà al querystring. Si no s'informa, per defecte serà 10 i el màxim dependrà dels objectius de rendiment, però no hauríem de passar de 500 resultats.
	- el camp "**offset**" indicarà en quin resultat hauria de començar el subset de resultats demanat en una request. S'inclourà al querystring. Si no s'informa, per defecte serà 0 i retornarà el primers resultats en funció del paràmetre "limit".

			GET /aplicacions?limit=100&offset=200 

		Retornarà a partir del resultat 300 i amb 100 resultats en aquella petició.


	- Amb l'exemple anterior, el número de pàgines seria:

		- total / límit = 976 / 100 = 9,76, que arrodonit a l'enter superior ens donaria 10 planes

	- I la pàgina activa seria:

		- (offset / limit) + 1 = 200/100+1 = pàgina 3

	- [Exemple a jsfiddle](https://goo.gl/WKlXnV)

## GET - Selecció de camps

- Es permetrà seleccionar els camps que es volen consultar implementant el paràmetre "**fields**", on el seu valor seran els noms dels camps a incloure en els resultats separats per coma:

		GET /aplicacions?fields=codi,data_creacio,proveidor,lang 

	Retornarà totes les aplicacions però els documents només retornaran els camps enumerats al camp fields.
		

## GET - Ordre dels resultats

- Si es requereix, es podrà habilitar un paràmetre "**sort**" que acceptarà valors dels camps separats per comes i on es podrà indicar amb el signe "-" precedint el nom del camp, l'ordre descendent per a aquell camp. Per defecte l'ordre serà ascendent

- Exemple:

		GET /aplicacions?sort=data_creacio,-loc 

	Retornarà totes les aplicacions ordenades per data de creació ascendent i línies de codi (loc) descendent.

## GET - Cerca lliure

- Per a les cerques lliures a qualsevol camp dels elements del recurs, el paràmetre per defecte serà "**q**"

- Exemple:

		GET /aplicacions?q=mysql

	Retornarà totes les aplicacions que en algun dels camps continguin "mysql"	

## GET - Memòria cau

Les peticions de tipus GET són succeptibles de ser guardades en memòria cau si l'API està exposada al públic i té un consum elevat. Depèn de què es vulgui guardar, establirem una o altra "clau de caché". 

Utilitzarem dues aproximacions:

- Per a consultes sobre tot el recurs establirem una clau de caché que podria ser tota la url + el querystring o bé alguns paràmetres del querystring.

	Per a realitzar aquesta funcionalitat es podria incorporar dins la lògica de la pròpia API però la millor pràctica seria utilitzar serveis de caché externs (Varnish, caché a balancejadors, ...)

- En qualsevol cas, siguin consultes múltiples o d'un ítem concret, hauríem de proporcionar les capçareleres http relacionades amb la caducitat dels resultats:

	- Etag
	- Date
	- Last-modified
	- Expires

## GET - JSONP Callback

Per a peticions GET, permetrem incloure un paràmetre "callback" amb el nom de la funció amb la que envolcallarem la nostra resposta (JSONP)

		Request

			GET /aplicacions?callback=f

		Response

			f({
				data : {

					total : 976,  
					limit : 100,  
					offset : 200, 
					
					included : [  
						{
							id : 1,
							attributes : {
								camp1 : "A",
								camp2 : "B"
							}
						},
						{
							id : 2,
							attributes : {
								camp1 : "C",
								camp2 : "D"
							}
						},
						...
					]
				} 
			})


	
Retornarà la resposta JSON amb una funció de nom "f" que l'envolcallarà


## POST - Creació d'un recurs

Amb el verb POST crearem nous elements al nostre recurs:

		POST /aplicacions/
		Content-type: application/json

		{
			data : {
				attributes : {
					camp1 : "A",
					camp2 : "B"
				}
			}
		}


Si tot ha anat correctament el HTTP response code serà 201. La resposta pot incloure un header location amb la uri del recurs creat.


		Location: /api/aplicacions/5220-4848-864539594927

		{
			data : {
				id : "5220-4848-864539594927", // en el cas del POST no enviarem el id, normalment
				attributes : {
					camp1 : "A",
					camp2 : "B"
				}
			}
		}


## PATCH - Actualització d'un recurs

Amb el verb PATCH actualitzarem un recurs concret.

		PATCH /aplicacions/5220-4848-864539594927
		Content-type: application/json

		{
			data : {
				id : 5220-4848-864539594927
				attributes : {
					camp1 : "X"
				}
			}
		}


Si tot ha anat correctament el HTTP response code serà 20x, depenent de si s'ha realitzat o s'ha encuat per a processar

## DELETE - Eliminació d'un recurs

Amb el verb DELETE eliminarem un recurs concret.

		DELETE /aplicacions/5220-4848-864539594927
		Content-type: application/json


Si tot ha anat correctament el HTTP response code serà 20x, depenent de si s'ha realitzat o s'ha encuat per a processar

## Operacions múltiples (BATCH)

- La nostra API podrà incorporar un mecanisme per a poder realitzar operacions múltiples (crear, actualitzar o eliminar) a la url:

		http://subdomini.gencat.cat/api/_batch

- L'acció serà de crear, actualitzar o eliminar, no es podran barrejar accions.

- Es realitzarà mitjançant un POST amb el següent format de document:


		PATCH /_batch/
		Content-type: application/json

		{
			action : "POST" //o "PATH", "DELETE"
			data : [
				{
					id : 5220-4848-864539594927
					attributes : {
						camp1 : "X"
					}
				},
				{
					id : 5220-4848-864539594928
					attributes : {
						camp1 : "Z"
					}
				}
			]
		}


- En el cas de crear múltiples elements, és obligatori enviar un "id" que permeti retornar en la resposta si l'id enviat s'ha processat correctament o no.

- Qualsevol acció múltiple estarà limitada a un màxim de **100 elements**.

- La resposta http consistirà en el mateix atribut data enviat, que retornarà un status per a cada document enviat a crear, actualitzar o eliminar. En el cas d'errors, s'inclourà un atribut "errors" que serà un array d'errors a processar, amb el codi intern que li correspongui i la descripció.

		{
			data : [
				{
					id : 5220-4848-864539594927,
					status: 200
				},
				{
					id : 5220-4848-864539594928,
					status: 400,
					errors : [
						{
							code : 999,
							desc : "Falten camps obligatoris per informar"
						}
					]
				}
			]
		}




## Multi idioma

Si l'API pot retornar atributs en múltiples idiomes, tindrem dos mecanismes per a poder negociar-lo:

- Paràmetre "lang" al querystring per a peticions GET

		GET /aplicacions?lang=ca

- Header "Accept-Language" a tots els verbs

Utilitzarem els codis de l'estàndard ISO-639-1: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

La API tindrà un idioma per defecte i informarà en quins llenguatges es pot consultar a la seva pàgina d'ajuda.

## Versionat

- El mètode preferit per a seleccionar la versió que volem consultar de l'API, serà incloent el paràmetre "**v**" a la querystring

- Exemple:

		GET /aplicacions?q=mysql&v=2 

	Retornarà totes les aplicacions que en algun dels camps continguin "mysql" en la versió 2 de l'API

- Només farem versions per a canvis majors, de manera que els canvis menors s'incorporaran a la versió major actual en un moment donat, garantint la compatibilitat cap a enrera dels recursos servits mentre es mantingui una versió major.

## Missatges i errors

Tota interacció amb els recursos de a nostra API retornarà un codi HTTP en funció del tipus d'acció i èxit o error de la mateixa. HTTP codes més comuns:

- 200 – _OK_ – Tot correcte
- 201 – _OK_ – Nou recurs creat (POST)
- 204 – _OK_ – El recurs s'ha eliminat correctament (DELETE)

- 304 – _Not Modified_. Es pot utilitzar la caché.

- 400 – _Bad Request_ – La petició és incorrecta. L'error s'haurà de descriure en el _payload_ de la resposta http.
- 401 – _Unauthorized_ – La petició requereix d'autorització.
- 403 – _Forbidden_ – El servidor entèn la petició però la rebutja o l'accés no està permès.
- 404 – _Not found_ – No s'ha trobat el recurs.

En cas d'errors, inclourem un _payload_ en format JSON que informarà dels problemes trobats, ampliant la informació si cal a la descripció ("desc"):

			{
				errors : [
					{
						code : 404,
						desc : "El recurs sol·licitat no s'ha trobat"
					}
				]

			}

## Autenticació

Els mecanismes preferits per a donar accés a la nostra API seran els següents, per ordre de preferència:

1. Oauth2
1. Autenticació Bàsica sobre GICAR
1. HMAC

En cas d'existir un API Gateway en el moment d'implementar l'API, la millor opció serà gestionar la seguretat a través d'aquesta peça, millor que implementar-la a la nostra API.

## Documentació

Entre els formats de descripció d'APIs tenim Swagger i WADL. La nostra opció preferida serà utilitzar [Swagger](http://swagger.io/). Podeu veure un exemple de funcionament a [http://petstore.swagger.io/](http://petstore.swagger.io/)


## Referències

- http://jsonapi.org/
- http://www.restapitutorial.com/resources.html
- http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
- http://restful-api-design.readthedocs.org/en/latest/methods.html
- http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/
- http://blog.octo.com/en/design-a-rest-api

### Aspectes pendents de definir

- Filtrat per rangs: establir un QL

- Relacions entre elements 

