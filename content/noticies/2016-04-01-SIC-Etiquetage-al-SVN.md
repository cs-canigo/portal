+++
date        = "2016-04-01"
title       = "SIC. Etiquetatge de versions al SVN del SIC"
description = "Hi ha diverses maneres de crear versions de codi al repositori SVN del SIC (sota directori /tags). Aquest article pretén recollir-ne algunes i aconsellar l'ús d'una en particular."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "ABRIL2016"
+++


Hi ha diverses maneres de crear versions de codi al repositori SVN del SIC (sota directori /tags). Aquest article pretén recollir-ne algunes i aconsellar l'ús d'una en particular.

Es parteix del fet que, tal com s'esmenta al [Manual d'Integració amb SIC] (http://canigo.ctti.gencat.cat/related/sic/manual-integracio.pdf), ja s'ha realitzat una primera pujada del codi font al directori /trunk del repositori de l'aplicació al SVN del SIC.
<center>![etiquetatge_svn_trunk.PNG](/images/news/etiquetatge_svn_trunk.PNG)</center>

Les posteriors versions (estables) del codi haurien de constar al directori /tags del repositori SVN de l'aplicació. Aquestes versions es poden generar de les següents maneres:

<br/>
<br/>

**A partir del codi font de l'entorn de desenvolupament local**

Es sincronitzaria el codi font de l'entorn local amb una nova carpeta dins el directori /tags del repositori SVN i es faria un checkin d'aquest. Això implicaria la creació d'una nova còpia etiquetada del codi al repositori, deslligada de la versió que figura al directori /trunk.
<center>![etiquetatge_svn_opcio1.PNG](/images/news/etiquetatge_svn_opcio1.PNG)</center>

<br/>
<br/>

**A partir del codi font al /trunk del repositori SVN del SIC**

En primer lloc caldria sincronitzar el codi font de l'entorn local amb el de la carpeta /trunk del repositori SVN de l'aplicació al SIC. Posteriorment caldria generar un tag d'aquest contingut i deixar-ho a la carpeta de /tags. La versió etiquetada del codi no seria una nova còpia del codi sinó una referència a al contingut del /trunk en el moment de generar-la (alterar posteriorment el contingut del /trunk no alterarà el contingut del tag generat).
<center>![etiquetatge_svn_opcio2.PNG](/images/news/etiquetatge_svn_opcio2.PNG)</center>

<br/>


Des de SIC recomanem fer servir aquesta segona manera d'etiquetar per 2 motius:

* Es redueix considerablement el temps d'espera en fer el checkin donat que només s'actualitzen els canvis al /trunk i l'operació de crear el tag del contingut del /trunk al repositori SVN és immediata.
* Es genera un històric de canvis entre les versions, doncs les versions generades al /tag es troben lligades al /trunk, no són còpies noves de codi font.

**NOTA**: Es recorda que els repositoris SIC són considerats com a repositoris d'entregables, no com a repositoris de treball. Per tant, només s'hauria de pujar el codi font en el /trunk quan es desitgi publicar una nova versió del codi.

Per a qualsevol dubte relatiu a aquest tema, ens podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy .
