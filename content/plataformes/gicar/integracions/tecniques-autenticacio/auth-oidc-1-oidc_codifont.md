+++
date        = "2022-08-17T12:20:42+01:00"
title       = "OIDC - Integració amb OIDC per SPAs des de codi font"
description = "Descripció de la Integració amb el Keycloak de GICAR per SPAs"
sections    = "gicar-novesintegracions-tecniques-autenticacio"
taxonomies  = []
toc			= false
weight 		= 7
+++

## Introducció 

En aquesta guia es detallen els passos a seguir per crear una aplicació SPA client que autentifiqui l'usuari amb Keycloak del GICAR. Aquesta SPA utilitzarà les llibreries Javascript que proporciona el propi producte de Keycloak.

## Dades a demanar a la OTGICAR:

Per a fer la integració és necessari sol·licitar a través del JIRA CSTD a la OTGICAR un fitxer de configuració anomenat Keycloak.json, que és el que conté els paràmetres per a fer la connexió correcta contra el Keycloak de GICAR.

Aquest fitxer keycloak.json contindrà els següents paràmetres proporcionats per la OTGICAR:

		  "realm": "xxxxxxxxx",
		  "auth-server-url": "xxxxxxxxxxx",
		  "ssl-required": "xxxxx",
		  "resource": "xxxxx",
		  "public-client": xxxxxxxx,
		  "confidential-port": 0


## Construcció del HTML:

1. Al head del HTML carregar la llibreria Javascript que proporcional el producte Keycloak:

		<script src="dist/keycloak.js" type="text/javascript">
		</script>

1. Al body de la petició inicialitzar la llibreria de Keycloak de la següent forma:

		var keycloak = Keycloak('http://localhost:3000/keycloak.json');

1. En el onload del HTML fer saltar el login de GICAR a través d'aquesta funció:

		keycloak.init({ onLoad: 'login-required' }).success(reloadData);


1. Recuperar els valors obtinguts pel Keycloak accedint als atributs de l'objecte Keycloak de la següent manera:

		Identificador d'usuari: keycloak.idTokenParsed.preferred_username;
		Correu electrònic de l'usuari = keycloak.idTokenParsed.email;
		Nom de l'usuari = keycloak.idTokenParsed.given_name;
		Cognoms de l'usuari = keycloak.idTokenParsed.family_name;
		Token de l'usuari = keycloak.token;


## Exemple de HTML funcionant que retorna els atributs d'usuari:

Un possible exemple de HTML de SPA funcionant amb Keycloak podria ser aquest:

	<html>
		<head>
			
			<script src="dist/keycloak.js" type="text/javascript">
			</script>
		</head>
		
		<body>
			<h1>Aplicació de proves Keycloak GICAR</h1>
			
			<div>
			L'usuari <b id="subject"></b> ha fet aquesta petició.
			<p><b>Detalls de l'usuari (extrets de <span id="profileType"></span>):</b></p>
			<p>Nom d'usuari (NIF): <span id="username"></span></p>
			<p>Email: <span id="email"></span></p>
			<p>Nom complet: <span id="name"></span></p>
			<p>Nom: <span id="givenName"></span></p>
			<p>Cognoms: <span id="familyName"></span></p>
			<p><b>---------------------------------</b></p>
			<p><b>Altres dades:</b></p>
			<p>Access Token: <span id="tokenbearer"></span></p>
			
			
			</div>
			
			<script type="text/javascript">
		var keycloak = Keycloak('http://localhost:3000/keycloak.json');
		var loadData = function () {
			document.getElementById('subject').innerHTML = keycloak.subject;
			if (keycloak.idToken) {
				document.getElementById('profileType').innerHTML = 'IDToken';
				document.getElementById('username').innerHTML = keycloak.idTokenParsed.preferred_username;
				document.getElementById('email').innerHTML = keycloak.idTokenParsed.email;
				document.getElementById('name').innerHTML = keycloak.idTokenParsed.name;
				document.getElementById('givenName').innerHTML = keycloak.idTokenParsed.given_name;
				document.getElementById('familyName').innerHTML = keycloak.idTokenParsed.family_name;
				document.getElementById('tokenbearer').innerHTML = keycloak.token;
			} else {
				keycloak.loadUserProfile(function() {
					document.getElementById('profileType').innerHTML = 'Account Service';
					document.getElementById('username').innerHTML = keycloak.profile.username;
					document.getElementById('email').innerHTML = keycloak.profile.email;
					document.getElementById('name').innerHTML = keycloak.profile.firstName + ' ' + keycloak.profile.lastName;
					document.getElementById('givenName').innerHTML = keycloak.profile.firstName;
					document.getElementById('familyName').innerHTML = keycloak.profile.lastName;
					document.getElementById('tokenbearer').innerHTML = keycloak.token;
				}, function() {
					document.getElementById('profileType').innerHTML = 'Failed to retrieve user details. Please enable claims or account role';
				});
			}
			
		};
		var loadFailure = function () {
			document.getElementById('customers').innerHTML = '<b>Failed to load data.  Check console log</b>';
		};
		var reloadData = function () {
			keycloak.updateToken(10)
					.success(loadData)
					.error(function() {
						document.getElementById('customers').innerHTML = '<b>Failed to load data.  User is logged out.</b>';
					});
		}
		keycloak.init({ onLoad: 'login-required' }).success(reloadData);
	</script>

	<br><br>
	<button onclick="reloadData()">Reload data</button>
		</body>
	</html>


## Referències 

https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter  