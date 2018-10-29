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

### Entorns *on premise*

A continuació, s'exposen les tecnologies i les versions amb les que el SIC és compatible amb entorns *on premise*.

|Tecnologia|Versions|
|-------|-------|
|Ant|1.8.2<br />1.9.6|
|Maven|2.0.10<br />2.2.1<br />3.2.2<br />3.3.9|
|MS_Build|4.0|
|MS_Deploy|7.1|

Cas particular de tecnologies front-end:

**Node 0.12.3**

|Tecnologia|Node 0.12.3|Node 4.4.3|Node 5.10.1|Node 8.12.0 (LTS)|
|----------|-----------|----------|-----------|-----------------|
|npm|2.15.0|2.15.1|3.8.3|6.4.1|
|bower|1.8.0|1.8.0|1.8.0|1.8.4|
|gulp|1.2.2|1.2.2|1.2.2|2.0.1|
|grunt|1.2.0|1.2.0|1.2.0|1.3.1|

### Entorns containeritzats

En els entorns containeritzats no existeix cap limitació degut a l'ús del [patró builder](https://medium.com/@alexeiled/docker-pattern-the-build-container-b0d0e86ad601). En aquest model, es disposa d'un contenidor de construcció que genera l'artefacte desitjat, podent-ne instal·lar en el seu interior les tecnologies i eines necessàries que siguin requerides a tal efecte.

Si teniu cap dubte al respecte, podeu obrir una [consulta](/howtos/2018-01-howto-obrir-peticions-SIC-a-autoservei-Remedy/#consulta) a SAU Remedy.
