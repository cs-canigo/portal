+++
date        = "2022-08-31T17:11:42+01:00"
title       = "Descripció del protocol d’autenticació OIDC"
description = "Descripció del funcionament del protocol d'autenticació OIDC"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= false
weight 		= 6
+++

El protocol OpenID Connect (d'ara en endavant OIDC) és una capa d'autenticació d'identitat senzilla construïda sobre el protocol OAuth 2.0, que permet als clients verificar la identitat d'un usuari final en base a l'autenticació realitzada per un servidor d'autorització o proveïdor d'identitat (IdP). OIDC permet que si l'autenticació s'ha fet correctament, obtenir un perfil bàsic de l'usuari. Aquesta informació sobre l'usuari final és proporcionada al client o a l'aplicació d'una manera interoperable via diferents tokens que en format JSON.

OIDC és un protocol d'autenticació cada cop més comú: quan una aplicació us demana que us autentiqueu mitjançant les vostres credencials de Facebook o Google+, probablement l'aplicació utilitzi per darrere el protocol OIDC.

OIDC permet a una sèrie de clients, inclosos clients basats en web, mòbils i JavaScript, sol·licitar i rebre informació sobre sessions i usuaris finals autenticats.

Els grans avantatges que aporta OIDC envers altres protocols són la simplicitat del model de dades resultant del mateix, i que és molt comú en l'ús per l'accés a APIS, i per la securització d'aplicacions mòbils i aplicacions basades en Javacript (SPA).


## Funcionament del protocol OIDC:

Es detalla a continuació com funciona una integració mitjançant protocol OIDC (es descriu a continuació el flux "Authentication Flow", que és el més bàsic a OIDC). 

1. Al pas 1 l'usuari intenta iniciar una sessió amb la seva aplicació client integrada amb OIDC i és redirigit al proveïdor d'autenticació OIDC, en aquest cas el Keycloak de GICAR, passant l'identificador de client (anomenat ClientID), que és únic per a aquesta aplicació.

1. El proveïdor d'autenticació (GICAR) autentica i autoritza l'usuari per a una instància d'aplicació (ClientID) concreta.

1. En el pas 3 GICAR retorna a l'usuari a una URL predefinida de l'aplicació, aportant com a paràmetre un codi d'ús únic.

1. En el pas 4, el client passa el codi que GICAR ha passat al punt 3 conjuntament amb el ClientID, i un ClientSecret associat al ClientID, a l'endpoint que proporciona l'AccessToken de GICAR. GICAR valida les dades aportades pel client i si són correctes, proporciona un AccessToken al client.

1. En el pas 5, el client pot utilitzar el AccessToken rebut en el punt anterior per a consumir APIS securitzades també amb GICAR, o inclús per a cridar el endpoint UserInfo i obtenir el IDToken amb les dades complertes de l'usuari que ha fet la petició.

![Integració Aplicacions GICAR](/related/gicar/oidc-flow.png)


## Modalitats tècniques d'integració possibles:

Pel cas de GICAR ens podem trobar amb diverses modalitats d'autenticació que fan ús del protocol SAML. Són les següents:

1. [OIDC - Integració amb OIDC per SPAs des de codi font](/gicar-novesintegracions-tecniques-autenticacio/auth-oidc-1-oidc_codifont/)
1. [OIDC - Integració d'una aplicació que admet OIDC out of the box](/gicar-novesintegracions-tecniques-autenticacio/auth-oidc-2-out-of-the-box/)

