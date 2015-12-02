+++
date        = "2015-01-08"
title       = "SIC. Calendari de migració d'aplicacions al nou model"
description = "Tal com es va notificar al comunicat de Novembre 2014 aviat començarà la migració d'aplicacions per adaptar-se al nou model TIC. Per organitzar aquest procés de migració s'ha elaborat un calendari i s'ha publicat a la plana principal del SVN del SIC, secció \"Calendari de migració d'aplicacions al SIC\""
section     = "Notícies"
categories  = ["desenvolupament", "canigó"]
+++

Tal com es va notificar al comunicat de Novembre 2014 aviat començarà la migració d'aplicacions per adaptar-se al nou model TIC. Per organitzar aquest procés de migració s'ha elaborat un calendari i s'ha publicat a la plana principal del SVN del SIC, secció "Calendari de migració d'aplicacions al SIC". A continuació s'enumeren els principals aspectes en que consisteix aquesta migració:

- La migració començarà a partir del 26-01-15 i durarà fins al 03-03-15
- La migració es durà a terme en franges horàries de 14h a 18h minimitzant l'impacte en el servei durant les hores de més activitat
- La migració implicarà un tall de servei però aquest només afectarà al bloc d'aplicacions a migrar en la franja horària corresponent 
- Les aplicacions a migrar s'han separat en blocs segons l'àmbit al qual pertanyen. Per a aquells àmbits amb major volum d'aplicacions a migrar ha calgut distribuir-les en diversos blocs, fet que provocarà que la migració d'aplicacions de tot l'àmbit s'allargui més d'un dia en la franja horària esmentada anteriorment. En aquests casos s'oferirà l'alternativa d'unificar els blocs i realitzar la migració en dies complets però tenint en compte que l'aturada del servei durarà tota la jornada, de 08h a 18h
- El calendari es troba obert a modificacions. En cas de produir-se alguna, es publicarà i s'informarà d'aquest canvi

Amb 2 setmanes d'antelació a les dates publicades al calendari s'emetrà el corresponent comunicat als Responsables d'Arquitectura, Responsables de Qualitat i als Release Managers de l'Àmbit afectat alertant de l'inici d'aquesta migració i aportant més informació relativa al procés.

Es recorda la importància d'haver tramitat prèviament a aquesta migració la creació dels usuaris Release Manager de lot i àmbit de les aplicacions, donat que l'accés al nou repositori es troba restringit a aquests usuaris. Aquest és l'enllaç a la plana de Documentació del SIC on podeu trobar el Formulari de Gestió d'usuaris al SIC per sol·licitar aquestes altes.
L'accés als repositoris SVN del nou model per les aplicacions que seran migrades no s'habilitarà fins que finalitzi la seva migració. Aquesta mesura s'ha pres per evitar conflictes de duplicitat de codis entre repositori antic i nou.

Per qualsevol dubte referent a aquest procés de migració us podeu posar en contacte amb l'equip del SIC, preferiblement fent una petició de Suport al JIRA CSTD o enviant un correu a la bústia sic.ctti@gencat.cat.