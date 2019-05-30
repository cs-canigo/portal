+++
date        = "2019-02-20"
title       = "STD. Actualització tecnològica del servei"
description = "L'últim trimestre del 2018 es va iniciar un projecte d'actualització tecnològica del STD (Servei de Transformació de Documents) que està previst que finalitzi a l'Abril. També es realitza una rearquitectura per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat. STD és el principal servei en el qual es recolza eCopia, servei de còpia autèntica de documents corporatiu de la Generalitat"
sections    = ["Notícies", "home"]
categories  = ["sgde"]
key         = "MARC2019"
+++

L'últim trimestre del 2018 es va iniciar un projecte d'**actualització tecnològica del servei STD (Servei de Transformació de Documents)** que està previst que finalitzi a l'Abril. També es realitza una **rearquitectura** del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat. STD és el principal servei en el qual es recolza eCopia, servei de còpia autèntica de documents corporatiu de la Generalitat.

Abans d'entrar en detall dels canvis que es realitzaran en aquest projecte, fem un recordatori de les diferents funcionalitats que ofereix el servei STD:

* Creació de codis segurs de verificació (**CSV**) per a la identificació i registre de documents
* **Composició** de documents PDF, consistent en la fusió de plantilles que contenen una sèrie de tags especials
amb informació sobre les dades a inserir en els documents originals
* **Conversió** de diferents formats ofimàtics a PDF
* **OCR** (Optical Character Recognition) per obtenir el text d’una imatge i generació de PDFs cercables

## Rearquitectura

Tota la capa d'aplicació del servei STD es mou de VM a contenidors [**Docker**](https://canigo.ctti.gencat.cat/cloud/cataleg/#contenidors-docker) a la plataforma [**AppAgile**](https://canigo.ctti.gencat.cat/cloud/contenidors_appagile/). Només el servei de conversió de documents ofimàtics MS Office a PDF requereix d'un entorn Windows aprovisionat en VMs a CPD.

![std2-arquitectura](/images/news/std2-arquitectura.PNG)

Gràcies a aquesta rearquitectura és possible **escalar** els diferents serveis per separat dependent del seu consum, a més d'estar **aïllats**, motiu pel qual un problema en un dels serveis no afectarà la resta. Tot el cicle de vida (desenvolupament, construcció, tests, versionat, desplegament) de cada servei és independent dels altres, podent ser evolucionats per separat.

Totes les funcionalitats del STD avui dia són exposades mitjançant serveis **SOAP**. Un cop finalitzat aquest projecte d'actualització tecnològica, a més de mantenir aquests serveis per compatibilitat amb els consumidors existents, s'exposarà una nova **API REST**. Aquesta és la línia que s'evolucionarà a futur i a la qual es recomana que les aplicacions noves s'integrin, i les existents vagin migrant. La documentació per l'ús d'aquesta nova API REST està disponible al [Manual d'Usuari STD versió 2](/related/sgde/CSCanigo.MU.P00.E01_manual_usuari_STD2_1.0.pdf) del servei.

### Sondes

Els contenidors desplegats a AppAgile tenen configurades sondes per garantir la disponibilitat del servei. En aquest comunicat s'inclou un [how-to](https://canigo.ctti.gencat.cat/howtos/2019-03-HowTo-Definicio-sondes-aplicacions-Canigo-AppAgile/) on s'explica com es poden configurar aquestes sondes en aplicacions Canigó 3.2.

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

<br />
Aviat s'informarà, tant en aquest portal com mitjançant comunicats destinats als integradors, la data de disponibilitat del nou entorn de Preproducció així com del període de proves abans no es posi en servei el nou entorn de Producció.

<br />
Per qualsevol dubte referent a aquest projecte de transformació tecnològica us podeu posar en contacte amb el CS Canigó obrint una petició de consulta o suport al servei [STF](https://cstd.ctti.gencat.cat/jiracstd/projects/STF) del CSTD, o bé enviant un correu a [oficina-tecnica.canigo.ctti@gencat.cat](mailto:oficina-tecnica.canigo.ctti@gencat.cat)
