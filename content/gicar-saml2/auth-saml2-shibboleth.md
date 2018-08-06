+++
date        = "2018-08-06T17:11:42+01:00"
title       = "Aplicació autenticant via SAML2 a través d'Apache-Shibboleth"
description = ""
sections    = "gicar-saml2"
taxonomies  = []
toc			= true
weight 		= 2
+++

Es disposa d'una modalitat d'integració on un frontal apache es pot integrar amb GICAR a través de Shibboleth-SAML2. En aquesta modalitat es desplega en l'apache el mòdul de "service provider" de Shibboleth i aquest possibilita les redireccions d'autenticació de l'aplicació contra GICAR.

A banda d'això aquesta modalitat d'integració abstreu completament el desenvolupador de la complexitat d'entendre el detall de funcionament del protocol SAMLv2 donat que el mòdul transforma la resposta de SAMLv2 en les headers de GICAR estàndard.

Aquesta modalitat d'integració està indicada per aplicacions fetes a mida, o per aplicacions que siguin capaces de delegar l'autenticació a través de Headers (com les que s'integren directament amb SiteMinder), i està especialment recomanada per aplicacions que es despleguin al Cloud Públic, donat que, a diferència de la integració amb SiteMinder, aquesta modalitat d'integració permet que una aplicació que no tingui el frontal a dins de XCAT pugui fer login contra GICAR. 

Per a poder possibilitar això es disposa d'una imatge de contenidor GICAR-Shibboleth que permet fer de forma senzilla aquesta integració. El desenvolupador per a poder utilitzar aquesta integració només ha d'indicar quina és la URL que se securitzarà amb aquesta modalitat d'integració, i a partir d'aquí es proporcionarà al desenvolupador tota la informació per a poder aixecar fàcilment el contenidor.

Per a més informació, demaneu a Suport de Cloud o a la Oficina tècnica de GICAR aquest contenidor.