+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Servei d’autenticació mixt"
description = "Descripció del servei per a usuaris de la Generalitat i per usuaris de l’Administració local (EACAT)"
section     = "GICAR"
taxonomies  = []
weight 		= 5
+++

A través d’aquest mecanisme, les aplicacions de la Generalitat que així ho necessitin, podran delegar la seva autenticació, alhora i de forma federada, contra el directori de usuaris de la Generalitat, i el directori d’usuaris de l’EACAT (Administració Local – Ajuntaments i Consells Comarcals), amb usuari i contrasenya. 

Aquesta modalitat d’integració permetrà que les aplicacions que s’integrin amb GICAR i que així ho requereixin, amb una sola integració, puguin delegar l’autenticació contra el col·lectiu d’identitats de GENCAT o, en cas que la identitat no es trobi a GENCAT, contra l’EACAT.

L’atribut que s’utilitza per a establir el login contra els dos directoris és el NIF (ja és l’atribut que ara mateix s’utilitza per a fer login actualment per les aplicacions integrades amb GICAR i és l’atribut que l’AOC ens ha posat a disposició de l’EACAT per a fer aquesta integració).

Cal destacar que quan l’usuari s’hagi identificat ok contra el Directori de l’EACAT, GICAR només podrà retornar a les aplicacions integrades, com a atribut de resposta, el DNI de l’usuari autenticat (només assegurem que l’usuari és qui diu ser). 

El que fa GICAR en aquest nou muntatge és:

- Primer autenticar l’usuari si ve amb certificat (capçaleres estàndard de GICAR): GICAR_ID --> NIF
- En cas que s’hagi autenticat amb usuari i contrasenya, l’anem a buscar primer a DC: GICAR_ID --> NIF
- En cas que no estigui a DC l’anem a buscar a l’EACAT: GICAR_ID, EACAT_ID --> NIF (L’usuari només s’autenticarà al directori del EACAT, si i només si, no està al directori de la Generalitat)

Es pot veure aquest funcionament en la següent figura:

![Integració Aplicacions GICAR](/related/gicar/diagrama-autenticacio-eacat.png)

Apuntar que hi ha una capçalera que indica a quin directori s’ha autenticat l’usuari, que és la capçalera HTTP_SM_AUTHDIRNAME. Contindrà els valors “DC” o “EACAT” en funció d’on s’hagi autenticat l’usuari.

En resum, les capçaleres HTTP que es lliuraran a l’aplicació final integrada, en funció de com s’hagi autenticat l’usuari seran:

1. Accés amb certificat:

	- GICAR_ID --> 00000000T

 	- HTTP_GICAR_PSIS --> que contindrà la resposta de PSIS completa, i estarà enzipada i codificada en base64. Un cop descodificada i desenzipada s’obtindran les dades en la forma que s’especifica en l’annex D.

    - SM_AUTHDIRNAME  Contindrà la cadena “Policy Store”

1. Accés amb usuari del Directori Corporatiu GENCAT

	- GICAR_ID --> 00000000T

 	- GICAR --> CODIINTERN=NFCTPR0001;NIF=00000000T;EMAIL=;UNITAT_MAJOR=CTTI (Cent.Telec.i Tecnol.Inf);UNITAT_MENOR=CTTI (Cent.Telec.i Tecnol.Inf)

	- SM_AUTHDIRNAME --> Contindrà la cadena “DC”

1. Accés amb usuari EACAT (Directori EACAT)

	- EACAT_ID --> 00000000T

	- GICAR_ID --> 00000000T

	- SM_AUTHDIRNAME --> Contindrà la cadena “EACAT”

