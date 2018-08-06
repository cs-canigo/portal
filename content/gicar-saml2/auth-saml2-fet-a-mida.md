+++
date        = "2016-06-08T17:11:42+01:00"
title       = "Aplicació feta a mida autenticant via SAML2 sense ús d'Apache-Shibboleth"
description = "Aplicació feta a mida consumint servei d'autenticació SAML2 sense ús d'Apache-Shibboleth"
sections    = "gicar-saml2"
taxonomies  = []
toc			= true
weight 		= 3
+++

Com es deia en la introducció, GICAR disposa d’un “Identity Provider”, construït amb la tecnologia Shibboleth, amb capacitat de facilitar tiquets SAML2 a les aplicacions. 

A continuació es detalla quins són els dominis del Identity Provider als que caldrà accedir per a generar el tiquet de SAML2.

	PRE: 
	https://preproduccio.idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO (per autenticació contra el Directori Corporatiu)
	https://preproduccio.idp4-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO (per autenticació contra el Directori Corporatiu + Autenticació Anònima)

	PRO: 
	https://idp1-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO (per autenticació contra el Directori Corporatiu)
	https://idp4-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO (per autenticació contra el Directori Corporatiu + Autenticació Anònima)

**En cas que l'aplicació feta a mida estigui feta amb Canigó es recomana l'ús de la llibreria de Canigó per a la integració amb GICAR via SAML2.**

En cas que l’aplicació no estigui feta amb Canigó, caldrà que els desenvolupadors duguin a terme els següents passos per a cridar via SAML2 a GICAR. A continuació es descriuen:

1. Cal construir un SAMLRequest que ha de contenir exactament la següent informació, estructurada de la següent forma:

	<?xml version="1.0"?> <samlp:AuthnRequest xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" Consent="urn:oasis:names:tc:SAML:2.0:consent:unspecified" Version="2.0" Destination="https://DOMINI _A_ESPECIFICAR_PER_L’EQUIP_GICAR/idp/profile/SAML2/Redirect/SSO" ID="xxxxxxxxxxxxxxxxxxxxx" IssueInstant="2014-12-24T10:35:25.4269359Z" IsPassive="false" xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"> <saml:Issuer>https://URL del servei peticionari</saml:Issuer> <samlp:NameIDPolicy AllowCreate="True" Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" /> </samlp:AuthnRequest>

En cas que l’aplicació no pugui generar un SAMLRequest amb aquesta parametrització, no podrà integrar-se directament contra GICAR via SAML2, i haurà d’analitzar una altra via d’integració.

A continuació es proporciona un fragment de codi Javascript que, posat a dins d'una aplicació, permet redirigir a l'usuari cap a GICAR, generant automàticament un SAMLRequest.

	<script src="rawdeflate.js"></script>

	<script>

	//dades de l aplicacio a integrar
	var entityid="entity ID de l'aplicació integrada definida a GICAR";
	var AssertionConsumerServiceURL="URL de refirecció on espera el POST amb el SAMLResponse l'aplicació";

	//url endpoint de GICAR a utilitzar
	var endpointGICAR="https://A-DEFINIR-gicar.gencat.cat/idp/profile/SAML2/Redirect/SSO?SAMLRequest=";

	//calculem el id de la peticio
	var randomnumber = +new Date();
	//calculem la data d'emissio de la peticio. El desitjable és que la data de la petició es calculi en el servidor web i no en Javascript. Aquest fragment de codi per a calcular la data en Javascript és només per a fer proves, en entorn de producció la data s'hauria de calcular al servidor web de cara a assegurar que estigui generada per un rellotge sincronitzar amb un servidor NTP.
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getUTCMonth()+1;
	var curr_month2 = (curr_month<10?'0':'') + curr_month;
	var curr_year = d.getFullYear();
	var ymd= curr_year+"-"+curr_month2+"-"+ curr_date+"T";
	var curr_hour = d.getUTCHours();
	var curr_min = d.getUTCMinutes();
	var curr_min2 = (curr_min<10?'0':'') + curr_min;
	var curr_sec = d.getUTCSeconds();
	var curr_msec = d.getUTCMilliseconds();
	var hms=curr_hour + ":" + curr_min2 + ":" + curr_sec + "." + curr_msec;
	var datasaml=ymd+hms;

	//generem samlrequest en pla
	var samlrequestpla="<?xml version=\"1.0\"?> <samlp:AuthnRequest xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\" Version=\"2.0\" ID=\"b"+randomnumber+"a\" IssueInstant=\""+datasaml+"\" AssertionConsumerServiceURL=\""+AssertionConsumerServiceURL+"\" ProtocolBinding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" IsPassive=\"false\" xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\"> <saml:Issuer>"+entityid+"</saml:Issuer> </samlp:AuthnRequest>";

	//fem deflate i codificacio en base64
	var samlrequestb64 = btoa(RawDeflate.deflate(samlrequestpla));

	//codifiquem url
	var samlrequest=encodeURIComponent(samlrequestb64);


	var targeturl=endpointGICAR+samlrequest;

	//fem el redirect
	window.location.replace(targeturl);
	</script>

Aquest fragment de codi font té una dependència amb la llibreria "rawdeflate.js" que pot ser descarregada del següent [enllaç] (/related/gicar/rawdeflate.js)

Caldrà que l'equip desenvolupador faci una petició a l’equip GICAR per a incorporar aquesta aplicació com a consumidora del Identity Provider. Com a mínim els responsables de l'aplicació hauran de facilitar la següent informació a l’equip GICAR per a poder autenticar aquest servei:

- entityID = Haurà de contenir el valor del SAML:Issuer indicat en el SAMLRequest de les peticions que farà l’aplicació. Serà normalment la URL del servei peticionari.

- Certificat = Certificat X509 que farà servir l’aplicació consumidora per a desencriptar els tiquets SAML que haurà emès GICAR.

- AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" = S’haurà d’indicar a quina URL de l’aplicació GICAR haurà de redirigir un cop feta l’autenticació. Serà la URL on es farà la corresponent redirecció, i on es passarà per paràmetre l’atribut SAMLResponse amb el contingut de les respostes que haurà de decodificar i desencriptar l’aplicació.

Caldrà addicionalment que el desenvolupador especifiqui quina informació voldrà rebre referent a l’usauri que s’haurà autenticat.

2. Caldrà finalment que el desenvolupador decodifiqui el paràmetre SAMLResponse que GICAR retornarà. Aquest paràmetre SAMLResponse contindrà tots els claims de resposta xifrats per defecte, i en casos excepcionals i per necessitats de l'aplicació serà possible que GICAR els envii en clar (assumint que el pas del paràmetre es farà per HTTPS).