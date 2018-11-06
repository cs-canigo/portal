+++
date        = "2018-10-26"
title       = "Matriu de tecnologies compatibles amb el SIC"
description = "Matriu de tecnologies compatibles amb el SIC"
sections    = "SIC"
taxonomies  = []
weight 		= 3
+++

**<span style="color: #C00000;">AVÍS:</span>** Aquesta normativa del SIC **no** invalida l'[Estàndard pel full de ruta del programari](https://qualitat.solucions.gencat.cat/estandards/estandard-full-ruta-programari/#servidors-d-aplicacions), ans al contrari, l'extèn per acabar de concretar els requeriments propis del SIC.

## Tecnologies de construcció

Les tecnologies de construcció d'aplicacions serveixen per gestionar el cicle de vida d'una aplicació o algunes de les seves fases.

A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible.

|Tecnologia|Versions|
|-------|-------|
|Ant|1.8.2<br />1.9.6|
|Maven|2.0.10<br />2.2.1<br />3.2.2<br />3.3.9|
|MS_Build|4.0|
|MS_Deploy|7.1|

Cas particular de tecnologies front-end:

|Versió node|Versió npm|
|-----------|----------|
|0.12.3|2.15.0|
|4.4.3|2.15.1|
|5.10.1|3.8.3|
|8.12.0 (LTS)|6.4.1|

L'única eina que va lligada en certa manera amb la versió de node és **npm**. La resta d'eines de cicle de vida (tals com **bower**, **gulp** i **grunt**) s'han d'incloure amb l'aplicació per a què el SIC les utilitzi per la seva construcció.

Pel que fa a [Angular](https://angular.io/), framework de frontend recomanat per Arquitectura CTTI i el CS Canigó, l'aplicació definirà la versió de **ng** (Angular-cli) a utilitzar per la construcció.

## Properes passes

A futur es preveu l'ús del patró builder amb Docker. En aquest model, es disposa d'un contenidor de construcció que genera l'artefacte desitjat, podent-ne instal·lar en el seu interior les tecnologies i eines necessàries que siguin requerides a tal efecte.

Si teniu cap dubte al respecte, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
