+++
date        = "2018-08-06T17:11:42+01:00"
title       = "Descripció del protocol d’autenticació SAML2"
description = "Descripció del funcionament del protocol d'autenticació SAML2"
sections    = "gicar-saml2"
taxonomies  = []
toc			= true
weight 		= 1
+++

En cas que l’aplicació a integrar estigui preparada per a treballar amb mecanismes de delegació de l’autenticació a través de protocol SAML2, GICAR disposa de mecanismes per a possibilitar aquesta delegació de l’autenticació a través d’aquest protocol. El producte que utilitza GICAR per a proveir aquesta funcionalitat és el Shibboleth.

El Shibboleth de GICAR recull les capçaleres HTTP generades en una sessió de SiteMinder, i genera un ticket SAML2 amb la informació continguda en aquestes capçaleres, que pot rebre una aplicació.

En aquests casos és recomanable que l’equip tècnic de l’aplicació contacti amb l’Equip GICAR, per tal de fer un estudi de les possibilitats reals de que l’aplicació delegui l’autenticació a un identity provider extern. Un cop fet aquest estudi en cas que sigui viable es configurarà en l’aplicació aquesta delegació de l’autenticació contra el servei GICAR.

Es detalla a continuació com funciona una integració mitjançant protocol SAML. Cal comentar abans de descriure el funcionament a què fan referència els següents conceptes:

- El "ServiceProvider" és l’aplicació integrada que demana l’autenticació.
- El “User Agent” és el navegador de l’usuari.
- L’"Identity Provider" és el proveïdor d’identitats de GICAR.

1. Al protocol SAML2, el fluxe el comença l’aplicació integrada que demana l’autenticació (Service Provider). Aquesta, a través d’un HTTP Redirect, sol·licita al Identity Provider un tiquet SAML2.

D’aquesta manera, l’aplicació consumidora (service provider) de tiquets SAML2 farà un posts a les URL del Identity Provider per a obtenir un tiquet SAML2 vàlid de la següent manera, utilitzant el servei de Redirect/SSO.

	https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO?SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d&RelayState=dab8b17c-460d-455e-ac8d-6d8f763afe43

Les URLs de petició del Identity Provider: https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO

El paràmetre SAMLRequest, el qual conté les dades del servidor que demana el tiquet SAML2: 

	SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d 

A continuació es presenta una petició típica d’un tiquet SAML2, decodificada en Base64

1.	Un cop enviada la sol·licitud d’autenticació del service provider cap al Identity Provider, en funció dels paràmetres continguts en el SAMLRequest, salta el formulari de login de GICAR. L’usuari s’autentica amb usuari i contrasenya o certificat.

1.	Un cop l’usuari s’ha autenticat, el identity provider torna a redirigir a l’usuari cap a la URL del service provider retornant via POST al service provider dos paràmetres:

	- SAMLResponse: la qual conté la resposta a la petició d’autenticació feta amb anterioritat, codificada en base 64. Després d’haver estat decodificat un valor tipus d’aquesta resposta podria ser el següent:

			<?xml version="1.0" encoding="UTF-8"?><saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" Destination="https://adfs.ctti.gencat.cat/adfs/ls/" ID="_133a920d5ca854a8a7979f1c3162eb60" InResponseTo="id-5f5c7321-fe8a-4941-a5ec-4d48f027a7c8" IssueInstant="2014-10-07T06:13:51.250Z" Version="2.0"><saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://idp-gicar.gencat.cat/idp/shibboleth</saml2:Issuer><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/></saml2p:Status><saml2:EncryptedAssertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_cf60828ecfbe1f9a1630ecfd411180e5" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_57045e4cf2bdf58b89dc50bf71741783" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" xmlns:ds="http://www.w3.org/2000/09/xmldsig#"/></xenc:EncryptionMethod><ds:KeyInfo><ds:X509Data><ds:X509Certificate>.............DADES XIFRADES..................................... =</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:CipherValue>...................................DADES XIFRADES.............................................==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAssertion></saml2p:Response>

	- RelayState: El qual torna a prendre el mateix valor que amb anterioritat.

1.	L’aplicació captura el SAMLResponse, i decodifica el contingut d’aquest tiquet. Si el resultat del SAML Response significa que el Identity Provider dóna per bona l’autenticació, el Service Provider deixarà passar a l’usuari.

![Integració Aplicacions GICAR](/related/gicar/saml.png)

Pel cas de GICAR ens podem trobar amb diverses modalitarts d'autenticació que fan ús del protocol SAML. Són les següents:

1. Aplicació feta a mida que es faci a mida les crides SAML2.
1. A través de la modalitat de Canigó SAML2.
1. A través de ADFS.
1. Aplicacions que ja suporten SAML2 "out-of-the-box"

