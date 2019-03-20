+++
date        = "2019-02-19"
title       = "Consideracions generals en contenidors"
description = "Consideracions generals a tenir present en els contenidors"
sections    = "Container Cloud"
weight      = 8
categories  = ["cloud","docker","container","kubernetes","appagile","swarmme"]
+++

* Els contenidors són volatils. Es poden destruir i reconstruir en qualsevol moment.
* Si es requeriex persistir algun tipus d'informació cal:

  * tenir un volum persistent que no es destruirà amb el contenidor.
  * utilitzar el suport d'alguna base de dades.
  
* **No està permés l'accés via SSH a cap contenidor.**
* Es requereix que el contenidor sigui autònom, no esta suportat cap tipus de manteniment manual.
* S'intenta sempre afavorir l'escalat horitzontal respecte l'escal·lat vertical.
  * Sempre és millor tenir multiples contenidors petits que tenir-ne pocs de grans.
* Els recursos necessaris en un contenidor són molt més petits que el una aplicació on premise. Cal analitzar amb cura les necessitats de cada aplicació per no malbaratar recursos.
* Per evitar talls de servei es recomana utilitzar HEALTCHECKS/LivenessProve/ReadinessProve.

