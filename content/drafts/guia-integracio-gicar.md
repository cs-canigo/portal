+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Guia d'integració"
description = "Com integrar l'autenticació de les aplicacions amb GICAR"
section     = ""
taxonomies  = []
toc 		= true
weight 		= 2
+++


GICAR disposa d’una eina, el SiteMinder, per facilitar l’autenticació d’aplicacions web. A continuació es veurà que és Siteminder, quines són les seves característiques principals, els elements dels quals es composa (Servidor de Polítiques, Agents, Servidor Web i els diferents directoris) i les tasques que s’han de realitzar per tal d’integrar-ne una aplicació. 

A part de tots el punts anteriors que enfoquen l’autenticació de l’usuari contra el Directori Corporatiu de la Generalitat (empleat públic de la Generalitat), al punt 3.6, s’exposaran quins són els passos a seguir per tal de que GICAR pugui proporcionar a una aplicació el servei d’autenticació anònima mitjançant l’ús d’un certificat digital. 

En cas que l’aplicació a integrar tingui la necessitat de que sigui accedida per usuaris de la Generalitat, i per usuaris de les administracions locals catalanes (AAL), GICAR permet també autenticar aquests usuaris gràcies al servei de validació que proporciona GICAR contra el Directori del Consorci AOC (EACAT). Podeu trobar informació de com fer aquesta integració al punt 3.7.

Així doncs i a mode de resum, GICAR permet l’autenticació als següents col·lectius i amb les següents modalitats:

![Integració Aplicacions GICAR](/gicar/img/taula-modalitats-autenticacio.png)

Per últim en l’apartat 3.8 s’exposa com fer la integració d’una aplicació amb GICAR utilitzant com a protocol d’integració SAML2, indicat per a aplicacions que només puguin delegar l’autenticació a GICAR a través de SAML2.


## Característiques de SiteMinder

SiteMinder és l’eina de la plataforma GICAR que, de forma centralitzada i en alta disponibilitat, s’utilitza per gestionar les polítiques d’accés dels usuaris a les aplicacions web. Per tant, les aplicacions deleguen completament el procés d’autenticació en SiteMinder.

Quan una aplicació està protegida, quan l’usuari intenta accedir-hi,  SiteMinder li demana a l’usuari les credencials (usuari i contrasenya, o certificat digital) i posteriorment es fa una validació d’aquestes al Directori Corporatiu de la Generalitat de Catalunya. En el cas que el resultat sigui positiu, SiteMinder li lliura a l’aplicació final unes capçaleres HTTP amb informació de l’usuari validat. A partir d’aquest moment, l’aplicació és la que determina quins permisos d’accés o privilegis té l’usuari dins l’aplicació (Autorització).

En resum, les característiques més rellevants de SiteMinder són:

- Seguretat Centralitzada, amb la capacitat d’aplicar polítiques diferents en funció del tipus d’usuari, del col·lectiu al que pertany, del departament, etc.
- Permet disposar d’un entorn de Single Sign On, amb contrasenya única del Directori (autenticació única)
- Alta Disponibilitat dels Servidors de Polítiques
- Disposa d’un registre d’accessos (log) molt complert per processos d’auditoria.
- Servei d’administració per tal de realitzar, per exemple, el manteniment del Servidor de Polítiques.


## Arquitectura i elements de SiteMinder

El següent gràfic mostra l’arquitectura dels elements de GICAR responsables del procés d’autenticació:

![Integració Aplicacions GICAR](/gicar/img/arquitectura-siteminder.png)

Tal i com s’observa en el gràfic, l’arquitectura de SiteMinder la integren els elements que es descriuen a continuació:

- SiteMinder Policy Server proporciona i centralitza la gestió de polítiques, autenticació i auditoria per a aplicacions web. El Policy Server és el responsable de:
	- Aplicar una política de control d’accés sobre les aplicacions integrades.
	- Realitzar, quan sigui necessari, l’autenticació d’usuari.
	- Permetre l’accés a determinats recursos d’aquells únicament dels usuaris autoritzats.
	- Facilitar a les aplicacions les dades necessàries per a la identificació de l’usuari que accedeix al recurs.
	- Oferir SSO (Single Sign-On) entre totes les aplicacions integrades.
	- Separar la lògica d’autenticació de la lògica d’aplicació. Això permet modificar el procediment d’autenticació sense afectar a l’aplicació així com aplicar polítiques centralitzades de contrasenyes.
	
- Agent de SiteMinder: Es tracta d’una extensió del servidor web (un filtre ISAPI en el cas de l’IIS, un mòdul mod en el cas d’Apache) que intercepta les peticions abans de ser processades, tot aplicant la política definida al servidor central. S’instal·la en el Servidor Web on resideix el frontal de l’aplicació i s’ocupen d’interceptar les peticions d’accés a les pàgines web d’aquest servidor. Aquestes peticions són enviades al Servidor de Polítiques de SiteMinder per determinar si l’aplicació està protegida i requereix d’autenticació.
En línies generals, SiteMinder intercepta totes les peticions rebudes pel servidor web i, abans de passar-la a l’aplicació, verifica que l’usuari estigui autenticat.

![Integració Aplicacions GICAR](/gicar/img/arquitectura-siteminder2.png)

- Directori Corporatiu: és el repositori central d’identitats utilitzat per SiteMinder per comprovar la validesa o no d’una identitat que intenta accedir a una aplicació web protegida. En el Directori Corporatiu és on resideix la contrasenya única utilitzada per validar totes les aplicacions integrades amb SiteMinder.

- Servidor Web: es on resideix el frontal de l’aplicació web a protegir i on cal instal.lar l’agent de SiteMinder.

## Tasques per a integrar una aplicació amb SiteMinder

Per tal de realitzar la integració d’una aplicació amb SiteMinder (instal·lació de l’agent al frontal web propi de l’aplicació) s’haurà de seguir el següent procediment:

1. Obertura dels ports dels firewalls per connectar l’Agent de SiteMinder amb el SiteMinder Policy Server. El responsable de l’aplicació sol·licitarà l’obertura dels ports següents:

	![Integració Aplicacions GICAR](/gicar/img/taula-ports-sm.png)

1. L’interlocutor de CPD interessat en dur a terme la integració, haurà d’omplir el formulari “Petició d’integració d’una aplicació v3.xls” i enviar-les al sau.tic@gencat.cat, amb la capçalera _PET_ORD_9.34 GICAR_ENTORN_Integració XXXX 

1.	L’Administrador de GICAR, aplicarà les configuracions pertinents, i omplirà el formulari i el retornarà al sol·licitant.
 
1.	El tècnic de sistemes instal·larà  l’Agent de SiteMinder en el Servidor Web on resideix el frontal a protegir per SiteMinder, fent ús de la informació lliurada en l’apartat 3 .

1.	L’administrador de GICAR, consensuadament amb els responsables de l’aplicació, aplica les polítiques de seguretat en SiteMinder.

1.	L’integrador de l’aplicació haurà de modificar l’aplicació per poder capturar i tractar les capçaleres HTTP que li envia SiteMinder un cop l’usuari ha estat validat al Directori Corporatiu .

**Si l’usuari s’ha autenticat amb usuari i contrasenya contra el  obtindrà les següents capçaleres:**

**HTTP_GICAR (conté les dades de l’usuari al DC)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

**HTTP_GICAR_ID (conté el NIF de l’usuari al DC)** --> 11112222W

Els detalls d’aquests camps es poden veure en la següent taula:

![Integració Aplicacions GICAR](/gicar/img/taula-capçalera-gicar.png)

**Si l’usuari s’ha autenticat amb certificat:**

**HTTP_GICAR (conté dades si l’usuari està al DC, sino ve buida)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

**HTTP_GICAR_ID (conté el NIF de l’usuari)** --> 11112222W

Sota petició podran obtenir-se també les següents capçaleres:

**HTTP_GICAR_CERT** (conté el classification level, el issuer, el subject, i el OID del certificat)  --> CLASIFICATIONLEVEL=4;CERTISSUER=C=ES, O=Agencia Catalana de Certificacio (NIF Q-0801176-I), L=Passatge de la Concepcio 11 08008 Barcelona, OU=Serveis Publics de Certificacio ECV-2, OU=Vegeu https://www.catcert.net/verCIC-2 (c)03, OU=Secretaria d'Administracio i Funcio Publica, CN=EC-SAFP;CERTSUBJECT=C=ES, O=Centre Telecomunicacions i Tecnologies de la Informació, OU=Serveis Públics de Certificació CPISR-1, OU=Vegeu https://www.catcert.cat/verCPISR-1 (c)03, SN=GARCIA GARCIA, G=ALBERT, SERIALNUMBER=46587898A, CN=CPISR-1 ALBERT GARCIA GARCIA;CERTIFICATEPOLICY=1.3.6.1.4.1.15096.1.3.1.81

**HTTP_GICAR_PSIS**: que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

A partir d’aquest moment, l’aplicació determinarà els privilegis que té l’usuari que hi accedeix.


## Descripció del procés d’Autenticació amb SiteMinder

A continuació es descriuen els passos que SiteMinder segueix per portar a terme l’autenticació d’un usuari, i disposar d’un entorn de Single Sign On Web:

1.	L’usuari intenta accedir al recurs protegit. Si l’usuari no ha iniciat cap sessió o aquesta ha caducat, l’agent de SiteMinder instal·lat interceptarà la petició per tal de que es produeixi un desafiament d’autenticació (Punt 2). Altrament, si l’usuari té una sessió activa, aquest accedirà directament a l’aplicació.

1.	L’Agent de SiteMinder instal·lat en el Servidor Web on resideix el frontal de l’aplicació en qüestió intercepta la petició (primer filtre de virtual hosts) podent:

	- Ignorar-la: en el cas que sigui un domini que s’hagi decidit ignorar de la protecció de SiteMinder
	- Enviar la petició al SiteMinder Policy Server que analitzarà el tipus de protecció, si hi ha una sessió activa, etc.

1.	SiteMinder avalua si es tracta d’un recurs protegit

	- Si està protegit, SiteMinder avalua si l’usuari té una sessió activa.
	- Si no té sessió activa, se li  demanen a l’usuari les seves credencials o el Certificat Digital. SiteMinder farà una validació de les credencials al Directori Corporatiu i s’assegurarà de la validesa del certificat. Si tot és correcte, s’obrirà una nova sessió per a l’usuari validat.

1.	Feta la validació, SiteMinder (via l’agent) envia a l’aplicació les capçaleres HTTP (indicades en el punt anterior) per a que l’aplicació conegui la identitat de l’usuari validat.

	Esmentar que és el browser (client web) de l’usuari el que genera en local la cookie de sessió, mitjançant el qual SiteMinder determina si una sessió està activa o no, així com el temps d’expiració de la mateixa.

	![Integració Aplicacions GICAR](/gicar/img/esquema-acces.png)

1.	A partir d’aquest moment, és la pròpia aplicació (amb les capçaleres rebudes que identifiquen a la persona autenticada) qui determina si l’usuari està autoritzat, amb quins permisos, etc..

![Integració Aplicacions GICAR](/gicar/img/esquema-acces2.png)

## Finalització de la sessió activa

Hi ha dues maneres de terminar una sessió amb GICAR: o bé a través del formulari de logoff específic de GICAR, o bé a partir d’un timeout.

El timeout es un paràmetre definit en els Policy Servers que provoca la terminació de la sessió en el cas que s’hagi superat un cert temps sense activitat. Aquest temps màxim d’inactivitat pot ser diferent per cada aplicació. En el cas d’accedir a una aplicació amb GICAR i fer ús del Single Sign On per a accedir a una altra, cal tenir en compte que el temps de timeout no es veurà modificat i seguirà mantenint el valor que estigués indicat per a la primera aplicació.

Una altra manera per a terminar la sessió, es que l’aplicació invoqui el formulari de logoff que posa a disposició GICAR. Aquest formulari realitza l’esborrat de les cookies associades a la sessió, cosa que provoca la seva finalització. Així doncs, només cal que l’aplicació invoqui una de les URL següents segons l’entorn en que es trobi:

Si l’aplicació té domini xxx.gencat.cat:
 
- A PRE: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://preproduccio.idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 
	- https://preproduccio.idp4-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 

- A PRO: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 
	- https://idp4-gicar.gencat.cat/siteminderagent/forms/logoff.fcc 

Si l’aplicació té un domini aliè a xxx.gencat.cat, caldrà consultar el tema als responsables de GICAR.

## Servei d’autenticació anònima amb GICAR

GICAR ofereix també un servei per tal d’autenticar usuaris amb certificat digital (autenticació per a col·lectiu de ciutadania) independentment de que estiguin o no en el Directori Corporatiu de la Generalitat. Aquest servei és útil per a aplicacions que han de ser accedides per col·lectius d’usuaris que no poden ser identificats ni com a T1, T2, ni com a T3, i que per tant no tenen relació laboral amb la Generalitat.

Hi ha la possibilitat d’indicar a GICAR que, per una aplicació en concret, permeti, amb certificat digital, l’accés a usuaris que no pertanyin al Directori Corporatiu de la Generalitat. Això s’aconsegueix protegint el recurs en qüestió amb l’esquema d’autenticació anònima.

- Descripció del procés d’autenticació utilitzant l’esquema d’autenticació anònima.
  
El procés que segueix GICAR per a autenticar usuaris és el que s’indica en el següent esquema:

![Integració Aplicacions GICAR](/gicar/img/diagrama-autenticacio-anonima.png)

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


## Servei d’autenticació mixt 

(per usuaris de la Generalitat i per usuaris de l’Administració local (EACAT))

A través d’aquest mecanisme, les aplicacions de la Generalitat que així ho necessitin, podran delegar la seva autenticació, alhora i de forma federada, contra el directori de usuaris de la Generalitat, i el directori d’usuaris de l’EACAT (Administració Local – Ajuntaments i Consells Comarcals), amb usuari i contrasenya. 

Aquesta modalitat d’integració permetrà que les aplicacions que s’integrin amb GICAR i que així ho requereixin, amb una sola integració, puguin delegar l’autenticació contra el col·lectiu d’identitats de GENCAT o, en cas que la identitat no es trobi a GENCAT, contra l’EACAT.

L’atribut que s’utilitza per a establir el login contra els dos directoris és el NIF (ja és l’atribut que ara mateix s’utilitza per a fer login actualment per les aplicacions integrades amb GICAR i és l’atribut que l’AOC ens ha posat a disposició de l’EACAT per a fer aquesta integració).

Cal destacar que quan l’usuari s’hagi identificat ok contra el Directori de l’EACAT, GICAR només podrà retornar a les aplicacions integrades, com a atribut de resposta, el DNI de l’usuari autenticat (només assegurem que l’usuari és qui diu ser). 

El que fa GICAR en aquest nou muntatge és:

- Primer autenticar l’usuari si ve amb certificat (capçaleres estàndard de GICAR): GICAR_ID --> NIF
- En cas que s’hagi autenticat amb usuari i contrasenya, l’anem a buscar primer a DC: GICAR_ID --> NIF
- En cas que no estigui a DC l’anem a buscar a l’EACAT: GICAR_ID, EACAT_ID --> NIF (L’usuari només s’autenticarà al directori del EACAT, si i només si, no està al directori de la Generalitat)

Es pot veure aquest funcionament en la següent figura:

![Integració Aplicacions GICAR](/gicar/img/diagrama-autenticacio-eacat.png)

Apuntar que hi ha una capçalera que indica a quin directori s’ha autenticat l’usuari, que és la capçalera HTTP_SM_AUTHDIRNAME. Contindrà els valors “DC” o “EACAT” en funció d’on s’hagi autenticat l’usuari.

En resum, les capçaleres HTTP que es lliuraran a l’aplicació final integrada, en funció de com s’hagi autenticat l’usuari seran:

