+++
date        = "2018-10-10T17:11:42+01:00"
title       = "Passarel·la GICAR - Vàlid de l'AOC"
description = "Solució basada en SAML2 per a delegar l'autenticació de forma hibrida a GICAR i a Vàlid"
sections    = "gicar-saml2"
taxonomies  = []
toc			= true
weight 		= 5
+++

Aquesta solució està pensada principalment per aplicacions que basen la seva font d’autenticació amb la solució GICAR, amb la qual cosa són aplicacions utilitzades per funcionaris, però que també són aplicacions utilitzades per ciutadans.

Fins ara, la única solució que donava GICAR per aquest tipus d’aplicacions era l’autenticació amb certificat digital.

A partir d’ara, a través d’aquesta nova passarel·la, també s’oferirà a aquestes aplicacions que ho sol·licitin, la integració amb el Vàlid del Consorci AOC (IdCatSMS), addicionalment a la integració amb GICAR.

Aquesta solució presenta els següents punts destacables:

- **Autenticació hibrida de GICAR + Vàlid per a les aplicacions**. Amb aquesta passarel·la es compatibilitza l’autenticació de GICAR i la de Vàlid, permetent que les aplicacions puguin ser accedides amb un sistema d’autenticació o l’altre.

- **No cal tocar codi de l’aplicació si ja està integrada amb GICAR**. La passarel·la genera una mateixa resposta per part dels dos sistemes d’autenticació cap a les aplicacions. A partir d’ara no cal tocar el codi de les aplicacions per a poder-les autenticar contra Vàlid si aquesta ja està integrada amb GICAR. --> Estalvi a nivell de desenvolupament per part del departament.

- **Abstracció de la complexitat de Vàlid per part de les aplicacions**. Encapsulament de tota la complexitat de les crides a Vàlid dins d’aquesta passarel·la, i l’aplicació només ha de recollir la resposta que aquest servei li retorna en el format que retorna GICAR l’usuari autenticat. --> Estalvi a nivell de desenvolupament per part del departament.

Aquesta solució es pot configurar de cara a que l'autenticació sigui només contra Vàlid o per a que deixi elegir als usuaris entre GICAR i Vàlid.

## Funcionament de la solució:

A continuació es presenta la vista global de com funciona aquesta modalitat d'integració:

L’experiència d’usuari amb aquest contenidor seria la següent:

- L’usuari accediria a un path protegit de l’aplicació, se li presenta a l’usuari i formulari de login amb les opcions d’accedir
	- Via Vàlid(idcat mòbil o certificat)
	- Via GICAR

![Integració amb GICAR](/related/gicar/valid1.png)
 
- Si l’usuari selecciona via GICAR el formulari canvia el domini de la petició a aplicacions.ensenyament.gencat.cat i salta la protecció GICAR actual de SiteMinder.

![Integració amb GICAR](/related/gicar/valid2.png)

- Si l’usuari selecciona via Vàlid:
	- el formulari redireccionarà a Vàlid. 
	- L’usuari s’autenticarà en Vàlid 
	- introduiria el NIF i mòbil en la pantalla del Valid


![Integració amb GICAR](/related/gicar/valid3.png)


- I després posaria el SMS rebut al mòbil:

 
![Integració amb GICAR](/related/gicar/valid4.png)

- Vàlid retornarà la petició al domini de l’aplicació

- El contenidor recollirà el SAMLResponse i generarà les headers de GICAR  que esperen les aplicacions. Per tant en aquest punt tant si l’autenticació s’hagués fet via GICAR com via Vàlid l’aplicació sempre rebria la mateixa capçalera GICAR_ID amb el DNI de l’usuari autenticat, i la capçalera GICAR per tant això assegura compatibilitat amb totes les aplicacions actuals.


## Implementació tècnica de la solució:

Per a implementar tècnicament la solució cal seguir els passos exposats a l'apartat **"Aplicació autenticant via SAML2 a través d'Apache-Shibboleth"** (https://canigo.ctti.gencat.cat/gicar-saml2/auth-saml2-shibboleth/).

Un cop es disposa el frontal de l'aplicació integrat amb l'agent de Shibboleth es pot configurar aquest agent de Shibboleth (al cloud, via contenidor, o on premise) de cara a que faci una de les següents dues opcions:

- Delegui l'autenticació a GICAR o Vàlid i que l'usuari pugui escollir quin sistema d'autenticació vol utilitzar.
- Delegar directament l'autenticació a Vàlid. 

El proveïdor d'aplicacions haurà de contactar amb la OTGICAR de cara a que li transmeti quines són exactament les configuracions que caldran per a fer funcionar aquesta solució.
