+++
date        = "2018-08-17T13:15:42+01:00"
title       = "Webservice"
description = "Com integrar-se amb el Webservice de GICAR"
sections    = "GICAR"
taxonomies  = []
toc 		= true
weight 		= 3
+++


Actualment, l’aplicació GDI permet realitzar una sèrie d’actuacions sobre les identitats presents en el Directori Corporatiu. L’objectiu del Web Service de GDI es proporcionar aquestes mateixes funcionalitats, per tal que tant usuaris i/o aplicacions puguin disposar d’elles de manera externa a l’eina GDI. Així doncs, el Web Service servirà de connector per a terceres persones, permetent la seva integració amb GICAR.

La solució adoptada proporciona una comunicació senzilla mitjançant missatges i documents amb format XML entre les diferents aplicacions Web. En concret, es fa ús del protocol SOAP, que es una particularització de XML.

El xifrat de tots els missatges està assegurat a nivell del servidor d’aplicacions (jboss) i es força la comunicació TLS/SSL en totes les comunicacions amb el Web Service, amb certificat de servidor i sense requeriment de certificat en el client.

A continuació s’especifiquen les dades de connexió al WebService dels diferents entorns PRE i PRO

![Integració Aplicacions GICAR](/related/gicar/connexio-ws-gicar.png)

## Arquitectura

A continuació s’exposa un senzill diagrama indicant les connexions entre les màquines:

![Integració Aplicacions GICAR](/related/gicar/esquema-ws.png)

Tota comunicació cap al GDI vindrà proporcionada pel Web Service, utilitzant preferiblement per a les comunicacions un canal segur SSL per tal d’assegurar protecció a nivell de transport. Tal i com ja s’ha indicat, totes les operacions s’indicaran mitjançant documents XML amb protocol SOAP i amb una estructura predefinida. A més a més, tot document XML caldrà que inclogui l’estàndard ‘Username Token’ per tal de transmetre un identificador junt amb una contrasenya que servirà per a autenticar-se en el sistema (més informació sobre l’estructura de les peticions en 4.3 Llistat d’operacions disponibles).

Altres sistemes que intervenen en els processos i que s’exposen en el diagrama són:

- Directori Corporatiu: sistema final a on s’emmagatzemen les dades dels diferents usuaris.
- Oracle Identity Manager (OIM): l’altre sistema final a on es controlen els diferents estats dels usuaris.
- Repositori de gestors: base de dades a on consten els diferents usuaris / aplicacions que tenen permès accedir a les funcionalitats que s’ofereixen, així com de quins privilegis disposen.

## Flux de peticions

A continuació es mostra la interacció entre els sistemes per a una petició genèrica al Web Service:

![Integració Aplicacions GICAR](/related/gicar/flux-ws.png)

1. S’envia la petició en un document amb format XML i protocol SOAP. 

2. El Web Service extraurà la capçalera que inclou la informació relativa a l’autenticació. Es realitza una validació contra el Directori Corporatiu. Per tal de consumir el WebService caldrà doncs disposar d’un usuari de connexió al WS i caldrà ser demanar a l’Equip GICAR.

3. Si l’usuari o aplicació passa aquest primer control d’autenticació, es procedirà a comprovar si aquest disposa dels privilegis necessaris per a la petició en qüestió. Per tant, es realitza una segona validació contra el repositori de gestors.

4. Una vegada s’hagi autenticat correctament a l’usuari o aplicació, es farà una primera validació del contingut del missatge. Es comprovarà que la seva estructura es la correcta i que el format dels camps especificats compleix les especificacions donades (Annex A).

5. Si la petició supera tots els punts anteriors, es procedirà a executar la sol•licitud. En el cas de que la petició no passi correctament alguna de les comprovacions anteriors, es retornarà a l’usuari un missatge indicant l’error i es procedirà a finalitzar el flux.

6. Un cop s’ha executat l’acció requerida, s’informarà al peticionari a través d’un missatge de resposta amb una estructura predefinida.

## Llistat d’operacions disponibles

Les operacions que s’implementaran en el Web Service són:

- enableUser: activa la identitat d’un usuari del Directori Corporatiu.
- disableUser: desactiva a un usuari present en el Directori.
- setPasswordUser: insereix una nova contrasenya per a l’usuari indicat.
- lookupUser: busca a un usuari en el Directori i retorna informació sobre ell.
- searchUsers: retorna un llistat amb els usuaris del Directori que compleixin una sèrie de condicions.

S’ha predefinit per a cadascuna d’aquestes operacions una estructura determinada així com una sèrie de variables que es poden inserir. El Web Service validarà per a cada petició que aquesta s’ajusti al format requerit. 

A continuació es detalla per a cada operació quina estructura ha de tenir, així com les possibles respostes que es retornarà.

## Capçalera d’autenticació

Tal i com ja s’ha introduït en punts anteriors d’aquest mateix document, el Web Service requereix que totes les operacions incorporin unes credencials per tal d’autenticar els peticionaris contra el Directori Corporatiu. Posteriorment es realitzarà una segona validació d’aquestes credencials per a comprovar si l’usuari/aplicació en qüestió està autoritzat per a demanar-les. 
Més informació sobre els diferents mètodes de protecció del Web Service es pot trobar a:

http://www.oasis-open.org/committees/tc_home.php?wg_abbrev=wss

En concret, es demana que s’incorporin en els missatges enviats l’estàndard “Username Token” per tal d’informar d’un identificador i una contrasenya. Aquest element vindrà incorporat en una capçalera en el inici de totes les peticions, tal i com es mostra en l’exemple següent:

	<?xml version="1.0" encoding="UTF-8"?>
		<soapenv:Envelope
		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
		xmlns:xsd="http://www.w3.org/2001/XMLSchema"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<soapenv:Header>

	<wsse:Security xmlns:wsse="http://docs.oasisopen.
	org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
	soapenv:mustUnderstand="1">
	<wsse:UsernameToken xmlns:wsu="http://docs.oasisopen.
	org/wss/2004/01/oasis-200401-wss-wssecurity-utility-
	1.0.xsd" wsu:Id="UsernameToken-20201168">
	<wsse:Username>11111111H</wsse:Username>
	<wsse:Password Type="http://docs.oasisopen.
	org/wss/2004/01/oasis-200401-wss-username-tokenprofile-
	1.0#PasswordText">xxxxxxxx</wsse:Password>
	</wsse:UsernameToken>
	</wsse:Security>


	</soapenv:Header>

	<soapenv:Body>

	<spmlRequest xmlns="http://ws.gdi.sia.es">

	...... ......
	...... ......

	</spmlRequest>
	</soapenv:Body>
	</soapenv:Envelope>

Com es pot observar, les credencials d’autenticació estan presents en la capçalera i, per tant, són visibles per a qualsevol que sigui capaç de capturar el missatge. Es per això que es força que tota comunicació que s’estableixi amb el Web Service es realitzi a través d’un canal segur TLS/SSL amb certificat de servidor i sense necessitat de certificat al client. D’aquesta manera s’incorpora una capa de seguretat a nivell de transport que acaba de protegir del tot la comunicació.

La spmlRequest ha d'anar codificada en Base64, i la resposta que s'obtindrà del Webservice també anirà codificada en Base64.

## Mètode enableUser

- L’objectiu del mètode es habilitar a un usuari ja present el Directori Corporatiu.
- Cal especificar el NIF de la identitat afectada (camp psoID).

Un exemple de petició seria:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<resumeRequest xmlns=”urn:oasis:names:tc:SPML:2:0” xmlns:dsml=”urn:oasis:names:tc:DSML:2:0:core”>
	<psoID ID=”11111111H”>
	<targetID ID=”GICAR”/>
	<containerID ID=”Persones”/>
	</psoID>
	</resumeRequest>

•	Un exemple de resposta confirmant que s’ha realitzat el canvi seria:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:resumeResponse xmlns:ns1=”urn:oasis:names:tc:SPML:2:0:core” status=”success”/>

En el cas de que aparegui algun error es retornarà:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:resumeResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:core” status=”failure”>
	<Error code=”NNNN” desc=”xxxxxxxxxx”/>
	</ns1:resumeResponse>

## Mètode disableUser

- Mètode encarregat de desactivar a un usuari en el Directori Corporatiu.
- Cal indicar el NIF de la identitat (camp psoID).

A continuació es mostra un exemple de petició:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<suspendRequest xmlns=”urn:oasis:names:tc:SPML:2:0” xmlns:dsml=”urn:oasis:names:tc:DSML:2:0:core”>
	<psoID ID=”11111111H”>
	<targetID ID=”GICAR”/>
	<containerID ID=”Persones”/>
	</psoID>
	</suspendRequest>

