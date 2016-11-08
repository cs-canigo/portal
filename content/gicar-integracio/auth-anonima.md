+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Servei d’autenticació anònima amb GICAR"
description = ""
sections    = "GICAR"
taxonomies  = []
weight 		= 4
+++

GICAR ofereix també un servei per tal d’autenticar usuaris amb certificat digital (autenticació per a col·lectiu de ciutadania) independentment de que estiguin o no en el Directori Corporatiu de la Generalitat. Aquest servei és útil per a aplicacions que han de ser accedides per col·lectius d’usuaris que no poden ser identificats ni com a T1, T2, ni com a T3, i que per tant no tenen relació laboral amb la Generalitat.

Hi ha la possibilitat d’indicar a GICAR que, per una aplicació en concret, permeti, amb certificat digital, l’accés a usuaris que no pertanyin al Directori Corporatiu de la Generalitat. Això s’aconsegueix protegint el recurs en qüestió amb l’esquema d’autenticació anònima.

- Descripció del procés d’autenticació utilitzant l’esquema d’autenticació anònima.
  
El procés que segueix GICAR per a autenticar usuaris és el que s’indica en el següent esquema:

![Integració Aplicacions GICAR](/related/gicar/diagrama-autenticacio-anonima.png)

A continuació es descriuen els passos que segueix GICAR en aquest esquema d’autenticació:

Si l’usuari no té cap sessió activa li apareixerà un formulari de login, per tal d’introduir les seves credencials, o autenticar-se amb certificat digital. En aquest punt, i tenint en compte l’esquema d’autenticació anònima hi ha tres opcions, que retornen la següent informació:


1.	**Autenticació amb usuari i contrasenya per usuaris que estan en el DC**:

	Aquesta opció només serà vàlida si l’usuari està donat d’alta en el Directori Corporatiu. SiteMinder validarà que les credencials introduïdes per l’usuari siguin les correctes en el DC, i, si això es compleix, retornarà la informació bàsica de l’usuari a l’aplicació a través de la capçalera HTTP_GICAR i HTTP_GICAR_ID. Exemples de les capçaleres


		HTTP_GICAR (conté les dades de l’usuari al DC) = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

		HTTP_GICAR_ID (conté el NIF de l’usuari al DC) --> 11112222W


2.	**Autenticació amb certificat per usuaris que estan en el DC**:

	Aquesta casuística es dóna quan un usuari intenta accedir al recurs protegit per GICAR amb certificat digital, i aquest es troba en el Directori Corporatiu de la Generalitat. Les capçaleres que es rebran en aquest cas seran les següents:

		HTTP_GICAR (conté les dades de l’usuari al DC) = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

		HTTP_GICAR_ID (conté el NIF de l’usuari) --> 11112222W

		De forma opcional i sota petició es podran sol·licitar les següents capçaleres:

		HTTP_GICAR_CERT (conté el classification level, el issuer, el subject, i el OID del certificat)  --> CLASIFICATIONLEVEL=4;CERTISSUER=C=ES, O=Agencia Catalana de Certificacio (NIF Q-0801176-I), L=Passatge de la Concepcio 11 08008 Barcelona, OU=Serveis Publics de Certificacio ECV-2, OU=Vegeu https://www.catcert.net/verCIC-2 (c)03, OU=Secretaria d'Administracio i Funcio Publica, CN=EC-SAFP;CERTSUBJECT=C=ES, O=Centre Telecomunicacions i Tecnologies de la Informació, OU=Serveis Públics de Certificació CPISR-1, OU=Vegeu https://www.catcert.cat/verCPISR-1 (c)03, SN=GARCIA GARCIA, G=ALBERT, SERIALNUMBER=46587898A, CN=CPISR-1 ALBERT GARCIA GARCIA;CERTIFICATEPOLICY=1.3.6.1.4.1.15096.1.3.1.81

		HTTP_GICAR_PSIS: que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

	Cal destacar que la capçalera HTTP_GICAR_PSIS és la única capçalera indicada per a obtenir la informació de les diferents entitats de certificació que permet autenticar GICAR, o de nom i cognoms d’usuari autenticat, donat que és la única que conté les dades de forma estructurada.


