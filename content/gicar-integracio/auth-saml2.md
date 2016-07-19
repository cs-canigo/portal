+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Servei d’autenticació amb SAML2"
description = ""
section     = "GICAR"
taxonomies  = []
toc			= true
weight 		= 6
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

A continuació es detallen els casos d’ús més comuns:

## Consumidor de SAML2 fet a mida

Com es deia en la introducció, GICAR disposa d’un “Identity Provider”, construït amb la tecnologia Shibboleth, amb capacitat de facilitar tiquets SAML2 a les aplicacions. 

A continuació es detalla quins són els dominis del Identity Provider als que caldrà accedir per a generar el tiquet de SAML2.

- Dominis dels Identity Provider de GICAR

		PRE: 
		https://preproduccio.idp1-gicar.gencat.cat/
		https://preproduccio.idp4-gicar.gencat.cat/

		PRO: 
		https://idp1-gicar.gencat.cat/
		https://idp4-gicar.gencat.cat/


- Construcció del SAML Request:

En cas que l’aplicació que vulgui cridar via SAML2 a GICAR ha de construir un SAMLRequest que ha de contenir exactament la següent informació, estructurada de la següent forma:

	<?xml version="1.0"?> <samlp:AuthnRequest xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" Consent="urn:oasis:names:tc:SAML:2.0:consent:unspecified" Version="2.0" Destination="https://DOMINI _A_ESPECIFICAR_PER_L’EQUIP_GICAR/idp/profile/SAML2/Redirect/SSO" ID="xxxxxxxxxxxxxxxxxxxxx" IssueInstant="2014-12-24T10:35:25.4269359Z" IsPassive="false" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"> <saml:Issuer>https://URL del servei peticionari</saml:Issuer> <samlp:NameIDPolicy AllowCreate="True" Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" /> </samlp:AuthnRequest>

En cas que l’aplicació no pugui generar un SAMLRequest amb aquesta parametrització, no podrà integrar-se directament contra GICAR via SAML2, i haurà d’analitzar una altra via d’integració.


- Petició a l’equip GICAR per a incorporar aquesta aplicació com a consumidora del Identity Provider.

	Caldrà que l’equip desenvolupador de l’aplicació com a mínim faciliti la següent informació a l’equip GICAR per a que GICAR pugui autenticar a aquest servei:

	- entityID = Haurà de contenir el valor del SAML:Issuer indicat en el SAMLRequest de les peticions que farà l’aplicació. Serà normalment la URL del servei peticionari.

	- Certificat = Certificat X509 que farà servir l’aplicació consumidora per a desencriptar els tiquets SAML que haurà emès GICAR.

	- AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" = S’haurà d’indicar a quina URL de l’aplicació GICAR haurà de redirigir un cop feta l’autenticació. Serà la URL on es farà la corresponent redirecció, i on es passarà per paràmetre l’atribut SAMLResponse amb el contingut de les respostes que haurà de decodificar i desencriptar l’aplicació.

Caldrà addicionalment que el desenvolupador especifiqui quina informació voldrà rebre referent a l’usauri que s’haurà autenticat.


## Aplicació Sharepoint de Microsoft

És possible tècnicament la integració d’una aplicació Sharepoint 2010 i superior amb GICAR. Per a fer aquesta integració és necessari disposar d’un servidor Windows Server que faci les funcions de Active Directory Federation Services (ADFS).

L’ADFS és el component de Microsoft que permet la federació dels seus productes amb Identity Providers tercers.

En el cas de Sharepoint s’ha provat amb èxit la integració entre GICAR – Shibboleth – ADFS – Sharepoint. 

En aquest muntatge es configura l’ADFS com a Service Provider del Identity Provider de GICAR. D’aquesta manera, el ADFS és com si fos una aplicació integrada amb GICAR, la qual a la seva hora pot donar accés a múltiples SharePoint i aplicacions del món Microsoft.

* De cara al Sharepoint:
	* El ADFS és el seu identity provider.

* De cara al ADFS:
* 	El Sharepoint és un dels seus service provider o relying party.
	* GICAR és el seu identity provider.

El funcionament en aquests casos seria el següent:

1.	El Sharepoint que es vol integrar amb GICAR sol·licita un token d’autenticació al ADFS. Per a fer això el Sharepoint provoca un redirect cap al ADFS indicant quin realm d’ADFS farà servir.

1.	El ADFS avalua quins identity providers té disponibles. Troba GICAR com a identity provider disponible i li demana l’autenticació a través de protocol SAML i a través de l’operativa exposada en l’inici del punt 3.7

1.	GICAR autentica l’usuari, i redirecciona de nou al ADFS amb el tiquet SAML de resposta.

1.	L’ADFS recull els paràmetres del tiquet SAML i crea els claims de l’entorn Microsoft.

1.	L’ADFS passa al Sharepoint els claims que sol·licita.

Per a més detall tècnic per a veure com integrar el Sharepoint-ADFS-GICAR consultar el document “Integració GICAR amb Sharepoint”.

## Aplicació .NET 4.x

Nativament les aplicacions .NET 4.x suporten delegar l’autenticació a un ADFS, per tant el mecanisme per a integrar una aplicació .NET amb GICAR pot ser de forma nativa via ADFS. Bàsicament el que aquí es farà serà incloure l’aplicació .NET com a nou Relying Party dins del ADFS que té com a únic Identity Provider “GICAR”.

El procediment doncs es basarà en l’exposat en l’apartat “Configurar Sharepoint com a Relying Party” i “Configurar Claim Rules per a Sharepoint” del document “Integració GICAR amb Sharepoint".