+++
date        = "2015-11-16"
title       = "Nous llenguatges i entorns d'execució: Node.js i Golang"
description = "Tecnologies de desenvolupament i altres opcions davant noves necessitats dels projectes"
bloc_tags	= ["desenvolupament"]
imatge 		= "/images/bloc/nodejs_golang.png"
+++

Des de la Unitat d'Arquitectura fem un seguiment de noves tecnologies de desenvolupament, per a avaluar el seu encaix dins la Generalitat de Catalunya i tenir altres opcions davant noves necessitats dels projectes. 

Us presentem dues que tenim al nostre radar i amb les que ja hem fet alguns projectes:

## Node.js

* basat en la màquina de Google Chrome V8
* javascript
* model asíncron
* un únic thread
* la comunitat que més ha crescut als últims anys
* grans empreses l'han adoptat per als seus serveis migrant-los de piles tecnològiques antigues
* Node.js Foundation (https://nodejs.org/en/foundation/members/): fabricants i proveïdors de serveis formen part de la fundació


### Experiències a la Generalitat

* Serveis oberts (http://serveisoberts.gencat.cat ): 
	* és una API d'accés a dades obertes de la Generalitat construïda sobre Node.js i MongoDB.  
	* exposa una API privada per a la sincronització de dades des dels backends i una API pública de consulta
	* inclou un "explorador de dades" per a cada col·lecció, per a poder visualitzar les dades en un format més amigable (http://serveisoberts.gencat.cat/equipaments/explorer)

* Microservei per a les aplicacions de mobilitat per a comprovar versions i compatibilitat 

* Diccionari clínic de l'ICS

Resultat: alta productivitat de l'equip de desenvolupament, corba d'aprenentatge relativament petita i gran rendiment de la plataforma.


## Golang

* llenguatge que va sortir dels laboratoris de Google
* intenta millorar aspectes de baix nivell que amb C són més difícils de realitzar
* molt bona gestió de threads i concurrència
* "garbage collected"
* compilat
* cross-compiling: des d'un mateix entorn es pot compilar per a diverses arquitectures

### Experiències a la Generalitat

Hem desenvolupat una eina orientada a avaluar la qualitat de les infraestructures lliurades. 

En aquest cas, ens permet avaluar si totes les connectivitats necessàries s'han obert, mitjançant el lliurament d'un fitxer de configuració en format YAML adaptat al projecte concret. L'eina genera un informe de resultats que inclou si les diferents connectivitats han estat satisfactòries o no, la data, hora i host en el que s'ha executat, així com un hash per a validar la integritat de l'informe generat.

L'eina s'afegeix a totes les plantilles d'imatges virtuals de tots els CPDs, de manera que només s'ha d'afegir el fitxer de configuració i executar l'eina. 

Com que l'eina ha de córrer en diferents sistemes operatius i havia de ser compilada - per a evitar dependències externes - i el més lleugera possible, vàrem pensar que Golang podria ser una bona oportunitat. 

Resultat: alta productivitat i posada en funcionament realment ràpida.