3.	**Autenticació amb certificat per usuaris que no estan en el DC (Autenticació Anònima)**:

	Aquesta casuística es dóna quan un usuari intenta accedir al recurs protegit per GICAR amb certificat digital, i aquest no pertany al Directori Corporatiu de la Generalitat. Les capçaleres que es rebran en aquest cas seran les següents:

		HTTP_GICAR_ID (conté el NIF de l’usuari) --> 11112222W

		HTTP_GICAR_CERT (conté el classification level, el issuer, el subject, i el OID del certificat)  --> CLASIFICATIONLEVEL=4;CERTISSUER=C=ES, O=Agencia Catalana de Certificacio (NIF Q-0801176-I), L=Passatge de la Concepcio 11 08008 Barcelona, OU=Serveis Publics de Certificacio ECV-2, OU=Vegeu https://www.catcert.net/verCIC-2 (c)03, OU=Secretaria d'Administracio i Funcio Publica, CN=EC-SAFP;CERTSUBJECT=C=ES, O=Centre Telecomunicacions i Tecnologies de la Informació, OU=Serveis Públics de Certificació CPISR-1, OU=Vegeu https://www.catcert.cat/verCPISR-1 (c)03, SN=GARCIA GARCIA, G=ALBERT, SERIALNUMBER=46587898A, CN=CPISR-1 ALBERT GARCIA GARCIA;CERTIFICATEPOLICY=1.3.6.1.4.1.15096.1.3.1.81

		HTTP_GICAR_PSIS: que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

	Cal destacar que la capçalera HTTP_GICAR_PSIS és la única capçalera indicada per a obtenir la informació de les diferents entitats de certificació que permet autenticar GICAR, o de nom i cognoms d’usuari autenticat, donat que és la única que conté les dades de forma estructurada.

	En el cas de voler obtenir si un usuari s’ha autenticat amb usuari o contrasenya, o amb certificat:

	- Si la capçalera GICAR_PSIS ve informada, l’usuari s’haurà autenticat amb certificat.

	- Si la capçalera GICAR_PSIS NO ve informada, l’usuari NO s’haurà autenticat amb certificat. La capçalera GICAR_PSIS només apareix quan un usuari s’ha autenticat amb certificat.

	En cas de voler obtenir el nom i cognoms de la persona que s’ha autenticat amb certificat, o altres dades del Certificat (excepte el DNI de l’usuari autenticat el qual es pot recuperar fàcilment amb la capçalera HTTP_GICAR_ID), es recomana fer-ho sempre amb la capçalera HTTP_GICAR_PSIS.


- Tipus de certificats admesos pel servei d’autenticació anònima de GICAR.

El servei d’autenticació anònima de GICAR està preparat per a poder realitzar l’autenticació de qualsevol certificat reconegut per CatCert (Agència Catalana de Certificació). Actualment les següents entitats són reconegudes per CatCert:

- Agència Catalana de Certificació (CATCert)
	
	- Entitat de certificació Secretaria d'Administració i Funció Pública (EC-SAFP)
	- Entitat de certificació Administració Local (EC-AL)
	- Entitat de certificació Parlament (EC-PARLAMENT)  
	- Entitat de certificació Universitats i Recerca (EC-UR)
	- Entitat de certificació Universitat Rovira i Virgili (EC-URV)
	- Entitat de certificació idCAT (EC-idCAT)
	- Entitat de certificació Sector Públic (EC-SectorPublic)
	- Entitat de certificació Ciutadania (EC-Ciutadania)

- Autoridad de Certificación de la Abogacía (AC Abogacía)
- Autoritat de Certificació de la Comunitat Valenciana (ACCV)
- Agencia Notarial de Certificación (ANCert)
- Asociación Nacional de Fabricantes - Autoridad de Certificación (ANF)
- Camerfima - Certificados Camerales
- Ceres Fábrica Nacional de Moneda y Timbre - Real Casa de la Moneda FNMT - RCM)
- Direcció General de Policia (DNI-E)
- Firmaprofesional
- HealthSign
- Intercambio Electrónico de Datos i Comunicaciones, SL (AC EDICOM)
- Izenpe
- Netfocus (no dóna serveis com a Prestador de Serveis de Certificació)
- AC Organización Médica Colegial de España (OMC)
- Servicio de Certificación de Registradores del Colegio de Registradores de la Propiedad y Mercantiles de España (SCR- CORPME)
