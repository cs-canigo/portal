+++
date        = "2015-03-31"
title       = "Plugin Canigó per Eclipse"
description = ""
section     = "Canigó"
weight      = 1
+++

### Introducció

Per facilitar el desenvolupament d'aplicacions amb Canigó, s'ha desenvolupat un plugin Canigó per Eclipse.

Aquest permet dur a terme les següent tasques del desenvolupament:

- Creació de projecte inicial
- Afegir/eliminar mòduls de Canigó
- Configurar els mòduls seleccionats

### Instruccions d'ús

#### Instal·lació

Al següent [enllaç](/canigo-download-related/instalar-plugin) trobareu les instruccions per instal·lar el plugin.

#### Crear Projecte

Per tal de crear  un nou projecte Web basat en Canigo podeu fer servir el "Wizard" que trobareu al menu principal d'Eclipse amb la comanda "File/New/Other/Canigo/Nou Projecte Canigo".

Amb això aconseguireu crear un projecte Web dinàmic ("Dynamic Web Project") al que se li afegeix "natura" Canigó en un últim pas. D'altra manera, podeu triar  un projecte Java qualsevol i afegir-li la natura Canigó a posteriori situant-vos a l'arrel del projecte i utilitzant la comanda "Afegeix Canigo Nature" del menu contextual.

El primer cop que s'executi aquesta comanda després d'haver instal- lat  pot haver-hi un retard entre que accepteu crear un nou projecte Canigó i que aparegui el quadre de diàleg que efectivament afegeix la natura Canigó al nou projecte.

En el quadre de diàleg d'afegir natura Canigó podeu especificar un "grup" que  s'aplicarà com a defecte als projectes que creeu en el workspace.

En acabar el procés d'afegir natura Canigó el vostre projecte haurà estat modificat amb els fitxers de configuració i de recursos minims per un projecte web Canigó, només amb els serveis bàsics. Podreu afegir serveis addicionals seguint les instruccions del següent apartat.

#### Afegir Serveis

El fitxer "canigoPlugin.xml" que es troba a l'arrel del projecte té associat l'editor del plugin Canigó. En aquest editor podeu configurar els serveis o modificar-ne la selecció. Trobareu que hi ha un "tab" per cada servei i un d'anomenat "General". És en aquest "tab" on trobareu un segon nivell de tabs ("Maven/Configuració/Selecció de Serveis").

Al diàleg de "Selecció de Serveis" trobareu un "combo" on podeu triar entre les operacions "Generar/Eliminar/Desconnectar/Reconnectar". Per defecte està seleccionada la operació "Generar" que us permet afegir els serveis que figuren a la taula com a "INEXISTENT", i també us permet sobreescriure la configuració d'un servei que té com a estat "CONNECTAT" (aquesta operació és destructiva de les modificacions que hagiu fet als fitxers de configuració i als recursos predefinits).

El botó "Apply" de la part inferior del dialeg (pot ser que per visualitzar-lo  calgui maximitzar) aplica els canvis de configuració que sol.liciteu. Apareixerà un diàleg de progrés que en acabar recarregarà l'editor incorporant les modificacions a la selecció de serveis que hàgiu fet.

#### Configuració Serveis

Amb l'editor del plugin Canigó que està associat al fitxer  "canigoPlugin.xml" podreu configurar els serveis que tingueu seleccionats sense haver d'accedir directament als fitxers de configuració (Spring,properties, XML...). L'editor té una estructura de "tabs"  per cada un dels serveis seleccionats. El plugin Canigó exposa  els punts de configuració de Canigó en una interficie Eclipse; en alguns casos el servei no té configuració, en altres es configura amb uns pocs camps de text i finalment hi ha casos com el servei web on es poden afegir, editar o eliminar més d'un tipus d'elements de configuració (accions Struts, Forwards, Tiles....).

En general la interficie detecta els canvis un cop sortiu del camp que heu modificat (podeu fer servir TAB fer efectiva la modificació).

L'editor queda en estat "Dirty" (amb modificació) però no es repercuteix res als fitxers subjacents fins que no deseu (CTRL-S o l'opció "File/Save" del menu). La única excepció és quan es creen classes noves; l'editor permet obrir un diàleg de creació de nova classe per alguns elements configurables (Actions, VO's, BO's...) indicant-ho amb un link clickable al titol del camp de text associat al nom de la classe.

On cal, l'editor té una interficie mestre/detall jerarquica per mantenir elements més complexes. Podreu afegir o eliminar elements fent servir les icones corresponents de la "toolbar" associada a l'element.

