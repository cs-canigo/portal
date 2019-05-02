+++
date        = "2019-04-16"
title       = "STD. En servei nou entorn de Proproducció"
description = "L'últim trimestre del 2018 es va iniciar un projecte d'actualització tecnològica del STD (Servei de Transformació de Documents), realitzant una rearquitectura per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat. En data 15/04/2019 s'ha posat en servei el nou entorn de Preproducció"
sections    = ["Notícies", "home"]
categories  = ["sgde"]
key         = "MAIG2019"
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

Totes les funcionalitats del STD avui dia són exposades mitjançant serveis **SOAP**, i amb l'actualització tecnològica, s'exposarà una nova **API REST**.

## Actualització tecnològica

A continuació es detalla les actualitzacions de versions i canvis de productes més rellevants:

* Tots els serveis es basen en [**Canigó**](https://canigo.ctti.gencat.cat/canigo/), i s'actualitzen a la versió [3.2.7](https://canigo.ctti.gencat.cat/canigo/roadmap/)
* Es canvia l'engine de conversió de MS Office a PDF, passant de [J-Interop](http://www.j-interop.org/) a [**documents4j**](https://documents4j.com/)
* S'actualitza la versió de **MS Office** de 2010 a 2016
* S'actualitza OpenOffice 4.0.1 a **LibreOffice** 5.4.5.1
* S'actualitza la versió de [**Tesseract**](https://opensource.google.com/projects/tesseract), engine OCR, de 3.02.02 a 3.05.02
* S'actualitzen les versions de les llibreries de tractament de documents PDF (PDFBox, iText) així com d'altres d'ús intern dels diferents serveis

## Impacte en integradors

El canvi tecnològic s'ha realitzat tenint en compte que l'impacte en els consumidors actuals sigui mínim. És per aquest motiu que es mantindran intactes les URLs actuals d'accés al servei SOAP:

**WS SOAP**

* _PRE_: ```http://preproduccio.sgde.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTD<V2>?wsdl```

* _PRO_: ```http://sgde.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTD<V2>?wsdl```

*L'antic domini de PRE "sgde.pre.intranet.gencat.cat" també seguirà funcionant com fins ara

També l'accés SFTP:

**SFTP**

* _PRE_: ```sftp <usuari-app>@preproduccio.sftp.sgde.intranet.gencat.cat```

* _PRO_: ```sftp <usuari-app>@sftp.sgde.intranet.gencat.cat```

*L'antic domini de PRE "sftp.sgde.pre.intranet.gencat.cat" també seguirà funcionant com fins ara

A més dels dominis existents, es donaran d'alta nous dominis dedicats al STD, en el cas de l'accés http amb la possibilitat de fer-ho per SSL:

**WS SOAP (NOU!)**

* _PRE_: ```https://preproduccio.std.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTD<V2>?wsdl```

* _PRO_: ```https://std.intranet.gencat.cat/ServeisInvocacioSTD/services/ServeisSTD<V2>?wsdl```

**SFTP (NOU!)**

* _PRE_: ```sftp <usuari-app>@preproduccio.sftp.std.intranet.gencat.cat```

* _PRO_: ```sftp <usuari-app>@sftp.std.intranet.gencat.cat```

Les IPs relacionades amb els dominis són:

**WS SOAP**

* _PRE_: ```preproduccio.sgde.intranet.gencat.cat 10.1.126.83```
* _PRE_: ```sgde.pre.intranet.gencat.cat 10.1.126.83```

* _PRO_: ```sgde.intranet.gencat.cat 10.1.118.54```

**SFTP**

* _PRE_: ```preproduccio.sftp.sgde.intranet.gencat.cat 10.53.4.16```
* _PRE_: ```sftp.sgde.pre.intranet.gencat.cat 10.53.4.16```

* _PRO_: ```sftp.sgde.intranet.gencat.cat 10.52.4.103```

**WS SOAP (NOU!)**

* _PRE_: ```preproduccio.std.intranet.gencat.cat 10.53.12.21```

* _PRO_: ```std.intranet.gencat.cat 10.52.12.31```

**SFTP (NOU!)**

* _PRE_: ```preproduccio.sftp.std.intranet.gencat.cat 10.53.4.16```

* _PRO_: ```sftp.std.intranet.gencat.cat 10.52.4.103```

En data 15/04/2019 es va fer efectiva la posada en servei el nou entorn de Preproducció. Proporcionant el servei de STD amb la nova rearquitectura

<br />
La data prevista de posada en servei del nou entorn de Producció és el 06/05/2019. Quan s'hagi materialitzat el canvi al nou entorn de Producció s'informarà, tant en aquest portal, com mitjançant comunicats destinats als integradors.
<br />

Podeu trobar més detall de la rearquitecura a la noticia publicada al portal [STD. Actualització tecnològica del servei](/noticies/2019-02-20-actualitzacio-tecnologica-std/)

Per qualsevol dubte referent a aquest projecte de transformació tecnològica us podeu posar en contacte amb el CS Canigó obrint una petició de consulta o suport al servei [STF](https://cstd.ctti.gencat.cat/jiracstd/projects/STF) del CSTD, o bé enviant un correu a [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