1. Accés amb certificat:

 a.	GICAR_ID --> 00000000T

 b.	HTTP_GICAR_PSIS --> que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

 c.	SM_AUTHDIRNAME  Contindrà la cadena “Policy Store”

2.	Accés amb usuari del Directori Corporatiu GENCAT

 a.	GICAR_ID --> 00000000T

 b.	GICAR --> CODIINTERN=NFCTPR0001;NIF=00000000T;EMAIL=;UNITAT_MAJOR=CTTI (Cent.Telec.i Tecnol.Inf);UNITAT_MENOR=CTTI (Cent.Telec.i Tecnol.Inf)

 c.	SM_AUTHDIRNAME --> Contindrà la cadena “DC”

3.	Accés amb usuari EACAT (Directori EACAT)

 a.	EACAT_ID --> 00000000T

 b. GICAR_ID --> 00000000T

 c.	SM_AUTHDIRNAME --> Contindrà la cadena “EACAT”

## Servei d’autenticació mixt 

(per usuaris de la Generalitat i per usuaris de l’Administració local (EACAT)) 

En cas que l’aplicació a integrar estigui preparada per a treballar amb mecanismes de delegació de l’autenticació a través de protocol SAML2, GICAR disposa de mecanismes per a possibilitar aquesta delegació de l’autenticació a través d’aquest protocol. El producte que utilitza GICAR per a proveir aquesta funcionalitat és el Shibboleth.

El Shibboleth de GICAR recull les capçaleres HTTP generades en una sessió de SiteMinder, i genera un ticket SAML2 amb la informació continguda en aquestes capçaleres, que pot rebre una aplicació.

En aquests casos és recomanable que l’equip tècnic de l’aplicació contacti amb l’Equip GICAR, per tal de fer un estudi de les possibilitats reals de que l’aplicació delegui l’autenticació a un identity provider extern. Un cop fet aquest estudi en cas que sigui viable es configurarà en l’aplicació aquesta delegació de l’autenticació contra el servei GICAR.

Es detalla a continuació com funciona una integració mitjançant protocol SAML. Cal comentar abans de descriure el funcionament a què fan referència els següents conceptes:

- El "ServiceProvider" és l’aplicació integrada que demana l’autenticació.
- El “User Agent” és el navegador de l’usuari.
- L’"Identity Provider" és el proveïdor d’identitats de GICAR.

1.	Al protocol SAML2, el fluxe el comença l’aplicació integrada que demana l’autenticació (Service Provider). Aquesta, a través d’un HTTP Redirect, sol·licita al Identity Provider un tiquet SAML2.

D’aquesta manera, l’aplicació consumidora (service provider) de tiquets SAML2 farà un posts a les URL del Idnetity Provider per a obtenir un tiquet SAML2 vàlid de la següent manera, utilitzant el servei de Redirect/SSO.

	https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO?SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d&RelayState=dab8b17c-460d-455e-ac8d-6d8f763afe43

	Les URLs de petició del Identity Provider: https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO

	El paràmetre SAMLRequest, el qual conté les dades del servidor que demana el tiquet SAML2: SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d 

A continuació es presenta una petició típica d’un tiquet SAML2, decodificada en Base64

2.	Un cop enviada la sol·licitud d’autenticació del service provider cap al Identity Provider, en funció dels paràmetres continguts en el SAMLRequest, salta el formulari de login de GICAR. L’usuari s’autentica amb usuari i contrasenya o certificat.

3.	Un cop l’usuari s’ha autenticat, el identity provider torna a redirigir a l’usuari cap a la URL del service provider retornant via POST al service provider dos paràmetres:

