+++
date        = "2015-04-05"
title       = "SIC. Nova política d'autorització d'accés a repositoris"
description = "Els repositoris de Subversion de l'antic model existents al SIC només comptaven amb un control d'accessibilitat (autenticació). Els usuaris podien accedir a determinats repositoris en funció del grup al qual se'ls hi havia assignat amb control total (Read/Write). En els repositoris del nou model s'ha incorporat un control d'autorització que permet definir els permisos sobre el contingut accedit (Read o Read/Write)"
sections    = ["Notícies", "home"]
categories  = ["desenvolupament", "sic"]
+++

Els repositoris de Subversion de l'antic model existents al SIC només comptaven amb un control d'accessibilitat (autenticació). Els usuaris podien accedir a determinats repositoris en funció del grup al qual se'ls hi havia assignat amb control total (Read/Write). En els repositoris del nou model s'ha incorporat un control d'autorització que permet definir els permisos sobre el contingut accedit (Read o Read/Write)

Aquesta nova característica ha permès limitar els permisos del grup d'administradors de CPD als repositoris de les aplicacions per tal que només puguin descarregar contingut (Read), salvant el risc i responsabilitat que comportava l'accés total (Read/Write) als repositoris als quals tenien accés en l'antic model.

<CENTER>![sic](/images/news/RML_vs_CPD_permissions.png)</center>

Els nous repositoris de [Subversion] (http://svn.intranet.gencat.cat/) compten ara amb un total de 532 codis de diàleg donats d'alta. En el següent gràfic es mostren el total de codis de diàleg distribuïts per àmbits:

Per qualsevol consulta referent a la política d'accés als repositoris de Subversion es pot fer arribar una petició de consulta al JIRA CSTD al servei [SICQ] (https://cstd.ctti.gencat.cat/jiracstd/browse/SICQ) o [s'ha d'obrir una petició Remedy de consulta al SIC](http://canigo.ctti.gencat.cat/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta).

