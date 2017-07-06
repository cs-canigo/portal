+++
date        = "2017-07-05"
title       = "SIC. Nou sistema de gestió de binaris."
description = "A data 27/06/2017 es va publicar el nou sistema de gestió de binaris del SIC."
sections    = ["noticies"]
categories  = ["sic"]
key         = "JULIOL2017"
+++

A data 27/06/2017 es va publicar el nou sistema de gestió de binaris del SIC. Aquest nou sistema s'encarrega de:

* Emmagatzemar els binaris que carreguen els Release Managers de Lot i deixar-los a disposició del CPD encarregat de desplegar-los.
* Emmagatzemar binaris i arxius pesats que no són permesos dins de GIT i que per algun motiu no es poden emmagatzemar al Nexus (material multimèdia pesat, binaris que no són dependències, etc.) per a aplicacions que repositen codi font.

D'aquesta manera s'evita la mala pràctica de dipositar binaris al SVN, procediment mitjançant el qual no es podien esborrar aquests fitxers de l'històric.

L'URL d'accés a aquest nou sistema és: [https://bin.sic.intranet.gencat.cat](https://bin.sic.intranet.gencat.cat).

<img alt="Portada Gestió Binaris SIC" src="/images/news/SIC-GestioBinarisPortal.png" style="margin: 10px auto;width: 80%;height: auto;display:block;"/>

La pàgina de benvinguda disposa de dos botons:

* **Dipositar artefactes al SIC**: És només accessible per als lots d'aplicacions, reenvia a l'usuari al job de Jenkins de pujada d'artefactes al SIC. És un mateix job per a tots els Release Managers de tots els lots. No registra traces amb informació sensible i transmet els links amb les ubicacions dels manuals i dels artefactes per correu electrònic a l'invocador del job. Aquest job sol·licita la següent informació:

	* Codi d'aplicació
	* Nom d'aplicació
	* Versió
	* Fitxer de binaris
	* Fitxer de documentació

	El job valida que l'usuari tingui permisos sobre el codi d'aplicació especificat. **Avís**: Si s'especifica múltiples vegades els mateixos valors a la terna Codi d'aplicació, Nom d'aplicació i Versió, __**s'esborra el contingut previ i se sobreescriu el nou contingut**__.

* **Recuperar artefactes del SIC**: És accessible tant pels Release Managers de tots els lots així com per a tots els administradors de tots els CPDS i de LdT. Els accessos són securitzats (requereixen autenticació amb credencials GICAR i cada codi d'aplicació requereix autorització per Lot/CPD/LdT).

Per a més detalls, teniu tota la informació disponible al [Manual d'Usuari del SIC](http://canigo.ctti.gencat.cat/related/sic/2.0/manual-usuari.pdf).
