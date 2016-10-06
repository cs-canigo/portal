+++
date        = "2016-10-04"
title       = "SIC. Tractament dels fitxers Web.config als jobs d'aplicacions .NET"
description = "El SIC ja compta amb un cas d'èxit de desplegament d'aplicació .NET mitjançant jobs de Jenkins. S'ha perfeccionat l'operativa dels jobs de desplegament d'aplicacions .NET per tal de fer-los capaços d'escollir el fitxer de configuració d'aplicació (*Web.config*) adient per a cada entorn on es desplegarà l'aplicació. "
sections    = ["Notícies", "home"]
categories  = ["sic"]
key         = "OCTUBRE2016"

+++

El SIC ja compta amb un cas d'èxit de desplegament d'aplicació .NET mitjançant jobs de Jenkins. 
S'ha perfeccionat l'operativa dels jobs de desplegament d'aplicacions .NET per tal de fer-los capaços d'escollir el fitxer de configuració d'aplicació (*Web.config*) adient per a cada entorn on es desplegarà l'aplicació. 

El funcionament dels jobs que necessitin fer aquesta distinció serà el següent:

* **Jobs de INT**: 
	* Construrà els binaris de l'aplicació i empaquetarà en un ZIP tot el contingut a desplegar a l'IIS. 
	* Es realitzarà un tractament d'aquest paquet per tal que inclogui l'arxiu de configuració de l'entorn de INT (reanomenarà el fitxer *Web.config.INT* a *Web.config*).
	* Mitjançant la utilitat MSDeploy, es desplegarà aquest paquet a l'IIS d'Integració.
	
* **Jobs de PRE**:
	* Recollirà el paquet amb els binaris construïts del job de INT.
	* Es realitzarà un tractament d'aquest paquet per tal que inclogui l'arxiu de configuració de l'entorn de PRE (reanomenarà el fitxer *Web.config.PRE* a *Web.config*).
	* Pujarà a l'sFTP de CPD aquest paquet i obrirà una petició Remedy/correu a SAU demanant-ne el desplegament a PRE d'aquest.
	
* **Jobs de PRO**:
	* Recollirà el paquet amb els binaris fet servir al job de PRE.
	* Es realitzarà un tractament d'aquest paquet per tal que inclogui l'arxiu de configuració de l'entorn de PRO (reanomenarà el fitxer *Web.config.PRO* a *Web.config*).
	* Pujarà a l'sFTP de CPD aquest paquet i obrirà una petició Remedy/correu a SAU demanant-ne el desplegament a PRO d'aquest.
	



La següent imatge il·lustra aquest comportament:

![Funcionament jobs .NET](/images/news/SIC-funcionament-jobs-net.png "Funcionament jobs .NET")

Aquest sistema permetrà mantenir el principi de construcció única dels binaris + promoció d'aquests entre els diferents entorns.

Val a dir que les aplicacions necessitin d'aquesta distinció de fitxers de configuració per entorn hauran d'incloure les diferents versions d'aquest fitxer al codi font (*Web.config.INT*, *Web.config.PRE*, *Web.config.PRO*). Per a aquelles aplicacions que no necessitin mantenir diferents configuracions per entorn, no s'aplicarà el tractament a l'empaquetat dels binaris abans d'enviar-ho a desplegar.


Per a qualsevol dubte referent al funcionament dels jobs de desplegament automàtic /petició de desplegament d'aplicacions .NET, podeu [obrir una consulta](http://canigo.ctti.gencat.cat/sic/peticions/) al servei "FRAMEWORK SIC" de SAU-Remedy.