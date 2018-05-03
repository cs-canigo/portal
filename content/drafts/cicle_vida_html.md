+++
date        = "2018-05-02"
title       = "Cicle Vida Formulari HTML"
description = "Cicle Vida Formulari HTML"
sections    = "SGDE"
taxonomies  = []
weight 		= 1

+++


1. Desenvolupament en local en una instància autònoma AEM del desenvolupador. S'ha de demanar aquesta instància a CTTI.

2. Una vegada creat el formulari l'usuari l'ha de proporcionar al CS Canigó:

	- Exportar el formulari en format ZIP
	- Crear una petició al JIRA-CSTD, [servei STF] (https://cstd.ctti.gencat.cat/jiracstd/browse/STF)
	- Adjuntar a la petició el ZIP amb el formulari
	- Indicar a quin àmbit i aplicació pertany
	
3. El CS Canigó publicarà el formulari a la url:

	http://AEM/content/forms/af/ambit/aplicacio/formulari.html
	
	L'usuari pot fer referència a aquesta URL o incoportar el formulari a la seva aplicació.
	
4. L'usuari pot incorporar aquest formulari a la seva aplicació, per a realitzar això ha de realitzar els següents pasos:

Incorporar el següent codi a una plana HTML de la seva aplicació:
	
	<body>

	<div></div>

	 
	 <script>
				var path = "http://AEM/content/forms/af/ambit/aplicacio/formulari.html";
				var pathXML = "URL que contingui les dades XML per a relitzar la precàrrega (si s'escau)
				path += "/jcr:content/guideContainer.html";
				$.ajax({
					url  : path ,
					type : "GET",
					data : {
						// Set the wcmmode to be disabled
						wcmmode : "disabled",
						"dataRef": pathXML
					},
					async: false,
					success: function (data) {
						//document.getElementById('output').innerHTML = data;
						$( "div" ).html(data);
					},
					error: function (data) {
						// any error handler
					}
				});

	 </script>

	</body>
		
L'aplicació on es vol incorporar el formulari ha d'estar desplegada en un Apache, per a que es carreguin els estils i js, amb la següent configuració:
	
	ProxyPass /content http://<AEM_Instance>/content
	ProxyPass /etc http://<AEM_Instance>/etc
	ProxyPass /etc.clientlibs http://<AEM_Instance>/etc.clientlibs
	# CSRF Filter
	ProxyPass /libs/granite/csrf/token.json http://<AEM_Instance>/libs/granite/csrf/token.json
	   
	ProxyPassReverse /etc http://<AEM_Instance>/etc
	ProxyPassReverse /etc.clientlibs http://<AEM_Instance>/etc.clientlibs
	# written for thank you page and other URL present in AF during redirect
	ProxyPassReverse /content http://<AEM_Instance>/content
		
		