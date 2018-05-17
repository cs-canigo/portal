+++
date        = "2018-05-02"
title       = "Formularis HTML5 a eFormularis"
description = "Formularis HTML5 a eFormularis"
sections    = "SGDE"
taxonomies  = []
toc         = true
weight 		= 1

+++

## Introducció

En l'actualització tecnològica realitzada durant el 2018 (23/4 Preproducció - 11/6 Producció) a la plataforma d'eFormularis, l'Adobe LiveCycle es substituït per l'AEM (Adobe Experience Manager), el qual incorpora noves funcionalitats relatives a formuaris HTML5.

Els **Adaptive Forms** són els formularis HTML5 d'AEM amb capacitat multi-dispositiu. Això vol dir que responen de forma diferent, s'adapten, depenent del dispositiu on siguin executats. Un altre gran diferència respecte als formularis PDF, és que el mode d'execució és **on-line**. El formulari ja no es descarrega i s'emplena en mode **off-line** com en el cas dels PDF, per a ser enviats posteriorment.

D'aquí en endavant, quan s'anomeni un formulari HTML5 ens estem referint exclusivament a un adaptive form d'AEM.

## Sol·licitud d'alta

Per a que una aplicació web pugui incorporar un formulari HTML5 gestionat pel servei d'eFormularis, cal que faci arribar una petició de sol·licitud d'alta al [servei STF del JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/STF) proporcionant la següent informació:

**Dades generals**

- _Àmbit_: àmbit al que pertany l'aplicació (Ex. DGAC, TSF, CTT, ...)
- _Codi de diàleg aplicació_: codi de diàleg de l'aplicació
- _Nom aplicació_: nom descriptiu de l'aplicació
- _Responsable CTTI_: persona responsable per part de CTTI de l'aplicació
- _Responsable proveïdor d'aplicacions_: persona responsable per part del lot d'aplicacions

**Dades tècniques**

- _Endpoint de preomplert de dades_: nom dns i port del servei que expossa l'endpoint per l'obtenició de les dades per realitzar el preomplert del formulari. Si el formulari no requereix preomplert de dades, ni per les noves instanciacions ni per carregar esborranys, no cal proporcionar aquesta informació
- _Endpoint de submit_: en cas que el formulari tingui un botó de tipus submit, caldrà que s'especifiqui el nom dns i port del servei que expossa l'endpoint al que es farà l'enviament de les dades. Si el formulari tindrà una acció per fer l'enviament de les dades del formuari via AJAX sense ser de tipus submit, no cal proporcionar aquesta informació

Com a resposta a la sol·licitud d'alta, el equip del CS Canigó retornarà la URL base dels formularis de l'aplicació al servei d'eFormularis:

	- PRE: https://preproduccio.publicador.eformularis.intranet.gencat.cat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html
	- PRO: https://publicador.eformularis.intranet.gencat.cat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html

També confirmarà que s'han habilitat les connectivitats requerides des del servei d'eFormularis cap als endpoints necessaris per la integració.

## Integració

TODO: Diagrama que il·lustri la integració entre l'aplicació i eFormularis

### Configuració proxy HTTP

El lloc web on es vulgui incorporar el formulari ha de tenir uns frontals web (Apache, NGinx,...) com a part de la seva infraestructura. El motiu és que, per tal de mantenir el context dins l'aplicació i no fer una redirecció a un altre domini, cal fer una sèrie de configuracions en aquests frontals per tal que l'accés al servei d'eFormularis sigui transparent.

En la secció formulari demo es pot veure un exemple d'aquesta configuració.

#### Regles de firewall

Els frontals web de l'aplicació hauran de tenir connectivitat amb el servei de publicació de Formularis HMTL5 d'eFormularis:

	- PRE
		Nom: preproduccio.publicador.eformularis.intranet.gencat.cat
		IP: 10.1.126.79
		Port: 443
	- PRO:
		Nom: publicador.eformularis.intranet.gencat.cat
		IP: 10.1.118.51
		Port: 443

### Consideracions de seguretat

Es recomana que l'aplicació incorpori un token en la crida al formulari, i que aquest s'enviï en l'enviament de les dades del formulari per tal que l'aplicació pugui fer les validacions pertinents (autenticitat, timeout).

## Cicle de vida formulari HTML5

