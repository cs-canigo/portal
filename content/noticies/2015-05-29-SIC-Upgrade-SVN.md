+++
date        = "2015-05-29"
title       = "SIC. Upgrade versió Subversion al SIC"
description = "En breu s'actualitzarà la versió de SVN del servidor de SIC, passant d'una 1.6.11 a una 1.8.13. Aquesta actualització comportarà una sèrie de millores en rendiment, robustesa i seguretat al SVN de SIC."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key 		= "JUNY2015"
+++

En breu s'actualitzarà la versió de SVN del servidor de SIC, passant d'una 1.6.11 a una 1.8.13. Aquesta actualització comportarà una sèrie de millores al SVN de SIC, de les quals destaquem les següents:

||Subversion 1.6|Subversion 1.8|
|----------------------|-----------|-------------|
|Llibreria client HTTP|neon* |serf (+rendiment)|
|Sistema d'arxius al repositori|basat en Berkeley DB* |basat en FSFS (+robustesa)|
|Llistat d'arxius|En accedir a l'arrel del repositori d'àmbit es presentaran totes les carpetes de codi diàleg (tot i que només deixa accedir a les que es té permís).| En accedir a l'arrel del repositori d'àmbit, només es presenten les carpetes de codi diàleg a les que es pot accedir.|
*Deprecat per Apache

Trobareu més detall dels canvis a la pàgina oficial de les [Release Notes de la versió 1.8 de Subversion](https://subversion.apache.org/docs/release-notes/1.8.html).

#### Compatibilitat amb clients SVN < 1.8
Es recomana a aquells usuaris de SIC que continuen treballant amb un client anterior a la 1.8.X que s'actualitzin també a aquesta versió per tal que puguin aprofitar al màxim les millores que introduirà aquesta versió.

Per a obtenir més informació relativa al SIC podeu accedir a la [secció SIC](http://canigo.ctti.gencat.cat/sic/) dins el Portal de Frameworks i Solucions d'Arquitectura. Per consultes o suport preferiblement fer una petició al [Servei SICQ del JIRA CSTD](https://cstd.ctti.gencat.cat/jiracstd/browse/SICQ) o [s'ha d'obrir una petició Remedy de consulta al SIC](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta).