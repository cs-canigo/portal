+++
date        = "2022-08-31T12:45:42+01:00"
title       = "OIDC - Integració d'una aplicació que admet OIDC out of the box"
description = "Aplicació SAAS que s'integra amb GICAR via OIDC out of the box"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= false
weight 		= 8
+++

Si una aplicació admet la possibilitat de delegar l'autenticació a un proveïdor d'autenticació OIDC, llavors aquesta es pot integrar amb GICAR.

Per a fer-ho caldrà consultar el manual de l'aplicació, on s'indiqui quins paràmetres cal configurar per a fer la integració, i normalment la informació que l'aplicació requereix del proveïdor d'autenticació, en aquest cas GICAR, serà possiblement la següent informació que caldrà demanar-la a la OTGICAR:

	- ClientID de l'aplicació.
	- URL d'autenticació.
	- URL de consum dels tokens
	- URL UserInfo
	- scope

Caldrà per altra banda que el servidor de l'aplicació **tingui connectivitat contra la IP pública del domini del Keycloak de GICAR** donat que serà necessari de cara a que l'aplicació pugui revalidar el token contra GICAR un cop proporcionat