A continuació es descriu el cicle de vida pel que passa un formulari HTML5 a la plataforma d'eFormularis

### Desenvolupament

Desenvolupament local en una instància AEM del desenvolupador, executada en mode autor. El instal·lable d'AEM per aquesta instància d'AEM, ha de ser sol·licitada pel responsable CTTI de l'aplicació, preferiblement obrint una petició al servei [STF](https://cstd.ctti.gencat.cat/jiracstd/browse/STF), o bé enviant un correu a la [bústia del CS Canigó](mailto:oficina-tecnica.canigo.ctti@gencat.cat).

L'execució de la instància d'AEM en mode autor permetrà al desenvolupador fer el disseny del formulari HTML5.

```
$ java -jar <AEM_jar>
```

S'ha de tenir en compte que per defecte el repositori d'AEM és crea al directori des d'on l'usuari executa aquest procés. És important ja que el volum de dades que s'hi emmagatzemen és gran (5GB aproximadament) i de vital importancia per el funcionament d'AEM.

### Desplegament

Per tal que un formulari HTML5 sigui desplegat a eFormularis, cal seguir les següents pases:

- Exportar el formulari HTML5 a l'AEM autor de desenvolupament: AEM Start -> Forms -> Forms & Documents -> Sel·leccionar formulari -> Download

- Crear una petició al CSTD, [servei STF] (https://cstd.ctti.gencat.cat/jiracstd/browse/STF) especificant aquesta informacio:

	- àmbit, aplicació, nom formulari i versió
	- adjunt zip amb el conjunt d'assets resultat de l'exportació del formulari
	- entorn
	- data publicació: data en que es vol programar la publicació del formulari. Si no s'informa es considerarà que es vol publicar el més aviat possible

- El CS Canigó validarà el formulari i el publicarà, retornant com a resultat la URL d'accés al formulari: 

	- PRE: https://preproduccio.publicador.eformularis.intranet.gencat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html
	- PRO: https://publicador.eformularis.intranet.gencat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html
		
L'usuari pot fer referència a aquesta URL o incoportar el formulari a la seva aplicació.

#### Versionatge

Donat que la URL de cada formulari ha de ser unívoca, en cas de que es vulgui que puguin conviure diferents versions d'un formulari caldrà que s'afegeix la versió a aquesta URL.

Ex:
https://preproduccio.publicador.eformularis.intranet.gencat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html
https://preproduccio.publicador.eformularis.intranet.gencat/content/forms/af/&lt;ambit&gt;/&lt;aplicacio&gt;/&lt;formulari&gt;.html
...

### Baixa

Quan un formulari o una versió en concreta estigui en desús, s'haurà de demanar al CS Canigó la seva baixa. La petició s'haurà de fer al [servei STF] (https://cstd.ctti.gencat.cat/jiracstd/browse/STF) informant la URL que l'identifica a cada entorn.

## Formulari demo

A continuació es descriu un formulari HTML5 de demo preparat pel CS Canigó. En el següent [enllaç](TODO) podeu descarregar el recursos d'aquest formulari.

### Configuració frontal web

Fer la següent configuració de proxy HTTP per l'accés als recursos (js, css, ...) d'AEM:
	
	ProxyPass /content https://preproduccio.publicador.eformularis.intranet.gencat/content
	ProxyPass /etc https://preproduccio.publicador.eformularis.intranet.gencat/etc
	ProxyPass /etc.clientlibs https://preproduccio.publicador.eformularis.intranet.gencat/etc.clientlibs
	
	# CSRF Filter
	ProxyPass /libs/granite/csrf/token.json https://preproduccio.publicador.eformularis.intranet.gencat/libs/granite/csrf/token.json
	   
	ProxyPassReverse /etc https://preproduccio.publicador.eformularis.intranet.gencat/etc
	ProxyPassReverse /etc.clientlibs https://preproduccio.publicador.eformularis.intranet.gencat/etc.clientlibs
	# written for thank you page and other URL present in AF during redirect
	ProxyPassReverse /content https://preproduccio.publicador.eformularis.intranet.gencat/content

### Incrustar formulari

Incorporar el següent codi a la plana HTML5 desitjada:
	
	 <script>
		var path = "https://<domini-aplicacio>/content/forms/af/ambit/aplicacio/formulari.html";
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

on <domini-aplicacio> és el domini de l'aplicació que està publicant el formulari