a.	SAMLResponse: la qual conté la resposta a la petició d’autenticació feta amb anterioritat, codificada en base 64. Després d’haver estat decodificat un valor tipus d’aquesta resposta podria ser el següent:

	<?xml version="1.0" encoding="UTF-8"?><saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" Destination="https://adfs.ctti.gencat.cat/adfs/ls/" ID="_133a920d5ca854a8a7979f1c3162eb60" InResponseTo="id-5f5c7321-fe8a-4941-a5ec-4d48f027a7c8" IssueInstant="2014-10-07T06:13:51.250Z" Version="2.0"><saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://idp-gicar.gencat.cat/idp/shibboleth</saml2:Issuer><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/></saml2p:Status><saml2:EncryptedAssertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_cf60828ecfbe1f9a1630ecfd411180e5" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_57045e4cf2bdf58b89dc50bf71741783" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" xmlns:ds="http://www.w3.org/2000/09/xmldsig#"/></xenc:EncryptionMethod><ds:KeyInfo><ds:X509Data><ds:X509Certificate>.............DADES XIFRADES..................................... =</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:CipherValue>...................................DADES XIFRADES.............................................==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAssertion></saml2p:Response>

b.	RelayState: El qual torna a prendre el mateix valor que amb anterioritat.

4.	L’aplicació captura el SAMLResponse, i decodifica el contingut d’aquest tiquet. Si el resultat del SAML Response significa que el Identity Provider dóna per bona l’autenticació, el Service Provider deixarà passar a l’usuari.

![Integració Aplicacions GICAR](/gicar/img/saml.png)

A continuació es detallen els casos d’ús més comuns:

- 3.9.1.	Cas de de ser un consumidor de SAML2 fet a mida:

Com es deia en la introducció, GICAR disposa d’un “Identity Provider”, construït amb la tecnologia Shibboleth, amb capacitat de facilitar tiquets SAML2 a les aplicacions. 

A continuació es detalla quins són els dominis del Identity Provider als que caldrà accedir per a generar el tiquet de SAML2.

- Dominis dels Identity Provider de GICAR

PRE: 
https://preproduccio.idp1-gicar.gencat.cat/
https://preproduccio.idp4-gicar.gencat.cat/

PRO: 
https://idp1-gicar.gencat.cat/
https://idp4-gicar.gencat.cat/


- Construcció del SAML Request:

En cas que l’aplicació que vulgui cridar via SAML2 a GICAR ha de construir un SAMLRequest que ha de contenir exactament la següent informació, estructurada de la següent forma:

	<?xml version="1.0"?> <samlp:AuthnRequest xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" Consent="urn:oasis:names:tc:SAML:2.0:consent:unspecified" Version="2.0" Destination="https://DOMINI _A_ESPECIFICAR_PER_L’EQUIP_GICAR/idp/profile/SAML2/Redirect/SSO" ID="xxxxxxxxxxxxxxxxxxxxx" IssueInstant="2014-12-24T10:35:25.4269359Z" IsPassive="false" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"> <saml:Issuer>https://URL del servei peticionari</saml:Issuer> <samlp:NameIDPolicy AllowCreate="True" Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" /> </samlp:AuthnRequest>

En cas que l’aplicació no pugui generar un SAMLRequest amb aquesta parametrització, no podrà integrar-se directament contra GICAR via SAML2, i haurà d’analitzar una altra via d’integració.


- Petició a l’equip GICAR per a incorporar aquesta aplicació com a consumidora del Identity Provider.

Caldrà que l’equip desenvolupador de l’aplicació com a mínim faciliti la següent informació a l’equip GICAR per a que GICAR pugui autenticar a aquest servei:

·	entityID = Haurà de contenir el valor del SAML:Issuer indicat en el SAMLRequest de les peticions que farà l’aplicació. Serà normalment la URL del servei peticionari.

·	Certificat = Certificat X509 que farà servir l’aplicació consumidora per a desencriptar els tiquets SAML que haurà emès GICAR.

·	AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" = S’haurà d’indicar a quina URL de l’aplicació GICAR haurà de redirigir un cop feta l’autenticació. Serà la URL on es farà la corresponent redirecció, i on es passarà per paràmetre l’atribut SAMLResponse amb el contingut de les respostes que haurà de decodificar i desencriptar l’aplicació.

Caldrà addicionalment que el desenvolupador especifiqui quina informació voldrà rebre referent a l’usauri que s’haurà autenticat.


- 3.9.2.	Cas de tractar-se d’una aplicació Sharepoint de Microsoft

