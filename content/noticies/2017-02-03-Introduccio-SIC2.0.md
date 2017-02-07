+++
date        = "2017-02-03"
title       = "SIC. Introducció a SIC 2.0"
description = "El SIC està evolucionant per tal de poder donar cabuda a les tecnologies més emprades avui dia. La primera actualització està prevista d'aplicar-se a l'Abril d'aquest any."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "FEBRER2017"
+++

El SIC està evolucionant per tal de poder donar cabuda a les tecnologies més emprades avui dia. La primera actualització està prevista d'aplicar-se a l'Abril d'aquest any i inclourà els següents canvis:

#### **Sistema de control de codi font**

S'incorporarà [Gitlab](https://about.gitlab.com/) com a Sistema de control de codi font (SCM). Aquest SCM conviurà amb l'actual, el SVN, durant un període encara a determinar. Transcorregut aquest període, Gitlab romandrà com a únic SCM al SIC.
Les noves aplicacions que s'incorporin al SIC a partir d'aquest Abril, ja ho podran fer amb Gitlab. Els mateixos proveïdors d'aplicacions seran autònoms per poder crear els repositoris de codi de les aplicacions dins el Gitlab.
Per a les aplicacions que ja custodien el codi font al repositori SVN, el SIC oferirà la possibilitat de migrar el contingut d'aquest sistema al de Gitlab.

#### **Sistema d'accés als repositoris / Jenkins**

Per a l'accés als repositoris Gitlab caldrà emprar les credencials dels usuaris GICAR. L'accés als repositoris SVN continuarà realitzant-se mitjançant les credencials dels actuals usuaris SIC.
Els proveïdors d'aplicacions que disposin de jobs al Jenkins de SIC, podran logar-se a l'eina tant amb l'usuari GICAR com amb l'usuari de SIC.

El següent dibuix contempla la mecànica d'accés i temps de coexistència entre ambdós SCM's:![SIC 1.0 vs SIC 2.0](/images/news/introduccio-sic.2.0.png)

Durant els pròxims mesos s'alliberarà més informació i més detallada sobre aquests i futurs canvis que s'afegiran a SIC.
