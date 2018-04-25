+++
date        = "2015-03-31"
title       = "Accés per a CPD"
description = ""
sections    = "SIC"
weight      = 1
+++

### Accés per a CPD

Per a totes aquelles aplicacions per a les que que no és possible realitzar desplegaments automatitzats des del SIC s'ofereix la possibilitat que els administradors de CPD puguin accedir als artefactes (.war, .ear, .zip, ...) custodiats al SIC per tal de poder realitzar desplegaments en els servidors dels nous CPDs.

Els administradors podran accedir indistintament tant als artefactes lliurats al Subversion com els que generi Jenkins per a una aplicació que està compilant al SIC. Amb aquesta finalitat s'ha creat el Formulari d'accés per a CPD al SIC que podeu trobar a la secció de [Documentació](/sic/documentacio). Per tal de sol- licitar aquests accessos és necessari fer arribar aquest formulari degudament emplenat al servei SIC via petició de suport al [JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/SICQ). En cas de no dispossar d'usuari o permissos en aquest servei SIC del JIRA CSTD [s'ha d'obrir una petició Remedy al SIC](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/).

## Procediment de desplegament

És responsabilitat del proveïdor de l'aplicació proporcionar a l'administrador de CPD el Manual de Desplegament on indicar les instruccions per a realitzar el desplegament de l'aplicació. És en aquest manual on cal indicar quina és la ubicació dins el SIC d'on obtenir l'artefacte/s a desplegar en el CPD:

Exemples

Lliurament a Subversion:
http://svn.intranet.gencat.cat/ctt/0192/demoApp/tags/<versio>/bin/<nom_artefacte>
http://svn.intranet.gencat.cat/ctt/0192/demoApp/tags/<versio>/docs/<nom_doc_desplegament>
Lliurament a Jenkins: http://hudson.intranet.gencat.cat/hudson/job/CTTI_demoApp_BLD/<num_compilacio>/artifact/treball/target/demoApp.ear