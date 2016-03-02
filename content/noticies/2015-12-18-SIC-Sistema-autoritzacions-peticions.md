+++
date        = "2015-12-18"
title       = "SIC. Sistema d'autoritzacions de peticions FRAMEWORK SIC a SAU-Remedy"
description = "L'admissió de peticions al servei FRAMEWORK SIC de SAU-Remedy es troba restringit per un sistema de rols d'usuari que determina quines operacions pot demanar cada rol. Aquest article pretén explicar com es realitza aquesta discriminació."
section     = "Notícies"
categories  = ["sic"]
key         = "GENER2016"
+++

L'admissió de peticions al servei FRAMEWORK SIC de SAU-Remedy es troba restringit per un sistema de rols d'usuari que determina quines operacions pot demanar cada rol. Aquest article pretén explicar com es realitza aquesta discriminació.

Es controla que les peticions que representen més impacte sobre els serveis SIC provinguin d'aquells usuaris amb més pes sobre el projecte. Es consideren peticions amb impacte:

* Alta/Baixes d'usuaris SIC.
* Restitució de passwords d'altres usuaris SIC.
* Altes de repositoris [SVN](http://svn.intranet.gencat.cat/).
* Petició d'aplicació d'excepció sobre el control d'extensions d'arxius a pujar als repositoris SVN (.war, .ear, .jar).

<center>![autoritzacions_peticions_responsables.png](/images/news/autoritzacions_peticions_responsables.png)</center>

N'hi ha altres tipus de peticions que no representen gaire impacte sobre els serveis SIC:

* Restitució de password d'usuari SIC propi (a excepció del rol gestor de peticions SIC a SAU-Remedy, donat que no requereix un usuari al SIC).
* Afegir llibreries al [Nexus](http://hudson.intranet.gencat.cat/nexus/) de SIC.
* Altes/modificacions de Jobs de [Jenkins](http://hudson.intranet.gencat.cat/hudson/) de les aplicacions
* Inscripció d'usuaris gestors de peticions SIC a SAU-Remedy (nou rol d'usuari que resta explicat al següent [article](http://canigo.ctti.gencat.cat/noticies/2015-12-23-SIC-Nou-rol-de-peticionari-a-SAU-Remedy/))

<center>![autoritzacions_peticions_tecnics.png](/images/news/autoritzacions_peticions_tecnics.png)</center>



Pel que fa a les consultes o incidències amb serveis SIC, qualsevol usuari pot obrir-les a SAU-Remedy. No s'aplica aquest sistema de control d'autorització.

Per a qualsevol dubte relatiu a aquest tema, ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy .
