+++
date        = "2018-08-08T17:11:42+01:00"
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

Aquest muntatge també és possible dur-lo a terme en entorns on premise. Per a dur-lo a terme es pot seguir el següent tutorial (basat en entorn RedHat7 amb un OHS instal·lat):

## Sobre plataformes On Premise:

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
