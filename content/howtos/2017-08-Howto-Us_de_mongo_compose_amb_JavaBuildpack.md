+++
date        = "2017-07-24"
title       = "Accés per SSL a cluster MongoDB (Compose) des de buildpack Java (Cloud Foundry)"
description = "Accés per SSL a cluster MongoDB (Compose) des de buildpack Java (Cloud Foundry)"
section     = "howtos"
categories  = ["cloud"]
key         = "AGOST2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells que vulguin desplegar una aplicació Java a [Bluemix|https://console.bluemix.net/] com a app utilitzant el buildpack Cloud Foundry de Java, i necessiti accés a una base de dades MongoDB creada a [Compose|https://compose.io].

Les configuracions explicades en aquest Howto pot aplicar-se a aplicacions Java i bases de dades MongoDB desplegades a altres plataformes, però s'ha certificat a Bluemix i Compose, plataformes cloud d'IBM.

### Introducció

Quan es crea un cluster MongoDB a Compose, la url de connexió que es genera conté el paràmetre **ssl=true**. Això significa que l'accés ha de realitzar-se per SSL. En cas que no es realitzi cap configuració, l'accés des d'una aplicació Java produïra el següent error:

	Caused by: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification
	...
	Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	...
	Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	
Per a solucionar-ho cal afegir el certificat que proporciona Compose al cacerts de Java. Aquest certificat s'haurà de sol·licitar a [suport.cloud@gencat.cat|mailto:suport.cloud@gencat.cat].

### Afegir certificat a cacerts

La versió actual d'OpenJDK que utilitza el buildpack Java de Cloud Foundry, a Agost de 2017, és la versió 1.8.0_141, així que afegim el nostre certificat al cacerts inicial d'aquesta versió.

Per descarregar [OpenJDK](https://github.com/ojdkbuild/ojdkbuild)

S'ha d'anar a la ubicació on hem descomprimit la OpenJDK: <path_jdk>/jre/lib/security

Amb el keytool importem el certificat generat al punt anterior (mongodbcert.crt):

	keytool -importcert -keystore <path_cacerts> -file <path_mongodbcert.crt>
	
Ens demana el password, que és **changeit** i confirmació per importar el certificat, s'ha d'indicar **yes**

Amb aquest procés disposem del nostre certificat afegit al cacerts, ara s'ha de substituir el cacerts original de java-buildpack amb el nostre

### Extensió Java-Buildpack

Crear al Git del SIC: https://git.intranet.gencat.cat/codidialeg/ un projecte buit, per exemple java-buildpack

Aleshores accedir al buildpack que es vol extendre, en aquest howto al github de [cloudfoundry] (https://github.com/cloudfoundry/java-buildpack) i fer un clone.

Al clone realitzat, afegir el remote el nostre repositori creat i fer un push

Aquest pas ens crea una còpia del buildpack al Git del SIC: https://git.intranet.gencat.cat/mygroup/java-buildpack

Per afegir el nostre cacerts ho hem de fer a **/resources/open_jdk_jre/lib/security/cacerts**. El path no existeix, l'hem d'afegir.

Una vegada afegit el fitxer, realitzem el commit per a pujar els canvis al github i al manifest de la nostra aplicació en comptes de:

	buildpack: https://github.com/cloudfoundry/java-buildpack.git
	
Hem de posar:
	
	buildpack: https://git.intranet.gencat.cat/mygroup/java-buildpack.git

