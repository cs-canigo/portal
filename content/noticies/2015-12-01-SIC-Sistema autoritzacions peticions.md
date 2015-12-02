+++
date        = "2015-12-01"
title       = "SIC. Sistema d'autoritzacions de peticions SIC"
description = "L'admissió de peticions al servei FRAMEWORK SIC es troba restringit per un sistema de rols d'usuari i operacions que pot demanar cada rol. Aquest article pretén explicar com es realitza aquesta discriminació."
section     = "Notícies"
categories  = ["sic"]
draft		= true
key         = "DESEMBRE2015"
+++

L'admissió de peticions al servei FRAMEWORK SIC es troba restringit per un sistema de rols d'usuari i operacions que pot demanar-ne cadascún d'aquests. Aquest article pretén explicar com es realitza aquesta discriminació.

A SIC es consideren 2 categoritzacions d'usuaris segons:

* Activitat cara a l'aplicació: CPD (desplegament) / Proveïdor (manteniment)
* Responsabilitat cara a l'aplicació: Responsable (gestió) / tècnic +arquitectes (manteniment)

Es controla que les peticions que representen més impacte sobre SIC provingin d'aquells usuaris amb més pes sobre el projecte. Es consideren peticions amb impacte:

* Alta/Baixes d'usuaris SIC.
* Restitució de passwords d'altres usuaris SIC.
* Altes de repositoris SVN / Jobs.
* Afegir llibreries a Nexus.
* Petició d'aplicació d'excepció sobre el control d'extensions d'arxius a pujar als repositoris SVN (.war, .ear, .jar).

<center>![autoritzacions_peticions_responsables.png](/images/news/autoritzacions_peticions_responsables.png)</center>

N'hi ha altres tipus de peticions que no representen gaire impacte sobre el model SIC:

* Restitució de password d'usuari SIC propi.
* Modificacions menors a Jobs de les aplicacions (canvi de versió de JDK, de model de construcció, ...).
* Qualsevol consulta o incidència relacionada amb el servei SIC.

<center>![autoritzacions_peticions_tecnics.png](/images/news/autoritzacions_peticions_tecnics.png)</center>



Per a qualsevol dubte relatiu a aquest tema, ens podeu obrir una consulta a Remedy al servei "FRAMEWORK SIC".