Si tot es correcte, es retorna:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:suspendResponse xmlns:ns1=”urn:oasis:names:tc:SPML:2:0:core” status=”success”/>

En cas de que es trobi algun error, aquest es notificarà:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:suspendResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:core” status=”failure”>
	<Error code=”NNNN” desc=”xxxxxxxxxx”/>
	</ns1:suspendResponse>

## Mètode setPasswordUser

- Mètode encarregat de modificar la contrasenya d’un usuari del Directori Corporatiu.
- Cal indicar el NIF de l’usuari (camp psoID) i la nova contrasenya (camp password).

Un exemple de petició seria:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<setPasswordRequest xmlns=”urn:oasis:names:tc:SPML:2:0”
	xmlns:dsml=”urn:oasis:names:tc:DSML:2:0:password”>
	<psoID ID=”11111111H”>
	<targetID ID=”GICAR”/>
	<containerID ID=”Persones”/>
	</psoID>
	<password>contrasenya</password>
	</setPasswordRequest>

Si tot es correcte, es retornarà:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:setPasswordResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:password” status=”succes”/>

Per finalitzar, en el cas de que hagi sorgit un error es retornarà el seu codi així com una breu descripció del mateix:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:setPasswordResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:password” status=”failure”>
	<Error code=”NNNN” desc=”xxxxxxxxxx”/>
	</ns1:setPasswordResponse>


## Mètode lookupUser

- Mètode usat per a fer una cerca d’un usuari en el Directori Corporatiu i recuperar informació de certs atributs.
- Cal indicar el NIF de la identitat a buscar informació dins de la petició.
- Annexat a aquest mateix document es troba un llistat dels camps disponibles en el GDI que són els que es podran retornar en aquesta consulta

L’estructura de la petició es:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<lookupRequest returnData=”everything” xmlns=”urn:oasis:names:tc:SPML:2:0”>
	<psoID ID=”11111111H” xmlns=”urn:oasis:names:tc:SPML:2:0”/>
	</lookupRequest>

Si tot es correcte, la informació es retornarà estructurada com un llistat tal i com es mostra a continuació:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:lookupResponse xmlns:ns1=”urn:oasis:names:tc:SPML:2:0” status = “succes”>
	<ns1:pso>
	<ns1:psoID ID=”11111111H”/>
	<ns1:data>
	<ns2:attr xmlns:ns2=”urn:oasis:names:tc:DSML:2:0:core” name=”employeeID”>
	<ns2:value>11111111H</ns2:value>
	</ns2:attr>
	<ns3:attr xmlns:ns3=”urn:oasis:names:tc:DSML:2:0:core” name=”gencatFirstCognom”>
	<ns3:value>Martinez</ns3:value>
	</ns3:attr>
	<ns4:attr xmlns:ns4=”urn:oasis:names:tc:DSML:2:0:core” name=”gencatSecondCognom”>
	<ns4:value>Delgado</ns3:value>
	</ns4:attr>

	...           ...         ...

	</ns1:data>
	</ns1:pso>
	</ns1:lookupResponse>


En cas d’error en algun punt de la validació o en l’execució de la petició es retornarà:	
	
	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:lookupResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:core” status=”failure”>
	<ns1:pso>
	<ns1:psoID ID=”11111111H”/>
	<Error code=”NNNN” desc=”xxxxxxxxxx”/>
	</ns1:pso>
	</ns1:lookupResponse>

A través d'aquest mètode només és possible trobar usuaris catalogats com a "No Sensibles" a GICAR.

## Mètode searchUsers


- Mètode encarregat de realitzar una cerca d’usuaris en el Directori Corporatiu. Retorna el NIF i el codi intern (identificador) dels usuaris que compleixin amb els paràmetres de la cerca especificats.
- Caldrà establir com a mínim un paràmetre per a fer la cerca.
- Es podrà utilitzar varis paràmetres de cerca units mitjançant els operadors lògics AND i/o OR.

Cas d’us 1: saber quins usuaris compleixen amb els criteris demanats sense obtenir el detall dels atributs dels usuaris:

Per exemple, podríem enviar com a petició:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<searchRequest returnData=”identifier” xmlns=”urn:oasis:names:tc:SPML:2:0:search” xmlns:dsml=”urn:oasis:names:tc:DSML:2:0:core”>
	<query scope=”pso”>
	<basePsoID ID=””/>
	<and>
	<dsml:filter>
	<dsml:equalityMatch name=”givenName”>
	<dsml:values>Perico</dsml:values>
	</dsml:equalityMatch>
	</dsml:filter>
	<dsml:filter>
	<dsml:equalityMatch name=”gencatFirstCognom”>
	<dsml:values>Martínez</dsml:values>
	</dsml:equalityMatch>
	</dsml:filter>
	</and>
	</query>
	</searchRequest>

