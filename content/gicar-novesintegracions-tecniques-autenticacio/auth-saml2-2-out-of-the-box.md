+++
date        = "2021-08-17T12:45:42+01:00"
title       = "SAML2 - Integració d'una aplicació que admet SAML out of the box"
description = "Aplicació feta a mida consumint servei d'autenticació SAML2 sense ús d'Apache-Shibboleth"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= false
weight 		= 3
+++

Si una aplicació web admet la possibilitat de delegar l'autenticació a un proveïdor d'autenticació SAML2, llavors aquesta es pot integrar amb GICAR.

Per a fer-ho caldrà consultar el manual de l'aplicació, on s'indiqui quins paràmetres cal configurar per a fer la integració, i normalment la informació que l'aplicació requereix del proveïdor d'autenticació, en aquest cas GICAR, és el fitxer de metadades XML que defineix els parèmetres bàsics pels quals es regeix el IDP. Aquests fitxers de metadades es poden descarregar de:

	PREPRODUCCIÓ:
	https://preproduccio.autenticaciogicar4.extranet.gencat.cat/idp/shibboleth
	https://preproduccio.autenticaciogicar2.extranet.gencat.cat/idp2/shibboleth
	https://preproduccio.autenticaciogicar1.extranet.gencat.cat/idp1/shibboleth

	PRODUCCIÓ:
	https://autenticaciogicar4.extranet.gencat.cat/idp/shibboleth
	https://autenticaciogicar2.extranet.gencat.cat/idp2/shibboleth
	https://autenticaciogicar1.extranet.gencat.cat/idp1/shibboleth

Caldrà descarregar les metadades del endpoint que correspongui per a fer la integració.

Per altra banda, per a completar la integració, caldrà que els responsables de l'aplicació facilitin el XML de metadades de l'aplicació a la OTGICAR. Un cop importat per part de la OTGICAR, l'aplicació estarà autoritzada per a autenticar contra GICAR.

A continuació es llisten els atributs més importants que GICAR retornarà en la seva resposta SAML2:

- NIF de l'usuari (idem a la resposta GICAR_ID): "urn:oid:1.3.6.1.4.1.5923.1.1.1.6"
- Codi Intern de l'usuari (UID): "urn:oid:2.0.0.0.0.0.0.0.0.0.9"
- Mail de l'usuari: "urn:oid:0.9.2342.19200300.100.1.3"
- Resposta capçalera GICAR: "urn:oid:2.0.0.0.0.0.0.0.0.0.1"
