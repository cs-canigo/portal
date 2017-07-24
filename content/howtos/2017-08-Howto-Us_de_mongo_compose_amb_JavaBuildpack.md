+++
date        = "2017-07-24"
title       = "Connectar una aplicació amb JavaBuildpack i Mongo(Compose) amb SSL"
description = "Connectar una aplicació amb JavaBuildpack i Mongo(Compose) amb SSL"
section     = "howtos"
categories  = ["cloud"]
key         = "AGOST2017"
+++

### A qui va dirigit

Aquest how-to va dirigit a tots aquells que vulguin desplegar una aplicació java a Cloudfoundry utilitzant el buildpack de Java, i la seva aplicació utilitze una base de dades Mongo creada a Compose.

### Introducció

Quan es crea una base de dades Mongo a Compose, la url de connexió que es genera conté el paràmetre **ssl=true**. Això provoca que al desplegar l'aplicació amb el buildpack de java aparegui el següent error:

	Caused by: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification
	...
	Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	...
	Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	
Per a solucionar aquest error s'ha d'afegir el certificat que proporciona compose al cacerts de Java.

### Crear certificat

S'ha d'accedir a Compose i copiar el certificat proporcionat (SSL Certificate (Self-Signed)) i el desem a un fitxer, per exemple **mongodbcert.crt**, que quedarà de la següent manera:

	-----BEGIN CERTIFICATE-----
	Codi certificat
	-----END CERTIFICATE-----

### Afegir certificat a cacerts

La versió actual d'OpenJDK que utilitza JavaBuildpack, a Març de 2017, és la versió 1.8.0.121, així que afegim el nostre certificat al cacerts inicial d'aquesta versió.

Per descarregar [OpenJDK](https://github.com/ojdkbuild/ojdkbuild)

S'ha d'anar a la ubicació on hem descomprimit la OpenJDK: <path_jdk>/jre/lib/security

Amb el keytool importem el certificat generat al punt anterior (mongodbcert.crt):

	keytool -importcert -keystore <path_cacerts> -file <path_mongodbcert.crt>
	
Ens demana el password, que és **changeit** i confirmació per importar el certificat, s'ha d'indicar **yes**

Amb aquest procés disposem del nostre certificat afegit al cacerts, ara s'ha de substituir el cacerts original de java-buildpack amb el nostre

### Extensió Java-Buildpack

Per a extendre el buildpack hem d'accedir al github de [cloudfoundry] (https://github.com/cloudfoundry/java-buildpack) i fer un fork.

Aquest pas ens crea una còpia del buildpack al nostre github: https://github.com/myrepo/java-buildpack

Per afegir el nostre cacerts ho hem de fer a **/resources/open_jdk_jre/lib/security/cacerts**. El path no existeix, l'hem d'afegir.

Una vegada afegit el fitxer, realitzem el commit per a pujar els canvis al github i al manifest de la nostra aplicació en comptes de:

	buildpack: https://github.com/cloudfoundry/java-buildpack.git
	
Hem de posar:
	
	buildpack: https://github.com/myrepo/java-buildpack.git