És possible tècnicament la integració d’una aplicació Sharepoint 2010 i superior amb GICAR. Per a fer aquesta integració és necessari disposar d’un servidor Windows Server que faci les funcions de Active Directory Federation Services (ADFS).

L’ADFS és el component de Microsoft que permet la federació dels seus productes amb Identity Providers tercers.

En el cas de Sharepoint s’ha provat amb èxit la integració entre GICAR – Shibboleth – ADFS – Sharepoint. 

En aquest muntatge es configura l’ADFS com a Service Provider del Identity Provider de GICAR. D’aquesta manera, el ADFS és com si fos una aplicació integrada amb GICAR, la qual a la seva hora pot donar accés a múltiples SharePoint i aplicacions del món Microsoft.

De cara al Sharepoint:
·	El ADFS és el seu identity provider.

De cara al ADFS:
·	El Sharepoint és un dels seus service provider o relying party.
·	GICAR és el seu identity provider.

El funcionament en aquests casos seria el següent:

	1.	El Sharepoint que es vol integrar amb GICAR sol·licita un token d’autenticació al ADFS. Per a fer això el Sharepoint provoca un redirect cap al ADFS indicant quin realm d’ADFS farà servir.

	2.	El ADFS avalua quins identity providers té disponibles. Troba GICAR com a identity provider disponible i li demana l’autenticació a través de protocol SAML i a través de l’operativa exposada en l’inici del punt 3.7

	3.	GICAR autentica l’usuari, i redirecciona de nou al ADFS amb el tiquet SAML de resposta.

	4.	L’ADFS recull els paràmetres del tiquet SAML i crea els claims de l’entorn Microsoft.

	5.	L’ADFS passa al Sharepoint els claims que sol·licita.

Per a més detall tècnic per a veure com integrar el Sharepoint-ADFS-GICAR consultar el document “Integració GICAR amb Sharepoint”.


- 3.9.3.	Cas de ser una aplicació .NET 4.x

Nativament les aplicacions .NET 4.x suporten delegar l’autenticació a un ADFS, per tant el mecanisme per a integrar una aplicació .NET amb GICAR pot ser de forma nativa via ADFS. Bàsicament el que aquí es farà serà incloure l’aplicació .NET com a nou Relying Party dins del ADFS que té com a únic Identity Provider “GICAR”.

El procediment doncs es basarà en l’exposat en l’apartat “Configurar Sharepoint com a Relying Party” i “Configurar Claim Rules per a Sharepoint” del document “Integració GICAR amb Sharepoint".

## Migració d’aplicacions que originalment estaven integrades amb SACE, cap a GICAR.

Per motius històrics diverses aplicacions de la Generalitat fan encara l’ús del Servei d’Autenticació Centralitzat (més conegut com a SACE). Aquest és un servei obsolescent que està en fase d’extinció, i es recomana a totes les aplicacions que encara facin ús d’aquest servei, la migració de l’autenticació cap a GICAR.

Aquest apartat pretén donar unes directrius bàsiques sobre com abordar la migració d’una aplicació web integrada amb SACE vers GICAR. Es començarà explicant com s’integren actualment les aplicacions amb el SACE, i a continuació s’exposarà quin és el mecanisme que es proposa per a migrar l’autenticació a GICAR.

- 3.10.1.	Funcionament actual de l’autenticació de les aplicacions amb el SACE

La manera d’integrar-se amb el SACE, consistia en fer una crida HTTPS a una adreça, passant com a informació un fitxer XML, que de sortida contindrà les dades requerides.

https://sace.xxx.gencat.intranet/SACE/SACE_Logon.aspx

On xxx es dc, prepdc i desenvdc per als entorns de Producció, pre-producció i desenvolupament, respectivament. 
	
L’estructura del fitxer XML d’entrada i sortida de dades així com la informació que conté i el seu significat, s’especifica a continuació:

![Integració Aplicacions GICAR](/gicar/img/xmlsace.png)

El codi d’operació pot estar informat amb els següents valors:

![Integració Aplicacions GICAR](/gicar/img/saceoperacions.png)

