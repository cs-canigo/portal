+++
date        = "2019-02-20"
title       = "STD. Actualització tecnològica del servei"
description = "L'últim trimestre del 2018 es va iniciar un projecte d'actualització tecnològica del servei STD que està previst que finalitzi a l'Abril. També es realitza una rearquitectura del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat"
sections    = ["Notícies"]
categories  = ["sgde"]
key         = "MARC2019"
+++

L'últim trimestre del 2018 es va iniciar un projecte d'**actualització tecnològica del servei STD (Servei de Transformació de Documents)** que està previst que finalitzi a l'Abril. També es realitza una **rearquitectura** del servei per tal de millorar l'aïllament de les diferents funcionalitats que es proporcionen i la seva escalabilitat.

Abans d'entrar en detall dels canvis que s'estan realitzant en aquest projecte, fem un recordatori de les diferents funcionalitats que ofereix el servei:

* CSV
* Composició
* Conversió MS Office
* Conversió LibreOffice i imatges
* OCR

## Rearquitectura

Tota la capa d'aplicació del servei STD es mou a contenidors [**Docker**](https://canigo.ctti.gencat.cat/cloud/cataleg/#contenidors-docker) a la plataforma [**AppAgile**](https://canigo.ctti.gencat.cat/cloud/contenidors_appagile/). Només el servei de conversió de documents ofimàtics MS Office a PDF requereix d'un entorn Windows aprovisionat en VMs a CPD.

DIAGRAMA ARQUITECTURA A ALT NIVELL

Gràcies a aquesta rearquitectura és possible **escalar** els diferents serveis per separat dependent del seu consum, a més d'estar **aïllats**, motiu pel qual un problema en un dels serveis no afectarà la resta. Tot el cicle de vida (desenvolupament, construcció, tests, versionat, desplegament) de cada servei és independent dels altres, podent ser evolucionats per separat.



Totes les funcionalitats avui dia són exposades mitjançant serveis **SOAP**. Un cop finalitzat aquest projecte d'actualització tecnològica, a més de mantenir aquests serveis per compatibilitat amb els consumidors existents, s'exposarà una nova **API REST**. Aquesta és la línia que s'evolucionarà a futur i a la qual es recomana que les aplicacions noves s'integrin, i les existents vagin migrant.

### Sondes

Els contenidors desplegats a AppAgile tenen configurades sondes per garantir la disponibilitat del servei. En aquest comunicat s'inclou un [how-to](https://canigo.ctti.gencat.cat/howtos/2019-03-HowTo-Definicio-sondes-aplicacions-Canigo-AppAgile/) on s'explica com es poden configurar aquestes sondes en aplicacions Canigó 3.2.

## Actualització tecnològica

A continuació es detallen les actualitzacions de versions i canvis de productes més rellevants:

* Tots els serveis es basen en **Canigó**, i s'actualitzen a la versió [3.2.7](https://canigo.ctti.gencat.cat/canigo/roadmap/)
* Es canvia l'engine de conversió de MS Office a PDF, passant de [J-Interop](http://www.j-interop.org/) a [**documents4j**](https://documents4j.com/)
* S'actualitza la versió de MS Office de 2012 a 2016
* S'actualitza la versió de LibreOffice de x a y
* S'actualitza la versió de Tesseract, engine OCR, de x a y
* S'actualitzen les versions de les llibreries de tractament de documents PDF (PDFBox, iText)

Aviat s'informarà, tant en aquest portal com mitjançant comunicats destinats als integradors, la data de disponibilitat del nou entorn de Preproducció així com del període que tindran per executar les seves proves abans no es posi en servei el nou entorn de Producció.
