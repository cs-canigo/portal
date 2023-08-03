+++
date        = "2021-08-17T12:20:42+01:00"
title       = "SAML2 - Integració a través d'Agent de Shibboleth"
description = "Descripció de la Integració a través d'Agent de Shibboleth"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= true
weight 		= 2
+++

Es disposa d'una modalitat d'integració on un frontal apache es pot integrar amb GICAR a través de Shibboleth-SAML2. En aquesta modalitat es desplega en l'apache el mòdul de "service provider" de Shibboleth i aquest possibilita les redireccions d'autenticació de l'aplicació contra GICAR.

A banda d'això aquesta modalitat d'integració abstreu completament el desenvolupador de la complexitat d'entendre el detall de funcionament del protocol SAMLv2 donat que el mòdul transforma la resposta de SAMLv2 en les headers de GICAR estàndard.

Aquesta modalitat d'integració està indicada per aplicacions fetes a mida, o per aplicacions que siguin capaces de delegar l'autenticació a través de Headers.

Aquesta modalitat d'integració permet que una aplicació que no tingui el frontal a dins de XCAT pugui fer login contra GICAR. 

## Funcionament de l'agent de Shibboleth

A continuació es descriuen els passos que se segueixen per portar a terme l’autenticació d’un usuari amb aquest agent:

1.	L’usuari intenta accedir al recurs protegit. Si l’usuari no ha iniciat cap sessió o aquesta ha caducat, l’agent de Shibboleth instal·lat interceptarà la petició per tal de que es produeixi un desafiament d’autenticació (Punt 2). Altrament, si l’usuari té una sessió activa, aquest accedirà directament a l’aplicació.

1.	L’Agent de Shibboleth instal·lat en el Servidor Web on resideix el frontal de l’aplicació en qüestió intercepta la petició (primer filtre de virtual hosts) podent:

	- Ignorar-la: en el cas que sigui un domini que s’hagi decidit ignorar de la protecció de gicar.
	- Enviar la petició a GICAR que analitzarà el tipus de protecció, si hi ha una sessió activa, etc.

1.	GICAR avalua si es tracta d’un recurs protegit

	- Si està protegit, GICAR avalua si l’usuari té una sessió activa.
	- Si no té sessió activa, se li  demanen a l’usuari les seves credencials o el Certificat Digital. SiteMinder farà una validació de les credencials al Directori Corporatiu i s’assegurarà de la validesa del certificat. Si tot és correcte, s’obrirà una nova sessió per a l’usuari validat.

1.	Feta la validació, GICAR (via l’agent) envia a l’aplicació les capçaleres HTTP (indicades en el punt anterior) per a que l’aplicació conegui la identitat de l’usuari validat.

	Esmentar que és el browser (client web) de l’usuari el que genera en local la cookie de sessió, mitjançant el qual SiteMinder determina si una sessió està activa o no, així com el temps d’expiració de la mateixa.

	![Integració Aplicacions GICAR](/related/gicar/esquema-acces-2021.png)

1.	A partir d’aquest moment, és la pròpia aplicació (amb les capçaleres rebudes que identifiquen a la persona autenticada) qui determina si l’usuari està autoritzat, amb quins permisos, etc..

![Integració Aplicacions GICAR](/related/gicar/esquema-acces2-2021.png)


## Informació proporcionada per l'agent de Shibboleth a l'aplicació

Un cop l'usuari s'ha autenticat correctament, l'agent de Shibboleth generarà un seguit de capçaleres HTTP que proporcionarà a l'aplicació. Per regla general són les següents:

**Si l’usuari s’ha autenticat amb usuari i contrasenya contra el  obtindrà les següents capçaleres:**

* **HTTP_GICAR (conté les dades de l’usuari al DC)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

* **HTTP_GICAR_ID (conté el NIF de l’usuari al DC)** --> 11112222W

Els detalls d’aquests camps es poden veure en la següent taula:

![Integració Aplicacions GICAR](/related/gicar/taula-capçalera-gicar.png)

Si l’usuari s’ha autenticat amb certificat:

