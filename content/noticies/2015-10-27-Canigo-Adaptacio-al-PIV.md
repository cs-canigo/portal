+++
date        = "2015-10-27"
title       = "Canigó. Adaptació al PIV de Gencat"
description = "L'adaptació al PIV de Gencat és un requeriment per moltes aplicacions. L'estratègia a seguir per les aplicacions Canigó depèn de la versió en què estigui implementada."
sections    = ["Notícies", "home"]
key         = "NOVEMBRE2015"
categories  = ["canigo"]
+++

L'adaptació al [PIV (Programa d'Identificació Visual) de la Generalitat de Catalunya](http://www.gencat.cat/web/guies/estil/) és un requeriment per a moltes aplicacions web construïdes amb Canigó. L'estratègia a seguir per a aquestes aplicacions depèn de la versió en què estigui implementada. 

### Aplicacions ja desenvolupades amb Canigó 2 i Canigó 3

* **Millor opció**:

	- Adaptar l'estil de l'aplicació al PIV mitjançant la modificació i creació de nous estils (css) sense modificar l'estructura (plantilles html) de l'aplicació. 

	- Requereix un expert en maquetació, però l'esforç és molt menor que modificar l'estructura de les plantilles i incorporar els nous css

* **No es recomana**:

	- Incorporar les plantilles de Bootstrap del nou Gencat ja que pot produir incompatibilitats amb la llibreria prototype.js utilitzada al servei de presentació de Canigó 2, a més de l'esforç que suposa modificar la capa de presentació (struts).

* **Solució alternativa**:

	- Refer l'arquitectura de l'aplicació per desacoblar presentació i negoci. S'ha de tenir en compte que pot tenir un cost molt elevat.

### Noves aplicacions Canigó 3

* **Recomanació**:

	- Incorporació de Bootstrap 3 per al templating de l'aplicació i que l'arquitectura d'aquesta estigui basada en desacoblament client/servidor (veure [Arquitectura aplicació recomanada](/noticies/2015-07-24-Canigo-Arquitectura-aplicacio-recomanada/)). Qualsevol canvi en la presentació només suposarà canvis en el client i no haver de redesplegar el backend.

	- Es poden tenir equips separats per al manteniment i evolució de la presentació i el negoci, que poden portar ritmes diferents.

* **No es recomana**:

	- Utilitzar una arquitectura a l'aplicació amb acoblament entre client i servidor (struts, jsf, ...) donat que pot dificultar modificacions en el templating i els estils.