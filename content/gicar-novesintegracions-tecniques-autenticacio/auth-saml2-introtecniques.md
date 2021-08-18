+++
date        = "2021-08-18T17:11:42+01:00"
title       = "Descripció del protocol d’autenticació SAML2"
description = "Descripció del funcionament del protocol d'autenticació SAML2"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= true
weight 		= 1
+++

En cas que una aplicació requereixi delegar l'autenticació a GICAR, en aquesta secció s'explica quins són els mecanismes tècnics possibles per a fer-ho, i com funciona el protocol SAML2.

## Funcionament del protocol SAML2:

Es detalla a continuació com funciona una integració mitjançant protocol SAML2. Cal comentar abans de descriure el funcionament a què fan referència els següents conceptes:

- El "ServiceProvider" és l’aplicació integrada que demana l’autenticació.
- El “User Agent” és el navegador de l’usuari.
- L’"Identity Provider" és el proveïdor d’identitats de GICAR.

1. Al protocol SAML2, el fluxe el comença l’aplicació integrada que demana l’autenticació (Service Provider). Aquesta, a través d’un HTTP Redirect, sol·licita al Identity Provider un tiquet SAML2.

D’aquesta manera, l’aplicació consumidora (service provider) de tiquets SAML2 farà un posts a les URL del Identity Provider per a obtenir un tiquet SAML2 vàlid de la següent manera, utilitzant el servei de Redirect/SSO.

	https://xxxxxxx.gencat.cat/idp/profile/SAML2/Redirect/SSO?SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d&RelayState=dab8b17c-460d-455e-ac8d-6d8f763afe43

Les URLs de petició del Identity Provider: https://xxxxxxxxxx.gencat.cat/idp/profile/SAML2/Redirect/SSO

on xxxxxx varia en funció d'un s'envia la petició per auetnticar.

El paràmetre SAMLRequest, el qual conté les dades del servidor que demana el tiquet SAML2: 

	SAMLRequest=7b0HYBxJliUmL23Ke39K9UrX4HShCIBgEyTYkEAQ7MGIzeaS7B1pRyMpqyqBymVWZV1mFkDM7Z28995777333nvvvfe6O51OJ%2fff%2fz9cZmQBbPbOStrJniGAqsgfP358Hz8iHjfZolw9Ol638%2bWr%2fBet86ZNz55%2b9lEx2957uPPpw%2f2HD7YPZvn%2b9v7O3mz74MHu%2bfbu%2fZ17ef7w%2fvnO7N5H6U%2fmdVNUy88%2b2hvvfJSeNc06P1s2bbZs6aOd3f3tnQfbuw%2fe7N57tL%2f36P7%2b%2bP7ew5%2f6KH1K%2fRTLrOU35227ah7dvbuq81VdzdbTaVGNi9lq%2b6KYZvX4Il9Os3ZM%2f79LH1Kr6rwo87uvj794vnf3VT4r6nza3n39%2bsuP0pNq2eToeV0vH1VZUzSPltkibx6100do%2f4iQfDSVRo%2fWy2aVT4vzIp99lL5blMvmERNj89vUfVtNq%2fKjo8c82Fpe3fxS1jR5jcF%2bdITByljH2ey8GU%2fbtvCHiA%2fvUuvLYpo3d9t63bSP70pPRzpZLwj%2b2dOXVVlMr9NnVb3INox4d7zLn9CEnnPTcNzHZVldndR51uaffUS95R%2bld48e3%2b1zxdH%2fAw%3d%3d 
	

A continuació es presenta una petició típica d’un tiquet SAML2, decodificada en Base64:

	<samlp:AuthnRequest ID="id-29069497-8de4-402d-871f-1503ee95f0d3" Version="2.0" IssueInstant="2014-07-17T13:42:54.529Z" Destination="https://preproduccio.idp-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO" Consent="urn:oasis:names:tc:SAML:2.0:consent:unspecified" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"><Issuer xmlns="urn:oasis:names:tc:SAML:2.0:assertion">http://pre.adfs.ctti.gencat.cat/adfs/services/trust</Issuer><samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" AllowCreate="true" /></samlp:AuthnRequest>