* **HTTP_GICAR (conté dades si l’usuari està al DC, sino ve buida)** = “CODIINTERN=NRDRJN0001;NIF=11112222W;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

* **HTTP_GICAR_ID (conté el NIF de l’usuari)** --> 11112222W

Sota petició podran obtenir-se també les següents capçaleres:

* **HTTP_GICAR_PSIS**: que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

A partir d’aquest moment, l’aplicació determinarà els privilegis que té l’usuari que hi accedeix.

## Finalització de la sessió activa

Hi ha dues maneres de terminar una sessió amb GICAR: o bé a través del formulari de logoff específic de GICAR, o bé a partir d’un timeout.

El timeout es un paràmetre definit a GICAR que provoca la terminació de la sessió en el cas que s’hagi superat un cert temps sense activitat. Aquest temps màxim d’inactivitat pot ser diferent per cada aplicació. En el cas d’accedir a una aplicació amb GICAR i fer ús del Single Sign On per a accedir a una altra, cal tenir en compte que el temps de timeout no es veurà modificat i seguirà mantenint el valor que estigués indicat per a la primera aplicació.

Una altra manera per a terminar la sessió, es que l’aplicació invoqui el formulari de logoff que posa a disposició GICAR. Aquest formulari realitza l’esborrat de les cookies associades a la sessió, cosa que provoca la seva finalització. Així doncs, només cal que l’aplicació invoqui una de les URL següents segons l’entorn en que es trobi:

Si l’aplicació té domini xxx.gencat.cat:
 
- A PRE: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://preproduccio.autenticaciogicar4.extranet.gencat.cat/idp/logoutgicar.jsp
	- https://preproduccio.autenticaciogicar2.extranet.gencat.cat/idp2/logoutgicar.jsp
	- https://preproduccio.autenticaciogicar1.extranet.gencat.cat/idp1/logoutgicar.jsp

- A PRO: en funció del que indiquin els administradors de GICAR es farà servir un link o un altre:

	- https://autenticaciogicar4.extranet.gencat.cat/idp/logoutgicar.jsp
	- https://autenticaciogicar2.extranet.gencat.cat/idp2/logoutgicar.jsp
	- https://autenticaciogicar1.extranet.gencat.cat/idp1/logoutgicar.jsp
	
Si l’aplicació té un domini aliè a xxx.gencat.cat, caldrà consultar el tema als responsables de GICAR.


## Ús de l'agent de Shibboleth sobre plataformes Cloud

Per a poder possibilitar això es disposa d'una imatge de **contenidor Apache-GICAR-Shibboleth** i **contenidor NGINX-GICAR-Shibboleth** que permet fer de forma senzilla aquesta integració. El desenvolupador per a poder utilitzar aquesta integració només ha d'indicar quina és la URL que se securitzarà amb aquesta modalitat d'integració, i a partir d'aquí es proporcionarà al desenvolupador tota la informació per a poder aixecar fàcilment el contenidor. Veure el següent [enllaç](https://canigo.ctti.gencat.cat/cloud/cataleg/) on es pot obtenir informació sobre com obtenir aquesta plantilla de contenidor.

### Si es fa ús de la imatge Apache-GICAR-Shibboleth:

Per a poder arrencar aquesta imatge de contenidor cal tenir present la següent informació:

- Existeixen dues carpetes amb fitxers de configuració dins d'aquesta imatge docker:
	- La carpeta "sp_gicar_default" conté els fitxers de configuració i binaris que no s'han de modificar per a arrencar l'aplicació.
	- La carpeta "sp_gicar_conf_aplicacio" conté l'aplicació particular per a l'aplicació que es vol arrencar amb aquest contenidor. Per defecte conté una configuració per arrencar el contenidor en mode proves contra l'entorn de PRE de GICAR, i conté un fitxer "cgi" per a poder veure les capçaleres generades per GICAR. Dins d'aquesta carpeta caldrà doncs posar els següents fitxers de cara a que el contenidor pugui arrencar correctament:

		- certificats (fitxers .key i .crt) els quals serveixen per a establir el canal d'encriptació entre el proveïdor d'identitats GICAR i l'apache.
		- El fitxer "idp-metadata.xml" el qual defineix les propietats del proveïdor d'identitats GICAR. Aquest fitxer és diferent entre PRE i PRO.
		- El fitxer "shib.conf" el qual defineix que es protegirà amb aquesta modalitat de protecció.


- Un cop incorporats aquests fitxers per a construïr la imatge (build) cal fer el següent:

 		docker build -t gencatcloud/gicar-shibboleth:1.0.3 .

- Un cop fet el build per a aixecar una instància de la imatge cal fer el següent:

		docker run -ti --rm  --name gicar-shibboleth -p 80:80 -p 443:443 -e "url_entityid_gicar=[nom entityID aplicacio]" -e "url_idp_gicar=[nom entityID IDP]"  -e "certificate_name=[nom fitxer certificat sense .cer o .key]" -e "server_name=[schema i host de l'aplicació]" gencatcloud/gicar-shibboleth:1.0.3

Cal tenir en compte que l'ordre d'arrencada del contenidor conté els següents paràmetres els quals seran proporcionats per l'OTGICAR/Suport Cloud/Integració de Solucions en el moment d'abordar el projecte:

	- url_entityid_gicar -> application id in gicar

	- url_idp_gicar -> gicar URL enpoint

	- certificate_name -> certificate file name

	- server_name -> public application serverName (with http schema) 


Per exemple:

	docker run -ti --rm  --name gicar-shibboleth -p 80:80 -p 443:443 -e "url_entityid_gicar=https://preproduccio.dockersaml.gencat.cat" -e "url_idp_gicar=https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth" -e "certificate_name=AplicacioProva" -e "server_name=https://preproduccio.dockersaml.gencat.cat" gencatcloud/gicar-shibboleth:1.0.3


Per a provar la solució amb la configuració de proves que ve per defecte, cal fer el següent:

- Afegir el domini preproduccio.dockersaml.gencat.cat associat a la teva IP al teu fitxer hosts de la teva màquina.
- En un navegador accedir a https://preproduccio.dockersaml.gencat.cat/cgi-bin/headers.cgi.
- Després de l'autenticació es redireccionarà al CGI on es podran veure les headers generades.


### Si es fa ús de la imatge NGINX-GICAR-Shibboleth:

Per a poder arrencar aquesta imatge de contenidor cal tenir present la següent informació:

- Existeixen dues carpetes amb fitxers de configuració dins d'aquesta imatge docker:
	- La carpeta "sp_gicar_default" conté els fitxers de configuració i binaris que no s'han de modificar per a arrencar l'aplicació.
	- La carpeta "sp_gicar_conf_aplicacio" conté l'aplicació particular per a l'aplicació que es vol arrencar amb aquest contenidor. Per defecte conté una configuració per arrencar el contenidor en mode proves contra l'entorn de PRE de GICAR, i conté un fitxer "cgi" per a poder veure les capçaleres generades per GICAR. Dins d'aquesta carpeta caldrà doncs posar els següents fitxers de cara a que el contenidor pugui arrencar correctament:

		- certificats (fitxers .key i .crt) els quals serveixen per a establir el canal d'encriptació entre el proveïdor d'identitats GICAR i l'apache.
		- El fitxer "idp-metadata.xml" el qual defineix les propietats del proveïdor d'identitats GICAR. Aquest fitxer és diferent entre PRE i PRO.
		
- Un cop informades aquestes dades, cal informar els següents paràmetres per arrancar el contenidor:

	- CLIENT_APP_SCHEME: https
	- CLIENT_APP_HOSTNAME: "nom de domini de l'aplicació": per exemple: preproduccio.aplicacions.agricultura.intranet.gencat.cat
	- SHIBBOLETH_RESPONDER_PATH: /Shibboleth.sso
	- ENTITY_ID_SP: "identificador de l'aplicació dins de GICAR". Per exemple: https://preproduccio.aplicacions.agricultura.intranet.gencat.cat/eRVC
	- ENTITY_ID_IDP: "identificador del node de GICAR que ha procedit a fer l'autenticació". per exemple: https://preproduccio.autenticaciogicar2.extranet.gencat.cat/idp2/shibboleth
	- CERTIFICATE_NAME: "nom del fitxer del certificat incorporat al punt anterior"
	- CLIENT_APP_SECURE_PATH_01: "url a securitzar". exemple: /eRVC/portal/auth/entradaGICAR
	- NGINX_PROXY_DESTINATION_01: "backend on es munta el proxy definit". exemple: http://backendapp.gencat.cat/api/login

Es poden definir fins a 10 proxys diferents protegits amb GICAR inidicant els paràmetres CLIENT_APP_SECURE_PATH_xx i NGINX_PROXY_DESTINATION_xx on xx pot variar del 01 al 10.


Tal pel cas del contenidor apache-GICAR com pel contenidor NGINX-GICAR, Les url's de logoff d'aquesta modalitat d'integració varien envers les URL's de logoff que es fan servir si es fa integració directa amb SiteMinder. En aquest cas, caldrà que les aplicacions cridin la següent URL de logoff per a destruir les sessions generades:

		A PREPRODUCCIÓ: https://<domini_aplicació>/Shibboleth.sso/Logout?return=https://preproduccio.autenticaciogicar**XXX**.extranet.gencat.cat/idp**XXX**/logoutgicar.jsp

		A PRODUCCIÓ: https://<domini_aplicació>/Shibboleth.sso/Logout?return=https://autenticaciogicar**XXX**.extranet.gencat.cat/idp**XXX**/logoutgicar.jsp

on **XXX** varia en funció del CPD on ha fet login l'aplicació.

## Ús de l'agent de Shibboleth sobre plataformes On Premise

Aquest muntatge també és possible dur-lo a terme en entorns on premise. Per a dur-lo a terme es pot seguir el següent tutorial (basat en entorn RedHat7 amb un OHS instal·lat):

### Instal·lar l'agent de Shibboleth sobre l'apache:

**Instal·lant via "Yum":**

Creem el fitxer següent amb permissos 644(root)

	/etc/yum.repos.d/sib.repo

amb el següent contingut:

	[security_shibboleth]
	name=Shibboleth (CentOS_CentOS-6)
	type=rpm-md
	baseurl=http://download.opensuse.org/repositories/security:/shibboleth/CentOS_CentOS-6/
	gpgcheck=1
	gpgkey=http://download.opensuse.org/repositories/security:/shibboleth/CentOS_CentOS-6/repodata/repomd.xml.key
	enabled=1

Un cop definit el repositori ja podem executar el yum d'instal·lació

	$sudo yum install shibboleth.x86_64


**Després de la instal·lació:**

Un cop feta la instal·lació el Shibboleth restarà com a servei de sistema i podrem trobar els fitxers necessaris als següents paths:

•	Configuració: /etc/shibboleth/shibboleth2.xml
•	shibd: /usr/bin
•	mod_shib: els moduls estan disponibles a /usr/lib/shibboleth/
•	Els fitxers de logs estan a /var/log/shibboleth I a /var/log/shibboleth-www/native.log

**Configuració de l'apache:**

Cal afegir els següents paràmetres a la configuració de la instància de l'OHS, en el nostre cas el trobem al fitxer 

/home/oracle/Oracle/Middleware/Oracle_Home/user_projects/domains/base_domain/config/fmwconfig/components/OHS/instances/gicar/httpd.conf

	LoadModule mod_shib "/usr/lib64/shibboleth/mod_shib_22.so"

	#
	# Ensures handler will be accessible.
	#

	<Location /Shibboleth.sso>
	  AuthType None
	  Require all granted
	</Location>
	 
	#
	# Used for example style sheet in error templates.
	#
	<IfModule mod_alias.c>
	  <Location /shibboleth-sp>
	    AuthType None
	    Require all granted
	  </Location>
	  Alias /shibboleth-sp/main.css /usr/share/shibboleth/main.css
	</IfModule>

	#
	# Configure the module for content.
	#
	# You MUST enable AuthType shibboleth for the module to process
	# any requests, and there MUST be a require command as well. To
	# enable Shibboleth but not specify any session/access requirements
	# use "require shibboleth".
	#
	<Location /secure>
	  AuthType shibboleth
	  ShibRequestSetting requireSession 1
	  require shib-session
	  ShibUseHeaders On
	</Location>

A través de les directives "Location" es com es securitzen els directoris securitzats amb aquest mecanisme. 


### Reinici del servei de shibboleth SP

Shibboleth s'instala com a servei I el gestionarem com a tal

•	Inici:

	$sudo service shibd start

•	Aturada

	$sudo service shibd stop

•	Reinici

	$sudo service shibd restart

•	Estat

	$sudo service shibd status

També podem executar directament el fitxer binari 


### Definició de variables d'entorn

El propi RHEL6 proporciona unes llibreries libcurl basades en Netscape Security Services stack (NSS) en comptes de openSSL per tal de fer la negociació de SSL per a escenaris que incloguin IDPs SAML 1.1 y consulta d'atributs mitjançant intercanvis SOAP.

Per evitar això, hem d'indicar que agafin la variable d'entorn LD_LIBRARY_PATH amb la llibreria que ens interesi.

Ens haurem d'assegurar que el fitxer /etc/sysconfig/shibd conté la següent informació:


	# User account for shibd
	SHIBD_USER=shibd

	# Umask for shibd
	# SHIBD_UMASK=022

	# Wait period (secs) for configuration (and metadata) to load
	SHIBD_WAIT=30

	# Override OS-supplied libcurl
	export LD_LIBRARY_PATH=/opt/shibboleth/lib64


### Configuració del shibboleth SP

En aquest punt, demanar suport a la OTGICAR donat que es facilitarà tota la informació necessària per a poder configurar el mòdul de Shibboleth d'acord al tipus d'instal·lació que s'està duent a terme.

## Estratègies per a emular l'entorn en un entorn de desenvolupament

A continuació s'exposa com simular GICAR en entorns de desenvolupament, amb l'objectiu de que els proveïdors de desenvolupament tinguin una forma senzilla de simular GICAR i testejar-lo sense necessitat de disposar, per exemple, de connexió a la Xarxa de la Generalitat, ni de demanar configuracions a l'Oficina Tècnica de GICAR.

Es presenten dues estratègies per a fer-ho:

### Simulació de les capçaleres HTTP generades per l'agent de Shibboleth:

**En cas de disposar de frontal web apache:**

Configurant el frontal web apache de cara a que generi de forma automàtica les capçaleres de GICAR. S’ha d’afegir a l’arxiu httpd.conf, el següent:

- Habilitar el mod_header en el apache.

- Generar les següents capçaleres a nivell d'apache utilitzant les següents directives:

	- RequestHeader set GICAR_ID “00000000T”
	- RequestHeader set GICAR “CODIINTERN=NRDRJN0001;NIF=00000000T;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

Aquesta configuració fa que l’Apache afegeixi la capçalera GICAR i GICAR_ID, amb valor fix, dins de totes les peticions HTTP rebudes.

**En cas de disposar de frontal web NGINX:**

Al fitxer de configuració del Nginx de forma molt semblant a com es fa en el cas d'apache es pot definir la capçalera GICAR_ID de la següent forma:

	    proxy_set_header        GICAR_ID   "00000000T";

La capçalera GICAR es pot emular de la següent manera:

	    more_set_input_headers 'GICAR1: CODIINTERN=NRDRJN0001';
	    more_set_input_headers 'GICAR2: ;NIF=00000000T';
	    more_set_input_headers 'GICAR3: ;EMAIL=mail.admin@gencat.net';
	    more_set_input_headers 'GICAR4: ;UNITAT_MAJOR=UNITAT_MAJOR=CTTI'; 
	    more_set_input_headers 'GICAR5: ;UNITAT_MENOR=UNITAT_MENOR=CTTI Qualitat';  
		
	    proxy_set_header        GICAR $http_GICAR1$http_GICARCI$http_GICAR2$http_GICAR_ID$http_GICAR3$http_GICARMAIL$http_GICAR4$http_GICARUMJ$http_GICAR5$http_GICARUMN;