Els paràmetres d’entrada seran recollits via POST per un camp que es diu XMLIn. Anàlogament, els paràmetres de sortida seran enviats via POST a la pàgina que s’indica en el tag <URL_RETORN> dins del contingut d’un camp que es diu  XMLOut.

Aquest funcionament feia necessari que les aplicacions haguessin de construir-se i presentar un formulari de login, i que aquest formulari de login, o un element dinàmic relacionat, hagués de gestionar els següents punts:

1.	Tenir tota la lògica de crida a SACE i d’enviament de paràmetres.
2.	Enviament de paràmetres de SACE cap a l’aplicació.
3.	Parsejat dels paràmetres retornats per SACE.
4.	Generació de la sessió de l’usuari en base a aquests paràmetres obtinguts

Esquemàticament l’aplicació està funcionant ara mateix de la següent manera:

![Integració Aplicacions GICAR](/gicar/img/sacejsp.png)

- 3.10.2.	Proposta de canvi de migració de SACE cap a GICAR

A continuació es descriu una estratègia orientada a la substitució del SACE per GICAR per a les aplicacions que utilitzen SACE. Comentar que l’estratègia que es descriu a continuació és la recomanada per a fer aquest tipus de migracions de SACE a GICAR, però no és la forma recomanada per a realitzar les intragracions amb GICAR per una aplicació que es construeixi des de 0.

En primer lloc el canvi suposa que a nivell de CPD, calgui instal·lar l’agent de SiteMinder sobre el servidor web on resideixi l’aplicació.

A nivell d’aplicacions el canvi proposat es basa en substituir el formulari de login propietari de l’aplicació anterior, per un JSP, ASP, PHP (element dinàmic de servidor), que estarà protegit a nivell de SiteMinder, que es limiti a fer el següent:

1.	Capturar les següents capçaleres HTTP:

- HTTP_GICAR_ID (conté el NIF de l’usuari) --> 11112222W
Captura obligatòria, a partir del qual s’obtindria el DNI de l’usuari autenticat.

- HTTP_GICAR (conté les dades de l’usuari al DC) = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”
Captura addicional, a partir del qual s’obtindrien altres dades de l’usuari autenticat.

2.	Generar la sessió de l’aplicació en base a aquests paràmetres obtinguts en anterioritat.

Aquest element JSP, ASP, PHP seria l’únic punt de l’aplicació que estaria protegit per SiteMinder, d’aquesta forma aquest JSP, quan fos accedit pel navegador de l’usuari, faria saltar el formulari de login de GICAR, i demanaria les credencials a l’usuari.

Per tant, un cop fet això la traça de navegació de l’usuari seria la següent:

1. L’usuari accedirà a la url l’aplicació web, a la zona on habitualment li demana fer login. Aquesta zona farà un HTTP-REDIRECT al component dinàmic desenvolupat. 

1. Saltaria la protecció de GICAR (SiteMinder) al intentar accedir al element dinàmic.

1. L’usuari introdueix la seva credencial (usuari o contrasenya /certificat). 

1. L’agent de SiteMinder genera les capçaleres HTTP corresponents, que indiquen que l’usuari està loguinat a GICAR.

1. L’element dinàmic desenvolupat captura les capçaleres de GICAR, i genera la sessió a l’usuari en l’aplicació.

![Integració Aplicacions GICAR](/gicar/img/funcionament-migracio-sace-gicar.png)

D’aquesta manera, es substitueix el formulari i les llibreries que fan les crides cap a SACE per una URL protegida per GICAR i una llibreria que recull les capçaleres HTTP i generen la sessió de l’aplicació.

Addicionalment al mètode proposat anteriorment (on només es proposa la protecció amb GICAR d’un únic element dinàmic que és el que recull les capçaleres de GICAR i el que genera la sessió de l’aplicació), també és possible tècnicament que totes les URLs de l’aplicació puguin ser protegides amb GICAR (de fet és el recomanable a nivell de seguretat). El fet de fer-ho d’una forma o d’una altra, depèn del grau d’interacció que tingui aquesta aplicació amb altres elements externs, que impossibilitin la protecció total de l’aplicació amb SiteMinder.
