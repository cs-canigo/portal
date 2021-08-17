+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Entorn de desenvolupament GICAR"
description = "Entorn Sandbox per a simular el funcionament de GICAR"
sections    = "GICAR"
taxonomies  = []
draft = false
weight 		= 8
+++


A continuació s'exposa com simular GICAR en entorns de desenvolupament, amb l'objectiu de que els proveïdors de desenvolupament tinguin una forma senzilla de simular GICAR i testejar-lo sense necessitat de disposar, per exemple, de connexió a la Xarxa de la Generalitat, ni de demanar configuracions a l'Oficina Tècnica de GICAR.

Es presenten dues estratègies per a fer-ho:

## Apache amb capçaleres estàtiques

Configurant el frontal web apache de cara a que generi de forma automàtica les capçaleres de GICAR. S’ha d’afegir a l’arxiu httpd.conf, el següent:

- Habilitar el mod_header en el apache.

- Generar les següents capçaleres a nivell d'apache utilitzant les següents directives:

	- RequestHeader set GICAR_ID “00000000T”
	- RequestHeader set GICAR “CODIINTERN=NRDRJN0001;NIF=00000000T;EMAIL=mail.admin@gencat.net;UNITAT_MAJOR=CTTI;UNITAT_MENOR=CTTI Qualitat”

Aquesta configuració fa que l’Apache afegeixi la capçalera GICAR i GICAR_ID, amb valor fix, dins de totes les peticions HTTP rebudes.
