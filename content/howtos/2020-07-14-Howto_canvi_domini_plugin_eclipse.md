+++
date        = "2020-07-14"
title       = "Canigó. Com canviar el domini on està allotjat el plugin de l'eclipse"
description = "Howto per a canviar el domini on està allotjat el plugin de l'eclipse"
section     = "howtos"
categories  = ["canigo"]
#key         = "GENER2020"
+++

## Introducció

El plugin de Canigó per a Eclipse permet crear de forma automàtica l’esquelet d’una aplicació Canigó. L’aplicació que es crea està orientada a servir com a punt de partida per a la creació d’una aplicació més complexe.

Aquest plugin es proporcionat dins de l'[entorn de desenvolupament](/canigo/entorn-desenvolupament/). A partir de la versió 3.0.6 de l'entorn de desenvolupament, el domini on està allotjat el plugin de eclipse és https://hudson.intranet.gencat.cat/nexus/repository/canigo-group-maven2/cat/gencat/ctti/canigo.plugin/update-site/ però per entorns de desenvolupament anteriors a la versió 3.0.6 és http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/.

En aquest how to es mostrarà com canviar el domini a entorns de desenvolupament anteriors a la versió 3.0.6 perquè apunti al domini https://hudson.intranet.gencat.cat/nexus/repository/canigo-group-maven2/cat/gencat/ctti/canigo.plugin/update-site/ .

## Canvi de domini a l'eclipse

Per canviar el domini on està allotjat el plugin de l'eclipse és necessari obrir l'eclipse i anar a:

Help > Install New Software...

![Available software](/related/canigo/howto/2020-07-14-Howto_canvi_domini_plugin_eclipse_available_software.png)

Manage o Available site (depenent de la versió de l'eclipse)

![Available software sites](/related/canigo/howto/2020-07-14-Howto_canvi_domini_plugin_eclipse_available_software_sites.png)

Seleccionarem cat.gencat.ctti.canigo.feature

![Edit site](/related/canigo/howto/2020-07-14-Howto_canvi_domini_plugin_eclipse_edit_site.png)

Canviarem la url de http://repos.canigo.ctti.gencat.cat/repository/maven2/cat/gencat/ctti/canigo.plugin/update-site/ a https://hudson.intranet.gencat.cat/nexus/repository/canigo-group-maven2/cat/gencat/ctti/canigo.plugin/update-site/

Acceptem el canvi

Tancarem la pantalla Available site i tornarem a obrir-la per comprovar que el canvi s'ha materialitzat

Help > Install New Software...

![Domini canviat](/related/canigo/howto/2020-07-14-Howto_canvi_domini_plugin_eclipse_domini_canviat.png)
![Load domini canviat](/related/canigo/howto/2020-07-14-Howto_canvi_domini_plugin_eclipse_load_domini_canviat.png)
