+++
date        = "2018-12-10"
title       = "Custodia de codi font"
description = "GitLab és el producte implantat al SIC per la custodia de codi font"
aliases = [
    "/howtos/2017-07-Howto-Migrar-repositori-SVN-a-repositori-GIT/"
]
sections    = "SIC"
taxonomies  = []
toc         = true
weight      = 1
+++


## Git

**TODO**

GitLab...

## Migració repositoris SVN a Git

### Prerrequisits

* Utilitzar un sistema operatiu Linux i tenir instal·lats els paquets git, git-svn i svn.
* El **repositori a migrar no pot contenir binaris** (.jar, .war, .ear, .dll, .exe, carpeta "node_modules") **ni arxius de mida superior a 20 MB**.

<p style="color: #CC0000;font-weight: bold"> Advertència: Des del SIC recomanem no utilitzar els dos repositoris (l'original al SVN i el migrat al Git) alhora. Un cop s'hagi realitzat la migració i es comprovi que s'ha realitzat correctament, cal utilitzar el nou repositori del Git.</p>  

#### Per a repositoris amb binaris

El Git del SIC té restriccions alhora de pujar fitxers binaris, fet que pot provocar errors en el procés de migració. Aquests repositoris que tinguin binaris no es podran migrar al Git, romandran en el SVN en mode lectura. Per aquests casos, per començar a treballar amb Git s'haurien de seguir els següents pasos:

* Descarregar el darrer tag del SVN
* Eliminar els binaris. Podem tenir dos casos:
	- binaris prescindibles: es poden generar a partir de codi font de l'aplicació, i per tant, no cal conservar-los
	- binaris no prescindibles: s'han d'ubicar en el [repositori de binaris](https://bin.sic.intranet.gencat.cat/) o al [Nexus](https://hudson.intranet.gencat.cat/nexus/) del SIC. Per a més informació veure aquesta [notícia](http://canigo.ctti.gencat.cat/noticies/2017-07-05-SIC-Gestio-binaris/).
* Inicialitzar el repositori Git local (git init)
* Fer el commit, push i tag d'aquesta versió inicial al Git

Un cop finalitzat aquest procés al Git es dispossarà del tag més recent. L'històric es mantindrà al SVN en mode lectura.

### Obtenir els autors

Primer de tot, s'ha d'obtenir quí ha modificat els arxius del SVN. Per fer això s'ha preparat un [job de Jenkins] (https://hudson.intranet.gencat.cat/hudson/job/MIGRACIO_GENERAR_AUTORS/).

S'ha d'executar aquest job informant els següents paràmetres:

	DEPARTAMENT -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	CODI_DIALEG -> codi de diàleg (Per exemple 0192)

Una vegada executat el job envia per email el fitxer author.txt a l'usuari que ha executat el job.

S'ha de descarregar i desar el fitxer a la carpeta desitjada, en aquest howto /migracio.

A més d'obtenir el fitxer author.txt, s'ha de descarregar el següent [fitxer] (/related/sic/howto/unknown_author.zip) i descomprimir-lo en la mateixa carpeta (/migracio). Aquest zip conté un procès per a evitar errors en el següent pas.

### Obtenir les dades del SVN

Per a obtenir les dades del SVN que s'han de migrar, dintre de la carpeta /migracio (on es troba el fitxer author.txt) executar:

	git svn clone --authors-file=author.txt --authors-prog=unknown_author.sh http://svn.intranet.gencat.cat/$1/$2/$3 --no-metadata -s $4

On s'ha de substituir les variables segons:

	$1 -> acrònim del departament (En una ruta com http://svn.intranet.gencat.cat/ctt/0192/) seria ctt )
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> path de la carpeta que conté les carpetes tags, trunk i branches. En cas que estiguin a l'arrel no posar res.
	$4 -> nom de la carpeta que es crea al sistema de fitxers locals on es deixa el codi

### Tractament del codi SVN

Accedir a la carpeta que s'ha creat en el punt anterior ($4) i abans de pujar el codi a Git executar les següents comandes:

	cp -Rf .git/refs/remotes/origin/tags/* .git/refs/tags/
	rm -Rf .git/refs/remotes/origin/tags
	cp -Rf .git/refs/remotes/* .git/refs/heads/
	rm -Rf .git/refs/remotes
	for i in $(ls .git/refs/tags/ -1 | grep '@'); do rm ".git/refs/tags/$i"; done
	

### Crear projecte en Git

Per a crear el projecte en Git heu d'accedir a https://git.intranet.gencat.cat/ anar al grup del vostre codi de diàleg i prémer **New Project**

### Pujar el codi a Git

A la carpeta on s'ha desat el codi del SVN executar:

	git remote add origin https://$1@git.intranet.gencat.cat/$2/$3.git

On s'ha de substituir les variables segons:

	$1 -> usuari GitLab
	$2 -> codi de diàleg (Per exemple 0192)
	$3 -> Nom del projecte de GitLab

Per finalitzar es puja el codi a Git

	git push origin --all
	git push --tags
	
És molt important analitzar el log que mostra Git per pantalla per assegurar que no hi ha errors i s'han migrat tant el trunk com tots els tags.

### Establir mode lectura en el repositori SVN

Un cop finalitzat el procés de migració és necessari demanar a l'equip del SIC, via petició a SAU Remedy al servei "FRAMEWORK SIC" o mail a la [Bústia de la Oficina Tècnica](mailto:oficina-tecnica.canigo.ctti@gencat.cat), que estableixi permisos només de lectura pel repositori. D'aquesta manera ens assegurem que només es faran modificacions en el Git.

Us recordem que el 6 de novembre de 2017 el SVN del SIC passarà a mode de només lectura. Us animem a realitzar aquesta migració quant abans millor. Per a més informació sobre aquest i altres esdeveniments, podeu consultar el [RoadMap de l'Oficina Tècnica Canigó](http://canigo.ctti.gencat.cat/centre-de-suport/roadmap/).

