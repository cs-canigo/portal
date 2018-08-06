+++
date        = "2018-08-03T17:11:42+01:00"
title       = "Modalitats d'integració possibles"
description = "Modalitats d'integració possibles d'autenticació amb GICAR"
section     = "gicar-integracio-intro"
taxonomies  = []
toc 		= true
weight 		= 1
+++

En aquest apartat es descriuen les diferents modalitats d'inetgració de l'autenticació amb GICAR que s'ofereixen. En la següent taula es citen les diferents casuístiques d'aplicacions que es despleguen a la Generalitat versus la modalitat d'integració de l'autenticació recomanada.

![Integració Aplicacions GICAR](/related/gicar/mod-autentic.png)

El 1 significa l'opció recomanada i el 3 l'opció menys recomanada, que només es proposa abordar-la si no és possible abordar les opcions anteriors.

A continuació s'exposen de forma resumida les modalitat d'integració proposades:


**(*1). Amb la modalitat d’integració per SiteMinder** es poden assolir les següents modalitats d’autenticació:

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.
- Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.
- Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.
- Autenticació contra el directori de l’EACAT.

Entenem per aquesta modalitat d’autenticació aquella en que en un frontal web que està a XCAT té un agent de SiteMinder instal·lat i utilitza aquest agent per a validar les autenticacions. Aquesta modalitat d’autenticació requereix que el fontal web de l’aplicació estigui a dins del nus XCAT.


**(*2). Amb la modalitat d’integració per agent de Shibboleth**:

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.
- Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.
- Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.

Entenem per aquesta modalitat d’autenticació aquella en que en un frontal web que pot estar a XCAT o fora de XCAT té un agent de Shibboleth instal·lat i utilitza aquest agent per a validar les autenticacions. Aquesta modalitat d’autenticació permet que el frontal web estigui dins o fora de XCAT i és el més apropiat per a aplicacions que estan al núvol.


**(*3). Amb la modalitat de SAML Out of the box** :

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.
- Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.
- Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.

Entenem per aquesta modalitat d’autenticació aquella en que l’aplicació nativament pot parlar protocol SAML2 contra GICAR. Aquesta modalitat d’autenticació permet que l’aplicació pugui fer login contra GICAR ja estigui l’aplicació dins del nus o no.


**(*4). Amb la modalitat de Canigó SAML2**:

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.
- Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.
- Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.

Entenem per aquesta modalitat d’autenticació aquella en que una aplicació construïda amb Canigó fa servir la llibreria de Canigó de SAML2 per a integrar-se directament amb GICAR sense necessitat d’altres dependències.


**(*5). Amb la modalitat de ADFS-GICAR**:

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.
- Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.
- Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.

Entenem per aquesta modalitat d’autenticació aquella en que l’aplicació (habitualment .NET o Microsoft) necessita utilitzar un ADFS per a poder establir la connectivitat contra GICAR.

**(*6). Amb la modalitat de AD, LDAP, o BBDD aprovisionada per GICAR**:

- Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.

Entenem per aquesta modalitat d’autenticació aquella en que l’aplicació delega l’autenticació a un directori actiu, LDAP o BBDD que GICAR aprovisiona. GICAR en aquesta BBDD pot sincronitzar l’usuari amb la seva contrasenya.

