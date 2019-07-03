+++
date        = "2019-05-30"
title       = "STD. En servei nou entorn de Producció"
description = "L'últim trimestre del 2018 es va iniciar un projecte d'actualització tecnològica del STD (Servei de Transformació de Documents), realitzant una rearquitectura per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat. En data 23/05/2019 s'ha posat en servei el nou entorn de Producció"
sections    = ["Notícies", "home"]
categories  = ["sgde"]
+++

L'últim trimestre del 2018 es va iniciar un projecte d'**actualització tecnològica del servei STD (Servei de Transformació de Documents)**. També es realitza una **rearquitectura** del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat. 

Les principals funcionalitats que ofereix el servei STD són:

* Creació de codis segurs de verificació (**CSV**) per a la identificació i registre de documents
* **Composició** de documents PDF, consistent en la fusió de plantilles que contenen una sèrie de tags especials
amb informació sobre les dades a inserir en els documents originals
* **Conversió** de diferents formats ofimàtics a PDF
* **OCR** (Optical Character Recognition) per obtenir el text d’una imatge i generació de PDFs cercables

## Rearquitectura

Els principals punts de la rearquitectura són:

Tota la capa d'aplicació del servei STD es mou de VM a contenidors [**Docker**](https://canigo.ctti.gencat.cat/cloud/cataleg/#contenidors-docker) a la plataforma [**AppAgile**](https://canigo.ctti.gencat.cat/cloud/contenidors_appagile/).

![std2-arquitectura](/images/news/std2-arquitectura.PNG)

Totes les funcionalitats del STD avui dia són exposades mitjançant serveis **SOAP**, i amb l'actualització tecnològica, s'exposa una nova **API REST**.

Teniu disponible el [Manual d'Usuari STD versió 2](/related/sgde/CSCanigo.MU.P00.E01_manual_usuari_STD2_1.1.pdf) amb el detall de les funcionalitats i els serveis exposats a STD

Podeu trobar més detall de la rearquitecura a la noticia publicada al portal [STD. Actualització tecnològica del servei](/noticies/2019-02-20-actualitzacio-tecnologica-std/)

## Posada en servei a Producció

La rearquitectura s'ha realitzat tenint en compte que l'impacte en els consumidors actuals fos el mínim. En data **23/05/2019** es va fer efectiva la posada en servei del nou entorn de **Producció**, proporcionant el servei de STD amb la nova rearquitectura

Amb aquesta fita finalitza el projecte de **rearquitectura** i d'**actualització tecnològica del servei STD (Servei de Transformació de Documents)**

Per qualsevol dubte referent a aquest projecte de transformació tecnològica us podeu posar en contacte amb el CS Canigó obrint una petició de consulta o suport al servei [STF](https://cstd.ctti.gencat.cat/jiracstd/projects/STF) del CSTD, o bé enviant un correu a [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
