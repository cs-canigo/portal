+++
date        = "2018-05-02"
title       = "Cicle de vida Formularis HTML5 a eFormularis"
description = "Cicle de vida Formularis HTML5 a eFormularis"
sections    = "SGDE"
taxonomies  = []
weight 		= 1

+++

En l'actualització tecnològica realitzada durant el 2018 (23/4 Preproducció - 11/6 Producció) a la plataforma d'eFormularis, l'Adobe LiveCycle es substituït per l'AEM (Adobe Experience Manager), el qual incorpora noves funcionalitats relatives a Formuaris HTML5.

## Formularis HTM5 responsius

Els **Adaptive Forms** són els formularis HTML5 d'AEM amb capacitat multi-dispositiu. Això vol dir que responen de forma diferent, s'adapten, depenent del dispositiu on siguin executats. Un altre gran diferència respecte als formularis PDF, és que el mode d'execució és **on-line**. El formulari ja no es descarrega i s'emplena en mode **off-line** com en el cas dels PDF, per a ser enviats posteriorment.

D'aquí en endavant, quan s'anomeni un formulari HTML5 ens estem referint exclusivament a un adaptive form d'AEM.

## Cicle de vida

A continuació es descriu el cicle de vida pel que passa un formulari HTML5 a la plataforma d'eFormularis

#### Desenvolupament

Desenvolupament local en una instància AEM del desenvolupador, executada en mode autor. El instal·lable d'AEM per aquesta instància d'AEM, ha de ser sol·licitada pel responsable CTTI de l'aplicació, preferiblement obrint una petició al servei [STF|], o bé enviant un correu a la [bústia del CS Canigó|mailto:oficina-tecnica.canigo.ctti@gencat.cat].

L'execució de la instància d'AEM en mode autor permetrà al desenvolupador fer el disseny del formulari HTML5.

```
$ java -jar <AEM_jar>
```

S'ha de tenir en compte que per defecte el repositori d'AEM és crea al directori des d'on l'usuari executa aquest procés. És important ja que el volum de dades que s'hi emmagatzemen és gran (5GB aproximadament) i de vital importancia per el funcionament d'AEM.

#### Desplegament a Preproducció

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
		
		
