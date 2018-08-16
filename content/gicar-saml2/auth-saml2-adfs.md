+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Aplicació Microsoft/.NET integrada amb GICAR via ADFS"
description = ""
sections    = "gicar-saml2"
taxonomies  = []
toc			= true
weight 		= 4
+++

Aquesta documentació defineix les especificacions tècniques per a la integració de la federació d’identitats de GICAR implantat sobre el producte Shibboleth per accedir a aplicacions desenvolupades en tecnologies Microsoft mitjançant ADFS (Active Directory Federation Services) de Microsoft.

En aquest tutorial s'explica exactament com integrar un Sharepoint amb aquesta tipologia d'integració.

A continuació es presenta la vista global del sistema:

![Integració amb GICAR](/related/gicar/saml-ShibAdfsShp.png)

La seqüència es la següent:

1. El client amb el seu navegador intenta accedir a una aplicació web desplegada sobre Sharepoint.

2. Sharepoint detecta que el recurs està protegit i redirigeix l’usuari cap a AD FS.

3. El servei AD FS presenta a l’usuari la pàgina WAYF (Where Are you From) per a que l’usuari indiqui on es vol autenticar (actualment aquesta pàgina no es presenta ja que només es pot autenticar amb GICAR).

4. El navegador del client es redirigeix cap a l’Identity Provider de GICAR (Shibboleth) e inicia una transacció d’autenticació sota el protocol SAML 2.0.

5. Se li presenta al client el formulari de captura de credencials de GICAR.

6. Es validen les credencials.

7. L’Identity Provider genera un token en format SAML 2.0 amb la informació de l’usuari autentica i redirigeix l’usuari cap a l’ADFS.

8. L’ADFS verifica el token rebut i modifica la informació per adaptar-la a la que necessita Sharepoint i finalment deixa passar l’usuari cap a Sharepoint amb aquesta informació. Sharepoint presentarà l’aplicació web sol·licitada en el punt 1.

## Configuració de l'ADFS per autenticar contra GICAR:

**Importar el certificat a la màquina de l'ADFS**

A la màquina on es trobat instal·lat el servei ADFS realitzar els següents passos:

1. Demanar a la OTGICAR el certificat del Idnetity Provider de GICAR i copiar-lo a la màquina de l'ADFS.
2. A la màquina del ADFS, en la finestra Certificate, a la pestanya General, clicar a  Install Certificate per iniciar el Certificate Import Wizard.
3.	Clicar sobre el botó  Next.
4.	A la finestra Certificate Store, clicar sobre la opció Place all certificates in the following store.
5.	Clicar sobre el botó Browse, i llavors clicar sobre el botó Show physical stores.
6.	Sobre la carpeta Trusted Root Certificate Authorities, seleccionar Local Computer, i llavors clicar sobre el botó OK.
7.	Clicar sobre el botó Next, Finish, OK i finalment sobre el botó OK.

**Afegir Identity Provider (Shibboleth) com un Claim Provider**

Fent servir PowerShell s’afegeix l’Identity Provider a ADFS, obrint  una consola de comandes i executant les següents comandes Powershell:

	Add-PSSnapIn Microsoft.Adfs.PowerShell

	Add-ADFSClaimsProviderTrust -Name "Shibboleth IdP" –MetadataFile https://idp-gicar.gencat.cat/idp/profile/Metadata/SAML

	Set-ADFSClaimsProviderTrust –TargetName "Shibboleth IdP" –SignatureAlgorithm http://www.w3.org/2000/09/xmldsig#rsa-sha1


En cas que l’ADFS no tingui sortida a Internet, l’arxiu metadata del Shibboleth es pot copiar en una ruta local dins del servidor on està hostatjat l’ADFS. En aquest cas, en la primera sentència anterior s’ha de canviar el path del “MetadataFile” per la ruta local del servidor. 

Per altra banda, i també fent servir PowerShell, s’han d’executar les següents comandes per tal de que l’ADFS no comprovi la validesa dels certificats contra CatCert (ja que, si no hi ha sortida cap Internet, el sistema no funcionarà). 

	Add-PSSnapIn Microsoft.Adfs.PowerShell

	Set-AdfsClaimsProviderTrust –TargetName “Shibboleth IdP” –SigningCertificateRevocationCheck “None”
	Set-AdfsClaimsProviderTrust –TargetName “Shibboleth IdP” –EncryptionCertificateRevocationCheck “None”

	Set-AdfsRelyingPartyTrust –TargetName “Sharepoint” –SigningCertificateRevocationCheck “None”


**Afegir Claim rules per a Identity Provider**

Les Claim Rules defineixen com els atributs rebuts en el token SAML 2.0 generat per l’Identity Provider es transformen en atributs de ADFS.

Cal seguir els següents passos:
1.	Obrir la consola de gestió de ADFS. En el menú Start, clicar sobre Administrative tools, i llavors clicar sobre AD FS 2.0 Management.
2.	Després que el snap-in es carrega, clicar al node Trust Relationships, i llavors seleccionar Claims Provider Trusts.
3.	En el panell central de AD FS 2.0 Management, fer click amb el botò dret Shibboleth IdP, i llavors fer click sobre Edit Claim Rules.
4.	A la pestanya Acceptance Transform Rules, clicar sobre el botó Add Rule.
5.	A la plana Select Rule Template, seleccionar Send Claims Using a Custom Rule, i llavors pitjar sobre el botó Next.
6.	A la plana Configure Rule, dintre de la capsa Claim rule name, escriure “Transform mail to E-Mail Address”.
7.	A la finestra Custom Rule, escriure o copiar/enganxar el següent text:

	c:[Type == "urn:oid:0.9.2342.19200300.100.1.3"]
	 => issue(Type = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress", Issuer = c.Issuer, OriginalIssuer = c.OriginalIssuer, Value = c.Value, ValueType = c.ValueType);

8.	Fer click sobre el botó Finish.
9.	A la pestanya Acceptance Transform Rules, fer click sobre el botó Add Rule.
10.	A la plana Select Rule Template, seleccionar Send Claims Using a Custom Rule, i llavors fer click sobre el botó Next.
11.	A la plana Configure Rule, en la capta Claim rule name, escriure “Transform NIF to Name”.
12.	A la finestra Custom Rule, escriure o copiar/enganxar el següent text:

	c:[Type == "urn:oid:1.3.6.1.4.1.5923.1.1.1.6"]
	=> issue(Type = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", Issuer = c.Issuer, OriginalIssuer = c.OriginalIssuer, Value = c.Value, ValueType = c.ValueType);

13.	Fer click sobre Finish, i finalment sobre OK.


**Configurar Sharepoint com a Relying Party**

Dintre de ADFS cal configurar Sharepoint com un “relying party” dels atributs proporcionats per ADFS.

1.	Obrir la consola de gestió de. En el menú Start, fer click a Administrative Tools, i llavors fer click sobre AD FS 2.0 Management.
2.	Després que l’snap-in s’ha carregat, fer click sobre el node Trust Relationships, i llavors seleccionar Relying Party Trusts.

![Integració amb GICAR](/related/gicar/gicar-adfs1.png)
 
3.	Fer click amb el botó dret sobre Relying Party Trusts i llavors fer click sobre Add Relying Party Trust per iniciar el “Relying Party trust wizard”. 

![Integració amb GICAR](/related/gicar/gicar-adfs2.png)
 
4.	Fer click sobre el botó Start per iniciar el procés d’afegir una aplicació web Sharepoint 2010 com a Relying Party.

![Integració amb GICAR](/related/gicar/gicar-adfs3.png)
 
5.	A la plana Select Data Source, seleccionar Enter data about the Relying party manually, i fer click sobre el botó Next.

![Integració amb GICAR](/related/gicar/gicar-adfs4.png)
 
6.	A la plana Specify Display Name, introduir el nom per mostrar, per exemple “SharePoint” i opcionalment una descripció, llavors fer click sobre Next.

![Integració amb GICAR](/related/gicar/gicar-adfs5.png)
 
7.	A la plana Choose Profile seleccionar AD FS 2.0 profile i fer click sobre Next.

![Integració amb GICAR](/related/gicar/gicar-adfs6.png)
 
8.	A la plana Configure Certificate, es pot seleccionar un certificat per xifrar el token intercanviat entre ADFS i Sharepoint però no es necessari ja que la connexió amb Sharepoint ja es fa sobre SSL.  Fer click sobre Next.

![Integració amb GICAR](/related/gicar/gicar-adfs7.png)
 
9.	Marcar el checkbox  Enable support for the WS-Fed Passive protocol.  Per la URL del protocol, introduir la URL del site root per a la aplicació web Sharepoint amb la terminació “_trust/”. Fer click  a Next.

![Integració amb GICAR](/related/gicar/gicar-adfs8.png)
 
10.	A la plana Configure Identifiers, s’indica un “realm” que l’aplicació web passarà a ADFS 2.0 quan un usuari accedeix a l’aplicació.  
El  “realm” normalement es crea en el format urn:foo:bar.  Cal tenir en compte aquest nom ja que es necessitarà en configurar Sharepoint Fer click sobre Next.

![Integració amb GICAR](/related/gicar/gicar-adfs9.png)
 
11.	A la plana Choose Issuance Authorization Rules no cal fer res, fer click a Next. 

![Integració amb GICAR](/related/gicar/gicar-adfs10.png)
 
12.	A la plana Ready to Add Trust, revisar la configuració i fer click a Next per continuar.

![Integració amb GICAR](/related/gicar/gicar-adfs11.png)
 
13.	Deixar marcat el checkbox Open the Edit Claim Rules dialog for this relying party trust when the wizard closes per continuar en el següent punt.

**Configurar Claim Rules per a Sharepoint**

Com a continuació del pas anterior (o fent click amb el botó dret sobre el “Relying Party” amb nom “Sharepoint” i seleccionat “Edit Claim Rules”), es poden configurar les regles que transformen els atributs de ADFS en els atributs que necessita Sharepoint.
 
1.	Primer accedim a la pantalla d’edició de regles.

![Integració amb GICAR](/related/gicar/gicar-adfs12.png)
 
2.	A la pestanya Issuance Transform Rules, fer click al botó Add Rule. 

![Integració amb GICAR](/related/gicar/gicar-adfs13.png)
 
3.	A la plana Select Rule Template, seleccionar Pass Through or Filter an Incoming Claim, i llavors fer click a Next.

![Integració amb GICAR](/related/gicar/gicar-adfs14.png)
 
4.	A la plana Configuration Rule, introduir els següents valors:

	Name					Value
	Claim rule name			“E-Mail Address Claim from Shibboleth”
	Incoming claim type		E-Mail Address

5.	Deixar seleccionada la opció Pass through all claim values i fer click a Finish.

6.	Repetir el mateix procés a Issuance Transform Rules amb els següents valors: 

	Name					Value
	Claim rule name			“NIF Claim from Shibboleth”
	Incoming claim type		Name


## CONFIGURACIÓ SHAREPOINT

**Creació de Trusted Identity Provider corresponent a ADFS**

El passos que es descriuen a continuació assignen ADFS com un proveïdor d’identitats de confiança per a Sharepoint, cal obrir la consola de gestió PowerShell per  SharePoint 2010 com a usuari administrador i realitzar les següents accions:

1.	Obtenir el certificat de firma de ADFS, a la màquina on està ADFS accedir a la consola de gestió de ADFS i visitar a l’arbre de navegació el node ADFS 2.0 -> Service -> Certificates. Accedir al certificat de firma (Token-signing) i obtenir un copia que guardarem a la màquina de Sharepoint a “C:\share\adfs.cer” 

2.	Fer click a Start, All programs, Microsoft SharePoint 2010 Products and SharePoint Management Shell i executar a Windows PowerShell les següents instruccions:

	$certPath = “c:\share\adfs.cer”
	$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2("$certPath")

3.	Creació de una nova autoritat proveïdora arrel a Sharepoint executant la següent comanda:

	New-SPTrustedRootAuthority -Name "IDMGT ADFS Token Signing Trusted Root Authority" -Certificate $cert


4.	Creació de la vinculació amb els atributs que SharePoint 2010 farà servir (email i name que conté el NIF):
$map1 = New-SPClaimTypeMapping -IncomingClaimType "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" -IncomingClaimTypeDisplayName "EmailAddress" –SameAsIncoming

	$map2 = New-SPClaimTypeMapping -IncomingClaimType "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" -IncomingClaimTypeDisplayName "Name" –SameAsIncoming

5.	Creació de la variable “realm” (única pel site), ha de coincidir amb la indicada a ADFS a l’apartat “Configurar Sharepoint com a Relying Party”.

	$realm = "urn:sharepoint:portal"

	$signinurl = “https://<adfs_domain>/adfs/ls”

6.	Creació i configuració del nou SPTrustedIdentityTokenIssuer per a que SharePoint 2010 accepti assercions SAML (WS-Fed Passive only). 

	$ap = New-SPTrustedIdentityTokenIssuer -Name "ADFSv2-sts.idmgt.demo" -Description "ADFSv2-sts.idmgt.demo" -realm $realm -ImportTrustCertificate $cert -ClaimsMappings $map1,$map2 -SignInUrl $signinurl -IdentifierClaim $map1.InputClaimType

7.	Revisar el  SPTrustedIdentityTokenIssuer amb la següent instrucció:

	Get-SPTrustedIdentityTokenIssuer –Identity "ADFSv2-sts.idmgt.demo"

8.	Tancar la consola de comandes.

**Declaració del Trusted Identity Provider per a la aplicació web**

Per associar ADFS (Trusted Identity Provider) a la aplicació web cal seguir els següents pasos:

1.	Fer click a Start, All programs, Microsoft SharePoint Products and SharePoint Central Administration.
2.	Sota Application Management, fer click sobre l’enllaç Manage Web Applications.
3.	Seleccionar a la llista l’aplicació web que farà servir AD FS 2.0 per i fer click a  Authentication Providers en el menu principal.
4.	A la plana Authentication Provider, fer click a l’enllaç en el quadre de que correspon a la zona apropiada en que es farà servir ADFS 2.0 per autenticar. Probablement Default Zone si no hi cap altre configurada amb aquest propòsit.
5.	A la plana Edit Authentication, baixar fins la secció Claims Authentication Types.

![Integració amb GICAR](/related/gicar/gicar-adfs15.png)
 
6.	Seleccionar Trusted Identity Provider i llavors “ADFSv2-sts.idmgt.demo” a la llista.
7.	Fer click a Save
8.	Tancar  SharePoint Central Administration.
 