Una petició com l’anterior retornaria una resposta com:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:searchResponse xmlns:ns1=”urn:oasis:names:tc:SPML:2:0:search” status=”success”>
	<ns1:pso>
	<ns2:psoID xmlns:ns2=”urn:oasis:names:tc:SPML:2:0” ID=”11111111H”/>
	<ns3:data xmlns:ns3=”urn:oasis:names:tc:SPML:2:0”>
	<ns4:attr xmlns:ns4=”urn:oasis:names:tc:DSML:2:0:core” name=”codiintern”>
	<ns4:value>JPNX0001</ns4:value>
	</ns4:attr>
	</ns3:data>
	</ns1:pso>
	<ns1:pso>
	<ns5:psoID xmlns:ns5=”urn:oasis:names:tc:SPML:2:0” ID=”12345678Z”/>
	<ns6:data xmlns:ns6=”urn:oasis:names:tc:SPML:2:0”>
	<ns7:attr xmlns:ns7=”urn:oasis:names:tc:DSML:2:0:core” name=”codiintern”>
	<ns7:value>JTNX0001</ns4:value>
	</ns7:attr>
	</ns6:data>
	</ns1:pso>
	</ns1:searchResponse>


Obtenint el NIF i el codi intern dels usuaris.

En canvi, si hi hagués algun problema es retornaria:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:searchResponse xmlns:ns1=“urn:oasis:names:tc:SPML:2:0:search” status=”failure”>
	<Error code=”NNNN” desc=”xxxxxxxxxx”/>
	</ns1:searchResponse>


Cas d’us 2: obtenir dades de detall dels usuaris que compleixen amb els criteris de cerca:

En aquest cas cal informar el valor searchRequest returnData a Everything.

Per exemple, podríem enviar com a petició:

	<?xml version="1.0" encoding="UTF-8"?>
	<searchRequest returnData="everything" xmlns="urn:oasis:names:tc:SPML:2:0:search" xmlns:dsml="urn:oasis:names:tc:DSML:2:0:core">
		<query scope="pso">
			<basePsoID ID="" />
				<dsml:filter>
					<dsml:equalityMatch name="employeeID">
						<dsml:values>257*</dsml:values>
					</dsml:equalityMatch>
				</dsml:filter>		
		</query>
	</searchRequest>


Una petició com l’anterior retornaria una resposta com:

	<?xml version="1.0" encoding="UTF-8"?>
	<ns1:searchResponse xmlns:ns1="urn:oasis:names:tc:SPML:2:0:search" status="success">
		<ns1:pso>
			<ns2:psoID xmlns:ns2="urn:oasis:names:tc:SPML:2:0" ID="25711341D" />
			<ns3:data xmlns:ns3="urn:oasis:names:tc:SPML:2:0">
				<ns4:attr xmlns:ns4="urn:oasis:names:tc:DSML:2:0:core" name="codiintern">
					<ns4:value>GCNRMR0001</ns4:value>
				</ns4:attr>
			</ns3:data>
			<ns5:data xmlns:ns5="urn:oasis:names:tc:SPML:2:0">
				<ns6:attr xmlns:ns6="urn:oasis:names:tc:DSML:2:0:core" name="carLicense">
					<ns6:value>actiu</ns6:value>
				</ns6:attr>
			</ns5:data>
			<ns7:data xmlns:ns7="urn:oasis:names:tc:SPML:2:0">
				<ns8:attr xmlns:ns8="urn:oasis:names:tc:DSML:2:0:core" name="givenName">
					<ns8:value>Marta</ns8:value>
				</ns8:attr>
			</ns7:data>
			<ns9:data xmlns:ns9="urn:oasis:names:tc:SPML:2:0">
				<ns10:attr xmlns:ns10="urn:oasis:names:tc:DSML:2:0:core" name="gencatFirstCognom">
					<ns10:value>Cano</ns10:value>
				</ns10:attr>
			</ns9:data>
			<ns11:data xmlns:ns11="urn:oasis:names:tc:SPML:2:0">
				<ns12:attr xmlns:ns12="urn:oasis:names:tc:DSML:2:0:core" name="gencatSegonCognom">
					<ns12:value>Rodríguez</ns12:value>
				</ns12:attr>
			</ns11:data>
			<ns13:data xmlns:ns13="urn:oasis:names:tc:SPML:2:0">
				<ns14:attr xmlns:ns14="urn:oasis:names:tc:DSML:2:0:core" name="physicalDeliveryOfficeName">
					<ns14:value>Centre de Treball Entitat Externa</ns14:value>
				</ns14:attr>
			</ns13:data>
			<ns15:data xmlns:ns15="urn:oasis:names:tc:SPML:2:0">
				<ns16:attr xmlns:ns16="urn:oasis:names:tc:DSML:2:0:core" name="department">
					<ns16:value>ECONOMIA I FINANCES</ns16:value>
				</ns16:attr>
			</ns15:data>
			<ns17:data xmlns:ns17="urn:oasis:names:tc:SPML:2:0">
				<ns18:attr xmlns:ns18="urn:oasis:names:tc:DSML:2:0:core" name="gencatResponsable">
					<ns18:value>40953247E</ns18:value>
				</ns18:attr>
			</ns17:data>
		</ns1:pso>
	</ns1:searchResponse>
 
A través d'aquest mètode només és possible trobar usuaris catalogats com a "No Sensibles" a GICAR.


## Mètode searchUsersSensibles

A partir d'aquest mètode, si es disposen de permisos per a poder-ho fer és possible poder obtenir una mínima informació dels usuaris sensibles que estan donats d'alta a GICAR.

- Mètode encarregat de realitzar una cerca d’usuaris en el Directori Corporatiu. Retorna el NIF, el electrònic i el codi de la unitat menor dels usuaris que compleixin amb els paràmetres de la cerca especificats.
- Caldrà establir com a mínim un paràmetre per a fer la cerca.
- Es podran utilitzar múltiples paràmetres de cerca units mitjançant els operadors lògics AND i/o OR.

A continuació s'exposa una petició d'exemple:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<searchRequest returnData=”identifier” xmlns=”urn:oasis:names:tc:SPML:2:0:search” xmlns:dsml=”urn:oasis:names:tc:DSML:2:0:core”>
	<query scope=”pso”>
	<basePsoID ID=””/>
	<and>
	<dsml:filter>
	<dsml:equalityMatch name=”givenName”>
	<dsml:values>Perico</dsml:values>
	</dsml:equalityMatch>
	</dsml:filter>
	<dsml:filter>
	<dsml:equalityMatch name=”gencatFirstCognom”>
	<dsml:values>Martínez</dsml:values>
	</dsml:equalityMatch>
	</dsml:filter>
	</and>
	</query>
	</searchRequest>

I com a resposta en aquest cas es retornaria el següent:

	<?xml version=”1.0” encoding=”UTF-8”?>
	<ns1:searchResponse xmlns:ns1=”urn:oasis:names:tc:SPML:2:0:search” status=”success”>
	<ns1:pso>
	<ns2:psoID xmlns:ns2=”urn:oasis:names:tc:SPML:2:0” ID=”11111111H”/>
	<ns3:data xmlns:ns3=”urn:oasis:names:tc:SPML:2:0”>
	<ns4:attr xmlns:ns4=”urn:oasis:names:tc:DSML:2:0:core” name=” gencatCompanyCodi”>
	<ns4:value>GDI01</ns4:value>
	</ns4:attr>
	<ns5attr xmlns:ns4=”urn:oasis:names:tc:DSML:2:0:core” name=”mail”>
	<ns5:value>correo@xxxx.yyy</ns4:value>
	</ns5:attr>
	</ns3:data>
	</ns1:pso>
	<ns1:pso>
	<ns5:psoID xmlns:ns5=”urn:oasis:names:tc:SPML:2:0” ID=”12345678Z”/>
	<ns6:data xmlns:ns6=”urn:oasis:names:tc:SPML:2:0”>
	<ns7:attr xmlns:ns7=”urn:oasis:names:tc:DSML:2:0:core” name=” gencatCompanyCodi”>
	<ns7:value>AG</ns4:value>
	</ns7:attr>
	<ns8attr xmlns:ns4=”urn:oasis:names:tc:DSML:2:0:core” name=”mail”>
	<ns8:value>zzzz@xxxx.yyy</ns4:value>
	</ns8:attr>
	</ns6:data>
	</ns1:pso>
	</ns1:searchResponse>
