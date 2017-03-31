+++
date        = "2015-01-24T17:11:42+01:00"
title       = "Binaris de Canigó"
description = "Descàrrega de les diferents versions de Canigó, entorn de treball, plugin d'eclipse..."
sections    = "Canigó"
weight		= 4
+++

## Repositoris Maven

+ Repositori Maven: https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/

Per a utilitzar el repositori s'ha d'afegir el certificat al cacerts de Java.

S'ha de descarregar el certificat de la web i per afegir-lo utilitzar la eïna keytool

	keytool -keystore cacerts -importcert -alias canigo -file certificat.cer

## Canigó 3.2 

- [Mòduls de Canigó 3.2](https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/cat/gencat/ctti/)
- [Release notes Canigó 3.2](/canigo-download-related/release-notes-canigo-32)
- [Matriu de Compatibilitat Canigo 3](/canigo-download-related/matrius-compatibilitats)


### Creació de l'entorn local

<!--
- Descàrrega de l'[entorn base de treball](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/entorn-treball/canigo3.html) *És necessari realitzar l'upgrade del plugin de Canigó per Eclipse a la versió 1.2.0.
- Guia d'inici per a la configuració d'un entorn de desenvolupament. Veure aquest [link](/canigo-download-related/guia-inici)
-->

Veure [Entorn desenvolupament Canigó](http://canigo.ctti.gencat.cat/canigo/entorn-desenvolupament/)

Altra informació d'interés:

* [Plugin Canigó 3.2 per a Eclipse i creació d'aplicació](/canigo-download-related/plugin-canigo)
* [Plantilla demo Canigó 3.2] (https://github.com/gencatcloud/plantilla-demo-canigo32)
* [Plantilla demo Canigó 3.2 desplegada a Bluemix] (http://134.168.52.226:8080/canigo-api.html)
	Credencials:
		username -> admin
		password -> password


## Canigó 2.3.21

- [Serveis de Canigó 2.3.21](https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/canigo/)
- [Connectors de Canigó 2.3.21](https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/canigo/connectors/)
- [Release notes Canigó 2.3.21](http://cstd.ctti.gencat.cat/jiracstd/browse/CAN/fixforversion/10452)
- [Plantilla Canigó 2.3.20 (Amb exemples) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/demo-canigo-2.3.20.zip)
- [Plantilla Canigó 2.3.20 (Sense exemples) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/plantilla-canigo-2.3.20.zip)
- [Contingut estàtic versió 2.3.20 (Comprimit) (format .zip)](http://repos.canigo.ctti.gencat.cat/repository/maven2/canigo/plantilla-canigo-inicial/2.3.20/demo-canigo-static-compress-2.3.20.zip)

### Creació de l'entorn local

- Descàrrega de l'[entorn base de treball](https://sic.ctti.extranet.gencat.cat/nexus/content/groups/canigo-group-maven2/canigo/entorn-treball/canigo.zip)
- Guia d'inici per a la configuració d'un entorn de desenvolupament. Veure aquest [link](/canigo-download-related/guia-inici-canigo2)

<p>&nbsp;</p>

## Versions anteriors 2.x

Per a versions antigues del Framework Canigó, contacteu amb el Centre de Suport.
<p>&nbsp;</p>
