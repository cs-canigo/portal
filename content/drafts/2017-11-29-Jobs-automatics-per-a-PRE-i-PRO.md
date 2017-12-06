+++
date        = "2017-11-29"
title       = "Jobs automàtics per a PRE i PRO"
description = "Des del passat mes de novembre, el SIC està preparat per oferir jobs de desplegament automàtic als entorns de Preproducció i Producció."
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "DESEMBRE2017"
+++

Des del passat mes de novembre, el SIC està preparat per oferir jobs de desplegament automàtic als entorns de Preproducció i Producció. Aquests jobs, executats per usuaris de CPD/LDT, automatitzen les tasques realitzades pels tècnics aportant robustesa, fiabilitat i traçabilitat en els desplegaments d'aplicacions en aquests entorns.

A continuació es compararà el funcionament actual amb el nou funcionament que es pot adoptar gràcies als desplegaments automàtics a PRE i PRO.

## Funcionament actual

Si recordem el funcionament dels jobs pipeline que disposàvem fins ara amb el SIC 2.0 en entorns no containeritzats, era el següent:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/Pipeline.png" alt="Pipeline amb jobs semiautomàtics" title="Pipeline amb jobs semiautomàtics"></img></div>


Com es pot observar, es tracta d'una pipeline que en els entorns de PRE i PRO hi ha aturades per a que es pugui realitzar el desplegament externament. La pipeline crea el Draft de la petició, ubica els artefactes a desplegar en un SFTP on els tècnics de CPD poden recollir-los i s'espera fins que els desenvolupadors indiquen si el desplegament s'ha realitzat correctament o hi ha hagut algun problema i s'ha hagut de cancel·lar. Al SIC, aquest tipus de desplegament els anomenem **semiautomàtics**.

## Nou funcionament

Les aplicacions que optin per disposar d'un desplegament automatitzat a PRE i PRO tindran una pipeline amb el següent patró:

<div style="width:90%;margin:0 auto;"><img style="width: 90%; height: auto" src="/images/news/PipelineJobsPREiPRO.png" alt="Pipeline amb jobs automàtics" title="Pipeline amb jobs automàtics"></img></div>

Tal i com es pot observar al segon esquema, l'aturada per la creació del Remedy es continua realitzant. El que varia respecte al primer esquema és que hi apareixen dues petites pipelines de desplegament per als tècnics de CPD.

Fins ara els tècnics, quan els hi arribava el tiquet Remedy i estaven dins de la finestra vàlida de desplegament, realitzaven el desplegament a mà.

Amb aquest nou model, els tècnics tenen una mini-pipeline per entorn per a la realització del desplegament. Al SIC, anomenem aquest tipus de desplegaments **automàtics**.

Amb aquest nou funcionament, transparent per al proveïdor d'aplicacions, els proveïdors d'infraestructura podran beneficiar-se de tenir jobs automàtics de desplegament per als entorns de PRE i PRO.

## Aspectes que cal tenir en consideració

Aquests nous jobs pipline per CPD tenen les següents característiques:

* Aquests jobs de desplegament són compatibles amb plataformes en clúster i/o plataformes amb múltiples servidors per capa (servidors múltiples sense estar clusteritzats). Actualment, però, aquest sistema és compatible amb plataformes Tomcat. S'aniran integrant clústers d'altres tipus de servidors d'aplicacions a mesura que es vagin integrant aplicacions al SIC.
* El job de CPD no realitza la marxa enrere d'entorns de BBDD. Caldrà que l'operari de CPD realitzi un backup previ de la BBDD abans de realitzar el desplegament.
* No es podrà realitzar cap manteniment als servidors mentre s'està realitzant el desplegament. Els servidors podrien estar indisponibles en el moment de desplegament, fet que provocaria l'execució de la marxa enrere. Si durant la marxa enrere el servidor segueix estant indisponible, el job acabarà amb un error.
* Com sempre, caldrà notificar al SIC si hi ha canvis en la infraestructura (s'afegeixen, es modifiquen o es donen de baixa servidors).
* El SIC s'encarrega de la custòdia de l'últim artefacte desplegat correctament. La marxa enrere es realitzarà utilitzant aquest artefacte emmagatzemat pel SIC.
* En el cas que s'hagi de fer un desplegament sense estar el SIC disponible, es podrà realitzar manualment, però caldrà emmagatzemar a l'espai d'artefactes del SIC aquest darrer artefacte per a que sigui tingut en compte en la marxa enrere.

En unes setmanes, oferirem una formació a Lots d'Aplicacions i CPD/LDT per tal de cobrir tant aquesta nova funcionalitat com futures que en vindran. En breu, tant els proveïdors d'aplicacions com els d'infraestructura rebran una convocatòria.

Per a qualsevol dubte o aclariment sobre el funcionament de l'Autoservei d'usuaris SIC al GitLab, podeu obrir una petició de Consulta a 'Framework SIC' via SAU-Remedy.
