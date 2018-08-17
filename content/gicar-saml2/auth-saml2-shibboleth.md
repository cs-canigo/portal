+++
date        = "2018-08-17T12:20:42+01:00"
title       = "Aplicació autenticant via SAML2 a través d'Apache-Shibboleth"
description = "Descripció de com utilitzar la imatge de contenidor o com desplegar-ho On Premise."
sections    = "gicar-saml2"
taxonomies  = []
toc			= false
weight 		= 2
+++

Es disposa d'una modalitat d'integració on un frontal apache es pot integrar amb GICAR a través de Shibboleth-SAML2. En aquesta modalitat es desplega en l'apache el mòdul de "service provider" de Shibboleth i aquest possibilita les redireccions d'autenticació de l'aplicació contra GICAR.

A banda d'això aquesta modalitat d'integració abstreu completament el desenvolupador de la complexitat d'entendre el detall de funcionament del protocol SAMLv2 donat que el mòdul transforma la resposta de SAMLv2 en les headers de GICAR estàndard.

Aquesta modalitat d'integració està indicada per aplicacions fetes a mida, o per aplicacions que siguin capaces de delegar l'autenticació a través de Headers (com les que s'integren directament amb SiteMinder), i està especialment recomanada per aplicacions que es despleguin al Cloud Públic, donat que, a diferència de la integració amb SiteMinder, aquesta modalitat d'integració permet que una aplicació que no tingui el frontal a dins de XCAT pugui fer login contra GICAR. 

## Sobre plataformes Cloud:

Per a poder possibilitar això es disposa d'una imatge de **contenidor Apache-GICAR-Shibboleth** que permet fer de forma senzilla aquesta integració. El desenvolupador per a poder utilitzar aquesta integració només ha d'indicar quina és la URL que se securitzarà amb aquesta modalitat d'integració, i a partir d'aquí es proporcionarà al desenvolupador tota la informació per a poder aixecar fàcilment el contenidor. Veure el següent [enllaç](https://canigo.ctti.gencat.cat/cloud/cataleg/) on es pot obtenir informació sobre com obtenir aquesta plantilla de contenidor.

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

NOTES A TENIR EN COMPTE:

- **NOM DE LA HEADER A CAPTURAR**. Aquest contenidor està basat en una imatge d'Apache 2.4. En apaches 2.4 per temes de seguretat s'impedeix crear requestHeaders que continguin "underscores" (_). Això impacta directament a aplicacions que busquin la capçalera "GICAR_ID" per autenticar, donat que fent servir aquesta modalitat d'autenticació no la trobaran. **En aquest cas caldrà que les aplicacions busquin la capçalera "GICAR-ID" enlloc de la capçalera "GICAR_ID".** La header GICAR se seguirà dient de la mateixa manera al no contenir underscores.

- **URL's de LOGOFF**. Les url's de logoff d'aquesta modalitat d'integració varien envers les URL's de logoff que es fan servir si es fa integració directa amb SiteMinder. En aquest cas, caldrà que les aplicacions cridin la següent URL de logoff per a destruir les sessions generades:

		A PREPRODUCCIÓ: https://<domini_aplicació>/Shibboleth.sso/Logout?return=https://preproduccio.idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc

		A PRODUCCIÓ: https://<domini_aplicació>/Shibboleth.sso/Logout?return=https://idp1-gicar.gencat.cat/siteminderagent/forms/logoff.fcc


## Sobre plataformes On Premise:

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
