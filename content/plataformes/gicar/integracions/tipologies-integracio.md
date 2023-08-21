+++
date        = "2022-08-31"
title       = "1.- Índex de modalitats d'integració i funcionalitats possibles"
description = "Índex de Modalitats d'integració possibles d'autenticació amb GICAR"
section     = "gicar-novesintegracions"
taxonomies  = []
toc 		= false
weight 		= 1
+++

## Modalitats d'integració possibles:

En aquest apartat es descriuen les diferents modalitats d'integració de l'autenticació amb GICAR que s'ofereixen. En la següent taula es citen les diferents casuístiques d'aplicacions que es despleguen a la Generalitat versus la modalitat d'integració de l'autenticació recomanada.

![Integració Aplicacions GICAR](/related/gicar/mod-autentic-2022.png)

El 1 significa l'opció recomanada i el 3 l'opció menys recomanada, que només es proposa abordar-la si no és possible abordar les opcions anteriors.

## Escollir entre SAML i OIDC:

Escollir entre OIDC i SAML no és només una qüestió d'utilitzar un protocol més nou (OIDC), en comptes del protocol més antic o madur (SAML), sinó que té a veure amb la tecnologia de l’aplicació que es vol securitzar.

OIDC és el més adequat per a aplicacions HTML5/JavaScript, per aplicacions mòbils, o per aplicacions basades en microserveis, perquè és més fàcil d'implementar al costat del client que SAML. Bàsicament, donat que els tokens d’identitat proporcionats per OIDC estan en format JSON, JavaScript té més facilitat per consumir-los. A banda, si l’aplicació està basada en microserveis, o està composada per diferents crides a APIS, el protocol OIDC proporciona mecanismes per a passar els tokens de sessió a les diferents APIs.

SAML en canvi segueix sent un protocol molt robust per a securitzar aplicacions web tradicionals.
El diagrama de decisió per a un desenvolupador envers si escollir un protocol o un altre hauria de ser aquest:

![Integració Aplicacions GICAR](/related/gicar/mod-autentic-decisio.png)

## Modalitats d'integració versus funcionalitats:

A continuació s'exposen de forma resumida les ***modalitats d'integració proposades***, i ***quines funcionalitats es poden aconseguir*** amb aquestes modalitats:

**(*1) Amb la modalitat d’integració per Protocol SAML2**: 

Amb aquesta modalitat d'integració es poden assolir les següents funcionalitats d’autenticació:

-	[Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-1-dc/)
-	[Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-1-dc/)
-	[Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-2-certificat/)
-	[Autenticació amb la Passarel·la GICAR- Vàlid.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-4-passarelagicarvalid/)
-	[Autenticació contra el directori de l’EACAT.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-3-EACAT/)

Entenem per aquesta modalitat d’integració aquella aplicació que delega el login a GICAR via protocol SAML2. Això inclou les següents possibilitats tècniques d'implementació:

-	**[Integració a través d'Agent de Shibboleth](/plataformes/gicar/integracions/tecniques-autenticacio/auth-saml2-1-agent_shibboleth/)**: es disposa d’un frontal Apache o Nginx, a un CPD OnPremise o al Núvol on s’instal·la un agent de Shibboleth. Aquest agent de Shibboleth fa la gestió de tot el protocol SAML2 amb GICAR, i com a resultat proporciona unes capçaleres HTTP d’autenticació a l’aplicació.
-	**[Integració d'una aplicació que admet SAML out of the box ](/plataformes/gicar/integracions/tecniques-autenticacio/auth-saml2-2-out-of-the-box/)**: l’aplicació és capaç de forma nativa de delegar el login a un proveïdor d’autenticació SAML2, sense necessitat d’instal·lar res a banda.
-	**[Aplicació feta a mida autenticant via SAML2 sense utilitzar Agent de Shibboleth (Canigó SAML o llibreria de tercers) ](/plataformes/gicar/integracions/tecniques-autenticacio/auth-saml2-3-fet-a-mida/)**: una aplicació desenvolupada amb Framework Canigó pot delegar el login a GICAR de forma nativa via SAML2. A una aplicació feta a mida se li pot desplegar una llibreria que implementa SAML2 des del punt de vista d’un SP, i per tant permet delegar-li el login a GICAR de forma directa.
-	**[Aplicació Microsoft integrada amb GICAR via ADFS ](/plataformes/gicar/integracions/tecniques-autenticacio/auth-saml2-4-adfs/)**: aplicacions Microsoft que estan preparades per a ser integrades via ADFS, poden parlar amb GICAR a través del ADFS.

**(*2) Amb la modalitat d’integració per Protocol OIDC** 

Es poden assolir les següents modalitats d’autenticació:

-	[Autenticació amb Usuari i contrasenya contra el Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-1-dc/)
-	[Autenticació amb Certificat amb usuari que estigui al Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-1-dc/)
-	[Autenticació amb Certificat amb usuari que no està al Directori Corporatiu.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-2-certificat/)
-	[Autenticació contra el directori de l’EACAT.](/plataformes/gicar/integracions/funcionalitats-autenticacio/auth-3-EACAT/)

Entenem per aquesta modalitat d’integració aquella aplicació que delega el login a GICAR via protocol OIDC i OAUTH. Això inclou les següents possibilitats tècniques d'implementació:

-	**[OIDC - Integració amb OIDC per SPAs des de codi font](/plataformes/gicar/integracions/tecniques-autenticacio/auth-oidc-1-oidc_codifont/)**: es tracta d’una aplicació, típicament una SPA la qual fa crides a diverses API, la qual crida el Keycloak de GICAR via OIDC per obtenir el token d’autenticació.
-	**[OIDC - Integració d'una aplicació que admet OIDC out of the box](/plataformes/gicar/integracions/tecniques-autenticacio/auth-oidc-2-out-of-the-box/)**: l’aplicació és capaç de forma nativa de delegar el login a un proveïdor d’autenticació OIDC, sense necessitat d’instal·lar res a banda.


**(*3). Amb la modalitat de AD, LDAP, o BBDD aprovisionada per GICAR**:

Amb aquesta modalitat d'integració es poden assolir les següents funcionalitats d’autenticació:

- Autenticació amb Usuari i contrasenya de GICAR, contra el LDAP o la BBDD de la pròpia aplicació, o contra el directori de lloc de treball.

Entenem per aquesta modalitat d’autenticació aquella en que l’aplicació delega l’autenticació a un directori actiu, LDAP o BBDD que GICAR aprovisiona. GICAR en aquesta BBDD pot sincronitzar l’usuari amb la seva contrasenya.