1.	Un cop enviada la sol·licitud d’autenticació del service provider cap al Identity Provider, en funció dels paràmetres continguts en el SAMLRequest, salta el formulari de login de GICAR. L’usuari s’autentica amb usuari i contrasenya o certificat.

1.	Un cop l’usuari s’ha autenticat, el identity provider torna a redirigir a l’usuari cap a la URL del service provider retornant via POST al service provider dos paràmetres:

	- SAMLResponse: la qual conté la resposta a la petició d’autenticació feta amb anterioritat, codificada en base 64. Després d’haver estat decodificat un valor tipus d’aquesta resposta podria ser el següent:

			<?xml version="1.0" encoding="UTF-8"?><saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" Destination="https://adfs.ctti.gencat.cat/adfs/ls/" ID="_133a920d5ca854a8a7979f1c3162eb60" InResponseTo="id-5f5c7321-fe8a-4941-a5ec-4d48f027a7c8" IssueInstant="2014-10-07T06:13:51.250Z" Version="2.0"><saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://idp-gicar.gencat.cat/idp/shibboleth</saml2:Issuer><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/></saml2p:Status><saml2:EncryptedAssertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_cf60828ecfbe1f9a1630ecfd411180e5" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_57045e4cf2bdf58b89dc50bf71741783" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" xmlns:ds="http://www.w3.org/2000/09/xmldsig#"/></xenc:EncryptionMethod><ds:KeyInfo><ds:X509Data><ds:X509Certificate>.............DADES XIFRADES..................................... =</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:CipherValue>...................................DADES XIFRADES.............................................==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAssertion></saml2p:Response>

	- RelayState: El qual torna a prendre el mateix valor que amb anterioritat.

1.	L’aplicació captura el SAMLResponse, i decodifica el contingut d’aquest tiquet. Si el resultat del SAML Response significa que el Identity Provider dóna per bona l’autenticació, el Service Provider deixarà passar a l’usuari.

![Integració Aplicacions GICAR](/related/gicar/saml.png)

A continuació es facilita un exemple de SAMLResponse generat per GICAR, codificat en base64, i retornat via POST a l'aplicació:

	<?xml version="1.0" encoding="UTF-8"?><saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" Destination="https://preproduccio.gram.gencat.cat/api/backoffice/v1/authenticate" ID="_c598ef62b4c5cb25f1ca07ae4d4439e5" InResponseTo="b1500279647918a" IssueInstant="2017-07-17T08:22:39.386Z" Version="2.0"><saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://preproduccio.idp1-gicar.gencat.cat/idp/shibboleth</saml2:Issuer><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/></saml2p:Status><saml2:EncryptedAssertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><xenc:EncryptedData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" Id="_5893e5b42d7e58e3df4a4299c531d40f" Type="http://www.w3.org/2001/04/xmlenc#Element"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"/><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><xenc:EncryptedKey Id="_3508ee822d00bc83ca4604042d993d21" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" xmlns:ds="http://www.w3.org/2000/09/xmldsig#"/></xenc:EncryptionMethod><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIIDYjCCAkqgAwIBAgIBajANBgkqhkiG9w0BAQUFADBpMSEwHwYDVQQKExhHZW5lcmFsaXRhdCBk ZSBDYXRhbHVueWExDTALBgNVBAsTBENUVEkxETAPBgNVBAMTCEdJQ0FSLUNBMSIwIAYJKoZIhvcN AQkBFhNnZGkuY3R0aUBnZW5jYXQuY2F0MB4XDTE3MDcwNzE0MTkwMFoXDTQ3MDcwNzE0MTkwMFow DzENMAsGA1UEAxMER1JBTTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKQeB0mI24Oj YBRDQCepk3bcN+M7QBt89Kq+4nWBYE4bI6DT/Rm7NoS4lV/0a3OmYvZBbjo4kwShzj3zHowK3hNR wHEsmLNMPb8MlYroeHCVOH50LZNsvCjDsineb4C+zWeVlUOW/XK7UeYfqOb9KwhLOSnXu45chW9U F4ydHACbxG2l5Uycx6Ibi9TAigNA64iZhxzTqbqx5HPjm3qlkJNdJgvNQMf1op5X60SB/adXy6yH vqYAPuuF1kbxbo4WhfPoVcGPXO4CIDomwElFHMO0lRr7zO2oS8pC800a1QBe4W/yPuqGDNq5It1l /zznNPin/XO7At5mZo9A9fRCeTsCAwEAAaNvMG0wDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUe4tj 5wwgHs2ebQx0MTFpBwIFZLQwCwYDVR0PBAQDAgXgMBEGCWCGSAGG+EIBAQQEAwIGQDAeBglghkgB hvhCAQ0EERYPeGNhIGNlcnRpZmljYXRlMA0GCSqGSIb3DQEBBQUAA4IBAQBihTW80FDlL/FfHzhI mrz4dhPc2hZkteKwKrCyFQb1+fCOcLW9fWvRiJrnIeNpkhweyaX3B2GBQmo/vL/VON9cMGWG66rg UkIsma/rnszefwCdkUC3lKAVhkWOcAAm9DTf71IwbLmBPRb2dGrbSuMFQebs+y9KM9pGe5S0kZ4X bzPWvEBBN3qFNo/zVvppYfdKHzh1+pwcc3LY4zjnBleKfqlx2W1xjjm/R+y9j6iVHZrIocMmxXmd I4mbuXhfZmWi0AmSNGmFcF00RPKdrlS+YuLOoM2pqXn6K15vtD6U4SFbC3gT4TtgvD4CZ0ejkXmT 0gumMTYpP5JjJH2GfyM3</ds:X509Certificate></ds:X509Data></ds:KeyInfo><xenc:CipherData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:CipherValue>OWqVh4Qcn4lXpmkSBGxbSeDXM7gqv4P0Cj1VsaxA/q74yP7M8naICurbglQx1W/SCTkyhQ5jW0BIRvdhAm6ofh0rhSYOkUMiJqpRJkzAvdq37B0l3fdCZSSng5+n4lCLtPbg/uCp19gFWRM6pv+lkCBJaIjQlA2xqaozaVpvt/xeAI8KYM5MZg6PkObO34PXsKslJSYIxu3JzZ4clPnq8FE4AmH8rTbzKUPpOAYRmf93LkrNuDpcZXg8wlYjaOZoXH03isdtfENPhEGCec1yasrRjFlLdd0u3ry5ElRWdCf6eHeIEZBSB6pHv1dKXXZM11CIS2u8PkvvfPGBg5Q6lg==</xenc:CipherValue></xenc:CipherData></xenc:EncryptedKey></ds:KeyInfo><xenc:CipherData xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"><xenc:CipherValue>**xxxxxxxxxxxxxxxxx-DADES DE L'USUARI XIFRADES-xxxxxxxxxxxxxxxxxxxxxx**</xenc:CipherValue></xenc:CipherData></xenc:EncryptedData></saml2:EncryptedAssertion></saml2p:Response>
	
Decodificant el SAMLResponse es podran obtenir els següents atributs del XML de resposta SAML:

- Atribut: urn:oid:0.9.2342.19200300.100.1.1; Valor: Codi intern de l'usuari
- Atribut: urn:oid:1.3.6.1.4.1.5923.1.1.1.6; Valor: NIF de l'usuari

(més detall en les següents seccions).

## Modalitats tècniques d'integració possibles:

Pel cas de GICAR ens podem trobar amb diverses modalitats d'autenticació que fan ús del protocol SAML. Són les següents:

1. [Integració a través d'Agent de Shibboleth](/gicar-novesintegracions-tecniques-autenticacio/auth-saml2-1-agent_shibboleth//)
1. [Integració d'una aplicació que admet SAML out of the box ](/gicar-novesintegracions-tecniques-autenticacio/auth-saml2-2-out-of-the-box/)
1. [Aplicació feta a mida autenticant via SAML2 sense utilitzar Agent de Shibboleth (Canigó SAML o llibreria de tercers) ](/gicar-novesintegracions-tecniques-autenticacio/auth-saml2-3-fet-a-mida/)
1. [Aplicació Microsoft integrada amb GICAR via ADFS ](/gicar-novesintegracions-tecniques-autenticacio/auth-saml2-4-adfs/)

